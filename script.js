// ===== FUNCIONES BÁSICAS DE INTERACTIVIDAD =====

// Efecto de scroll suave para el menú horizontal
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Botón explorar con efecto
const explorarBtn = document.getElementById('explorarBtn');
explorarBtn.addEventListener('click', () => {
    // Animación de pulso
    explorarBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        explorarBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Desplazamiento suave a la sección de artistas
    document.getElementById('artistas').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// ===== FUNCIONALIDAD ARTISTAS (Mostrar/ocultar detalles) =====

const verMasBtns = document.querySelectorAll('.ver-mas-btn');
const cerrarDetallesBtns = document.querySelectorAll('.cerrar-detalles');

verMasBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const detalles = document.getElementById(targetId);
        
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
        detalles.classList.remove('active');
    });
});

// ===== GALERÍA INTERACTIVA =====

const thumbnails = document.querySelectorAll('.thumbnail');
const imagenPrincipal = document.getElementById('imagenPrincipal');

// Datos de las imágenes para los títulos y descripciones
const galeriaData = {
    0: {
        titulo: "Popart",
        descripcion: "Símbolo vibrante del arte pop"
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
        descripcion: "Sueños visuales que fusionan lo real con lo imposible"
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

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        // Remover clase active de todas las miniaturas
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Agregar clase active a la miniatura clickeada
        thumb.classList.add('active');
        
        // Cambiar imagen principal con efecto de transición
        imagenPrincipal.style.opacity = '0';
        setTimeout(() => {
            imagenPrincipal.src = thumb.src;
            
            // Actualizar título y descripción
            const data = galeriaData[index];
            document.querySelector('.image-caption h3').textContent = data.titulo;
            document.querySelector('.image-caption p').textContent = data.descripcion;
            
            imagenPrincipal.style.opacity = '1';
        }, 300);
    });
});

// Carrusel automático para la galería
let currentImageIndex = 0;
const startCarousel = () => {
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
        thumbnails[currentImageIndex].click();
    }, 4000);
};

// Iniciar carrusel después de 3 segundos
setTimeout(startCarousel, 3000);

// ===== MODAL DE EVENTOS =====

const eventoDetalleBtns = document.querySelectorAll('.evento-detalle-btn');
const eventoModal = document.getElementById('eventoModal');
const closeModal = document.querySelector('.close-modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescripcion = document.getElementById('modalDescripcion');
const registroBtn = document.getElementById('registroBtn');

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
        
        modalTitulo.textContent = evento.titulo;
        modalDescripcion.textContent = evento.descripcion;
        
        eventoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
});

// Cerrar modal
closeModal.addEventListener('click', () => {
    eventoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera
eventoModal.addEventListener('click', (e) => {
    if (e.target === eventoModal) {
        eventoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Botón de registro con efecto
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

// ===== SELECTOR DE TEMA DINÁMICO =====

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
        themeButtons.forEach(btn => btn.style.border = '2px solid transparent');
        e.target.style.border = `2px solid var(--accent)`;
        
        // Guardar preferencia en localStorage
        localStorage.setItem('preferredTheme', theme);
    });
});

// Cargar tema guardado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
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
            }
        });
    }
});

// ===== ANIMACIONES AL SCROLL =====

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

// Cargar artistas cuando la página esté lista
window.addEventListener('load', async () => {
    const artistas = await cargarArtistas();
    if (artistas.length > 0) {
        mostrarNotificacion('¡Datos de artistas cargados correctamente!', 'info');
    }
});

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