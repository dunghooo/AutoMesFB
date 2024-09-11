

document.addEventListener('DOMContentLoaded', function () {
    // Restore saved settings
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedPageId = localStorage.getItem('pageId');

    if (savedAccessToken) {
        document.getElementById('accessToken').value = savedAccessToken;
    }

    if (savedPageId) {
        document.getElementById('pageId').value = savedPageId;
    }

    // Handle tab navigation
    const tabLinks = document.querySelectorAll('.nav-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            tabLinks.forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            this.classList.add('active');
            const targetPane = document.querySelector(this.getAttribute('href'));
            targetPane.classList.add('show', 'active');
        });
    });

    // Event listeners for saving data
    document.getElementById('accessToken').addEventListener('change', function () {
        localStorage.setItem('accessToken', this.value);
    });

    document.getElementById('pageId').addEventListener('change', function () {
        localStorage.setItem('pageId', this.value);
    });

    document.querySelector('textarea').addEventListener('input', function () {
        const message = this.value;
        chrome.storage.local.set({ messageContent: message });
    });

    // Handle user list loading
    document.getElementById('loadUsers').addEventListener('click', function () {
        const userListElement = document.getElementById('userList');
        const accessToken = document.getElementById('accessToken').value;
        const pageId = document.getElementById('pageId').value;

        if (!accessToken || !pageId) {
            userListElement.innerHTML = "Vui lòng nhập Access Token và Page ID.";
            return;
        }

        userListElement.innerHTML = "Đang tải...";

        fetch(`https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`)
            .then(response => response.json())
            .then(data => {
                userListElement.innerHTML = '';

                // Create "Select All" checkbox
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

    // Handle send now action
    document.getElementById('sendNow').addEventListener('click', function (event) {
        event.preventDefault();

        const userListElement = document.getElementById('userList');
        const message = document.querySelector('textarea').value;
        const accessToken = document.getElementById('accessToken').value;
        const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');

        const userErrorElement = document.getElementById('userError');
        const messageErrorElement = document.getElementById('messageError');

        userErrorElement.style.display = 'none';
        messageErrorElement.style.display = 'none';

        let hasError = false;

        if (selectedUsers.length === 0) {
            userErrorElement.textContent = "Vui lòng chọn ít nhất một người dùng.";
            userErrorElement.style.display = 'block';
            hasError = true;
        }

        if (!message) {
            messageErrorElement.textContent = "Vui lòng nhập nội dung tin nhắn.";
            messageErrorElement.style.display = 'block';
            hasError = true;
        }

        if (hasError) {
            return;
        }

        userListElement.innerHTML = "Đang gửi tin nhắn...";
        completedRequests = 0;

        selectedUsers.forEach(checkbox => {
            const userId = checkbox.value;

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
                    tag: 'CONFIRMED_EVENT_UPDATE'
                })
            })
                .then(response => response.json())
                .then(sendResponse => {
                    if (sendResponse.error) {
                        const errorDiv = document.createElement('div');
                        errorDiv.textContent = `Lỗi khi gửi tin nhắn tới ${checkbox.parentElement.textContent.trim()}: ${sendResponse.error.message}`;
                        errorDiv.style.color = 'red';
                        userListElement.appendChild(errorDiv);
                    } else {
                        const userDiv = document.createElement('div');
                        userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
                        userListElement.appendChild(userDiv);
                    }
                    completedRequests++;
                    if (completedRequests === selectedUsers.length) {
                        userListElement.innerHTML += "<div>Hoàn thành việc gửi tin nhắn.</div>";
                        setTimeout(() => {
                            userListElement.innerHTML = '';
                        }, 5000);
                    }
                })
                .catch(error => {
                    userListElement.innerHTML += `<div>Có lỗi xảy ra: ${error.message}</div>`;
                    console.error('Error:', error);
                });
        });
    });
});



// document.getElementById('scheduleSend').addEventListener('click', function () {
//     const userListElement = document.getElementById('userList');
//     const message = document.querySelector('textarea').value;
//     const accessToken = document.getElementById('accessToken').value;
//     const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');
//     const scheduleTime = document.getElementById('scheduleTime').value; // Get the selected date and time

//     if (!accessToken) {
//         alert("Vui lòng nhập Access Token.");
//         return;
//     }

//     if (selectedUsers.length === 0) {
//         alert("Vui lòng chọn ít nhất một người dùng.");
//         return;
//     }

//     if (!message) {
//         alert("Vui lòng nhập nội dung tin nhắn.");
//         return;
//     }

//     if (!scheduleTime) {
//         alert("Vui lòng chọn ngày và giờ gửi.");
//         return;
//     }

//     // Calculate the delay in milliseconds from the current time to the scheduled time
//     const now = new Date();
//     const sendTime = new Date(scheduleTime);
//     const delay = sendTime.getTime() - now.getTime();

//     if (delay < 0) {
//         alert("Thời gian gửi phải lớn hơn thời gian hiện tại.");
//         return;
//     }
//     userListElement.innerHTML = `Tin nhắn sẽ được gửi vào ${sendTime.toLocaleString()}...`;

//     setTimeout(() => {
//         userListElement.innerHTML = "Đang gửi tin nhắn...";
//         completedRequests = 0;
//         selectedUsers.forEach(checkbox => {
//             const userId = checkbox.value;

//             fetch(`https://graph.facebook.com/v20.0/me/messages?access_token=${accessToken}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     recipient: {
//                         id: userId
//                     },
//                     message: {
//                         text: message
//                     },
//                     tag: 'CONFIRMED_EVENT_UPDATE'
//                 })
//             })
//                 .then(response => response.json())
//                 .then(sendResponse => {
//                     if (sendResponse.error) {
//                         console.error(`Error sending message to ${userId}:`, sendResponse.error.message);
//                     } else {
//                         const userDiv = document.createElement('div');
//                         userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
//                         userListElement.appendChild(userDiv);
//                         completedRequests++;
//                         setTimeout(() => {
//                             document.querySelector('textarea').value = ''; // Xóa nội dung sau 2 giây
//                         }, 2000);
//                         // Sau khi hoàn thành, đợi 2 giây rồi load lại danh sách người dùng
//                         setTimeout(() => {
//                             document.getElementById('loadUsers').click(); // Gọi lại hàm tải danh sách người dùng
//                         }, 2000);
//                     }
//                 })
//                 .catch(error => {
//                     console.error(`Có lỗi xảy ra khi gửi tin nhắn đến ${userId}:`, error);
//                     completedRequests++;
//                     if (completedRequests === selectedUsers.length) {
//                         // Gọi lại hàm tải danh sách người dùng sau khi tất cả tin nhắn đã được gửi
//                         document.getElementById('loadUsers').click();
//                     }
//                 });
//         });
//     }, delay);
// });

document.getElementById('loadUsers').addEventListener('click', function () {
    const userListElement = document.getElementById('userList');
    const accessToken = document.getElementById('accessToken').value;
    const pageId = document.getElementById('pageId').value;

    if (!accessToken || !pageId) {
        userListElement.innerHTML = "Vui lòng nhập Access Token và Page ID.";
        return;
    }

    userListElement.innerHTML = "Đang tải...";
    let nextPageUrl = `https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`;

    function loadConversations(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const conversations = data.data;

                if (conversations.length === 0) {
                    userListElement.innerHTML += "<p>Đã tải xong tất cả người dùng.</p>";
                    return;
                }

                // Create "Select All" checkbox if not created already
                if (!document.getElementById('selectAll')) {
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
                }

                conversations.forEach(conversation => {
                    const userId = conversation.id;
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

                // Check if there's a next page
                if (data.paging && data.paging.next) {
                    loadConversations(data.paging.next);
                } else {
                    userListElement.innerHTML += "<p>Đã tải xong tất cả người dùng.</p>";
                }
            })
            .catch(error => {
                userListElement.innerHTML = "Có lỗi xảy ra khi tải danh sách.";
                console.error('Error:', error);
            });
    }

    loadConversations(nextPageUrl);
});




document.addEventListener('DOMContentLoaded', function () {
    // Khôi phục tab đã lưu
    chrome.storage.local.get('activeTab', function (data) {
        if (data.activeTab) {
            document.querySelector(`a[href="${data.activeTab}"]`).classList.add('active');
            document.querySelector(data.activeTab).classList.add('show', 'active');
        }
    });

    // Khôi phục nội dung tin nhắn đã lưu
    chrome.storage.local.get('messageContent', function (data) {
        if (data.messageContent) {
            document.querySelector('textarea').value = data.messageContent;
        }
    });

    // Khôi phục danh sách người dùng đã chọn
    chrome.storage.local.get('selectedUsers', function (data) {
        if (data.selectedUsers) {
            data.selectedUsers.forEach(userId => {
                const checkbox = document.querySelector(`.user-checkbox[value="${userId}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    });
});




