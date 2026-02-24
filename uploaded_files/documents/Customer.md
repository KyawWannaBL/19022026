<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { background-color: #f4f6f9; font-family: 'Segoe UI', sans-serif; }
        
        /* Sidebar (Same as Dashboard) */
        .sidebar { min-height: 100vh; background-color: var(--brand-blue); color: white; }
        .sidebar a { color: rgba(255,255,255,0.8); text-decoration: none; padding: 12px 20px; display: block; }
        .sidebar a:hover, .sidebar a.active { background-color: rgba(255,255,255,0.1); color: white; border-left: 4px solid var(--brand-orange); }
        
        /* Form Sections */
        .form-section { background: white; border-radius: 8px; padding: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-title { font-weight: 700; color: var(--brand-blue); border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 20px; }
        
        /* Summary Box */
        .summary-card { background-color: white; border-radius: 8px; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); position: sticky; top: 20px; }
        .est-price { font-size: 2.5rem; font-weight: 800; color: var(--brand-orange); }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-2 sidebar p-0 d-none d-md-block">
            <div class="p-4 text-center border-bottom border-secondary">
                <i class="fas fa-shipping-fast fa-2x text-warning mb-2"></i>
                <h5 class="fw-bold mb-0">My Britium</h5>
            </div>
            <nav class="mt-3">
                <a href="index.html"><i class="fas fa-home me-2"></i> Dashboard</a>
                <a href="#"><i class="fas fa-box me-2"></i> My Shipments</a>
                <a href="booking.html" class="active"><i class="fas fa-plus-circle me-2"></i> New Booking</a>
                <a href="#"><i class="fas fa-user me-2"></i> Profile</a>
                <a href="../index.html" class="mt-5 border-top border-secondary"><i class="fas fa-sign-out-alt me-2"></i> Logout</a>
            </nav>
        </div>

        <div class="col-md-10 p-4">
            <h3 class="fw-bold mb-4">Create New Shipment</h3>
            
            <form id="bookingForm" onsubmit="event.preventDefault(); alert('Order Placed Successfully!');">
                <div class="row">
                    <div class="col-lg-8">
                        
                        <div class="form-section">
                            <h5 class="section-title"><i class="fas fa-user-circle me-2"></i> Sender Information</h5>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Name / Shop Name</label>
                                    <input type="text" class="form-control" value="Kyaw Wannanna" readonly>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" class="form-control" value="09897447744" readonly>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Pickup Address</label>
                                    <textarea class="form-control" rows="2">No. 277, Corner of Anawrahta Road, East Dagon Township</textarea>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h5 class="section-title"><i class="fas fa-map-marker-alt me-2"></i> Receiver Information</h5>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Receiver Name</label>
                                    <input type="text" class="form-control" placeholder="Enter Name">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Receiver Phone</label>
                                    <input type="text" class="form-control" placeholder="09xxxxxxxxx">
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label">Destination City</label>
                                    <select class="form-select" id="destRegion" onchange="toggleTownship()">
                                        <option value="yangon">Yangon</option>
                                        <option value="mandalay">Mandalay</option>
                                        <option value="npt">Nay Pyi Taw</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label">Township (Zone)</label>
                                    <select class="form-select" id="destTownship" onchange="calcCost()">
                                        <option value="" selected disabled>Select Township</option>
                                        <optgroup label="Zone 1 (3000 MMK)">
                                            <option value="3000">Ahlone, Bahan, Latha, etc.</option>
                                        </optgroup>
                                        <optgroup label="Zone 2 (3500 MMK)">
                                            <option value="3500">North Dagon, South Dagon, etc.</option>
                                        </optgroup>
                                        <optgroup label="Zone 3 (4500 MMK)">
                                            <option value="4500">Hmawbi, Thanlyin, etc.</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div class="col-12">
                                    <label class="form-label">Full Address</label>
                                    <input type="text" class="form-control" placeholder="Street name, Building No, Floor">
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h5 class="section-title"><i class="fas fa-box-open me-2"></i> Package & Service</h5>
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="form-label">Weight (Kg)</label>
                                    <input type="number" class="form-control" id="pkgWeight" value="1" min="0.5" step="0.5" oninput="calcCost()">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Items Description</label>
                                    <input type="text" class="form-control" placeholder="e.g. Clothes, Document">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Service Type</label>
                                    <select class="form-select" id="svcType" onchange="calcCost()">
                                        <option value="standard">Standard (1-2 Days)</option>
                                        <option value="express">Priority (Same Day)</option>
                                    </select>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label text-danger fw-bold">COD Amount (To Collect)</label>
                                    <div class="input-group">
                                        <span class="input-group-text">MMK</span>
                                        <input type="number" class="form-control" placeholder="0">
                                    </div>
                                    <div class="form-text">Leave 0 if item is already paid.</div>
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label">Who Pays Shipping?</label>
                                    <select class="form-select">
                                        <option>Sender (Pre-paid)</option>
                                        <option>Receiver (Collect on Delivery)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="summary-card">
                            <h5 class="fw-bold mb-3">Order Summary</h5>
                            <ul class="list-group list-group-flush mb-4">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Base Rate</span>
                                    <span id="txtBase">--</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Weight Charge</span>
                                    <span id="txtWeight">0</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between text-success">
                                    <span>Pickup Fee</span>
                                    <span>FREE</span>
                                </li>
                            </ul>
                            
                            <div class="text-center mb-4">
                                <small class="text-uppercase text-muted fw-bold">Total Estimated Cost</small>
                                <div class="est-price" id="txtTotal">0 <span class="fs-6">MMK</span></div>
                            </div>

                            <button type="submit" class="btn btn-warning w-100 py-3 fw-bold text-white shadow-sm" style="background-color: var(--brand-orange);">
                                <i class="fas fa-check-circle me-2"></i> CONFIRM BOOKING
                            </button>
                            <p class="text-center small text-muted mt-3 mb-0">Rider will be assigned within 30 mins.</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function toggleTownship() {
        const region = document.getElementById('destRegion').value;
        const tsSelect = document.getElementById('destTownship');
        if(region !== 'yangon') {
            tsSelect.disabled = true;
            tsSelect.value = "";
        } else {
            tsSelect.disabled = false;
        }
        calcCost();
    }

    function calcCost() {
        // 1. Get Inputs
        const region = document.getElementById('destRegion').value;
        const tsValue = document.getElementById('destTownship').value;
        const weight = parseFloat(document.getElementById('pkgWeight').value) || 0;
        const service = document.getElementById('svcType').value;

        let basePrice = 0;
        let weightPrice = 0;

        // 2. Base Price Logic
        if (region === 'yangon') {
            basePrice = parseInt(tsValue) || 0;
        } else if (region === 'mandalay') {
            basePrice = 3000;
        } else {
            basePrice = 3500;
        }

        // 3. Weight Logic (First 1kg free, +500 per extra kg)
        if (weight > 1) {
            weightPrice = (weight - 1) * 500;
        }

        // 4. Service Logic
        let subtotal = basePrice + weightPrice;
        if (service === 'express') {
            subtotal = subtotal + 1000; // Flat fee for priority
        }

        // 5. Update UI
        document.getElementById('txtBase').innerText = basePrice > 0 ? basePrice : '--';
        document.getElementById('txtWeight').innerText = weightPrice;
        document.getElementById('txtTotal').innerHTML = subtotal.toLocaleString() + ' <span class="fs-6">MMK</span>';
    }
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Shipments | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { background-color: #f4f6f9; font-family: 'Segoe UI', sans-serif; }
        
        /* Sidebar (Consistent Navigation) */
        .sidebar { min-height: 100vh; background-color: var(--brand-blue); color: white; }
        .sidebar a { color: rgba(255,255,255,0.8); text-decoration: none; padding: 12px 20px; display: block; border-left: 4px solid transparent; }
        .sidebar a:hover, .sidebar a.active { background-color: rgba(255,255,255,0.1); color: white; border-left: 4px solid var(--brand-orange); }
        
        /* Filter Section */
        .filter-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 20px; }
        
        /* Table Styles */
        .table-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); overflow: hidden; }
        .table-hover tbody tr:hover { background-color: #f8f9fa; }
        
        /* Status Badges */
        .status-badge { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-pending { background-color: #fff3cd; color: #856404; } /* Yellow */
        .status-transit { background-color: #cce5ff; color: #004085; } /* Blue */
        .status-delivered { background-color: #d1e7dd; color: #0f5132; } /* Green */
        .status-cancelled { background-color: #f8d7da; color: #721c24; } /* Red */
        
        /* Mobile Toggle */
        @media (max-width: 768px) {
            .sidebar { min-height: auto; }
        }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        
        <div class="col-md-2 sidebar p-0 d-none d-md-block">
            <div class="p-4 text-center border-bottom border-secondary">
                <i class="fas fa-shipping-fast fa-2x text-warning mb-2"></i>
                <h5 class="fw-bold mb-0">My Britium</h5>
            </div>
            <nav class="mt-3">
                <a href="index.html"><i class="fas fa-home me-2"></i> Dashboard</a>
                <a href="history.html" class="active"><i class="fas fa-box me-2"></i> My Shipments</a>
                <a href="booking.html"><i class="fas fa-plus-circle me-2"></i> New Booking</a>
                <a href="profile.html"><i class="fas fa-user me-2"></i> Profile</a>
                <a href="../index.html" class="mt-5 border-top border-secondary"><i class="fas fa-sign-out-alt me-2"></i> Logout</a>
            </nav>
        </div>

        <div class="col-md-10 p-4">
            
            <div class="d-md-none d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold text-primary">Britium Express</h5>
                <button class="btn btn-outline-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNav"><i class="fas fa-bars"></i> Menu</button>
            </div>
            
            <div class="collapse d-md-none mb-4" id="mobileNav">
                <div class="card card-body">
                    <a href="index.html" class="d-block mb-2 text-decoration-none text-dark">Dashboard</a>
                    <a href="history.html" class="d-block mb-2 text-decoration-none text-dark fw-bold">My Shipments</a>
                    <a href="booking.html" class="d-block mb-2 text-decoration-none text-dark">New Booking</a>
                    <a href="profile.html" class="d-block mb-2 text-decoration-none text-dark">Profile</a>
                    <a href="../index.html" class="d-block text-danger text-decoration-none">Logout</a>
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-bold text-dark">Shipment History</h3>
                <a href="booking.html" class="btn btn-warning text-white fw-bold shadow-sm"><i class="fas fa-plus me-2"></i> Create New</a>
            </div>

            <div class="filter-card">
                <form class="row g-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Search Tracking ID or Receiver Name...">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select">
                            <option selected>All Statuses</option>
                            <option>In Transit</option>
                            <option>Delivered</option>
                            <option>Pending Pickup</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <input type="date" class="form-control">
                    </div>
                    <div class="col-md-2 d-grid">
                        <button type="button" class="btn btn-outline-primary"><i class="fas fa-filter me-2"></i> Filter</button>
                    </div>
                </form>
            </div>

            <div class="table-card">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th class="ps-4">Tracking ID</th>
                                <th>Date</th>
                                <th>Receiver</th>
                                <th>Destination</th>
                                <th>COD Amount</th>
                                <th>Status</th>
                                <th class="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td class="ps-4 fw-bold text-primary">BE-89744</td>
                                <td class="text-muted small">Oct 24, 2025</td>
                                <td class="fw-bold">Daw Hla</td>
                                <td>Mandalay</td>
                                <td>35,000 MMK</td>
                                <td><span class="status-badge status-transit">In Transit</span></td>
                                <td class="text-end pe-4">
                                    <a href="../tracking.html" class="btn btn-sm btn-outline-dark" title="Track"><i class="fas fa-map-marker-alt"></i></a>
                                    <button class="btn btn-sm btn-light border" title="Download Invoice"><i class="fas fa-download"></i></button>
                                </td>
                            </tr>

                            <tr>
                                <td class="ps-4 fw-bold text-primary">BE-11223</td>
                                <td class="text-muted small">Oct 20, 2025</td>
                                <td class="fw-bold">U Ba Maung</td>
                                <td>Nay Pyi Taw</td>
                                <td>12,500 MMK</td>
                                <td><span class="status-badge status-delivered">Delivered</span></td>
                                <td class="text-end pe-4">
                                    <a href="../tracking.html" class="btn btn-sm btn-outline-dark" title="Details"><i class="fas fa-eye"></i></a>
                                    <button class="btn btn-sm btn-light border" title="Download Invoice"><i class="fas fa-download"></i></button>
                                </td>
                            </tr>

                            <tr>
                                <td class="ps-4 fw-bold text-primary">BE-88901</td>
                                <td class="text-muted small">Oct 18, 2025</td>
                                <td class="fw-bold">Ma Mya</td>
                                <td>Yangon (North Dagon)</td>
                                <td>--</td>
                                <td><span class="status-badge status-delivered">Delivered</span></td>
                                <td class="text-end pe-4">
                                    <a href="../tracking.html" class="btn btn-sm btn-outline-dark" title="Details"><i class="fas fa-eye"></i></a>
                                    <button class="btn btn-sm btn-light border" title="Download Invoice"><i class="fas fa-download"></i></button>
                                </td>
                            </tr>

                            <tr>
                                <td class="ps-4 fw-bold text-primary">BE-77120</td>
                                <td class="text-muted small">Oct 15, 2025</td>
                                <td class="fw-bold">Ko Ko</td>
                                <td>Mawlamyine</td>
                                <td>5,500 MMK</td>
                                <td><span class="status-badge status-cancelled">Cancelled</span></td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-sm btn-light border disabled"><i class="fas fa-ban"></i></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                
                <div class="d-flex justify-content-between align-items-center p-3 border-top">
                    <small class="text-muted">Showing 1-4 of 28 shipments</small>
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item active"><a class="page-link bg-dark border-dark" href="#">1</a></li>
                            <li class="page-item"><a class="page-link text-dark" href="#">2</a></li>
                            <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
                            <li class="page-item"><a class="page-link text-dark" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
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
    <title>My Dashboard | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { background-color: #f4f6f9; font-family: 'Segoe UI', sans-serif; }
        
        /* Sidebar Styling */
        .sidebar { min-height: 100vh; background-color: var(--brand-blue); color: white; }
        .sidebar a { color: rgba(255,255,255,0.8); text-decoration: none; padding: 12px 20px; display: block; border-left: 4px solid transparent; }
        .sidebar a:hover, .sidebar a.active { background-color: rgba(255,255,255,0.1); color: white; border-left: 4px solid var(--brand-orange); }
        
        /* Cards & Badges */
        .stat-card { background: white; border-radius: 8px; padding: 20px; border-left: 4px solid var(--brand-blue); box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: 0.3s; }
        .stat-card:hover { transform: translateY(-5px); }
        .status-badge { padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
        .status-transit { background-color: #fff3cd; color: #856404; }
        .status-delivered { background-color: #d4edda; color: #155724; }
        
        /* Mobile Toggle */
        @media (max-width: 768px) {
            .sidebar { min-height: auto; }
        }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        
        <div class="col-md-2 sidebar p-0 d-none d-md-block">
            <div class="p-4 text-center border-bottom border-secondary">
                <i class="fas fa-shipping-fast fa-2x text-warning mb-2"></i>
                <h5 class="fw-bold mb-0">My Britium</h5>
            </div>
            <nav class="mt-3">
                <a href="#" class="active"><i class="fas fa-home me-2"></i> Dashboard</a>
                <a href="#"><i class="fas fa-box me-2"></i> My Shipments</a>
                <a href="booking.html"><i class="fas fa-plus-circle me-2"></i> New Booking</a>
                <a href="profile.html"><i class="fas fa-user me-2"></i> Profile</a>
                <a href="../index.html" class="mt-5 border-top border-secondary"><i class="fas fa-sign-out-alt me-2"></i> Logout</a>
            </nav>
        </div>

        <div class="col-md-10 p-4">
            <div class="d-md-none d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold text-primary">Britium Express</h5>
                <button class="btn btn-outline-primary"><i class="fas fa-bars"></i> Menu</button>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4>Welcome back, Kyaw!</h4>
                <a href="booking.html" class="btn btn-warning text-white fw-bold shadow-sm">
                    <i class="fas fa-plus me-2"></i> Book Pickup
                </a>
            </div>

            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="stat-card">
                        <h6 class="text-muted">Active Shipments</h6>
                        <h2 class="fw-bold">3</h2>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card" style="border-color: #28a745;">
                        <h6 class="text-muted">Delivered (This Month)</h6>
                        <h2 class="fw-bold">12</h2>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="stat-card" style="border-color: #ff6b00;">
                        <h6 class="text-muted">Pending COD</h6>
                        <h2 class="fw-bold">45,000 MMK</h2>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3 border-bottom-0">
                    <h5 class="mb-0 fw-bold">Recent Shipments</h5>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th class="ps-3">Tracking ID</th>
                                <th>Destination</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="ps-3 fw-bold text-primary">BE-89744</td>
                                <td>Mandalay</td>
                                <td>Oct 24, 2025</td>
                                <td><span class="status-badge status-transit">In Transit</span></td>
                                <td>
                                    <a href="../tracking.html" class="btn btn-sm btn-outline-dark">Track</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="ps-3 fw-bold text-primary">BE-11223</td>
                                <td>Nay Pyi Taw</td>
                                <td>Oct 20, 2025</td>
                                <td><span class="status-badge status-delivered">Delivered</span></td>
                                <td>
                                    <a href="../tracking.html" class="btn btn-sm btn-outline-dark">View POD</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
    <title>My Profile | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { background-color: #f4f6f9; font-family: 'Segoe UI', sans-serif; }
        
        /* Sidebar */
        .sidebar { min-height: 100vh; background-color: var(--brand-blue); color: white; }
        .sidebar a { color: rgba(255,255,255,0.8); text-decoration: none; padding: 12px 20px; display: block; border-left: 4px solid transparent; }
        .sidebar a:hover, .sidebar a.active { background-color: rgba(255,255,255,0.1); color: white; border-left: 4px solid var(--brand-orange); }
        
        /* Profile Cards */
        .profile-card { background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .card-title { font-weight: 700; color: var(--brand-blue); border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 25px; }
        
        .avatar-box { text-align: center; margin-bottom: 20px; position: relative; }
        .avatar-img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid #f8f9fa; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: 0.3s; }
        .avatar-img:hover { opacity: 0.9; }
        
        /* Mobile Toggle */
        @media (max-width: 768px) {
            .sidebar { min-height: auto; }
        }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        
        <div class="col-md-2 sidebar p-0 d-none d-md-block">
            <div class="p-4 text-center border-bottom border-secondary">
                <i class="fas fa-shipping-fast fa-2x text-warning mb-2"></i>
                <h5 class="fw-bold mb-0">My Britium</h5>
            </div>
            <nav class="mt-3">
                <a href="index.html"><i class="fas fa-home me-2"></i> Dashboard</a>
                <a href="history.html"><i class="fas fa-box me-2"></i> My Shipments</a>
                <a href="booking.html"><i class="fas fa-plus-circle me-2"></i> New Booking</a>
                <a href="profile.html" class="active"><i class="fas fa-user me-2"></i> Profile</a>
                <a href="../index.html" class="mt-5 border-top border-secondary"><i class="fas fa-sign-out-alt me-2"></i> Logout</a>
            </nav>
        </div>

        <div class="col-md-10 p-4">
            
            <div class="d-md-none d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold text-primary">Britium Express</h5>
                <button class="btn btn-outline-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNav"><i class="fas fa-bars"></i> Menu</button>
            </div>
            
            <div class="collapse d-md-none mb-4" id="mobileNav">
                <div class="card card-body">
                    <a href="index.html" class="d-block mb-2 text-decoration-none text-dark">Dashboard</a>
                    <a href="history.html" class="d-block mb-2 text-decoration-none text-dark">My Shipments</a>
                    <a href="booking.html" class="d-block mb-2 text-decoration-none text-dark">New Booking</a>
                    <a href="profile.html" class="d-block mb-2 text-decoration-none text-dark fw-bold">Profile</a>
                    <a href="../index.html" class="d-block text-danger text-decoration-none">Logout</a>
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-bold text-dark">Account Settings</h3>
                <a href="index.html" class="btn btn-outline-secondary btn-sm"><i class="fas fa-arrow-left me-2"></i> Back to Dashboard</a>
            </div>

            <div class="row">
                <div class="col-lg-4">
                    <div class="profile-card text-center">
                        <div class="avatar-box">
                            <img id="profilePreview" src="https://ui-avatars.com/api/?name=User&background=0d2c54&color=fff&size=200" alt="Profile" class="avatar-img">
                        </div>
                        <h5 class="fw-bold" id="display_name">Loading...</h5>
                        <p class="text-muted small">Online Shop Member</p>
                        
                        <div class="d-grid gap-2">
                            <input type="file" id="imageUpload" accept="image/*" style="display: none;">
                            <button class="btn btn-outline-primary btn-sm" onclick="document.getElementById('imageUpload').click()">
                                <i class="fas fa-camera me-1"></i> Upload New Photo
                            </button>
                        </div>
                    </div>

                    <div class="profile-card">
                        <h5 class="card-title"><i class="fas fa-lock me-2"></i> Security</h5>
                        <form onsubmit="event.preventDefault(); alert('Password Updated Successfully!');">
                            <div class="mb-3">
                                <label class="form-label small fw-bold">Current Password</label>
                                <input type="password" class="form-control form-control-sm">
                            </div>
                            <div class="mb-3">
                                <label class="form-label small fw-bold">New Password</label>
                                <input type="password" class="form-control form-control-sm">
                            </div>
                            <div class="mb-3">
                                <label class="form-label small fw-bold">Confirm Password</label>
                                <input type="password" class="form-control form-control-sm">
                            </div>
                            <button class="btn btn-dark btn-sm w-100">Update Password</button>
                        </form>
                    </div>
                </div>

                <div class="col-lg-8">
                    
                    <div class="profile-card">
                        <h5 class="card-title"><i class="fas fa-id-card me-2"></i> Shop Information</h5>
                        <form id="profileForm" onsubmit="saveProfile(event)">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Shop Name / Full Name</label>
                                    <input type="text" class="form-control" id="profileName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Owner Name (Contact)</label>
                                    <input type="text" class="form-control" id="profileContact" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" class="form-control" id="profilePhone" readonly style="background-color: #eee;">
                                    <div class="form-text small">Phone number is your Login ID (Contact Admin to change).</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email Address</label>
                                    <input type="email" class="form-control" id="profileEmail" placeholder="shop@email.com">
                                </div>
                            </div>
                            <div class="mt-4 text-end">
                                <button type="submit" class="btn btn-success text-white fw-bold px-4" style="background-color: var(--brand-orange); border:none;">
                                    <i class="fas fa-save me-2"></i> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="profile-card">
                        <h5 class="card-title"><i class="fas fa-map-marked-alt me-2"></i> Default Pickup Address</h5>
                        <p class="text-muted small">This address will be auto-filled when you book a new shipment.</p>
                        
                        <form onsubmit="event.preventDefault(); alert('Address Updated!');">
                            <div class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">Street Address</label>
                                    <textarea class="form-control" rows="2" id="profileAddress">No. 277, Corner of Anawrahta Road and Bo Moe Gyo St.</textarea>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Township</label>
                                    <select class="form-select">
                                        <option selected>East Dagon</option>
                                        <option>North Dagon</option>
                                        <option>South Dagon</option>
                                        <option>Thingangyun</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">City</label>
                                    <select class="form-select">
                                        <option selected>Yangon</option>
                                        <option>Mandalay</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mt-4 text-end">
                                <button class="btn btn-outline-dark btn-sm">Update Address Only</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
    // 1. IMAGE PREVIEW
    document.getElementById('imageUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profilePreview').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // 2. LOAD DATA ON PAGE START
    document.addEventListener("DOMContentLoaded", function() {
        const currentUser = JSON.parse(localStorage.getItem('britium_current_user'));

        if (currentUser) {
            // Fill Inputs
            document.getElementById('profileName').value = currentUser.name || "";
            document.getElementById('profileContact').value = currentUser.contact || "";
            document.getElementById('profilePhone').value = currentUser.phone || "";
            document.getElementById('profileEmail').value = currentUser.email || "";
            
            // Fill Display Name
            document.getElementById('display_name').innerText = currentUser.name || "Valued Merchant";
            
            // Update Avatar if saved (simulated by name API for now)
            const avatarUrl = `https://ui-avatars.com/api/?name=${currentUser.name}&background=0d2c54&color=fff&size=200`;
            document.getElementById('profilePreview').src = avatarUrl;
        } else {
            // Default data for demo if no one logged in
            document.getElementById('profileName').value = "Guest Shop";
            document.getElementById('profilePhone').value = "09-0000000";
        }
    });

    // 3. SAVE DATA & SYNC TO ADMIN LIST
    function saveProfile(event) {
        event.preventDefault();

        // Get values from form
        const newName = document.getElementById('profileName').value;
        const newContact = document.getElementById('profileContact').value;
        const phone = document.getElementById('profilePhone').value; // Used as ID
        const email = document.getElementById('profileEmail').value;

        // A. Update Current User Session
        const currentUser = JSON.parse(localStorage.getItem('britium_current_user')) || {};
        currentUser.name = newName;
        currentUser.contact = newContact;
        currentUser.email = email;
        localStorage.setItem('britium_current_user', JSON.stringify(currentUser));

        // B. Sync with Admin Customer List
        let allCustomers = JSON.parse(localStorage.getItem('britium_customers')) || [];
        
        // Find the specific customer in the list (using phone as ID)
        const index = allCustomers.findIndex(c => c.phone === phone);

        if (index !== -1) {
            // Update existing record
            allCustomers[index].name = newName;
            allCustomers[index].contact = newContact;
            // Keep other data like shipments/spend same
        } else {
            // If not found (rare, but possible), add them
            allCustomers.push(currentUser);
        }

        // Save back to main database
        localStorage.setItem('britium_customers', JSON.stringify(allCustomers));

        // Success Feedback
        alert('Profile Updated! Your changes are now visible to Admin.');
        location.reload(); // Refresh to show new name on sidebar/header
    }
</script>

</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmed | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { background-color: #e9ecef; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; }
        .success-card { background: white; padding: 50px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; max-width: 500px; width: 100%; border-top: 6px solid #28a745; }
        .icon-circle { width: 80px; height: 80px; background-color: #d1e7dd; color: #198754; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 20px; }
    </style>
</head>
<body>

    <div class="success-card">
        <div class="icon-circle">
            <i class="fas fa-check"></i>
        </div>
        <h2 class="fw-bold mb-3">Booking Confirmed!</h2>
        <p class="text-muted mb-4">Your pickup request has been received. A rider will be assigned shortly.</p>
        
        <div class="bg-light p-3 rounded mb-4 border">
            <small class="text-uppercase text-muted fw-bold">Tracking Number</small>
            <div class="fs-3 fw-bold text-dark letter-spacing-1">BE-89755</div>
        </div>

        <div class="d-grid gap-2">
            <a href="../tracking.html" class="btn btn-dark fw-bold">Track Shipment</a>
            <a href="index.html" class="btn btn-outline-secondary">Return to Dashboard</a>
        </div>
    </div>

</body>
</html>