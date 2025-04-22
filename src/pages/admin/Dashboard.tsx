
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { getProductsByCategory, products } from "@/data/products";

// Mock crypto payment records - in a real app, this would come from your backend
const cryptoPayments = [
  {
    id: "crypto-1",
    email: "customer@example.com",
    currency: "bitcoin",
    amount: 129.99,
    reference: "CRYPTO-1682512345",
    status: "pending",
    date: "2025-04-15T14:30:00Z"
  },
  {
    id: "crypto-2",
    email: "another@example.com",
    currency: "ethereum",
    amount: 89.99,
    reference: "CRYPTO-1682598765",
    status: "completed",
    date: "2025-04-14T09:15:00Z"
  }
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "products"
  );
  
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "men"
  );
  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
  });
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    const category = searchParams.get("category");
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value, ...(value === "products" ? { category: activeCategory } : {}) });
  };
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setSearchParams({ tab: activeTab, category: value });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form data
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Product title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      toast({
        title: "Error",
        description: "Product price must be a valid number",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.image.trim()) {
      toast({
        title: "Error",
        description: "Product image URL is required",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to add the product
    // For this demo, we'll just show a success toast
    toast({
      title: "Product Added",
      description: `${formData.title} has been added to ${activeCategory}`,
    });
    
    // Reset the form
    setFormData({
      title: "",
      price: "",
      image: "",
    });
  };
  
  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would call an API to delete the product
    // For this demo, we'll just show a success toast
    toast({
      title: "Product Deleted",
      description: "The product has been deleted",
    });
  };
  
  const categoryProducts = getProductsByCategory(activeCategory);
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
                <TabsList className="mb-4">
                  <TabsTrigger value="men">Men</TabsTrigger>
                  <TabsTrigger value="women">Women</TabsTrigger>
                  <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
                </TabsList>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {activeCategory === "men" ? "Men's Products" : 
                     activeCategory === "women" ? "Women's Products" : 
                     "Collectibles"}
                  </h3>
                  
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">ID</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.id}</TableCell>
                            <TableCell>
                              <img
                                src={product.image}
                                alt={product.title}
                                className="h-12 w-12 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => {
                                  // In a real app, this would open an edit form
                                  toast({
                                    title: "Edit Product",
                                    description: `Editing ${product.title}`,
                                  });
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter product title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                  
                  {formData.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-2">Preview:</p>
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="h-32 w-32 object-cover rounded"
                        onError={(e) => {
                          // Handle image load errors
                          (e.target as HTMLImageElement).src = "/public/placeholder.svg";
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="pt-2">
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.reference}</TableCell>
                        <TableCell>{payment.email}</TableCell>
                        <TableCell className="capitalize">{payment.currency}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(payment.date).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
