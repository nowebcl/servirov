/* ==========================================================================
   SERVIROV APP ENGINE — INTERACTIVE SPA ROUTER, CANVAS & DYNAMIC ACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. STICKY HEADER & SCROLL TO TOP
    // ==========================================
    const header = document.getElementById('main-header');
    const scrollTopBtn = document.getElementById('btn-scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Header scrolled state
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        if (scrollPos > 400) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navbar.classList.remove('active');
        }
    });


    // ==========================================
    // 3. SPA ROUTER SYSTEM (HASH BASED)
    // ==========================================
    const sections = document.querySelectorAll('.spa-section');
    const headerLinks = document.querySelectorAll('#navbar .nav-link, #main-footer .footer-links a');
    
    function navigateToSection(targetId) {
        // Encontrar sección correspondiente
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Guardar la posición del scroll antes del cambio
        window.scrollTo(0, 0);

        // Desactivar todas las secciones
        sections.forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });

        // Activar la seleccionada con animación
        targetSection.style.display = 'block';
        
        // Timeout sutil para asegurar el reflow de display y activar la transición CSS
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 30);

        // Actualizar estados del Header y Footer Links
        headerLinks.forEach(link => {
            const linkTab = link.getAttribute('data-tab');
            if (linkTab === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Detener reproducción de video si salimos de la página Inicio
        if (targetId !== 'inicio') {
            const video = document.getElementById('ops-video');
            if (video && !video.paused) {
                video.pause();
                document.getElementById('play-pause-btn').innerHTML = '<i class="fa-solid fa-play"></i>';
                document.querySelector('.video-wrapper-glass').classList.remove('playing');
            }
        }
    }

    // Interceptar clicks de navegación interna
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-tab], a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        const tab = link.getAttribute('data-tab');

        if (tab) {
            e.preventDefault();
            window.location.hash = tab;
        } else if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            window.location.hash = href.substring(1);
        }
    });

    // Lógica para el cargado inicial y cambios de hash
    function handleRouting() {
        const hash = window.location.hash.substring(1);
        const validHashes = ['inicio', 'servicios', 'clientes', 'nosotros', 'contacto'];
        
        if (validHashes.includes(hash)) {
            navigateToSection(hash);
        } else {
            // Default a Inicio
            window.location.hash = 'inicio';
            navigateToSection('inicio');
        }
    }

    window.addEventListener('hashchange', handleRouting);
    // Ejecutar al cargar la página
    handleRouting();


    // ==========================================
    // 4. INTERACTIVE WATER BACKDROP CANVAS
    // ==========================================
    const canvas = document.getElementById('water-backdrop');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const maxParticles = 60;
    
    // Mouse coords to create interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class WaterParticle {
        constructor() {
            this.reset();
            // Start at random Y
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 80;
            this.size = Math.random() * 4 + 1; // Bubble / dust size
            this.speedY = -(Math.random() * 0.7 + 0.2); // upward drift
            this.speedX = Math.random() * 0.4 - 0.2; // swaying
            this.amplitude = Math.random() * 1.5 + 0.5;
            this.angle = Math.random() * 100;
            this.alpha = Math.random() * 0.35 + 0.05;
        }

        update() {
            this.y += this.speedY;
            this.angle += 0.01;
            // Wave movement
            this.x += Math.sin(this.angle) * 0.05 * this.amplitude;

            // Interactive response to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const forceX = dx / distance * force * 1.2;
                    this.x += forceX;
                }
            }

            // Recycle if floats out of screen
            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Soft glow for glowing particles
            if (this.size > 3) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#06b6d4';
                ctx.fillStyle = '#22d3ee';
            } else {
                ctx.fillStyle = '#0891b2';
            }
            
            ctx.fill();
            ctx.restore();
        }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new WaterParticle());
    }

    // Background Gradient Wave Lines
    let waveOffset = 0;
    function drawSubmarineWaves() {
        waveOffset += 0.002;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.02)';
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i += 10) {
            // Draw a subtle ocean current line
            const y = canvas.height * 0.4 + Math.sin(i * 0.004 + waveOffset) * 40 + Math.cos(i * 0.002 - waveOffset) * 20;
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 208, 132, 0.015)';
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i += 10) {
            const y = canvas.height * 0.65 + Math.sin(i * 0.003 - waveOffset) * 30 + Math.cos(i * 0.005 + waveOffset) * 15;
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();
    }

    function animateBackdrop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw deep marine radial gradient
        const bgGrad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 200, canvas.width/2, canvas.height/2, canvas.width);
        bgGrad.addColorStop(0, '#061326');
        bgGrad.addColorStop(1, '#020813');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw decorative waves
        drawSubmarineWaves();

        // Draw and update particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateBackdrop);
    }
    animateBackdrop();


    // ==========================================
    // 5. HERO SLIDER LOGIC
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function resetSliderInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5500);
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Dots listeners
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            resetSliderInterval();
        });
    });

    // Start auto transition
    if (slides.length > 0) {
        resetSliderInterval();
    }


    // ==========================================
    // 6. ANIMATED COUNTERS (SCROLL OBSERVATION)
    // ==========================================
    const counterNumbers = document.querySelectorAll('.counter-number');

    function animateCounter(counterEl) {
        const target = parseInt(counterEl.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = 16; // ~60fps
        const steps = Math.ceil(duration / stepTime);
        const increment = target / steps;
        
        let current = 0;
        let stepCount = 0;

        const timer = setInterval(() => {
            stepCount++;
            current += increment;
            
            if (stepCount >= steps) {
                clearInterval(timer);
                counterEl.textContent = target.toLocaleString('es-CL');
            } else {
                counterEl.textContent = Math.floor(current).toLocaleString('es-CL');
            }
        }, stepTime);
    }

    // Setup intersection observer
    const countersObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Unobserve after animation triggered
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    counterNumbers.forEach(counter => {
        countersObserver.observe(counter);
    });


    // ==========================================
    // 7. SUBMARINE CUSTOM VIDEO CONTROLS
    // ==========================================
    const opsVideo = document.getElementById('ops-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const videoTimeDisplay = document.getElementById('video-time-display');
    const videoWrapper = document.querySelector('.video-wrapper-glass');

    if (opsVideo) {
        function togglePlay() {
            if (opsVideo.paused) {
                opsVideo.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                videoWrapper.classList.add('playing');
            } else {
                opsVideo.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                videoWrapper.classList.remove('playing');
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        opsVideo.addEventListener('click', togglePlay);

        opsVideo.addEventListener('timeupdate', () => {
            const minutes = Math.floor(opsVideo.currentTime / 60);
            const seconds = Math.floor(opsVideo.currentTime % 60);
            const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            videoTimeDisplay.textContent = formattedTime;
        });

        // Reset state when video ends
        opsVideo.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            videoWrapper.classList.remove('playing');
            opsVideo.currentTime = 0;
        });
    }


    // ==========================================
    // 8. DYNAMIC SERVICES DETAIL MODAL
    // ==========================================
    // 8. DYNAMIC SERVICES DETAIL MODAL (PRESENTACIÓN 2026)
    // ==========================================
    const serviceDetails = {
        // SERVICIOS GENERALES (Slide 5)
        robotica_general: {
            title: "Servicio de Robótica Submarina",
            icon: "fa-robot",
            tag: "Servicios Generales",
            image: "assets/service-robotica-submarina.jpg",
            description: "Servicio integral de robótica submarina aplicada a la industria salmonera y empresas públicas y privadas. Operamos con vehículos submarinos de control remoto (ROV) equipados con sensores y óptica de última generación para misiones de alta exigencia.",
            features: [
                "Filmación e inspección submarina en ultra alta definición (FHD / 4K).",
                "Monitoreo de estructuras sumergidas en condiciones ambientales complejas.",
                "Inspección de tuberías, emisarios submarinos y colectores.",
                "Reducción total de riesgos para el personal humano mediante tecnología no tripulada.",
                "Informes y reportes audiovisuales georreferenciados para auditorías."
            ]
        },
        arriendo_capacitacion: {
            title: "Arriendo de Equipos R.O.V y Capacitaciones",
            icon: "fa-graduation-cap",
            tag: "Servicios Generales",
            image: "assets/service-arriendo-capacitacion.jpg",
            description: "Servicio de arriendo de equipos R.O.V a empresas públicas y privadas con prestaciones técnicas completas. Paralelamente, impartimos especialización técnica a través de cursos y talleres de robótica submarina para perfeccionar a operadores del sector.",
            features: [
                "Flota de ROVs Deep Trekker (DTG2 y DTG3) y BlueROV listos para despliegue.",
                "Modalidad de arriendo flexible con o sin técnico de soporte en terreno.",
                "Cursos certificados de robótica submarina en conjunto con organismos y empresas.",
                "Más de 10 talleres técnicos realizados con éxito a usuarios e instituciones.",
                "Inducción práctica y metodologías de pilotaje seguro en centros de cultivo."
            ]
        },
        servicio_tecnico_repuestos: {
            title: "Servicio Técnico y Repuestos",
            icon: "fa-gears",
            tag: "Servicios Generales",
            image: "assets/service-tecnico-repuestos.jpg",
            description: "Contamos con taller propio y servicio técnico especializado en robótica, electrónica y venta de repuestos originales para equipos R.O.V Deep Trekker Modelo DTG3 y DTG2, así como plataformas BlueROV.",
            features: [
                "Laboratorio de pruebas electrónicas y banco de presurización.",
                "Venta de componentes críticos: thrusters, tether, conectores y domos.",
                "Mantenimiento preventivo programado para evitar paralizaciones en faena.",
                "Soporte técnico directo con ingenieros en Puerto Montt y Hornopirén.",
                "Garantía de calidad en cada intervención y repuesto suministrado."
            ]
        },

        // SERVICIOS APLICADOS A LA INDUSTRIA SALMONERA (Slide 6)
        extraccion_mortalidad: {
            title: "Extracción Mortalidad e Inspección de Redes",
            icon: "fa-fish-fins",
            tag: "Servicios Aplicados",
            image: "assets/service-extraccion-mortalidad.jpg",
            description: "Equipo técnico altamente especializado en la extracción de mortalidad con ROV y detección preventiva de roturas, tensiones anómalas o desgastes en redes peceras y loberas en centros de engorda.",
            features: [
                "Extracción expedita de mortalidad para mantener la bioseguridad sanitaria.",
                "Detección milimétrica de roturas para evitar pérdidas de biomasa o escapes.",
                "Inspección de fondo de redes peceras y loberas con grabación continua.",
                "Historial de operación desde 2018 sin días de falla en centros Camanchaca, Aysén y Mowi.",
                "Reportes diarios con entrega inmediata de registro en video."
            ]
        },
        inspeccion_fondeos: {
            title: "Inspección de Fondeos y Fondo Marino",
            icon: "fa-anchor",
            tag: "Servicios Aplicados",
            image: "assets/service-inspeccion-fondeos.jpg",
            description: "Verificación y certificación integral de sistemas de fondeo, líneas, grilletes y boyantes. Realizamos grabaciones del fondo marino para caracterización ecológica, detección de presencia de alimento y búsqueda de restos náufragos.",
            features: [
                "Inspección y certificación técnica de líneas de fondeo, anclas y muertos.",
                "Filmaciones de fondo marino de alta definición para monitoreo ambiental.",
                "Evaluación visual de presencia de alimento no consumido en el lecho marino.",
                "Localización y diagnóstico de restos náufragos y pertrechos sumergidos.",
                "Respaldo audiovisual para cumplimiento de normativa Sernapesca y Directemar."
            ]
        },
        reparacion_redes: {
            title: "Reparación de Redes y Apoyo en Cosecha",
            icon: "fa-toolbox",
            tag: "Servicios Aplicados",
            image: "assets/service-reparacion-redes.jpg",
            description: "Contamos con equipos para la reparación ágil de redes loberas que puedan comprometer la pérdida de biomasa. Asimismo, disponemos de personal de apoyo técnico in situ en cosechas para la inspección y verificación inmediata de la red.",
            features: [
                "Tecnología Grabber para sujeción y costura rápida de mallas bajo el agua.",
                "Respuesta de emergencia para sellar aperturas antes de fugas de peces.",
                "Acompañamiento técnico durante maniobras críticas de cosecha y enmallado.",
                "Supervisión subacuática en tiempo real de la tensión del copo de cosecha.",
                "Mitigación de riesgos operacionales y protección activa del activo biológico."
            ]
        },

        // TALLER TÉCNICO ESPECIALIZADO (Slide 7)
        identificacion_fallas: {
            title: "Identificación y Diagnóstico de Fallas",
            icon: "fa-magnifying-glass-chart",
            tag: "Taller Técnico Especializado",
            image: "assets/service-identificacion-fallas.jpg",
            description: "Equipo técnico especializado en la búsqueda, detección y diagnóstico certero de las fallas más comunes y anomalías complejas en Equipos Deep Trekker y BlueROV.",
            features: [
                "Diagnóstico computarizado de tarjetas lógicas, sensores y telemetría.",
                "Pruebas de estanqueidad y presurización para descartar filtraciones.",
                "Análisis de continuidad y atenuación de señal en carretes y umbilicales.",
                "Evaluación del rendimiento y consumo de amperaje de motores thruster.",
                "Informe técnico previo con presupuesto transparente y detallado."
            ]
        },
        reparacion_multimarca: {
            title: "Reparación Multimarca de Equipos ROV",
            icon: "fa-wrench",
            tag: "Taller Técnico Especializado",
            image: "assets/service-reparacion-multimarca.jpg",
            description: "Contamos con técnicos de amplia experiencia en la reparación integral de equipos marca Deep Trekker (Modelos DTG2 y DTG3) y marca BlueROV (configuración 6 thruster).",
            features: [
                "Reemplazo y calibración de propulsores y controladores de velocidad ESC.",
                "Cambio de cúpulas ópticas, sellos O-ring y componentes estructurales.",
                "Reparación de umbilicales, empalmes estancos y terminaciones subacuáticas.",
                "Ajuste y configuración de módulos de cámara HD, inclinación y luces LED.",
                "Pruebas dinámicas en estanque antes de la entrega final del equipo."
            ]
        },
        stock_repuestos: {
            title: "Stock Permanente de Repuestos",
            icon: "fa-boxes-stacked",
            tag: "Taller Técnico Especializado",
            image: "assets/service-stock-repuestos.jpg",
            description: "Mantenemos un stock de repuestos específicos para la reparación oportuna de las fallas más comunes, ya sea en ROV, controlador o carretes, minimizando los tiempos de inactividad de su operación.",
            features: [
                "Stock en Puerto Montt para despacho inmediato a centros de cultivo.",
                "Motores thruster, hélices magnéticas y acoples originales.",
                "Cables umbilicales de alta resistencia y conectores IP68 submarinos.",
                "Baterías de litio de alta densidad y cargadores de carga rápida.",
                "Consolas de mando, joysticks, pantallas y módulos receptores."
            ]
        },

        // Aliases para retrocompatibilidad
        robotica: {
            title: "Servicio de Robótica Submarina (ROVs)",
            icon: "fa-robot",
            tag: "Tecnología Avanzada",
            image: "assets/service-robotica-submarina.jpg",
            description: "Servicio integral de robótica submarina aplicada a la industria salmonera y empresas públicas y privadas.",
            features: [
                "Filmaciones submarinas en alta definición (FHD/4K).",
                "Inspección detallada de sistemas de fondeo (líneas, grilletes, anclas).",
                "Inspección periódica de redes loberas y redes peceras.",
                "Soporte inmediato en faenas de extracción de mortalidad acumulada.",
                "Informes operacionales y mapeos batimétricos en formato digital."
            ]
        },
        buceo: {
            title: "Buceo Profesional y Comercial",
            icon: "fa-person-swimming",
            tag: "Capital Humano Certificado",
            image: "https://servirov.cl/wp-content/uploads/2023/07/WhatsApp-Image-2023-06-28-at-1.00.15-PM.jpeg",
            description: "Ofrecemos servicios de buceo comercial altamente capacitados y equipados con tecnología de punta bajo normativa de Directemar.",
            features: [
                "Intervención directa en jaulas acuícolas y sistemas de flotación.",
                "Instalación, costura y reparación de paños de red submarinos.",
                "Limpieza y remoción de biofouling en estructuras flotantes.",
                "Apoyo certificado en faenas de siembra, selección y cosechas.",
                "Rescates de estructuras y apoyo técnico en contingencias críticas."
            ]
        },
        inspeccion: {
            title: "Inspección Técnica y Fondeos",
            icon: "fa-clipboard-list",
            tag: "Control de Calidad",
            image: "assets/service-inspeccion-fondeos.jpg",
            description: "Proveemos análisis exhaustivos del estado de los fondos marinos, certificación de fondeos y grabaciones submarinas.",
            features: [
                "Inspección ecológica de fondos marinos con reportes en video.",
                "Monitoreo biológico preventivo de la columna de agua.",
                "Verificación y certificación de líneas de fondeo y boyantes.",
                "Búsqueda de restos náufragos y detección de pérdidas de alimento.",
                "Auditorías operativas con respaldo audiovisual."
            ]
        }
    };

    const serviceModalOverlay = document.getElementById('service-modal-overlay');
    const modalContent = document.getElementById('modal-content-details');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.btn-service-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-service');
            const data = serviceDetails[key];

            if (data) {
                // Generar contenido dinámico
                modalContent.innerHTML = `
                    <div class="modal-header-visual">
                        <span class="section-tag"><i class="fa-solid ${data.icon}"></i> ${data.tag}</span>
                        <h3 style="margin-bottom: 4px;">${data.title}</h3>
                        <p class="service-card-ref" style="margin-bottom: 16px;"><small><em>*imágenes de referencia*</em></small></p>
                    </div>
                    <div class="modal-body-visual" style="position:relative; border-radius:16px; overflow:hidden; margin-bottom: 24px; border: 1px solid var(--glass-border); aspect-ratio:16/9; max-height:220px;">
                        <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <p class="modal-desc-full">${data.description}</p>
                    <h4 style="font-family:var(--font-headings); font-size:16px; font-weight:600; margin-bottom:12px;"><i class="fa-solid fa-list-check text-accent"></i> Actividades y Alcance Técnico:</h4>
                    <ul class="modal-feature-list" style="margin-bottom: 24px;">
                        ${data.features.map(f => `<li><i class="fa-solid fa-circle-chevron-right"></i> <span>${f}</span></li>`).join('')}
                    </ul>
                    <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px; border-top:1px solid var(--glass-border); padding-top:16px;">
                        <button class="btn-primary" onclick="window.closeModalAndContact('${data.title}')" style="padding:10px 22px; font-size:14px;">
                            <i class="fa-solid fa-paper-plane"></i> Cotizar este Servicio
                        </button>
                    </div>
                `;

                // Mostrar Modal
                serviceModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Detener scroll de fondo
            }
        });
    });

    window.closeModalAndContact = function(serviceTitle) {
        closeModal();
        window.location.hash = 'contacto';
        setTimeout(() => {
            const selectEl = document.getElementById('form-service');
            if (selectEl) {
                for (let i = 0; i < selectEl.options.length; i++) {
                    if (serviceTitle.toLowerCase().includes(selectEl.options[i].text.toLowerCase()) || 
                        selectEl.options[i].text.toLowerCase().includes(serviceTitle.toLowerCase())) {
                        selectEl.selectedIndex = i;
                        break;
                    }
                }
            }
            const msgEl = document.getElementById('form-message');
            if (msgEl && !msgEl.value) {
                msgEl.value = `Hola, me gustaría cotizar información detallada sobre: ${serviceTitle}.`;
            }
        }, 300);
    };

    function closeModal() {
        serviceModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);
    serviceModalOverlay.addEventListener('click', (e) => {
        if (e.target === serviceModalOverlay) closeModal();
    });

    // Soporte Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModalOverlay.classList.contains('active')) {
            closeModal();
        }
    });


    // ==========================================
    // 9. FORM VALIDATOR & FEEDBACK SUCCESS MODAL
    // ==========================================
    const contactForm = document.getElementById('contact-form-element');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackCloseBtn = document.getElementById('btn-feedback-close');

    if (contactForm) {
        
        // Helper to validate email format
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-w\-0-9]+\.)+[a-zA-w]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // Validate form input group
        function validateField(inputEl, condition) {
            const group = inputEl.closest('.form-group-custom');
            if (condition) {
                group.classList.remove('error');
                return true;
            } else {
                group.classList.add('error');
                return false;
            }
        }

        // Real-time input cleaning on type
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group-custom');
                if (input.value.trim() !== "") {
                    group.classList.remove('error');
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name');
            const email = document.getElementById('form-email');
            const phone = document.getElementById('form-phone');
            const message = document.getElementById('form-message');

            const isNameValid = validateField(name, name.value.trim() !== "");
            const isEmailValid = validateField(email, email.value.trim() !== "" && isValidEmail(email.value.trim()));
            const isPhoneValid = validateField(phone, phone.value.trim() !== "");
            const isMsgValid = validateField(message, message.value.trim() !== "");

            // If everything is correct
            if (isNameValid && isEmailValid && isPhoneValid && isMsgValid) {
                const submitBtn = document.getElementById('btn-submit-contact');
                submitBtn.classList.add('loading');

                // Simulate high-performance API delay
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    
                    // Show premium success feedback overlay
                    feedbackModalOverlay.classList.add('active');
                    
                    // Create dynamic celebratory bubbles in canvas directly!
                    triggerSpecialCanvasParticles();

                    // Reset form fields
                    contactForm.reset();
                    contactForm.querySelectorAll('.form-group-custom').forEach(g => g.classList.remove('error'));
                }, 1600);
            }
        });

        feedbackCloseBtn.addEventListener('click', () => {
            feedbackModalOverlay.classList.remove('active');
        });
        
        feedbackModalOverlay.addEventListener('click', (e) => {
            if (e.target === feedbackModalOverlay) {
                feedbackModalOverlay.classList.remove('active');
            }
        });
    }

    // Trigger explosive bubble particles upon success
    function triggerSpecialCanvasParticles() {
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                let specP = new WaterParticle();
                specP.y = canvas.height + 10;
                specP.x = Math.random() * canvas.width;
                specP.speedY = -(Math.random() * 5 + 3); // Faster upward speed
                specP.size = Math.random() * 8 + 3;
                specP.alpha = 0.9;
                particles.push(specP);
            }, i * 20);
        }
        
        // Trim back to original count slowly
        setTimeout(() => {
            if (particles.length > maxParticles) {
                particles.splice(maxParticles);
            }
        }, 5000);
    }
});
