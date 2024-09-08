import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/quotes');
        setQuotes(response.data.quotes);
        if (response.data.quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.data.quotes.length);
          setQuote(response.data.quotes[randomIndex].quote);
          setAuthor(response.data.quotes[randomIndex].author);
        }
      } catch (error) {
        setError('Error fetching quotes.');
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  const getRandomQuote = () => {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].quote);
    setAuthor(quotes[randomIndex].author);
  };

  return (
    <div className="quote-container">
      <h1>"Daily Dose of Reflection"</h1>
      {error && <p>{error}</p>}
      {!error && (
        <blockquote className='blockquote'>
          <p>{quote}</p>
          <footer>- {author}</footer>
        </blockquote>
      )}
      <button className='btn' onClick={getRandomQuote}>
        Get Another Quote
      </button>
    </div>
  );
};

export default QuoteGenerator;
