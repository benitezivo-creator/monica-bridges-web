# Guía de Instalación: Google Apps Script para Mónica Bridges

Este script permite que todas las postulaciones enviadas desde el sitio web se guarden automáticamente en una **Hoja de Cálculo de Google Sheets** y que los **archivos de CV (PDF o Word)** se almacenen de forma privada en una carpeta específica de **Google Drive**.

---

### 📋 Pasos para Moni (Configuración en 3 minutos):

1. **Abrir Google Apps Script:**
   - Iniciar sesión con la cuenta oficial (`monicabridges56@gmail.com`) en [script.google.com](https://script.google.com/?authuser=1).
   - Hacer clic en el botón **"+ Nuevo proyecto"** (arriba a la izquierda).

2. **Pegar el código:**
   - Borrar el código que aparece por defecto en el editor.
   - Copiar todo el contenido del archivo `Code.gs` y pegarlo en el editor.
   - Hacer clic en el icono de guardar (**💾 Guardar proyecto**). Puedes renombrar el proyecto a `Reclutamiento Mónica Bridges`.

3. **Publicar el Despliegue:**
   - Hacer clic en el botón azul superior **"Desplegar"** > **"Nuevo despliegue"**.
   - En el engranaje ⚙️ (*Seleccionar tipo*), elegir **"Aplicación web"**.
   - Configurar los campos exactamente así:
     - **Descripción:** `Integración Web Postulaciones`
     - **Ejecutar como:** `Yo (monicabridges56@gmail.com)`
     - **Quién tiene acceso:** `Cualquier persona` *(indispensable para recibir envíos desde la web pública)*.
   - Hacer clic en **"Desplegar"**.

4. **Autorizar Permisos de Google:**
   - Google solicitará autorizar permisos para crear la planilla de Sheets y la carpeta en Drive.
   - Clic en **"Revisar permisos"** > Elegir la cuenta de Moni > Clic en **"Configuración avanzada"** > Clic en **"Ir a Reclutamiento Mónica Bridges (no seguro)"** > Clic en **"Permitir"**.

5. **Copiar la URL Webhook:**
   - Copiar la **URL de la aplicación web** generada (ej: `https://script.google.com/macros/s/AKfycbx.../exec`).

6. **Vincular en el Panel Admin del Sitio:**
   - Ingresar a `admin.html` en el sitio web con el usuario `moni` (clave `moni2026`) o `admin` (clave `super2026`).
   - Hacer clic en **"Conectar Cuenta de Google"** y pegar la URL.
   - ¡Listo! Las postulaciones con CVs adjuntos comenzarán a volcarse automáticamente en tiempo real.
