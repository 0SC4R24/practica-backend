## DESCRIPCIÓN DEL PROYECTO

    Se desea crear una aplicación para que cualquier comercio registrado pueda subir su
    contenido (fotos, texto, etc) y pueda visualizarse cuando los usuarios busquen por los
    comercios de una ciudad y de una actividad concreta.

## ALCANCE DEL PROYECTO

    Se creará un back-end implementando un API Restful y una base de datos.

## IMPLEMENTACIÓN TÉCNICA

    Para el desarrollo del back-end se utilizará node.js y para la base de datos, puede ser
    relacional o noSQL (está abierto).

## DETALLES

Habrá cuatro tipos de cliente: admins, comercios, usuarios anónimos y usuarios registrados.
El comercio se registrará por un admin enviando, al menos, la siguiente información:

    - Nombre del comercio.
    - CIF
    - Dirección
    - E-mail
    - Teléfono de contacto
  
Una vez registrado, al comercio se le facilitará un token JWT y un Id de página con los cuales podrá subir su contenido:

    - Ciudad
    - Actividad
    - Título
    - Resumen
    - [Textos]
    - [Fotos]
    - Datos no modificables por el comercio:
        - Scoring
        - Número de puntuaciones
        - Reseñas

El usuario puede ser anónimo (consultas) o estar registrado para recibir ofertas de su ciudad:

    - Nombre
    - E-mail
    - Password
    - Edad
    - Ciudad
    - Intereses
    - PermiteRecibirOfertas

## REQUISITOS FUNCIONALES

    1.- Solo un admin puede registrar un comercio, después facilitará el token JWT a este.
    
    2.- El comercio solo podrá subir/actualizar contenido en su propia página y requiere de un
    token JWT para hacerlo. Pero no puede modificar el Scoring, la cantidad de votaciones ni
    las reseñas. El comercio puede darse de baja y borrar su página.
    
    3.- Un usuario anónimo puede consultar los comercios de una ciudad, los comercios de una
    ciudad y de una actividad, (todo ello ordenado, o no, por el scoring de la página). Así como
    también, de un comercio concreto por su identificador.
    
    4.- Cualquier usuario puede registrarse para recibir ofertas de los comercios de su ciudad
    en función de sus intereses si activa el flag permitirRecibirOfertas.
    
    5.- El usuario puede actualizar sus datos (ciudad, intereses y recibirOfertas) si está logado y
    tiene un JWT válido. Puede escribir reseñas en un comercio y también puede darse de baja
    cuando lo desee.
    
    6.- Los comercios pueden consultar los intereses de los usuarios de su ciudad para
    enviarles un correo. Es decir, dada una consulta, reciba los mails de todos los usuarios de
    su ciudad interesados en un tema concreto y que tengan permitirRecibirOfertas a true.
    
    7.- Si hubiese cualquier error de servidor, se enviará un mensaje a Slack de los admins.

## REQUISITOS TÉCNICOS

    1.- Documentación con Swagger para todas las peticiones posibles.

    2.- Pruebas unitarias con JEST.

    3.- Puedes crear los modelos como quieras, simplemente con los validators y matchedData,
    asegúrate que recibes lo que se espera.

    4.- Puedes crear las rutas que consideres necesarias, y lógica adicional, mientras cumplas
    con los requisitos mínimos.

    5.- Se valorarán muy positivamente mejoras funcionales y/o técnicas a las propuestas.

## AUTORES

    - [Oscar Viudez](https://github.com/0SC4R24)
