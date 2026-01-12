// ===========================
// 🧭 Project Page Logic (Fixed IDs)
// ===========================





// Read URL parameters
const params = new URLSearchParams(window.location.search);
const type = params.get('type');
const status = params.get('status'); // Optional filter

let projects = [];
let title = "";

// Assign stable IDs to each project
if (type === "apartment") {
  projects = apartmentProjects.map((p, i) => ({ ...p, id: i }));
  title = "Apartment Projects";
  document.querySelector('.body-bg-blur').style.background =
    "url('Assests/Gemini_Generated_Image_txmu73txmu73txmu-removebg-preview.png') center center/cover no-repeat";
} else if (type === "layout") {
  projects = layoutProjects.map((p, i) => ({ ...p, id: i }));
  title = "Layout Projects";
  document.querySelector('.body-bg-blur').style.background =
    "url('Assests/layout images/IMG-20251016-WA0020.jpg') center center/cover no-repeat";
} else {
  title = "Projects";
  // Merge both datasets for general projects page
  projects = [
    ...apartmentProjects.map((p, i) => ({ ...p, type: 'apartment', id: i })),
    ...layoutProjects.map((p, i) => ({ ...p, type: 'layout', id: i }))
  ];
  document.querySelector('.body-bg-blur').style.background =
    "url('Assests/layout images/IMG-20251016-WA0020.jpg') center center/cover no-repeat";
}

// Filter by status if given
if (status) {
  const statusFilter = status.trim().toLowerCase();
  projects = projects.filter(p => p.status.trim().toLowerCase() === statusFilter);
  title += ` - ${status}`;
}


document.getElementById('projects-title').textContent = title;

// Render project cards using stable IDs
document.getElementById('projects-grid').innerHTML = projects.map(p => `
  <a class="project-card" href="project.html?type=${p.type || type}&id=${p.id}">
    <div class="project-card-img-wrapper">
      <div class="status-ribbon ${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</div>
      <img class="project-card-img" src="${p.images[0]}" alt="${p.title}">
    </div>
    <div class="project-title">${p.title}</div>
    <div class="project-desc">${p.desc}</div>
    <div class="project-location">${p.location}</div>
  </a>
`).join('');
