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
          document.getElementById('options-enabled').checked = items.autoResize;
          document.getElementById('options-next-slide').checked = items.nextSlide;
          document.getElementById('options-notes-width').value = items.notesMaxWidth;
		  document.getElementById('options-timer-right').checked = items.timerRight;
        });
    },
    
    // saveOption: an option was changed, save it
    saveOptions : function() {
        var autoResize = document.getElementById('options-enabled').checked;
        var nextSlide = document.getElementById('options-next-slide').checked;
        var notesMaxWidth = document.getElementById('options-notes-width').value;
		var timerRight = document.getElementById('options-timer-right').checked;
        
        chrome.storage.sync.set({
          autoResize : autoResize,
          nextSlide : nextSlide,
          notesMaxWidth : notesMaxWidth,
		  timerRight : timerRight
        });
		
        if (location.href.indexOf("gsbn-popup") >= 0) {
          window.close();
        }
    }
}

document.addEventListener('DOMContentLoaded', gsbnOptions.init);