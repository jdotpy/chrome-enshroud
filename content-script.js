const ENSHROUD_CLASS = 'e---enshroud';

function onButtonPress() {
  if (document.body.classList.contains(ENSHROUD_CLASS)) {
    document.body.classList.remove(ENSHROUD_CLASS);
  } else {
    document.body.classList.add(ENSHROUD_CLASS);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!sender.tab && request.enshroudButtonPressed) {
    onButtonPress();
  }
});


const ENSHROUD_TINT_ID = 'e---enshroud-tint';

(function insertTint() {
  console.log('tinting');
  tint_ele = document.createElement('div');
  tint_ele.id = ENSHROUD_TINT_ID;
  tint_ele.style.opactity = 0;
  document.body.appendChild(tint_ele);

  function cycleTint() {
    let ele = document.getElementById(ENSHROUD_TINT_ID);
    const current = parseFloat(ele.style.opacity) || 0;
    let newOpacity = current + .1;
    if (newOpacity >= 1) {
      newOpacity = 0;
    }
    ele.style.opacity = newOpacity;
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'b' && event.altKey) {
      cycleTint();
    }
  });
})();
