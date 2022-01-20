'use strict';

let numberOfFilms;

function start () {
    numberOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');
    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');
    }

}
start();

const personalMovieDB = {
    count : numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private:false
};

function rememberMyFilms () {
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
}
rememberMyFilms();

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log("Вы классический зритель");
    } else if (personalMovieDB.count >= 30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }
}
detectPersonalLevel();

function showMyDB () {
    if(personalMovieDB.private == false) {
        console.log(personalMovieDB);
    }else{
        alert('DB IS BLOCKED')
    }
}
showMyDB();
function writeYourGenres () {
    for (let i =1; i<=3; i++) {
        personalMovieDB.genres[i] = prompt(`Ваш любимый жанр номер ${i} :`);
    }
    console.log(personalMovieDB);

}
writeYourGenres();

