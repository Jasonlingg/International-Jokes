import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Translate from './Translate'; // Import the Translate component
import './App.css';
import toast, { Toaster } from 'react-hot-toast';


/**
 * JokesContent Component
 * A component to display jokes and allow translation of jokes to different languages.
 */
function JokesContent() {
  const [title, setTitle] = useState('');
  const titleText = "Joke Generator";
  const typingSpeed = 100;
  const [translatedJoke, setTranslatedJoke] = useState('');
  const [joke, setJoke] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const categories = ['Any', 'Misc', 'Programming', 'Dark', 'Pun'];

  // Callback function to handle the translated joke from the Translate component
  const handleTranslatedJoke = (translatedJoke) => {
    setTranslatedJoke(translatedJoke);
  };

  // Simulate typing effect on the title using useEffect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= titleText.length) {
        setTitle(titleText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  // Function to fetch jokes from the API based on the selected category
  const fetchJokes = async (selectedCategory) => {
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${selectedCategory}?type=single`);
      return response.data.joke;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };



  // Event handler for changing the selected category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to fetch a new joke and update the state
  const fetchNewJoke = async () => {
    const newJoke = await fetchJokes(selectedCategory);
    if (newJoke) {
      setJoke(newJoke);
      // Trigger translation for the new joke
      setTranslatedJoke('');
    }
  };
  
  return (
    <div className="jokes-background">
      <div className="jokes-container">
        {/* Emoji representing laughter */}
        <div className='laugh'>&#128514;</div>
        {/* Display the title with the typing effect */}
        <h1 className="jokes-title">{title}</h1>
        <div className="dropdowns-container">
          {/* Dropdown to select the joke category */}
          <div className="dropdown-label">Select Category:</div>
          <select className="jokes-select" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* Translation dropdown component */}
          <div className="dropdown-label">Select Language:</div>
          <Translate joke={joke} onTranslatedJoke={handleTranslatedJoke} />
        </div>
        <div>
          {/* Button to fetch a new joke */}
          <button className="jokes-button" onClick={fetchNewJoke}>Generate Joke</button>
        </div>
        {/* Display the translated joke, if available */}
        {translatedJoke && <p className="jokes-content">{translatedJoke}</p>}
      </div>
    </div>
  );
}

export default JokesContent;
