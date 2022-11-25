import { headerAndSearchBarHtml, Movie } from './utils.js'

async function getMostWatchedMovies() {
    try {
        const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        const res = await fetch( baseUrl )
        const mostWatched = await res.json()

        const mostWatchedArray = mostWatched.results.map( ( { id, original_title, genre_ids, vote_average, overview, backdrop_path } ) => {
            const movie = new Movie( id, original_title, genre_ids[0], vote_average, overview, backdrop_path ) 
            return movie.getMovieDiv()
        })
        const mostWatchedDiv = (`
            <div class="most-watched-container">
                <p class="title text--bold">Most Watched Movies</p>
                ${ mostWatchedArray.join('') }
            </div>
        `)
        
        return mostWatchedDiv
    } catch ( e ) { console.log( e ) }
}

async function getGenres() {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=a549a10218e6b1e84fddfc056a830b2c`
        const res = await fetch(url)
        const data = await res.json()
        return data.genres
    } catch ( e ) { console.log( e ) }
}

async function getLangs() {
    try {
        const url = `https://api.themoviedb.org/3/configuration/languages?api_key=a549a10218e6b1e84fddfc056a830b2c`
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch ( e ) { console.log( e ) }
}

async function getMovieHtml ( query ) {
    try {
        const mediaUrl = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query }&include_adult=false`
        const res = await fetch( mediaUrl )
        const searchResults = await res.json()

        const moviesArray = searchResults.results.slice(0,5).map( ( { id, original_title, genre_ids, vote_average, overview, backdrop_path } ) => {
            const movie = new Movie( id, original_title, genre_ids, vote_average, overview, backdrop_path ) 
            return movie.getMovieDivWithButton()
        } )
           
        // TODO UNCOMMENT FOLLOWING LINE AND DELETE THE ONE AFTER 
        return moviesArray.join('') + await getMostWatchedMovies()
        // return moviesArray.join('')
        return await getMostWatchedMovies() 
    } catch ( e ) { console.log( e ) }
}

async function getMovieById( id ) {
    try {
        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
        const res = await fetch( movieUrl )
        const movie = await res.json()

        return await movie
    } catch ( e ) { console.log( e ) }
}

async function getRecommendedMovies( idBaseMovie ) {
    const baseUrl = `https://api.themoviedb.org/3/movie/${ idBaseMovie }/recommendations?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&page=1`
    const res = await fetch( baseUrl )
    const recommended = await res.json()

    const recommendedArray = recommended.results
    const imgArray = recommendedArray.map( ( { backdrop_path, title, id } ) => {
        if ( backdrop_path ) {
            return `
            <a class="img-link" href="#" data-movieid="${id}">
                <img class="rec-poster" data-movieid="${id}" src=https://image.tmdb.org/t/p/w1280/${backdrop_path} alt='poster for ${ title }' />
            </a>`
        }
    } )

    const recommendedDiv = `
        <p class="similar--title text--bold">Similar Movies:</p>
        <div class="similar--movies">
            ${ imgArray.join('') }
            <button data-movieid="${idBaseMovie}" id="load-more-similar" class="invisible-btn img-link-btn">
                <img data-movieid="${idBaseMovie}" src="./img/vectors/add.png" alt="more movies" />
            </button>
        </div>`

    return recommendedDiv
}

async function search( query ) {
    let genreToUrl
    const genreArray = JSON.parse( sessionStorage.getItem('genres') )
    genreArray.forEach( genre => {
        if ( genre.name.toLowerCase() === query.toLowerCase() ) {
            genreToUrl = genre.id
        }
    } )

    const urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${genreToUrl}`
    const urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query }&include_adult=false`

    const genreRes = await fetch (urlGenre)
    const movieRes = await fetch (urlMovie)

    const genreData = await genreRes.json()
    const movieData = await movieRes.json()

    const allDataArray = [ ...genreData.results.splice(0,5), ...movieData.results.splice(0,5) ]

    const allDivs = allDataArray.map( ( { id, poster_path, title, release_date } ) => {
        if ( poster_path ) {
            const releaseYear = release_date.split('-')[0]
            return `
                <span data-movieid="${id}" class="dropdown-result">
                    <img class="dropdown-result--img" src="https://image.tmdb.org/t/p/w1280/${poster_path}" alt="Poster for ${title}" />
                    <p class="dropdown-result--title text--boldest">${title}</p>
                    <p class="dropdown-result--year">(${releaseYear})</p>
                </span>`
        }
    } )

    const resultsDiv = `
        <div class="dropdown-category">
            <p class="dropdown--separator-title text--boldest">Movies</p>
            <div class="dropdown-category--container">
                ${allDivs.slice(5).join('')}
            </div>
        </div>    
        <div class="dropdown-category">
            <p class="dropdown--separator-title text--boldest">By genre</p>
            <div class="dropdown-category--container">
                ${allDivs.slice(0,5).join('')}
            </div>
        </div>`

    return resultsDiv
}

async function getUsers(){
    const res = await fetch(`http://localhost:3002/users/`)
    const data = await res.json()
    return data
}

export { 
    getMostWatchedMovies, 
    getRecommendedMovies, 
    getGenres, 
    getLangs, 
    getMovieHtml, 
    getMovieById, 
    search,
    getUsers
}
// https://image.tmdb.org/t/p/w780/${backdrop_path}
// <img class="movie-poster" src="https://image.tmdb.org/t/p/w780/${backdrop_path}" alt="${original_title} poster" aria-hidden="true"/> 
// <div class="movie-poster" style="background: url(https://image.tmdb.org/t/p/w780/${backdrop_path});" ></div> 
{/* <div class="movie-poster" 
    style="background: url(https://image.tmdb.org/t/p/w780/${backdrop_path});" >
</div>  */}