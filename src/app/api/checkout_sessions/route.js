import { NextResponse } from "next/server";

import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

export async function POST(req) {

  try {

    const body = await req.json();

    const amount = Number(body?.amount);

    if (!amount || amount < 1) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount"
        },
        {
          status: 400
        }
      );

    }

    const headersList = await headers();

    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {

            currency: "usd",

            product_data: {
              name: "Roktoneer Funding"
            },

            unit_amount: amount * 100
          },

          quantity: 1
        }
      ],

      success_url: `${origin}/funding/success?amount=${amount}`,

      cancel_url: `${origin}/funding`
    });

    return NextResponse.json({
      success: true,
      url: session.url
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message
      },
      {
        status: 500
      }
    );

  }

}