document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------
       1. PANTALLA DE BIENVENIDA Y REPRODUCCIÓN DE VIDEO
    ------------------------------------------------------ */
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const startBtn = document.getElementById('startBtn');
    const mainVideo = document.getElementById('mainVideo');

    const audioBtn = document.getElementById('audioBtn');
    const audioIcon = document.getElementById('audioIcon');
    const audioText = document.getElementById('audioText');

    startBtn.addEventListener('click', function () {
        mainVideo.muted = false;
        mainVideo.play().catch(function (error) {
            console.log("El navegador bloqueó la reproducción:", error);
        });

        welcomeOverlay.classList.add('opacity-0');
        setTimeout(() => {
            welcomeOverlay.classList.add('hidden');
        }, 700);
    });

    /* ----------------------------------------------------
       2. LÓGICA DEL BOTÓN DE SILENCIAR/DESILENCIAR
    ------------------------------------------------------ */
    audioBtn.addEventListener('click', function () {
        if (mainVideo.muted) {
            mainVideo.muted = false;
            audioIcon.innerText = "🔊";
            if (audioText) audioText.innerText = "Silenciar";
        } else {
            mainVideo.muted = true;
            audioIcon.innerText = "🔇";
            if (audioText) audioText.innerText = "Activar Sonido";
        }
    });

    /* ----------------------------------------------------
       3. SISTEMA DE ANIMACIONES (IntersectionObserver)
    ------------------------------------------------------ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    /* ----------------------------------------------------
       4. FORMULARIO AJAX Y MODAL DE CONFIRMACIÓN
    ------------------------------------------------------ */
    const form = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = "Enviando... 🐝";
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modalContent.classList.remove('scale-90');
                    modalContent.classList.add('scale-100');
                }, 10);
            } else {
                alert("Uy! Hubo un problema al enviar. Intenta de nuevo.");
            }
        } catch (error) {
            alert("Error de conexión. Revisa tu internet.");
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });

    closeModalBtn.addEventListener('click', function () {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-90');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    });
});