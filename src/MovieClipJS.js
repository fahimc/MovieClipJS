var MovieClip = {
	clips : [],
	frameRate : 100,
	timer : null,
	TO : "mc_to",
	FROM : "mc_from",
	BG_SIZE : "bg_size",
	LOOP : "mc_loop",
	attach : function(mc) {

		mc.setAttribute("currentFrame", this.currentFrame(mc));
		mc.setAttribute(this.TO, 0);
		mc.setAttribute(this.FROM, 0);
		mc.setAttribute(this.LOOP, false);
	},
	stop : function(mc) {
		for(var a = 0; a < this.clips.length; a++) {
			if(this.clips[a] == mc.id) {
				mc.setAttribute(this.TO, 0);
				mc.setAttribute(this.FROM, 0);
				mc.setAttribute(this.LOOP, false);
				this.clips.splice(a, 1);
				if(this.clips.length == 0) {
					clearInterval(this.timer);
					this.timer = null;
				}
				return;
			}
		}
	},
	currentFrame : function(mc) {
		var size = this.getBGSize(mc);
		mc.setAttribute(this.BG_SIZE, "{width:" + size.width + ",height:" + size.height + "}");
		var width = this.getStyle(mc, "width");
		var left = Math.abs(this.getPos(mc).left);
		return Math.round(width / left);
	},
	gotoAndStop : function(mc, frame) {
		mc.setAttribute(this.TO, 0);
		mc.setAttribute(this.FROM, 0);
		mc.setAttribute(this.LOOP, false);
		this.setFrame(mc, frame);
	},
	gotoAndPlay : function(mc, from, to, loop) {
		mc.setAttribute(this.TO, to);
		mc.setAttribute(this.FROM, from);
		mc.setAttribute(this.LOOP, loop ? loop : false);
		this.setFrame(mc, from);
		this.clips.push(mc.id);
		var par = this;
		if(!this.timer) {
			this.timer = setInterval(function() {
				par.onEnterFrame()
			}, this.frameRate);
		}
	},
	onEnterFrame : function() {
		for(var a = 0; a < this.clips.length; a++) {
			var mc = document.getElementById(this.clips[a]);
			var to = mc.getAttribute(this.TO);
			var from = mc.getAttribute(this.FROM);
			var loop = mc.getAttribute(this.LOOP);
			var current = mc.getAttribute("currentFrame");
			current++;

			if(current <= to || String(loop) == "true") {
				this.setFrame(mc, current, String(loop) == "true" ? from : null);
			} else {
				this.clips.splice(a, 1);
				mc.setAttribute(this.TO, 0);
				mc.setAttribute(this.FROM, 0);
				if(this.clips.length == 0) {
					clearInterval(this.timer);
					this.timer = null;
				}
			}

		}
	},
	setFrame : function(mc, frame, loop) {
	
		var obj = mc.getAttribute(this.BG_SIZE);
		var size = eval("(" + obj + ')');
		var width = this.getStyle(mc, "width");
		var left = (width * frame);
		if(left > size.width) {
			if(loop) {
				frame = loop;
			} else {
				frame = (size.width / width);
			}
			left = loop ? loop : (size.width / width) * width;
		}
		var top = this.getPos(mc).top;
		mc.style.backgroundPositionY =  top + "px";
		mc.style.backgroundPositionX = "-" + left + "px ";
		mc.setAttribute("currentFrame", frame);
	},
	getPos : function(mc) {
		
		var y = this.getStyle(mc, "backgroundPositionY");
		
		var x = this.getStyle(mc, "backgroundPositionX");
		if(y) {
			y= this.replaceSuffix(y);
		} else {
			y = "0";
		}
		if(x) {
			x = this.replaceSuffix(x);
		} else {
			x = "0";
		}
		
		return {
			left : x,
			top : y
		};
	},
	replaceSuffix : function(value) {
		value = value.replace("%", "");
		value = value.replace("px", "");
		return value;
	},
	getBGSize : function(mc) {
		var imageSrc = this.getStyle(mc, "backgroundImage");
		imageSrc = imageSrc.replace("url(", "");
		imageSrc = imageSrc.replace(")", "");
		imageSrc = imageSrc.replace('"', "");
		imageSrc = imageSrc.replace('"', "");

		var image = new Image();
		image.src = imageSrc;
		var width = image.width, height = image.height;
		image = null;
		return {
			width : width,
			height : height
		};
	},
	getStyle : function(el, cssprop) {
		if(el.currentStyle)//IE
			return el.currentStyle[cssprop] ? el.currentStyle[cssprop].replace("px", "") : "";
		else if(document.defaultView && document.defaultView.getComputedStyle)//Firefox
			return document.defaultView.getComputedStyle(el, "")[cssprop].replace("px", "");
		else//try and get inline style
			return el.style[cssprop].replace("px", "");
	}
};
