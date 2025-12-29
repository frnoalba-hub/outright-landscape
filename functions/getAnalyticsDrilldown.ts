import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import jwt from 'npm:jsonwebtoken';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { dateRange = '28', dimensionType, value, compare = false } = await req.json();
    if (!dimensionType || !value) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 });
    }

    let propertyId = Deno.env.get('GA4_PROPERTY_ID');
    const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
    if (propertyId) propertyId = propertyId.replace('properties/', '');
    if (!propertyId || !serviceAccountJson) {
      return Response.json({ error: 'Configuration Missing', details: 'Please set GA4_PROPERTY_ID and GOOGLE_SERVICE_ACCOUNT_JSON' }, { status: 400 });
    }

    let credentials;
    try {
      credentials = JSON.parse(serviceAccountJson);
      if (typeof credentials === 'string') credentials = JSON.parse(credentials);
    } catch {
      return Response.json({ error: 'Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON' }, { status: 500 });
    }

    const now = Math.floor(Date.now() / 1000);
    const tokenPayload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };
    const signedJwt = jwt.sign(tokenPayload, credentials.private_key, { algorithm: 'RS256' });

    const getAccessToken = async () => {
      const params = new URLSearchParams();
      params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
      params.append('assertion', signedJwt);
      const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params });
      if (!res.ok) throw new Error(`Auth failed: ${res.status} ${await res.text()}`);
      const data = await res.json();
      return data.access_token;
    };

    const token = await getAccessToken();

    const days = parseInt(String(dateRange), 10) || 28;
    const currentStart = `${days}daysAgo`;
    const currentEnd = 'today';
    const prevStart = `${days * 2}daysAgo`;
    const prevEnd = `${days + 1}daysAgo`;

    const runReport = async (endpoint, body) => {
      const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    };

    const filterDimension = dimensionType === 'source' ? 'sessionSourceMedium' : 'landingPagePlusQueryString';

    // Trend
    const trendReport = await runReport('runReport', {
      dateRanges: [{ startDate: currentStart, endDate: currentEnd }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'engagedSessions' },
        { name: 'engagementRate' }
      ],
      dimensionFilter: { filter: { fieldName: filterDimension, stringFilter: { value, matchType: 'EXACT' } } },
      orderBys: [{ dimension: { dimensionName: 'date', orderType: 'ALPHANUMERIC' } }]
    });

    let previousTimeline = [];
    if (compare) {
      const prevReport = await runReport('runReport', {
        dateRanges: [{ startDate: prevStart, endDate: prevEnd }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'engagedSessions' },
          { name: 'engagementRate' }
        ],
        dimensionFilter: { filter: { fieldName: filterDimension, stringFilter: { value, matchType: 'EXACT' } } },
        orderBys: [{ dimension: { dimensionName: 'date', orderType: 'ALPHANUMERIC' } }]
      });
      previousTimeline = (prevReport.rows || []).map(r => {
        const d = r.dimensionValues[0].value;
        return {
          date: `${d.substring(4,6)}/${d.substring(6,8)}`,
          sessions: parseInt(r.metricValues[0].value || '0'),
          users: parseInt(r.metricValues[1].value || '0'),
          engagedSessions: parseInt(r.metricValues[2].value || '0'),
          engagement: parseFloat(r.metricValues[3].value || '0') * 100,
        };
      });
    }

    const timeline = (trendReport.rows || []).map(r => {
      const d = r.dimensionValues[0].value;
      return {
        date: `${d.substring(4,6)}/${d.substring(6,8)}`,
        sessions: parseInt(r.metricValues[0].value || '0'),
        users: parseInt(r.metricValues[1].value || '0'),
        engagedSessions: parseInt(r.metricValues[2].value || '0'),
        engagement: parseFloat(r.metricValues[3].value || '0') * 100,
      };
    });

    // Devices breakdown
    const devicesReport = await runReport('runReport', {
      dateRanges: [{ startDate: currentStart, endDate: currentEnd }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'engagedSessions' }],
      dimensionFilter: { filter: { fieldName: filterDimension, stringFilter: { value, matchType: 'EXACT' } } }
    });
    const devices = (devicesReport.rows || []).map(r => ({
      device: r.dimensionValues[0].value,
      sessions: parseInt(r.metricValues[0].value || '0'),
      users: parseInt(r.metricValues[1].value || '0'),
      engagedSessions: parseInt(r.metricValues[2].value || '0'),
    }));

    // Conversions / Leads
    const eventsReport = await runReport('runReport', {
      dateRanges: [{ startDate: currentStart, endDate: currentEnd }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: { filter: { fieldName: filterDimension, stringFilter: { value, matchType: 'EXACT' } } },
      limit: 50
    });
    const events = (eventsReport.rows || []).reduce((acc, r) => {
      const name = (r.dimensionValues[0].value || '').toLowerCase();
      acc[name] = (acc[name] || 0) + parseInt(r.metricValues[0].value || '0');
      return acc;
    }, {});
    const leads = (events['phone_click'] || 0) + ((events['form_submit'] || 0) + (events['generate_lead'] || 0));
    const totalSessions = timeline.reduce((a, c) => a + (c.sessions || 0), 0);
    const engagementRate = timeline.length ? (timeline.reduce((a,c)=>a+(c.engagement||0),0) / timeline.length) : 0;
    const leadRate = totalSessions ? (leads / totalSessions) * 100 : 0;

    // Extra meta for Source: campaign
    let campaigns = [];
    if (dimensionType === 'source') {
      const campReport = await runReport('runReport', {
        dateRanges: [{ startDate: currentStart, endDate: currentEnd }],
        dimensions: [{ name: 'sessionCampaign' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: { filter: { fieldName: 'sessionSourceMedium', stringFilter: { value, matchType: 'EXACT' } } },
        limit: 10
      });
      campaigns = (campReport.rows || []).map(r => ({ campaign: r.dimensionValues[0].value, sessions: parseInt(r.metricValues[0].value || '0') }));
    }

    return Response.json({
      selection: { type: dimensionType, value },
      overview: { sessions: totalSessions, users: timeline.reduce((a,c)=>a+(c.users||0),0), engagedSessions: timeline.reduce((a,c)=>a+(c.engagedSessions||0),0), engagementRate, leads, leadRate },
      timeline,
      previousTimeline,
      devices,
      campaigns,
      topEvents: dimensionType === 'page' ? Object.entries(events).map(([name,count])=>({ name, count })).sort((a,b)=>b.count-a.count).slice(0,10) : [],
    });
  } catch (error) {
    return Response.json({ error: 'Drilldown Error', details: error.message || 'Unknown error' }, { status: 500 });
  }
});