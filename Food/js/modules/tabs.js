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

export default tabs;