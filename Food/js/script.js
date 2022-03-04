import tabs  from './modules/tabs';
import modal  from './modules/modal';
import calc  from './modules/calc';
import cards  from './modules/cards';
import forms  from './modules/forms';
import timer  from './modules/timer';
import slider from  './modules/slider';

window.addEventListener('DOMContentLoaded', () => {

    tabs();
    modal('[data-modal]','.modal');
    calc();
    cards();
    forms();
    timer();
    slider(
        {
            sliderContainer:'.offer__slider',
            slide:'.offer__slide',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            currentSlide: '#current', // number of slide
            sliderField:'.offer__slider-inner', // all length slider hide
            slideWrapper: '.offer__slider-wrapper' //visible slide in inner / window
        }
    );

});