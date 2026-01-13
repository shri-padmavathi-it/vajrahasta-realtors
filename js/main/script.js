

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((s, i) => {
    s.style.display = "none";
    dots[i].classList.remove("active");
  });
  slides[index].style.display = "block";
  dots[index].classList.add("active");
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

// Initialize
showSlide(slideIndex);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Clickable dots
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slideIndex = i;
    showSlide(slideIndex);
  });
});





const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const location = formData.get("location");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Construct the payload to match the API structure
  const payload = {
    name: name + ", " + location,
    email: email,
    message: `${subject} - ${message}`,
    website: "Vajrahasta Realtors",
    to: "vajrahastarealtors@gmail.com", // your recipient email
  };

  try {
    const response = await fetch(
      "https://api-oracle-server.duckdns.org/api/node/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      alert("✅ Your message has been sent successfully!");
      contactForm.reset();
    } else {
      alert("❌ Failed to send your message. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Something went wrong. Please try again later.");
  }
});
