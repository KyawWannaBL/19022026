<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Settings | Britium Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --admin-dark: #212529; --admin-accent: #ff6b00; --brand-blue: #0d2c54; }
        body { background-color: #e9ecef; font-family: 'Segoe UI', sans-serif; }
        
        /* Sidebar */
        .sidebar { height: 100vh; position: fixed; width: 250px; background: var(--admin-dark); color: white; z-index: 100; overflow-y: auto; }
        .main-content { margin-left: 250px; padding: 20px; padding-bottom: 50px; }
        .nav-link { color: #aaa; padding: 15px; display: flex; align-items: center; }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
        .nav-link.active { color: white; background: var(--brand-blue); border-left: 4px solid var(--admin-accent); }
        
        /* Cards */
        .settings-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); padding: 25px; margin-bottom: 25px; border-top: 3px solid transparent; }
        .card-domestic { border-top-color: var(--brand-blue); }
        .card-intl { border-top-color: var(--admin-accent); }
        .card-network { border-top-color: #198754; }
        
        .card-header-custom { font-weight: 700; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
        
        /* Zone Box Styling */
        .zone-box { background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #e9ecef; position: relative; }
        .zone-box input.zone-name { font-weight: 700; color: var(--brand-blue); border: none; background: transparent; border-bottom: 1px dashed #ccc; width: 100%; margin-bottom: 5px; }
        .zone-box input.zone-name:focus { outline: none; border-bottom: 1px solid var(--admin-accent); }
        .zone-box textarea.zone-desc { font-size: 0.85rem; color: #666; border: 1px solid #eee; width: 100%; resize: none; background: #fff; padding: 5px; margin-bottom: 10px; }
    </style>
</head>
<body>

<div class="sidebar d-flex flex-column p-3">
    <a href="index.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 fw-bold text-warning">BRITIUM ADMIN</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-tachometer-alt me-3"></i> Dashboard</a></li>
        <li><a href="shipments.html" class="nav-link"><i class="fas fa-box-open me-3"></i> Shipments</a></li>
        <li><a href="customers.html" class="nav-link"><i class="fas fa-users me-3"></i> Customers</a></li>
        <li><a href="drivers.html" class="nav-link"><i class="fas fa-motorcycle me-3"></i> Drivers</a></li>
        <li><a href="finance.html" class="nav-link"><i class="fas fa-wallet me-3"></i> Finance</a></li>
        <li><a href="setting.html" class="nav-link active"><i class="fas fa-cog me-3"></i> Settings</a></li>
    </ul>
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
            <strong>Admin Staff</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a class="dropdown-item" href="../index.html">Sign out</a></li>
        </ul>
    </div>
</div>

<div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-dark">Settings & Configuration</h2>
        <button class="btn btn-primary" onclick="alert('All Settings Saved Successfully!')"><i class="fas fa-save me-2"></i> Save All Changes</button>
    </div>

    <ul class="nav nav-tabs mb-4" id="settingTabs" role="tablist">
        <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#local">Local Pricing</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#intl">International Air Cargo</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#network">Network Expansion</button></li>
    </ul>

    <div class="tab-content">
        
        <div class="tab-pane fade show active" id="local">
            <div class="row">
                <div class="col-lg-4">
                    <div class="settings-card card-domestic">
                        <div class="card-header-custom"><span><i class="fas fa-city me-2 text-primary"></i> Yangon Region</span></div>
                        
                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Zone 1: Downtown">
                            <textarea class="zone-desc" rows="2">Latha, Lanmadaw, Pabedan, Kyauktada, Botahtaung, Pazundaung</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="2000">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>

                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Zone 2: Inner City">
                            <textarea class="zone-desc" rows="2">Bahan, Sanchaung, Kamaryut, Hlaing, Ahlone, Kyeemyindaung</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="2500">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>

                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Zone 3: New Towns">
                            <textarea class="zone-desc" rows="2">North/South/East Dagon, North/South Okkalapa, Thaketa</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="3000">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="settings-card card-domestic">
                        <div class="card-header-custom"><span><i class="fas fa-monument me-2 text-success"></i> Mandalay Region</span></div>
                        
                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Downtown Grid">
                            <textarea class="zone-desc" rows="2">Chanayethazan, Chanmyathazi, Maha Aungmye</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="2500">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>

                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Industrial Zone">
                            <textarea class="zone-desc" rows="2">Pyigyidagun, Industrial Park Areas</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="3000">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="settings-card card-domestic">
                        <div class="card-header-custom"><span><i class="fas fa-landmark me-2 text-warning"></i> Nay Pyi Taw</span></div>
                        
                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Ministry Zone">
                            <textarea class="zone-desc" rows="2">Zabuthiri (Govt Offices)</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="3000">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>

                        <div class="zone-box">
                            <input type="text" class="zone-name" value="Residential & Hotel">
                            <textarea class="zone-desc" rows="2">Dekkhinathiri, Ottarathiri</textarea>
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white fw-bold">Price</span>
                                <input type="number" class="form-control" value="3500">
                                <span class="input-group-text">MMK</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-pane fade" id="intl">
            <div class="settings-card card-intl">
                <div class="card-header-custom">
                    <span><i class="fas fa-plane-departure me-2 text-danger"></i> International Air Cargo Rates</span>
                    <button class="btn btn-sm btn-outline-dark" onclick="addCountryRow()"><i class="fas fa-plus me-2"></i> Add Route</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered align-middle" id="intlTable">
                        <thead class="bg-light">
                            <tr>
                                <th style="width: 30%;">Country / Destination</th>
                                <th style="width: 20%;">Rate (USD/Kg)</th>
                                <th style="width: 15%;">Min Weight</th>
                                <th style="width: 25%;">Est. Duration</th>
                                <th style="width: 10%;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" class="form-control form-control-sm" value="United States (USA)"></td>
                                <td><div class="input-group input-group-sm"><span class="input-group-text">$</span><input type="number" class="form-control" value="18.50"></div></td>
                                <td><input type="text" class="form-control form-control-sm" value="1.0 Kg"></td>
                                <td><input type="text" class="form-control form-control-sm" value="7-10 Days"></td>
                                <td><button class="btn btn-sm btn-light text-danger" onclick="this.closest('tr').remove()"><i class="fas fa-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td><input type="text" class="form-control form-control-sm" value="Singapore"></td>
                                <td><div class="input-group input-group-sm"><span class="input-group-text">$</span><input type="number" class="form-control" value="4.50"></div></td>
                                <td><input type="text" class="form-control form-control-sm" value="0.5 Kg"></td>
                                <td><input type="text" class="form-control form-control-sm" value="2-3 Days"></td>
                                <td><button class="btn btn-sm btn-light text-danger" onclick="this.closest('tr').remove()"><i class="fas fa-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td><input type="text" class="form-control form-control-sm" value="Thailand (BKK)"></td>
                                <td><div class="input-group input-group-sm"><span class="input-group-text">$</span><input type="number" class="form-control" value="3.00"></div></td>
                                <td><input type="text" class="form-control form-control-sm" value="0.5 Kg"></td>
                                <td><input type="text" class="form-control form-control-sm" value="1-2 Days"></td>
                                <td><button class="btn btn-sm btn-light text-danger" onclick="this.closest('tr').remove()"><i class="fas fa-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td><input type="text" class="form-control form-control-sm" value="United Kingdom (UK)"></td>
                                <td><div class="input-group input-group-sm"><span class="input-group-text">$</span><input type="number" class="form-control" value="15.00"></div></td>
                                <td><input type="text" class="form-control form-control-sm" value="1.0 Kg"></td>
                                <td><input type="text" class="form-control form-control-sm" value="5-7 Days"></td>
                                <td><button class="btn btn-sm btn-light text-danger" onclick="this.closest('tr').remove()"><i class="fas fa-trash"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="tab-pane fade" id="network">
            <div class="row">
                <div class="col-lg-8">
                    <div class="settings-card card-network">
                        <div class="card-header-custom">
                            <span><i class="fas fa-network-wired me-2 text-success"></i> Add New Substation / Hub</span>
                        </div>
                        <form onsubmit="event.preventDefault(); alert('New Hub Added Successfully!');">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">State / Region</label>
                                    <select class="form-select" id="stateSelect" onchange="loadTownships()">
                                        <option selected disabled>Select Region...</option>
                                        </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Township</label>
                                    <select class="form-select" id="townshipSelect" disabled>
                                        <option>Select State First</option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Hub Name (Internal ID)</label>
                                    <input type="text" class="form-control" placeholder="e.g. Lashio-North-Hub-01">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Full Address</label>
                                    <textarea class="form-control" rows="2" placeholder="Street address, Quarter, etc."></textarea>
                                </div>
                                <div class="col-12 text-end">
                                    <button type="submit" class="btn btn-success fw-bold px-4">Create Hub</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="alert alert-info">
                        <h6 class="fw-bold"><i class="fas fa-info-circle me-2"></i> Database Info</h6>
                        <p class="small mb-0">The State and Township list is pre-loaded with official Myanmar administrative data (MIMU Standard).</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
    // Comprehensive Myanmar Data Object
    const myanmarLocations = {
        "Yangon": ["Kamaryut", "Bahan", "Sanchaung", "Hlaing", "Mayangone", "Insein", "Mingaladon", "North Okkalapa", "South Okkalapa", "Yankin", "Thingangyun", "Tamwe", "South Dagon", "North Dagon", "East Dagon", "Dagon Seikkan", "Thaketa", "Dawbon", "Pazundaung", "Botahtaung", "Kyauktada", "Pabedan", "Latha", "Lanmadaw", "Ahlone", "Kyeemyindaung", "Hlaing Tharyar", "Shwepyithar"],
        "Mandalay": ["Chanayethazan", "Chanmyathazi", "Maha Aungmye", "Pyigyidagun", "Aungmyethazan", "Amarapura", "Patheingyi", "Pyin Oo Lwin", "Kyaukse", "Meiktila", "Myingyan", "Nyaung-U", "Mogok"],
        "Nay Pyi Taw": ["Zabuthiri", "Dekkhinathiri", "Ottarathiri", "Pobbathiri", "Zeyarthiri", "Pyinmana", "Lewe", "Tatkon"],
        "Bago": ["Bago", "Taungoo", "Pyay", "Thayarwady", "Nyaunglebin", "Shwegyin", "Daik-U"],
        "Ayeyarwady": ["Pathein", "Hinthada", "Maubin", "Myaungmya", "Pyapon", "Labutta", "Bogale"],
        "Sagaing": ["Sagaing", "Monywa", "Shwebo", "Kale", "Katha", "Tamu", "Homalin"],
        "Magway": ["Magway", "Pakokku", "Thayet", "Minbu", "Gangaw", "Chauk", "Yenangyaung"],
        "Tanintharyi": ["Dawei", "Myeik", "Kawthaung", "Bokpyin", "Yebyu", "Launglon"],
        "Kachin": ["Myitkyina", "Bhamo", "Mohnyin", "Putao", "Shwegu", "Hpakant"],
        "Kayah": ["Loikaw", "Demoso", "Hpruso", "Bawlakhe"],
        "Kayin": ["Hpa-An", "Myawaddy", "Kawkareik", "Thandaunggyi", "Hpapun"],
        "Chin": ["Hakha", "Falam", "Matupi", "Mindat", "Paletwa", "Tiddim"],
        "Mon": ["Mawlamyine", "Thaton", "Ye", "Kyaikto", "Chaungzon", "Mudon"],
        "Rakhine": ["Sittwe", "Kyaukpyu", "Thandwe", "Mrauk-U", "Maungdaw"],
        "Shan (South)": ["Taunggyi", "Kalaw", "Nyaungshwe (Inle)", "Hopong", "Loilem", "Nansang"],
        "Shan (North)": ["Lashio", "Muse", "Kyaukme", "Hsipaw", "Nawnghkio", "Kutkai"],
        "Shan (East)": ["Kengtung", "Tachileik", "Mong Hsat", "Mong Hpayak"]
    };

    // Initialize State Dropdown
    document.addEventListener("DOMContentLoaded", function() {
        const stateSelect = document.getElementById("stateSelect");
        Object.keys(myanmarLocations).sort().forEach(state => {
            let option = document.createElement("option");
            option.value = state;
            option.text = state;
            stateSelect.appendChild(option);
        });
    });

    // Dynamic Township Loading
    function loadTownships() {
        const stateSelect = document.getElementById("stateSelect");
        const townshipSelect = document.getElementById("townshipSelect");
        const selectedState = stateSelect.value;

        townshipSelect.innerHTML = '<option selected disabled>Select Township...</option>';
        townshipSelect.disabled = false;

        if (selectedState && myanmarLocations[selectedState]) {
            myanmarLocations[selectedState].sort().forEach(tsp => {
                let option = document.createElement("option");
                option.value = tsp;
                option.text = tsp;
                townshipSelect.appendChild(option);
            });
        }
    }

    // Add new row to International Table (EDITABLE)
    function addCountryRow() {
        const table = document.getElementById("intlTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td><input type="text" class="form-control form-control-sm" placeholder="Country Name"></td>
            <td><div class="input-group input-group-sm"><span class="input-group-text">$</span><input type="number" class="form-control" value="0.00"></div></td>
            <td><input type="text" class="form-control form-control-sm" value="1.0 Kg"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="e.g. 5-7 Days"></td>
            <td><button class="btn btn-sm btn-light text-danger" onclick="this.closest('tr').remove()"><i class="fas fa-trash"></i></button></td>
        `;
    }
</script>

</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Customers | Britium Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --admin-dark: #212529; --admin-accent: #ff6b00; --brand-blue: #0d2c54; }
        body { background-color: #e9ecef; font-family: 'Segoe UI', sans-serif; }
        .sidebar { height: 100vh; position: fixed; width: 250px; background: var(--admin-dark); color: white; z-index: 100; }
        .main-content { margin-left: 250px; padding: 20px; padding-bottom: 50px; }
        .nav-link { color: #aaa; padding: 15px; display: flex; align-items: center; }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
        .nav-link.active { color: white; background: var(--brand-blue); border-left: 4px solid var(--admin-accent); }
        .table-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); overflow: hidden; margin-top: 20px; }
        .avatar-sm { width: 35px; height: 35px; border-radius: 50%; object-fit: cover; margin-right: 10px; background-color: #eee; }
        .badge-vip { background-color: #6610f2; color: white; }
        .badge-regular { background-color: #6c757d; color: white; }
        .badge-corp { background-color: #0d6efd; color: white; }
    </style>
</head>
<body>

<div class="sidebar d-flex flex-column p-3">
    <a href="index.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 fw-bold text-warning">BRITIUM ADMIN</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-tachometer-alt me-3"></i> Dashboard</a></li>
        <li><a href="shipments.html" class="nav-link"><i class="fas fa-box-open me-3"></i> Shipments</a></li>
        <li><a href="customers.html" class="nav-link active"><i class="fas fa-users me-3"></i> Customers</a></li>
        <li><a href="drivers.html" class="nav-link"><i class="fas fa-motorcycle me-3"></i> Drivers</a></li>
        <li><a href="finance.html" class="nav-link"><i class="fas fa-wallet me-3"></i> Finance</a></li>
        <li><a href="setting.html" class="nav-link"><i class="fas fa-cog me-3"></i> Settings</a></li>
    </ul>
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
            <strong>Admin Staff</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a class="dropdown-item" href="../index.html">Sign out</a></li>
        </ul>
    </div>
</div>
<div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-dark">Customer Database</h2>
        <button class="btn btn-warning fw-bold text-white" data-bs-toggle="modal" data-bs-target="#addCustomerModal" style="background-color: var(--admin-accent);">
            <i class="fas fa-user-plus me-2"></i> Add Customer
        </button>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm border-start border-primary border-4">
                <h6 class="text-muted">Total Clients</h6>
                <h3 class="fw-bold mb-0">1,204</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm border-start border-success border-4">
                <h6 class="text-muted">Active This Month</h6>
                <h3 class="fw-bold mb-0">850</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm border-start border-info border-4">
                <h6 class="text-muted">Corporate Accounts</h6>
                <h3 class="fw-bold mb-0">45</h3>
            </div>
        </div>
    </div>

    <div class="card p-3 border-0 shadow-sm mb-4">
        <div class="row g-2">
            <div class="col-md-5">
                <input type="text" class="form-control" placeholder="Search by Name, Phone, or Shop Name...">
            </div>
            <div class="col-md-3">
                <select class="form-select">
                    <option selected>All Types</option>
                    <option>Individual</option>
                    <option>Online Shop</option>
                    <option>Corporate</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select">
                    <option selected>Active</option>
                    <option>Banned</option>
                </select>
            </div>
            <div class="col-md-2 d-grid">
                <button class="btn btn-dark">Filter</button>
            </div>
        </div>
    </div>

    <div class="table-card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th class="ps-4">Customer Name</th>
                        <th>Phone / Contact</th>
                        <th>Type</th>
                        <th>Total Shipments</th>
                        <th>Total Spend</th>
                        <th>Joined Date</th>
                        <th class="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="ps-4">
                            <div class="d-flex align-items-center">
                                <img src="https://ui-avatars.com/api/?name=Tech+Store&background=6610f2&color=fff" class="avatar-sm">
                                <div>
                                    <div class="fw-bold">Tech Store Myanmar</div>
                                    <small class="text-muted">U Ba Maung</small>
                                </div>
                            </div>
                        </td>
                        <td>09-8974477xx</td>
                        <td><span class="badge badge-vip rounded-pill">VIP Seller</span></td>
                        <td class="fw-bold text-center">1,540</td>
                        <td>4.5M MMK</td>
                        <td class="small text-muted">Jan 2024</td>
                        <td class="text-end pe-4">
                            <button class="btn btn-sm btn-light border" title="View Profile"><i class="fas fa-eye"></i></button>
                            <button class="btn btn-sm btn-light border" title="Edit"><i class="fas fa-edit"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4">
                            <div class="d-flex align-items-center">
                                <img src="https://ui-avatars.com/api/?name=ABC+Co&background=0d6efd&color=fff" class="avatar-sm">
                                <div>
                                    <div class="fw-bold">ABC Trading Co., Ltd.</div>
                                    <small class="text-muted">Daw Hla (Manager)</small>
                                </div>
                            </div>
                        </td>
                        <td>09-4222999xx</td>
                        <td><span class="badge badge-corp rounded-pill">Corporate</span></td>
                        <td class="fw-bold text-center">320</td>
                        <td>1.2M MMK</td>
                        <td class="small text-muted">Mar 2024</td>
                        <td class="text-end pe-4">
                            <button class="btn btn-sm btn-light border" title="View Profile"><i class="fas fa-eye"></i></button>
                            <button class="btn btn-sm btn-light border" title="Edit"><i class="fas fa-edit"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="p-3 border-top d-flex justify-content-end">
            <nav>
                <ul class="pagination pagination-sm mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Prev</a></li>
                    <li class="page-item active"><a class="page-link bg-dark border-dark" href="#">1</a></li>
                    <li class="page-item"><a class="page-link text-dark" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <div class="d-flex justify-content-between mt-5 pt-4 border-top">
        <a href="shipments.html" class="btn btn-outline-secondary px-4"><i class="fas fa-arrow-left me-2"></i> Previous</a>
        <a href="drivers.html" class="btn btn-primary px-4">Next: Drivers <i class="fas fa-arrow-right ms-2"></i></a>
    </div>

</div>

<div class="modal fade" id="addCustomerModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title"><i class="fas fa-user-plus me-2"></i> Register New Customer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Full Name / Shop Name</label>
                        <input type="text" class="form-control" placeholder="e.g. U Ba Maung">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Phone Number</label>
                        <input type="text" class="form-control" placeholder="09xxxxxxxxx">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email (Optional)</label>
                        <input type="email" class="form-control" placeholder="name@example.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Default Pickup Address</label>
                        <textarea class="form-control" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Account Type</label>
                        <select class="form-select">
                            <option>Regular (Individual)</option>
                            <option>Online Shop (VIP)</option>
                            <option>Corporate (Monthly Billing)</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success w-100 fw-bold">Create Account</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const tableBody = document.querySelector("tbody");
        
        // 1. Get the list we saved in Step 1
        let customers = JSON.parse(localStorage.getItem('britium_customers')) || [];

        // 2. If we have data, CLEAR the hardcoded fake rows
        if (customers.length > 0) {
            tableBody.innerHTML = ""; // Wipe table clean
        }

        // 3. Loop through saved customers and build table rows
        customers.forEach((cust, index) => {
            let row = `
                <tr>
                    <td class="ps-4">
                        <div class="d-flex align-items-center">
                            <img src="https://ui-avatars.com/api/?name=${cust.name}&background=random" class="avatar-sm">
                            <div>
                                <div class="fw-bold">${cust.name}</div>
                                <small class="text-muted">${cust.contact || 'Owner'}</small>
                            </div>
                        </div>
                    </td>
                    <td>${cust.phone}</td>
                    <td><span class="badge bg-success rounded-pill">${cust.type}</span></td>
                    <td class="fw-bold text-center">${cust.shipments || 0}</td>
                    <td>${cust.spend || '0 MMK'}</td>
                    <td class="small text-muted">${cust.joined}</td>
                    <td class="text-end pe-4">
                        <button class="btn btn-sm btn-light border" title="Edit"><i class="fas fa-edit"></i></button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    });
</script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Drivers | Britium Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --admin-dark: #212529; --admin-accent: #ff6b00; --brand-blue: #0d2c54; }
        body { background-color: #e9ecef; font-family: 'Segoe UI', sans-serif; }
        .sidebar { height: 100vh; position: fixed; width: 250px; background: var(--admin-dark); color: white; z-index: 100; }
        .main-content { margin-left: 250px; padding: 20px; padding-bottom: 50px; }
        .nav-link { color: #aaa; padding: 15px; display: flex; align-items: center; }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
        .nav-link.active { color: white; background: var(--brand-blue); border-left: 4px solid var(--admin-accent); }
        .driver-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: 0.3s; height: 100%; border-top: 4px solid transparent; }
        .driver-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .driver-card.available { border-top-color: #28a745; }
        .driver-card.busy { border-top-color: #ffc107; }
        .driver-card.offline { border-top-color: #6c757d; }
        .avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 3px solid #f8f9fa; }
        .table-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); overflow: hidden; margin-top: 20px; }
    </style>
</head>
<body>

<div class="sidebar d-flex flex-column p-3">
    <a href="index.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 fw-bold text-warning">BRITIUM ADMIN</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-tachometer-alt me-3"></i> Dashboard</a></li>
        <li><a href="shipments.html" class="nav-link"><i class="fas fa-box-open me-3"></i> Shipments</a></li>
        <li><a href="customers.html" class="nav-link"><i class="fas fa-users me-3"></i> Customers</a></li>
        <li><a href="drivers.html" class="nav-link active"><i class="fas fa-motorcycle me-3"></i> Drivers</a></li>
        <li><a href="finance.html" class="nav-link"><i class="fas fa-wallet me-3"></i> Finance</a></li>
        <li><a href="setting.html" class="nav-link"><i class="fas fa-cog me-3"></i> Settings</a></li>
    </ul>
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
            <strong>Admin Staff</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a class="dropdown-item" href="../index.html">Sign out</a></li>
        </ul>
    </div>
</div>
<div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-dark">Fleet Management</h2>
        <button class="btn btn-warning fw-bold text-white" data-bs-toggle="modal" data-bs-target="#addDriverModal" style="background-color: var(--admin-accent);">
            <i class="fas fa-plus me-2"></i> Add Driver
        </button>
    </div>

    <div class="row g-3 mb-4">
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <div><h6 class="text-muted mb-0">Total Fleet</h6><h3 class="fw-bold mb-0">24</h3></div>
                    <i class="fas fa-users fa-2x text-primary opacity-50"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <div><h6 class="text-muted mb-0">Available</h6><h3 class="fw-bold text-success mb-0">12</h3></div>
                    <i class="fas fa-check-circle fa-2x text-success opacity-50"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <div><h6 class="text-muted mb-0">On Delivery</h6><h3 class="fw-bold text-warning mb-0">8</h3></div>
                    <i class="fas fa-shipping-fast fa-2x text-warning opacity-50"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 border-0 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <div><h6 class="text-muted mb-0">Offline</h6><h3 class="fw-bold text-secondary mb-0">4</h3></div>
                    <i class="fas fa-power-off fa-2x text-secondary opacity-50"></i>
                </div>
            </div>
        </div>
    </div>

    <h5 class="fw-bold text-dark mb-3">Active Riders</h5>
    <div class="row g-4">
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="driver-card p-3 text-center busy">
                <img src="https://ui-avatars.com/api/?name=Ko+Aung&background=0d6efd&color=fff" class="avatar mb-3">
                <h5 class="fw-bold mb-1">Ko Aung</h5>
                <p class="text-muted small mb-2"><i class="fas fa-motorcycle me-1"></i> 7A-1234 (Motorbike)</p>
                <span class="badge bg-warning text-dark mb-3">Busy (2 Orders)</span>
                <div class="d-grid mt-3"><button class="btn btn-outline-dark btn-sm">View Location</button></div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="driver-card p-3 text-center available">
                <img src="https://ui-avatars.com/api/?name=Ko+Zaw&background=198754&color=fff" class="avatar mb-3">
                <h5 class="fw-bold mb-1">Ko Zaw</h5>
                <p class="text-muted small mb-2"><i class="fas fa-truck me-1"></i> 2B-5566 (Light Truck)</p>
                <span class="badge bg-success mb-3">Available</span>
                <div class="d-grid mt-3"><button class="btn btn-outline-dark btn-sm">Assign Order</button></div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="driver-card p-3 text-center busy">
                <img src="https://ui-avatars.com/api/?name=Mg+Mg&background=ffc107&color=000" class="avatar mb-3">
                <h5 class="fw-bold mb-1">Mg Mg</h5>
                <p class="text-muted small mb-2"><i class="fas fa-motorcycle me-1"></i> 9G-9988 (Motorbike)</p>
                <span class="badge bg-warning text-dark mb-3">Busy (1 Order)</span>
                <div class="d-grid mt-3"><button class="btn btn-outline-dark btn-sm">View Location</button></div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="driver-card p-3 text-center offline">
                <img src="https://ui-avatars.com/api/?name=U+Kyaw&background=6c757d&color=fff" class="avatar mb-3">
                <h5 class="fw-bold mb-1">U Kyaw</h5>
                <p class="text-muted small mb-2"><i class="fas fa-truck-moving me-1"></i> 3C-4444 (Box Truck)</p>
                <span class="badge bg-secondary mb-3">Offline</span>
                <div class="d-grid mt-3"><button class="btn btn-outline-secondary btn-sm disabled">Call Driver</button></div>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-between mt-5 pt-4 border-top">
        <a href="customers.html" class="btn btn-outline-secondary px-4"><i class="fas fa-arrow-left me-2"></i> Previous</a>
        <a href="finance.html" class="btn btn-primary px-4">Next: Finance <i class="fas fa-arrow-right ms-2"></i></a>
    </div>

</div>

<div class="modal fade" id="addDriverModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title"><i class="fas fa-user-plus me-2"></i> Register New Driver</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3"><label class="form-label">Full Name</label><input type="text" class="form-control" placeholder="e.g. Ko Mya"></div>
                    <div class="mb-3"><label class="form-label">Phone Number</label><input type="text" class="form-control" placeholder="09xxxxxxxxx"></div>
                    <div class="row mb-3">
                        <div class="col-6"><label class="form-label">Vehicle Type</label><select class="form-select"><option>Motorcycle</option><option>Light Truck</option></select></div>
                        <div class="col-6"><label class="form-label">License Plate</label><input type="text" class="form-control" placeholder="1A-1234"></div>
                    </div>
                    <button type="submit" class="btn btn-success w-100 fw-bold">Save Driver</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COD Finance | Britium Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --admin-dark: #212529; --admin-accent: #ff6b00; --brand-blue: #0d2c54; }
        body { background-color: #e9ecef; font-family: 'Segoe UI', sans-serif; }
        .sidebar { height: 100vh; position: fixed; width: 250px; background: var(--admin-dark); color: white; z-index: 100; }
        .main-content { margin-left: 250px; padding: 20px; padding-bottom: 50px; }
        .nav-link { color: #aaa; padding: 15px; display: flex; align-items: center; }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
        .nav-link.active { color: white; background: var(--brand-blue); border-left: 4px solid var(--admin-accent); }
        .finance-card { color: white; padding: 25px; border-radius: 8px; position: relative; overflow: hidden; height: 100%; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .bg-cash { background: linear-gradient(45deg, #198754, #20c997); }
        .bg-pending { background: linear-gradient(45deg, #ffc107, #fd7e14); color: #333; }
        .bg-debt { background: linear-gradient(45deg, #dc3545, #c82333); }
        .table-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); overflow: hidden; margin-top: 20px; }
        .status-badge { font-size: 0.75rem; padding: 5px 10px; border-radius: 50px; font-weight: 700; text-transform: uppercase; }
        .badge-collected { background-color: #d1e7dd; color: #0f5132; }
        .badge-remitted { background-color: #cfe2ff; color: #084298; }
        .badge-pending { background-color: #fff3cd; color: #664d03; }
    </style>
</head>
<body>

<div class="sidebar d-flex flex-column p-3">
    <a href="index.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 fw-bold text-warning">BRITIUM ADMIN</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-tachometer-alt me-3"></i> Dashboard</a></li>
        <li><a href="shipments.html" class="nav-link"><i class="fas fa-box-open me-3"></i> Shipments</a></li>
        <li><a href="customers.html" class="nav-link"><i class="fas fa-users me-3"></i> Customers</a></li>
        <li><a href="drivers.html" class="nav-link"><i class="fas fa-motorcycle me-3"></i> Drivers</a></li>
        <li><a href="finance.html" class="nav-link active"><i class="fas fa-wallet me-3"></i> Finance</a></li>
        <li><a href="setting.html" class="nav-link"><i class="fas fa-cog me-3"></i> Settings</a></li>
    </ul>
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
            <strong>Admin Staff</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a class="dropdown-item" href="../index.html">Sign out</a></li>
        </ul>
    </div>
</div>

<div class="main-content">
    <h2 class="fw-bold text-dark mb-4">COD & Finance Overview</h2>

    <div class="row g-4 mb-4">
        <div class="col-md-4">
            <div class="finance-card bg-cash">
                <i class="fas fa-hand-holding-usd finance-icon" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); opacity: 0.2; font-size: 3rem;"></i>
                <p>Cash on Hand (Collected)</p>
                <h3>1,450,000 MMK</h3>
                <small>Ready to remit to customers</small>
            </div>
        </div>
        <div class="col-md-4">
            <div class="finance-card bg-pending">
                <i class="fas fa-truck-loading finance-icon" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); opacity: 0.2; font-size: 3rem;"></i>
                <p>Pending Collection</p>
                <h3>850,000 MMK</h3>
                <small>Parcels currently Out for Delivery</small>
            </div>
        </div>
        <div class="col-md-4">
            <div class="finance-card bg-debt">
                <i class="fas fa-file-invoice-dollar finance-icon" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); opacity: 0.2; font-size: 3rem;"></i>
                <p>Service Fees Earned</p>
                <h3>240,000 MMK</h3>
                <small>Total delivery charges today</small>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold m-0">COD Transactions</h5>
        <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm text-white fw-bold"><i class="fas fa-check-double me-2"></i> Bulk Remit</button>
        </div>
    </div>

    <div class="table-card">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th class="ps-4">Tracking ID</th>
                        <th>Sender (Client)</th>
                        <th>Amount (MMK)</th>
                        <th>Status</th>
                        <th class="text-end pe-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="ps-4 fw-bold">BE-89744</td>
                        <td>U Ba Maung</td>
                        <td class="fw-bold text-dark">45,000</td>
                        <td><span class="status-badge badge-collected">Collected</span></td>
                        <td class="text-end pe-4"><button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#remitModal">Remit Now</button></td>
                    </tr>
                    <tr>
                        <td class="ps-4 fw-bold">BE-11223</td>
                        <td>Online Shop A</td>
                        <td class="fw-bold text-muted">12,500</td>
                        <td><span class="status-badge badge-pending">Pending</span></td>
                        <td class="text-end pe-4"><button class="btn btn-sm btn-light border disabled">Wait</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="d-flex justify-content-between mt-5 pt-4 border-top">
        <a href="drivers.html" class="btn btn-outline-secondary px-4"><i class="fas fa-arrow-left me-2"></i> Previous</a>
        <a href="setting.html" class="btn btn-primary px-4">Next: Settings <i class="fas fa-arrow-right ms-2"></i></a>
    </div>

</div>

<div class="modal fade" id="remitModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title"><i class="fas fa-money-bill-wave me-2"></i> Remit Payment</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3"><label class="form-label">Amount</label><input type="text" class="form-control" value="45,000" readonly></div>
                    <button type="submit" class="btn btn-success w-100 fw-bold">Confirm Transfer</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Portal | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --admin-dark: #212529; --admin-accent: #ff6b00; }
        body { background-color: #e9ecef; }
        .sidebar { height: 100vh; position: fixed; width: 250px; background: var(--admin-dark); color: white; }
        .main-content { margin-left: 250px; padding: 20px; padding-bottom: 50px; }
        .nav-link { color: #aaa; padding: 15px; }
        .nav-link:hover, .nav-link.active { color: white; background: rgba(255,255,255,0.1); }
        .card-counter { padding: 20px; border-radius: 5px; color: white; margin-bottom: 20px; }
        .bg-orders { background-color: #0d2c54; }
        .bg-revenue { background-color: #198754; }
        .bg-pending { background-color: #ffc107; color: black; }
    </style>
</head>
<body>

<div class="sidebar d-flex flex-column p-3">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 fw-bold text-warning">BRITIUM ADMIN</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item"><a href="index.html" class="nav-link active"><i class="fas fa-tachometer-alt me-2"></i> Dashboard</a></li>
        <li><a href="shipments.html" class="nav-link"><i class="fas fa-box-open me-2"></i> Shipments</a></li>
        <li><a href="customers.html" class="nav-link"><i class="fas fa-users me-2"></i> Customers</a></li>
        <li><a href="drivers.html" class="nav-link"><i class="fas fa-motorcycle me-2"></i> Drivers</a></li>
        <li><a href="finance.html" class="nav-link"><i class="fas fa-wallet me-2"></i> Finance</a></li>
        <li><a href="setting.html" class="nav-link"><i class="fas fa-cog me-2"></i> Settings</a></li>
    </ul>
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>Admin Staff</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
    </div>
</div>

<div class="main-content">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard Overview</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <button type="button" class="btn btn-sm btn-outline-secondary me-2">Export Data</button>
            <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
                <i class="fas fa-plus me-1"></i> Update Tracking
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4">
            <div class="card-counter bg-orders">
                <i class="fas fa-box fa-2x opacity-50 float-end"></i>
                <h3>150</h3>
                <p>New Parcels Today</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card-counter bg-pending">
                <i class="fas fa-clock fa-2x opacity-50 float-end"></i>
                <h3>25</h3>
                <p>Pending Dispatch</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card-counter bg-revenue">
                <i class="fas fa-dollar-sign fa-2x opacity-50 float-end"></i>
                <h3>1.2M MMK</h3>
                <p>Today's Revenue</p>
            </div>
        </div>
    </div>

    <div class="card shadow-sm mt-4">
        <div class="card-header bg-white py-3">
            <h5 class="mb-0">Latest Shipments</h5>
        </div>
        <div class="card-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Tracking ID</th>
                        <th>Sender</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>BE-89744</strong></td>
                        <td>U Aung</td>
                        <td>Mandalay</td>
                        <td><span class="badge bg-warning text-dark">In Transit</span></td>
                        <td>
                            <button class="btn btn-sm btn-primary">Edit</button>
                            <button class="btn btn-sm btn-success">Mark Delivered</button>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>BE-89745</strong></td>
                        <td>Daw Hla</td>
                        <td>Yangon (East Dagon)</td>
                        <td><span class="badge bg-secondary">Pending Pickup</span></td>
                        <td>
                            <button class="btn btn-sm btn-primary">Edit</button>
                            <button class="btn btn-sm btn-success">Dispatch</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="d-flex justify-content-between mt-5 pt-4 border-top">
        <button class="btn btn-outline-secondary px-4 disabled"><i class="fas fa-arrow-left me-2"></i> Previous</button>
        <a href="shipments.html" class="btn btn-primary px-4">Next: Shipments <i class="fas fa-arrow-right ms-2"></i></a>
    </div>
</div>

<div class="modal fade" id="updateModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title">Update Shipment Status</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Tracking ID</label>
                        <input type="text" class="form-control" placeholder="Scan or Type ID">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">New Status</label>
                        <select class="form-select">
                            <option>Picked Up</option>
                            <option>Arrived at Hub</option>
                            <option>In Transit</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Location / Note</label>
                        <input type="text" class="form-control" placeholder="e.g. Arrived at Mandalay Hub">
                    </div>
                    <button type="submit" class="btn btn-success w-100">Update System</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Print Label - BE-89744</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { background: #555; padding: 20px; font-family: 'Arial', sans-serif; }
        
        /* The Label Paper */
        .waybill {
            background: white;
            width: 148mm; /* A5 Width */
            height: 210mm; /* A5 Height */
            margin: 0 auto;
            padding: 15px;
            border: 1px solid #ddd;
            position: relative;
            box-sizing: border-box;
        }

        .header-box { border-bottom: 3px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        .logo { font-size: 24px; font-weight: 900; color: #0d2c54; text-transform: uppercase; }
        
        .box { border: 2px solid #000; padding: 10px; margin-bottom: 10px; border-radius: 4px; }
        .box-title { font-size: 10px; text-transform: uppercase; font-weight: bold; color: #666; margin-bottom: 5px; display: block; }
        .box-content { font-weight: bold; font-size: 14px; }
        
        .big-code { font-size: 24px; font-weight: 900; text-align: center; letter-spacing: 2px; }
        
        /* COD Box needs to be HUGE */
        .cod-box { border: 3px solid #000; background: #f8f9fa; text-align: center; padding: 15px; }
        .cod-amount { font-size: 32px; font-weight: 900; }
        
        .barcode { height: 50px; background: #000; width: 80%; margin: 10px auto; } /* Placeholder for barcode */

        /* Print Settings */
        @media print {
            body { background: white; padding: 0; }
            .no-print { display: none; }
            .waybill { border: none; width: 100%; height: 100%; margin: 0; }
        }
    </style>
</head>
<body>

    <div class="text-center mb-3 no-print">
        <button onclick="window.print()" class="btn btn-warning fw-bold">PRINT LABEL</button>
        <button onclick="window.close()" class="btn btn-secondary">CLOSE</button>
    </div>

    <div class="waybill">
        <div class="header-box d-flex justify-content-between align-items-center">
            <div class="logo"><i class="fas fa-shipping-fast"></i> BRITIUM</div>
            <div class="text-end">
                <small class="d-block fw-bold">Standard Express</small>
                <small>Yangon -> Mandalay</small>
            </div>
        </div>

        <div class="text-center mb-3">
            <img src="https://bwipjs-api.metafloor.com/?bcid=code128&text=BE-89744&scale=3&height=10&includetext" alt="Barcode" style="width: 80%; height: 60px;">
        </div>

        <div class="row g-2">
            <div class="col-6">
                <div class="box" style="height: 120px;">
                    <span class="box-title">FROM (SENDER)</span>
                    <div class="box-content">
                        U Ba Maung<br>
                        09-897447744<br>
                        <small>No. 277, Anawrahta Rd, East Dagon, Yangon.</small>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="box" style="height: 120px;">
                    <span class="box-title">TO (RECEIVER)</span>
                    <div class="box-content">
                        Daw Hla<br>
                        09-422299994<br>
                        <small>78th Street, Between 30x31, Mandalay.</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-2 mt-1">
            <div class="col-4">
                <div class="box text-center">
                    <span class="box-title">DATE</span>
                    24/10/2025
                </div>
            </div>
            <div class="col-4">
                <div class="box text-center">
                    <span class="box-title">WEIGHT</span>
                    2.5 KG
                </div>
            </div>
            <div class="col-4">
                <div class="box text-center">
                    <span class="box-title">TYPE</span>
                    Parcel
                </div>
            </div>
        </div>

        <div class="cod-box mt-3">
            <span class="box-title">CASH ON DELIVERY (TO COLLECT)</span>
            <div class="cod-amount">45,000 MMK</div>
        </div>

        <div class="row mt-4 pt-4">
            <div class="col-6 text-center border-end">
                <br><br>
                <div class="border-top w-75 mx-auto"></div>
                <small class="fw-bold">SENDER SIGNATURE</small>
            </div>
            <div class="col-6 text-center">
                <br><br>
                <div class="border-top w-75 mx-auto"></div>
                <small class="fw-bold">RECEIVER SIGNATURE</small>
            </div>
        </div>

        <div class="text-center mt-4 pt-3 border-top">
            <small style="font-size: 10px;">Britium Express | www.britiumexpress.com | Hotline: 09-897447744</small>
        </div>
    </div>

</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Britium Admin Setup (Fixed)</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database-compat.js"></script>
</head>
<body class="bg-light p-5">
    <div class="card p-4 mx-auto shadow" style="max-width: 700px;">
        <h3 class="fw-bold text-primary">Admin Account Generator</h3>
        <p class="text-muted small">Fix: Added missing Database URL.</p>
        
        <button id="runBtn" class="btn btn-primary w-100 fw-bold py-3">CREATE ACCOUNTS NOW</button>
        
        <div id="status" class="mt-3 p-3 bg-dark text-white rounded font-monospace small" style="min-height: 150px; white-space: pre-line;">Ready. Click the button above.</div>
    </div>

    <script>
        // ⚠️ FIXED CONFIGURATION (Added databaseURL)
        const firebaseConfig = {
            apiKey: "AIzaSyCbrF5_QW6Nb3rBVkozT2y0KotL8clr8Jo",
            authDomain: "britium-express.firebaseapp.com",
            // This line was missing! It is required to save admin roles:
            databaseURL: "https://britium-express-default-rtdb.firebaseio.com", 
            projectId: "britium-express",
            storageBucket: "britium-express.firebasestorage.app",
            messagingSenderId: "406522036528",
            appId: "1:406522036528:web:7713801d6832932067c8f5"
        };

        // ACCOUNTS DATA
        const accounts = [
            { email: "mgkyawwanna@gmail.com", role: "super_admin", phone: "09887777585", pass: "Britium2026!" },
            { email: "md@britiumventures.com", role: "super_admin", phone: "09887777585", pass: "Britium2026!" },
            { email: "hod@britiumexpress.com", role: "manager", phone: "N/A", pass: "Manager2026!" },
            { email: "hod_pm@britiumventures.com", role: "manager", phone: "N/A", pass: "Manager2026!" }
        ];

        const statusDiv = document.getElementById('status');
        function log(msg) { statusDiv.innerHTML += msg + "<br>"; }

        document.getElementById('runBtn').addEventListener('click', async () => {
            statusDiv.innerHTML = "<strong>Starting...</strong><br>";

            if (typeof firebase === 'undefined') {
                log("❌ ERROR: Firebase scripts failed to load. Check internet.");
                return;
            }

            try {
                if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
                const auth = firebase.auth();
                const db = firebase.database();

                log("1. Checking Database Connection...");
                // Test Write
                try {
                    await db.ref('connection_check').set(true);
                    log("✅ Database Connected.");
                } catch (dbErr) {
                    throw new Error("Database Error: " + dbErr.message + "\n(Did you set Rules to true?)");
                }

                log("2. Creating Accounts...");

                for (const acc of accounts) {
                    let uid = null;
                    try {
                        const userCred = await auth.createUserWithEmailAndPassword(acc.email, acc.pass);
                        uid = userCred.user.uid;
                        log(`   • Auth created: ${acc.email}`);
                    } catch (e) {
                        if (e.code === 'auth/email-already-in-use') {
                            log(`   • User exists: ${acc.email} (Updating role...)`);
                            // Try login to get UID for role update
                            try {
                                const login = await auth.signInWithEmailAndPassword(acc.email, acc.pass);
                                uid = login.user.uid;
                            } catch (loginErr) {
                                log(`   ❌ Login failed for existing user: ${loginErr.message}`);
                            }
                        } else {
                            log(`   ❌ Auth Error (${acc.email}): ${e.message}`);
                        }
                    }

                    if (uid) {
                        await db.ref('users/' + uid).set({
                            email: acc.email,
                            role: acc.role,
                            phone: acc.phone,
                            updatedAt: new Date().toISOString()
                        });
                        log(`   ✅ Role set: ${acc.role}`);
                    }
                }

                log("<br>✨ <strong>DONE!</strong> You can now log in.");

            } catch (error) {
                console.error(error);
                log(`❌ CRITICAL ERROR: ${error.message}`);
                if (error.code === 'auth/operation-not-allowed') {
                    alert("Enable 'Email/Password' in Firebase Console > Authentication.");
                }
            }
        });
    </script>
</body>
</html>