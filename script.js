// Small interactions: typewriter, theme, project filters, modal, reveal, counters and contact mailto.
const phrases = ["experiences.", "smart solutions.", "meaningful impact."];
const typed = document.getElementById("typedText");
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  if (!typed) return;
  const word = phrases[phraseIndex];
  typed.textContent = word.substring(0, charIndex);
  if (!deleting && charIndex < word.length) { charIndex++; setTimeout(typeLoop, 95); }
  else if (!deleting) { deleting = true; setTimeout(typeLoop, 1350); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeLoop, 45); }
  else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeLoop, 300); }
}
setTimeout(typeLoop, 700);

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("khushi-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
function updateThemeIcon() {
  themeToggle.innerHTML = document.body.classList.contains("dark") ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
}
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("khushi-theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-item").forEach(item => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hide", !show);
      if (show) item.classList.add("visible");
    });
  });
});

const projectInfo = {
  student: {title:"Student Management REST API", text:"A secure RESTful API for managing student records. The project supports structured CRUD operations, JWT-based authentication and authorization, role-based access control, and an Entity Framework Core database layer with migration-based schema management.", tags:["C#","ASP.NET Core","Entity Framework Core","SQL Server","JWT Authentication"]},
  semantic: {title:"Semantic Question-Answering System", text:"A semantic search-based QA system that retrieves contextually relevant answers from web-scraped data. FAISS supports high-speed similarity search over vector embeddings, while language models generate context-aware responses. The framework was also proposed in a published research paper.", tags:["Python","FAISS","NLP","Transformers","Web Scraping"]},
  event: {title:"Event Management System", text:"A full-stack automated event scheduling platform designed for university workflows. It supports registration, event tracking and participant data management with validation and error handling, using SQL Server as its database.", tags:["ASP.NET","C#","SQL Server"]},
  hostel: {title:"Hostel Management System", text:"An automated hostel management application for student records, room allocation and fee tracking. It uses Python and SQL, with optimized queries and structured schema validation to support consistent data.", tags:["Python","SQL","OOP"]}
};
const projectModal = new bootstrap.Modal(document.getElementById("projectModal"));
document.querySelectorAll(".project-more").forEach(button => button.addEventListener("click", () => {
  const info = projectInfo[button.dataset.project];
  document.getElementById("projectModalTitle").textContent = info.title;
  document.getElementById("projectModalText").textContent = info.text;
  document.getElementById("projectModalTags").innerHTML = info.tags.map(tag => `<span>${tag}</span>`).join("");
  projectModal.show();
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("stats-grid") && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        entry.target.querySelectorAll("[data-count]").forEach(el => {
          const target = Number(el.dataset.count), decimals = String(target).includes(".") ? 1 : 0;
          let current = 0, steps = 35;
          const timer = setInterval(() => {
            current += target / steps;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current.toFixed(decimals) + (target === 9.3 ? "" : "+");
          }, 28);
        });
      }
    }
  });
}, {threshold:0.14});
document.querySelectorAll(".reveal, .stats-grid").forEach(el => observer.observe(el));

const progress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
  backToTop.classList.toggle("show", window.scrollY > 500);
});
backToTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hi Khushi,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  document.getElementById("formNote").textContent = "Opening your email app…";
  window.location.href = `mailto:kds8000s@gmail.com?subject=${subject}&body=${body}`;
});

// Close the mobile menu after selecting a section.
document.querySelectorAll(".navbar .nav-link").forEach(link => link.addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
}));
