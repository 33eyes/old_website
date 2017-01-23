/* *************************************************************
    Custom JS scripts
****************************************************************/

jQuery(function($) {

	/* *************************************************************
    CUSTOM LINKS SCROLLING FUNCTION 
	****************************************************************/
	/*=============================================================
		Author URI: www.binarytheme.com
		License: Commons Attribution 3.0
		http://creativecommons.org/licenses/by/3.0/
		100% To use For Personal And Commercial Use.
		IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US	   
	===============================================================*/
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


    /* *************************************************************
    SCROLL-TO-TOP BUTTON
	****************************************************************/
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
		
		
	/* *************************************************************
    TAG CLOUD WITH FILTERS AND SLIDER MENU
	****************************************************************/
    
	// Attach cloud tag size category classes based on class tag size classes
	$(document).ready(function() {
		$(".tag-size-1").addClass("tag-cat-small");
		$(".tag-size-2").addClass("tag-cat-small");
		$(".tag-size-3").addClass("tag-cat-small");
		$(".tag-size-4").addClass("tag-cat-medium");
		$(".tag-size-5").addClass("tag-cat-medium");
		$(".tag-size-6").addClass("tag-cat-medium");
		$(".tag-size-7").addClass("tag-cat-medium");
		$(".tag-size-8").addClass("tag-cat-large");
		$(".tag-size-9").addClass("tag-cat-large");
		$(".tag-size-10").addClass("tag-cat-large");
	});

	// SKILLS section filters
	var TechFiltersList = [];
	var ExpFiltersList = [];
	
	var ProjectsFilteredList = [];
	$(document).ready(function() {
		$("#projects-filter ul li label").find('input:checkbox').each(function(){ 
			var initProjectvalue = $(this).val();
			ProjectsFilteredList.push(initProjectvalue);
		});
	});
	
    $(".filter-box ul li label").click(function(){
		var filterid = $(this).closest(".filter-box").prop("id");
		if ( filterid === "tech-area-filter" ) {
			// Update a list of tech values to filter out
			var techvalue = $(this).find('input:checkbox').val();
			if ( $(this).find('input:checkbox').is(':checked') ) { 
				TechFiltersList = jQuery.grep(TechFiltersList, function(value) {
					return value != techvalue;
				});
			} else {
				TechFiltersList.push(techvalue);
			}
		} else if ( filterid === "experience-filter" ) {
			// Update a list of experience values to filter out
			var expvalue = $(this).find('input:checkbox').val();
			if ( $(this).find('input:checkbox').is(':checked') ) { 
				ExpFiltersList = jQuery.grep(ExpFiltersList, function(value) {
					return value != expvalue;
				});
			} else {
				ExpFiltersList.push(expvalue);
			}
		} else if ( filterid === "projects-filter" ) {
			// Update a list of project tech values to filter in
			var projecttechvalue = $(this).find('input:checkbox').val();
			if ( $(this).find('input:checkbox').is(':checked') ) { 
				ProjectsFilteredList.push(projecttechvalue);
			} else {
				ProjectsFilteredList = jQuery.grep(ProjectsFilteredList, function(value) {
					return value != projecttechvalue;
				});
			}
			console.log("ProjectsFilteredList: " + ProjectsFilteredList);
		}
	
		if ( (filterid === "tech-area-filter") || (filterid === "experience-filter") ) {
			// Hide tag cloud tags that match either the TechFiltersList or the ExpFiltersList, and show those that dont.
			$(".skills.tag-cloud a.tag-cat").each(function(){
				var inFiltered;
				for (var i = 0; i < TechFiltersList.length; ++i) {
					// Check if a tag cloud tag is in TechFiltersList
					if ( $(this).hasClass("tag-cat-"+TechFiltersList[i]) ) {
						inFiltered = 1;
					}
				}
				for (var j = 0; j < ExpFiltersList.length; ++j) {
					// Check if a tag cloud tag is in ExpFiltersList
					if ( $(this).hasClass("tag-cat-"+ExpFiltersList[j]) ) {
						inFiltered = 1;
					}
				}
				if (inFiltered === 1) {
					$(this).hide("fast");
				} else {
					$(this).show();
				}
			});
		} else if ( filterid === "projects-filter" ) {
			// Show project cards that match the ProjectsFilteredList, and hide those that dont.
			$("#project-cards .project-card").each(function(){
				var showThisProjectCard = 0;
				// Go through tech used on this project
				$(this).find(".project-tech-used .projects-tag").each(function(){ 
					// Get the tech-used- class on this project tag
					var classes = $(this).attr('class').split(' ');
					for (var i = 0; i < classes.length; i++) {
						var matches = /^tech\-used\-(.+)/.exec(classes[i]);
						if (matches != null) {
							var projecttechusedclass = matches[1];
						}
					}
					$(this).addClass("projects-sel-off");
						
					// Is it on the list of selected tech tags?
					for (var i = 0; i < ProjectsFilteredList.length; i++) {
						if (ProjectsFilteredList[i] === projecttechusedclass) {
							showThisProjectCard = 1;
							$(this).removeClass("projects-sel-off");
						}
					}
				});
				
				// Hide or show this project card
				if (showThisProjectCard === 1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			// Show the placeholder if all cards were filtered out.
			if ( ProjectsFilteredList.length === 0 ) {
				$("#project-placeholder").removeClass("hide");
			} else {
				$("#project-placeholder").addClass("hide");
			}
		}
	});
	
	
	
	// Show filter select-all button on hover
	jQuery( ".filter-box" ).hover(function() {
		jQuery(this).find("i.fa-check-square-o").removeClass('hide');
	},
	function() {
		jQuery(this).find("i.fa-check-square-o").addClass('hide');
	});
	
	
    $(".filter-box i.fa-check-square-o").click(function(){
		var clicks = $(this).data('clicks');
		if (clicks) {
			// Check all checkboxes in this group
			$(this).closest(".filter-box").find("input:checkbox").prop('checked', true);
			// Set opacity on this button
			$(this).css('opacity', '1');
			// Update the filter list
			var filterid = $(this).closest(".filter-box").prop("id");
			if ( filterid === "tech-area-filter" ) { 
				TechFiltersList = [];
			} else if ( filterid === "experience-filter" ) {
				ExpFiltersList = [];
			} else if ( filterid === "projects-filter" ) {
				ProjectsFilteredList = [];
				$(this).closest(".filter-box").find('input:checkbox').each(function(){ 
					var initProjectvalue = $(this).val();
					ProjectsFilteredList.push(initProjectvalue);
				});
			}
		} else {
			// Uncheck all checkboxes in this group
			$(this).closest(".filter-box").find("input:checkbox").prop('checked', false);
			// Set opacity on this button
			$(this).css('opacity', '0.5');
			// Update the filter lists
			var filterid = $(this).closest(".filter-box").prop("id");
			if ( filterid === "tech-area-filter" ) { 
				TechFiltersList = [];
				$(this).closest(".filter-box").find('input:checkbox').each(function() {
					var techvalue = $(this).val();
					TechFiltersList.push(techvalue);
				});
			} else if ( filterid === "experience-filter" ) {
				ExpFiltersList = [];
				$(this).closest(".filter-box").find('input:checkbox').each(function() {
					var expvalue = $(this).val();
					ExpFiltersList.push(expvalue);
				});
			} else if ( filterid === "projects-filter" ) {
				ProjectsFilteredList = [];
			}
		}
		$(this).data("clicks", !clicks);
		
		if ( (filterid === "tech-area-filter") || (filterid === "experience-filter") ) {
			// Hide tag cloud tags that match either the TechFiltersList or the ExpFiltersList, and show those that dont.
			$(".skills.tag-cloud a.tag-cat").each(function(){
				var inFiltered;
				for (var i = 0; i < TechFiltersList.length; ++i) {
					// Check if a tag cloud tag is in TechFiltersList
					if ( $(this).hasClass("tag-cat-"+TechFiltersList[i]) ) {
						inFiltered = 1;
					}
				}
				for (var j = 0; j < ExpFiltersList.length; ++j) {
					// Check if a tag cloud tag is in ExpFiltersList
					if ( $(this).hasClass("tag-cat-"+ExpFiltersList[j]) ) {
						inFiltered = 1;
					}
				}
				if (inFiltered === 1) {
					$(this).hide("fast");
				} else {
					$(this).show();
				}
			});
		} else if ( filterid === "projects-filter" ) {
			// Show project cards that match the ProjectsFilteredList, and hide those that dont.
			$("#project-cards .project-card").each(function(){
				var showThisProjectCard = 0;
				// Go through tech used on this project
				$(this).find(".project-tech-used .projects-tag").each(function(){ 
					// Get the tech-used- class on this project tag
					var classes = $(this).attr('class').split(' ');
					for (var i = 0; i < classes.length; i++) {
						var matches = /^tech\-used\-(.+)/.exec(classes[i]);
						if (matches != null) {
							var projecttechusedclass = matches[1];
						}
					}
					$(this).addClass("projects-sel-off");
						
					// Is it on the list of selected tech tags?
					for (var i = 0; i < ProjectsFilteredList.length; i++) {
						if (ProjectsFilteredList[i] === projecttechusedclass) {
							showThisProjectCard = 1;
							$(this).removeClass("projects-sel-off");
						}
					}
				});
				
				// Hide or show this project card
				if (showThisProjectCard === 1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			// Show the placeholder if all cards were filtered out.
			if ( ProjectsFilteredList.length === 0 ) {
				$("#project-placeholder").removeClass("hide");
			} else {
				$("#project-placeholder").addClass("hide");
			}
		}
	});
	
	
	
	



	/* *************************************************************
    PROJECT CARDS CONTENT - BEFORE and AFTER buttons
	****************************************************************/
	// Hide the BEFORE image on page load
	$(document).ready(function() {
		$(".carousel .carousel-inner .item img.before-version-img").hide();
	});
	// BEFORE button
	$(".carousel .carousel-inner .item div.select-version.before-version").click(function(){
		$(this).removeClass("select-version-off");
		$(this).siblings("div.select-version.updated-version").addClass("select-version-off");
		$(this).closest(".item").find("img.updated-version-img").hide();
		$(this).closest(".item").find("img.before-version-img").show();
	});
	// AFTER button
	$(".carousel .carousel-inner .item div.select-version.updated-version").click(function(){
		$(this).removeClass("select-version-off");
		$(this).siblings("div.select-version.before-version").addClass("select-version-off");
		$(this).closest(".item").find("img.before-version-img").hide();
		$(this).closest(".item").find("img.updated-version-img").show();
	});
	
	
});	
	
	
	

	
	
	
	