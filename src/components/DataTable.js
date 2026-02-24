import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
export function DataTable({ columns, data, searchPlaceholder = "Search..." }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState(null);
    // Filter logic
    const filteredData = useMemo(() => {
        if (!searchQuery)
            return data;
        const lowerQuery = searchQuery.toLowerCase();
        return data.filter((item) => {
            return Object.values(item).some((val) => String(val).toLowerCase().includes(lowerQuery));
        });
    }, [data, searchQuery]);
    // Sort logic
    const sortedData = useMemo(() => {
        if (!sortConfig)
            return filteredData;
        const sorted = [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue)
                return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue)
                return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredData, sortConfig]);
    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
            setSortConfig(null);
            return;
        }
        setSortConfig({ key, direction });
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { className: "relative w-full md:w-96", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: searchPlaceholder, value: searchQuery, onChange: (e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }, className: "pl-10 bg-card border-border" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "hidden sm:flex", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filters"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "hidden sm:flex", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] }), _jsxs(Select, { value: String(pageSize), onValueChange: (val) => {
                                    setPageSize(Number(val));
                                    setCurrentPage(1);
                                }, children: [_jsx(SelectTrigger, { className: "w-[130px] h-9", children: _jsx(SelectValue, { placeholder: "Rows per page" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "10", children: "10 per page" }), _jsx(SelectItem, { value: "20", children: "20 per page" }), _jsx(SelectItem, { value: "50", children: "50 per page" }), _jsx(SelectItem, { value: "100", children: "100 per page" })] })] })] })] }), _jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden shadow-sm", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsx(TableRow, { children: columns.map((column) => (_jsx(TableHead, { className: cn("py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", column.sortable && "cursor-pointer select-none hover:text-foreground transition-colors", column.className), onClick: () => column.sortable && handleSort(column.accessorKey), children: _jsxs("div", { className: "flex items-center gap-2", children: [column.header, column.sortable && (_jsx("div", { className: "w-4 h-4", children: sortConfig?.key === column.accessorKey ? (sortConfig.direction === 'asc' ? (_jsx(ArrowUp, { className: "h-3 w-3" })) : (_jsx(ArrowDown, { className: "h-3 w-3" }))) : (_jsx(ArrowUpDown, { className: "h-3 w-3 opacity-30" })) }))] }) }, column.accessorKey))) }) }), _jsx(TableBody, { children: paginatedData.length > 0 ? (paginatedData.map((item, index) => (_jsx(TableRow, { className: "hover:bg-muted/30 transition-colors border-border/50", children: columns.map((column) => (_jsx(TableCell, { className: cn("py-4", (column.accessorKey.includes('tracking') ||
                                        column.accessorKey.includes('id') ||
                                        column.accessorKey.includes('Amount') ||
                                        column.accessorKey.includes('price')) && "font-mono text-sm", column.className), children: column.cell ? column.cell(item) : item[column.accessorKey] }, column.accessorKey))) }, item.id || index)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-32 text-center text-muted-foreground", children: "No results found for your search." }) })) })] }) }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 py-2", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Showing ", _jsx("span", { className: "font-medium text-foreground", children: (currentPage - 1) * pageSize + 1 }), " to", " ", _jsx("span", { className: "font-medium text-foreground", children: Math.min(currentPage * pageSize, sortedData.length) }), " of", " ", _jsx("span", { className: "font-medium text-foreground", children: sortedData.length }), " results"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", onClick: () => setCurrentPage(1), disabled: currentPage === 1, children: _jsx(ChevronsLeft, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage === 1, children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex items-center justify-center px-4 py-1.5 rounded-md bg-secondary text-sm font-medium text-secondary-foreground", children: ["Page ", currentPage, " of ", totalPages || 1] }), _jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), disabled: currentPage === totalPages || totalPages === 0, children: _jsx(ChevronRight, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", onClick: () => setCurrentPage(totalPages), disabled: currentPage === totalPages || totalPages === 0, children: _jsx(ChevronsRight, { className: "h-4 w-4" }) })] })] })] }));
}
