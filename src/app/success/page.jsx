import { savePaymentAction } from '@/lib/actions/proposals'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { SealCheck } from '@gravity-ui/icons' // অথবা তোমার পছন্দমতো আইকন লাইব্রেরি

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) throw new Error('Please provide a valid session_id')

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if (session.status === 'open') return redirect('/')

  if (session.status === 'complete') {
    const paymentData = {
      client_email: session.metadata.client_email,
      freelancer_email: session.metadata.freelancer_email,
      task_id: session.metadata.task_id,
      amount: parseFloat(session.metadata.amount),
      transaction_id: session.id,
      payment_status: session.payment_status
    };

    await savePaymentAction(paymentData);

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center shadow-2xl">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <SealCheck className="w-10 h-10 text-green-500" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400 mb-8">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>

          {/* Payment Details Card */}
          <div className="bg-slate-950 rounded-lg p-4 mb-8 text-left border border-slate-800">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-500">Amount</span>
              <span className="text-white font-medium">${session.metadata.amount}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Receipt Email</span>
              <span className="text-white font-medium truncate ml-2">{session.customer_details.email}</span>
            </div>
          </div>

          {/* Action Button */}
          <a 
            href="/dashboard/client/my-tasks" 
            className="block w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-lg transition-all"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }
}