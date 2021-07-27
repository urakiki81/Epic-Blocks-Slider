import "./style.scss";
import $ from "jquery";
import "slick-carousel";
$(document).ready(() => {


	  $(".epic-slider_small").slick({
		arrows: true,
		dots: false,
		slidesToShow:1,
		slidesToScroll:1,
		vertical:false,
		verticalSwiping:false,
		swipe: true,
		prevArrow: '<button type="button" class="slick-nav prev-arrow" aria-label="Previous slide" role="button"><span class="u-screen-reader-text">Previous</span><i></i><svg><use xlink:href="#circle"></svg></button>',
		nextArrow: '<button type="button" class="slick-nav next-arrow" aria-label="Next slide" role="button"><span class="u-screen-reader-text">Next</span><i></i><svg> <use xlink:href="#circle"></svg><svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44px" height="44px" id="circle" fill="none" stroke="currentColor"><circle r="20" cy="22" cx="22" id="test"></symbol> </button>',
	  });

	  
	  $('.slick-nav').click(function(e) {
	  
		  e.preventDefault();
	  
		  var arrow = $(this);
	  
		  if(!arrow.hasClass('animate')) {
			  arrow.addClass('animate');
			  setTimeout(() => {
				  arrow.removeClass('animate');
			  }, 1600);
		  }
	  
	  });
 }); 

 
	
