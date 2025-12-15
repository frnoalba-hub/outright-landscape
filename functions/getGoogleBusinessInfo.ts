import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get the Google API key from environment variables
        const apiKey = Deno.env.get("GOOGLE_API_KEY");
        
        if (!apiKey) {
            return Response.json({ error: 'Google API key not configured' }, { status: 500 });
        }

        // Step 1: List accounts
        const accountsUrl = `https://mybusiness.googleapis.com/v4/accounts?key=${apiKey}`;
        
        const accountsResponse = await fetch(accountsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!accountsResponse.ok) {
            const errorData = await accountsResponse.text();
            return Response.json({ 
                error: 'Failed to fetch accounts from Google',
                details: errorData,
                status: accountsResponse.status
            }, { status: accountsResponse.status });
        }

        const accountsData = await accountsResponse.json();
        
        if (!accountsData.accounts || accountsData.accounts.length === 0) {
            return Response.json({ 
                error: 'No Google Business accounts found',
                data: accountsData
            }, { status: 404 });
        }

        // Get the first account
        const account = accountsData.accounts[0];
        const accountId = account.name.split('/')[1]; // Extract ID from "accounts/{accountId}"

        // Step 2: List locations for this account
        const locationsUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations?key=${apiKey}`;
        
        const locationsResponse = await fetch(locationsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!locationsResponse.ok) {
            const errorData = await locationsResponse.text();
            return Response.json({ 
                error: 'Failed to fetch locations from Google',
                details: errorData,
                accountId: accountId
            }, { status: locationsResponse.status });
        }

        const locationsData = await locationsResponse.json();

        return Response.json({
            success: true,
            accountId: accountId,
            account: account,
            locations: locationsData.locations || [],
            totalLocations: locationsData.locations?.length || 0
        });

    } catch (error) {
        return Response.json({ 
            error: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
});