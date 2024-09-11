chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: chrome.runtime.getURL('/public/extention/popup.html'),
        type: 'popup',
        width: 400,
        height: 600,
        top: 100,
        left: 100
    });
});
