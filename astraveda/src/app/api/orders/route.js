import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    let orders;
    if (token.role === 'admin') {
      orders = await Order.find().populate('user', 'name email');
    } else {
      orders = await Order.find({ user: token.id }).populate('user', 'name email');
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { items, total, shippingAddress, paymentMethod } = await req.json();

    // Reduce product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, { 
        $inc: { stock: -item.quantity } 
      });
    }

    const order = new Order({
      user: token.id,
      items,
      total,
      shippingAddress,
      paymentMethod,
      status: 'processing',
    });

    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}