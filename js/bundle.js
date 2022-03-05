/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Food/js/modules/calc.js":
/*!*********************************!*\
  !*** ./Food/js/modules/calc.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./Food/js/modules/slider.js");


function calc() {

    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, age, weight, ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !age || !weight || !ratio) {
            result.textContent = '______';
            return;
        }
        if (sex === 'female') {
            result.textContent = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio).toFixed(2);
        } else {
            result.textContent = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio).toFixed(2);
        }
    }

    const buttons = document.querySelectorAll('div .calculating__choose-item');


    function getStaticData(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                } else {
                    sex = e.target.getAttribute('id')

                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);

                });
                e.target.classList.add(activeClass);
                calcTotal();

            })
        });
    }


    function getChangedData(selector) {
        const input = document.querySelector(selector);
        document.querySelector(selector).addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red'
            } else {
                input.style.border = 'none'
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = (0,_slider__WEBPACK_IMPORTED_MODULE_0__.getRegExp)(input.value);
                    break;
                case 'age':
                    age = (0,_slider__WEBPACK_IMPORTED_MODULE_0__.getRegExp)(input.value);
                    break;
                case 'weight':
                    weight = (0,_slider__WEBPACK_IMPORTED_MODULE_0__.getRegExp)(input.value);
                    break;
            }
            calcTotal();


        })


    }

    getChangedData('#age');
    getChangedData('#height');
    getChangedData('#weight');
    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('#activity', 'calculating__choose-item_active');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./Food/js/modules/cards.js":
/*!**********************************!*\
  !*** ./Food/js/modules/cards.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards()
{


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {

            this.src = src;
            this.title = title;
            this.alt = alt;
            this.classes = classes;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector)
        }

        addCard() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = ` 
                    <img src="${this.src}" alt='${this.alt}'>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    const getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} status ${res.status}`)
        }
        return await res.json();
    }
    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').addCard();
            });
        });

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./Food/js/modules/forms.js":
/*!**********************************!*\
  !*** ./Food/js/modules/forms.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./Food/js/modules/modal.js");


function forms() {
    //Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Food/img/spinner.svg',
        success: 'Успешно',
        failure: 'Ошибка'
    }
    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers:
                {
                    'Content-type': 'application/json; charset=utf-8'
                },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData(' http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showModalThanks(message.success);
                })
                .catch(() => {
                    showModalThanks(message.failure);
                })
                .finally(() => {
                    form.reset();
                    statusMessage.remove();

                })
        })
    }


    function showModalThanks(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal');
        const thanksModal = document.createElement('div');
        thanksModal.style.cssText = `
        width:40%;
        position:absolute;
        top:40%;
        left:30%
        `;
        thanksModal.classList.add('modal__content');
        thanksModal.innerHTML = `
        <div class="modal__content">
         <div class="modal__close" data-close>&times;</div>
         <div class="modal__title" >${message}</div>
   </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 3000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./Food/js/modules/modal.js":
/*!**********************************!*\
  !*** ./Food/js/modules/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show')
    document.body.style.overflow = 'hidden';

    modal.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

function modal(triggerSelector, modalSelector) {


    const modal = document.querySelector(modalSelector);
    const modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal(modalSelector)
        });
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    })


    function openModalWhenEndScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector);
            window.removeEventListener('scroll', openModalWhenEndScroll);
        }
    }

    window.addEventListener('scroll', openModalWhenEndScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./Food/js/modules/slider.js":
/*!***********************************!*\
  !*** ./Food/js/modules/slider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegExp": () => (/* binding */ getRegExp),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getRegExp = (str) => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./Food/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./Food/js/modules/tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs({tab, tabName, tabNameParent,activeTabClass}) {


    const tabsContent = document.querySelectorAll(tab),
        tabs = document.querySelectorAll(tabName),
        tabsParent = document.querySelector(tabNameParent);

    function hideTabsContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        tabs.forEach(tab => {
            tab.classList.remove(activeTabClass);
        })
    }

    function showCurrentTab(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add(activeTabClass);

    }

    tabsParent.addEventListener('click', (event) => {
        if (event.target && event.target.matches(`div${tabName}`)) {
            tabs.forEach((tab, i) => {
                if (tab === event.target) {
                    hideTabsContent();
                    showCurrentTab(i);
                }
            })
        }
    });
    hideTabsContent();
    showCurrentTab();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./Food/js/modules/timer.js":
/*!**********************************!*\
  !*** ./Food/js/modules/timer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer({timerSelector, deadline, daysSelector, hoursSelector, minutesSelector, secondsSelector}) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }
    }

    function startTimer(timerSelector, endtime) {
        const timer = document.querySelector(timerSelector),
            days = timer.querySelector(daysSelector),
            hours = timer.querySelector(hoursSelector),
            minutes = timer.querySelector(minutesSelector),
            seconds = timer.querySelector(secondsSelector);

        function zeroPad(time) {
            if (time >= 0 && time < 10) {
                return `0${time}`;
            } else return time;
        }

        function updateTimer() {
            const timeData = getTimeRemaining(endtime);
            days.innerHTML = zeroPad(timeData.days);
            hours.innerHTML = zeroPad(timeData.hours);
            minutes.innerHTML = zeroPad(timeData.minutes);
            seconds.innerHTML = zeroPad(timeData.seconds);
        }

        updateTimer();
        let timerInterval = setInterval(updateTimer, 1000);

    }

    startTimer(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./Food/js/script.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./Food/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./Food/js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./Food/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./Food/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./Food/js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./Food/js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./Food/js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
        {
            tab: '.tabcontent',
            tabName: '.tabheader__item',
            tabNameParent : '.tabheader__items',
            activeTabClass: 'tabheader__item_active'
        }
    );
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])({
        timerSelector : '.timer',
        deadline : '2022-03-30',
        daysSelector: '#days',
        hoursSelector: '#hours',
        minutesSelector: '#minutes',
        secondsSelector: '#seconds',
    });
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])(
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map