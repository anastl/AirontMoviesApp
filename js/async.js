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
    catch ( error ) {
        console.log( error )
    }
}

async function fetchMovie( movieId ) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
        const res = await fetch( url )
        const movie = await res.json()

        return movie
    } catch ( e ) { console.log( e ) }
}

async function fetchSimilar( id ){
    const baseUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US`
    const res = await fetch( baseUrl )
    const recommended = await res.json()

    const recommendedArray = recommended.results

    return recommendedArray.map( ( { id, title, backdrop_path } ) => ( { id, title, backdrop_path } ) )
}

// movieid
// numberOfRecs

// async function setUpAddMoreBtn( btn ){
    
//     const id = btn.dataset.movieid
//     const numberOfRecs = btn.dataset.numberOfRecs
//     const recommendedImgs = await fetchSimilar( id ).slice(0, numberOfRecs).map( movieObj => asRecommended( movieObj ) )
    
//     document.getElementById('similar-container').innerHTML = recommendedImgs
//     similarContainer.innerHTML += addMoreSvg( id, numberOfRecs+3 )
// }

export {
    fetchGenres,
    fetchLanguages,
    getUser,
    fetchMovie,
    fetchSimilar
}