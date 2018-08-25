const ENSHROUD_CLASS = 'e---enshroud';

function onButtonPress() {
  if (document.body.classList.contains(ENSHROUD_CLASS)) {
    document.body.classList.remove(ENSHROUD_CLASS);
  } else {
    document.body.classList.add(ENSHROUD_CLASS);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!sender.tab && request.enshroudButtonPressed) {
    onButtonPress();
  }
});
