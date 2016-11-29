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
	
	// TAG CLOUD FILTERING BY CATEGORY
    var cloudid;
	var filterid;
	var colorFiltersList = [];
	var sizeFiltersList = [];
	
    $(".tag-cloud .fa-square").click(function(){
		// Check that filter button is available for selection
		if ( !($(this).hasClass("not-available")) ) {
			// Get the tag-cat- class on this element
			var classes = $(this).attr('class').split(' ');
			for (var i = 0; i < classes.length; i++) {
				var matches = /^tag\-cat\-(.+)/.exec(classes[i]);
				if (matches != null) {
					var tagcatclass = matches[1];
				}
			}
			
			// Get the id of the cloud class parent of this element
			cloudid = $(this).closest(".cloud").attr("id");
			
			// Get the id of the filter-box class parent of this element
			filterid = $(this).closest(".filter-box").attr("id");
			
			// Update the filter boxes
			if ( $(this).closest(".filter-box").hasClass("filter-by-color") ) {
				if ($(this).hasClass("filter-sel-off") || colorFiltersList.length === 0) {
					// If this filter selection was deselected before clicking, OR
					// if nothing/everything was selected before clicking...
					
					// Mark only this filter button as selected in this filter group
					$("#"+filterid+" .tag-cloud."+cloudid+" .fa-square").addClass("filter-sel-off");
					$(this).removeClass("filter-sel-off");
					
					// Show tag prefix in the section title
					$("#"+filterid+" ."+cloudid+".prefix .tag-cat").hide(0);
					$("#"+filterid+"-title").hide(0);
					$("#"+filterid+" ."+cloudid+".prefix .tag-cat-"+tagcatclass).show(0);
				} else {
					// If this filter selection was selected before clicking...
					
					// Mark all filter buttons as selected in this filter group
					$("#"+filterid+" .tag-cloud."+cloudid+" .fa-square").removeClass("filter-sel-off");
					
					// Show tag prefix in the section title
					$("#"+filterid+" ."+cloudid+".prefix .tag-cat").hide(0);
					$("#"+filterid+"-title").show(0);
					
					// Remove any NA classes on filter options from the size filter
					$(".filter-by-size .tag-cloud."+cloudid+" .fa-square").removeClass("not-available");
				}
				
				// Gather filter selections in the color filter box
				// Reset the colorFiltersList
				colorFiltersList = [];
				$('.filter-by-color .filter-sel-off').each(function(){
					// Get the tag-cat- class of each filter-sel-off class element
					var filterClasses = $(this).attr('class').split(' ');
					for (var i = 0; i < filterClasses.length; i++) {
						var filterMatches = /^tag\-cat\-(.+)/.exec(filterClasses[i]);
						if (filterMatches != null) {
							var filtertagcatclass = filterMatches[1];
						}
					}
					// Add the matched tag-cat- class to colorFiltersList
					colorFiltersList.push(filtertagcatclass);
				});
			} else if ( $(this).closest(".filter-box").hasClass("filter-by-size") ) {
				if ($(this).hasClass("filter-sel-off") || sizeFiltersList.length === 0) {
					// If this filter selection was deselected before clicking, OR
					// if nothing/everything was selected before clicking...
					
					// Mark only this filter button as selected in this filter group
					$("#"+filterid+" .tag-cloud."+cloudid+" .fa-square").addClass("filter-sel-off");
					$(this).removeClass("filter-sel-off");
					
					// Show tag prefix in the section title
					$("#"+filterid+" ."+cloudid+".prefix .tag-cat").hide(0);
					$("#"+filterid+"-title").hide(0);
					$("#"+filterid+" ."+cloudid+".prefix .tag-cat-"+tagcatclass).show(0);
				
				} else {
					// If this filter selection was selected before clicking...
					
					// Mark all filter buttons as selected in this filter group
					$("#"+filterid+" .tag-cloud."+cloudid+" .fa-square").removeClass("filter-sel-off");
					
					// Show tag prefix in the section title
					$("#"+filterid+" ."+cloudid+".prefix .tag-cat").hide(0);
					$("#"+filterid+"-title").show(0);
					
					// Remove any NA classes on filter options from the color filter
					$(".filter-by-color .tag-cloud."+cloudid+" .fa-square").removeClass("not-available");
				}
				
				// Gather filter selections in the size filter box
				// Reset the sizeFiltersList
				sizeFiltersList = [];
				$('.filter-by-size .filter-sel-off').each(function(){
					// Get the tag-cat- class of each filter-sel-off class element
					var filterClasses = $(this).attr('class').split(' ');
					for (var i = 0; i < filterClasses.length; i++) {
						var filterMatches = /^tag\-cat\-(.+)/.exec(filterClasses[i]);
						if (filterMatches != null) {
							var filtertagcatclass = filterMatches[1];
						}
					}
					// Add the matched tag-cat- class to sizeFiltersList
					sizeFiltersList.push(filtertagcatclass);
				});
			} else {
				console.log("OOPS!: need to add filter type to a filter box somewhere.");
			}

			
			// Hide tag cloud tags that match the colorFiltersList or sizeFiltersList, and show those that don't.
			$(".tag-cloud."+cloudid+" a.tag-cat").each(function(){
				var inFiltered;
				var i;
				for (i = 0; i < colorFiltersList.length; ++i) {
					// Check if a tag cloud tag is in colorFiltersList
					if ( $(this).hasClass("tag-cat-"+colorFiltersList[i]) ) {
						inFiltered = 1;
					}
				}
				var j;
				for (j = 0; j < sizeFiltersList.length; ++j) {
					// Check if a tag cloud tag is in sizeFiltersList
					if ( $(this).hasClass("tag-cat-"+sizeFiltersList[j]) ) {
						inFiltered = 1;
					}
				}
				if (inFiltered === 1) {
					$(this).hide("fast");
				} else {
					$(this).show();
				}
			});
			
			// Turn off filter buttons that become unavailable based on current selection
			// Look at color filter selections, and gather a list of size filter selections that should stay on
			var sizeTagsAvailable = [];
			if ( colorFiltersList.length != 0 ) {
				// Go through all tags that match the selection in current filter
				// and mark any unavailable options in the 2nd filter.
				$(".tag-cloud."+cloudid+" a.tag-cat.tag-cat-"+tagcatclass).each(function(){
					// Make a list of all tag-cat- classes of shown tags in the cloud
					// Get the tag-cat- class of the shown tag
					var tagClasses = $(this).attr('class').split(' ');
					for (var i = 0; i < tagClasses.length; i++) {
						var tagMatches = /^tag\-cat\-(.+)/.exec(tagClasses[i]);
						
						if (tagMatches != null) {
							if (tagMatches[1] === "small" || tagMatches[1] === "medium" || tagMatches[1] === "large") {
								var tagcatclassSize = tagMatches[1];
								// Add the matched tag-cat- class 
								sizeTagsAvailable.push(tagcatclassSize);
							}
						}
					}
				});
			}
			// Look at size filter selections, and gather a list of color filter selections that should stay on
			var colorTagsAvailable = [];
			if ( sizeFiltersList.length != 0 ) {
				// Go through all tags that match the selection in current filter
				// and mark any unavailable options in the 2nd filter.
				$(".tag-cloud."+cloudid+" a.tag-cat.tag-cat-"+tagcatclass).each(function(){
					// Make a list of all tag-cat- classes of shown tags in the cloud
					// Get the tag-cat- class of the shown tag
					var tagClasses = $(this).attr('class').split(' ');
					for (var i = 0; i < tagClasses.length; i++) {
						var tagMatches = /^tag\-cat\-(.+)/.exec(tagClasses[i]);
						
						if (tagMatches != null) {
							if ( !(tagMatches[1] === "small" || tagMatches[1] === "medium" || tagMatches[1] === "large") ) {
								var tagcatclassColor = tagMatches[1];
								// Add the matched tag-cat- class 
								colorTagsAvailable.push(tagcatclassColor);
							}
						}
					}
				});
			}
			
			if ( $(this).closest(".filter-box").hasClass("filter-by-color") && colorFiltersList.length != 0 ) {
				// Go through the size filter buttons, and turn off those that aren't on the sizeTagsAvailable list
				$(".filter-by-size .tag-cloud."+cloudid+" .fa-square").each(function(){ 
					var inTagCloudSize;
					var i;
					for (i = 0; i < sizeTagsAvailable.length; ++i) {
						// Check if a tag cloud tag is in sizeTagsAvailable
						if ( $(this).hasClass("tag-cat-"+sizeTagsAvailable[i]) ) {
							inTagCloudSize = 1;
						}
					}
					
					if (inTagCloudSize != 1) {
						$(this).addClass("not-available");
					} else {
						$(this).removeClass("not-available");
					}
				});
			} else if ( $(this).closest(".filter-box").hasClass("filter-by-size") && sizeFiltersList.length != 0 ) {
				// Go through the color filter buttons, and turn off those that aren't on the colorTagsAvailable list
				$(".filter-by-color .tag-cloud."+cloudid+" .fa-square").each(function(){ 
					var inTagCloudColor;
					var i;
					for (i = 0; i < colorTagsAvailable.length; ++i) {
						// Check if a tag cloud tag is in colorTagsAvailable
						if ( $(this).hasClass("tag-cat-"+colorTagsAvailable[i]) ) {
							inTagCloudColor = 1;
						}
					}
					
					if (inTagCloudColor != 1) {
						$(this).addClass("not-available");
					} else {
						$(this).removeClass("not-available");
					}
				});
			} else if ( colorFiltersList.length === 0 && sizeFiltersList.length === 0 ) {
				$(".tag-cloud."+cloudid+" .fa-square").removeClass("not-available");
			}
			
		}
	});
	
	// Reset the tag cloud and filters when pull-down is closed
	$('#skills-section .fa-angle-double-up').on("click", function () {
		// Reset the filter buttons
		$(".tag-cloud."+cloudid+" .fa-square").removeClass("filter-sel-off");
		$(".tag-cloud."+cloudid+" .fa-square").removeClass("not-available");
		
		// Reset filter titles
		$(".filter-title-box ."+cloudid+".prefix .tag-cat").hide(0);
		$(".filter-title-box ."+cloudid+".filter-title").show(0);
		
		// Remove filtering from the Skills tag cloud
		$(".tag-cloud."+cloudid+" a.tag-cat").show("fast");
		
		// Reset filter lists
		colorFiltersList = [];
		sizeFiltersList = [];
		
		// Reset lists of available filter selections
		colorTagsAvailable = [];
		sizeTagsAvailable = [];
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
		
		console.log("techFiltersList: " + techFiltersList);
		console.log("checkIfAnyOn: " + checkIfAnyOn);
		console.log("checkIfAnyOff: " + checkIfAnyOff);
		
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
	
	
	

	
	
	
	