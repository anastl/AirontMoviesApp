'use strict;'
import {
    fetchGenres,
    fetchLanguages
} from './async.js'
import {
    setUpLogin,
    onYouTubeIframeAPIReady,
    player
} from './utils.js'

setUpLogin()

if ( ! sessionStorage.getItem('genres') ) { fetchGenres().then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) ) }

if ( ! sessionStorage.getItem('languages') ) { fetchLanguages().then( languagesArray => sessionStorage.setItem( 'languages', JSON.stringify( languagesArray ) ) ) }