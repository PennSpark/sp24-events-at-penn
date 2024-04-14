'use client'
import Image from "next/image";
import React from 'react';
import './Interest.css';

type Tag = string;
type SelectedTags = Tag[];
const TAGS: Tag[] = ["Bakery 🥐", "Promotion 💵", "Boba 🧋", "Coffee Shop ", "Restaurant"];

export default function Interest() {
    const [selectedTags, setSelectedTags] = React.useState<SelectedTags>([]);

    const handleBack = () => {
        console.log('Back button clicked');
      }
    
      const handleTagClick = (tag: Tag) => {
        setSelectedTags(prevSelectedTags => {
          if (prevSelectedTags.includes(tag)) {
            // If tag is already selected, remove it
            return prevSelectedTags.filter(t => t !== tag);
          } else {
            // If not, add the tag if less than three are selected
            return prevSelectedTags.length < 3 ? [...prevSelectedTags, tag] : prevSelectedTags;
          }
        });
      };

    return (
    <div className="container">
        <div className="leftPanel">
        <div className = "center-content">
        <h1 className = 'montserratStroke' >Pick you tags!</h1>
        <p >Select the event types you are interested in to get more accurate recommendations of events!</p>
        <div className="tag-container">
            {TAGS.map((tag: Tag) => (
              <button
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
          <div className="form-buttons">
          <button type="submit" className="save-continue-button" form="myForm">Save</button>
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
            <div className="imageContainer movedImage">
                      <Image
                        src="/images/sign1.png"
                        alt="sign1"
                        width={177}
                        height={177}
                      />
            </div>
        </div>
        </div>  
    </div>
    );
}