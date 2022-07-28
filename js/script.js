import { movies } from '../modules/db.js';
/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';
//Variables
let ul = document.querySelector('.promo__interactive-list');
let modal = document.querySelector('.modal');
let promo__bg = document.querySelector('.promo__bg'),
    promo__genre = document.querySelector('.promo__genre'),
    promo__title = document.querySelector('.promo__title'),
    promo__descr = document.querySelector('.promo__descr'),
    imdb = document.querySelector('.imdb'),
    movieSearch = document.querySelector('.movieSearch');

let content_head_title_h3 = document.querySelector('.content_head_title_h3'),
year = document.querySelector('.year')











const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

let newGenres = [];

//Sorted
function reload(arr) {
    ul.innerHtml = "";
    for (const item of arr) {
        let li = document.createElement('li'),
            a = document.createElement('a'),
            del = document.createElement('div'),
            span = document.createElement('span');
        
            li.classList.add('promo__interactive-item'),
            del.classList.add('delete'),
        
            a.innerHTML = `${movies.indexOf(item) + 1}. ${item.title}`
        
            li.append(span,a,del)
            ul.append(li);

        
            a.onclick = () => {
                modal.style.display = 'block';

                //Function change showmovies[index]
                showMovie(item);
                modalShow(item);
            }
            del.onclick = () => {
                delItem(item)
            }
        
            if (!newGenres.includes(item.genres)) {
                newGenres.push(item.genres)
                console.log(newGenres);
            }

        
    }
}
//Function for bunner
function showMovie(data) {
    // promo__bg.style.background = `url("${}") center center/cover no-repeat;`
    promo__genre.innerHTML = `${data.genres}`,
    promo__title.innerHTML = `${data.title}`,
    promo__descr.innerHTML = `${data.plot}`,
    imdb.innerHTML = `IMDb:${data.imdbRating}`
    movieSearch.innerHTML = `Meta Score:${data.metascore}`
        
}
showMovie(movies[0])
reload(movies)

function modalShow(data) {
    content_head_title_h3.innerHTML = data.title;
    year.innerHTML = data.yaer;
}

//Function del
function delItem (data) {    
    let idx = movies.indexOf(data)
    movies.splice(idx, 1)
    reload(movies)
    console.log(movies);
}

//Meny activity and Filter by Genres
let promo__menu_item = document.querySelectorAll('.promo__menu-item');
promo__menu_item.forEach(item => {
    item.onclick = () => {
        promo__menu_item.forEach(el => el.classList.remove('promo__menu-item_active'))
        item.classList.add('promo__menu-item_active')
        
        //Outputing with Type
        let type = item.getAttribute('data-type')
        movies.filter(el => {
            if (el.type.toLowerCase() == type.toLowerCase()) {
                let filtered = [el];
                reload(filtered)
            }
        });
    }
})

// Close Modal
let close = document.querySelector('.close')

close.onclick = () => {
    modal.style.animationName = 'close';
    setTimeout(() => {
        modal.style.display = 'none';
         modal.style.animationName = '';
    },1000)
}

