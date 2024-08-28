

document.getElementById('loadUsers').addEventListener('click', function () {
    const accessToken = 'EAARTW9C9r7UBOykGuRZBaz9DmrczwqZCZBihbOaJHsSrfxbwjBDQQDo5jZAfTlXajQ43RN9pa98koXpqRe8HJn69nsc9KoW3tNNcnCn397kZARZBMPNExPfApKoxhCz0XOTI81M2NdVuliAAUiF5ZA0QlCWjeb63DZAm9HYzsor5XXWILTZAAPk1pNgDVQpm6FunQ'; // Thay thế với Access Token thực của bạn
    const pageId = '389312490936052'; // ID của trang Facebook
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = "Đang tải...";

    fetch(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            userListElement.innerHTML = '';
            const conversations = data.data;
            conversations.forEach(conversation => {
                const userId = conversation.id;
                // Fetch user's name or other details
                fetch(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`)
                    .then(response => response.json())
                    .then(userData => {
                        const userName = userData.senders.data[0].name; // Assuming the first sender is the user
                        const userDiv = document.createElement('div');
                        userDiv.textContent = userName;
                        userListElement.appendChild(userDiv);
                    });
            });
        })
        .catch(error => {
            userListElement.innerHTML = "Có lỗi xảy ra khi tải danh sách.";
            console.error('Error:', error);
        });
});

document.getElementById('sendNow').addEventListener('click', function () {
    const accessToken = 'EAARTW9C9r7UBOykGuRZBaz9DmrczwqZCZBihbOaJHsSrfxbwjBDQQDo5jZAfTlXajQ43RN9pa98koXpqRe8HJn69nsc9KoW3tNNcnCn397kZARZBMPNExPfApKoxhCz0XOTI81M2NdVuliAAUiF5ZA0QlCWjeb63DZAm9HYzsor5XXWILTZAAPk1pNgDVQpm6FunQ'; // Thay thế với Access Token thực của bạn
    const pageId = '389312490936052'; // ID của trang Facebook
    const userListElement = document.getElementById('userList');
    const message = document.querySelector('textarea').value; // Lấy nội dung tin nhắn từ textarea

    userListElement.innerHTML = "Đang gửi tin nhắn...";

    fetch(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            userListElement.innerHTML = '';
            const conversations = data.data;
            conversations.forEach(conversation => {
                const userId = conversation.id;
                // Fetch user's name or other details
                fetch(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`)
                    .then(response => response.json())
                    .then(userData => {
                        const userId = userData.senders.data[0].id; // ID của người dùng để gửi tin nhắn
                        const userName = userData.senders.data[0].name; // Assuming the first sender is the user
                        const userDiv = document.createElement('div');
                        userDiv.textContent = `Đã gửi tin nhắn cho ${userName}`;
                        userListElement.appendChild(userDiv);

                        // Gửi tin nhắn đến từng người dùng
                        fetch(`https://graph.facebook.com/v20.0/me/messages?access_token=${accessToken}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                recipient: {
                                    id: userId
                                },
                                message: {
                                    text: message
                                },
                                tag: 'CONFIRMED_EVENT_UPDATE' // Sử dụng thẻ phù hợp với trường hợp của bạn
                            })
                        })
                            .then(response => response.json())
                            .then(sendResponse => {
                                if (sendResponse.error) {
                                    console.error(`Error sending message to ${userName}:`, sendResponse.error);
                                } else {
                                    console.log(`Message sent to ${userName}`);
                                }
                            });
                    });
            });
        })
        .catch(error => {
            userListElement.innerHTML = "Có lỗi xảy ra khi gửi tin nhắn.";
            console.error('Error:', error);
        });
});








