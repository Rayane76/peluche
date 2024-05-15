import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export async function POST(req) {
  const data= await req.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "EUR",
    });
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}