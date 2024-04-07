import React from 'react'

const Header = ({ title }) => {
    return (
        <header>
            <div className='header'>
                <h1 className='header-h1'>{title}</h1>
            </div>
        </header>
    )
}

export default Header