'use client'

import React from 'react'
import Image from 'next/image'
import { Accordion } from 'react-bootstrap'
import arrow from '@/images/acc-plus.svg'
import minus from '@/images/acc-minus.svg'
import ImageSlider from './ImageSlider'

const ProgrameFaq = () => {

    const images = [
        null,
        null,
        null,
        null,
    ]

    const HtmlContent = ({content}) => {
        return (
            <div className='prog-content-card'>
                <ImageSlider images={images} />
                <div className='prog-content-card-text mt-4'>
                    <h3 className='sec-head medium-20 yellow-text'>Leadership </h3>
                    <p className='para'>
                        Elevate leadership amidst challenges, channelling team energy for brand success across all levels.
                    </p>
                    <h3 className='sec-head medium-20 yellow-text'>Creativity </h3>
                    <p className='para'>
                    Open up minds for ideas and solutions that transcend conventional boundaries. 
                    </p>
                    <h3 className='sec-head medium-20 yellow-text'>Entrepreneurship </h3>
                    <p className='para'>
                    Cultivate next-gen employees with an entrepreneurial spirit to propel the brand forward. 
                    </p>
                    <h3 className='sec-head medium-20 yellow-text'>Alpha </h3>
                    <p className='para'>
                    Unlock human potential, stay calm, and enhance deeper human connect. This program fosters clarity, perspective & confident individuals in a dynamic world. 
                    </p>
                </div>
            </div>
        )
    }

  const faqItems = [
    {
      eventKey: "0",
      header: "Boost Revenue ",
      body: "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo"
    },
    {
      eventKey: "1", 
      header: "Lower Attrition",
      body: "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo"
    },
    {
      eventKey: "2",
      header: "Enhance Operational Excellence ", 
      body: "Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo xox xo xo Xoxo xoxo"
    },
    {
      eventKey: "3",
      header: "Future Orientation", 
      body: <HtmlContent />
    }
  ]

  return (
    <section className='section-padding pb-0'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 col-12'>
            <div className='esc-content text-center'>
              <h2 className='sec-head sm-head medium'>
                Our goal-focused <span>programs</span>
              </h2>
            </div>
          </div>
          
        </div>
        <div className='row justify-content-center'>
            <div className='col-lg-10 col-12 mt-4'>
                <Accordion className='acc'>
                    {faqItems.map((item) => (
                        <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
                            <Accordion.Header>
                                <span>{item.header}</span>
                                <Image src={arrow} className='acc-arrow' alt='arrow' />
                                <Image src={minus} className='acc-minus' alt='arrow' />
                            </Accordion.Header>
                            <Accordion.Body>
                                {item.body}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
               
            </div>
        </div>
      </div>
    </section>
  )
}

export default ProgrameFaq