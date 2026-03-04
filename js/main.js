document.addEventListener("DOMContentLoaded", () => {
  // 1. Verificación de Seguridad
  if (typeof CONFIG === 'undefined') {
    console.error("Error: Archivo config.js no detectado.");
    return;
  }

  // 2. Inyección de Textos
  const setElementText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  setElementText("gym-name", CONFIG.gymName);
  setElementText("hero-title", CONFIG.heroTitle);

  // 3. WhatsApp Centralizado (Sin duplicar IDs)
  const message = encodeURIComponent(`Hola, vengo de la web de ${CONFIG.gymName}. Quisiera más información.`);
  const whatsappLink = `https://wa.me/${CONFIG.phone}?text=${message}`;

  // Buscamos TODOS los elementos que tengan la clase 'btn' o el id flotante
  // Esto evita tener que escribir cada ID manualmente en el JS
  const allLinks = document.querySelectorAll('a[href="#contacto"], .whatsapp-float, #whatsapp-btn-2');
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Si el link es para WhatsApp, redirigimos
      if (link.id.includes('whatsapp') || link.classList.contains('whatsapp-float')) {
        e.preventDefault();
        window.open(whatsappLink, '_blank');
      }
    });
  });

  // 4. Menú de Hamburguesa
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle'); // Para animar las rayitas si haces el CSS
    });
  }

  // Cerrar menú al clickear link (UX Móvil)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
    });
  });

  // 5. Scroll Spy Optimizado
  const sections = document.querySelectorAll("section, header");
  const navA = document.querySelectorAll(".nav-links a");

  const scrollSpy = () => {
    let current = "";
    const scrollPos = window.scrollY + 200; // Margen para detectar sección

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute("id");
      }
    });

    navA.forEach((a) => {
      a.classList.remove("active");
      // Verificamos si el href coincide con el ID actual
      if (a.getAttribute("href").includes(current)) {
        a.classList.add("active");
      }
    });
  };

  // Ejecutar al scroll con un pequeño delay para rendimiento
  window.addEventListener("scroll", scrollSpy);

  // Ejecutar una vez al cargar para marcar "Inicio"
  scrollSpy();

  document.documentElement.style.setProperty('--accent-color', CONFIG.accentColor);
  document.documentElement.style.setProperty('--primary-color', CONFIG.primaryColor);
  document.documentElement.style.setProperty('--background-color', CONFIG.primaryColor);
  console.log(`%c ${CONFIG.gymName} System Online `, "color: #fff; background: #e10600; padding: 5px; border-radius: 3px;");
});