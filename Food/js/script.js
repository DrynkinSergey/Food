window.addEventListener('DOMContentLoaded', () => {

//Tabs

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        })
    }

    function showCurrentTab(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active');

    }

    tabsParent.addEventListener('click', (event, i) => {
        if (event.target && event.target.matches('div.tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (tab == event.target) {
                    hideTabsContent();
                    showCurrentTab(i);
                }
            })
        }
    });


    hideTabsContent();
    showCurrentTab();


    //Timer

    const deadline = '2022-02-30';

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

    function startTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

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

    startTimer('.timer', deadline);

    //Modal

    const modal = document.querySelector('.modal');
    const modals = document.querySelectorAll('[data-modal]');
    const closeModalBtn = document.querySelector('.modal__close');

    modals.forEach(btn => {
        btn.addEventListener('click', showModal);
    })

    closeModalBtn.addEventListener('click', closeModal);


    function closeModal () {
         modal.classList.remove('show');
         document.body.style.overflow = '';
     }

    function showModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', (e) => {
            if(modal.classList.contains('show') && e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    function openModalWhenEndScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', openModalWhenEndScroll);
        }
    }
    window.addEventListener('scroll', openModalWhenEndScroll);

    //Cards




    class  MenuCard {
        constructor(src, title, alt, descr, price,parentSelector,...classes) {
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
            if(this.classes.length === 0) {
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


   new MenuCard(
       'img/tabs/vegy.jpg',
       'Меню "Фитнес',
       'vegy',
       'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
       229,
       '.menu .container'

   ).addCard();
    new MenuCard(
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'elite',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container'
    ).addCard();
    new MenuCard(
        'img/tabs/post.jpg',
        'Меню "Постное"',
        'post',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        430,
        '.menu .container'
    ).addCard();


    //Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Успешно',
        failure: 'Ошибка'
    }
    forms.forEach(item => {
        postData(item);
    })
    function postData(form) {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent=message.success;
                    form.reset();
                    setTimeout(()=> {
                        statusMessage.remove();
                    }, 1000);
                }else {
                    statusMessage.textContent=message.failure;

                }
            })
        })
    }
});