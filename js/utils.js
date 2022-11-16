class Movie {
    constructor( title, genreId, rating, summary, backgroundURL ){
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
                <button id="watch-movie">Watch Now</button>
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
        <main>
            <div class="container">
                <div class="login-screen">
                    <div class="welcome-prompt">
                        <p class="text--bold">Welcome! Log in or Register</p>
                        <p>Log in to find the movies you're looking for!</p>
                    </div>
                    <form>
                        <input class="input--full-width" type="email" placeholder="Email" />
                        <div class="password--container">
                            <input class="input--full-width" type="password" placeholder="Password" />
                            <img class="password-eye" src="./img/vectors/eye.svg" alt="select to show password" />
                        </div>
                        <div class="user-extras">
                            <label for="remember-user">
                                <input class="input-checkbox" type="checkbox" id="remember-user" name="remember-user" />
                                Remember me
                            </label>
                            <a class="link" href="#">Forgot Password?</a>
                        </div>
                        <button class="text--bold">Log in</button>
                    </form>
                    <p class="register-prompt">Not registered yet? <a class="link" href="#">Register now</a></p>
                    <div class="separation">
                        <span class="divider divider--left"></span><p class="prompt--or">or</p><span class="divider divider--right"></span>
                    </div>
                    <div class="social-media-div button--full-width">
                        <div class="social-media-container">
                            <div class="icon">
                                <img class="icon" src="./img/vectors/facebook.png" alt="facebook logo" />                
                            </div>
                            <p class="option text--bold">Login with Facebook</p>
                        </div>
                    </div>
                    <div class="social-media-div button--full-width">
                        <div class="social-media-container">
                            <div class="icon">
                                <img class="icon" src="./img/vectors/twitter.png" alt="twitter logo" />                
                            </div>
                            <p class="option text--bold">Login with Twitter</p>
                        </div>
                    </div>
                    <div class="social-media-div button--full-width social-media--last">
                        <div class="social-media-container">
                            <div class="icon">
                                <img class="icon" src="./img/vectors/google.png" alt="google logo" />                
                            </div>
                            <p class="option text--bold">Login with Google</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
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

function resultMockup() {
    return `
    <div class="movie"
        style="
            background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url('../../Not for github/pixel perfect img/Avatar_1.png');
            background-position: center;
            background-size: cover;
    ">
        <div class="stars-and-genre">
            <p class="genre blue">${ 'Science Fiction' }</p>
            <div class="stars-container">
                <img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                <img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                <img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                <img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                <img class="star" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
            </div>
        </div>
        <p class="text--bold movie-title">${ 'Avatar 2' }</p>
        <p class="summary">${ 'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.' }</p>
        <button class="watch-now" id="watch-movie">Watch Now</button>
    </div>
    `
}

function mostWatchedMockup() {
    return (`
    <div class="most-watched-movies">
        <div class="mw"
            style=" background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url('../../Not for github/pixel perfect img/Prey_mw.png'); background-position: center; background-size: cover;"
        >
            <div class="details--mw">
                <p class="text--bold movie-title mw-title">${ 'Prey' }</p>
                <div class="stars-container stars-container--mw">
                    <img class="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                </div>
                <p class="summary summary--mw">${ 'In 1719 in the Great Plains, Naru, a young Comanche woman trained as a healer, dreams of becoming a great hunter.' }</p>
            </div>
        </div>
        <div class="mw"
            style=" background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url('../../Not for github/pixel perfect img/Jurassic_mw.png'); background-position: center; background-size: cover;"
        >
            <div class="details--mw">
                <p class="text--bold movie-title mw-title">${ 'Jurassic World Dominion' }</p>
                <div class="stars-container stars-container--mw">
                    <img class="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                </div>
                <p class="summary summary--mw">${ 'Four years after the Lockwood Estate incident and the cataclysmic volcanic eruption on Isla Nublar.' }</p>
            </div>
        </div>
        <div class="mw"
            style=" background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url('../../Not for github/pixel perfect img/Kong_mw.png'); background-position: center; background-size: cover;"
        >
            <div class="details--mw">
                <p class="text--bold movie-title mw-title">${ 'Godzilla vs Kong' }</p>
                <div class="stars-container stars-container--mw">
                    <img class="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" /> <img class ="star star--mw" src="./img/vectors/star.png" alt="star rating" aria-hidden="true" />
                </div>
                <p class="summary summary--mw">${ 'Five years after Godzilla defeated King Ghidorah, Kong is monitored by Monarch within a giant dome on Skull Island. ' }</p>
            </div>
        </div>
    </div>
    `)
}

function homeMockup() {
    return (`
        ${ resultMockup() }
        <div class="most-watched-container">
            <p class="title title--mw text--bold">Most Watched Movies</p>
            ${ mostWatchedMockup() }
        </div>
    `)
}

export { displayLogin, displayHeaderAndSearchBar, Movie, homeMockup }