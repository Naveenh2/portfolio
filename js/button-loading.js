/**
 * Shows "Loading..." on buttons and links when clicked.
 */
(function () {
  var LOADING = 'Loading...';
  var MIN_MS = 500;

  var SELECTOR =
    'a.btn, a.project-link, a.contact-pill, .nav-links a, .resume-actions a, .resume-actions button, a.resume-contact-item';

  function isNavHash(link) {
    var href = link.getAttribute('href') || '';
    return href.charAt(0) === '#' && href.length > 1;
  }

  function setLoading(el) {
    if (el.classList.contains('is-loading')) return;
    el.classList.add('is-loading');
    el.setAttribute('aria-busy', 'true');
    el.dataset.originalHtml = el.innerHTML;
    el.textContent = LOADING;
    el.style.pointerEvents = 'none';
  }

  function clearLoading(el) {
    el.classList.remove('is-loading');
    el.removeAttribute('aria-busy');
    el.style.pointerEvents = '';
    if (el.dataset.originalHtml) {
      el.innerHTML = el.dataset.originalHtml;
      delete el.dataset.originalHtml;
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest(SELECTOR);
    if (!el || el.classList.contains('is-loading')) return;

    var href = el.getAttribute('href');
    var isButton = el.tagName === 'BUTTON';
    var isPrint = isButton && el.getAttribute('data-action') === 'print';

    setLoading(el);
    var started = Date.now();

    function done() {
      var wait = Math.max(0, MIN_MS - (Date.now() - started));
      setTimeout(function () {
        clearLoading(el);
      }, wait);
    }

    if (isPrint) {
      e.preventDefault();
      setTimeout(function () {
        window.print();
        done();
      }, MIN_MS);
      return;
    }

    if (isButton) {
      return;
    }

    if (!href || isNavHash(el)) {
      e.preventDefault();
      setTimeout(function () {
        if (href && isNavHash(el)) {
          var target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
        done();
      }, MIN_MS);
      return;
    }

    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
      setTimeout(done, MIN_MS);
      return;
    }

    e.preventDefault();
    var target = el.getAttribute('target');

    setTimeout(function () {
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
      done();
    }, MIN_MS);
  });
})();
