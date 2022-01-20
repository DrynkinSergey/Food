'use strict';

let numberOfFilms;

function start () {
    numberOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');
    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');
    }

}

const personalMovieDB = {

    rememberMyFilms: () => {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                b = prompt('На сколько оцените его?', '');

            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMovieDB.movies[a] = b;
                console.log('done');
            } else {
                console.log('error');
                i--;
            }
        }
    },
    detectPersonalLevel() {
        if (personalMovieDB.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log("Вы классический зритель");
        } else if (personalMovieDB.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },
    showMyDB () {
        if(personalMovieDB.private == false) {
            console.log(personalMovieDB);
        }else{
            alert('База находится в приватном режиме')
        }
    },
    writeYourGenres () {
        for (let i =1; i<=3; i++) {
            while (personalMovieDB.genres[i - 1] == '' || personalMovieDB.genres[i - 1] == null) {
                personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр номер ${i} :`);
            }
        }
        personalMovieDB.genres.forEach((element, i) => {
            console.log(`Любимый жанр № ${i+1} - это ${element}`)

        }
    )
    },
    toggleVisibleMyDb () {
      let toggle = personalMovieDB.private;
        console.log(`Сейчас режим находится в  ${toggle}....`);
        console.log(`Переходим в режим ${!toggle}....`);
        personalMovieDB.private = !toggle;
        console.log(personalMovieDB.private);
    },
    count : numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private:false
};
start();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB();



