'use client'
import Image from "next/image";
import React, {useEffect} from 'react';
import './Interest.css';
import Cookies from 'js-cookie';
import { Tag } from '../lib/types';


// type Tag = string;
type SelectedTags = Tag[];
const categories: Tag[] = [
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
// const TAGS: Tag[] = ["Bakery 🥐", "Promotion 💵", "Boba 🧋", "Coffee Shop ☕️", "Restaurant 🥘", "Party 💃"];


export default function Interest() {
    const [selectedTags, setSelectedTags] = React.useState<SelectedTags>([]);


    useEffect(() => {
      const interestsCookieValue = Cookies.get('interestsCookie');
      if (interestsCookieValue) {
        console.log('Found interestsCookie:', interestsCookieValue);
        setSelectedTags(JSON.parse(interestsCookieValue));
        window.location.href = '/explore';
      }
    }, []);
    
    const handleTagClick = (tag: Tag) => {
        setSelectedTags(prevSelectedTags => {
          if (prevSelectedTags.includes(tag)) {
            return prevSelectedTags.filter(t => t !== tag);
          } else {
            return [...prevSelectedTags, tag];
          }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const tagsString = JSON.stringify(selectedTags);
      Cookies.set('interestsCookie', tagsString, { expires: 7, path: '/' }); // Expires in 7 days
      console.log('Selected tags saved:', selectedTags);

      window.location.href = '/explore'; 
    };

    
    


    return (
    <div className="container">
        <div className="leftPanel">
        <div className = "center-content">
        <h1 className = 'montserratStroke' >Pick your tags!</h1>
        <p >Select the event types you are interested in to get more accurate recommendations of events!</p>
        <div className="tag-container">
            {categories.map((tag: Tag) => (
              <button
                key={tag.name}
                className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name} {tag.emoji}
              </button>
            ))}
          </div>
        </div>
          <div className="form-buttons">
          <button type="submit" className="save-continue-button" form="myForm" onClick={handleSubmit}>Save</button>
        </div>
        </div>
        <div className="middle">
          <div>
          <Image
            src="/images/Line4.png"
            alt="sign1"
            width={3}
            height={10}
            className="rotate180"
          />
          </div>
          
          <div className="imageContainer movedImage">
                      <Image
                        src="/images/sign1.png"
                        alt="sign1"
                        width={177}
                        height={177}
                      />
            </div>
        </div>
        <div className="rightPanel">
        <div className="relativeContainer">
          <div className="panelHeader">
            <h1 className = 'montserratStroke' >You are all set!</h1>
              <div className="imageContainer">
                      <Image
                        src="/images/sign1.png"
                        alt="sign1"
                        width={177}
                        height={177}
                        className="rotate180"
                      />
                  </div>
              </div>
            <h2 className = 'montserratSubheading' >Your setup is complete – your club is now ready to connect with the Penn community!</h2>
            
        </div>
        </div>  
    </div>
    );
}