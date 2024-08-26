import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FacebookConversations() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('https://graph.facebook.com/v20.0/100968906157267/conversations', {
          params: {
            access_token: 'EAAL8mAaHd8oBOygMeriK2McgrEWcYL2rTO5MLQTWdS1he3pyZCbT4dcKzwvVPsqoXR8vyWkXXjqZAhV3DXfF2mZAHGyoDelV8cN0jZCMmvOc3u4t6tymAVSGriwJXH33B6x2kG6ul9iDZAT7xjeoLxZAjRRkUBjhDCwuGCT1x5eH4Cm0o7tAcD18QZCeqkZA2QJqMEhqi93lGHeeGOMozCliuyzfjOnlWDhdIuI1atxubwZDZD',
          },
        });
        setConversations(response.data.data);
      } catch (error) {
        setError(error.response ? error.response.data.error.message : error.message);
        console.error('Error fetching conversations:', error.response ? error.response.data : error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
      <h1>Facebook Conversations</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {conversations.map(conversation => (
            <li key={conversation.id}>Conversation ID: {conversation.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FacebookConversations;
