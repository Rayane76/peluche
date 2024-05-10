'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../styles/newArrivalsHome.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/navigation';




export default function NewArrival(props){

  const router = useRouter();

    return(
        <section className='newArrivalsDiv'>
          <div className='d-flex justify-content-center align-items-center mb-4'>
          <h1 style={{margin:0}}>New Arrivals</h1>
          </div>
           <Swiper
        spaceBetween={30}
        breakpoints={{
          10: {
            slidesPerView: 1,
            spaceBetween: 30,
          } ,
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          } ,
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
       {props.newArrivals.map((article)=>{
        return(
          <>
            <SwiperSlide>
                <div className='newArrival' onClick={()=>router.push("/articles/" + article._id)} >
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='newArrival'>
                   <div className='imgDiv'>
                    <Image src={article.colors[0].images[0]} width={0} height={0} sizes='100vw' className='newArrivalImage' alt={article.name} />
                    </div>
                    <p className='name'>
                      {article.name}
                    </p>
                    <p className='price'>
                    {article.price}
                    </p>
                </div>
            </SwiperSlide>
            </>
        )
       })}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
        </section>
    )
}