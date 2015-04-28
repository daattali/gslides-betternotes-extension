var gsbnBackground = {
  // init: register when to show the extension icon
  init : function() {
	chrome.runtime.onInstalled.addListener(function() {
	  // Replace all rules ...
	  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		// With a new rule ...
		chrome.declarativeContent.onPageChanged.addRules([{
    	  conditions: [
			new chrome.declarativeContent.PageStateMatcher({
			  pageUrl: { urlMatches: 'docs.google.com/[*/]?presentation' },
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
