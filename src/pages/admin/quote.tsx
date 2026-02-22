import React, { useState } from "react";

const Quote: React.FC = () => {
  const [region, setRegion] = useState("yangon");
  const [baseRate, setBaseRate] = useState<number | null>(null);
  const [weight, setWeight] = useState(1);

  const calculateTotal = () => {
    if (!baseRate) return "-- MMK";
    const extra = weight > 1 ? (weight - 1) * 500 : 0;
    return (baseRate + extra).toLocaleString() + " MMK";
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Shipping Rate Calculator</h2>

      <div className="row">
        <div className="col-md-6">
          <select
            className="form-select mb-3"
            onChange={(e) => setBaseRate(Number(e.target.value))}
          >
            <option value="">Select Township</option>
            <option value="3000">Zone 1 - 3000 MMK</option>
            <option value="3500">Zone 2 - 3500 MMK</option>
            <option value="4500">Zone 3 - 4500 MMK</option>
          </select>

          <input
            type="number"
            className="form-control"
            value={weight}
            min={1}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>

        <div className="col-md-6">
          <div className="border p-4 text-center">
            <h5>Total Cost</h5>
            <h2 className="fw-bold text-primary">{calculateTotal()}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;