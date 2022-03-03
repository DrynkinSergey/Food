export const getRegExp = (str) => {
    return +str.replace(/\D/g, '');
}

function slider() {
    //slider


    const slider = document.querySelector('.offer__slider');
    const sliderItem = slider.querySelectorAll('.offer__slide');
    let currentItem = 1;
    const nextSlide = slider.querySelector('.offer__slider-next'),
        prevSlide = slider.querySelector('.offer__slider-prev'),
        current = slider.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = slidesWrapper.querySelector('.offer__slider-inner');

    let width = window.getComputedStyle(slidesWrapper).width;
    let offset = 0;


    slidesField.style.width = 100 * sliderItem.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all'
    sliderItem.forEach(slide => {
        slide.style.width = width;
    });
    slidesWrapper.style.overflow = 'hidden';
    if (currentItem <= 9) {
        current.textContent = `0${currentItem}`;
    }

    nextSlide.addEventListener('click', () => {
        if (offset === getRegExp(width) * (sliderItem.length - 1)) {
            offset = 0;
        } else {
            offset += getRegExp(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (currentItem >= sliderItem.length) {
            currentItem = 0;
            current.textContent = `0${currentItem}`;
        }
        currentItem++;
        current.textContent = `0${currentItem}`;
    });

    prevSlide.addEventListener('click', () => {
        if (offset === 0) {
            offset = getRegExp(width) * (sliderItem.length - 1)
        } else {
            offset -= getRegExp(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (currentItem <= 1) {
            currentItem = sliderItem.length + 1;
            current.textContent = `0${currentItem}`;
        }
        currentItem--;
        current.textContent = `0${currentItem}`;
    })
}

export default slider;
