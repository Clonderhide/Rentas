/**
 * app.js - Lógica principal del Frontend para GOSY
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Menú Móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.contains('hidden');

            if (isExpanded) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('ph-list');
                menuIcon.classList.add('ph-x');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('ph-x');
                menuIcon.classList.add('ph-list');
            }
        });
    }

    // 2. Transición del Navbar al hacer scroll (Para rentas.html vs index.html)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                // Si estamos en la página de index (fondo oscuro)
                if (document.body.classList.contains('bg-dark')) {
                    navbar.classList.add('shadow-lg', 'bg-slate-900/95');
                    navbar.classList.remove('glass-nav');
                } else {
                    // Si estamos en rentas (fondo claro)
                    navbar.classList.add('shadow-md', 'bg-white/95');
                    navbar.classList.remove('bg-white/80', 'border-b');
                }
            } else {
                if (document.body.classList.contains('bg-dark')) {
                    navbar.classList.remove('shadow-lg', 'bg-slate-900/95');
                    navbar.classList.add('glass-nav');
                } else {
                    navbar.classList.remove('shadow-md', 'bg-white/95');
                    navbar.classList.add('bg-white/80', 'border-b');
                }
            }
        });
    }

    // 3. Animación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Cerrar el menú móvil si está abierto
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        if (menuIcon) {
                            menuIcon.classList.remove('ph-x');
                            menuIcon.classList.add('ph-list');
                        }
                    }
                }
            }
        });
    });
});

/**
 * LÓGICA DEL MODAL DE PROPIEDADES (rentas.html)
 */

// Base de datos simulada de propiedades
const propertiesData = {
    'prop1': {
        title: 'Casa habitacional Col Madero',
        location: 'Saltillo Col Francisco & Madero',
        price: '$10,000',
        image: 'imagenes/!.jpeg',
        desc: 'La casa ofrece un espacio cómodo y funcional, con acceso protegido por reja para mayor seguridad. Perfecta para familias o personas que buscan un lugar práctico y accesible para vivir.',
        gallery: [
            'imagenes/!.jpeg',
            'imagenes/1 (7).jpeg',
            'imagenes/1 (9).jpeg',
            'imagenes/1 (10).jpeg',
            'imagenes/1 (11).jpeg',
            'imagenes/1 (13).jpeg',
            'imagenes/1 (15).jpeg'
        ]
    },
    'prop2': {
        title: 'Loft Downtown Skyline',
        location: 'Ciudad de México, CDMX',
        price: '$2,100',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'Moderno loft de doble altura ubicado en el piso 30 de uno de los rascacielos más exclusivos de la ciudad. Disfruta de atardeceres espectaculares desde sus ventanales de piso a techo. El edificio cuenta con amenidades premium que incluyen gimnasio equipado, alberca semiolímpica, áreas de coworking y alta seguridad 24/7.',
        gallery: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80'
        ]
    },
    'prop3': {
        title: 'Refugio del Bosque',
        location: 'Valle de Bravo, Edomex',
        price: '$3,200',
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'Diseño arquitectónico galardonado inmerso en un tupido bosque de pinos. Esta cabaña moderna utiliza materiales locales fusionados con acero y amplios cristales. Cuenta con una terraza gigante, jacuzzi al aire libre, gran chimenea central y un diseño de ventilación cruzada perfecta para un descanso absoluto lejos del estrés citadino.',
        gallery: [
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80'
        ]
    },
    'prop4': {
        title: 'Penthouse Lumina',
        location: 'Polanco, CDMX',
        price: '$5,800',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'La joya de Polanco. Elegante penthouse distribuido en dos niveles, con acabados europeos y domótica de última generación totalmente integrada. El inmueble destaca por su exclusivo Roof Garden privado de 100 m² con asador, barra, sala lounge y jacuzzi. A solo una cuadra de las principales boutiques.',
        gallery: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ]
    },
    'prop5': {
        title: 'Residencia Los Olivos',
        location: 'Juriquilla, Querétaro',
        price: '$1,800',
        image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'Fantástica y funcional casa familiar dentro del campo de golf en un fraccionamiento con estricta seguridad. Destacan sus techos altos, cantera natural y finas maderas. El amplio jardín de 200 m² es el sueño de cualquier familia, con área de juegos infantiles y la posibilidad de construir su propia alberca si así se desea.',
        gallery: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80'
        ]
    },
    'prop6': {
        title: 'Estudio Distrito Arte',
        location: 'Roma Norte, CDMX',
        price: '$1,400',
        image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'Espacio bohemio e iluminado en el corazón de la colonia Roma Norte, rodeado de frondosos árboles y casas de la época del Porfiriato. Un diseño minimalista optimiza cada metro cuadrado de este estudio ideal para nómadas digitales o artistas contemporáneos que buscan inspiración. A pasos de los mejores restaurantes y galerías.',
        gallery: [
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ]
    }
};

// Funciones del Modal
const modal = document.getElementById('property-modal');

// Abre el modal y carga los datos
window.openModal = function (propId) {
    if (!modal) return;

    const prop = propertiesData[propId];
    if (prop) {
        document.getElementById('modal-title').textContent = prop.title;
        document.getElementById('modal-location').innerHTML = `<i class="ph-fill ph-map-pin"></i> ${prop.location}`;
        document.getElementById('modal-price').textContent = prop.price;
        document.getElementById('modal-img').src = prop.image;
        document.getElementById('modal-desc').textContent = prop.desc;

        // Calcular valores simulados
        const numPrice = parseInt(prop.price.replace('$', '').replace(',', ''));
        const annual = (numPrice * 12).toLocaleString();
        document.getElementById('modal-annual').textContent = `$${annual}`;
        document.getElementById('modal-deposit').textContent = prop.price;

        // Guardar el ID de la propiedad activa en el botón de ver fotos
        const viewPhotosBtn = document.getElementById('view-all-photos-btn');
        if (viewPhotosBtn) {
            viewPhotosBtn.setAttribute('data-prop', propId);
        }

        // Mostrar
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    }
}

// Cierra el modal
window.closeModal = function () {
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = ''; // Restaura scroll
}

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            closeGallery();
        } else if (modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    }
});

// Lógica para la Galería de Fotos
const galleryModal = document.getElementById('gallery-modal');

window.openGallery = function () {
    const viewPhotosBtn = document.getElementById('view-all-photos-btn');
    if (!viewPhotosBtn || !galleryModal) return;

    const propId = viewPhotosBtn.getAttribute('data-prop');
    const prop = propertiesData[propId];

    if (prop && prop.gallery) {
        // Establecer título
        document.getElementById('gallery-title').textContent = `Fotos de: ${prop.title}`;

        // Limpiar el grid actual
        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = '';

        // Inyectar imágenes
        prop.gallery.forEach(imgUrl => {
            const wrapper = document.createElement('div');
            wrapper.className = 'break-inside-avoid mb-4 overflow-hidden rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition property-card';

            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = `Foto de ${prop.title}`;
            img.className = 'w-full h-auto object-cover property-img';

            wrapper.appendChild(img);
            grid.appendChild(wrapper);
        });

        // Ocultar modal principal
        modal.classList.add('hidden');
        modal.classList.remove('flex');

        // Mostrar modal de galería
        galleryModal.classList.remove('hidden');
        galleryModal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Mantener fondo bloqueado
    }
}

window.closeGallery = function () {
    if (!galleryModal) return;

    galleryModal.classList.add('hidden');
    galleryModal.classList.remove('flex');

    // Opcional: Re-abrir el modal principal
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        document.body.style.overflow = '';
    }
}

