/**
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SelectorsMap from './constants/selectors-map';

type ProductSlideEvent = Event & {to: number};

export default () => {
  const {prestashop, Theme: {events}} = window;

  const initProductSlide = () => {
    const imagesCarousel = document.querySelector(SelectorsMap.product.carousel);

    if (imagesCarousel) {
      imagesCarousel.addEventListener('slide.bs.carousel', onProductSlide);
    }
  };

  function onProductSlide(event: ProductSlideEvent): void {
    const thumbnails = document.querySelectorAll(SelectorsMap.product.thumbnail);
    const thumbsContainer = document.querySelector(SelectorsMap.product.thumbsContainer);

    thumbnails.forEach((e: Element) => {
      e.classList.remove('active');
    });

    const activeThumb = document.querySelector(SelectorsMap.product.activeThumbnail(event.to));

    if (activeThumb) {
      const activeThumbRect = activeThumb.getBoundingClientRect();

      if (thumbsContainer) {
        const thumbsContainerRect = thumbsContainer.getBoundingClientRect();
        const safetyZone = 20;

        if (
          (thumbsContainerRect.bottom - safetyZone < activeThumbRect.top
          || thumbsContainerRect.top + safetyZone > activeThumbRect.bottom)
          && !prestashop.responsive.mobile
        ) {
          thumbsContainer.scroll({
            left: thumbsContainer.scrollLeft + activeThumbRect.left - thumbsContainerRect.left,
            top: thumbsContainer.scrollTop + activeThumbRect.top - thumbsContainerRect.top,
            behavior: 'smooth',
          });
        }

        if (
          (thumbsContainerRect.right - safetyZone < activeThumbRect.right
          || thumbsContainerRect.left + safetyZone > activeThumbRect.left)
          && prestashop.responsive.mobile
        ) {
          thumbsContainer.scroll({
            left: thumbsContainer.scrollLeft + activeThumbRect.left - thumbsContainerRect.left,
            top: thumbsContainer.scrollTop + activeThumbRect.top - thumbsContainerRect.top,
            behavior: 'smooth',
          });
        }
      }
      activeThumb.classList.add('active');
    }
  }

  initProductSlide();

  prestashop.on(events.updatedProduct, () => {
    initProductSlide();
  });

  prestashop.on(events.quickviewOpened, () => {
    initProductSlide();
  });
};
