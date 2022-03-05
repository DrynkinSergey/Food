import tabs  from './modules/tabs';
import modal  from './modules/modal';
import calc  from './modules/calc';
import cards  from './modules/cards';
import forms  from './modules/forms';
import timer  from './modules/timer';
import slider from  './modules/slider';

window.addEventListener('DOMContentLoaded', () => {

    tabs(
        {
            tab: '.tabcontent',
            tabName: '.tabheader__item',
            tabNameParent : '.tabheader__items',
            activeTabClass: 'tabheader__item_active'
        }
    );
    modal('[data-modal]','.modal');
    calc();
    cards();
    forms();
    timer({
        timerSelector : '.timer',
        deadline : '2022-03-30',
        daysSelector: '#days',
        hoursSelector: '#hours',
        minutesSelector: '#minutes',
        secondsSelector: '#seconds',
    });
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