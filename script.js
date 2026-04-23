document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');

    // Variables del Modal
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Evita que la página se recargue

        // Cambia el texto del botón mientras envía
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Enviando... 🐝";
        submitBtn.disabled = true;

        try {
            // Envío de datos a Formspree mediante AJAX
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Si se envía con éxito, resetea el formulario
                form.reset();

                // Muestra el Modal hermoso
                modal.classList.remove('hidden');
                // Pequeño retraso para que la animación CSS surta efecto
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
            // Restaura el botón
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });

    // Lógica para cerrar el Modal
    closeModalBtn.addEventListener('click', function () {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-90');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Espera a que termine la transición CSS
    });
});