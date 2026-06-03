"use client"
import { useGlobalContext } from '@/context/GlobalContext';
import React from 'react'

const page = () => {
    const { getcareer } = useGlobalContext();
    console.log("getcareer T&C:", getcareer);

    return (
        <div className='container mb-5 mt-5'>
        {/* <h1 className="sec-head medium sm-head text-center yellow-text">
              {getcareer?.heading}
              </h1> */}
            <div className="para mt-4 sm" dangerouslySetInnerHTML={{
                __html: getcareer?.content
            }} />
        </div>
    )
}

export default page
