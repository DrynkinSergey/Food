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
    slider();

});