import React from 'react'

function Arrow(props) {
    return (
        <svg className={props.turn ? 'arrow rotate' : 'arrow'} width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7 5L0.75 10L0.75 -2.73196e-07L7 5Z" fill="#B2BBD5"/>
        </svg>

    )
}

export default Arrow