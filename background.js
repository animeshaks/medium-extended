function updateIconAndTitle(tabId, changeInfo, tab) {
  if (tab.url) {
    const url = new URL(tab.url);
    let title;
    if (url.hostname.endsWith("medium.com")) {
      // Set icon to active (green)
      chrome.action.setIcon({
        path: {
          16: "icons/active_icon.png",
          48: "icons/active_icon.png",
          128: "icons/active_icon.png",
        },
        tabId: tabId,
      });
      title = "Medium Extended";
    } else {
      // Set icon to inactive (red)
      chrome.action.setIcon({
        path: {
          16: "icons/inactive_icon.png",
          48: "icons/inactive_icon.png",
          128: "icons/inactive_icon.png",
        },
        tabId: tabId,
      });
      title = "This extension only works for medium.com domain";
    }
    // Set the title (tooltip)
    chrome.action.setTitle({ title, tabId });
  }
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateIconAndTitle(tabId, changeInfo, tab);
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIconAndTitle(activeInfo.tabId, null, tab);
  });
});

chrome.action.onClicked.addListener((tab) => {
  // Get the current tab's URL
  const url = new URL(tab.url);

  // Check if the URL belongs to the medium.com domain
  if (url.hostname.endsWith("medium.com")) {
    // Split the pathname into segments
    const pathSegments = url.pathname.split("/");
    // Get the last segment
    const lastSegment = pathSegments.pop() || pathSegments.pop(); // handle potential trailing slash

    if (lastSegment) {
      // Define the new URL where you want to send the last parameter
      const newUrl = `https://readmedium.com/${lastSegment}`;

      // Open the new URL in a new tab
      chrome.tabs.create({ url: newUrl }, (newTab) => {
        console.log("New tab created:", newTab);
      });
    } else {
      console.error("No path segments found in the URL.");
    }
  } else {
    console.error("This extension only works for medium.com URLs.");
    // chrome.notifications.create({
    //   type: "basic",
    //   iconUrl: "icons/inactive_icon.png",
    //   title: "Invalid Domain",
    //   message: "This extension only works for medium.com domain",
    // });
  }
});
