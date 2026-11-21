/* Temporada navideña (pedido del dueño, 21-11-2026).
   Activa hasta el 06-01-2027 inclusive. Para verla fuera de fecha: ?navidad=1
   Fotos navideñas del dueño: agréguelas a FOTOS (rutas dentro de assets/fotos/navidad/). */
(function () {
  var FIN = new Date('2027-01-07T00:00:00-03:00');
  var FOTOS = [
    // { src: 'assets/fotos/navidad/arbol.jpg', alt: 'Árbol de Navidad en el living de la residencia' }
  ];
  var forzar = /[?&]navidad=1/.test(location.search);
  if (!forzar && new Date() >= FIN) return;

  var html = document.documentElement;
  html.classList.add('navidad');
  var reducido = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';
  var ESTRELLA = '<svg class="estrella" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l2.6 6.9 7.4.4-5.8 4.6 2 7.1L12 16.4l-6.2 4.1 2-7.1L2 8.8l7.4-.4z"/></svg>';

  function listo(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  listo(function () {
    /* 1. Saludo en la barra superior */
    var izq = document.querySelector('.barra .izq');
    if (izq) izq.innerHTML = ESTRELLA + 'Felices fiestas les desea toda la familia de Residencia Senior Wall';

    /* 2. Guirnalda de luces bajo el encabezado */
    var top = document.querySelector('header.top');
    if (top) {
      var g = document.createElement('div');
      g.className = 'nv-guirnalda';
      g.setAttribute('aria-hidden', 'true');
      top.appendChild(g);
      var dibujar = function () {
        var w = top.clientWidth || window.innerWidth, paso = w < 600 ? 38 : 48, n = Math.ceil(w / paso);
        var d = 'M0 2', focos = '';
        for (var i = 0; i < n; i++) {
          var x0 = i * paso, xm = x0 + paso / 2, x1 = x0 + paso;
          d += ' Q' + xm + ' 14 ' + x1 + ' 2';
          var c = 'f' + ((i % 4) + 1), retraso = ((i * 0.37) % 2.4).toFixed(2);
          focos += '<g class="foco ' + c + '" style="animation-delay:-' + retraso + 's"><rect class="casquillo" x="' + (xm - 2.5) + '" y="6.5" width="5" height="4" rx="1"/>' +
            '<ellipse cx="' + xm + '" cy="15.5" rx="4.2" ry="6.2"/></g>';
        }
        g.innerHTML = '<svg viewBox="0 0 ' + (n * paso) + ' 26" preserveAspectRatio="none"><path class="cable" d="' + d + '"/>' + focos + '</svg>';
      };
      dibujar();
      var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(dibujar, 150); });
    }

    /* 3. Portada: sello, adornos colgando y nieve */
    var portada = document.querySelector('.portada');
    if (portada) {
      var sobre = portada.querySelector('.sobre');
      if (sobre) {
        var s = document.createElement('span');
        s.className = 'nv-sello';
        s.innerHTML = ESTRELLA.replace('class="estrella"', '') + 'Navidad 2026 en nuestra casa';
        sobre.parentNode.insertBefore(s, sobre);
        sobre.parentNode.insertBefore(document.createElement('br'), sobre);
      }
      var colores = [['#c23a46', '#7f2430'], ['#e2b955', '#a67a25'], ['#3b8d66', '#1f5039']];
      var largos = [70, 120, 46];
      var ad = document.createElement('div');
      ad.className = 'nv-adornos';
      ad.setAttribute('aria-hidden', 'true');
      ad.innerHTML = colores.map(function (c, i) {
        var L = largos[i], id = 'nvb' + i;
        return '<span class="nv-adorno"><svg viewBox="0 0 64 ' + (L + 66) + '">' +
          '<defs><radialGradient id="' + id + '" cx="35%" cy="32%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".18" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></radialGradient></defs>' +
          '<line x1="32" y1="0" x2="32" y2="' + L + '" stroke="#b08a4a" stroke-width="1.4"/>' +
          '<rect x="25" y="' + L + '" width="14" height="9" rx="2" fill="#c9a55a"/>' +
          '<circle cx="32" cy="' + (L + 35) + '" r="27" fill="url(#' + id + ')"/>' +
          '<path d="M10 ' + (L + 31) + ' q22 9 44 0" stroke="rgba(255,240,200,.55)" stroke-width="2.4" fill="none"/>' +
          '</svg></span>';
      }).join('');
      portada.appendChild(ad);

      if (!reducido) nieve(portada);
    }

    /* 4. Banda de saludo con fotos navideñas (solo en el inicio) */
    var esInicio = document.getElementById('bloque-contacto') && portada && portada.classList.contains('portada-fondo');
    if (esInicio) {
      var sec = document.createElement('section');
      sec.className = 'nv-saludo';
      sec.setAttribute('aria-labelledby', 'nv-titulo');
      var fotos = FOTOS.length ? '<div class="nv-fotos">' + FOTOS.map(function (f) {
        return '<img src="' + f.src + '" alt="' + f.alt + '" loading="lazy" width="600" height="450">';
      }).join('') + '</div>' : '';
      sec.innerHTML = '<div class="puntos" aria-hidden="true"></div><div class="wrap">' +
        '<svg class="estrella-grande" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l2.6 6.9 7.4.4-5.8 4.6 2 7.1L12 16.4l-6.2 4.1 2-7.1L2 8.8l7.4-.4z"/></svg>' +
        '<h2 id="nv-titulo">Felices fiestas <span class="t">desde nuestra casa</span></h2>' +
        '<p>Estas fiestas las pasamos en familia, con la casa vestida de Navidad. Si buscas un hogar cálido para tu familiar, ven a conocernos: las visitas son libres hasta las 18:00.</p>' +
        fotos +
        '<div class="acciones"><a class="btn btn-sol" href="#orientacion">Agenda una visita</a>' +
        '<button class="btn btn-borde" type="button" data-nv-chat>Resolver una duda</button></div></div>';
      var seremi = document.getElementById('bloque-seremi');
      var ancla = seremi || portada;
      ancla.parentNode.insertBefore(sec, ancla.nextSibling);
      var chat = sec.querySelector("[data-nv-chat]");
      chat.addEventListener('click', function () {
        var otro = document.querySelector('.portada [data-abrir-chat]');
        if (otro) otro.click();
      });
    }

    /* 5. Saludo en el pie */
    var legal = document.querySelector('.pie-legal');
    if (legal) {
      var p = document.createElement('span');
      p.className = 'nv-pie-saludo';
      p.innerHTML = ESTRELLA.replace('class="estrella"', '') + 'Feliz Navidad y un próspero 2027';
      legal.appendChild(p);
    }
  });

  function nieve(cont) {
    var cv = document.createElement('canvas');
    cv.className = 'nv-nieve';
    cv.setAttribute('aria-hidden', 'true');
    cont.insertBefore(cv, cont.firstChild);
    var ctx = cv.getContext('2d'), copos = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), visible = true, raf;
    function medir() {
      W = cont.clientWidth; H = cont.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, W / 14));
      while (copos.length < n) copos.push(nuevo(true));
      copos.length = n;
    }
    function nuevo(alAzar) {
      return { x: Math.random() * W, y: alAzar ? Math.random() * H : -8, r: 1.2 + Math.random() * 2.8,
        v: 0.25 + Math.random() * 0.7, f: Math.random() * Math.PI * 2, a: 0.55 + Math.random() * 0.45 };
    }
    function cuadro() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < copos.length; i++) {
        var c = copos[i];
        c.y += c.v; c.f += 0.012; c.x += Math.sin(c.f) * 0.35;
        if (c.y > H + 6) { copos[i] = nuevo(false); continue; }
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.283);
        ctx.fillStyle = 'rgba(255,255,255,' + c.a + ')';
        ctx.shadowColor = 'rgba(120,95,60,.35)'; ctx.shadowBlur = 3;
        ctx.fill();
      }
      raf = visible && !document.hidden ? requestAnimationFrame(cuadro) : 0;
    }
    medir();
    window.addEventListener('resize', medir);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(cuadro);
      }).observe(cont);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(cuadro); });
    raf = requestAnimationFrame(cuadro);
  }
})();
