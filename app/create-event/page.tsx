'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import "../create-event/CreateEvent.css"
import "../globals.css"
import rightArrow from "../../public/images/right_arrow.png"



const selected = {backgroundColor: "yellow"}
const pages = ['details-1', 'details-2', 'visuals-1', 'visuals-2', 'preview']

interface EventProfile {
  eventName: string,
  eventType: string | null,
  eventLocation: string | null,
  eventAddress: string,
  eventStartDate: Date,
  eventEndDate: Date,
  eventStartTime: Date,
}

function InformationForm() {
  const [startDate, setStartDate] = useState(new Date())
  
  return (
    <div className=''>
      
      <div className='form'>
      <h1>Basic Information...</h1>
        <input type='text' placeholder='Event Name'></input>
        <select>
          <option value="Event Type"></option>
          <option value="Lorem" selected>Event Type</option>
          <option value="Lorem">lorem</option>
          <option value="Lorem">lorem</option>
        </select>

        <select>
          <option  value="Location"></option>
          <option value="Lorem" selected>Location</option>
          <option value="Lorem">lorem</option>
          <option value="Lorem">lorem</option>
        </select>
        <input type='text' placeholder='Address'></input>
        <div className='flex flex-row items-center space-x-5'>
          <input type='date'></input>
          <span>-</span>
          <input type='date'></input>
        </div>
        <div className='flex flex-row items-center space-x-5'>
          <input type='time'></input>
          <span>-</span>
          <input type='time'></input>
        </div>
        <div className='flex flex-col'>
        <label htmlFor="register-link" className='text-left'>Fill out only if you have a separate ticketing/registration link.</label>
        <input placeholder='Register Link (optional)' type='text' id="register-link"></input>
        </div>
        

      </div>
    </div>
  )
}

function LongDescriptionForm() {
  return (
    <div className='form'>
      <h1>Describe your event...</h1>
      <textarea placeholder='Short description'></textarea>
    </div>
  )
}

function PosterImageForm() {
  return (
    <div></div>
  )
}

function AdditionalImageForm() {
  return (
    <div></div>
  )
}

export default function CreateEvent() {
  const [page, setPage] = useState("details-1")
  const [pageNumber, setPageNumber] = useState(0)

  function handleNext() {
    setPageNumber(pageNumber + 1)

  }
  function handleBack() {
    setPageNumber(pageNumber - 1)
  }
  
  useEffect(() => {
    setPage(pages[pageNumber])
  }, [pageNumber])
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
                <div style={page === "preview" ? selected: {}} className='circle-radio'></div>
            </div>
        </div>
        <div>
          {page === "details-1" ? <InformationForm></InformationForm> : <></>}
          {page === "details-2" ? <LongDescriptionForm></LongDescriptionForm> : <></>}
          {page === "visuals-1" ? <PosterImageForm></PosterImageForm> : <></>}
          {page === "visuals-2" ? <AdditionalImageForm></AdditionalImageForm> : <></>}
          <div className='flex justify-center space-x-10 mt-5'>
            <button disabled={pageNumber === 0} onClick={() => handleBack()} className='bg-gray-800 text-white py-2 px-4 rounded'>Back</button>
            <button onClick={() => handleNext()} className='bg-gray-800 disabled:bg-gray-400 text-white py-2 px-4 rounded'>Next</button>
          </div>
        </div>
    </div>
  )
}
