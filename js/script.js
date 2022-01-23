
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

    const films = document.querySelector('.promo__interactive-list');
    const formAdd = document.querySelector('form.add');
    const addInput = formAdd.querySelector('.adding__input');
    const checkbox = formAdd.querySelector('[type="checkbox"]')
    const trash = document.querySelectorAll('.delete');


    const renderFilms = ()=> {
        films.innerHTML='';
        movieDB.movies.sort();
        movieDB.movies.forEach((item,i) => {
            films.innerHTML+=`<li class="promo__interactive-item">${i+1}. ${movieDB.movies[i]}
                            <div class="delete"></div>
                        </li>`
        })
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                renderFilms();
            });
        });
    }

    let promo = document.querySelectorAll('.promo__adv');
    promo.forEach(item => {
        item.remove();
    })
    const genre = document.querySelector('.promo__genre');
    genre.innerHTML = 'Драма'
    const bg = document.querySelector('.promo__bg');
    bg.style.backgroundImage = `url('img/bg.jpg')`;



    formAdd.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        if(newFilm.length > 21) {
            movieDB.movies.push( `${newFilm.substr(0, 20)} ...`);
        } else if(newFilm.length !== 0)
        movieDB.movies.push(newFilm);
        event.target.reset();
        renderFilms();
        if (checkbox.checked) {
            console.log("Добавлено в избранные");
        }

    });
    renderFilms()




})