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


(function insertTint() {
  const ENSHROUD_TINT_ID = 'e---enshroud-tint';
  const tint_ele = document.createElement('div');
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
    if (event.keyCode === 66 && event.altKey) {
      cycleTint();
    }
  });
})();

(function makeReload() {
  const ENSHROUD_RELOAD_INDICATOR_ID = 'e---enshroud-reload-indicator';
  const ENSHROUD_RELOAD_INDICATOR_ICON_ID = 'e---enshroud-reload-indicator-icon';
  const ENSHROUD_RELOAD_KEY = 'enshroud---reload';
  const RELOAD_INTERVAL = 5000;
  const reloadFunc = () => window.location.reload(true);
  let reload_timeout_id = null;

  // Manage DOM element
  const indicator_ele = document.createElement('div');
  const icon_ele = document.createElement('span');
  icon_ele.appendChild(document.createTextNode('\u21BB'));
  icon_ele.id = ENSHROUD_RELOAD_INDICATOR_ICON_ID;
  indicator_ele.appendChild(icon_ele);
  indicator_ele.id = ENSHROUD_RELOAD_INDICATOR_ID;
  document.body.appendChild(indicator_ele);

  function cycleReload() {
    let ele = document.getElementById(ENSHROUD_RELOAD_INDICATOR_ID);

    if (reload_timeout_id === null) {
      // Turn on
      ele.style.display = 'block';
      reload_timeout_id = setTimeout(reloadFunc, RELOAD_INTERVAL);
      window.sessionStorage.setItem(ENSHROUD_RELOAD_KEY, 'on');
    } else {
      ele.style.display = 'none';
      clearTimeout(reload_timeout_id);
      reload_timeout_id = null;
      window.sessionStorage.setItem(ENSHROUD_RELOAD_KEY, 'off');
    }
  }

  // Get state from sessionStorage
  if (window.sessionStorage.getItem(ENSHROUD_RELOAD_KEY) == 'on') {
    cycleReload();
  }

  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 73 && event.altKey) {
      cycleReload();
    }
  });
})();
