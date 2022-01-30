"use strict"
const rub = document.querySelector('#inputRUB');
const usd = document.querySelector('#inputUSD');

rub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('load', () => {
        if(request.status === 200) {
            const data = JSON.parse(request.response)
            console.log(data.current.usd);
            usd.value = (+rub.value / +data.current.usd).toFixed(2);
        } else {
            console.log('error')
        }

    })
})