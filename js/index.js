'use strict;'
import {
    fetchGenres,
    fetchLanguages,
    fetchMovie,
    fetchSimilar
} from './async.js'
import {
    loginHtml,
    asModal,
    asRecommended,
    setUpLogin,
    asTrailer,
    onYouTubeIframeAPIReady,
    player
} from './utils.js'

if ( sessionStorage.getItem('genres') !== undefined ) { fetchGenres().then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) ) }
if ( sessionStorage.getItem('languages') !== undefined ) { fetchLanguages().then( languagesArray => sessionStorage.setItem( 'languages', JSON.stringify( languagesArray ) ) ) }

setUpLogin()



/*
( async () => { //handle modal, works
    const { id,
        title,
        genres,
        vote_average,
        overview,
        backdrop_path,
        release_date,
        original_language } = await fetchMovie( '663712' )
                
        const modal = asModal( id, title, genres[0], overview, release_date, backdrop_path, original_language, vote_average )
        document.getElementById('modal-container').innerHTML = modal

        const recommendedArray = await fetchSimilar( id )
        const recommendedImgs = recommendedArray.map( ( { id, title, backdrop_path } ) => backdrop_path && asRecommended( id, title, backdrop_path ) )

        const addMoreBtn = document.getElementById('add-more')
        const parent = addMoreBtn.parentElement
        
        recommendedImgs.slice( 0, 3 ).forEach( imgDiv => parent.insertBefore( imgDiv, addMoreBtn ) )
        
        addMoreBtn.addEventListener('click', () => {
            const oldIndex = parseInt( addMoreBtn.dataset.numberOfRecs )
            const newIndex = oldIndex + 3
            addMoreBtn.dataset.numberOfRecs = newIndex

            const recImgs = recommendedArray.map( ( { id, title, backdrop_path } ) => asRecommended( id, title, backdrop_path ) )

            recImgs.slice( oldIndex, newIndex ).forEach( imgDiv => parent.insertBefore( imgDiv, addMoreBtn ) )
        } )
} )()
*/