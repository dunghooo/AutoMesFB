
document.addEventListener('DOMContentLoaded', function () {
    // Tải dữ liệu từ localStorage và điền vào các trường input
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedPageId = localStorage.getItem('pageId');

    if (savedAccessToken) {
        document.getElementById('accessToken').value = savedAccessToken;
    }

    if (savedPageId) {
        document.getElementById('pageId').value = savedPageId;
    }

    // Xử lý tab navigation
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
});

document.getElementById('accessToken').addEventListener('change', function () {
    localStorage.setItem('accessToken', this.value);
});

document.getElementById('pageId').addEventListener('change', function () {
    localStorage.setItem('pageId', this.value);
});
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


document.getElementById('scheduleTime').value = getCurrentDateTime();

document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.nav-link');

    tabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Xóa lớp 'active' khỏi tất cả các liên kết và tab panes
            tabLinks.forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));

            // Thêm lớp 'active' vào liên kết và tab pane hiện tại
            this.classList.add('active');
            const targetPane = document.querySelector(this.getAttribute('href'));
            targetPane.classList.add('show', 'active');
        });
    });
});

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
let completedRequests = 0;

document.getElementById('sendNow').addEventListener('click', function (event) {
    event.preventDefault(); // Ngăn chặn việc reload trang

    const userListElement = document.getElementById('userList');
    const message = document.querySelector('textarea').value;
    const accessToken = document.getElementById('accessToken').value;
    const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');

    // Lấy các thẻ p để hiển thị lỗi
    const userErrorElement = document.getElementById('userError');
    const messageErrorElement = document.getElementById('messageError');

    // Reset lại thông báo lỗi
    userErrorElement.style.display = 'none';
    messageErrorElement.style.display = 'none';

    // Kiểm tra lỗi
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

    // Nếu có lỗi thì không tiếp tục thực hiện
    if (hasError) {
        return;
    }

    // Chỉ cập nhật giao diện khi đã vượt qua kiểm tra lỗi
    userListElement.innerHTML = "Đang gửi tin nhắn...";
    completedRequests = 0; // Reset biến completedRequests

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

                    // Sau khi hoàn thành, đợi 2 giây rồi load lại danh sách người dùng
                    setTimeout(() => {
                        document.getElementById('loadUsers').click(); // Gọi lại hàm tải danh sách người dùng
                    }, 2000);
                }
            })
            .catch(error => {
                const errorDiv = document.createElement('div');
                errorDiv.textContent = `Có lỗi xảy ra khi gửi tin nhắn tới ${checkbox.parentElement.textContent.trim()}: ${error.message}`;
                errorDiv.style.color = 'red';
                userListElement.appendChild(errorDiv);
                completedRequests++;
                if (completedRequests === selectedUsers.length) {
                    userListElement.innerHTML += "<div>Hoàn thành việc gửi tin nhắn với một số lỗi.</div>";

                    // Sau khi hoàn thành, đợi 2 giây rồi load lại danh sách người dùng
                    setTimeout(() => {
                        document.getElementById('loadUsers').click(); // Gọi lại hàm tải danh sách người dùng
                    }, 2000);
                }
            });
    });
});




document.getElementById('scheduleSend').addEventListener('click', function () {
    const userListElement = document.getElementById('userList');
    const message = document.querySelector('textarea').value;
    const accessToken = document.getElementById('accessToken').value;
    const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');
    const scheduleTime = document.getElementById('scheduleTime').value; // Get the selected date and time

    if (!accessToken) {
        alert("Vui lòng nhập Access Token.");
        return;
    }

    if (selectedUsers.length === 0) {
        alert("Vui lòng chọn ít nhất một người dùng.");
        return;
    }

    if (!message) {
        alert("Vui lòng nhập nội dung tin nhắn.");
        return;
    }

    if (!scheduleTime) {
        alert("Vui lòng chọn ngày và giờ gửi.");
        return;
    }

    // Calculate the delay in milliseconds from the current time to the scheduled time
    const now = new Date();
    const sendTime = new Date(scheduleTime);
    const delay = sendTime.getTime() - now.getTime();

    if (delay < 0) {
        alert("Thời gian gửi phải lớn hơn thời gian hiện tại.");
        return;
    }

    userListElement.innerHTML = `Tin nhắn sẽ được gửi vào ${sendTime.toLocaleString()}...`;

    setTimeout(() => {
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
                        console.error(`Error sending message to ${userId}:`, sendResponse.error.message);
                    } else {
                        const userDiv = document.createElement('div');
                        userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
                        userListElement.appendChild(userDiv);
                        completedRequests++;
                        if (completedRequests === selectedUsers.length) {
                            // Gọi lại hàm tải danh sách người dùng sau khi tất cả tin nhắn đã được gửi
                            document.getElementById('loadUsers').click();
                        }
                    }
                })
                .catch(error => {
                    console.error(`Có lỗi xảy ra khi gửi tin nhắn đến ${userId}:`, error);
                    completedRequests++;
                    if (completedRequests === selectedUsers.length) {
                        // Gọi lại hàm tải danh sách người dùng sau khi tất cả tin nhắn đã được gửi
                        document.getElementById('loadUsers').click();
                    }
                });
        });
    }, delay);
});

