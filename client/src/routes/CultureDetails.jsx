import CultureList from '../components/CultureList';
import { useLocation } from 'react-router'
import React from 'react'

const CultureDetails = () => {
    const location = useLocation();
    const { culture } = location.state || {}; // Fallback if undefined
    console.log(culture)

    return (
        <main className='main'>
            <CultureList c={culture} />
        </main>
    )
}

export default CultureDetails