import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ExpCard = ({item}) => {
  return (
    <Link href={`/escape-rooms/${item.name}`} className='exp-card'>
        <div className='exp-card-img'>
            <Image src={item.image} alt={item.name}  />
        </div>
        <div className='exp-card-content'>
            <h3>{item.name}</h3>
        </div>
    </Link>
  )
}

export default ExpCard