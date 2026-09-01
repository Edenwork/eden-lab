document.addEventListener('DOMContentLoaded', function () {
  const reloadButtons = document.querySelectorAll('[data-lab-reload]');

  reloadButtons.forEach(function (reloadButton) {
    reloadButton.addEventListener('click', function () {
      const browser = reloadButton.closest('.eden-lab__browser');
      const frame = browser?.querySelector('[data-lab-frame]');
      const source = frame?.getAttribute('src');
      if (!frame || !source) return;
      frame.setAttribute('src', source);
    });
  });
});
