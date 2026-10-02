/* ============================================================
   DATOS DE LA RESIDENCIA — completar cuando el cliente los entregue.
   Todo lo que quede vacío NO se muestra (ni en la página ni en el chat).
   ============================================================ */
window.RESIDENCIA = {
  nombre: 'Residencia Senior Wall',
  correo: 'contacto@residenciaseniorwall.cl',
  telefono: '+56 9 3524 7069',
  whatsapp: '56935247069',   /* mismo número del teléfono, confirmado por Agustín 2026-09-30 */
  direccion: 'Calle 13, sector Ninquihue',
  comuna: 'San Carlos, Ñuble',
  coordenadas: '-36.47720935623818,-72.01696657085974',   /* ubicación exacta (dato del dueño 2026-09-30): mapa y "Cómo llegar" */
  visitas: 'de 15:00 a 18:00 horas, avisando antes',   /* horario de visitas de las familias (dato del dueño, 2026-09-30) */
  seremi: false,       /* true SOLO si el cliente confirma su resolución sanitaria vigente */
  fotos: [             /* rutas a fotos REALES de la residencia (assets/...). Vacío = no se muestra la galería */
    /* letrero.jpg NO es foto real (confirmado por el dueño 2026-09-30: es el diseño del letrero que mandaron a hacer).
       Cuando esté instalado, pedir una foto real de la entrada y ponerla aquí. */
  ],
  /* Google Form que recibe las solicitudes (lo crea google/formulario-senior-wall.gs).
     Pegar aquí el CONFIG_WEB que muestra el script: { accion: '...formResponse', campos: {...} }.
     Mientras sea null, el formulario y el chat ofrecen enviar por correo/WhatsApp. */
  /* Conectado 2026-09-30: formulario creado con la cuenta de Google del dueño (optimizatespa@gmail.com). */
  googleForm: {
    accion: 'https://docs.google.com/forms/d/e/1FAIpQLSf-T8LqrQw80AVSQjrLiLHidUbrGWQmgsJwxNmQr8Bjr7IAog/formResponse',
    campos: { motivo: 'entry.1638080141', nombre: 'entry.195058955', telefono: 'entry.1472152812', relacion: 'entry.1711234204',
      nivel: 'entry.863371195', cuando: 'entry.1577429910', dia: 'entry.955730148', franja: 'entry.1658368083',
      mensaje: 'entry.1027371922', origen: 'entry.842788286' }
  },
  /* Servicios incluidos en la cuota mensual (texto del dueño, presupuesto de ingreso del 01-10-2026).
     SIN precios: el valor depende del grado de dependencia de cada persona (pedido del dueño). */
  servicios: [
    ['Alojamiento y confort', 'Estadía en habitaciones acondicionadas para la seguridad y comodidad del adulto mayor, con uso de espacios comunes cálidos y adaptados.'],
    ['Alimentación clínica y personalizada', 'Servicio de alimentación completo (cuatro tiempos diarios: desayuno, almuerzo, once y cena), elaborado estrictamente bajo minutas diseñadas y supervisadas por una nutricionista. Estas minutas se adaptan de forma personalizada a los requerimientos nutricionales, patologías de base (como diabetes, hipertensión, disfagia o regímenes especiales) y preferencias del residente.'],
    ['Cuidado sociosanitario profesional', 'Supervisión, atención y acompañamiento continuo, a cargo de un equipo multidisciplinario compuesto por Técnicos en Enfermería de Nivel Superior (TENS) y cuidadoras de trato directo.'],
    ['Gestión farmacológica segura', 'Administración rigurosa y oportuna de los medicamentos prescritos por el médico tratante, bajo protocolos estrictos de control de stock y horarios.'],
    ['Estimulación y bienestar integral', 'Programa periódico de actividades recreativas, ocupacionales y de estimulación cognitiva orientadas a mantener la autogestión, la socialización y el bienestar emocional.'],
    ['Asistencia en AVD', 'Apoyo personalizado en las Actividades de la Vida Diaria, incluyendo aseo de confort, higiene personal y movilización.'],
    ['Servicios de apoyo logístico', 'Servicio de lavandería y secado de ropa de uso personal y de cama.']
  ],
  noIncluido: 'atenciones médicas especializadas fuera de la residencia, exámenes de laboratorio o imagenología, medicamentos de alto costo no cubiertos por el plan de salud, pañales u otros insumos de uso personal, y traslados no urgentes',
  testimonios: [       /* solo testimonios reales, con permiso de la familia. Vacío = no se muestra */
    /* { texto: '...', nombre: 'María A.', relacion: 'Hija' }, */
  ]
};
