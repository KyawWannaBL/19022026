<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login or Register | Britium Express</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --brand-blue: #0d2c54;
            --brand-orange: #ff6b00;
            --light-gray: #f8f9fa;
        }

        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f0f2f5;
            color: #333;
        }

        /* Navbar Styles (Synchronized) */
        .top-bar { background-color: var(--brand-blue); color: white; padding: 10px 0; font-size: 0.9rem; }
        .navbar-brand img { height: 70px; width: auto; }
        .nav-link { font-weight: 500; color: #444 !important; margin-left: 15px; text-transform: uppercase; font-size: 0.9rem; }
        .nav-link:hover { color: var(--brand-orange) !important; }
        .btn-portal { border: 2px solid var(--brand-blue); color: var(--brand-blue); font-weight: 700; padding: 8px 25px; border-radius: 5px; }
        .btn-portal:hover { background-color: var(--brand-blue); color: white; }

        /* Auth Card */
        .auth-container { min-height: 80vh; display: flex; align-items: center; padding: 40px 0; }
        .auth-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            overflow: hidden;
            width: 100%;
        }
        
        /* Left Side (Branding) */
        .auth-cover {
            background: linear-gradient(rgba(13, 44, 84, 0.9), rgba(13, 44, 84, 0.8)), url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            text-align: center;
        }

        /* Right Side (Forms) */
        .auth-forms { padding: 50px; }
        .nav-tabs .nav-link { color: #555; font-weight: 600; border: none; border-bottom: 3px solid transparent; padding: 15px; width: 50%; text-align: center; }
        .nav-tabs .nav-link.active { color: var(--brand-orange); border-bottom: 3px solid var(--brand-orange); background: none; }
        
        .form-control { padding: 12px; background-color: #f8f9fa; border: 1px solid #ddd; }
        .form-control:focus { border-color: var(--brand-orange); box-shadow: none; background-color: white; }
        
        .btn-auth { background-color: var(--brand-orange); color: white; font-weight: 700; padding: 12px; border: none; width: 100%; transition: 0.3s; }
        .btn-auth:hover { background-color: #e65e00; }

        /* Footer */
        footer { background-color: #111; color: #aaa; padding: 60px 0 20px; }
        footer h5 { color: white; margin-bottom: 20px; font-weight: 700; }
        footer .footer-link { color: #aaa; text-decoration: none; display: block; margin-bottom: 10px; }
        footer .footer-link:hover { color: var(--brand-orange); }

        /* Floating WA */
        .float-wa { position: fixed; bottom: 25px; right: 25px; background-color: #25d366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 2px 2px 10px rgba(0,0,0,0.3); z-index: 1000; text-decoration: none; }
    </style>
</head>
<body>

    <div class="top-bar">
        <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div><span class="me-3"><i class="fas fa-phone-alt"></i> +95 9 897 4477 44</span> <span><i class="fas fa-envelope"></i> info@britiumexpress.com</span></div>
            <div><span class="me-3"><i class="fas fa-clock"></i> Mon-Sat: 9:00am - 5:30pm</span></div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="assets/images/BRITIUM EXPRESS logo.png" alt="Britium Express">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="tracking.html">Track & Trace</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="quote.html">Get Quote</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="news.html">News</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item ms-lg-3"><a href="login.html" class="btn btn-portal active">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container auth-container">
        <div class="row justify-content-center w-100">
            <div class="col-lg-10">
                <div class="auth-card">
                    <div class="row g-0">
                        <div class="col-md-5 auth-cover d-none d-md-flex">
                            <div class="mb-4">
                                <i class="fas fa-shipping-fast fa-4x text-warning mb-3"></i>
                                <h3 class="fw-bold">BRITIUM EXPRESS</h3>
                                <p class="opacity-75">Your Logistics Partner in Myanmar</p>
                            </div>
                            <div class="text-start ps-4 small">
                                <p><i class="fas fa-check-circle text-success me-2"></i> Real-time Tracking</p>
                                <p><i class="fas fa-check-circle text-success me-2"></i> Easy COD Management</p>
                                <p><i class="fas fa-check-circle text-success me-2"></i> Print Waybills Online</p>
                            </div>
                        </div>

                        <div class="col-md-7 auth-forms">
                            
                            <ul class="nav nav-tabs mb-4" id="authTab" role="tablist">
                                <li class="nav-item">
                                    <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button">LOGIN</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button">SIGN UP</button>
                                </li>
                            </ul>

                            <div class="tab-content" id="authTabContent">
                                <div class="tab-pane fade show active" id="login">
                                    <form onsubmit="handleLogin(event)">
                                        <div class="mb-3">
                                            <label class="form-label small fw-bold text-muted">Phone Number</label>
                                            <input type="text" class="form-control" id="loginPhone" placeholder="09xxxxxxxxx" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label small fw-bold text-muted">Password</label>
                                            <input type="password" class="form-control" id="loginPass" placeholder="••••••••" required>
                                        </div>
                                        <div class="d-flex justify-content-between mb-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="remember">
                                                <label class="form-check-label small" for="remember">Remember me</label>
                                            </div>
                                            <a href="#" class="small text-decoration-none text-muted">Forgot Password?</a>
                                        </div>
                                        <button type="submit" class="btn btn-auth">LOGIN</button>
                                    </form>
                                    <div class="text-center mt-4 pt-3 border-top">
                                        <small class="text-muted">Staff Member? <a href="admin/login.html" class="fw-bold text-dark">Admin Login</a></small>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="register">
                                    <div class="text-center mb-4">
                                        <p class="text-muted small mb-2">Are you an Online Shop Owner?</p>
                                        <a href="register_seller.html" class="btn btn-outline-primary btn-sm w-100 fw-bold">
                                            <i class="fas fa-store me-2"></i> Register as Merchant
                                        </a>
                                        <div class="d-flex align-items-center my-3">
                                            <hr class="flex-grow-1"> <span class="mx-2 small text-muted">OR</span> <hr class="flex-grow-1">
                                        </div>
                                    </div>

                                    <form onsubmit="handlePersonalSignUp(event)">
                                        <div class="row g-2 mb-3">
                                            <div class="col">
                                                <input type="text" class="form-control" id="regFirstName" placeholder="First Name" required>
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" id="regLastName" placeholder="Last Name" required>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <input type="text" class="form-control" id="regPhone" placeholder="Phone Number" required>
                                        </div>
                                        <div class="mb-3">
                                            <input type="password" class="form-control" id="regPass" placeholder="Create Password" required>
                                        </div>
                                        <button type="submit" class="btn btn-auth">CREATE PERSONAL ACCOUNT</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="text-uppercase">Britium Express</h5>
                    <p class="small text-muted">A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions.</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Links</h5>
                    <a href="tracking.html" class="footer-link">Track Package</a>
                    <a href="services.html" class="footer-link">Services</a>
                    <a href="contact.html" class="footer-link">Contact</a>
                </div>
                <div class="col-lg-6 mb-4">
                    <h5>Contact Us</h5>
                    <div class="d-flex mb-3">
                        <i class="fas fa-map-marker-alt me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">No. 277, Corner of Anawrahta Road and Bo Moe Gyo St., East Dagon Township, Yangon.</span>
                    </div>
                    <div class="d-flex mb-3">
                        <i class="fas fa-phone me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">+95 9 897 4477 44, +95 9 897 4477 55</span>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-3 mt-3 text-center small text-muted">
                &copy; 2026 Britium Ventures Company Limited. All Rights Reserved.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/959897447744" class="float-wa" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // 1. Handle Personal Sign Up
        function handlePersonalSignUp(event) {
            event.preventDefault();

            // Get Inputs
            const fName = document.getElementById('regFirstName').value;
            const lName = document.getElementById('regLastName').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPass').value;
            const date = new Date().toLocaleDateString();

            // Create User Object
            const newUser = {
                name: fName + " " + lName,
                contact: fName, // Using First name as contact for personal
                phone: phone,
                password: password, // In real app, never save raw password!
                type: "Individual",
                shipments: 0,
                spend: "0 MMK",
                joined: date
            };

            // Save to "Database" (Local Storage)
            let customers = JSON.parse(localStorage.getItem('britium_customers')) || [];
            
            // Check if phone already exists
            const existing = customers.find(c => c.phone === phone);
            if (existing) {
                alert('This phone number is already registered!');
                return;
            }

            customers.push(newUser);
            localStorage.setItem('britium_customers', JSON.stringify(customers));

            // Log User In Immediately
            localStorage.setItem('britium_current_user', JSON.stringify(newUser));

            alert('Account Created! Welcome ' + fName);
            window.location.href = 'customer/index.html';
        }

        // 2. Handle Login
        function handleLogin(event) {
            event.preventDefault();

            const phone = document.getElementById('loginPhone').value;
            const pass = document.getElementById('loginPass').value;

            // Get saved users
            let customers = JSON.parse(localStorage.getItem('britium_customers')) || [];
            
            // Find User
            const user = customers.find(c => c.phone === phone && c.password === pass);

            if (user) {
                // Success
                localStorage.setItem('britium_current_user', JSON.stringify(user));
                window.location.href = 'customer/index.html';
            } else {
                // Failed
                alert('Invalid Phone Number or Password!');
            }
        }
    </script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login or Register | Britium Express</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --brand-blue: #0d2c54;
            --brand-orange: #ff6b00;
            --light-gray: #f8f9fa;
        }

        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f0f2f5;
            color: #333;
        }

        /* Navbar Styles (Synchronized) */
        .top-bar { background-color: var(--brand-blue); color: white; padding: 10px 0; font-size: 0.9rem; }
        .navbar-brand img { height: 70px; width: auto; }
        .nav-link { font-weight: 500; color: #444 !important; margin-left: 15px; text-transform: uppercase; font-size: 0.9rem; }
        .nav-link:hover { color: var(--brand-orange) !important; }
        .btn-portal { border: 2px solid var(--brand-blue); color: var(--brand-blue); font-weight: 700; padding: 8px 25px; border-radius: 5px; }
        .btn-portal:hover { background-color: var(--brand-blue); color: white; }

        /* Auth Card */
        .auth-container { min-height: 80vh; display: flex; align-items: center; padding: 40px 0; }
        .auth-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            overflow: hidden;
            width: 100%;
        }
        
        /* Left Side (Branding) */
        .auth-cover {
            background: linear-gradient(rgba(13, 44, 84, 0.9), rgba(13, 44, 84, 0.8)), url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            text-align: center;
        }

        /* Right Side (Forms) */
        .auth-forms { padding: 50px; }
        .nav-tabs .nav-link { color: #555; font-weight: 600; border: none; border-bottom: 3px solid transparent; padding: 15px; width: 50%; text-align: center; }
        .nav-tabs .nav-link.active { color: var(--brand-orange); border-bottom: 3px solid var(--brand-orange); background: none; }
        
        .form-control { padding: 12px; background-color: #f8f9fa; border: 1px solid #ddd; }
        .form-control:focus { border-color: var(--brand-orange); box-shadow: none; background-color: white; }
        
        .btn-auth { background-color: var(--brand-orange); color: white; font-weight: 700; padding: 12px; border: none; width: 100%; transition: 0.3s; }
        .btn-auth:hover { background-color: #e65e00; }

        /* Footer */
        footer { background-color: #111; color: #aaa; padding: 60px 0 20px; }
        footer h5 { color: white; margin-bottom: 20px; font-weight: 700; }
        footer .footer-link { color: #aaa; text-decoration: none; display: block; margin-bottom: 10px; }
        footer .footer-link:hover { color: var(--brand-orange); }

        /* Floating WA */
        .float-wa { position: fixed; bottom: 25px; right: 25px; background-color: #25d366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 2px 2px 10px rgba(0,0,0,0.3); z-index: 1000; text-decoration: none; }
    </style>
</head>
<body>

    <div class="top-bar">
        <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div><span class="me-3"><i class="fas fa-phone-alt"></i> +95 9 897 4477 44</span> <span><i class="fas fa-envelope"></i> info@britiumexpress.com</span></div>
            <div><span class="me-3"><i class="fas fa-clock"></i> Mon-Sat: 9:00am - 5:30pm</span></div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="assets/images/BRITIUM EXPRESS logo.png" alt="Britium Express">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="tracking.html">Track & Trace</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="quote.html">Get Quote</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="news.html">News</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item ms-lg-3"><a href="login.html" class="btn btn-portal active">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container auth-container">
        <div class="row justify-content-center w-100">
            <div class="col-lg-10">
                <div class="auth-card">
                    <div class="row g-0">
                        <div class="col-md-5 auth-cover d-none d-md-flex">
                            <div class="mb-4">
                                <i class="fas fa-shipping-fast fa-4x text-warning mb-3"></i>
                                <h3 class="fw-bold">BRITIUM EXPRESS</h3>
                                <p class="opacity-75">Your Logistics Partner in Myanmar</p>
                            </div>
                            <div class="text-start ps-4 small">
                                <p><i class="fas fa-check-circle text-success me-2"></i> Real-time Tracking</p>
                                <p><i class="fas fa-check-circle text-success me-2"></i> Easy COD Management</p>
                                <p><i class="fas fa-check-circle text-success me-2"></i> Print Waybills Online</p>
                            </div>
                        </div>

                        <div class="col-md-7 auth-forms">
                            
                            <ul class="nav nav-tabs mb-4" id="authTab" role="tablist">
                                <li class="nav-item">
                                    <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button">LOGIN</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button">SIGN UP</button>
                                </li>
                            </ul>

                            <div class="tab-content" id="authTabContent">
                                <div class="tab-pane fade show active" id="login">
                                    <form onsubmit="handleLogin(event)">
                                        <div class="mb-3">
                                            <label class="form-label small fw-bold text-muted">Phone Number</label>
                                            <input type="text" class="form-control" id="loginPhone" placeholder="09xxxxxxxxx" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label small fw-bold text-muted">Password</label>
                                            <input type="password" class="form-control" id="loginPass" placeholder="••••••••" required>
                                        </div>
                                        <div class="d-flex justify-content-between mb-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="remember">
                                                <label class="form-check-label small" for="remember">Remember me</label>
                                            </div>
                                            <a href="#" class="small text-decoration-none text-muted">Forgot Password?</a>
                                        </div>
                                        <button type="submit" class="btn btn-auth">LOGIN</button>
                                    </form>
                                    <div class="text-center mt-4 pt-3 border-top">
                                        <small class="text-muted">Staff Member? <a href="admin/login.html" class="fw-bold text-dark">Admin Login</a></small>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="register">
                                    <div class="text-center mb-4">
                                        <p class="text-muted small mb-2">Are you an Online Shop Owner?</p>
                                        <a href="register_seller.html" class="btn btn-outline-primary btn-sm w-100 fw-bold">
                                            <i class="fas fa-store me-2"></i> Register as Merchant
                                        </a>
                                        <div class="d-flex align-items-center my-3">
                                            <hr class="flex-grow-1"> <span class="mx-2 small text-muted">OR</span> <hr class="flex-grow-1">
                                        </div>
                                    </div>

                                    <form onsubmit="handlePersonalSignUp(event)">
                                        <div class="row g-2 mb-3">
                                            <div class="col">
                                                <input type="text" class="form-control" id="regFirstName" placeholder="First Name" required>
                                            </div>
                                            <div class="col">
                                                <input type="text" class="form-control" id="regLastName" placeholder="Last Name" required>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <input type="text" class="form-control" id="regPhone" placeholder="Phone Number" required>
                                        </div>
                                        <div class="mb-3">
                                            <input type="password" class="form-control" id="regPass" placeholder="Create Password" required>
                                        </div>
                                        <button type="submit" class="btn btn-auth">CREATE PERSONAL ACCOUNT</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="text-uppercase">Britium Express</h5>
                    <p class="small text-muted">A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions.</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Links</h5>
                    <a href="tracking.html" class="footer-link">Track Package</a>
                    <a href="services.html" class="footer-link">Services</a>
                    <a href="contact.html" class="footer-link">Contact</a>
                </div>
                <div class="col-lg-6 mb-4">
                    <h5>Contact Us</h5>
                    <div class="d-flex mb-3">
                        <i class="fas fa-map-marker-alt me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">No. 277, Corner of Anawrahta Road and Bo Moe Gyo St., East Dagon Township, Yangon.</span>
                    </div>
                    <div class="d-flex mb-3">
                        <i class="fas fa-phone me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">+95 9 897 4477 44, +95 9 897 4477 55</span>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-3 mt-3 text-center small text-muted">
                &copy; 2026 Britium Ventures Company Limited. All Rights Reserved.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/959897447744" class="float-wa" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // 1. Handle Personal Sign Up
        function handlePersonalSignUp(event) {
            event.preventDefault();

            // Get Inputs
            const fName = document.getElementById('regFirstName').value;
            const lName = document.getElementById('regLastName').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPass').value;
            const date = new Date().toLocaleDateString();

            // Create User Object
            const newUser = {
                name: fName + " " + lName,
                contact: fName, // Using First name as contact for personal
                phone: phone,
                password: password, // In real app, never save raw password!
                type: "Individual",
                shipments: 0,
                spend: "0 MMK",
                joined: date
            };

            // Save to "Database" (Local Storage)
            let customers = JSON.parse(localStorage.getItem('britium_customers')) || [];
            
            // Check if phone already exists
            const existing = customers.find(c => c.phone === phone);
            if (existing) {
                alert('This phone number is already registered!');
                return;
            }

            customers.push(newUser);
            localStorage.setItem('britium_customers', JSON.stringify(customers));

            // Log User In Immediately
            localStorage.setItem('britium_current_user', JSON.stringify(newUser));

            alert('Account Created! Welcome ' + fName);
            window.location.href = 'customer/index.html';
        }

        // 2. Handle Login
        function handleLogin(event) {
            event.preventDefault();

            const phone = document.getElementById('loginPhone').value;
            const pass = document.getElementById('loginPass').value;

            // Get saved users
            let customers = JSON.parse(localStorage.getItem('britium_customers')) || [];
            
            // Find User
            const user = customers.find(c => c.phone === phone && c.password === pass);

            if (user) {
                // Success
                localStorage.setItem('britium_current_user', JSON.stringify(user));
                window.location.href = 'customer/index.html';
            } else {
                // Failed
                alert('Invalid Phone Number or Password!');
            }
        }
    </script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { font-family: 'Segoe UI', sans-serif; }
        .navbar-brand { font-weight: 900; color: var(--brand-blue) !important; text-transform: uppercase; }
        .nav-link { font-weight: 500; color: #444 !important; margin-left: 15px; text-transform: uppercase; font-size: 0.9rem; }
        .nav-link.active { color: var(--brand-orange) !important; }
        .btn-portal { border: 2px solid var(--brand-blue); color: var(--brand-blue); font-weight: 700; padding: 6px 20px; border-radius: 5px; }
        .page-header { background-color: var(--brand-blue); color: white; padding: 60px 0; text-align: center; }
        footer { background-color: #111; color: #aaa; padding: 40px 0; }
        footer a { color: #aaa; text-decoration: none; }
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="fas fa-shipping-fast me-2"></i> Britium <span style="color:var(--brand-orange)">Express</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="tracking.html">Track & Trace</a></li>
                    <li class="nav-item"><a class="nav-link active" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="quote.html">Get Quote</a></li>
                    <li class="nav-item"><a class="nav-link" href="news.html">News</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item ms-lg-3"><a href="login.html" class="btn btn-portal">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="page-header">
        <div class="container">
            <h1 class="fw-bold">Our Services</h1>
            <p class="lead opacity-75">Comprehensive Logistics Solutions</p>
        </div>
    </header>

    <section class="py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4 col-md-6">
                    <div class="service-box text-center">
                        <i class="fas fa-truck-fast service-icon"></i>
                        <h4 class="fw-bold mb-3">Domestic Express</h4>
                        <p class="text-muted">Connecting Yangon, Mandalay, and Nay Pyi Taw with same-day and next-day options.</p>
                        <a href="#" class="btn btn-outline-dark btn-sm mt-2">View Hubs</a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="service-box text-center">
                        <i class="fas fa-hand-holding-usd service-icon"></i>
                        <h4 class="fw-bold mb-3">COD & E-Commerce</h4>
                        <p class="text-muted">Secure Cash on Delivery handling with fast remittance for online sellers.</p>
                        <a href="#" class="btn btn-outline-dark btn-sm mt-2">Seller Registration</a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="service-box text-center">
                        <i class="fas fa-plane-departure service-icon"></i>
                        <h4 class="fw-bold mb-3">International Cargo</h4>
                        <p class="text-muted">Consolidated air cargo to USA, Asia, and Europe. Customs Licensed handling.</p>
                        <a href="#rates" class="btn btn-outline-dark btn-sm mt-2">Check Rates Below</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="rates" class="py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h6 class="text-uppercase text-primary fw-bold">Britium Air Cargo Express</h6>
                <h2 class="fw-bold">International Pricing Tables</h2>
                <p class="text-muted">Fast • Reliable • International</p>
            </div>

            <ul class="nav nav-tabs justify-content-center mb-4" id="rateTabs" role="tablist">
                <li class="nav-item">
                    <button class="nav-link active" id="asia-tab" data-bs-toggle="tab" data-bs-target="#asia" type="button">Asia</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="europe-tab" data-bs-toggle="tab" data-bs-target="#europe" type="button">Europe</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="oceania-tab" data-bs-toggle="tab" data-bs-target="#oceania" type="button">Oceania</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="na-tab" data-bs-toggle="tab" data-bs-target="#na" type="button">North America</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="me-tab" data-bs-toggle="tab" data-bs-target="#me" type="button">Middle East</button>
                </li>
            </ul>

            <div class="tab-content bg-white p-4 rounded shadow-sm" id="rateTabsContent">
                
                <div class="tab-pane fade show active" id="asia" role="tabpanel">
                    <h5 class="fw-bold mb-3"><i class="fas fa-globe-asia text-primary me-2"></i> Asia Air Cargo Pricing (MMK / KG)</h5>
                    <div class="table-responsive">
                        <table class="table table-striped rate-table table-hover">
                            <thead>
                                <tr><th>Weight Slab</th><th>Price / KG</th><th>Destinations</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>5-10 Kg</td><td class="fw-bold">15,000</td><td><i class="fas fa-flag flag-icon"></i> Thailand</td></tr>
                                <tr><td>5-10 Kg</td><td class="fw-bold">35,000</td><td><i class="fas fa-flag flag-icon"></i> Singapore, Malaysia</td></tr>
                                <tr><td>5-10 Kg</td><td class="fw-bold">65,000</td><td><i class="fas fa-flag flag-icon"></i> Japan</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">12,000</td><td><i class="fas fa-flag flag-icon"></i> Thailand</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">55,000</td><td><i class="fas fa-flag flag-icon"></i> Singapore</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">11,000</td><td><i class="fas fa-flag flag-icon"></i> Thailand</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">35,000</td><td><i class="fas fa-flag flag-icon"></i> Japan, Taiwan</td></tr>
                            </tbody>
                        </table>
                        <small class="text-muted">*Rates subject to change.</small>
                    </div>
                </div>

                <div class="tab-pane fade" id="europe" role="tabpanel">
                    <h5 class="fw-bold mb-3"><i class="fas fa-euro-sign text-primary me-2"></i> Europe Air Cargo Pricing (MMK / KG)</h5>
                    <div class="table-responsive">
                        <table class="table table-striped rate-table table-hover">
                            <thead>
                                <tr><th>Weight Slab</th><th>Price / KG</th><th>Destinations</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>3-10 Kg</td><td class="fw-bold">120,000</td><td><i class="fas fa-flag flag-icon"></i> Czech Republic</td></tr>
                                <tr><td>5-10 Kg</td><td class="fw-bold">15,000</td><td><i class="fas fa-flag flag-icon"></i> Denmark</td></tr>
                                <tr><td>5-10 Kg</td><td class="fw-bold">35,000</td><td><i class="fas fa-flag flag-icon"></i> Estonia</td></tr>
                                <tr><td>5-10 Kg</td><td class="fw-bold">80,000</td><td><i class="fas fa-flag flag-icon"></i> Slovakia</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">50,000</td><td><i class="fas fa-flag flag-icon"></i> Netherlands</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">120,000</td><td><i class="fas fa-flag flag-icon"></i> Poland</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">11,000</td><td><i class="fas fa-flag flag-icon"></i> Germany</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">33,000</td><td><i class="fas fa-flag flag-icon"></i> Austria</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">70,000</td><td><i class="fas fa-flag flag-icon"></i> Belgium</td></tr>
                            </tbody>
                        </table>
                        <small class="text-muted">*Rates on Request: Lithuania, North Macedonia.</small>
                    </div>
                </div>

                <div class="tab-pane fade" id="oceania" role="tabpanel">
                    <h5 class="fw-bold mb-3"><i class="fas fa-water text-primary me-2"></i> Oceania Air Cargo Pricing (MMK / KG)</h5>
                    <div class="table-responsive">
                        <table class="table table-striped rate-table table-hover">
                            <thead>
                                <tr><th>Weight Slab</th><th>Price / KG</th><th>Destinations</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>5-10 Kg</td><td class="fw-bold">95,000</td><td><i class="fas fa-flag flag-icon"></i> Australia, New Zealand</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">75,000</td><td><i class="fas fa-flag flag-icon"></i> Australia, New Zealand</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">70,000</td><td><i class="fas fa-flag flag-icon"></i> Australia, New Zealand</td></tr>
                            </tbody>
                        </table>
                        <small class="text-muted">*Rates include USA in slab group.</small>
                    </div>
                </div>

                <div class="tab-pane fade" id="na" role="tabpanel">
                    <h5 class="fw-bold mb-3"><i class="fas fa-flag-usa text-primary me-2"></i> North America Air Cargo Pricing (MMK / KG)</h5>
                    <div class="table-responsive">
                        <table class="table table-striped rate-table table-hover">
                            <thead>
                                <tr><th>Weight Slab</th><th>Price / KG</th><th>Destinations</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>5-10 Kg</td><td class="fw-bold">119,000</td><td><i class="fas fa-flag flag-icon"></i> USA, Mexico, Canada</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">95,000</td><td><i class="fas fa-flag flag-icon"></i> USA, Mexico, Canada</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">75,000</td><td><i class="fas fa-flag flag-icon"></i> USA, Mexico, Canada</td></tr>
                            </tbody>
                        </table>
                        <small class="text-muted">*Weight slabs apply.</small>
                    </div>
                </div>

                <div class="tab-pane fade" id="me" role="tabpanel">
                    <h5 class="fw-bold mb-3"><i class="fas fa-mosque text-primary me-2"></i> Middle East Air Cargo Pricing (MMK / KG)</h5>
                    <div class="table-responsive">
                        <table class="table table-striped rate-table table-hover">
                            <thead>
                                <tr><th>Weight Slab</th><th>Price / KG</th><th>Destinations</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>5-10 Kg</td><td class="fw-bold">120,000</td><td><i class="fas fa-flag flag-icon"></i> Israel</td></tr>
                                <tr><td>5-10 Kg</td><td class="fw-bold">80,000</td><td><i class="fas fa-flag flag-icon"></i> Saudi Arabia</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">90,000</td><td><i class="fas fa-flag flag-icon"></i> Israel</td></tr>
                                <tr><td>11-20 Kg</td><td class="fw-bold">70,000</td><td><i class="fas fa-flag flag-icon"></i> Kuwait</td></tr>
                                <tr><td>20-30 Kg</td><td class="fw-bold">60,000</td><td><i class="fas fa-flag flag-icon"></i> Bahrain</td></tr>
                            </tbody>
                        </table>
                        <small class="text-muted">*Rates available on request for Qatar & Oman.</small>
                    </div>
                </div>

            </div>
            
            <div class="text-center mt-4">
                <p class="text-muted"><i class="fas fa-info-circle me-1"></i> Prices are in MMK per KG. Rates are subject to change based on fuel surcharges and capacity.</p>
                <a href="#" class="btn btn-warning fw-bold px-4 py-2">Get a Custom Quote</a>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="text-uppercase">Britium Express</h5>
                    <p class="small text-muted">A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions.</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Links</h5>
                    <a href="#" class="d-block mb-2">Track Package</a>
                    <a href="#" class="d-block mb-2">Services</a>
                    <a href="#" class="d-block mb-2">Contact</a>
                </div>
                <div class="col-lg-6 mb-4">
                    <h5>Reach Out</h5>
                    <div class="d-flex mb-2">
                        <i class="fas fa-map-marker-alt me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">Britium Ventures Company Limited, YANGON, Yangon 11451 My.</span>
                    </div>
                    <div class="d-flex mb-2">
                        <i class="fas fa-phone me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">+95-9-897447744, +95-9-897447755, +95-9-897447766</span>
                    </div>
                    <div class="d-flex">
                        <i class="fas fa-envelope me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">info@britiumexpress.com</span>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-3 mt-3 text-center small text-muted">
                &copy; 2026 Britium Ventures Company Limited. All Rights Reserved.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/959897447744" class="float-wa" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get a Quote | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { font-family: 'Segoe UI', sans-serif; background-color: #f8f9fa; }
        .navbar-brand { font-weight: 900; color: var(--brand-blue) !important; text-transform: uppercase; }
        .nav-link { font-weight: 500; color: #444 !important; margin-left: 15px; text-transform: uppercase; font-size: 0.9rem; }
        .nav-link.active { color: var(--brand-orange) !important; }
        .btn-portal { border: 2px solid var(--brand-blue); color: var(--brand-blue); font-weight: 700; padding: 6px 20px; border-radius: 5px; }
        .price-display { background: #e3f2fd; border: 2px dashed var(--brand-blue); padding: 30px; text-align: center; border-radius: 8px; }
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="fas fa-shipping-fast me-2"></i> Britium <span style="color:var(--brand-orange)">Express</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="tracking.html">Track & Trace</a></li>
                    <li class="nav-item"><a class="nav-link active" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="quote.html">Get Quote</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="news.html">News</a></li> <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item ms-lg-3"><a href="login.html" class="btn btn-portal">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <header class="quote-header">
        <div class="container">
            <h1 class="display-4 fw-bold">Shipping Rate Calculator</h1>
            <p class="lead opacity-75">Check our specific Yangon City rates below.</p>
        </div>
    </header>

    <section class="pb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="calculator-card">
                        <div class="row g-5">
                            <div class="col-md-7">
                                <h4 class="fw-bold mb-4 text-secondary"><i class="fas fa-sliders-h me-2"></i> Shipment Details</h4>
                                <form id="rateForm">
                                    <div class="row g-3">
                                        <div class="col-md-12">
                                            <label class="form-label fw-bold">Origin</label>
                                            <select class="form-select form-select-lg" disabled>
                                                <option selected>From: Yangon</option>
                                            </select>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold">Destination Region</label>
                                            <select class="form-select form-select-lg" id="destinationRegion" onchange="toggleTownships()">
                                                <option value="yangon" selected>Yangon City</option>
                                                <option value="mandalay">Mandalay Region</option>
                                                <option value="other">Other States/Regions</option>
                                            </select>
                                        </div>

                                        <div class="col-md-6">
                                            <label class="form-label fw-bold">Select Township</label>
                                            <select class="form-select form-select-lg" id="yangonTownship" onchange="calculateRate()">
                                                <option value="" disabled selected>-- Select Area --</option>
                                                
                                                <optgroup label="Zone 1 - Downtown & Inner City">
                                                    <option value="3000">Ahlone</option>
                                                    <option value="3000">Bahan</option>
                                                    <option value="3000">Botahtaung</option>
                                                    <option value="3000">Dagon</option>
                                                    <option value="3000">Dawbon</option>
                                                    <option value="3000">Hlaing</option>
                                                    <option value="3000">Insein</option>
                                                    <option value="3000">Kamaryut</option>
                                                    <option value="3000">Kyauktada</option>
                                                    <option value="3000">Kyimyindaing</option>
                                                    <option value="3000">Lanmataw</option>
                                                    <option value="3000">Latha</option>
                                                    <option value="3000">Mayangone</option>
                                                    <option value="3000">Mingalar Taung Nyunt</option>
                                                    <option value="3000">North Okkalapa</option>
                                                    <option value="3000">Pabedan</option>
                                                    <option value="3000">Pazundaung</option>
                                                    <option value="3000">Sanchaung</option>
                                                    <option value="3000">South Oakkalapa</option>
                                                    <option value="3000">Tamwe</option>
                                                    <option value="3000">Thaketa</option>
                                                    <option value="3000">Thingangyun</option>
                                                    <option value="3000">Yankin</option>
                                                </optgroup>

                                                <optgroup label="Zone 2 - Outer City">
                                                    <option value="3500">Dagon Seikken</option>
                                                    <option value="3500">East Dagon</option>
                                                    <option value="3500">Hlaing Thar Yar</option>
                                                    <option value="3500">Mingalar Don</option>
                                                    <option value="3500">North Dagon</option>
                                                    <option value="3500">Shwe Paukkan</option>
                                                    <option value="3500">Shwe Pyi Thar</option>
                                                    <option value="3500">South Dagon</option>
                                                </optgroup>

                                                <optgroup label="Zone 3 - Periphery">
                                                    <option value="4500">Htauk Kyant</option>
                                                    <option value="4500">Hlegu</option>
                                                    <option value="4500">Hmawbi</option>
                                                    <option value="4500">Lay Daung Kan</option>
                                                    <option value="4500">Thanlyin</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-md-6">
                                            <label class="form-label fw-bold">Weight (Kg)</label>
                                            <input type="number" class="form-control form-control-lg" id="weight" value="1" min="0.5" step="0.5" oninput="calculateRate()">
                                        </div>

                                        <div class="col-12 mt-4">
                                            <label class="form-label small text-muted">Dimensions (L x W x H cm) - Optional</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" placeholder="L">
                                                <span class="input-group-text">x</span>
                                                <input type="number" class="form-control" placeholder="W">
                                                <span class="input-group-text">x</span>
                                                <input type="number" class="form-control" placeholder="H">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="col-md-5">
                                <div class="price-display">
                                    <h6 class="text-uppercase text-muted fw-bold ls-1">Estimated Delivery Cost</h6>
                                    <div class="total-price" id="resultPrice">-- MMK</div>
                                    <div class="text-success fw-bold mb-3" id="resultTime">Select a Township</div>
                                    
                                    <hr class="my-3 opacity-25">
                                    
                                    <div class="d-grid gap-2">
                                        <a href="login.html" class="btn btn-warning btn-lg fw-bold text-white" style="background-color: var(--brand-orange);">BOOK NOW</a>
                                        <small class="text-center text-muted fst-italic mt-2" style="font-size: 0.75rem;">*Base rate covers 1st Kg. Additional weight +500 MMK/Kg.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="text-uppercase">Britium Express</h5>
                    <p class="small text-muted">A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions.</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Links</h5>
                    <a href="index.html" class="d-block mb-2">Track Package</a>
                    <a href="services.html" class="d-block mb-2">Services</a>
                    <a href="quote.html" class="d-block mb-2">Get Quote</a>
                </div>
                <div class="col-lg-6 mb-4">
                    <h5>Reach Out</h5>
                    <div class="d-flex mb-2">
                        <i class="fas fa-map-marker-alt me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">Britium Ventures Company Limited, YANGON, Yangon 11451 My.</span>
                    </div>
                    <div class="d-flex mb-2">
                        <i class="fas fa-phone me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">+95-9-897447744, +95-9-897447755</span>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-3 mt-3 text-center small text-muted">
                &copy; 2026 Britium Ventures Company Limited. All Rights Reserved.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/959897447744" class="float-wa" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script>
        function toggleTownships() {
            const region = document.getElementById('destinationRegion').value;
            const yangonSelect = document.getElementById('yangonTownship');
            
            if (region === 'yangon') {
                yangonSelect.disabled = false;
                document.getElementById('resultTime').innerHTML = 'Select a Township';
            } else {
                yangonSelect.disabled = true;
                yangonSelect.value = ""; // Reset
                
                // Demo logic for non-Yangon
                if(region === 'mandalay') {
                    document.getElementById('resultPrice').innerText = "3,000 MMK"; 
                    document.getElementById('resultTime').innerText = "Standard Rate (Base)";
                } else {
                    document.getElementById('resultPrice').innerText = "Call for Quote";
                    document.getElementById('resultTime').innerText = "Remote Area";
                }
            }
        }

        function calculateRate() {
            // 1. Get Values
            const region = document.getElementById('destinationRegion').value;
            const townshipSelect = document.getElementById('yangonTownship');
            const weight = parseFloat(document.getElementById('weight').value) || 0;
            
            // Only calculate if Yangon is selected
            if (region !== 'yangon') return;

            // Get the base price from the dropdown value (3000, 3500, or 4500)
            let baseRate = parseInt(townshipSelect.value);

            if (isNaN(baseRate)) {
                document.getElementById('resultPrice').innerText = "-- MMK";
                return;
            }

            // 2. Weight Logic (First 1kg free in base rate, then +500 per kg)
            let extraWeightCost = 0;
            if (weight > 1) {
                extraWeightCost = (weight - 1) * 500;
            }

            let total = baseRate + extraWeightCost;

            // Format Output
            let formattedPrice = total.toLocaleString() + " MMK";

            // 3. Update Display
            document.getElementById('resultPrice').innerText = formattedPrice;
            document.getElementById('resultTime').innerHTML = '<i class="fas fa-motorcycle me-1"></i> Delivery: 1-2 Days';
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
    <title>Track Shipment | Britium Express</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root { 
            --brand-blue: #0d2c54; 
            --brand-orange: #ff6b00; 
            --light-gray: #f8f9fa; 
        }
        
        body { 
            font-family: 'Roboto', sans-serif; 
            color: #333; 
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Top Bar & Navbar */
        .top-bar { background-color: var(--brand-blue); color: white; padding: 10px 0; font-size: 0.9rem; }
        .navbar { background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05); padding: 15px 0; }
        .navbar-brand img { height: 70px; width: auto; }
        .nav-link { font-weight: 500; color: #444 !important; margin-left: 15px; text-transform: uppercase; font-size: 0.9rem; transition: 0.3s; }
        .nav-link:hover, .nav-link.active { color: var(--brand-orange) !important; }
        .btn-portal { border: 2px solid var(--brand-blue); color: var(--brand-blue); font-weight: 700; padding: 8px 25px; border-radius: 5px; transition: 0.3s; }
        .btn-portal:hover { background-color: var(--brand-blue); color: white; }

        /* Page Hero */
        .page-hero { 
            background: linear-gradient(rgba(13, 44, 84, 0.9), rgba(13, 44, 84, 0.9)), url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'); 
            background-size: cover; 
            background-position: center; 
            padding: 80px 0; 
            color: white; 
            text-align: center;
            margin-bottom: 0;
        }

        /* Tracking Specific Styles */
        .tracking-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-top: -50px; /* Overlap effect */
            position: relative;
            z-index: 10;
        }

        /* Footer */
        footer { background-color: #111; color: #aaa; padding: 80px 0 30px; margin-top: auto; }
        footer a { color: #aaa; text-decoration: none; display: block; margin-bottom: 12px; transition: 0.2s; }
        footer a:hover { color: var(--brand-orange); padding-left: 5px; }
        
        /* Floating WhatsApp */
        .float-wa { position: fixed; bottom: 30px; right: 30px; background-color: #25d366; color: white; width: 65px; height: 65px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; box-shadow: 2px 5px 15px rgba(0,0,0,0.3); z-index: 1000; transition: 0.3s; }
        .float-wa:hover { transform: scale(1.1); background-color: #20b857; }
    </style>
</head>
<body>

    <div class="top-bar">
        <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div>
                <span class="me-3"><i class="fas fa-phone-alt me-2"></i> +95 9 897 4477 44</span> 
                <span><i class="fas fa-envelope me-2"></i> info@britiumexpress.com</span>
            </div>
            <div class="mt-2 mt-md-0">
                <span class="me-3"><i class="fas fa-clock me-2"></i> Mon-Sat: 9:00am - 5:30pm</span>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="assets/images/BRITIUM EXPRESS logo.png" alt="Britium Express Logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link active" href="tracking.html">Track & Trace</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="quote.html">Get Quote</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="news.html">News</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item ms-lg-3"><a href="login.html" class="btn btn-portal">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="page-hero">
        <div class="container">
            <h1 class="fw-bold display-4 mb-3">Track & Trace</h1>
            <p class="lead opacity-75 mb-0">Real-time status updates for your shipments.</p>
        </div>
    </header>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                
                <div class="tracking-box">
                    <h3 class="fw-bold text-center mb-4" style="color: var(--brand-blue)">Track Your Shipment</h3>
                    
                    <div class="input-group mb-3">
                        <input type="text" id="trackInput" class="form-control form-control-lg border-2" placeholder="Enter Tracking ID (e.g. BE-1001)">
                        <button class="btn btn-warning fw-bold text-white px-4" id="trackBtn" style="background-color: var(--brand-orange);">TRACK</button>
                    </div>
                    
                    <div id="resultBox" class="card p-4 mt-4 shadow-sm" style="display:none; border-left: 5px solid var(--brand-blue);">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h4 id="statusHeader" class="fw-bold text-primary mb-0">In Transit</h4>
                            <span class="badge bg-light text-dark border">ID: <span id="displayId"></span></span>
                        </div>
                        
                        <p class="text-muted small mb-3"><i class="far fa-clock me-1"></i> Last Updated: <span id="lastUpdate">Just now</span></p>
                        
                        <hr>
                        
                        <div class="row text-center mt-3">
                            <div class="col-6 border-end">
                                <small class="text-muted text-uppercase fw-bold" style="font-size: 0.7rem;">From</small>
                                <h5 class="fw-bold text-dark mt-1" id="fromCity">Yangon</h5>
                            </div>
                            <div class="col-6">
                                <small class="text-muted text-uppercase fw-bold" style="font-size: 0.7rem;">To</small>
                                <h5 class="fw-bold text-dark mt-1" id="toCity">Mandalay</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="text-uppercase">Britium Express</h5>
                    <p class="small text-muted">A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions across Myanmar and beyond.</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Quick Links</h5>
                    <a href="tracking.html">Track Package</a>
                    <a href="services.html">Services</a>
                    <a href="quote.html">Get Quote</a>
                    <a href="login.html">Login</a>
                </div>
                <div class="col-lg-6 mb-4">
                    <h5>Contact Us</h5>
                    <p class="mb-2"><i class="fas fa-phone me-2 text-warning"></i> +95 9 897 4477 44</p>
                    <p class="mb-2"><i class="fas fa-envelope me-2 text-warning"></i> info@britiumexpress.com</p>
                    <p><i class="fas fa-map-marker-alt me-2 text-warning"></i> No. 277, Corner of Anawrahta Road and Bo Moe Gyo St., East Dagon Township, Yangon.</p>
                </div>
            </div>
            <div class="border-top border-secondary pt-3 mt-3 text-center small text-muted">
                &copy; 2026 Britium Ventures Company Limited. All Rights Reserved.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/959897447744" class="float-wa" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script type="module">
        // 1. Import the function from our sync file
        // IMPORTANT: The "./" means the file must be in the SAME FOLDER as this HTML file.
        import { trackShipment } from "./firebase_sync.js";

        // 2. Setup Button Click
        document.getElementById('trackBtn').addEventListener('click', () => {
            const id = document.getElementById('trackInput').value.trim();
            
            if(!id) return alert("Please enter a Tracking ID");

            // 3. Call the Sync Function
            trackShipment(id, (success, data) => {
                if (success) {
                    // UPDATE THE WEBSITE UI WITH APP DATA
                    document.getElementById('resultBox').style.display = 'block';
                    document.getElementById('displayId').innerText = id; // Show the ID
                    
                    document.getElementById('statusHeader').innerText = data.status;
                    document.getElementById('statusHeader').className = "fw-bold mb-0 " + getStatusColor(data.status);
                    
                    document.getElementById('fromCity').innerText = data.from_city;
                    document.getElementById('toCity').innerText = data.to_city;
                    document.getElementById('lastUpdate').innerText = new Date(data.timestamp).toLocaleString();
                } else {
                    alert("Tracking ID not found in the database. Please check the App.");
                }
            });
        });

        // Helper to color-code status
        function getStatusColor(status) {
            if(status === 'Delivered') return 'text-success';
            if(status === 'Pending') return 'text-warning';
            if(status === 'Cancelled') return 'text-danger';
            return 'text-primary';
        }
    </script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Merchant Registration | Britium Express</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root { --brand-blue: #0d2c54; --brand-orange: #ff6b00; }
        body { font-family: 'Roboto', sans-serif; background-color: #f0f2f5; color: #333; }
        .top-bar { background-color: var(--brand-blue); color: white; padding: 10px 0; font-size: 0.9rem; }
        .navbar { background: white; padding: 10px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .navbar-brand img { height: 70px; width: auto; }
        .nav-link { font-weight: 500; color: #444 !important; font-size: 0.9rem; }
        .nav-link:hover { color: var(--brand-orange) !important; }
        .reg-header { background-color: var(--brand-blue); color: white; padding: 60px 0; text-align: center; margin-bottom: -50px; }
        .form-card { background: white; border-radius: 10px; box-shadow: 0 15px 30px rgba(0,0,0,0.1); padding: 40px; position: relative; z-index: 10; }
        .section-title { border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 20px; font-weight: 700; color: var(--brand-blue); }
        .benefit-list { list-style: none; padding: 0; }
        .benefit-list li { margin-bottom: 20px; display: flex; align-items: start; }
        .benefit-icon { min-width: 40px; height: 40px; background-color: #e3f2fd; color: var(--brand-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; }
        footer { background-color: #111; color: #aaa; padding: 60px 0 20px; margin-top: 50px; }
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="assets/images/BRITIUM EXPRESS logo.png" alt="Britium Express Logo">
            </a>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="reg-header">
        <div class="container">
            <h1 class="fw-bold">Join Britium Express</h1>
            <p class="lead opacity-75">Scale your business with our dedicated Merchant Solutions.</p>
        </div>
    </div>

    <section class="py-5">
        <div class="container">
            <div class="row g-5">
                
                <div class="col-lg-8">
                    <div class="form-card">
                        <div id="registrationForm">
                            <h5 class="section-title"><i class="fas fa-store me-2"></i> Shop Information</h5>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Shop / Page Name</label>
                                    <input type="text" class="form-control" id="shopName" placeholder="e.g. Yangon Fashion Store">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Owner Name</label>
                                    <input type="text" class="form-control" id="ownerName" placeholder="Your Full Name">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Primary Phone</label>
                                    <input type="tel" class="form-control" id="phone" placeholder="09xxxxxxxxx">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Email (Optional)</label>
                                    <input type="email" class="form-control" placeholder="shop@email.com">
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-bold">Pickup Address</label>
                                    <textarea class="form-control" rows="2" placeholder="Full address..."></textarea>
                                </div>
                            </div>

                            <h5 class="section-title"><i class="fas fa-wallet me-2"></i> Payment Details</h5>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Payment Method</label>
                                    <select class="form-select">
                                        <option selected>KBZ Pay</option>
                                        <option>Wave Money</option>
                                        <option>CB Bank</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Account Name</label>
                                    <input type="text" class="form-control" placeholder="Name on Account">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label fw-bold">Account Number</label>
                                    <input type="text" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX">
                                </div>
                            </div>

                            <h5 class="section-title"><i class="fas fa-lock me-2"></i> Account Security</h5>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Create Password</label>
                                    <input type="password" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Confirm Password</label>
                                    <input type="password" class="form-control">
                                </div>
                            </div>

                            <div class="form-check mb-4">
                                <input class="form-check-input" type="checkbox" id="terms">
                                <label class="form-check-label small" for="terms">
                                    I agree to the Terms of Service & Privacy Policy.
                                </label>
                            </div>

                            <button type="button" onclick="registerShop()" class="btn btn-warning w-100 py-3 fw-bold text-white fs-5" style="background-color: var(--brand-orange);">REGISTER MY SHOP</button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 mt-5 mt-lg-0">
                    <div class="p-3">
                        <h4 class="fw-bold mb-4" style="color: var(--brand-blue)">Why Partner with Us?</h4>
                        <ul class="benefit-list">
                            <li><div class="benefit-icon"><i class="fas fa-bolt"></i></div> <div><h6 class="fw-bold mb-1">Fast Remittance</h6><p class="text-muted small mb-0">Within 24 hours.</p></div></li>
                            <li><div class="benefit-icon"><i class="fas fa-mobile-alt"></i></div> <div><h6 class="fw-bold mb-1">Mobile Dashboard</h6><p class="text-muted small mb-0">Track everything.</p></div></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <footer>
        <div class="container text-center text-muted small">
            &copy; 2026 Britium Ventures Company Limited.
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
    function registerShop() {
        // 1. Get values
        const shopName = document.getElementById('shopName').value;
        const ownerName = document.getElementById('ownerName').value;
        const phone = document.getElementById('phone').value;
        const terms = document.getElementById('terms').checked;

        // 2. Simple Validation
        if (shopName === "" || ownerName === "" || phone === "") {
            alert("Please fill in all required fields (Shop Name, Owner Name, Phone).");
            return;
        }

        if (!terms) {
            alert("You must agree to the Terms of Service.");
            return;
        }

        // 3. Create User Object
        const newCustomer = {
            name: shopName,
            contact: ownerName,
            phone: phone,
            type: "Online Shop",
            shipments: 0,
            spend: "0 MMK",
            joined: new Date().toLocaleDateString()
        };

        // 4. Save to Storage
        let customers = JSON.parse(localStorage.getItem('britium_customers')) || [];
        customers.push(newCustomer);
        localStorage.setItem('britium_customers', JSON.stringify(customers));
        localStorage.setItem('britium_current_user', JSON.stringify(newCustomer));

        // 5. Success & Redirect
        alert('Registration Successful! Redirecting to Dashboard...');
        window.location.href = 'customer/index.html';
    }
    </script>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support & Guidelines | Britium Express</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --brand-blue: #0d2c54;
            --brand-orange: #ff6b00;
            --light-gray: #f8f9fa;
        }

        body {
            font-family: 'Roboto', sans-serif;
            color: #333;
            background-color: #f9f9f9;
        }

        /* Navbar (Consistent) */
        .top-bar { background-color: var(--brand-blue); color: white; padding: 10px 0; font-size: 0.9rem; }
        .navbar-brand { font-weight: 900; color: var(--brand-blue) !important; text-transform: uppercase; }
        .nav-link { font-weight: 500; color: #444 !important; margin-left: 15px; }
        .nav-link:hover { color: var(--brand-orange) !important; }
        .btn-portal { border: 2px solid var(--brand-blue); color: var(--brand-blue); font-weight: 700; padding: 6px 20px; border-radius: 5px; }

        /* Header */
        .support-header {
            background-color: var(--brand-blue);
            padding: 60px 0;
            color: white;
            text-align: center;
        }

        /* Sidebar Navigation */
        .nav-pills .nav-link {
            color: #555;
            font-weight: 600;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            background: white;
            border: 1px solid #eee;
            text-align: left;
            transition: 0.3s;
        }
        .nav-pills .nav-link:hover {
            background-color: #f0f0f0;
            color: var(--brand-orange);
        }
        .nav-pills .nav-link.active {
            background-color: var(--brand-orange);
            color: white;
            border-color: var(--brand-orange);
        }
        .nav-pills .nav-link i {
            width: 25px;
            text-align: center;
            margin-right: 10px;
        }

        /* Content Cards */
        .content-card {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            height: 100%;
        }
        
        /* Step Icons for Packaging */
        .step-circle {
            width: 40px; height: 40px;
            background-color: var(--brand-blue);
            color: white;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }

        /* Accordion for FAQ */
        .accordion-button:not(.collapsed) {
            color: var(--brand-blue);
            background-color: #eef2f6;
            font-weight: bold;
        }
        .accordion-button:focus {
            box-shadow: none;
            border-color: rgba(0,0,0,.125);
        }

        /* Prohibited List */
        .banned-item {
            border: 1px solid #ffcccc;
            background-color: #fff5f5;
            color: #cc0000;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            font-weight: 600;
        }

        /* Calculator Box */
        .calc-box {
            background-color: #e3f2fd;
            border: 1px dashed var(--brand-blue);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        /* Footer */
        footer { background-color: #111; color: #aaa; padding: 60px 0 20px; }
        footer h5 { color: white; margin-bottom: 20px; }
        footer a { color: #aaa; text-decoration: none; }

        /* Floating WA */
        .float-wa {
            position: fixed; bottom: 25px; right: 25px;
            background-color: #25d366; color: white;
            width: 60px; height: 60px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 32px; box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
            z-index: 1000; text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="top-bar">
        <div class="container d-flex flex-column flex-md-row justify-content-between">
            <div><span class="me-3"><i class="fas fa-phone-alt me-2"></i> +95-9-897447744</span></div>
            <div><span><i class="fas fa-clock me-2"></i> Mon-Sat: 9:00am - 5:30pm</span></div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="fas fa-shipping-fast me-2"></i> Britium <span style="color:var(--brand-orange)">Express</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><a class="nav-link" href="index.html">Track & Trace</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html#rates">Rates</a></li>
                    <li class="nav-item"><a class="nav-link active" href="#">Support</a></li>
                    <li class="nav-item ms-lg-3"><a href="#" class="btn btn-portal">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="support-header">
        <div class="container">
            <h1 class="fw-bold">Information Center</h1>
            <p class="lead opacity-75 mb-0">Guidelines, Policies, and Frequently Asked Questions</p>
        </div>
    </header>

    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 mb-4">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button class="nav-link active" id="v-pills-faq-tab" data-bs-toggle="pill" data-bs-target="#v-pills-faq" type="button">
                            <i class="fas fa-question-circle"></i> FAQ
                        </button>
                        <button class="nav-link" id="v-pills-pack-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pack" type="button">
                            <i class="fas fa-box-open"></i> Packaging Guide
                        </button>
                        <button class="nav-link" id="v-pills-ban-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ban" type="button">
                            <i class="fas fa-ban"></i> Prohibited Items
                        </button>
                        <button class="nav-link" id="v-pills-terms-tab" data-bs-toggle="pill" data-bs-target="#v-pills-terms" type="button">
                            <i class="fas fa-file-contract"></i> Trade Terms (Incoterms)
                        </button>
                    </div>
                </div>

                <div class="col-lg-9">
                    <div class="tab-content" id="v-pills-tabContent">
                        
                        <div class="tab-pane fade show active" id="v-pills-faq">
                            <div class="content-card">
                                <h3 class="fw-bold mb-4">Frequently Asked Questions</h3>
                                <div class="accordion" id="faqAccordion">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                                How do I track my package?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                            <div class="accordion-body">
                                                Simply enter your <strong>Tracking ID (e.g., BE-12345)</strong> on our Homepage or Tracking page. You can track up to 10 numbers at once by separating them with commas.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingTwo">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                                How does Cash on Delivery (COD) work?
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div class="accordion-body">
                                                We collect payment from the receiver upon delivery. The funds are then remitted to the sender's bank account according to our remittance schedule (usually within 24-48 hours after delivery).
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingThree">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                                What are your operating hours?
                                            </button>
                                        </h2>
                                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div class="accordion-body">
                                                Our hubs in Yangon, Mandalay, and Nay Pyi Taw operate <strong>Monday to Saturday, from 9:00 AM to 5:30 PM</strong>. We are closed on Sundays and Public Holidays.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-pack">
                            <div class="content-card">
                                <h3 class="fw-bold mb-4">Packaging Best Practices</h3>
                                <p class="text-muted">Proper packaging ensures your shipment arrives safely. Follow these 3 steps:</p>
                                
                                <div class="d-flex mb-4">
                                    <div class="step-circle">1</div>
                                    <div>
                                        <h5 class="fw-bold">Outer Box</h5>
                                        <p class="mb-0">Use a new, high-quality corrugated carton. For heavy items, wooden crates are recommended to prevent crushing.</p>
                                    </div>
                                </div>

                                <div class="d-flex mb-4">
                                    <div class="step-circle">2</div>
                                    <div>
                                        <h5 class="fw-bold">Cushioning</h5>
                                        <p class="mb-0">Fill all voids with bubble wrap, foam, or air pillows. The item should not move when the box is shaken.</p>
                                    </div>
                                </div>

                                <div class="d-flex mb-4">
                                    <div class="step-circle">3</div>
                                    <div>
                                        <h5 class="fw-bold">Sealing (H-Seal Method)</h5>
                                        <p class="mb-0">Use strong packing tape. Apply tape to the center seam and both edge seams (making an 'H' shape) for maximum security.</p>
                                    </div>
                                </div>

                                <div class="calc-box">
                                    <h5 class="fw-bold text-primary"><i class="fas fa-calculator me-2"></i> Calculating Chargeable Weight</h5>
                                    <p class="small">Airlines charge based on the greater of Actual Weight or Volumetric Weight.</p>
                                    <div class="bg-white p-3 rounded text-center fw-bold border">
                                        (Length x Width x Height in cm) / 6000 = Volumetric Weight (kg)
                                    </div>
                                    <p class="small text-muted mt-2 mb-0"><em>Note: Some express carriers use 5000 as the divisor. Britium Express confirms the correct factor per shipment.</em></p>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-ban">
                            <div class="content-card">
                                <h3 class="fw-bold mb-4 text-danger">Prohibited & Restricted Items</h3>
                                <p class="text-muted mb-4">For safety and legal compliance, the following items are strictly prohibited from air cargo. <strong>Ask us if unsure!</strong></p>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="banned-item"><i class="fas fa-bomb me-3"></i> Explosives & Fireworks</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="banned-item"><i class="fas fa-fire me-3"></i> Flammables (Petrol, Lighter Fluid)</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="banned-item"><i class="fas fa-skull-crossbones me-3"></i> Toxic Substances & Illegal Drugs</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="banned-item"><i class="fas fa-paw me-3"></i> Live Animals (Without Special Permit)</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="banned-item"><i class="fas fa-money-bill-wave me-3"></i> Cash & High-Value Bullion</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="banned-item"><i class="fas fa-battery-full me-3"></i> Lithium Batteries (Loose/Damaged)</div>
                                    </div>
                                </div>
                                <div class="alert alert-warning mt-3">
                                    <i class="fas fa-exclamation-triangle me-2"></i> <strong>Warning:</strong> Hiding dangerous goods is illegal and compromises the safety of everyone in the transport chain.
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-terms">
                            <div class="content-card">
                                <h3 class="fw-bold mb-4">Understanding Trade Terms (Incoterms)</h3>
                                <p class="text-muted">Incoterms® define who is responsible for the shipping costs and risks.</p>
                                
                                <div class="mb-4">
                                    <h5 class="fw-bold text-primary">EXW (Ex Works)</h5>
                                    <p>Seller's responsibility is minimal. The buyer handles all transport and risk starting from the seller's warehouse pick-up.</p>
                                </div>
                                <hr>
                                <div class="mb-4">
                                    <h5 class="fw-bold text-primary">FOB (Free On Board)</h5>
                                    <p>Seller is responsible until the goods are loaded onto the vessel/aircraft. Once on board, the risk transfers to the buyer.</p>
                                </div>
                                <hr>
                                <div>
                                    <h5 class="fw-bold text-primary">CIF (Cost, Insurance & Freight)</h5>
                                    <p>Seller pays for the cost, freight, and insurance to the destination port. However, risk transfers to the buyer once goods are on board the vessel.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="text-uppercase">Britium Express</h5>
                    <p class="small text-muted">A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions.</p>
                </div>
                <div class="col-lg-2 mb-4">
                    <h5>Links</h5>
                    <a href="index.html" class="d-block mb-2">Track Package</a>
                    <a href="services.html" class="d-block mb-2">Services</a>
                    <a href="#" class="d-block mb-2">Support</a>
                </div>
                <div class="col-lg-6 mb-4">
                    <h5>Reach Out</h5>
                    <div class="d-flex mb-2">
                        <i class="fas fa-map-marker-alt me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">Britium Ventures Company Limited, YANGON, Yangon 11451 My.</span>
                    </div>
                    <div class="d-flex mb-2">
                        <i class="fas fa-phone me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">+95-9-897447744, +95-9-897447755</span>
                    </div>
                    <div class="d-flex">
                        <i class="fas fa-envelope me-3 mt-1 text-warning"></i>
                        <span class="small text-muted">info@britiumexpress.com</span>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-3 mt-3 text-center small text-muted">
                &copy; 2026 Britium Ventures Company Limited. All Rights Reserved.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/959897447744" class="float-wa" title="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>