function tabs() {


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

    tabsParent.addEventListener('click', (event) => {
        if (event.target && event.target.matches('div.tabheader__item')) {
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

export default tabs;