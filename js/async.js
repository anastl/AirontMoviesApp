import {
    asRecommended,
    asMostWatched,
    asMain,
    asDropdown, 
    asError,
    setModalOpener
} from './utils.js'

async function fetchGenres() {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=a549a10218e6b1e84fddfc056a830b2c`
        const res = await fetch(url)
        const data = await res.json()
        return data.genres
    } catch ( e ) { console.log( e ) }
}

async function fetchLanguages() {
    try {
        const url = `https://api.themoviedb.org/3/configuration/languages?api_key=a549a10218e6b1e84fddfc056a830b2c`
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch ( e ) { console.log( e ) }
}

async function fetchMovie( movieId ) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
        const res = await fetch( url )
        const movie = await res.json()
        return movie
    } catch ( e ) { console.log( e ) }
}

async function fetchMostWatched( page ) {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&page=${ parseInt(page) }`
        const res = await fetch( url )
        const mostWatched = await res.json()
        return {
            movies: mostWatched.results,
            totalPages: mostWatched.total_pages
        }
    } catch ( e ) { console.log( e ) }
}

async function fetchSimilar( movieId, page ){
    try {
        const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&page=${page}`
        const res = await fetch( baseUrl )
        const recommended = await res.json()
        
        const recommendedArray = recommended.results
        const cleanSimilar = recommendedArray.filter( ( { id } ) => id !== movieId )
    
        return cleanSimilar.map( ( { id, title, backdrop_path } ) => backdrop_path && ( { id, title, backdrop_path } ) )
    } catch ( e ) { console.log( e ) }
}

async function getUser( email, password ){
    // Password123!
    // email@email.com
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { "email": email, "password": password} )
        }
    
        const res = await fetch( `http://localhost:3000/login/`, options )
        const data = await res.json()
        return data
    } 
    catch ( e ) {
        console.log( e )
        return "A connection error ocurred, please try again" 
    }
}

async function searchMovieAsMain ( query ) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query }&include_adult=false`
        const res = await fetch( url ) 
        const searchResults = await res.json()

        const moviesArray = searchResults.results.slice(0,5).map( ( { id, title, genre_ids, vote_average, overview, backdrop_path } ) => asMain( id, title, genre_ids[0], overview, vote_average, backdrop_path ) ).join(' ')

        return moviesArray
    } catch ( e ) { document.getElementById('error-modal').innerHTML = asError( e ) }
}

async function searchMovieAsDropdown ( query ) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query }&include_adult=false`
        const res = await fetch( url )
        const searchResults = await res.json()

        const moviesArray = searchResults.results.slice(0,5).map( ( { id, title, release_date, poster_path } ) => asDropdown( id, title, release_date, poster_path ) ).join(' ')

        return moviesArray
    } catch ( e ) { document.getElementById('error-modal').innerHTML = asError( e ) }
}

async function addMoviesToMostWatched( lastPage, observer ) {
    try {
        const { movies, totalPages } = await fetchMostWatched( lastPage + 1 )
        
        const mostWatchedArray = movies.map( ( { id, title, overview, vote_average, backdrop_path } ) => {
            if ( backdrop_path ) { 
                return asMostWatched( id, title, overview, vote_average, backdrop_path ) 
            }
        } ).join('')
            
        const mostWatchedContainer = document.getElementById('most-watched-container')
        mostWatchedContainer.innerHTML += mostWatchedArray
    
        const trigger = document.getElementById('trigger')
        trigger.removeAttribute('id')
        
        const targetArray = document.getElementsByClassName('most-watched--movie')
        const target = targetArray[ targetArray.length - 10 ]
        target.setAttribute('id', 'trigger')
        target.dataset.lastPage = parseInt(lastPage) + 1
        target.dataset.totalPages = totalPages
        observer.observe( target )
    } catch ( e ) { console.log( e ) }
}

// SAVE API CALLS TO SESSION STORAGE
async function addSimilarMovies( movieId ) { //handle modal, works
/*
    const { id,
        title,
        genres,
        vote_average,
        overview,
        backdrop_path,
        release_date,
        original_language } = await fetchMovie( movieId )
                
        const modal = asModal( id, title, genres[0], overview, release_date, backdrop_path, original_language, vote_average )
        document.getElementById('modal-container').innerHTML = modal
*/
    const addMoreBtn = document.getElementById('add-more')
    const oldPage = parseInt( addMoreBtn.dataset.page )
    const recommendedArray = await fetchSimilar( movieId, oldPage )

    if ( oldPage === 1 ) {
        sessionStorage.setItem('similarMovies', JSON.stringify( recommendedArray ) )
    }
    const recommendedImgs = recommendedArray.map( ( { id, title, backdrop_path } ) => asRecommended( id, title, backdrop_path ) )

    const parent = addMoreBtn.parentElement
    
    recommendedImgs.slice( 0, 3 ).forEach( imgDiv => parent.insertBefore( imgDiv, addMoreBtn ) )
    
    addMoreBtn.addEventListener('click', async () => {
        const oldIndex = parseInt( addMoreBtn.dataset.numberOfRecs )
        const newIndex = oldIndex + 3
        const page = parseInt( addMoreBtn.dataset.page )
        const numberOfSimilar = 18 * parseInt( page ) 
        addMoreBtn.dataset.numberOfRecs = newIndex
        addMoreBtn.dataset.page = newIndex >= numberOfSimilar ? parseInt( page )+1 : page
        if( newIndex >= numberOfSimilar  ) {
            const moreSimilar = await fetchSimilar( movieId, parseInt( page )+1 )
            moreSimilar.forEach( img => recommendedArray.push( img ) )
            sessionStorage.setItem('similarMovies', JSON.stringify( recommendedArray ) )
        }

        const recImgs = recommendedArray.map( ( { id, title, backdrop_path } ) => asRecommended( id, title, backdrop_path ) )

        recImgs.slice( oldIndex, newIndex ).forEach( imgDiv => parent.insertBefore( imgDiv, addMoreBtn ) )

        const showModalArray = [ ... document.getElementsByClassName('sm') ]
    showModalArray.forEach( el => {
        setModalOpener( el )
    } )
    } )
} 

async function searchInputCallback( e ) {
    const searchMovieInput = document.getElementById('search-movie')
    const query = searchMovieInput.value
    const dropdown = document.getElementById('dropdown-container')
    const mainContainer = document.getElementById('results-container')

    if ( ! query || query.length === 0 ) {
        dropdown.style.display = 'none'
    }
    if ( query.length < 3 ) return
    
    dropdown.style.display = 'flex'
    if ( e.key === 'Enter' ) { // Show results
        mainContainer.innerHTML = await searchMovieAsMain( query )
        dropdown.innerHTML = ''
        searchMovieInput.value = ''
        dropdown.style.display = 'none'

        const showModalArray = [ ... document.getElementsByClassName('sm') ]
        showModalArray.forEach( el => setModalOpener( el ) )
    } else { // Show dropdown
        dropdown.innerHTML = await searchMovieAsDropdown( query )

        const showModalArray = [ ... document.getElementsByClassName('sm') ]
        showModalArray.forEach( el => setModalOpener( el ) )
    }
}

export {
    fetchGenres, 
    fetchLanguages, 
    fetchMovie, 
    fetchMostWatched, 
    fetchSimilar, 
    getUser,
    searchMovieAsMain, 
    searchMovieAsDropdown, 
    addMoviesToMostWatched,
    addSimilarMovies,
    searchInputCallback
}