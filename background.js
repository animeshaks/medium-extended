chrome.action.onClicked.addListener((tab) => {
  // Get the current tab's URL
  const url = new URL(tab.url);

  // Check if the URL belongs to the medium.com domain
  if (url.hostname === "medium.com") {
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
  }
});
