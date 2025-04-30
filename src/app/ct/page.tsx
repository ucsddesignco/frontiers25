'use client';
import React, { useState } from 'react';

/**Example Card Function Calls - And What I used for testing */
const CardTest: React.FC = () => {
  const [response, setResponse] = useState(null);

  /**
   * Example function to create a card
   */
  const createCard = async () => {
    const cardData = {
      user: 'testUser',
      author: 'testAuthor',
      fontFamily: 'Jaro',
      borderStyle: 'rectangular',
      primary: '#FF5733',
      accent: '#3357FF'
    };
    console.log('Creating card with data:', cardData);
    try {
      const res = await fetch('/api/createCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  /**
   * Example function to get all cards
   */
  const getAllCards = async () => {
    try {
      const res = await fetch('/api/get/allCards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', res.status);
      const text = await res.text();
      console.log('Raw response:', text);

      if (res.ok) {
        setResponse(JSON.parse(text));
      } else {
        console.log('Error fetching cards:', text);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  /**
   * Example function to get a card by ID
   */
  const cardID = '6804037a8c43a4b9bfece959';
  const getCardbyID = async () => {
    try {
      console.log('Fetching card with ID:', cardID);
      const res = await fetch(`/api/get/Card?id=${cardID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching card by ID:', error);
    }
  };

  /**
   * Example function to get a card by user
   */
  const userID = '12345';
  const getCardbyUser = async () => {
    try {
      console.log('Fetching card with user ID:', userID);
      const res = await fetch(`/api/get/userCards?user=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching card by user:', error);
    }
  };

  /**
   * Example function to remove a card by ID
   */
  const removeCard = async () => {
    const cardID = '680184548988e06ab330d23e';
    try {
      const res = await fetch(`/api/removeCards?id=${cardID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error removing card:', error);
    }
  };

  const updateCard = async () => {
    const updateData = {
      id: '6802f0438946092dae7be8a9',
      fontFamily: 'Aventena',
      borderStyle: 'beveled',
      primary: '#6999FF',
      accent: '#FF4200'
    };
    try {
      const res = await fetch(`/api/updateCard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error removing card:', error);
    }
  };

  return (
    <div
      style={{ maxHeight: '100vh', overflowY: 'auto', border: '1px solid gray', padding: '10px' }}
    >
      <button onClick={createCard} style={{ border: '2px solid blue' }}>
        Create Card
      </button>
      <button onClick={getAllCards} style={{ border: '2px solid blue' }}>
        Get All Cards
      </button>
      <button onClick={getCardbyID} style={{ border: '2px solid blue' }}>
        Get Card by ID
      </button>
      <button onClick={getCardbyUser} style={{ border: '2px solid blue' }}>
        Get Card by User
      </button>
      <button onClick={removeCard} style={{ border: '2px solid blue' }}>
        Remove Card
      </button>
      <button onClick={updateCard} style={{ border: '2px solid blue' }}>
        Update Card
      </button>
      {response && (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default CardTest;
