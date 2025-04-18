'use client';
import React, { useState } from 'react';

const CardTest: React.FC = () => {
    const [response, setResponse] = useState(null);

    const createCard = async () => {
        const cardData = {
            user: '12345',
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

    return (
        <div>
            <button onClick={createCard}>Create Card</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default CardTest;