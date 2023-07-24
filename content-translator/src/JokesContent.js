import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JokesContent(){
    const fetchJokes = async () => { // try catch block
        try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${selectedCategory}?type=single`);
        return response.data.joke;
        } catch (error) {
        console.error('Error:', error);
        return null;
        }
    };

    const [joke, setJoke] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Any'); // Default category: 'Any'

    const categories = ['Any', 'Misc', 'Programming', 'Dark', 'Pun'];
  
    useEffect(() => {
      // Fetch jokes when the component mounts
      fetchNewJoke();
    }, []); // only runs once when component mounts


    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
    const fetchNewJoke = async () => {
      const newJoke = await fetchJokes();
      if (newJoke) {
        setJoke(newJoke);
      }
    };
  
return (
    <div>
      <h2>Joke of the Day</h2>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button onClick={fetchNewJoke}>GET JOKE LOL</button>
      <p>{joke}</p>
    </div>
  );
}
export default JokesContent;
