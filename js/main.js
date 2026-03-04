document.addEventListener("DOMContentLoaded", () => {
  // 1. Verificación de seguridad: si CONFIG no existe, detenemos el script
  if (typeof CONFIG === 'undefined') {
    console.error("Error: No se encontró el archivo de configuración.");
    return;
  }

  // 2. Inyección de textos con seguridad (evita errores si el ID no existe en el HTML)
  const setElementText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setElementText("gym-name", CONFIG.gymName);
  setElementText("hero-title", CONFIG.heroTitle);

  // 3. Generación dinámica del enlace de WhatsApp
  // Usamos encodeURIComponent para que el mensaje soporte espacios y tildes correctamente
  const message = encodeURIComponent(`Hola, vengo de la web de ${CONFIG.gymName}. Quisiera más información.`);
  const whatsappLink = `https://wa.me/${CONFIG.phone}?text=${message}`;

  // 4. Aplicar el enlace a todos los botones de contacto
  const contactButtons = ["whatsapp-btn", "whatsapp-btn-2", "whatsapp-float"];
  
  contactButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.href = whatsappLink;
  });

  console.log(`Sistema de ${CONFIG.gymName} cargado correctamente.`);
});