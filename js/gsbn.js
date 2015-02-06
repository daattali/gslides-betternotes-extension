var gsbn = {

    // init: add message listeners and call the appropriate function based on the request
    init : function() {
      if (window.top.document.body.getAttribute("slide-resize-js") != null) {
        return;
      }
      if (window.top.document.body.getAttribute("aria-label") != "Speaker Notes") {
        return;
      }
      window.top.document.body.setAttribute("slide-resize-js", true);
      console.log("added");
      var getOptsResp = function(opts) {
      console.log(opts);
        if (opts.enabled) {
          var notesMaxWidth = parseInt(opts.notesMaxWidth) || gsbnCommon.defaultOpts.notesMaxWidth;
          gsbn.addJS(notesMaxWidth);
        }
      }
      gsbn.getOptions(getOptsResp);
    },
    
    addJS : function(notesMaxWidth) {
        // Run this JavaScript code in the Speaker Notes window
        // (I'm on Chrome on Windows so I press F12 to bring up the Developer Tools, go to Console, and run it there)
        notesMaxWidth = typeof notesMaxWidth !== 'undefined' ? notesMaxWidth : 450;
        var resizeSlidesRuleCount = 1;
        var resizeSlides = function() {
          var fullWidth = window.top.innerWidth;
          var slideWidth = (fullWidth < notesMaxWidth * 2) ? fullWidth / 2 : fullWidth - notesMaxWidth;
          var sheet = window.top.document.styleSheets[0];
          sheet.insertRule(
            ".punch-viewer-speakernotes-side-panel," +
            ".punch-viewer-speakernotes-page-container," +
            ".punch-viewer-speakernotes-page," +
            ".punch-viewer-speakernotes-page > svg {" +
            "  width: " + slideWidth + "px !important; " +
            "  height:auto !important;" +
            "}", resizeSlidesRuleCount++);
            sheet.insertRule(
              ".punch-viewer-speakernotes-text-body-scrollable { position: static !important; }",
              resizeSlidesRuleCount++);
        };
        window.top.onresize = resizeSlides;
        resizeSlides();  
    },
    
    getOptions : function(cb) {
      chrome.storage.sync.get(gsbnCommon.defaultOpts, cb);
    }
}

gsbn.init();
