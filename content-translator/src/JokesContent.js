import React, { useState, useEffect } from 'react';
import axios from 'axios';
function JokesContent(){
    const fetchJokes = async () => {
        try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
        return response.data.joke;
        } catch (error) {
        console.error('Error fetching jokes:', error);
        return null;
        }
    };

    const [joke, setJoke] = useState('');

    useEffect(() => {
      // Fetch jokes when the component mounts
      fetchNewJoke();
    }, []);
  
    const fetchNewJoke = async () => {
      const newJoke = await fetchJokes();
      if (newJoke) {
        setJoke(newJoke);
      }
    };
  
    return (
      <div>
        <h2>Joke of the Day</h2>
        <p>{joke}</p>
        <button onClick={fetchNewJoke}>Get Another Joke</button>
      </div>
    );
}
export default JokesContent;
