'use client';
import React, { useState } from 'react';

const CardTest: React.FC = () => {
    const [response, setResponse] = useState(null);

    /**
     * Example function to create a card
     */
    const createCard = async () => {
        const cardData = {
            user: 'testUser',
            font: 1,
            shape: 2,
            p_color: '#FF5733',
            s_color: '#33FF57',
            a_color: '#3357FF',
        };

        try {
            const res = await fetch('/api/createCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
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
                    'Content-Type': 'application/json',
                },
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
    const cardID = "6802f0438946092dae7be8a9";
    const getCardbyID = async () => {
        try {
            console.log('Fetching card with ID:', cardID);
            const res = await fetch(`/api/get/Card?id=${cardID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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
    const userID = "12345";
    const getCardbyUser = async () => {
        try {
            console.log('Fetching card with user ID:', userID);
            const res = await fetch(`/api/get/userCards?user=${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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
        const cardID = "6802ff9a996fd091eeb48e11";
        try {
            const res = await fetch(`/api/removeCards?id=${cardID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error removing card:', error);
        }
    };

    const updateCard = async () => {
        const cardID = '6802fb87996fd091eeb48e09'
        const updateData = {
            id: '6802fb87996fd091eeb48e09',
            font: 69,
            shape: 420,
            p_color: '#color1',
            s_color: 'lawl',
            a_color: 'hehe haha'
        }
        try{
            const res = await fetch(`/api/updateCard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            const data = await res.json();
            setResponse(data);
        }
        catch(error) {
            console.error('Error removing card:', error);
        }
    };

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'auto', border: '1px solid gray', padding: '10px' }}>
            <button onClick={createCard} style={{ border: '2px solid blue' }}>Create Card</button>
            <button onClick={getAllCards} style={{ border: '2px solid blue' }}>Get All Cards</button>
            <button onClick={getCardbyID} style={{ border: '2px solid blue' }}>Get Card by ID</button>
            <button onClick={getCardbyUser} style={{ border: '2px solid blue' }}>Get Card by User</button>
            <button onClick={removeCard} style={{ border: '2px solid blue' }}>Remove Card</button>
            <button onClick={updateCard} style={{ border: '2px solid blue' }}>Update Card</button>
            {response && <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default CardTest;