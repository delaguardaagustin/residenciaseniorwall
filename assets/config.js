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
  visitas: 'de 15:00 a 18:00 horas, avisando antes',   /* horario de visitas de las familias (dato del dueño, 2026-09-30) */
  seremi: false,       /* true SOLO si el cliente confirma su resolución sanitaria vigente */
  fotos: [             /* rutas a fotos REALES de la residencia (assets/...). Vacío = no se muestra la galería */
    /* letrero.jpg NO es foto real (confirmado por el dueño 2026-09-30: es el diseño del letrero que mandaron a hacer).
       Cuando esté instalado, pedir una foto real de la entrada y ponerla aquí. */
  ],
  /* Google Form que recibe las solicitudes (lo crea google/formulario-senior-wall.gs).
     Pegar aquí el CONFIG_WEB que muestra el script: { accion: '...formResponse', campos: {...} }.
     Mientras sea null, el formulario y el chat ofrecen enviar por correo/WhatsApp. */
  googleForm: null,
  testimonios: [       /* solo testimonios reales, con permiso de la familia. Vacío = no se muestra */
    /* { texto: '...', nombre: 'María A.', relacion: 'Hija' }, */
  ]
};
