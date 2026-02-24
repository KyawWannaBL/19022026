<!-- =========================================================
     File: public/assets/britium-theme.css
     Shared theme for index.html / services.html / quote.html / contact.html
     ========================================================= -->
<style>
:root{
  --brand-blue:#0d2c54;
  --brand-blue-2:#123d73;
  --brand-orange:#ff6b00;
  --bg:#f8f9fa;
  --surface:#ffffff;
  --text:#1f2937;
  --muted:#6b7280;
  --border:rgba(15,23,42,.12);
  --shadow-sm:0 10px 26px rgba(2,6,23,.10);
  --shadow-md:0 18px 46px rgba(2,6,23,.14);
  --radius:16px;
}

html{scroll-behavior:smooth}
body{
  font-family:Roboto,system-ui,-apple-system,Segoe UI,Arial,sans-serif;
  background:
    radial-gradient(900px 420px at 20% -10%, rgba(255,107,0,.14), transparent 60%),
    radial-gradient(900px 420px at 80% 0%, rgba(13,44,84,.14), transparent 55%),
    var(--bg);
  color:var(--text);
}
::selection{background:rgba(255,107,0,.22)}

a{text-decoration:none}
.small-muted{color:var(--muted);font-size:.92rem}

.top-bar{
  background:linear-gradient(90deg,var(--brand-blue),var(--brand-blue-2));
  color:#fff;
  padding:10px 0;
  font-size:.92rem;
}
.top-bar a{color:#fff;opacity:.9}
.top-bar a:hover{opacity:1}

.navbar{
  background:rgba(255,255,255,.92)!important;
  backdrop-filter:blur(10px);
  border-bottom:1px solid rgba(15,23,42,.06);
  box-shadow:0 10px 30px rgba(15,23,42,.06);
}
.navbar-brand{
  font-weight:900;
  letter-spacing:.04em;
  color:var(--brand-blue)!important;
  text-transform:uppercase;
  display:flex;
  align-items:center;
  gap:10px;
}
.brand-logo{
  width:44px;height:44px;
  border-radius:12px;
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  box-shadow:0 12px 26px rgba(2,6,23,.12);
  object-fit:contain;
  padding:4px;
}
.nav-link{
  font-weight:800;
  color:rgba(31,41,55,.86)!important;
  text-transform:uppercase;
  font-size:.88rem;
  margin-left:12px;
}
.nav-link:hover{color:var(--brand-orange)!important}
.nav-link.active{color:var(--brand-orange)!important}

.btn-portal{
  border:2px solid var(--brand-blue);
  color:var(--brand-blue);
  font-weight:900;
  padding:10px 18px;
  border-radius:999px;
  background:rgba(255,255,255,.75);
  transition:transform .16s ease, box-shadow .16s ease, background .16s ease, color .16s ease;
}
.btn-portal:hover{
  background:var(--brand-blue);
  color:#fff;
  transform:translateY(-1px);
  box-shadow:var(--shadow-sm);
}

.btn-accent{
  background:linear-gradient(135deg,var(--brand-orange),#ff9a57);
  color:#fff;
  font-weight:900;
  border:0;
  border-radius:999px;
  padding:10px 18px;
  box-shadow:0 14px 32px rgba(255,107,0,.22);
  transition:transform .16s ease, filter .16s ease, box-shadow .16s ease;
}
.btn-accent:hover{transform:translateY(-1px);filter:brightness(1.03)}
.btn-accent:active{transform:translateY(0)}

.hero{
  position:relative;
  overflow:hidden;
  padding:80px 0 60px;
  background:linear-gradient(135deg,rgba(13,44,84,.96),rgba(18,61,115,.96));
  color:#fff;
}
.hero::before{
  content:"";
  position:absolute;
  inset:-80px;
  background:
    radial-gradient(600px 300px at 20% 10%, rgba(255,107,0,.35), transparent 60%),
    radial-gradient(700px 360px at 85% 20%, rgba(255,255,255,.10), transparent 60%);
  pointer-events:none;
}
.hero *{position:relative;z-index:1}
.hero h1{font-weight:900;letter-spacing:-.02em}
.hero p{color:rgba(255,255,255,.82)}
.hero-card{
  background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.18);
  border-radius:24px;
  padding:18px;
}

.section-title{
  font-weight:900;
  color:var(--brand-blue);
}
.section-sub{color:var(--muted)}

.surface{
  background:rgba(255,255,255,.92);
  border:1px solid rgba(15,23,42,.08);
  border-radius:24px;
  box-shadow:var(--shadow-md);
}

.service-card{
  border:1px solid rgba(15,23,42,.08);
  border-radius:18px;
  overflow:hidden;
  background:#fff;
  box-shadow:var(--shadow-sm);
  transition:transform .2s ease, box-shadow .2s ease;
  height:100%;
}
.service-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md)}
.service-icon{
  width:58px;height:58px;
  border-radius:999px;
  background:var(--brand-orange);
  display:flex;align-items:center;justify-content:center;
  color:#fff;
  border:6px solid #fff;
  margin-top:-34px;
  box-shadow:0 12px 26px rgba(255,107,0,.22);
}
.service-img{height:200px;width:100%;object-fit:cover}

.form-label{font-weight:800;color:var(--brand-blue)}
.form-control,.form-select{
  padding:12px;
  border:1px solid rgba(15,23,42,.14);
  border-radius:12px;
}
.form-control:focus,.form-select:focus{
  border-color:rgba(255,107,0,.8);
  box-shadow:0 0 0 .25rem rgba(255,107,0,.16);
}

.price-display,.calc-result{
  background:linear-gradient(135deg,#e3f2fd,#f8f9fa);
  border:2px dashed rgba(13,44,84,.55);
  padding:26px;
  text-align:center;
  border-radius:18px;
}
.calc-result{display:none}
.result-value{font-size:1.5rem;font-weight:900;color:var(--brand-blue)}

.info-card{
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  border-radius:18px;
  box-shadow:var(--shadow-sm);
  padding:26px;
  height:100%;
}
.info-icon{
  width:54px;height:54px;border-radius:16px;
  background:rgba(255,107,0,.14);
  display:flex;align-items:center;justify-content:center;
  color:var(--brand-orange);
  font-size:22px;
  margin-bottom:14px;
}
.form-box{
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  border-radius:22px;
  box-shadow:var(--shadow-sm);
  padding:26px;
}
.branch-item{
  background:#fff;
  border:1px solid rgba(15,23,42,.08);
  border-radius:18px;
  box-shadow:var(--shadow-sm);
  padding:16px;
  display:flex;
  gap:14px;
  margin-bottom:12px;
}
.branch-icon{
  width:44px;height:44px;border-radius:14px;
  background:rgba(13,44,84,.10);
  display:flex;align-items:center;justify-content:center;
  color:var(--brand-blue);
  flex:0 0 auto;
}

footer{
  background:#0b1220;
  color:#b7c0d1;
  padding:70px 0 28px;
  margin-top:40px;
}
footer h5{color:#fff;font-weight:800;margin-bottom:18px}
footer a{color:#b7c0d1}
footer a:hover{color:#fff}

.float-wa{
  position:fixed;right:18px;bottom:18px;z-index:9999;
  width:56px;height:56px;border-radius:999px;
  display:flex;align-items:center;justify-content:center;
  background:#25d366;color:#fff;
  box-shadow:0 18px 40px rgba(37,211,102,.35);
  transition:transform .16s ease, filter .16s ease;
}
.float-wa:hover{transform:translateY(-2px);filter:brightness(1.03)}

@media (max-width:576px){
  .hero{padding:64px 0 44px}
  .brand-logo{width:40px;height:40px}
}
</style>

<!-- =========================================================
     File: public/assets/britium-public.js
     Shared JS for both calculators + smooth section nav
     ========================================================= -->
<script>
(function () {
  function $(id){ return document.getElementById(id); }

  // Domestic (quote.html) logic (same as your draft, just renamed)
  window.beToggleTownships = function () {
    const region = $("destinationRegion").value;
    const yangonSelect = $("yangonTownship");

    if (region === "yangon") {
      yangonSelect.disabled = false;
      $("resultPrice").innerText = "-- MMK";
      $("resultTime").innerHTML = "Select a Township";
      return;
    }

    yangonSelect.disabled = true;
    yangonSelect.value = "";
    if (region === "mandalay") {
      $("resultPrice").innerText = "3,000 MMK";
      $("resultTime").innerText = "Standard Rate (Base)";
    } else {
      $("resultPrice").innerText = "Call for Quote";
      $("resultTime").innerText = "Remote Area";
    }
  };

  window.beCalculateDomesticRate = function () {
    const region = $("destinationRegion").value;
    if (region !== "yangon") return;

    const townshipSelect = $("yangonTownship");
    const weight = parseFloat($("weight").value) || 0;
    const baseRate = parseInt(townshipSelect.value, 10);

    if (Number.isNaN(baseRate)) {
      $("resultPrice").innerText = "-- MMK";
      $("resultTime").innerText = "Select a Township";
      return;
    }

    let extraWeightCost = 0;
    if (weight > 1) extraWeightCost = (weight - 1) * 500;

    const total = baseRate + extraWeightCost;
    $("resultPrice").innerText = total.toLocaleString() + " MMK";
    $("resultTime").innerHTML = '<i class="fas fa-motorcycle me-1"></i> Delivery: 1-2 Days';
  };

  // International (services.html) logic (same as your draft, just renamed)
  window.beCalculateIntlRate = function (event) {
    event.preventDefault();

    const rate = parseFloat($("calcDest").value);
    const weight = parseFloat($("calcWeight").value);
    const l = parseFloat($("calcL").value);
    const w = parseFloat($("calcW").value);
    const h = parseFloat($("calcH").value);
    const divisor = parseFloat($("calcDivisor").value);

    if ([rate, weight, l, w, h, divisor].some(Number.isNaN)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const volWeight = (l * w * h) / divisor;
    const chargeable = Math.max(weight, volWeight);
    const totalCost = chargeable * rate;

    $("resActual").innerText = weight.toFixed(2) + " kg";
    $("resVol").innerText = volWeight.toFixed(2) + " kg";
    $("resChargeable").innerText = chargeable.toFixed(2) + " kg";
    $("resTotal").innerText = "$" + totalCost.toFixed(2);
    $("displayDivisor").innerText = divisor;

    const resultBox = $("calcResult");
    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth" });
  };

  // Nice-to-have: highlight active nav on same-page scroll
  function onScrollActive() {
    const links = document.querySelectorAll('a.nav-link[data-section]');
    const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const y = window.scrollY + 120;

    let activeId = null;
    for (const s of sections) {
      if (s.offsetTop <= y) activeId = s.id;
    }
    links.forEach(l => {
      const href = l.getAttribute('href') || "";
      const id = href.startsWith("#") ? href.slice(1) : null;
      l.classList.toggle("active", id && id === activeId);
    });
  }
  window.addEventListener("scroll", onScrollActive, { passive: true });
  window.addEventListener("load", onScrollActive);

})();
</script>