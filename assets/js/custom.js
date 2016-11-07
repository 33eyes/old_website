
/*=============================================================
    Authour URI: www.binarytheme.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


jQuery(function($) {

    /*==========================================
    CUSTOM SCRIPTS
    =====================================================*/

    // CUSTOM LINKS SCROLLING FUNCTION 

    $('a[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
       && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target
            || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body')
                .animate({ scrollTop: targetOffset }, 800); //set scroll speed here
                return false;
            }
        }
    });

    /*==========================================
  PARALLAX SCRIPTS
   =====================================================*/

    
    $('.parallax').scrolly({ bgParallax: true });

    /*==========================================
    WRITE  YOUR  SCRIPTS BELOW
    =====================================================*/


    /*==========================================
    SCROLL-TO-TOP BUTTON
    =====================================================*/
	$(document).ready(function() {
            // Show or hide the sticky footer button
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $('.go-top').fadeIn(500);
                } else {
                    $('.go-top').fadeOut(300);
                }
            });

            // Animate the scroll to top
            $('.go-top').click(function(event) {
                event.preventDefault();

                $('html, body').animate({scrollTop: 0}, 300);
            })
        });
		
	
    /*==========================================
    JQUERY TAG CLOUD
    =====================================================*/
	/*
	 * jquery.tagcloud.js
	 * A Simple Tag Cloud Plugin for JQuery
	 *
	 * https://github.com/addywaddy/jquery.tagcloud.js
	 * created by Adam Groves
	 */
	/*global jQuery*/
	"use strict";

	var compareWeights = function(a, b)
	{
		return a - b;
	};

	// Converts hex to an RGB array
	var toRGB = function(code) {
		if (code.length === 4) {
			code = code.replace(/(\w)(\w)(\w)/gi, "\$1\$1\$2\$2\$3\$3");
		}
		var hex = /(\w{2})(\w{2})(\w{2})/.exec(code);
		return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
	};

	// Converts an RGB array to hex
	var toHex = function(ary) {
		return "#" + jQuery.map(ary, function(i) {
			var hex =  i.toString(16);
			hex = (hex.length === 1) ? "0" + hex : hex;
			return hex;
		}).join("");
	};

	var colorIncrement = function(color, range) {
		return jQuery.map(toRGB(color.end), function(n, i) {
			return (n - toRGB(color.start)[i])/range;
		});
	};

	var tagColor = function(color, increment, weighting) {
		var rgb = jQuery.map(toRGB(color.start), function(n, i) {
			var ref = Math.round(n + (increment[i] * weighting));
			if (ref > 255) {
				ref = 255;
			} else {
				if (ref < 0) {
					ref = 0;
				}
			}
			return ref;
		});
		return toHex(rgb);
	};

	$.fn.tagcloud = function(options) {
		var opts = $.extend({}, $.fn.tagcloud.defaults, options);
		var tagWeights = this.map(function(){
      return $(this).attr("rel");
		});
		tagWeights = jQuery.makeArray(tagWeights).sort(compareWeights);
		var lowest = tagWeights[0];
		var highest = tagWeights.pop();
		var range = highest - lowest;
		if(range === 0) {range = 1;}
		// Sizes
		var fontIncr, colorIncr;
		if (opts.size) {
			fontIncr = (opts.size.end - opts.size.start)/range;
		}
		// Colors
		if (opts.color) {
			colorIncr = colorIncrement (opts.color, range);
		}
		return this.each(function() {
			var weighting = $(this).attr("rel") - lowest;
			if (opts.size) {
				$(this).css({"font-size": opts.size.start + (weighting * fontIncr) + opts.size.unit});
			}
			if (opts.color) {
				$(this).css({"color": tagColor(opts.color, colorIncr, weighting)});
			}
		});
	};
/*
	// example size and color settings
	$.fn.tagcloud.defaults = {
		size: {start: 14, end: 18, unit: "pt"},
		color: {start: '#cde', end: '#f52'}
	};
*/
	
	// SKILLS and INTERESTINGNESS tag clouds
	$.fn.tagcloud.defaults = {
		size: {start: 12, end: 30, unit: 'pt'}
	};
	$(function () {
		$('.tag-cloud a').tagcloud();
	});
	
	

    /*==========================================
    FILTERING FOR THE TAG CLOUDS
    =====================================================*/
	$(".tag-cloud .fa-square").click(function(){
		// Get the tag-cat- class on this element
		var classes = $(this).attr('class').split(' ');
		for (var i = 0; i < classes.length; i++) {
			var matches = /^tag\-cat\-(.+)/.exec(classes[i]);
			if (matches != null) {
				var tagcatclass = matches[1];
			}
		}
		
		// Get the id of the cloud class parent of this element
		var cloudid = $(this).closest(".cloud").attr("id");

		if ($(this).hasClass("opaque-half")) {
			$(".tag-cloud."+cloudid+" .fa-square").addClass("opaque-half");
			$(this).removeClass("opaque-half");
				
			// Hide tags that do not match the selected tag-cat- class, and show those that do.
			$(".tag-cloud."+cloudid+" a.tag-cat").hide("fast");
			$(".tag-cloud."+cloudid+" a.tag-cat-"+tagcatclass).show("fast");
			
			// Show tag prefix in the section title
			$("."+cloudid+".prefix .tag-cat").hide("fast");
			$("."+cloudid+".prefix .tag-cat-"+tagcatclass).show("fast");
		} else {
			$(".tag-cloud."+cloudid+" .fa-square").toggleClass("opaque-half");
			$(this).removeClass("opaque-half");
			
			// Hide tags that do not match the selected tag-cat- class, and show those that do.
			$(".tag-cloud."+cloudid+" a.tag-cat").toggle("fast");
			$(".tag-cloud."+cloudid+" a.tag-cat-"+tagcatclass).show("fast");
			
			// Show tag prefix in the section title
			$("."+cloudid+".prefix .tag-cat").not("."+cloudid+".prefix .tag-cat-"+tagcatclass).hide("fast");
			$("."+cloudid+".prefix .tag-cat-"+tagcatclass).toggle("fast");
		}
		
		// Change cursor to pointer on tag cloud title when filtered
		$("#"+cloudid+"-title").css("cursor", "pointer");
	});
	
	// Remove filtering from the Skills tag cloud
	$("#skills-title").click(function(){
		$(".tag-cloud.skills .fa-square").removeClass("opaque-half");
		$(".tag-cloud.skills a.tag-cat").show("fast");
		$(".skills.prefix .tag-cat").hide("fast");
		
		// Change cursor to browser default
		$("#skills-title").css("cursor", "auto");
	});
	
	// Remove filtering from the Interestingness tag cloud
	$("#interestingness-title").click(function(){
		$(".tag-cloud.interestingness .fa-square").removeClass("opaque-half");
		$(".tag-cloud.interestingness a.tag-cat").show("fast");
		$(".interestingness.prefix .tag-cat").hide("fast");
		
		// Change cursor to browser default
		$("#interestingness-title").css("cursor", "auto");
	});

	
	
	// Fade polaroid images on hover
	$(".polaroids li").hover(function(){
		$(this).find(".project-img").toggleClass("project-img-fade");
	});
	
	
	
	
	
	
	// Bring image to front on click
	$("#price-list-updated h4").click(function(){
		$("#price-list-updated").addClass("bring-to-front");
		$("#price-list-updated").removeClass("fade");
		$("#price-list-before-update").removeClass("bring-to-front");
		$("#price-list-before-update").addClass("fade");
	});
	$("#price-list-before-update h4").click(function(){
		$("#price-list-before-update").addClass("bring-to-front");
		$("#price-list-before-update").removeClass("fade");
		$("#price-list-updated").removeClass("bring-to-front");
		$("#price-list-updated").addClass("fade");
	});
	
	// Bring image to front on click
	$("#featured-artists-updated h4").click(function(){
		$("#featured-artists-updated").addClass("bring-to-front");
		$("#featured-artists-updated").removeClass("fade");
		$("#featured-artists-before-update").removeClass("bring-to-front");
		$("#featured-artists-before-update").addClass("fade");
	});
	$("#featured-artists-before-update h4").click(function(){
		$("#featured-artists-before-update").addClass("bring-to-front");
		$("#featured-artists-before-update").removeClass("fade");
		$("#featured-artists-updated").removeClass("bring-to-front");
		$("#featured-artists-updated").addClass("fade");
	});
});	
	
	
	
	// Project Accordion js
	/* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. The "active" class is used to add a background color to the current button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].onclick = function(){
			this.classList.toggle("active");
			this.nextElementSibling.classList.toggle("show");
		}
	}

	
	
	
	