import {
    asMostWatched
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

async function fetchMostWatched( page ){
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

async function fetchSimilar( id ){
    try {
        const baseUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
        const res = await fetch( baseUrl )
        const recommended = await res.json()
    
        const recommendedArray = recommended.results
    
        return recommendedArray.map( ( { id, title, backdrop_path } ) => ( { id, title, backdrop_path } ) )
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
    }
}

// movieid
// numberOfRecs

// async function setUpAddMoreBtn( btn ){
    
//     const id = btn.dataset.movieId
//     const numberOfRecs = btn.dataset.numberOfRecs
//     const recommendedImgs = await fetchSimilar( id ).slice(0, numberOfRecs).map( movieObj => asRecommended( movieObj ) )
    
//     document.getElementById('similar-container').innerHTML = recommendedImgs
//     similarContainer.innerHTML += addMoreSvg( id, numberOfRecs+3 )
// }

async function addMoviesToMostWatched( lastPage, observer ){
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


export {
    fetchGenres, 
    fetchLanguages, 
    fetchMovie, 
    fetchMostWatched, 
    fetchSimilar, 
    getUser,
    addMoviesToMostWatched
}