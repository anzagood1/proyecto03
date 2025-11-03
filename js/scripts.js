/* Template: Pavo Mobile App Website Tailwind CSS HTML Template
   Description: Custom JS file
*/

(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // close menu on click in small viewport
    $('[data-toggle="offcanvas"], .nav-link:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 70,
        breakpoints: {
            // when window is <= 767px
            767: {
                slidesPerView: 1
            },
            // when window is <= 1023px
            1023: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        }
    });


    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

	/* Function to get the navigation links for smooth page scroll */
	function getMenuItems() {
		var menuItems = [];
		$('.nav-link').each(function() {
			var hash = $(this).attr('href').substr(1);
			if(hash !== "")
				menuItems.push(hash);
		})
		return menuItems;
	}	

	/* Prevents adding of # at the end of URL on click of non-pagescroll links */
	$('.nav-link').click(function (e) {
		var hash = $(this).attr('href').substr(1);
		if(hash == "")
			e.preventDefault();
	});

	/* Checks page scroll offset and changes active link on page load */
	changeActive();

	/* Change active link on scroll */
	$(document).scroll(function(){
		changeActive();
	});
	
	/* Function to change the active link */
	function changeActive() {
		const menuItems = getMenuItems();
		$.each(menuItems, function(index, value){
			var offsetSection = $('#' + value).offset().top;
			var docScroll = $(document).scrollTop();
			var docScroll1 = docScroll + 1; 
			
			if ( docScroll1 >= offsetSection ){
				$('.nav-link').removeClass('active');
				$('.nav-link[href$="#'+value+'"]').addClass('active');
			}  
		});
	}

})(jQuery);

/* Theme toggle (Tailwind 'class' dark mode) */
(function(){
	// run after DOM loaded
	function setupThemeToggle(){
		var themeToggleBtn = document.getElementById('theme-toggle');
		if(!themeToggleBtn) return; // no toggle on this page
		var darkIcon = document.getElementById('theme-toggle-dark-icon');
		var lightIcon = document.getElementById('theme-toggle-light-icon');

		// initialize icons based on stored preference or OS preference
		if (localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			if(lightIcon) lightIcon.classList.remove('hidden');
		} else {
			document.documentElement.classList.remove('dark');
			if(darkIcon) darkIcon.classList.remove('hidden');
		}

		themeToggleBtn.addEventListener('click', function() {
			// toggle icons
			if(darkIcon) darkIcon.classList.toggle('hidden');
			if(lightIcon) lightIcon.classList.toggle('hidden');

			// toggle theme and persist
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('color-theme', 'light');
			} else {
				document.documentElement.classList.add('dark');
				localStorage.setItem('color-theme', 'dark');
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupThemeToggle);
	} else {
		setupThemeToggle();
	}
})();


/* Contact Form */
document.addEventListener('DOMContentLoaded', function() {
	const contactForm = document.getElementById('contactForm');
	
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Obtener los datos del formulario
			const formData = {
				name: document.getElementById('cname').value,
				email: document.getElementById('cemail').value,
				subject: document.getElementById('csubject').value,
				message: document.getElementById('cmessage').value
			};
			
			// Elemento para mostrar mensajes
			const formMessage = document.getElementById('formMessage');
			
			// Mostrar mensaje de envío
			formMessage.textContent = 'Enviando mensaje...';
			formMessage.className = 'text-center text-indigo-600';
			formMessage.classList.remove('hidden');
			
			// Enviar datos al servidor usando fetch
			fetch('https://tu-servidor.com/api/contacto', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Error en la respuesta del servidor');
				}
				return response.json();
			})
			.then(data => {
				// Éxito
				formMessage.textContent = '¡Mensaje enviado exitosamente! Te contactaremos pronto.';
				formMessage.className = 'text-center text-green-600';
				
				// Limpiar el formulario
				contactForm.reset();
				
				// Ocultar mensaje después de 5 segundos
				setTimeout(() => {
					formMessage.classList.add('hidden');
				}, 5000);
			})
			.catch(error => {
				// Error
				console.error('Error:', error);
				formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.';
				formMessage.className = 'text-center text-red-600';
				
				// Ocultar mensaje después de 5 segundos
				setTimeout(() => {
					formMessage.classList.add('hidden');
				}, 5000);
			});
		});
	}
});
