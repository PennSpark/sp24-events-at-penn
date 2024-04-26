import React, { useState } from 'react';
import Image from 'next/image';
import "../globals.css"
import { uploadImage } from '../lib/utils';

export default function ImageUploader({ eventPacket, setEventPacket }: { eventPacket: any, setEventPacket: (newValue: any) => void }) {

    const handleImageChange = async (e : any) => {
        const file = e.target.files[0];
        setEventPacket({...eventPacket, poster: file})
    };

    return (
        <div className='flex justify-center'>
            {eventPacket.poster ? (
                <div className='flex items-center flex-col border border-dashed border-1 border-black p-2 rounded'>
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
                    <button onClick={() => setEventPacket({...eventPacket, poster: null})} className='w-10 h-10 bg-red-600 rounded text-center'>
                        <span className='text-white text-4xl'>X</span>
                    </button>
                </div>
            ) : (
                <div className='uploader-border p-5 flex flex-col items-center'>
                    <h1 className='mb-3'>Select a file below</h1>
                    <p className='text-xs text-[#838383] mb-3'>File supported: PDF, png, jpeg</p>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            )}
        </div>
    );
}

