/*
 * jQuery Scrolltastic plugin 1.1
 * 
 * Copyright (c) 2010 Stephen Coley, DK New Media
 *
 * Licensed under MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


(function($){  
	$.fn.scrolltastic = function(options) {
		var timer;
		var mouseWheelActive;
		var defaults = {
			up: null,
			down: null,
			duration: "auto"
		};  
		var options = $.extend(defaults, options);
		
		if(options.up == null || options.down == null) {
			alert("Scrolltastic: You must set an 'up' and 'down' parameter for this plugin to work!")
		} else {
			
			var elem = this;
			
			var content = $(elem);
			var wrapper = content.parent();
			if(wrapper.css("position") == "static") {
				wrapper.css("position", "relative");
			}
			var wrapperHeight = wrapper.height();
			var contentHeight = content.height();
		
			$("#" + options.up).mousedown(function() {
				upMouseDown();
			});

			$("#" + options.up).mouseup(function() {
				mouseUp();
			});
		
			$("#" + options.down).mousedown(function() {
				downMouseDown();
			});

			$("#" + options.down).mouseup(function() {
				mouseUp();
			});

			content.mousewheel(function(event, delta, deltaX, deltaY) {
				if(mouseWheelActive == null) {
					$.clear(timer);
					if(delta > 0) {
						upMouseDown(content);
					} else {
						downMouseDown(content);
					}
					$.timeout(mouseUp, 100);
					mouseWheelActive = true;
				}
				return false;
			});

		}

		function upMouseDown() {
			if(options.duration == "auto") {
				var dis = $(content).position().top * -1;
				var dur = dis * 3;
			}
			console.log(dis + ":" + dur);
			$(content).stop().animate({
				top: "0px"
			}, dur, "linear");
		}
		
		function downMouseDown() {
			if(options.duration == "auto") {
				var dis = ($(content).position().top + contentHeight) - wrapperHeight;
				var dur = dis * 3;
			}
			console.log(dis + ":" + dur);
			$(content).stop().animate({
				top: (contentHeight - wrapperHeight) * -1
			}, dur, "linear");
		}

		function mouseUp() {
			content.stop();
			var top = $(content).position().top;
			if(top * -1 == contentHeight - wrapperHeight) {
				$("#" + options.down).hide();
			} else {
				$("#" + options.down).show();
			}
			if(top == 0) {
				$("#" + options.up).hide();
			} else {
				$("#" + options.up).show();
			}
			mouseWheelActive = null;
		}

	};
})(jQuery);
