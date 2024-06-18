// Libraries
import React from 'react';
// Assets - icons
import LogoSutidor from './../../assets/icons/logo-surtidor.svg'
// styles
import './PublicLayout.scss';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='PublicLayout'>
            <div className='PublicLayout__logo-container'>
                <img src={LogoSutidor} alt="Logo" />
            </div>
            <div className='PublicLayout__content'>
                {children}
            </div>
        </div>
    )
}

export default PublicLayout