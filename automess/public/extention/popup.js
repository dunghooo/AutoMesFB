document.getElementById('loadUsers').addEventListener('click', function () {
    const userListElement = document.getElementById('userList');
    const accessToken = document.getElementById('accessToken').value; // Lấy access token từ trường nhập liệu
    const pageId = document.getElementById('pageId').value; // Lấy page ID từ trường nhập liệu

    if (!accessToken || !pageId) {
        userListElement.innerHTML = "Vui lòng nhập Access Token và Page ID.";
        return;
    }

    userListElement.innerHTML = "Đang tải...";

    fetch(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            userListElement.innerHTML = '';

            // Tạo checkbox "Chọn tất cả"
            const selectAllDiv = document.createElement('div');
            const selectAllCheckbox = document.createElement('input');
            selectAllCheckbox.type = 'checkbox';
            selectAllCheckbox.id = 'selectAll';
            selectAllDiv.appendChild(selectAllCheckbox);
            selectAllDiv.appendChild(document.createTextNode(' Chọn tất cả'));
            userListElement.appendChild(selectAllDiv);

            selectAllCheckbox.addEventListener('change', function () {
                const allCheckboxes = document.querySelectorAll('.user-checkbox');
                allCheckboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });

            const conversations = data.data;
            conversations.forEach(conversation => {
                const userId = conversation.id;
                // Fetch user's name or other details
                fetch(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`)
                    .then(response => response.json())
                    .then(userData => {
                        const userName = userData.senders.data[0].name; // Assuming the first sender is the user
                        const userDiv = document.createElement('div');
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = userData.senders.data[0].id; // Store user ID in checkbox value
                        checkbox.classList.add('user-checkbox'); // Add class for easier selection
                        userDiv.appendChild(checkbox);
                        userDiv.appendChild(document.createTextNode(` ${userName}`));
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
    const userListElement = document.getElementById('userList');
    const message = document.querySelector('textarea').value; // Lấy nội dung tin nhắn từ textarea
    const accessToken = document.getElementById('accessToken').value; // Lấy access token từ trường nhập liệu
    const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');

    if (!accessToken) {
        userListElement.innerHTML = "Vui lòng nhập Access Token.";
        return;
    }

    if (selectedUsers.length === 0) {
        userListElement.innerHTML = "Vui lòng chọn ít nhất một người dùng.";
        return;
    }

    if (!message) {
        userListElement.innerHTML = "Vui lòng nhập nội dung tin nhắn.";
        return;
    }

    userListElement.innerHTML = "Đang gửi tin nhắn...";

    selectedUsers.forEach(checkbox => {
        const userId = checkbox.value; // Lấy userId từ checkbox value

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
                    console.error(`Error sending message to ${userId}:`, sendResponse.error.message);
                } else {
                    const userDiv = document.createElement('div');
                    userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
                    userListElement.appendChild(userDiv);
                }
            })
            .catch(error => {
                console.error(`Có lỗi xảy ra khi gửi tin nhắn đến ${userId}:`, error);
            });
    });
});

document.getElementById('scheduleSend').addEventListener('click', function () {
    const userListElement = document.getElementById('userList');
    const message = document.querySelector('textarea').value; // Lấy nội dung tin nhắn từ textarea
    const accessToken = document.getElementById('accessToken').value; // Lấy access token từ trường nhập liệu
    const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');
    const timeSelect = document.getElementById('timeSelect').value; // Lấy thời gian đã chọn từ dropdown

    if (!accessToken) {
        userListElement.innerHTML = "Vui lòng nhập Access Token.";
        return;
    }

    if (selectedUsers.length === 0) {
        userListElement.innerHTML = "Vui lòng chọn ít nhất một người dùng.";
        return;
    }

    if (!message) {
        userListElement.innerHTML = "Vui lòng nhập nội dung tin nhắn.";
        return;
    }

    if (!timeSelect) {
        userListElement.innerHTML = "Vui lòng chọn thời gian gửi.";
        return;
    }

    let delay;

    // Xử lý thời gian đã chọn và chuyển đổi thành milliseconds
    if (timeSelect.endsWith('h')) {
        // Nếu giá trị kết thúc bằng 'h', nó là giờ
        const hours = parseInt(timeSelect); // Lấy số giờ
        delay = hours * 60 * 60 * 1000; // Chuyển đổi giờ thành milliseconds
    } else if (timeSelect.endsWith('d')) {
        // Nếu giá trị kết thúc bằng 'd', nó là ngày
        const days = parseInt(timeSelect); // Lấy số ngày
        delay = days * 24 * 60 * 60 * 1000; // Chuyển đổi ngày thành milliseconds
    } else {
        // Nếu không phải giờ hoặc ngày, giả sử là phút
        const minutes = parseInt(timeSelect); // Lấy số phút
        delay = minutes * 60 * 1000; // Chuyển đổi phút thành milliseconds
    }

    userListElement.innerHTML = `Tin nhắn sẽ được gửi sau ${delay / 60000} phút...`;

    setTimeout(() => {
        userListElement.innerHTML = "Đang gửi tin nhắn...";

        selectedUsers.forEach(checkbox => {
            const userId = checkbox.value; // Lấy userId từ checkbox value

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
                        console.error(`Error sending message to ${userId}:`, sendResponse.error.message);
                    } else {
                        const userDiv = document.createElement('div');
                        userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
                        userListElement.appendChild(userDiv);
                    }
                })
                .catch(error => {
                    console.error(`Có lỗi xảy ra khi gửi tin nhắn đến ${userId}:`, error);
                });
        });
    }, delay);
});

