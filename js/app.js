/**
 * MÓNICA BRIDGES - Main Website Controller
 * Handles Navigation, Accordions, Dynamic UI, Certificate Viewer & Interactions.
 */

(function () {
  'use strict';

  function initApp() {
    setupNavbar();
    setupMobileMenu();
    setupAccordion();
    setupSmoothScroll();
    setupCertificatePreview();
    setupLucideIcons();
  }

  // Navbar glassmorphism scroll transition
  function setupNavbar() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ Accordion interactive logic
  function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const isActive = item.classList.contains('active');

        // Close all other items for clean accordion UX
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const icon = otherItem.querySelector('.accordion-icon');
            if (icon) icon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          const icon = item.querySelector('.accordion-icon');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          item.classList.add('active');
          const icon = item.querySelector('.accordion-icon');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  // Smooth scroll offset adjustment for fixed navbar
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeight = document.getElementById('main-navbar')?.offsetHeight || 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Guarantee & NDA Protocol Interactive Inspector Modal
  function setupCertificatePreview() {
    const certModal = document.getElementById('cert-modal');
    const openNdaBtn = document.getElementById('btn-view-nda-protocol');
    const openGuarBtn = document.getElementById('btn-view-guarantee-protocol');
    const closeCertBtn = document.getElementById('close-cert-modal');
    const certTitle = document.getElementById('cert-modal-title');
    const certBody = document.getElementById('cert-modal-body');

    if (!certModal) return;

    if (openNdaBtn) {
      openNdaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        certTitle.textContent = 'Protocolo de Privacidad Absoluta & Acuerdo NDA';
        certBody.innerHTML = `
          <div class="space-y-4 text-zinc-300 text-sm">
            <div class="p-4 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-start gap-3">
              <span class="text-amber-400 text-xl font-bold">🛡️</span>
              <p class="text-xs text-amber-200/90 leading-relaxed">
                Cada candidato presentado por <strong>Mónica Bridges</strong> suscribe un <strong>Acuerdo de No Divulgación (NDA)</strong> con validez legal vinculante antes de ingresar a cualquier instalación.
              </p>
            </div>
            <h4 class="font-bold text-white text-base font-serif-luxury">Cláusulas Fundamentales de Protección:</h4>
            <ul class="list-disc pl-5 space-y-2 text-xs text-zinc-400 leading-relaxed">
              <li><strong class="text-zinc-200">Secreto Profesional y Vida Privada:</strong> Prohibición estricta de fotografiar, filmar, comentar o divulgar cualquier aspecto de la intimidad, rutinas, bienes, obras de arte o personas del hogar o empresa.</li>
              <li><strong class="text-zinc-200">Confidencialidad Corporativa:</strong> Protección total respecto a documentos visibles en escritorios, pizarrones, papelería de desecho o conversaciones presenciadas en salas de reuniones.</li>
              <li><strong class="text-zinc-200">Custodia de Llaves y Códigos:</strong> Protocolo estricto de custodia de accesos perimetrales y alarmas.</li>
              <li><strong class="text-zinc-200">Sanciones Legales:</strong> El incumplimiento del NDA faculta al cliente y a la agencia al inicio inmediato de acciones civiles y penales correspondientes.</li>
            </ul>
          </div>
        `;
        certModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }

    if (openGuarBtn) {
      openGuarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        certTitle.textContent = 'Póliza de Garantía Escrita de Reposición';
        certBody.innerHTML = `
          <div class="space-y-4 text-zinc-300 text-sm">
            <div class="p-4 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-start gap-3">
              <span class="text-amber-400 text-xl font-bold">📜</span>
              <p class="text-xs text-amber-200/90 leading-relaxed">
                Nuestra garantía es <strong>100% escrita y formal</strong> en el contrato de servicio. Si durante el período de cobertura el perfil no cumple con sus expectativas, procedemos al reemplazo inmediato sin honorarios adicionales.
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="p-3.5 rounded-lg bg-zinc-800/80 border border-zinc-700">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Casas Particulares</span>
                <p class="text-2xl font-bold text-white font-serif-luxury">30 DÍAS</p>
                <p class="text-[11px] text-zinc-400 mt-1">Cobertura total con reemplazo garantizado en un plazo preferente de 48 a 72 horas hábiles.</p>
              </div>
              <div class="p-3.5 rounded-lg bg-zinc-800/80 border border-amber-400/40">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Empresas & Oficinas</span>
                <p class="text-2xl font-bold text-white font-serif-luxury">60 DÍAS</p>
                <p class="text-[11px] text-zinc-400 mt-1">Garantía corporativa extendida que acompaña la curva de adaptación operacional de su organización.</p>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 italic">
              * Nota de Alcance: La garantía cubre el servicio de selección y reclutamiento del personal. Los insumos, químicos y maquinaria de limpieza continúan siendo provistos por el cliente en sus sedes.
            </p>
          </div>
        `;
        certModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeCertBtn) {
      closeCertBtn.addEventListener('click', () => {
        certModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  // Initialize Lucide icons if present
  function setupLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
