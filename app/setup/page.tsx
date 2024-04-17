'use client'
import Image from "next/image";
import React from 'react';
import './Onboard.css';

interface Profile {
  name: string;
  type: string;
  bio: string;
  email: string;
  instagram: string;
}

export default function Onboard() {
  const [profile, setProfile] = React.useState<Profile>({
    name: '',
    type: '',
    bio: '',
    email: '',
    instagram: ''
  });
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile submitted:', profile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileUpload');
    fileInput?.click();
  };


  return (
    <div className="container">
      <div className="leftPanel">
        <div className="center-content">
          <h1 className='montserratStroke' >Edit your profile</h1>
          <p >Create your profile and start showcasing your events to the community.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Organizer Name" />
            </div>
            <div>
              <select id="type" name="type" value={profile.type} onChange={handleChange} style={{ color: profile.type === '' ? '#999' : 'black' }} >
                <option value="" disabled selected style={{ color: 'gray' }} >Organizer Type</option>
                <option value="freshman">Restaurant</option>
                <option value="sophomore">Boba</option>
                <option value="junior">Coffee</option>
                <option value="senior">Bakery</option>
              </select>
            </div>
            <div>
              <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} placeholder="Organizer Bio" className="textarea-bio"></textarea>
            </div>
            <div>
              <input id="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
            </div>

            <div>
              <input id="instagram" name="instagram" onChange={handleChange} placeholder="Instagram Account" />
            </div>

          </form>
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-continue-button" form="myForm">Save & Continue</button>
        </div>
      </div>
      <div className="rightPanel">
        <div className="profile-preview">
          <h2 className='preview'>Preview of your profile:</h2>
          <div className="image-placeholder">
            <Image
              src="/images/pfp-placeholder.png"
              alt="Profile picture"
              width={300}
              height={300}
              className="profile-picture"
            />
          </div>
          <div className="profile-info">
            <h3>{profile.name}</h3>
            <p>{profile.bio}</p>
          </div>
          <input
            type="file"
            id="fileUpload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button type="button" className="upload-button" onClick={handleUploadClick}>Upload Profile Picture</button>
        </div>
      </div>
    </div>
  );
}