import { 
    Movie, 
    loginHtml, 
    handleLogin, 
    headerAndSearchBarHtml, 
    mostWatchedhtml, 
    mostWatchedMockup, 
    homeMockup, 
    getDetailsHtml, 
    showResAndSetUpBtn,
    displayLogin,
    searchFunctionality
} from './utils.js'

import { 
    getMostWatchedMovies,
    getRecommendedMovies,
    getGenres,
    getLangs,
    getMovieHtml,
    getMovieById,
    search,
    getUser
} from './async.js'

import {
    setUpSelectionButtons, 
    setUpWatchBtns, 
    showDetails,
    changeClass,
    setUpRecommendedMovies,
    setUpMovies
} from './buttonsSetUp.js'

getGenres().then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) )
getLangs().then( langsArray => sessionStorage.setItem( 'languages', JSON.stringify( langsArray ) ) )

displayLogin()

/*

getMostWatchedMovies()
    .then( mostWatched => {
        document.getElementById('results-container').innerHTML = mostWatched
        setUpMovies()
    } )
// getMovieHtml( 'harry' )
//     .then( htmlRes => {
//         const resContainer = document.getElementById('results-container')
//         resContainer.innerHTML = htmlRes
//         setUpWatchBtns()
//     } )

// getDetailsHtml( '671' )
    // .then( htmlRes => {
    //     const resContainer = document.getElementById('results-container')
    //     resContainer.innerHTML = htmlRes
    //     setUpWatchBtns()
    // } )
*/
// searchFunctionality()

// DISPLAY MOCKUPS
// document.getElementById('master-container').innerHTML = loginHtml
// showResAndSetUpBtn()
setUpSelectionButtons()

// showDetails()

/*
const callAsync = headerAndSearchBarHtml 
document.getElementById('master-container').innerHTML = callAsync

const resultsContainer = document.getElementById('results-container')
resultsContainer.innerHTML = await getMostWatchedMovies() */