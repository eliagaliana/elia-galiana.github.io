const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("btn-submit");
const botones = document.querySelectorAll(".btn-filtro");
const proyectos = document.querySelectorAll(".artProyecto");

botones.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const botonActivo = document.querySelector(".btn-filtro.selec");
    if (botonActivo) {
      botonActivo.classList.replace("selec", "selecsin");
    }
    e.currentTarget.classList.replace("selecsin", "selec");

    const filtro = e.currentTarget.getAttribute("data-filter");

    proyectos.forEach((card) => {
      const categoriaCard = card.getAttribute("data-category");

      if (filtro === "all" || filtro === categoriaCard) {
        card.classList.remove("oculto");
      } else {
        card.classList.add("oculto");
      }
    });
  });
});

async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        form.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="font-size: 2rem;">¡Mensaje Enviado! 🚀</h2>
                <p>Gracias por contactar. Te responderé en menos de 48 horas.</p>
                <button onclick="window.location.href='index.html'" class="btn-submit" style="margin-top: 20px; width: auto;">Volver</button>
            </div>
        `;
      } else {
        status.innerHTML = "Ups! Hubo un problema al enviar el formulario.";
        status.style.display = "block";
        status.style.color = "red";
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar Mensaje";
      }
    })
    .catch((error) => {
      status.innerHTML = "Ups! Hubo un problema de conexión.";
      status.style.display = "block";
      status.style.color = "red";
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Mensaje";
    });
}

form.addEventListener("submit", handleSubmit);
