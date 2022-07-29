import { movies } from '../modules/db.js';

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

let inpSearch = document.querySelector('#search')

//Modal
let content_head_title_h3 = document.querySelector('.content_head_title_h3'),
    year = document.querySelector('.year'),
    metascore = document.querySelector('.metascore'),
    votes = document.querySelector('.votes'),
    modal_img = document.querySelector('.modal_img'),
    country = document.querySelector('.country'),
    lang = document.querySelector('.lang'),
    genre = document.querySelector('.genre'),
    runtime = document.querySelector('.runtime'),
    released = document.querySelector('.released'),
    budget = document.querySelector('.budget'),
    director = document.querySelector('.director'),
    description = document.querySelector('.description'),
    actors = document.querySelector('.actors');




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
//Serach
// inpSearch.onkeyup = () => {
//     let filtered = movies.filter(item => item.title.includes(inpSearch.ariaValueMax.toLowerCase()))
//     reload(filtered)
// }

inpSearch.onkeyup = () => {
    let filtered = movies.filter(item => {
        let title = item.title.toLowerCase()
        let value = inpSearch.value.toLowerCase().trim()

        if(title.includes(value)) {
            return item
        }
    })
    reload(filtered)
}


//Sorted
function reload(arr) {
    ul.innerHTML = "";
    showMovie(movies[0])
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
reload(movies)


//Function for bunner
function showMovie(data) {
    promo__bg.style.background = `url('${data.img}') center center/cover no-repeat;`
    promo__genre.innerHTML = `${data.genres}`,
    promo__title.innerHTML = `${data.title}`,
    promo__descr.innerHTML = `${data.plot}`,
    imdb.innerHTML = `IMDb:${data.imdbRating}`
    movieSearch.innerHTML = `Meta Score:${data.metascore}`
        
}


function modalShow(data) {
    content_head_title_h3.innerHTML = data.title;
    year.innerHTML = data.yaer;
    metascore.innerHTML = `Meta Score:${data.metascore}`
    votes.innerHTML = `(${data.imdbVotes} Vote)`;
    modal_img.setAttribute('src', `${data.poster}`);
    country.innerHTML = data.country;
    lang.innerHTML = data.language;
    genre.innerHTML = data.genre;
    runtime.innerHTML = data.runtime;
    released.innerHTML = data.released;
    budget.innerHTML = data.boxOffice;
    director.innerHTML = data.director;
    description.innerHTML = data.plot;
    actors.innerHTML = data.actors;
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
                let genre = [el];
                reload(genre)
                console.log(genre);
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

