@@include('components/scrollbar.js');
@@include('components/hash.js');
@@include('components/scissor.js');
@@include('components/scrollbar.js');
@@include('components/turn.min.js');
@@include( 'components/zoom.min.js' );



'use strict';

jQuery(function($) {
	if ($(window).width() > 640) {
		$('.scrollbar').mCustomScrollbar({
			scrollInertia: 150,
		});
	}

	$('.form-group input')
		.focus(function() {
			$(this).closest('.form-group').addClass('active');
		})
		.focusout(function() {
			if ($(this).val() === '') {
				$(this).closest('.form-group').removeClass('active');
			}
		});
	var popupOpen = () => {
		$('.articles-list').click(function(e) {
			e.preventDefault();
			$('.popup-newspaper').addClass('open');
		});
	};
	if ($(window).width() > 640 && $(window).width() < 1900) {
		popupOpen();
	}

	window.addEventListener('resize',	function() {
			if ($(window).width() > 640 && $(window).width() < 1900) {
				popupOpen();
			}
			if ($(window).width() < 640) {
				scrollImageLeft();
			}
		},
		false
	);

	$('.popup-newspaper__close').click(function(e) {
		e.preventDefault();
		$('.popup-newspaper').removeClass('open');
	});

	$('.navigation__open').on('click', function(e) {
		e.preventDefault();
		$('.navigation').addClass('open');
		$('body').addClass('fixed');
	});

	$('.navigation__close').on('click', function(e) {
		e.preventDefault();
		$('.navigation').removeClass('open');
		$('body').removeClass('fixed');
	});

	function showContent(link) {
		$.ajax({
			url: link,
			type: 'GET',
			cache: true,
			success: function(data) {
				var content = $(data).filter('#content');
				var innerContent = $(content).html();
				$('.content-list').html(innerContent);
				// newspaperCount();
				flipbook();
			},
		});
	}

	$('.articles-list a').click(function(e) {
		e.preventDefault();

		var link = $(this).attr('href');
		$('#flipbook').turn('destroy');
		showContent(link);
	});

	if ($('*').is('.article__img-logo')) {
		$('.main').scroll(function() {
			$('.article__img-logo').addClass('active');
			setTimeout(() => {
				$('.article__img-logo').removeClass('active');
			}, 1000);
		});
	}

	var flipbook = () => {
		$('#flipbook').turn({
			when: {
				turning: function(event, page, view) {
					flipPage(page);
				},
			},
		});

		var page = $('#flipbook').turn('page');
		var pages = $('#flipbook').turn('pages');
		flipPage(page);
		flipPages(pages);
	};

	$('.popup-newspaper__next').click(function() {
		$('#flipbook').turn('next');
	});
	$('.popup-newspaper__prev').click(function() {
		$('#flipbook').turn('previous');
	});
	if ($('*').is('#flipbook')) {
		flipbook();
	}

	if ($(window).width() < 640) {
		$('.scrollbar').wrap('<div class="scrollbar-wrap"></div>');
	}

	function scrollImageLeft() {
		var width = $( window ).width();
		var imgWidth = $( '.article-2__wrap:not(:first-child) img' ).width();
		$( '.article-2__wrap' ).scrollLeft( imgWidth / 2 - width / 2 );

	}

	$( window ).scroll( function () {

		var offsetMain = $( '.left-block--2' ).offset().top;
		if ( (offsetMain  > ($( window ).height() - 200) ) && ($( window ).width() < 640 )) {
			$('.article--2').addClass( 'scroll' );
		} else {
			$( '.article--2' ).removeClass( 'scroll' );
		}
	} );

	scrollImageLeft();
});


var flipPages = pages => {
	jQuery('.content-list__count-all').html(pages);
};
var flipPage = page => {
	if (page > 1) {
		page++;
	}
	jQuery('.content-list__count-item').html(page);
};
