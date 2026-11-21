# AGENTS.md

## Alcance y restricciones

- MVP **PagoClaro**: HTML, CSS y JavaScript puro. **No agregar frameworks, dependencias ni build**.
- Alcance actual: solo estructura base (título, formulario y sección «Próximos pagos»). No ampliar funcionalidad sin pedirlo.
- **Solo datos de prueba**. No agregar pagos reales ni conexión a bancos.
- Toda la interfaz y el README están en **español**; mantener el idioma.

## Cómo está conectado

- `index.html` carga `css/styles.css` y `js/app.js` (con `defer`). No hay bundler ni módulos.
- `js/app.js` siembra `DATOS_PRUEBA` en `localStorage` la primera vez bajo la clave `pagoclaro.registros`. Si borras esa clave, vuelven los datos de prueba.
- Formato de cada registro: `{ nombre, monto, fechaPago (YYYY-MM-DD), frecuencia: "mensual" | "anual" }`.
- «Próximos pagos» se calcula en el cliente, no se persiste: avanza `fechaPago` hasta la próxima ocurrencia y ordena por fecha.

## Verificación

- No hay `package.json`, tests, lint ni typecheck. No inventar comandos de verificación.
- Probar abriendo `index.html` o con `python3 -m http.server 8000` desde la raíz.
