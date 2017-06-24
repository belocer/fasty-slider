(function($) {
	//Initializing
	$.fn.fasty = function(options){
		$(this).addClass('fasty');
		var settings = $.extend({
			start: 'default', //Default = first 3 slides will be visible, Reversed = last 3 slides will be visible
			mode: 'normal' // Normal = normal mode, OnlyRight = available to scroll only to right 
		}, options);
		//Making classes and data-attrs
		var $fSlides, $fSlidesNumber = 1;
		$fSlides = $(this).find('div.fasty__slide');
		for (var i = 0, len = $fSlides.length; i != len; i++) {
			//Adding 'data-fasty-number'
			$($fSlides[i]).attr('data-fasty-number',$fSlidesNumber);
			//Adding 'fasty_visible' and 'fasty_left', 'fasty_central', 'fasty_right'
			if ( settings.start == 'default' && i < 3 ) {
				$($fSlides[i]).addClass('fasty_visible');
				if ( i == 0 ) {
					$($fSlides[i]).addClass('fasty_left');
				}
				else if ( i == 1 ) {
					$($fSlides[i]).addClass('fasty_central');
				}
				else if ( i == 2 ) {
					$($fSlides[i]).addClass('fasty_right');
				}
			}
			else if ( settings.start == 'reversed' && i >= (len- 3 ) ) {
				$($fSlides[i]).addClass('fasty_visible');
				if ( i == (len - 3) ) {
					$($fSlides[i]).addClass('fasty_left');
				}
				else if ( i == (len - 2) ) {
					$($fSlides[i]).addClass('fasty_central');
				}
				else if ( i == (len - 1) ) {
					$($fSlides[i]).addClass('fasty_right');
				}
			}
			$fSlidesNumber++;
		}
		//Settling container's height based on main slide height
		$(this).css('height', $('.fasty_central').css('height'));
		//Hide other slides on init
		$(this).find('.fasty__slide').each(function(){
			if ( !$(this).hasClass('fasty_visible') ) {
				$(this).hide();
			}
		});
		//Mode settings
			if ( settings.mode == 'onlyRight' ) { $('.fasty_left').hide() }
		//Main Click event
		$('.fasty__slide').on('click', function(){
			// Defining variables
			$fLeft = new Object();
			$fRight = new Object();
			$fCentral = new Object();
			$fBeforeVisible = new Object();
			$fAfterVisible = new Object();
			var $isLeft, $isCentral, $isRight, $isFinished;
			//Selecting from DOM
			$fCentral.num = $('.fasty_central').attr('data-fasty-number');
			$fLeft.num = parseInt($fCentral.num) - 1;
			$fRight.num = parseInt($fCentral.num) + 1;
			$fBeforeVisible.num = parseInt($fCentral.num) - 2;
			$fAfterVisible.num = parseInt($fCentral.num) + 2;
			$fCentral.elem = $('.fasty_central');
			$fLeft.elem = $('.fasty_left');
			$fRight.elem = $('.fasty_right');
			$fBeforeVisible.elem = $('.fasty__slide[data-fasty-number='+$fBeforeVisible.num+']');
			$fAfterVisible.elem = $('.fasty__slide[data-fasty-number='+$fAfterVisible.num+']');
			//Calculating which slide is clicked
			$isLeft = ( $(this).context == $fLeft.elem[0] ) ? true : false;
			$isCentral = ( $(this).context == $fCentral.elem[0] ) ? true : false;
			$isRight = ( $(this).context == $fRight.elem[0] ) ? true : false;
			//And scrolled to finish or not
			$isFinished = ( $(this).attr('data-fasty-number') == $fSlides.length ) ? true : false;
			//DEBUGGING
			// var debug = $fastyCentralNum + '\n' + $fastyLeftNum;
			//console.log($fSlides[2]);
			//Transforming
			if ( settings.mode == 'normal' ) {
				if ($isLeft) {			
					$fLeft.elem.removeClass('fasty_left').addClass('fasty_central');
					$fCentral.elem.removeClass('fasty_central').addClass('fasty_right');
					$fRight.elem.fadeOut(300).removeClass('fasty_right');
					$fBeforeVisible.elem.show(300).addClass('fasty_left');
				}
				else if ($isRight) {	
					$fLeft.elem.fadeOut(300).removeClass('fasty_left');		
					$fCentral.elem.removeClass('fasty_central').addClass('fasty_left');
					$fRight.elem.removeClass('fasty_right').addClass('fasty_central');
					$fAfterVisible.elem.show(300).addClass('fasty_right');
				}
			}
			else if ( settings.mode == 'onlyRight' ) {
				if ($isCentral && $isFinished) {
					$(this).removeClass('fasty_central').fadeOut(300,function(){
						$('.fasty').find($fSlides[1]).addClass('fasty_central').fadeIn(300);
						$('.fasty').find($fSlides[2]).addClass('fasty_right').fadeIn(300);
					});
				}
				if ($isRight) {	
					$fCentral.elem.addClass('fasty_toLeft').fadeOut(800,function(){$(this).removeClass('fasty_toLeft')}).removeClass('fasty_central');
					setTimeout(function(){
						$fCentral.elem.fadeOut(800).removeClass('fasty_central');
						$fRight.elem.removeClass('fasty_right').addClass('fasty_central');
						$fAfterVisible.elem.show(300).addClass('fasty_right');
					},500);					
				}
			}
		})
	}
}(jQuery));