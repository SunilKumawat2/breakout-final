import React from 'react'
import Image from 'next/image'
import bdayIcon from '@/images/ribbon.svg'

const CounterBox = ({bday}) => {
  return (
    <div className={`counter-box ${bday ? 'bday-counter-box' : ''}`}>
        {
          bday && (
            <Image src={bdayIcon} alt="bday-icon" />
          )
        }
        <h3>10,000+</h3>
        <p>Positive Reviews</p>
    </div>
  )
}

export default CounterBox