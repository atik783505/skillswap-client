import { savePaymentAction } from '@/lib/actions/proposals';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { SealCheck } from '@gravity-ui/icons';
import Link from 'next/link';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) throw new Error('Please provide a valid session_id');

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status === 'open') return redirect('/');

    if (session.status === 'complete') {
        const paymentData = {
            task_title:       session.metadata.task_title,
            client_email:     session.metadata.client_email,
            freelancer_email: session.metadata.freelancer_email,
            task_id:          session.metadata.task_id,
            proposal_id:      session.metadata.proposal_id,
            amount:           parseFloat(session.metadata.amount),
            transaction_id:   session.id,
            payment_status:   session.payment_status,
        };

        await savePaymentAction(paymentData);

        return (
            <div
                className="min-h-screen flex items-center justify-center p-4"
                style={{ background: "var(--bg-primary)" }}
            >
                <div
                    className="max-w-md w-full p-8 rounded-2xl text-center"
                    style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        boxShadow: "var(--shadow-lg)",
                    }}
                >
                    {/* Icon */}
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
                    >
                        <SealCheck className="w-10 h-10 text-emerald-500" />
                    </div>

                    <h1 className="text-2xl font-extrabold mb-2" style={{ color: "var(--text-heading)" }}>
                        Payment Successful!
                    </h1>
                    <p className="text-sm mb-7" style={{ color: "var(--text-secondary)" }}>
                        Your transaction has been completed successfully. The freelancer will be notified.
                    </p>

                    {/* Details */}
                    <div
                        className="rounded-xl p-4 mb-7 text-left space-y-0"
                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                    >
                        {[
                            { label: "Task", value: session.metadata.task_title || 'N/A' },
                            { label: "Amount", value: `$${session.metadata.amount}` },
                            { label: "Receipt", value: session.customer_details?.email },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="flex justify-between py-2.5"
                                style={{ borderBottom: "1px solid var(--border-color)" }}
                            >
                                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</span>
                                <span className="text-sm font-semibold truncate ml-4 max-w-[200px] text-right" style={{ color: "var(--text-heading)" }}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/dashboard/client"
                        className="block w-full h-11 rounded-xl text-sm font-bold text-white flex items-center justify-center transition-all"
                        style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                        }}
                    >
                        Go to Dashboard →
                    </Link>
                </div>
            </div>
        );
    }
}
