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

    modals.forEach(btn => {
        btn.addEventListener('click', showModal);
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    })


    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showModal() {
        modal.classList.add('show')
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', (e) => {
            if (modal.classList.contains('show') && e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    function openModalWhenEndScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', openModalWhenEndScroll);
        }
    }

    window.addEventListener('scroll', openModalWhenEndScroll);

    //Cards


    class MenuCard {
        constructor(src, alt,title, descr, price, parentSelector, ...classes) {
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

        if(!res.ok ){
            throw new Error(`Could not fetch ${url} status ${res.status}`)
        }
        return await res.json();
    }
    getData( 'http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg,title,descr,price}) => {
                new MenuCard(img, altimg,title,descr,price, '.menu .container').addCard();
            });
        });


    //Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
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
        showModal();
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
            closeModal();
        }, 3000);
    }

    //slider


    const slider = document.querySelector('.offer__slider');
    const sliderItem = slider.querySelectorAll('.offer__slide');
    let currentItem = 1;
    const nextSlide = slider.querySelector('.offer__slider-next');
    const prevSlide = slider.querySelector('.offer__slider-prev');
    const current = slider.querySelector('#current');



    setActiveSlide(currentItem);
    function changeCurrentIndex(){
        if (currentItem<=9){
            current.textContent = `0${currentItem}`;
        }
    }
    nextSlide.addEventListener('click',() => {
        ++currentItem;
        if(currentItem <= sliderItem.length){
            setActiveSlide(currentItem);
        } else {
            currentItem=1;
            setActiveSlide(currentItem);
        }
        changeCurrentIndex();

    })
    prevSlide.addEventListener('click',() => {
        --currentItem;
        if(currentItem <= 0){
            currentItem=sliderItem.length;
            setActiveSlide(currentItem);
        } else {
            setActiveSlide(currentItem);
        }
        changeCurrentIndex();

    })

    function setActiveSlide(index){
        sliderItem.forEach(item => item.style.display='none')
        sliderItem[index-1].style.display='block'
    }

});