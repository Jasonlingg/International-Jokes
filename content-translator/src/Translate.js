import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Translate Component
 * A component to handle language translation using the libretranslate.de API.
 * @param {string} joke - The joke text to be translated.
 * @param {function} onTranslatedJoke - Callback function to receive the translated joke.
 */
export default function Translate({ joke, onTranslatedJoke }) {
  const [selectedLanguageKey, setLanguageKey] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [translatedJoke, setTranslatedJoke] = useState('');

  // Fetch the list of supported languages from the libretranslate.de API.
  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`)
      .then((response) => {
        setLanguagesList(response.data);
      })
      .catch((error) => {
        console.error('Language List Fetch Error:', error);
      });
  }, []);

  // Trigger translation whenever the selected language or joke changes.
  useEffect(() => {
    if (selectedLanguageKey && joke) {
      translateText();
    }
  }, [selectedLanguageKey, joke]);

  /**
   * Handle language selection.
   * @param {Object} selectedLanguage - The selected language object from the dropdown.
   */
  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  /**
   * Translate the joke text to the selected language.
   * Only make the translation API call if a valid language is selected.
   */
  const translateText = () => {
    if (selectedLanguageKey) {
      let data = {
        q: `${joke}`,
        source: 'en',
        target: selectedLanguageKey,
      };

      axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
          setTranslatedJoke(response.data.translatedText);
          onTranslatedJoke(response.data.translatedText);
        })
        .catch((error) => {
          console.error('Translation Error:', error);
        });
    }
  };

  return (
    <div>
      {/* Dropdown for selecting the language */}
      <select className="language-select" onChange={languageKey}>
        <option>Please Select Language..</option>
        {languagesList.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}