
import { ApiRequest, ApiResponse } from '@/types';

export default async function handler(
  req: ApiRequest,
  res: ApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, email, currency, amount } = req.body;

  if (!reference || !email || !currency || !amount) {
    return res.status(400).json({ 
      error: 'Reference, email, currency, and amount are required' 
    });
  }

  try {
    // In a real implementation, you would:
    // 1. Record the payment details in your database
    // 2. Mark the order as pending until crypto payment is verified
    // 3. Send confirmation email to the customer
    
    // Mock response for demo
    return res.status(200).json({ 
      success: true,
      message: 'Payment recorded successfully',
      order_id: `ORDER-${Date.now()}`,
      status: 'pending'
    });
  } catch (error) {
    console.error('Error recording crypto payment:', error);
    return res.status(500).json({ 
      error: 'Failed to record payment' 
    });
  }
}
