// Load navbar
    fetch("../components/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        if (typeof initNavbar === "function") initNavbar();
      });
    

    // Initialize
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const urlStatus = params.get('status');

    let allProjects = [];
    let currentFilter = urlStatus || 'all';

    // Set background based on type
    const bgElement = document.querySelector('.body-bg-blur');
    if (type === "apartment") {
      allProjects = apartmentProjects.map((p, i) => ({ ...p, type: 'apartment', id: i }));
      document.getElementById('page-title').textContent = 'Apartment Projects';
      bgElement.style.backgroundImage = "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200')";
    } else if (type === "layout") {
      allProjects = layoutProjects.map((p, i) => ({ ...p, type: 'layout', id: i }));
      document.getElementById('page-title').textContent = 'Layout Projects';
      bgElement.style.backgroundImage = "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200')";
    } else {
      allProjects = [
        ...apartmentProjects.map((p, i) => ({ ...p, type: 'apartment', id: i })),
        ...layoutProjects.map((p, i) => ({ ...p, type: 'layout', id: i }))
      ];
      bgElement.style.backgroundImage = "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200')";
    }

    // Render projects
    function renderProjects(filter = 'all') {
      const grid = document.getElementById('projects-grid');
      
      let filtered = allProjects;
      if (filter !== 'all') {
        filtered = allProjects.filter(p => 
          p.status.toLowerCase().replace(/\s+/g, '-') === filter.toLowerCase()
        );
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <p class="empty-state-text">No projects found for this filter</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(project => `
        <a href="project.html?type=${project.type || type}&id=${project.id}" class="project-card">
          <div class="card-image-container">
            <img src="${project.images[0]}" alt="${project.title}" class="card-image">
            <div class="status-badge ${project.status.toLowerCase().replace(/\s+/g, '-')}">
              ${project.status}
            </div>
          </div>
          <div class="card-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.desc}</p>
            <div class="card-footer">
              <div class="project-location">
                <svg class="location-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                ${project.location}
              </div>
              <div class="view-details">
                View Details
                <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </a>
      `).join('');
    }

    // Filter functionality
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const status = pill.dataset.status;
        currentFilter = status;
        renderProjects(status);
      });
    });

    // Set initial filter
    if (urlStatus) {
      const targetPill = document.querySelector(`.filter-pill[data-status="${urlStatus}"]`);
      if (targetPill) {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        targetPill.classList.add('active');
      }
    }

    // Initial render
    renderProjects(currentFilter);