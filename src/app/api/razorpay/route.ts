import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const order = await razorpay.orders.create({
            amount: 10000 * 100, // Amount in paise (₹10,000)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                product: "Zenith X Sunglasses"
            }
        });

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error: any) {
        console.error('Razorpay Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}
