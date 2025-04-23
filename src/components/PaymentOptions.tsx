
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Check, Bitcoin } from "lucide-react";
import { CartItem } from "@/types";

const shippingFormSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

const cryptoOptionsSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  cryptoType: z.enum(["bitcoin", "ethereum", "usdt"]),
});

type CryptoFormValues = z.infer<typeof cryptoOptionsSchema>;

interface PaymentOptionsProps {
  cartItems: CartItem[];
  totalPrice: number;
  onPaymentComplete: () => void;
}

const PaymentOptions = ({ cartItems, totalPrice, onPaymentComplete }: PaymentOptionsProps) => {
  const [cryptoStep, setCryptoStep] = useState<"shipping" | "address">("shipping");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [shippingDetails, setShippingDetails] = useState<any>(null);
  const { toast } = useToast();

  // Form for crypto payment
  const cryptoForm = useForm<CryptoFormValues>({
    resolver: zodResolver(cryptoOptionsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      cryptoType: "bitcoin",
    },
  });

  const handleCryptoSelection = async (data: CryptoFormValues) => {
    try {
      // Save shipping information
      setShippingDetails({
        fullName: data.fullName,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country
      });

      // Create crypto transaction
      const response = await fetch('/api/crypto/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: data.cryptoType,
          amount: totalPrice,
          email: data.email,
          items: cartItems.map(item => ({
            id: item.product.id,
            title: item.product.title,
            size: item.product.size || "N/A",
            quantity: item.quantity,
            price: item.product.price
          })),
          shippingAddress: {
            fullName: data.fullName,
            address: data.address,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        setCryptoAddress(result.wallet_address);
        setCryptoCurrency(data.cryptoType);
        setPaymentReference(result.payment_reference);
        setCryptoStep("address");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create crypto transaction",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Crypto transaction error:", error);
      toast({
        title: "Error",
        description: "Something went wrong with the crypto transaction",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSent = async () => {
    try {
      // Record the crypto payment
      await fetch('/api/crypto/payment-sent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: paymentReference,
          email: shippingDetails.email,
          currency: cryptoCurrency,
          amount: totalPrice,
          items: cartItems.map(item => ({
            id: item.product.id,
            title: item.product.title,
            size: item.product.size || "N/A",
            quantity: item.quantity,
            price: item.product.price
          })),
          shippingAddress: shippingDetails,
        }),
      });

      toast({
        title: "Success!",
        description: "Your payment has been recorded. We'll process your order shortly.",
      });

      onPaymentComplete();
    } catch (error) {
      console.error("Error recording payment:", error);
      toast({
        title: "Error",
        description: "Failed to record your payment. Please contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Crypto payment form - Shipping Information */}
      {cryptoStep === "shipping" && (
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>
              Please provide your shipping details for delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...cryptoForm}>
              <form 
                onSubmit={cryptoForm.handleSubmit(handleCryptoSelection)} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={cryptoForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={cryptoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={cryptoForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={cryptoForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={cryptoForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={cryptoForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={cryptoForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cryptoForm.control}
                  name="cryptoType"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel>Select Cryptocurrency</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="bitcoin" id="bitcoin" />
                            <Label htmlFor="bitcoin" className="flex-1 cursor-pointer">Bitcoin (BTC)</Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="ethereum" id="ethereum" />
                            <Label htmlFor="ethereum" className="flex-1 cursor-pointer">Ethereum (ETH)</Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="usdt" id="usdt" />
                            <Label htmlFor="usdt" className="flex-1 cursor-pointer">Tether (USDT)</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full mt-4">
                  Continue
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Crypto address display */}
      {cryptoStep === "address" && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Send exactly ${totalPrice.toFixed(2)} worth of {cryptoCurrency}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <p className="text-sm font-medium mb-1">Send payment to:</p>
              <p className="bg-gray-100 p-3 rounded break-all text-sm font-mono">
                {cryptoAddress}
              </p>
            </div>
            
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
              <p className="text-amber-800 font-medium text-sm">
                ⚠️ Important: After sending your payment, click the "Payment Sent" button below to complete your order.
              </p>
            </div>
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>• Transaction Reference: {paymentReference}</p>
              <p>• Please keep this reference for your records</p>
              <p>• Payments typically confirm within 10-60 minutes</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePaymentSent} className="w-full">
              <Check className="mr-2 h-4 w-4" /> Payment Sent
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PaymentOptions;
