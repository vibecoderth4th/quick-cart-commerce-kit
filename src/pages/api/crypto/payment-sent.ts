
import { ApiRequest, ApiResponse } from '@/types';

// Mock database for orders in a real app
const orders: any[] = [];

export default async function handler(
  req: ApiRequest,
  res: ApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, email, currency, amount, items, shippingAddress } = req.body;

  if (!reference || !email || !currency || !amount || !items || !shippingAddress) {
    return res.status(400).json({ 
      error: 'Missing required fields' 
    });
  }

  try {
    // Create order record
    const order = {
      id: `ORDER-${Date.now()}`,
      reference,
      email,
      status: 'pending',
      date: new Date().toISOString(),
      items: items.map((item: any) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "N/A"
      })),
      totalPrice: amount,
      currency,
      shippingAddress,
    };

    // In a real implementation, save to database
    orders.push(order);
    
    // For demo purposes, log the order
    console.log("New order created:", order);
    
    return res.status(200).json({ 
      success: true,
      message: 'Payment recorded successfully',
      order_id: order.id,
      status: 'pending'
    });
  } catch (error) {
    console.error('Error recording crypto payment:', error);
    return res.status(500).json({ 
      error: 'Failed to record payment' 
    });
  }
}
