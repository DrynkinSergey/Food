import {closeModal, showModal} from "./modal";

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
        showModal('.modal');
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
            closeModal('.modal');
        }, 3000);
    }
}

export default forms;