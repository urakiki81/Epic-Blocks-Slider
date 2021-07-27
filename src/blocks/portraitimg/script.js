import "./style.scss";
import $ from "jquery";
import "slick-carousel";

$(document).ready(() => {
  $('.epic-slider_center').slick({
    dots: false,
    infinite: true,
    centerMode: true,
    accessibility: true,
    centerPadding: '20%',
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    swipe: true,
    vertical:false,
    verticalSwiping:false,
    prevArrow: '<button type="button" class="slick-nav prev-arrow" aria-label="Previous slide" role="button"><span class="u-screen-reader-text">Previous slide</span><i></i><svg><use xlink:href="#circle"></svg></button>',
    nextArrow: '<button type="button" class="slick-nav next-arrow" aria-label="Next slide" role="button"><span class="u-screen-reader-text">Next slide</span><i></i><svg><use xlink:href="#circle"></svg></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '20%',
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '10%',
        }
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
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
