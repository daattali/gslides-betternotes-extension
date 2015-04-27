var gsbnBackground = {
  // init: register when to show the extension icon
  init : function() {
	chrome.runtime.onInstalled.addListener(function() {
	  // Replace all rules ...
	  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		// With a new rule ...
		chrome.declarativeContent.onPageChanged.addRules([{
		  // That fires when a page's URL contains a 'g' ...
		  conditions: [
			new chrome.declarativeContent.PageStateMatcher({
			  pageUrl: { urlContains: 'docs.google.com/*/presentation' },
			})
		  ],
		  // And shows the extension's page action.
		  actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	  });
	});        
  }
}

gsbnBackground.init();
