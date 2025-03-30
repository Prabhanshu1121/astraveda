// src/app/api/payment/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, currency, description, customerEmail, paymentMethodId } = await req.json();
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method: paymentMethodId,
      confirm: true,
      receipt_email: customerEmail,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    });
    
    return NextResponse.json({ 
      success: true, 
      paymentIntent 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 400 });
  }
}