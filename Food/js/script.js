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

    const deadline = '2022-01-30';

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

    const card = document.querySelector('.menu__item'),
            src= card.querySelector('[src]'),
            title = card.querySelector('.menu__item-subtitle'),
            alt = card.querySelector('[alt]'),
            descr = card.querySelector('.menu__item-descr'),
            price = card.querySelector('.menu__item-total');
    const menu = document.querySelector('.menu__field'),
        menuContainer = menu.querySelector('.container');


    class MenuCard {
        constructor(src, title, alt, descr, price) {
        this.src = src;
        this.title = title;
        this.alt = alt;
        this.descr = descr;
        this.price = price;
        }
        addCard() {

            menuContainer.innerHTML += ` <div class="menu__item">
                    <img src="${this.src}" alt='${this.alt}'>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>`


        }
    }
    function eraseMenuCard () {
        menuContainer.innerHTML = '';
        menuContainer.style.flexWrap = 'wrap';

    }
    eraseMenuCard()
    const v2=  new MenuCard("img/tabs/vegy.jpg",2,1,2,12222);
    for (let i = 0; i < 5; i++) {
        v2.addCard();
    }

});