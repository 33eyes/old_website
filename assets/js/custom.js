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
    PULL-DOWN TABS
	****************************************************************/
	// Hide the up button on page load
	$(document).ready(function() {
		$(".pulldown-btn .fa-angle-double-up").hide();
	});
	// Toggle the pull-downs
	$(".pulldown-btn").click(function(){
		$(this).siblings("div.pulldown-content").slideToggle();
		$(this).find(".fa-angle-double-down").toggle();
		$(this).find(".fa-angle-double-up").toggle();
	});
	
	
	/* *************************************************************
    PROJECTS FILTER
	****************************************************************/
	$("#projects-filter-cloud .projects-tag").click(function(){
		var techFiltersList = [];
		var checkIfAnyOn = 0;
		var checkIfAnyOff = 0;
		
		// Get the tech-used- class on this filter tag
		var classes = $(this).attr('class').split(' ');
		for (var i = 0; i < classes.length; i++) {
			var matches = /^tech\-used\-(.+)/.exec(classes[i]);
			if (matches != null) {
				var techusedclass = matches[1];
			}
		}
		
		// Test if filter tag is on or off
		if ( $(this).hasClass("projects-sel-off") ) {
			// If the filter tag was off
			
			// Remove the 'off' style from the tech term
			$(this).removeClass("projects-sel-off");
		} else {
			// If the filter tag was on
			
			// Add the 'off' style to the tech term
			$(this).addClass("projects-sel-off");
		}
		
		// Go through the tech-used filter tags, and make a list of which tags are on
		$("#projects-filter-cloud .projects-tag").each(function(){ 
			if ( $(this).hasClass("projects-sel-off") ) {
				checkIfAnyOff = 1;
			} else {
				checkIfAnyOn = 1;
				// Get the tech-used- class on this filter tag
				var classes = $(this).attr('class').split(' ');
				for (var i = 0; i < classes.length; i++) {
					var matches = /^tech\-used\-(.+)/.exec(classes[i]);
					if (matches != null) {
						var techusedclasson = matches[1];
					}
				}
				// Add this tech term to the list of tech terms for projects to show
				techFiltersList.push(techusedclasson);
			} 
		});
		
		//console.log("techFiltersList: " + techFiltersList);
		//console.log("checkIfAnyOn: " + checkIfAnyOn);
		//console.log("checkIfAnyOff: " + checkIfAnyOff);
		
		// Turn on or off the 'all' or 'none' buttons as appropriate
		if (checkIfAnyOn === checkIfAnyOff) {
			// Add the 'off' style to the 'all' button
			$("#content-filter-select-all").addClass("filter-all-off");
			// Add the 'off' style to the 'none' button
			$("#content-filter-deselect-all").addClass("filter-all-off");
			// Hide the placeholder, since some project cards will be shown
			$("#project-placeholder").addClass("hide");
		} else if (checkIfAnyOn === 1) {
			// Remove the 'off' style from the 'all' button
			$("#content-filter-select-all").removeClass("filter-all-off");
			// Add the 'off' style to the 'none' button
			$("#content-filter-deselect-all").addClass("filter-all-off");
			// Hide the placeholder, since some project cards will be shown
			$("#project-placeholder").addClass("hide");
		} else {
			// Add the 'off' style to the 'all' button
			$("#content-filter-select-all").addClass("filter-all-off");
			// Remove the 'off' style from the 'none' button
			$("#content-filter-deselect-all").removeClass("filter-all-off");
			// Show the placeholder, since no project cards will be shown
			$("#project-placeholder").removeClass("hide");
		}
		
		// Hide or show project cards according to the tech-used filter list
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
				for (var i = 0; i < techFiltersList.length; i++) {
					if (techFiltersList[i] === projecttechusedclass) {
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
	});
	
	// Clicking the 'all' tech-used projects filter button
	$("#content-filter-select-all").click(function(){
		// Turn on all tech-used filter tags
		$("#projects-filter-cloud .projects-tag").removeClass("projects-sel-off");
		$("#project-cards .projects-tag").removeClass("projects-sel-off");
		
		// Turn on the 'all' btn
		$("#content-filter-select-all").removeClass("filter-all-off");
		
		// Make sure the 'none' btn is off
		$("#content-filter-deselect-all").addClass("filter-all-off");
		
		// Show all cards
		$("#project-cards .project-card").show();
		
		// Make sure the placeholder is hidden
		$("#project-placeholder").addClass("hide");
	});
	
	// Clicking the 'none' tech-used projects filter button
	$("#content-filter-deselect-all").click(function(){
		// Turn off all tech-used filter tags
		$("#projects-filter-cloud .projects-tag").addClass("projects-sel-off");
		$("#project-cards .projects-tag").addClass("projects-sel-off");
		
		// Turn on the 'none' btn
		$("#content-filter-deselect-all").removeClass("filter-all-off");
		
		// Make sure the 'all' btn is off
		$("#content-filter-select-all").addClass("filter-all-off");
		
		// Hide all cards
		$("#project-cards .project-card").hide();
		
		// Show the placeholder
		$("#project-placeholder").removeClass("hide");
	});
	
	// Reset the tech-used projects filter when pull-down is closed
	$('#projects-section .fa-angle-double-up').on("click", function () {
		// Turn on all tech-used filter tags
		$("#projects-filter-cloud .projects-tag").removeClass("projects-sel-off");
		$("#project-cards .projects-tag").removeClass("projects-sel-off");
		
		// Turn on the 'all' btn
		$("#content-filter-select-all").removeClass("filter-all-off");
		
		// Make sure the 'none' btn is off
		$("#content-filter-deselect-all").addClass("filter-all-off");
		
		// Show all cards
		$("#project-cards .project-card").show();
		
		// Make sure the placeholder is hidden
		$("#project-placeholder").addClass("hide");
	});
	
	
	
	/* *************************************************************
    PROJECT CARDS EXPAND TABS
	****************************************************************/
	// Hide the up button on page load
	$(document).ready(function() {
		$(".project-card-expand-btn .fa-angle-double-up").hide();
	});
	// Toggle the pull-downs
	$(".project-card-expand-btn").click(function(){
		$(this).siblings("div.project-card-expand-content").slideToggle();
		$(this).find(".fa-angle-double-down").toggle();
		$(this).find(".fa-angle-double-up").toggle();
		
		$(this).closest(".project-card").toggleClass("expanded-project-card");
		
		$(this).siblings("div.project-card-expand-content").find(".carousel").carousel(0); 
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
	
	
	

	
	
	
	