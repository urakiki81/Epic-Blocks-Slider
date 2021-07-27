import './blocks/fristslider';
import './blocks/epicText';
import './blocks/epicButton';
import './blocks/waveslider';
import './blocks/portraitimg';
import './blocks/smallslider';
import './blocks/imagetext';
import $ from "jquery";
import "slick-carousel";
const { updateCategory } = wp.blocks;
const { SVG, G, Path } = wp.components;

(function() {
	updateCategory('epicslider-category', { icon: (
		<SVG
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width="40"
		height="40"
		version="1.1"
		viewBox="0 0 26.458 26.458"
	  >
		<defs>
		  <linearGradient id="linearGradient157">
			<stop offset="0" stopColor="red" stopOpacity="1"></stop>
			<stop offset="1" stopColor="#00f" stopOpacity="1"></stop>
		  </linearGradient>
		  <linearGradient id="linearGradient149">
			<stop offset="0" stopColor="#00f" stopOpacity="1"></stop>
			<stop offset="1" stopColor="red" stopOpacity="1"></stop>
		  </linearGradient>
		  <linearGradient
			x1="-9.293"
			x2="23.813"
			y1="270.74"
			y2="289.592"
			gradientUnits="userSpaceOnUse"
			xlinkHref="#linearGradient149"
		  ></linearGradient>
		  <linearGradient
			id="linearGradient159"
			x1="-290.895"
			x2="-284.418"
			y1="-17.598"
			y2="0.532"
			gradientUnits="userSpaceOnUse"
			xlinkHref="#linearGradient157"
		  ></linearGradient>
		  <linearGradient
			id="linearGradient163"
			x1="-284.688"
			x2="-283.061"
			y1="363.569"
			y2="344.905"
			gradientUnits="userSpaceOnUse"
			xlinkHref="#linearGradient149"
		  ></linearGradient>
		  <linearGradient
			x1="-9.293"
			x2="27.98"
			y1="270.74"
			y2="291.212"
			gradientUnits="userSpaceOnUse"
			xlinkHref="#linearGradient149"
		  ></linearGradient>
		  <linearGradient
			id="linearGradient78"
			x1="-9.293"
			x2="27.98"
			y1="270.74"
			y2="291.212"
			gradientUnits="userSpaceOnUse"
			xlinkHref="#linearGradient149"
		  ></linearGradient>
		</defs>
		<G fillOpacity="1" transform="translate(0 -270.542)">
		  <Path
			fill="url(#linearGradient163)"
			strokeWidth="0.297"
			d="M-302.394 349.042H-283.477V356.673H-302.394z"
			transform="matrix(.94818 -.31772 .82688 .56238 0 0)"
		  ></Path>
		  <Path
			fill="url(#linearGradient159)"
			strokeWidth="0.304"
			d="M-294.812 -12.698H-279.479V-5.018000000000001H-294.812z"
			transform="matrix(-.10337 -.99464 .82165 .56999 0 0)"
		  ></Path>
		  <Path
			fill="url(#linearGradient78)"
			strokeWidth="0.265"
			d="M18.088 270.685l-18.025 6.06 1.579 15.31 18.025-6.06zm-9.304 4.06c.188-.063.343-.1.464-.11a.657.657 0 01.294.032c.074.025.126.07.158.134a.46.46 0 01.063.201.814.814 0 01-.022.25.867.867 0 01-.108.268 1.219 1.219 0 01-.222.27 1.352 1.352 0 01-.358.23c-.035.025-.12.077-.25.159-.129.073-.268.157-.42.251-.152.088-.296.174-.432.257a6.44 6.44 0 00-.28.177l.006-.002a2.118 2.118 0 00-.172.132c-.086.066-.193.148-.318.246-.127.092-.265.197-.414.315l-.436.35c-.142.11-.273.216-.395.318-.121.097-.22.176-.294.238a2.312 2.312 0 00-.536.774c-.117.281-.203.582-.258.904a34.987 34.987 0 00-.192 1.346l-.08.575-.068.497c-.015.147-.027.256-.033.326a1.556 1.556 0 00-.005.281c.003.036.01.052.023.048.061-.02.184-.102.37-.244a154.197 154.197 0 001.451-1.201c.286-.238.558-.463.817-.674.263-.211.497-.392.702-.541.205-.156.355-.249.449-.28.143-.048.242-.045.298.011.055.05.087.117.094.2.02.217-.015.424-.107.622-.087.196-.203.38-.347.553a3.768 3.768 0 01-.261.255c-.125.11-.262.226-.41.35l-.417.354c-.133.113-.229.194-.287.245a99.783 99.783 0 00-1.504 1.46c-.147.142-.26.251-.342.328a4.939 4.939 0 01-.222.204c-.067.053-.142.11-.225.169l-.344.245c-.025.138-.05.345-.076.62-.025.268-.048.548-.068.84-.02.285-.035.55-.047.796-.007.244-.006.411.003.501a.65.65 0 00.053.233c.025.041.052.066.082.075.03.008.06.007.089-.001l.067-.023c.197-.066.428-.186.694-.362.27-.177.534-.38.792-.609.245-.218.456-.438.634-.658l.5-.614c.16-.195.315-.365.466-.508.154-.151.328-.262.52-.332a.657.657 0 01.142-.03.346.346 0 01.166.019.23.23 0 01.128.087c.038.043.057.108.056.195 0 .18-.044.37-.13.573a3.71 3.71 0 01-.342.616c-.141.209-.3.417-.48.626-.179.208-.362.412-.55.611-.19.193-.375.376-.557.549a69.21 69.21 0 01-.49.443 7.224 7.224 0 01-1.06.791c-.347.21-.662.361-.944.456-.311.104-.558.097-.742-.022-.18-.114-.287-.369-.323-.765a4.07 4.07 0 010-.688c.063-.863.151-1.716.263-2.559.116-.85.213-1.688.293-2.514.08-.825.145-1.52.195-2.08.053-.57.1-1.057.143-1.461.043-.41.084-.765.124-1.063.04-.299.086-.596.139-.893.034-.178.072-.364.113-.558.045-.194.096-.375.152-.543.056-.173.116-.317.181-.432.07-.122.144-.197.226-.224.168-.056.299-.057.392-.001.098.048.16.102.186.161l.089.351c.06-.027.14-.068.235-.125l.286-.189c.1-.064.191-.126.274-.185.084-.058.146-.107.19-.146.259-.199.5-.376.722-.53.222-.155.433-.29.633-.407.203-.124.398-.23.584-.316.186-.087.375-.163.567-.228zm6.282-1.964c.217-.072.428-.112.634-.119.21-.008.4.031.568.117a.981.981 0 01.429.404c.114.185.185.434.214.746a3.915 3.915 0 01-.156 1.538c-.153.491-.388.979-.706 1.463-.318.484-.71.968-1.175 1.453-.462.476-.981.97-1.558 1.479.492-.054.919-.064 1.28-.03.365.027.671.1.919.223.247.121.437.29.571.505.134.215.216.485.246.81.04.432-.008.906-.141 1.422a5.143 5.143 0 01-.71 1.557c-.108.16-.24.34-.4.542-.154.194-.326.397-.513.608-.183.21-.378.421-.586.633a8.794 8.794 0 01-.63.574c-.212.176-.42.33-.628.46a2.54 2.54 0 01-.592.301.755.755 0 01-.249.046.34.34 0 01-.194-.047.661.661 0 01-.186-.17 2.967 2.967 0 01-.205-.303 1.338 1.338 0 01-.292.34.921.921 0 01-.317.189l-.172.058c-.033.01-.065.003-.097-.023a.356.356 0 01-.09-.091.711.711 0 01-.098-.302 4.523 4.523 0 01.006-.903c.035-.303.079-.605.131-.908a140.7 140.7 0 00.548-5.302c.052-.587.098-1.142.138-1.663l.075-1.103a30.954 30.954 0 00-.101-.691l-.017-.115.016-.163-.005.011c.01-.115.028-.248.052-.398a3.23 3.23 0 01.1-.433c.041-.138.09-.256.144-.354.057-.106.123-.172.197-.196.07-.024.158-.044.266-.062a3.12 3.12 0 00.296-.08.843.843 0 00.258-.143c.06-.045.134-.104.225-.177l.363-.317c.222-.198.425-.368.61-.51a6.09 6.09 0 01.534-.384 4.103 4.103 0 01.998-.492zm-.264 1.733a3.038 3.038 0 00-.682.35 6.463 6.463 0 00-.723.53c-.23.194-.434.392-.61.594-.175.2-.287.375-.337.521-.01.035-.022.107-.037.217a9.473 9.473 0 01-.102.75c-.018.123-.039.217-.062.28-.003.063-.01.162-.023.296-.014.129-.031.283-.053.464-.017.179-.039.378-.065.598l-.07.682c.22-.184.45-.391.69-.62.24-.235.484-.485.734-.748.254-.264.509-.539.765-.823.26-.291.518-.582.773-.872l-.006.002a3.39 3.39 0 00.487-.823c.066-.158.115-.313.147-.466.036-.161.047-.31.034-.449a.78.78 0 00-.067-.256.514.514 0 00-.158-.198.48.48 0 00-.261-.09.949.949 0 00-.374.061zm-2.927 6.879a70.967 70.967 0 00-.214 2.265l-.162 2.153.41-.072a4.62 4.62 0 01.25-.045 2.7 2.7 0 00.129-.034c.161-.08.337-.184.527-.316.19-.138.384-.292.583-.464.203-.18.406-.375.61-.586.204-.217.402-.441.596-.673.07-.098.145-.212.221-.343a3.24 3.24 0 00.203-.412c.057-.15.103-.301.135-.454a1.49 1.49 0 00.028-.446.665.665 0 00-.314-.536c-.189-.123-.425-.186-.708-.19a18.02 18.02 0 00-1.098.089c-.172.014-.335.028-.49.043-.155.009-.297.016-.427.022a2.379 2.379 0 01-.279 0z"
		  ></Path>
		</G>
	  </SVG>
	) });
})();
wp.domReady( function() {
  
	$('.epic-slider_center').slick({
		dots: false,
		infinite: true,
		centerMode: true,
		accessibility: true,
		centerPadding: '300px',
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
			  centerPadding: '90px',
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  centerPadding: '40px',
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  centerPadding: '40px',
			}
		  }
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
 
  } );
  $(document).ready(() => {
	

	$(".block-editor-block-list__block").slick({
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
