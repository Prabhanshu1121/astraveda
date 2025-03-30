import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit')) || 10;

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).limit(limit);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}