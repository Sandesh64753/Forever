import React from 'react'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets.js'
import Newsletter from '../components/NewsLetter.jsx'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to redefine online shopping by delivering a seamless, reliable, and inspiring experience for every customer. We strive to connect people with a diverse range of high-quality products from trusted brands, making discovery, choice, and convenience effortless. Driven by innovation and customer satisfaction, we are committed to continuously improving our platform and empowering shoppers to find products that match their lifestyle, preferences, and aspirations—all from the comfort of their home.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarance: </b>
          <p className='text-gray-600'>Quality drives everything we do, ensuring authentic, reliable products through trusted brands, strict quality checks, and a commitment to a safe, satisfying shopping experience.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>We make online shopping simple and hassle-free with easy navigation, secure payments, smooth ordering, and reliable delivery anytime, anywhere.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>We are committed to providing prompt, friendly, and reliable support, ensuring every customer feels valued, heard, and satisfied.</p>
        </div>

      </div>

      <Newsletter/>

    </div>
  )
}

export default About
