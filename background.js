chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "developer.chrome.com"
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });

  chrome.omnibox.onInputEntered.addListener(function(text) {
    console.log("omnibox -->", text);
    var newURL = "https://www.google.com/search?q=" + encodeURIComponent(text);
    chrome.tabs.create({ url: newURL });
  });

  const kLocales = {
    "com.au": "Australia",
    "com.br": "Brazil",
    ca: "Canada",
    cn: "China",
    fr: "France",
    it: "Italy",
    "co.in": "India",
    "co.jp": "Japan",
    "com.ms": "Mexico",
    ru: "Russia",
    "co.za": "South Africa",
    "co.uk": "United Kingdom"
  };

  for (let key of Object.keys(kLocales)) {
    chrome.contextMenus.create({
      id: key,
      title: kLocales[key],
      type: "normal",
      contexts: ["selection"]
    });
  }
});
