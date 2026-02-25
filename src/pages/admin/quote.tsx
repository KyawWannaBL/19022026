const Quote: React.FC = () => {
  const [region, setRegion] = useState('yangon');
  const [townshipRate, setTownshipRate] = useState<number | null>(null);
  const [weight, setWeight] = useState(1);
  const [totalPrice, setTotalPrice] = useState('--');
  const [deliveryTime, setDeliveryTime] = useState('Select a Township');

  useEffect(() => {
    if (region !== 'yangon') return;
    if (townshipRate === null) {
      setTotalPrice('--');
      setDeliveryTime('Select a Township');
      return;
    }

    // Logic: Base rate covers first 1kg, then +500 MMK per additional kg
    const extraWeightCost = weight > 1 ? (weight - 1) * 500 : 0;
    const total = townshipRate + extraWeightCost;

    setTotalPrice(`${total.toLocaleString()} MMK`);
    setDeliveryTime('Delivery: 1-2 Days');
  }, [region, townshipRate, weight]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setRegion(val);
    if (val === 'mandalay') {
      setTotalPrice('3,000 MMK');
      setDeliveryTime('Standard Rate (Base)');
    } else if (val === 'other') {
      setTotalPrice('Call for Quote');
      setDeliveryTime('Remote Area');
    } else {
      setTownshipRate(null);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <header className="py-5 bg-white shadow-sm mb-5 text-center">
        <h1 className="display-4 fw-bold" style={{ color: '#0d2c54' }}>Rate Calculator</h1>
        <p className="lead opacity-75">Check our specific Yangon City rates below.</p>
      </header>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 card p-4 border-0 shadow-sm">
            <div className="row g-4">
              <div className="col-md-7">
                <h4 className="fw-bold mb-4"><i className="fas fa-sliders-h me-2"></i> Shipment Details</h4>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">Destination Region</label>
                    <select className="form-select form-select-lg" value={region} onChange={handleRegionChange}>
                      <option value="yangon">Yangon City</option>
                      <option value="mandalay">Mandalay Region</option>
                      <option value="other">Other States/Regions</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Select Township</label>
                    <select 
                      className="form-select" 
                      disabled={region !== 'yangon'}
                      onChange={(e) => setTownshipRate(Number(e.target.value))}
                    >
                      <option value="">-- Select Area --</option>
                      <optgroup label="Zone 1 - 3,000 MMK">
                        <option value="3000">Ahlone</option>
                        <option value="3000">Bahan</option>
                      </optgroup>
                      <optgroup label="Zone 2 - 3,500 MMK">
                        <option value="3500">Hlaing Thar Yar</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Weight (Kg)</label>
                    <input type="number" className="form-control" value={weight} min="0.5" step="0.5" onChange={(e) => setWeight(Number(e.target.value))} />
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="p-4 rounded text-center h-100 d-flex flex-column justify-content-center" style={{ background: '#e3f2fd', border: '2px dashed #0d2c54' }}>
                  <h6 className="text-uppercase text-muted fw-bold small">Estimated Cost</h6>
                  <div className="display-5 fw-bold my-3" style={{ color: '#0d2c54' }}>{totalPrice}</div>
                  <div className="text-success fw-bold mb-4">{deliveryTime}</div>
                  <button className="btn btn-warning btn-lg w-100 fw-bold text-white" style={{ background: '#ff6b00' }}>BOOK NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;