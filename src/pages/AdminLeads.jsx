import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Search, Filter, CheckCircle2, Clock, XCircle, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function AdminLeads() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLead, setSelectedLead] = useState(null);
    const queryClient = useQueryClient();

    // Fetch Leads
    const { data: leads = [], isLoading } = useQuery({
        queryKey: ['leads'],
        queryFn: () => base44.entities.ContactInquiry.list({
            sort: { created_date: -1 },
            limit: 100
        }),
    });

    // Check Admin Auth (Simple client-side check)
    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => base44.auth.me(),
        retry: false,
    });

    // Update Mutation
    const updateLeadMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.ContactInquiry.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
            if (selectedLead) setSelectedLead(null); // Close modal on success
        }
    });

    const handleStatusUpdate = (id, newStatus) => {
        updateLeadMutation.mutate({ id, data: { status: newStatus } });
    };

    const handleNotesUpdate = (id, notes) => {
        updateLeadMutation.mutate({ id, data: { admin_notes: notes } });
    };

    // Filter Logic
    const filteredLeads = leads.filter(lead => {
        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
            lead.name?.toLowerCase().includes(searchLower) ||
            lead.email?.toLowerCase().includes(searchLower) ||
            lead.city?.toLowerCase().includes(searchLower) ||
            lead.phone?.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    // Stats
    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        scheduled: leads.filter(l => l.status === 'scheduled').length,
        closed: leads.filter(l => l.status === 'closed').length
    };

    const statusColors = {
        new: "bg-blue-100 text-blue-800",
        contacted: "bg-yellow-100 text-yellow-800",
        scheduled: "bg-purple-100 text-purple-800",
        closed: "bg-green-100 text-green-800",
        lost: "bg-gray-100 text-gray-800"
    };

    if (isAuthLoading || isLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;
    
    // Simple Redirect/Guard if not logged in (In a real app, use redirects)
    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
                <p className="mb-4 text-gray-600">You must be an administrator to access this page.</p>
                <Button onClick={() => base44.auth.redirectToLogin()}>Log In as Admin</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
                        <p className="text-gray-500">Track and manage your customer inquiries</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Welcome, {user.full_name || user.email}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                            <MessageSquare className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                            <Calendar className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.scheduled}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.closed}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters & Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search by name, city, email..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No leads found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <TableRow key={lead.id} className="hover:bg-gray-50/50">
                                        <TableCell className="whitespace-nowrap text-gray-500">
                                            {format(new Date(lead.created_date), 'MMM d, yyyy')}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{lead.name}</span>
                                                <span className="text-xs text-gray-400">{lead.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">
                                                {lead.service_type?.replace(/_/g, ' ') || 'General'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{lead.city}</TableCell>
                                        <TableCell>
                                            <Select 
                                                defaultValue={lead.status || 'new'} 
                                                onValueChange={(val) => handleStatusUpdate(lead.id, val)}
                                            >
                                                <SelectTrigger className={`h-8 w-[130px] border-0 ${statusColors[lead.status || 'new']}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="contacted">Contacted</SelectItem>
                                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                                    <SelectItem value="closed">Closed</SelectItem>
                                                    <SelectItem value="lost">Lost</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                                                        View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Lead Details: {lead.name}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-6 py-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-500">Contact Info</h4>
                                                                <p className="text-sm mt-1">{lead.email}</p>
                                                                <p className="text-sm">{lead.phone}</p>
                                                                <p className="text-sm capitalize">{lead.preferred_contact} Preferred</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-500">Project Details</h4>
                                                                <p className="text-sm mt-1">{lead.city}</p>
                                                                <p className="text-sm capitalize">{lead.property_type} Property</p>
                                                                <p className="text-sm">Budget: {lead.budget_range?.replace(/_/g, ' ')}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="bg-gray-50 p-4 rounded-lg border">
                                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
                                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Admin Notes</h4>
                                                            <Textarea 
                                                                placeholder="Add internal notes about this lead..."
                                                                defaultValue={lead.admin_notes || ""}
                                                                onBlur={(e) => handleNotesUpdate(lead.id, e.target.value)}
                                                                className="min-h-[100px]"
                                                            />
                                                            <p className="text-xs text-gray-400 mt-1">Notes are saved automatically when you click outside.</p>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}