var gsbnOptions = {
    
    // init: on page load, restore the saved options and add listeners to changing them
    init : function() {
        gsbnOptions.restoreOptions();
        document.getElementById('options-save').addEventListener('click', gsbnOptions.saveOptions);
		document.getElementById('options-notes-width').setAttribute('min', gsbnCommon.minWidth);
		document.getElementById('options-notes-width').setAttribute('max', gsbnCommon.maxWidth);
    },
    
    restoreOptions : function() {
        chrome.storage.sync.get(
          gsbnCommon.defaultOpts
        , function(items) {
          document.getElementById('options-enabled').checked = items.enabled;
          document.getElementById('options-notes-width').value = items.notesMaxWidth;
        });
    },
    
    // saveOption: an option was changed, save it
    saveOptions : function() {
        var enabled = document.getElementById('options-enabled').checked;
        var notesMaxWidth = document.getElementById('options-notes-width').value;
        
        chrome.storage.sync.set({
          enabled : enabled,
          notesMaxWidth : notesMaxWidth
        });
		
		if (location.href.indexOf("gsbn-popup") >= 0) {
			window.close();
		}
    }
}

document.addEventListener('DOMContentLoaded', gsbnOptions.init);