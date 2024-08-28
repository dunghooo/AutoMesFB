import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FacebookConversations() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState([]);
  const [success, setSuccess] = useState([]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const accessToken = 'EAARTW9C9r7UBOykGuRZBaz9DmrczwqZCZBihbOaJHsSrfxbwjBDQQDo5jZAfTlXajQ43RN9pa98koXpqRe8HJn69nsc9KoW3tNNcnCn397kZARZBMPNExPfApKoxhCz0XOTI81M2NdVuliAAUiF5ZA0QlCWjeb63DZAm9HYzsor5XXWILTZAAPk1pNgDVQpm6FunQ'; // Thay thế với Access Token thực của bạn
        const pageId = '389312490936052'; // ID của trang Facebook
        const response = await axios.get(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`);
        const conversations = response.data.data;
        console.log(conversations);
        
        
  
        // Fetch senders for each conversation
        for (const conversation of conversations) {
          try {
            const userId = conversation.id;
            console.log(`Fetching senders for conversation ID: ${userId}`);
            
            const responsea = await axios.get(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`);
            console.log(responsea.data);
            conversation.senders = responsea.data.senders;
          } catch (err) {
            console.error(`Error fetching senders for conversation ID ${conversation.id}:`, err.response ? err.response.data : err);
          }
        }
        setConversations(conversations);
        // const conversations = response.data.data;
        // const userId = conversations.id;
        // const responsea = await axios.get(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`);
        // setConversations(responsea.data.data);

      } catch (error) {
        setError(error.response ? error.response.data.error.message : error.message);
        console.error('Error fetching conversations:', error.response ? error.response.data : error);
      }
    };

    fetchConversations();
  }, []);
  const handleSendMessage = async () => {
    try {

      const accessToken = 'EAARTW9C9r7UBOykGuRZBaz9DmrczwqZCZBihbOaJHsSrfxbwjBDQQDo5jZAfTlXajQ43RN9pa98koXpqRe8HJn69nsc9KoW3tNNcnCn397kZARZBMPNExPfApKoxhCz0XOTI81M2NdVuliAAUiF5ZA0QlCWjeb63DZAm9HYzsor5XXWILTZAAPk1pNgDVQpm6FunQ'; // Thay thế với Access Token thực của bạn
      const pageId = '389312490936052'; // ID của trang Facebook
      const responsea = await axios.get(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`);
      const conversations = responsea.data.data;
      console.log(conversations);
      // const response = await axios.post(`https://graph.facebook.com/v20.0/me/messages?access_token=${pageAccessToken}`, {
      //   recipient: { id: recipientId },
      //   message: { text: message },
      //   messaging_type: "UPDATE", // Hoặc RESPONSE nếu bạn gửi tin nhắn trong khoảng thời gian 24 giờ
      // });
      for (const conversation of conversations) {
        try {
          const userId = conversation.id;
          console.log(`Fetching senders for conversation ID: ${userId}`);
          
          const responseb = await axios.get(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`);
          // console.log(responsea.data);
          conversation.senders = responseb.data.senders;
          console.log("Hi 22 "+ responseb.data.senders )
        } catch (err) {
          console.error(`Error fetching senders for conversation ID ${conversation.id}:`, err.response ? err.response.data : err);
        }
      }
      const response = conversations.flatMap(conversation => 
        console.log("Hi"+ conversation.senders )
      );
      console.log('Chao: '+ response.data);
      setSuccess('Message sent successfully!');
      setError(null);
      console.log('Message sent successfully:', response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error.message : error.message);
      setSuccess('');
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  };
//   const handleSendMessage = async () => {
//     try {
//       const pageAccessToken = 'EAARTW9C9r7UBOykGuRZBaz9DmrczwqZCZBihbOaJHsSrfxbwjBDQQDo5jZAfTlXajQ43RN9pa98koXpqRe8HJn69nsc9KoW3tNNcnCn397kZARZBMPNExPfApKoxhCz0XOTI81M2NdVuliAAUiF5ZA0QlCWjeb63DZAm9HYzsor5XXWILTZAAPk1pNgDVQpm6FunQ'; // Thay thế với Access Token thực của bạn
//       const pageId = '389312490936052';

//       const response = await axios.get(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${pageAccessToken}`);
//       const conversations = response.data.data;

//       // Lọc người gửi dựa trên thời gian

//       for (const conversation of conversations) {
//         try {
//           const userId = conversation.id;
//           const responsea = await axios.get(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${pageAccessToken}`);
//           conversation.senders = responsea.data.senders;
//         } catch (err) {
//           console.error(`Error fetching senders for conversation ID ${conversation.id}:`, err.response ? err.response.data : err);
//         }
//       }
// console.log('Vhao: ' + conversations);
//       // Gửi tin nhắn đến các người gửi đã lọc
//       const sendMessagePromises = conversations.map(sender =>
//         axios.post(`https://graph.facebook.com/v20.0/${pageId}/messages?access_token=${pageAccessToken}`, {
//           recipient: { id: sender.id },
//           message: { text: message },
//           messaging_type: "UPDATE",
//         })
//       );

//       await Promise.all(sendMessagePromises);
//       setSuccess('Messages sent successfully!');
//       setError(null);
//       console.log('Message sent successfully');
//     } catch (error) {
//       setError(error.response ? error.response.data.error.message : error.message);
//       setSuccess('');
//       console.error('Error sending message:', error.response ? error.response.data : error.message);
//     }
//   };
  return (
    <div>
  <h1>Facebook Conversations</h1>
  {success && <p>{success}</p>}
  {error ? (
    <p>Error: {error}</p>
  ) : (
    <>
     <div>
   
    <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your message here"
            />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    <ul>
      {conversations.map(conversation => (
        <li key={conversation.id}>
          <p>Conversation ID: {conversation.id}</p>
          <p>Name: {conversation.name ? conversation.name : 'No name available'}</p>
          {/* Nếu có senders, hiển thị danh sách senders */}
          {conversation.senders && conversation.senders.data && (
            <ul>
              {conversation.senders.data.map(sender => (
                <li key={sender.id}>{sender.name}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
   
    </>
  )}
</div>

  );
}

export default FacebookConversations;
