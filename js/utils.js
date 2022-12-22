import {
    getUser,
    setUpHome, 
    displayModal,
    searchInputCallback,
    getVideoUrl
} from './async.js'

import {
    homeHtml,
    loginHtml,
    starEmpty,
    starSVG
} from './elementCreators.js'

function getStarsArray( rating ) {
    if ( rating > 0 ){
        const starsArray = []
        for ( let s = 0; s < Math.round( rating/2 ); s++) {
            starsArray.push( starSVG )
        }
        return starsArray.join('')
    } 
    else {
        return starEmpty
    }
}

function getSummary( summary ){
    const wordsArray = summary.split(' ')
    return wordsArray.length > 30 ? wordsArray.slice( 0, 30 ).join(' ') + '...' : summary
}

function getGenreName( genreId ){
    const genresArray = JSON.parse( sessionStorage.getItem('genres') )
    const genre = genresArray.find( genre => genre.id === genreId )
    return genre.name
}

function getLanguageName( iso ){
    const languageArray = JSON.parse( sessionStorage.getItem('languages') )
    const languageObj = languageArray.find( el => el.iso_639_1 === iso )
    return languageObj.english_name
}

function getDate( dateRaw ){ // dateRaw = 2017-08-31
    const [ year, month, day ] = dateRaw.split('-')
    const date = new Date( Date.UTC( year, month, day ) )
    const release = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(date)
    const releaseArray = release.split(' ')
    return `${releaseArray[0]} ${releaseArray[1]}, ${releaseArray[2]}`
}

function setUpLogin() {
    const isUserLogged = JSON.parse( localStorage.getItem('logged') )
    if ( isUserLogged ) {
        setUpHome()
    }
    else {
        const masterContainer = document.getElementById('master-container')
        masterContainer.innerHTML = loginHtml
    
        const passwordEye = document.getElementById('password-eye')
        passwordEye.addEventListener('click', () => {
    
            const passwordInput = document.getElementById('password-input')
            const attribute = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
            passwordInput.setAttribute( 'type', attribute )
    
            const eye = document.getElementById('show-eye')
            const eyeStyle = eye.style.fill === 'rgb(39, 145, 194)' ? 'none' : 'rgb(39, 145, 194)'
            eye.style.fill = eyeStyle
        } )
        
        const loginBtn = document.getElementById('login')
    
        loginBtn.addEventListener('click', async e => {
            e.preventDefault()
    
            const emailInput = document.getElementById('email-input')
            const passwordInput = document.getElementById('password-input')
            const rememberUser = document.getElementById('remember-user')
            const errorSpan = document.getElementById('login-error-msg')
    
            const passwordRegex = /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/
            const emailRegex = /^([a-zA-Z0-9]+)@([a-zA-Z]+){4,}\.([a-z]+){3,}$/
    
            if ( ! passwordRegex.test( passwordInput.value ) ) {
                console.log( passwordRegex.test( passwordInput.value ), passwordInput.value )
                errorSpan.textContent = `Please enter a valid password`
                return
            } 
            else if ( ! emailRegex.test( emailInput.value )) {
                errorSpan.textContent = `Please enter a valid email`
                return
            }
            const response = await getUser( emailInput.value, passwordInput.value )
            if ( typeof response === 'string' ) { // Login unsuccessful
                errorSpan.textContent = response
            } 
            else { // Login successful
                if ( rememberUser.checked ) {
                    localStorage.setItem('logged', 'true') 
                }
                document.getElementById('login--container').classList.add('fade-out')
                setUpHome()
            } 
        } )        
    }
}

function setModalOpener( element ) {
    // element.addEventListener('click', () => { displayModal( element.dataset.movieId ) } )
}

function selectViewCallback(){
    const btn = this 
    const classes = [ ...btn.classList ]
    if ( ! classes.includes('selected') ){
        const oldSelected = document.getElementsByClassName('selected')[0]
        oldSelected.classList.toggle('selected')
        btn.classList.toggle('selected')

        const mwContainer = document.getElementById('most-watched--results')
        mwContainer.classList.toggle( 'grid' )
    }
}

// Sets up Log-out and Search bar
function setUpHomeFunctionalities() {
    const logOut = document.getElementById('log-out')
    const searchMovieInput = document.getElementById('search-movie')

    logOut.addEventListener('click', () => {
        localStorage.removeItem('logged')
        document.removeEventListener('click', hideDropdown )
        setUpLogin()
    } )
    
    document.addEventListener('click', hideDropdown )
    searchMovieInput.addEventListener('keyup', searchInputCallback )
}

function hideDropdown( event ){
    const dropdown = document.getElementById('dropdown-container')
      
    // if ( !dropdown.contains( event.target ) ) {
    // }
    dropdown.style.display = 'none'
}

function hideTarget( event, target, toClose ){
    console.log( target.contains( event.target ) )

    if ( !target.contains( event.target ) ) {
        toClose.style.display = 'none'
    }
}

// YOUTUBE API

let player
function onYouTubeIframeAPIReady( videoKey ) {
    player = new YT.Player( 'player', {
        videoId: videoKey,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    } )
    player.loadVideoById( videoKey, 0 )
}

function onPlayerReady( event ){
    event.target.playVideo()
}

export {
    getStarsArray,
    getSummary,
    getGenreName,
    getLanguageName,
    getDate,
    setUpLogin,
    setModalOpener,
    selectViewCallback,
    setUpHomeFunctionalities,
    hideDropdown,
    hideTarget,
    onYouTubeIframeAPIReady,
    player
}