// ===== HEADER DINÁMICO CON EFECTO DE SCROLL =====

const initDynamicHeader = () => {
    const header = document.getElementById('mainHeader');
    const mainContent = document.querySelector('.main-content');
    
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateHeader = () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
            
            // Efecto adicional: hacer el header más transparente cuando se hace scroll hacia arriba rápidamente
            if (scrollY < lastScrollY - 10) {
                header.style.transform = 'translateY(0)';
            } else if (scrollY > lastScrollY + 10) {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    };
    
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Inicializar estado
    updateHeader();
};

// ===== NAVEGACIÓN MEJORADA CON FLECHAS DESLIZANTES =====

const initNavScroll = () => {
    const navMenu = document.getElementById('navMenu');
    const navArrowLeft = document.getElementById('navArrowLeft');
    const navArrowRight = document.getElementById('navArrowRight');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navMenu || !navArrowLeft || !navArrowRight) return;
    
    let scrollPosition = 0;
    const scrollStep = 150;
    
    // Función para actualizar la visibilidad de las flechas
    const updateArrowVisibility = () => {
        const maxScroll = navMenu.scrollWidth - navContainer.clientWidth;
        
        // Flecha izquierda
        if (scrollPosition <= 0) {
            navArrowLeft.classList.add('disabled');
        } else {
            navArrowLeft.classList.remove('disabled');
        }
        
        // Flecha derecha
        if (scrollPosition >= maxScroll) {
            navArrowRight.classList.add('disabled');
        } else {
            navArrowRight.classList.remove('disabled');
        }
        
        // Ocultar flechas si no hay overflow
        if (navMenu.scrollWidth <= navContainer.clientWidth) {
            navArrowLeft.style.display = 'none';
            navArrowRight.style.display = 'none';
        } else {
            navArrowLeft.style.display = 'flex';
            navArrowRight.style.display = 'flex';
        }
    };
    
    // Función para desplazar el menú
    const scrollMenu = (direction) => {
        const maxScroll = navMenu.scrollWidth - navContainer.clientWidth;
        
        if (direction === 'left') {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
        } else {
            scrollPosition = Math.min(maxScroll, scrollPosition + scrollStep);
        }
        
        navMenu.style.transform = `translateX(-${scrollPosition}px)`;
        updateArrowVisibility();
    };
    
    // Event listeners para las flechas
    navArrowLeft.addEventListener('click', () => scrollMenu('left'));
    navArrowRight.addEventListener('click', () => scrollMenu('right'));
    
    // También permitir desplazamiento con rueda del mouse
    navContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const maxScroll = navMenu.scrollWidth - navContainer.clientWidth;
        
        if (e.deltaY > 0) {
            scrollPosition = Math.min(maxScroll, scrollPosition + scrollStep);
        } else {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
        }
        
        navMenu.style.transform = `translateX(-${scrollPosition}px)`;
        updateArrowVisibility();
    });
    
    // Actualizar visibilidad al cargar y al redimensionar
    window.addEventListener('load', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    
    // Inicializar estado
    updateArrowVisibility();
};

// ===== SCROLL SUAVE MEJORADO CON INDICADOR ACTIVO =====

const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Función para actualizar el enlace activo
    const updateActiveLink = () => {
        let current = '';
        const scrollY = window.pageYOffset + 150; // Offset para activar antes
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Event listeners para scroll suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remover activo de todos los enlaces
                navLinks.forEach(l => l.classList.remove('active'));
                // Agregar activo al enlace clickeado
                link.classList.add('active');
                
                const targetPosition = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
};

// ===== FUNCIONES BÁSICAS DE INTERACTIVIDAD =====

// Botón explorar con efecto
const explorarBtn = document.getElementById('explorarBtn');
if (explorarBtn) {
    explorarBtn.addEventListener('click', () => {
        // Animación de pulso
        explorarBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            explorarBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Desplazamiento suave a la sección de artistas
        const artistasSection = document.getElementById('artistas');
        if (artistasSection) {
            const targetPosition = artistasSection.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== FUNCIONALIDAD ARTISTAS (Mostrar/ocultar detalles) =====

const verMasBtns = document.querySelectorAll('.ver-mas-btn');
const cerrarDetallesBtns = document.querySelectorAll('.cerrar-detalles');

verMasBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const detalles = document.getElementById(targetId);
        
        if (!detalles) return;
        
        // Cerrar todos los detalles abiertos primero
        document.querySelectorAll('.artista-detalles').forEach(detalle => {
            if (detalle !== detalles) {
                detalle.classList.remove('active');
            }
        });
        
        // Abrir/cerrar el detalle actual
        detalles.classList.toggle('active');
    });
});

cerrarDetallesBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const detalles = e.target.closest('.artista-detalles');
        if (detalles) {
            detalles.classList.remove('active');
        }
    });
});

// ===== GALERÍA INTERACTIVA MEJORADA =====

const initGaleria = () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const imageCaption = document.querySelector('.image-caption');
    const captionTitle = document.querySelector('.image-caption h3');
    const captionDescription = document.querySelector('.image-caption p');

    if (!thumbnails.length || !imageCaption) return;

    // Datos de las imágenes para los títulos y descripciones
    const galeriaData = {
        0: {
            titulo: "Popart",
            descripcion: "Composiciones coloridas que exaltan la cultura popular mediante símbolos y contrastes."
        },
        1: {
            titulo: "Autoretrato", 
            descripcion: "Representaciones personales que revelan identidad, emoción y mirada propia."
        },
        2: {
            titulo: "Mural urbano",
            descripcion: "Murales urbanos que llenan la ciudad de expresión y vida."
        },
        3: {
            titulo: "Surrealismo",
            descripcion: "Escenas oníricas que mezclan realidad y fantasía para provocar una percepción distinta."
        },
        4: {
            titulo: "Manga",
            descripcion: "Historias ilustradas que combinan emoción, acción y estética única."
        },
        5: {
            titulo: "Graphic design",
            descripcion: "Creatividad visual que comunica ideas con estilo e impacto."
        }
    };

    // Pre-cargar imágenes para transición suave
    const preloadImages = () => {
        thumbnails.forEach(thumb => {
            const img = new Image();
            img.src = thumb.src;
        });
    };

    // Función para animación de texto con deslizamiento
    const animateCaptionText = (newTitle, newDescription) => {
        if (!captionTitle || !captionDescription) return;
        
        // Animación de salida del texto actual
        captionTitle.style.transform = 'translateX(-20px)';
        captionTitle.style.opacity = '0';
        
        captionDescription.style.transform = 'translateX(-20px)';
        captionDescription.style.opacity = '0';
        
        setTimeout(() => {
            // Cambiar el texto
            captionTitle.textContent = newTitle;
            captionDescription.textContent = newDescription;
            
            // Animación de entrada del nuevo texto
            captionTitle.style.transform = 'translateX(0)';
            captionTitle.style.opacity = '1';
            
            captionDescription.style.transform = 'translateX(0)';
            captionDescription.style.opacity = '1';
        }, 300);
    };

    // Crear elementos de imagen para transición suave
    const crearImagenesTransicion = () => {
        const galeriaMain = document.querySelector('.galeria-main');
        const oldImg = document.getElementById('imagenPrincipal');
        
        if (!galeriaMain || !oldImg) return null;
        
        // Crear contenedor para imágenes de transición
        const imagenesContainer = document.createElement('div');
        imagenesContainer.className = 'imagenes-transicion-container';
        imagenesContainer.style.position = 'relative';
        imagenesContainer.style.height = '300px';
        
        // Crear imagen principal activa
        const imgActive = document.createElement('img');
        imgActive.src = thumbnails[0].src;
        imgActive.alt = "Imagen activa galería";
        imgActive.className = 'active';
        imagenesContainer.appendChild(imgActive);
        
        // Reemplazar la imagen principal por el contenedor
        galeriaMain.replaceChild(imagenesContainer, oldImg);
        
        return imagenesContainer;
    };

    // Inicializar galería con transición suave
    const initGaleriaSuave = () => {
        const contenedorImagenes = crearImagenesTransicion();
        if (!contenedorImagenes) return;
        
        let imagenActiva = contenedorImagenes.querySelector('.active');
        
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                // Remover clase active de todas las miniaturas
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Agregar clase active a la miniatura clickeada
                thumb.classList.add('active');
                
                // Crear nueva imagen para transición
                const nuevaImagen = document.createElement('img');
                nuevaImagen.src = thumb.src;
                nuevaImagen.alt = thumb.alt;
                nuevaImagen.style.opacity = '0';
                nuevaImagen.style.transform = 'scale(1.02)';
                
                contenedorImagenes.appendChild(nuevaImagen);
                
                // Pequeño delay para asegurar que el navegador procesó el nuevo elemento
                setTimeout(() => {
                    // Transición de entrada de nueva imagen
                    nuevaImagen.style.opacity = '1';
                    nuevaImagen.style.transform = 'scale(1)';
                    
                    // Transición de salida de imagen anterior
                    imagenActiva.style.opacity = '0';
                    imagenActiva.style.transform = 'scale(0.98)';
                    
                    // Animación del texto con deslizamiento
                    const data = galeriaData[index];
                    animateCaptionText(data.titulo, data.descripcion);
                    
                    // Remover imagen anterior después de la transición
                    setTimeout(() => {
                        if (imagenActiva.parentNode) {
                            imagenActiva.parentNode.removeChild(imagenActiva);
                        }
                        imagenActiva = nuevaImagen;
                        imagenActiva.classList.add('active');
                    }, 500);
                }, 10);
            });
        });
        
        return contenedorImagenes;
    };

    // Carrusel automático mejorado para la galería
    let currentImageIndex = 0;
    let carouselInterval;

    const startCarousel = () => {
        carouselInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
            
            // Simular click en la miniatura correspondiente
            const event = new Event('click');
            thumbnails[currentImageIndex].dispatchEvent(event);
        }, 6000); // 6 segundos entre cambios
    };

    // Pausar carrusel al interactuar con la galería
    const pausarCarrusel = () => {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    };

    const reanudarCarrusel = () => {
        pausarCarrusel();
        setTimeout(startCarousel, 12000); // Reanudar después de 12 segundos
    };

    // Agregar event listeners para pausar/reanudar
    thumbnails.forEach(thumb => {
        thumb.addEventListener('mouseenter', pausarCarrusel);
        thumb.addEventListener('click', pausarCarrusel);
        thumb.addEventListener('mouseleave', reanudarCarrusel);
    });

    // Inicializar galería
    const contenedor = initGaleriaSuave();
    
    // Pre-cargar imágenes y iniciar carrusel
    window.addEventListener('load', () => {
        preloadImages();
        setTimeout(startCarousel, 3000);
    });
};

// ===== MODAL DE EVENTOS =====

const initEventosModal = () => {
    const eventoDetalleBtns = document.querySelectorAll('.evento-detalle-btn');
    const eventoModal = document.getElementById('eventoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const registroBtn = document.getElementById('registroBtn');

    if (!eventoModal || !modalTitulo || !modalDescripcion) return;

    // Datos de los eventos
    const eventosData = {
        1: {
            titulo: "Festival de Arte Callejero",
            descripcion: "Un evento anual que reúne a los mejores artistas urbanos de la ciudad. Incluye talleres, exposiciones en vivo y competencias de graffiti. No te pierdas esta celebración del arte callejero en la Plaza Central."
        },
        2: {
            titulo: "Batalla de Gallos Urbanos",
            descripcion: "Competencia de freestyle rap donde los mejores MCs de la escena urbana se enfrentan en batallas épicas. Jurado especializado, premios en efectivo y mucha energía urbana en el Centro Cultural."
        },
        3: {
            titulo: 'Exposición "Graffiti con Causa"',
            descripcion: "Exposición que muestra cómo el graffiti puede ser una herramienta de cambio social. Obras de artistas que utilizan el arte urbano para crear conciencia sobre problemas sociales y ambientales."
        }
    };

    eventoDetalleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const eventoId = e.target.getAttribute('data-evento');
            const evento = eventosData[eventoId];
            
            if (!evento) return;
            
            modalTitulo.textContent = evento.titulo;
            modalDescripcion.textContent = evento.descripcion;
            
            eventoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });

    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            eventoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar modal al hacer clic fuera
    eventoModal.addEventListener('click', (e) => {
        if (e.target === eventoModal) {
            eventoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Botón de registro con efecto
    if (registroBtn) {
        registroBtn.addEventListener('click', () => {
            registroBtn.textContent = '¡Registrado!';
            registroBtn.style.background = 'linear-gradient(45deg, var(--accent), var(--blue))';
            
            setTimeout(() => {
                eventoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Restaurar botón después de 2 segundos
                setTimeout(() => {
                    registroBtn.textContent = 'Registrarse';
                    registroBtn.style.background = 'linear-gradient(45deg, var(--highlight), var(--primary))';
                }, 2000);
            }, 1000);
        });
    }
};

// ===== SELECTOR DE TEMA DINÁMICO =====



// ===== ANIMACIONES AL SCROLL =====

const initScrollAnimations = () => {
    // Observador de intersección para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar a elementos que queremos animar
    const animatedElements = document.querySelectorAll('.artista-card, .evento-item, .tendencia-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
};

// ===== FUNCIÓN AVANZADA: PROMESA CON ASYNC/AWAIT =====

// Simulación de carga de datos de artistas desde una API
const cargarArtistas = async () => {
    try {
        // Simulamos una llamada a API con setTimeout
        const respuesta = await new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulamos un 10% de probabilidad de error
                if (Math.random() < 0.1) {
                    reject(new Error('Error al cargar los datos de artistas'));
                } else {
                    resolve({
                        artistas: [
                            { id: 1, nombre: 'ZOE GRAFF', especialidad: 'Muralismo' },
                            { id: 2, nombre: 'MARK TAGS', especialidad: 'Lettering' },
                            { id: 3, nombre: 'LUNA STENCIL', especialidad: 'Stencil Art' },
                            { id: 4, nombre: 'NEO PASTE', especialidad: 'Paste-up' }
                        ]
                    });
                }
            }, 1500);
        });
        
        console.log('Datos de artistas cargados:', respuesta.artistas);
        return respuesta.artistas;
        
    } catch (error) {
        console.error('Error:', error.message);
        // En caso de error, mostrar mensaje al usuario
        mostrarNotificacion('No se pudieron cargar los datos. Intenta nuevamente.', 'error');
        return [];
    }
};

// Función para mostrar notificaciones
const mostrarNotificacion = (mensaje, tipo = 'info') => {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 3000;
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    // Colores según el tipo
    if (tipo === 'error') {
        notificacion.style.background = 'linear-gradient(45deg, #ff0066, #cc0055)';
    } else {
        notificacion.style.background = 'linear-gradient(45deg, var(--primary), var(--highlight))';
    }
    
    document.body.appendChild(notificacion);
    
    // Animación de entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
        notificacion.style.opacity = '1';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        notificacion.style.opacity = '0';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
};

// ===== EFECTO DE PARTICULAS INTERACTIVAS =====

// Crear efecto de partículas al hacer clic
document.addEventListener('click', (e) => {
    crearParticulas(e.clientX, e.clientY);
});

const crearParticulas = (x, y) => {
    const colors = [
        'var(--primary)',
        'var(--secondary)',
        'var(--accent)',
        'var(--highlight)',
        'var(--blue)'
    ];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        // Animación
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        };
        
        animate();
    }
};

// ===== MEJORA DE RENDIMIENTO: Debounce para eventos de scroll =====

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Efecto de parallax suavizado con debounce
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.color-blob');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
}, 10));

// ===== INICIALIZACIÓN GENERAL =====

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initDynamicHeader();
    initNavScroll();
    initSmoothScroll();
    initGaleria();
    initEventosModal();
    initThemeSelector();
    initScrollAnimations();
    
    // Cargar datos de artistas cuando la página esté lista
    window.addEventListener('load', async () => {
        const artistas = await cargarArtistas();
        if (artistas.length > 0) {
            mostrarNotificacion('¡Datos de artistas cargados correctamente!', 'info');
        }
    });
});

// ===== SELECTOR DE TEMA DINÁMICO MEJORADO =====

const initThemeSelector = () => {
    const themeButtons = document.querySelectorAll('.theme-btn');

    themeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const theme = e.target.getAttribute('data-theme');
            
            // Remover todas las clases de tema
            document.body.classList.remove('theme-dark', 'theme-vibrant', 'theme-graffiti');
            
            // Aplicar tema seleccionado
            if (theme !== 'default') {
                document.body.classList.add(`theme-${theme}`);
            }
            
            // Efecto visual en el botón clickeado
            themeButtons.forEach(btn => {
                btn.style.border = '2px solid transparent';
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            e.target.style.border = `2px solid var(--accent)`;
            e.target.style.background = 'var(--primary)';
            
            // Forzar actualización del header
            const header = document.getElementById('mainHeader');
            if (header) {
                header.style.animation = 'none';
                setTimeout(() => {
                    header.style.animation = 'headerSlideDown 0.6s ease-out';
                }, 10);
            }
            
            // Guardar preferencia en localStorage
            localStorage.setItem('preferredTheme', theme);
        });
    });

    // Cargar tema guardado al cargar la página
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        document.body.classList.remove('theme-dark', 'theme-vibrant', 'theme-graffiti');
        if (savedTheme !== 'default') {
            document.body.classList.add(`theme-${savedTheme}`);
        }
        
        // Resaltar botón del tema guardado
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === savedTheme) {
                btn.style.border = `2px solid var(--accent)`;
                btn.style.background = 'var(--primary)';
            }
        });
    }
};