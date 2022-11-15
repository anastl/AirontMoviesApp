import { Movie } from './utils.js'

async function getMostWatchedMovies() {
    try {
        const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        const res = await fetch( baseUrl )
        const mostWatched = await res.json()

        const mostWatchedArray = mostWatched.results.map( ( { original_title, genre_ids, vote_average, overview, backdrop_path } ) => {
            const movie = new Movie( original_title, genre_ids[0], vote_average, overview, backdrop_path ) 
            return movie.getMovieDiv()
        })
        const mostWatchedDiv = (`
            <div class="most-watched-container">
                <p class="title text--bold">Most Watched Movies</p>
                ${ mostWatchedArray.join('') }
            </div>
        `)
        // console.log( data.results.length )
        
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

async function getMovieHtml ( query ) {
    try {
        const mediaUrl = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query }&include_adult=false`
        const res = await fetch( mediaUrl )
        const searchResults = await res.json()

        const moviesArray = searchResults.results.slice(0,5).map( ( { original_title, genre_ids, vote_average, overview, backdrop_path } ) => {
            const movie = new Movie( original_title, genre_ids[0], vote_average, overview, backdrop_path ) 
            return movie.getMovieDivWithButton()
        } )
           
        // TODO UNCOMMENT FOLLOWING LINE AND DELETE THE ONE AFTER 
        return moviesArray.join('') + await getMostWatchedMovies() 
        // return moviesArray.join('')
        return await getMostWatchedMovies() 
    } catch ( e ) { console.log( e ) }
}

export { getMostWatchedMovies, getMovieHtml, getGenres }
// https://image.tmdb.org/t/p/w780/${backdrop_path}
// <img class="movie-poster" src="https://image.tmdb.org/t/p/w780/${backdrop_path}" alt="${original_title} poster" aria-hidden="true"/> 
// <div class="movie-poster" style="background: url(https://image.tmdb.org/t/p/w780/${backdrop_path});" ></div> 
{/* <div class="movie-poster" 
    style="background: url(https://image.tmdb.org/t/p/w780/${backdrop_path});" >
</div>  */}