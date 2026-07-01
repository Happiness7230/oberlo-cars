// ===================  Hero Section===================
// =============================
// Search Box
// =============================

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".btn1");

if (searchButton && searchInput) {

  searchButton.addEventListener("click", () => {

    const value = searchInput.value.trim();

    if (value === "") {
      alert("Please enter a search term.");
    } else {
      alert("Searching for: " + value);
    }

  });

  // Press Enter to search
  searchInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
      searchButton.click();
    }

  });

}


// =============================
// Read More Buttons
// =============================

const readButtons = document.querySelectorAll(".btn2");

readButtons.forEach(button => {

  button.addEventListener("click", function () {

    alert("More details coming soon!");

  });

});


// =============================
// Smooth Scroll Navigation
// =============================

const navLinks = document.querySelectorAll(".nav-links a, .drawer-links a");

if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      // Only handle links like #HOME, #MODELS, etc.
      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });
}


// =============================
// Navbar Shadow on Scroll
// =============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {

    navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";

  } else {

    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,.3)";

  }

});


// =============================
// Card Hover Animation
// =============================

const cards = document.querySelectorAll(".fristModel, .secondModel, .thridModel");

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    card.style.transform = "translateY(-8px)";
    card.style.transition = "0.3s ease";

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "translateY(0)";

  });

});


// ============================================================
// FEATURED VEHICLES DATA
// ============================================================const carData = [
  const carData = [
  { name: "Classic Elegance", price: "40000.00", desc: "A timeless model with vintage styling and modern reliability. Perfect for collectors and everyday drivers alike.", image: "./images/img8.jpg" },
  { name: "Performance Series", price: "40000.00", desc: "Built for speed and precision. This vehicle is our top pick for drivers who live life in the fast lane.", image: "./images/img9.jpg" },
  { name: "Premium Luxury", price: "40000.00", desc: "Step into sophistication. Leather interiors, panoramic sunroof, and cutting-edge tech define this flagship model.", image: "./images/img10.jpg" },
  { name: "Off-Road Beast", price: "32500.00", desc: "Conquer any terrain with confidence. Built with reinforced suspension, all-wheel drive, and rugged exterior for the true adventurer.", image: "./images/img11.jpg" },
  { name: "City Cruiser", price: "32500.00", desc: "Compact, agile, and fuel-efficient. The perfect urban companion for navigating busy streets without compromising on style.", image: "./images/img12.jpg" },
  { name: "Family Hauler", price: "32500.00", desc: " Space, safety, and comfort all in one. Designed for growing families who refuse to sacrifice style for practicality.", image: "./images/img13.jpg" },
  { name: "Sport Coupe", price: "45000.00", desc: "Engineered for those who demand more from the road. Razor-sharp handling and power.", image: "./images/img14.jpg" },
  { name: "Executive Sedan", price: "45000.00", desc: "Redefine your daily commute with luxurious craftsmanship and comfort.", image: "./images/img15.jpg" },
  { name: "Urban SUV", price: "45000.00", desc: "Commanding road presence with spacious seating and smart connectivity.", image: "./images/img16.jpg" },
  { name: "Electric Pioneer", price: "30000.00", desc: "Drive into the future. Our fully electric model delivers zero emissions, instant torque, and a range that keeps up with your lifestyle.", image: "./images/img17.jpg" },
  { name: "Midnight Edition", price: "40000.00", desc: "Exclusively crafted for those who stand out after dark. Matte finish, blacked-out trims, and premium sound system included as standard.", image: "./images/img18.jpg" },
  { name: "Heritage Classic", price: "40000.00", desc: "A lovingly restored icon. Each Heritage Classic is hand-finished by our master technicians to bring vintage glory back to the modern road.", image: "./images/img19.jpg" },
  { name: "GT Roadster", price: "40000.00", desc: "Wind in your hair, power at your fingertips. The GT Roadster is open-top driving at its absolute finest — raw, thrilling, and unforgettable.", image: "./images/img20.jpg" },
  { name: "Business Class", price: "32500.00", desc: "Arrive at every meeting in total command. Tinted windows, a whisper-quiet cabin, and chauffeur-grade comfort define this executive choice.", image: "./images/img21.jpg" },
  { name: "Weekend Warrior", price: "32500.00", desc: "From Friday evening to Sunday night, this versatile model is built for road trips, camping runs, and everything in between.", image: "./images/img22.jpg" },
];
function renderVehicleGrid() {
  const grid = document.getElementById("vehicleGrid");
  if (!grid) return;

  grid.innerHTML = carData.map(car => `
    <article class="vehicle-card">
      <div class="vehicle-image">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <span class="price-badge">Price $${car.price}</span>
      </div>
      <div class="vehicle-info">
        <h3>${car.name}</h3>
        <p>${car.desc}</p>
        <a href="#" class="btn btn-filled">Read More &rarr;</a>
      </div>
    </article>
  `).join("");
}

// ============================================================
// FOOTER FORM
// No backend wired up yet — replace the timeout in handleSubmit
// with your real fetch()/API call when the backend is ready.
// ============================================================
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const mapBtn = document.getElementById("mapBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Please fill in all fields before sending.";
      return;
    }

    status.textContent = "Sending...";
    setTimeout(() => {
      status.textContent = "Thanks! Your message has been sent.";
      form.reset();
    }, 600);
  });

  mapBtn?.addEventListener("click", () => {
    status.textContent = "Map view coming soon.";
  });
}

function setupMobileDrawer() {
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  if (menuToggle && menuClose && mobileDrawer && drawerOverlay) {
    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.add("open");
      drawerOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    const closeMenu = () => {
      mobileDrawer.classList.remove("open");
      drawerOverlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    menuClose.addEventListener("click", closeMenu);
    drawerOverlay.addEventListener("click", closeMenu);

    const drawerLinks = mobileDrawer.querySelectorAll(".drawer-links a");
    drawerLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderVehicleGrid();
  setupContactForm();
  setupMobileDrawer();
});