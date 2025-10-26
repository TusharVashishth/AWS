// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger
  const spans = hamburger.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (navMenu.classList.contains("active")) {
      if (index === 0) span.style.transform = "rotate(45deg) translateY(10px)";
      if (index === 1) span.style.opacity = "0";
      if (index === 2)
        span.style.transform = "rotate(-45deg) translateY(-10px)";
    } else {
      span.style.transform = "none";
      span.style.opacity = "1";
    }
  });
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = hamburger.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.transform = "none";
      span.style.opacity = "1";
    });
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
  }

  lastScroll = currentScroll;
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
document
  .querySelectorAll(".feature-card, .instance-card, .pricing-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stats = document.querySelectorAll(".stat h3");
        stats.forEach((stat) => {
          const target = stat.textContent;
          if (target.includes("+")) {
            const num = parseInt(target.replace("+", ""));
            animateCounter(stat, num, 2000);
            stat.textContent = num + "+";
          } else if (target.includes("%")) {
            const num = parseFloat(target.replace("%", ""));
            let start = 0;
            const timer = setInterval(() => {
              start += 0.01;
              if (start >= num) {
                stat.textContent = num + "%";
                clearInterval(timer);
              } else {
                stat.textContent = start.toFixed(2) + "%";
              }
            }, 20);
          }
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroHeight = document.querySelector(".hero").offsetHeight;

  if (scrolled <= heroHeight) {
    document.querySelector(".hero-bg").style.transform = `translateY(${
      scrolled * 0.5
    }px)`;
  }
});

// Button click effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.5)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  const text = heroTitle.innerHTML;
  heroTitle.innerHTML = "";
  heroTitle.style.opacity = "1";

  let index = 0;
  const typeSpeed = 50;

  function type() {
    if (index < text.length) {
      if (text.charAt(index) === "<") {
        // Handle HTML tags
        const closeTag = text.indexOf(">", index);
        heroTitle.innerHTML += text.substring(index, closeTag + 1);
        index = closeTag + 1;
      } else {
        heroTitle.innerHTML += text.charAt(index);
        index++;
      }
      setTimeout(type, typeSpeed);
    }
  }

  // Uncomment to enable typing effect
  // setTimeout(type, 500);
}

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll(".floating-card");
floatingCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.1) translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1) translateY(0)";
  });
});

// Feature cards hover effect
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".feature-icon");
    icon.style.transform = "scale(1.2) rotate(10deg)";
    icon.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".feature-icon");
    icon.style.transform = "scale(1) rotate(0deg)";
  });
});

// Instance cards hover effect
const instanceCards = document.querySelectorAll(".instance-card");
instanceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.borderColor = "var(--primary-color)";
  });

  card.addEventListener("mouseleave", function () {
    if (!this.classList.contains("featured")) {
      this.style.borderColor = "transparent";
    }
  });
});

// Pricing cards comparison effect
const pricingCards = document.querySelectorAll(".pricing-card");
pricingCards.forEach((card) => {
  card.addEventListener("click", function () {
    pricingCards.forEach((c) => (c.style.border = "2px solid transparent"));
    this.style.border = "2px solid var(--primary-color)";
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Console easter egg
console.log(
  "%c🚀 AWS EC2 Landing Page",
  "color: #FF9900; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cBuilt with HTML, CSS, and JavaScript",
  "color: #146EB4; font-size: 14px;"
);
console.log(
  "%cExplore the power of cloud computing!",
  "color: #232F3E; font-size: 12px;"
);

// Add interactive cursor effect (optional)
const cursor = document.createElement("div");
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor.style.display = "block";
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursor.style.background = "rgba(255, 153, 0, 0.2)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.background = "transparent";
  });
});

// Performance optimization: Lazy load images (if images are added)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Add accessibility: Keyboard navigation enhancement
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    const spans = hamburger.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.transform = "none";
      span.style.opacity = "1";
    });
  }
});

// Track scroll depth for analytics (optional)
let maxScroll = 0;
window.addEventListener("scroll", () => {
  const scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  if (scrollPercentage > maxScroll) {
    maxScroll = scrollPercentage;
    // console.log('Max scroll depth:', Math.round(maxScroll) + '%');
  }
});
