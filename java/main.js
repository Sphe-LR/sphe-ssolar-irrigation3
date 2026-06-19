// ============================================
// PART 3: COMPLETE JAVASCRIPT (WORKING)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ JavaScript Loaded!');
    
    // ============================================
    // 1. LIGHTBOX GALLERY - FIXED
    // ============================================
    function initLightbox() {
        var galleryImages = document.querySelectorAll('.gallery-img');
        console.log('Gallery images found:', galleryImages.length);
        
        if (galleryImages.length === 0) {
            console.log('No gallery images found!');
            return;
        }
        
        // Check if lightbox already exists
        var existingLightbox = document.querySelector('.lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }
        
        // Create lightbox
        var lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="close">&times;</span>
            <img src="" alt="Lightbox image">
        `;
        document.body.appendChild(lightbox);
        console.log('✅ Lightbox created');
        
        var lightboxImg = lightbox.querySelector('img');
        var closeBtn = lightbox.querySelector('.close');
        
        // Add click event to each gallery image
        galleryImages.forEach(function(img, index) {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('✅ Image clicked:', index);
                lightbox.classList.add('active');
                lightboxImg.src = this.src;
                document.body.style.overflow = 'hidden';
            });
            console.log('✅ Click event added to image', index);
        });
        
        // Close button
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Click outside image to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        console.log('✅ Lightbox initialized!');
    }
    initLightbox();
    
    // ============================================
    // 2. ACCORDION
    // ============================================
    function initAccordion() {
        var accordionHeaders = document.querySelectorAll('.accordion-header');
        if (accordionHeaders.length === 0) return;
        
        accordionHeaders.forEach(function(header) {
            header.addEventListener('click', function() {
                var content = this.nextElementSibling;
                var isActive = content.classList.contains('active');
                
                document.querySelectorAll('.accordion-content').forEach(function(item) {
                    item.classList.remove('active');
                    if (item.previousElementSibling) {
                        item.previousElementSibling.classList.remove('active');
                    }
                });
                
                if (!isActive) {
                    content.classList.add('active');
                    this.classList.add('active');
                }
            });
        });
    }
    initAccordion();
    
    // ============================================
    // 3. MODAL POPUP
    // ============================================
    function initModal() {
        var modalTriggers = document.querySelectorAll('[data-modal-trigger]');
        if (modalTriggers.length === 0) return;
        
        var modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3 style="color:#1b4d2e;">⚡ Quick Quote</h3>
                <p style="color:#3d4a4f;">Get a free consultation today!</p>
                <p style="color:#1b4d2e; font-weight:600;">📞 Call: 082 456 7890</p>
                <br>
                <a href="enquiry.html" class="btn-primary" style="display:inline-block;">Get Quote →</a>
            </div>
        `;
        document.body.appendChild(modal);
        
        var closeModal = modal.querySelector('.modal-close');
        
        modalTriggers.forEach(function(trigger) {
            trigger.addEventListener('click', function() {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    initModal();
    
    // ============================================
    // 4. SEARCH & FILTER
    // ============================================
    function initSearchFilter() {
        var searchInput = document.getElementById('service-search');
        var filterSelect = document.getElementById('service-filter');
        var serviceCards = document.querySelectorAll('.service-card');
        
        if (!searchInput && !filterSelect) return;
        
        function filterServices() {
            var searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            var filterValue = filterSelect ? filterSelect.value : 'all';
            
            serviceCards.forEach(function(card) {
                var title = card.querySelector('h3') ? card.querySelector('h3').innerText.toLowerCase() : '';
                var description = card.innerText.toLowerCase();
                var matchesSearch = title.indexOf(searchTerm) !== -1 || description.indexOf(searchTerm) !== -1;
                
                var matchesFilter = true;
                if (filterValue !== 'all') {
                    matchesFilter = title.indexOf(filterValue) !== -1 || description.indexOf(filterValue) !== -1;
                }
                
                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        if (searchInput) searchInput.addEventListener('keyup', filterServices);
        if (filterSelect) filterSelect.addEventListener('change', filterServices);
    }
    initSearchFilter();
    
    // ============================================
    // 5. ENQUIRY FORM - COST CALCULATION
    // ============================================
    var enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('fullName') ? document.getElementById('fullName').value.trim() : '';
            var email = document.getElementById('emailAddr') ? document.getElementById('emailAddr').value.trim() : '';
            var phone = document.getElementById('phoneNum') ? document.getElementById('phoneNum').value.trim() : '';
            var serviceType = document.getElementById('serviceType') ? document.getElementById('serviceType').value : '';
            var systemSize = document.getElementById('systemSize') ? document.getElementById('systemSize').value : '';
            var message = document.getElementById('messageDetails') ? document.getElementById('messageDetails').value.trim() : '';
            
            var errors = [];
            if (!name) errors.push('Full name is required');
            if (!email) errors.push('Email is required');
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
            if (!serviceType) errors.push('Please select a service');
            if (!systemSize || isNaN(systemSize) || parseFloat(systemSize) <= 0) errors.push('Please enter a valid system size');
            
            var feedbackDiv = document.getElementById('formFeedback');
            
            if (errors.length > 0) {
                feedbackDiv.innerHTML = '<div style="color:#d32f2f; background:#ffebee; padding:1rem; border-radius:1rem; border-left:4px solid #d32f2f;">❌ ' + errors.join('<br>') + '</div>';
                feedbackDiv.scrollIntoView({ behavior: 'smooth' });
                return;
            }
            
            var baseCost = 0;
            var serviceName = '';
            var pricePerUnit = 0;
            
            switch(serviceType) {
                case 'solar-home': 
                    baseCost = parseFloat(systemSize) * 25000; 
                    serviceName = 'Solar Home System';
                    pricePerUnit = 25000;
                    break;
                case 'solar-farm': 
                    baseCost = parseFloat(systemSize) * 35000; 
                    serviceName = 'Solar Farm System';
                    pricePerUnit = 35000;
                    break;
                case 'irrigation': 
                    baseCost = parseFloat(systemSize) * 18000; 
                    serviceName = 'Irrigation System';
                    pricePerUnit = 18000;
                    break;
                case 'battery': 
                    baseCost = parseFloat(systemSize) * 15000; 
                    serviceName = 'Battery Storage';
                    pricePerUnit = 15000;
                    break;
                default: 
                    baseCost = parseFloat(systemSize) * 20000;
                    serviceName = 'Custom Solution';
                    pricePerUnit = 20000;
            }
            
            var totalCost = baseCost.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            
            feedbackDiv.innerHTML = `
                <div class="result-card" style="background: linear-gradient(135deg, #e8f5e9, #c8e6c9); padding:1.5rem; border-radius:1rem; border-left:5px solid #1b4d2e; animation: fadeInUp 0.5s ease-out;">
                    <div style="font-size:2rem; margin-bottom:0.5rem;">✅</div>
                    <h4 style="color:#1b4d2e;">Thank you ` + name + `!</h4>
                    <p style="font-size:1.1rem; margin:0.5rem 0;"><strong>Service:</strong> ` + serviceName + `</p>
                    <p style="font-size:1.1rem; margin:0.5rem 0;"><strong>System Size:</strong> ` + systemSize + ` kW</p>
                    <p style="font-size:1.1rem; margin:0.5rem 0;"><strong>Price per unit:</strong> R ` + pricePerUnit.toLocaleString() + `</p>
                    <hr style="margin:0.8rem 0; border-color:#a5d6a7;">
                    <p style="font-size:1.8rem; font-weight:700; color:#1b4d2e;"><strong>Estimated Cost: R ` + totalCost + `</strong></p>
                    <p style="font-size:0.9rem; color:#2e7d32;"><small>📞 A specialist will contact you within 24 hours</small></p>
                </div>
            `;
            feedbackDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // ============================================
    // 6. CONTACT FORM - EMAIL SIMULATION
    // ============================================
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('contactName') ? document.getElementById('contactName').value.trim() : '';
            var email = document.getElementById('contactEmail') ? document.getElementById('contactEmail').value.trim() : '';
            var subject = document.getElementById('contactSubject') ? document.getElementById('contactSubject').value : '';
            var message = document.getElementById('contactMessage') ? document.getElementById('contactMessage').value.trim() : '';
            
            var errors = [];
            if (!name) errors.push('Name is required');
            if (!email) errors.push('Email is required');
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email required');
            if (!message) errors.push('Message is required');
            
            var feedbackDiv = document.getElementById('contactFeedback');
            
            if (errors.length > 0) {
                feedbackDiv.innerHTML = '<div style="color:#d32f2f; background:#ffebee; padding:1rem; border-radius:1rem; border-left:4px solid #d32f2f;">❌ ' + errors.join('<br>') + '</div>';
                return;
            }
            
            var mailtoLink = 'mailto:info@sphessolar.co.za?subject=' + encodeURIComponent(subject || 'General Enquiry') + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
            
            feedbackDiv.innerHTML = `
                <div class="result-card" style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding:1.5rem; border-radius:1rem; border-left:5px solid #1b4d2e; animation: fadeInUp 0.5s ease-out;">
                    <div style="font-size:2rem; margin-bottom:0.5rem;">📧</div>
                    <h4 style="color:#1b4d2e;">Thank you ` + name + `!</h4>
                    <p>Your message has been prepared.</p>
                    <br>
                    <a href="` + mailtoLink + `" class="btn-primary" style="display:inline-block; background:linear-gradient(135deg, #1b4d2e, #0f3a21);">✉️ Send Email Now</a>
                    <p style="margin-top:0.8rem; font-size:0.9rem; color:#555;"><small>Or we will respond within 48 hours.</small></p>
                </div>
            `;
        });
    }
    
    // ============================================
    // 7. DYNAMIC TESTIMONIALS
    // ============================================
    function loadTestimonials() {
        var testimonialsContainer = document.getElementById('testimonials-container');
        if (!testimonialsContainer) return;
        
        var testimonials = [
            { 
                name: 'John Dlamini', 
                text: 'Sphe\'s installed our farm solar system. Saved 60% on electricity!', 
                rating: 5,
                location: 'Mpumalanga'
            },
            { 
                name: 'Mary Nkosi', 
                text: 'Reliable service and excellent after-sales support.', 
                rating: 4,
                location: 'Limpopo'
            },
            { 
                name: 'Peter Mkhize', 
                text: 'The irrigation system transformed our vegetable farm.', 
                rating: 5,
                location: 'Gauteng'
            }
        ];
        
        var html = '';
        testimonials.forEach(function(t) {
            var stars = '';
            for (var i = 0; i < t.rating; i++) {
                stars += '⭐';
            }
            html += `
                <div class="service-card" style="text-align:center; animation: fadeInUp 0.6s ease-out;">
                    <div style="color:#f9c74f; font-size:1.8rem; margin-bottom:0.5rem;">` + stars + `</div>
                    <p style="font-size:1.05rem; font-style:italic; color:#1e2a2f;">"` + t.text + `"</p>
                    <strong style="color:#1b4d2e;">- ` + t.name + `</strong>
                    <p style="font-size:0.85rem; color:#888; margin-top:0.3rem;">📍 ` + t.location + `</p>
                </div>
            `;
        });
        testimonialsContainer.innerHTML = html;
    }
    loadTestimonials();
    
    // ============================================
    // 8. SCROLL TO TOP BUTTON
    // ============================================
    function initScrollTop() {
        var scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '↑';
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    initScrollTop();
    
    // ============================================
    // 9. NEWSLETTER SUBSCRIPTION
    // ============================================
    var newsletterBtn = document.querySelector('.newsletter-form button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var input = this.previousElementSibling;
            if (input && input.value.trim()) {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                    alert('✅ Thank you for subscribing to our newsletter!');
                    input.value = '';
                } else {
                    alert('⚠️ Please enter a valid email address.');
                }
            } else {
                alert('⚠️ Please enter your email address.');
            }
        });
    }
    
    console.log('✅ All features loaded successfully!');
});