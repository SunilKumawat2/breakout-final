import React from 'react'
import loc1 from '@/images/exp1.jpg'
import loc2 from '@/images/exp2.jpg'
import loc3 from '@/images/exp3.jpg'
import loc4 from '@/images/exp4.jpg'
import ExpCard from './ExpCard'
import Image from 'next/image'
import Link from 'next/link'

const PeakExpSec = () => {
    const expItems = [
        {
            name: 'Influencers',
            image: loc1
        },
        {
            name: 'Video Testimonials',
            image: loc2
        },
        {
            name: 'Gallery',
            image: loc3
        },
        {
            name: 'Customer Feedback',
            image: loc4
        },
    ]
    
  return (
    <section className='section-padding loc-section'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12 text-center col-12'>
                    <h2 className='sec-head sm-head medium'>
                    Peek Into An <span>Experience</span>
                    </h2>
                </div>
            </div>
            <div className='row mt-5'>
            {
                expItems.map((item, index) => (
                    <div className='col-lg-3 col-12' key={index}>
                        <ExpCard item={item} />
                    </div>
                ))
            }
            </div>
        </div>
    </section>
  )
}

export default PeakExpSec