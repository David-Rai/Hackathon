import CultureList from '../components/CultureList';
import { useLocation } from 'react-router'
import React from 'react'

const CultureDetails = () => {
    const location = useLocation();
    const { culture } = location.state || {}; // Fallback if undefined
    console.log(culture)

    return (
        <main className='main flex justify-center'>
            <div className='w-[60%]'>
                <CultureList c={culture} />
            </div>
        </main>
    )
}

export default CultureDetails