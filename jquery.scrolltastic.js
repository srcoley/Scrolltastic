/*
 * jQuery Scrolltastic plugin 1.0
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
		var defaults = {
			up: null,
			down: null,
			duration: 1000
		};  
		var options = $.extend(defaults, options);
		
		if(options.up == null || options.down == null) {
			alert("Scrolltastic: You must set an 'up' and 'down' parameter for this plugin to work!")
		} else {
			
			var elem = this;
			
			var content = $(elem);
			if(content.css("position") == "static") {
				content.css("position", "relative");
			}
			var wrapper = content.parent();
			if(wrapper.css("position") == "static") {
				wrapper.css("position", "relative");
			}
			var wrapperHeight = wrapper.height();
			var contentHeight = content.height();
		
			var sections = Math.floor(contentHeight/wrapperHeight);
			var sectionR = contentHeight%wrapperHeight;
		
			var i = 0;
			var positions = [];
			while(i < sections) {
				if(i == 0) {
					positions[i] = content.position().top;
				} else {
					positions[i] = wrapperHeight * -i; 
				}
				i++;
			}
		
			if(sectionR != 0) {
				var nextI = positions.length;
				positions[nextI] = positions[nextI - 1] - sectionR;
			}
		
			$("#" + options.up).click(function() {
			    scrollUp(content, positions);
				 return false;
			});
		
			$("#" + options.down).click(function() {
				scrollDown(content, positions);
				return false;
			});
		
			if(content.position().top == positions[0]) {
				$("#" + options.up).hide();
			}
		}
		
		function scrollUp(content, positions) {
			var pos = content.position().top;
			var x;
			for(x in positions) {
				if(positions[x] == pos) {
					break;
				}
			}
			if(x == 0 || x < 0) {
				$("#" + options.up).hide();
			} else {
				$("#" + options.down).show();
				x--;
				content.animate({
					top: positions[x] + "px"
				}, options.duration);
			}
			
			if(x == 0) {
				$("#" + options.up).hide();
			}
			
			return false;
		}
		
		function scrollDown(content, positions) {
			var pos = content.position().top;
			var x;
			for(x in positions) {
				if(positions[x] == pos) {
					break;
				}
			}
			var lastIndex = positions.length - 1;
			if(x == lastIndex || x > lastIndex) {
				$("#" + options.down).hide();
			} else {
				$("#" + options.up).show();
				x++;
				content.animate({
					top: positions[x] + "px"
				}, options.duration);
			}
			
			if(x == lastIndex) {
				$("#" + options.down).hide();
			}
			
			return false;
		}
		
	};
})(jQuery);
