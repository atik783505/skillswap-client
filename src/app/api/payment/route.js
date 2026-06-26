import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const formData = await request.formData();

    const client_email = formData.get('client_email');
    const freelancer_email = formData.get('freelancer_email');
    const task_id = formData.get('task_id');
    const amount = formData.get('amount');
    const proposal_id = formData.get('proposal_id')
    console.log("Proposal ID received from form:", proposal_id); // এটি চেক করুন

    if (!proposal_id) {
      console.error("Critical Error: proposal_id is missing from FormData!");
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: client_email,
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: Number(amount) * 100,
          product_data: { name: `Payment for Task: ${task_id}` },
        },
        quantity: 1,
      }],
      metadata: {
        client_email,
        freelancer_email,
        task_id,
        amount: String(amount),
        proposal_id
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}