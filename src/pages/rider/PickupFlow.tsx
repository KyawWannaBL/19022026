      <div className="max-w-xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-extralight tracking-tight text-zinc-900">
            Pickup <span className="font-semibold text-[#D4AF37]">Verification</span>
          </h1>
          <p className="text-zinc-500 text-sm">Scan Tamper Tag to initialize evidence lock.</p>
        </header>

        <div className="space-y-8">
          <div className="group relative">
            <input
              type="text"
              value={ttId}
              onChange={(e) => setTtId(e.target.value)}
              placeholder="ENTER TAMPER TAG ID"
              className="w-full bg-transparent border-b-2 border-zinc-200 py-4 text-2xl font-light tracking-tighter focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-200 uppercase"
            />
            <QrCode className="absolute right-0 bottom-4 h-6 w-6 text-zinc-300 group-focus-within:text-[#D4AF37] transition-colors" />
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-zinc-50">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">Mandatory Verification</p>
            <p className="text-zinc-600 text-lg font-light leading-relaxed">
              Ensure the tamper-proof seal is captured under direct lighting. Evidence will be GPS-locked.
            </p>
          </div>

          <button 
            onClick={handleProceed}
            className="w-full py-6 bg-zinc-900 text-white rounded-2xl shadow-2xl hover:bg-zinc-800 transition-all text-xs font-bold tracking-[0.2em] uppercase"
          >
            Proceed to Evidence Capture
          </button>
        </div>
      </div>
    </div>
  );
}