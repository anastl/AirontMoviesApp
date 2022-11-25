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
    displayLogin
} from './utils.js'

import { 
    getMostWatchedMovies,
    getRecommendedMovies,
    getGenres,
    getLangs,
    getMovieHtml,
    getMovieById,
    search,
    getUsers
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

document.getElementById('master-container').innerHTML = headerAndSearchBarHtml
const searchBar = document.getElementById('search-movie')

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

searchBar.addEventListener( 'keyup', e => {    
    search( searchBar.value )
        .then( searchResults => {
            document.getElementById('dropdown').innerHTML = searchResults
        } )

    if ( ! searchBar.value ){
        document.getElementById('dropdown').innerHTML = ''
    }

    console.log( e.key === 'Enter', searchBar.value, e.key === 'Enter' && searchBar.value ) 
    if( e.key === 'Enter' && searchBar.value ) {
        getMovieHtml( searchBar.value )
            .then( htmlRes => {
                const resContainer = document.getElementById('results-container')
                resContainer.innerHTML = htmlRes
                setUpWatchBtns()
            } )
        searchBar.value = ''
        document.getElementById('dropdown').innerHTML = ''
    }

} )

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