@@include('components/scrollbar.js');
@@include('components/hash.js');
@@include('components/scissor.js');
@@include('components/scrollbar.js');
@@include('components/turn.min.js');
@@include( 'components/zoom.min.js' );


('use strict');

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

	if ($(window).width() > 640 && $(window).width() < 1900) {
		$('.articles-list').click(function(e) {
			e.preventDefault();
			$('.popup-newspaper').addClass('open');
		});
	}

	$('.popup-newspaper__close').click(function(e) {
		e.preventDefault();
		$('.popup-newspaper').removeClass('open');
	});

	$('.menuToggle').on('click', function(e) {
		e.preventDefault();

		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('.navigation').removeClass('open');
			$('body').removeClass('fixed');
		} else {
			$(this).addClass('open');
			$('.navigation').addClass('open');
			$('body').addClass('fixed');
		}
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

	// $('.popup-newspaper__next').on('click', function(e) {
	// 	e.preventDefault();
	// 	var all = Math.ceil($('.content-list li').length / 2);
	// 	var count = $('.content-list').find('li.active').data('count');

	// 	if (all > Math.ceil(count / 2)) {
	// 		$('.content-list li').removeClass('active');
	// 		$('.content-list li:nth-of-type(' + (count + 2) + ')').addClass('active');
	// 		$('.content-list li:nth-of-type(' + (count + 2) + ')').addClass('active');
	// 		newspaperCount();
	// 	}
	// });

	// $('.popup-newspaper__prev').on('click', function(e) {
	// 	e.preventDefault();
	// 	var all = Math.ceil($('.content-list li').length / 2);
	// 	var count = $('.content-list').find('li.active').data('count');

	// 	if (Math.ceil(count / 2) > 1) {
	// 		$('.content-list li').removeClass('active');
	// 		$('.content-list li:nth-of-type(' + (count - 1) + ')').addClass('active');
	// 		$('.content-list li:nth-of-type(' + (count - 2) + ')').addClass('active');
	// 		newspaperCount();
	// 	}
	// });

	// var newspaperCount = () => {
	// 	var all = Math.ceil($('.content-list li').length / 2);
	// 	$('.content-list__count-all').html(all);
	// 	var count = Math.ceil($('.content-list').find('li.active').data('count') / 2);
	// 	$('.content-list__count-item').html(count);
	// };
	// newspaperCount();

	if ($('*').is('.article__img-logo')) {
		if ($(window).width() > 1900) {
			$('.main').scroll(function() {
				$('.article__img-logo').addClass('active');
				setTimeout(() => {
					$('.article__img-logo').removeClass('active');
				}, 1000);
			});
		} else {
			$(window).scroll(function() {
				$('.article__img-logo').addClass('active');
				setTimeout(() => {
					$('.article__img-logo').removeClass('active');
				}, 1000);
			});
		}
	}


	var flipbook = () => {
		$( '#flipbook' ).turn({when: {
			turning: function(event, page, view) {

				var book = $(this),
				currentPage = book.turn('page'),
				pages = book.turn('pages');
				$( '.content-list__count-count' ).html(currentPage);

			},
		},
		gradients: true


		});

		var page = $( "#flipbook" ).turn( "page" );
		var pages = $( "#flipbook" ).turn( "pages" );
		$('.content-list__count-count').html(page);
		$('.content-list__count-all').html(pages);

	};

	$( '.popup-newspaper__next' ).click( function () {
		$( '#flipbook' ).turn( 'next' );
	} )
	$( '.popup-newspaper__prev' ).click( function () {
		$( '#flipbook' ).turn( 'previous' );
	})

	flipbook();


	if ( $( window ).width() < 640 ) {
		$( '.scrollbar' ).wrap( '<div class="scrollbar-wrap"></div>' );
	}


});
