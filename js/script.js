$(function () {
	"use strict";
	// On Scroll  Nav background color change//
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll > 300) {
			$(".navbar").addClass("nav-background");
		} else {
			$(".navbar").removeClass("nav-background");
		}
	});

	$(document).ready(function() {
		// Counter Up//
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});

		// filter
		var containerEl = document.querySelector('.mixingcon');
		var mixer = mixitup(containerEl, {
			selectors: {
				control: '.mixitup-control button'
			}
		});

		// Testimonial Slider//
		$('.owl2').owlCarousel({
			loop: true,
			margin: 15,
			nav: false,
			autoplay: true,
			dots: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 2
				}
			}
		});

		// PrettyPhoto
		$("a[data-rel^='prettyPhoto']").prettyPhoto();
	});
	//Smooth Scroll//
	$(".navbar-nav .nav-link").on("click", function (e) {
		e.preventDefault();
		var hash = this.hash;
		var position = $(hash).offset().top;
		$("html").animate({
			scrollTop: position - 80
		}, 1000);
		// Navbar collapse on click
		$('.navbar-collapse').collapse('hide');
	});

	// Contact form
	$('#contact form').submit(function(e) {
		e.preventDefault();
		var form = $('#contact form');
		var formData = form.serialize();
		$.ajax({
			type: 'POST',
			url: form.attr('action'),
			data: formData,
			success: function( data ) {
				if( data.success ) {
					form.before('<div class="alert alert-success alert-dismissible fade show" role="alert">' + data.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></div>');
					form.find('input, textarea').val('');
				} else {
					form.before('<div class="alert alert-danger alert-dismissible fade show" role="alert">' + data.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></div>');
				}
				$('.alert').alert();
			}
		});
	});
});