import { displayLogin, displayHeaderAndSearchBar } from './utils.js'
import { getMostWatchedMovies, getMovieHtml, getGenres } from './async.js'

getGenres()
    .then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) )

// const callAsync = await getMostWatchedMovies() 
const callAsync = displayLogin() 
document.body.innerHTML = callAsync

// document.body.innerHTML = displayHeaderAndSearchBar()
// const searchBar = document.getElementById('search-movie')

// searchBar.addEventListener( 'keyup', e => {
//     if ( e.key !== 'Enter' ) { return }   

//     getMovieHtml( searchBar.value )
//         .then( htmlRes => {
//             const resContainer = document.getElementById('results-container')
//             resContainer.innerHTML = htmlRes
//         } )
// } )

// TO TEST QUICKER [TODO DELETE]
// getMovieHtml( 'harry' )
//         .then( htmlRes => {
//             const resContainer = document.getElementById('results-container')
//             resContainer.innerHTML = htmlRes
//         } )