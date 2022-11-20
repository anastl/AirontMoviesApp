import data from './data.json' assert { type: "json" }
const movies = data.Movies[0]
// console.log(movies)

const star = `<img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />`

class Movie {
    constructor( id, title, genreId, rating, summary, backgroundURL ){
        this.id = id
        this.title = title
        this.genreId = genreId
        this.rating = rating
        this.summary = summary
        this.backgroundURL = backgroundURL
    }
    getSummary = () => {
        return this.summary.split(' ').length < 46 ? this.summary : this.summary.split(' ').slice( 0, 45 ).join(' ') + "..."
    }
    getStarsArray = () => {
        const starsArray = []
        for ( let s = 0; s < Math.round( this.rating/2 ); s++) {
            starsArray.push(`<img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />`)
        }
        return starsArray.join('')
    }
    getGenre = () => {
        const genreArray = JSON.parse( sessionStorage.getItem('genres') )
        const genreObj = genreArray.find( el => el.id === this.genreId )
        return genreObj.name
    }
    getMovieDiv = () => {
        return (`
            <div class="movie mw"
            style="
            background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/w1280/${ this.backgroundURL });
            background-position: center;
            background-size: cover;
            ">
                <p class="text--bold movie-title mw-title">${ this.title }</p>
                <div class="stars-container">
                    ${ this.getStarsArray() }
                </div>
                <p class="summary">${ this.summary }</p>
            </div>
        `)
    }
    getMovieDivWithButton = () => {
        return (`
            <div class="movie"
                style="
                    background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/w1280/${ this.backgroundURL });
                    background-position: center;
                    background-size: cover;
            ">
                <div class="stars-and-genre">
                    <p class="genre blue">${ this.getGenre() }</p>
                    <div class="stars-container">
                        ${ this.getStarsArray() }
                    </div>
                </div>
                <p class="text--bold movie-title">${ this.title }</p>
                <p class="summary">${ this.summary }</p>
                <button id="watch-movie" data-movieId='${ this.id }'>Watch Now</button>
            </div>
        `)
    }
}

function displayLogin() {
    return `
    <div class="login--container">
        <h1 class="title blue title--login">
            <span class="text--boldest text--uppercased">Movie</span><span class="text--italic">finder</span>
        </h1>
        <div class="login-screen">
            <div class="welcome-prompt">
                <p class="text--bold">Welcome! Log in or Register</p>
                <p class="instructions">Log in to find the movies you're looking for!</p>
            </div>
            <form>
                <input class="input--full-width" type="email" placeholder="Email" />
                <div class="password--container">
                    <input class="input--full-width" type="password" placeholder="Password" />
                    <svg class="password-eye" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="12" r="7" stroke="white" stroke-width="2"/><circle cx="19" cy="12" r="7" stroke="#2791C2" stroke-width="2"/><path d="M37 12C37 12.1633 36.9344 12.4766 36.7106 12.9481C36.4943 13.4038 36.1614 13.9423 35.7106 14.5357C34.8097 15.7216 33.4846 17.0656 31.8282 18.3302C28.5075 20.8654 23.9654 23 19 23C14.0346 23 9.49253 20.8654 6.17179 18.3302C4.51536 17.0656 3.19029 15.7216 2.2894 14.5357C1.83863 13.9423 1.50568 13.4038 1.2894 12.9481C1.06558 12.4766 1 12.1633 1 12C1 11.8367 1.06558 11.5234 1.2894 11.0519C1.50568 10.5962 1.83863 10.0577 2.2894 9.46429C3.19029 8.27839 4.51536 6.93444 6.17179 5.66984C9.49253 3.13461 14.0346 1 19 1C23.9654 1 28.5075 3.13461 31.8282 5.66984C33.4846 6.93444 34.8097 8.27839 35.7106 9.46429C36.1614 10.0577 36.4943 10.5962 36.7106 11.0519C36.9344 11.5234 37 11.8367 37 12Z" stroke="white" stroke-width="2"/><path d="M37 12C37 12.1633 36.9344 12.4766 36.7106 12.9481C36.4943 13.4038 36.1614 13.9423 35.7106 14.5357C34.8097 15.7216 33.4846 17.0656 31.8282 18.3302C28.5075 20.8654 23.9654 23 19 23C14.0346 23 9.49253 20.8654 6.17179 18.3302C4.51536 17.0656 3.19029 15.7216 2.2894 14.5357C1.83863 13.9423 1.50568 13.4038 1.2894 12.9481C1.06558 12.4766 1 12.1633 1 12C1 11.8367 1.06558 11.5234 1.2894 11.0519C1.50568 10.5962 1.83863 10.0577 2.2894 9.46429C3.19029 8.27839 4.51536 6.93444 6.17179 5.66984C9.49253 3.13461 14.0346 1 19 1C23.9654 1 28.5075 3.13461 31.8282 5.66984C33.4846 6.93444 34.8097 8.27839 35.7106 9.46429C36.1614 10.0577 36.4943 10.5962 36.7106 11.0519C36.9344 11.5234 37 11.8367 37 12Z" stroke="#2791C2" stroke-width="2"/></svg>
                </div>
                <div class="user-extras">
                    <label for="remember-user">
                        <input class="input-checkbox" type="checkbox" id="remember-user" name="remember-user" />
                        Remember me
                    </label>
                    <a class="link" href="#">Forgot Password?</a>
                </div>
                <button id="login" class="text--bold login-btn">Log in</button>
            </form>
            <p class="register-prompt">Not registered yet? <a class="link" href="#">Register now</a></p>
            <div class="separation">
                <span class="divider divider--left"></span><p class="prompt--or">or</p><span class="divider divider--right"></span>
            </div>
            <div class="social-medias--container">
                <div class="social-media-div button--full-width">
                    <div class="social-media-container">
                        <div class="icon">
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7988 45H9.20118C4.64497 45 1 41.355 1 36.7988V9.20118C1 4.64497 4.64497 1 9.20118 1H36.7988C41.355 1 45 4.64497 45 9.20118V36.7988C45 41.355 41.355 45 36.7988 45Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M36.7988 45H9.20118C4.64497 45 1 41.355 1 36.7988V9.20118C1 4.64497 4.64497 1 9.20118 1H36.7988C41.355 1 45 4.64497 45 9.20118V36.7988C45 41.355 41.355 45 36.7988 45Z" stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M27.9467 13.4969H30.4201V8.15967H26.71C21.5029 8.15967 18.9645 11.2839 18.9645 15.71V19.8756H14.8639V24.9526H18.9645V37.8401H25.0828V24.9526H29.1834L30.355 19.8756H25.0828V16.4259C25.0828 15.0591 25.8639 13.4969 27.9467 13.4969Z" fill="white"/>
                            </svg>
                        </div>
                        <p class="option text--bold">Login with Facebook</p>
                    </div>
                </div>
                <div class="social-media-div button--full-width">
                    <div class="social-media-container">
                        <div class="icon">
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.38525 31.2517C12.3523 31.5097 14.9324 30.8001 17.319 29.1231C16.803 28.9941 16.3515 28.9296 15.9645 28.8006C14.3519 28.2846 13.2554 27.2525 12.5459 25.7045C12.3523 25.253 12.3523 25.1885 12.8684 25.1885C13.3844 25.1885 13.9004 25.253 14.5454 25.0595C13.5779 24.8015 12.8039 24.3499 12.1588 23.7694C11.1268 22.8019 10.4818 21.5764 10.4173 20.1573C10.3528 19.5768 10.4173 19.5123 10.9333 19.7703C11.4493 20.0283 11.9653 20.1573 12.6104 20.1573C12.2233 19.7058 11.7718 19.3833 11.5138 18.9318C10.2883 17.1902 10.0948 15.3197 10.9333 13.3846C11.1268 12.8686 11.2558 12.8686 11.6428 13.2556C13.5134 15.3197 15.7065 16.8677 18.351 17.7707C19.5121 18.1578 20.6731 18.4158 21.8986 18.5448C22.5437 18.6093 22.6082 18.5448 22.4792 17.8997C22.2212 15.7067 23.4467 13.4491 25.4463 12.4171C27.4458 11.385 30.0259 11.643 31.6385 13.1911C31.961 13.5136 32.2835 13.5136 32.6705 13.4491C33.509 13.1911 34.3475 12.9331 35.1216 12.4816C35.2506 12.4171 35.3796 12.2881 35.5731 12.3526C35.1861 13.5136 34.4765 14.4166 33.509 15.1907C34.412 15.0617 35.3151 14.8036 36.2181 14.4811C36.2181 14.8036 36.0246 14.9326 35.9601 15.1262C35.3796 15.8357 34.7991 16.4807 34.0895 16.9967C33.767 17.2547 33.638 17.5127 33.638 17.9642C33.7025 21.6409 32.5415 24.9305 30.3484 27.8331C27.7683 31.3162 24.2207 33.2512 19.9636 33.7672C16.416 34.2188 13.0619 33.5092 9.96577 31.7677C9.83677 31.7032 9.77227 31.6387 9.64326 31.5742C9.57876 31.4452 9.51426 31.3807 9.38525 31.2517Z" fill="white"/>
                                <path d="M36.4761 44.6034H9.12726C4.61211 44.6034 1 40.9913 1 36.4761V9.12726C1 4.61211 4.61211 1 9.12726 1H36.4761C40.9913 1 44.6034 4.61211 44.6034 9.12726V36.4761C44.6034 40.9913 40.9913 44.6034 36.4761 44.6034Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p class="option text--bold">Login with Twitter</p>
                    </div>
                </div>
                <div class="social-media-div button--full-width">
                    <div class="social-media-container">
                        <div class="icon">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.7032 17.9846H34.7983H22.559V26.3729H34.828C34.4322 28.5957 33.5813 30.5671 31.83 32.094C31.3353 32.5192 30.8109 32.9154 30.2568 33.273C28.0899 34.6646 25.4976 35.4764 22.7173 35.4764C16.7016 35.4764 11.5961 31.6881 9.7459 26.4213C9.27097 25.0586 9.00382 23.5994 9.00382 22.0725C9.00382 20.5359 9.27097 19.0477 9.75579 17.6754C11.6159 12.4375 16.7115 8.67824 22.7074 8.67824C25.9726 8.67824 28.8221 10.0698 31.1572 11.9736L37.6281 5.75972L37.6182 5.75005C33.6506 2.27103 28.3076 0 22.559 0C13.7729 0 6.10479 5.01559 2.38453 12.2539C0.860805 15.2207 0 18.5548 0 22.0821C0 25.5998 0.850911 28.9242 2.35485 31.8621C6.03553 39.0617 13.6443 44 22.4304 44C28.1493 44 33.4922 42.1252 37.4599 38.6848C37.4796 38.6655 37.5093 38.6462 37.5291 38.6172C41.0713 35.5054 43.0007 31.1759 43.7032 26.3729V26.3633C43.7032 26.3633 44 23.1548 44 22.0821C44 21.0578 43.7032 17.9846 43.7032 17.9846Z" fill="white"/>
                            </svg>
                        </div>
                        <p class="option text--bold">Login with Google</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function displayHeaderAndSearchBar() {
    return (`
    <header>
        <p class="title header--title">
            <span class="text--boldest text--uppercased">Movie</span><span class="fw--400 text--italic bigger-spaced">finder</span>
        </p>
        <div class="search--container">
            <input id="search-movie" class="input--search" type="text" placeholder="Search movies..." />
            <img class="search-icon" src="./img/vectors/magnifying_glass.svg" alt="search icon" />
        </div>
        <div class="profile-container">
            <p class="text--tiny log">Log out</p>
            <div class="profile-vector-container">
                <img class="profile-vector" src="./img/vectors/profile_picture_vector.png" alt="profile picture" />
            </div>
        </div>
    </header>
    <div class="results-container" id="results-container">
    </div>
    `)
}

// MOCKUPS
// TODO DELETE

function mostWatchedhtml( movie ) {
    const {id, title, summary, starsRating, imgLong } = movie

    const getStarsArray = ( ) => {
        const starsArray = []
        for ( let s = 0; s < Math.round( starsRating/2 ); s++) {
            starsArray.push(`<div class="star">${ star }</div>`)
        }
        return starsArray.join('')
    }

    return (`
    <div class="mw" data-movieid='${ id }'
        style="
            background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url('${ imgLong }');
            background-position: center;
            background-size: cover;"
    >
        <div class="details--mw">
            <p class="text--bold movie-title mw-title">${ title }</p>
            <div class="stars-container stars-container--mw">
                ${ getStarsArray() }
            </div>
            <p class="summary summary--mw">${ summary }</p>
        </div>
    </div>
    `)
}

function resultMockup() {
    const { id, title, summary, starsRating, genre, imgLong } = movies[1][0]
    
    const getStarsArray = ( ) => {
        const starsArray = []
        for ( let s = 0; s < Math.round( starsRating/2 ); s++) {
            starsArray.push(`<div class="star">${ star }</div>`)
        }
        return starsArray.join('')
    }

    return `
    <div class="movie"
        style="
            background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(${ imgLong });
            background-position: center;
            background-size: cover;
    ">
        <div class="stars-and-genre">
            <p class="genre blue">${ genre }</p>
            <div class="stars-container">
                ${ getStarsArray() }
            </div>
        </div>
        <p class="text--bold movie-title">${ title }</p>
        <p class="summary">${ summary }</p>
        <button class="watch-now" id="watch-movie" data-movieid='${ id }'>Watch Now</button>
    </div>
    `
}

function mostWatchedMockup() {
    const moviesMW = [ movies[2][0], movies[3][0], movies[4][0] ]
    
    const mwHtml = moviesMW.map( movie => mostWatchedhtml(movie) )

    return (`
    <div class="most-watched-movies">
        ${ mwHtml.join('') }
    </div>
    `)
}

function homeMockup() { // homeMockup = resultMockup + mostWatchedMockup
    return (`
        ${ resultMockup() }
        <div class="most-watched-container">
            <p class="title title--mw text--bold">Most Watched Movies</p>
            ${ mostWatchedMockup() }
        </div>
    `)
}

// TODO ADAPT TO WORK WITH API
function getDetailsHtml( movieId ) {
    const { id, title, extended, starsRatingDets, releaseDate, genre, ogLang, imgSquare } = movies[movieId][0]
    return(`
        <div class="movie-dets">
            <div class="movie-header"
                style="
                    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${ imgSquare });
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                "
            >
                <img class="close" src="./img/vectors/close.png" alt="close modal" />
                <button id="play" class="play-btn">Play Trailer</button>
                <h1 class="text--bold blue title title--dets">${ title }</h1>
            </div>
            <div class="movie-body">
                <p class="extended summary">${ extended }</p>
                <div class="details--container">
                    <div class="details--column">
                        <div class="details--individual">
                            <p class="text--bold details--title">Release Date:</p>
                            <p class="details--info">${ releaseDate }</p>
                        </div>
                        <div class="details--individual">
                            <p class="text--bold details--title">Genre:</p>
                            <p href="#" class="details--info genre-dets cyan underline">${ genre }</p>
                        </div>
                    </div>
                    <div class="details--column">
                        <div class="details--individual details--individual-extra-padding">
                            <p class="text--bold details--title">Original Language:</p>
                            <p class="details--info">${ ogLang }</p>
                        </div>
                        <div class="details--individual details--individual-extra-padding">
                            <p class="text--bold details--title">Popularity:</p>
                            <p class="details--info">${ starsRatingDets } / 5</p>
                        </div>
                    </div>
                </div>
                    </div>
                ${ getRecs( id ) }
            </div>
        </div>
    `)
}

function getRecs( movieId ){
    const recsArray = []
    for ( const movie in movies ){
        const { id, title, imgSquare } = movies[movie][0]
        console.log( id, movieId )
        if ( id != movieId ){
            recsArray.push(`<a class="img-link" href="#"><img class="rec-poster" src=${ imgSquare } alt="Poster for ${ title }" /></a>`)
        }
        else { continue }
    } 
    return (`
        <div class="similar-container">
            <p class="similar--title text--bold">Similar Movies:
            <div class="similar--movies">
                ${ recsArray.join('') } 
                <button id="load-more-similar" class="invisible-btn">
                    <img src="./img/vectors/add.png" alt="more movies" />
                </button>
            </div>
        </div>
    `)
}

function handleLogin() {
    const loginBtn = document.getElementById('login')

    loginBtn.addEventListener('click', e => {
        e.preventDefault()
        
        document.body.innerHTML = displayHeaderAndSearchBar()
        
        const resContainer = document.getElementById('results-container')
        resContainer.innerHTML = homeMockup()
    } )
}

function handleWatch( id ){
    document.body.innerHTML = getDetailsHtml( id )
}

function setUpWatchBtns() {
    const watchBtn = document.getElementById('watch-movie')

    watchBtn.addEventListener('click', e => {
        e.preventDefault()
        handleWatch( watchBtn.dataset.movieid )
    } )
}

// showResAndSetUpBtn = displayHeaderAndSearchBar + homeMockup + setUpWatchBtns
function showResAndSetUpBtn() { 
    document.body.innerHTML = displayHeaderAndSearchBar() + homeMockup()
    setUpWatchBtns()
}

function showDetails() {
    document.body.innerHTML = getDetailsHtml( '1' )
}

export { 
    displayLogin, 
    displayHeaderAndSearchBar, 
    Movie, 
    homeMockup, 
    handleLogin, 
    getDetailsHtml, 
    showResAndSetUpBtn,
    showDetails 
}