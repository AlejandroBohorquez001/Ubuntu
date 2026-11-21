# PagoClaro

MVP web para registrar gastos y suscripciones con su fecha de pago y mostrar los próximos pagos.

## Estado actual

Es solo la estructura base: una página con título, un formulario (nombre, monto, fecha de pago y frecuencia mensual/anual) y la sección «Próximos pagos». No hay frameworks ni herramientas de compilación.

## Estructura

- `index.html`: página principal y formulario.
- `css/styles.css`: estilos básicos.
- `js/app.js`: guardado en `localStorage` y cálculo de los próximos pagos.
- `AGENTS.md`: notas para futuras sesiones de OpenCode.

## Cómo probarlo

Abre `index.html` en el navegador o sirve la carpeta con un servidor estático:

```sh
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Datos y límites

- Los registros se guardan en `localStorage` bajo la clave `pagoclaro.registros`.
- La primera carga siembra datos de prueba; usa solo datos de prueba.
- No se agregan pagos reales ni conexiones a bancos.
- No hay dependencias, build, tests ni lint configurados.
