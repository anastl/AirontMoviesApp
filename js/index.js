import { 
    changeClass, 
    setUpSelectionButtons, 
    showDetails, 
    displayLogin, 
    displayHeaderAndSearchBar, 
    homeMockup, 
    handleLogin, 
    getDetailsHtml, 
    showResAndSetUpBtn 
} from './utils.js'
import { getMostWatchedMovies, getMovieHtml, getGenres } from './async.js'

// getGenres()
//     .then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) )

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

// DISPLAY MOCKUPS
// document.body.innerHTML = displayLogin()
showResAndSetUpBtn()
setUpSelectionButtons()

// showDetails()

/*
const callAsync = displayHeaderAndSearchBar() 
document.body.innerHTML = callAsync

const resultsContainer = document.getElementById('results-container')
resultsContainer.innerHTML = await getMostWatchedMovies() */