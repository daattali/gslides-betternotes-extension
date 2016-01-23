var gsbn = {

    // init: add message listeners and call the appropriate function based on the request
    init : function() {

      // If we already setup the resizing on this page, do nothing	
      if (window.top.document.body.getAttribute("slide-resize-js") != null) {
        return;
      }
	  
	    // Make sure this is the Speaker Notes tab
	    var i18n = [
	      "Speaker Notes",    // English
        "Speaker notes",    // English (newer Chrome versions)
		    "Vortragsnotizen"   // German
	    ]
      
      if (i18n.indexOf(window.top.document.body.getAttribute("aria-label")) == -1) {
        return;
      }
	  
      window.top.document.body.setAttribute("slide-resize-js", true);

      var getOptsResp = function(opts) {
        if (opts.enabled) {
          var notesMaxWidth = parseInt(opts.notesMaxWidth) || gsbnCommon.defaultOpts.notesMaxWidth;
          gsbn.addJS(notesMaxWidth, opts.nextSlide);
        }
      }
      gsbn.getOptions(getOptsResp);
    },
    
    addJS : function(notesMaxWidth, enlargeNextSlide) {
        // Run this JavaScript code in the Speaker Notes window
        // (I'm on Chrome on Windows so I press F12 to bring up the Developer Tools, go to Console, and run it there)
        notesMaxWidth = typeof notesMaxWidth !== 'undefined' ? notesMaxWidth : 450;
        var resizeSlidesRuleCount = 1;
        var resizeSlides = function() {
          // Resize the current slide
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
          sheet.insertRule(
            ".punch-viewer-speakernotes-timer-panel { position: fixed !important; }",
            resizeSlidesRuleCount++);
          sheet.insertRule(
            ".punch-viewer-speakernotes-text-body-scrollable, .punch-viewer-speakernotes-base { height: 100% !important; }",
            resizeSlidesRuleCount++);
            
          // Resize the next slide
          if (enlargeNextSlide) {
            sheet.insertRule(
              ".punch-viewer-speakernotes-page-previous { vertical-align: top !important; }",
              resizeSlidesRuleCount++);       
              
            var mainSlide = window.top.document.getElementsByClassName("punch-viewer-speakernotes-page-container")[0];
            var nextSlide = window.top.document.getElementsByClassName("punch-viewer-speakernotes-page-next")[0];
            var prevSlide = window.top.document.getElementsByClassName("punch-viewer-speakernotes-page-previous")[0];
            var ratio = mainSlide.scrollHeight / mainSlide.scrollWidth;

            var nextSlideWidth = slideWidth - prevSlide.offsetWidth -
                                 parseInt(window.top.getComputedStyle(prevSlide).marginRight) -
                                 parseInt(window.top.getComputedStyle(nextSlide).marginLeft) - 10;
            var nextSlideHeight = nextSlideWidth * ratio;
            sheet.insertRule(
              ".punch-viewer-speakernotes-page-next," +
              ".punch-viewer-speakernotes-page-next > iframe {" +
              "  width: " + nextSlideWidth + "px !important;" +
              "  height: " + nextSlideHeight + "px !important;" +
              "}",
              resizeSlidesRuleCount++
            );
            var nextSlideIFrame = nextSlide.getElementsByTagName("iframe")[0].contentWindow;
            if (nextSlideIFrame.document.getElementById("gsbn-next-style") != null) {
              nextSlideIFrame.document.getElementById("gsbn-next-style").remove();
            }
            style = nextSlideIFrame.document.createElement("style");
            style.setAttribute('id', 'gsbn-next-style');
            style.setAttribute('type', 'text/css');
            style.innerHTML = ".punch-viewer-speakernotes-page, .punch-viewer-speakernotes-page svg {" +
                              "  width: " + nextSlideWidth + "px !important;" +
                              "  height: " + nextSlideHeight + "px !important; }";
            nextSlideIFrame.document.head.insertBefore(style, nextSlideIFrame.document.head.childNodes[0]);
          }
        };
        window.top.onresize = resizeSlides;
        resizeSlides();  
    },
    
    getOptions : function(cb) {
      chrome.storage.sync.get(gsbnCommon.defaultOpts, cb);
    }
}

gsbn.init();
