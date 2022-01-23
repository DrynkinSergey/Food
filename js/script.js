/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };



    let promo = document.querySelectorAll('.promo__adv');
    promo.forEach(item => {
        item.remove();
    })
    const genre = document.querySelector('.promo__genre');
    genre.innerHTML = 'Драма'
    const bg = document.querySelector('.promo__bg');
    bg.style.backgroundImage = `url('img/bg.jpg')`;


    const renderFilms = ()=> {
        const films = document.querySelector('.promo__interactive-list');
        films.innerHTML='';
        movieDB.movies.sort();
        movieDB.movies.forEach((item,i) => {
            films.innerHTML+=`<li class="promo__interactive-item">${i+1}. ${movieDB.movies[i]}
                            <div class="delete"></div>
                        </li>`
        })
    }

    renderFilms();
    const formAdd = document.querySelector('form.add');
    const addInput = formAdd.querySelector('.adding__input');
    const checkbox = formAdd.querySelector('[type="checkbox"]')
    const trash = document.querySelectorAll('.delete');

    formAdd.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        if(newFilm.length > 21) {
            movieDB.movies.push( `${newFilm.substr(0, 20)} ...`);
        } else if(newFilm.length !== 0)
        movieDB.movies.push(newFilm);
        addInput.value='';
        renderFilms();
        if (checkbox.checked) {
            console.log("Добавлено в избранные");
        }

    });

    trash.forEach((item,i) => {
        item.addEventListener('click', (e) => {
            item.parentElement.remove();
            movieDB.movies.splice(i,1);

        })
    })


})