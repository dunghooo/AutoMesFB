// content.js
/* global chrome */
console.log('Content script loaded');

// Gửi tin nhắn tới background script khi trang Facebook được tải
chrome.runtime.sendMessage({ action: "openPopup" });
