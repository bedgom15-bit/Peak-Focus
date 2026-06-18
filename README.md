# Peak Focus — Landing

Página de descarga del APK de **Peak Focus**. HTML/CSS/JS estático, con tema claro/oscuro
y la paleta alpina de la app.

## Estructura

```
index.html        Página principal
styles.css        Estilos + temas claro/oscuro
script.js         Toggle de tema, animaciones, validación del APK
assets/           Icono de la app
peak-focus.apk    (añádelo tú) el APK que se descarga
```

## El APK

El botón de descarga apunta a `peak-focus.apk` en la raíz. Copia tu APK con ese nombre:

```
C:\Utils\Habits\PeakFocus_web\peak-focus.apk
```

Para otro nombre, cambia el `href` de `#downloadBtn` en `index.html`.

> Nota: GitHub limita los archivos a 100 MB. Si el APK es mayor, súbelo a una
> [Release](https://docs.github.com/repositories/releasing-projects-on-github) y apunta
> el botón a la URL del asset.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (p. ej. `peakfocus-web`).
2. Conecta este repo local y haz push:

   ```bash
   git remote add origin https://github.com/<usuario>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

3. En GitHub: **Settings → Pages → Build and deployment**
   - *Source*: `Deploy from a branch`
   - *Branch*: `main` / `/ (root)` → **Save**
4. En 1–2 min estará en `https://<usuario>.github.io/<repo>/`.
