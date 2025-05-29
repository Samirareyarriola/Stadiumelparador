document.getElementById('reservaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const email = document.getElementById('email').value;
  const cancha = document.getElementById('cancha').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const codigo = Math.random().toString(36).substr(2, 6).toUpperCase();

  const data = {
    nombre,
    whatsapp,
    email,
    cancha,
    fecha,
    hora,
    codigo
  };

  fetch('https://script.google.com/macros/s/AKfycbzPXQdIKL8pMNBJwMcJitVVZB8JkortR7kDtHd0aTQ5R7ZcZY3Qa_wzrKUjQlexLbDZ/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(response => {
    let mensaje = `<strong>¡Reserva realizada!</strong><br><br>
      <strong>Código:</strong> ${codigo}<br>
      <strong>Nombre:</strong> ${nombre}<br>
      <strong>Cancha:</strong> ${cancha}<br>
      <strong>Fecha:</strong> ${fecha}<br>
      <strong>Hora:</strong> ${hora}<br>
      <strong>WhatsApp:</strong> ${whatsapp}<br>`;

    if (email) {
      mensaje += `📩 Te enviamos una copia a: ${email}<br>`;
    } else {
      mensaje += `⚠️ No ingresaste un email. No recibirás confirmación.<br>Por favor guardá tu código de reserva.<br>`;
    }

    mensaje += `<br>⚠️ Recordá que el turno puede suspenderse por clima o fuerza mayor.`;

    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.innerHTML = mensaje;
    confirmationDiv.style.display = 'block';
    confirmationDiv.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('reservaForm').reset();
  })
  .catch(err => {
    alert('Hubo un problema al enviar la reserva. Por favor intentá más tarde.');
    console.error(err);
  });
});
