import {
    getStarsArray,
    getSummary,
    getGenreName,
    getLanguageName,
    getDate,
    setUpLogin,
    setModalOpener,
    selectViewCallback,
    hideDropdown,
    onYouTubeIframeAPIReady,
    player
} from './utils.js'
import {
    displayModal
} from './async.js'

const starSVG = `<svg class="star filled" stroke="#FF9900" viewBox="46.045 2.309 23.428 22.257" width="23.428" height="22.257">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M 57.759 2.309 L 60.687 10.717 L 69.473 10.717 L 62.64 16.158 L 65.08 24.566 L 57.759 19.62 L 50.437 24.566 L 52.878 16.158 L 46.045 10.717 L 54.83 10.717 L 57.759 2.309 Z"></path>
    </svg>
`
const starEmpty = `<svg class="star" stroke="#FF9900" viewBox="46.045 2.309 23.428 22.257" width="23.428" height="22.257">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M 57.759 2.309 L 60.687 10.717 L 69.473 10.717 L 62.64 16.158 L 65.08 24.566 L 57.759 19.62 L 50.437 24.566 L 52.878 16.158 L 46.045 10.717 L 54.83 10.717 L 57.759 2.309 Z"></path>
    </svg>
`
const loginHtml = `
<div id="login--container" class="login--container">
    <h1 class="title blue login--title">
        <span class="extra-bold uppercased">Movie</span><span class="italic">finder</span>
    </h1>
    <div class="login--screen">
        <div class="welcome-prompt">
            <p class="bold">Welcome! Log in or Register</p>
            <p class="instructions">Log in to find the movies you're looking for!</p>
        </div>
        <form class="login--form">
            <input id="email-input" class="login--input" type="email" placeholder="Email" autocomplete="email" />
            <div class="password--container">
                <input id="password-input" class="login--input" type="password" placeholder="Password" autocomplete="current-password" />
                <svg tabindex=0 id="password-eye" class="password-eye focus-dark" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="12" r="7" stroke="white" stroke-width="2"/>
                    <circle id="show-eye" cx="19" cy="12" r="7" stroke="#2791C2" stroke-width="2"/>
                    <path d="M37 12C37 12.1633 36.9344 12.4766 36.7106 12.9481C36.4943 13.4038 36.1614 13.9423 35.7106 14.5357C34.8097 15.7216 33.4846 17.0656 31.8282 18.3302C28.5075 20.8654 23.9654 23 19 23C14.0346 23 9.49253 20.8654 6.17179 18.3302C4.51536 17.0656 3.19029 15.7216 2.2894 14.5357C1.83863 13.9423 1.50568 13.4038 1.2894 12.9481C1.06558 12.4766 1 12.1633 1 12C1 11.8367 1.06558 11.5234 1.2894 11.0519C1.50568 10.5962 1.83863 10.0577 2.2894 9.46429C3.19029 8.27839 4.51536 6.93444 6.17179 5.66984C9.49253 3.13461 14.0346 1 19 1C23.9654 1 28.5075 3.13461 31.8282 5.66984C33.4846 6.93444 34.8097 8.27839 35.7106 9.46429C36.1614 10.0577 36.4943 10.5962 36.7106 11.0519C36.9344 11.5234 37 11.8367 37 12Z" stroke="white" stroke-width="2"/>
                    <path d="M37 12C37 12.1633 36.9344 12.4766 36.7106 12.9481C36.4943 13.4038 36.1614 13.9423 35.7106 14.5357C34.8097 15.7216 33.4846 17.0656 31.8282 18.3302C28.5075 20.8654 23.9654 23 19 23C14.0346 23 9.49253 20.8654 6.17179 18.3302C4.51536 17.0656 3.19029 15.7216 2.2894 14.5357C1.83863 13.9423 1.50568 13.4038 1.2894 12.9481C1.06558 12.4766 1 12.1633 1 12C1 11.8367 1.06558 11.5234 1.2894 11.0519C1.50568 10.5962 1.83863 10.0577 2.2894 9.46429C3.19029 8.27839 4.51536 6.93444 6.17179 5.66984C9.49253 3.13461 14.0346 1 19 1C23.9654 1 28.5075 3.13461 31.8282 5.66984C33.4846 6.93444 34.8097 8.27839 35.7106 9.46429C36.1614 10.0577 36.4943 10.5962 36.7106 11.0519C36.9344 11.5234 37 11.8367 37 12Z" stroke="#2791C2" stroke-width="2"/>
                </svg>
            </div>
            <div class="user-extras">
                <label tabindex=0 for="remember-user" class="checkbox-container" >
                    <input tabindex=-1 class="hide-checkbox" type="checkbox" id="remember-user" name="remember-user" />
                    <span tabindex=-1 class="custom-checkbox">
                        <svg tabindex=-1 class="custom-checkmark" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 5.42857L4.33333 8L9 2" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>                    
                    </span>
                    Remember me
                </label>
                <a class="link" href="#">Forgot Password?</a>
            </div>
            <span class="login-error-msg" id="login-error-msg"></span>
            <button id="login" class="button bold login-btn">Log in</button>
        </form>
        <p class="register-prompt">Not registered yet? <a class="link" href="#">Register now</a></p>
        <div class="separation">
            <span class="divider divider--left"></span><p class="prompt--or">or</p><span class="divider divider--right"></span>
        </div>
        <div class="social-login--container">
            <div class="social-media--div">
                <div class="social-media-container">
                    <svg class="social-media--icon" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.7988 45H9.20118C4.64497 45 1 41.355 1 36.7988V9.20118C1 4.64497 4.64497 1 9.20118 1H36.7988C41.355 1 45 4.64497 45 9.20118V36.7988C45 41.355 41.355 45 36.7988 45Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M36.7988 45H9.20118C4.64497 45 1 41.355 1 36.7988V9.20118C1 4.64497 4.64497 1 9.20118 1H36.7988C41.355 1 45 4.64497 45 9.20118V36.7988C45 41.355 41.355 45 36.7988 45Z" stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M27.9467 13.4969H30.4201V8.15967H26.71C21.5029 8.15967 18.9645 11.2839 18.9645 15.71V19.8756H14.8639V24.9526H18.9645V37.8401H25.0828V24.9526H29.1834L30.355 19.8756H25.0828V16.4259C25.0828 15.0591 25.8639 13.4969 27.9467 13.4969Z" fill="white"/>
                    </svg>
                    <p class="option bold">Login with Facebook</p>
                </div>
            </div>
            <div class="social-media--div">
                <div class="social-media-container">
                    <svg class="social-media--icon" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.38525 31.2517C12.3523 31.5097 14.9324 30.8001 17.319 29.1231C16.803 28.9941 16.3515 28.9296 15.9645 28.8006C14.3519 28.2846 13.2554 27.2525 12.5459 25.7045C12.3523 25.253 12.3523 25.1885 12.8684 25.1885C13.3844 25.1885 13.9004 25.253 14.5454 25.0595C13.5779 24.8015 12.8039 24.3499 12.1588 23.7694C11.1268 22.8019 10.4818 21.5764 10.4173 20.1573C10.3528 19.5768 10.4173 19.5123 10.9333 19.7703C11.4493 20.0283 11.9653 20.1573 12.6104 20.1573C12.2233 19.7058 11.7718 19.3833 11.5138 18.9318C10.2883 17.1902 10.0948 15.3197 10.9333 13.3846C11.1268 12.8686 11.2558 12.8686 11.6428 13.2556C13.5134 15.3197 15.7065 16.8677 18.351 17.7707C19.5121 18.1578 20.6731 18.4158 21.8986 18.5448C22.5437 18.6093 22.6082 18.5448 22.4792 17.8997C22.2212 15.7067 23.4467 13.4491 25.4463 12.4171C27.4458 11.385 30.0259 11.643 31.6385 13.1911C31.961 13.5136 32.2835 13.5136 32.6705 13.4491C33.509 13.1911 34.3475 12.9331 35.1216 12.4816C35.2506 12.4171 35.3796 12.2881 35.5731 12.3526C35.1861 13.5136 34.4765 14.4166 33.509 15.1907C34.412 15.0617 35.3151 14.8036 36.2181 14.4811C36.2181 14.8036 36.0246 14.9326 35.9601 15.1262C35.3796 15.8357 34.7991 16.4807 34.0895 16.9967C33.767 17.2547 33.638 17.5127 33.638 17.9642C33.7025 21.6409 32.5415 24.9305 30.3484 27.8331C27.7683 31.3162 24.2207 33.2512 19.9636 33.7672C16.416 34.2188 13.0619 33.5092 9.96577 31.7677C9.83677 31.7032 9.77227 31.6387 9.64326 31.5742C9.57876 31.4452 9.51426 31.3807 9.38525 31.2517Z" fill="white"/>
                        <path d="M36.4761 44.6034H9.12726C4.61211 44.6034 1 40.9913 1 36.4761V9.12726C1 4.61211 4.61211 1 9.12726 1H36.4761C40.9913 1 44.6034 4.61211 44.6034 9.12726V36.4761C44.6034 40.9913 40.9913 44.6034 36.4761 44.6034Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="option bold">Login with Twitter</p>
                </div>
            </div>
            <div class="social-media--div">
                <div class="social-media-container">
                    <svg class="social-media--icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.7032 17.9846H34.7983H22.559V26.3729H34.828C34.4322 28.5957 33.5813 30.5671 31.83 32.094C31.3353 32.5192 30.8109 32.9154 30.2568 33.273C28.0899 34.6646 25.4976 35.4764 22.7173 35.4764C16.7016 35.4764 11.5961 31.6881 9.7459 26.4213C9.27097 25.0586 9.00382 23.5994 9.00382 22.0725C9.00382 20.5359 9.27097 19.0477 9.75579 17.6754C11.6159 12.4375 16.7115 8.67824 22.7074 8.67824C25.9726 8.67824 28.8221 10.0698 31.1572 11.9736L37.6281 5.75972L37.6182 5.75005C33.6506 2.27103 28.3076 0 22.559 0C13.7729 0 6.10479 5.01559 2.38453 12.2539C0.860805 15.2207 0 18.5548 0 22.0821C0 25.5998 0.850911 28.9242 2.35485 31.8621C6.03553 39.0617 13.6443 44 22.4304 44C28.1493 44 33.4922 42.1252 37.4599 38.6848C37.4796 38.6655 37.5093 38.6462 37.5291 38.6172C41.0713 35.5054 43.0007 31.1759 43.7032 26.3729V26.3633C43.7032 26.3633 44 23.1548 44 22.0821C44 21.0578 43.7032 17.9846 43.7032 17.9846Z" fill="white"/>
                    </svg>
                    <p class="option bold">Login with Google</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
const homeHtml = `
<div class="fade-in header-container">
    <header>
        <p class="title header--title">
            <span class="extra-bold uppercased">Movie</span><span class="fw--400 italic bigger-spaced">finder</span>
        </p>
        <div class="search--container">
            <input id="search-movie" class="input--search" type="text" placeholder="Search movies..." autocomplete="on" />
            <img class="search-icon" src="./img/vectors/magnifying_glass.svg" alt="search icon" />
        </div>
        <div class="profile-container">
            <a id="log-out" class="tiny log">Log out</a>
            <div class="profile-vector-container">
                <img class="profile-vector" src="./img/vectors/profile_picture_vector.png" alt="profile picture" />
            </div>
        </div>
    </header>
</div>
<div id="results" class="fade-in results">
    <div id="trailer-container" class="trailer-container" ></div>
    <div id="modal-container" class="modal-container" ></div>
    <div id="dropdown-container" class="dropdown-container" ></div>
    <div id="results-container" class="results-container" ></div>
    <div id="most-watched-container" class="most-watched-container" >
        <div id="most-watched--title-and-display" class="most-watched--title-and-display">
            <p class="bold most-watched--section-title">Most Watched Movies</p>
            <div class="display-type">
                <button data-view="grid" class="button svg-btn">
                    <svg data-view="grid" class="display-mw" width="58" height="36" viewBox="0 0 58 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect data-view="grid" x="39" y="6" width="12" height="24" rx="2" fill="#D9D9D9"/>
                        <rect data-view="grid" x="23" y="6" width="12" height="24" rx="2" fill="#D9D9D9"/>
                        <rect data-view="grid" x="7" y="6" width="12" height="24" rx="2" fill="#D9D9D9"/>
                    </svg>
                </button>
                <button class="svg-btn button selected">
                    <svg class="display-mw" width="59" height="36" viewBox="0 0 59 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7" y="6" width="45" height="24" rx="2" fill="#D9D9D9"/>
                    </svg>
                </button>
            </div>
        </div>
        <div id="most-watched--results" class="most-watched--results"></div>
    </div>
    <div id="error-modal" class="error-modal" ></div>
</div>
`

const asDropdown = ( id, title, release_date, poster_path ) => {
    // if ( poster_path ) {
    //     const releaseYear = release_date.split('-')[0]
    //     return `
    //         <span data-movie-id="${id}" class="dropdown-result sm">
    //             <img class="dropdown-result--img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Poster for ${title}" />
    //             <p class="bold">${title}</p>
    //             <p class="italic">(${releaseYear})</p>
    //         </span>`
    // }
    if ( poster_path ) {
        const releaseYear = release_date.split('-')[0]

        const span = document.createElement('span')
        span.dataset.movieId = id
        span.classList.add('dropdown-result')
        span.classList.add('sm')
        span.innerHTML = `
            <img class="dropdown-result--img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Poster for ${title}" />
            <p class="bold">${title}</p>
            <p class="italic">(${releaseYear})</p>`

        span.addEventListener('click', () => { displayModal( id ) } )
        return span
    }
}

const asError = error => {
    return `<span>We're sorry, ${error}. Please try again</span>`
}

const asMain = ( id, title, genreId, summary, rating, backgroundURL ) => {
    const genre = getGenreName( genreId )
    
    const main = document.createElement('div')
    main.classList.add('main-movie--container')

    main.style.background = `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/w1280/${ backgroundURL })`
    main.style.backgroundPosition = 'center'
    main.style.backgroundSize = 'cover'

    main.innerHTML = `        
    <div class="movie">
        <div class="stars-and-genre">
            <p class="genre blue">${ genre }</p>
            <div class="stars-container">
                ${ getStarsArray( rating ) }
            </div>
        </div>
        <p class="bold movie-title">${ title }</p>
        <p class="summary">${ getSummary( summary ) }</p>
        <button class="watch-now-btn button sm" data-movie-id='${ id }'>Watch Now</button>
    </div>`

    main.querySelector('.watch-now-btn').addEventListener('click', () => { displayModal( id ) } )

    return main

    // return `
    // <div class="main-movie--container"
    //     style="
    //         background: 
    //             linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), 
    //             url(https://image.tmdb.org/t/p/w1280/${ backgroundURL });
    //         background-position: center;
    //         background-size: cover;
    // ">
    //     <div class="movie">
    //         <div class="stars-and-genre">
    //             <p class="genre blue">${ genre }</p>
    //             <div class="stars-container">
    //                 ${ getStarsArray( rating ) }
    //             </div>
    //         </div>
    //         <p class="bold movie-title">${ title }</p>
    //         <p class="summary">${ getSummary( summary ) }</p>
    //         <button class="watch-now-btn sm" data-movie-id='${ id }'>Watch Now</button>
    //     </div>
    // </div>
    // `
}

// rating must be base 10 ( raw )
const asModal = ( id, title, genreObj, summary, dateRaw, backgroundURL, languageIso, rating ) => {
    const ratingBaseFive = Math.round( rating/2 )
    const originalLanguage = getLanguageName( languageIso )
    const releaseDate = getDate( dateRaw )

    const modal = document.createElement('div')
    modal.classList.add('modal')
    
    modal.innerHTML = `
    <div class="modal--header"
        style="
            background: 
                linear-gradient(180deg, rgba(0, 0, 0, .3) 0%, rgba(0, 0, 0, 1) 100%), 
                url(https://image.tmdb.org/t/p/w1280/${ backgroundURL });
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        "
    >
        <button class="close-modal close" >
            <img src="./img/vectors/close.png" alt="close modal" />
        </button>
        <button class="play button play-btn" data-movie-id="${id}">Play Trailer</button>
        <h1 class="bold blue title modal--title">${ title }</h1>
    </div>
    <div class="modal--body">
        <p class="modal--summary">${ summary }</p>
        <div class="modal-info--container">
            <div class="modal-details--container">
                <div class="modal-details--row">
                    <div class="modal-details--individual">
                        <p class="bold modal-details--title">Release Date:</p>
                        <p class="modal-details--info">${ releaseDate }</p>
                    </div>
                    <div class="modal-details--individual">
                        <p class="bold modal-details--title">Genre:</p>
                        <p class="modal-details--info modal--genre cyan underline" href="#" data-genre-id="${ genreObj.id }">${ genreObj.name }</p>
                    </div>
                </div>
                <div class="modal-details--row">
                    <div class="modal-details--individual extra-padding">
                        <p class="bold modal-details--title">Original Language:</p>
                        <p class="modal-details--info">${ originalLanguage }</p>
                    </div>
                    <div class="modal-details--individual extra-padding">
                        <p class="bold modal-details--title">Popularity:</p>
                        <p class="modal-details--info">${ ratingBaseFive } / 5</p>
                    </div>
                </div>
            </div>
            <p class="bold similar-container--title">Similar movies: </p>
            <div class="similar-container">
                <button data-movie-id="${id}" data-page="1" data-number-of-recs="0" id="active" class="button add-more recommended-square">                    
                    <svg class="recommended-square--inside" width="244" height="244" viewBox="0 0 244 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2.95703C0 1.85246 0.895431 0.957031 2 0.957031H241.043C242.148 0.957031 243.043 1.85246 243.043 2.95703V242.001C243.043 243.105 242.148 244.001 241.043 244.001H1.99999C0.895425 244.001 0 243.105 0 242.001V2.95703Z" fill="black"/>
                        <rect x="115.5" y="79" width="12" height="85" fill="#D9D9D9"/>
                        <rect x="79" y="127.5" width="12" height="85" transform="rotate(-90 79 127.5)" fill="#D9D9D9"/>
                    </svg>
                </button>                            
            </div>
        </div>
    </div>
    `
    // console.log( modal.querySelector('.recommended-square') )
    modal.style.zIndex = 100
    return modal
}

// rating must be base 10 ( raw )
const asMostWatched = ( id, title, summary, rating, backgroundURL ) => {
    // const movie = document.createElement('button')
    const movie = document.createElement('button')
    movie.dataset.movieId = id
    movie.classList.add('most-watched--movie-parent')
    movie.classList.add('sm')

    // movie.style.background = `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/w1280/${ backgroundURL })`
    // movie.style.backgroundPosition = 'center'
    // movie.style.backgroundSize = 'cover'

    movie.innerHTML = `
        <img class="most-watched--poster" src= 'https://image.tmdb.org/t/p/w1280/${ backgroundURL }' alt="Poster for ${ title }" />
        <div class="most-watched--movie" >
            <span class="on-hover-text" >WATCH</span>
            <p data-movie-id="${ id }" class="bold most-watched--title">${ title }</p>
            <div data-movie-id="${ id }" class="most-watched--stars-container">
                ${ getStarsArray( rating ) }
            </div>
            <p data-movie-id="${ id }" class="most-watched--summary">${ getSummary( summary ) }</p>
        </div>
        `
    
    movie.addEventListener('click', () => { displayModal( id ) } )

    movie.addEventListener('mouseover', event => { 
        movie.classList.add('hover-mw')
        // movie.style.backgroundSize = '200%'
    } )
    movie.addEventListener('mouseleave', event => { 
        movie.classList.remove('hover-mw')
        // movie.style.backgroundSize = 'cover'
    } )
    return movie

    // <div data-movie-id="${ id }" class="most-watched--movie sm"
    // style="
    //     background: 
    //         linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .8)), 
    //         url(https://image.tmdb.org/t/p/w1280/${ backgroundURL });
    //     background-position: center;
    //     background-size: cover;
    // ">
    //     <p data-movie-id="${ id }" class="bold most-watched--title">${ title }</p>
    //     <div data-movie-id="${ id }" class="most-watched--stars-container">
    //         ${ getStarsArray( rating ) }
    //     </div>
    //     <p data-movie-id="${ id }" class="most-watched--summary">${ getSummary( summary ) }</p>
    // </div>
}

const asRecommended = ( id, title, backgroundURL ) => {
    const button = document.createElement('button')
    button.classList.add('recommended-square')
    button.classList.add('sm')
    button.classList.add('button')
    button.dataset.movieId = id

    button.innerHTML = `<img class="recommended-square--inside" src=https://image.tmdb.org/t/p/w1280/${backgroundURL} alt='Poster for ${title}' />`

    button.addEventListener('click', () => { displayModal( id ) } )

    return button
}

const asTrailer = ( key, title ) => {
    return `
    <iframe id="player" class="trailer" src="https://www.youtube-nocookie.com/embed/${key}?autoplay=0&origin=http://127.0.0.1:5500&enablejsapi=true" title="${title}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

export {
    asDropdown,
    asError,
    asMain,
    asModal,
    asMostWatched,
    asRecommended,
    asTrailer,
    homeHtml,
    loginHtml,
    starEmpty,
    starSVG
}