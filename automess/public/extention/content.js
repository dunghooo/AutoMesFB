const existingDiv = document.createElement("div");
existingDiv.id = "my-extension-popup";
existingDiv.style.position = "fixed";
existingDiv.style.top = "10%";
existingDiv.style.right = "0";
existingDiv.style.width = "400px";
existingDiv.style.height = "600px";
existingDiv.style.backgroundColor = "white";
existingDiv.style.zIndex = "99999";
existingDiv.style.overflow = "auto";
existingDiv.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
existingDiv.style.pointerEvents = "auto"; // Cho phép tương tác với div
existingDiv.style.border = "none"; // Đảm bảo không có border làm thay đổi bố cục
existingDiv.style.margin = "0";

// Thêm nội dung HTML vào div
existingDiv.innerHTML = `
    <head>
        <title>Facebook Auto Messenger</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <style>
            body {
                
                font-family: Arial, Helvetica, sans-serif;
            }
                * {
            font-family: Arial, sans-serif;
          }


          #my-extension-popup {
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          }
          .token {
            margin-bottom: -15px;
          }

          textarea {
            width: 100%;
            height: 80px;
            margin-bottom: 10px;
          }


          .user-list {
            margin-top: 10px;
            max-height: 300px;
            height: 300px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 5px;
          }

          .user-list div {
            margin-bottom: 5px;
          }

          h1 {
            font-size: 24px;
            text-align: center;
            color: #333;
            margin-bottom: 20px;
          }

          p {
            text-align: center;
            color: #666;
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin: 10px 0 5px;
            font-weight: bold;
            color: black;
          }

          input[type="text"] {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            display: block;
          }




          .user-list {
            margin: 0 auto 20px auto;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
            padding: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .user-list div {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .user-list input[type="checkbox"] {
            margin-right: 10px;
          }

          #statusMessage {
            text-align: center;
            color: #d9534f;
            font-weight: bold;
            margin-top: 20px;
          }

          #scheduleOptions {
            display: none;
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          #scheduleOptions label {
            display: block;
            margin-bottom: 10px;
          }

          #scheduleOptions select {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          .popup {
            display: flex;
            position: fixed;
            width: 400px;
            height: 800px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-size: 14px;
            transition: right 0.3s ease-in-out;
          }

          .popup-content {
            padding: 20px;
            border: 1px solid #535459;
            color: #f9f9f9;
            max-height: 100vh;
            overflow-y: auto;
          }

          .popup-content ul li {
            font-size: 13px;
          }

          .popup-content h2 {
            margin: 0 0 10px;
            font-size: 1.5em;
          }

          .popup-content p {
            margin: 10px 0px 10px;
          }

          #closePopup {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          #closePopup:hover {
            background-color: #0056b3;
          }

          .popup.show {
            right: 20px;
          }

          #loadUsers {
            width: 60%;
            height: 40px;
            background-color: #007bff;
            color: white;
            border: 2px solid #007bff;
            font-size: 15px;
            border-radius: 5px;
            position: relative;
            z-index: 1;
            overflow: hidden;
          }

          #loadUsers:hover {
            color: #007bff;
          }

          #loadUsers::after {
            content: "";
            background: #fff;
            position: absolute;
            z-index: -1;
            padding: 0.85em 0.75em;
            display: block;
          }

          #loadUsers::after {
            left: -20%;
            right: -20%;
            top: 0;
            bottom: 0;
            transform: skewX(-45deg) scale(0, 1);
            transition: all 0.3s ease;
          }

          #loadUsers:hover::after {
            transform: skewX(-45deg) scale(1, 1);
            transition: all 0.3s ease-out;
          }

          #sendNow {
            width: 60%;
            height: 40px;
            background-color: #007bff;
            color: white;
            border: 2px solid #007bff;
            font-size: 15px;
            border-radius: 5px;
            position: relative;
            z-index: 1;
            overflow: hidden;
          }

          #sendNow:hover {
            color: #007bff;
          }

          #sendNow::after {
            content: "";
            background: #fff;
            position: absolute;
            z-index: -1;
            padding: 0.85em 0.75em;
            display: block;
          }

          #sendNow::after {
            left: -20%;
            right: -20%;
            top: 0;
            bottom: 0;
            transform: skewX(-45deg) scale(0, 1);
            transition: all 0.3s ease;
          }

          #sendNow:hover::after {
            transform: skewX(-45deg) scale(1, 1);
            transition: all 0.3s ease-out;
          }

          .send-div {
            display: flex;
            justify-content: center;
            margin-bottom: -25px;
            margin-top: -13px;
          }

          #scheduleSend {
            width: 60%;
            height: 40px;
            background-color: #007bff;
            color: white;
            border: 2px solid #007bff;
            font-size: 15px;
            border-radius: 5px;
            position: relative;
            z-index: 1;
            overflow: hidden;
          }

          #scheduleSend:hover {
            color: #007bff;
          }

          #scheduleSend::after {
            content: "";
            background: #fff;
            position: absolute;
            z-index: -1;
            padding: 0.85em 0.75em;
            display: block;
          }

          #scheduleSend::after {
            left: -20%;
            right: -20%;
            top: 0;
            bottom: 0;
            transform: skewX(-45deg) scale(0, 1);
            transition: all 0.3s ease;
          }

          #scheduleSend:hover::after {
            transform: skewX(-45deg) scale(1, 1);
            transition: all 0.3s ease-out;
          }

          .send-cal {
            display: flex;
            justify-content: center;
            margin-bottom: -25px;
            margin-top: -13px;
          }


          body {
            margin: 0;
            height: 100vh;
            background-color: transparent;
          }

          .toolbar {
            position: fixed;
            top: 50px;
            right: 50px;
            width: 60px;
            background-color: #FFA500;
            border-radius: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
          }

          .header {
            background-color: #F08000;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            padding: 5px;
            text-align: center;
            cursor: move;
          }

          .header img {
            width: 50px;
            height: auto;
          }

          .header span {
            color: white;
            font-size: 10px;
          }

          .content {
            padding: 5px 0;
            text-align: center;
          }

          .content a {
            display: block;
            margin: 10px 0;
            color: white;
            text-decoration: none;
            position: relative;
            /* Để chứa tab menu */
          }

          .footer {
            background-color: #333333;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            padding: 5px 0;
            text-align: center;
          }

          .footer a {
            display: block;
            margin: 10px 0;
            color: white;
            text-decoration: none;
          }

          /* Đổi màu icon khi rê chuột vào */
          .content a:hover img,
          .footer a:hover img {
            filter: invert(20%) sepia(90%) saturate(700%) hue-rotate(350deg) brightness(90%) contrast(110%);
          }

          /* CSS để thiết lập kích thước cho icon */
          .content img,
          .footer img {
            width: 40px;
            height: 40px;
          }

          /* CSS cho tab menu */
          .tab-menu {
            display: none;
            position: absolute;
            /* Vị trí dựa vào thẻ <a> cha */
            right: 62px;
            /* Điều chỉnh vị trí sang trái */
            top: 0;
            background-color: #fff;
            border: 1px solid #ccc;
            padding: 10px;
            z-index: 100;
          }

          .tab-menu.active {
            display: block;
          }

          /* CSS cho Tooltip */
          .tooltip {
            display: none;
            position: absolute;
            background-color: #333;
            color: #fff;
            padding: 5px;
            border-radius: 5px;
            font-size: 12px;
            top: 50%;
            left: -80px;
            /* Cách icon 60px về bên trái */
            transform: translateY(-50%);
          }

          .content a:hover .tooltip,
          .footer a:hover .tooltip {
            display: block;
            display: inline-block;
          }

          .check {
            display: flex;
            display: inline-block;
          }

          .time {
            flex: 1;
            margin: auto;
            display: flex;
            text-align: left;
          }

          .day {
            flex: 1;
            margin-right: 5%;
            font-size: 10px;
          }

          .wait {
            flex: 1;
            font-size: 10px;
            margin-right: 10px;
          }

          .check input {
            background: white;
            size: 10px;
          }

          .check select {
            background: rgba(77, 77, 77, 255);
            color: white;
            size: 10px;
          }

          .day select {
            background: rgba(77, 77, 77, 255);
            color: white;
          }

          .wait select {
            background: rgba(77, 77, 77, 255);
            color: white;
          }



          footer {
            margin-top: 5%;
          }

          .form-select {
            margin-right: 10px;
          }

          .form-label {
            margin-right: 10px;
          }

          .form-check {
            display: flex;
            align-items: center;
          }

          .select-group-text {
            background-color: #e9ecef;
            border: 1px solid #ced4da;
            border-left: 0;
            padding: 0.375rem 0.75rem;
            border-radius: 0 0.375rem 0.375rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }

          .form-select {
            border-radius: 0.375rem 0 0 0.375rem;
            margin-right: -1px;
          }

          .form-select,
          .select-group-text {
            height: calc(2.25rem + 2px);
          }

          .select-group-text i {
            font-size: 1.25rem;
          }



          .input-box {
            padding: 10px;
            margin-bottom: 10px;
            height: 450px;
            width: 100%;
          }

          .box {
            background-color: #3a3a3d;
            color: white;
            padding: 10px;
            margin-bottom: 10px;
            width: 100%;
          }

          .btn-secondary,
          .btn-warning {
            padding: 10px 15px;
            border: none;
            cursor: pointer;
          }

          .btn-secondary {
            background-color: darkgrey;
            color: white;
          }

          .btn-warning {
            background-color: #ff6600;
            color: white;
          }

          .foote {
            margin-top: 5px;
            text-align: center;
          }



          .logo-side img {
            width: 70%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }

          .logo-side {
            z-index: 10px;
          }

          .img-shadow {
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
            /* Đổ bóng để tạo cảm giác nổi */
            transform: scale(1.05);
            /* Phóng to nhẹ để tạo hiệu ứng nổi */
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .img-shadow:hover {
            transform: scale(1.3);
            /* Phóng to hơn khi hover */
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
            /* Tăng đổ bóng khi hover */
          }

          .icon-side {
            background-color: orange;
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .robot img {
            width: 50%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }

          .edit img {
            width: 50%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }

          .call img {
            width: 50%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }

          .power img {
            width: 50%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }

          .user img {
            width: 50%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }


          .icon-side>div:not(.icon-finish):not(.logo-side):hover {
            background-color: #535459;
            /* Màu nền khi hover */
            transition: background-color 0.3s;
          }

          /* Hiệu ứng hover cho các div bên trong .icon-finish */
          .icon-finish>div:hover {
            background-color: #535459;
            /* Màu nền khi hover */
            transition: background-color 0.3s;
          }

          .button-user {
            display: flex;
            justify-content: center;
            margin-bottom: 6px;
          }

          .title {
            color: #0866ff;
            font-size: 25px;
            font-weight: 800;
          }


          /* Tùy chỉnh nút icon */
          .icon-btn {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            margin: 5px;
          }

          /* Tùy chỉnh dropdown chứa các icon */
          #iconDropdown {
            display: flex;
            flex-wrap: wrap;
            max-width: 200px;
            border-radius: 5px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                  }
            

        </style>
    </head>
    <body>
        <div class="popup-content">
            <div class="tab-content col-12">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="pills-home-tab"><br>
                    <div class="row">
                        <form>
                            <div class="round">
                                <h4 class="title">Auto Facebook Message</h4>
                            </div>
                            <div class="col-12 token">
                                <label for="accessToken" style="color: black;">Token 1</label>
                                <div class="input-group">
                                    <input type="text" id="accessToken" placeholder="Nhập Access Token..." />
                                </div>
                            </div>
                            <div class="col-12 pageid">
                                <label for="pageId" style="color: black;">Pages ID</label>
                                <input type="text" id="pageId" placeholder="Nhập Page ID..." />
                            </div>
                            <label for="pageId" style="color: black;">Message</label>
                            <div class="col-12">
                                <textarea placeholder="Enter message content..."></textarea>
                            </div>
                            div>
                              <button id="selectFileButton" type="button">Chọn tệp</button>
  
  <!-- Input để chọn tệp (ẩn đi) -->
<input type="file" id="fileInput" style="display:none;" multiple />

  <!-- Hiển thị tên file đã chọn -->
  <p id="fileNames"></p>

                            <div class="button-user">
                                <button type="button" id="loadUsers">LOAD USERS</button>
                                
                            </div>
                            <div id="selectAllDiv" class="d-flex justify-content-start">
                                <input class="me-2" type="checkbox" id="selectAll">
                                <label for="selectAll">Chọn tất cả</label>
                            </div>
                            <div id="status">Đang tải.11..</div>
                            <div class="user-list" id="userList" style="color: black;">
                                <!-- Danh sách người dùng sẽ được thêm vào đây  do-->
                            </div>

                            <div class="error-messages">
                                <p id="userError" style="color: red; display: none;"></p>
                                <p id="messageError" style="color: red; display: none;"></p>
                            </div>
                            <br>
                            <div class="send-div">
                                <button id="sendNow">SEND NOW</button>
                            </div>
                            <br/>
                            <br/>
                            <div class="check col-12">
                                <div class="time col-12">
                                    <div class="day col-6">
                                        <div>
                                            <input style="font-size: 20px;" type="datetime-local" id="scheduleTime" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br>
                    <footer>
                        <div class="send-cal">
                            <button style="height: 45px;" id="scheduleSend">SEND SCHEDULE</button>
                        </div>
                    </footer>
                    <br>
                </div>
            </div>
        </div>
        </div>
        
    </body>
`;

// Thêm div vào body
document.body.appendChild(existingDiv);


const toggleButton = document.createElement("button");
toggleButton.id = "my-extension-toggle";
toggleButton.innerText = "tool";
toggleButton.style.position = "fixed";
toggleButton.style.top = "10%";
toggleButton.style.right = "10px";
toggleButton.style.zIndex = "100000";
toggleButton.style.padding = "10px";
toggleButton.style.backgroundColor = "#007bff";
toggleButton.style.color = "white";
toggleButton.style.border = "none";
toggleButton.style.borderRadius = "5px";
toggleButton.style.cursor = "pointer";

// Thêm nút vào body
document.body.appendChild(toggleButton);

// Thêm sự kiện click cho nút
toggleButton.addEventListener("click", () => {
  if (existingDiv.style.display === "none") {
    existingDiv.style.display = "block";
  } else {
    existingDiv.style.display = "none";
  }
});





function formatDateTimeLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Hàm để cập nhật giá trị mặc định của input kiểu datetime-local
function setDefaultDateTime() {
  const now = new Date();
  document.getElementById("scheduleTime").value = formatDateTimeLocal(now);
}

// Gọi hàm để cập nhật giá trị ngay khi trang được tải
setDefaultDateTime();
const savedAccessToken = localStorage.getItem("accessToken");
const savedPageId = localStorage.getItem("pageId");

if (savedAccessToken) {
  document.getElementById("accessToken").value = savedAccessToken;
}

if (savedPageId) {
  document.getElementById("pageId").value = savedPageId;
}

// Handle tab navigation
const tabLinks = document.querySelectorAll(".nav-link");
tabLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    tabLinks.forEach((link) => link.classList.remove("active"));
    document
      .querySelectorAll(".tab-pane")
      .forEach((pane) => pane.classList.remove("show", "active"));
    this.classList.add("active");
    const targetPane = document.querySelector(this.getAttribute("href"));
    targetPane.classList.add("show", "active");
  });
});

// Event listeners for saving data
document.getElementById("accessToken").addEventListener("change", function () {
  localStorage.setItem("accessToken", this.value);
});

document.getElementById("pageId").addEventListener("change", function () {
  localStorage.setItem("pageId", this.value);
});

document.querySelector("textarea").addEventListener("input", function () {
  const message = this.value;
  chrome.storage.local.set({ messageContent: message });
});






document.getElementById('loadUsers').addEventListener('click', function () {
  const userListElement = document.getElementById('userList');
  const selectAllDiv = document.getElementById('selectAllDiv');
  const accessToken = document.getElementById('accessToken').value;
  const pageId = document.getElementById('pageId').value;

  if (!accessToken || !pageId) {
    userListElement.innerHTML = "Vui lòng nhập Access Token và Page ID.";
    return;
  }

  // Display loading message
  userListElement.innerHTML = '';
  selectAllDiv.style.display = 'block'; // Ensure the "Select All" checkbox is visible

  const pageSize = 100; // Number of users per page
  let allConversations = [];
  let currentPage = 0; // Current page index
  const checkedUsers = new Set(); // To keep track of selected users

  function updateStatus(message) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }

  function loadConversationsForPage(page) {
    const start = page * pageSize;
    const end = start + pageSize;
    const conversationsToLoad = allConversations.slice(start, end);

    function renderPage() {
      const sentUsers = JSON.parse(localStorage.getItem('sentUsers')) || [];
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000); // Kiểm tra trong vòng 1 giờ

      userListElement.innerHTML = '';

      const userPromises = conversationsToLoad.map(conversation => {
        const userId = conversation.id;
        return fetch(`https://graph.facebook.com/v20.0/${userId}?fields=senders&access_token=${accessToken}`)
          .then(response => response.json())
          .then(userData => {
            const userName = userData.senders.data[0].name; // Assuming the first sender is the user
            const userDiv = document.createElement('div');
            userDiv.className = 'user-item';

            // Tạo checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = userData.senders.data[0].id; // Store user ID in checkbox value
            checkbox.classList.add('user-checkbox'); // Add class for easier selection

            // Kiểm tra xem người dùng đã nhận tin nhắn trong vòng 1 giờ qua chưa
            const lastSent = sentUsers.find(user => user.id === userData.senders.data[0].id);
            if (lastSent && new Date(lastSent.timestamp) > oneHourAgo) {
              checkbox.disabled = true; // Disable checkbox nếu đã gửi trong 1 giờ qua
              userDiv.appendChild(document.createTextNode(` ${userName} (Đã gửi trong 1 giờ qua)`));
            } else {
              // Chỉ thêm checkbox nếu người dùng có thể nhận tin nhắn
              userDiv.appendChild(checkbox);
              checkbox.checked = checkedUsers.has(checkbox.value);

              // Sự kiện khi checkbox được thay đổi
              checkbox.addEventListener('change', function () {
                if (this.checked) {
                  checkedUsers.add(this.value);
                } else {
                  checkedUsers.delete(this.value);
                }
              });
              userDiv.appendChild(document.createTextNode(` ${userName}`));
            }

            userListElement.appendChild(userDiv);
          });
      });

      // Chờ đến khi tất cả dữ liệu người dùng được tải
      Promise.all(userPromises).then(() => {
        // Phần xử lý phân trang
        const paginationDiv = document.createElement('div');
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 0;
        prevButton.addEventListener('click', () => {
          currentPage--;
          loadConversationsForPage(currentPage);
        });
        paginationDiv.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = end >= allConversations.length;
        nextButton.addEventListener('click', () => {
          currentPage++;
          loadConversationsForPage(currentPage);
        });
        paginationDiv.appendChild(nextButton);

        userListElement.appendChild(paginationDiv);
        updateStatus("Tất cả người dùng đã được tải xong.");
      });
    }

    renderPage();
  }

  function loadAllConversations() {
    userListElement.innerHTML = "Đang tải dữ liệu...";

    let nextPageUrl = `https://graph.facebook.com/v20.0/${pageId}/conversations?access_token=${accessToken}`;

    function loadConversations(url) {
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          allConversations = allConversations.concat(data.data);
          if (data.paging && data.paging.next) {
            return loadConversations(data.paging.next);
          } else {
            // All data loaded, start rendering the first page
            loadConversationsForPage(currentPage);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    loadConversations(nextPageUrl);
  }

  function updateSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.addEventListener('change', function () {
      const allCheckboxes = document.querySelectorAll('.user-checkbox');
      allCheckboxes.forEach(checkbox => {
        if (!checkbox.disabled) { // Bỏ qua checkbox bị disable
          checkbox.checked = this.checked;
          if (this.checked) {
            checkedUsers.add(checkbox.value);
          } else {
            checkedUsers.delete(checkbox.value);
          }
        }
      });
    });
  }

  function resetSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.checked = false; // Reset the "Select All" checkbox
  }

  updateSelectAll();
  loadAllConversations();
});


let selectedFiles = []; // Biến toàn cục để lưu các tệp đã chọn

// Khi nhấn nút "Chọn tệp", mở hộp thoại chọn tệp
document.getElementById('selectFileButton').addEventListener('click', () => {
  document.getElementById('fileInput').click(); // Kích hoạt input file
});

// Khi người dùng chọn tệp, xử lý các tệp đó
document.getElementById('fileInput').addEventListener('change', (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    selectedFiles = Array.from(files); // Lưu các tệp vào biến toàn cục

    // Hiển thị tên các tệp
    const fileNamesElement = document.getElementById('fileNames');
    fileNamesElement.textContent = `Đã chọn tệp: ${selectedFiles.map(file => file.name).join(', ')}`;

    // Tạo URL để hiển thị bản xem trước ảnh cho các tệp hình ảnh
    selectedFiles.forEach(file => {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        const imagePreviewElement = document.createElement('img');
        imagePreviewElement.src = imageUrl;
        imagePreviewElement.style.maxWidth = "200px"; // Đặt kích thước tối đa cho ảnh
        imagePreviewElement.style.display = "block";

        // Xóa ảnh cũ nếu có
        const existingPreview = document.getElementById('imagePreview');
        if (existingPreview) {
          existingPreview.remove();
        }

        imagePreviewElement.id = 'imagePreview'; // Đặt ID cho ảnh xem trước
        fileNamesElement.appendChild(imagePreviewElement);
      }
    });
  }
});


document.getElementById("sendNow").addEventListener("click", async function (event) {
  event.preventDefault();

  const userListElement = document.getElementById("userList");
  const message = document.querySelector("textarea").value;
  const accessToken = document.getElementById("accessToken").value;
  const selectedUsers = document.querySelectorAll('input[type="checkbox"].user-checkbox:checked');

  const userErrorElement = document.getElementById("userError");
  const messageErrorElement = document.getElementById("messageError");

  userErrorElement.style.display = "none";
  messageErrorElement.style.display = "none";

  let hasError = false;

  if (selectedUsers.length === 0) {
    userErrorElement.textContent = "Vui lòng chọn ít nhất một người dùng.";
    userErrorElement.style.display = "block";
    hasError = true;
  }

  if (selectedFiles.length === 0 && !message) {
    messageErrorElement.textContent = "Vui lòng nhập nội dung tin nhắn hoặc chọn tệp.";
    messageErrorElement.style.display = "block";
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Load sent users from local storage
  const sentUsers = JSON.parse(localStorage.getItem('sentUsers')) || [];
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);

  // Filter out users who have been sent messages within the last hour
  const usersToSend = Array.from(selectedUsers).filter(checkbox => {
    const userId = checkbox.value;
    const lastSent = sentUsers.find(user => user.id === userId);
    if (lastSent && new Date(lastSent.timestamp) > oneHourAgo) {
      return false; // Skip users who were sent messages in the last 1 hour
    }
    return true;
  });

  if (usersToSend.length === 0) {
    userListElement.innerHTML = "Tất cả người dùng đã được gửi tin nhắn trong vòng 1 giờ qua.";
    return;
  }

  userListElement.innerHTML = "Đang gửi tin nhắn...";
  let completedRequests = 0;

  // Function to create a delay between requests
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  for (let i = 0; i < usersToSend.length; i++) {
    const checkbox = usersToSend[i];
    const userId = checkbox.value;

    try {
      // Nếu không phải là người đầu tiên, thêm độ trễ ngẫu nhiên từ 1 đến 2 phút
      if (i !== 0) {
        const randomDelay = Math.floor(Math.random() * 5000) + 1000; // 1 to 2 minutes (60000ms to 120000ms)
        await delay(randomDelay);
      }

      // Gửi tin nhắn văn bản nếu có tin nhắn
      if (message) {
        await fetch(
          `https://graph.facebook.com/v20.0/me/messages?access_token=${accessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipient: { id: userId },
              message: { text: message },
              tag: "CONFIRMED_EVENT_UPDATE",
            }),
          }
        );
      }

      // Gửi từng tệp tin nếu có
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("recipient", JSON.stringify({ id: userId }));
        formData.append("message", JSON.stringify({ attachment: { type: "image", payload: { is_reusable: true } } }));
        formData.append("filedata", file);
        formData.append("tag", "CONFIRMED_EVENT_UPDATE");

        await fetch(
          `https://graph.facebook.com/v20.0/me/messages?access_token=${accessToken}`,
          {
            method: "POST",
            body: formData,
          }
        );
      }

      const userDiv = document.createElement("div");
      userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
      userListElement.appendChild(userDiv);

      // Update local storage with sent users
      sentUsers.push({ id: userId, timestamp: now });
      localStorage.setItem('sentUsers', JSON.stringify(sentUsers));
    } catch (error) {
      const errorDiv = document.createElement("div");
      errorDiv.textContent = `Lỗi khi gửi tin nhắn tới ${checkbox.parentElement.textContent.trim()}: ${error.message}`;
      errorDiv.style.color = "red";
      userListElement.appendChild(errorDiv);
    }

    completedRequests++;
    if (completedRequests === usersToSend.length) {
      userListElement.innerHTML += "<div>Hoàn thành việc gửi tin nhắn.</div>";
      setTimeout(() => {
        document.getElementById("loadUsers").click(); // Gọi lại hàm tải danh sách người dùng
      }, 2000);
    }
  }
});







// Clear localStorage every day
function clearExpiredSentUsers() {
  const sentUsers = JSON.parse(localStorage.getItem('sentUsers')) || [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const updatedSentUsers = sentUsers.filter(user => new Date(user.timestamp) > oneDayAgo);
  localStorage.setItem('sentUsers', JSON.stringify(updatedSentUsers));
}

// Call the function to clear expired users when the script loads
clearExpiredSentUsers();

document.getElementById("scheduleSend").addEventListener("click", function () {
  const userListElement = document.getElementById("userList");
  const message = document.querySelector("textarea").value;
  const accessToken = document.getElementById("accessToken").value;
  const selectedUsers = document.querySelectorAll(
    'input[type="checkbox"].user-checkbox:checked'
  );
  const scheduleTime = document.getElementById("scheduleTime").value; // Get the selected date and time
  const sentUsers = JSON.parse(localStorage.getItem("sentUsers")) || []; // Lấy danh sách người đã nhận tin nhắn

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

  // Tính toán độ trễ từ thời gian hiện tại đến thời gian gửi dự kiến
  const now = new Date();
  const sendTime = new Date(scheduleTime);
  const delay = sendTime.getTime() - now.getTime();

  if (delay < 0) {
    alert("Thời gian gửi phải lớn hơn thời gian hiện tại.");
    return;
  }

  // Tính thời gian 1 giờ trước
  const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);

  userListElement.innerHTML = `Tin nhắn sẽ được gửi vào ${sendTime.toLocaleString()}...`;

  setTimeout(() => {
    userListElement.innerHTML = "Đang gửi tin nhắn...";
    completedRequests = 0;

    selectedUsers.forEach((checkbox) => {
      const userId = checkbox.value;
      const lastSent = sentUsers.find(user => user.id === userId);

      // Kiểm tra xem người dùng đã nhận tin nhắn trong 1 giờ qua chưa
      if (lastSent && new Date(lastSent.timestamp) > oneHourAgo) {
        const userDiv = document.createElement("div");
        userDiv.textContent = `Không gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()} vì đã gửi trong 1 giờ qua.`;
        userListElement.appendChild(userDiv);
      } else {
        // Gửi tin nhắn nếu chưa gửi trong 1 giờ qua
        fetch(
          `https://graph.facebook.com/v20.0/me/messages?access_token=${accessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipient: {
                id: userId,
              },
              message: {
                text: message,
              },
              tag: "CONFIRMED_EVENT_UPDATE",
            }),
          }
        )
          .then((response) => response.json())
          .then((sendResponse) => {
            if (sendResponse.error) {
              console.error(
                `Error sending message to ${userId}:`,
                sendResponse.error.message
              );
            } else {
              const userDiv = document.createElement("div");
              userDiv.textContent = `Đã gửi tin nhắn cho ${checkbox.parentElement.textContent.trim()}`;
              userListElement.appendChild(userDiv);
              completedRequests++;

              // Lưu lại thời gian gửi tin nhắn
              sentUsers.push({
                id: userId,
                timestamp: new Date().toISOString(),
              });
              localStorage.setItem("sentUsers", JSON.stringify(sentUsers));

              setTimeout(() => {
                document.querySelector("textarea").value = ""; // Xóa nội dung sau 2 giây
              }, 2000);
              // Sau khi hoàn thành, đợi 2 giây rồi load lại danh sách người dùng
              setTimeout(() => {
                document.getElementById("loadUsers").click(); // Gọi lại hàm tải danh sách người dùng
              }, 2000);
            }
          })
          .catch((error) => {
            console.error(`Có lỗi xảy ra khi gửi tin nhắn đến ${userId}:`, error);
            completedRequests++;
            if (completedRequests === selectedUsers.length) {
              // Gọi lại hàm tải danh sách người dùng sau khi tất cả tin nhắn đã được gửi
              document.getElementById("loadUsers").click();
            }
          });
      }
    });
  }, delay);
});




