"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import rightArrow from '../../public/images/right_arrow.png';
import "../create-event/CreateEvent.css";
import "../globals.css";
import ImageUploader from '../(components)/imageuploader';
import { useRouter } from 'next/router';
import { useAuthContext } from '../(components)/auth/authcontext';
import { Category } from '../lib/types';

const selected = { backgroundColor: "yellow" };
const pages = ['details-1', 'details-2', 'visuals-1', 'visuals-2', 'preview'];

interface EventProfile {
  eventName: string;
  eventType: string;
  eventLocation: string;
  eventAddress: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventDescription: string;
  eventLink: string;
  poster: any;
}

const categories: Category[] = [
  { name: 'Bakery', emoji: '🥐' },
  { name: 'Coffee', emoji: '☕' },
  { name: 'Boba', emoji: '🧋' },
  { name: 'Restaurant', emoji: '🍲' },
  { name: 'Party', emoji: '🎉' },
  { name: 'Promos', emoji: '🎟️' },
  { name: 'Miscellaneous', emoji: '🔮' },
  { name: 'Food', emoji: '🍔' },
  { name: 'Sports', emoji: '🏀' },
];

//TODO
function Preview({ eventPacket }: { eventPacket: EventProfile }) {
  return (
    <div className='preview-container'>
      <h1 className='mb-5 text-center text-4xl'>Preview your event before launching...</h1>
      <h2 className=''>{eventPacket.eventName}</h2>
      <div className='flex flex-row'>
        <div>
          
        </div>
        <div style={{ width: '45vh', height: '50vh', position: 'relative' }} className='mb-4'>
          <div style={{ width: '100%', height: '100%' }}>
            <Image
              src={URL.createObjectURL(eventPacket.poster)}
              alt="Selected"
              layout="fill"
              objectFit="fill"
              className='rounded'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InformationForm({ eventPacket, setEventPacket }: { eventPacket: EventProfile, setEventPacket: (newValue: EventProfile) => void }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='form'>
      <h1 className='mb-5 text-center text-4xl'>Basic Information...</h1>
      <input className='single-input' type='text' value={eventPacket.eventName} onChange={(e) => setEventPacket({ ...eventPacket, eventName: e.target.value })} placeholder='Event Name'></input>
      <select className={`single-input ${eventPacket.eventType == "" ? "text-[#838383]" : ""}`} value={eventPacket.eventType} onChange={(e) => setEventPacket({ ...eventPacket, eventType: e.target.value })}>
        <option disabled className='first-option' value="" >Event Type</option>
        {categories.map(category => 
          <option key={category.name} value={category.name}>{category.name} {category.emoji}</option>
        )}
      </select>
      <select className={`single-input ${eventPacket.eventLocation == "" ? "text-[#838383]" : ""}`} value={eventPacket.eventLocation} onChange={(e) => setEventPacket({ ...eventPacket, eventLocation: e.target.value })}>
        <option disabled className='first-option' value="">Location</option>
        <option value="Lorem" selected>Lorem</option>
        <option value="Lorem">lorem</option>
        <option value="Lorem">lorem</option>
      </select>
      <input className='single-input' type='text' placeholder='Address' value={eventPacket.eventAddress} onChange={(e) => setEventPacket({ ...eventPacket, eventAddress: e.target.value })}></input>
      <label htmlFor='start-end-date' className='text-[#838383] text-xs ml-3'>Enter the start/end date of your event</label>
      <div className='flex flex-row justify-center items-center space-x-5' id='start-end-date'>
        <input type='date' className='single-input double-input' onChange={(e) => setEventPacket({ ...eventPacket, eventStartDate: e.target.value })} value={eventPacket.eventStartDate}></input>
        <span>-</span>
        <input type='date' className='single-input double-input' onChange={(e) => setEventPacket({ ...eventPacket, eventEndDate: e.target.value })} value={eventPacket.eventEndDate}></input>
      </div>
      <label className='text-[#838383] text-xs ml-3' htmlFor='start-end-time'>Enter the start/end time of your event</label>
      <div className='flex flex-row items-center justify-center space-x-5' id='start-end-time'>
        <input type='time' className='single-input double-input' onChange={(e) => setEventPacket({ ...eventPacket, eventStartTime: e.target.value })} value={eventPacket.eventStartTime}></input>
        <span>-</span>
        <input type='time' className='single-input double-input' onChange={(e) => setEventPacket({ ...eventPacket, eventEndTime: e.target.value })} value={eventPacket.eventEndTime}></input>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="register-link" className='text-left text-xs text-[#8E8E8E] ml-3'>Fill out only if you have a separate ticketing/registration link.</label>
        <input value={eventPacket.eventLink} onChange={(e) => setEventPacket({ ...eventPacket, eventLink: e.target.value })} className='single-input' placeholder='Register Link (optional)' type='text' id="register-link"></input>
      </div>
    </div>
  );
}

function LongDescriptionForm({ eventPacket, setEventPacket }: { eventPacket: EventProfile, setEventPacket: (newValue: EventProfile) => void }) {
  return (
    <div className='form'>
      <h1 className='text-center mb-5 text-4xl'>Describe your event...</h1>
      <textarea className='descriptor-box rounded' value={eventPacket.eventDescription} onChange={(e) => setEventPacket({ ...eventPacket, eventDescription: e.target.value })} placeholder='Short description'></textarea>
    </div>
  );
}

function PosterImageForm({ eventPacket, setEventPacket }: { eventPacket: EventProfile, setEventPacket: (newValue: EventProfile) => void }) {
  return (
    <div>
      <h1 className='text-center mb-5 text-4xl'>Creating visuals...</h1>
      <div className='flex flex-col'>
        <h1 className='text-center'>Upload event poster</h1>
        <ImageUploader eventPacket={eventPacket} setEventPacket={setEventPacket}></ImageUploader>
      </div>
    </div>
  );
}

function AdditionalImageForm({ eventPacket, setEventPacket }: { eventPacket: EventProfile, setEventPacket: (newValue: EventProfile) => void }) {
  return (
    <div>
      <h1 className='text-center mb-5 text-4xl'>Creating visuals...</h1>
      <div className='flex flex-col'>
        <h1 className='text-center'>Upload Relevant Media to image gallery (optional)</h1>
        {/** TODO make a variant on the ImageUploader component called MultimediaUploader that allows additional images to be uploaded **/}
        <ImageUploader eventPacket={eventPacket} setEventPacket={setEventPacket}></ImageUploader>
      </div>
    </div>
  );
}

export default function CreateEvent() {
  const [page, setPage] = useState("details-1");
  const [pageNumber, setPageNumber] = useState(0);
  const [eventPacket, setEventPacket] = useState<EventProfile>({
    eventName: "",
    eventType: "",
    eventLocation: "",
    eventAddress: "",
    eventStartDate: "",
    eventEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventDescription: "",
    eventLink: "",
    poster: null
  });

  function handleNext() {
    setPageNumber(pageNumber + 1);
  }

  function handleBack() {
    setPageNumber(pageNumber - 1);
  }

  useEffect(() => {
    setPage(pages[pageNumber]);
  }, [pageNumber]);



  return (
    <div className='w-screen h-screen backdrop'>
      <div className='flex justify-center items-center space-x-10'>
        <div className='flex items-center flex-col'>
          <span>Details</span>
          <div style={page === "details-1" || page === "details-2" ? selected : {}} className='circle-radio'></div>
        </div>
        <Image className='right-arrow' src={rightArrow} alt="right-arrow"></Image>
        <div className='flex items-center flex-col'>
          <span>Visuals</span>
          <div style={page === "visuals-1" || page === "visuals-2" ? selected : {}} className='circle-radio'></div>
        </div>
        <Image className='right-arrow' src={rightArrow} alt="right-arrow"></Image>
        <div className='flex items-center flex-col'>
          <span>Launch</span>
          <div style={page === "preview" ? selected : {}} className='circle-radio'></div>
        </div>
      </div>
      <div>
        {page === "details-1" ? <InformationForm eventPacket={eventPacket} setEventPacket={setEventPacket} /> : <></>}
        {page === "details-2" ? <LongDescriptionForm eventPacket={eventPacket} setEventPacket={setEventPacket} /> : <></>}
        {page === "visuals-1" ? <PosterImageForm eventPacket={eventPacket} setEventPacket={setEventPacket} /> : <></>}
        {page === "visuals-2" ? <AdditionalImageForm eventPacket={eventPacket} setEventPacket={setEventPacket} /> : <></>}
        {page === "preview" ? <Preview eventPacket={eventPacket}></Preview> : <></>}
        <div className='flex justify-center space-x-10 mt-5'>
          <button disabled={pageNumber === 0} onClick={handleBack} className='bg-gray-800 text-white py-2 px-4 rounded'>Back</button>
          <button onClick={handleNext} className='bg-gray-800 disabled:bg-gray-400 text-white py-2 px-4 rounded'>Next</button>
        </div>
      </div>
    </div>
  );
}