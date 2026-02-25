  const [weight, setWeight] = useState<number>(0);
  const [l, setL] = useState<number>(0);
  const [w, setW] = useState<number>(0);
  const [h, setH] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!rate || !weight || !l || !w || !h) {
      alert("Fill all fields");
      return;
    }

    const volumetric = (l * w * h) / 5000;
    const chargeable = Math.max(weight, volumetric);
    setResult(chargeable * rate);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">International Air Cargo Calculator</h2>

      <select
        className="form-select mb-3"
        onChange={(e) => setRate(Number(e.target.value))}
      >
        <option value="">Select Destination</option>
        <option value="18.5">USA - $18.5/kg</option>
        <option value="4.5">Singapore - $4.5/kg</option>
        <option value="3">Thailand - $3/kg</option>
      </select>

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Actual Weight"
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <div className="row mb-3">
        <div className="col">
          <input type="number" className="form-control" placeholder="L"
            onChange={(e)=>setL(Number(e.target.value))}/>
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="W"
            onChange={(e)=>setW(Number(e.target.value))}/>
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="H"
            onChange={(e)=>setH(Number(e.target.value))}/>
        </div>
      </div>

      <button className="btn btn-warning" onClick={calculate}>
        Calculate
      </button>

      {result && (
        <div className="mt-4 alert alert-info">
          Estimated Cost: <strong>${result.toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
};

export default Services;