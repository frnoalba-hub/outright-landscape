import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SeoAlerts() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['seo-health'],
        queryFn: async () => {
            const res = await base44.functions.invoke("checkSeoHealth");
            if (res.ok === false) throw new Error("Failed to check health");
            return res.data || res;
        }
    });

    const emailMutation = useMutation({
        mutationFn: async () => {
            const res = await base44.functions.invoke("checkSeoHealth", { sendEmail: true });
            return res.data;
        },
        onSuccess: () => {
            alert("Report sent to your email!");
        }
    });

    if (isLoading) return (
        <Card className="border-dashed">
            <CardContent className="py-8 flex justify-center text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Checking SEO health...
            </CardContent>
        </Card>
    );

    if (error) return null; // Hide if error to avoid clutter

    const alerts = data?.alerts || [];

    if (alerts.length === 0) {
        return (
            <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                    <CardTitle className="text-green-800 flex items-center gap-2 text-lg">
                        <CheckCircle className="w-5 h-5" />
                        System Healthy
                    </CardTitle>
                    <CardDescription className="text-green-600">
                        No significant drops detected in the last 7 days.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-red-700 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Performance Alerts
                        </CardTitle>
                        <CardDescription>
                            Significant metric drops detected (Last 7 Days vs Previous)
                        </CardDescription>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white hover:bg-red-50 text-red-700 border-red-200"
                        onClick={() => emailMutation.mutate()}
                        disabled={emailMutation.isPending}
                    >
                        {emailMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-2"/> : <Mail className="w-3 h-3 mr-2" />}
                        Email Report
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {alerts.map((alert, idx) => (
                    <Alert key={idx} variant="destructive" className="bg-white border-red-100 shadow-sm">
                        <TrendingDown className="h-4 w-4" />
                        <AlertTitle className="capitalize">{alert.metric} Drop</AlertTitle>
                        <AlertDescription className="flex justify-between items-center mt-1">
                            <span>
                                Dropped by <span className="font-bold">{Math.abs(alert.change).toFixed(1)}%</span>
                                <span className="text-xs text-gray-500 ml-2">
                                    ({alert.prevVal.toFixed(1)} → {alert.currentVal.toFixed(1)})
                                </span>
                            </span>
                            {alert.severity === 'high' && (
                                <span className="text-[10px] uppercase font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded">High Priority</span>
                            )}
                        </AlertDescription>
                    </Alert>
                ))}
            </CardContent>
        </Card>
    );
}