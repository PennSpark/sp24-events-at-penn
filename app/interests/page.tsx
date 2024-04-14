'use client'
import Image from "next/image";
import React, {useEffect} from 'react';
import './Interest.css';
import Cookies from 'js-cookie';


type Tag = string;
type SelectedTags = Tag[];
const TAGS: Tag[] = ["Bakery 🥐", "Promotion 💵", "Boba 🧋", "Coffee Shop ☕️", "Restaurant 🥘", "Party 💃"];

export default function Interest() {
    const [selectedTags, setSelectedTags] = React.useState<SelectedTags>([]);


    useEffect(() => {
      const savedTags = Cookies.get('selectedTags');
      if (savedTags) {
        setSelectedTags(JSON.parse(savedTags));
        window.location.href = '/calendar';
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
      Cookies.set('selectedTags', tagsString, { expires: 7 }); // Expires in 7 days
      console.log('Selected tags saved:', selectedTags);

      window.location.href = '/calendar'; 
    };

    
    


    return (
    <div className="container">
        <div className="leftPanel">
        <div className = "center-content">
        <h1 className = 'montserratStroke' >Pick your tags!</h1>
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
          <button type="submit" className="save-continue-button" form="myForm" onClick={handleSubmit}>Save</button>
        </div>
        </div>
        <div>
        <Image
          src="/images/Line4.png"
          alt="sign1"
          width={3}
          height={10}
          className="rotate180"
        />
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