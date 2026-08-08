import { getFreelancerEarnings } from '@/lib/api/proposals';
import { getSessionData } from '@/lib/core/session';
import { Bucket, Calendar, Person, File } from '@gravity-ui/icons';
import EarningsTable from './EarningsTable';

const MyEarnings = async () => {
    const user = await getSessionData();
    const raw = await getFreelancerEarnings(user?.email);
    const earnings = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
    const totalAmount = earnings.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    return (
        <div className="w-full space-y-6">
            {/* Header + Total card */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-heading)" }}>
                        My Earnings
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        A complete breakdown of finished tasks and payments received.
                    </p>
                </div>

                <div
                    className="rounded-2xl p-5 w-full lg:w-72 flex flex-col justify-between min-h-[110px]"
                    style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        borderLeft: "4px solid #10b981",
                        boxShadow: "var(--shadow-sm)",
                    }}
                >
                    <div
                        className="p-2.5 rounded-xl w-fit"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                    >
                        <Bucket className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="mt-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                            Total Earned
                        </p>
                        <h3 className="text-3xl font-extrabold tracking-tight text-emerald-500 mt-1">
                            ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Table — client component handles hover events */}
            <EarningsTable earnings={earnings} />
        </div>
    );
};

export default MyEarnings;
