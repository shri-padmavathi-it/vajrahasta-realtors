// Load navbar
    fetch("../components/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        if (typeof initNavbar === "function") initNavbar();
      });


    // Get query parameters
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id = parseInt(params.get("id"), 10);

    // Get the correct project
    let project;
    if (type === "apartment") {
      project = apartmentProjects[id];
    } else if (type === "layout") {
      project = layoutProjects[id];
    } else if (type === "farmland") {
      project = formlandProjects[id];
    }

    // Change background based on type
    const bgDiv = document.getElementById("body-bg-blur");
    if (type === "apartment") {
      bgDiv.style.background = "url('/Assests/Gemini_Generated_Image_txmu73txmu73txmu-removebg-preview.png') center center/cover no-repeat";
    } else if (type === "layout") {
      bgDiv.style.background = "url('/Assests/layout images/IMG-20251016-WA0020.jpg') center center/cover no-repeat";
    }
    else if (type === "farmland") {
      bgDiv.style.background = "url('/Assests/formland_Project_bg.jpg') center center/cover no-repeat";
    }

    // Render project if found
    if (project) {
      // Set basic info
      document.getElementById('project-title').textContent = project.title;
      document.getElementById('project-location').textContent = project.location;
      document.getElementById('project-desc').textContent = project.desc;
      document.getElementById('project-details').textContent = project.details;

      // Set status badge
      const statusBadge = document.getElementById('status-badge');
      statusBadge.textContent = project.status;
      statusBadge.className = `status-badge status-${project.status}`;

      // Build quick info
      const quickInfo = document.getElementById('quick-info');
      const infoItems = [];
      
      if (project.Units) infoItems.push({ label: 'Units', value: project.Units });
      if (project.Plots) infoItems.push({ label: 'Plots', value: project.Plots });
      if (project.floors) infoItems.push({ label: 'Floors', value: project.floors });
      if (project.plotSize) infoItems.push({ label: 'Plot Size', value: project.plotSize });
      if (project.totalLand) infoItems.push({ label: 'Total Land', value: project.totalLand });
      if(project.quickInfo) {
        project.quickInfo.forEach(info => {
          infoItems.push({ label: "", value: info });
        });
      }

      infoItems.forEach(item => {
        quickInfo.innerHTML += `
          <div class="info-card">
            <div class="info-label">${item.label}</div>
            <div class="info-value">${item.value}</div>
          </div>
        `;
      });

      // Amenity icons mapping
      const amenityIcons = {
        'Gated Community': '🏘️',
        'Swimming Pool': '🏊',
        'Swimming pool': '🏊',
        'Children Park': '🎡',
        '24hrs Security': '🔒',
        'Electricity': '⚡',
        'Street Lights': '💡',
        'Landscaped Parks': '🌳',
        'Landscaped Gardens': '🌳',
        'Gym': '💪',
        'Water lines': '💧',
        'Sewage Treatment Plant': '♻️',
        'Black Top Roads': '🛣️',
        'Overhead Water Tank': '🚰',
        'Over Head Water Tank': '🚰',
        'Garden Area': '🌺',
        'Compound Wall': '🧱',
        'Compond Wall': '🧱',
        'Play Area': '⚽',
        'Walking Area': '🚶',
        'Visitors Parking': '🅿️',
        'Rainwater Harvesting': '🌧️',
        'Box Drains': '🔧',
        'Kaveri Water Supply': '💦',
        'Nature Walkways': '🌿',
        'Senior Leisure Park': '🌳',
        'Jogging & Fitness Trail': '🏃',
        'Relaxation Zones': '🧘',
        '6 Private cottage for overnight stay': '🏡'
      };

      // Build amenities
      const amenitiesGrid = document.getElementById('amenities-grid');
      project.amenities.forEach(amenity => {
        const icon = amenityIcons[amenity] || '✓';
        amenitiesGrid.innerHTML += `
          <div class="amenity-item">
            <div class="amenity-icon">${icon}</div>
            <div class="amenity-text">${amenity}</div>
          </div>
        `;
      });

      // Slideshow functionality
      const slideshow = document.getElementById('slideshow');
      const indicatorsContainer = document.getElementById('indicators');
      let currentSlide = 0;

      // Create slides and indicators
      project.images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = `slide-img ${index === 0 ? 'active' : ''}`;
        img.alt = `${project.title} - Image ${index + 1}`;
        slideshow.insertBefore(img, slideshow.firstChild);

        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
      });

      const slides = document.querySelectorAll('.slide-img');
      const indicators = document.querySelectorAll('.indicator');

      function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
      }

      function goToSlide(n) {
        showSlide(n);
      }

      document.getElementById('prev-btn').onclick = () => showSlide(currentSlide - 1);
      document.getElementById('next-btn').onclick = () => showSlide(currentSlide + 1);

      // Auto-advance slides
      setInterval(() => showSlide(currentSlide + 1), 5000);

      // Contact button with pre-filled subject
      const contactBtn = document.getElementById('contact-btn');
      contactBtn.href = `/index.html#contact`;
      contactBtn.onclick = (e) => {
        // Store the project title in sessionStorage
        sessionStorage.setItem('contactSubject', `Inquiry about ${project.title}`);
      };
    } else {
      document.querySelector('.container').innerHTML = '<div class="main-content"><p>Project not found.</p></div>';
    }