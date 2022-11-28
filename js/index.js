'use strict;'
import {
    fetchGenres,
    fetchLanguages,
    fetchMovie,
    fetchSimilar
} from './async.js'
import {
    asModal,
    asRecommended
} from './utils.js'

if ( ! sessionStorage.getItem('genres') ) { fetchGenres().then( genresArray => sessionStorage.setItem( 'genres', JSON.stringify( genresArray ) ) ) }
if ( ! sessionStorage.getItem('languages') ) { fetchLanguages().then( languagesArray => sessionStorage.setItem( 'languages', JSON.stringify( languagesArray ) ) ) }

( async () => {
    const { id,
        title,
        genres,
        vote_average,
        overview,
        backdrop_path,
        release_date,
        original_language } = await fetchMovie( '663712' )
        
        const genre = genres[0].name
        const summary = overview.split(' ').length >= 30 ? overview.split(' ').slice( 0, 30 ).join(' ') + "..." : overview
        
        const [ year, month, day ] = release_date.split('-')
        const date = new Date( Date.UTC( year, month, day ) )
        const release = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(date)
        const releaseArray = release.split(' ')
        const releaseFormatted = releaseArray[0] + ' ' + releaseArray[1] + ', ' + releaseArray[2]
        
        const languageArray = JSON.parse( sessionStorage.getItem('languages') )
        const languageObj = languageArray.find( el => el.iso_639_1 === original_language )
        const language = languageObj.english_name
                    
        const modal = asModal( id, title, genre, summary, releaseFormatted, backdrop_path, language, Math.round( vote_average/2 ) )
        document.getElementById('master-container').innerHTML = modal

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