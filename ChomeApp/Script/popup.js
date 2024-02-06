chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: function () {
        // Expand collapsible content
        var collapsibleDivs = document.querySelectorAll('.collapsible'); // Replace '.collapsible' with the correct selector
        collapsibleDivs.forEach(function (div) {
          div.style.display = 'block'; // You might need to set other styles as well
        });
  
        // Convert the document object to a formatted HTML string
        var serializer = new XMLSerializer();
        var prettyHtml = serializer.serializeToString(document);
        // Add a newline after every closing bracket
        prettyHtml = prettyHtml.replace(/>/g, '>\n');
        // Print the formatted HTML to the console
        console.log(prettyHtml);
      },
    });
  });
  