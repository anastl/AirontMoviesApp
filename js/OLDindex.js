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
    getModalAndSetUp,
    searchFunctionality
} from './OLDutils.js'

import { 
    getMostWatchedMovies,
    getRecommendedMovies,
    getGenres,
    getLangs,
    getMovieHtml,
    getMovieById,
    search,
    getUser
} from './OLDasync.js'

import {
    setUpSelectionButtons, 
    setUpWatchBtns, 
    showDetails,
    changeClass,
    setUpRecommendedMovies,
    setUpMovies
} from './OLDbuttonsSetUp.js'

if ( ! sessionStorage.getItem('genres') ) 
getGenres().then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) )
if ( ! sessionStorage.getItem('languages') ) 
    getLangs().then( langsArray => sessionStorage.setItem( 'languages', JSON.stringify( langsArray ) ) )

    
displayLogin()
getModalAndSetUp( '663712' )

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