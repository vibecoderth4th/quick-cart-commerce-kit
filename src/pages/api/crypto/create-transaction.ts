
import type { NextApiRequest, NextApiResponse } from 'next';

// ADMIN: implement crypto-wallet addresses under this route
const walletAddresses = {
  bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Example address
  ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Example address
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { currency, amount } = req.body;

  if (!currency || !amount) {
    return res.status(400).json({ 
      error: 'Currency and amount are required' 
    });
  }

  try {
    // In a real implementation, you would:
    // 1. Validate the currency
    // 2. Generate a unique payment ID/reference
    // 3. Return the appropriate wallet address for the customer to pay to
    
    // Mock response
    return res.status(200).json({ 
      success: true,
      payment_reference: `CRYPTO-${Date.now()}`,
      wallet_address: walletAddresses[currency as keyof typeof walletAddresses] || '',
      amount: amount,
      currency: currency,
      expiry: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    });
  } catch (error) {
    console.error('Crypto transaction creation error:', error);
    return res.status(500).json({ 
      error: 'Failed to create crypto transaction' 
    });
  }
}
