import {getRegExp} from "./slider";

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
                    height = getRegExp(input.value);
                    break;
                case 'age':
                    age = getRegExp(input.value);
                    break;
                case 'weight':
                    weight = getRegExp(input.value);
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

export default calc;