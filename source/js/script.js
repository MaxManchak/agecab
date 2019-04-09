@@include('components/scrollbar.js');
@@include('components/hash.js');
@@include('components/scissor.js');
@@include('components/scrollbar.js');
@@include('components/turn.min.js');
@@include( 'components/zoom.min.js' );



'use strict';

jQuery( function ( $ ) {
	// активация кастомного скроллбара
	if ($(window).width() > 640) {
		$('.scrollbar').mCustomScrollbar({
			scrollInertia: 150,
		});
	}

	// взаимодействие с формой
	$('.form-group input')
		.focus(function() {
			$(this).closest('.form-group').addClass('active');
		})
		.focusout(function() {
			if ($(this).val() === '') {
				$(this).closest('.form-group').removeClass('active');
			}
		} );


// открытие popup c новостями
	var popupOpen = () => {
		if ($(window).width() > 640 && $(window).width() < 1900) {
			$('.popup-newspaper').addClass('open');
		}
	};
	// закрытие popup
	$('.popup-newspaper__close').click(function(e) {
		e.preventDefault();
		$('.popup-newspaper').removeClass('open');
	});



	window.addEventListener('resize',	function() {
			if ($(window).width() < 640) {
				scrollImageLeft();
			}
		},
		false
	);





// открытие меню на мобильном
	$('.navigation__open').on('click', function(e) {
		e.preventDefault();
		$('.navigation').addClass('open');
		$('body').addClass('fixed');
	});
// закрытие меню на мобильном
	$('.navigation__close').on('click', function(e) {
		e.preventDefault();
		$('.navigation').removeClass('open');
		$('body').removeClass('fixed');
	});


// cмена новостей по клику без перезагрузки
	function showContent(link) {
		$.ajax({
			url: link,
			type: 'GET',
			cache: true,
			success: function(data) {
				var content = $(data).filter('#content');
				var innerContent = $(content).html();
				$( '.content-list' ).html( innerContent );
				console.log('ajax sucesfull');

				flipbook();
			},
		});
	}


	$('.articles-list a').click(function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		$( '#flipbook' ).turn( 'destroy' );

		if ( $( window ).width() < 1024 && $( window ).width() > 640 ) {
			popupOpen();
			changeSizeBook();
		}
		showContent(link);
	});



	// отображение логотипов  при прокрутке
	if ($('*').is('.article__img-logo')) {
		$('.main').scroll(function() {
			$('.article__img-logo').addClass('active');
			setTimeout(() => {
				$('.article__img-logo').removeClass('active');
			}, 1000);
		});
	}


	// перелистывание страниц новостей
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


	// кнопки переключения новостей
	$('.popup-newspaper__next').click(function() {
		$('#flipbook').turn('next');
	});
	$('.popup-newspaper__prev').click(function() {
		$('#flipbook').turn('previous');
	} );

	if ($('*').is('#flipbook')) {
		flipbook();
	}


	if ($(window).width() < 640) {
		$('.scrollbar').wrap('<div class="scrollbar-wrap"></div>');
	}

	// центрирование по середине на второй странице
	var scrollImageLeft = () => {
		var width = $( window ).width();
		var imgWidth = $( '.article-2__wrap:not(:first-child) img' ).width();
		$( '.article-2__wrap' ).scrollLeft( imgWidth / 2 - width / 2 );
	}
	scrollImageLeft();

//  отображение стрелок при крокрутке на второй странице
	$( window ).scroll( function () {
		var offsetMain = $( '.left-block--2' ).offset().top;
		if ( (offsetMain  > ($( window ).height() - 200) ) && ($( window ).width() < 640 )) {
			$('.article--2').addClass( 'scroll' );
		} else {
			$( '.article--2' ).removeClass( 'scroll' );
		}
	} );

	var changeSizeBook = () => {
		var windowWidth = $( window ).width();
		var windowHeight = $( window ).height();
		$( '#flipbook' ).css( {
			'width': (windowWidth - 80) +'px',
			'height': (windowHeight - 130) +'px',
		})
	}

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
