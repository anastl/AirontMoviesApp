import {
    loginHtml, 
    headerAndSearchBarHtml, 
    Movie, 
    homeMockup, 
    getDetailsHtml, 
    showResAndSetUpBtn
} from './utils.js'

function setUpSelectionButtons() {
    const displaySelectionBtnsArr = [ ...document.getElementsByClassName('svg-btn') ]
    
    displaySelectionBtnsArr.forEach( btn => {
        btn.addEventListener('click', e => {
            if ( ! [...btn.classList].find( classBtn => classBtn === 'selected') ) {
                btn.classList.add('add_selected')
            }
            displaySelectionBtnsArr.forEach( btn => {
                btn.classList.remove('selected')
                if ( [...btn.classList].find( classBtn => classBtn === 'add_selected') ) {
                    btn.classList.remove('add_selected')
                    btn.classList.add('selected')
                }
            })
            changeClass( e.target.dataset.view )
        } )
    } )
}

function setUpWatchBtns() { // Calls getDetailsHtml with the movie ID
    const watchBtn = [ ... document.getElementsByClassName('watch-now-btn') ]

    watchBtn.forEach( btn => {
        btn.addEventListener('click', e => {
            e.preventDefault()
            getDetailsHtml( btn.dataset.movieid )
        } ) 
    } )
}

function showDetails() {
    document.getElementById('master-container').innerHTML = getDetailsHtml( '1' )
    document.getElementById('close-modal').addEventListener('click', e => {
        console.log("clicked close")
    })
}

function changeClass( selected ) {
    const oldClass = selected === 'grid' ? 'column' : 'grid'
    const newClass = selected

    const moviesMwArray = [ ... document.getElementsByClassName('mw') ]
    moviesMwArray.forEach( movie => {
        movie.classList.remove( `mw-${oldClass}` )
        movie.classList.add( `mw-${newClass}` )
    } )

    const titlesMwArray = [ ... document.getElementsByClassName('mw-title') ]
    titlesMwArray.forEach( title => {
        title.classList.remove( `mw-title-${oldClass}` )
        title.classList.add( `mw-title-${newClass}` )
    } )

    const summaryMwArray = [ ... document.getElementsByClassName('summary--mw') ]
    summaryMwArray.forEach( summaryClass => {
        summaryClass.classList.remove( `summary--${oldClass}-mw` )
        summaryClass.classList.add( `summary--${newClass}-mw` )
    } )

    const detailsMwArray = [ ... document.getElementsByClassName('details--mw') ]
    detailsMwArray.forEach( detail => {
        detail.classList.remove( `details--mw-${oldClass}` )
        detail.classList.add( `details--mw-${newClass}` )
    })

    const starsContainerArray = [ ... document.getElementsByClassName('stars-container--mw') ]
    starsContainerArray.forEach( starClass => {
        starClass.classList.remove( `stars-container--mw-${oldClass}` )
        starClass.classList.add( `stars-container--mw-${newClass}` )
    })

    document.getElementById('most-watched-movies').classList.remove( oldClass )
    document.getElementById('most-watched-movies').classList.add( newClass )
}

function setUpRecommendedMovies() {
    const recs = [ ... document.getElementsByClassName('img-link') ]
    recs.forEach( rec => {
        rec.addEventListener('click', () => {
            const movieId = rec.dataset.movieid
            getDetailsHtml( movieId )
        } )
    } )
}

function setUpMovies() {
    const moviesArray = [ ...document.getElementsByClassName('mw') ]
    moviesArray.forEach( movie => {
        movie.addEventListener('click', () => {
            const movieId = movie.dataset.movieid
            getDetailsHtml( movieId )
        } )
    } )
}

export {
    setUpSelectionButtons, 
    setUpWatchBtns, 
    showDetails,
    changeClass,
    setUpRecommendedMovies,
    setUpMovies
}