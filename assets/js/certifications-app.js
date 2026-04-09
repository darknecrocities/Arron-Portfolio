/**
 * Certifications Application Logic
 * Handles rendering, filtering, searching, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    const certGrid = document.querySelector('[data-cert-grid]');
    const searchInput = document.querySelector('[data-cert-search]');
    const filterBtns = document.querySelectorAll('[data-filter-btn]');
    const statsContainer = document.querySelector('[data-cert-stats]');
    const totalCountEl = document.querySelector('[data-total-certs]');
    const aiCountEl = document.querySelector('[data-ai-certs]');
    const cloudCountEl = document.querySelector('[data-cloud-certs]');

    let currentFilter = 'all';
    let searchQuery = '';
    let certData = window.CERTIFICATIONS_DATA || [];

    // --- Core Functions ---

    const renderCerts = () => {
        // Clear grid
        certGrid.innerHTML = '';

        // Filter data
        const filteredData = certData.filter(item => {
            const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 item.issuer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        if (filteredData.length === 0) {
            certGrid.innerHTML = `<p class="no-results">No certifications found matching your criteria.</p>`;
            return;
        }

        // Create cards
        filteredData.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'cert-card';
            card.style.transitionDelay = `${index * 50}ms`;
            
            card.innerHTML = `
                <div class="cert-header">
                    <div class="cert-icon-box" style="background: ${cert.color}22; color: ${cert.color}">
                        <ion-icon name="${cert.icon}"></ion-icon>
                    </div>
                    <span class="cert-category-tag">${cert.category}</span>
                </div>
                <div class="cert-content">
                    <h4 class="cert-title">${cert.title}</h4>
                    <div class="cert-issuer-group">
                        <span class="cert-issuer">${cert.issuer}</span>
                        <span class="cert-date">${cert.date}</span>
                    </div>
                </div>
                ${cert.id ? `<div class="cert-id" style="font-size: 10px; color: var(--light-gray-70); margin-top: 5px;">ID: ${cert.id}</div>` : ''}
                <button class="cert-btn">View Details</button>
            `;

            card.addEventListener('click', () => openCertModal(cert));
            certGrid.appendChild(card);
            
            // Trigger animation
            setTimeout(() => card.classList.add('reveal'), 10);
        });
    };

    const updateStats = () => {
        const total = certData.length;
        const aiCerts = certData.filter(c => c.category === "AI / Machine Learning").length;
        const cloudCerts = certData.filter(c => c.category === "Cloud / DevOps").length;

        animateCounter(totalCountEl, total);
        animateCounter(aiCountEl, aiCerts);
        animateCounter(cloudCountEl, cloudCerts);
    };

    const animateCounter = (el, target) => {
        let count = 0;
        const speed = 2000 / target; // 2 seconds total

        const update = () => {
            if (count < target) {
                count++;
                el.innerText = count;
                setTimeout(update, speed);
            } else {
                el.innerText = target;
            }
        };
        update();
    };

    // --- Search & Filter Handlers ---

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCerts();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter-btn');
            renderCerts();
        });
    });

    // --- Modal Logic ---

    const openCertModal = (cert) => {
        const modal = document.querySelector('[data-cert-modal]');
        const overlay = document.querySelector('[data-modal-overlay]');
        
        document.querySelector('[data-modal-title]').innerText = cert.title;
        document.querySelector('[data-modal-issuer]').innerText = cert.issuer;
        document.querySelector('[data-modal-date]').innerText = cert.date;
        document.querySelector('[data-modal-category]').innerText = cert.category;
        
        const descriptionEl = document.querySelector('[data-modal-description]');
        if (cert.description) {
            descriptionEl.innerText = cert.description;
        } else {
            descriptionEl.innerText = "Detailed learning outcomes and skills acquired during this certification process.";
        }
        
        const idContainer = document.querySelector('[data-modal-id]');
        if (cert.id && cert.id !== "N/A") {
            idContainer.innerHTML = `<strong>Credential ID:</strong> <span style="color: var(--white-2);">${cert.id}</span>`;
            idContainer.style.display = 'block';
        } else {
            idContainer.style.display = 'none';
        }

        modal.classList.add('active');
        overlay.classList.add('active');
    };

    const closeCertModal = () => {
        const modal = document.querySelector('[data-cert-modal]');
        const overlay = document.querySelector('[data-modal-overlay]');
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    document.querySelector('[data-modal-close]')?.addEventListener('click', closeCertModal);
    document.querySelector('[data-modal-overlay]')?.addEventListener('click', closeCertModal);

    // Initial Load
    updateStats();
    renderCerts();

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    // Initial cards reveal
    document.querySelectorAll('.cert-card').forEach(card => observer.observe(card));
});
