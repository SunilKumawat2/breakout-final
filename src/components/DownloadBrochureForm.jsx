'use client'

import React, { useState } from 'react'
import Select from 'react-select'
import loc from '@/images/loc.svg'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import bx1 from '@/images/bx1.svg'
import bx2 from '@/images/bx2.svg'
import bx3 from '@/images/bx3.svg'

const DownloadBrochureForm = ({img = false}) => {


  return (
    <section className={`section-padding ${img ? 'pb-0' : ''}`}>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12 col-12'>
                    <div className='esc-content text-center'>
                        <h2 className='sec-head sm-head medium'>
                        Download Brochure
                        </h2>
                    </div>
                </div>
                <div className='col-12 mt-4'>
                    <div className='bday-form-card'>
                        
                        <div className='form-field '>
                            <div className='row align-items-end row-gap-25'>
                                <div className='col-lg-6 col-12'>
                                <div className='form-group'>
                                    <div className="input-group">
                                        <input type='text' placeholder='Name' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-12'>
                                <div className='form-group'>
                                    <div className="input-group">
                                        <input type='text' placeholder='Phone Number' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-12'>
                                <div className='form-group'>
                                    <div className="input-group">
                                        <input type='text' placeholder='Add your E-mail ID' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-12'>
                                <div className='form-group'>
                                    <div className="input-group">
                                        <div className='cus-check'>
                                            <input type='checkbox' id='check' />
                                            <label htmlFor='check' className='form-label'><span>Apply for Breakout X</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                           
                            <div className='col-lg-12 col-12'>
                                <div className=''>
                                    <button className='main-btn dark-btn'>
                                        <span className='yellow-text'>Book a call</span>
                                        </button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
  )
}

export default DownloadBrochureForm