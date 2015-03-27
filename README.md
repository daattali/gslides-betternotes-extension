# Google Slides Auto Resize Speaker Notes (Chrome extension)

_Dean Attali_    
_February-March 2015_    
_Source code available [on GitHub](https://github.com/daattali/gslides-betternotes-extension)_     
_Get the extension at the [Chrome Web Store](TODO)_  


## Description

The slide previews in the Speaker Notes window of Google Slides are tiny and unreadable. This extension dynamically resizes the slides based on the window size to make them useful.

If you've ever used Google Slides (or MS PowerPoint/anything similar), you may be aware of the Speaker Notes feature - it allows you to view the current and next slides as well as the text notes for the current slide . However, for some weird reason, the Speaker Notes in Google Slides only allocates a very small area for the slides preview, while giving the notes almost all the space. There is no possible way to resize the slide thumbnail, which makes the slide preview almost useless.

With this Chrome extension, the slide preview images will be automatically resized to take up most of the window becuase it just makes sense. You don't need 80% of your screen to show you the notes, you want to be able to see the slide and just dedicate a small portion to the notes. The resizing is dynamic and will happen if you drag the window to be smaller/larger. You can also specify how much space to give the notes (which means the slide previews get the rest of the space).


## Demo

If you don't have a Google Slides document to experiment with/verify this problem, you can test it out with [this sample Google Slides presentation](https://docs.google.com/presentation/d/18svsKPFNQrBLOSAmOouD410kX9fuaNp3e1K1GTTBLiU/edit?usp=sharing)

Here is a 30-second GIF that shows a demo of this extension:

![Demo](./img/doc/demo.gif)

## Motivation

As preparation for my committee meeting, I used Google Slides to make my presentation. Shortly after starting, before havin any actual content in my presentation, I noticed that the Speaker Notes window is basically useless in its current form because of how small the slide previes are. After fiddling with the speaker notes window JavaScript and CSS for a couple hours, I decided that a much better use of my time instead of working on my committee meeting would be to make this extension. I then proceeded to spend the next several hours making the draft version of this extension, and thus successfully procrastinated from my real work for many many hours!

On a more serious note - I do think this is a very essential tool for anyone who uses Google Slides to give presentations.

## Other extensions

[GitHub Diff Navigator](https://github.com/daattali/github-diff-navigator-extension) - Chrome extension that allows you to easily navigate through the changes in a file that has been edited on GitHub.

[Smileyfy My Facebook](https://github.com/daattali/smileyfy-my-facebook-extension) - Chrome extension that adds infinite happiness to your Facebook browsing, plus a little bonus rickrolling :) 

---

To see my other projects, visit [http://deanattali.com/projects](http://deanattali.com/projects)
