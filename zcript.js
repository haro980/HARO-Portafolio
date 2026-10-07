// ======================================================
// PORTAFOLIO DE HAROLD SALVADOR
// ANIMACIONES E INTERACTIVIDAD
// ======================================================


// ======================================================
// 1. DESPLAZAMIENTO SUAVE DEL MENÚ
// ======================================================

const enlaces = document.querySelectorAll("header nav a");

enlaces.forEach(function(enlace) {

    enlace.addEventListener("click", function(event) {

        event.preventDefault();

        const id = enlace.getAttribute("href");
        const seccion = document.querySelector(id);

        if (seccion) {

            const inicio = window.scrollY;

            const destino =
                seccion.getBoundingClientRect().top +
                window.scrollY;

            const distancia = destino - inicio;

            let tiempoInicio = null;

            function animarScroll(tiempoActual) {

                if (tiempoInicio === null) {
                    tiempoInicio = tiempoActual;
                }

                const tiempoTranscurrido =
                    tiempoActual - tiempoInicio;

                const duracion = 800;

                let progreso =
                    tiempoTranscurrido / duracion;

                if (progreso > 1) {
                    progreso = 1;
                }

                const suavizado =
                    progreso * (2 - progreso);

                const movimiento =
                    inicio +
                    distancia * suavizado;

                window.scrollTo(0, movimiento);

                if (progreso < 1) {
                    requestAnimationFrame(animarScroll);
                }
            }

            requestAnimationFrame(animarScroll);
        }

    });

});


// ======================================================
// 2. MINI MENÚ DE HABILIDADES
// ======================================================

const habilidades = document.querySelectorAll(".habilidad");

habilidades.forEach(function(habilidad) {

    const icono = habilidad.querySelector("i");
    const nombre = habilidad.querySelector("p");
    const imagen = habilidad.querySelector("img");

    // Información de cada habilidad
    let informacion = "";

    if (nombre) {

        const nombreHabilidad =
            nombre.textContent.trim();

        if (nombreHabilidad === "HTML") {
            informacion =
                "Estructura y organización de páginas web.";
        }

        if (nombreHabilidad === "CSS") {
            informacion =
                "Diseño, estilos, colores y distribución.";
        }

        if (nombreHabilidad === "Git") {
            informacion =
                "Control de versiones y seguimiento de proyectos.";
        }

        if (nombreHabilidad === "GitHub") {
            informacion =
                "Publicación y gestión de proyectos con Git.";
        }
    }


    // --------------------------------------------------
    // Convertir la tarjeta en botón
    // --------------------------------------------------

    habilidad.style.cursor = "pointer";
    habilidad.style.position = "relative";


    // --------------------------------------------------
    // Crear mini menú
    // --------------------------------------------------

    const menu = document.createElement("div");

    menu.style.position = "absolute";
    menu.style.top = "100%";
    menu.style.left = "50%";
    menu.style.transform =
        "translateX(-50%) translateY(-10px)";

    menu.style.width = "220px";
    menu.style.padding = "18px";

    menu.style.backgroundColor =
        "#0f172a";

    menu.style.border =
        "1px solid #8b5cf6";

    menu.style.borderRadius =
        "12px";

    menu.style.boxShadow =
        "0 15px 35px rgba(0, 0, 0, 0.45)";

    menu.style.zIndex = "500";

    menu.style.opacity = "0";

    menu.style.visibility =
        "hidden";

    menu.style.pointerEvents =
        "none";

    menu.style.transition =
        "opacity 0.3s ease, " +
        "transform 0.3s ease";


    // --------------------------------------------------
    // Contenido del menú
    // --------------------------------------------------

    const titulo =
        document.createElement("strong");

    titulo.textContent =
        nombre ? nombre.textContent : "";

    titulo.style.display =
        "block";

    titulo.style.color =
        "#38bdf8";

    titulo.style.fontSize =
        "18px";

    titulo.style.marginBottom =
        "8px";


    const descripcion =
        document.createElement("span");

    descripcion.textContent =
        informacion;

    descripcion.style.display =
        "block";

    descripcion.style.color =
        "#f8fafc";

    descripcion.style.fontSize =
        "14px";

    descripcion.style.lineHeight =
        "1.5";


    menu.appendChild(titulo);
    menu.appendChild(descripcion);

    habilidad.appendChild(menu);


    // --------------------------------------------------
    // CLIC EN LA HABILIDAD
    // --------------------------------------------------

    habilidad.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            // Cerrar otros menús
            habilidades.forEach(
                function(otra) {

                    if (otra !== habilidad) {

                        const otroMenu =
                            otra.querySelector(
                                ".mini-menu-habilidad"
                            );

                    }

                }
            );


            // Comprobar estado
            const abierto =
                menu.style.visibility ===
                "visible";


            if (!abierto) {

                menu.style.opacity =
                    "1";

                menu.style.visibility =
                    "visible";

                menu.style.pointerEvents =
                    "auto";

                menu.style.transform =
                    "translateX(-50%) " +
                    "translateY(10px)";

            } else {

                menu.style.opacity =
                    "0";

                menu.style.visibility =
                    "hidden";

                menu.style.pointerEvents =
                    "none";

                menu.style.transform =
                    "translateX(-50%) " +
                    "translateY(-10px)";
            }

        }
    );

});


// ======================================================
// CERRAR MINI MENÚ AL HACER CLIC FUERA
// ======================================================

document.addEventListener(
    "click",
    function() {

        habilidades.forEach(
            function(habilidad) {

                const menus =
                    habilidad.querySelectorAll(
                        "div"
                    );

                menus.forEach(
                    function(menu) {

                        if (
                            menu.style.position ===
                            "absolute"
                        ) {

                            menu.style.opacity =
                                "0";

                            menu.style.visibility =
                                "hidden";

                            menu.style.pointerEvents =
                                "none";

                        }

                    }
                );

            }
        );

    }
);


// ======================================================
// 3. EFECTO 3D EN LAS TARJETAS DE PROYECTOS
// ======================================================

const proyectos =
    document.querySelectorAll(".proyecto-card");

proyectos.forEach(function(proyecto) {

    proyecto.style.transition =
        "transform 0.15s ease, " +
        "box-shadow 0.3s ease, " +
        "opacity 0.3s ease";


    proyecto.addEventListener("mouseenter", function() {

        proyecto.style.zIndex = "100";

        proyecto.style.boxShadow =
            "0 25px 45px rgba(0, 0, 0, 0.45)";

    });


    proyecto.addEventListener("mousemove", function(event) {

        const rect =
            proyecto.getBoundingClientRect();

        const centroX =
            rect.left + rect.width / 2;

        const centroY =
            rect.top + rect.height / 2;

        const posicionX =
            event.clientX - centroX;

        const posicionY =
            event.clientY - centroY;

        const rotacionY =
            posicionX / 15;

        const rotacionX =
            posicionY / 15;


        proyecto.style.transform =
            "perspective(800px) " +
            "rotateX(" + (-rotacionX) + "deg) " +
            "rotateY(" + rotacionY + "deg) " +
            "translateY(-15px) " +
            "scale(1.05)";

    });


    proyecto.addEventListener("mouseleave", function() {

        proyecto.style.transform =
            "perspective(800px) " +
            "rotateX(0deg) " +
            "rotateY(0deg) " +
            "translateY(0) " +
            "scale(1)";

        proyecto.style.boxShadow =
            "none";

        setTimeout(function() {

            proyecto.style.zIndex = "1";

        }, 300);

    });

});


// ======================================================
// 4. EFECTO MAGNÉTICO EN LOS BOTONES DE CONTACTO
// ======================================================

const botonesContacto =
    document.querySelectorAll(".contacto-links a");

botonesContacto.forEach(function(boton) {

    boton.addEventListener("mousemove", function(event) {

        const rect =
            boton.getBoundingClientRect();

        const centroX =
            rect.left + rect.width / 2;

        const centroY =
            rect.top + rect.height / 2;

        const movimientoX =
            (event.clientX - centroX) * 0.2;

        const movimientoY =
            (event.clientY - centroY) * 0.2;

        boton.style.transform =
            "translate(" +
            movimientoX +
            "px, " +
            movimientoY +
            "px) scale(1.05)";

    });

    boton.addEventListener("mouseleave", function() {

        boton.style.transform =
            "translate(0, 0) scale(1)";

    });

});


// ======================================================
// 5. BOTÓN VOLVER ARRIBA
// ======================================================

const botonArriba =
    document.createElement("button");

botonArriba.textContent = "↑";

botonArriba.style.position = "fixed";
botonArriba.style.bottom = "30px";
botonArriba.style.right = "30px";
botonArriba.style.width = "50px";
botonArriba.style.height = "50px";
botonArriba.style.borderRadius = "50%";
botonArriba.style.border = "none";
botonArriba.style.backgroundColor = "#8b5cf6";
botonArriba.style.color = "white";
botonArriba.style.fontSize = "25px";
botonArriba.style.cursor = "pointer";
botonArriba.style.zIndex = "1000";

botonArriba.style.opacity = "0";

botonArriba.style.transform =
    "translateY(20px)";

botonArriba.style.pointerEvents =
    "none";

botonArriba.style.transition =
    "opacity 0.4s ease, " +
    "transform 0.4s ease";

document.body.appendChild(botonArriba);


window.addEventListener("scroll", function() {

    if (window.scrollY > 400) {

        botonArriba.style.opacity = "1";

        botonArriba.style.transform =
            "translateY(0)";

        botonArriba.style.pointerEvents =
            "auto";

    } else {

        botonArriba.style.opacity = "0";

        botonArriba.style.transform =
            "translateY(20px)";

        botonArriba.style.pointerEvents =
            "none";

    }

});


botonArriba.addEventListener("click", function() {

    const inicio =
        window.scrollY;

    const duracion =
        800;

    let tiempoInicio = null;


    function subir(tiempoActual) {

        if (tiempoInicio === null) {
            tiempoInicio = tiempoActual;
        }

        const progreso =
            Math.min(
                (tiempoActual - tiempoInicio) /
                duracion,
                1
            );

        const suavizado =
            progreso * (2 - progreso);

        const posicion =
            inicio * (1 - suavizado);

        window.scrollTo(
            0,
            posicion
        );

        if (progreso < 1) {

            requestAnimationFrame(subir);

        }

    }

    requestAnimationFrame(subir);

});


// ======================================================
// 6. PARTÍCULA GEOMÉTRICA QUE SIGUE AL MOUSE
// ======================================================

const particula =
    document.createElement("div");

particula.style.position =
    "fixed";

particula.style.width =
    "18px";

particula.style.height =
    "18px";

particula.style.backgroundColor =
    "#8b5cf6";

particula.style.pointerEvents =
    "none";

particula.style.zIndex =
    "999";

particula.style.transform =
    "translate(-50%, -50%) rotate(45deg)";

particula.style.transition =
    "width 0.2s ease, " +
    "height 0.2s ease";

document.body.appendChild(particula);


let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let particulaX =
    mouseX;

let particulaY =
    mouseY;

let rotacion =
    45;


document.addEventListener(
    "mousemove",
    function(event) {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function moverParticula() {

    particulaX +=
        (mouseX - particulaX) *
        0.25;

    particulaY +=
        (mouseY - particulaY) *
        0.25;

    rotacion += 6;

    particula.style.left =
        particulaX + "px";

    particula.style.top =
        particulaY + "px";

    particula.style.transform =
        "translate(-50%, -50%) " +
        "rotate(" +
        rotacion +
        "deg)";

    requestAnimationFrame(
        moverParticula
    );

}

moverParticula();


// ======================================================
// 7. BARRA DESLIZANTE DEL MENÚ
// ======================================================

const enlacesMenu =
    document.querySelectorAll("header nav a");

const barraMenu =
    document.createElement("div");

barraMenu.style.position =
    "fixed";

barraMenu.style.height =
    "3px";

barraMenu.style.backgroundColor =
    "#38bdf8";

barraMenu.style.borderRadius =
    "5px";

barraMenu.style.pointerEvents =
    "none";

barraMenu.style.zIndex =
    "9999";

barraMenu.style.transition =
    "left 0.35s ease, " +
    "width 0.35s ease";

barraMenu.style.opacity =
    "0";

document.body.appendChild(
    barraMenu
);


enlacesMenu.forEach(function(enlace) {

    enlace.addEventListener(
        "mouseenter",
        function() {

            const rect =
                enlace.getBoundingClientRect();

            barraMenu.style.left =
                rect.left + "px";

            barraMenu.style.top =
                (rect.bottom + 6) + "px";

            barraMenu.style.width =
                rect.width + "px";

            barraMenu.style.opacity =
                "1";

        }
    );

});


// ======================================================
// 8. SECCIÓN ACTIVA DEL MENÚ
// ======================================================

const seccionesMenu = [];


enlacesMenu.forEach(function(enlace) {

    const id =
        enlace.getAttribute("href");

    const seccion =
        document.querySelector(id);

    if (seccion) {

        seccionesMenu.push({

            enlace: enlace,

            seccion: seccion

        });

    }

});


window.addEventListener(
    "scroll",
    function() {

        let seccionActual =
            null;


        seccionesMenu.forEach(
            function(item) {

                const posicion =
                    item.seccion
                    .getBoundingClientRect();


                if (
                    posicion.top <= 180
                ) {

                    seccionActual =
                        item;

                }

            }
        );


        seccionesMenu.forEach(
            function(item) {

                item.enlace.style.transition =
                    "color 0.3s ease";


                if (
                    item ===
                    seccionActual
                ) {

                    item.enlace.style.color =
                        "#8b5cf6";

                } else {

                    item.enlace.style.color =
                        "white";

                }

            }
        );

    }
);


// ======================================================
// 9. BARRA DE PROGRESO DE LECTURA
// ======================================================

const barraProgreso =
    document.createElement("div");

barraProgreso.style.position =
    "fixed";

barraProgreso.style.top =
    "0";

barraProgreso.style.left =
    "0";

barraProgreso.style.height =
    "4px";

barraProgreso.style.width =
    "0%";

barraProgreso.style.backgroundColor =
    "#38bdf8";

barraProgreso.style.zIndex =
    "10000";

barraProgreso.style.transition =
    "width 0.05s linear";

document.body.appendChild(
    barraProgreso
);


window.addEventListener(
    "scroll",
    function() {

        const alturaPagina =
            document.documentElement
            .scrollHeight -
            window.innerHeight;

        const posicion =
            window.scrollY;


        if (
            alturaPagina > 0
        ) {

            const porcentaje =
                (posicion /
                alturaPagina) *
                100;

            barraProgreso.style.width =
                porcentaje + "%";

        }

    }
);


// ======================================================
// 10. EFECTO DE ENFOQUE EN PROYECTOS
// ======================================================

proyectos.forEach(function(proyecto) {

    proyecto.addEventListener(
        "mouseenter",
        function() {

            proyectos.forEach(
                function(otro) {

                    if (
                        otro !== proyecto
                    ) {

                        otro.style.opacity =
                            "0.45";

                    }

                }
            );

        }
    );


    proyecto.addEventListener(
        "mouseleave",
        function() {

            proyectos.forEach(
                function(otro) {

                    otro.style.opacity =
                        "1";

                }
            );

        }
    );

});


// ======================================================
// 11. ANIMACIÓN DE ENTRADA DE LOS PROYECTOS
// ======================================================

proyectos.forEach(
    function(proyecto, indice) {

        proyecto.style.opacity =
            "0";

        proyecto.style.transform =
            "translateY(50px)";

        proyecto.style.transition =
            "opacity 0.7s ease";

        proyecto.style.transitionDelay =
            (indice * 0.15) + "s";

    }
);


const observadorProyectos =
    new IntersectionObserver(
        function(elementos) {

            elementos.forEach(
                function(elemento) {

                    if (
                        elemento.isIntersecting
                    ) {

                        elemento.target.style.opacity =
                            "1";

                        observadorProyectos
                            .unobserve(
                                elemento.target
                            );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


proyectos.forEach(
    function(proyecto) {

        observadorProyectos.observe(
            proyecto
        );

    }
);


// ======================================================
// 12. EFECTO DE PRESIÓN EN BOTONES DE CONTACTO
// ======================================================

botonesContacto.forEach(
    function(boton) {

        boton.style.transition =
            "transform 0.2s ease, " +
            "box-shadow 0.2s ease";


        boton.addEventListener(
            "mouseenter",
            function() {

                boton.style.transform =
                    "translateY(-5px) " +
                    "scale(1.05)";

                boton.style.boxShadow =
                    "0 10px 20px " +
                    "rgba(0, 0, 0, 0.3)";

            }
        );


        boton.addEventListener(
            "mousedown",
            function() {

                boton.style.transform =
                    "translateY(2px) " +
                    "scale(0.96)";

                boton.style.boxShadow =
                    "0 3px 6px " +
                    "rgba(0, 0, 0, 0.3)";

            }
        );


        boton.addEventListener(
            "mouseup",
            function() {

                boton.style.transform =
                    "translateY(-5px) " +
                    "scale(1.05)";

                boton.style.boxShadow =
                    "0 10px 20px " +
                    "rgba(0, 0, 0, 0.3)";

            }
        );


        boton.addEventListener(
            "mouseleave",
            function() {

                boton.style.transform =
                    "translateY(0) " +
                    "scale(1)";

                boton.style.boxShadow =
                    "none";

            }
        );

    }
);