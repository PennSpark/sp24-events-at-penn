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

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string>("/images/pfp-placeholder.png");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Create a preview URL for the uploaded file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    fileInput.click();
  };

  // const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  // const handleUploadClick = () => {
  //   const fileInput = document.getElementById('fileUpload');
  //   fileInput?.click();
  // };


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
                <option value="" disabled style={{ color: 'gray' }}>Organizer Type</option>
                <option value="restaurant">Restaurant</option>
                <option value="boba">Boba</option>
                <option value="coffee">Coffee</option>
                <option value="bakery">Bakery</option>
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
          <button type="submit" className="save-continue-button" form="myForm">Save</button>
        </div>
      </div>
      <div className="rightPanel">
        <div className="profile-preview">
          <h2 className='preview'>Preview of your profile:</h2>
          <div className="image-placeholder">
            <img
              src={imagePreviewUrl}
              alt="Profile picture"
              width={300}
              height={300}
              className="profile-picture"
            />
          </div>
          <div className="profile-info">
            <h3>{profile.name || "Profile Name"}</h3>
            <p>{profile.bio || "Bio"}</p>
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