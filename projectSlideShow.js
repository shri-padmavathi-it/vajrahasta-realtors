/* ============================================
   JAVASCRIPT FOR CONTINUOUS SLIDER
   Add this to your script.js file
   ============================================ */


// Function to create project cards
function createProjectCard(project, index, type) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const statusClass = `status-${project.status}`;
  const statusText = project.status.charAt(0).toUpperCase() + project.status.slice(1);
  
  // Get plot size or units info
  let metaInfo = '';
  if (project.plotSize) {
    metaInfo = `<div class="meta-item"><i class="fa-solid fa-ruler-combined"></i> ${project.plotSize}</div>`;
  }
  if (project.Units) {
    metaInfo += `<div class="meta-item"><i class="fa-solid fa-building"></i> ${project.Units} Units</div>`;
  }
  if (project.floors) {
    metaInfo += `<div class="meta-item"><i class="fa-solid fa-layer-group"></i> ${project.floors} Floors</div>`;
  }
  if (project.totalLand) {
    metaInfo += `<div class="meta-item"><i class="fa-solid fa-map"></i> ${project.totalLand}</div>`;
  }
  
  card.innerHTML = `
    <div class="project-card-image">
      <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
      <div class="project-status ${statusClass}">${statusText}</div>
    </div>
    <div class="project-card-content">
      <h3>${project.title}</h3>
      <div class="project-location">
        <i class="fa-solid fa-location-dot"></i>
        <span>${project.location}</span>
      </div>
      <p>${project.desc}</p>
      <div class="project-meta">
        ${metaInfo}
      </div>
      <a href="project.html?type=${type}&id=${index}" class="project-card-btn">View Details</a>
    </div>
  `;
  
  return card;
}

// Initialize the continuous slider
function initializeProjectsSlider() {
  const sliderTrack = document.getElementById('projects-slider-track');
  
  if (!sliderTrack) return;
  
  // Clear existing content
  sliderTrack.innerHTML = '';
  
  // Create cards for apartment projects
  apartmentProjects.forEach((project, index) => {
    sliderTrack.appendChild(createProjectCard(project, index, 'apartment'));
  });
  
  // Create cards for layout projects
  layoutProjects.forEach((project, index) => {
    sliderTrack.appendChild(createProjectCard(project, index, 'layout'));
  });
  
  // Duplicate cards for seamless infinite loop
  apartmentProjects.forEach((project, index) => {
    sliderTrack.appendChild(createProjectCard(project, index, 'apartment'));
  });
  
  layoutProjects.forEach((project, index) => {
    sliderTrack.appendChild(createProjectCard(project, index, 'layout'));
  });
}

// Speed control functions
function setSliderSpeed(speed) {
  const sliderTrack = document.getElementById('projects-slider-track');
  const buttons = document.querySelectorAll('.speed-btn');
  
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  const durations = {
    slow: '60s',
    normal: '40s',
    fast: '20s'
  };
  
  sliderTrack.style.animation = `continuousScroll ${durations[speed]} linear infinite`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeProjectsSlider();
});
