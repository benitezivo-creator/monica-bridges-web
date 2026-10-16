/**
 * MÓNICA BRIDGES - Interactive Luxury Quote Wizard
 * Handles multi-step quote builder, service parameters, validation,
 * and structured WhatsApp / Email message dispatch.
 */

(function () {
  'use strict';

  // State
  const wizardState = {
    step: 1,
    serviceType: 'Residencia Privada (Casa / Penthouse)',
    modality: 'Jornada Completa (Lunes a Viernes)',
    scopeSize: '150 a 300 m²',
    specialRequirements: [],
    urgency: 'Inmediata (1 a 7 días)',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientZone: '',
    clientNotes: ''
  };

  const WHATSAPP_PHONE = '5491127789351'; // +54 11 2778 9351 in international format
  const OFFICIAL_EMAIL = 'monicabridges56@gmail.com';

  // DOM Elements
  let currentStep = 1;
  const totalSteps = 4;

  function initWizard() {
    setupStepNavigation();
    setupOptionSelectors();
    setupInputListeners();
    setupDispatchButtons();
    updateWizardUI();
  }

  function setupStepNavigation() {
    const nextBtn = document.getElementById('wizard-next-btn');
    const prevBtn = document.getElementById('wizard-prev-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          if (currentStep < totalSteps) {
            currentStep++;
            updateWizardUI();
          }
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateWizardUI();
        }
      });
    }

    // Step indicators click
    const stepIndicators = document.querySelectorAll('.wizard-step-pill');
    stepIndicators.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        const targetStep = idx + 1;
        if (targetStep < currentStep || validateStep(currentStep)) {
          currentStep = targetStep;
          updateWizardUI();
        }
      });
    });
  }

  function setupOptionSelectors() {
    // Service Type Cards
    const serviceTypeCards = document.querySelectorAll('.option-service-type');
    serviceTypeCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceTypeCards.forEach(c => c.classList.remove('active', 'border-amber-400', 'bg-zinc-800/80'));
        card.classList.add('active', 'border-amber-400', 'bg-zinc-800/80');
        wizardState.serviceType = card.dataset.value;
        updateSummary();
      });
    });

    // Modality Cards
    const modalityCards = document.querySelectorAll('.option-modality');
    modalityCards.forEach(card => {
      card.addEventListener('click', () => {
        modalityCards.forEach(c => c.classList.remove('active', 'border-amber-400', 'bg-zinc-800/80'));
        card.classList.add('active', 'border-amber-400', 'bg-zinc-800/80');
        wizardState.modality = card.dataset.value;
        updateSummary();
      });
    });

    // Scope size select or buttons
    const sizeCards = document.querySelectorAll('.option-size');
    sizeCards.forEach(card => {
      card.addEventListener('click', () => {
        sizeCards.forEach(c => c.classList.remove('active', 'border-amber-400', 'bg-zinc-800/80'));
        card.classList.add('active', 'border-amber-400', 'bg-zinc-800/80');
        wizardState.scopeSize = card.dataset.value;
        updateSummary();
      });
    });

    // Special Requirements checkboxes
    const checkboxes = document.querySelectorAll('.special-req-check');
    checkboxes.forEach(chk => {
      chk.addEventListener('change', () => {
        const selected = [];
        checkboxes.forEach(c => {
          if (c.checked) selected.push(c.value);
        });
        wizardState.specialRequirements = selected;
        updateSummary();
      });
    });

    // Urgency radio / selects
    const urgencyCards = document.querySelectorAll('.option-urgency');
    urgencyCards.forEach(card => {
      card.addEventListener('click', () => {
        urgencyCards.forEach(c => c.classList.remove('active', 'border-amber-400', 'bg-zinc-800/80'));
        card.classList.add('active', 'border-amber-400', 'bg-zinc-800/80');
        wizardState.urgency = card.dataset.value;
        updateSummary();
      });
    });
  }

  function setupInputListeners() {
    const nameInput = document.getElementById('wizard-client-name');
    const phoneInput = document.getElementById('wizard-client-phone');
    const emailInput = document.getElementById('wizard-client-email');
    const zoneInput = document.getElementById('wizard-client-zone');
    const notesInput = document.getElementById('wizard-client-notes');

    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        wizardState.clientName = e.target.value.trim();
        updateSummary();
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        wizardState.clientPhone = e.target.value.trim();
        updateSummary();
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        wizardState.clientEmail = e.target.value.trim();
        updateSummary();
      });
    }
    if (zoneInput) {
      zoneInput.addEventListener('input', (e) => {
        wizardState.clientZone = e.target.value.trim();
        updateSummary();
      });
    }
    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
        wizardState.clientNotes = e.target.value.trim();
        updateSummary();
      });
    }
  }

  function validateStep(step) {
    if (step === 1) {
      if (!wizardState.serviceType) {
        showToast('Por favor, seleccione el tipo de servicio (Residencial o Corporativo).');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!wizardState.modality) {
        showToast('Por favor, elija la modalidad y frecuencia deseada.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      return true; // Optional requirements
    }
    if (step === 4) {
      if (!wizardState.clientName) {
        showToast('Por favor, ingrese su nombre y apellido.');
        const el = document.getElementById('wizard-client-name');
        if (el) el.focus();
        return false;
      }
      if (!wizardState.clientPhone) {
        showToast('Por favor, indique un número de teléfono o WhatsApp de contacto.');
        const el = document.getElementById('wizard-client-phone');
        if (el) el.focus();
        return false;
      }
      if (!wizardState.clientZone) {
        showToast('Por favor, indique su zona o localidad de residencia.');
        const el = document.getElementById('wizard-client-zone');
        if (el) el.focus();
        return false;
      }
      return true;
    }
    return true;
  }

  function updateWizardUI() {
    // Hide/show step contents
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`wizard-step-content-${i}`);
      const pillEl = document.getElementById(`wizard-pill-${i}`);
      if (stepEl) {
        if (i === currentStep) {
          stepEl.classList.remove('hidden');
          stepEl.classList.add('block');
        } else {
          stepEl.classList.add('hidden');
          stepEl.classList.remove('block');
        }
      }

      if (pillEl) {
        pillEl.classList.remove('active', 'completed', 'bg-amber-400', 'text-black', 'border-amber-400');
        if (i === currentStep) {
          pillEl.classList.add('active');
        } else if (i < currentStep) {
          pillEl.classList.add('completed');
        }
      }
    }

    // Prev / Next button state
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    const actionsContainer = document.getElementById('wizard-final-actions');

    if (prevBtn) {
      if (currentStep === 1) {
        prevBtn.classList.add('opacity-40', 'cursor-not-allowed');
        prevBtn.disabled = true;
      } else {
        prevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
        prevBtn.disabled = false;
      }
    }

    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = 'Continuar';
      }
    }

    if (actionsContainer) {
      if (currentStep === totalSteps) {
        actionsContainer.classList.remove('hidden');
      } else {
        actionsContainer.classList.add('hidden');
      }
    }

    // Progress bar
    const progressFill = document.getElementById('wizard-progress-bar');
    if (progressFill) {
      const pct = Math.round((currentStep / totalSteps) * 100);
      progressFill.style.width = `${pct}%`;
    }

    updateSummary();
  }

  function updateSummary() {
    const summaryType = document.getElementById('sum-service-type');
    const summaryModality = document.getElementById('sum-modality');
    const summarySize = document.getElementById('sum-size');
    const summaryReqs = document.getElementById('sum-reqs');
    const summaryGuarantee = document.getElementById('sum-guarantee');

    if (summaryType) summaryType.textContent = wizardState.serviceType;
    if (summaryModality) summaryModality.textContent = wizardState.modality;
    if (summarySize) summarySize.textContent = wizardState.scopeSize;
    
    if (summaryReqs) {
      if (wizardState.specialRequirements.length > 0) {
        summaryReqs.textContent = wizardState.specialRequirements.join(', ');
      } else {
        summaryReqs.textContent = 'Protocolo estándar de alta gama';
      }
    }

    if (summaryGuarantee) {
      const isCorporate = wizardState.serviceType.toLowerCase().includes('corporativo') || 
                          wizardState.serviceType.toLowerCase().includes('empresa');
      summaryGuarantee.textContent = isCorporate 
        ? 'Garantía Corporativa de 60 Días de Reposición' 
        : 'Garantía Residencial de 30 Días de Reposición';
    }
  }

  function buildMessageText() {
    const isCorporate = wizardState.serviceType.toLowerCase().includes('corporativo') || 
                        wizardState.serviceType.toLowerCase().includes('empresa');
    const guaranteeText = isCorporate ? '60 Días (Corporativo)' : '30 Días (Residencial)';
    const reqsText = wizardState.specialRequirements.length > 0
      ? wizardState.specialRequirements.join(', ')
      : 'Estándar de etiqueta y pulcritud';

    return `🏛️ *SOLICITUD DE RECLUTAMIENTO - MÓNICA BRIDGES*
------------------------------------------------
Hola Mónica, deseo solicitar cotización para la selección de personal de limpieza calificado:

📌 *TIPO DE SERVICIO:* ${wizardState.serviceType}
⏳ *MODALIDAD:* ${wizardState.modality}
📐 *DIMENSIÓN / ALCANCE:* ${wizardState.scopeSize}
💎 *REQUISITOS ESPECIALES:* ${reqsText}
⏱️ *INCORPORACIÓN DESEADA:* ${wizardState.urgency}
🛡️ *GARANTÍA APLICABLE:* ${guaranteeText} (Bajo Contrato & NDA)

👤 *DATOS DEL SOLICITANTE:*
• *Nombre:* ${wizardState.clientName || 'No indicado'}
• *Teléfono:* ${wizardState.clientPhone || 'No indicado'}
• *Zona / Localidad:* ${wizardState.clientZone || 'No indicada'}
• *Email:* ${wizardState.clientEmail || 'No indicado'}
${wizardState.clientNotes ? `• *Observaciones:* ${wizardState.clientNotes}` : ''}

_Entiendo que el personal trabajará 100% bajo contrato y con acuerdo NDA firmado, y que los insumos de limpieza son provistos por nuestra parte en las instalaciones._
------------------------------------------------
A la espera de su asesoramiento personalizado. Muchas gracias.`;
  }

  function setupDispatchButtons() {
    // WhatsApp Send Button
    const waBtn = document.getElementById('wizard-send-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        const message = buildMessageText();
        const encoded = encodeURIComponent(message);
        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
        
        window.open(url, '_blank', 'noopener,noreferrer');
        showToast('Redirigiendo a WhatsApp oficial de Mónica Bridges...');
      });
    }

    // Email Send Button
    const emailBtn = document.getElementById('wizard-send-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        const subject = encodeURIComponent(`Solicitud de Personal de Limpieza - ${wizardState.clientName} (${wizardState.serviceType})`);
        const body = encodeURIComponent(buildMessageText());
        const url = `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`;

        window.location.href = url;
        showToast('Abriendo gestor de correo electrónico...');
      });
    }

    // Copy Summary Button
    const copyBtn = document.getElementById('wizard-copy-summary');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!validateStep(4)) return;
        const message = buildMessageText();
        navigator.clipboard.writeText(message).then(() => {
          showToast('✓ Resumen copiado al portapapeles con éxito');
        }).catch(() => {
          showToast('No se pudo copiar automáticamente.');
        });
      });
    }
  }

  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    let toastMsg = document.getElementById('toast-message');

    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%] px-5 py-3.5 rounded-xl bg-zinc-900 border border-amber-400/50 shadow-2xl flex items-center gap-3 text-sm text-zinc-100';
      toast.innerHTML = `<span class="text-amber-400 font-bold">MB</span><span id="toast-message">${message}</span>`;
      document.body.appendChild(toast);
      toastMsg = document.getElementById('toast-message');
    } else {
      if (toastMsg) toastMsg.textContent = message;
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Expose toast globally for candidate modal
  window.mbToast = showToast;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWizard);
  } else {
    initWizard();
  }
})();
