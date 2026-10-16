# Mónica Bridges — Plataforma Web de Reclutamiento de Limpieza de Lujo

> **Plataforma web oficial para Mónica Bridges: Selección y reclutamiento especializado de personal de limpieza de alta gama para residencias privadas y empresas corporativas.**

---

## 🏛️ 1. Concepto de Marca y Posicionamiento
- **Concepto Visual:** *Luxury, Discretion & High-End Corporate*.
- **Paleta Cromática:**
  - Fondo Noche Absoluto (`#0B0B0B`)
  - Paneles de Antracita Oscura (`#18181B`)
  - Acentos de Oro Metálico (`#D4AF37`, `#F3E5AB`, `#AA7A1E`)
  - Textos en Blanco Nieve y Mármol Neutro (`#FFFFFF`, `#A1A1AA`)
- **Tipografía:**
  - Encabezados: `Cinzel` & `Playfair Display` (Serif de corte clásico y señorial)
  - Cuerpo / Botones / UI: `Plus Jakarta Sans` (Sans-serif moderna, nítida y legible)

---

## 🛡️ 2. Pilares Legales y de Servicio
1. **100% Bajo Contrato Formal:** Transparencia y cumplimiento legal estricto.
2. **Acuerdos Vinculantes de Confidencialidad (NDA):** Firma obligatoria de reserva sobre la intimidad familiar y datos corporativos.
3. **Garantía Escrita de Reposición:**
   - **Residencial:** 30 días con sustitución sin costo de búsqueda adicional.
   - **Corporativo / Empresas:** 60 días de garantía extendida.
4. **Alcance y Delimitación:** Especialistas exclusivamente en la selección, verificación y contratación de talento idóneo. Los insumos, químicos y maquinaria de limpieza son provistos por el cliente en destino.

---

## 📁 3. Estructura del Proyecto

```text
Monica Bridges/
├── index.html                 # Estructura semántica, accesibilidad y módulos SEO
├── vercel.json                # Configuración de despliegue Jamstack, caché y cabeceras de seguridad
├── robots.txt                 # Directivas para motores de búsqueda
├── sitemap.xml                # Mapa del sitio optimizado para indexación
├── README.md                  # Documentación técnica y comercial
├── css/
│   └── styles.css             # Glassmorphism, degradados dorados, animaciones y micro-interacciones
├── js/
│   ├── app.js                 # Controlador general, navegación, acordeones y modales informativos
│   ├── quote-wizard.js        # Cotizador interactivo paso a paso con dispatch a WhatsApp y Email
│   └── candidate-modal.js     # Portal interactivo para postulaciones de personal aspirante
└── assets/
    ├── favicon.svg            # Favicon vectorial de alta resolución
    ├── logo-monogram.svg      # Isotipo / Monograma heráldico "MB" con orfebrería dorada
    ├── seal-guarantee.svg     # Sello de garantía escrita de reposición
    ├── seal-nda.svg           # Sello de acuerdo NDA y máxima confidencialidad
    ├── hero-luxury.jpg        # Imagen fotorrealista de interiorismo residencial de lujo
    └── corporate-luxury.jpg   # Imagen fotorrealista de sala corporativa ejecutiva
```

---

## ⚡ 4. Puesta en Marcha Local

Al ser una arquitectura **Jamstack pura**, no requiere de compiladores pesados ni dependencias externas frágiles.

### Opción A (Directa en navegador):
Simplemente abra `index.html` en su navegador preferido (Chrome, Edge, Safari, Firefox).

### Opción B (Servidor Local con Node / Python / VS Code):
```bash
# Con Python 3:
python -m http.server 3000

# Con npx serve:
npx serve .
```
Luego ingrese a `http://localhost:3000`.

---

## 🚀 5. Despliegue en Vercel / Netlify

### En Vercel:
1. Conectar el repositorio de GitHub o subir la carpeta mediante Vercel CLI:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Vercel detectará automáticamente el archivo `vercel.json` y desplegará el sitio con cabeceras de seguridad (`X-Frame-Options`, `Content-Security`, etc.) y políticas de caché optimizadas para alto rendimiento.

### En Netlify:
- Arrastrar la carpeta `Monica Bridges` a [app.netlify.com/drop](https://app.netlify.com/drop) para un despliegue instantáneo en menos de 10 segundos.

---

## 📲 6. Canales de Integración Oficiales
- **WhatsApp Oficial:** `+54 11 2778 9351` (`https://wa.me/5491127789351`)
- **Correo Electrónico:** `monicabridges56@gmail.com`
- **Instagram:** `@monica_bridges26` (`https://instagram.com/monica_bridges26`)
Esto es un cammbio para ver si githau sincroniza.