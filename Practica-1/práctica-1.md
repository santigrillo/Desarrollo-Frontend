# Práctica Unidad 1
## Ejercicio 1: Interactuando personalmente con un servidor Web

Interactuar manualmente con un servidor web utilizando aplicaciones como telnet
(disponible en Windows) o nc (Linux). Conecte con diferentes servidores Web y
solicite recursos, existentes e inexistentes.​

a) Conectar al servidor y al puerto donde escucha (80 por lo general), y luego enviar una solicitud al servidor. Por ejemplo:
​
nc www.google.com 80​
​
GET / HTTP/1.1​
​
(y luego finalizar presionando 2 veces ENTER, para dejar una linea en blanco
y forzar el envío de la petición)

b) Observe la respuesta del servidor Web en pantalla. Compare lo recibido con el resumen del estándar que hay en Wikipedia:
```https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto```

## Ejercicio 2: Actualización y modernización de sitio web antiguo.
Un cliente cuenta con un sitio web funcional, pero desarrollado hace bastante tiempo. Necesita agregarle algo de funcionalidad y quizás renovar su apariencia, pero tiene un presupuesto ajustado. Por ello, no puede afrontar el desarrollo de un nuevo sitio Web, sino que prefiere invertir su presupuesto en ampliar su funcionalidad y mejorar algo su estética.
Para simular esta situación, trabajaremos sobre un repositorio Git desarrollado hace más de una década, desarrollado con Twitter Bootstrap, jQuery y jQuery UI; además de incorporar un puñado de bibliotecas javascript.

```https://github.com/sharno/Bootstrap_Metro_Dashboard```

1)​ Clone el repositorio y evalúe el código recibido. Realicen una apreciación grupal del mismo y sugiera posibles mejoras. Estas pueden ser sobre cualquier área que le parezca adecuada, por ejemplo:
a)​ Actualizar versión de jQuery
b)​ Actualizar versión de Bootstrap
c)​ Actualizar versión de jQuery UI
d)​ Agregar modo nocturno/oscuro, seleccionable a gusto del usuario

2)​ Estime individualmente el costo de desarrollo de las mejoras, y deje registro de dicha estimación.

3)​ Actualice las bibliotecas y frameworks (nombrados en el punto 1), a la versión más nueva que sea posible, sin romper la funcionalidad existente. La premisa es que sea una actualización rápida y poco costosa, que involucre la menor cantidad de cambios posible, pero amplíe la capacidad del sitio de soportar plug-ins nuevos.​

4)​ Basándose en las sugerencias realizadas en el punto 1, agregue al sitio e implemente en index.html, 3 plug-ins compatibles con las nuevas versiones actualizadas. Puede seleccionar los plug-ins desde​
https://www.npmjs.com/search?q=keywords:jquery-plugin​