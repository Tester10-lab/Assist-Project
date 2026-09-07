/**
 * KDM Express - Core Platform JavaScript Engine
 * Nepal Courier & Logistics System (kdmexpress.com)
 * Phone / WhatsApp: +977 980-1081469
 */

(function () {
    'use strict';

    // Global KDM Namespace
    window.KDMExpress = {
        config: {
            companyName: 'KDM Express',
            domain: 'kdmexpress.com',
            phone: '+977 980-1081469',
            whatsapp: '9779801081469',
            email: 'info@kdmexpress.com',
            currency: 'NPR',
            demoPrefix: 'KDM-2026-'
        },

        // Mock Shipment Database (API-Ready Structure)
        shipments: {
            'KDM-2026-000123': {
                trackingNumber: 'KDM-2026-000123',
                sender: 'Himalayan Handicrafts Ltd.',
                receiver: 'Rajesh Sharma',
                origin: 'Kathmandu (Durbar Marg Branch)',
                destination: 'Pokhara (Lakeside Branch)',
                shipmentDate: '2026-08-25',
                estimatedDelivery: '2026-08-28',
                currentStageIndex: 4, // Arrived at Branch
                currentStatus: 'Arrived at Branch',
                currentLocation: 'Pokhara Regional Hub',
                serviceType: 'Express Parcel Delivery',
                weight: '2.5 kg',
                timeline: [
                    { stage: 'Order Received', date: '2026-08-25 09:30 AM', location: 'Kathmandu Central Office', details: 'Shipment booking created & barcode generated' },
                    { stage: 'Shipment Picked Up', date: '2026-08-25 02:15 PM', location: 'Durbar Marg, Kathmandu', details: 'Picked up by Rider KDM-R104' },
                    { stage: 'Processing', date: '2026-08-25 06:45 PM', location: 'Kathmandu Sorting Center', details: 'Weighed, scanned & bagged for Pokhara transit' },
                    { stage: 'In Transit', date: '2026-08-26 05:00 AM', location: 'Prithvi Highway Trunk Line', details: 'Departed via express logistics vehicle' },
                    { stage: 'Arrived at Branch', date: '2026-08-27 04:30 PM', location: 'Pokhara Hub', details: 'Received at destination sorting facility' },
                    { stage: 'Out for Delivery', date: 'Pending', location: 'Pokhara Lakeside', details: 'Assigned to local delivery rider' },
                    { stage: 'Delivered', date: 'Pending', location: 'Destination Address', details: 'Recipient signature pending' }
                ]
            },
            'KDM-2026-000456': {
                trackingNumber: 'KDM-2026-000456',
                sender: 'Kathmandu Fashion Hub',
                receiver: 'Sunita Thapa',
                origin: 'Kathmandu (Baneshwor Branch)',
                destination: 'Chitwan (Narayangarh Branch)',
                shipmentDate: '2026-08-27',
                estimatedDelivery: '2026-08-29',
                currentStageIndex: 5, // Out for Delivery
                currentStatus: 'Out for Delivery',
                currentLocation: 'Chitwan Delivery Route',
                serviceType: 'E-commerce COD Delivery',
                weight: '1.2 kg',
                timeline: [
                    { stage: 'Order Received', date: '2026-08-27 10:00 AM', location: 'Kathmandu Baneshwor', details: 'Package registered' },
                    { stage: 'Shipment Picked Up', date: '2026-08-27 11:30 AM', location: 'Merchant Store', details: 'Rider pickup completed' },
                    { stage: 'Processing', date: '2026-08-27 03:00 PM', location: 'Kathmandu Hub', details: 'Sorted for Terai Region' },
                    { stage: 'In Transit', date: '2026-08-27 09:00 PM', location: 'Mugling Highway', details: 'Night dispatch en route' },
                    { stage: 'Arrived at Branch', date: '2026-08-28 06:00 AM', location: 'Chitwan Narayangarh', details: 'Scanned into branch' },
                    { stage: 'Out for Delivery', date: '2026-08-28 08:30 AM', location: 'Narayangarh Ward 4', details: 'Courier rider on the way' },
                    { stage: 'Delivered', date: 'Pending', location: 'Chitwan Address', details: 'COD NPR 2,450 to be collected' }
                ]
            }
        },

        // Configurable Rate Calculation Matrix (NPR)
        rateConfig: {
            basePrice: 120, // Base price in NPR
            weightRatePerKg: 40, // NPR per additional kg above 1kg
            packageMultipliers: {
                'document': 0.85,
                'parcel': 1.0,
                'heavy': 1.35,
                'cod': 1.15
            },
            speedMultipliers: {
                'standard': 1.0,
                'express': 1.45,
                'sameday': 2.1
            },
            locationTiers: {
                'kathmandu-kathmandu': 0,
                'kathmandu-lalitpur': 20,
                'kathmandu-bhaktapur': 20,
                'kathmandu-pokhara': 120,
                'kathmandu-chitwan': 100,
                'kathmandu-butwal': 140,
                'kathmandu-biratnagar': 180,
                'kathmandu-dharan': 190,
                'kathmandu-nepalgunj': 210,
                'kathmandu-dhangadhi': 250,
                'intercity-default': 150
            }
        },

        // Configurable Nepal Branches
        branches: [
            {
                id: 'kdm-hq',
                name: 'Kathmandu Head Office & Central Hub',
                city: 'Kathmandu',
                region: 'Kathmandu Valley',
                address: 'Durbar Marg / New Baneshwor, Kathmandu, Nepal',
                phone: '+977 980-1081469',
                email: 'info@kdmexpress.com',
                hours: 'Sun - Fri: 8:00 AM - 7:00 PM | Sat: 10:00 AM - 4:00 PM',
                mapUrl: 'https://maps.google.com/?q=Kathmandu,Nepal'
            },
            {
                id: 'lalitpur-branch',
                name: 'Lalitpur Branch',
                city: 'Lalitpur',
                region: 'Kathmandu Valley',
                address: 'Patan Dhoka / Jawalakhel, Lalitpur, Nepal',
                phone: '+977 980-1081469',
                email: 'lalitpur@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:30 PM',
                mapUrl: 'https://maps.google.com/?q=Lalitpur,Nepal'
            },
            {
                id: 'bhaktapur-branch',
                name: 'Bhaktapur Hub',
                city: 'Bhaktapur',
                region: 'Kathmandu Valley',
                address: 'Suryabinayak / Kamalbinayak, Bhaktapur, Nepal',
                phone: '+977 980-1081469',
                email: 'bhaktapur@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Bhaktapur,Nepal'
            },
            {
                id: 'pokhara-branch',
                name: 'Pokhara Regional Hub',
                city: 'Pokhara',
                region: 'Western Region',
                address: 'Lakeside / Mahendrapool, Pokhara, Nepal',
                phone: '+977 980-1081469',
                email: 'pokhara@kdmexpress.com',
                hours: 'Sun - Fri: 8:30 AM - 6:30 PM',
                mapUrl: 'https://maps.google.com/?q=Pokhara,Nepal'
            },
            {
                id: 'chitwan-branch',
                name: 'Chitwan Hub',
                city: 'Chitwan',
                region: 'Terai Region',
                address: 'Narayangarh Main Road, Chitwan, Nepal',
                phone: '+977 980-1081469',
                email: 'chitwan@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Chitwan,Nepal'
            },
            {
                id: 'butwal-branch',
                name: 'Butwal Hub',
                city: 'Butwal',
                region: 'Western Region',
                address: 'Traffic Chowk, Butwal, Nepal',
                phone: '+977 980-1081469',
                email: 'butwal@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Butwal,Nepal'
            },
            {
                id: 'biratnagar-branch',
                name: 'Biratnagar Eastern Hub',
                city: 'Biratnagar',
                region: 'Eastern Region',
                address: 'Main Road, Biratnagar, Nepal',
                phone: '+977 980-1081469',
                email: 'biratnagar@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Biratnagar,Nepal'
            },
            {
                id: 'dharan-branch',
                name: 'Dharan Branch',
                city: 'Dharan',
                region: 'Eastern Region',
                address: 'Bhanu Chowk, Dharan, Nepal',
                phone: '+977 980-1081469',
                email: 'dharan@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Dharan,Nepal'
            },
            {
                id: 'nepalgunj-branch',
                name: 'Nepalgunj Hub',
                city: 'Nepalgunj',
                region: 'Terai Region',
                address: 'BP Chowk, Nepalgunj, Nepal',
                phone: '+977 980-1081469',
                email: 'nepalgunj@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Nepalgunj,Nepal'
            },
            {
                id: 'dhangadhi-branch',
                name: 'Dhangadhi Far-Western Hub',
                city: 'Dhangadhi',
                region: 'Far-Western',
                address: 'Choraha, Dhangadhi, Nepal',
                phone: '+977 980-1081469',
                email: 'dhangadhi@kdmexpress.com',
                hours: 'Sun - Fri: 9:00 AM - 6:00 PM',
                mapUrl: 'https://maps.google.com/?q=Dhangadhi,Nepal'
            }
        ],

        // All 7 Official Tracking Stages
        stages: [
            'Order Received',
            'Shipment Picked Up',
            'Processing',
            'In Transit',
            'Arrived at Branch',
            'Out for Delivery',
            'Delivered'
        ],

        /**
         * Initialize all modules on page load
         */
        init: function () {
            this.initMobileNav();
            this.initTrackingWidget();
            this.initTrackingPage();
            this.initCalculator();
            this.initBranchesPage();
            this.initAuthPage();
            this.initDashboard();
            this.initWhatsAppButtons();
            console.log('KDM Express Platform Loaded Successfully.');
        },

        /**
         * Mobile Navigation Drawer Toggle
         */
        initMobileNav: function () {
            var toggleBtn = document.getElementById('kdm-mobile-toggle');
            var navContainer = document.getElementById('site-navigation');
            if (toggleBtn && navContainer) {
                toggleBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    navContainer.classList.toggle('kdm-mobile-open');
                    var icon = toggleBtn.querySelector('i');
                    if (icon) {
                        if (navContainer.classList.contains('kdm-mobile-open')) {
                            icon.className = 'fa fa-times';
                        } else {
                            icon.className = 'fa fa-bars';
                        }
                    }
                });

                // Close menu when clicking any link inside
                navContainer.querySelectorAll('a').forEach(function (link) {
                    link.addEventListener('click', function () {
                        navContainer.classList.remove('kdm-mobile-open');
                        var icon = toggleBtn.querySelector('i');
                        if (icon) icon.className = 'fa fa-bars';
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', function (e) {
                    if (!navContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
                        navContainer.classList.remove('kdm-mobile-open');
                        var icon = toggleBtn.querySelector('i');
                        if (icon) icon.className = 'fa fa-bars';
                    }
                });
            }
        },

        /**
         * 1. Tracking Engine
         */
        getShipmentData: function (trackingNum) {
            var code = (trackingNum || '').trim().toUpperCase();
            if (!code) return null;

            // Direct match in demo DB
            if (this.shipments[code]) {
                return this.shipments[code];
            }

            // Fallback dynamic generator for any entered valid code (e.g. KDM-2026-112233)
            if (code.startsWith('KDM-') || code.startsWith('KDM-') || code.length >= 8) {
                return {
                    trackingNumber: code,
                    sender: 'Nepal Trade Partner',
                    receiver: 'Recipient Customer',
                    origin: 'Kathmandu Central Hub',
                    destination: 'Destination District Hub',
                    shipmentDate: new Date().toISOString().split('T')[0],
                    estimatedDelivery: '1-2 Days (Expected)',
                    currentStageIndex: 3, // In Transit
                    currentStatus: 'In Transit',
                    currentLocation: 'Nepal Regional Highway Route',
                    serviceType: 'Standard Express Courier',
                    weight: '1.5 kg',
                    isDemoGenerated: true,
                    timeline: [
                        { stage: 'Order Received', date: 'Today 09:00 AM', location: 'Kathmandu Hub', details: 'Package registered' },
                        { stage: 'Shipment Picked Up', date: 'Today 11:15 AM', location: 'Kathmandu Valley', details: 'Rider scan completed' },
                        { stage: 'Processing', date: 'Today 02:30 PM', location: 'Central Sorting Center', details: 'Sorted for regional transit' },
                        { stage: 'In Transit', date: 'Today 05:00 PM', location: 'En route to Destination', details: 'Vehicle dispatch confirmed' },
                        { stage: 'Arrived at Branch', date: 'Pending', location: 'Destination Hub', details: 'Awaiting branch arrival scan' },
                        { stage: 'Out for Delivery', date: 'Pending', location: 'Local Delivery Area', details: 'Courier rider assignment' },
                        { stage: 'Delivered', date: 'Pending', location: 'Destination Address', details: 'Final delivery verification' }
                    ]
                };
            }

            return null;
        },

        initTrackingWidget: function () {
            var self = this;
            var forms = document.querySelectorAll('.kdm-tracking-form');
            forms.forEach(function (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    var input = form.querySelector('input[name="tracking_number"]') || form.querySelector('input[type="text"]');
                    if (input && input.value.trim()) {
                        window.location.href = 'track-your-shipment.html?tracking=' + encodeURIComponent(input.value.trim());
                    }
                });
            });
        },

        initTrackingPage: function () {
            var trackingContainer = document.getElementById('kdm-tracking-results-container');
            if (!trackingContainer) return;

            var urlParams = new URLSearchParams(window.location.search);
            var queryTracking = urlParams.get('tracking') || 'KDM-2026-000123';

            var inputField = document.getElementById('tracking-input-field');
            if (inputField) inputField.value = queryTracking;

            this.renderTrackingResults(queryTracking);

            var searchBtn = document.getElementById('tracking-search-btn');
            var searchForm = document.getElementById('tracking-page-form');

            if (searchForm) {
                searchForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    var val = inputField ? inputField.value.trim() : '';
                    if (val) {
                        KDMExpress.renderTrackingResults(val);
                    }
                });
            }
        },

        renderTrackingResults: function (trackingNum) {
            var container = document.getElementById('kdm-tracking-results-container');
            if (!container) return;

            var data = this.getShipmentData(trackingNum);

            if (!data) {
                container.innerHTML = `
                    <div class="kdm-card alert alert-warning text-center" style="padding: 40px; border-radius: 12px; margin-top: 30px; background: #fff3cd; color: #856404; border: 1px solid #ffeeba;">
                        <i class="fa fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 15px; color: #E31837;"></i>
                        <h3 style="font-weight: 700; margin-bottom: 10px;">Tracking Number Not Found</h3>
                        <p style="font-size: 16px;">We could not find shipment records for <strong>"${trackingNum}"</strong>. Please check your consignment receipt and try again.</p>
                        <p style="font-size: 14px; margin-top: 15px; color: #6c757d;">Demo Consignments to try: <a href="?tracking=KDM-2026-000123" style="color: #002B49; font-weight: bold; text-decoration: underline;">KDM-2026-000123</a> or <a href="?tracking=KDM-2026-000456" style="color: #002B49; font-weight: bold; text-decoration: underline;">KDM-2026-000456</a></p>
                    </div>
                `;
                return;
            }

            // Build Stage Timeline UI
            var timelineHtml = '';
            this.stages.forEach(function (stageName, idx) {
                var isCompleted = idx <= data.currentStageIndex;
                var isCurrent = idx === data.currentStageIndex;
                var stageItem = data.timeline[idx] || { date: 'Pending', details: 'Awaiting status update' };

                var statusClass = isCurrent ? 'active-step' : (isCompleted ? 'completed-step' : 'pending-step');
                var icon = isCompleted ? '<i class="fa fa-check"></i>' : (idx + 1);

                timelineHtml += `
                    <div class="kdm-timeline-step ${statusClass}">
                        <div class="kdm-step-badge">${icon}</div>
                        <div class="kdm-step-title">${stageName}</div>
                        <div class="kdm-step-date">${stageItem.date}</div>
                        <div class="kdm-step-details">${stageItem.details}</div>
                    </div>
                `;
            });

            container.innerHTML = `
                <div class="kdm-tracking-card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 30px; margin-top: 30px; border-top: 5px solid #E31837;">
                    
                    ${data.isDemoGenerated ? `
                    <div style="background: #e9ecef; color: #495057; padding: 10px 15px; border-radius: 6px; font-size: 13px; margin-bottom: 25px; border-left: 4px solid #002B49;">
                        <i class="fa fa-info-circle"></i> <strong>Demo Preview Mode:</strong> Displaying simulated status workflow for tracking number <strong>${data.trackingNumber}</strong>. Ready for REST API backend binding.
                    </div>` : ''}

                    <div class="row align-items-center" style="margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                        <div class="col-md-7 col-sm-12">
                            <span style="text-transform: uppercase; font-size: 12px; letter-spacing: 1px; color: #6c757d; font-weight: 700;">Consignment Number</span>
                            <h2 style="margin: 5px 0 0 0; color: #002B49; font-weight: 800; font-size: 28px;">${data.trackingNumber}</h2>
                        </div>
                        <div class="col-md-5 col-sm-12 text-right text-left-mobile" style="margin-top: 10px;">
                            <span class="kdm-badge-status" style="display: inline-block; background: #002B49; color: #ffffff; padding: 8px 18px; border-radius: 20px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">
                                <i class="fa fa-map-marker" style="color: #E31837; margin-right: 6px;"></i> ${data.currentStatus}
                            </span>
                        </div>
                    </div>

                    <!-- Meta Grid -->
                    <div class="row" style="background: #F4F6F9; border-radius: 10px; padding: 20px; margin-bottom: 35px;">
                        <div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
                            <strong style="color: #6c757d; font-size: 12px; text-transform: uppercase; display: block;">Sender</strong>
                            <span style="color: #002B49; font-weight: 700; font-size: 15px;">${data.sender}</span>
                        </div>
                        <div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
                            <strong style="color: #6c757d; font-size: 12px; text-transform: uppercase; display: block;">Receiver</strong>
                            <span style="color: #002B49; font-weight: 700; font-size: 15px;">${data.receiver}</span>
                        </div>
                        <div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
                            <strong style="color: #6c757d; font-size: 12px; text-transform: uppercase; display: block;">Origin & Destination</strong>
                            <span style="color: #002B49; font-weight: 700; font-size: 14px;">${data.origin} &rarr; ${data.destination}</span>
                        </div>
                        <div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
                            <strong style="color: #6c757d; font-size: 12px; text-transform: uppercase; display: block;">Est. Delivery</strong>
                            <span style="color: #E31837; font-weight: 700; font-size: 15px;">${data.estimatedDelivery}</span>
                        </div>
                    </div>

                    <!-- Timeline Progress Bar -->
                    <h4 style="color: #002B49; font-weight: 700; margin-bottom: 25px;"><i class="fa fa-tasks" style="color: #E31837;"></i> Shipment Journey & Milestone Log</h4>
                    <div class="kdm-timeline-wrapper">
                        ${timelineHtml}
                    </div>

                    <!-- Additional Details Footer -->
                    <div class="row" style="margin-top: 35px; border-top: 1px solid #eee; padding-top: 20px; font-size: 14px;">
                        <div class="col-md-6 col-sm-12">
                            <span style="color: #6c757d;">Service: <strong>${data.serviceType}</strong> | Weight: <strong>${data.weight}</strong></span>
                        </div>
                        <div class="col-md-6 col-sm-12 text-right text-left-mobile">
                            <a href="https://wa.me/9779801081469?text=Inquiry%20regarding%20Shipment%20${data.trackingNumber}" target="_blank" class="btn btn-sm" style="background: #25D366; color: #fff; font-weight: 700; border-radius: 6px; padding: 6px 15px;">
                                <i class="fa fa-whatsapp"></i> Support for this Shipment
                            </a>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * 2. Shipping Rate / Price Calculator (NPR)
         */
        initCalculator: function () {
            var calcForm = document.getElementById('kdm-rate-calculator-form');
            if (!calcForm) return;

            var self = this;
            calcForm.addEventListener('submit', function (e) {
                e.preventDefault();
                self.calculateShippingRate();
            });

            // Live auto-calculation on input changes
            calcForm.querySelectorAll('select, input').forEach(function (el) {
                el.addEventListener('change', function () {
                    self.calculateShippingRate();
                });
            });

            // Run initial calculate
            this.calculateShippingRate();
        },

        calculateShippingRate: function () {
            var resultContainer = document.getElementById('calculator-result-display');
            if (!resultContainer) return;

            var pickup = document.getElementById('calc-pickup') ? document.getElementById('calc-pickup').value : 'kathmandu';
            var destination = document.getElementById('calc-destination') ? document.getElementById('calc-destination').value : 'pokhara';
            var pkgType = document.getElementById('calc-package-type') ? document.getElementById('calc-package-type').value : 'parcel';
            var weight = parseFloat(document.getElementById('calc-weight') ? document.getElementById('calc-weight').value : 1.0) || 1.0;
            var speed = document.getElementById('calc-speed') ? document.getElementById('calc-speed').value : 'standard';

            // Calculation logic
            var base = this.rateConfig.basePrice;
            var pkgMult = this.rateConfig.packageMultipliers[pkgType] || 1.0;
            var speedMult = this.rateConfig.speedMultipliers[speed] || 1.0;

            // Location tier
            var locKey = pickup + '-' + destination;
            var revLocKey = destination + '-' + pickup;
            var locExtra = 0;

            if (pickup === destination) {
                locExtra = 0; // Same city
            } else if (this.rateConfig.locationTiers[locKey] !== undefined) {
                locExtra = this.rateConfig.locationTiers[locKey];
            } else if (this.rateConfig.locationTiers[revLocKey] !== undefined) {
                locExtra = this.rateConfig.locationTiers[revLocKey];
            } else {
                locExtra = this.rateConfig.locationTiers['intercity-default'];
            }

            // Weight calculation: first 1kg included, then per kg
            var extraWeight = Math.max(0, weight - 1.0);
            var weightCost = extraWeight * this.rateConfig.weightRatePerKg;

            // Total NPR Calculation
            var subtotal = (base + locExtra + weightCost) * pkgMult * speedMult;
            var totalNpr = Math.round(subtotal);

            resultContainer.innerHTML = `
                <div style="background: #002B49; color: #ffffff; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 8px 25px rgba(0,43,73,0.15); border-bottom: 5px solid #E31837;">
                    <span style="text-transform: uppercase; font-size: 12px; letter-spacing: 1px; color: rgba(255,255,255,0.7); display: block; margin-bottom: 5px;">Estimated Shipping Rate</span>
                    <h2 style="font-size: 38px; font-weight: 900; margin: 0; color: #ffffff; font-family: sans-serif;">NPR ${totalNpr.toLocaleString()}</h2>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 8px; margin-bottom: 15px;">* Configurable sample estimate including applicable Nepal taxes</p>
                    <div style="font-size: 13px; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px; text-align: left;">
                        <div>&bull; Weight: <strong>${weight} kg</strong> | Type: <strong>${pkgType.toUpperCase()}</strong></div>
                        <div>&bull; Route: <strong>${pickup.toUpperCase()} &rarr; ${destination.toUpperCase()}</strong></div>
                        <div>&bull; Delivery Speed: <strong>${speed.toUpperCase()}</strong></div>
                    </div>
                    <a href="login.html" class="btn btn-block" style="background: #E31837; color: #ffffff; font-weight: 700; margin-top: 15px; padding: 12px; border-radius: 6px; border: none; text-transform: uppercase;">
                        Book Shipment Now
                    </a>
                </div>
            `;
        },

        /**
         * 3. Branches Directory & Search Filter
         */
        initBranchesPage: function () {
            var branchContainer = document.getElementById('kdm-branches-grid');
            if (!branchContainer) return;

            this.renderBranches(this.branches);

            var searchInput = document.getElementById('branch-search-input');
            var filterBtns = document.querySelectorAll('.branch-filter-btn');

            var self = this;

            if (searchInput) {
                searchInput.addEventListener('input', function () {
                    self.filterBranchList();
                });
            }

            filterBtns.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    filterBtns.forEach(function (b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    self.filterBranchList();
                });
            });
        },

        filterBranchList: function () {
            var searchVal = (document.getElementById('branch-search-input') ? document.getElementById('branch-search-input').value : '').toLowerCase();
            var activeFilterBtn = document.querySelector('.branch-filter-btn.active');
            var category = activeFilterBtn ? activeFilterBtn.getAttribute('data-region') : 'all';

            var filtered = this.branches.filter(function (b) {
                var matchesSearch = b.name.toLowerCase().includes(searchVal) ||
                    b.city.toLowerCase().includes(searchVal) ||
                    b.address.toLowerCase().includes(searchVal);
                var matchesCategory = (category === 'all' || b.region.toLowerCase() === category.toLowerCase());
                return matchesSearch && matchesCategory;
            });

            this.renderBranches(filtered);
        },

        renderBranches: function (branchList) {
            var container = document.getElementById('kdm-branches-grid');
            if (!container) return;

            if (branchList.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center" style="padding: 40px;">
                        <p style="font-size: 18px; color: #6c757d;">No KDM Express branches found matching your filter criteria.</p>
                    </div>
                `;
                return;
            }

            var html = '';
            branchList.forEach(function (b) {
                html += `
                    <div class="col-md-6 col-sm-12" style="margin-bottom: 30px;">
                        <div class="kdm-branch-card" style="background: #ffffff; border-radius: 10px; border: 1px solid #e9ecef; box-shadow: 0 5px 15px rgba(0,0,0,0.05); padding: 25px; height: 100%; transition: all 0.3s ease; border-left: 4px solid #002B49;">
                            <div style="display: flex; justify-space-between; align-items: flex-start; margin-bottom: 15px;">
                                <div>
                                    <span style="background: #F4F6F9; color: #E31837; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">${b.region}</span>
                                    <h3 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 700; color: #002B49;">${b.name}</h3>
                                </div>
                            </div>
                            
                            <ul style="list-style: none; padding: 0; margin: 0 0 20px 0; font-size: 14px; color: #495057;">
                                <li style="margin-bottom: 8px;"><i class="fa fa-map-marker" style="color: #E31837; width: 20px;"></i> ${b.address}</li>
                                <li style="margin-bottom: 8px;"><i class="fa fa-phone" style="color: #E31837; width: 20px;"></i> ${b.phone}</li>
                                <li style="margin-bottom: 8px;"><i class="fa fa-envelope" style="color: #E31837; width: 20px;"></i> ${b.email}</li>
                                <li style="margin-bottom: 8px;"><i class="fa fa-clock-o" style="color: #E31837; width: 20px;"></i> ${b.hours}</li>
                            </ul>

                            <div style="display: flex; gap: 10px;">
                                <a href="${b.mapUrl}" target="_blank" class="btn btn-sm" style="background: #002B49; color: #fff; font-weight: 600; border-radius: 6px; padding: 8px 15px; font-size: 13px;">
                                    <i class="fa fa-map"></i> View Map & Directions
                                </a>
                                <a href="https://wa.me/${KDMExpress.config.whatsapp}?text=Inquiry%20for%20${encodeURIComponent(b.name)}" target="_blank" class="btn btn-sm" style="background: #25D366; color: #fff; font-weight: 600; border-radius: 6px; padding: 8px 15px; font-size: 13px;">
                                    <i class="fa fa-whatsapp"></i> Contact Branch
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        },

        /**
         * 4. Login & Registration System
         */
        initAuthPage: function () {
            var authWrapper = document.getElementById('kdm-auth-container');
            if (!authWrapper) return;

            var loginTab = document.getElementById('tab-login-btn');
            var registerTab = document.getElementById('tab-register-btn');
            var loginForm = document.getElementById('kdm-login-form');
            var registerForm = document.getElementById('kdm-register-form');

            if (loginTab && registerTab) {
                loginTab.addEventListener('click', function () {
                    loginTab.classList.add('active');
                    registerTab.classList.remove('active');
                    loginForm.style.display = 'block';
                    registerForm.style.display = 'none';
                });

                registerTab.addEventListener('click', function () {
                    registerTab.classList.add('active');
                    loginTab.classList.remove('active');
                    registerForm.style.display = 'block';
                    loginForm.style.display = 'none';
                });
            }

            // Demo submission handlers (frontend presentation ready for REST API backend integration)
            if (loginForm) {
                loginForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    var role = document.getElementById('login-role') ? document.getElementById('login-role').value : 'Customer';
                    alert('KDM Express Portal Demo:\nLogging in as [' + role + ']. Redirecting to Dashboard...');
                    window.location.href = 'dashboard.html';
                });
            }

            if (registerForm) {
                registerForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    alert('KDM Express Registration Demo:\nAccount created successfully! Redirecting to Dashboard...');
                    window.location.href = 'dashboard.html';
                });
            }
        },

        /**
         * 5. Customer Dashboard
         */
        initDashboard: function () {
            var navItems = document.querySelectorAll('.dashboard-nav-item');
            var sections = document.querySelectorAll('.dashboard-tab-section');

            if (navItems.length > 0 && sections.length > 0) {
                navItems.forEach(function (item) {
                    item.addEventListener('click', function (e) {
                        e.preventDefault();
                        var target = item.getAttribute('data-target');

                        navItems.forEach(function (i) { i.classList.remove('active'); });
                        sections.forEach(function (s) { s.style.display = 'none'; });

                        item.classList.add('active');
                        var activeSection = document.getElementById(target);
                        if (activeSection) activeSection.style.display = 'block';
                    });
                });
            }
        },

        /**
         * 6. Floating & Inline WhatsApp Buttons
         */
        initWhatsAppButtons: function () {
            var whatsappNum = this.config.whatsapp;
            var waLinks = document.querySelectorAll('a[href*="whatsapp"]');

            waLinks.forEach(function (link) {
                if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
                    link.setAttribute('href', 'https://wa.me/' + whatsappNum + '?text=Hello%20KDM%20Express%2C%20I%20have%20an%20inquiry.');
                    link.setAttribute('target', '_blank');
                }
            });
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        KDMExpress.init();
    });
})();
