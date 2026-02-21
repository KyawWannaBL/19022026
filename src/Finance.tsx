import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Plus,
  Wallet,
  ArrowUpRight,
  FileText,
  Filter,
  Calendar,
  RefreshCcw
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  formatCurrency, 
  formatDate, 
  ROUTE_PATHS 
} from '@/lib/index.ts';
import { StatusBadge } from '@/components/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE' | 'COD_COLLECTION' | 'PAYMENT' | 'REFUND';
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  reference?: string;
  shipmentId?: string;
  createdBy: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  codCollections: number;
  pendingPayments: number;
  monthlyGrowth: number;
}

export default function Finance() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: 'INCOME' as Transaction['type'],
    amount: '',
    description: '',
    category: '',
    reference: '',
    shipmentId: ''
  });

  useEffect(() => {
    loadFinancialData();
  }, []);

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      // Simulate API delay for 2026 data
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'COD_COLLECTION',
          amount: 450000,
          description: 'COD Collection - Shipment #BRT-2026-001234',
          category: 'Delivery Revenue',
          date: '2026-02-19T10:30:00Z',
          status: 'COMPLETED',
          reference: 'COD-001234',
          shipmentId: 'BRT-2026-001234',
          createdBy: 'rider-001'
        },
        {
          id: '2',
          type: 'INCOME',
          amount: 85000,
          description: 'Shipping Fee - Express Delivery',
          category: 'Shipping Revenue',
          date: '2026-02-19T09:15:00Z',
          status: 'COMPLETED',
          reference: 'INV-2026-0234',
          createdBy: 'system'
        },
        {
          id: '3',
          type: 'EXPENSE',
          amount: 25000,
          description: 'Fuel Cost - Vehicle Maintenance',
          category: 'Operations',
          date: '2026-02-18T18:00:00Z',
          status: 'COMPLETED',
          reference: 'EXP-2026-0156',
          createdBy: 'admin-001'
        },
        {
          id: '4',
          type: 'PAYMENT',
          amount: 1200000,
          description: 'Rider Commission Batch Payment',
          category: 'Payroll',
          date: '2026-02-18T16:30:00Z',
          status: 'PENDING',
          reference: 'PAY-2026-0089',
          createdBy: 'hr-001'
        },
        {
          id: '5',
          type: 'INCOME',
          amount: 2500000,
          description: 'Monthly Subscription - Enterprise Client',
          category: 'Subscription Revenue',
          date: '2026-02-17T14:20:00Z',
          status: 'COMPLETED',
          reference: 'SUB-2026-0045',
          createdBy: 'system'
        }
      ];

      setTransactions(mockTransactions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load financial records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const revenue = transactions
      .filter(t => ['INCOME', 'COD_COLLECTION'].includes(t.type) && t.status === 'COMPLETED')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => ['EXPENSE', 'PAYMENT'].includes(t.type) && t.status === 'COMPLETED')
      .reduce((sum, t) => sum + t.amount, 0);

    const codCollections = transactions
      .filter(t => t.type === 'COD_COLLECTION' && t.status === 'COMPLETED')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingPayments = transactions
      .filter(t => t.status === 'PENDING')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit: revenue - expenses,
      codCollections,
      pendingPayments,
      monthlyGrowth: 14.2
    };
  }, [transactions]);

  const handleCreateTransaction = () => {
    if (!formData.amount || !formData.description) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category || 'General',
      date: new Date().toISOString(),
      status: 'COMPLETED',
      reference: formData.reference || `TXN-${Date.now()}`,
      shipmentId: formData.shipmentId || undefined,
      createdBy: 'Admin'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: "Transaction Created",
      description: "Financial record has been successfully updated.",
    });
  };

  const resetForm = () => {
    setFormData({
      type: 'INCOME',
      amount: '',
      description: '',
      category: '',
      reference: '',
      shipmentId: ''
    });
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading">
            Finance Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Enterprise revenue tracking and financial oversight for 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border hover:bg-muted">
            <Download className="mr-2 h-4 w-4 text-primary" />
            Export PDF
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="luxury-button bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="luxury-glass border-border/50 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">Record Transaction</DialogTitle>
                <DialogDescription>Manual financial entry for logistics operations.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(v) => setFormData(p => ({ ...p, type: v as Transaction['type'] }))}
                    >
                      <SelectTrigger className="bg-background/50 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                        <SelectItem value="COD_COLLECTION">COD Collection</SelectItem>
                        <SelectItem value="PAYMENT">Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (MMK)</Label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData(p => ({ ...p, amount: e.target.value }))}
                      className="bg-background/50 border-border/50"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                    className="bg-background/50 border-border/50"
                    placeholder="Brief details about the transaction"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                      className="bg-background/50 border-border/50"
                      placeholder="e.g. Fuel, Payroll"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reference (Optional)</Label>
                    <Input
                      value={formData.reference}
                      onChange={(e) => setFormData(p => ({ ...p, reference: e.target.value }))}
                      className="bg-background/50 border-border/50"
                      placeholder="INV-000"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateTransaction} className="bg-primary text-primary-foreground">
                  Confirm Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="luxury-card relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign className="h-12 w-12" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-widest font-semibold">Total Revenue</CardDescription>
            <CardTitle className="text-3xl font-mono text-primary">{formatCurrency(summary.totalRevenue)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-green-500 font-medium">
              <ArrowUpRight className="h-3 w-3" />
              <span>{summary.monthlyGrowth}% growth this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-widest font-semibold">Operating Expenses</CardDescription>
            <CardTitle className="text-3xl font-mono text-destructive">{formatCurrency(summary.totalExpenses)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3" />
              <span>-2.4% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-widest font-semibold">Net Profit</CardDescription>
            <CardTitle className="text-3xl font-mono">{formatCurrency(summary.netProfit)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>Profit margin 32%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-widest font-semibold">COD Collections</CardDescription>
            <CardTitle className="text-3xl font-mono">{formatCurrency(summary.codCollections)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Wallet className="h-3 w-3" />
              <span>Awaiting settlement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="luxury-card border-none shadow-none">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-heading">Transaction History</CardTitle>
              <CardDescription>Comprehensive ledger of all financial movements</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ledger..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background/50"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-background/50">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                  <SelectItem value="COD_COLLECTION">COD</SelectItem>
                  <SelectItem value="PAYMENT">Payment</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-background/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl overflow-hidden border border-border/30">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono text-xs">
                        {formatDate(tx.date).split(',')[0]}
                      </TableCell>
                      <TableCell className="font-semibold text-xs">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-3 w-3 text-primary" />
                          {tx.reference}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="text-sm font-medium line-clamp-1">{tx.description}</p>
                        {tx.shipmentId && (
                          <span className="text-[10px] text-muted-foreground">Shipment: {tx.shipmentId}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-tighter">
                          {tx.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        <span className={['EXPENSE', 'PAYMENT'].includes(tx.type) ? 'text-destructive' : 'text-primary'}>
                          {['EXPENSE', 'PAYMENT'].includes(tx.type) ? '-' : '+'}
                          {formatCurrency(tx.amount)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={tx.status} type="payment" size="sm" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground italic">
                      No financial records match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="luxury-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Awaiting Settlement</CardTitle>
            </div>
            <CardDescription>Merchant payments scheduled for the next 48 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/20">
                  <div>
                    <p className="text-sm font-bold">Merchant Settlement Batch #{1024 + i}</p>
                    <p className="text-xs text-muted-foreground">Due: Feb {20 + i}, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-bold">{formatCurrency(2400000 * i)}</p>
                    <p className="text-[10px] text-primary">Processing</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <CardTitle>Expense Distribution</CardTitle>
            </div>
            <CardDescription>Top categories for Q1 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Fuel & Logistics', 'Payroll', 'Maintenance', 'Marketing'].map((cat, idx) => (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{cat}</span>
                    <span>{45 - idx * 10}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${45 - idx * 10}%` }}
                      className="h-full bg-primary"
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
