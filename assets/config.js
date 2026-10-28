/* ============================================================
   DATOS DE LA RESIDENCIA — completar cuando el cliente los entregue.
   Todo lo que quede vacío NO se muestra (ni en la página ni en el chat).
   ============================================================ */
window.RESIDENCIA = {
  nombre: 'Residencia Senior Wall',
  correo: 'contacto@residenciaseniorwall.cl',
  telefono: '+56 9 3524 7069',
  whatsapp: '56935247069',   /* mismo número del teléfono, confirmado por Agustín 2026-09-30 */
  direccion: 'Calle 13, 4890 · Ninquihue',   /* dirección exacta (dato del dueño, 07-10-2026) */
  comuna: 'San Carlos, Ñuble',
  coordenadas: '-36.47720935623818,-72.01696657085974',   /* ubicación exacta (dato del dueño 2026-09-30): mapa y "Cómo llegar" */
  visitas: 'cuando lo deseen, hasta las 18:00 horas',   /* visitas libres hasta las 18:00 (texto del dueño, 27-10-2026; antes 15:00 a 18:00 avisando) */
  seremi: false,       /* true SOLO si el cliente confirma su resolución sanitaria vigente */
  fotos: [             /* fotos REALES de la residencia que mandó el dueño el 27-10-2026 (assets/fotos/) */
    { src: 'assets/fotos/patio-atardecer.jpg', texto: 'El patio interior al atardecer' },
    { src: 'assets/fotos/casa-jardin.jpg', texto: 'La casa y su jardín' },
    { src: 'assets/fotos/living-chimenea.jpg', texto: 'El living, con chimenea' },
    { src: 'assets/fotos/living-comedor.jpg', texto: 'Living y comedor' },
    { src: 'assets/fotos/habitacion.jpg', texto: 'Habitación individual' },
    { src: 'assets/fotos/habitacion-doble.jpg', texto: 'Habitación compartida' },
    { src: 'assets/fotos/habitacion-cama-clinica.jpg', texto: 'Habitación con cama clínica' },
    { src: 'assets/fotos/corredor-exterior.jpg', texto: 'El corredor techado, mirando al jardín' },
    { src: 'assets/fotos/sala-estar.jpg', texto: 'Sala de estar' },
    { src: 'assets/fotos/ventanal.jpg', texto: 'Ventanales hacia el campo' },
    { src: 'assets/fotos/pasillo.jpg', texto: 'Pasillos amplios y con pasamanos' },
    { src: 'assets/fotos/jardin.jpg', texto: 'Áreas verdes' },
    { src: 'assets/fotos/casa-atardecer.jpg', texto: 'La residencia al atardecer' },
    { src: 'assets/fotos/entrada.jpg', texto: 'El camino de entrada' }
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
  /* Sistema interno de la residencia: recibe las solicitudes de VISITA con día, para que aparezcan en el panel
     (sección Visitas, «Por confirmar · página web»). La clave es la pública del sistema (va en el navegador por
     diseño); solo permite llamar a la función que anota la visita. Si se borra este bloque, la página sigue
     enviando al formulario de Google como siempre. */
  sistema: { url: 'https://duddjsqepfvlhsmehnqf.supabase.co', clave: 'sb_publishable_yqWSGQPUZ1t4fBDRyDvZMA_Dly1nr49' },
  /* Servicios incluidos en la cuota mensual (texto del dueño, 27-10-2026; reemplaza al del 01-10).
     SIN precios: el valor depende del grado de dependencia de cada persona (pedido del dueño). */
  servicios: [
    ['Alojamiento y confort', 'Estadía en habitaciones acondicionadas para la seguridad y comodidad del adulto mayor, con acceso a espacios comunes cálidos y adaptados.'],
    ['Alimentación clínica y personalizada', '4 comidas diarias (desayuno, almuerzo, once y cena), diseñadas y supervisadas por nutricionista, adaptadas a patologías (diabetes, hipertensión, disfagia, regímenes especiales) y preferencias.'],
    ['Cuidado sociosanitario continuo', 'Atención, supervisión y acompañamiento 24/7 a cargo de Técnicos en Enfermería de Nivel Superior (TENS) y cuidadoras de trato directo.'],
    ['Gestión farmacológica segura', 'Administración estricta y oportuna de los medicamentos prescritos, con riguroso control de horarios y stock.'],
    ['Asistencia en AVD', 'Apoyo personalizado en actividades de la vida diaria (higiene, aseo de confort y movilización).'],
    ['Estimulación y bienestar integral', 'Talleres y actividades recreativas, ocupacionales y de estimulación cognitiva.'],
    ['Apoyo logístico', 'Servicio de lavandería y secado de ropa personal y de cama.']
  ],
  /* Atención médica y fármacos (texto del dueño, 27-10-2026). */
  atencionMedica: 'La familia puede optar por continuar con su médico tratante particular o inscribir al residente en el CESFAM de la comuna. Mediante el consultorio se coordinan sus controles, entrega de medicamentos y alimentación complementaria. Además, en caso de personas en situación de dependencia severa o postración, gestionamos la atención domiciliaria mediante el programa de postrados para visitas de especialistas en la misma residencia.',
  noIncluido: 'atenciones médicas especializadas fuera de la residencia, exámenes de laboratorio o imagenología, medicamentos de alto costo no cubiertos por el plan de salud, pañales u otros insumos de uso personal, y traslados no urgentes',
  testimonios: [       /* solo testimonios reales, con permiso de la familia. Vacío = no se muestra */
    /* { texto: '...', nombre: 'María A.', relacion: 'Hija' }, */
  ]
};
