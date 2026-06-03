import React from 'react'
import InnerPageBanner from '@/components/InnerPageBanner'
import Image from 'next/image'
import enc from '@/images/enc.svg'
import mBox from '@/images/m-box.png'
import HmTextSec from '@/components/home/HmTextSec'
import icon1 from '@/images/icon1.svg'
import icon2 from '@/images/icon2.svg'
import icon3 from '@/images/icon3.svg'
import icon4 from '@/images/icon4.svg'
import illus3 from '@/images/illus3.svg'
import hmIllus from '@/images/bottom-illus.svg'
import LogoSec from '@/components/LogoSec'
import EscapeRoomCard from '@/components/EscapeRoomCard'
import CounterBox from '@/components/CounterBox'
import VisitLocations from '@/components/VisitLocations'
import PeakExpSec from '@/components/PeakExpSec'
import BlogSlider from '@/components/BlogSlider'
import HomeContact from '@/components/home/HomeContact'
import locIcon from '@/images/loc-icon.svg'
import ReserveASlot from '@/components/ReserveASlot'
import fdImg1 from '@/images/fd-img1.png'
import Link from 'next/link'
import wh from '@/images/wh.svg'
import locPlace from '@/images/loc-place.svg'
import BirthdayBanner from '@/components/BirthdayBanner'
import bdayIllus from '@/images/bday-illus.svg'

import whicon from '@/images/wh-icon.svg'
import phicon from '@/images/phone.svg'
import mailicon from '@/images/mail-icon.svg'

import bdayImg1 from '@/images/kid1.jpg'
import bdayImg2 from '@/images/kid2.jpg'
import bdayImg3 from '@/images/kid3.jpg'
import bdayImg4 from '@/images/kid4.jpg'
import bdayImg5 from '@/images/kid5.jpg'
import bdayImg6 from '@/images/kid6.jpg'
import bdayImg7 from '@/images/kid7.jpg'
import partyillus from '@/images/party-illus.svg'
import BirthdayGetInTouch from '@/components/BirthdayGetInTouch'
import PartySlider from '@/components/PartySlider'
import ReadyToGoPlans from '@/components/ReadyToGoPlans'
import Videotestimonials from '@/components/Videotestimonials'
import FaqSection from '@/components/FaqSection'

import nightIllus from '@/images/night-illus.svg'

import bdayBanner from '@/images/kid-banner.jpg'

import theme1 from '@/images/theme1.jpg'
import theme2 from '@/images/theme2.jpg'
import theme3 from '@/images/theme3.jpg'
import theme4 from '@/images/theme4.jpg'

import Packages from '@/components/Packages'

import PartyExpertCon from '@/components/PartyExpertCon'

import movieIllus from '@/images/movie-illus.svg'
import OurLocationSec from '@/components/OurLocationSec'
import coupleIllus from '@/images/couple-illus.svg'
import loveIllus from '@/images/love-illus.svg'

const page = () => {

    const banner = 
        {
            title: 'Love Out @ BREAKOUT®',
            subTitle: 'Celebrate Love with a <span>Mysterious twist!</span>',
            
        }
    

    const hmText = 'Love Out <span>@ Breakout®</span> is all about… <br /> Making love feel <span>Special and Sacred.</span> <br /> Connect soulfully, laugh heartfully & <span>crack the mystery code</span>. <br /> Gift moments of <span>togetherness</span> that will last a lifetime.';

    const bdays = [
        {
            image: bdayImg1,
            title: 'Party Fun',
        },
        {
            image: bdayImg2,
            title: 'Surprises',
        },
        {
            image: bdayImg3,
            title: 'Mysteries',
        },
        {
            image: bdayImg4,
            title: 'Cakes',
        },
        {
            image: bdayImg5,
            title: 'Delectable Treats',
        },
        {
            image: bdayImg6,
            title: 'Photos & Videos',
        },
        {
            image: bdayImg7,
            title: 'Return Gifts',
        },
    ]

    const coupleOffering = [
        {
            image: null,
            title: 'Anniversary',
        },
        {
            image: null,
            title: 'Birthday',
        },
        {
            image: null,
            title: 'Special Day',
        },
    ]

    const themes = [
        {
            image: theme1,
            title: 'Keep it simple - Classic',
        },
        {
            image: theme2,
            title: '<span>Go Premium</span> - Wizard',
        },
        {
            image: theme3,
            title: '<span>Go Premium</span> - Mystery',
        },
        {
            image: theme4,
            title: '<span>Go Premium</span> - Your Theme',
        },
    ]

  return (
    <>
        <InnerPageBanner banner={banner} />
        
        <div className='black-gr-div'>

            <section className="section-padding">
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12 text-center'>
                            <h3 className='sec-head'>Make ‘your love’ feel <span>special!</span></h3>
                        </div>
                    </div>
                </div>
            </section>
            
            <HmTextSec text={hmText} />
            <div className="container">
                <div className="bday-text-wrap">
                    <p className="underline-big-text">
                    Why Birthdays Matter: A Message from Our Founder You Won’t Want to Miss!
                    </p>
                </div>
            </div>

            <section className="section-padding bday-count-sec pb-0">
                <div className="container">
                    <div className="row row-gap-25">
                        {
                            [...Array(4)].map((_, index) => (
                                <div className="col-lg-3 col-6" key={index}>
                                    <CounterBox key={index} bday={true} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className='section-padding bday-sec'>
                <div className='container'>
                    
                    <div className='row mt-5 row-gap-25'>
                        {
                            coupleOffering.map((bd, index) => (
                                <div className="col-lg-4 col-12" key={index}>
                                    <div className='location-card'>
                                        <div className='location-card-img'>
                                            {
                                                bd.image && <Image src={bd.image} alt={bd.title}  /> 
                                            }
                                        </div>
                                        <div className='location-card-content'>
                                            <h3>{bd.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            
            <Image src={coupleIllus} className={'w-100 h-auto'} alt="bday" />

        </div>

        <div className='black-gr-div'>

            <section className='section-padding bday-sec'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12 text-center'>
                            <h3 className='sec-head medium sm-head'>Your Party <span>Inclusions</span></h3>
                        </div>
                    </div>
                    <div className='row mt-5 row-gap-25'>
                        {
                            bdays.map((bd, index) => (
                                <div className="col-lg-4 col-12" key={index}>
                                    <div className='location-card'>
                                    <div className='location-card-img'>
                                        <Image src={bd.image} alt={bd.title}  />
                                    </div>
                                    <div className='location-card-content'>
                                        <h3>{bd.title}</h3>
                                    </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <Packages />

             <section className='section-padding namecard-sec pt-0 pb-0'>
                <div className='container'>
                    <div className='row row-gap-25'>
                    {
                        [...Array(3)].map((_, index) => (
                            <div className='col-lg-4 col-12' key={index}>
                                <div className='namecard-box'>
                                    <div className='top-box'>
                                        <div className='pf'>
                                            {/* <Image src={mBox} alt="m-box" className='w-100 h-auto' /> */}
                                        </div>
                                        <h3 className='sec-head medium-20'>
                                            Xoxo xox xo
                                        </h3>
                                    </div>
                                    <p className="para">
                                    Xoxo xox xo Xoxo xox xo  Xoxo xox xo  Xoxo xox xo  Xoxo xox xo...
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </section>

            
            
            <Image src={bdayIllus} alt="illus3" className='illus-3 w-100 h-auto' />
        </div>
        <div className='black-gr-div'>
            <PartyExpertCon className="pt-80" data="couple_birthday"/>
            <ReadyToGoPlans />
            <Videotestimonials />
            <Image src={loveIllus} className={'w-100 h-auto mt-5'} alt="bday" />
        </div>
        <div className='black-gr-div'>
            <FaqSection />
            <OurLocationSec title="About Our <span>Our Location</span>" />
            <BlogSlider />
            <LogoSec />
            <BirthdayGetInTouch img={nightIllus}/>
  
        </div>
    
    </>
  )
}

export default page