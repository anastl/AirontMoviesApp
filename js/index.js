import { 
    Movie, 
    displayLogin, 
    displayHeaderAndSearchBar, 
    mostWatchedhtml, 
    mostWatchedMockup, 
    homeMockup, 
    getDetailsHtml, 
    handleLogin, 
    showResAndSetUpBtn
} from './utils.js'

import { 
    getMostWatchedMovies,
    getRecommendedMovies,
    getGenres,
    getLangs,
    getMovieHtml,
    getMovieById,
    getRecs, 
    search
} from './async.js'

import {
    setUpSelectionButtons, 
    setUpWatchBtns, 
    showDetails,
    changeClass,
    setUpRecommendedMovies
} from './buttonsSetUp.js'

getGenres().then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) )
getLangs().then( langsArray => sessionStorage.setItem( 'languages', JSON.stringify( langsArray ) ) )

document.body.innerHTML = displayHeaderAndSearchBar()
const searchBar = document.getElementById('search-movie')

// getMovieHtml( 'harry' )
//     .then( htmlRes => {
//         const resContainer = document.getElementById('results-container')
//         resContainer.innerHTML = htmlRes
//         setUpWatchBtns()
//     } )

getDetailsHtml( '671' )
    // .then( htmlRes => {
    //     const resContainer = document.getElementById('results-container')
    //     resContainer.innerHTML = htmlRes
    //     setUpWatchBtns()
    // } )

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
// showResAndSetUpBtn()
setUpSelectionButtons()

// showDetails()

/*
const callAsync = displayHeaderAndSearchBar() 
document.body.innerHTML = callAsync

const resultsContainer = document.getElementById('results-container')
resultsContainer.innerHTML = await getMostWatchedMovies() */