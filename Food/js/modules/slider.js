export const getRegExp = (str) => {
    //function for convert string to numbers use regular expression
    return +str.replace(/\D/g, '');
}


function slider({sliderContainer, slide, nextArrow, prevArrow, currentSlide, slideWrapper, sliderField}) {

    const slider = document.querySelector(sliderContainer); //slider container
    const sliderItem = slider.querySelectorAll(slide); // one slide
    let currentItem = 1;
    const nextSlide = slider.querySelector(nextArrow), //next slide
        prevSlide = slider.querySelector(prevArrow), //prev slide
        current = slider.querySelector(currentSlide), // number of slide
        slidesWrapper = document.querySelector(slideWrapper), //visible slide in inner / window
        slidesField = slidesWrapper.querySelector(sliderField); // all length slider hide

    let width = window.getComputedStyle(slidesWrapper).width; //take computed style from element, and get width
    let offset = 0; // zone of visible


    slidesField.style.width = 100 * sliderItem.length + '%'; // set field width 400%
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all'
    sliderItem.forEach(slide => {
        slide.style.width = width; // change all slide for one size
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
