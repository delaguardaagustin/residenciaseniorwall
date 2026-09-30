(function () {
  'use strict';
  var R = window.RESIDENCIA || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ICO = {
    mail: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 7 9-7"/>',
    tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    wa: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/>',
    pin: '<path d="M12 21s-6-5.2-6-11a6 6 0 0 1 12 0c0 5.8-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>'
  };
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  var lugar = [R.direccion, R.comuna].filter(Boolean).join(', ');
  var telHref = R.telefono ? 'tel:' + R.telefono.replace(/[^\d+]/g, '') : '';
  function waHref(t) { return 'https://wa.me/' + R.whatsapp + '?text=' + encodeURIComponent(t); }
  function mailHref(asunto, cuerpo) { return 'mailto:' + R.correo + '?subject=' + encodeURIComponent(asunto) + (cuerpo ? '&body=' + encodeURIComponent(cuerpo) : ''); }
  var WA_SALUDO = '¡Hola! 👋 Vi la página de *' + R.nombre + '* y me gustaría agendar una visita para conocer la residencia. ¿Qué días tienen disponibles?';
  function mapaHref() { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(R.coordenadas || (R.nombre + ' ' + lugar)); }
  function rutaHref() { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(R.coordenadas || (R.nombre + ' ' + lugar)); }

  /* ---------- Mapa "Cómo llegar" (solo si hay coordenadas y la página tiene el bloque) ---------- */
  var bm = $('#bloque-mapa');
  if (bm && R.coordenadas) {
    var fr = document.createElement('iframe');
    fr.src = 'https://www.google.com/maps?q=' + encodeURIComponent(R.coordenadas) + '&z=16&output=embed';
    fr.title = 'Mapa: ubicación de ' + R.nombre; fr.loading = 'lazy'; fr.referrerPolicy = 'no-referrer-when-downgrade';
    $('#mapa').appendChild(fr);
    $('#mapa-dir').textContent = lugar;
    $('#mapa-ruta').href = rutaHref();
    bm.classList.remove('oculto');
  }

  /* ---------- Contacto: solo lo que existe ---------- */
  function canal(ico, titulo, detalle, href) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = href; if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = '<span class="ic">' + svg(ICO[ico]) + '</span><span><b></b><small></small></span>';
    a.querySelector('b').textContent = titulo; a.querySelector('small').textContent = detalle;
    var cl = $('#canales'); if (cl) { li.appendChild(a); cl.appendChild(li); }
  }
  if (R.whatsapp) canal('wa', 'WhatsApp', 'Escríbenos y te respondemos', waHref(WA_SALUDO));
  if (R.whatsapp) { var wf = $('#wa-flot'); wf.href = waHref(WA_SALUDO); wf.hidden = false; }
  if (R.telefono) canal('tel', 'Llámanos', R.telefono, telHref);
  if (R.correo) canal('mail', 'Escríbenos', R.correo, mailHref('Quiero agendar una visita'));
  if (lugar) canal('pin', 'Dónde estamos', lugar, mapaHref());

  function barraItem(ico, texto, href) {
    var a = document.createElement(href ? 'a' : 'span');
    if (href) a.href = href;
    a.innerHTML = svg(ICO[ico]); a.appendChild(document.createTextNode(texto));
    $('#barra-contacto').appendChild(a);
  }
  if (lugar) barraItem('pin', lugar, mapaHref());
  if (R.telefono) barraItem('tel', R.telefono, telHref);
  if (R.correo) barraItem('mail', R.correo, 'mailto:' + R.correo);
  $('#pie-datos').textContent = [lugar, R.telefono, R.correo, R.visitas ? 'Visitas familiares: ' + R.visitas.replace(/ horas/, ' h') : ''].filter(Boolean).join('\n');
  $('#anio').textContent = new Date().getFullYear();

  if (R.seremi === true && $('#bloque-seremi')) $('#bloque-seremi').classList.remove('oculto');
  if (R.fotos && R.fotos.length && $('#galeria')) {
    R.fotos.forEach(function (f) {
      var fig = document.createElement('figure'); fig.className = 'aparece';
      var img = document.createElement('img'); img.src = f.src; img.alt = f.texto || ''; img.loading = 'lazy';
      var cap = document.createElement('figcaption'); cap.textContent = f.texto || '';
      fig.appendChild(img); fig.appendChild(cap); $('#galeria').appendChild(fig);
    });
    $('#bloque-galeria').classList.remove('oculto');
  }
  if (R.testimonios && R.testimonios.length && $('#testimonios')) {
    R.testimonios.forEach(function (t) {
      var q = document.createElement('blockquote'); q.className = 'aparece';
      var p = document.createElement('p'); p.textContent = t.texto;
      var c = document.createElement('cite'); c.textContent = t.nombre + (t.relacion ? ' · ' + t.relacion : '');
      q.appendChild(p); q.appendChild(c); $('#testimonios').appendChild(q);
    });
    $('#bloque-testimonios').classList.remove('oculto');
  }

  /* ---------- Encabezado y menú ---------- */
  var top = $('#top');
  window.addEventListener('scroll', function () { top.classList.toggle('sombra', window.scrollY > 40); }, { passive: true });
  var menuBtn = $('.menu-btn'), nav = $('#nav');
  menuBtn.addEventListener('click', function () {
    var ab = nav.classList.toggle('abierto');
    menuBtn.setAttribute('aria-expanded', ab); menuBtn.setAttribute('aria-label', ab ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('abierto'); menuBtn.setAttribute('aria-expanded', 'false'); }); });

  /* ---------- Aparición ---------- */
  function observar() {
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -6% 0px' });
      $$('.aparece').forEach(function (el) {
        var hermanos = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(hermanos, 3) * 90 + 'ms';
        io.observe(el);
      });
    } else $$('.aparece').forEach(function (el) { el.classList.add('visible'); });
  }
  observar();

  /* ---------- Envío al Google Form (si está configurado) ---------- */
  var GF = R.googleForm && R.googleForm.accion && R.googleForm.campos ? R.googleForm : null;
  function enviarGoogle(d) {
    if (!GF) return Promise.reject(new Error('sin formulario'));
    var cuerpo = new URLSearchParams();
    Object.keys(GF.campos).forEach(function (k) { if (d[k]) cuerpo.append(GF.campos[k], String(d[k]).slice(0, 500)); });
    /* Google no permite leer la respuesta desde otro dominio (no-cors): si la red responde, se da por enviado. */
    return fetch(GF.accion, { method: 'POST', mode: 'no-cors', body: cuerpo });
  }
  function fechaLarga(iso) {
    var p = String(iso).split('-').map(Number); if (p.length !== 3 || !p[0]) return iso;
    var f = new Date(p[0], p[1] - 1, p[2]);
    return ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][f.getDay()] + ' ' + p[2] + ' de ' +
      ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][p[1] - 1];
  }
  /* Mensaje con formato de WhatsApp (*negrita*), ordenado y fácil de leer para quien lo recibe. */
  function textoWhatsApp(d) {
    var tel = d.telefono && !/no indicado|prefiero/i.test(d.telefono) ? d.telefono : '';
    var f = [['📌', 'Motivo', d.motivo], ['👤', 'Mi nombre', d.nombre], ['👪', 'Relación', d.relacion], ['🩺', 'Situación de la persona', d.nivel],
      ['🗓️', 'Para cuándo', d.cuando], ['🏡', 'Día para visitar', d.dia ? fechaLarga(d.dia) + (d.franja && d.franja !== 'Me da igual' ? ', en la ' + d.franja.toLowerCase() : '') : ''],
      ['📞', 'Mi contacto', tel]];
    return '¡Hola! 👋 Les escribo desde la página web de *' + R.nombre + '*.\n\n' +
      f.filter(function (x) { return x[2]; }).map(function (x) { return x[0] + ' *' + x[1] + ':* ' + x[2]; }).join('\n') +
      '\n\n¡Muchas gracias! Quedo atento(a) a su respuesta. 🙏';
  }
  function textoSolicitud(d) {
    return 'Hola, escribo desde la página web.\n\nMotivo: ' + d.motivo + '\nNombre: ' + d.nombre + '\nContacto: ' + (d.telefono || 'No indicado') +
      '\nRelación: ' + (d.relacion || '—') + '\nSituación de la persona: ' + (d.nivel || '—') +
      (d.cuando ? '\nPara cuándo: ' + d.cuando : '') + (d.dia ? '\nDía preferido para visitar: ' + d.dia + (d.franja ? ' (' + d.franja + ')' : '') : '');
  }

  /* ---------- Formulario de orientación ---------- */
  var fo = $('#form-orienta');
  if (fo) (function () {
  var hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  fo.dia.min = hoy.toISOString().slice(0, 10);
  function mostrarVisita() { $('#f-visita').hidden = !/visita/i.test(fo.motivo.value); }
  fo.motivo.addEventListener('change', mostrarVisita); mostrarVisita();
  fo.addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = fo.nombre.value.trim(), tel = fo.telefono.value.trim();
    var err = $('#f-error');
    if (!nombre) { err.textContent = 'Escribe tu nombre para poder responderte.'; fo.nombre.focus(); return; }
    if (tel && !/^[+\d\s()-]{8,20}$/.test(tel)) { err.textContent = 'Revisa el teléfono (ejemplo: +56 9 1234 5678).'; fo.telefono.focus(); return; }
    if (GF && !tel) { err.textContent = 'Déjanos un teléfono para poder responderte.'; fo.telefono.focus(); return; }
    err.textContent = '';
    var esVisita = /visita/i.test(fo.motivo.value);
    var d = { motivo: fo.motivo.value, nombre: nombre, telefono: tel, relacion: fo.relacion.value, nivel: fo.nivel.value,
      dia: esVisita ? fo.dia.value : '', franja: esVisita && fo.dia.value ? fo.franja.value : '', origen: 'Formulario de la portada' };
    var cuerpo = textoSolicitud(d);
    var envio = $('#f-envio'); envio.innerHTML = '';
    var boton = fo.querySelector('button[type=submit]');
    if (GF) {
      boton.disabled = true; boton.textContent = 'Enviando…';
      enviarGoogle(d).then(function () {
        fo.querySelectorAll('input,select,button').forEach(function (x) { x.disabled = true; });
        boton.textContent = 'Solicitud enviada';
        var ok = document.createElement('p'); ok.className = 'ok-envio'; ok.setAttribute('role', 'status');
        ok.textContent = '¡Gracias, ' + nombre + '! Recibimos tu solicitud. Te llamaremos al ' + tel + (esVisita && d.dia ? ' para confirmar la visita.' : ' para orientarte.');
        envio.appendChild(ok); envio.hidden = false;
      }).catch(function () {
        boton.disabled = false; boton.textContent = 'Quiero recibir orientación';
        err.textContent = 'No pudimos enviarlo por internet. Usa uno de estos botones:';
        botonesManuales();
      });
      return;
    }
    botonesManuales();
    function botonesManuales() {
    function b(cls, txt, href, ico) {
      var a = document.createElement('a'); a.className = 'btn ' + cls; a.href = href;
      if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = svg(ICO[ico]); a.appendChild(document.createTextNode(txt)); envio.appendChild(a);
    }
    if (R.whatsapp) b('btn-turquesa', 'Enviar por WhatsApp', waHref(textoWhatsApp(d)), 'wa');
    if (R.correo) b(R.whatsapp ? 'btn-borde' : 'btn-turquesa', 'Enviar por correo', mailHref(d.motivo + ' — ' + nombre, cuerpo), 'mail');
    envio.hidden = false;
    boton.textContent = 'Actualizar mis datos';
    var primero = envio.querySelector('a'); if (primero) primero.focus();
    }
  });
  })();

  /* ==========================================================
     Asistente por reglas (sin servidor, sin costo).
     Nunca inventa precios, cupos ni horarios: deriva a una persona.
     ========================================================== */
  var chat = $('#chat'), log = $('#chat-log'), ops = $('#chat-ops'), form = $('#chat-form'), input = $('#chat-in'), btn = $('#chat-btn');
  var iniciado = false, ocupado = false, flujo = null, datos = {}, ultimo = '';
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function bajar() { log.scrollTop = log.scrollHeight; }
  function burbuja(t, q) { var p = document.createElement('p'); p.className = 'msg ' + q; p.textContent = t; log.appendChild(p); bajar(); }
  function limpiar() { ops.innerHTML = ''; }
  function opcion(t, fn, fuerte) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'op' + (fuerte ? ' fuerte' : ''); b.textContent = t;
    b.addEventListener('click', function () { if (ocupado) return; burbuja(t, 'yo'); fn(); }); ops.appendChild(b);
  }
  function enlace(t, href, ico) {
    var a = document.createElement('a'); a.className = 'op fuerte'; a.href = href;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = ico ? svg(ICO[ico]) : ''; a.appendChild(document.createTextNode(t)); ops.appendChild(a);
  }
  function dice(textos, luego) {
    if (typeof textos === 'string') textos = [textos];
    limpiar(); ocupado = true; var i = 0;
    (function sig() {
      if (i >= textos.length) { ocupado = false; if (luego) luego(); return; }
      var t = textos[i++], espera = reduce ? 0 : Math.min(350 + t.length * 11, 1300), pts = null;
      if (espera) { pts = document.createElement('p'); pts.className = 'msg bot escribiendo'; pts.setAttribute('aria-hidden', 'true'); pts.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(pts); bajar(); }
      setTimeout(function () { if (pts) pts.remove(); burbuja(t, 'bot'); sig(); }, espera);
    })();
  }
  function menu() {
    flujo = null;
    opcion('Agendar una visita', function () { visita(); }, true);
    opcion('¿A quién reciben?', recibimos);
    opcion('¿Qué cuidados incluye?', cuidados);
    opcion('Valores y cupos', valores);
    opcion('Hablar con una persona', persona);
  }
  function inicio() { dice('¿En qué más te puedo ayudar?', menu); }
  function recibimos() {
    dice(['Recibimos a personas mayores con distintos niveles de dependencia:', 'Valentes (se valen por sí mismos), semivalentes (necesitan ayuda en parte del día) y postrados (pasan la mayor parte del tiempo en cama).', 'Si no tienes claro el nivel de tu familiar, no te preocupes: lo conversamos en la visita.'],
      function () { opcion('Agendar una visita', function () { visita(); }, true); opcion('Volver al inicio', inicio); });
  }
  function cuidados() { dice(['El equipo realiza y registra cada día: medicamentos, aseo e higiene, movilización (incluidos los cambios de posición) y alimentación.', 'Cada tarea queda anotada con la hora y el nombre de quien la hizo.'], inicio); }
  function equipo() {
    dice(['Esa consulta te la responde directamente la administradora.', 'Escríbenos o llámanos y te cuenta todo lo que necesites saber.'],
      function () { contactar('Hola, vi la página de la residencia y tengo una consulta.', '', '¡Hola! 👋 Vi la página de *' + R.nombre + '* y tengo una consulta: '); opcion('Volver al inicio', inicio); });
  }
  function valores() {
    dice(['El valor depende del nivel de cuidado que necesita cada persona, y los cupos cambian.', 'Para no darte un dato equivocado, una persona del equipo te responde con la información de tu caso.'],
      function () { opcion('Consultar valores', function () { visita('valores'); }, true); opcion('Volver al inicio', inicio); });
  }
  function contactar(msg, asunto, msgWa) {
    if (R.whatsapp) enlace('Escribir por WhatsApp', waHref(msgWa || msg), 'wa');
    if (R.telefono) enlace('Llamar', telHref, 'tel');
    if (R.correo) enlace('Enviar correo', mailHref(asunto || 'Consulta desde la página web', msg), 'mail');
  }
  function persona() {
    dice(lugar ? ['Estos son los canales para hablar con el equipo.', 'Estamos en ' + lugar + '.'] : ['Estos son los canales para hablar con el equipo.'],
      function () { contactar('Hola, vi la página de la residencia y tengo una consulta.', '', '¡Hola! 👋 Vi la página de *' + R.nombre + '* y tengo una consulta: '); opcion('Volver al inicio', inicio); });
  }
  function visita(motivo) {
    flujo = 'nombre'; datos = { motivo: motivo === 'valores' ? 'Consultar valores y cupos' : 'Agendar una visita' };
    dice([motivo === 'valores' ? 'Te ayudo a enviar la consulta. Son 4 preguntas cortas.' : 'Perfecto, te ayudo a pedir la visita. Son 4 preguntas cortas.', '¿Cuál es tu nombre?'], function () { input.focus(); });
  }
  function pParentesco() {
    flujo = 'parentesco';
    dice('Gracias, ' + datos.nombre + '. ¿Qué relación tienes con la persona que necesita el cuidado?', function () {
      ['Soy su hijo o hija', 'Soy su nieto o nieta', 'Soy su pareja', 'Otro familiar', 'Es para mí'].forEach(function (t) { opcion(t, function () { datos.parentesco = t; pNivel(); }); });
    });
  }
  function pNivel() {
    flujo = 'nivel';
    dice('¿Cómo describirías su situación hoy?', function () {
      [['Se vale por sí mismo', 'Valente'], ['Necesita ayuda en parte del día', 'Semivalente'], ['Pasa en cama la mayor parte del tiempo', 'Postrado'], ['No estoy seguro', 'Por evaluar']].forEach(function (o) {
        opcion(o[0], function () { datos.nivel = o[1] + ' (' + o[0].toLowerCase() + ')'; pCuando(); });
      });
    });
  }
  function pCuando() {
    flujo = 'cuando';
    dice('¿Para cuándo necesitan el cuidado?', function () {
      ['Lo antes posible', 'Este mes', 'En los próximos meses', 'Solo me estoy informando'].forEach(function (t) {
        opcion(t, function () { datos.cuando = t; if (/visita/i.test(datos.motivo)) pDia(); else pContacto(); });
      });
    });
  }
  var DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'], MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function iso(f) { return f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0') + '-' + String(f.getDate()).padStart(2, '0'); }
  function pDia() {
    flujo = 'dia';
    dice('¿Qué día te gustaría venir a conocernos? La administradora te llama para coordinar la hora.', function () {
      for (var i = 1; i <= 6; i++) {
        (function (f) {
          var etiqueta = DIAS[f.getDay()] + ' ' + f.getDate() + ' ' + MESES[f.getMonth()];
          opcion(etiqueta, function () { datos.dia = iso(f); datos.diaTexto = etiqueta; pFranja(); });
        })(new Date(Date.now() + i * 864e5));
      }
      opcion('Otro día / aún no sé', function () { datos.dia = ''; pContacto(); });
    });
  }
  function pFranja() {
    flujo = 'franja';
    dice('¿Prefieres en la mañana o en la tarde?', function () {
      ['Mañana', 'Tarde', 'Me da igual'].forEach(function (t) { opcion(t, function () { datos.franja = t; pContacto(); }); });
    });
  }
  function pContacto() { flujo = 'contacto'; dice('Por último, ¿un teléfono o correo para que el equipo te responda? (o escribe "prefiero no dejarlo")', function () { input.focus(); }); }
  function cerrarFlujo() {
    flujo = null;
    var d = { motivo: datos.motivo, nombre: datos.nombre, telefono: datos.contacto, relacion: datos.parentesco, nivel: datos.nivel,
      cuando: datos.cuando, dia: datos.dia || '', franja: datos.dia ? datos.franja : '', origen: 'Asistente de la página' };
    var cuerpo = textoSolicitud(d);
    dice('Listo, ' + datos.nombre + '. Este es el resumen de tu solicitud:', function () {
      var dl = document.createElement('dl'); dl.className = 'resumen';
      var filas = [['Motivo', datos.motivo], ['Relación', datos.parentesco], ['Situación', datos.nivel], ['Para cuándo', datos.cuando]];
      if (datos.dia) filas.push(['Visita', datos.diaTexto + ' · ' + datos.franja + ' (por confirmar)']);
      filas.push(['Contacto', datos.contacto]);
      filas.forEach(function (f) {
        var dt = document.createElement('dt'); dt.textContent = f[0]; var dd = document.createElement('dd'); dd.textContent = f[1]; dl.appendChild(dt); dl.appendChild(dd);
      });
      log.appendChild(dl); bajar();
      function manual(msg) { dice(msg, function () { contactar(cuerpo, datos.motivo + ' — ' + datos.nombre, textoWhatsApp(d)); opcion('Volver al inicio', inicio); }); }
      if (GF && datos.contacto !== 'No indicado') {
        opcion('Enviar solicitud', function () {
          ocupado = true;
          enviarGoogle(d).then(function () {
            ocupado = false;
            dice(['¡Enviada! El equipo recibió tu solicitud.', datos.dia ? 'Te contactaremos para confirmar la hora de la visita.' : 'Te contactaremos a la brevedad.'], function () { opcion('Volver al inicio', inicio); });
          }).catch(function () { ocupado = false; manual('No pude enviarla por internet. Puedes enviarla con uno de estos botones:'); });
        }, true);
        opcion('Corregir datos', function () { visita(/valores/i.test(datos.motivo) ? 'valores' : ''); });
      } else if (GF) {
        manual('Sin un teléfono o correo no podemos responderte. Puedes escribirnos directamente:');
      } else {
        manual('Envíala con uno de estos botones: el mensaje ya va escrito.');
      }
    });
  }
  var REGLAS = [
    [/(horario|hora).*visit|visit.*(horario|hora)|visitar a (mi|un)/, function () {
      dice(['Las familias pueden visitar a los residentes ' + (R.visitas || 'avisando antes') + '. Así cuidamos la rutina diaria de nuestros abuelos.',
        'Si quieres conocer la residencia para un familiar, la visita se coordina con la administradora.'],
        function () { opcion('Agendar una visita para conocer', function () { visita(); }, true); opcion('Volver al inicio', inicio); });
    }],
    [/visita|conocer|agendar|ir a ver|recorrer/, function () { visita(); }],
    [/precio|valor|costo|cuanto|cobra|pagar|mensualidad|arancel|vacante|cupo|disponib/, valores],
    [/alzheimer|demencia|parkinson|oxigeno|sonda|dialisis/, function () {
      dice(['Cada caso es distinto, así que preferimos no responder en general.', 'Cuéntanos cómo está tu familiar y una persona del equipo te dice si podemos recibirlo.'],
        function () { opcion('Consultar mi caso', function () { visita('valores'); }, true); opcion('Volver al inicio', inicio); });
    }],
    [/postrad|cama|valente|dependen|silla de ruedas|recib|aceptan|admit|ingres/, recibimos],
    [/medicament|remedio|pastilla|higiene|bano|aseo|comida|alimenta|cuidado|movil|posicion/, cuidados],
    [/turno|noche|personal|enfermer|cuidador|auxiliar|dotacion/, equipo],
    [/donde|direccion|ubicac|comuna|llegar|mapa/, function () {
      if (lugar) dice('Estamos en ' + lugar + '.', function () { enlace('Ver en el mapa', mapaHref(), 'pin'); opcion('Agendar una visita', function () { visita(); }, true); });
      else dice('Escríbenos y te enviamos la dirección y cómo llegar.', function () { contactar('Hola, ¿me pueden enviar la dirección de la residencia?'); opcion('Volver al inicio', inicio); });
    }],
    [/telefono|whatsapp|correo|mail|contact|hablar|persona|llamar/, persona],
    [/^(hola|buenas|buenos|holi|hey)\b/, function () { dice('¡Hola! ¿En qué te puedo ayudar?', menu); }],
    [/gracias|genial|perfecto|\bok\b|\bvale\b/, function () { dice('Con gusto. Si necesitas algo más, aquí estoy.', menu); }]
  ];
  function libre(txt) {
    var t = norm(txt); ultimo = txt;
    for (var i = 0; i < REGLAS.length; i++) if (REGLAS[i][0].test(t)) { REGLAS[i][1](); return; }
    dice(['No estoy seguro de haber entendido tu pregunta.', 'Puedes elegir una opción, o dejarle tu consulta directamente al equipo.'], menu);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim(); if (!v || ocupado) return;
    input.value = ''; burbuja(v, 'yo');
    if (flujo === 'nombre') { datos.nombre = v.slice(0, 60); pParentesco(); return; }
    if (flujo === 'contacto') { datos.contacto = /prefiero no/.test(norm(v)) ? 'No indicado' : v.slice(0, 120); cerrarFlujo(); return; }
    if (flujo) {
      var f = flujo;
      dice('Elige una de las opciones de abajo, por favor.', function () { if (f === 'parentesco') pParentesco(); else if (f === 'nivel') pNivel(); else if (f === 'cuando') pCuando(); else if (f === 'dia') pDia(); else if (f === 'franja') pFranja(); });
      return;
    }
    libre(v);
  });
  function abrir(fi) {
    chat.hidden = false; btn.setAttribute('aria-expanded', 'true');
    if (!iniciado) {
      iniciado = true;
      dice(['Hola, soy el asistente de ' + R.nombre + '.', 'Te respondo las dudas más comunes y te ayudo a agendar una visita. Una persona del equipo responde cada solicitud.'], function () {
        if (fi === 'visita') { burbuja('Agendar una visita', 'yo'); visita(); } else menu();
      });
    } else if (fi === 'visita' && !flujo && !ocupado) { burbuja('Agendar una visita', 'yo'); visita(); }
    setTimeout(function () { (window.innerWidth > 640 ? input : $('.chat-x')).focus(); }, 60);
  }
  function cerrar() { chat.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  btn.addEventListener('click', function () { chat.hidden ? abrir() : cerrar(); });
  $('.chat-x').addEventListener('click', cerrar);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !chat.hidden) cerrar(); });
  $$('[data-abrir-chat]').forEach(function (b) { b.addEventListener('click', function () { abrir(b.getAttribute('data-flujo')); }); });
})();
