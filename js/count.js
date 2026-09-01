
  document.addEventListener('DOMContentLoaded', function () {
    const numbers = document.querySelectorAll('.count-number');

    if (!numbers.length) return;

    const animateNumber = (el) => {
      const target = Number(el.dataset.count);
      const duration = 1400;
      const startTime = performance.now();

      const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);

        el.textContent = value;

        el.classList.remove('is-ticking');
        void el.offsetWidth;
        el.classList.add('is-ticking');

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
          el.classList.remove('is-ticking');
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          numbers.forEach((number) => animateNumber(number));
          observerInstance.disconnect();
        });
      },
      {
        threshold: 0.35
      }
    );

    observer.observe(document.querySelector('#experience'));
  });
