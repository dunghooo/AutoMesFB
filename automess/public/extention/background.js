// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

// Lắng nghe tin nhắn từ content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
        chrome.action.openPopup();
    }
});
