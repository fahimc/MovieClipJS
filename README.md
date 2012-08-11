MovieClipJS
===========

Create MovieClips with Javascript using Spritesheets  
[http://fahimchowdhury.com/utensil/movieclipjs/](tutorial)
  
#Why use This?  
- Cross-browser compatibilty is always an issue for clients and everyone wants HTML 5 but that doesn't work for legacy browsers.
- Unlike other Frameworks/Toolkits this is very light and it can be implemented along with others such as JQuery.
#Limitations
- This does work in IE6 but it isnt built for it.
- HTML 5 provides dynamic creations/manipulation of shapes and lines. MovieClipJS only deals with spritesheets (pre-rendering).
#Where can I find it?
github.com/fahimc/MovieClipJS
#Setup
Create a PNG spritesheet and set it as the backgournd of a div.
#Attach
You need to attach the div to the MovieClipJS so the div can be setup.
MovieClip.attach(bird);
#Play the Animation
Call gotoAndPlay and provide it with the div,start frame, end frame and if you want to loop the animation.
MovieClip.gotoAndPlay(bird, 1, 5, true);
#Stop an Animation
Call gotoAndStop and provide it with the div and the frame to stop on. Alternatively use stop function and provide the div.
MovieClip.gotoAndStop(bird, 1);
MovieClip.stop(bird);
#Tween Animation
I use TweenLite which works on all browser but you can use any tween class.
TweenLite.to(bird, 3, {css : {left : "400px",top : "50px"},onComplete : showBox});
#Make it Faster!
Change the frameRate variable. The lower the value the faster the animation.
MovieClip.frameRate = 50;