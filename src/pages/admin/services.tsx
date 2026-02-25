  const steps = [
    { title: "Book Pickup", desc: "Via App or Website" },
    { title: "We Deliver", desc: "Direct to customer" },
    { title: "Collect Cash", desc: "Item value + shipping" },
    { title: "Remittance", desc: "Funds to your bank" }
  ];

  return (
    <div>
      <section className="py-5 text-white text-center" style={{ 
        background: 'linear-gradient(rgba(13, 44, 84, 0.9), rgba(13, 44, 84, 0.9)), url(https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover', padding: '100px 0'
      }}>
        <h1 className="display-4 fw-bold">E-Commerce & COD Solutions</h1>
        <p className="lead">Secure Cash on Delivery handling for online sellers.</p>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-center mb-5">How It Works</h3>
          <div className="row g-4">
            {steps.map((step, i) => (
              <div key={i} className="col-md-3">
                <div className="p-4 border bg-white rounded-3 h-100 text-center">
                  <span className="d-inline-block bg-primary text-white rounded-circle mb-3" style={{ width: 40, height: 40, lineHeight: '40px' }}>{i + 1}</span>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="small text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;