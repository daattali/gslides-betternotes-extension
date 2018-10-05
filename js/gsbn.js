var gsbn = {

    slideWidth : null,
    dragging : false,

    // init: add message listeners and call the appropriate function based on the request
    init : function() {

      // If we already setup the resizing on this page, do nothing
      if (window.top.document.body.getAttribute("slide-resize-js") != null) {
        return;
      }

	    // Make sure this is the Speaker Notes tab
      if (!window.top.location.pathname.startsWith('/presentation/') || !window.top.location.pathname.endsWith('/present')) {
        return;
      }

      window.top.document.body.setAttribute("slide-resize-js", true);

      var getOptsResp = function(opts) {
        gsbn.addJS(opts);
      }
      gsbn.getOptions(getOptsResp);
    },

    addJS : function(opts) {
        // Run this JavaScript code in the Speaker Notes window
        // (I'm on Chrome on Windows so I press F12 to bring up the Developer Tools, go to Console, and run it there)
        var notesMaxWidth = parseInt(opts.notesMaxWidth) || gsbnCommon.defaultOpts.notesMaxWidth;
        var resizeSlidesRuleCount = 0;

		// Move the timer to the right because it blocks a large portion of the slide preview
		if (opts.timerRight) {
		  var sheet = window.top.document.styleSheets[0];
		  sheet.insertRule(
		    ".punch-viewer-speakernotes-timer-panel { right: 0; width: auto !important;}",
			resizeSlidesRuleCount++);
		}
		
        // The core logic to resize the slides
        var resizeSlides = function() {

          // Resize the current slide
          var fullWidth = window.top.innerWidth;
          if (gsbn.slideWidth === null) {
            var slideWidth = (fullWidth < notesMaxWidth * 2) ? fullWidth / 2 : fullWidth - notesMaxWidth;
          } else {
            var slideWidth = gsbn.slideWidth;
          }
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
	          ".punch-viewer-speaker-qanda-content { position: static !important; }",
	          resizeSlidesRuleCount++);
	        sheet.insertRule(
	          ".punch-viewer-speaker-questions,.punch-viewer-speaker-series-list, .punch-viewer-speaker-series-intro-container, .punch-viewer-speaker-qanda-not-available { position: static !important; }",
	          resizeSlidesRuleCount++);
          sheet.insertRule(
            ".punch-viewer-speakernotes-timer-panel { position: fixed !important; }",
            resizeSlidesRuleCount++);
          sheet.insertRule(
            ".punch-viewer-speakernotes-text-body-scrollable, .punch-viewer-speakernotes-base { height: 100% !important; }",
            resizeSlidesRuleCount++);
          sheet.insertRule(
            "body[gsbn-dragging=true]{ cursor: e-resize; }",
            resizeSlidesRuleCount++);
	  sheet.insertRule(
	    ".punch-viewer-speaker-empty-questions { position: static !important; }",
        resizeSlidesRuleCount++);
          // Resize the next slide
          if (opts.nextSlide) {
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
            style = nextSlideIFrame.document.createElement("STYLE");
            style.setAttribute('id', 'gsbn-next-style');
            style.setAttribute('type', 'text/css');
            style.innerHTML = ".punch-viewer-speakernotes-page, .punch-viewer-speakernotes-page svg {" +
                              "  width: " + nextSlideWidth + "px !important;" +
                              "  height: " + nextSlideHeight + "px !important; }";
            nextSlideIFrame.document.head.insertBefore(style, nextSlideIFrame.document.head.childNodes[0]);
          }
        };

        // Resize on page load and whenever the window is resized
        if (opts.autoResize) {
          window.top.onresize = resizeSlides;
          resizeSlides();
        }

        // Add a draggable element that allows the user to manually resize the windows
        var newItem = window.top.document.createElement("TD");
        newItem.setAttribute('id', 'gsbn-draggable');
        newItem.setAttribute('style', 'width: 5px; background: #666; cursor: e-resize; z-index: 10; position: relative;}');
        var mainPanel = window.top.document.getElementsByClassName("punch-viewer-speakernotes-main-panel")[0];
        mainPanel.parentNode.insertBefore(newItem, mainPanel);

        window.top.document.getElementById("gsbn-draggable").addEventListener("mousedown", function(ev){
          gsbn.dragging = true;
          window.top.document.getElementsByTagName('body')[0].setAttribute('gsbn-dragging', true);
        });
        window.top.document.addEventListener("mouseup", function(ev){
          gsbn.dragging = false;
          window.top.document.getElementsByTagName('body')[0].setAttribute('gsbn-dragging', false);
        });
        var mainSlidePanel = window.top.document.getElementsByClassName("punch-viewer-speakernotes-page-control")[0];
        var mainSlidePaddings = parseInt(window.top.getComputedStyle(mainSlidePanel).paddingLeft) +
                                parseInt(window.top.getComputedStyle(mainSlidePanel).paddingRight);
        window.top.document.addEventListener("mousemove", function(ev){
          if (!gsbn.dragging) return;
          gsbn.slideWidth = ev.clientX - mainSlidePaddings;
          resizeSlides();
        });
    },

    getOptions : function(cb) {
      chrome.storage.sync.get(gsbnCommon.defaultOpts, cb);
    }
}

gsbn.init();
