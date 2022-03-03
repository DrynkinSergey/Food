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

export default modal;
export {showModal, closeModal};
