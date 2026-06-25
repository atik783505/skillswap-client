import { savePaymentAction } from '@/lib/actions/proposals'
import { stripe } from '@/lib/stripe'

import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id')

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
      <section id="success">
        <p>
          Thank you! Payment successful. {session.customer_details.email}
        </p>
      </section>
    )
  }
}