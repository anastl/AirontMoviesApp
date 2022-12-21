import {
    homeHtml, 
    asModal,
    asMain,
    asMostWatched,
    asRecommended,
    asDropdown, 
    asError,
    setUpLogin,
    setModalOpener,
    selectViewCallback,
    hideDropdown,
    asTrailer,
    onYouTubeIframeAPIReady,
    player
} from './utils.js'

async function addMoviesToMostWatched( lastPage, observer ) {
    try {
        const { movies, totalPages } = await fetchMostWatched( lastPage + 1 )
        
        const mostWatchedArray = movies.map( ( { id, title, overview, vote_average, backdrop_path } ) => {
            if ( id && title && overview && vote_average && backdrop_path ) { 
                return asMostWatched( id, title, overview, vote_average, backdrop_path ) 
            }
        } ).join('')
            
        const mostWatchedContainer = document.getElementById('most-watched--results')
        mostWatchedContainer.insertAdjacentHTML( 'beforeend', mostWatchedArray )

        const showModalArray = [ ... document.getElementsByClassName('sm') ]
        showModalArray.forEach( el => setModalOpener( el ) )
    
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

async function addSimilarMovies( e ) { 
    const addMoreBtn = document.getElementById('add-more')
    
    const movieId = addMoreBtn.dataset.movieId
    const oldPage = parseInt( addMoreBtn.dataset.page )
    const oldNumberOfRecs = parseInt( addMoreBtn.dataset.numberOfRecs )

    const newNumberOfRecs = oldNumberOfRecs+3
    const isEndOfCurrPage = newNumberOfRecs >= oldPage*18 ? true : false
    const newPage = isEndOfCurrPage ? oldPage+1 : oldPage

    let memoryRecs = JSON.parse( sessionStorage.getItem('similarMovies') )
    if ( ! memoryRecs ) { // first time fetching similar movies 
        memoryRecs = await fetchSimilar( movieId, newPage )
        sessionStorage.setItem('similarMovies', JSON.stringify( memoryRecs ) )
    } 
    else if ( isEndOfCurrPage ) { // time to get a new page from API
        memoryRecs = [ ...memoryRecs, ...await fetchSimilar( movieId, newPage ) ]
        sessionStorage.setItem('similarMovies', JSON.stringify( memoryRecs ) )
    }

    const recommendedImgs = memoryRecs.map( ( { id, title, backdrop_path } ) => asRecommended( id, title, backdrop_path ) ).slice( oldNumberOfRecs, newNumberOfRecs ).join('')
    addMoreBtn.insertAdjacentHTML( 'beforebegin', recommendedImgs )
    addMoreBtn.dataset.page = newPage
    addMoreBtn.dataset.numberOfRecs = newNumberOfRecs

    const showModalArray = [ ...document.getElementsByClassName('sm') ]
    showModalArray.forEach( el => setModalOpener( el ) )

    e && addMoreBtn.scrollIntoView( { behavior: 'smooth' } )
} 

async function displayModal( movieId ) {
    sessionStorage.removeItem('similarMovies')
    const modalContainer = document.getElementById('modal-container')

    const { id, title, genres, overview, release_date, backdrop_path, original_language, vote_average } = await fetchMovie( movieId )

    modalContainer.innerHTML = asModal( id, title, genres[0], overview, release_date, backdrop_path, original_language, vote_average )

    modalContainer.style.display = 'flex'
    document.getElementById('most-watched-container').style.display = 'none'
    document.getElementById('results-container').style.display = 'none'

    document.getElementById('close-modal').addEventListener('click', () => {
        modalContainer.style.display = 'none'
        modalContainer.innerHTML = ''
        document.getElementById('most-watched-container').style.display = 'flex'
        document.getElementById('results-container').style.display = 'flex'
        sessionStorage.removeItem('similarMovies')
    } )
    document.getElementById('play').addEventListener('click', async event => {
        const buttonMovieId = event.target.dataset.movieId
        const videoId = await getVideoUrl( buttonMovieId )

        const trailerContainer = document.getElementById('trailer-container')
        
        trailerContainer.style.display = 'grid'
        trailerContainer.innerHTML = asTrailer(videoId, title)
        trailerContainer.addEventListener( 'click', () => {
            trailerContainer.innerHTML = ''
            trailerContainer.style.display = 'none'
        } )
    } )

    const addMoreBtn = document.getElementById('add-more')
    addMoreBtn.addEventListener( 'click', addSimilarMovies )

    await addSimilarMovies( )
}

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

async function fetchMovie( movieId ) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
        const res = await fetch( url )
        const movie = await res.json()
        return movie
    } catch ( e ) { console.log( e ) }
}

async function fetchSimilar( movieId, page ){
    try {
        const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&page=${page}`
        const res = await fetch( baseUrl )
        const recommended = await res.json()
        
        if ( recommended.total_pages === page )
            document.getElementById('add-more').style.display = 'none'

        else if ( recommended.total_results ) {
            const recommendedArray = recommended.results
            const cleanSimilar = []
            recommendedArray.forEach( ( { id, title, backdrop_path } ) =>{
                // console.log( id != movieId, id, movieId )
                if( id != movieId && title && backdrop_path )
                    cleanSimilar.push( { id, title, backdrop_path } )
            } )

            return cleanSimilar
        } else {
            document.getElementById('similar-container').style = 'none'
            document.getElementById('similar-container--title').style = 'none'
        }
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

async function getVideoUrl( movieId ){
    try {
        const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
        const res = await fetch( baseUrl )
        const data = await res.json()
        const videos = data.results
        for ( const video of videos ) {
            if ( video.type === 'Trailer' ) 
                return video.key
        }
        return videos[0].key
    } catch ( e ) { console.log( e ) }
}

async function searchInputCallback( e ) {
    const searchMovieInput = document.getElementById('search-movie')
    const query = searchMovieInput.value
    const dropdown = document.getElementById('dropdown-container')
    const resultsContainer = document.getElementById('results-container')

    if ( ! query || query.length === 0 ) dropdown.style.display = 'none' 
    if ( query.length < 3 ) return
    
    dropdown.style.display = 'flex'
    const lastSearches = JSON.parse( sessionStorage.getItem('lastSearches') )        
    if ( e.key === 'Enter' ) { // Show results
        if ( lastSearches ) {
            sessionStorage.setItem('lastSearches', JSON.stringify( [ ...lastSearches, searchMovieInput.value ] ) )
        } else {
            sessionStorage.setItem('lastSearches', JSON.stringify( [ searchMovieInput.value ] ) )
        }
        resultsContainer.innerHTML =  await searchMovieAsMain( query )
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

async function searchMovieAsDropdown ( query ) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query }&include_adult=false`
        const res = await fetch( url )
        const searchResults = await res.json()
        if ( searchResults.total_results ) {
            const moviesArray = []
            searchResults.results.slice(0,5).forEach( ( { id, title, release_date, poster_path } ) => {
                if ( id && title && release_date && poster_path )
                    moviesArray.push( asDropdown( id, title, release_date, poster_path ) )
            }  )
    
            return moviesArray.join(' ')
        } else {
            document.getElementById('dropdown-container').style.display = 'none'
        }

    } catch ( e ) { document.getElementById('error-modal').innerHTML = asError( e ) }
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

async function setUpHome() {
    document.getElementById('master-container').innerHTML = homeHtml
        
    const { movies, totalPages } = await fetchMostWatched( 1 )

    const mostWatchedArray = movies.slice( 1 ).map( ( { id, title, overview, vote_average, backdrop_path } ) => {
        if ( id && title && overview && vote_average && backdrop_path ) { 
            return asMostWatched( id, title, overview, vote_average, backdrop_path ) 
        }
    } ).join('')

    const { id, title, genre_ids, overview, vote_average, backdrop_path } = movies[0]
    const mainMovie = asMain( id, title, genre_ids[0], overview, vote_average, backdrop_path )

    const resultsContainer = document.getElementById('results-container')
    const mostWatchedContainer = document.getElementById('most-watched--results')

    resultsContainer.innerHTML = mainMovie 
    mostWatchedContainer.innerHTML = mostWatchedArray 

    const targetArray = mostWatchedContainer.getElementsByClassName('most-watched--movie')
    const target = targetArray[ targetArray.length - 10 ]
    target.setAttribute('id', 'trigger')
    target.dataset.lastPage = 1
    target.dataset.totalPages = totalPages

    const observer = new IntersectionObserver( ( entries, observer ) => {
        entries.forEach( entry => {
            if ( entry.isIntersecting ) {
                addMoviesToMostWatched( entry.target.dataset.lastPage, observer )
                observer.unobserve( entry.target )
            }
        } )
    }, {
        root: null,
        rootMargin: '0px',
        threshold: .75
    } )
    observer.observe( target )

    const logOut = document.getElementById('log-out')
    const searchMovieInput = document.getElementById('search-movie')

    logOut.addEventListener('click', () => {
        localStorage.removeItem('logged')
        document.removeEventListener('click', hideDropdown )
        setUpLogin()
    } )
    
    document.addEventListener('click', hideDropdown )
    searchMovieInput.addEventListener('keyup', searchInputCallback )

    const showModalArray = [ ... document.getElementsByClassName('sm') ]
    showModalArray.forEach( el => setModalOpener( el ) )

    const viewBtns = [ ... document.getElementsByClassName('svg-btn') ]
    viewBtns.forEach( btn => btn.addEventListener('click', selectViewCallback) )
}


// async function recommendedMoviesCallback( ) {
//     console.log( this )
//     const movieId = this.dataset.movieId
//     const oldPage = parseInt( this.dataset.page )

//     const recommendedArray = await fetchSimilar( movieId, oldPage )

//     const oldIndex = parseInt( this.dataset.numberOfRecs )
//     const newIndex = oldIndex + 3
//     const page = parseInt( this.dataset.page )
//     const numberOfSimilar = 18 * parseInt( page ) 
//     this.dataset.numberOfRecs = newIndex
//     this.dataset.page = newIndex >= numberOfSimilar ? parseInt( page )+1 : page
//     if( newIndex >= numberOfSimilar  ) {
//         const moreSimilar = await fetchSimilar( movieId, parseInt( page )+1 )
//         moreSimilar.forEach( img => recommendedArray.push( img ) )
//         sessionStorage.setItem('similarMovies', JSON.stringify( recommendedArray ) )
//     }

//     const recImgs = recommendedArray.map( ( { id, title, backdrop_path } ) => asRecommended( id, title, backdrop_path ) )

//     recImgs.slice( oldIndex, newIndex ).forEach( imgDiv => this.parentElement.insertBefore( imgDiv, this ) )

//     const showModalArray = [ ... document.getElementsByClassName('sm') ]
//     showModalArray.forEach( el => {
//         setModalOpener( el )
//     } )
// }

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
    searchInputCallback,
    setUpHome, 
    displayModal,
    getVideoUrl
}