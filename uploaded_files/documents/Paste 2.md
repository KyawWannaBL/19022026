import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function AccountBalancePage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="acct.accountBalance" subtitle="Compute balances from entries (scaffold)" />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";

function Tile({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition">
      <div className="font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function AccountingHome() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle={t("Client-side for now. For large data, move KPI/ledger aggregation to your private server (z.com) and call via API.")} />
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Tile to="/admin/accounting/simple-transaction" title={t("Simple Transaction")} desc="Write revenue/expense into Firestore financials collection." />
          <Tile to="/admin/accounting/journal-voucher-entry" title={t("Journal Voucher Entry")} desc="Scaffold (to be implemented) for double-entry vouchers." />
          <Tile to="/admin/accounting/journal-voucher-list" title={t("Journal Voucher List")} desc="Scaffold list + export." />
          <Tile to="/admin/accounting/cash-voucher-entry" title={t("Cash Voucher Entry")} desc="Scaffold entry." />
          <Tile to="/admin/accounting/cash-voucher-list" title={t("Cash Voucher List")} desc="Scaffold list." />
          <Tile to="/admin/accounting/chart-of-accounts" title={t("Chart of Accounts")} desc="Scaffold CRUD for accounts." />
        </div>
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function BankListPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="acct.bankList" subtitle="Manage banks collection (scaffold)" />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function BranchAccountingPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="acct.branchAccounting" subtitle="Branch accounting snapshots (scaffold)" />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function CashVoucherEntryPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle={t("CashVoucherEntryPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function CashVoucherListPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle={t("CashVoucherListPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function ChartOfAccountsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle={t("ChartOfAccountsPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function JournalVoucherEntryPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle={t("JournalVoucherEntryPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function JournalVoucherListPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle={t("JournalVoucherListPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../../../auth/AuthContext";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "../../../i18n/I18nProvider";

type Txn = { id: string; type: "revenue" | "expense" | "transfer"; amount: number; currency: string; note?: string; ref?: string; createdAt?: string };

function parseNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = Number(String(v ?? "").replace(/[,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function dtLike(v: any): string {
  if (v && typeof v === "object" && typeof v.toDate === "function") {
    try { return v.toDate().toISOString().slice(0, 16).replace("T", " "); } catch { return ""; }
  }
  if (typeof v === "string") return v;
  return "";
}

export default function SimpleTransactionPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [type, setType] = React.useState<Txn["type"]>("revenue");
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("MMK");
  const [ref, setRef] = React.useState("");
  const [note, setNote] = React.useState("");

  const [rows, setRows] = React.useState<Txn[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const snaps = await getDocs(query(collection(db, "financials"), orderBy("createdAt", "desc"), limit(50)));
      setRows(snaps.docs.map((d) => {
        const x: any = d.data();
        return {
          id: d.id,
          type: (x.type ?? "revenue") as any,
          amount: parseNumber(x.amount ?? x.total ?? x.value),
          currency: String(x.currency ?? "MMK"),
          note: String(x.note ?? ""),
          ref: String(x.ref ?? x.reference ?? ""),
          createdAt: dtLike(x.createdAt),
        };
      }));
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      const n = parseNumber(amount);
      if (!n) throw new Error("Amount is required.");
      await addDoc(collection(db, "financials"), {
        type,
        amount: n,
        currency,
        ref: ref.trim() || null,
        note: note.trim() || null,
        createdAt: serverTimestamp(),
        createdBy: user?.uid ?? null,
        createdByEmail: user?.email ?? null,
      });
      setOk("Saved.");
      setAmount(""); setRef(""); setNote("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader titleKey="acct.simpleTxn" subtitle={t("Firestore: financials")} right={
        <button type="button" onClick={() => void load()} className="rounded-xl border bg-white px-3 py-2 text-sm font-extrabold hover:bg-slate-50">{t("common.refresh")}</button>
      } />

      <Card className="p-4">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Type")}</div>
            <select className="w-full rounded-xl border px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="revenue">{t("Revenue")}</option>
              <option value="expense">{t("Expense")}</option>
              <option value="transfer">{t("Transfer")}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Amount")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t("0")} inputMode="decimal" />
          </div>
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Currency")}</div>
            <select className="w-full rounded-xl border px-3 py-2 text-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="MMK">{t("MMK")}</option>
              <option value="USD">{t("USD")}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Reference")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={ref} onChange={(e) => setRef(e.target.value)} placeholder={t("INV-0001")} />
          </div>
          <div className="md:col-span-6">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Note")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("Description")} />
          </div>

          <div className="md:col-span-6 flex items-center gap-2">
            <button type="submit" disabled={busy} className="rounded-xl px-4 py-2 font-extrabold brand-accent text-white disabled:opacity-60">
              {busy ? "Saving…" : t("common.save")}
            </button>
            {err ? <div className="text-sm font-semibold text-red-700">{err}</div> : null}
            {ok ? <div className="text-sm font-semibold text-emerald-700">{ok}</div> : null}
          </div>
        </form>
      </Card>

      <Card className="p-4">
        <div className="font-extrabold text-slate-900">{t("Latest entries")}</div>
        <div className="mt-3 overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-600">{t("common.loading")}</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
                <tr>
                  <th className="px-3 py-3 text-left">{t("Type")}</th>
                  <th className="px-3 py-3 text-right">{t("Amount")}</th>
                  <th className="px-3 py-3 text-left">{t("Currency")}</th>
                  <th className="px-3 py-3 text-left">{t("Ref")}</th>
                  <th className="px-3 py-3 text-left">{t("Note")}</th>
                  <th className="px-3 py-3 text-left">{t("Created")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-900">{r.type}</td>
                    <td className="px-3 py-3 text-right font-extrabold text-slate-900">{r.amount.toLocaleString()}</td>
                    <td className="px-3 py-3 text-slate-700">{r.currency}</td>
                    <td className="px-3 py-3 text-slate-700">{r.ref}</td>
                    <td className="px-3 py-3 text-slate-700">{r.note}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{r.createdAt}</td>
                  </tr>
                ))}
                {!rows.length ? <tr><td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-600">{t("common.noData")}</td></tr> : null}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function AuditLogsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("AuditLogsPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function BalanceSheetPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="fin.balanceSheet" subtitle="Assets/Liabilities/Equity (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function ByDeliverymanPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("ByDeliverymanPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function ByMerchantPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("ByMerchantPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function ByTownPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("ByTownPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function GeneralLedgerPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="fin.generalLedger" subtitle="Computed from financials entries (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function IncomeStatementPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="fin.incomeStatement" subtitle="Revenue vs expenses from financials (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function ProfitLossPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="fin.profitLoss" subtitle="Profit & loss summary (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";

function Tile({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition">
      <div className="font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function ReportsHome() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("Client-side for now. For large datasets, move aggregation to server API (z.com) later.")} />
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Tile to="/admin/reports/by-deliveryman" title={t("By Deliveryman")} desc="Scaffold" />
          <Tile to="/admin/reports/by-merchant" title={t("By Merchant")} desc="Scaffold" />
          <Tile to="/admin/reports/by-town" title={t("By Town")} desc="Scaffold" />
          <Tile to="/admin/reports/audit-logs" title={t("Audit Logs")} desc="Scaffold" />
        </div>
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function TicketsClosedPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="reports.ticketsClosed" subtitle="Tickets collection (if enabled)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function TicketsOpenPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="reports.ticketsOpen" subtitle="Tickets collection (if enabled)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function TrialBalancePage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="fin.trialBalance" subtitle="Computed balances per account (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function WaysToDeliverPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="reports.waysToDeliver" subtitle="Analyze delivery types/methods (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../../../auth/AuthContext";
import { Card, cn } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "../../../i18n/I18nProvider";

type Branch = { id: string; code: string; name: string; region?: string; address?: string; phone?: string; createdAt?: string };

function dtLike(v: any): string {
  if (v && typeof v === "object" && typeof v.toDate === "function") {
    try { return v.toDate().toISOString().slice(0, 16).replace("T", " "); } catch { return ""; }
  }
  if (typeof v === "string") return v;
  return "";
}

export default function BranchesPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [rows, setRows] = React.useState<Branch[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const snaps = await getDocs(query(collection(db, "branches"), orderBy("createdAt", "desc"), limit(100)));
      setRows(snaps.docs.map((d) => {
        const x: any = d.data();
        return {
          id: d.id,
          code: String(x.code ?? x.branchCode ?? ""),
          name: String(x.name ?? x.branchName ?? ""),
          region: String(x.region ?? x.state ?? ""),
          address: String(x.address ?? ""),
          phone: String(x.phone ?? ""),
          createdAt: dtLike(x.createdAt),
        };
      }));
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load branches.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (!name.trim()) throw new Error("Branch name is required.");
      await addDoc(collection(db, "branches"), {
        code: code.trim() || null,
        name: name.trim(),
        region: region.trim() || null,
        address: address.trim() || null,
        phone: phone.trim() || null,
        createdAt: serverTimestamp(),
        createdBy: user?.uid ?? null,
      });
      setCode(""); setName(""); setRegion(""); setAddress(""); setPhone("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this branch?")) return;
    try {
      await deleteDoc(doc(db, "branches", id));
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to delete.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle={t("Branches (Firestore)")} right={
        <button type="button" onClick={() => void load()} className="rounded-xl border bg-white px-3 py-2 text-sm font-extrabold hover:bg-slate-50">{t("common.refresh")}</button>
      } />

      <Card className="p-4">
        <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Code")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("YGN")} />
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Name")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("Yangon HQ")} />
          </div>
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Region")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={region} onChange={(e) => setRegion(e.target.value)} placeholder={t("Yangon")} />
          </div>
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Phone")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("+95 ...")} />
          </div>
          <div className="md:col-span-6">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Address")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("Street, Township")} />
          </div>
          <div className="md:col-span-6">
            <button type="submit" disabled={busy} className="rounded-xl px-4 py-2 font-extrabold brand-accent text-white disabled:opacity-60">{busy ? "Saving…" : t("common.save")}</button>
          </div>
          {err ? <div className="md:col-span-6 text-sm font-semibold text-red-700">{err}</div> : null}
        </form>
      </Card>

      <Card className="p-4">
        <div className="font-extrabold text-slate-900">{t("Branches")}</div>
        <div className="mt-3 overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-600">{t("common.loading")}</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
                <tr>
                  <th className="px-3 py-3 text-left">{t("Code")}</th>
                  <th className="px-3 py-3 text-left">{t("Name")}</th>
                  <th className="px-3 py-3 text-left">{t("Region")}</th>
                  <th className="px-3 py-3 text-left">{t("Phone")}</th>
                  <th className="px-3 py-3 text-left">{t("Created")}</th>
                  <th className="px-3 py-3 text-right">{t("common.delete")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-900">{r.code}</td>
                    <td className="px-3 py-3 text-slate-700">{r.name}</td>
                    <td className="px-3 py-3 text-slate-700">{r.region}</td>
                    <td className="px-3 py-3 text-slate-700">{r.phone}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{r.createdAt}</td>
                    <td className="px-3 py-3 text-right">
                      <button type="button" onClick={() => void remove(r.id)} className={cn("rounded-xl border px-3 py-1.5 text-xs font-extrabold", "bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700")}>
                        {t("common.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
                {!rows.length ? <tr><td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-600">{t("common.noData")}</td></tr> : null}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function BroadcastPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.broadcast" subtitle="Broadcast messages (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.contacts" subtitle="Contact offices/cards (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function CoverageAreasPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.coverageAreas" subtitle="Coverage areas / towns (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function CustomRolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.customRoles" subtitle="Custom roles (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function FacebookPagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.facebookPages" subtitle="Facebook pages integration (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.integrations" subtitle="Integrations (Facebook/Viber/etc.) (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function PackagePolicyPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.packagePolicy" subtitle="Parcel handling policies (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function PermissionsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle={t("PermissionsPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function PricePackagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.pricePackages" subtitle="Price packages / tariffs (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function PromoCodesPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle={t("PromoCodesPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function RoleGroupsPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.roleGroups" subtitle="Role groups (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function ServiceZonesPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle={t("ServiceZonesPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";

function Tile({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition">
      <div className="font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function SettingsHome() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle={t("System configuration (branches CRUD implemented; others scaffold).")} />
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Tile to="/admin/settings/branches" title={t("Branches")} desc="CRUD (Firestore branches collection)" />
          <Tile to="/admin/settings/permissions" title={t("Permissions")} desc="Scaffold" />
          <Tile to="/admin/settings/service-zones" title={t("Service Zones")} desc="Scaffold" />
          <Tile to="/admin/settings/promo-codes" title={t("Promo Codes")} desc="Scaffold" />
        </div>
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function StationCoveragePage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.stationCoverage" subtitle="Station coverages (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function StationNetworkPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.stationNetwork" subtitle="Stations/hubs network (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function ViberBotsPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.viberBots" subtitle="Viber bots integration (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider"; 
import { 
    Users, 
    UserPlus, 
    ShieldCheck, 
    UserCog, 
    Search, 
    Filter,
    Settings
} from "lucide-react"; // Fixed: Closed import block
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminManagement() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0d2c54]">{t("User Management")} / အသုံးပြုသူ စီမံခန့်ခွဲမှု</h1>
          <p className="text-gray-500">{t("Manage 10-tier hierarchy system.")} / အဆင့် ၁၀ ဆင့်ရှိ အသုံးပြုသူစနစ်အား စီမံရန်</p>
        </div>
        <Button className="bg-[#ff6b00] hover:bg-[#e66000]">
          <UserPlus className="mr-2 h-4 w-4" /> {t("Add Staff")} / ဝန်ထမ်းအသစ်ထည့်ရန်
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Users} label={`${t("Total Users")} / စုစုပေါင်း`} value="1,240" />
        <StatCard icon={ShieldCheck} label={`${t("Active Admins")} / အက်ဒမင်များ`} value="14" />
        <StatCard icon={UserCog} label={`${t("Pending")} / စောင့်ဆိုင်းဆဲ`} value="3" />
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#0d2c54] font-bold">{t("Staff Accounts")} / ဝန်ထမ်းစာရင်း</CardTitle>
          <div className="flex gap-2">
            <Input 
                placeholder={t("Search...")} 
                className="w-64" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        {/* Table Content implementation */}
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="pt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold mt-1 text-[#0d2c54]">{value}</h3>
        </div>
        <div className="bg-orange-100 p-3 rounded-lg"><Icon className="text-[#ff6b00] h-6 w-6" /></div>
      </CardContent>
    </Card>
  );
}
import React, { useState } from 'react';
import { Users, Shield, Lock, Search, MoreVertical, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

const AdminUsers = () => {
  const { t } = useI18n();

  const [showAddUser, setShowAddUser] = useState(false);

  // Mock User Data matching RBAC Roles 
  const [users, setUsers] = useState([
    { id: 'U-001', name: 'Admin User', email: 'admin@britium.com', role: 'Super Admin', status: 'active', hub: 'Global' },
    { id: 'U-002', name: 'Kyaw Kyaw', email: 'kyaw@britium.com', role: 'Rider', status: 'active', hub: 'YGN-Downtown' },
    { id: 'U-003', name: 'Su Su', email: 'su@britium.com', role: 'Warehouse Controller', status: 'active', hub: 'YGN-Main' },
    { id: 'U-004', name: 'John Doe', email: 'john@shop.com', role: 'Merchant', status: 'suspended', hub: '-' },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-blue-600" /> User Management
          </h1>
          <p className="text-gray-500">{t("Manage system access and RBAC roles.")}</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow hover:bg-blue-700"
        >
          <Plus size={18} /> Add New User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="text" placeholder={t("Search by name, email or ID...")} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
           </div>
           <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
             <option>{t("All Roles")}</option>
             <option>{t("Super Admin")}</option>
             <option>{t("Manager")}</option>
             <option>{t("Rider")}</option>
             <option>{t("Merchant")}</option>
           </select>
        </div>

        {/* User Table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">{t("User Details")}</th>
              <th className="px-6 py-4">{t("Role [RBAC]")}</th>
              <th className="px-6 py-4">{t("Assigned Hub")}</th>
              <th className="px-6 py-4">{t("Status")}</th>
              <th className="px-6 py-4 text-right">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50 group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${
                    u.role === 'Super Admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                    u.role === 'Rider' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    u.role === 'Merchant' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                    'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {u.hub}
                </td>
                <td className="px-6 py-4">
                  {u.status === 'active' ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                      <CheckCircle size={14} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 text-xs font-bold">
                      <XCircle size={14} /> Suspended
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">{t("Create New User")}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700">{t("Full Name")}</label>
                <input type="text" className="w-full border p-2 rounded" placeholder={t("John Doe")} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">{t("Email (Login)")}</label>
                <input type="email" className="w-full border p-2 rounded" placeholder={t("john@company.com")} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">{t("Role")}</label>
                <select className="w-full border p-2 rounded">
                  <option value="manager">{t("Manager")}</option>
                  <option value="supervisor">{t("Supervisor")}</option>
                  <option value="warehouse">{t("Warehouse Staff")}</option>
                  <option value="rider">{t("Rider / Driver")}</option>
                  <option value="accountant">{t("Accountant")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">{t("Hub Assignment")}</label>
                <select className="w-full border p-2 rounded">
                  <option value="YGN-Main">{t("Yangon Main Hub")}</option>
                  <option value="YGN-DT">{t("Downtown Station")}</option>
                </select>
              </div>
              <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200 flex items-start gap-2">
                 <Lock size={14} className="mt-0.5 shrink-0"/>
                 <p>{t("A temporary password will be sent to the email address. The user must change it upon first login.")}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowAddUser(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded">{t("Cancel")}</button>
              <button onClick={() => { alert('User Created'); setShowAddUser(false); }} className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">{t("Create Account")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, Check, X } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

const BulkUpload = () => {
  const { t } = useI18n();

  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Mock Validation Results
  const [rows, setRows] = useState([
    { row: 1, receiver: 'Kyaw Kyaw', phone: '0912345678', address: 'Yangon', status: 'valid' },
    { row: 2, receiver: 'Su Su', phone: '0987654321', address: 'Mandalay', status: 'valid' },
    { row: 3, receiver: 'Aung Aung', phone: '123', address: '', status: 'error', msg: 'Invalid Phone & Missing Address' },
  ]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    // Simulate parsing delay
    setTimeout(() => { setAnalyzing(false); setFile(new File([""], "orders.csv")); }, 1500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("Bulk Order Upload")}</h1>
      
      {/* 1. Upload Zone */}
      {!file && (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer group"
        >
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <UploadCloud size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{t("Drag & Drop CSV / Excel file")}</h3>
          <p className="text-gray-500 mt-2">{t("or")}<span className="text-blue-600 underline">{t("browse computer")}</span></p>
          <button className="mt-8 text-sm font-bold text-gray-400 flex items-center justify-center gap-2 mx-auto hover:text-gray-600">
            <FileText size={16} /> Download Template
          </button>
        </div>
      )}

      {/* 2. Validation Table */}
      {file && (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t("Validation Results")}</h3>
              <p className="text-sm text-gray-500">{t("2 Valid, 1 Error found.")}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFile(null)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">{t("Re-upload")}</button>
              <button disabled={rows.some(r => r.status === 'error')} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
                Create Shipments
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
                <tr>
                  <th className="p-4">{t("Row")}</th>
                  <th className="p-4">{t("Receiver")}</th>
                  <th className="p-4">{t("Phone")}</th>
                  <th className="p-4">{t("Address")}</th>
                  <th className="p-4 text-center">{t("Status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r) => (
                  <tr key={r.row} className={r.status === 'error' ? 'bg-red-50' : 'bg-white'}>
                    <td className="p-4 text-gray-500 font-mono">#{r.row}</td>
                    <td className="p-4 font-medium">{r.receiver}</td>
                    <td className="p-4">{r.phone}</td>
                    <td className="p-4 text-gray-500 truncate max-w-xs">{r.address || '-'}</td>
                    <td className="p-4 text-center">
                      {r.status === 'valid' ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full"><Check size={12}/>{t("Valid")}</span>
                      ) : (
                        <div className="group relative inline-block">
                           <span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded-full cursor-help"><AlertTriangle size={12}/>{t("Error")}</span>
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg hidden group-hover:block">
                             {r.msg}
                           </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider"; // Fixed syntax
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Globe
} from "lucide-react"; // Closed block
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { t } = useI18n();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d2c54]">
          {t("System Overview")} / စနစ်အနှစ်ချုပ် ကြည့်ရှုရန်
        </h1>
        <p className="text-gray-500">{t("Real-time logistics monitoring.")}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Package} label={t("Total Shipments")} value="1,420" color="blue" />
        <StatCard icon={Truck} label={t("In Transit")} value="85" color="orange" />
        <StatCard icon={Globe} label={t("International")} value="42" color="purple" />
        <StatCard icon={TrendingUp} label={t("Revenue (MMK)")} value="4.2M" color="green" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
    green: "text-green-600 bg-green-50"
  };
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="pt-6 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}><Icon className="h-6 w-6" /></div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-xl font-bold text-[#0d2c54]">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
import React from "react";
import { getIdTokenResult } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { RequireRole } from "../../auth/RequireAuth";
import { useAuth } from "../../auth/AuthContext";
import PageHeader from "@/components/admin/PageHeader";
import { Badge, Button, Card, CardBody, CardHeader, cn } from "@/components/ui/SharedComponents";
import { useI18n } from "@/i18n/I18nProvider";

type CheckResult = {
  name: string;
  ok: boolean;
  details?: string;
};

function OkBadge({ ok }: { ok: boolean }) {
  return <Badge tone={ok ? "green" : "red"}>{ok ? "OK" : "FAIL"}</Badge>;
}

function pre(v: unknown) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

export default function DebugAuthPage() {
  const { t } = useI18n();

  const { user, refresh } = useAuth();
  const [checks, setChecks] = React.useState<CheckResult[]>([]);
  const [token, setToken] = React.useState<any>(null);
  const [userDoc, setUserDoc] = React.useState<any>(null);
  const [busy, setBusy] = React.useState(false);

  async function run() {
    setBusy(true);
    const out: CheckResult[] = [];

    const fb = auth.currentUser;
    if (!fb?.uid) {
      out.push({ name: "Firebase Auth: currentUser", ok: false, details: "No currentUser (not signed in)" });
      setChecks(out);
      setBusy(false);
      return;
    }

    out.push({ name: "Firebase Auth: currentUser", ok: true, details: `uid=${fb.uid} email=${fb.email ?? ""}` });

    // Token result
    try {
      const r = await getIdTokenResult(fb, true);
      setToken({
        claims: r.claims,
        issuedAtTime: r.issuedAtTime,
        expirationTime: r.expirationTime,
        authTime: r.authTime,
        signInProvider: (r as any)?.signInProvider,
      });
      out.push({ name: "Auth Token: getIdTokenResult()", ok: true });
    } catch (e: any) {
      out.push({ name: "Auth Token: getIdTokenResult()", ok: false, details: e?.message ?? String(e) });
      setToken(null);
    }

    // users/{uid}
    try {
      const snap = await getDoc(doc(db, "users", fb.uid));
      if (snap.exists()) {
        setUserDoc({ id: snap.id, ...snap.data() });
        out.push({ name: "Firestore: users/{uid} readable", ok: true });
      } else {
        setUserDoc(null);
        out.push({ name: "Firestore: users/{uid} readable", ok: false, details: "Document does not exist" });
      }
    } catch (e: any) {
      setUserDoc(null);
      out.push({ name: "Firestore: users/{uid} readable", ok: false, details: e?.message ?? String(e) });
    }

    // Lightweight health checks for collections (rules + connectivity)
    const collectionsToTest: Array<{ name: string; col: string }> = [
      { name: "Firestore: shipments read (limit 1)", col: "shipments" },
      { name: "Firestore: financials read (limit 1)", col: "financials" },
      { name: "Firestore: users read (limit 1)", col: "users" },
      { name: "Firestore: branches read (limit 1)", col: "branches" },
    ];

    for (const c of collectionsToTest) {
      try {
        await getDocs(query(collection(db, c.col), limit(1)));
        out.push({ name: c.name, ok: true });
      } catch (e: any) {
        out.push({ name: c.name, ok: false, details: e?.message ?? String(e) });
      }
    }

    setChecks(out);
    setBusy(false);
  }

  React.useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireRole role="super_admin">
      <div className="space-y-6">
        <PageHeader
          titleKey="admin.debugAuth"
          subtitle={t("Shows auth/profile state + Firestore read health. Super Admin only.")}
          right={
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => void refresh()}>
                Refresh profile
              </Button>
              <Button onClick={() => void run()} disabled={busy}>
                {busy ? "Running…" : "Run checks"}
              </Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader title={t("Current Profile (AuthContext)")} subtitle={t("What UI sees after login")} />
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">{t("uid")}</div>
                  <div className="mt-1 font-extrabold text-slate-900">{user?.uid ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">{t("email")}</div>
                  <div className="mt-1 font-extrabold text-slate-900 break-all">{user?.email ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">{t("role")}</div>
                  <div className="mt-1 font-extrabold text-slate-900">{user?.role ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">{t("status")}</div>
                  <div className="mt-1 font-extrabold text-slate-900">{user?.status ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">{t("mustChangePassword")}</div>
                  <div className="mt-1 font-extrabold text-slate-900">{String(Boolean(user?.mustChangePassword))}</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={t("Health Checks")} subtitle={t("If these fail, you will be stuck on login/portal.")} />
            <CardBody>
              <div className="space-y-2">
                {checks.map((c) => (
                  <div key={c.name} className="flex items-start justify-between gap-3 rounded-xl border p-3">
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900">{c.name}</div>
                      {c.details ? <div className="text-xs text-slate-500 mt-1 break-words">{c.details}</div> : null}
                    </div>
                    <OkBadge ok={c.ok} />
                  </div>
                ))}
                {!checks.length ? <div className="text-sm text-slate-600">{t("No checks yet.")}</div> : null}
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Tip: If <span className="font-semibold text-slate-700">users/{'{uid}'}</span> is not readable or missing, your app cannot determine role/status and will not route to dashboards.
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader title={t("Firestore user doc (users/{uid})")} subtitle={t("Raw data the rules allow you to read")} />
            <CardBody>
              <pre className={cn("text-xs rounded-xl border bg-slate-50 p-3 overflow-auto max-h-[360px]")}>
{pre(userDoc)}
              </pre>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={t("Token claims")} subtitle={t("Useful if you later move to server aggregation on z.com")} />
            <CardBody>
              <pre className={cn("text-xs rounded-xl border bg-slate-50 p-3 overflow-auto max-h-[360px]")}>
{pre(token)}
              </pre>
            </CardBody>
          </Card>
        </div>
      </div>
    </RequireRole>
  );
}
import React from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "../../i18n/I18nProvider";

export default function ShipmentDetailsPage() {
  const { t } = useI18n();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any | null>(null);

  React.useEffect(() => {
    async function run() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const snap = await getDoc(doc(db, "shipments", id));
        setData(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load.");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, [id]);

  return (
    <div className="space-y-6">
      <PageHeader titleKey="common.details" subtitle={<span>{t("admin.shipments")} • {id}</span>} />
      <Card className="p-4">
        {loading ? (
          <div className="py-10 text-center text-sm text-slate-600">{t("common.loading")}</div>
        ) : error ? (
          <div className="rounded-xl border bg-red-50 p-3 text-sm text-red-800 font-semibold">{error}</div>
        ) : !data ? (
          <div className="text-sm text-slate-600">{t("common.noData")}</div>
        ) : (
          <pre className="text-xs overflow-auto bg-slate-50 border rounded-xl p-4">{JSON.stringify(data, null, 2)}</pre>
        )}
      </Card>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Filter, Download, MoreHorizontal, MapPin } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table"; // Fixed UI import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShipmentsPage() {
  const { t } = useI18n();

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0d2c54]">
          {t("Shipment Records")} / ပို့ဆောင်မှု မှတ်တမ်းများ
        </h2>
        <div className="flex gap-2">
          <Input placeholder={t("Search Tracking ID...")} className="w-64" />
          <Button className="bg-[#ff6b00] hover:bg-[#e66000]"><Download className="mr-2 h-4 w-4" /> {t("Export")}</Button>
        </div>
      </div>

      <Table className="border rounded-lg">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>{t("Tracking ID")} / အိုင်ဒီ</TableHead>
            <TableHead>{t("Recipient")} / လက်ခံသူ</TableHead>
            <TableHead>{t("Destination")} / လိပ်စာ</TableHead>
            <TableHead>{t("Status")} / အခြေအနေ</TableHead>
            <TableHead className="text-right">{t("Action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapping through shipments from Firestore... */}
        </TableBody>
      </Table>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Globe, Save, Plus, Trash2 } from "lucide-react";
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableHead, 
    TableCell 
} from "@/components/ui/table"; // Fixed: Closed UI import
import { Button } from "@/components/ui/button";

export default function TariffSetting() {
  const { t } = useI18n();
  // Data sourced from 24.12.2025 list
  const [rates] = useState([
    { country: "Thailand 🇹🇭", slab: "5-10 Kg", mmk: 15000, region: "Asia" },
    { country: "Japan 🇯🇵", slab: "5-10 Kg", mmk: 65000, region: "Asia" },
    { country: "USA 🇺🇸", slab: "5-10 Kg", mmk: 119000, region: "North America" },
    { country: "Australia 🇦🇺", slab: "5-10 Kg", mmk: 95000, region: "Oceania" }
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0d2c54] flex items-center gap-2">
          <Globe className="h-5 w-5" /> {t("MMK Tariff Configuration")} / ပို့ဆောင်ခ နှုန်းထားများ
        </h2>
        <div className="flex gap-2">
            <Button variant="outline">{t("Add Route")} / လမ်းကြောင်းအသစ်</Button>
            <Button className="bg-[#ff6b00] hover:bg-[#e66000]"><Save className="mr-2 h-4 w-4" /> {t("Save")} / သိမ်းရန်</Button>
        </div>
      </div>

      <Table className="border border-gray-100 rounded-lg">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>{t("Country")} / နိုင်ငံ</TableHead>
            <TableHead>{t("Weight Slab")} / အလေးချိန်</TableHead>
            <TableHead>{t("Proposed Price (MMK)")} / ဈေးနှုန်း</TableHead>
            <TableHead>{t("Region")} / ဒေသ</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="font-bold text-[#0d2c54]">{r.country}</TableCell>
              <TableCell>{r.slab}</TableCell>
              <TableCell className="text-orange-600 font-mono font-bold">{r.mmk.toLocaleString()} MMK</TableCell>
              <TableCell>{r.region}</TableCell>
              <TableCell><Trash2 className="h-4 w-4 text-red-500 cursor-pointer" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { updatePassword } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

function passwordStrength(pw: string) {
  const { t } = useI18n();

  // Simple, predictable checks (no external deps)
  const hasMin = pw.length >= 8;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);

  const score = [hasMin, hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

  const label =
    score <= 2 ? "Weak" : score === 3 ? "Fair" : score === 4 ? "Good" : "Strong";

  return { hasMin, hasUpper, hasLower, hasNumber, hasSymbol, score, label };
}

export default function ChangePassword(): JSX.Element {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(newPassword), [newPassword]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = auth.currentUser;
    if (!user) {
      setError("You are not signed in. Please log in again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Keep this validation aligned with your org policy
    if (!strength.hasMin) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      // Firebase may throw "requires-recent-login" if session is old
      await updatePassword(user, newPassword);

      // Clear the forced-change flag in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        mustchangepassword: false,
        passwordUpdatedAt: serverTimestamp(),
      });

      await auth.signOut();
      navigate("/login", { replace: true });
    } catch (err: any) {
      const code: string | undefined = err?.code;

      if (code === "auth/requires-recent-login") {
        setError("For security, please log in again and then change your password.");
      } else if (code === "auth/weak-password") {
        setError("That password is too weak. Please choose a stronger one.");
      } else {
        setError(err?.message ?? "Failed to update password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <ShieldCheck className="h-8 w-8 text-[#0D47A1]" />
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">{t("Secure Your Account")}</h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          For security reasons, you must change your temporary password before proceeding.
        </p>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
              New Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-11 outline-none transition-all focus:ring-2 focus:ring-[#0D47A1]"
                placeholder={t("••••••••")}
                autoComplete="new-password"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff className="h-4 w-4" />{t(":")}<Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Strength helper */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{t("Strength")}</span>
                <span
                  className={
                    strength.score <= 2
                      ? "text-red-600 font-semibold"
                      : strength.score === 3
                      ? "text-yellow-700 font-semibold"
                      : strength.score === 4
                      ? "text-blue-700 font-semibold"
                      : "text-green-700 font-semibold"
                  }
                >
                  {strength.label}
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={
                    strength.score <= 2
                      ? "h-2 rounded-full bg-red-500"
                      : strength.score === 3
                      ? "h-2 rounded-full bg-yellow-500"
                      : strength.score === 4
                      ? "h-2 rounded-full bg-blue-500"
                      : "h-2 rounded-full bg-green-500"
                  }
                  style={{ width: `${(strength.score / 5) * 100}%` }}
                />
              </div>

              <ul className="grid grid-cols-1 gap-1 text-xs text-gray-500">
                <li className={strength.hasMin ? "text-green-700" : ""}>{t("• At least 8 characters")}</li>
                <li className={strength.hasUpper ? "text-green-700" : ""}>{t("• One uppercase letter")}</li>
                <li className={strength.hasLower ? "text-green-700" : ""}>{t("• One lowercase letter")}</li>
                <li className={strength.hasNumber ? "text-green-700" : ""}>{t("• One number")}</li>
                <li className={strength.hasSymbol ? "text-green-700" : ""}>{t("• One symbol")}</li>
              </ul>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-gray-500">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-11 outline-none transition-all focus:ring-2 focus:ring-[#0D47A1]"
                placeholder={t("••••••••")}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" />{t(":")}<Eye className="h-4 w-4" />}
              </button>
            </div>

            {confirmPassword.length > 0 && confirmPassword !== newPassword && (
              <p className="mt-2 text-xs text-red-600">{t("Passwords do not match.")}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full transform rounded-xl bg-[#0D47A1] py-3.5 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl disabled:opacity-70 disabled:hover:transform-none"
          >
            {loading ? "Updating Security..." : "Update Password"}
          </button>

          <p className="text-center text-xs text-gray-400">
            You will be signed out after changing your password.
          </p>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../auth/AuthContext";
import { useI18n } from "@/i18n/I18nProvider";

export default function ForceChangePassword() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!loading && !user) return <Navigate to="/login" replace />;
  if (!loading && user && !user.mustChangePassword) return <Navigate to="/portal" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const fbUser = auth.currentUser;
    if (!fbUser?.email) return setErr("Session expired. Please login again.");
    if (newPassword.length < 8) return setErr("New password must be at least 8 characters.");
    if (newPassword !== confirm) return setErr("Passwords do not match.");

    setBusy(true);
    try {
      const cred = EmailAuthProvider.credential(fbUser.email, currentPassword);
      await reauthenticateWithCredential(fbUser, cred);
      await updatePassword(fbUser, newPassword);
      await updateDoc(doc(db, "users", fbUser.uid), { mustChangePassword: false, passwordUpdatedAt: serverTimestamp() });
      navigate(location.state?.from ?? "/portal", { replace: true });
    } catch (e: any) {
      setErr(e.message || "Update failed.");
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 shadow-xl">
        <h2 className="text-xl font-black text-[#0d2c54] mb-6">{t("Security Update Required")}</h2>
        {err && <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder={t("Current Password")} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d2c54]" required />
          <input type="password" placeholder={t("New Secure Password")} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d2c54]" required />
          <input type="password" placeholder={t("Confirm New Password")} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d2c54]" required />
          <button type="submit" disabled={busy} className="w-full py-4 bg-[#0d2c54] text-white font-bold rounded-xl hover:bg-blue-800 disabled:opacity-50">{busy ? t("Updating...") : t("Update and Enter Portal")}</button>
        </form>
      </div>
    </div>
  );
}
import React from "react";
import { NavLink } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { humanizeFirebaseAuthError } from "../../auth/firebaseErrors";
import { useI18n } from "../../i18n/I18nProvider";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setOk("Password reset email sent. Please check your inbox.");
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center fade-in px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white shadow-soft p-6">
        <div className="flex items-center gap-3">
          <img
            src="/assets/britium-logo.png"
            className="h-12 w-12 rounded-2xl bg-white p-1 shadow-sm"
            alt="Britium Express"
          />
          <div>
            <div className="text-xl font-extrabold text-slate-900">{t("auth.forgot")}</div>
            <div className="text-xs text-slate-500">We will send you a reset link.</div>
          </div>
        </div>

        {err ? (
          <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div>
        ) : null}
        {ok ? (
          <div className="mt-4 rounded-xl border bg-emerald-50 text-emerald-800 text-sm font-semibold p-3">{ok}</div>
        ) : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            inputMode="email"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          <NavLink to="/login" className="font-extrabold text-blue-600 hover:underline">
            Back to sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
// Ensure this path matches your folder structure exactly (Case-Sensitive!)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { t } = useI18n();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your login logic here (e.g., Firebase or NestJS API call)
        console.log("Logging in with:", email);
        setTimeout(() => setIsLoading(false), 2000); // Demo timeout
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md border-none shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-[#0d2c54]">
                        {t("Britium Express")}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {t("Enter your credentials to access your account")}
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                    type="email" 
                                    placeholder="name@britiumexpress.com" 
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                    type="password" 
                                    placeholder={t("Password")}
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-[#ff6b00] hover:bg-[#e66000]" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t("Signing in...")}
                                </>
                            ) : (
                                t("Login")
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
import React from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../../auth/AuthContext";
import { useI18n } from "../../i18n/I18nProvider";
import { humanizeFirebaseAuthError } from "../../auth/firebaseErrors";
import { auth } from "../../lib/firebase";

type Role = "warehouse" | "admin" | "merchant" | "rider" | string | undefined;

function defaultRouteForRole(role: Role): string {
  switch (role) {
    case "warehouse":
      return "/warehouse/dashboard";
    case "admin":
      return "/admin";
    case "merchant":
      return "/merchant";
    case "rider":
      return "/rider";
    default:
      return "/";
  }
}

/**
 * Only allow redirecting back into protected areas.
 * Everything else falls back to a role-based default.
 */
function pickSafeRedirect(from: unknown, role: Role): string {
  if (typeof from !== "string") return defaultRouteForRole(role);
  if (!from.startsWith("/")) return defaultRouteForRole(role);

  const allowed = ["/admin", "/merchant", "/rider", "/warehouse"];
  if (allowed.some((p) => from.startsWith(p))) return from;

  return defaultRouteForRole(role);
}

export default function LoginPage() {
  const { t } = useI18n();
  const { loading, user, profile, signIn, refresh, error: profileError } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;

  // If already logged in, redirect immediately based on role / previous intended route
  if (!loading && user) {
    const fromPath = loc?.state?.from?.pathname ?? loc?.state?.from;
    const to = pickSafeRedirect(fromPath, profile?.role);
    return <Navigate to={to} replace />;
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [err, setErr] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [resetBusy, setResetBusy] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setInfo(null);

    try {
      await signIn(email.trim(), password);

      // Ensure profile is loaded before redirect decision
      const p = await refresh();
      const fromPath = loc?.state?.from?.pathname ?? loc?.state?.from;
      const to = pickSafeRedirect(fromPath, p?.role);

      nav(to, { replace: true });
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setBusy(false);
    }
  }

  async function forgotPassword() {
    const trimmed = email.trim();
    setErr(null);
    setInfo(null);

    if (!trimmed) {
      setErr("Please type your email first, then click “Forgot password?”.");
      return;
    }

    setResetBusy(true);
    try {
      await sendPasswordResetEmail(auth, trimmed);
      setInfo("Password reset email sent. Please check your inbox (and spam folder).");
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setResetBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center fade-in px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white shadow-soft p-6">
        <div className="flex items-center gap-3">
          <img
            src="/assets/britium-logo.png"
            className="h-12 w-12 rounded-2xl bg-white p-1 shadow-sm"
            alt="Britium Express"
          />
          <div>
            <div className="text-xl font-extrabold text-slate-900">{t("auth.signin")}</div>
            <div className="text-xs text-slate-500">{t("auth.portalTitle")}</div>
          </div>
        </div>

        {profileError ? (
          <div className="mt-4 rounded-xl border bg-amber-50 text-amber-900 text-sm font-semibold p-3">
            {profileError}
          </div>
        ) : null}

        {err ? (
          <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">
            {err}
          </div>
        ) : null}

        {info ? (
          <div className="mt-4 rounded-xl border bg-emerald-50 text-emerald-800 text-sm font-semibold p-3">
            {info}
          </div>
        ) : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email")}
            inputMode="email"
            autoComplete="email"
          />

          <div className="space-y-2">
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Password")}
              type="password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => void forgotPassword()}
                disabled={resetBusy}
                className="text-sm font-extrabold text-blue-700 hover:underline disabled:opacity-60"
              >
                {resetBusy ? "Sending…" : "Forgot password?"}
              </button>

              <NavLink to="/signup" className="text-sm font-extrabold text-slate-700 hover:underline">
                Create account
              </NavLink>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hourglass, Bell, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function PendingApproval(): JSX.Element {
  const loc = useLocation() as any;
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <Hourglass className="h-9 w-9 text-orange-600 animate-pulse" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-900">{t("Registration Submitted")}</h1>

        {loc.state?.message ? (
          <div className="mb-4 rounded-xl border bg-amber-50 p-3 text-left text-xs font-bold text-amber-900">
            {String(loc.state.message)}
          </div>
        ) : null}

        <p className="mb-6 leading-relaxed text-gray-600">
          {t("Thank you for joining Britium Express! Your account is currently")}
          {" "}
          <span className="ml-1 inline-flex items-center rounded bg-orange-50 px-2 py-1 font-bold text-orange-700">
            {t("Pending Approval")}
          </span>
          .
        </p>

        {/* Status */}
        <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5 text-left">
          <div className="mb-3 flex items-center gap-2 text-[#0D47A1]">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-semibold">{t("Status Update")}</p>
          </div>

          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0D47A1]">
                1
              </span>
              <span>{t("Your documents have been received.")}</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0D47A1]">
                2
              </span>
              <span>{t("Admin verification is in progress.")}</span>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0D47A1]">
                3
              </span>
              <span>{t("You will be notified once approved.")}</span>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-xs text-gray-600">
            <Bell className="h-4 w-4 text-[#0D47A1]" />
            <span>{t("Please check your email regularly for updates.")}</span>
          </div>
        </div>

        <Link
          to="/login"
          className="block w-full rounded-xl border-2 border-gray-200 bg-white py-3 font-bold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
        >
          {t("Return to Login")}
        </Link>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { auth } from "../../lib/firebase";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Handles automatic redirection based on user roles and status.
 * Use 'default' export to resolve the build error in routes.tsx.
 */
export default function PortalRedirect() {
  const { t } = useI18n();
  const { loading, user, refresh } = useAuth();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!tried && auth.currentUser && !user && !loading) {
      setTried(true);
      void refresh();
    }
  }, [tried, user, loading, refresh]);

  if (loading) return <div className="min-h-screen grid place-items-center">{t("loading")}</div>;

  if (!user) {
    if (auth.currentUser) {
      void refresh();
      return <div className="min-h-screen grid place-items-center">{t("loading")}</div>;
    }
    return <Navigate to="/login" replace />;
  }

  // Redirection logic for the 10-tier hierarchy
  const role = user.role?.toLowerCase();
  if (role === "super_admin" || role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "merchant") return <Navigate to="/merchant/dashboard" replace />;
  if (role === "rider") return <Navigate to="/rider/home" replace />;
  
  return <Navigate to="/customer/home" replace />;
}
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

// Using the hosted images provided
const LOGO_URL = "https://img.sanishtech.com/u/b9beae3ecc1df0244610c786c48992ab.png";
const COVER_URL = "https://img.sanishtech.com/u/4774210f087879ff509300bbb082cc86.jpg";

// Define the documents required for each role
const ROLE_REQUIREMENTS: Record<string, string[]> = {
  rider: ['Driving License (Front)', 'Driving License (Back)', 'NRC / ID Card'],
  driver: ['Driving License (Heavy)', 'Vehicle Registration', 'NRC / ID Card'],
  merchant: ['Business License', 'Shop Photo', 'Tax ID'],
  sub_station: ['Manager ID', 'Branch Permit'],
  warehouse: ['NRC / ID Card', 'Recommendation Letter'],
  supervisor: ['NRC / ID Card', 'Staff ID'],
  customer: ['NRC / ID Card']
};

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'customer', 
    branchId: '',
  });

  // File State
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const handleFileChange = (docName: string, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File too large! Max 5MB.");
      return;
    }
    setFiles(prev => ({ ...prev, [docName]: file }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const documentUrls: Record<string, string> = {};
      const requiredDocs = ROLE_REQUIREMENTS[formData.role] || [];

      for (const docName of requiredDocs) {
        const file = files[docName];
        if (file) {
          const storageRef = ref(storage, `uploads/${user.uid}/${docName}_${Date.now()}`);
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          documentUrls[docName] = url;
        }
      }

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        displayName: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        branchId: formData.branchId || null,
        status: 'pending',
        documents: documentUrls,
        createdAt: serverTimestamp(),
        authorityLevel: 1
      });

      await updateProfile(user, { displayName: formData.fullName });
      navigate('/pending-approval');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const requiredDocs = ROLE_REQUIREMENTS[formData.role] || [];

  return (
    <div className="min-h-screen flex w-full bg-white">
      
      {/* LEFT SIDE - Consistent visual theme with Login */}
      <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-gray-900 sticky top-0 h-screen">
         <div className="absolute inset-0 bg-blue-900/60 z-10 mix-blend-multiply"></div>
         <img 
          src={COVER_URL} 
          alt="Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white p-8 text-center">
            <div className="w-32 mb-8 transition-transform hover:scale-110 duration-500 drop-shadow-2xl">
               <img src={LOGO_URL} alt="Logo" className="w-full h-auto" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Join the Fleet</h2>
            <p className="opacity-90 text-lg max-w-md mx-auto leading-relaxed">
                Become part of the most reliable logistics network in the country. Secure. Efficient. Rewarding.
            </p>
        </div>
      </div>

      {/* RIGHT SIDE - Scrollable Registration Form */}
      <div className="flex-1 flex flex-col items-center p-4 lg:p-12 overflow-y-auto bg-gray-50/50">
        <div className="w-full max-w-2xl bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
                <p className="text-gray-500 mt-2">Enter your details below to start your application</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    <span className="text-red-700 text-sm font-medium">{error}</span>
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-8">
            
            {/* Role Selection */}
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <label className="block text-sm font-bold text-[#0D47A1] mb-2 uppercase tracking-wide">I am registering as a:</label>
                <div className="relative">
                    <select 
                    value={formData.role}
                    onChange={(e) => { setFormData({...formData, role: e.target.value}); setFiles({}); }}
                    className="w-full p-4 pl-4 pr-10 border-none bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-[#0D47A1] text-lg font-medium text-gray-800 appearance-none cursor-pointer"
                    >
                    <option value="customer">Customer (Sender/Receiver)</option>
                    <option value="rider">Rider (Bike Delivery)</option>
                    <option value="driver">Driver (Truck/Van)</option>
                    <option value="merchant">Merchant (Business Partner)</option>
                    <option value="sub_station">Sub-station Manager</option>
                    <option value="warehouse">Warehouse Staff</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-5 h-5 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Full Name</label>
                    <input type="text" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="e.g. Kyaw Kyaw"
                        value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Phone Number</label>
                    <input type="tel" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="+959..."
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Email</label>
                    <input type="email" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="you@example.com"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-[#0D47A1]">Password</label>
                    <input type="password" required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all outline-none"
                        placeholder="••••••••"
                        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
            </div>

            {/* Dynamic Document Upload Section */}
            {requiredDocs.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Identity Verification</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">To comply with security regulations, please upload clear photos of the required documents for your selected role. These will be reviewed by an administrator.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {requiredDocs.map((docName) => (
                    <div key={docName} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-[#0D47A1] transition-colors group">
                        <label className="text-sm font-bold text-gray-700 mb-3 block group-hover:text-[#0D47A1] transition-colors">
                        {docName} <span className="text-red-500">*</span>
                        </label>
                        <input 
                        type="file" 
                        required
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(docName, e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2.5 file:px-5
                            file:rounded-full file:border-0
                            file:text-xs file:font-bold
                            file:uppercase file:tracking-wide
                            file:bg-[#0D47A1] file:text-white
                            hover:file:bg-blue-800 cursor-pointer"
                        />
                    </div>
                    ))}
                </div>
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:to-[#0D47A1] transition-all disabled:opacity-70 transform hover:-translate-y-0.5"
            >
                {loading ? 'Processing Registration...' : 'Submit Registration'}
            </button>
            
            <div className="text-center pt-2 pb-6">
                <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#0D47A1] transition-colors">
                    Already have an account? <span className="font-bold ml-1 underline decoration-2 underline-offset-2">Log In</span>
                </Link>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppRole, useAuth } from "../../auth/AuthContext";
import { useI18n } from "@/i18n/I18nProvider";

export default function SignupPage() {
  const { t } = useI18n();

  const { signUp } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<AppRole>("customer");
  const [err, setErr] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await signUp(email.trim(), password, role);
      nav("/login", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? "Signup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center fade-in px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white shadow-soft p-6">
        <div className="text-xl font-extrabold text-slate-900">{t("Create account")}</div>
        <div className="text-xs text-slate-500 mt-1">{t("Choose role for portal access.")}</div>

        {err ? <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div> : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input className="w-full rounded-xl border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("Email")} />
          <input className="w-full rounded-xl border px-3 py-2 text-sm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("Password")} type="password" />
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={role} onChange={(e) => setRole(e.target.value as AppRole)}>
            <option value="customer">{t("Customer")}</option>
            <option value="merchant">{t("Merchant")}</option>
            <option value="rider">{t("Rider")}</option>
            <option value="admin">{t("Admin")}</option>
          </select>
          <button type="submit" disabled={busy} className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Have an account?{" "}
          <NavLink to="/login" className="font-extrabold text-blue-600 hover:underline">
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { MapPin, Box, CreditCard, ChevronRight } from 'lucide-react';

const SendParcel = () => {
  // A simplified 3-step wizard
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h1 className="font-bold text-lg">Send a Package</h1>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded">Step {step} of 3</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          
          {/* STEP 1: Route */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="absolute left-2 top-3 w-3 h-3 bg-blue-500 rounded-full z-10"></div>
                <div className="absolute left-3.5 top-6 w-0.5 h-16 bg-gray-200"></div>
                <label className="text-xs font-bold text-gray-500 uppercase">Pickup From</label>
                <input type="text" className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-blue-500 mt-1" placeholder="Enter Pickup Address" />
              </div>

              <div className="relative pl-8">
                <div className="absolute left-2 top-3 w-3 h-3 border-2 border-red-500 bg-white rounded-full z-10"></div>
                <label className="text-xs font-bold text-gray-500 uppercase">Deliver To</label>
                <input type="text" className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-red-500 mt-1" placeholder="Enter Receiver Address" />
                <input type="tel" className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-red-500 mt-2" placeholder="Receiver Phone Number" />
              </div>
            </div>
          )}

          {/* STEP 2: Item */}
          {step === 2 && (
             <div className="space-y-6">
               <div>
                 <label className="text-sm font-bold text-gray-700">What are you sending?</label>
                 <div className="grid grid-cols-3 gap-3 mt-2">
                   {['Document', 'Clothes', 'Electronics', 'Food', 'Other'].map(type => (
                     <button key={type} className="p-3 border rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600 focus:bg-blue-50 focus:border-blue-500 transition-colors">
                       {type}
                     </button>
                   ))}
                 </div>
               </div>
               
               <div>
                  <label className="text-sm font-bold text-gray-700">Parcel Size</label>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center p-3 border rounded-lg gap-3">
                      <Box size={24} className="text-gray-400" />
                      <div className="flex-1">
                        <span className="block font-bold text-sm">Small (Max 2kg)</span>
                        <span className="text-xs text-gray-500">Fits in shoebox</span>
                      </div>
                      <input type="radio" name="size" />
                    </div>
                    <div className="flex items-center p-3 border rounded-lg gap-3">
                      <Box size={32} className="text-gray-400" />
                      <div className="flex-1">
                        <span className="block font-bold text-sm">Medium (Max 5kg)</span>
                        <span className="text-xs text-gray-500">Fits in backpack</span>
                      </div>
                      <input type="radio" name="size" />
                    </div>
                  </div>
               </div>
             </div>
          )}

          {/* STEP 3: Summary & Pay */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold">2,500 Ks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-bold">500 Ks</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-blue-600 text-lg">3,000 Ks</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Payment Method</label>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 border rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50">
                    <span className="flex items-center gap-2"><CreditCard size={16}/> KPay / Wave</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Instant</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50">
                    <span className="flex items-center gap-2"><MapPin size={16}/> Cash on Pickup</span>
                    <span className="text-xs text-gray-400">Pay Rider</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <button 
            onClick={() => step < 3 ? setStep(s => s + 1) : alert("Booking Confirmed!")}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
          >
            {step < 3 ? 'Continue' : 'Confirm Booking'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendParcel;
import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

export default function Forbidden() {
  const { t } = useI18n();

  return (
    <div className="min-h-[60vh] grid place-items-center text-center fade-in px-4">
      <div className="max-w-md">
        <div className="text-4xl font-extrabold text-slate-900">{t("403")}</div>
        <div className="mt-2 text-slate-600">{t("You don’t have access to this page.")}</div>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold brand-gradient text-white">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Card className="p-8 max-w-lg w-full">
        <div className="text-2xl font-extrabold text-slate-900">{t("404")}</div>
        <div className="mt-2 text-sm text-slate-600">{t("Page not found.")}</div>
        <Link to="/" className="inline-block mt-5 rounded-xl px-4 py-2 font-extrabold brand-accent text-white">
          Go Home
        </Link>
      </Card>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useI18n } from "@/i18n/I18nProvider";

export default function PendingApproval() {
  const { t } = useI18n();

  const { user, error } = useAuth();

  return (
    <div className="min-h-[65vh] grid place-items-center text-center px-4 fade-in">
      <div className="max-w-xl rounded-2xl border bg-white shadow-soft p-6">
        <div className="flex items-center justify-center gap-3">
          <img src="/assets/britium-logo.png" alt="Britium Express" className="h-12 w-12 rounded-2xl bg-white p-1 shadow-sm" />
          <div className="text-left">
            <div className="text-xl font-extrabold text-slate-900">{t("Account Pending")}</div>
            <div className="text-xs text-slate-500">{t("Britium Express Portal")}</div>
          </div>
        </div>

        <div className="mt-4 text-slate-700">
          {user?.email ? (
            <>
              Signed in as <span className="font-extrabold">{user.email}</span>, but your account is not approved / provisioned for dashboards yet.
            </>
          ) : (
            <>{t("Your account is not ready for dashboards yet.")}</>
          )}
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border bg-amber-50 text-amber-900 text-sm font-semibold p-3 text-left">
            {error}
          </div>
        ) : null}

        <div className="mt-5 text-sm text-slate-600 text-left">
          <div className="font-extrabold text-slate-800">{t("What to do")}</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>{t("Ensure you have a document in Firestore collection")}<span className="font-semibold">{t("users")}</span>{t("with fields:")}<span className="font-semibold">{t("email, role, status")}</span>{t(".")}</li>
            <li>{t("Set")}<span className="font-semibold">{t("status")}</span>{t("to")}<span className="font-semibold">{t("approved")}</span>{t(".")}</li>
            <li>{t("Ensure Firestore rules allow signed-in users to read")}<span className="font-semibold">{t("users")}</span>{t(".")}</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-center">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold bg-slate-900 text-white hover:bg-slate-800">
            Back Home
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold border bg-white hover:bg-slate-50">
            Try another account
          </Link>
        </div>
      </div>
    </div>
  );
}
import { useI18n } from "@/i18n/I18nProvider";
export const Demo = () => {
  const { t } = useI18n();

  return <div>{t("Hello World")}</div>;
};
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Plane, HandCoins, ShieldCheck, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const { t } = useI18n();
  const nav = useNavigate();

  const [code, setCode] = React.useState("");

  function quickTrack(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    nav(`/tracking?code=${encodeURIComponent(trimmed)}`);
  }

  const cards = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: t("Domestic Express"),
      desc: t("Same-day Yangon and next-day to major cities."),
      to: "/quote",
    },
    {
      icon: <HandCoins className="w-5 h-5" />,
      title: t("COD for Shops"),
      desc: t("Collect cash safely and remit quickly."),
      to: "/services",
    },
    {
      icon: <Plane className="w-5 h-5" />,
      title: t("International Cargo"),
      desc: t("Air freight rates and chargeable weight calculator."),
      to: "/services",
    },
  ] as const;

  return (
    <div className="space-y-10 slide-up">
      {/* HERO */}
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative z-10 grid md:grid-cols-[auto,1fr] gap-6 items-center">
            <img
              src="/assets/britium-logo.png"
              alt="Britium Express"
              className="h-28 w-auto rounded-2xl bg-white/95 p-3 shadow-soft"
            />

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold">{t("Britium Express")}</h1>

              <p className="mt-3 text-white/85 text-lg max-w-3xl">
                {t(
                  "A dedicated delivery arm of Britium Ventures Company Limited — fast, secure, and trackable logistics."
                )}
              </p>

              <form onSubmit={quickTrack} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="flex-1 bg-white rounded-2xl p-1 ring-soft">
                  <div className="flex items-center gap-2 px-3">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t("Quick Track: Enter tracking number")}
                      className="w-full py-3 text-sm outline-none bg-transparent text-slate-900"
                      aria-label={t("Quick Track: Enter tracking number")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="rounded-2xl px-5 py-3 font-extrabold brand-accent text-white inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {t("Track")} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (menu scroll target) */}
      <section id="services" className="grid md:grid-cols-3 gap-4 scroll-mt-24">
        {cards.map((c) => (
          <Card key={c.title}>
            <div className="p-6">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center">{c.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600">{c.desc}</div>

              <button
                onClick={() => nav(c.to)}
                className="mt-4 inline-flex items-center gap-2 font-extrabold text-[var(--brand-blue)] hover:underline"
              >
                {t("Learn more")} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </section>

      {/* ABOUT (menu scroll target) */}
      <section id="about" className="grid lg:grid-cols-2 gap-6 items-center scroll-mt-24">
        <img
          src="https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1200&q=80"
          alt={t("Delivery")}
          className="rounded-3xl border shadow-soft object-cover w-full h-[360px]"
        />

        <Card>
          <div className="p-8">
            <div className="text-xs font-extrabold tracking-widest uppercase text-[var(--brand-orange)]">
              {t("Who we are")}
            </div>

            <div className="mt-2 text-3xl font-extrabold text-[var(--brand-blue)]">
              {t("Reliable delivery, built for scale.")}
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {t(
                "Britium Express provides domestic courier, COD operations, warehousing support, and international forwarding. We focus on speed, proof-of-delivery, and friendly customer support."
              )}
            </p>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-green-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">{t("Secure + Trackable")}</div>
                  <div className="text-sm text-slate-600">{t("Shipment statuses, tracking, and clear service terms.")}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">{t("Fast Operations")}</div>
                  <div className="text-sm text-slate-600">{t("Optimized pickup routes and delivery hubs.")}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => nav("/services")}
                className="rounded-2xl px-5 py-3 font-extrabold brand-gradient text-white"
              >
                {t("Explore Services")}
              </button>

              {/* scroll instead of navigating away */}
              <button
                onClick={() => scrollToId("contact")}
                className="rounded-2xl px-5 py-3 font-extrabold bg-white border hover:bg-slate-50"
              >
                {t("Contact Us")}
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* CONTACT (menu scroll target) */}
      <section id="contact" className="rounded-2xl border bg-white shadow-soft p-6 scroll-mt-24">
        <h2 className="text-xl font-extrabold text-slate-900">{t("Contact")}</h2>
        <p className="mt-2 text-slate-600">
          {t("Email")}: cs_1@britiumexpress.com,cs_2@britiumexpress.com • {t("Phone")}: +95-9-897447744,+95-9-897447755, +95-9-897447766
        </p>
      </section>
    </div>
  );
}
import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, Check } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IBulkRow } from '@/types/merchant';

export default function BulkUpload() {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);

  const rows: IBulkRow[] = [
    { row: 1, receiver: 'Kyaw Kyaw', phone: '0912345678', address: 'Yangon', status: 'valid' },
    { row: 3, receiver: 'Aung Aung', phone: '123', address: '', status: 'error', msg: t('Invalid Phone & Missing Address') },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in">
      <h1 className="text-3xl font-black text-[#0d2c54] mb-8 uppercase tracking-tight">{t("Bulk Order Upload")}</h1>
      
      {!file ? (
        <div className="border-4 border-dashed border-gray-100 rounded-[3rem] p-20 text-center bg-white hover:border-[#ff6b00] transition-all cursor-pointer group shadow-sm">
          <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <UploadCloud size={48} className="text-[#ff6b00]" />
          </div>
          <h3 className="text-2xl font-black text-[#0d2c54]">{t("Drag & Drop CSV / Excel file")}</h3>
          <p className="text-gray-400 mt-2 font-bold uppercase text-xs tracking-widest">{t("or")} <span className="text-[#ff6b00] underline cursor-pointer">{t("browse computer")}</span></p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-black text-[#0d2c54]">{t("Validation Results")}</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("Check records before submission")}</p>
            </div>
            <button onClick={() => setFile(null)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl text-xs uppercase tracking-widest">{t("Re-upload")}</button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <tr>
                  <th className="p-6">{t("Row")}</th>
                  <th className="p-6">{t("Receiver")}</th>
                  <th className="p-6">{t("Status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map((r) => (
                  <tr key={r.row} className={r.status === 'error' ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}>
                    <td className="p-6 text-gray-400 font-mono text-xs">#{r.row}</td>
                    <td className="p-6 font-bold text-[#0d2c54]">{r.receiver}</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-2 font-black text-[10px] uppercase px-3 py-1.5 rounded-full ${
                        r.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.status === 'valid' ? <Check size={12}/> : <AlertTriangle size={12}/>}
                        {t(r.status === 'valid' ? "Valid" : "Error")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { ChevronRight, Package, Truck, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function CreateShipment() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Progress Stepper */}
        <div className="flex justify-between mb-12 relative px-4">
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-0"></div>
          {[
            { id: 1, label: t('Pickup'), icon: MapPin },
            { id: 2, label: t('Receiver'), icon: Truck },
            { id: 3, label: t('Parcel'), icon: Package },
            { id: 4, label: t('Service'), icon: CreditCard }
          ].map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center bg-gray-50 px-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step >= s.id ? 'bg-[#0d2c54] text-white scale-110 shadow-lg' : 'bg-gray-300 text-white'
              }`}>
                <s.icon size={18} />
              </div>
              <span className={`text-[10px] font-black uppercase mt-3 tracking-widest ${step >= s.id ? 'text-[#0d2c54]' : 'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-12 animate-in slide-in-from-right-8 duration-500">
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-[#0d2c54]">{t("Select Pickup Location")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Main Warehouse', 'Downtown Store'].map((loc) => (
                    <label key={loc} className="border-2 border-gray-100 p-6 rounded-[2rem] cursor-pointer hover:border-[#ff6b00] hover:bg-orange-50/30 transition-all flex items-start gap-4">
                      <input type="radio" name="pickup" className="mt-1 accent-[#ff6b00]" />
                      <div>
                        <span className="font-black text-[#0d2c54] block">{t(loc)}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">{t("123 Merchant Road, Yangon")}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 2, 3, 4 forms would follow same styling */}
          </div>

          <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))} 
              className={`px-8 py-3 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 ${step === 1 ? 'invisible' : ''}`}
            >
              {t("Back")}
            </button>
            <button 
              onClick={() => step < 4 ? setStep(s => s + 1) : alert("Created")} 
              className="px-10 py-4 bg-[#ff6b00] text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all flex items-center gap-3"
            >
              {step < 4 ? <>{t("Next Step")} <ChevronRight size={18} /></> : <>{t("Confirm & Print")} <CheckCircle size={18}/></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider"; // Fixed Syntax
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent 
} from "@/components/ui/card"; // Fixed: Properly closed block
import { 
    Package, 
    Truck, 
    CheckCircle2, 
    DollarSign, 
    Plus, 
    Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MerchantDashboardPage() {
    const { t } = useI18n();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0d2c54]">{t("Merchant Portal")}</h1>
                    <p className="text-sm text-gray-500">{t("Track your shipments and COD balances.")}</p>
                </div>
                <Button className="bg-[#ff6b00] hover:bg-[#e66000]">
                    <Plus className="mr-2 h-4 w-4" /> {t("New Order")}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <DashboardStat icon={Package} label={t("Pending")} value="12" color="blue" />
                <DashboardStat icon={Truck} label={t("In Transit")} value="5" color="orange" />
                <DashboardStat icon={CheckCircle2} label={t("Delivered")} value="142" color="green" />
                <DashboardStat icon={DollarSign} label={t("COD Balance")} value="450,000 MMK" color="red" />
            </div>
        </div>
    );
}

function DashboardStat({ icon: Icon, label, value, color }: any) {
    const colors: any = {
        blue: "text-blue-600 bg-blue-50",
        orange: "text-orange-600 bg-orange-50",
        green: "text-green-600 bg-green-50",
        red: "text-red-600 bg-red-50"
    };
    return (
        <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${colors[color]}`}><Icon className="h-6 w-6" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{label}</p>
                        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, Clock, Download, Search, Filter } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { ITransactionRecord, IPayoutRecord } from '@/types/merchant';

export default function MerchantFinance() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'ledger' | 'payouts'>('ledger');

  const transactions: ITransactionRecord[] = [
    { id: 'TX-901', date: '2026-01-28', ref: 'ORD-1122', type: 'COD Collected', amount: 45000, status: 'pending' },
    { id: 'TX-902', date: '2026-01-28', ref: 'ORD-1125', type: 'Delivery Fee', amount: -2500, status: 'deducted' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t("Unsettled COD")}</p>
            <h2 className="text-4xl font-black text-gray-900 mt-2">1,245,000 <span className="text-sm font-bold text-gray-300">{t("MMK")}</span></h2>
            <div className="mt-4 flex items-center gap-2 text-orange-600 text-xs font-bold">
              <Clock size={14} /> {t("Next Payout")}: Feb 1st
            </div>
        </div>

        <div className="bg-[#0d2c54] p-8 rounded-[2rem] shadow-xl text-white flex flex-col justify-between">
          <div>
            <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">{t("Action")}</p>
            <h3 className="font-bold text-xl mt-1">{t("Request Early Payout?")}</h3>
          </div>
          <button className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95">
            <ArrowUpRight size={18} /> {t("Request Withdrawal")}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-50 flex px-8 pt-2">
          {['ledger', 'payouts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-5 mr-10 font-black text-xs uppercase tracking-widest border-b-4 transition-all ${
                activeTab === tab ? 'border-[#ff6b00] text-[#0d2c54]' : 'border-transparent text-gray-300'
              }`}
            >
              {tab === 'ledger' ? t("Transaction Ledger") : t("Payout History")}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">{t("Date")}</th>
                <th className="px-8 py-5">{t("Ref ID")}</th>
                <th className="px-8 py-5 text-right">{t("Amount")}</th>
                <th className="px-8 py-5 text-center">{t("Status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-gray-500 text-sm">{tx.date}</td>
                  <td className="px-8 py-5 font-mono text-xs font-bold text-[#0d2c54]">{tx.ref}</td>
                  <td className={`px-8 py-5 text-right font-black ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      tx.status === 'payable' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {t(tx.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Truck, Calendar, MapPin, Plus, Clock, ChevronRight } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IPickupRequest } from '@/types/merchant';

export default function MerchantPickups() {
  const { t } = useI18n();
  
  const pickups: IPickupRequest[] = [
    { id: 'PK-202', status: 'assigned', date: 'Today', time: '10:00 AM', location: 'Main Warehouse', rider: 'Kyaw Kyaw', count: 12 },
    { id: 'PK-203', status: 'pending', date: 'Tomorrow', time: '02:00 PM', location: 'Downtown Store', rider: null, count: 50 },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Pickup Requests")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t("Manage your scheduled pickups.")}</p>
        </div>
        <button className="bg-[#0d2c54] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest">
          <Plus size={20} /> {t("New Pickup Request")}
        </button>
      </div>

      <div className="space-y-4">
        {pickups.map((p) => (
          <div key={p.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center gap-6">
              <div className={`p-5 rounded-3xl ${
                p.status === 'assigned' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
              }`}>
                <Truck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0d2c54]">
                  {p.count} {t("Parcels")} 
                  <span className="text-gray-300 ml-3 font-mono text-sm">#{p.id}</span>
                </h3>
                <div className="flex gap-6 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {p.time}</span>
                  <span className="flex items-center gap-1 text-[#ff6b00]"><MapPin size={14}/> {p.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-8">
              {p.rider && (
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{t("Assigned Rider")}</p>
                  <p className="font-black text-[#0d2c54]">{p.rider}</p>
                </div>
              )}
              <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                p.status === 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {t(p.status)}
              </div>
              <button className="p-3 text-gray-300 hover:text-[#0d2c54] hover:bg-gray-50 rounded-2xl transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
import { useI18n } from "@/i18n/I18nProvider";
  LayoutDashboard, Package, Upload, FileText, Warehouse, 
  BarChart3, CreditCard, Code, Bell, Truck, TrendingUp, 
  MapPin, RefreshCw, Eye, Download, Filter, UploadCloud, 
  FileSpreadsheet, CheckCircle, Clock, XCircle, AlertTriangle, 
  DollarSign, Edit, Search, Plus, ArrowUpRight, Copy, 
  Activity, Zap, BookOpen, Play, Mail, Smartphone, MessageCircle,
  ChevronDown, LogOut, User, Settings, HelpCircle, Wallet, Calendar
} from 'lucide-react';

const MerchantPortal = () => {
  const { t } = useI18n();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- MOCK DATA FOR CHARTS & TABLES ---
  const recentOrders = [
    { id: '#BE001247', customer: 'John Doe', loc: 'Mumbai', status: 'Delivered', amount: '₹1,250', statusColor: 'bg-green-100 text-green-700' },
    { id: '#BE001246', customer: 'Sarah Smith', loc: 'Delhi', status: 'In Transit', amount: '₹890', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: '#BE001245', customer: 'Mike Johnson', loc: 'Bangalore', status: 'Processing', amount: '₹2,100', statusColor: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* --- TOP NAVIGATION --- */}
      <nav className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">{t("Britium Express")}</h1>
                <p className="text-xs text-blue-100 opacity-80">{t("Business Portal")}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-blue-700 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2.5 h-2.5 border-2 border-blue-800"></span>
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-blue-700 cursor-pointer">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  M
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{t("Merchant Store")}</p>
                  <p className="text-xs text-blue-200">{t("Premium Account")}</p>
                </div>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8 gap-6">
        {/* --- SIDEBAR NAVIGATION --- */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 space-y-1">
              <NavButton active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} icon={<LayoutDashboard size={20}/>} label={t("Dashboard")} />
              <NavButton active={activeSection === 'orders'} onClick={() => setActiveSection('orders')} icon={<Package size={20}/>} label={t("Order Management")} />
              <NavButton active={activeSection === 'bulk'} onClick={() => setActiveSection('bulk')} icon={<Upload size={20}/>} label={t("Bulk Upload")} />
              <NavButton active={activeSection === 'invoices'} onClick={() => setActiveSection('invoices')} icon={<FileText size={20}/>} label={t("Invoices & Billing")} />
              <NavButton active={activeSection === 'inventory'} onClick={() => setActiveSection('inventory')} icon={<Warehouse size={20}/>} label={t("Inventory Tracking")} />
              <NavButton active={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')} icon={<BarChart3 size={20}/>} label={t("Analytics & Reports")} />
              <NavButton active={activeSection === 'payments'} onClick={() => setActiveSection('payments')} icon={<CreditCard size={20}/>} label={t("Payment Center")} />
              <NavButton active={activeSection === 'api'} onClick={() => setActiveSection('api')} icon={<Code size={20}/>} label={t("API Integration")} />
              <NavButton active={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} icon={<Bell size={20}/>} label={t("Notifications")} />
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 pb-12">
          
          {/* 1. DASHBOARD SECTION */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{t("Business Dashboard")}</h2>
                <p className="text-gray-500">{t("Welcome back! Here's your business overview for today.")}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title={t("Total Orders")} value="1,247" trend="+12.5%" trendUp={true} icon={<Package className="text-blue-600" />} color="blue" />
                <MetricCard title={t("Revenue")} value="₹2,45,680" trend="+8.2%" trendUp={true} icon={<TrendingUp className="text-green-600" />} color="green" />
                <MetricCard title={t("Delivery Rate")} value="94.2%" trend="+2.1%" trendUp={true} icon={<Truck className="text-orange-600" />} color="orange" />
                <MetricCard title={t("Active Shipments")} value="156" trend="-3.1%" trendUp={false} icon={<MapPin className="text-purple-600" />} color="purple" />
              </div>

              {/* Charts Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-800">{t("Order Trends")}</h3>
                    <select className="text-sm border rounded-md p-1"><option>{t("Last 7 days")}</option></select>
                  </div>
                  {/* CSS-only Chart Simulation */}
                  <div className="h-48 flex items-end justify-between space-x-2 px-2">
                    {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                         <div className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>{t("Mon")}</span><span>{t("Tue")}</span><span>{t("Wed")}</span><span>{t("Thu")}</span><span>{t("Fri")}</span><span>{t("Sat")}</span><span>{t("Sun")}</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-800">{t("Delivery Status")}</h3>
                    <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:rotate-180 transition-transform" />
                  </div>
                  <div className="flex items-center justify-center h-48 space-x-8">
                     {/* Simple Donut Chart Representation */}
                     <div className="relative w-32 h-32 rounded-full border-[12px] border-green-500 border-r-blue-600 border-b-orange-400 border-l-green-500">
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-gray-700">{t("94%")}</div>
                     </div>
                     <div className="space-y-2 text-sm">
                       <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>{t("Delivered (65%)")}</div>
                       <div className="flex items-center"><div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>{t("Transit (20%)")}</div>
                       <div className="flex items-center"><div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>{t("Processing (15%)")}</div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{t("Recent Orders")}</h3>
                  <button onClick={() => setActiveSection('orders')} className="text-blue-600 text-sm font-medium hover:underline">{t("View All")}</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-6 py-3 font-medium">{t("Order ID")}</th>
                        <th className="px-6 py-3 font-medium">{t("Customer")}</th>
                        <th className="px-6 py-3 font-medium">{t("Destination")}</th>
                        <th className="px-6 py-3 font-medium">{t("Status")}</th>
                        <th className="px-6 py-3 font-medium">{t("Amount")}</th>
                        <th className="px-6 py-3 font-medium">{t("Actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentOrders.map((order, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.loc}</td>
                          <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>{order.status}</span></td>
                          <td className="px-6 py-4 font-medium">{order.amount}</td>
                          <td className="px-6 py-4">
                            <button className="p-1 hover:bg-gray-200 rounded"><Eye size={16} className="text-gray-500" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. ORDERS SECTION (Simplified) */}
          {activeSection === 'orders' && (
             <div className="space-y-6">
               <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t("Order Management")}</h2>
                    <p className="text-gray-500">{t("Manage all your orders and shipments")}</p>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <Plus size={18} className="mr-2" /> Create New Order
                 </button>
               </div>
               
               {/* Filters */}
               <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select className="border p-2 rounded-lg text-sm bg-gray-50"><option>{t("All Status")}</option><option>{t("Delivered")}</option></select>
                  <input type="date" className="border p-2 rounded-lg text-sm bg-gray-50" />
                  <input type="text" placeholder={t("Search customer...")} className="border p-2 rounded-lg text-sm bg-gray-50" />
                  <button className="bg-gray-800 text-white rounded-lg py-2 text-sm font-medium">{t("Search")}</button>
               </div>

               {/* Expanded Table */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-600">
                     <tr>
                       <th className="px-6 py-3"><input type="checkbox" /></th>
                       <th className="px-6 py-3">{t("Order Details")}</th>
                       <th className="px-6 py-3">{t("Customer")}</th>
                       <th className="px-6 py-3">{t("Shipping")}</th>
                       <th className="px-6 py-3">{t("Status")}</th>
                       <th className="px-6 py-3">{t("Actions")}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {[1,2,3,4,5].map((i) => (
                       <tr key={i} className="hover:bg-gray-50">
                         <td className="px-6 py-4"><input type="checkbox" /></td>
                         <td className="px-6 py-4">
                           <div className="font-medium text-blue-600">#BE00124{i}</div>
                           <div className="text-xs text-gray-500">{t("Jan 27, 2026")}</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="font-medium">Customer {i}</div>
                            <div className="text-xs text-gray-500">{t("+95 9 123 456")}</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="text-sm">{t("Yangon → Mandalay")}</div>
                            <div className="text-xs text-gray-500">{t("Express")}</div>
                         </td>
                         <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">{t("Delivered")}</span></td>
                         <td className="px-6 py-4 flex gap-2">
                            <button className="text-gray-400 hover:text-blue-600"><Eye size={16}/></button>
                            <button className="text-gray-400 hover:text-blue-600"><MapPin size={16}/></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {/* 3. UPLOAD & OTHER SECTIONS (Placeholder Visuals) */}
          {activeSection === 'bulk' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                   <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-10 hover:bg-blue-100 transition-colors cursor-pointer">
                      <UploadCloud className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <p className="font-medium text-gray-700">{t("Drop your CSV/Excel files here")}</p>
                      <p className="text-sm text-gray-500 mb-4">{t("or click to browse")}</p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">{t("Browse Files")}</button>
                   </div>
                   <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center"><FileSpreadsheet size={16} className="mr-2 text-green-600" />{t("CSV Format")}</span>
                      <span className="flex items-center"><FileSpreadsheet size={16} className="mr-2 text-blue-600" />{t("Excel Format")}</span>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-semibold text-gray-800 mb-4">{t("Upload History")}</h3>
                   <div className="space-y-4">
                      <UploadItem name="orders_batch_001.csv" size="125 orders" status="success" />
                      <UploadItem name="orders_batch_002.xlsx" size="89 orders" status="processing" />
                      <UploadItem name="orders_batch_003.csv" size="Failed" status="failed" />
                   </div>
                </div>
             </div>
          )}

          {/* 4. API & PAYMENTS (Simple representations) */}
          {activeSection === 'payments' && (
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <MetricCard title={t("Account Balance")} value="₹45,280" trend="Available" trendUp={true} icon={<Wallet className="text-green-500"/>} color="green" />
                   <MetricCard title={t("Pending Payments")} value="₹12,450" trend="Processing" trendUp={false} icon={<Clock className="text-yellow-500"/>} color="yellow" />
                   <MetricCard title={t("Total Transactions")} value="₹2,45,680" trend="This Month" trendUp={true} icon={<TrendingUp className="text-blue-500"/>} color="blue" />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                   <h3 className="font-semibold mb-4">{t("Payment Methods")}</h3>
                   <div className="flex items-center justify-between p-4 border rounded-lg mb-3">
                      <div className="flex items-center space-x-3">
                         <CreditCard className="text-blue-600" />
                         <div>
                            <p className="font-medium">{t("•••• •••• •••• 4532")}</p>
                            <p className="text-xs text-gray-500">{t("Expires 12/28")}</p>
                         </div>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{t("Primary")}</span>
                   </div>
                   <button className="w-full border border-dashed border-gray-300 py-3 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center">
                      <Plus size={16} className="mr-2" /> Add New Method
                   </button>
                </div>
             </div>
          )}

          {activeSection === 'api' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-semibold mb-4">{t("API Keys")}</h3>
                   <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-4">
                      <div>
                         <p className="font-medium text-sm">{t("Production Key")}</p>
                         <p className="font-mono text-xs text-gray-500">{t("be_live_sk_78sfd987sfd...")}</p>
                      </div>
                      <Copy size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
                   </div>
                   <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">{t("Generate New Key")}</button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-semibold mb-4">{t("Quick Start")}</h3>
                   <div className="bg-[#1e293b] text-gray-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      <p className="text-purple-400">{t("curl")}</p>
                      <p className="pl-4">{t("-X POST https://api.britium.com/v1/orders \")}</p>
                      <p className="pl-4">{t("-H \"Authorization: Bearer KEY\" \")}</p>
                      <p className="pl-4">-d '{"{"} "customer": "John" {"}"}'</p>
                   </div>
                </div>
             </div>
          )}

        </main>
      </div>

      {/* --- CREATE ORDER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">{t("Create New Order")}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle size={24} /></button>
             </div>
             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                   <InputGroup label={t("Customer Name")} placeholder={t("John Doe")} />
                   <InputGroup label={t("Phone Number")} placeholder={t("+95 9...")} />
                </div>
                <InputGroup label={t("Pickup Address")} placeholder={t("Enter full address")} />
                <InputGroup label={t("Delivery Address")} placeholder={t("Enter full address")} />
                <div className="grid grid-cols-3 gap-4">
                   <InputGroup label={t("Weight (kg)")} placeholder={t("1.0")} type="number" />
                   <InputGroup label={t("Value (MMK)")} placeholder={t("10000")} type="number" />
                   <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">{t("Type")}</label>
                      <select className="w-full border rounded-lg p-2 text-sm"><option>{t("Standard")}</option><option>{t("Express")}</option></select>
                   </div>
                </div>
             </div>
             <div className="p-6 bg-gray-50 flex justify-end space-x-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg">{t("Cancel")}</button>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">{t("Create Order")}</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- REUSABLE SUB-COMPONENTS ---
const NavButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      active ? 'bg-blue-50 text-blue-700 font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const MetricCard = ({ title, value, trend, trendUp, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full bg-${color}-50`}>
         {icon}
      </div>
    </div>
    <div className="flex items-center text-sm">
      <span className={`font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>{trend}</span>
      <span className="text-gray-400 ml-2">{t("vs last month")}</span>
    </div>
  </div>
);

const UploadItem = ({ name, size, status }: any) => {
  const icon = status === 'success' ? <CheckCircle className="text-green-600" />{t(": status === 'failed' ?")}<XCircle className="text-red-500" />{t(":")}<Clock className="text-yellow-600" />;
  const bg = status === 'success' ? 'bg-green-50 border-green-200' : status === 'failed' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200';
  
  return (
    <div className={`flex items-center justify-between p-4 border rounded-lg ${bg}`}>
       <div className="flex items-center space-x-3">
          {icon}
          <div>
             <p className="font-medium text-sm text-gray-800">{name}</p>
             <p className="text-xs text-gray-500">{size}</p>
          </div>
       </div>
       <button className="text-gray-400 hover:text-gray-700"><Download size={16}/></button>
    </div>
  )
}

const InputGroup = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-1">
     <label className="text-sm font-medium text-gray-700">{label}</label>
     <input type={type} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={placeholder} />
  </div>
)

export default MerchantPortal;
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

type Parcel = {
  trackingId?: string;
  status?: string;
  currentStationId?: string;
  receiverName?: string;
  deliveryAddress?: string;
};

type DriverProfile = {
  displayName?: string;
  phone?: string;
  stationId?: string;
  role?: string;
  active?: boolean;
};

async function findParcel(code: string): Promise<{ id: string; data: Parcel } | null> {
  const direct = await getDoc(doc(db, "parcels", code));
  if (direct.exists()) return { id: direct.id, data: direct.data() as Parcel };

  const q = query(collection(db, "parcels"), where("trackingId", "==", code), limit(1));
  const res = await getDocs(q);
  const d = res.docs[0];
  return d ? { id: d.id, data: d.data() as Parcel } : null;
}

export default function CreateDelivery() {
  const { t } = useI18n();

  const { user, profile, loading } = useAuthProfile();
  const navigate = useNavigate();

  const [code, setCode] = React.useState("");
  const [parcels, setParcels] = React.useState<Array<{ id: string; data: Parcel }>>([]);
  const [drivers, setDrivers] = React.useState<Array<{ uid: string; data: DriverProfile }>>([]);
  const [driverUid, setDriverUid] = React.useState<string>("");

  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      if (!user || !profile?.stationId) return;
      const stationId = profile.stationId;

      const q = query(
        collection(db, "users"),
        where("stationId", "==", stationId),
        where("role", "==", "rider_driver")
      );
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ uid: d.id, data: d.data() as DriverProfile }));
      setDrivers(list.filter((x) => x.data.active !== false));
      if (!driverUid && list.length > 0) setDriverUid(list[0].uid);
    })();
  }, [user, profile?.stationId]);

  const addParcel = async () => {
    setError(null);
    const trimmed = code.trim();
    if (!trimmed) return;

    if (!user) return setError("Login required.");
    if (!profile?.stationId) return setError("Missing stationId in profile.");

    setBusy(true);
    try {
      const found = await findParcel(trimmed);
      if (!found) return setError("Parcel not found.");

      if (found.data.currentStationId && found.data.currentStationId !== profile.stationId) {
        return setError(`Parcel is at station ${found.data.currentStationId}, not ${profile.stationId}.`);
      }

      // must be ready to dispatch (sorted/manifested). adjust if your flow differs.
      if (!["sorted", "manifested"].includes(found.data.status ?? "")) {
        return setError(`Parcel status must be "sorted" or "manifested". Current: ${found.data.status ?? "unknown"}`);
      }

      const tracking = found.data.trackingId ?? found.id;
      if (parcels.some((p) => (p.data.trackingId ?? p.id) === tracking)) return;

      setParcels((p) => [found, ...p]);
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  const removeParcel = (id: string) => setParcels((p) => p.filter((x) => x.id !== id));

  const createDelivery = async () => {
    setError(null);
    if (!user) return setError("Login required.");

    let stationId = "";
    try {
      stationId = requireStation(profile);
    } catch (e: any) {
      return setError(e?.message ?? "Missing stationId.");
    }

    if (!driverUid) return setError("Select a driver.");
    if (parcels.length === 0) return setError("Add at least 1 parcel.");

    setBusy(true);
    try {
      const driver = drivers.find((d) => d.uid === driverUid);
      const deliveryRef = await addDoc(collection(db, "deliveries"), {
        stationId,
        status: "pending", // pending -> active -> completed/failed
        driverUid,
        driverName: driver?.data.displayName ?? "",
        parcelIds: parcels.map((p) => p.id),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.uid,
      });

      // Update parcels with deliveryId and status out_for_delivery
      const b = writeBatch(db);
      parcels.forEach((p) => {
        b.update(doc(db, "parcels", p.id), {
          status: "out_for_delivery",
          deliveryId: deliveryRef.id,
          updatedAt: serverTimestamp(),
        });
      });
      await b.commit();

      navigate(`/ops/deliveries?highlight=${deliveryRef.id}`);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create delivery.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="p-6">{t("Loading…")}</div>;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Create Delivery")}</div>
          <div className="text-sm text-neutral-600">{t("Assign parcels to driver and dispatch.")}</div>
        </div>
        <Link className="text-sm underline" to="/ops/deliveries">
          Back to Deliveries
        </Link>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="rounded-xl border bg-white p-4 shadow-sm grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Parcel tracking ID")}</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            placeholder={t("Scan or enter tracking")}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={addParcel}
            disabled={busy}
            className="w-full rounded-xl border px-4 py-3 font-bold hover:bg-neutral-50 disabled:opacity-60"
          >
            Add parcel
          </button>
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Driver")}</label>
          <select
            value={driverUid}
            onChange={(e) => setDriverUid(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 bg-white"
          >
            <option value="">{t("Select driver")}</option>
            {drivers.map((d) => (
              <option key={d.uid} value={d.uid}>
                {d.data.displayName ?? d.uid} {d.data.phone ? `(${d.data.phone})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Parcels selected: <span className="font-semibold">{parcels.length}</span>
          </div>
          <button
            onClick={createDelivery}
            disabled={busy || parcels.length === 0 || !driverUid}
            className="rounded-xl bg-black px-5 py-3 text-white font-bold disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create Delivery"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b text-sm font-semibold">{t("Selected Parcels")}</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("Tracking")}</th>
                <th className="px-4 py-3">{t("Receiver")}</th>
                <th className="px-4 py-3">{t("Address")}</th>
                <th className="px-4 py-3 w-24">{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {parcels.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-6 text-neutral-600">{t("No parcels added.")}</td></tr>
              ) : (
                parcels.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{p.data.trackingId ?? p.id}</td>
                    <td className="px-4 py-3">{p.data.receiverName ?? "-"}</td>
                    <td className="px-4 py-3">{p.data.deliveryAddress ?? "-"}</td>
                    <td className="px-4 py-3">
                      <button className="text-sm underline" onClick={() => removeParcel(p.id)}>{t("Remove")}</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, updateDoc, doc, where, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

type Delivery = {
  stationId: string;
  status: "pending" | "active" | "completed" | "failed" | "returned" | string;
  driverUid?: string;
  driverName?: string;
  parcelIds?: string[];
  createdAt?: any;
};

export default function Deliveries() {
  const { t } = useI18n();

  const { user, profile, loading } = useAuthProfile();
  const [params] = useSearchParams();
  const highlight = params.get("highlight");

  const [rows, setRows] = React.useState<Array<{ id: string; data: Delivery }>>([]);
  const [status, setStatus] = React.useState<string>("ALL");

  React.useEffect(() => {
    if (!user || !profile) return;
    let stationId = "";
    try { stationId = requireStation(profile); } catch { return; }

    const q = query(
      collection(db, "deliveries"),
      where("stationId", "==", stationId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, data: d.data() as Delivery }));
      setRows(list);
    });
  }, [user, profile]);

  const filtered = rows.filter((r) => status === "ALL" || r.data.status === status);

  const setDeliveryStatus = async (id: string, next: Delivery["status"]) => {
    await updateDoc(doc(db, "deliveries", id), {
      status: next,
      updatedAt: serverTimestamp(),
    });
  };

  if (loading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Deliveries")}</div>
          <div className="text-sm text-neutral-600">{t("Create, monitor, and update delivery jobs.")}</div>
        </div>
        <Link className="rounded-xl bg-black px-4 py-2 text-white font-bold" to="/ops/deliveries/create">
          + Create Delivery
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-neutral-600">
          Station: <span className="font-mono">{profile?.stationId ?? "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold uppercase text-neutral-500">{t("Filter")}</div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border px-3 py-2 bg-white text-sm">
            <option value="ALL">{t("All")}</option>
            <option value="pending">{t("Pending")}</option>
            <option value="active">{t("Active")}</option>
            <option value="completed">{t("Completed")}</option>
            <option value="failed">{t("Failed")}</option>
            <option value="returned">{t("Returned")}</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b text-sm font-semibold">{t("Delivery List")}</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("ID")}</th>
                <th className="px-4 py-3">{t("Driver")}</th>
                <th className="px-4 py-3">{t("Parcels")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
                <th className="px-4 py-3 w-72">{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-neutral-600">{t("No deliveries.")}</td></tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className={`border-t ${highlight === r.id ? "bg-yellow-50" : ""}`}>
                    <td className="px-4 py-3 font-mono">{r.id}</td>
                    <td className="px-4 py-3">{r.data.driverName ?? r.data.driverUid ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.parcelIds?.length ?? 0}</td>
                    <td className="px-4 py-3">{r.data.status}</td>
                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      <button className="rounded-md border px-3 py-1 hover:bg-neutral-50" onClick={() => setDeliveryStatus(r.id, "active")} disabled={r.data.status !== "pending"}>
                        Start
                      </button>
                      <button className="rounded-md border px-3 py-1 hover:bg-neutral-50" onClick={() => setDeliveryStatus(r.id, "completed")} disabled={r.data.status !== "active"}>
                        Complete
                      </button>
                      <button className="rounded-md border px-3 py-1 hover:bg-neutral-50" onClick={() => setDeliveryStatus(r.id, "failed")} disabled={r.data.status === "completed"}>
                        Fail
                      </button>
                      <button className="rounded-md border px-3 py-1 hover:bg-neutral-50" onClick={() => setDeliveryStatus(r.id, "returned")} disabled={r.data.status === "completed"}>
                        Return
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-neutral-500">
        Note: If Firestore requires composite indexes for stationId + createdAt ordering, Firebase console will show the index link.
      </div>
    </div>
  );
}
import React from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

type Delivery = {
  stationId: string;
  status: "pending" | "active" | "completed" | "failed" | "returned" | string;
  driverName?: string;
  driverUid?: string;
  parcelIds?: string[];
  createdAt?: any;
};

function Column({ title, items }: { title: string; items: Array<{ id: string; data: Delivery }> }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b font-semibold text-sm flex justify-between">
        <span>{title}</span>
        <span className="text-xs text-neutral-500">{items.length}</span>
      </div>
      <div className="p-3 space-y-2">
        {items.length === 0 ? (
          <div className="text-sm text-neutral-600">{t("No items.")}</div>
        ) : (
          items.map((d) => (
            <div key={d.id} className="rounded-lg border p-3">
              <div className="font-mono text-xs">{d.id}</div>
              <div className="text-sm font-semibold mt-1">{d.data.driverName ?? d.data.driverUid ?? "-"}</div>
              <div className="text-xs text-neutral-600 mt-1">
                Parcels: {d.data.parcelIds?.length ?? 0}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function DispatchControl() {
  const { t } = useI18n();

  const { user, profile, loading } = useAuthProfile();
  const [rows, setRows] = React.useState<Array<{ id: string; data: Delivery }>>([]);

  React.useEffect(() => {
    if (!user || !profile) return;
    let stationId = "";
    try { stationId = requireStation(profile); } catch { return; }

    const q = query(
      collection(db, "deliveries"),
      where("stationId", "==", stationId),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ id: d.id, data: d.data() as Delivery }))));
  }, [user, profile]);

  if (loading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  const pending = rows.filter((x) => x.data.status === "pending");
  const active = rows.filter((x) => x.data.status === "active");
  const failed = rows.filter((x) => x.data.status === "failed");
  const returned = rows.filter((x) => x.data.status === "returned");
  const completed = rows.filter((x) => x.data.status === "completed");

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="text-2xl font-extrabold">{t("Dispatch Control")}</div>
        <div className="text-sm text-neutral-600">{t("Live dispatch board by job status.")}</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Column title={t("Pending")} items={pending} />
        <Column title={t("Active")} items={active} />
        <Column title={t("Failed")} items={failed} />
        <Column title={t("Returned")} items={returned} />
        <Column title={t("Completed")} items={completed} />
      </div>
    </div>
  );
}
import React from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

type Order = {
  orderNo?: string;
  merchantId?: string;
  status?: string; // created/paid/packed/in_transit/delivered/cancelled etc.
  stationId?: string;
  createdAt?: any;
};

export default function Orders() {
  const { t } = useI18n();

  const { user, profile, loading } = useAuthProfile();
  const [rows, setRows] = React.useState<Array<{ id: string; data: Order }>>([]);
  const [status, setStatus] = React.useState("ALL");

  React.useEffect(() => {
    if (!user || !profile) return;
    let stationId = "";
    try { stationId = requireStation(profile); } catch { return; }

    const q = query(collection(db, "orders"), where("stationId", "==", stationId), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ id: d.id, data: d.data() as Order }))));
  }, [user, profile]);

  if (loading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  const filtered = rows.filter((r) => status === "ALL" || (r.data.status ?? "") === status);

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="text-2xl font-extrabold">{t("Orders")}</div>
        <div className="text-sm text-neutral-600">{t("Shipment orders pipeline (station scope).")}</div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          Station: <span className="font-mono">{profile?.stationId ?? "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold uppercase text-neutral-500">{t("Status")}</div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border px-3 py-2 bg-white text-sm">
            <option value="ALL">{t("All")}</option>
            <option value="created">{t("Created")}</option>
            <option value="in_transit">{t("In transit")}</option>
            <option value="delivered">{t("Delivered")}</option>
            <option value="cancelled">{t("Cancelled")}</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b text-sm font-semibold">{t("Order List")}</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("Order")}</th>
                <th className="px-4 py-3">{t("Merchant")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-6 text-neutral-600">{t("No orders.")}</td></tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{r.data.orderNo ?? r.id}</td>
                    <td className="px-4 py-3 font-mono">{r.data.merchantId ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.status ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { collection, onSnapshot, query, where, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

type Driver = {
  displayName?: string;
  phone?: string;
  stationId?: string;
  role?: string;
  active?: boolean;
  lastSeenAt?: any;
};

export default function Drivers() {
  const { t } = useI18n();

  const { user, profile, loading } = useAuthProfile();
  const [rows, setRows] = React.useState<Array<{ uid: string; data: Driver }>>([]);

  React.useEffect(() => {
    if (!user || !profile) return;
    let stationId = "";
    try { stationId = requireStation(profile); } catch { return; }

    const q = query(collection(db, "users"), where("stationId", "==", stationId), where("role", "==", "rider_driver"));
    return onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ uid: d.id, data: d.data() as Driver }))));
  }, [user, profile]);

  const toggleActive = async (uid: string, active: boolean) => {
    await updateDoc(doc(db, "users", uid), { active, updatedAt: serverTimestamp() });
  };

  if (loading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="text-2xl font-extrabold">{t("Drivers")}</div>
        <div className="text-sm text-neutral-600">{t("Manage driver roster for this station.")}</div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b text-sm font-semibold">{t("Driver List")}</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("Name")}</th>
                <th className="px-4 py-3">{t("Phone")}</th>
                <th className="px-4 py-3">{t("Active")}</th>
                <th className="px-4 py-3 w-40">{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-6 text-neutral-600">{t("No drivers.")}</td></tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.uid} className="border-t">
                    <td className="px-4 py-3 font-semibold">{r.data.displayName ?? r.uid}</td>
                    <td className="px-4 py-3 font-mono">{r.data.phone ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.active === false ? "No" : "Yes"}</td>
                    <td className="px-4 py-3">
                      <button
                        className="rounded-md border px-3 py-1 hover:bg-neutral-50"
                        onClick={() => toggleActive(r.uid, r.data.active === false)}
                      >
                        {r.data.active === false ? "Activate" : "Deactivate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-neutral-500">
        If you need “warehouse helpers” here too, create users with role = <code>{t("warehouse")}</code> and manage them in warehouse module or admin users.
      </div>
    </div>
  );
}
import React from "react";
import { collection, onSnapshot, orderBy, query, where, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

type Parcel = {
  trackingId?: string;
  status?: string;
  currentStationId?: string;
  sortBin?: string;
  routeCode?: string;
  updatedAt?: any;
};

const STATUS_BUCKETS = [
  { key: "inbound_received", label: "Inbound" },
  { key: "sorted", label: "Sorted" },
  { key: "manifested", label: "Manifested" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "return_received", label: "Returns" },
  { key: "transfer_dispatched", label: "Transfers" },
];

export default function WayManagement() {
  const { t } = useI18n();

  const { user, profile, loading } = useAuthProfile();
  const [rows, setRows] = React.useState<Array<{ id: string; data: Parcel }>>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (!user || !profile) return;
    let stationId = "";
    try { stationId = requireStation(profile); } catch { return; }

    const q = query(collection(db, "parcels"), where("currentStationId", "==", stationId), orderBy("trackingId"));
    return onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ id: d.id, data: d.data() as Parcel }))));
  }, [user, profile]);

  const filtered = rows.filter((r) => {
    const t = (r.data.trackingId ?? r.id).toLowerCase();
    return !search.trim() || t.includes(search.trim().toLowerCase());
  });

  const moveTo = async (id: string, status: string) => {
    await updateDoc(doc(db, "parcels", id), { status, updatedAt: serverTimestamp() });
  };

  if (loading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="text-2xl font-extrabold">{t("Way Management")}</div>
        <div className="text-sm text-neutral-600">{t("Operational control of parcel states (station scope).")}</div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <label className="text-xs font-bold uppercase text-neutral-500">{t("Search tracking")}</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
          placeholder={t("Tracking ID")}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {STATUS_BUCKETS.map((b) => {
          const items = filtered.filter((x) => (x.data.status ?? "") === b.key);
          return (
            <div key={b.key} className="rounded-xl border bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b flex justify-between">
                <span className="font-semibold text-sm">{b.label}</span>
                <span className="text-xs text-neutral-500">{items.length}</span>
              </div>
              <div className="p-3 space-y-2">
                {items.length === 0 ? (
                  <div className="text-sm text-neutral-600">{t("No parcels.")}</div>
                ) : (
                  items.map((p) => (
                    <div key={p.id} className="rounded-lg border p-3">
                      <div className="font-mono text-sm">{p.data.trackingId ?? p.id}</div>
                      <div className="text-xs text-neutral-600 mt-1">
                        Bin: {p.data.sortBin ?? "-"} • Route: {p.data.routeCode ?? "-"}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button className="rounded-md border px-3 py-1 text-xs hover:bg-neutral-50" onClick={() => moveTo(p.id, "sorted")}>
                          → Sorted
                        </button>
                        <button className="rounded-md border px-3 py-1 text-xs hover:bg-neutral-50" onClick={() => moveTo(p.id, "manifested")}>
                          → Manifested
                        </button>
                        <button className="rounded-md border px-3 py-1 text-xs hover:bg-neutral-50" onClick={() => moveTo(p.id, "out_for_delivery")}>
                          → Out
                        </button>
                        <button className="rounded-md border px-3 py-1 text-xs hover:bg-neutral-50" onClick={() => moveTo(p.id, "return_received")}>
                          → Return
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-neutral-500">
        For strict control, hide the “move buttons” for roles below Supervisor and enforce server-side rules in Firestore security rules.
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

function Stat({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="mt-2 text-3xl font-extrabold">{loading ? "…" : value}</div>
    </div>
  );
}

export default function OpsDashboard() {
  const { t } = useI18n();

  const { user, profile, loading: authLoading } = useAuthProfile();
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    pendingDeliveries: 0,
    activeDeliveries: 0,
    failedDeliveries: 0,
    parcelsInbound: 0,
    parcelsManifested: 0,
    parcelsOutForDelivery: 0,
    returns: 0,
    drivers: 0,
  });

  React.useEffect(() => {
    let alive = true;

    (async () => {
      if (authLoading) return;
      if (!user) return;

      let stationId = "";
      try {
        stationId = requireStation(profile);
      } catch {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [
          pendingDeliveries,
          activeDeliveries,
          failedDeliveries,
          parcelsInbound,
          parcelsManifested,
          parcelsOutForDelivery,
          returns,
          drivers,
        ] = await Promise.all([
          getCountFromServer(query(collection(db, "deliveries"), where("stationId", "==", stationId), where("status", "==", "pending"))),
          getCountFromServer(query(collection(db, "deliveries"), where("stationId", "==", stationId), where("status", "==", "active"))),
          getCountFromServer(query(collection(db, "deliveries"), where("stationId", "==", stationId), where("status", "==", "failed"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "inbound_received"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "manifested"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "out_for_delivery"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "return_received"))),
          getCountFromServer(query(collection(db, "users"), where("stationId", "==", stationId), where("role", "==", "rider_driver"))),
        ]);

        if (!alive) return;
        setStats({
          pendingDeliveries: pendingDeliveries.data().count,
          activeDeliveries: activeDeliveries.data().count,
          failedDeliveries: failedDeliveries.data().count,
          parcelsInbound: parcelsInbound.data().count,
          parcelsManifested: parcelsManifested.data().count,
          parcelsOutForDelivery: parcelsOutForDelivery.data().count,
          returns: returns.data().count,
          drivers: drivers.data().count,
        });
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [authLoading, user, profile]);

  if (authLoading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-2xl font-extrabold">{t("Ops Dashboard")}</div>
        <div className="text-sm text-neutral-600">
          Station: <span className="font-mono">{profile?.stationId ?? "N/A"}</span> • Role:{" "}
          <span className="font-semibold">{profile?.role ?? "unknown"}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label={t("Pending deliveries")} value={stats.pendingDeliveries} loading={loading} />
        <Stat label={t("Active deliveries")} value={stats.activeDeliveries} loading={loading} />
        <Stat label={t("Failed deliveries")} value={stats.failedDeliveries} loading={loading} />
        <Stat label={t("Drivers")} value={stats.drivers} loading={loading} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label={t("Inbound parcels")} value={stats.parcelsInbound} loading={loading} />
        <Stat label={t("Manifested")} value={stats.parcelsManifested} loading={loading} />
        <Stat label={t("Out for delivery")} value={stats.parcelsOutForDelivery} loading={loading} />
        <Stat label={t("Returns")} value={stats.returns} loading={loading} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md" to="/ops/deliveries/create">
          <div className="font-semibold">{t("Create Delivery")}</div>
          <div className="text-sm text-neutral-600">{t("Assign parcels to a driver and dispatch.")}</div>
        </Link>

        <Link className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md" to="/ops/dispatch">
          <div className="font-semibold">{t("Dispatch Control")}</div>
          <div className="text-sm text-neutral-600">{t("Live board: pending/active/failed/return.")}</div>
        </Link>

        <Link className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md" to="/ops/way">
          <div className="font-semibold">{t("Way Management")}</div>
          <div className="text-sm text-neutral-600">{t("Parcel movement oversight & exceptions.")}</div>
        </Link>
      </div>
    </div>
  );
}
<!-- =========================================================
     File: public/assets/britium-theme.css
     Shared theme for index.html / services.html / quote.html / contact.html
     ========================================================= -->
<style>
:root{
  --brand-blue:#0d2c54;
  --brand-blue-2:#123d73;
  --brand-orange:#ff6b00;
  --bg:#f8f9fa;
  --surface:#ffffff;
  --text:#1f2937;
  --muted:#6b7280;
  --border:rgba(15,23,42,.12);
  --shadow-sm:0 10px 26px rgba(2,6,23,.10);
  --shadow-md:0 18px 46px rgba(2,6,23,.14);
  --radius:16px;
}

html{scroll-behavior:smooth}
body{
  font-family:Roboto,system-ui,-apple-system,Segoe UI,Arial,sans-serif;
  background:
    radial-gradient(900px 420px at 20% -10%, rgba(255,107,0,.14), transparent 60%),
    radial-gradient(900px 420px at 80% 0%, rgba(13,44,84,.14), transparent 55%),
    var(--bg);
  color:var(--text);
}
::selection{background:rgba(255,107,0,.22)}

a{text-decoration:none}
.small-muted{color:var(--muted);font-size:.92rem}

.top-bar{
  background:linear-gradient(90deg,var(--brand-blue),var(--brand-blue-2));
  color:#fff;
  padding:10px 0;
  font-size:.92rem;
}
.top-bar a{color:#fff;opacity:.9}
.top-bar a:hover{opacity:1}

.navbar{
  background:rgba(255,255,255,.92)!important;
  backdrop-filter:blur(10px);
  border-bottom:1px solid rgba(15,23,42,.06);
  box-shadow:0 10px 30px rgba(15,23,42,.06);
}
.navbar-brand{
  font-weight:900;
  letter-spacing:.04em;
  color:var(--brand-blue)!important;
  text-transform:uppercase;
  display:flex;
  align-items:center;
  gap:10px;
}
.brand-logo{
  width:44px;height:44px;
  border-radius:12px;
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  box-shadow:0 12px 26px rgba(2,6,23,.12);
  object-fit:contain;
  padding:4px;
}
.nav-link{
  font-weight:800;
  color:rgba(31,41,55,.86)!important;
  text-transform:uppercase;
  font-size:.88rem;
  margin-left:12px;
}
.nav-link:hover{color:var(--brand-orange)!important}
.nav-link.active{color:var(--brand-orange)!important}

.btn-portal{
  border:2px solid var(--brand-blue);
  color:var(--brand-blue);
  font-weight:900;
  padding:10px 18px;
  border-radius:999px;
  background:rgba(255,255,255,.75);
  transition:transform .16s ease, box-shadow .16s ease, background .16s ease, color .16s ease;
}
.btn-portal:hover{
  background:var(--brand-blue);
  color:#fff;
  transform:translateY(-1px);
  box-shadow:var(--shadow-sm);
}

.btn-accent{
  background:linear-gradient(135deg,var(--brand-orange),#ff9a57);
  color:#fff;
  font-weight:900;
  border:0;
  border-radius:999px;
  padding:10px 18px;
  box-shadow:0 14px 32px rgba(255,107,0,.22);
  transition:transform .16s ease, filter .16s ease, box-shadow .16s ease;
}
.btn-accent:hover{transform:translateY(-1px);filter:brightness(1.03)}
.btn-accent:active{transform:translateY(0)}

.hero{
  position:relative;
  overflow:hidden;
  padding:80px 0 60px;
  background:linear-gradient(135deg,rgba(13,44,84,.96),rgba(18,61,115,.96));
  color:#fff;
}
.hero::before{
  content:"";
  position:absolute;
  inset:-80px;
  background:
    radial-gradient(600px 300px at 20% 10%, rgba(255,107,0,.35), transparent 60%),
    radial-gradient(700px 360px at 85% 20%, rgba(255,255,255,.10), transparent 60%);
  pointer-events:none;
}
.hero *{position:relative;z-index:1}
.hero h1{font-weight:900;letter-spacing:-.02em}
.hero p{color:rgba(255,255,255,.82)}
.hero-card{
  background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.18);
  border-radius:24px;
  padding:18px;
}

.section-title{
  font-weight:900;
  color:var(--brand-blue);
}
.section-sub{color:var(--muted)}

.surface{
  background:rgba(255,255,255,.92);
  border:1px solid rgba(15,23,42,.08);
  border-radius:24px;
  box-shadow:var(--shadow-md);
}

.service-card{
  border:1px solid rgba(15,23,42,.08);
  border-radius:18px;
  overflow:hidden;
  background:#fff;
  box-shadow:var(--shadow-sm);
  transition:transform .2s ease, box-shadow .2s ease;
  height:100%;
}
.service-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md)}
.service-icon{
  width:58px;height:58px;
  border-radius:999px;
  background:var(--brand-orange);
  display:flex;align-items:center;justify-content:center;
  color:#fff;
  border:6px solid #fff;
  margin-top:-34px;
  box-shadow:0 12px 26px rgba(255,107,0,.22);
}
.service-img{height:200px;width:100%;object-fit:cover}

.form-label{font-weight:800;color:var(--brand-blue)}
.form-control,.form-select{
  padding:12px;
  border:1px solid rgba(15,23,42,.14);
  border-radius:12px;
}
.form-control:focus,.form-select:focus{
  border-color:rgba(255,107,0,.8);
  box-shadow:0 0 0 .25rem rgba(255,107,0,.16);
}

.price-display,.calc-result{
  background:linear-gradient(135deg,#e3f2fd,#f8f9fa);
  border:2px dashed rgba(13,44,84,.55);
  padding:26px;
  text-align:center;
  border-radius:18px;
}
.calc-result{display:none}
.result-value{font-size:1.5rem;font-weight:900;color:var(--brand-blue)}

.info-card{
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  border-radius:18px;
  box-shadow:var(--shadow-sm);
  padding:26px;
  height:100%;
}
.info-icon{
  width:54px;height:54px;border-radius:16px;
  background:rgba(255,107,0,.14);
  display:flex;align-items:center;justify-content:center;
  color:var(--brand-orange);
  font-size:22px;
  margin-bottom:14px;
}
.form-box{
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  border-radius:22px;
  box-shadow:var(--shadow-sm);
  padding:26px;
}
.branch-item{
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  border-radius:18px;
  box-shadow:var(--shadow-sm);
  padding:16px;
  display:flex;
  gap:14px;
  margin-bottom:12px;
}
.branch-icon{
  width:44px;height:44px;border-radius:14px;
  background:rgba(13,44,84,.10);
  display:flex;align-items:center;justify-content:center;
  color:var(--brand-blue);
  flex:0 0 auto;
}

footer{
  background:#0b1220;
  color:#b7c0d1;
  padding:70px 0 28px;
  margin-top:40px;
}
footer h5{color:#fff;font-weight:800;margin-bottom:18px}
footer a{color:#b7c0d1}
footer a:hover{color:#fff}

.float-wa{
  position:fixed;right:18px;bottom:18px;z-index:9999;
  width:56px;height:56px;border-radius:999px;
  display:flex;align-items:center;justify-content:center;
  background:#25d366;color:#fff;
  box-shadow:0 18px 40px rgba(37,211,102,.35);
  transition:transform .16s ease, filter .16s ease;
}
.float-wa:hover{transform:translateY(-2px);filter:brightness(1.03)}

@media (max-width:576px){
  .hero{padding:64px 0 44px}
  .brand-logo{width:40px;height:40px}
}
</style>

<!-- =========================================================
     File: public/assets/britium-public.js
     Shared JS for both calculators + smooth section nav
     ========================================================= -->
<script>
(function () {
  function $(id){ return document.getElementById(id); }

  // Domestic (quote.html) logic (same as your draft, just renamed)
  window.beToggleTownships = function () {
    const region = $("destinationRegion").value;
    const yangonSelect = $("yangonTownship");

    if (region === "yangon") {
      yangonSelect.disabled = false;
      $("resultPrice").innerText = "-- MMK";
      $("resultTime").innerHTML = "Select a Township";
      return;
    }

    yangonSelect.disabled = true;
    yangonSelect.value = "";
    if (region === "mandalay") {
      $("resultPrice").innerText = "3,000 MMK";
      $("resultTime").innerText = "Standard Rate (Base)";
    } else {
      $("resultPrice").innerText = "Call for Quote";
      $("resultTime").innerText = "Remote Area";
    }
  };

  window.beCalculateDomesticRate = function () {
    const region = $("destinationRegion").value;
    if (region !== "yangon") return;

    const townshipSelect = $("yangonTownship");
    const weight = parseFloat($("weight").value) || 0;
    const baseRate = parseInt(townshipSelect.value, 10);

    if (Number.isNaN(baseRate)) {
      $("resultPrice").innerText = "-- MMK";
      $("resultTime").innerText = "Select a Township";
      return;
    }

    let extraWeightCost = 0;
    if (weight > 1) extraWeightCost = (weight - 1) * 500;

    const total = baseRate + extraWeightCost;
    $("resultPrice").innerText = total.toLocaleString() + " MMK";
    $("resultTime").innerHTML = '<i class="fas fa-motorcycle me-1"></i> Delivery: 1-2 Days';
  };

  // International (services.html) logic (same as your draft, just renamed)
  window.beCalculateIntlRate = function (event) {
    event.preventDefault();

    const rate = parseFloat($("calcDest").value);
    const weight = parseFloat($("calcWeight").value);
    const l = parseFloat($("calcL").value);
    const w = parseFloat($("calcW").value);
    const h = parseFloat($("calcH").value);
    const divisor = parseFloat($("calcDivisor").value);

    if ([rate, weight, l, w, h, divisor].some(Number.isNaN)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const volWeight = (l * w * h) / divisor;
    const chargeable = Math.max(weight, volWeight);
    const totalCost = chargeable * rate;

    $("resActual").innerText = weight.toFixed(2) + " kg";
    $("resVol").innerText = volWeight.toFixed(2) + " kg";
    $("resChargeable").innerText = chargeable.toFixed(2) + " kg";
    $("resTotal").innerText = "$" + totalCost.toFixed(2);
    $("displayDivisor").innerText = divisor;

    const resultBox = $("calcResult");
    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth" });
  };

  // Nice-to-have: highlight active nav on same-page scroll
  function onScrollActive() {
    const links = document.querySelectorAll('a.nav-link[data-section]');
    const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const y = window.scrollY + 120;

    let activeId = null;
    for (const s of sections) {
      if (s.offsetTop <= y) activeId = s.id;
    }
    links.forEach(l => {
      const href = l.getAttribute('href') || "";
      const id = href.startsWith("#") ? href.slice(1) : null;
      l.classList.toggle("active", id && id === activeId);
    });
  }
  window.addEventListener("scroll", onScrollActive, { passive: true });
  window.addEventListener("load", onScrollActive);

})();
</script>
import React, { useState } from 'react';
import { Bell, User, Search, Package, Calendar, CalendarPlus, MessageCircle, Check, Truck, MapPin, Home, FileText } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

const BritiumCustomerTrackingApp = () => {
  const { t } = useI18n();

  const [activeScreen, setActiveScreen] = useState('home');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="bg-gradient-to-br from-[#0D47A1] to-[#1976D2] text-white p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-[#0D47A1] font-bold">{t("B")}</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">{t("Britium Express")}</h1>
                <p className="text-xs text-blue-100">{t("Hello, John Doe")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 hover:bg-white/20 rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              </button>
              <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pb-20">
          {activeScreen === 'home' && (
            <>
              {/* Quick Track */}
              <div className="p-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-blue-600" /> Quick Track
                  </h2>
                  <div className="flex space-x-2">
                    <input type="text" placeholder={t("Enter tracking number")} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={() => setActiveScreen('track')} className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Deliveries */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">{t("Active Deliveries")}</h2>
                  <button className="text-blue-600 text-sm font-medium">{t("View All")}</button>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Package className="w-5 h-5 text-blue-600"/></div>
                        <div><p className="font-semibold text-gray-800">{t("#BE2026001234")}</p><p className="text-sm text-gray-500">{t("Electronics")}</p></div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">{t("Out for Delivery")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{t("Est: Today 3:00 PM")}</span>
                      <button onClick={() => setActiveScreen('track')} className="text-blue-600 font-medium">{t("Track")}</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4">
                 <h2 className="text-lg font-bold text-gray-800 mb-4">{t("Quick Actions")}</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><CalendarPlus className="w-6 h-6 text-blue-600"/></div>
                        <p className="font-semibold text-gray-800">{t("Book Pickup")}</p>
                    </button>
                    <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><MessageCircle className="w-6 h-6 text-green-600"/></div>
                        <p className="font-semibold text-gray-800">{t("Support")}</p>
                    </button>
                 </div>
              </div>
            </>
          )}

          {activeScreen === 'track' && (
            <div className="p-4 animate-in slide-in-from-right">
                <button onClick={() => setActiveScreen('home')} className="mb-4 text-sm text-blue-600 font-medium">{t("&larr; Back to Home")}</button>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Package className="w-8 h-8 text-blue-600"/></div>
                        <h2 className="text-xl font-bold text-gray-800">{t("#BE2026001234")}</h2>
                        <p className="text-gray-500">{t("Electronics Package")}</p>
                    </div>
                     <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex justify-between items-center">
                         <div><p className="font-semibold text-green-800">{t("Out for Delivery")}</p><p className="text-sm text-green-600">{t("Today 3:00 PM")}</p></div>
                         <Truck className="w-6 h-6 text-green-600" />
                     </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-6">{t("Delivery Timeline")}</h3>
                    <div className="space-y-6 relative pl-4 border-l-2 border-gray-200">
                        <div className="relative pl-6">
                             <div className="absolute -left-[21px] top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white"><Check className="w-4 h-4"/></div>
                             <p className="font-semibold text-gray-800">{t("Picked Up")}</p>
                             <p className="text-xs text-gray-400">{t("Today, 9:30 AM")}</p>
                        </div>
                        <div className="relative pl-6">
                             <div className="absolute -left-[21px] top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white animate-pulse"><Truck className="w-4 h-4"/></div>
                             <p className="font-semibold text-gray-800">{t("Out for Delivery")}</p>
                             <p className="text-sm text-gray-500">{t("Rider Aung Kyaw is on the way")}</p>
                             <p className="text-xs text-gray-400">{t("Today, 2:00 PM")}</p>
                        </div>
                        <div className="relative pl-6">
                             <div className="absolute -left-[21px] top-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 border-4 border-white"><Home className="w-4 h-4"/></div>
                             <p className="font-semibold text-gray-400">{t("Delivered")}</p>
                             <p className="text-xs text-gray-400">{t("Expected 3:00 PM")}</p>
                        </div>
                    </div>
                </div>
            </div>
          )}
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 p-4 flex justify-around items-center">
            <button onClick={() => setActiveScreen('home')} className={`flex flex-col items-center ${activeScreen === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">{t("Home")}</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
                <Search className="w-6 h-6" />
                <span className="text-xs mt-1">{t("Track")}</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
                <FileText className="w-6 h-6" />
                <span className="text-xs mt-1">{t("History")}</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">{t("Profile")}</span>
            </button>
        </nav>
      </div>
    </div>
  );
};

export default BritiumCustomerTrackingApp;
/* =========================================================
   File: src/pages/public/Calculator.tsx   (adjust path if needed)
   - Completed Domestic + International calculator
   - Adds Britium Express logo at top
   - Domestic follows quote.html rule (Yangon township base + extra weight)
   - International follows services.html rule (chargeable weight: max(actual, volumetric))
   - Uses Supabase pricing_international; falls back if DB missing fields
   ========================================================= */

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plane, Truck, Info } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Mode = "domestic" | "international";

type YangonZone = { zone: string; townships: { name: string; baseRateMmk: number }[] };

type IntlRateRow = Record<string, unknown>;

type IntlRateOption = {
  key: string;
  country: string;
  usdPerKg: number;
};

const BRAND = {
  name: "Britium Express",
  logoSrc: "/britium-logo-512.png", // put in /public
  colors: {
    blue: "#0d2c54",
    orange: "#ff6b00",
  },
};

const YANGON_TOWNSHIPS: YangonZone[] = [
  {
    zone: "Zone 1 - Downtown & Inner City",
    townships: [
      { name: "Ahlone", baseRateMmk: 3000 },
      { name: "Bahan", baseRateMmk: 3000 },
      { name: "Botahtaung", baseRateMmk: 3000 },
      { name: "Dagon", baseRateMmk: 3000 },
      { name: "Dawbon", baseRateMmk: 3000 },
      { name: "Hlaing", baseRateMmk: 3000 },
      { name: "Insein", baseRateMmk: 3000 },
      { name: "Kamaryut", baseRateMmk: 3000 },
      { name: "Kyauktada", baseRateMmk: 3000 },
      { name: "Kyimyindaing", baseRateMmk: 3000 },
      { name: "Lanmataw", baseRateMmk: 3000 },
      { name: "Latha", baseRateMmk: 3000 },
      { name: "Mayangone", baseRateMmk: 3000 },
      { name: "Mingalar Taung Nyunt", baseRateMmk: 3000 },
      { name: "North Okkalapa", baseRateMmk: 3000 },
      { name: "Pabedan", baseRateMmk: 3000 },
      { name: "Pazundaung", baseRateMmk: 3000 },
      { name: "Sanchaung", baseRateMmk: 3000 },
      { name: "South Oakkalapa", baseRateMmk: 3000 },
      { name: "Tamwe", baseRateMmk: 3000 },
      { name: "Thaketa", baseRateMmk: 3000 },
      { name: "Thingangyun", baseRateMmk: 3000 },
      { name: "Yankin", baseRateMmk: 3000 },
    ],
  },
  {
    zone: "Zone 2 - Outer City",
    townships: [
      { name: "Dagon Seikken", baseRateMmk: 3500 },
      { name: "East Dagon", baseRateMmk: 3500 },
      { name: "Hlaing Thar Yar", baseRateMmk: 3500 },
      { name: "Mingalar Don", baseRateMmk: 3500 },
      { name: "North Dagon", baseRateMmk: 3500 },
      { name: "Shwe Paukkan", baseRateMmk: 3500 },
      { name: "Shwe Pyi Thar", baseRateMmk: 3500 },
      { name: "South Dagon", baseRateMmk: 3500 },
    ],
  },
  {
    zone: "Zone 3 - Periphery",
    townships: [
      { name: "Htauk Kyant", baseRateMmk: 4500 },
      { name: "Hlegu", baseRateMmk: 4500 },
      { name: "Hmawbi", baseRateMmk: 4500 },
      { name: "Lay Daung Kan", baseRateMmk: 4500 },
      { name: "Thanlyin", baseRateMmk: 4500 },
    ],
  },
];

const FALLBACK_INTL_RATES: IntlRateOption[] = [
  { key: "usa", country: "United States (USA)", usdPerKg: 18.5 },
  { key: "sg", country: "Singapore", usdPerKg: 4.5 },
  { key: "th", country: "Thailand (BKK)", usdPerKg: 3.0 },
  { key: "uk", country: "United Kingdom (UK)", usdPerKg: 15.0 },
  { key: "my", country: "Malaysia", usdPerKg: 5.5 },
  { key: "jp", country: "Japan", usdPerKg: 12.0 },
];

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function parseUsdPerKg(row: IntlRateRow): number | null {
  const candidates = [
    row.rate_usd_per_kg,
    row.usd_per_kg,
    row.rate_per_kg,
    row.rate,
    row.base_rate_5_10kg, // your existing code used this
  ];
  for (const c of candidates) {
    const n = num(c);
    if (n !== null && n > 0) return n;
  }
  return null;
}

function clampNonNeg(n: number): number {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export const ShippingCalculator = () => {
  const [mode, setMode] = useState<Mode>("domestic");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border overflow-hidden flex items-center justify-center">
            <img
              src={BRAND.logoSrc}
              alt="Britium Express Delivery Service"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#0d2c54]">{t("Shipping Rate Calculator")}</h2>
            <p className="text-gray-600">
              Domestic (Yangon) + International (Chargeable Weight) estimator.
            </p>
          </div>
        </div>

        <Card className="shadow-lg border-t-4 border-t-[#0d2c54] rounded-2xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#0d2c54] font-extrabold">{t("Calculate your shipping")}</CardTitle>

            <Tabs defaultValue="domestic" className="w-full mt-4" onValueChange={(v) => setMode(v as Mode)}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="domestic" className="font-extrabold">
                  <Truck className="mr-2 h-4 w-4" /> Domestic
                </TabsTrigger>
                <TabsTrigger value="international" className="font-extrabold">
                  <Plane className="mr-2 h-4 w-4" /> International
                </TabsTrigger>
              </TabsList>

              <TabsContent value="domestic" className="pt-6">
                <DomesticCalculator />
              </TabsContent>

              <TabsContent value="international" className="pt-6">
                <InternationalCalculator />
              </TabsContent>
            </Tabs>

            {mode === "domestic" ? (
              <div className="mt-4 flex items-start gap-2 text-xs text-gray-600 bg-white border rounded-xl p-3">
                <Info className="w-4 h-4 mt-0.5 text-[#ff6b00]" />
                <div>
                  Domestic calculator is completed for <b>{t("Yangon Township")}</b> pricing table.
                  For other regions, you can add tables later or show “contact support”.
                </div>
              </div>
            ) : null}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

function DomesticCalculator() {
  const { t } = useI18n();

  const [region, setRegion] = useState<"yangon" | "mandalay" | "other">("yangon");
  const [township, setTownship] = useState<string>("");
  const [baseRate, setBaseRate] = useState<number | null>(null);
  const [weightKg, setWeightKg] = useState<number>(0);

  const extraKg = useMemo(() => {
    const w = clampNonNeg(weightKg);
    if (w <= 1) return 0;
    return Math.ceil(w - 1); // why: matches “per kg or part thereof” common courier rule
  }, [weightKg]);

  const totalMmk = useMemo(() => {
    if (region !== "yangon" || baseRate === null) return null;
    const total = baseRate + extraKg * 500;
    return Math.round(total);
  }, [region, baseRate, extraKg]);

  return (
    <div className="p-4 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Destination Region")}</label>
          <select
            className="w-full p-3 border rounded-xl bg-white"
            value={region}
            onChange={(e) => {
              const v = e.target.value as "yangon" | "mandalay" | "other";
              setRegion(v);
              setTownship("");
              setBaseRate(null);
            }}
          >
            <option value="yangon">{t("Yangon City")}</option>
            <option value="mandalay">{t("Mandalay Region")}</option>
            <option value="other">{t("Other States/Regions")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Weight (kg)")}</label>
          <input
            type="number"
            min={0}
            step={0.1}
            placeholder={t("e.g. 1.5")}
            className="w-full p-3 border rounded-xl bg-white"
            value={Number.isFinite(weightKg) ? weightKg : 0}
            onChange={(e) => setWeightKg(Number(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">{t("First 1kg included. +500 MMK per extra kg (rounded up).")}</p>
        </div>

        {region === "yangon" ? (
          <div className="md:col-span-2">
            <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Select Township")}</label>
            <select
              className="w-full p-3 border rounded-xl bg-white"
              value={township}
              onChange={(e) => {
                const v = e.target.value;
                setTownship(v);
                const rate = Number(e.target.selectedOptions[0]?.getAttribute("data-rate") ?? "");
                setBaseRate(Number.isFinite(rate) ? rate : null);
              }}
            >
              <option value="" disabled>
                -- Select Area --
              </option>
              {YANGON_TOWNSHIPS.map((z) => (
                <optgroup key={z.zone} label={z.zone}>
                  {z.townships.map((t) => (
                    <option key={t.name} value={t.name} data-rate={t.baseRateMmk}>
                      {t.name} — {t.baseRateMmk.toLocaleString()} MMK
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        ) : (
          <div className="md:col-span-2 bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl">
            Rates for this region are not configured here yet. Please contact Britium Express support for a manual quote.
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
        <p className="text-xs text-gray-500 uppercase font-extrabold">{t("Estimated Cost")}</p>
        <h3 className="text-4xl font-extrabold text-[#0d2c54] my-2">
          {totalMmk === null ? "-- MMK" : `${totalMmk.toLocaleString()} MMK`}
        </h3>
        <p className="text-xs text-gray-600">
          {totalMmk === null
            ? "Select Yangon township to calculate."
            : `Base: ${baseRate?.toLocaleString()} MMK • Extra: ${extraKg} kg × 500 MMK`}
        </p>
      </div>
    </div>
  );
}

function InternationalCalculator() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<IntlRateRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<string>("");
  const [weightKg, setWeightKg] = useState<number>(0);
  const [dims, setDims] = useState({ l: 0, w: 0, h: 0 });
  const [divisor, setDivisor] = useState<5000 | 6000>(5000);

  const [result, setResult] = useState<null | {
    usdPerKg: number;
    actual: number;
    volumetric: number;
    chargeable: number;
    totalUsd: number;
  }>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: supaErr } = await supabase.from("pricing_international").select("*");
        if (supaErr) throw supaErr;
        if (alive && Array.isArray(data)) setRows(data as IntlRateRow[]);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Failed to load rates.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const options: IntlRateOption[] = useMemo(() => {
    const fromDb = rows
      .map((r) => {
        const country = String((r as any).country_name ?? (r as any).country ?? "").trim();
        const usdPerKg = parseUsdPerKg(r);
        if (!country || !usdPerKg) return null;
        return { key: country, country, usdPerKg };
      })
      .filter(Boolean) as IntlRateOption[];

    return fromDb.length > 0 ? fromDb : FALLBACK_INTL_RATES;
  }, [rows]);

  const selectedRate = useMemo(() => {
    return options.find((o) => o.key === selected)?.usdPerKg ?? null;
  }, [options, selected]);

  const canCalc =
    !!selectedRate &&
    clampNonNeg(weightKg) > 0 &&
    clampNonNeg(dims.l) > 0 &&
    clampNonNeg(dims.w) > 0 &&
    clampNonNeg(dims.h) > 0;

  function calculate() {
    if (!selectedRate) return;
    const actual = clampNonNeg(weightKg);
    const vol = (clampNonNeg(dims.l) * clampNonNeg(dims.w) * clampNonNeg(dims.h)) / divisor;
    const chargeable = Math.max(actual, vol);
    const totalUsd = chargeable * selectedRate;

    setResult({
      usdPerKg: selectedRate,
      actual,
      volumetric: vol,
      chargeable,
      totalUsd,
    });
  }

  return (
    <div className="p-4 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Destination Country")}</label>
          <select
            className="w-full p-3 border rounded-xl bg-white"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="" disabled>
              Select Country...
            </option>
            {options.map((o) => (
              <option key={o.key} value={o.key}>
                {o.country} — ${o.usdPerKg.toFixed(2)}/kg
              </option>
            ))}
          </select>
          {loading ? (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading rates...
            </div>
          ) : null}
          {error ? <div className="mt-2 text-xs text-red-600">{error}</div> : null}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Volumetric Divisor")}</label>
          <select
            className="w-full p-3 border rounded-xl bg-white"
            value={divisor}
            onChange={(e) => setDivisor(Number(e.target.value) as 5000 | 6000)}
          >
            <option value={5000}>{t("5000 (Standard Air Cargo)")}</option>
            <option value={6000}>{t("6000 (Light Cargo)")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Actual Weight (kg)")}</label>
          <input
            type="number"
            min={0}
            step={0.1}
            className="w-full p-3 border rounded-xl bg-white"
            value={Number.isFinite(weightKg) ? weightKg : 0}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            placeholder={t("e.g. 2.0")}
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">{t("Dimensions (cm)")}</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              min={0}
              className="p-3 border rounded-xl bg-white"
              placeholder={t("L")}
              value={dims.l || ""}
              onChange={(e) => setDims((d) => ({ ...d, l: Number(e.target.value) }))}
            />
            <input
              type="number"
              min={0}
              className="p-3 border rounded-xl bg-white"
              placeholder={t("W")}
              value={dims.w || ""}
              onChange={(e) => setDims((d) => ({ ...d, w: Number(e.target.value) }))}
            />
            <input
              type="number"
              min={0}
              className="p-3 border rounded-xl bg-white"
              placeholder={t("H")}
              value={dims.h || ""}
              onChange={(e) => setDims((d) => ({ ...d, h: Number(e.target.value) }))}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Volumetric weight = (L × W × H) / {divisor}</p>
        </div>
      </div>

      <button
        onClick={calculate}
        disabled={!canCalc}
        className="w-full bg-[#0d2c54] text-white font-extrabold py-3 rounded-xl hover:bg-blue-950 transition flex justify-center items-center gap-2 disabled:opacity-50"
      >
        Calculate International Rate
      </button>

      {result ? (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div className="text-xs text-gray-500 uppercase font-extrabold">{t("Result")}</div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Box label={t("Actual")} value={`${result.actual.toFixed(2)} kg`} />
            <Box label={t("Volumetric")} value={`${result.volumetric.toFixed(2)} kg`} />
            <Box label={t("Chargeable")} value={`${result.chargeable.toFixed(2)} kg`} />
            <Box label={t("Rate")} value={`$${result.usdPerKg.toFixed(2)}/kg`} />
          </div>

          <div className="mt-5 bg-white border rounded-2xl p-5 text-center">
            <div className="text-xs text-gray-500 uppercase font-extrabold">{t("Estimated Total")}</div>
            <div className="text-4xl font-extrabold text-[#0d2c54] mt-2">${result.totalUsd.toFixed(2)}</div>
            <div className="text-xs text-gray-600 mt-2">
              Chargeable weight is the greater of actual vs volumetric.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-xs text-gray-500 uppercase font-extrabold">{label}</div>
      <div className="mt-1 font-extrabold text-[#0d2c54]">{value}</div>
    </div>
  );
}
import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Clock, Headset, Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

export default function ContactPage() {
  const { t } = useI18n();

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("General Inquiry");
  const [message, setMessage] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [ok, setOk] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setOk(null);
    setErr(null);
    try {
      await addDoc(collection(db, "contact_messages"), {
        name: name.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
        createdAt: serverTimestamp(),
        source: "web",
      });
      setOk("Message sent. We will contact you soon.");
      setName("");
      setPhone("");
      setSubject("General Inquiry");
      setMessage("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to send message.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold">{t("Get in Touch")}</h1>
            <p className="mt-3 text-white/85 text-lg">{t("We are here to assist you with your logistics needs.")}</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { icon: <Headset className="w-5 h-5" />, title: "Call Us", lines: ["+95-9-897447744", "+95-9-897447755"] },
          { icon: <Mail className="w-5 h-5" />, title: "Email Us", lines: ["info@britiumexpress.com", "sales@britiumexpress.com"] },
          { icon: <Clock className="w-5 h-5" />, title: "Operating Hours", lines: ["Mon - Sat: 9:00am - 5:30pm", "Closed on Sundays"] },
        ].map((c) => (
          <Card key={c.title}>
            <div className="p-5">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center">{c.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600 space-y-1">
                {c.lines.map((l) => (
                  <div key={l} className={l.includes("Closed") ? "text-red-600 font-extrabold" : ""}>{l}</div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-6 items-start">
        <Card>
          <div className="p-6">
            <div className="text-2xl font-extrabold text-slate-900">{t("Send us a Message")}</div>
            <div className="text-sm text-slate-600 mt-1">{t("We will respond during operating hours.")}</div>

            {ok ? <div className="mt-4 rounded-xl border bg-green-50 text-green-700 text-sm font-semibold p-3">{ok}</div> : null}
            {err ? <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div> : null}

            <form onSubmit={submit} className="mt-5 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Your Name")}</div>
                  <input className="w-full rounded-xl border px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("U Ba Maung")} />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Phone Number")}</div>
                  <input className="w-full rounded-xl border px-3 py-2 text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("09xxxxxxxxx")} />
                </div>
              </div>

              <div>
                <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Subject")}</div>
                <select className="w-full rounded-xl border px-3 py-2 text-sm" value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option>{t("General Inquiry")}</option>
                  <option>{t("Rate Quotation")}</option>
                  <option>{t("Corporate Partnership")}</option>
                  <option>{t("Report an Issue")}</option>
                </select>
              </div>

              <div>
                <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Message")}</div>
                <textarea className="w-full rounded-xl border px-3 py-2 text-sm" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder={t("How can we help you?")} />
              </div>

              <button type="submit" disabled={busy} className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
                {busy ? "SENDING…" : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="text-2xl font-extrabold text-slate-900">{t("Our Locations")}</div>

          <div className="rounded-3xl overflow-hidden border shadow-soft h-[300px] bg-white">
            <iframe
              title={t("Britium Express Location")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.604245636043!2d96.1951!3d16.8458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUwJzQ0LjkiTiA5NsKwMTEnNDIuNCJF!5e0!3m2!1sen!2smm!4v1620000000000!5m2!1sen!2smm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {[
            { title: "Yangon Head Office", desc: "No. 277, Corner of Anawrahta Road and Bo Moe Gyo St., East Dagon Township.", phone: "09-897447744" },
            { title: "Mandalay Hub", desc: "Serving Upper Myanmar Region.", phone: "09-422299994" },
            { title: "Nay Pyi Taw Hub", desc: "Serving the Capital & Union Territory.", phone: "09-782326699" },
          ].map((b) => (
            <Card key={b.title}>
              <div className="p-5">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border grid place-items-center text-[var(--brand-blue)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{b.title}</div>
                    <div className="text-sm text-slate-600 mt-1">{b.desc}</div>
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--brand-blue)]">
                      <Phone className="w-4 h-4" /> {b.phone}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Plane, HandCoins, ShieldCheck, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

export default function HomePage() {
  const { t } = useI18n();

  const nav = useNavigate();
  const [code, setCode] = React.useState("");

  function quickTrack(e: React.FormEvent) {
    e.preventDefault();
    nav(`/tracking?code=${encodeURIComponent(code.trim())}`);
  }

  return (
    <div className="space-y-10 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative z-10 grid md:grid-cols-[auto,1fr] gap-6 items-center">
            <img
              src="/assets/britium-logo.png"
              alt="Britium Express"
              className="h-28 w-auto rounded-2xl bg-white/95 p-3 shadow-soft"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold">{t("Britium Express")}</h1>
              <p className="mt-3 text-white/85 text-lg max-w-3xl">
                A dedicated delivery arm of Britium Ventures Company Limited — fast, secure, and trackable logistics.
              </p>

              <form onSubmit={quickTrack} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="flex-1 bg-white rounded-2xl p-1 ring-soft">
                  <div className="flex items-center gap-2 px-3">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t("Quick Track: Enter tracking number")}
                      className="w-full py-3 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-2xl px-5 py-3 font-extrabold brand-accent text-white inline-flex items-center justify-center gap-2"
                >
                  Track <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { icon: <Truck className="w-5 h-5" />, title: "Domestic Express", desc: "Same-day Yangon and next-day to major cities.", to: "/quote" },
          { icon: <HandCoins className="w-5 h-5" />, title: "COD for Shops", desc: "Collect cash safely and remit quickly.", to: "/services" },
          { icon: <Plane className="w-5 h-5" />, title: "International Cargo", desc: "Air freight rates and chargeable weight calculator.", to: "/services" },
        ].map((c) => (
          <Card key={c.title}>
            <div className="p-6">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center">{c.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600">{c.desc}</div>
              <button
                onClick={() => nav(c.to)}
                className="mt-4 inline-flex items-center gap-2 font-extrabold text-[var(--brand-blue)] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-6 items-center">
        <img
          src="https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1200&q=80"
          alt="Delivery"
          className="rounded-3xl border shadow-soft object-cover w-full h-[360px]"
        />
        <Card>
          <div className="p-8">
            <div className="text-xs font-extrabold tracking-widest uppercase text-[var(--brand-orange)]">{t("Who we are")}</div>
            <div className="mt-2 text-3xl font-extrabold text-[var(--brand-blue)]">{t("Reliable delivery, built for scale.")}</div>
            <p className="mt-3 text-sm text-slate-600">
              Britium Express provides domestic courier, COD operations, warehousing support, and international forwarding.
              We focus on speed, proof-of-delivery, and friendly customer support.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-green-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">{t("Secure + Trackable")}</div>
                  <div className="text-sm text-slate-600">{t("Shipment statuses, tracking, and clear service terms.")}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">{t("Fast Operations")}</div>
                  <div className="text-sm text-slate-600">{t("Optimized pickup routes and delivery hubs.")}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button onClick={() => nav("/services")} className="rounded-2xl px-5 py-3 font-extrabold brand-gradient text-white">
                Explore Services
              </button>
              <button onClick={() => nav("/contact")} className="rounded-2xl px-5 py-3 font-extrabold bg-white border hover:bg-slate-50">
                Contact Us
              </button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Truck, Plane } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Zone = { label: string; options: Array<{ name: string; price: number }> };

const YANGON_ZONES: Zone[] = [
  {
    label: "Zone 1 - Downtown & Inner City",
    options: [
      { name: "Ahlone", price: 3000 }, { name: "Bahan", price: 3000 }, { name: "Botahtaung", price: 3000 },
      { name: "Dagon", price: 3000 }, { name: "Dawbon", price: 3000 }, { name: "Hlaing", price: 3000 },
      { name: "Insein", price: 3000 }, { name: "Kamaryut", price: 3000 }, { name: "Kyauktada", price: 3000 },
      { name: "Kyimyindaing", price: 3000 }, { name: "Lanmataw", price: 3000 }, { name: "Latha", price: 3000 },
      { name: "Mayangone", price: 3000 }, { name: "Mingalar Taung Nyunt", price: 3000 }, { name: "North Okkalapa", price: 3000 },
      { name: "Pabedan", price: 3000 }, { name: "Pazundaung", price: 3000 }, { name: "Sanchaung", price: 3000 },
      { name: "South Oakkalapa", price: 3000 }, { name: "Tamwe", price: 3000 }, { name: "Thaketa", price: 3000 },
      { name: "Thingangyun", price: 3000 }, { name: "Yankin", price: 3000 },
    ],
  },
  {
    label: "Zone 2 - Outer City",
    options: [
      { name: "Dagon Seikken", price: 3500 }, { name: "East Dagon", price: 3500 }, { name: "Hlaing Thar Yar", price: 3500 },
      { name: "Mingalar Don", price: 3500 }, { name: "North Dagon", price: 3500 }, { name: "Shwe Paukkan", price: 3500 },
      { name: "Shwe Pyi Thar", price: 3500 }, { name: "South Dagon", price: 3500 },
    ],
  },
  {
    label: "Zone 3 - Periphery / Remote Yangon",
    options: [
      { name: "Thilawa", price: 4500 }, { name: "Hlegu", price: 4500 }, { name: "Thanlyin", price: 4500 },
      { name: "Kyauktan", price: 4500 }, { name: "Twante", price: 4500 },
    ],
  },
];

type DomesticRegion = "yangon" | "mandalay" | "other";
type IntlResult = { actual: number; vol: number; chargeable: number; total: number; divisor: number; rate: number };

const DESTS = [
  { label: "United States (USA) - $18.50/kg", rate: 18.5 },
  { label: "Singapore - $4.50/kg", rate: 4.5 },
  { label: "Thailand (BKK) - $3.00/kg", rate: 3.0 },
  { label: "United Kingdom (UK) - $15.00/kg", rate: 15.0 },
  { label: "Malaysia - $5.50/kg", rate: 5.5 },
  { label: "Japan - $12.00/kg", rate: 12.0 },
] as const;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

export default function QuotePage() {
  const { t } = useI18n();

  const [tab, setTab] = React.useState<"domestic" | "international">("domestic");

  const [origin, setOrigin] = React.useState("Yangon");
  const [region, setRegion] = React.useState<DomesticRegion>("yangon");
  const [townshipPrice, setTownshipPrice] = React.useState<number | "">("");
  const [weight, setWeight] = React.useState<number | "">("");

  const domesticTotal = React.useMemo(() => {
    if (region !== "yangon" || townshipPrice === "" || weight === "") return null;
    const base = townshipPrice;
    const extra = Math.max(0, Number(weight) - 1) * 500;
    return Math.round(base + extra);
  }, [region, townshipPrice, weight]);

  const [destRate, setDestRate] = React.useState<number | "">("");
  const [divisor, setDivisor] = React.useState(5000);
  const [iWeight, setIWeight] = React.useState<number | "">("");
  const [l, setL] = React.useState<number | "">("");
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [ires, setIres] = React.useState<IntlResult | null>(null);

  function calcIntl(e: React.FormEvent) {
    e.preventDefault();
    if (destRate === "" || iWeight === "" || l === "" || w === "" || h === "") return;
    const vol = (Number(l) * Number(w) * Number(h)) / divisor;
    const actual = Number(iWeight);
    const chargeable = Math.max(actual, vol);
    const total = chargeable * Number(destRate);
    setIres({ actual, vol, chargeable, total, divisor, rate: Number(destRate) });
  }

  return (
    <div className="space-y-8 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold">{t("Shipping Rate Calculator")}</h1>
            <p className="mt-3 text-white/85 text-lg">{t("Domestic (Yangon) and International (Air Cargo).")}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => setTab("domestic")}
          className={[
            "rounded-2xl border px-4 py-3 text-sm font-extrabold flex items-center gap-2",
            tab === "domestic" ? "bg-white shadow-soft" : "bg-slate-50 hover:bg-white",
          ].join(" ")}
        >
          <Truck className="w-4 h-4 text-[var(--brand-blue)]" /> Domestic (Yangon)
        </button>

        <button
          onClick={() => setTab("international")}
          className={[
            "rounded-2xl border px-4 py-3 text-sm font-extrabold flex items-center gap-2",
            tab === "international" ? "bg-white shadow-soft" : "bg-slate-50 hover:bg-white",
          ].join(" ")}
        >
          <Plane className="w-4 h-4 text-[var(--brand-orange)]" /> International Air Cargo
        </button>
      </div>

      {tab === "domestic" ? (
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <div className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-slate-500" /> Shipment Details
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Origin")}</div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                      <option value="Yangon">{t("Yangon")}</option>
                      <option value="Mandalay">{t("Mandalay")}</option>
                      <option value="Naypyitaw">{t("Nay Pyi Taw")}</option>
                      <option value="Other">{t("Other")}</option>
                    </select>
                    {origin !== "Yangon" ? (
                      <div className="mt-2 text-xs text-amber-700 font-semibold">
                        Rates in this calculator are optimized for Yangon origin. For other origins, please contact Britium Express.
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Destination Region")}</div>
                    <select
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      value={region}
                      onChange={(e) => {
                        const v = e.target.value as DomesticRegion;
                        setRegion(v);
                        setTownshipPrice("");
                      }}
                    >
                      <option value="yangon">{t("Yangon City")}</option>
                      <option value="mandalay">{t("Mandalay Region")}</option>
                      <option value="other">{t("Other States/Regions")}</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Select Township")}</div>
                    <select
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      disabled={region !== "yangon"}
                      value={townshipPrice}
                      onChange={(e) => setTownshipPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    >
                      <option value="" disabled>{t("-- Select Area --")}</option>
                      {YANGON_ZONES.map((z) => (
                        <optgroup key={z.label} label={z.label}>
                          {z.options.map((o) => (
                            <option key={o.name} value={o.price}>{o.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {region !== "yangon" ? (
                      <div className="mt-1 text-xs text-slate-500">
                        For {region === "mandalay" ? "Mandalay" : "Other regions"}, please contact us for pricing.
                      </div>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Weight (KG)")}</div>
                    <input
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      type="number"
                      step="0.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder={t("e.g. 1.0")}
                    />
                    <div className="mt-1 text-xs text-slate-500 italic">{t("*Base rate covers 1st Kg. Additional +500 MMK/Kg.")}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border bg-slate-50 p-5">
                  <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500">{t("Estimated Delivery Cost")}</div>
                  <div className="mt-2 text-4xl font-extrabold text-slate-900">{domesticTotal ? `${domesticTotal.toLocaleString()} MMK` : "-- MMK"}</div>
                  <div className="mt-2 text-sm font-extrabold text-green-700">{region === "yangon" ? "Delivery: 1-2 Days" : "Select Yangon for instant quote"}</div>

                  <div className="my-4 h-px bg-slate-200" />

                  <div className="grid gap-2">
                    <Link to="/login" className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold brand-accent text-white">
                      BOOK NOW
                    </Link>
                    <Link to="/contact" className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold bg-white border hover:bg-slate-50">
                      Ask for Corporate Rates
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-6">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-[var(--brand-blue)]">{t("International Air Cargo Calculator")}</div>
              <div className="mt-2 text-sm text-slate-600">{t("Chargeable weight = max(actual, volumetric).")}</div>
            </div>

            <div className="mt-6 grid lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-3xl border bg-white p-5">
                <form onSubmit={calcIntl} className="space-y-4">
                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Destination")}</div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={destRate} onChange={(e) => setDestRate(e.target.value === "" ? "" : Number(e.target.value))}>
                      <option value="" disabled>{t("Choose Destination...")}</option>
                      {DESTS.map((d) => (
                        <option key={d.label} value={d.rate}>{d.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Volumetric Standard")}</div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={divisor} onChange={(e) => setDivisor(Number(e.target.value))}>
                      <option value={5000}>{t("Standard Air Cargo (5000)")}</option>
                      <option value={6000}>{t("Express / Courier (6000)")}</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Actual Weight (KG)")}</div>
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" type="number" step="0.1" value={iWeight} onChange={(e) => setIWeight(e.target.value === "" ? "" : Number(e.target.value))} />
                  </div>

                  <div>
                    <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500 mb-2">{t("Dimensions (CM)")}</div>
                    <div className="grid grid-cols-3 gap-2">
                      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={l} onChange={(e) => setL(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder={t("L")} />
                      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={w} onChange={(e) => setW(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder={t("W")} />
                      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={h} onChange={(e) => setH(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder={t("H")} />
                    </div>
                  </div>

                  <button type="submit" className="w-full rounded-xl py-3 font-extrabold brand-accent text-white">{t("CALCULATE ESTIMATE")}</button>
                </form>
              </div>

              <div className="rounded-3xl border bg-slate-50 p-5">
                <div className="text-sm font-extrabold text-slate-900 border-b pb-3 text-center">{t("Quote Breakdown")}</div>

                <div className="mt-4 grid md:grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border bg-white p-4">
                    <div className="text-xs font-extrabold text-slate-500 uppercase">{t("Actual")}</div>
                    <div className="mt-2 text-2xl font-extrabold">{ires ? `${ires.actual.toFixed(2)} kg` : "0 kg"}</div>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <div className="text-xs font-extrabold text-slate-500 uppercase">{t("Volumetric")}</div>
                    <div className="mt-2 text-2xl font-extrabold text-[var(--brand-blue)]">{ires ? `${ires.vol.toFixed(2)} kg` : "0 kg"}</div>
                    <div className="mt-1 text-xs text-slate-500 italic">/ {ires?.divisor ?? divisor}</div>
                  </div>

                  <div className="rounded-2xl border bg-red-50 p-4">
                    <div className="text-xs font-extrabold text-red-600 uppercase">{t("Chargeable")}</div>
                    <div className="mt-2 text-3xl font-extrabold text-red-600">{ires ? `${ires.chargeable.toFixed(2)} kg` : "0 kg"}</div>
                  </div>
                </div>

                <div className="my-5 h-px bg-slate-200" />

                <div className="text-center">
                  <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500">{t("Estimated Shipping Cost")}</div>
                  <div className="mt-2 text-5xl font-extrabold text-slate-900">{ires ? `$${ires.total.toFixed(2)}` : "$0.00"}</div>
                  <div className="mt-2 text-xs text-slate-500">{t("* Excludes tax/duties.")}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Truck, MapPin, Calendar, Box, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

const ReceiverTracking = () => {
  const { t } = useI18n();

  const [showReschedule, setShowReschedule] = useState(false);
  
  const events = [
    { status: 'Out for Delivery', time: '10:30 AM', date: 'Today', active: true, desc: 'Rider Kyaw Kyaw is on the way.' },
    { status: 'Arrived at Hub', time: '08:15 AM', date: 'Today', active: false },
    { status: 'Picked Up', time: '04:00 PM', date: 'Yesterday', active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 1. Header Map Placeholder */}
      <div className="h-64 bg-blue-900 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Yangon_map.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent pt-20">
          <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t("Estimated Delivery")}</span>
              <h1 className="text-2xl font-extrabold text-gray-900">{t("Today, 2:00 PM")}</h1>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Truck size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Timeline */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-gray-800 mb-4">{t("Tracking History")}</h2>
        <div className="space-y-6 pl-2 border-l-2 border-gray-200 ml-2">
          {events.map((e, i) => (
            <div key={i} className="relative pl-6">
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${e.active ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-300'}`}></div>
              <h3 className={`font-bold ${e.active ? 'text-green-700' : 'text-gray-700'}`}>{e.status}</h3>
              <p className="text-xs text-gray-400">{e.date} • {e.time}</p>
              {e.desc && <p className="text-sm text-gray-600 mt-1 bg-gray-100 p-2 rounded">{e.desc}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Receiver Actions */}
      <div className="px-6 mt-4">
        <h2 className="font-bold text-gray-800 mb-3">{t("Delivery Preferences")}</h2>
        <div className="grid gap-3">
          <button 
            onClick={() => setShowReschedule(true)}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Calendar size={20}/></div>
              <div className="text-left">
                <span className="block font-bold text-gray-800 text-sm">{t("Reschedule Delivery")}</span>
                <span className="block text-xs text-gray-500">{t("Not home today? Change date.")}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400"/>
          </button>

          <button className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><MapPin size={20}/></div>
              <div className="text-left">
                <span className="block font-bold text-gray-800 text-sm">{t("Redirect Package")}</span>
                <span className="block text-xs text-gray-500">{t("Change delivery address.")}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400"/>
          </button>
          
           <button className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><ShieldCheck size={20}/></div>
              <div className="text-left">
                <span className="block font-bold text-gray-800 text-sm">{t("Leave with Neighbor / Guard")}</span>
                <span className="block text-xs text-gray-500">{t("Safe drop instructions.")}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400"/>
          </button>
        </div>
      </div>

      {/* OTP Reschedule Modal (Mock) */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-96 p-6 rounded-t-2xl sm:rounded-2xl animate-in slide-in-from-bottom">
            <h3 className="font-bold text-lg mb-2">{t("Verify Identity")}</h3>
            <p className="text-sm text-gray-500 mb-4">{t("We will send an OTP to 09****678 to verify you are the owner.")}</p>
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mb-3">{t("Send OTP")}</button>
            <button onClick={() => setShowReschedule(false)} className="w-full text-gray-500 font-bold py-3">{t("Cancel")}</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReceiverTracking;
import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useI18n } from "@/i18n/I18nProvider";

export default function SendParcel() {
  const { t } = useI18n();

  const [fromName, setFromName] = React.useState("");
  const [fromPhone, setFromPhone] = React.useState("");
  const [toName, setToName] = React.useState("");
  const [toPhone, setToPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const ref = await addDoc(collection(db, "shipments"), {
        fromName: fromName.trim(),
        fromPhone: fromPhone.trim(),
        toName: toName.trim(),
        toPhone: toPhone.trim(),
        address: address.trim(),
        note: note.trim(),
        createdAt: serverTimestamp(),
        status: "Created",
      });
      setStatus(`Shipment created: ${ref.id}`);
      setFromName(""); setFromPhone(""); setToName(""); setToPhone(""); setAddress(""); setNote("");
    } catch (e: any) {
      setStatus(e?.message ?? "Failed to create shipment");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto rounded-3xl border bg-white shadow-soft p-6 slide-up">
      <div className="text-2xl font-extrabold text-slate-900">{t("Send a Parcel")}</div>
      <div className="text-sm text-slate-600 mt-1">{t("Create a shipment request (saved to Firestore).")}</div>

      {status ? <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm font-semibold">{status}</div> : null}

      <form onSubmit={submit} className="mt-5 grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="rounded-xl border px-3 py-2 text-sm" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder={t("Sender Name")} />
          <input className="rounded-xl border px-3 py-2 text-sm" value={fromPhone} onChange={(e) => setFromPhone(e.target.value)} placeholder={t("Sender Phone")} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="rounded-xl border px-3 py-2 text-sm" value={toName} onChange={(e) => setToName(e.target.value)} placeholder={t("Receiver Name")} />
          <input className="rounded-xl border px-3 py-2 text-sm" value={toPhone} onChange={(e) => setToPhone(e.target.value)} placeholder={t("Receiver Phone")} />
        </div>
        <input className="rounded-xl border px-3 py-2 text-sm" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("Delivery Address")} />
        <textarea className="rounded-xl border px-3 py-2 text-sm" value={note} onChange={(e) => setNote(e.target.value)} rows={5} placeholder={t("Notes (optional)")} />

        <button disabled={busy} className="rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
          {busy ? "CREATING…" : "CREATE SHIPMENT"}
        </button>
      </form>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Globe, Ruler, Plane, Truck, HandCoins, ShieldCheck, Headphones } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type IntlResult = { actual: number; vol: number; chargeable: number; total: number; divisor: number; rate: number };

const DESTS = [
  { label: "United States (USA) - $18.50/kg", rate: 18.5 },
  { label: "Singapore - $4.50/kg", rate: 4.5 },
  { label: "Thailand (BKK) - $3.00/kg", rate: 3.0 },
  { label: "United Kingdom (UK) - $15.00/kg", rate: 15.0 },
  { label: "Malaysia - $5.50/kg", rate: 5.5 },
  { label: "Japan - $12.00/kg", rate: 12.0 },
] as const;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>;
}

export default function ServicesPage() {
  const { t } = useI18n();

  const [destRate, setDestRate] = React.useState<number | "">("");
  const [divisor, setDivisor] = React.useState(5000);
  const [weight, setWeight] = React.useState<number | "">("");
  const [l, setL] = React.useState<number | "">("");
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [res, setRes] = React.useState<IntlResult | null>(null);

  function calc(e: React.FormEvent) {
    e.preventDefault();
    if (destRate === "" || weight === "" || l === "" || w === "" || h === "") return;
    const vol = (Number(l) * Number(w) * Number(h)) / divisor;
    const actual = Number(weight);
    const chargeable = Math.max(actual, vol);
    const total = chargeable * Number(destRate);
    setRes({ actual, vol, chargeable, total, divisor, rate: Number(destRate) });
  }

  return (
    <div className="space-y-10 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold">{t("Our Logistics Solutions")}</h1>
            <p className="mt-3 text-white/85 text-lg max-w-3xl">{t("Domestic parcels, COD support, and international air cargo.")}</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Domestic Express",
            icon: <Truck className="w-5 h-5" />,
            img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80",
            desc: "Door-to-door delivery connecting Yangon, Mandalay, and Nay Pyi Taw.",
            to: "/quote",
            btn: "Get Domestic Quote",
          },
          {
            title: "COD & E-Commerce",
            icon: <HandCoins className="w-5 h-5" />,
            img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
            desc: "Grow your online shop with Cash on Delivery. Fast remittance and reporting.",
            to: "/contact",
            btn: "Contact Sales",
          },
          {
            title: "International Cargo",
            icon: <Plane className="w-5 h-5" />,
            img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
            desc: "Reliable air freight to Asia, USA, and Europe. Customs support available.",
            to: "/quote",
            btn: "Get Intl Quote",
          },
        ].map((s) => (
          <Card key={s.title} className="overflow-hidden hover:shadow-soft transition-shadow">
            <img src={s.img} className="h-44 w-full object-cover" alt={s.title} />
            <div className="p-5">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center shadow-sm">{s.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{s.title}</div>
              <div className="mt-2 text-sm text-slate-600">{s.desc}</div>
              <div className="mt-4">
                <Link to={s.to} className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold bg-white border hover:bg-slate-50">
                  {s.btn}
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border bg-white shadow-soft p-6 md:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[var(--brand-blue)]">{t("International Air Cargo Calculator")}</h2>
          <p className="mt-2 text-sm text-slate-600">{t("Estimate by Chargeable Weight (Actual vs. Volumetric).")}</p>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6 items-start">
          <Card>
            <div className="p-5">
              <form onSubmit={calc} className="space-y-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Destination Country")}</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-xl border bg-white grid place-items-center text-[var(--brand-blue)]">
                      <Globe className="w-5 h-5" />
                    </div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={destRate} onChange={(e) => setDestRate(e.target.value === "" ? "" : Number(e.target.value))}>
                      <option value="" disabled>{t("Choose Destination...")}</option>
                      {DESTS.map((d) => (
                        <option key={d.label} value={d.rate}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Volumetric Standard")}</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-xl border bg-white grid place-items-center text-slate-500">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={divisor} onChange={(e) => setDivisor(Number(e.target.value))}>
                      <option value={5000}>{t("Standard Air Cargo (5000)")}</option>
                      <option value={6000}>{t("Express / Courier (6000)")}</option>
                    </select>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Formula: (L×W×H)/{divisor}.</div>
                </div>

                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Actual Gross Weight (KG)")}</div>
                  <input className="w-full rounded-xl border px-3 py-2 text-sm" value={weight} onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))} type="number" step="0.1" placeholder={t("e.g. 5.5")} />
                </div>

                <div>
                  <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500 mb-2">{t("Parcel Dimensions (CM)")}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" value={l} onChange={(e) => setL(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder={t("L")} />
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" value={w} onChange={(e) => setW(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder={t("W")} />
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" value={h} onChange={(e) => setH(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder={t("H")} />
                  </div>
                </div>

                <button type="submit" className="w-full rounded-xl py-3 font-extrabold brand-accent text-white">{t("CALCULATE ESTIMATE")}</button>
              </form>
            </div>
          </Card>

          <Card className="bg-slate-50">
            <div className="p-5">
              <div className="text-center font-extrabold text-slate-900 border-b pb-3">{t("Quote Breakdown")}</div>

              <div className="mt-4 grid md:grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-xs font-extrabold text-slate-500 uppercase">{t("Actual Weight")}</div>
                  <div className="mt-2 text-2xl font-extrabold text-slate-900">{res ? `${res.actual.toFixed(2)} kg` : "0 kg"}</div>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-xs font-extrabold text-slate-500 uppercase">{t("Volumetric")}</div>
                  <div className="mt-2 text-2xl font-extrabold text-[var(--brand-blue)]">{res ? `${res.vol.toFixed(2)} kg` : "0 kg"}</div>
                  <div className="mt-1 text-xs text-slate-500 italic">/ {res?.divisor ?? divisor}</div>
                </div>
                <div className="rounded-2xl border bg-red-50 p-4">
                  <div className="text-xs font-extrabold text-red-600 uppercase">{t("Chargeable")}</div>
                  <div className="mt-2 text-3xl font-extrabold text-red-600">{res ? `${res.chargeable.toFixed(2)} kg` : "0 kg"}</div>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-200" />

              <div className="text-center">
                <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500">{t("Estimated Shipping Cost")}</div>
                <div className="mt-2 text-5xl font-extrabold text-slate-900">{res ? `$${res.total.toFixed(2)}` : "$0.00"}</div>
                <div className="mt-2 text-xs text-slate-500">{t("* Prices are estimates and exclude tax/duties.")}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80"
            alt="Warehousing"
            className="rounded-3xl border shadow-soft object-cover w-full h-[320px]"
          />
          <Card>
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-[var(--brand-blue)]">{t("Why Choose Britium?")}</h3>

              <div className="mt-5 grid gap-4">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-green-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{t("Secure Handling")}</div>
                    <div className="text-sm text-slate-600">{t("Careful handling with transparent updates.")}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-700">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{t("Customer Support")}</div>
                    <div className="text-sm text-slate-600">{t("Support for rates, tracking, and claims.")}</div>
                  </div>
                </div>

                <Link to="/contact" className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold brand-gradient text-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { useSearchParams } from "react-router-dom";
import ReceiverTracking from "../../tracking/ReceiverTracking";

export default function TrackingPage() {
  const [params] = useSearchParams();
  const code = params.get("code") ?? "";
  return <ReceiverTracking initialTrackingCode={code} />;
}
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, MessageCircle, Navigation, ChevronLeft, AlertTriangle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IJob } from '@/types/rider';

export default function JobDetailScreen() {
  const { t } = useI18n();
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Mock data - In production, fetch from Firestore
  const job: IJob = {
    id: jobId || "---",
    type: 'delivery',
    customerName: 'Maung Maung',
    phone: '+95912345678',
    address: 'Room 5A, Build 12, Hledan Center, Kamayut Tsp',
    codAmount: 45000,
    slaTime: '14:30',
    notes: 'Doorbell is broken, please call upon arrival.',
    isFragile: true,
    tags: ['COD', 'Express']
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-4 flex items-center shadow-sm border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft /></button>
        <h1 className="font-extrabold text-lg ml-2">{t("Job")} #{job.id}</h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-[#0d2c54]">{job.customerName}</h2>
          <p className="text-gray-500 mt-2 font-medium leading-snug">{job.address}</p>
          
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-green-50 text-green-700 py-3 rounded-2xl font-black flex items-center justify-center gap-2 border border-green-100">
              <Phone size={18} /> {t("Call")}
            </button>
            <button className="flex-1 bg-blue-50 text-[#0d2c54] py-3 rounded-2xl font-black flex items-center justify-center gap-2 border border-blue-100">
              <Navigation size={18} /> {t("Map")}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-4">{t("Shipment Details")}</h3>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-gray-600 font-bold">{t("Collect COD")}</span>
            <span className="font-black text-xl text-red-600">{job.codAmount.toLocaleString()} Ks</span>
          </div>

          {job.isFragile && (
            <div className="mt-4 bg-red-50 p-4 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-black border border-red-100">
              <AlertTriangle size={20} />
              {t("Handle with Care: FRAGILE")}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3">
        <button 
          onClick={() => navigate(`/rider/exception/${job.id}`)}
          className="bg-red-50 text-red-600 px-6 rounded-2xl font-black text-xs uppercase"
        >
          {t("Failed")}
        </button>
        <button 
          onClick={() => navigate(job.type === 'delivery' ? `/rider/delivery-confirm/${job.id}` : `/rider/pickup-confirm/${job.id}`)}
          className="flex-1 bg-[#0d2c54] text-white rounded-2xl font-black py-4 shadow-lg active:scale-95 transition-all"
        >
          {job.type === 'delivery' ? t("CONFIRM DELIVERY") : t("START PICKUP")}
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Map, Package, Truck, Wifi, WifiOff } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IRiderStats } from '@/types/rider';

export default function RiderDashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isOnDuty, setIsOnDuty] = useState<boolean>(false);
  const [stats, setStats] = useState<IRiderStats>({ pending: 12, completed: 5, failed: 1, cod: 45000 });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#0d2c54] text-white p-5 rounded-b-[2rem] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{t("Hello")}, Kyaw Kyaw</h1>
            <p className="text-xs opacity-80">{t("Zone: Downtown-A")}</p>
          </div>
          <button className="p-2 bg-white/10 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0d2c54]"></span>
          </button>
        </div>

        <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi size={18} className="text-green-400"/> : <WifiOff size={18} className="text-red-400"/>}
            <span className="text-sm font-bold">{isOnline ? t("Online") : t("Offline Mode")}</span>
          </div>
          <button 
            onClick={() => setIsOnDuty(!isOnDuty)}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
              isOnDuty ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isOnDuty ? t("ON DUTY") : t("START ROUTE")}
          </button>
        </div>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4 -mt-4">
        <StatCard icon={Package} label={t("Pending Tasks")} value={stats.pending.toString()} color="blue" onClick={() => navigate('/rider/tasks')} />
        <StatCard icon={Truck} label={t("Completed")} value={stats.completed.toString()} color="green" />
        <StatCard label={t("Failed/Return")} value={stats.failed.toString()} color="red" />
        <StatCard label={t("COD On-Hand")} value={`${stats.cod.toLocaleString()} Ks`} color="orange" onClick={() => navigate('/rider/wallet')} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, onClick }: any) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    orange: "text-orange-600 bg-orange-50"
  };
  return (
    <div onClick={onClick} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform">
      {Icon && <Icon className={`mb-2 ${colors[color as keyof typeof colors]}`} size={24} />}
      <span className="text-2xl font-black text-gray-900">{value}</span>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
/**
 * File: src/pages/rider/RiderDashboardPage.tsx
 * Description: Design-compliant Rider portal with task management and status updates.
 */

import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  DataTable, 
  StatCard, 
  Badge, 
  Button 
} from "../../components/ui/SharedComponents";
import { CheckCircle, Navigation, Package } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Assignment = {
  id: string;
  township: string;
  address: string;
  status: "To pick up" | "Out for delivery" | "Completed";
  customer: string;
};

const INITIAL_TASKS: Assignment[] = [
  { id: "BE001247", township: "East Dagon", address: "No. 42, Padonmar St", status: "Out for delivery", customer: "Kyaw Kyaw" },
  { id: "BE001310", township: "Sanchaung", address: "Pyay Road, Junction Square", status: "To pick up", customer: "Zayar" },
  { id: "BE001199", township: "Hlaing", address: "AD Junction", status: "Completed", customer: "Su Su" },
];

export default function RiderDashboardPage() {
  const { t } = useI18n();

  const [tasks, setTasks] = useState<Assignment[]>(INITIAL_TASKS);

  const updateStatus = (id: string, newStatus: Assignment["status"]) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Rider Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title={t("Stops Today")} value="12" hint="3 remaining" tone="blue" />
        <StatCard title={t("Completed")} value="9" hint="Great pace!" tone="green" />
        <StatCard title={t("Daily Earnings")} value="28,500 MMK" hint="Estimated" tone="orange" />
      </div>

      <Card className="shadow-soft overflow-hidden">
        <CardHeader 
          title={t("Daily Assignments")} 
          subtitle={t("Your route for today. Tap the button to update parcel status.")} 
        />
        <CardBody className="p-0">
          <DataTable<Assignment>
            rowKey={(t) => t.id}
            rows={tasks}
            columns={[
              { 
                key: "id", 
                title: "Parcel", 
                render: (t) => (
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-blue-900">{t.id}</span>
                    <span className="text-xs text-slate-500">{t.customer}</span>
                  </div>
                )
              },
              { 
                key: "township", 
                title: "Location", 
                render: (t) => (
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-slate-400" />
                    <span className="text-sm">{t.township}</span>
                  </div>
                )
              },
              { 
                key: "status", 
                title: "Status", 
                render: (t) => {
                  const toneMap: Record<string, "orange" | "blue" | "green"> = {
                    "To pick up": "orange",
                    "Out for delivery": "blue",
                    "Completed": "green",
                  };
                  return <Badge tone={toneMap[t.status]}>{t.status}</Badge>;
                }
              },
              { 
                key: "actions", 
                title: "Update", 
                className: "text-right",
                render: (t) => (
                  <div className="flex justify-end gap-2">
                    {t.status === "Out for delivery" && (
                      <Button 
                        variant="primary" 
                        className="h-8 px-3 text-xs"
                        onClick={() => updateStatus(t.id, "Completed")}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Finish
                      </Button>
                    )}
                    {t.status === "To pick up" && (
                      <Button 
                        variant="secondary" 
                        className="h-8 px-3 text-xs"
                        onClick={() => updateStatus(t.id, "Out for delivery")}
                      >
                        <Package className="w-3 h-3" />
                        Start
                      </Button>
                    )}
                  </div>
                )
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, PenTool, DollarSign, ChevronLeft, Check } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderDeliveryConfirm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [codCollected, setCodCollected] = useState(false);
  const [signature, setSignature] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const canComplete = codCollected && (signature || photo);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-4 shadow-sm flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)}><ChevronLeft /></button>
        <h1 className="font-black text-lg ml-4 uppercase tracking-tight">{t("Confirm Delivery")}</h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-red-700 font-black uppercase text-xs">
              <DollarSign size={18} /> {t("Collect Cash")}
            </div>
            <span className="text-3xl font-black text-red-600">45,000 Ks</span>
          </div>
          
          <button 
            onClick={() => setCodCollected(!codCollected)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              codCollected ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-white border-red-200 text-red-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${codCollected ? 'bg-white border-white' : 'border-red-200'}`}>
              {codCollected && <Check size={16} className="text-red-600" />}
            </div>
            <span className="font-black text-sm uppercase tracking-tight">{t("I have collected the full amount")}</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-black text-[#0d2c54] text-xs uppercase tracking-widest ml-2">{t("Proof of Delivery")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <ProofButton 
              active={signature} 
              icon={PenTool} 
              label={t("SIGNATURE")} 
              onClick={() => setSignature(true)} 
            />
            <ProofButton 
              active={!!photo} 
              icon={Camera} 
              label={t("PHOTO")} 
              onClick={() => setPhoto("demo-photo-path")} 
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button 
          disabled={!canComplete}
          onClick={() => navigate('/rider/dashboard')}
          className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all ${
            canComplete ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {t("COMPLETE DELIVERY")}
        </button>
      </div>
    </div>
  );
}

function ProofButton({ active, icon: Icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`h-36 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${
        active ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-400'
      }`}
    >
      {active ? <Check size={32} /> : <Icon size={32} />}
      <span className="mt-2 text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Camera, X, Check } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderException() {
  const { t } = useI18n();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const reasons = [
    'Customer Unavailable', 'Wrong Address', 'Customer Refused Item', 
    'Shop/Office Closed', 'Cannot Contact', 'Bad Weather'
  ];

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-red-600 flex items-center gap-2 uppercase tracking-tight">
          <AlertTriangle /> {t("Failed Job")}
        </h1>
        <button onClick={() => navigate(-1)} className="bg-white border p-2 rounded-full shadow-sm">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">{t("Select Reason")}</label>
          <div className="grid grid-cols-2 gap-3">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedReason(r)}
                className={`p-4 rounded-2xl text-xs font-black border transition-all ${
                  selectedReason === r 
                    ? 'bg-red-600 text-white border-red-600 shadow-lg scale-[1.02]' 
                    : 'bg-white text-gray-600 border-gray-100'
                }`}
              >
                {t(r)}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">{t("Proof (Optional)")}</label>
          <label className="w-full h-40 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative shadow-sm">
             {photo ? (
               <img src={photo} alt="Proof" className="absolute inset-0 w-full h-full object-cover" />
             ) : (
               <div className="text-gray-400 flex flex-col items-center">
                 <Camera size={32} className="mb-2" />
                 <span className="text-[10px] font-black uppercase">{t("Take Photo")}</span>
               </div>
             )}
             <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files && setPhoto(URL.createObjectURL(e.target.files[0]))} />
          </label>
        </section>

        <button
          disabled={!selectedReason}
          onClick={() => navigate('/rider/dashboard')}
          className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
            selectedReason ? 'bg-red-600 text-white active:scale-95' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {t("SUBMIT REPORT")}
        </button>
      </div>
    </div>
  );
}
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Briefcase } from "lucide-react";

export default function RiderHome() {
  const { t } = useI18n();

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-[3rem] border border-gray-100 bg-white shadow-xl p-10 text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#0d2c54] rounded-[2rem] flex items-center justify-center mx-auto mb-6">
          <Briefcase size={40} />
        </div>
        <h1 className="text-3xl font-black text-[#0d2c54]">{t("Rider Home")}</h1>
        <p className="mt-4 text-gray-500 font-medium leading-relaxed">
          {t("Upcoming assignments, route map, and proof-of-delivery tools will appear here.")}
        </p>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, Scan, CheckCircle, ChevronLeft, Package, Loader2 } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderPickupConfirm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: '101', name: 'Shoe Box (Nike)', scanned: false },
    { id: '102', name: 'Accessory Bag', scanned: false },
  ]);
  const [photoProof, setPhotoProof] = useState<string | null>(null);

  const handleScan = () => {
    const nextIndex = items.findIndex(i => !i.scanned);
    if (nextIndex !== -1) {
      const newItems = [...items];
      newItems[nextIndex].scanned = true;
      setItems(newItems);
    }
  };

  const canSubmit = items.every(i => i.scanned) && photoProof;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)}><ChevronLeft /></button>
        <h1 className="font-black text-lg ml-4">{t("Pickup Verification")}</h1>
      </div>

      <div className="flex-1 p-5 space-y-6">
        <div className="bg-[#0d2c54] text-white rounded-[2rem] p-8 flex flex-col items-center shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-black">{items.filter(i => i.scanned).length} / {items.length}</h2>
            <p className="opacity-60 text-xs font-bold uppercase tracking-widest mt-1">{t("Items Scanned")}</p>
          </div>
          <button 
            onClick={handleScan}
            className="w-full bg-[#ff6b00] hover:bg-[#e66000] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
          >
            <Scan size={24} /> {t("TAP TO SCAN")}
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-black text-[#0d2c54] text-xs uppercase tracking-widest ml-2">{t("Manifest")}</h3>
          {items.map((item) => (
            <div key={item.id} className={`p-5 rounded-2xl border transition-all ${item.scanned ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Package className={item.scanned ? 'text-green-600' : 'text-gray-300'} />
                  <span className={`font-bold ${item.scanned ? 'text-green-900' : 'text-gray-600'}`}>{item.name}</span>
                </div>
                {item.scanned && <CheckCircle className="text-green-500" size={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <button 
          disabled={!canSubmit}
          onClick={() => navigate('/rider/dashboard')}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-md ${
            canSubmit ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {t("CONFIRM PICKUP")}
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck, LogOut, Globe, Phone, ChevronRight, Shield } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderProfile() {
  const { t, locale, setLocale } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-8 flex flex-col items-center border-b border-gray-100 rounded-b-[3rem] shadow-sm">
        <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl mb-4 bg-gray-100">
          <img src="https://ui-avatars.com/api/?name=Kyaw+Kyaw&background=0d2c54&color=fff" alt="Profile" />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54]">Kyaw Kyaw</h1>
        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{t("ID: RIDER-MM-0042")}</p>
      </div>

      <div className="p-6 space-y-4">
        <ProfileSection title={t("Vehicle Details")}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-[#0d2c54] rounded-2xl"><Truck size={20}/></div>
              <div>
                <p className="font-black text-gray-900 text-sm">Honda Click 125i</p>
                <p className="text-[10px] font-bold text-gray-400">YGN-12345</p>
              </div>
            </div>
            <button className="text-[#ff6b00] text-xs font-black uppercase">{t("Edit")}</button>
          </div>
        </ProfileSection>

        <ProfileSection title={t("App Settings")}>
          <button 
            onClick={() => setLocale(locale === 'en' ? 'my' : 'en')}
            className="w-full p-4 flex items-center justify-between border-b border-gray-50"
          >
            <div className="flex items-center gap-4 text-gray-700 font-bold text-sm">
              <Globe size={18} /> {t("Language")}
            </div>
            <span className="text-[10px] font-black uppercase text-[#ff6b00]">
              {locale === 'en' ? 'English' : 'မြန်မာ'}
            </span>
          </button>
        </ProfileSection>

        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-red-50 text-red-600 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border border-red-100 active:scale-95 transition-all"
        >
          <LogOut size={18} /> {t("Log Out")}
        </button>
      </div>
    </div>
  );
}

function ProfileSection({ title, children }: any) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 font-black text-[10px] uppercase text-gray-400 tracking-widest">{title}</div>
      {children}
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { TaskStatus, IJob } from '@/types/rider';

export default function RiderTaskList() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TaskStatus>('delivery');

  // Mock Data - Typically fetched from Firestore based on riderId
  const tasks: IJob[] = [
    { id: 'TX-101', type: 'delivery', customerName: 'John Doe', address: '123 Sule Pagoda Rd', tags: ['COD', 'Express'], slaTime: '14:00', isFragile: false, phone: '', codAmount: 5000 },
    { id: 'TX-205', type: 'pickup', customerName: 'Fashion Hub', address: 'Junction City Lvl 3', tags: ['Urgent'], slaTime: '13:30', isFragile: false, phone: '', codAmount: 0 },
  ];

  const filteredTasks = tasks.filter(task => task.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <h2 className="text-xl font-black text-center mb-4 text-[#0d2c54]">{t("Job Queue")}</h2>
        <div className="flex p-1 bg-gray-100 rounded-2xl">
          {(['pickup', 'delivery', 'return'] as TaskStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-black rounded-xl uppercase transition-all ${
                activeTab === tab ? 'bg-white text-[#0d2c54] shadow-sm' : 'text-gray-400'
              }`}
            >
              {t(tab + "s")}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredTasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => navigate(`/rider/job/${task.id}`)}
            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-black text-[10px] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">#{task.id}</span>
              <div className="flex gap-1">
                {task.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg uppercase">{t(tag)}</span>
                ))}
              </div>
            </div>

            <h3 className="font-black text-gray-900 text-lg">{task.customerName}</h3>
            <div className="flex items-start gap-2 mt-2 text-gray-500">
              <MapPin size={16} className="mt-1 shrink-0 text-[#ff6b00]" />
              <p className="text-sm font-medium leading-tight">{task.address}</p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-1 text-red-500 text-xs font-black">
                <Clock size={14} />
                <span>{t("Due")}: {task.slaTime}</span>
              </div>
              <span className="text-[#0d2c54] text-xs font-black flex items-center gap-1">
                {t("View Details")} {activeTab === 'pickup' ? <ArrowUpCircle size={16}/> : <ArrowDownCircle size={16}/>}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  History 
} from "lucide-react"; // Fixed closed import block
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RiderWallet() {
  const { t } = useI18n();
  // State for MMK balance synchronization
  const [balance] = useState(125000); 

  const transactions = [
    { id: 1, type: 'cod', amount: 45000, date: '2026-02-01', status: 'Settled' },
    { id: 2, type: 'commission', amount: 5000, date: '2026-02-01', status: 'Earned' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d2c54]">{t("My Wallet")} / ကျွန်ုပ်၏ ပိုက်ဆံအိတ်</h1>
        <p className="text-sm text-gray-500">{t("Track your COD collections and earnings.")}</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-[#0d2c54] to-[#1565C0] text-white border-none shadow-xl mb-8">
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium">{t("Current Balance")}</p>
              <h2 className="text-4xl font-black mt-1">
                {balance.toLocaleString()} <span className="text-lg">MMK</span>
              </h2>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" /> {t("Recent History")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* FIXED SYNTAX: Corrected line 82 ternary operator */}
                  <div className={`p-2 rounded-lg ${tx.type === 'cod' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {tx.type === 'cod' ? <DollarSign size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{tx.type === 'cod' ? t("COD Collection") : t("Delivery Commission")}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'cod' ? 'text-red-600' : 'text-green-600'}`}>
                    {tx.type === 'cod' ? '-' : '+'}{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-gray-400">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/auth/AuthContext";
import { User, Globe, Lock, Bell, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserSettings() {
  const { t, locale, setLocale } = useI18n();
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0d2c54] mb-8">{t("Settings")} / ဆက်တင်များ</h1>

      <div className="space-y-6">
        {/* Language Selection */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="text-sm font-bold text-gray-500 flex items-center gap-2">
                <Globe className="h-4 w-4" /> {t("Language Preferences")}
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <button 
                onClick={() => setLocale('en')}
                className={`w-full flex justify-between items-center p-3 rounded-xl border transition-all ${locale === 'en' ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}
              >
                <span className="font-bold">English (US)</span>
                {locale === 'en' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
              </button>
              <button 
                onClick={() => setLocale('my')}
                className={`w-full flex justify-between items-center p-3 rounded-xl border transition-all ${locale === 'my' ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}
              >
                <span className="font-bold">မြန်မာဘာသာ (Unicode)</span>
                {locale === 'my' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-2 rounded-lg text-red-600"><Lock className="h-5 w-5" /></div>
              <div>
                <p className="font-bold text-gray-900">{t("Security")}</p>
                <p className="text-xs text-gray-500">{t("Change password and two-factor auth")}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import { useI18n } from "@/i18n/I18nProvider";

export default function VendorDashboard() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">{t("Vendor Dashboard")}</h2>
        <div className="text-sm text-slate-500">{t("Partner access for integrations and service status.")}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("Integrations")}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{t("1")}</div>
          <div className="mt-1 text-xs text-slate-500">{t("Active partner connection")}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("Orders Today")}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{t("0")}</div>
          <div className="mt-1 text-xs text-slate-500">{t("Awaiting data feed")}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("Status")}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{t("Healthy")}</div>
          <div className="mt-1 text-xs text-slate-500">{t("No incidents")}</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="font-extrabold text-slate-800">{t("Next steps")}</div>
        <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
          <li>{t("Define vendor data scope (what collections/documents vendor can read/write).")}</li>
          <li>{t("Set integration keys and webhook endpoints (z.com private hosting).")}</li>
          <li>{t("Enable server-side KPI aggregation for large datasets.")}</li>
        </ul>
      </Card>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type ParcelStatus =
  | "created"
  | "inbound_received"
  | "sorting"
  | "sorted"
  | "manifested"
  | "out_for_delivery"
  | "delivered"
  | "return_requested"
  | "return_received"
  | "transfer_dispatched"
  | "transfer_arrived"
  | "cancelled";

type Parcel = {
  trackingId?: string;
  status?: ParcelStatus;
  currentStationId?: string;
  currentStationName?: string;
  sortBin?: string;
  manifestId?: string;
  updatedAt?: any;
};

type UserProfile = {
  stationId?: string;
  stationName?: string;
  role?: string;
};

function cn(...p: Array<string | false | null | undefined>) {
  return p.filter(Boolean).join(" ");
}

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

async function findParcelByCode(code: string): Promise<{ id: string; data: Parcel } | null> {
  // 1) Try doc id match
  const direct = await getDoc(doc(db, "parcels", code));
  if (direct.exists()) return { id: direct.id, data: direct.data() as Parcel };

  // 2) Try trackingId field
  const q = query(collection(db, "parcels"), where("trackingId", "==", code), limit(1));
  const res = await getDocs(q);
  const d = res.docs[0];
  if (!d) return null;
  return { id: d.id, data: d.data() as Parcel };
}

async function logWarehouseEvent(input: {
  stationId: string;
  stationName: string;
  parcelId: string;
  trackingId: string;
  type: "SCAN_IN";
  actorUid: string;
}) {
  await addDoc(collection(db, "warehouse_events"), {
    type: input.type,
    stationId: input.stationId,
    stationName: input.stationName,
    parcelId: input.parcelId,
    trackingId: input.trackingId,
    actorUid: input.actorUid,
    createdAt: serverTimestamp(),
  });
}

export default function ScanIn() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [code, setCode] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastScans, setLastScans] = React.useState<
    Array<{ code: string; ok: boolean; message: string; at: number }>
  >([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = code.trim();
    if (!trimmed) return;

    if (!user) {
      setError("Please login first.");
      return;
    }
    if (!stationId) {
      setError("Your profile has no stationId (users/{uid}.stationId).");
      return;
    }

    setBusy(true);
    try {
      const found = await findParcelByCode(trimmed);
      if (!found) {
        setLastScans((s) => [{ code: trimmed, ok: false, message: "Parcel not found", at: Date.now() }, ...s].slice(0, 8));
        setCode("");
        return;
      }

      const next: Partial<Parcel> = {
        status: "inbound_received",
        currentStationId: stationId,
        currentStationName: stationName,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "parcels", found.id), next);

      const trackingId = found.data.trackingId ?? trimmed;
      await logWarehouseEvent({
        stationId,
        stationName,
        parcelId: found.id,
        trackingId,
        type: "SCAN_IN",
        actorUid: user.uid,
      });

      setLastScans((s) =>
        [{ code: trimmed, ok: true, message: `Scanned IN • ${found.id}`, at: Date.now() }, ...s].slice(0, 8)
      );
      setCode("");
    } catch (err: any) {
      setError(err?.message ?? "Scan failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Inbound • Scan In")}</div>
          <div className="text-sm text-neutral-600">
            Receive parcels into <span className="font-semibold">{stationName}</span>
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        {error ? (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={submit} className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">
              Tracking ID / Barcode
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={cn(
                "mt-1 w-full rounded-xl border px-4 py-3 outline-none",
                "focus:ring-2 focus:ring-black/20"
              )}
              placeholder={t("Scan or enter tracking ID")}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-black px-5 py-3 text-white font-bold disabled:opacity-60"
          >
            {busy ? "Scanning…" : "Scan In"}
          </button>
        </form>

        <div className="mt-4 text-xs text-neutral-500">
          Tip: If your parcels use docId = trackingId, Scan In is instant. Otherwise it searches by <code>{t("trackingId")}</code> field.
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">{t("Recent Scans")}</div>
        <div className="mt-3 space-y-2">
          {lastScans.length === 0 ? (
            <div className="text-sm text-neutral-600">{t("No scans yet.")}</div>
          ) : (
            lastScans.map((s, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3 text-sm",
                  s.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                )}
              >
                <div className="font-mono">{s.code}</div>
                <div className="text-neutral-700">{s.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type UserProfile = { stationId?: string; stationName?: string };

type Parcel = {
  trackingId?: string;
  status?: string;
  sortBin?: string;
  routeCode?: string;
  manifestId?: string;
  updatedAt?: any;
};

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

function toCsv(rows: Array<{ id: string; data: Parcel }>) {
  const header = ["trackingId", "status", "sortBin", "routeCode", "manifestId", "docId"];
  const lines = rows.map((r) => [
    r.data.trackingId ?? "",
    r.data.status ?? "",
    r.data.sortBin ?? "",
    r.data.routeCode ?? "",
    r.data.manifestId ?? "",
    r.id,
  ]);
  const csv = [header, ...lines]
    .map((cols) => cols.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  return csv;
}

export default function Inventory() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [rows, setRows] = React.useState<Array<{ id: string; data: Parcel }>>([]);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<string>("ALL");

  React.useEffect(() => {
    if (!stationId) return;

    const q = query(
      collection(db, "parcels"),
      where("currentStationId", "==", stationId),
      orderBy("trackingId")
    );

    return onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, data: d.data() as Parcel })));
    });
  }, [stationId]);

  const filtered = rows.filter((r) => {
    const t = (r.data.trackingId ?? r.id).toLowerCase();
    const okSearch = !search.trim() || t.includes(search.trim().toLowerCase());
    const okStatus = status === "ALL" || (r.data.status ?? "") === status;
    return okSearch && okStatus;
  });

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory_${stationId}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Inventory")}</div>
          <div className="text-sm text-neutral-600">
            Station: <span className="font-semibold">{stationName}</span>
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Search")}</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            placeholder={t("Tracking ID")}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Status")}</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 bg-white"
          >
            <option value="ALL">{t("All")}</option>
            <option value="inbound_received">{t("Inbound received")}</option>
            <option value="sorted">{t("Sorted")}</option>
            <option value="manifested">{t("Manifested")}</option>
            <option value="out_for_delivery">{t("Out for delivery")}</option>
            <option value="return_received">{t("Return received")}</option>
            <option value="transfer_dispatched">{t("Transfer dispatched")}</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={exportCsv}
            className="w-full rounded-xl bg-black px-5 py-3 text-white font-bold"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="text-sm font-semibold">{t("Parcels")}</div>
          <div className="text-xs text-neutral-500">{filtered.length} shown / {rows.length} total</div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("Tracking")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
                <th className="px-4 py-3">{t("Bin")}</th>
                <th className="px-4 py-3">{t("Route")}</th>
                <th className="px-4 py-3">{t("Manifest")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-neutral-600">
                    No parcels match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{r.data.trackingId ?? r.id}</td>
                    <td className="px-4 py-3">{r.data.status ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.sortBin ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.routeCode ?? "-"}</td>
                    <td className="px-4 py-3 font-mono">{r.data.manifestId ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!user ? (
        <div className="text-xs text-neutral-500">
          You are not logged in. Inventory might not load without auth.
        </div>
      ) : null}
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type Parcel = {
  trackingId?: string;
  senderName?: string;
  senderPhone?: string;
  receiverName?: string;
  receiverPhone?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  service?: string;
  codAmount?: number;
};

async function findParcelByCode(code: string): Promise<{ id: string; data: Parcel } | null> {
  const direct = await getDoc(doc(db, "parcels", code));
  if (direct.exists()) return { id: direct.id, data: direct.data() as Parcel };

  const q = query(collection(db, "parcels"), where("trackingId", "==", code), limit(1));
  const res = await getDocs(q);
  const d = res.docs[0];
  if (!d) return null;
  return { id: d.id, data: d.data() as Parcel };
}

function buildPrintHtml(parcels: Array<{ id: string; data: Parcel }>) {
  const items = parcels
    .map((p) => {
      const tracking = p.data.trackingId ?? p.id;
      return `
      <div class="label">
        <div class="row">
          <div class="brand">{t("BRITIUM EXPRESS")}</div>
          <div class="tracking">${tracking}</div>
        </div>
        <div class="grid">
          <div>
            <div class="k">{t("From")}</div>
            <div class="v">${escapeHtml(p.data.senderName ?? "-")} (${escapeHtml(p.data.senderPhone ?? "-")})</div>
            <div class="v">${escapeHtml(p.data.pickupAddress ?? "-")}</div>
          </div>
          <div>
            <div class="k">{t("To")}</div>
            <div class="v">${escapeHtml(p.data.receiverName ?? "-")} (${escapeHtml(p.data.receiverPhone ?? "-")})</div>
            <div class="v">${escapeHtml(p.data.deliveryAddress ?? "-")}</div>
          </div>
        </div>
        <div class="row2">
          <div><span class="k">{t("Service:")}</span> <span class="v">${escapeHtml(p.data.service ?? "-")}</span></div>
          <div><span class="k">{t("COD:")}</span> <span class="v">${p.data.codAmount ?? 0}</span></div>
        </div>
      </div>
      `;
    })
    .join("");

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>{t("Print Labels")}</title>
      <style>
        @page { size: A4; margin: 10mm; }
        body { font-family: Arial, sans-serif; margin: 0; }
        .wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; }
        .label {
          border: 1px solid #111;
          border-radius: 10px;
          padding: 10px;
          height: 120mm;
          box-sizing: border-box;
        }
        .brand { font-weight: 800; font-size: 14px; }
        .tracking { font-weight: 800; font-size: 18px; letter-spacing: 1px; }
        .row { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
        .k { font-size: 11px; color: #555; text-transform: uppercase; font-weight: 700; }
        .v { font-size: 12px; color: #111; margin-top: 3px; }
        .row2 { display: flex; justify-content: space-between; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 8px; }
      </style>
    </head>
    <body>
      <div class="wrap">${items}</div>
      <script>window.onload = () => window.print();</script>
    </body>
  </html>
  `;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function PrintLabels() {
  const { t } = useI18n();

  const [code, setCode] = React.useState("");
  const [queue, setQueue] = React.useState<Array<{ id: string; data: Parcel }>>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const addToQueue = async () => {
    setError(null);
    const trimmed = code.trim();
    if (!trimmed) return;

    setBusy(true);
    try {
      const found = await findParcelByCode(trimmed);
      if (!found) {
        setError("Parcel not found.");
        return;
      }
      const tracking = found.data.trackingId ?? found.id;
      if (queue.some((q) => (q.data.trackingId ?? q.id) === tracking)) {
        setError("Already added.");
        return;
      }
      setQueue((q) => [found, ...q]);
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  const print = () => {
    if (queue.length === 0) return;
    const html = buildPrintHtml(queue);
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return alert("Popup blocked. Allow popups to print.");
    w.document.open();
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Labels • Print")}</div>
          <div className="text-sm text-neutral-600">{t("Add parcels by tracking ID and print.")}</div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        {error ? (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Tracking ID")}</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Enter tracking ID")}
            />
          </div>
          <button
            onClick={addToQueue}
            disabled={busy}
            className="rounded-xl border px-5 py-3 font-bold hover:bg-neutral-50 disabled:opacity-60"
          >
            {busy ? "Adding…" : "Add"}
          </button>

          <button
            onClick={print}
            disabled={queue.length === 0}
            className="rounded-xl bg-black px-5 py-3 text-white font-bold disabled:opacity-60"
          >
            Print ({queue.length})
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="text-sm font-semibold">{t("Queue")}</div>
          <button className="text-sm underline" onClick={() => setQueue([])}>
            Clear
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("Tracking")}</th>
                <th className="px-4 py-3">{t("Receiver")}</th>
                <th className="px-4 py-3">{t("Address")}</th>
              </tr>
            </thead>
            <tbody>
              {queue.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-neutral-600">
                    No parcels added.
                  </td>
                </tr>
              ) : (
                queue.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{p.data.trackingId ?? p.id}</td>
                    <td className="px-4 py-3">{p.data.receiverName ?? "-"}</td>
                    <td className="px-4 py-3">{p.data.deliveryAddress ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-neutral-500">
        Note: This prints text labels. If you want QR/barcodes, tell me which format you prefer (QR or Code128) and I’ll add it.
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type UserProfile = { stationId?: string; stationName?: string };

type Parcel = {
  trackingId?: string;
  status?: string;
  currentStationId?: string;
  sortBin?: string;
  routeCode?: string;
  manifestId?: string;
};

type Manifest = {
  type: "DELIVERY" | "TRANSFER";
  stationId: string;
  stationName: string;
  destinationStationId?: string;
  vehicleNo?: string;
  driverName?: string;
  routeCode?: string;
  status: "OPEN" | "FINALIZED" | "DISPATCHED";
  createdAt?: any;
};

function cn(...p: Array<string | false | null | undefined>) {
  return p.filter(Boolean).join(" ");
}

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

export default function LoadManifest() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [parcels, setParcels] = React.useState<Array<{ id: string; data: Parcel }>>([]);
  const [manifests, setManifests] = React.useState<Array<{ id: string; data: Manifest }>>([]);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  // Create manifest form
  const [type, setType] = React.useState<Manifest["type"]>("DELIVERY");
  const [routeCode, setRouteCode] = React.useState("");
  const [destinationStationId, setDestinationStationId] = React.useState("");
  const [vehicleNo, setVehicleNo] = React.useState("");
  const [driverName, setDriverName] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const selectedIds = Object.keys(selected).filter((k) => selected[k]);

  React.useEffect(() => {
    if (!stationId) return;

    const qParcels = query(
      collection(db, "parcels"),
      where("currentStationId", "==", stationId),
      where("status", "==", "sorted"),
      orderBy("trackingId")
    );

    const unsubParcels = onSnapshot(qParcels, (snap) => {
      setParcels(snap.docs.map((d) => ({ id: d.id, data: d.data() as Parcel })));
    });

    const qMan = query(
      collection(db, "manifests"),
      where("stationId", "==", stationId),
      orderBy("createdAt", "desc")
    );

    const unsubMan = onSnapshot(qMan, (snap) => {
      setManifests(snap.docs.map((d) => ({ id: d.id, data: d.data() as Manifest })));
    });

    return () => {
      unsubParcels();
      unsubMan();
    };
  }, [stationId]);

  const toggle = (id: string) => setSelected((m) => ({ ...m, [id]: !m[id] }));
  const clear = () => setSelected({});

  const createManifest = async () => {
    if (!user) return alert("Login required.");
    if (!stationId) return alert("Missing stationId in user profile.");
    if (selectedIds.length === 0) return alert("Select parcels to load.");
    if (type === "DELIVERY" && !routeCode.trim()) return alert("Route code is required for delivery manifest.");
    if (type === "TRANSFER" && !destinationStationId.trim()) return alert("Destination station is required for transfer manifest.");

    setBusy(true);
    try {
      const manifestDoc = await addDoc(collection(db, "manifests"), {
        type,
        stationId,
        stationName,
        destinationStationId: type === "TRANSFER" ? destinationStationId.trim() : undefined,
        vehicleNo: vehicleNo.trim() || undefined,
        driverName: driverName.trim() || undefined,
        routeCode: type === "DELIVERY" ? routeCode.trim() : undefined,
        status: "OPEN",
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      } satisfies Manifest & any);

      const b = writeBatch(db);
      selectedIds.forEach((pid) => {
        b.update(doc(db, "parcels", pid), {
          manifestId: manifestDoc.id,
          status: "manifested",
          updatedAt: serverTimestamp(),
        });
      });
      await b.commit();

      clear();
      setRouteCode("");
      setDestinationStationId("");
      setVehicleNo("");
      setDriverName("");
      alert(`Manifest created: ${manifestDoc.id}`);
    } finally {
      setBusy(false);
    }
  };

  const finalizeManifest = async (id: string) => {
    if (!confirm("Finalize this manifest?")) return;
    await updateDoc(doc(db, "manifests", id), {
      status: "FINALIZED",
      finalizedAt: serverTimestamp(),
    });
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Loading • Manifests")}</div>
          <div className="text-sm text-neutral-600">
            Create manifests by selecting <span className="font-semibold">{t("sorted")}</span> parcels.
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
        <div className="text-sm font-semibold">{t("Create Manifest")}</div>

        <div className="grid gap-3 md:grid-cols-4">
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Type")}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Manifest["type"])}
              className="mt-1 w-full rounded-xl border px-4 py-3 bg-white"
            >
              <option value="DELIVERY">{t("Delivery")}</option>
              <option value="TRANSFER">{t("Transfer")}</option>
            </select>
          </div>

          {type === "DELIVERY" ? (
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase">{t("Route Code")}</label>
              <input
                value={routeCode}
                onChange={(e) => setRouteCode(e.target.value)}
                className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
                placeholder={t("e.g., R1")}
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase">{t("Destination Station")}</label>
              <input
                value={destinationStationId}
                onChange={(e) => setDestinationStationId(e.target.value)}
                className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
                placeholder={t("e.g., STN-002")}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Vehicle No")}</label>
            <input
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Optional")}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Driver Name")}</label>
            <input
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Optional")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Selected: <span className="font-semibold">{selectedIds.length}</span>
          </div>
          <button
            onClick={createManifest}
            disabled={busy || selectedIds.length === 0}
            className={cn(
              "rounded-xl bg-black px-5 py-3 text-white font-bold",
              (busy || selectedIds.length === 0) && "opacity-60"
            )}
          >
            {busy ? "Creating…" : "Create Manifest"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="text-sm font-semibold">{t("Sorted Parcels (ready to load)")}</div>
          <button onClick={clear} className="text-sm underline">
            Clear selection
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3 w-10"></th>
                <th className="px-4 py-3">{t("Tracking")}</th>
                <th className="px-4 py-3">{t("Bin")}</th>
                <th className="px-4 py-3">{t("Route")}</th>
              </tr>
            </thead>
            <tbody>
              {parcels.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-neutral-600">
                    No sorted parcels found for this station.
                  </td>
                </tr>
              ) : (
                parcels.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={!!selected[p.id]}
                        onChange={() => toggle(p.id)}
                        aria-label={`Select ${p.data.trackingId ?? p.id}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono">{p.data.trackingId ?? p.id}</td>
                    <td className="px-4 py-3">{p.data.sortBin ?? "-"}</td>
                    <td className="px-4 py-3">{p.data.routeCode ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b">
          <div className="text-sm font-semibold">{t("Manifests")}</div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("ID")}</th>
                <th className="px-4 py-3">{t("Type")}</th>
                <th className="px-4 py-3">{t("Route / Destination")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
                <th className="px-4 py-3 w-40">{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {manifests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-neutral-600">
                    No manifests yet.
                  </td>
                </tr>
              ) : (
                manifests.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{m.id}</td>
                    <td className="px-4 py-3">{m.data.type}</td>
                    <td className="px-4 py-3">
                      {m.data.type === "DELIVERY" ? m.data.routeCode ?? "-" : m.data.destinationStationId ?? "-"}
                    </td>
                    <td className="px-4 py-3">{m.data.status}</td>
                    <td className="px-4 py-3">
                      <button
                        className="rounded-md border px-3 py-1 text-sm hover:bg-neutral-50"
                        onClick={() => finalizeManifest(m.id)}
                        disabled={m.data.status !== "OPEN"}
                      >
                        Finalize
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type ParcelStatus =
  | "inbound_received"
  | "sorted"
  | "manifested"
  | "out_for_delivery"
  | "delivered"
  | "transfer_dispatched"
  | "cancelled"
  | string;

type Parcel = {
  trackingId?: string;
  status?: ParcelStatus;
  currentStationId?: string;
  currentStationName?: string;
  manifestId?: string;
};

type UserProfile = {
  stationId?: string;
  stationName?: string;
};

function cn(...p: Array<string | false | null | undefined>) {
  return p.filter(Boolean).join(" ");
}

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

async function findParcelByCode(code: string): Promise<{ id: string; data: Parcel } | null> {
  const direct = await getDoc(doc(db, "parcels", code));
  if (direct.exists()) return { id: direct.id, data: direct.data() as Parcel };

  const q = query(collection(db, "parcels"), where("trackingId", "==", code), limit(1));
  const res = await getDocs(q);
  const d = res.docs[0];
  if (!d) return null;
  return { id: d.id, data: d.data() as Parcel };
}

export default function ScanOut() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [code, setCode] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [mode, setMode] = React.useState<"OUT_FOR_DELIVERY" | "TRANSFER_DISPATCH">("OUT_FOR_DELIVERY");
  const [recent, setRecent] = React.useState<Array<{ code: string; ok: boolean; msg: string; at: number }>>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = code.trim();
    if (!trimmed) return;

    if (!user) return setError("Please login first.");
    if (!stationId) return setError("Your profile has no stationId (users/{uid}.stationId).");

    setBusy(true);
    try {
      const found = await findParcelByCode(trimmed);
      if (!found) {
        setRecent((s) => [{ code: trimmed, ok: false, msg: "Parcel not found", at: Date.now() }, ...s].slice(0, 8));
        setCode("");
        return;
      }

      // Optional guard: ensure it belongs to this station
      if (found.data.currentStationId && found.data.currentStationId !== stationId) {
        setRecent((s) =>
          [
            {
              code: trimmed,
              ok: false,
              msg: `Parcel is at station ${found.data.currentStationId}, not ${stationId}`,
              at: Date.now(),
            },
            ...s,
          ].slice(0, 8)
        );
        setCode("");
        return;
      }

      const nextStatus: ParcelStatus =
        mode === "OUT_FOR_DELIVERY" ? "out_for_delivery" : "transfer_dispatched";

      await updateDoc(doc(db, "parcels", found.id), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });

      await addDoc(collection(db, "warehouse_events"), {
        type: mode === "OUT_FOR_DELIVERY" ? "SCAN_OUT_DELIVERY" : "SCAN_OUT_TRANSFER",
        stationId,
        stationName,
        parcelId: found.id,
        trackingId: found.data.trackingId ?? trimmed,
        actorUid: user.uid,
        createdAt: serverTimestamp(),
      });

      setRecent((s) =>
        [{ code: trimmed, ok: true, msg: `Scanned OUT • ${nextStatus}`, at: Date.now() }, ...s].slice(0, 8)
      );
      setCode("");
    } catch (err: any) {
      setError(err?.message ?? "Scan failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Outbound • Scan Out")}</div>
          <div className="text-sm text-neutral-600">
            Dispatch parcels from <span className="font-semibold">{stationName}</span>
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm space-y-4">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="text-sm font-semibold">{t("Mode")}</div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={mode === "OUT_FOR_DELIVERY"}
              onChange={() => setMode("OUT_FOR_DELIVERY")}
            />
            Out for delivery
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={mode === "TRANSFER_DISPATCH"}
              onChange={() => setMode("TRANSFER_DISPATCH")}
            />
            Transfer dispatch (inter-station)
          </label>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">
              Tracking ID / Barcode
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Scan or enter tracking ID")}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-black px-5 py-3 text-white font-bold disabled:opacity-60"
          >
            {busy ? "Scanning…" : "Scan Out"}
          </button>
        </form>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold">{t("Recent Scans")}</div>
        <div className="mt-3 space-y-2">
          {recent.length === 0 ? (
            <div className="text-sm text-neutral-600">{t("No scans yet.")}</div>
          ) : (
            recent.map((s, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3 text-sm",
                  s.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                )}
              >
                <div className="font-mono">{s.code}</div>
                <div className="text-neutral-700">{s.msg}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type UserProfile = { stationId?: string; stationName?: string };

type Parcel = {
  trackingId?: string;
  status?: string;
  returnReason?: string;
  currentStationId?: string;
};

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

async function findParcelByCode(code: string): Promise<{ id: string; data: Parcel } | null> {
  const direct = await getDoc(doc(db, "parcels", code));
  if (direct.exists()) return { id: direct.id, data: direct.data() as Parcel };

  const q = query(collection(db, "parcels"), where("trackingId", "==", code), limit(1));
  const res = await getDocs(q);
  const d = res.docs[0];
  if (!d) return null;
  return { id: d.id, data: d.data() as Parcel };
}

export default function Returns() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [code, setCode] = React.useState("");
  const [reason, setReason] = React.useState("Customer not available");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [rows, setRows] = React.useState<Array<{ id: string; data: Parcel }>>([]);

  React.useEffect(() => {
    if (!stationId) return;
    const q = query(
      collection(db, "parcels"),
      where("currentStationId", "==", stationId),
      where("status", "in", ["return_requested", "return_received"]),
      orderBy("trackingId")
    );
    return onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, data: d.data() as Parcel })));
    });
  }, [stationId]);

  const scanReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = code.trim();
    if (!trimmed) return;

    if (!user) return setError("Login required.");
    if (!stationId) return setError("Missing stationId.");

    setBusy(true);
    try {
      const found = await findParcelByCode(trimmed);
      if (!found) {
        setError("Parcel not found.");
        return;
      }

      await updateDoc(doc(db, "parcels", found.id), {
        status: "return_received",
        returnReason: reason,
        currentStationId: stationId,
        currentStationName: stationName,
        updatedAt: serverTimestamp(),
      });

      await addDoc(collection(db, "warehouse_events"), {
        type: "RETURN_RECEIVED",
        stationId,
        stationName,
        parcelId: found.id,
        trackingId: found.data.trackingId ?? trimmed,
        reason,
        actorUid: user.uid,
        createdAt: serverTimestamp(),
      });

      setCode("");
    } catch (err: any) {
      setError(err?.message ?? "Failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Returns")}</div>
          <div className="text-sm text-neutral-600">
            Receive and manage return parcels.
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={scanReturn} className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Tracking ID")}</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Scan return parcel")}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Reason")}</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 bg-white"
            >
              <option>{t("Customer not available")}</option>
              <option>{t("Address incorrect")}</option>
              <option>{t("Receiver refused")}</option>
              <option>{t("Damaged")}</option>
              <option>{t("Other")}</option>
            </select>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-black px-5 py-3 text-white font-bold disabled:opacity-60"
            >
              {busy ? "Saving…" : "Receive Return"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b">
          <div className="text-sm font-semibold">{t("Return Parcels")}</div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("Tracking")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
                <th className="px-4 py-3">{t("Reason")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-neutral-600">
                    No returns.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{r.data.trackingId ?? r.id}</td>
                    <td className="px-4 py-3">{r.data.status ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.returnReason ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type UserProfile = { stationId?: string; stationName?: string; role?: string };

type Parcel = {
  trackingId?: string;
  status?: string;
  currentStationId?: string;
  sortBin?: string;
  routeCode?: string;
  createdAt?: any;
};

function cn(...p: Array<string | false | null | undefined>) {
  return p.filter(Boolean).join(" ");
}

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

const DEFAULT_BINS = ["A", "B", "C", "D", "E"];
const DEFAULT_ROUTES = ["R1", "R2", "R3", "R4"];

export default function SortingBoard() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [rows, setRows] = React.useState<Array<{ id: string; data: Parcel }>>([]);
  const [loading, setLoading] = React.useState(true);

  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const selectedIds = Object.keys(selected).filter((k) => selected[k]);

  const [bin, setBin] = React.useState(DEFAULT_BINS[0]);
  const [routeCode, setRouteCode] = React.useState(DEFAULT_ROUTES[0]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (!stationId) return;

    setLoading(true);
    const q = query(
      collection(db, "parcels"),
      where("currentStationId", "==", stationId),
      where("status", "in", ["inbound_received", "sorting", "sorted"]),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const out = snap.docs.map((d) => ({ id: d.id, data: d.data() as Parcel }));
        setRows(out);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, [stationId]);

  const filtered = rows.filter((r) => {
    if (!search.trim()) return true;
    const s = search.trim().toLowerCase();
    return (r.data.trackingId ?? r.id).toLowerCase().includes(s);
  });

  const toggleOne = (id: string) => {
    setSelected((m) => ({ ...m, [id]: !m[id] }));
  };

  const toggleAll = (checked: boolean) => {
    const map: Record<string, boolean> = {};
    filtered.forEach((r) => (map[r.id] = checked));
    setSelected(map);
  };

  const applyBulk = async () => {
    if (!user) return alert("Login required.");
    if (!stationId) return alert("Missing stationId.");
    if (selectedIds.length === 0) return alert("Select at least one parcel.");

    const b = writeBatch(db);
    selectedIds.forEach((id) => {
      b.update(doc(db, "parcels", id), {
        status: "sorted",
        sortBin: bin,
        routeCode,
        updatedAt: serverTimestamp(),
      });
    });
    await b.commit();

    // clear selection
    setSelected({});
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Sorting Board")}</div>
          <div className="text-sm text-neutral-600">
            Station: <span className="font-semibold">{stationName}</span>
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Search")}</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            placeholder={t("Tracking ID")}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Bin")}</label>
          <select
            value={bin}
            onChange={(e) => setBin(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 bg-white"
          >
            {DEFAULT_BINS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-500 uppercase">{t("Route")}</label>
          <select
            value={routeCode}
            onChange={(e) => setRouteCode(e.target.value)}
            className="mt-1 w-full rounded-xl border px-4 py-3 bg-white"
          >
            {DEFAULT_ROUTES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => toggleAll(true)}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Select filtered
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Clear selection
          </button>
          <button
            onClick={applyBulk}
            className={cn(
              "rounded-xl bg-black px-4 py-2 text-sm font-bold text-white",
              selectedIds.length === 0 && "opacity-60 cursor-not-allowed"
            )}
            disabled={selectedIds.length === 0}
          >
            Apply bin/route to {selectedIds.length} parcel(s)
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-sm font-semibold">{t("Parcels")}</div>
          <div className="text-xs text-neutral-500">
            {loading ? "Loading…" : `${filtered.length} shown / ${rows.length} total`}
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    onChange={(e) => toggleAll(e.target.checked)}
                    checked={filtered.length > 0 && filtered.every((r) => selected[r.id])}
                    aria-label={t("Select all filtered")}
                  />
                </th>
                <th className="px-4 py-3">{t("Tracking")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
                <th className="px-4 py-3">{t("Bin")}</th>
                <th className="px-4 py-3">{t("Route")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-neutral-600" colSpan={5}>
                    No parcels match your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={!!selected[r.id]}
                        onChange={() => toggleOne(r.id)}
                        aria-label={`Select ${r.data.trackingId ?? r.id}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono">{r.data.trackingId ?? r.id}</td>
                    <td className="px-4 py-3">{r.data.status ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.sortBin ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.routeCode ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";

type UserProfile = { stationId?: string; stationName?: string };

type TransitRoute = {
  fromStationId: string;
  fromStationName: string;
  toStationId: string;
  vehicleNo?: string;
  driverName?: string;
  status: "PLANNED" | "DISPATCHED" | "ARRIVED" | "CANCELLED";
  departureAt?: any;
  arrivedAt?: any;
  createdAt?: any;
};

function useUserProfile() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setProfile(null);
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile((snap.data() as UserProfile) ?? null);
    });
    return () => unsub();
  }, []);

  return { user, profile };
}

export default function TransitRoutes() {
  const { t } = useI18n();

  const { user, profile } = useUserProfile();
  const stationId = profile?.stationId ?? "";
  const stationName = profile?.stationName ?? "Station";

  const [rows, setRows] = React.useState<Array<{ id: string; data: TransitRoute }>>([]);
  const [toStationId, setToStationId] = React.useState("");
  const [vehicleNo, setVehicleNo] = React.useState("");
  const [driverName, setDriverName] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (!stationId) return;
    const q = query(
      collection(db, "transit_routes"),
      where("fromStationId", "==", stationId),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, data: d.data() as TransitRoute })));
    });
  }, [stationId]);

  const createRoute = async () => {
    if (!user) return alert("Login required.");
    if (!stationId) return alert("Missing stationId.");
    if (!toStationId.trim()) return alert("Destination station is required.");

    setBusy(true);
    try {
      await addDoc(collection(db, "transit_routes"), {
        fromStationId: stationId,
        fromStationName: stationName,
        toStationId: toStationId.trim(),
        vehicleNo: vehicleNo.trim() || undefined,
        driverName: driverName.trim() || undefined,
        status: "PLANNED",
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      } satisfies TransitRoute & any);

      setToStationId("");
      setVehicleNo("");
      setDriverName("");
    } finally {
      setBusy(false);
    }
  };

  const setStatus = async (id: string, status: TransitRoute["status"]) => {
    const patch: any = { status, updatedAt: serverTimestamp() };
    if (status === "DISPATCHED") patch.departureAt = serverTimestamp();
    if (status === "ARRIVED") patch.arrivedAt = serverTimestamp();
    await updateDoc(doc(db, "transit_routes", id), patch);
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-extrabold">{t("Transfers • Transit Routes")}</div>
          <div className="text-sm text-neutral-600">
            Create and manage inter-station transfer routes.
          </div>
        </div>
        <Link className="text-sm underline" to="/warehouse">
          Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
        <div className="text-sm font-semibold">{t("Create Transit Route")}</div>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("To Station ID")}</label>
            <input
              value={toStationId}
              onChange={(e) => setToStationId(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("e.g., STN-002")}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Vehicle No")}</label>
            <input
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Optional")}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase">{t("Driver")}</label>
            <input
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
              placeholder={t("Optional")}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={createRoute}
            disabled={busy}
            className="rounded-xl bg-black px-5 py-3 text-white font-bold disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b">
          <div className="text-sm font-semibold">{t("Routes")}</div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr className="text-left">
                <th className="px-4 py-3">{t("ID")}</th>
                <th className="px-4 py-3">{t("To")}</th>
                <th className="px-4 py-3">{t("Vehicle")}</th>
                <th className="px-4 py-3">{t("Driver")}</th>
                <th className="px-4 py-3">{t("Status")}</th>
                <th className="px-4 py-3 w-56">{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-neutral-600">
                    No routes yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{r.id}</td>
                    <td className="px-4 py-3 font-mono">{r.data.toStationId}</td>
                    <td className="px-4 py-3">{r.data.vehicleNo ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.driverName ?? "-"}</td>
                    <td className="px-4 py-3">{r.data.status}</td>
                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      <button
                        className="rounded-md border px-3 py-1 hover:bg-neutral-50"
                        onClick={() => setStatus(r.id, "DISPATCHED")}
                        disabled={r.data.status !== "PLANNED"}
                      >
                        Dispatch
                      </button>
                      <button
                        className="rounded-md border px-3 py-1 hover:bg-neutral-50"
                        onClick={() => setStatus(r.id, "ARRIVED")}
                        disabled={r.data.status !== "DISPATCHED"}
                      >
                        Arrived
                      </button>
                      <button
                        className="rounded-md border px-3 py-1 hover:bg-neutral-50"
                        onClick={() => setStatus(r.id, "CANCELLED")}
                        disabled={r.data.status === "ARRIVED"}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { IWarehouseStats } from "@/types/britium";

export default function WarehouseDashboard({ stationId }: { stationId: string }) {
  const { t } = useI18n();
  const [stats, setStats] = useState<IWarehouseStats>({ inbound: 0, sorted: 0, manifested: 0, outForDelivery: 0 });

  useEffect(() => {
    async function fetchKPIs() {
      const baseQ = query(collection(db, "parcels"), where("currentStationId", "==", stationId));
      
      const counts = await Promise.all([
        getCountFromServer(query(baseQ, where("status", "==", "inbound_received"))),
        getCountFromServer(query(baseQ, where("status", "==", "sorted"))),
        getCountFromServer(query(baseQ, where("status", "==", "manifested"))),
        getCountFromServer(query(baseQ, where("status", "==", "out_for_delivery")))
      ]);

      setStats({
        inbound: counts[0].data().count,
        sorted: counts[1].data().count,
        manifested: counts[2].data().count,
        outForDelivery: counts[3].data().count,
      });
    }
    if (stationId) fetchKPIs();
  }, [stationId]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Station Monitoring")}</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label={t("Inbound")} value={stats.inbound} color="blue" />
        <KPICard label={t("Sorted")} value={stats.sorted} color="orange" />
        <KPICard label={t("Ready to Load")} value={stats.manifested} color="green" />
        <KPICard label={t("On Route")} value={stats.outForDelivery} color="red" />
      </div>
    </div>
  );
}

function KPICard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 text-center">
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{label}</p>
      <p className={`text-3xl font-black text-${color}-600`}>{value}</p>
    </div>
  );
}
import React, { useState, useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Download, Printer, Box } from "lucide-react";
import { IParcel } from "@/types/britium";

export default function WarehouseInventory({ parcels }: { parcels: IParcel[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => 
    parcels.filter(p => p.trackingId.toLowerCase().includes(query.toLowerCase())), 
  [parcels, query]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-[#0d2c54] text-white p-8 rounded-[3rem] shadow-xl flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">{t("Inventory")}</h2>
          <p className="opacity-60 text-xs font-bold uppercase mt-1 tracking-widest">{filtered.length} {t("Items in Station")}</p>
        </div>
        <div className="relative w-64">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
           <input 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:bg-white/20 transition-all font-bold text-sm"
              placeholder={t("Filter by Tracking...")}
              onChange={(e) => setQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">{t("Tracking")}</th>
              <th className="px-8 py-5">{t("Status")}</th>
              <th className="px-8 py-5">{t("Bin")}</th>
              <th className="px-8 py-5 text-right">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors font-medium">
                <td className="px-8 py-5 font-mono text-xs font-bold text-[#0d2c54]">{p.trackingId}</td>
                <td className="px-8 py-5"><span className="text-[10px] font-black uppercase text-blue-600">{t(p.status)}</span></td>
                <td className="px-8 py-5 font-black text-gray-400">{p.routeCode || "-"}</td>
                <td className="px-8 py-5 text-right"><button className="text-gray-300 hover:text-[#ff6b00]"><Printer size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useState, useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Download, Printer, Box } from "lucide-react";
import { IParcel } from "@/types/britium";

export default function WarehouseInventory({ parcels }: { parcels: IParcel[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => 
    parcels.filter(p => p.trackingId.toLowerCase().includes(query.toLowerCase())), 
  [parcels, query]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-[#0d2c54] text-white p-8 rounded-[3rem] shadow-xl flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">{t("Inventory")}</h2>
          <p className="opacity-60 text-xs font-bold uppercase mt-1 tracking-widest">{filtered.length} {t("Items in Station")}</p>
        </div>
        <div className="relative w-64">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
           <input 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:bg-white/20 transition-all font-bold text-sm"
              placeholder={t("Filter by Tracking...")}
              onChange={(e) => setQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">{t("Tracking")}</th>
              <th className="px-8 py-5">{t("Status")}</th>
              <th className="px-8 py-5">{t("Bin")}</th>
              <th className="px-8 py-5 text-right">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors font-medium">
                <td className="px-8 py-5 font-mono text-xs font-bold text-[#0d2c54]">{p.trackingId}</td>
                <td className="px-8 py-5"><span className="text-[10px] font-black uppercase text-blue-600">{t(p.status)}</span></td>
                <td className="px-8 py-5 font-black text-gray-400">{p.routeCode || "-"}</td>
                <td className="px-8 py-5 text-right"><button className="text-gray-300 hover:text-[#ff6b00]"><Printer size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ReturnsManagement() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [reason, setReason] = useState("");

  const returnReasons = [
    "Customer Refused", "Wrong Address", "Cannot Contact", "Damaged Item"
  ];

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !reason) return;

    await updateDoc(doc(db, "parcels", code), {
      status: "return_received",
      returnReason: reason,
      updatedAt: serverTimestamp(),
    });
    alert(t("Return processed"));
    setCode("");
    setReason("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><RotateCcw size={32}/></div>
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Returns Handling")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("Manage return-to-sender parcels")}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-50">
        <form onSubmit={handleReturn} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Tracking ID")}</label>
            <input 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none font-mono" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              required 
            />
          </div>import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Download, Printer, Tag } from "lucide-react";

export function WarehouseInventory() {
  const { t } = useI18n();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/20 font-bold text-sm"
            placeholder={t("Search by Tracking ID, Name or Route")}
          />
        </div>
        <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#0d2c54] px-6 py-3 rounded-xl hover:bg-gray-50 transition-all">
          <Download size={18} /> {t("Export CSV")}
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-50">
         <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">{t("Tracking")}</th>
                <th className="px-8 py-5">{t("Status")}</th>
                <th className="px-8 py-5">{t("Bin")}</th>
                <th className="px-8 py-5 text-right">{t("Action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium text-sm text-[#0d2c54]">
               {/* Data rows mapping parcels */}
               <tr className="hover:bg-gray-50/50 transition-colors">
                 <td className="px-8 py-5 font-mono text-xs font-bold">BE-100234</td>
                 <td className="px-8 py-5"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{t("Sorted")}</span></td>
                 <td className="px-8 py-5 font-black">A-12</td>
                 <td className="px-8 py-5 text-right"><button className="text-gray-300 hover:text-[#ff6b00]"><Printer size={18}/></button></td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Return Reason")}</label>
            <select 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 outline-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">{t("Select Reason")}</option>
              {returnReasons.map(r => <option key={r} value={r}>{t(r)}</option>)}
            </select>
          </div>
          <button className="md:col-span-2 bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">
            {t("Receive Return")}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ReturnsManagement() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [reason, setReason] = useState("");

  const returnReasons = [
    "Customer Refused", "Wrong Address", "Cannot Contact", "Damaged Item"
  ];

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !reason) return;

    await updateDoc(doc(db, "parcels", code), {
      status: "return_received",
      returnReason: reason,
      updatedAt: serverTimestamp(),
    });
    alert(t("Return processed"));
    setCode("");
    setReason("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><RotateCcw size={32}/></div>
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Returns Handling")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("Manage return-to-sender parcels")}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-50">
        <form onSubmit={handleReturn} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Tracking ID")}</label>
            <input 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none font-mono" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Return Reason")}</label>
            <select 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 outline-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">{t("Select Reason")}</option>
              {returnReasons.map(r => <option key={r} value={r}>{t(r)}</option>)}
            </select>
          </div>
          <button className="md:col-span-2 bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">
            {t("Receive Return")}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ReturnsManagement() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [reason, setReason] = useState("");

  const returnReasons = [
    "Customer Refused", "Wrong Address", "Cannot Contact", "Damaged Item"
  ];

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !reason) return;

    await updateDoc(doc(db, "parcels", code), {
      status: "return_received",
      returnReason: reason,
      updatedAt: serverTimestamp(),
    });
    alert(t("Return processed"));
    setCode("");
    setReason("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><RotateCcw size={32}/></div>
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Returns Handling")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("Manage return-to-sender parcels")}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-50">
        <form onSubmit={handleReturn} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Tracking ID")}</label>
            <input 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none font-mono" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Return Reason")}</label>
            <select 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 outline-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">{t("Select Reason")}</option>
              {returnReasons.map(r => <option key={r} value={r}>{t(r)}</option>)}
            </select>
          </div>
          <button className="md:col-span-2 bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">
            {t("Receive Return")}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { PackageSearch, CheckCircle } from "lucide-react";

export default function ScanIn({ stationName, stationId }: { stationName: string; stationId: string }) {
  const { t } = useI18n();
  const [code, setCode] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    try {
      await updateDoc(doc(db, "parcels", code), {
        status: "inbound_received",
        currentStationId: stationId,
        updatedAt: serverTimestamp(),
      });
      setCode("");
      alert(t("Scanned successfully"));
    } catch (err) {
      alert(t("Parcel not found"));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#0d2c54] rounded-[2rem] flex items-center justify-center mx-auto mb-4">
          <PackageSearch size={40} />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54] uppercase">{t("Inbound Operations")}</h1>
        <p className="text-gray-500 font-medium">{t("Station")}: {stationName}</p>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <input 
          className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-[#ff6b00] outline-none font-mono text-center text-lg uppercase tracking-widest"
          placeholder={t("Scan Tracking ID")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button className="w-full bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          {t("Confirm Reception")}
        </button>
      </form>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { PackageSearch, CheckCircle } from "lucide-react";

export default function ScanIn({ stationName, stationId }: { stationName: string; stationId: string }) {
  const { t } = useI18n();
  const [code, setCode] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    try {
      await updateDoc(doc(db, "parcels", code), {
        status: "inbound_received",
        currentStationId: stationId,
        updatedAt: serverTimestamp(),
      });
      setCode("");
      alert(t("Scanned successfully"));
    } catch (err) {
      alert(t("Parcel not found"));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#0d2c54] rounded-[2rem] flex items-center justify-center mx-auto mb-4">
          <PackageSearch size={40} />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54] uppercase">{t("Inbound Operations")}</h1>
        <p className="text-gray-500 font-medium">{t("Station")}: {stationName}</p>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <input 
          className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-[#ff6b00] outline-none font-mono text-center text-lg uppercase tracking-widest"
          placeholder={t("Scan Tracking ID")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button className="w-full bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          {t("Confirm Reception")}
        </button>
      </form>
    </div>
  );
}
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { Truck, CheckCircle, XCircle } from "lucide-react";
import { ParcelStatus } from "@/types/britium";

export default function ScanOut() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [lastScan, setLastScan] = useState<{ code: string; ok: boolean } | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    try {
      // Logic for final mile vs station transfer can be toggled here
      await updateDoc(doc(db, "parcels", code), {
        status: "out_for_delivery" as ParcelStatus,
        updatedAt: serverTimestamp(),
      });
      setLastScan({ code, ok: true });
      setCode("");
    } catch (err) {
      setLastScan({ code, ok: false });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-50 text-[#ff6b00] rounded-[2rem] flex items-center justify-center mx-auto mb-4">
          <Truck size={40} />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54] uppercase">{t("Outbound Operations")}</h1>
        <p className="text-gray-500 font-medium">{t("Scan parcels for dispatch or delivery")}</p>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <input 
          className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-[#0d2c54] outline-none font-mono text-center text-lg uppercase tracking-widest"
          placeholder={t("Scan Tracking ID")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button className="w-full bg-[#ff6b00] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          {t("Confirm Dispatch")}
        </button>
      </form>

      {lastScan && (
        <div className={`p-4 rounded-2xl flex items-center justify-between border-2 ${lastScan.ok ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
          <span className="font-bold font-mono">{lastScan.code}</span>
          <span className="font-black text-xs uppercase">{lastScan.ok ? t("Success") : t("Error")}</span>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  writeBatch,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";
import { IParcel } from "@/types/britium";
import { CheckCircle } from "lucide-react";

export default function SortingBoard({ stationId }: { stationId: string }) {
  const { t } = useI18n();
  const [parcels, setParcels] = useState<IParcel[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [bin, setBin] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "parcels"),
      where("currentStationId", "==", stationId),
      where("status", "==", "inbound_received")
    );

    return onSnapshot(q, (snap) => {
      setParcels(snap.docs.map((d) => ({ id: d.id, ...d.data() } as IParcel)));
    });
  }, [stationId]);

  const handleSort = async () => {
    const batch = writeBatch(db);

    Object.keys(selected).forEach((id) => {
      if (selected[id]) {
        batch.update(doc(db, "parcels", id), {
          status: "sorted",
          sortBin: bin,
          updatedAt: serverTimestamp(),
        });
      }
    });

    await batch.commit();
    setSelected({});
    setBin("");
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="p-6 space-y-6 animate-in fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-[#0d2c54] uppercase tracking-tight">
            {t("Sorting Board")}
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {parcels.length} {t("Parcels Pending")}
          </p>
        </div>

        <div className="flex gap-3">
          <input
            className="p-3 rounded-xl border border-gray-200 text-sm font-bold uppercase w-32 outline-none focus:border-[#ff6b00]"
            placeholder={t("Bin ID")}
            value={bin}
            onChange={(e) => setBin(e.target.value.toUpperCase())}
          />
          <button
            onClick={handleSort}
            disabled={!bin || selectedCount === 0}
            className="bg-[#ff6b00] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <CheckCircle size={16} /> {t("Apply Sort")}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parcels.map((p) => (
          <div
            key={p.id}
            onClick={() =>
              setSelected((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
            }
            className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer ${
              selected[p.id]
                ? "border-[#0d2c54] bg-blue-50/50 shadow-md"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-gray-400">
                #{p.trackingId}
              </span>

              {selected[p.id] && (
                <div className="w-5 h-5 bg-[#0d2c54] rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={12} />
                </div>
              )}
            </div>

            <p className="font-black text-[#0d2c54]">{p.receiverName}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 line-clamp-1">
              {p.deliveryAddress}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";
import { Truck, MapPin, CheckCircle, Navigation } from "lucide-react";

interface ITransitRoute {
  id: string;
  fromStationName: string;
  toStationId: string;
  vehicleNo: string;
  status: "PLANNED" | "DISPATCHED" | "ARRIVED";
}

export default function TransitRoutes({ stationId }: { stationId: string }) {
  const { t } = useI18n();
  const [routes, setRoutes] = useState<ITransitRoute[]>([]);

  useEffect(() => {
    const q = query(collection(db, "transit_routes"), where("fromStationId", "==", stationId));
    return onSnapshot(q, (snap) => {
      setRoutes(snap.docs.map(d => ({ id: d.id, ...d.data() } as ITransitRoute)));
    });
  }, [stationId]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen animate-in fade-in">
      <header className="flex items-center gap-4">
        <div className="p-4 bg-orange-50 text-[#ff6b00] rounded-2xl"><Navigation size={32}/></div>
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Transit Routes")}</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("Inter-hub Transfers")}</p>
        </div>
      </header>

      <div className="grid gap-4">
        {routes.map(route => (
          <div key={route.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Truck size={24}/></div>
              <div>
                <p className="font-black text-[#0d2c54]">{t("To")}: {route.toStationId}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{route.vehicleNo}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-orange-50 text-[#ff6b00] px-4 py-1 rounded-full text-[10px] font-black uppercase">{t(route.status)}</span>
              <button className="text-gray-300 hover:text-[#0d2c54] transition-colors"><CheckCircle size={24}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../firebase';
import { 
  collection, 
  query, 
  where, 
  limit, 
  onSnapshot, 
  orderBy, 
  doc, 
  writeBatch, 
  serverTimestamp 
} from 'firebase/firestore';

const WarehouseDashboard = () => {
  const [activeStage, setActiveStage] = useState('Scanning');
  const [barcode, setBarcode] = useState('');
  const [location, setLocation] = useState('');
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input for continuous scanning
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeStage]);

  // Real-time feed of recent scans by this staff member
  useEffect(() => {
    const q = query(
      collection(db, "warehouse_logs"),
      where("processedBy", "==", auth.currentUser?.uid),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    return onSnapshot(q, (snapshot) => {
      setRecentScans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode) return;
    setLoading(true);

    try {
      const batch = writeBatch(db);
      const timestamp = serverTimestamp();
      const staffId = auth.currentUser?.uid || "unknown_staff";

      // 1. Create the Activity Log
      const logRef = doc(collection(db, "warehouse_logs"));
      batch.set(logRef, {
        barcode,
        stage: activeStage,
        location: location || 'Warehouse Floor',
        timestamp,
        processedBy: staffId
      });

      // 2. Update the main Parcel/Item document
      // Assuming parcels are indexed by their barcode string
      const parcelRef = doc(db, "parcels", barcode);
      batch.update(parcelRef, {
        currentStatus: activeStage,
        lastLocation: location || 'Warehouse Floor',
        lastUpdated: timestamp,
        updatedBy: staffId
      });

      await batch.commit();
      setBarcode('');
      inputRef.current?.focus();
    } catch (err) {
      console.error(err);
      alert("Scan Failed: Check if Parcel ID exists in database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Stage Selector */}
      <nav style={styles.nav}>
        {['Scanning', 'Staging', 'Storage', 'Shipment'].map((s) => (
          <button 
            key={s} 
            onClick={() => { setActiveStage(s); setLocation(''); }}
            style={{...styles.tab, borderBottom: activeStage === s ? '4px solid #fff' : 'none'}}
          >
            {s}
          </button>
        ))}
      </nav>

      <div style={styles.main}>
        {/* Large Input Area for Scanners */}
        <section style={styles.scanSection}>
          <form onSubmit={handleScan}>
            <input
              ref={inputRef}
              style={styles.barcodeInput}
              placeholder="SCAN BARCODE"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              disabled={loading}
            />
            
            {(activeStage === 'Storage' || activeStage === 'Staging') && (
              <input
                style={styles.locationInput}
                placeholder="ENTER BIN/ZONE ID"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}
            <button type="submit" style={styles.submitBtn}>
              {loading ? '...' : 'SUBMIT SCAN'}
            </button>
          </form>
        </section>

        {/* Recent Activity Feed */}
        <section style={styles.feedSection}>
          <h4 style={{margin: '0 0 10px 0'}}>Recent Activity</h4>
          {recentScans.map((scan) => (
            <div key={scan.id} style={styles.scanItem}>
              <span>📦 {scan.barcode}</span>
              <span style={styles.badge}>{scan.stage}</span>
              <small>{scan.location}</small>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column' as const, backgroundColor: '#f4f7f6' },
  nav: { display: 'flex', backgroundColor: '#2c3e50', padding: '10px', justifyContent: 'space-around' },
  tab: { background: 'none', border: 'none', color: '#fff', padding: '10px', fontSize: '16px', fontWeight: 'bold' as const, cursor: 'pointer' },
  main: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  scanSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  barcodeInput: { width: '100%', padding: '20px', fontSize: '24px', textAlign: 'center' as const, borderRadius: '8px', border: '2px solid #2c3e50', marginBottom: '15px' },
  locationInput: { width: '100%', padding: '15px', fontSize: '18px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px' },
  submitBtn: { width: '100%', padding: '20px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold' as const },
  feedSection: { flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '12px', overflowY: 'auto' as const },
  scanItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', fontSize: '14px' },
  badge: { backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' as const },
};

export default WarehouseDashboard;
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Truck, 
  Users, 
  User, 
  FileText, 
  BarChart3, 
  Megaphone, 
  Briefcase, 
  MapPin, 
  RefreshCw, 
  Crosshair, 
  Network, 
  Radio, 
  DollarSign, 
  HeartHandshake, 
  Tags, 
  Contact, 
  Headphones, 
  Settings, 
  FileCheck, 
  ScrollText,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Calendar,
  Menu,
  X,
  Filter,
  Download,
  MoreHorizontal,
  Map,
  ArrowRightLeft,
  Package,
  AlertCircle,
  CheckCircle2,
  Clock,
  Save,
  Phone,
  Mail,
  Lock,
  Building,
  Bike,
  Navigation,
  Undo2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Facebook,
  MessageCircle,
  Receipt,
  CreditCard,
  BookOpen,
  PieChart,
  TrendingUp,
  TrendingDown,
  FileBarChart,
  Wallet,
  Send,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  Image,
  Crown,
  Gift,
  Ticket,
  CheckCircle,
  Building2,
  Home
} from 'lucide-react';

/**
 * BRITIUM EXPRESS - ENTERPRISE ADMIN SUITE
 * Based on 'BE_app_pages.pdf' (88 Pages)
 * * CORE COLORS:
 * Primary Blue: #0D47A1
 * Accent Orange: #FF6F00
 * Background: #F4F6F8
 */

// --- Assets & Icons ---

const BritiumLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#0D47A1"/>
    <path d="M12 10H20C24.4183 10 28 13.5817 28 18V22C28 26.4183 24.4183 30 20 30H12V10Z" fill="white" fillOpacity="0.2"/>
    <path d="M12 10H18C21.3137 10 24 12.6863 24 16V16C24 19.3137 21.3137 22 18 22H12V10Z" fill="white"/>
    <path d="M12 22H20C23.3137 22 26 24.6863 26 28V28C26 31.3137 23.3137 34 20 34H12V22Z" fill="#FF6F00"/>
  </svg>
);

// --- Reusable Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const Badge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    "Successful": "bg-green-100 text-green-700",
    "To assign": "bg-orange-100 text-orange-800",
    "Assigned": "bg-blue-100 text-blue-700",
    "On way": "bg-indigo-100 text-indigo-700",
    "Canceled": "bg-red-100 text-red-700",
    "Created": "bg-slate-100 text-slate-700",
    "Regular": "bg-slate-100 text-slate-600",
    "Active": "bg-green-100 text-green-700",
    "Day off": "bg-slate-100 text-slate-500",
    "Arrived": "bg-teal-100 text-teal-700",
    "Returned": "bg-rose-100 text-rose-700",
    "Failed": "bg-red-50 text-red-600 border border-red-200",
    "Processing": "bg-blue-50 text-blue-600",
    "Depart Requesting": "bg-yellow-50 text-yellow-700",
    "Arrived Requesting": "bg-purple-50 text-purple-700",
    "Assets": "bg-emerald-50 text-emerald-700",
    "Expense": "bg-red-50 text-red-700",
    "Revenue": "bg-green-50 text-green-700",
    "Equity": "bg-blue-50 text-blue-700",
    "Liabilities": "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider whitespace-nowrap ${styles[status] || styles["Created"]}`}>
      {status}
    </span>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  className?: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}

const Button = ({ children, variant = "primary", className = "", icon: Icon, onClick, ...props }: ButtonProps) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors text-sm";
  const variants = {
    primary: "bg-[#0D47A1] text-white hover:bg-blue-800",
    secondary: "bg-[#FF6F00] text-white hover:bg-orange-700",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

// --- View Components ---

// 1. DASHBOARD VIEW (PDF Page 1)
const DashboardView = () => {
  const pickupStats = {
    total: 27,
    percent: 23,
    breakdown: [
      { label: "To assign", count: 28, color: "text-orange-600" },
      { label: "Already assigned", count: 60, color: "text-blue-600" },
      { label: "On way", count: 0, color: "text-indigo-600" },
      { label: "Canceled", count: 0, color: "text-red-600" },
    ]
  };

  const deliveryStats = {
    total: 19,
    percent: 3,
    breakdown: [
      { label: "To assign", count: 52, color: "text-orange-600" },
      { label: "Already assigned", count: 434, color: "text-blue-600" },
      { label: "On way", count: 54, color: "text-indigo-600" },
      { label: "Retry", count: 1, color: "text-yellow-600" },
      { label: "Canceled", count: 0, color: "text-red-600" },
      { label: "Return", count: 0, color: "text-slate-600" },
    ]
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <div className="text-sm text-slate-500">Overview period: 25/12/2025 - 25/01/2026</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Merchant Orders Table */}
        <Card className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-lg">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Users size={18} className="text-[#0D47A1]" />
              Merchant direct order
            </h3>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold text-center">Ways</th>
                  <th className="px-4 py-3 font-semibold">Order at</th>
                  <th className="px-4 py-3 font-semibold">Town</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, merchant: "Nora Store", ways: 15, date: "24/01/26", town: "ရန်ကင်း" },
                  { id: 2, merchant: "ပီတိစာပေ", ways: 1, date: "23/01/26", town: "ဒဂုံမြို့" },
                  { id: 3, merchant: "စံချိန်သစ် ကွန်ပျူတာ", ways: 1, date: "21/01/26", town: "egyi" },
                  { id: 4, merchant: "Aqua Pa La Tar Aquarium", ways: 1, date: "21/01/26", town: "လှိုင်" },
                  { id: 5, merchant: "Unique/Diva", ways: 20, date: "21/01/26", town: "တာမွေ" },
                  { id: 6, merchant: "Mee Lay", ways: 3, date: "20/01/26", town: "ay" },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{order.merchant}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs font-bold">
                        {order.ways}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{order.date}</td>
                    <td className="px-4 py-3 text-slate-600">{order.town}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Stats Column */}
        <div className="space-y-6">
          {/* Pickup Summary */}
          <Card className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-700 mb-1">Pickup Summary</h3>
                <p className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2">
                  {pickupStats.total} <span className="text-sm font-normal text-slate-500">pickup ways successful</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Truck size={24} />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
                <span>Progress</span>
                <span>{pickupStats.percent}% Completed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-[#2E7D32] h-2 rounded-full" style={{ width: `${pickupStats.percent}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pickupStats.breakdown.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 rounded bg-slate-50 border border-slate-100">
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.count}</span>
                  <span className="text-xs text-slate-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Delivery Summary */}
          <Card className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-700 mb-1">Delivery Summary</h3>
                <p className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2">
                  {deliveryStats.total} <span className="text-sm font-normal text-slate-500">delivery ways successful</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Package size={24} />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
                <span>Progress</span>
                <span>{deliveryStats.percent}% Completed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-[#2E7D32] h-2 rounded-full" style={{ width: `${deliveryStats.percent}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {deliveryStats.breakdown.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 rounded bg-slate-50 border border-slate-100">
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.count}</span>
                  <span className="text-xs text-slate-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-700">Total overdue ways</h3>
            <select className="text-xs border border-slate-300 rounded px-2 py-1 bg-white">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between px-4 space-x-2">
            {[35, 20, 45, 10, 60, 30, 15].map((h, i) => (
              <div key={i} className="w-full bg-red-100 rounded-t relative group">
                <div className="absolute bottom-0 w-full bg-red-500 rounded-t transition-all duration-500 hover:bg-red-600" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-700">Daily delivered ways</h3>
            <select className="text-xs border border-slate-300 rounded px-2 py-1 bg-white">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between px-4 space-x-2">
            {[15, 30, 40, 55, 35, 20, 45].map((h, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t relative group">
                <div className="absolute bottom-0 w-full bg-[#0D47A1] rounded-t transition-all duration-500 hover:bg-blue-800" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 2. CREATE DELIVERY VIEW (PDF Page 2 & 3)
const CreateDeliveryView = () => {
  const [activeTab, setActiveTab] = useState('pickup'); // 'pickup' or 'office'

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Create Delivery</h2>
        <div className="flex gap-2">
          <Button variant="primary" icon={PlusCircle}>New Order</Button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-white rounded-t-lg shadow-sm">
        <button 
          onClick={() => setActiveTab('pickup')}
          className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'pickup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Pickup and deliver
        </button>
        <button 
          onClick={() => setActiveTab('office')}
          className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'office' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          In office receive
        </button>
      </div>

      <Card className="p-6 rounded-tl-none">
        {activeTab === 'pickup' ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Create delivery pickup</h3>
              <p className="text-sm text-slate-500">Fill up the pickup information first and then the pieces of delivery way information shall be followed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Merchant</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type merchant name (OR) phone (OR) ID"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Pickup location</label>
                  
                  <div className="flex items-start gap-3 p-3 border border-blue-200 bg-blue-50 rounded-lg cursor-pointer">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div></div>
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Pickup from merchant</span>
                      <span className="block text-xs text-slate-500">The items will be pickup From the merchant office / shop / home etc.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full border border-slate-400 bg-white"></div></div>
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Pickup from Highway gates</span>
                      <span className="block text-xs text-slate-500">The items will be pickup at the highway station</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full border border-slate-400 bg-white"></div></div>
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Pickup from post office</span>
                      <span className="block text-xs text-slate-500">The items will be pickup at the post office</span>
                    </div>
                  </div>

                  <button className="text-sm text-blue-600 font-medium flex items-center gap-1 mt-2">
                    <PlusCircle size={14} /> Add new address
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of ways to deliver</label>
                  <input type="number" defaultValue={1} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pickup date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cash advance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-sm">Ks</span>
                    <input type="number" placeholder="0" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">The large item(s) should be carried by car</span>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Parcel(s) already received</span>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-sm text-slate-700">Confirm and assign to delivery man</span>
                        <span className="text-xs text-slate-400">Automatically assign the deliveryman to be pickup</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Remark</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Any special instructions..."></textarea>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Create in office delivery way</h3>
              <p className="text-sm text-slate-500">The parcel has been received in the office and does not require to pickup.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sender information</label>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase">Sender name</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm" placeholder="Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase">Mobile phone</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm" placeholder="09..." />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase">Other phones</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm" placeholder="Optional" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pickup date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of ways to deliver</label>
                  <input type="number" defaultValue={1} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Remark</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Notes..."></textarea>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">{activeTab === 'pickup' ? 'Next Step' : 'Save'}</Button>
        </div>
      </Card>
    </div>
  );
};

// 3. WAY MANAGEMENT VIEW (Updated for PDF Pages 4-12)
const WayManagementView = () => {
  const [activeTab, setActiveTab] = useState('pickup'); // pickup, deliver, failed, return, inout, transit, map
  const [inOutSubTab, setInOutSubTab] = useState('in'); // 'in' (In bucket) or 'out' (Pickup parcels)

  // Render Table Functions based on Tab
  const renderPickupTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Cash advance</th>
            <th className="px-4 py-3">Car required</th>
            <th className="px-4 py-3">Prepaid</th>
            <th className="px-4 py-3">Parcel arrived</th>
            <th className="px-4 py-3">Total ways</th>
            <th className="px-4 py-3">Delivered</th>
            <th className="px-4 py-3">Data entry waiting</th>
            <th className="px-4 py-3">Address waiting</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Date to pickup</th>
            <th className="px-4 py-3">Pickup by</th>
            <th className="px-4 py-3">Created by</th>
            <th className="px-4 py-3">Zone</th>
            <th className="px-4 py-3">Branch</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN2401007655", status: "Assigned", merchant: "Baby Genius Os", mid: "M000020445", advance: "-", car: "No", prepaid: "No", arrived: "No", ways: 7, delivered: 0, waiting: 0, addr: 0, town: "ADSIT", created: "2026-01-24 05:03 pm", date: "2026-01-24", by: "Kyaw Zin Khant", createdBy: "Britium Express", zone: "AD(1)", branch: "Head Office" },
            { id: "YGN2401771323", status: "Assigned", merchant: "Unique Diva", mid: "M000016193", advance: "-", car: "No", prepaid: "No", arrived: "No", ways: 7, delivered: 0, waiting: 0, addr: 0, town: "ADSIT", created: "2026-01-24 04:41 pm", date: "2026-01-24", by: "Kyaw Zin Khant", createdBy: "Britium Express", zone: "Head Office", branch: "Head Office" },
            { id: "YGN2401455077", status: "Assigned", merchant: "OK Aluminium", mid: "M000049130", advance: "100,000", car: "Yes", prepaid: "No", arrived: "No", ways: 6, delivered: 0, waiting: 0, addr: 0, town: "ADSIT", created: "2026-01-24 03:46 pm", date: "2026-01-24", by: "Moe Sat Zin Tun", createdBy: "Britium Express", zone: "Head Office", branch: "Head Office" },
            { id: "YGN2401607489", status: "Created", merchant: "Nora Store", mid: "M000052597", advance: "305,000", car: "No", prepaid: "No", arrived: "No", ways: 15, delivered: 0, waiting: 15, addr: 15, town: "ADSIT", created: "2026-01-24 12:20 pm", date: "2026-01-24", by: "-", createdBy: "Nora Store", zone: "Head Office", branch: "Head Office" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="px-4 py-3"><Badge status={row.status} /></td>
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-600">{row.advance}</td>
              <td className="px-4 py-3 text-slate-600">{row.car}</td>
              <td className="px-4 py-3 text-slate-600">{row.prepaid}</td>
              <td className="px-4 py-3 text-slate-600">{row.arrived}</td>
              <td className="px-4 py-3 text-center font-bold text-slate-700">{row.ways}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.delivered}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.waiting}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.addr}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
              <td className="px-4 py-3 text-slate-600">{row.date}</td>
              <td className="px-4 py-3 text-blue-600">{row.by}</td>
              <td className="px-4 py-3 text-slate-600">{row.createdBy}</td>
              <td className="px-4 py-3 text-slate-500">{row.zone}</td>
              <td className="px-4 py-3 text-slate-500">{row.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDeliverTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Customer phone</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Deliver Date</th>
            <th className="px-4 py-3">Deliver By</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated by</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN279032YGN", status: "On way", customer: "Thinn Su Kyaw", phone: "09989996122", town: "ADSIT", date: "2026-01-25", by: "Myo Min Kyaw", merchant: "Unique Diva", mid: "M000016193", created: "Britium Express" },
            { id: "YGN355606YGN", status: "To assign", customer: "Ma Aye Myat", phone: "09989996122", town: "Sanchaung", date: "2026-01-25", by: "-", merchant: "Unique/Diva", mid: "M000016193", created: "Britium Express" },
            { id: "YGN140166YGN", status: "On way", customer: "Ma Nwe", phone: "09428027922", town: "ADSIT", date: "2026-01-24", by: "Aung Myo Min", merchant: "OK Aluminium", mid: "M000049130", created: "Britium Express" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="px-4 py-3"><Badge status={row.status} /></td>
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.phone}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-slate-600">{row.date}</td>
              <td className="px-4 py-3 text-blue-600">{row.by}</td>
              <td className="px-4 py-3 text-slate-500">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
              <td className="px-4 py-3 text-slate-500"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFailedTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Action</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Date to deliver</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Pickup Date</th>
            <th className="px-4 py-3">Pickup by</th>
            <th className="px-4 py-3">Deliver by</th>
            <th className="px-4 py-3">Created By</th>
            <th className="px-4 py-3">Updated By</th>
            <th className="px-4 py-3">Transportation cost</th>
            <th className="px-4 py-3">Pickup ID</th>
            <th className="px-4 py-3">Failed count</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN0501873545", reason: "Cannot contact", action: "Put it back", customer: "Nandarin", phone: "095109705", ddate: "2026-01-06", town: "ADSIT", created: "2026-01-06", updated: "2026-01-08", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", pby: "Zone", dby: "Wai Phyo Oo", cby: "Britium Express", uby: "Wai Phyo Oo", cost: "-", pid: "YGN0501873545", count: 1 },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 text-red-600 font-medium">{row.reason}</td>
              <td className="px-4 py-3 flex gap-2">
                <button className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200">Put back</button>
                <button className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">To collect</button>
              </td>
              <td className="px-4 py-3 text-slate-700">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.phone}</td>
              <td className="px-4 py-3 text-slate-600">{row.ddate}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{row.created}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{row.updated}</td>
              <td className="px-4 py-3 text-slate-500">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
              <td className="px-4 py-3 text-slate-600">{row.pby}</td>
              <td className="px-4 py-3 text-blue-600">{row.dby}</td>
              <td className="px-4 py-3 text-slate-500">{row.cby}</td>
              <td className="px-4 py-3 text-slate-500">{row.uby}</td>
              <td className="px-4 py-3 text-slate-600">{row.cost}</td>
              <td className="px-4 py-3 text-slate-600 text-xs">{row.pid}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReturnTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Depart</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant id</th>
            <th className="px-4 py-3">Pickup Date</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Return By</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Customer phone</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN122567YGN", status: "Returned", depart: "Head Office", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", by: "Myo Min Kyaw", customer: "Zin Mar", phone: "095041050", created: "2026-01-05", updated: "2026-01-07" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="px-4 py-3"><Badge status={row.status} /></td>
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 text-slate-600">{row.depart}</td>
              <td className="px-4 py-3 text-slate-600">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-blue-600">{row.by}</td>
              <td className="px-4 py-3 text-slate-600">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.phone}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderParcelInOut = () => (
    <div className="space-y-4">
      <div className="flex gap-4 border-b border-slate-200 pb-2">
        <button 
          onClick={() => setInOutSubTab('in')}
          className={`font-bold pb-2 px-1 border-b-2 transition-colors ${inOutSubTab === 'in' ? 'text-slate-700 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Pickup parcels (IN)
        </button>
        <button 
          onClick={() => setInOutSubTab('out')}
          className={`font-bold pb-2 px-1 border-b-2 transition-colors ${inOutSubTab === 'out' ? 'text-slate-700 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Deliver parcels (OUT)
        </button>
      </div>
      
      {inOutSubTab === 'in' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total ways</th>
                <th className="px-4 py-3">Way Id</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Merchant Id</th>
                <th className="px-4 py-3">Pickup Date</th>
                <th className="px-4 py-3">Town</th>
                <th className="px-4 py-3">Pickup by</th>
                <th className="px-4 py-3">Arrived in</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Updated by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "YGN0501872545", status: "Arrived Requesting", total: 11, merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", by: "Kyaw Zin Khant", in: "Group1", created: "2026-01-05 02:01 pm", updated: "2026-01-05 02:37 pm" },
                { id: "YGN0501647500", status: "Arrived Requesting", total: 3, merchant: "Ko Phyo(Fishing Feeling)", mid: "M000004323", pdate: "2026-01-05", town: "ADSIT", by: "Moe Sat Zin Tun", in: "Group2", created: "2026-01-05 02:10 pm", updated: "2026-01-05 02:35 pm" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3"><Badge status={row.status} /></td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{row.total}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
                  <td className="px-4 py-3 text-slate-600">{row.merchant}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.town}</td>
                  <td className="px-4 py-3 text-blue-600">{row.by}</td>
                  <td className="px-4 py-3 text-slate-500">{row.in}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.updated}</td>
                  <td className="px-4 py-3 text-slate-500"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Way Id</th>
                <th className="px-4 py-3">Parcel location</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Merchant id</th>
                <th className="px-4 py-3">Pickup Date</th>
                <th className="px-4 py-3">Town</th>
                <th className="px-4 py-3">Deliver Date</th>
                <th className="px-4 py-3">Deliver by</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Updated by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "YGN122567YGN", status: "To deliver", loc: "Group1", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", ddate: "2026-01-06", by: "Myo Min Kyaw", created: "2026-01-05 03:52 pm", updated: "2026-01-07 05:30 pm" },
                { id: "YGN861121YGN", status: "To deliver", loc: "Group1", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", ddate: "2026-01-06", by: "Myo Min Kyaw", created: "2026-01-05 04:00 pm", updated: "2026-01-07 05:30 pm" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3"><Badge status={row.status} /></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
                  <td className="px-4 py-3 text-slate-600">{row.loc}</td>
                  <td className="px-4 py-3 text-slate-600">{row.merchant}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.town}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ddate}</td>
                  <td className="px-4 py-3 text-blue-600">{row.by}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.updated}</td>
                  <td className="px-4 py-3 text-slate-500"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Way Management</h2>
           <p className="text-sm text-slate-500">Comprehensive order processing and tracking</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" icon={Download}>Export</Button>
           <Button variant="primary" icon={PlusCircle}>Create Way</Button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-1 border-b border-slate-200">
        {[
          { id: 'pickup', label: 'Pickup ways', icon: Truck },
          { id: 'deliver', label: 'Deliver ways', icon: Package },
          { id: 'failed', label: 'Failed ways', icon: AlertTriangle },
          { id: 'return', label: 'Return ways', icon: Undo2 },
          { id: 'inout', label: 'Parcel In/Out', icon: ArrowRightLeft },
          { id: 'transit', label: 'Transit route', icon: Navigation },
          { id: 'map', label: 'Tracking map', icon: Map },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap rounded-t-lg border-b-2 transition-colors
              ${activeTab === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
            `}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* Filters Bar (Common for lists) */}
        {activeTab !== 'map' && (
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
               <span className="text-sm text-slate-500">Filter by:</span>
               <select className="text-sm border-slate-300 rounded-md shadow-sm"><option>All Zones</option></select>
               <select className="text-sm border-slate-300 rounded-md shadow-sm"><option>All Merchants</option></select>
            </div>
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
               <input type="text" placeholder="Search way ID..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
          </div>
        )}
        
        {/* Content Render */}
        <div className="min-h-[400px]">
          {activeTab === 'pickup' && renderPickupTable()}
          {activeTab === 'deliver' && renderDeliverTable()}
          {activeTab === 'failed' && renderFailedTable()}
          {activeTab === 'return' && renderReturnTable()}
          {activeTab === 'inout' && <div className="p-4">{renderParcelInOut()}</div>}
          
          {activeTab === 'transit' && (
            <div className="p-8 text-center text-slate-500">
              <Navigation size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">Transit Routes</h3>
              <p>Manage inter-station transfers and routing.</p>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="h-[600px] bg-slate-100 relative w-full flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
               <div className="absolute top-1/4 left-1/4">
                  <div className="bg-white p-2 rounded shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Rider: Kyaw Zin</span>
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mx-auto mt-1"></div>
               </div>
               <div className="absolute bottom-1/3 right-1/3">
                  <div className="bg-white p-2 rounded shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Rider: Moe Sat</span>
                  </div>
               </div>
               <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-md w-64">
                 <h4 className="font-bold text-sm mb-2">Live Tracking</h4>
                 <div className="space-y-2 text-xs">
                   <div className="flex justify-between"><span>Active Riders</span><span className="font-bold text-green-600">23</span></div>
                   <div className="flex justify-between"><span>Idle</span><span className="font-bold text-orange-500">5</span></div>
                   <div className="flex justify-between"><span>Offline</span><span className="font-bold text-slate-500">2</span></div>
                 </div>
               </div>
            </div>
          )}
        </div>

        {activeTab !== 'map' && (
          <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
             <span>Showing 1-10 of 50 records</span>
             <div className="flex gap-1">
               <button className="px-3 py-1 border rounded hover:bg-slate-50">Prev</button>
               <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
             </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// 4. MERCHANTS VIEW (PDF Page 13 & 14)
const MerchantsView = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'add'

  if (viewMode === 'add') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Create new merchant</h2>
          <Button variant="outline" onClick={() => setViewMode('list')}>Cancel</Button>
        </div>

        <Card className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-5">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select the branch</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <option>Head Office</option>
                    <option>Mandalay Branch</option>
                  </select>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Merchant Name" />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" placeholder="09..." />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select State</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>Yangon</option>
                      <option>Mandalay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Township</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>Kamaryut</option>
                      <option>Sanchaung</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Street</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
               </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">House No(or) Unit, floor</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
               </div>
             </div>

             <div className="space-y-5">
               <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><Lock size={16}/> Login Credentials</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">User login mobile phone</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                      <input type="email" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                      <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                      <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Account ID</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500" value="M000052899" readOnly />
               </div>

               <div className="pt-4 flex gap-3">
                  <Button variant="outline" className="w-full" onClick={() => setViewMode('list')}>Cancel</Button>
                  <Button variant="primary" className="w-full" icon={Save}>Save Merchant</Button>
               </div>
             </div>
           </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Merchants</h2>
          <p className="text-sm text-slate-500">The list of merchants who will work with you</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" icon={PlusCircle} onClick={() => setViewMode('add')}>Add new merchant</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Users size={20} /></div>
           <div>
             <div className="text-2xl font-bold">128</div>
             <div className="text-xs text-slate-500">Total Merchants</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
           <div>
             <div className="text-2xl font-bold">115</div>
             <div className="text-xs text-slate-500">Active Now</div>
           </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
           <div className="flex gap-2">
              <Button variant="primary" className="text-xs px-3 py-1">Merchant list</Button>
              <Button variant="ghost" className="text-xs px-3 py-1">Receipts</Button>
           </div>
           <div className="relative w-64">
             <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
             <input type="text" placeholder="Search merchant..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 w-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Merchant ID</th>
                <th className="px-4 py-3 text-center">Active delivered ways</th>
                <th className="px-4 py-3 text-center">Completed ways</th>
                <th className="px-4 py-3 text-center">To refund</th>
                <th className="px-4 py-3">Price profile</th>
                <th className="px-4 py-3">Facebook link</th>
                <th className="px-4 py-3">Viber link</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Testing delivery myanmar", phone: "09984394844", id: "M000052730", active: 15, completed: 50, refund: 0, profile: "Regular" },
                { name: "Elegance", phone: "09772165941", id: "M000052645", active: 4, completed: 12, refund: 2, profile: "Regular" },
                { name: "Nora Store", phone: "09978364462", id: "M000052597", active: 15, completed: 100, refund: 5, profile: "Regular" },
                { name: "OK Aluminium", phone: "09754844460", id: "M000049130", active: 8, completed: 40, refund: 0, profile: "Regular" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.phone}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.id}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full font-bold text-xs">{row.active}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{row.completed}</td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{row.refund}</td>
                  <td className="px-4 py-3"><Badge status={row.profile} /></td>
                  <td className="px-4 py-3 text-blue-600 text-xs">
                    <a href="#" className="flex items-center gap-1 hover:underline"><Facebook size={12} /> Link</a>
                  </td>
                  <td className="px-4 py-3 text-blue-600 text-xs">
                    <a href="#" className="flex items-center gap-1 hover:underline"><MessageCircle size={12} /> Link</a>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-400 hover:text-blue-600"><ArrowRightLeft size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
           <span>Showing 1-6 of 115</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Prev</button>
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
           </div>
        </div>
      </Card>
    </div>
  );
};

// 5. DELIVERYMEN VIEW
const DeliverymenView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Deliverymen</h2>
          <p className="text-sm text-slate-500">Manage delivery personnel and their assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" icon={PlusCircle}>Add Deliveryman</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><User size={20} /></div>
           <div>
             <div className="text-2xl font-bold">45</div>
             <div className="text-xs text-slate-500">Total Deliverymen</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
           <div>
             <div className="text-2xl font-bold">38</div>
             <div className="text-xs text-slate-500">Active Today</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><Truck size={20} /></div>
           <div>
             <div className="text-2xl font-bold">23</div>
             <div className="text-xs text-slate-500">On Delivery</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Clock size={20} /></div>
           <div>
             <div className="text-2xl font-bold">7</div>
             <div className="text-xs text-slate-500">Day Off</div>
           </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
           <div className="flex gap-2">
              <Button variant="primary" className="text-xs px-3 py-1">Deliveryman list</Button>
              <Button variant="ghost" className="text-xs px-3 py-1">Performance</Button>
           </div>
           <div className="relative w-64">
             <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
             <input type="text" placeholder="Search deliveryman..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 w-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Active Ways</th>
                <th className="px-4 py-3 text-center">Completed Today</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3">Zone</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Kyaw Zin Khant", phone: "09123456789", status: "Active", active: 8, completed: 12, rate: "95%", zone: "Zone A", vehicle: "Motorcycle" },
                { name: "Moe Sat Zin Tun", phone: "09987654321", status: "Active", active: 6, completed: 15, rate: "92%", zone: "Zone B", vehicle: "Car" },
                { name: "Aung Myo Min", phone: "09456789123", status: "On way", active: 4, completed: 8, rate: "88%", zone: "Zone A", vehicle: "Motorcycle" },
                { name: "Pyae Phyo Kyaw", phone: "09321654987", status: "Day off", active: 0, completed: 0, rate: "90%", zone: "Zone C", vehicle: "Motorcycle" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.phone}</td>
                  <td className="px-4 py-3"><Badge status={row.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full font-bold text-xs">{row.active}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{row.completed}</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">{row.rate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.zone}</td>
                  <td className="px-4 py-3 text-slate-600">{row.vehicle}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-400 hover:text-blue-600"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
           <span>Showing 1-4 of 45</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Prev</button>
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
           </div>
        </div>
      </Card>
    </div>
  );
};

// 6. RECEIPTS VIEW (PDF Page 15)
const ReceiptsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Receipts</h2>
          <p className="text-sm text-slate-500">Delivery receipts for your merchants are available here</p>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Merchant / ID</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3 text-center">Total ways</th>
                <th className="px-4 py-3 text-right">Collect</th>
                <th className="px-4 py-3 text-right">Merchant prepaid</th>
                <th className="px-4 py-3 text-right">Highway transport cost</th>
                <th className="px-4 py-3 text-right">Delivery charges</th>
                <th className="px-4 py-3 text-right">Pickup charges</th>
                <th className="px-4 py-3 text-right">Cash advance</th>
                <th className="px-4 py-3 text-right">To refund</th>
                <th className="px-4 py-3">Pickup date</th>
                <th className="px-4 py-3">Pickup by</th>
                <th className="px-4 py-3">Created by</th>
                <th className="px-4 py-3">Pickup ID</th>
                <th className="px-4 py-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Baby Genius Os", id: "M000020445", phone: "09796239153", total: 7, collect: "-", prepaid: "-", highway: "-", del: "-", pick: "-", adv: "-", refund: "-", date: "2026-01-24", by: "Kyaw Zin Khant", created: "Britium Express", pid: "Processing" },
                { name: "Unique Diva", id: "M000016193", phone: "09444450771", total: 7, collect: "47,000", prepaid: "-", highway: "-", del: "6,000", pick: "-", adv: "-", refund: "41,000", date: "2026-01-24", by: "Kyaw Zin Khant", created: "Britium Express", pid: "Processing" },
                { name: "OK Aluminium", id: "M000049130", phone: "09754844460", total: 8, collect: "248,500", prepaid: "-", highway: "-", del: "23,500", pick: "-", adv: "-", refund: "225,000", date: "2026-01-24", by: "Moe Sat Zin Tun", created: "Britium Express", pid: "YGN2401455077" },
                { name: "Ohmarkhun", id: "M000011687", phone: "09795526809", total: 9, collect: "-", prepaid: "-", highway: "-", del: "-", pick: "-", adv: "-", refund: "-", date: "2026-01-24", by: "Pyae Phyo Kyaw", created: "Britium Express", pid: "Processing" },
                { name: "Nora Store", id: "M000052597", phone: "09978364462", total: 15, collect: "1,608,700", prepaid: "-", highway: "-", del: "63,500", pick: "-", adv: "305,000", refund: "1,545,200", date: "2026-01-24", by: "-", created: "Nora Store", pid: "Processing" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{row.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{row.id}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.phone}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{row.total}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.collect}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.prepaid}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.highway}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.del}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.pick}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.adv}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">{row.refund}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.date}</td>
                  <td className="px-4 py-3 text-blue-600 text-xs">{row.by}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.created}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.pid}</td>
                  <td className="px-4 py-3 text-center"><Receipt size={16} className="text-blue-600 mx-auto cursor-pointer" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// 7. ACCOUNTING VIEW (PDF Pages 30-36)
const AccountingView = () => {
  const [subTab, setSubTab] = useState('balance');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Accounting</h2>
          <p className="text-sm text-slate-500">Manage your ledger, vouchers, and chart of accounts</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-2 mb-4">
        {[
          { id: 'balance', label: 'Account balance' },
          { id: 'chart', label: 'Account name/title' },
          { id: 'journal_list', label: 'Journal voucher list' },
          { id: 'cash_list', label: 'Cash voucher list' },
          { id: 'ledger', label: 'General Ledger' }
        ].map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setSubTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${subTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* Filters for Accounting Views */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2025-01-01" />
            <span className="text-slate-400">-</span>
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2026-01-31" />
          </div>
          <select className="text-sm border rounded px-2 py-1"><option>Select the branch</option></select>
          <select className="text-sm border rounded px-2 py-1"><option>Select the zone</option></select>
          <div className="relative flex-1 min-w-[200px]">
             <Search className="absolute left-3 top-2 text-slate-400" size={16} />
             <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-1.5 text-sm border rounded-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {subTab === 'balance' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">No</th><th className="px-4 py-3">Account name</th><th className="px-4 py-3">Type</th><th className="px-4 py-3 text-right">Opening Balance</th><th className="px-4 py-3 text-right">Debit</th><th className="px-4 py-3 text-right">Credit</th><th className="px-4 py-3 text-right">Closing Balance</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, name: "Cash on hand/Cash balance", type: "Assets", open: "70,000", debit: "372,600", credit: "305,000", close: "67,600" },
                  { id: 2, name: "Inventory-All Merchants Parcels (System Generated)", type: "Assets", open: "-", debit: "1,931,600", credit: "431,100", close: "1,500,500" },
                  { id: 3, name: "Account Receivable-Deliveryman-cash on hand-COD", type: "Assets", open: "-", debit: "372,600", credit: "372,600", close: "0" },
                  { id: 4, name: "Kpay (testing)", type: "Assets", open: "63,500", debit: "-", credit: "230,100", close: "-230,100" },
                  { id: 5, name: "Account Payable-Merchant (System Generated)", type: "Liabilities", open: "63,500", debit: "593,600", credit: "1,873,100", close: "1,279,500" },
                  { id: 6, name: "Delivery Fee-Revenue (System Generated)", type: "Revenue", open: "-", debit: "58,500", credit: "-", close: "58,500" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                    <td className="px-4 py-3"><Badge status={row.type} /></td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.open}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.debit}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.credit}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-800">{row.close}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {subTab === 'chart' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">No</th><th className="px-4 py-3">Code No</th><th className="px-4 py-3">Account head</th><th className="px-4 py-3">Chart of account</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Remark</th><th className="px-4 py-3">Updated on</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { no: 1, code: "2-101", head: "Current Assets", chart: "Cash on hand/Cash balance", type: "Assets", remark: "", date: "2022-08-04" },
                  { no: 2, code: "2-102", head: "Other Current Assets", chart: "Inventory-All Merchants Parcels (System Generated)", type: "Assets", remark: "", date: "2024-04-15" },
                  { no: 3, code: "2-103", head: "Other Current Assets", chart: "Account Receivable-Deliveryman-cash on hand-COD", type: "Assets", remark: "", date: "2024-04-15" },
                  { no: 4, code: "2-104", head: "Other Current Assets", chart: "COD-Cashier received", type: "Assets", remark: "", date: "2023-07-20" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{row.no}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{row.code}</td>
                    <td className="px-4 py-3 text-slate-600">{row.head}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{row.chart}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3 text-slate-500">{row.remark}</td>
                    <td className="px-4 py-3 text-slate-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {subTab === 'journal_list' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">No.</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Account Title</th><th className="px-4 py-3 text-right">Debit</th><th className="px-4 py-3 text-right">Credit</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50/50"><td className="px-4 py-3">1</td><td className="px-4 py-3">Sat, 24 Jan, 2026</td><td className="px-4 py-3">233</td><td className="px-4 py-3">YGN345663YGN-COD & balance</td><td className="px-4 py-3 font-bold text-slate-700">Total</td><td className="px-4 py-3 text-right font-bold">45,500</td><td className="px-4 py-3 text-right font-bold">45,500</td></tr>
                <tr><td></td><td></td><td></td><td></td><td className="px-4 py-2 pl-8 text-slate-600">Inventory-All Merchants Parcels</td><td className="px-4 py-2 text-right text-slate-600">45,500</td><td className="px-4 py-2 text-right text-slate-600"></td></tr>
                <tr><td></td><td></td><td></td><td></td><td className="px-4 py-2 pl-8 text-slate-600">Account Payable-Merchant</td><td className="px-4 py-2 text-right text-slate-600"></td><td className="px-4 py-2 text-right text-slate-600">45,500</td></tr>
              </tbody>
            </table>
          )}

          {subTab === 'cash_list' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">No</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Description</th><th className="px-4 py-3 text-right">Received</th><th className="px-4 py-3 text-right">Payment</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { date: "Tue, 13 Jan, 2026", no: 1, ref: "180", desc: "COD received from Moe Sat Zin Tun", rec: "3,500", pay: "-" },
                  { date: "Tue, 13 Jan, 2026", no: 2, ref: "181", desc: "COD received from Pyae Phyo Kyaw", rec: "369,100", pay: "-" },
                  { date: "Thu, 08 Jan, 2026", no: 3, ref: "182", desc: "Invoicing-Invoice No MB0126000001...", rec: "-", pay: "185,100" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{row.date}</td>
                    <td className="px-4 py-3 text-slate-500">{row.no}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.ref}</td>
                    <td className="px-4 py-3 text-slate-800">{row.desc}</td>
                    <td className="px-4 py-3 text-right text-green-600">{row.rec}</td>
                    <td className="px-4 py-3 text-right text-red-600">{row.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {subTab === 'ledger' && (
            <div className="p-8 text-center text-slate-500">
              <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">General Ledger</h3>
              <p>Detailed account transactions and balances.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// 8. REPORTING VIEW (PDF Pages 37-40)
const ReportingView = () => {
  const [subTab, setSubTab] = useState('overview');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reporting Dashboard</h2>
          <p className="text-sm text-slate-500">Operational performance and financial reports overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Download}>Export Data</Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-2 mb-4">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'operational', label: 'Operational' },
          { id: 'financial', label: 'Financial' },
          { id: 'deliverymen_performance', label: 'Deliverymen' },
          { id: 'merchant_performance', label: 'Merchants' }
        ].map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setSubTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${subTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* Date Range & Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2025-01-01" />
            <span className="text-slate-400">-</span>
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2026-01-31" />
          </div>
          <select className="text-sm border rounded px-2 py-1"><option>All Branches</option></select>
          <div className="flex-1"></div>
          <Button variant="ghost" icon={Filter} className="text-xs">More Filters</Button>
        </div>

        <div className="p-6">
          {subTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Order Volume</h3>
                  <BarChart3 size={20} className="text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">1,245</div>
                <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +12% from last month</div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Success Rate</h3>
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">94.2%</div>
                <div className="text-xs text-slate-500">Delivery completion rate</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Revenue</h3>
                  <DollarSign size={20} className="text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">4.2M Ks</div>
                <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +5% from last month</div>
              </div>

              {/* Chart Placeholder 1 */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 h-64 flex flex-col justify-center items-center relative">
                <div className="absolute top-4 left-4 font-bold text-slate-700">Monthly Performance</div>
                <div className="w-full h-40 flex items-end justify-between gap-2 px-8">
                   {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                     <div key={i} className="w-full bg-blue-100 rounded-t relative group">
                        <div className="absolute bottom-0 w-full bg-blue-600 rounded-t" style={{height: `${h}%`}}></div>
                     </div>
                   ))}
                </div>
                <div className="w-full flex justify-between px-8 mt-2 text-xs text-slate-400">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
              </div>

              {/* Chart Placeholder 2 */}
              <div className="col-span-1 bg-white border border-slate-200 rounded-lg p-4 h-64 flex flex-col justify-center items-center relative">
                 <div className="absolute top-4 left-4 font-bold text-slate-700">Delivery Status</div>
                 <div className="w-32 h-32 rounded-full border-8 border-slate-100 border-t-green-500 border-r-blue-500 border-b-red-500 rotate-45"></div>
                 <div className="mt-4 text-xs space-y-1">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Successful (60%)</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> In Transit (30%)</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Failed (10%)</div>
                 </div>
              </div>
            </div>
          )}

          {subTab === 'operational' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-center">Total Orders</th>
                    <th className="px-4 py-3 text-center">Pickups</th>
                    <th className="px-4 py-3 text-center">Deliveries</th>
                    <th className="px-4 py-3 text-center">Returns</th>
                    <th className="px-4 py-3 text-center">Success %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { date: "24 Jan 2026", total: 156, pick: 45, del: 98, ret: 13, rate: "92%" },
                    { date: "23 Jan 2026", total: 142, pick: 40, del: 90, ret: 12, rate: "91%" },
                    { date: "22 Jan 2026", total: 160, pick: 50, del: 100, ret: 10, rate: "94%" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{row.date}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row.total}</td>
                      <td className="px-4 py-3 text-center text-blue-600">{row.pick}</td>
                      <td className="px-4 py-3 text-center text-green-600">{row.del}</td>
                      <td className="px-4 py-3 text-center text-red-600">{row.ret}</td>
                      <td className="px-4 py-3 text-center font-bold text-slate-700">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(subTab === 'financial' || subTab === 'deliverymen_performance' || subTab === 'merchant_performance') && (
            <div className="p-8 text-center text-slate-500">
              <PieChart size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">{subTab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Reports</h3>
              <p>Detailed analytics and performance metrics for {subTab.split('_')[0]}.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// --- FINANCIAL REPORTS VIEWS ---

// Cash Book Summary View
const CashBookSummaryView = () => {
  const [dateRange, setDateRange] = useState('this_month');
  const [accountType, setAccountType] = useState('all');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Cash Book Summary</h2>
        <div className="flex gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Opening Balance</p>
              <p className="text-2xl font-bold text-slate-800">Ks 2,450,000</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Cash In</p>
              <p className="text-2xl font-bold text-green-600">Ks 1,850,000</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Cash Out</p>
              <p className="text-2xl font-bold text-red-600">Ks 980,000</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Closing Balance</p>
              <p className="text-2xl font-bold text-slate-800">Ks 3,320,000</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <DollarSign className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Transaction Details</h3>
          <div className="flex gap-2">
            <select 
              value={accountType} 
              onChange={(e) => setAccountType(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded text-sm bg-white"
            >
              <option value="all">All Accounts</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Reference</th>
                <th className="px-4 py-3 text-right">Cash In</th>
                <th className="px-4 py-3 text-right">Cash Out</th>
                <th className="px-4 py-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-01-25', desc: 'Delivery Payment - Nora Store', ref: 'DEL-001', cashIn: 45000, cashOut: 0, balance: 2495000 },
                { date: '2026-01-25', desc: 'Fuel Expense', ref: 'EXP-045', cashIn: 0, cashOut: 25000, balance: 2470000 },
                { date: '2026-01-24', desc: 'COD Collection', ref: 'COD-234', cashIn: 180000, cashOut: 0, balance: 2650000 },
                { date: '2026-01-24', desc: 'Office Rent', ref: 'EXP-044', cashIn: 0, cashOut: 150000, balance: 2500000 },
                { date: '2026-01-23', desc: 'Delivery Payment - ပီတိစာပေ', ref: 'DEL-002', cashIn: 12000, cashOut: 0, balance: 2512000 },
              ].map((txn, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{txn.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{txn.desc}</td>
                  <td className="px-4 py-3 text-slate-600">{txn.ref}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">
                    {txn.cashIn > 0 ? `Ks ${txn.cashIn.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600 font-medium">
                    {txn.cashOut > 0 ? `Ks ${txn.cashOut.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-800">
                    Ks {txn.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Journal Summary View
const JournalSummaryView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Journal Summary</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export Journal
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Journal Entry</th>
                <th className="px-4 py-3 text-left">Account</th>
                <th className="px-4 py-3 text-right">Debit</th>
                <th className="px-4 py-3 text-right">Credit</th>
                <th className="px-4 py-3 text-left">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-01-25', entry: 'JE-001', account: 'Cash Account', debit: 45000, credit: 0, ref: 'DEL-001' },
                { date: '2026-01-25', entry: 'JE-001', account: 'Delivery Revenue', debit: 0, credit: 45000, ref: 'DEL-001' },
                { date: '2026-01-25', entry: 'JE-002', account: 'Fuel Expense', debit: 25000, credit: 0, ref: 'EXP-045' },
                { date: '2026-01-25', entry: 'JE-002', account: 'Cash Account', debit: 0, credit: 25000, ref: 'EXP-045' },
              ].map((entry, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{entry.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{entry.entry}</td>
                  <td className="px-4 py-3 text-slate-700">{entry.account}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">
                    {entry.debit > 0 ? `Ks ${entry.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-600 font-medium">
                    {entry.credit > 0 ? `Ks ${entry.credit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{entry.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Trial Balance View
const TrialBalanceView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Trial Balance</h2>
        <div className="flex gap-3">
          <input type="date" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue="2026-01-25" />
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Britium Express Delivery Service</h3>
          <p className="text-slate-600">Trial Balance as of January 25, 2026</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Account Name</th>
                <th className="px-4 py-3 text-right">Debit</th>
                <th className="px-4 py-3 text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { account: 'Cash Account', debit: 3320000, credit: 0 },
                { account: 'Accounts Receivable', debit: 450000, credit: 0 },
                { account: 'Vehicle Assets', debit: 15000000, credit: 0 },
                { account: 'Office Equipment', debit: 2500000, credit: 0 },
                { account: 'Accounts Payable', debit: 0, credit: 280000 },
                { account: 'Capital Account', debit: 0, credit: 18000000 },
                { account: 'Delivery Revenue', debit: 0, credit: 2850000 },
                { account: 'Fuel Expense', debit: 180000, credit: 0 },
                { account: 'Salary Expense', debit: 680000, credit: 0 },
                { account: 'Office Rent', debit: 150000, credit: 0 },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.account}</td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {item.debit > 0 ? `Ks ${item.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {item.credit > 0 ? `Ks ${item.credit.toLocaleString()}` : '-'}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 font-bold bg-slate-50">
                <td className="px-4 py-3 text-slate-800">TOTAL</td>
                <td className="px-4 py-3 text-right text-slate-800">Ks 22,280,000</td>
                <td className="px-4 py-3 text-right text-slate-800">Ks 22,280,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Income Statement View
const IncomeStatementView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Income Statement</h2>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Britium Express Delivery Service</h3>
          <p className="text-slate-600">Income Statement for January 2026</p>
        </div>
        
        <div className="space-y-6">
          {/* Revenue Section */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">REVENUE</h4>
            <div className="space-y-2 ml-4">
              <div className="flex justify-between">
                <span className="text-slate-700">Delivery Service Revenue</span>
                <span className="font-medium">Ks 2,850,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">COD Commission</span>
                <span className="font-medium">Ks 185,000</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-2">
                <span>Total Revenue</span>
                <span>Ks 3,035,000</span>
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">EXPENSES</h4>
            <div className="space-y-2 ml-4">
              <div className="flex justify-between">
                <span className="text-slate-700">Fuel Expense</span>
                <span className="font-medium">Ks 180,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Salary Expense</span>
                <span className="font-medium">Ks 680,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Office Rent</span>
                <span className="font-medium">Ks 150,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Vehicle Maintenance</span>
                <span className="font-medium">Ks 85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Insurance</span>
                <span className="font-medium">Ks 45,000</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-2">
                <span>Total Expenses</span>
                <span>Ks 1,140,000</span>
              </div>
            </div>
          </div>

          {/* Net Income */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-800">Net Income</span>
              <span className="text-2xl font-bold text-green-600">Ks 1,895,000</span>
            </div>
            <p className="text-sm text-green-700 mt-1">Profit Margin: 62.4%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Balance Sheet View
const BalanceSheetView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Balance Sheet</h2>
        <div className="flex gap-3">
          <input type="date" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue="2026-01-25" />
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">ASSETS</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Current Assets</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cash</span>
                  <span>Ks 3,320,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Accounts Receivable</span>
                  <span>Ks 450,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Current Assets</span>
                  <span>Ks 3,770,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-2">Fixed Assets</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Vehicles</span>
                  <span>Ks 15,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Office Equipment</span>
                  <span>Ks 2,500,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Less: Depreciation</span>
                  <span>(Ks 1,200,000)</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Fixed Assets</span>
                  <span>Ks 16,300,000</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="flex justify-between font-bold text-blue-800">
                <span>TOTAL ASSETS</span>
                <span>Ks 20,070,000</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Liabilities & Equity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">LIABILITIES & EQUITY</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Current Liabilities</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Accounts Payable</span>
                  <span>Ks 280,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Accrued Expenses</span>
                  <span>Ks 95,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Current Liabilities</span>
                  <span>Ks 375,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-2">Long-term Liabilities</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Vehicle Loan</span>
                  <span>Ks 1,695,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Long-term Liabilities</span>
                  <span>Ks 1,695,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-2">Owner's Equity</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Capital</span>
                  <span>Ks 16,105,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Retained Earnings</span>
                  <span>Ks 1,895,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Owner's Equity</span>
                  <span>Ks 18,000,000</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded border border-green-200">
              <div className="flex justify-between font-bold text-green-800">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span>Ks 20,070,000</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Profit & Loss View
const ProfitLossView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Profit & Loss Statement</h2>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
            <option>January 2026</option>
            <option>December 2025</option>
            <option>Q4 2025</option>
            <option>Year 2025</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">Ks 3,035,000</p>
            <p className="text-sm text-slate-600 mt-1">+12.5% from last month</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowUpRight className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">Ks 1,140,000</p>
            <p className="text-sm text-slate-600 mt-1">+8.2% from last month</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <PieChart className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">Ks 1,895,000</p>
            <p className="text-sm text-slate-600 mt-1">Margin: 62.4%</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Monthly Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Month</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">Expenses</th>
                <th className="px-4 py-3 text-right">Net Profit</th>
                <th className="px-4 py-3 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { month: 'January 2026', revenue: 3035000, expenses: 1140000, profit: 1895000, margin: 62.4 },
                { month: 'December 2025', revenue: 2698000, expenses: 1050000, profit: 1648000, margin: 61.1 },
                { month: 'November 2025', revenue: 2456000, expenses: 980000, profit: 1476000, margin: 60.1 },
                { month: 'October 2025', revenue: 2234000, expenses: 920000, profit: 1314000, margin: 58.8 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.month}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">Ks {row.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-red-600 font-medium">Ks {row.expenses.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-bold">Ks {row.profit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700">{row.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- REPORTING VIEWS ---

// Ways Count Report View
const WaysCountReportView = () => {
  const [dateRange, setDateRange] = useState('this_month');
  const [status, setStatus] = useState('all');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ways Count Report</h2>
        <div className="flex gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_year">This Year</option>
          </select>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Ways</p>
              <p className="text-2xl font-bold text-slate-800">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">1,089</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">98</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">60</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Daily Breakdown</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Successful</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-01-25', total: 156, success: 142, pending: 8, failed: 6, rate: 91.0 },
                { date: '2026-01-24', total: 189, success: 175, pending: 10, failed: 4, rate: 92.6 },
                { date: '2026-01-23', total: 134, success: 120, pending: 12, failed: 2, rate: 89.6 },
                { date: '2026-01-22', total: 167, success: 154, pending: 9, failed: 4, rate: 92.2 },
                { date: '2026-01-21', total: 145, success: 132, pending: 8, failed: 5, rate: 91.0 },
              ].map((day, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{day.date}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{day.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{day.success}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{day.pending}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{day.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{day.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Active Ways by Town View
const ActiveWaysByTownView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Active Ways Count by Town</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Town/City</th>
                <th className="px-4 py-3 text-center">Active Ways</th>
                <th className="px-4 py-3 text-center">Completed Today</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { town: 'ရန်ကင်း (Yankin)', active: 45, completed: 38, pending: 7, rate: 84.4 },
                { town: 'ဒဂုံမြို့ (Dagon)', active: 32, completed: 29, pending: 3, rate: 90.6 },
                { town: 'လှိုင် (Hlaing)', active: 28, completed: 25, pending: 3, rate: 89.3 },
                { town: 'တာမွေ (Tamwe)', active: 24, completed: 22, pending: 2, rate: 91.7 },
                { town: 'ကမာရွတ် (Kamaryut)', active: 19, completed: 17, pending: 2, rate: 89.5 },
                { town: 'ဗဟန်း (Bahan)', active: 16, completed: 14, pending: 2, rate: 87.5 },
                { town: 'မရမ်းကုန်း (Mayangone)', active: 14, completed: 13, pending: 1, rate: 92.9 },
                { town: 'သင်္ဃန်းကျွန်း (Thingangyun)', active: 12, completed: 11, pending: 1, rate: 91.7 },
              ].map((town, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{town.town}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{town.active}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{town.completed}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{town.pending}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{town.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Ways by Deliverymen View
const WaysByDeliverymenView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ways by Deliverymen</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Deliveryman</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Kyaw Zin Oo', total: 89, completed: 82, pending: 5, failed: 2, rate: 92.1, status: 'Active' },
                { name: 'Moe Sat Naing', total: 76, completed: 71, pending: 3, failed: 2, rate: 93.4, status: 'Active' },
                { name: 'Thura Aung', total: 68, completed: 62, pending: 4, failed: 2, rate: 91.2, status: 'Active' },
                { name: 'Zaw Min Htut', total: 54, completed: 48, pending: 4, failed: 2, rate: 88.9, status: 'Active' },
                { name: 'Htet Paing Oo', total: 45, completed: 40, pending: 3, failed: 2, rate: 88.9, status: 'Active' },
                { name: 'Kaung Myat Thu', total: 38, completed: 34, pending: 2, failed: 2, rate: 89.5, status: 'Offline' },
                { name: 'Ye Min Oo', total: 32, completed: 29, pending: 2, failed: 1, rate: 90.6, status: 'Active' },
              ].map((rider, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{rider.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{rider.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{rider.completed}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{rider.pending}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{rider.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{rider.rate}%</td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={rider.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Ways by Merchants View
const WaysByMerchantsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ways by Merchants</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3 text-right">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Nora Store', total: 156, completed: 142, pending: 8, failed: 6, rate: 91.0, value: 2450000 },
                { name: 'ပီတိစာပေ', total: 89, completed: 82, pending: 5, failed: 2, rate: 92.1, value: 1680000 },
                { name: 'စံချိန်သစ် ကွန်ပျူတာ', total: 76, completed: 71, pending: 3, failed: 2, rate: 93.4, value: 3200000 },
                { name: 'Aqua Pa La Tar Aquarium', total: 45, completed: 40, pending: 3, failed: 2, rate: 88.9, value: 890000 },
                { name: 'Unique/Diva', total: 134, completed: 120, pending: 12, failed: 2, rate: 89.6, value: 4560000 },
                { name: 'Mee Lay', total: 67, completed: 62, pending: 3, failed: 2, rate: 92.5, value: 1230000 },
                { name: 'Golden Phoenix Restaurant', total: 54, completed: 48, pending: 4, failed: 2, rate: 88.9, value: 2100000 },
              ].map((merchant, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{merchant.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{merchant.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{merchant.completed}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{merchant.pending}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{merchant.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{merchant.rate}%</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">Ks {merchant.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Overdue Ways Count View
const OverdueWaysCountView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Overdue Ways Count</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Overdue</p>
              <p className="text-2xl font-bold text-red-600">87</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">1-3 Days</p>
              <p className="text-2xl font-bold text-orange-600">45</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">4-7 Days</p>
              <p className="text-2xl font-bold text-red-500">28</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">7+ Days</p>
              <p className="text-2xl font-bold text-red-700">14</p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-700" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Way ID</th>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-left">Deliveryman</th>
                <th className="px-4 py-3 text-left">Created Date</th>
                <th className="px-4 py-3 text-center">Days Overdue</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'WAY-2456', merchant: 'Nora Store', deliveryman: 'Kyaw Zin Oo', date: '2026-01-15', days: 10, priority: 'High', value: 45000 },
                { id: 'WAY-2398', merchant: 'ပီတိစာပေ', deliveryman: 'Moe Sat Naing', date: '2026-01-18', days: 7, priority: 'High', value: 28000 },
                { id: 'WAY-2401', merchant: 'Unique/Diva', deliveryman: 'Thura Aung', date: '2026-01-19', days: 6, priority: 'Medium', value: 67000 },
                { id: 'WAY-2445', merchant: 'Mee Lay', deliveryman: 'Zaw Min Htut', date: '2026-01-20', days: 5, priority: 'Medium', value: 23000 },
                { id: 'WAY-2467', merchant: 'Golden Phoenix', deliveryman: 'Htet Paing Oo', date: '2026-01-22', days: 3, priority: 'Low', value: 89000 },
              ].map((way, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{way.id}</td>
                  <td className="px-4 py-3 text-slate-800">{way.merchant}</td>
                  <td className="px-4 py-3 text-slate-700">{way.deliveryman}</td>
                  <td className="px-4 py-3 text-slate-600">{way.date}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-600">{way.days}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      way.priority === 'High' ? 'bg-red-100 text-red-700' :
                      way.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {way.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">Ks {way.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Overdue Ways by Deliveryman View
const OverdueWaysByDeliverymanView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Overdue Ways by Deliveryman</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Deliveryman</th>
                <th className="px-4 py-3 text-center">Total Overdue</th>
                <th className="px-4 py-3 text-center">1-3 Days</th>
                <th className="px-4 py-3 text-center">4-7 Days</th>
                <th className="px-4 py-3 text-center">7+ Days</th>
                <th className="px-4 py-3 text-center">Overdue Rate</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Kyaw Zin Oo', total: 15, days1_3: 8, days4_7: 5, days7plus: 2, rate: 16.9 },
                { name: 'Moe Sat Naing', total: 12, days1_3: 7, days4_7: 3, days7plus: 2, rate: 15.8 },
                { name: 'Thura Aung', total: 18, days1_3: 10, days4_7: 6, days7plus: 2, rate: 26.5 },
                { name: 'Zaw Min Htut', total: 9, days1_3: 5, days4_7: 3, days7plus: 1, rate: 16.7 },
                { name: 'Htet Paing Oo', total: 14, days1_3: 8, days4_7: 4, days7plus: 2, rate: 31.1 },
                { name: 'Kaung Myat Thu', total: 11, days1_3: 6, days4_7: 4, days7plus: 1, rate: 28.9 },
                { name: 'Ye Min Oo', total: 8, days1_3: 5, days4_7: 2, days7plus: 1, rate: 25.0 },
              ].map((rider, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{rider.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-600">{rider.total}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{rider.days1_3}</td>
                  <td className="px-4 py-3 text-center text-red-500 font-medium">{rider.days4_7}</td>
                  <td className="px-4 py-3 text-center text-red-700 font-bold">{rider.days7plus}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{rider.rate}%</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Overdue Ways by Merchant View
const OverdueWaysByMerchantView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Overdue Ways by Merchant</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Overdue</th>
                <th className="px-4 py-3 text-center">1-3 Days</th>
                <th className="px-4 py-3 text-center">4-7 Days</th>
                <th className="px-4 py-3 text-center">7+ Days</th>
                <th className="px-4 py-3 text-center">Overdue Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Nora Store', total: 156, overdue: 14, days1_3: 8, days4_7: 4, days7plus: 2, rate: 9.0 },
                { name: 'ပီတိစာပေ', total: 89, overdue: 8, days1_3: 5, days4_7: 2, days7plus: 1, rate: 9.0 },
                { name: 'စံချိန်သစ် ကွန်ပျူတာ', total: 76, overdue: 12, days1_3: 7, days4_7: 3, days7plus: 2, rate: 15.8 },
                { name: 'Aqua Pa La Tar Aquarium', total: 45, overdue: 6, days1_3: 3, days4_7: 2, days7plus: 1, rate: 13.3 },
                { name: 'Unique/Diva', total: 134, overdue: 18, days1_3: 10, days4_7: 6, days7plus: 2, rate: 13.4 },
                { name: 'Mee Lay', total: 67, overdue: 9, days1_3: 5, days4_7: 3, days7plus: 1, rate: 13.4 },
                { name: 'Golden Phoenix Restaurant', total: 54, overdue: 7, days1_3: 4, days4_7: 2, days7plus: 1, rate: 13.0 },
              ].map((merchant, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{merchant.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{merchant.total}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-600">{merchant.overdue}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{merchant.days1_3}</td>
                  <td className="px-4 py-3 text-center text-red-500 font-medium">{merchant.days4_7}</td>
                  <td className="px-4 py-3 text-center text-red-700 font-bold">{merchant.days7plus}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{merchant.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Total Ways by Town View
const TotalWaysByTownView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Total Ways by Town</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Town/City</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Successful</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3 text-right">Total Value</th>
                <th className="px-4 py-3 text-center">Avg per Way</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { town: 'ရန်ကင်း (Yankin)', total: 245, success: 220, failed: 25, rate: 89.8, value: 4850000, avg: 19796 },
                { town: 'ဒဂုံမြို့ (Dagon)', total: 189, success: 171, failed: 18, rate: 90.5, value: 3780000, avg: 20000 },
                { town: 'လှိုင် (Hlaing)', total: 167, success: 152, failed: 15, rate: 91.0, value: 3340000, avg: 20000 },
                { town: 'တာမွေ (Tamwe)', total: 145, success: 133, failed: 12, rate: 91.7, value: 2900000, avg: 20000 },
                { town: 'ကမာရွတ် (Kamaryut)', total: 134, success: 120, failed: 14, rate: 89.6, value: 2680000, avg: 20000 },
                { town: 'ဗဟန်း (Bahan)', total: 123, success: 108, failed: 15, rate: 87.8, value: 2460000, avg: 20000 },
                { town: 'မရမ်းကုန်း (Mayangone)', total: 98, success: 91, failed: 7, rate: 92.9, value: 1960000, avg: 20000 },
                { town: 'သင်္ဃန်းကျွန်း (Thingangyun)', total: 87, success: 80, failed: 7, rate: 92.0, value: 1740000, avg: 20000 },
              ].map((town, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{town.town}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{town.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{town.success}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{town.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{town.rate}%</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">Ks {town.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-600">Ks {town.avg.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Merchants Order Compare View
const MerchantsOrderCompareView = () => {
  const [compareType, setCompareType] = useState('monthly');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Merchants Order Compare</h2>
        <div className="flex gap-3">
          <select 
            value={compareType} 
            onChange={(e) => setCompareType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-center">Current Month</th>
                <th className="px-4 py-3 text-center">Last Month</th>
                <th className="px-4 py-3 text-center">Change</th>
                <th className="px-4 py-3 text-center">Growth %</th>
                <th className="px-4 py-3 text-right">Current Value</th>
                <th className="px-4 py-3 text-right">Last Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Nora Store', current: 156, last: 142, change: 14, growth: 9.9, currentValue: 3120000, lastValue: 2840000 },
                { name: 'ပီတိစာပေ', current: 89, last: 76, change: 13, growth: 17.1, currentValue: 1780000, lastValue: 1520000 },
                { name: 'စံချိန်သစ် ကွန်ပျူတာ', current: 76, last: 89, change: -13, growth: -14.6, currentValue: 1520000, lastValue: 1780000 },
                { name: 'Aqua Pa La Tar Aquarium', current: 45, last: 38, change: 7, growth: 18.4, currentValue: 900000, lastValue: 760000 },
                { name: 'Unique/Diva', current: 134, last: 156, change: -22, growth: -14.1, currentValue: 2680000, lastValue: 3120000 },
                { name: 'Mee Lay', current: 67, last: 54, change: 13, growth: 24.1, currentValue: 1340000, lastValue: 1080000 },
                { name: 'Golden Phoenix Restaurant', current: 54, last: 67, change: -13, growth: -19.4, currentValue: 1080000, lastValue: 1340000 },
              ].map((merchant, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{merchant.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{merchant.current}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{merchant.last}</td>
                  <td className="px-4 py-3 text-center font-medium ${
                    merchant.change > 0 ? 'text-green-600' : merchant.change < 0 ? 'text-red-600' : 'text-slate-600'
                  }">
                    {merchant.change > 0 ? '+' : ''}{merchant.change}
                  </td>
                  <td className="px-4 py-3 text-center font-bold ${
                    merchant.growth > 0 ? 'text-green-600' : merchant.growth < 0 ? 'text-red-600' : 'text-slate-600'
                  }">
                    {merchant.growth > 0 ? '+' : ''}{merchant.growth}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">Ks {merchant.currentValue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-slate-600">Ks {merchant.lastValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- OTHER VIEWS ---

// Broadcast Message View
const BroadcastMessageView = () => {
  const [messageType, setMessageType] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Broadcast Messages</h2>
        <button 
          onClick={() => setShowCompose(true)}
          className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
        >
          <Megaphone size={16} /> New Broadcast
        </button>
      </div>

      {showCompose && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Compose Broadcast Message</h3>
            <button 
              onClick={() => setShowCompose(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                  <option>All Users</option>
                  <option>Merchants Only</option>
                  <option>Deliverymen Only</option>
                  <option>Customers Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" 
                placeholder="Enter message subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm h-32 resize-none" 
                placeholder="Type your broadcast message here..."
              />
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700">
                Send Broadcast
              </button>
              <button 
                onClick={() => setShowCompose(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-4 mb-6">
        <select 
          value={messageType} 
          onChange={(e) => setMessageType(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
        >
          <option value="all">All Messages</option>
          <option value="sent">Sent</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {[
            {
              id: 1,
              subject: 'System Maintenance Notice',
              message: 'Scheduled maintenance on Sunday 2AM-4AM. Service may be temporarily unavailable.',
              target: 'All Users',
              priority: 'High',
              sent: '2026-01-24 14:30',
              status: 'Sent',
              recipients: 1247
            },
            {
              id: 2,
              subject: 'New Delivery Zones Added',
              message: 'We have expanded our delivery coverage to include 5 new townships in Yangon.',
              target: 'Merchants',
              priority: 'Normal',
              sent: '2026-01-23 09:15',
              status: 'Sent',
              recipients: 456
            },
            {
              id: 3,
              subject: 'Performance Bonus Announcement',
              message: 'Top performing deliverymen for January will receive bonus payments.',
              target: 'Deliverymen',
              priority: 'Normal',
              sent: '2026-01-22 16:45',
              status: 'Sent',
              recipients: 89
            },
            {
              id: 4,
              subject: 'Holiday Schedule Update',
              message: 'Updated delivery schedule for upcoming public holidays.',
              target: 'All Users',
              priority: 'Normal',
              sent: 'Draft',
              status: 'Draft',
              recipients: 0
            },
          ].map((msg) => (
            <div key={msg.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-slate-800">{msg.subject}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      msg.priority === 'High' ? 'bg-red-100 text-red-700' :
                      msg.priority === 'Urgent' ? 'bg-red-200 text-red-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {msg.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      msg.status === 'Sent' ? 'bg-green-100 text-green-700' :
                      msg.status === 'Draft' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{msg.message}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Target: {msg.target}</span>
                    <span>Recipients: {msg.recipients}</span>
                    <span>Sent: {msg.sent}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Teams View
const TeamsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Teams Management</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Delivery Team A',
            leader: 'Kyaw Zin Oo',
            members: 12,
            zone: 'Yankin, Dagon',
            performance: 92.5,
            status: 'Active'
          },
          {
            name: 'Delivery Team B',
            leader: 'Moe Sat Naing',
            members: 10,
            zone: 'Hlaing, Tamwe',
            performance: 89.8,
            status: 'Active'
          },
          {
            name: 'Delivery Team C',
            leader: 'Thura Aung',
            members: 8,
            zone: 'Kamaryut, Bahan',
            performance: 87.2,
            status: 'Active'
          },
        ].map((team, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">{team.name}</h3>
              <Badge status={team.status} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Team Leader</p>
                  <p className="text-sm text-slate-600">{team.leader}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Members</p>
                  <p className="text-sm text-slate-600">{team.members} deliverymen</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Coverage Zone</p>
                  <p className="text-sm text-slate-600">{team.zone}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Performance</span>
                  <span className="text-sm font-bold text-green-600">{team.performance}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${team.performance}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-[#0D47A1] text-white rounded hover:bg-blue-700">
                Manage
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// HR Management View
const HRManagementView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">HR Management</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <PlusCircle size={16} /> Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Employees</p>
              <p className="text-2xl font-bold text-slate-800">127</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Deliverymen</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Bike className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Office Staff</p>
              <p className="text-2xl font-bold text-orange-600">28</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Building className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Management</p>
              <p className="text-2xl font-bold text-purple-600">10</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Briefcase className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Employee Directory</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg bg-white w-64"
              />
            </div>
            <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
              <option>All Departments</option>
              <option>Delivery</option>
              <option>Operations</option>
              <option>Management</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Join Date</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Salary</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Kyaw Zin Oo', position: 'Senior Deliveryman', dept: 'Delivery', join: '2024-03-15', status: 'Active', salary: 450000 },
                { name: 'Moe Sat Naing', position: 'Team Leader', dept: 'Delivery', join: '2024-01-20', status: 'Active', salary: 550000 },
                { name: 'Thura Aung', position: 'Deliveryman', dept: 'Delivery', join: '2024-06-10', status: 'Active', salary: 400000 },
                { name: 'Ma Thandar Win', position: 'Operations Manager', dept: 'Operations', join: '2023-11-05', status: 'Active', salary: 800000 },
                { name: 'Ko Aung Myat', position: 'Customer Service', dept: 'Operations', join: '2024-02-28', status: 'Active', salary: 350000 },
                { name: 'Ma Ei Ei Mon', position: 'Accountant', dept: 'Finance', join: '2024-04-12', status: 'Active', salary: 500000 },
              ].map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-800">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{emp.position}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.dept}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.join}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={emp.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">Ks {emp.salary.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Pricing & Package View
const PricingPackageView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Pricing & Package Management</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Standard Delivery',
            description: 'Regular delivery within city limits',
            basePrice: 2000,
            perKm: 500,
            maxWeight: '5kg',
            deliveryTime: '1-2 days',
            popular: false
          },
          {
            name: 'Express Delivery',
            description: 'Fast delivery within 24 hours',
            basePrice: 3500,
            perKm: 750,
            maxWeight: '3kg',
            deliveryTime: 'Same day',
            popular: true
          },
          {
            name: 'Premium Delivery',
            description: 'Priority delivery with tracking',
            basePrice: 5000,
            perKm: 1000,
            maxWeight: '10kg',
            deliveryTime: '2-4 hours',
            popular: false
          },
        ].map((pkg, i) => (
          <Card key={i} className={`p-6 relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{pkg.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-[#0D47A1] mb-1">
                Ks {pkg.basePrice.toLocaleString()}
              </div>
              <p className="text-sm text-slate-500">+ Ks {pkg.perKm}/km</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">Max weight: {pkg.maxWeight}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">Delivery: {pkg.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">SMS notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">Basic insurance</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-[#0D47A1] text-white rounded hover:bg-blue-700">
                View Stats
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Zone-based Pricing</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Zone</th>
                <th className="px-4 py-3 text-center">Standard</th>
                <th className="px-4 py-3 text-center">Express</th>
                <th className="px-4 py-3 text-center">Premium</th>
                <th className="px-4 py-3 text-center">Distance (km)</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { zone: 'Zone A (City Center)', standard: 2000, express: 3500, premium: 5000, distance: '0-5' },
                { zone: 'Zone B (Suburbs)', standard: 2500, express: 4000, premium: 6000, distance: '5-15' },
                { zone: 'Zone C (Outskirts)', standard: 3500, express: 5500, premium: 8000, distance: '15-30' },
                { zone: 'Zone D (Extended)', standard: 5000, express: 7500, premium: 12000, distance: '30+' },
              ].map((zone, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{zone.zone}</td>
                  <td className="px-4 py-3 text-center text-slate-700">Ks {zone.standard.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-700">Ks {zone.express.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-700">Ks {zone.premium.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{zone.distance}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Contacts View
const ContactsView = () => {
  const [contactType, setContactType] = useState('all');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Contacts Management</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Contact
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select 
          value={contactType} 
          onChange={(e) => setContactType(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
        >
          <option value="all">All Contacts</option>
          <option value="merchants">Merchants</option>
          <option value="customers">Customers</option>
          <option value="suppliers">Suppliers</option>
          <option value="partners">Partners</option>
        </select>
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg bg-white w-full"
          />
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  name: 'Nora Store',
                  type: 'Merchant',
                  phone: '09-123-456-789',
                  email: 'nora@store.com',
                  address: 'Yankin Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'ပီတိစာပေ',
                  type: 'Merchant',
                  phone: '09-987-654-321',
                  email: 'piti@bookstore.mm',
                  address: 'Dagon Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'Ko Thant Zin',
                  type: 'Customer',
                  phone: '09-555-123-456',
                  email: 'thantzin@email.com',
                  address: 'Hlaing Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'Golden Phoenix Restaurant',
                  type: 'Merchant',
                  phone: '09-777-888-999',
                  email: 'info@goldenphoenix.mm',
                  address: 'Tamwe Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'Myanmar Logistics Co.',
                  type: 'Partner',
                  phone: '09-111-222-333',
                  email: 'contact@mmlogistics.com',
                  address: 'Industrial Zone, Yangon',
                  status: 'Active'
                },
              ].map((contact, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{contact.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.type === 'Merchant' ? 'bg-blue-100 text-blue-700' :
                      contact.type === 'Customer' ? 'bg-green-100 text-green-700' :
                      contact.type === 'Partner' ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {contact.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      {contact.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      {contact.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{contact.address}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={contact.status} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">Call</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- ADDITIONAL MISSING VIEWS FROM SCREENSHOT ---

// Broadcast Message Views
const BroadcastCreateMessageView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Create Message</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Send size={16} /> Send Message
        </button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Title</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Enter message title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Content</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg h-32" placeholder="Enter your message content"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg">
                <option>All Users</option>
                <option>Merchants</option>
                <option>Deliverymen</option>
                <option>Customers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const BroadcastMessageListView = () => {
  const messages = [
    { id: 1, title: "System Maintenance Notice", status: "Sent", date: "2024-01-20", recipients: 1250 },
    { id: 2, title: "New Feature Announcement", status: "Draft", date: "2024-01-19", recipients: 0 },
    { id: 3, title: "Holiday Schedule Update", status: "Scheduled", date: "2024-01-18", recipients: 850 }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Message List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Message
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">Title</th>
                <th className="text-left p-4 font-medium text-slate-700">Status</th>
                <th className="text-left p-4 font-medium text-slate-700">Date</th>
                <th className="text-left p-4 font-medium text-slate-700">Recipients</th>
                <th className="text-left p-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{message.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'Sent' ? 'bg-green-100 text-green-800' :
                      message.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{message.date}</td>
                  <td className="p-4 text-slate-600">{message.recipients}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Eye size={16} className="text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Edit size={16} className="text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const FacebookPagesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Facebook Pages</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Connect Page
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Facebook size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Facebook Pages Integration</h3>
        <p>Connect and manage your Facebook business pages for broadcast messaging.</p>
      </Card>
    </div>
  );
};

const ViberBotsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Viber Bots</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Bot
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <MessageCircle size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Viber Bots Management</h3>
        <p>Configure and manage Viber bots for automated customer communication.</p>
      </Card>
    </div>
  );
};

const MediaFilesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Media Files</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Upload size={16} /> Upload Media
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Image size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Media Library</h3>
        <p>Manage images, videos, and other media files for broadcast messages.</p>
      </Card>
    </div>
  );
};

// Teams Sub-Views
const BranchesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Branches</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Branch
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <MapPin size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Branch Management</h3>
        <p>Manage company branches and their operational details.</p>
      </Card>
    </div>
  );
};

const SyncUsersHRMView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Sync Users to HRM</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <RefreshCw size={16} /> Sync Now
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <RefreshCw size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">HRM Synchronization</h3>
        <p>Synchronize user data with Human Resource Management system.</p>
      </Card>
    </div>
  );
};

const ZoneAutoAssignView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Zone and Auto Assign</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Settings size={16} /> Configure
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Crosshair size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Zone Management</h3>
        <p>Configure delivery zones and automatic assignment rules.</p>
      </Card>
    </div>
  );
};

const StationNetworkView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Station Network</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Station
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Network size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Station Network</h3>
        <p>Manage delivery stations and network infrastructure.</p>
      </Card>
    </div>
  );
};

const StationCoveragesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Station Coverages</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Map size={16} /> View Map
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Radio size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Coverage Areas</h3>
        <p>View and manage station coverage areas and service zones.</p>
      </Card>
    </div>
  );
};

const FinancialCenterView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Financial Center</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Download size={16} /> Export Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">$125,430</p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Monthly Profit</p>
              <p className="text-2xl font-bold text-slate-800">$45,230</p>
            </div>
            <TrendingUp className="text-blue-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Expenses</p>
              <p className="text-2xl font-bold text-slate-800">$32,150</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-800">$8,420</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// Pricing and Package Sub-Views
const RegularPricingView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Regular Pricing</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Pricing
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Tags size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Regular Pricing Plans</h3>
        <p>Manage standard pricing structures for delivery services.</p>
      </Card>
    </div>
  );
};

const ExclusivePricingView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Exclusive Pricing</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Exclusive
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Crown size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Exclusive Pricing</h3>
        <p>Manage premium and exclusive pricing for special customers.</p>
      </Card>
    </div>
  );
};

const CashbackPromotionView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Cashback Promotion</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Create Promotion
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Gift size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Cashback Promotions</h3>
        <p>Create and manage cashback promotional campaigns.</p>
      </Card>
    </div>
  );
};

const CodePromotionView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Code Promotion</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Generate Code
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Ticket size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Promotional Codes</h3>
        <p>Generate and manage discount codes and promotional offers.</p>
      </Card>
    </div>
  );
};

// Contacts Sub-Views
const MerchantContactsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Merchant Contacts</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Contact
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Users size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Merchant Contacts</h3>
        <p>Manage contact information for all registered merchants.</p>
      </Card>
    </div>
  );
};

const RecipientContactsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Recipient Contacts</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Recipient
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Contact size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Recipient Contacts</h3>
        <p>Manage delivery recipient contact information and addresses.</p>
      </Card>
    </div>
  );
};

// Customer Support View
const CustomerSupportView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Customer Support</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Ticket
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Open Tickets</p>
              <p className="text-2xl font-bold text-slate-800">24</p>
            </div>
            <AlertCircle className="text-red-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Resolved</p>
              <p className="text-2xl font-bold text-slate-800">156</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// Settings Sub-Views
const BankListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Bank List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Bank
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Building2 size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Bank Management</h3>
        <p>Manage supported banks and financial institutions.</p>
      </Card>
    </div>
  );
};

const SystemSettingsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Settings size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">System Configuration</h3>
        <p>Configure global system settings and preferences.</p>
      </Card>
    </div>
  );
};

const HighwayGateListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Highway Gate List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Gate
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Navigation size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Highway Gates</h3>
        <p>Manage highway gates and toll points for route optimization.</p>
      </Card>
    </div>
  );
};

const PostOfficeListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Post Office List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Office
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Mail size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Post Offices</h3>
        <p>Manage post office locations and service points.</p>
      </Card>
    </div>
  );
};

const PlacesOfInterestView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Places of Interest</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Place
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <MapPin size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Points of Interest</h3>
        <p>Manage important locations and landmarks for delivery reference.</p>
      </Card>
    </div>
  );
};

const TownListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Town List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Town
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Home size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Town Management</h3>
        <p>Manage towns and cities in the delivery service area.</p>
      </Card>
    </div>
  );
};

const TermsConditionsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Terms & Conditions</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Terms & Conditions</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg h-64" placeholder="Enter terms and conditions content..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Privacy Policy</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg h-64" placeholder="Enter privacy policy content..."></textarea>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Audit Logs View
const AuditLogsView = () => {
  const logs = [
    { id: 1, user: "Admin User", action: "Created new delivery", timestamp: "2024-01-20 14:30:25", ip: "192.168.1.100" },
    { id: 2, user: "Manager", action: "Updated merchant profile", timestamp: "2024-01-20 14:25:10", ip: "192.168.1.101" },
    { id: 3, user: "Admin User", action: "Deleted expired promotion", timestamp: "2024-01-20 14:20:45", ip: "192.168.1.100" }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Audit Logs</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Download size={16} /> Export Logs
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">User</th>
                <th className="text-left p-4 font-medium text-slate-700">Action</th>
                <th className="text-left p-4 font-medium text-slate-700">Timestamp</th>
                <th className="text-left p-4 font-medium text-slate-700">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{log.user}</td>
                  <td className="p-4 text-slate-600">{log.action}</td>
                  <td className="p-4 text-slate-600">{log.timestamp}</td>
                  <td className="p-4 text-slate-600">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- Sidebar Navigation ---

interface NavItemProps {
  icon: React.ComponentType<{ size?: number | string }>;
  label: string;
  active?: boolean;
  hasSub?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, active = false, hasSub = false, onClick }: NavItemProps) => (
  <div 
    onClick={onClick}
    className={`
    flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors select-none text-sm mx-2 rounded-md
    ${active ? 'bg-white/10 text-white font-medium' : 'text-slate-300 hover:bg-white/5 hover:text-white'}
  `}>
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span>{label}</span>
    </div>
    {hasSub && <ChevronRight size={14} className="opacity-70" />}
  </div>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, currentView, setView }: SidebarProps) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-[#0D47A1] text-white transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block flex flex-col shadow-2xl
    `}>
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-blue-800 bg-[#0a3a85]">
        <BritiumLogo />
        <div className="ml-3">
          <h1 className="font-bold text-lg leading-none tracking-wide">Britium Express</h1>
          <span className="text-xs text-blue-300 font-light">Delivery Service</span>
        </div>
        <button className="ml-auto lg:hidden" onClick={toggleSidebar}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 scrollbar-hide space-y-1">
        <NavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={currentView === 'dashboard'} 
          onClick={() => setView('dashboard')} 
        />
        <NavItem 
          icon={PlusCircle} 
          label="Create Delivery" 
          active={currentView === 'create_delivery'} 
          onClick={() => setView('create_delivery')} 
        />
        
        <div className="px-6 py-2 text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-4">Operations</div>
        <NavItem 
          icon={Truck} 
          label="Way management" 
          active={currentView === 'way_management'} 
          onClick={() => setView('way_management')} 
          hasSub 
        />

        <NavItem 
          icon={Users} 
          label="Merchants" 
          active={currentView === 'merchants'} 
          onClick={() => setView('merchants')}
          hasSub 
        />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('merchants')}>Merchant list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('receipts')}>Receipts</div>
        </div>

        <NavItem 
          icon={User} 
          label="Deliverymen" 
          active={currentView === 'deliverymen'} 
          onClick={() => setView('deliverymen')}
          hasSub 
        />

        <NavItem icon={FileText} label="Accounting" active={currentView === 'accounting'} onClick={() => setView('accounting')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('cash_book_summary')}>Cash book summary</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('journal_summary')}>Journal summary</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('trial_balance')}>Trial balance</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('income_statement')}>Income statement</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('balance_sheet')}>Balance sheet</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('profit_loss')}>Profit And Loss</div>
        </div>
        
        <NavItem icon={BarChart3} label="Reporting" active={currentView === 'reporting'} onClick={() => setView('reporting')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('ways_count_report')}>Ways count report</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('active_ways_by_town')}>Active ways count by town</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('ways_by_deliverymen')}>Ways by deliverymen</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('ways_by_merchants')}>Ways by merchants</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('overdue_ways_count')}>Overdue ways count</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('overdue_ways_by_deliveryman')}>Overdue ways by deliveryman</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('overdue_ways_by_merchant')}>Overdue ways by merchant</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('total_ways_by_town')}>Total ways by town</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('merchants_order_compare')}>Merchants order compare</div>
        </div>
        
        <div className="flex items-center justify-between px-6 py-2">
          <NavItem icon={Megaphone} label="Broadcast message" active={currentView === 'broadcast_message'} onClick={() => setView('broadcast_message')} hasSub />
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">New</span>
        </div>
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('broadcast_create_message')}>Create message</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('broadcast_message_list')}>Message list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('facebook_pages')}>Facebook pages</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('viber_bots')}>Viber bots</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('media_files')}>Media files</div>
        </div>
        
        <NavItem icon={Briefcase} label="Teams" active={currentView === 'teams'} onClick={() => setView('teams')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('branches')}>Branches</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('sync_users_hrm')}>Sync users to HRM</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('zone_auto_assign')}>Zone and auto assign</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('station_network')}>Station network</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('station_coverages')}>Station coverages</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('financial_center')}>Financial Center</div>
        </div>
        
        <NavItem icon={HeartHandshake} label="HR Management" active={currentView === 'hr_management'} onClick={() => setView('hr_management')} />
        
        <NavItem icon={Tags} label="Pricing and package" active={currentView === 'pricing_package'} onClick={() => setView('pricing_package')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('regular_pricing')}>Regular pricing</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('exclusive_pricing')}>Exclusive pricing</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('cashback_promotion')}>Cashback promotion</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('code_promotion')}>Code promotion</div>
        </div>
        
        <NavItem icon={Contact} label="Contacts" active={currentView === 'contacts'} onClick={() => setView('contacts')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('merchant_contacts')}>Merchant contacts</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('recipient_contacts')}>Recipient contacts</div>
        </div>
        
        <NavItem icon={Headphones} label="Customer support" active={currentView === 'customer_support'} onClick={() => setView('customer_support')} />
        
        <NavItem icon={Settings} label="Settings" active={currentView === 'settings'} onClick={() => setView('settings')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('bank_list')}>Bank list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('system_settings')}>System settings</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('highway_gate_list')}>Highway gate list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('post_office_list')}>Post office list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('places_of_interest')}>Places of interest</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('town_list')}>Town list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('terms_conditions')}>Edit Terms & Conditions</div>
        </div>

        <NavItem icon={FileCheck} label="Audit logs" active={currentView === 'audit_logs'} onClick={() => setView('audit_logs')} />
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-blue-800 bg-[#0a3a85]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white text-[#0D47A1] flex items-center justify-center text-sm font-bold shadow-sm">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">Admin User</p>
            <p className="text-xs text-blue-300 truncate">admin@britium.com</p>
          </div>
          <Settings size={18} className="text-blue-300 cursor-pointer hover:text-white" />
        </div>
      </div>
    </aside>
  );
};

// --- Main App Controller ---

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); 

  const renderContent = () => {
    switch (currentView) {
      case 'create_delivery':
        return <CreateDeliveryView />;
      case 'way_management':
        return <WayManagementView />;
      case 'merchants':
        return <MerchantsView />;
      case 'deliverymen':
        return <DeliverymenView />;
      case 'receipts':
        return <ReceiptsView />;
      case 'accounting':
        return <AccountingView />;
      case 'reporting':
        return <ReportingView />;
      
      // Financial Reports
      case 'cash_book_summary':
        return <CashBookSummaryView />;
      case 'journal_summary':
        return <JournalSummaryView />;
      case 'trial_balance':
        return <TrialBalanceView />;
      case 'income_statement':
        return <IncomeStatementView />;
      case 'balance_sheet':
        return <BalanceSheetView />;
      case 'profit_loss':
        return <ProfitLossView />;
      
      // Reporting Views
      case 'ways_count_report':
        return <WaysCountReportView />;
      case 'active_ways_by_town':
        return <ActiveWaysByTownView />;
      case 'ways_by_deliverymen':
        return <WaysByDeliverymenView />;
      case 'ways_by_merchants':
        return <WaysByMerchantsView />;
      case 'overdue_ways_count':
        return <OverdueWaysCountView />;
      case 'overdue_ways_by_deliveryman':
        return <OverdueWaysByDeliverymanView />;
      case 'overdue_ways_by_merchant':
        return <OverdueWaysByMerchantView />;
      case 'total_ways_by_town':
        return <TotalWaysByTownView />;
      case 'merchants_order_compare':
        return <MerchantsOrderCompareView />;
      
      // Broadcast Message Views
      case 'broadcast_message':
        return <BroadcastMessageView />;
      case 'broadcast_create_message':
        return <BroadcastCreateMessageView />;
      case 'broadcast_message_list':
        return <BroadcastMessageListView />;
      case 'facebook_pages':
        return <FacebookPagesView />;
      case 'viber_bots':
        return <ViberBotsView />;
      case 'media_files':
        return <MediaFilesView />;
      
      // Teams Views
      case 'teams':
        return <TeamsView />;
      case 'branches':
        return <BranchesView />;
      case 'sync_users_hrm':
        return <SyncUsersHRMView />;
      case 'zone_auto_assign':
        return <ZoneAutoAssignView />;
      case 'station_network':
        return <StationNetworkView />;
      case 'station_coverages':
        return <StationCoveragesView />;
      case 'financial_center':
        return <FinancialCenterView />;
      
      // HR Management
      case 'hr_management':
        return <HRManagementView />;
      
      // Pricing Views
      case 'pricing_package':
        return <PricingPackageView />;
      case 'regular_pricing':
        return <RegularPricingView />;
      case 'exclusive_pricing':
        return <ExclusivePricingView />;
      case 'cashback_promotion':
        return <CashbackPromotionView />;
      case 'code_promotion':
        return <CodePromotionView />;
      
      // Contacts Views
      case 'contacts':
        return <ContactsView />;
      case 'merchant_contacts':
        return <MerchantContactsView />;
      case 'recipient_contacts':
        return <RecipientContactsView />;
      
      // Customer Support
      case 'customer_support':
        return <CustomerSupportView />;
      
      // Settings Views
      case 'settings':
        return <SystemSettingsView />;
      case 'bank_list':
        return <BankListView />;
      case 'system_settings':
        return <SystemSettingsView />;
      case 'highway_gate_list':
        return <HighwayGateListView />;
      case 'post_office_list':
        return <PostOfficeListView />;
      case 'places_of_interest':
        return <PlacesOfInterestView />;
      case 'town_list':
        return <TownListView />;
      case 'terms_conditions':
        return <TermsConditionsView />;
      
      // Audit Logs
      case 'audit_logs':
        return <AuditLogsView />;
      
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F6F8] font-sans overflow-hidden text-slate-800">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        currentView={currentView}
        setView={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-slate-100 rounded text-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              {/* Breadcrumb Mockup */}
              <div className="flex items-center text-sm text-slate-500 gap-2">
                <span>Application</span>
                <ChevronRight size={14} />
                <span className="font-semibold text-slate-800 capitalize">{currentView.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Global Search */}
             <div className="hidden md:block relative">
                <Search size={16} className="absolute left-3 top-2 text-slate-400" />
                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-blue-100 w-64 transition-all" />
             </div>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-50 p-1 rounded">
                <div className="w-6 h-4 bg-slate-200 rounded-sm overflow-hidden relative">
                   <div className="absolute inset-0 flex flex-col">
                     <div className="h-1/3 bg-[#00247D]"></div>
                     <div className="h-1/3 bg-white flex items-center justify-center relative">
                        <div className="h-full w-1 bg-[#CF142B] absolute"></div>
                        <div className="w-full h-1 bg-[#CF142B] absolute"></div>
                     </div>
                     <div className="h-1/3 bg-[#00247D]"></div>
                   </div>
                </div>
                <span className="text-sm font-medium text-slate-600 hidden sm:block">EN</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
           {renderContent()}
        </div>
      </main>
    </div>
  );         
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  List, 
  Scan, 
  Search, 
  Filter, 
  Navigation, 
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { 
  DeliveryTask, 
  USER_ROLES, 
  hasPermission 
} from '@/lib/index';
import { mockDeliveryTasks } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { TaskCard } from '@/components/Cards';
import { Scanner } from '@/components/Scanner';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function Delivery() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<DeliveryTask[]>(mockDeliveryTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number }>({ lat: 51.5074, lng: -0.1278 });

  // Check permission
  const canAccess = user && hasPermission(user.role, [
    USER_ROLES.SUPER_ADMIN, 
    USER_ROLES.MANAGER, 
    USER_ROLES.DRIVER, 
    USER_ROLES.RIDER
  ]);

  useEffect(() => {
    // Simulate GPS tracking in a real app
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const filteredTasks = tasks.filter(task => 
    task.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScan = (data: string) => {
    console.log('Scanned data:', data);
    // In a real app, find task by tracking ID and update status or open details
    setIsScannerOpen(false);
  };

  if (!canAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground mt-2">
          You do not have the necessary permissions to access the delivery management system.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background">
      {/* Sticky Header with Controls */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Delivery Fleet</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                Online
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated 1m ago
              </span>
            </div>
          </div>
          <Button 
            onClick={() => setIsScannerOpen(true)}
            className="rounded-full w-12 h-12 p-0 shadow-lg shadow-primary/20"
          >
            <Scan className="w-6 h-6" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search waybill, customer, or address..."
            className="pl-10 bg-secondary/50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="px-4 mt-4">
          <TabsList className="w-full grid grid-cols-2 bg-secondary">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" /> Task List
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Active Map
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="mt-0">
          <motion.div 
            className="px-4 py-6 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <motion.div key={task.id} variants={staggerItem}>
                  <TaskCard task={task} />
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>No delivery tasks found matching your search.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="map" className="mt-0 p-0 h-[calc(100vh-280px)]">
          <div className="h-full w-full rounded-none overflow-hidden">
            <MapView 
              deliveries={filteredTasks}
              currentLocation={currentLocation}
            />
          </div>
          
          {/* Floating Quick Task Info for Map */}
          <div className="absolute bottom-28 left-4 right-4 z-10">
            <AnimatePresence>
              {filteredTasks.find(t => t.status === 'in_progress') && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary uppercase">Current Trip</p>
                      <p className="text-sm font-bold truncate max-w-[180px]">
                        {filteredTasks.find(t => t.status === 'in_progress')?.address}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="rounded-full">
                    Navigate <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* Scanner Overlay */}
      <Scanner 
        isActive={isScannerOpen} 
        onScan={handleScan} 
        onClose={() => setIsScannerOpen(false)} 
      />

      {/* Bottom Padding for Navigation Menu (usually handled by Layout, but keeping page self-contained for visibility) */}
      <div className="h-20" />
    </div>
  );
}
/* =========================================================
   File: src/pages/GreetingPage.tsx
   ========================================================= */
import { ArrowRight, Plane, Truck, HandCoins, LogOut } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

function BrandLogo({ src = "/britium-logo.png" }: { src?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center overflow-hidden">
        {/* If image fails, show letter */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Britium Express"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="text-[#0d2c54] font-extrabold text-xl">{t("B")}</span>
      </div>
      <div className="leading-tight">
        <div className="text-white font-extrabold text-xl">{t("Britium Express")}</div>
        <div className="text-white/80 text-xs">{t("Fast • Reliable • Door-to-door")}</div>
      </div>
    </div>
  );
}

export function GreetingPage() {
  const { t } = useI18n();

  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,44,84,0.92), rgba(13,44,84,0.92)), url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1950&q=80)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo />
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <div className="hidden sm:block text-white/80 text-sm">
                    Welcome, <span className="text-white font-bold">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#ff6b00] text-white font-extrabold hover:bg-orange-600"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-white font-extrabold text-4xl leading-tight">
                Logistics solutions that connect Myanmar to the world.
              </h1>
              <p className="text-white/80 mt-4">
                From domestic parcels to international air cargo, Britium Express delivers with transparent pricing,
                fast pickup, and reliable tracking.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/calculator"
                  className="px-5 py-3 rounded-xl bg-white text-[#0d2c54] font-extrabold inline-flex items-center gap-2"
                >
                  Calculate Shipping <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/send"
                  className="px-5 py-3 rounded-xl bg-[#ff6b00] text-white font-extrabold inline-flex items-center gap-2"
                >
                  Request Pickup <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-4 text-white/70 text-xs">
                Tip: set this page as your route <span className="font-mono">{t("\"/\"")}</span> so deploy won’t show a blank page.
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border p-6">
              <div className="text-xs font-bold text-gray-500 uppercase">{t("Who we are")}</div>
              <div className="mt-2 text-[#0d2c54] font-extrabold text-2xl">{t("Britium Express")}</div>
              <p className="mt-3 text-gray-600">
                We provide nationwide express delivery, COD support for e-commerce, and international air cargo with
                chargeable-weight calculation and customs-ready handling.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#0d2c54]/5 border p-3">
                  <div className="font-extrabold text-[#0d2c54]">{t("Fast")}</div>
                  <div className="text-xs text-gray-600 mt-1">{t("Same-day / Next-day options")}</div>
                </div>
                <div className="rounded-xl bg-[#0d2c54]/5 border p-3">
                  <div className="font-extrabold text-[#0d2c54]">{t("Trackable")}</div>
                  <div className="text-xs text-gray-600 mt-1">{t("End-to-end visibility")}</div>
                </div>
                <div className="rounded-xl bg-[#0d2c54]/5 border p-3">
                  <div className="font-extrabold text-[#0d2c54]">{t("Reliable")}</div>
                  <div className="text-xs text-gray-600 mt-1">{t("Consistent delivery SLA")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-xs font-bold uppercase text-[#0d2c54]">{t("What we do")}</div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#0d2c54]">{t("Core Services")}</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            title={t("Domestic Express")}
            icon={<Truck className="w-6 h-6 text-white" />}
            image="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80"
            desc="Door-to-door delivery connecting Yangon, Mandalay, Nay Pyi Taw and major routes."
            cta={{ label: "Domestic Rates", href: "/calculator" }}
          />
          <ServiceCard
            title={t("COD & E-Commerce")}
            icon={<HandCoins className="w-6 h-6 text-white" />}
            image="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80"
            desc="Grow your shop with COD. We collect and remit quickly with clean reporting."
            cta={{ label: "Seller Info", href: "/services" }}
          />
          <ServiceCard
            title={t("International Cargo")}
            icon={<Plane className="w-6 h-6 text-white" />}
            image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
            desc="Air freight forwarding to key destinations with chargeable-weight calculation."
            cta={{ label: "International Calculator", href: "/calculator" }}
          />
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} Britium Express</footer>
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  image,
  icon,
  cta,
}: {
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
  cta: { label: string; href: string };
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#ff6b00] flex items-center justify-center mx-auto -mt-14 border-[6px] border-white shadow">
          {icon}
        </div>
        <div className="mt-3 font-extrabold text-[#0d2c54] text-xl">{title}</div>
        <p className="mt-2 text-gray-600 text-sm">{desc}</p>
        <a
          href={cta.href}
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-[#0d2c54] text-[#0d2c54] font-bold hover:bg-[#0d2c54] hover:text-white transition"
        >
          {cta.label} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
// src/pages/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig"; // Ensure this points to your config
import { useNavigate, Link } from "react-router-dom";

// --- ASSETS ---
const LOGO_URL = "https://img.sanishtech.com/u/c4db63c2085abfa571109c655dfa68f5.png";

// ⚠️ IMPORTANT: PASTE YOUR GIF URL INSIDE THE QUOTES BELOW ⚠️
const COVER_URL = "PASTE_YOUR_GIF_URL_HERE";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      // --- SECURITY CHECK ---
      if (password === "P@ssw0rd1") {
        alert("⚠️ SECURITY ALERT: You are using the default password 'P@ssw0rd1'.\n\nPlease go to Settings and change your password immediately to secure this account.");
      }

      navigate("/dashboard");
    } catch (err: any) {
      const code: string | undefined = err?.code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/invalid-email") {
        setError("Invalid email or password.");
      } else if (code === "auth/user-not-found") {
        setError("No account found for this email.");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Firebase login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function kept in case you need it later, but unused in UI now
  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError("");
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Left Side: Cover Background (GIF) */}
      <div className="hidden lg:flex w-7/12 relative overflow-hidden bg-gray-900">
        {/* Overlay to ensure text readability over animated GIF */}
        <div className="absolute inset-0 bg-blue-900/30 z-10 mix-blend-multiply" />
        <img 
          src={COVER_URL} 
          alt="Britium Express Logistics Motion Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 text-white">
          <div className="mb-6 w-24 h-1 bg-orange-500 rounded-full" />
          <h2 className="text-5xl font-bold mb-4 shadow-sm drop-shadow-md">Britium Express</h2>
          <p className="text-xl opacity-95 font-medium drop-shadow-md">
            Next-Gen Logistics Powered by Intelligence.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Updated Logo */}
            <img src={LOGO_URL} alt="Britium Logo" className="w-32 mx-auto mb-6" />
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-500">Sign in to manage your operations</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0D47A1] outline-none" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete="email" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <input 
                  type="password" 
                  required 
                  className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0D47A1] outline-none" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="current-password" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 bg-[#0D47A1] text-white font-bold rounded-xl hover:bg-blue-800 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center mt-4">
              <Link to="/signup" className="text-[#0D47A1] font-bold hover:underline">
                Apply for Account
              </Link>
            </div>
          </form>

          {/* --- ADMIN QUICK ACCESS SECTION HIDDEN ---
            To restore, uncomment the block below.
          */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 uppercase tracking-widest mb-4 font-semibold">
              Admin Quick Access
            </p>
            <div className="grid grid-cols-1 gap-3">
              <button 
                type="button" 
                onClick={() => fillDemo("md@britiumexpress.com", "P@ssw0rd1")} 
                className="p-3 bg-blue-50 border border-blue-100 rounded hover:bg-blue-100 text-left flex justify-between items-center group"
              >
                <div>
                  <div className="font-bold text-[#0D47A1]">Super Admin</div>
                  <div className="text-[10px] text-gray-500">md@britiumexpress.com</div>
                </div>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded group-hover:bg-blue-300">Auto-Fill</span>
              </button>

              <button 
                type="button" 
                onClick={() => fillDemo("hod@britiumexpress.com", "P@ssw0rd1")} 
                className="p-3 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 text-left flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-gray-700">Manager (HOD)</div>
                  <div className="text-[10px] text-gray-500">hod@britiumexpress.com</div>
                </div>
              </button>

               <button 
                type="button" 
                onClick={() => fillDemo("mgkyawwanna@gmail.com", "P@ssw0rd1")} 
                className="p-3 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 text-left flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-gray-700">Backup Admin</div>
                  <div className="text-[10px] text-gray-500">mgkyawwanna@gmail.com</div>
                </div>
              </button>
            </div>
          </div> 
          */}

        </div>
      </div>
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Package, 
  ArrowUpDown,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ORDER_STATUS, 
  OrderStatus, 
  Order, 
  getStatusColor 
} from '@/lib/index';
import { mockOrders } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { useSync } from '@/hooks/useSync';
import { OrderCard } from '@/components/Cards';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * Orders Management Page
 * Provides a mobile-optimized interface for tracking and managing logistics orders.
 * Integrated with real-time sync for 2026 production standards.
 */
export default function Orders() {
  const { user } = useAuth();
  const { isOnline, isSyncing, lastSync, forceSync } = useSync();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = 
        order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.receiverName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'ALL' || order.status === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Orders</h1>
            <p className="text-xs text-muted-foreground">
              {isOnline ? (
                <span className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-chart-2" /> 
                  Online • Last sync {lastSync ? new Date(lastSync).toLocaleTimeString() : 'Never'}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-destructive">
                  <WifiOff className="w-3 h-3" /> Offline Mode
                </span>
              )}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => forceSync()}
            disabled={isSyncing || !isOnline}
            className={isSyncing ? 'animate-spin' : ''}
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        {/* Search and Quick Filters */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search tracking, sender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className={isFilterOpen ? 'bg-accent border-primary' : ''}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Status Tabs */}
        <Tabs defaultValue="ALL" className="mt-4 w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-transparent p-0 flex overflow-x-auto no-scrollbar justify-start gap-4">
            {['ALL', ...Object.values(ORDER_STATUS)].map((status) => (
              <TabsTrigger 
                key={status} 
                value={status}
                className="px-0 pb-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-medium text-xs whitespace-nowrap"
              >
                {status.replace(/_/g, ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </header>

      {/* Orders List */}
      <main className="flex-1 px-4 py-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredOrders.map((order) => (
                <motion.div key={order.id} variants={staggerItem}>
                  <OrderCard order={order} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No orders found</h3>
              <p className="text-sm text-muted-foreground max-w-[200px] mx-auto mt-1">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                variant="link" 
                className="mt-2 text-primary"
                onClick={() => { setSearchTerm(''); setActiveTab('ALL'); }}
              >
                Reset all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button for Warehouse/Admin (Mock) */}
      {['SUPER_ADMIN', 'WAREHOUSE'].includes(user?.role || '') && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springPresets.bouncy}
          className="fixed bottom-24 right-6"
        >
          <Button className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90">
            <Package className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Offline Sync Warning */}
      {!isOnline && (
        <div className="fixed bottom-20 left-0 right-0 bg-destructive/90 text-destructive-foreground py-2 px-4 flex items-center justify-between text-xs font-medium backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Working offline. Changes will sync when reconnected.
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Settings,
  RefreshCw,
  Wifi,
  WifiOff,
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  HelpCircle,
  Smartphone,
  History
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSync } from '@/hooks/useSync';
import { APP_VERSION, COPYRIGHT_YEAR } from '@/lib/index';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * Profile Page Component
 * Features user account management, real-time sync status, and offline mode control.
 */
export default function Profile() {
  const { user, logout } = useAuth();
  const { isOnline, isSyncing, lastSync, forceSync } = useSync();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className="flex flex-col gap-6 pb-24"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.section variants={fadeInUp} className="px-4 pt-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">{user?.name || 'User Profile'}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <Badge variant="secondary" className="mt-1 w-fit capitalize bg-primary/10 text-primary border-none">
              {user?.role?.toLowerCase().replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </motion.section>

      {/* Sync & Connectivity Status */}
      <motion.section variants={fadeInUp} className="px-4">
        <Card className="overflow-hidden border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className={`h-5 w-5 ${isSyncing ? 'animate-spin text-primary' : ''}`} />
              System Sync
            </CardTitle>
            <CardDescription>
              Keep your device data synchronized with the main server
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isOnline ? 'bg-chart-2/10' : 'bg-destructive/10'}`}>
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-chart-2" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Connectivity</p>
                  <p className="text-xs text-muted-foreground">
                    {isOnline ? 'Connected to Cloud' : 'Offline Mode Active'}
                  </p>
                </div>
              </div>
              <Badge variant={isOnline ? 'outline' : 'destructive'} className="font-mono">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <History className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Synchronized</p>
                  <p className="text-xs text-muted-foreground">{formatDate(lastSync)}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={forceSync}
                disabled={!isOnline || isSyncing}
                className="h-8 text-xs"
              >
                Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Settings Sections */}
      <motion.section variants={fadeInUp} className="px-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            App Settings
          </h2>
          <Card className="border-border/50">
            <div className="divide-y divide-border/50">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Push Notifications</span>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Biometric Login</span>
                </div>
                <Switch />
              </div>

              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Security & Privacy</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-1 pt-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Support
          </h2>
          <Card className="border-border/50">
            <div className="divide-y divide-border/50">
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Help Center</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Terms of Service</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* App Info & Actions */}
      <motion.section variants={fadeInUp} className="px-4 pt-4">
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="destructive" 
            className="w-full h-12 text-base font-semibold shadow-lg shadow-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>

          <div className="text-center space-y-1 opacity-60">
            <p className="text-xs font-medium">Britium Express Mobile v{APP_VERSION}</p>
            <p className="text-[10px]">© {COPYRIGHT_YEAR} Britium Express. All rights reserved.</p>
          </div>
        </div>
      </motion.section>

      {/* Bottom Padding for Nav */}
      <div className="h-4" />
    </motion.div>
  );
}
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Ensure path matches your setup
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [role, setRole] = useState<string>('loading'); // 'admin' | 'user' | 'loading'

  // Fetch User Role from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Assuming you have a 'users' collection where doc ID = user UID
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setRole(data.role || 'user'); // Default to user if no role found
          } else {
            // Fallback if no specific user doc exists yet
            setRole('user');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setRole('user');
        }
      } else {
        // Not logged in
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (role === 'loading') return <div style={styles.container}>Loading settings...</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Settings</h1>
        <span style={role === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
          {role.toUpperCase()} ACCOUNT
        </span>
      </header>

      {/* Profile Card */}
      <section style={styles.card}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarPlaceholder}>
            {auth.currentUser?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 style={styles.cardTitle}>{userData?.name || "User"}</h2>
            <p style={styles.emailText}>{auth.currentUser?.email}</p>
          </div>
        </div>
      </section>

      {/* Admin Only Controls */}
      {role === 'admin' && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Admin Controls</h3>
          <div style={styles.card}>
            <button style={styles.menuItem} onClick={() => navigate('/admin/users')}>
              Manage Users
            </button>
            <button style={styles.menuItem} onClick={() => navigate('/admin/reports')}>
              System Reports
            </button>
            <button style={styles.menuItem} onClick={() => navigate('/admin/settings')}>
              Global Configuration
            </button>
          </div>
        </section>
      )}

      {/* General Settings (For Everyone) */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>General</h3>
        <div style={styles.card}>
          <button style={styles.menuItem}>Change Password</button>
          <button style={styles.menuItem}>Notification Preferences</button>
          <button style={styles.menuItem}>Privacy Policy</button>
        </div>
      </section>

      {/* Logout Button */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
};

// --- Simple Inline CSS Styles ---
// You can replace these with Tailwind classes if you prefer
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  badgeAdmin: {
    backgroundColor: '#ff4757',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  badgeUser: {
    backgroundColor: '#2ed573',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    padding: '15px',
    overflow: 'hidden',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  avatarPlaceholder: {
    width: '50px',
    height: '50px',
    backgroundColor: '#dfe4ea',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#555',
  },
  cardTitle: {
    fontSize: '18px',
    margin: '0',
    color: '#333',
  },
  emailText: {
    fontSize: '14px',
    color: '#777',
    margin: '0',
  },
  menuItem: {
    display: 'block',
    width: '100%',
    padding: '12px 0',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: 'transparent',
    textAlign: 'left' as const,
    fontSize: '16px',
    cursor: 'pointer',
    color: '#333',
  },
  logoutButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#fff',
    color: '#ff4757',
    border: '1px solid #ff4757',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  }
};

export default Settings;
import React, { useState, useMemo } from 'react';
import {
  Package,
  ScanLine,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Filter,
  AlertCircle,
  History,
  LayoutDashboard,
  Boxes
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ROUTE_PATHS, 
  ORDER_STATUS, 
  Order, 
  getStatusColor 
} from '@/lib/index';
import { mockOrders } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard, OrderCard } from '@/components/Cards';
import { Scanner } from '@/components/Scanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * Warehouse Operations Page
 * Handles inventory management, package scanning, and stock monitoring.
 * Current Year: 2026
 */
export default function Warehouse() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');

  // Mock logic for scanning
  const handleScan = (data: string) => {
    setIsScannerOpen(false);
    const foundOrder = mockOrders.find(o => o.trackingNumber === data || o.id === data);
    
    if (foundOrder) {
      toast({
        title: "Package Identified",
        description: `Tracking: ${foundOrder.trackingNumber} found in system.`,
      });
      // In a real app, this would open a package detail modal or update status
    } else {
      toast({
        title: "Unknown Barcode",
        description: "This package is not in the local manifest.",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => 
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.receiverName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = {
    total: mockOrders.length,
    inbound: mockOrders.filter(o => o.status === ORDER_STATUS.PENDING).length,
    outbound: mockOrders.filter(o => o.status === ORDER_STATUS.OUT_FOR_DELIVERY).length,
    storage: 82 // Mock percentage
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header Area */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Warehouse Operations</h1>
            <p className="text-sm text-muted-foreground">Station: {user?.stationId || 'Main Hub'}</p>
          </div>
          <Button 
            size="icon" 
            variant="default" 
            className="rounded-full w-12 h-12 shadow-lg shadow-primary/20"
            onClick={() => setIsScannerOpen(true)}
          >
            <ScanLine className="w-6 h-6" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search waybill or tracking ID..." 
            className="pl-10 bg-muted/50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <Tabs defaultValue="inventory" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/30 p-1">
            <TabsTrigger value="overview" className="flex gap-2 items-center">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex gap-2 items-center">
              <Boxes className="w-4 h-4" /> Stock
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex gap-2 items-center">
              <History className="w-4 h-4" /> Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Total Packages"
                    value={stats.total.toString()}
                    icon={<Package className="text-primary" />}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Inbound Today"
                    value={stats.inbound.toString()}
                    icon={<ArrowDownToLine className="text-chart-2" />}
                    trend="+12%"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Outbound"
                    value={stats.outbound.toString()}
                    icon={<ArrowUpFromLine className="text-chart-3" />}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Storage Utilization"
                    value={`${stats.storage}%`}
                    icon={<AlertCircle className="text-destructive" />}
                  />
                </motion.div>
              </div>

              <motion.div variants={staggerItem} className="relative h-48 rounded-2xl overflow-hidden mt-4">
                <img 
                  src={IMAGES.WAREHOUSE_MOBILE_1} 
                  alt="Warehouse View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">Active Zone</p>
                    <h3 className="text-lg font-bold">Main Distribution Floor</h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Current Stock ({filteredOrders.length})</h2>
              <Button variant="ghost" size="sm" className="text-primary flex gap-1">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <motion.div key={order.id} variants={staggerItem}>
                    <OrderCard order={order} />
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mb-2 opacity-20" />
                  <p>No matching packages found</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    {i % 2 === 0 ? <ArrowDownToLine className="w-5 h-5 text-chart-2" /> : <ArrowUpFromLine className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm truncate">
                        {i % 2 === 0 ? 'Package Checked-in' : 'Dispatched to Fleet'}
                      </p>
                      <span className="text-[10px] text-muted-foreground uppercase">{10 + i}:25 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">BTX-2026-{8000 + i}X by Operator Elena</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      {/* Scanner Modal Overlay */}
      <AnimatePresence>
        {isScannerOpen && (
          <Scanner 
            isActive={isScannerOpen} 
            onScan={handleScan} 
            onClose={() => setIsScannerOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Action Bar for Warehouse */}
      <div className="fixed bottom-4 left-4 right-4 flex gap-2">
        <Button className="flex-1 h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 gap-2 font-bold">
          <ArrowDownToLine className="w-5 h-5" />
          Receive Load
        </Button>
        <Button className="flex-1 h-14 rounded-2xl bg-secondary text-secondary-foreground shadow-xl border border-border gap-2 font-bold">
          <ArrowUpFromLine className="w-5 h-5" />
          Dispatch Load
        </Button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

// --- 1. FIREBASE IMPORTS ---
// Adjust this path if your file is in a subfolder!
// If this file is in 'src/pages/', use '../firebase'
// If this file is in 'src/pages/admin/', use '../../firebase'
import { db } from '../firebase'; 
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

// --- 2. INTERFACE DEFINITION (Internal) ---
interface Way {
  id?: string;
  wayId: string;
  merchant: string;
  merchantId: string;
  town: string;
  pickupBy: string;
  status: string;
  category: string;
  createdAt: any;
  totalWays: number;
}

const WayManagement = () => {
  const [activeTab, setActiveTab] = useState('parcel_in_out'); 
  const [ways, setWays] = useState<Way[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 3. SYNCHRONIZATION LOGIC (Inside Component) ---
  useEffect(() => {
    setLoading(true);
    
    // Safety check for DB connection
    if (!db) {
      console.error("Firebase DB is not initialized");
      setLoading(false);
      return;
    }

    try {
      const waysRef = collection(db, 'ways');
      const q = query(
        waysRef, 
        where("category", "==", activeTab),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedWays = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Way));
        setWays(loadedWays);
        setLoading(false);
      }, (error) => {
        console.error("Snapshot Error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Query Error:", err);
      setLoading(false);
    }
  }, [activeTab]);

  // --- 4. DEBUG CREATE FUNCTION ---
  const handleCreateWay = async () => {
    const confirmCreate = window.confirm("Create a new test Way?");
    if (!confirmCreate) return;

    if (!db) {
      alert("CRITICAL ERROR: 'db' is undefined. Check your firebase.ts import path!");
      return;
    }

    try {
      setLoading(true);
      const newWay = {
        merchant: "The Shopping Cart",
        merchantId: "M000004287",
        town: "ADSIT",
        pickupBy: "Kyaw Zin Khant",
        category: activeTab,
        totalWays: 1,
        status: 'ARRIVED_REQUESTING',
        wayId: `WAY-${Math.floor(Math.random() * 100000)}`,
        createdAt: serverTimestamp(),
      };

      // Writing to 'ways' collection
      await addDoc(collection(db, 'ways'), newWay);
      alert("✅ Way Created Successfully!");
      
    } catch (e: any) {
      console.error("Firebase Write Error:", e);
      alert(`❌ FAILED: ${e.message}`); 
    } finally {
      setLoading(false);
    }
  };

  // --- 5. EXPORT FUNCTION ---
  const handleExport = () => {
    if (ways.length === 0) {
      alert("No data to export!");
      return;
    }

    const headers = ["Way ID", "Merchant", "Status", "Town", "Pickup By"];
    const csvContent = [
      headers.join(","),
      ...ways.map(w => 
        `${w.wayId},"${w.merchant}",${w.status},${w.town},${w.pickupBy}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `way_export_${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Way Management</h1>
          <p className="text-gray-500">Comprehensive order processing and tracking</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-2"
          >
            Export
          </button>
          <button 
            onClick={handleCreateWay}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center gap-2"
          >
            + Create Way (Debug)
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm font-medium text-gray-500 overflow-x-auto">
        {['Pickup ways', 'Deliver ways', 'Failed ways', 'Return ways', 'parcel_in_out', 'Transit route', 'Tracking map'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, '_'))}
            className={`pb-3 whitespace-nowrap ${
              activeTab === tab.toLowerCase().replace(/ /g, '_') 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'hover:text-gray-700'
            }`}
          >
            {tab.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            {tab === 'parcel_in_out' ? 'Parcel In/Out' : ''} 
          </button>
        ))}
      </div>

      {/* SUB TABS */}
      {activeTab === 'parcel_in_out' && (
        <div className="flex gap-4 mb-4">
            <button className="text-blue-800 font-semibold border-b-2 border-blue-800 pb-1">Pickup parcels (IN)</button>
            <button className="text-gray-500 pb-1">Deliver parcels (OUT)</button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-4"><input type="checkbox" /></th>
              <th className="p-4">STATUS</th>
              <th className="p-4">TOTAL WAYS</th>
              <th className="p-4">WAY ID</th>
              <th className="p-4">MERCHANT</th>
              <th className="p-4">MERCHANT ID</th>
              <th className="p-4">TOWN</th>
              <th className="p-4">PICKUP BY</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan={8} className="p-6 text-center">Loading data...</td></tr>
            ) : ways.length === 0 ? (
               <tr><td colSpan={8} className="p-6 text-center text-gray-500">No ways found in this category.</td></tr>
            ) : (
              ways.map((way) => (
                <tr key={way.id} className="border-b hover:bg-gray-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">
                      {way.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{way.totalWays || 1}</td>
                  <td className="p-4 font-mono text-gray-600">{way.wayId}</td>
                  <td className="p-4">{way.merchant}</td>
                  <td className="p-4 text-gray-500">{way.merchantId}</td>
                  <td className="p-4">{way.town}</td>
                  <td className="p-4 text-blue-600 cursor-pointer">{way.pickupBy}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WayManagement;