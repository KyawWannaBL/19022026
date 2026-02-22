import React, { useState } from "react";

const MerchantRegister: React.FC = () => {
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const handleRegister = () => {
    if (!shopName || !ownerName || !phone) {
      alert("Please fill required fields.");
      return;
    }

    if (!agree) {
      alert("You must agree to terms.");
      return;
    }

    const newCustomer = {
      name: shopName,
      contact: ownerName,
      phone,
      joined: new Date().toLocaleDateString(),
    };

    localStorage.setItem("britium_user", JSON.stringify(newCustomer));
    alert("Registration Successful!");
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Merchant Registration</h2>

      <input
        className="form-control mb-3"
        placeholder="Shop Name"
        onChange={(e) => setShopName(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Owner Name"
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <input
        className="form-control mb-3"
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label className="form-check-label">Agree to Terms</label>
      </div>

      <button className="btn btn-warning" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default MerchantRegister;