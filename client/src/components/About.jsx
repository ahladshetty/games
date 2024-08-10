import React from 'react'
import Navbar from './Navbar'
import hbg from '../../src/images/homebg2.svg'
import a1 from '../../src/images/star.svg'

const About = () => {
  return ( 
    <div>
    <Navbar/>
    <div className="bg-black bg-opacity-50 bg-cover bg-center min-h-screen"  style={{
      backgroundImage: `url(${hbg})`}}>
             <div className="absolute flex justify-center space-x-36 bottom-0">
       <img src={a1} alt="" className="h-10 w-auto movele delay4"/>
       <img src={a1} alt="" className=" h-10 w-auto movele delay1"/>
       <img src={a1} alt="" className=" h-10 w-auto movele delay4"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay2"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay3"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay5"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay2"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay1"/>
      </div>
    <div className='text-center mx-5 '>
    <br /><br />
    <h3 style={{ fontSize: "40px" }} className='font-body drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]'>Under the guidance of </h3>
    <br />
    <h3 style={{ fontSize: "40px" }} className='font-body3 text-white'>Dr. Sarika Hegde</h3>
    <h3 style={{ fontSize: "20px" }} className='font-body3 text-white mt-2'>Professor, NMAMIT</h3>
    <h3 style={{ fontSize: "40px" }} className='font-body3 text-white mt-2'>Ms. Jayapadmini Kanchan</h3>
    <h3 style={{ fontSize: "20px" }} className='font-body3 text-white mt-2'>Assistant Professor, NMAMIT</h3>
    </div>
    <div className='text-center mt-20'>
    <h3 style={{ fontSize: "40px" }} className='font-body drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]'>Development Team </h3>
    <br />
    <h3 style={{ fontSize: "40px" }} className='font-body3 text-white '>Chirag B S</h3>
    <h3 style={{ fontSize: "20px" }} className='font-body3 text-white mt-2'>4NM21CS048</h3>
    <h3 style={{ fontSize: "40px" }} className='font-body3 text-white mt-2'>Ahlad Shetty</h3>
    <h3 style={{ fontSize: "20px" }} className='font-body3 text-white mt-2'>4NM21CS049</h3>
    </div>
    </div>
    </div>
  )
}

export default About