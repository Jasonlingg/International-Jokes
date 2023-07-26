import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function JokesContent() {
  const [title, setTitle] = useState('');
  const titleText = "Joke Generator"; // The text you want to show with typing effect
  const typingSpeed = 100; // Speed of typing in milliseconds

  useEffect(() => {
    // Simulate typing effect on the title
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
  const fetchJokes = async (selectedCategory) => {
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${selectedCategory}?type=single`);
      return response.data.joke;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const [joke, setJoke] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Any');

  const categories = ['Any', 'Misc', 'Programming', 'Dark', 'Pun'];

  useEffect(() => {
    fetchNewJoke();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const fetchNewJoke = async () => {
    const newJoke = await fetchJokes(selectedCategory);
    if (newJoke) {
      setJoke(newJoke);
    }
  };


  return (
    <div className="jokes-background">
      <div className="jokes-container">
      <div className='laugh'>&#128514;</div>
        <h1 className="jokes-title">{title}<span className="cursor"></span></h1>
        <div>
          <p>Select</p>
        <select className="jokes-select" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        </div>

        <div>
          <button className="jokes-button" onClick={fetchNewJoke}>Generate Joke</button>
        </div>
        <p className="jokes-content">{joke}</p>
      </div>
    </div>
  );
}

export default JokesContent;