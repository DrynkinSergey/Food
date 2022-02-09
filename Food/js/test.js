/*
/!*
const names = ['anna', 'Ivan', 'SerGey'];

const res = names.map(item => {
    return item.toLowerCase();
})
console.log(res);

const moreThenFive = names.filter((name)=> {
    return name.length>5;
})
console.log(moreThenFive);*!/



every/some
*/
// const some = [1, '4242', 321];
// console.log(some.some(item => typeof (item) === 'number'));
// console.log(some.every(item => typeof (item) === 'number'));

/*

const arr = [1,2,3,4,5,6];
const res = arr.reduce((sum,current)=> sum+current)
console.log(res);
*/
/*
const arr = ['petya', 'sasha', 'masha', 'dasha'];
const res = arr.reduce((sum,current)=> `${sum},${current}`)
console.log(res);
*/

const object = {
    ann: 'persone',
    den: 'persone',
    dog: 'animal',
    cat: 'animal',
};
const newArr = Object.entries(object) //                Преобразовываем обьект в массив
    .filter(item => item[1] === 'persone')//            Отбираем только 'persone'
    .map(item => item[0])//                             Создаем новый массив только с именами
    .reduce((first, current) => `${first}, ${current}`)// Вытаскиваем из массива в строки имена, разделяя ,
console.log(newArr);
