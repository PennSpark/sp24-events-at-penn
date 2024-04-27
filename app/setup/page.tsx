'use client'
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import './Onboard.css';
import { GetServerSideProps } from 'next';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../lib/firebase';

interface Profile {
  name: string;
  type: string;
  bio: string;
  email: string;
  instagram: string;
  website: string;
}


export default function Onboard() {
  const [profile, setProfile] = React.useState<Profile>({
    name: '',
    type: '',
    bio: '',
    email: '',
    instagram: '',
    website: '',
  });
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string>("/images/pfp-placeholder.png");

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch("/api/organizers/penn-spark");
      const profileData = await res.json();
      const content = profileData.body;
      // console.log(content.tags.json().body);
      const profile = {
        name: content.name,
        type: content.tagName,
        bio: content.desc,
        email: content.email,
        instagram: content.channels.Instagram,
        website: content.channels.Website
      };
      // console.log(profile);
  
      setProfile(profile);
      setImagePreviewUrl(content.img);
    };

    getProfile();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = "penn-spark";
      const params = new URLSearchParams();
        params.append("slug", slug);
        params.append("name", profile.name);
        params.append("desc", profile.bio);
        params.append("email", profile.email);
        params.append("tags", profile.type);
        params.append("img", imagePreviewUrl);
      const url = new URL(`/api/organizers/${slug}/update`, window.location.origin);
      url.search = params.toString();

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        console.log('Profile updated successfully:', data);
      } else {
        throw new Error(data.body || "Failed to update profile");
      }
    // console.log('Profile submitted:', profile);
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
      
  };



  const uploadImageToFirebase = async (file) => {
    if (!file) return;
  
    try {
      const storageRef = ref(storage, `profileImages/${file.name}`);
  
      const snapshot = await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);
  
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  };

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

  const handleUploadClick = async () => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    fileInput.click();
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
  
      // Upload the file to Firebase Storage and get the download URL
      const downloadURL = await uploadImageToFirebase(file);
  
      // Optionally, update the state or perform other actions with the download URL
      setImagePreviewUrl(downloadURL);
    }
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
          <form onSubmit={ handleSubmit}>
            <div>
              <input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Organizer Name" />
            </div>
            <div>
              <select id="type" name="type" value={profile.type} onChange={handleChange} style={{ color: profile.type === '' ? '#999' : 'black' }} >
                <option value="" disabled style={{ color: 'gray' }}>Organizer Type</option>
                <option value="bakery">Bakery</option>
                <option value="food">Food</option>
                <option value="promos">Promos</option>
                <option value="bakery">Bakery</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div>
              <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} placeholder="Organizer Bio" className="textarea-bio"></textarea>
            </div>
            <div>
              <input id="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
            </div>

            <div>
              <input id="instagram" name="instagram" value={profile.instagram} onChange={handleChange} placeholder="Instagram Account" />
            </div>

            <div>
              <input id="website" name="website" value={profile.website} onChange={handleChange} placeholder="Website Link" />
            </div>

          </form>
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-continue-button" form="myForm" onClick={handleSubmit}>Save</button>
        </div>
      </div>
      <div className="rightPanel">
        <div className="profile-preview">
          <h2 className='preview'>Preview of your profile:</h2>
          <div className="image-placeholder">
            <Image
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