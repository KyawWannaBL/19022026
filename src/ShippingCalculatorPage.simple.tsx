import React from 'react';
import { Calculator, MapPin, Plane, Package } from 'lucide-react';

export default function ShippingCalculatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shipping Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate domestic and international shipping rates
        </p>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Calculate Shipping Cost</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Shipping Type</label>
              <select className="w-full p-2 border border-border rounded-lg">
                <option>Domestic Shipping</option>
                <option>International Shipping</option>
                <option>Express Delivery</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option>Yangon</option>
                  <option>Mandalay</option>
                  <option>Naypyidaw</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select className="w-full p-2 border border-border rounded-lg">
                  <option>Mandalay</option>
                  <option>Singapore</option>
                  <option>Bangkok</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input type="number" className="w-full p-2 border border-border rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Length (cm)</label>
                <input type="number" className="w-full p-2 border border-border rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Width (cm)</label>
                <input type="number" className="w-full p-2 border border-border rounded-lg" placeholder="0" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input type="number" className="w-full p-2 border border-border rounded-lg" placeholder="0" />
            </div>
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90">
              Calculate Shipping Cost
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Shipping Estimate</h2>
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Standard Delivery</span>
                <span className="text-2xl font-bold text-primary">₹450</span>
              </div>
              <p className="text-sm text-muted-foreground">3-5 business days</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Express Delivery</span>
                <span className="text-2xl font-bold text-blue-600">₹750</span>
              </div>
              <p className="text-sm text-muted-foreground">1-2 business days</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Same Day Delivery</span>
                <span className="text-2xl font-bold text-green-600">₹1,200</span>
              </div>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Shipping Zones & Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="font-medium">Domestic (Myanmar)</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Yangon - Mandalay</span>
                <span>₹250 - ₹450</span>
              </div>
              <div className="flex justify-between">
                <span>Yangon - Naypyidaw</span>
                <span>₹200 - ₹350</span>
              </div>
              <div className="flex justify-between">
                <span>Regional Cities</span>
                <span>₹150 - ₹300</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Plane className="h-6 w-6 text-blue-500" />
              <h3 className="font-medium">International</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ASEAN Countries</span>
                <span>₹1,200 - ₹2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Asia Pacific</span>
                <span>₹2,000 - ₹4,000</span>
              </div>
              <div className="flex justify-between">
                <span>Europe/Americas</span>
                <span>₹3,500 - ₹7,000</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Package className="h-6 w-6 text-green-500" />
              <h3 className="font-medium">Special Services</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>COD Service</span>
                <span>+₹50</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance</span>
                <span>2% of value</span>
              </div>
              <div className="flex justify-between">
                <span>Fragile Handling</span>
                <span>+₹100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}