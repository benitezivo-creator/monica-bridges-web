/**
 * MÓNICA BRIDGES - Candidate Portal & Application Handler
 * Enables prospective personnel to apply, submit qualifications,
 * references, and send their profile via WhatsApp or Email.
 */

(function () {
  'use strict';

  const WHATSAPP_PHONE = '5491127789351';
  const OFFICIAL_EMAIL = 'monicabridges56@gmail.com';

  function initCandidateModule() {
    setupModalTriggers();
    setupCandidateForm();
  }

  function setupModalTriggers() {
    const openButtons = document.querySelectorAll('[data-open-candidate-modal]');
    const closeButtons = document.querySelectorAll('[data-close-candidate-modal]');
    const modal = document.getElementById('candidate-modal');

    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modal);
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(modal);
      });
    });

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal(modal);
      }
    });
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function setupCandidateForm() {
    const waSubmitBtn = document.getElementById('candidate-submit-wa');
    const emailSubmitBtn = document.getElementById('candidate-submit-email');

    if (waSubmitBtn) {
      waSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = collectFormData();
        if (!data) return;

        const message = `✨ *POSTULACIÓN DE PERSONAL - MÓNICA BRIDGES*
------------------------------------------------
Hola Mónica, deseo postularme para formar parte del personal de limpieza calificado:

👤 *DATOS PERSONALES:*
• *Nombre completo:* ${data.fullName}
• *Edad:* ${data.age || 'No especificada'}
• *Teléfono de contacto:* ${data.phone}
• *Zona / Barrio de residencia:* ${data.zone}
• *Nacionalidad / Documentación:* ${data.documentation}

💼 *EXPERIENCIA & ANTECEDENTES:*
• *Años de experiencia comprobable:* ${data.experienceYears}
• *Áreas en las que trabajó:* ${data.specialties}
• *Disponibilidad horaria:* ${data.availability}
• *Referencias laborales comprobables:* ${data.hasReferences ? 'SÍ (Disponibles para verificación)' : 'En trámite'}
${data.cvLink ? `• *Enlace a CV o Drive:* ${data.cvLink}` : ''}
${data.additionalNotes ? `• *Comentarios / Perfil:* ${data.additionalNotes}` : ''}

_Cuento con disponibilidad para firmar Acuerdo de Confidencialidad (NDA) y trabajar bajo contratación formal._
------------------------------------------------
Quedo atenta/o a su convocatoria para la entrevista de selección.`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank', 'noopener,noreferrer');
        
        if (window.mbToast) {
          window.mbToast('Enviando postulación al WhatsApp oficial de Mónica Bridges...');
        }
        closeModal(document.getElementById('candidate-modal'));
      });
    }

    if (emailSubmitBtn) {
      emailSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = collectFormData();
        if (!data) return;

        const subject = encodeURIComponent(`Postulación Laboral de Personal de Limpieza - ${data.fullName}`);
        const body = encodeURIComponent(`POSTULACIÓN DE PERSONAL - MÓNICA BRIDGES
----------------------------------------
Nombre completo: ${data.fullName}
Edad: ${data.age || 'No especificada'}
Teléfono: ${data.phone}
Zona de residencia: ${data.zone}
Documentación / DNI: ${data.documentation}

Años de experiencia: ${data.experienceYears}
Especialidades: ${data.specialties}
Disponibilidad: ${data.availability}
Referencias comprobables: ${data.hasReferences ? 'SÍ' : 'No'}
${data.cvLink ? `Enlace a CV / Archivo: ${data.cvLink}\n` : ''}
${data.additionalNotes ? `Notas adicionales: ${data.additionalNotes}\n` : ''}

(Adjunto mi CV y referencias a este correo)`);

        window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`;
        if (window.mbToast) {
          window.mbToast('Abriendo correo para adjuntar CV...');
        }
        closeModal(document.getElementById('candidate-modal'));
      });
    }
  }

  function collectFormData() {
    const fullName = document.getElementById('cand-name')?.value.trim();
    const age = document.getElementById('cand-age')?.value.trim();
    const phone = document.getElementById('cand-phone')?.value.trim();
    const zone = document.getElementById('cand-zone')?.value.trim();
    const documentation = document.getElementById('cand-doc')?.value.trim() || 'DNI vigente';
    const experienceYears = document.getElementById('cand-experience')?.value || 'Más de 3 años';
    const availability = document.getElementById('cand-availability')?.value || 'Jornada Completa';
    const cvLink = document.getElementById('cand-cv-link')?.value.trim();
    const additionalNotes = document.getElementById('cand-notes')?.value.trim();
    const hasReferences = document.getElementById('cand-references')?.checked;

    // Specialties checked
    const specElements = document.querySelectorAll('.cand-spec-check:checked');
    const specs = Array.from(specElements).map(el => el.value);
    const specialties = specs.length > 0 ? specs.join(', ') : 'Casas de familia y oficinas';

    if (!fullName) {
      if (window.mbToast) window.mbToast('Por favor, ingresá tu nombre completo.');
      document.getElementById('cand-name')?.focus();
      return null;
    }
    if (!phone) {
      if (window.mbToast) window.mbToast('Por favor, ingresá tu teléfono o WhatsApp.');
      document.getElementById('cand-phone')?.focus();
      return null;
    }
    if (!zone) {
      if (window.mbToast) window.mbToast('Por favor, indicanos tu zona de residencia.');
      document.getElementById('cand-zone')?.focus();
      return null;
    }

    return {
      fullName,
      age,
      phone,
      zone,
      documentation,
      experienceYears,
      availability,
      specialties,
      cvLink,
      additionalNotes,
      hasReferences
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCandidateModule);
  } else {
    initCandidateModule();
  }
})();
