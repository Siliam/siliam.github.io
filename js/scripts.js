$(document).ready(function(){
	$('#projects_brief .content').hide();
	$('#projects_section .project').hide();
	
	$('.show_brief').click(function(){
		if($('.show_brief i').hasClass('on'))
		{
			$('.show_brief i').removeClass('on');
			$('.show_brief i').addClass('off');
			$('#projects_brief .content').slideUp();	
		}
		else
		{
			$('.show_brief i').addClass('on');
			$('.show_brief i').removeClass('off');
			$('#projects_brief .content').slideDown();	
		}
	});

	$('.show_section').click(function(){
		$('#projects_section .project').slideUp();
		var section = $(this).parent().parent();

		if($('.show_brief i').hasClass('on'))
		{
			$('.show_brief i').removeClass('on');
			$('.show_brief i').addClass('off');
			$('#projects_brief .content').slideUp();	
		}
		
		if($(this).children("i").first().hasClass('on'))
		{
			$(this).children('i').first().removeClass('on');
			$(this).children('i').first().addClass('off');
			section.children('.project').slideUp();	
		}
		else
		{
			$(this).children('i').first().addClass('on');
			$(this).children('i').first().removeClass('off');
			section.children('.project').slideDown();	
		}
	});

	$('.circlelink').click(function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
	});

	$('.toplink').click(function(e){
		e.preventDefault();

		if(!$(this).hasClass('animated'))
		{
			// $($(this).attr('href')).fadeIn();
			$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
		}
	});

	/*
	$('.landing_anchor').click(function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: $("#landing").offset().top }, 100);
	});
	*/

	var form = $('#contactFrom');
	form.submit(function(e) {
		e.preventDefault();

		if(!$('#submit').hasClass("sent"))
		{
			$.ajax({
				url: 'https://formspree.io/mail@harrando.me',
				method: 'POST',
				data: $(this).serialize(),
				dataType: 'json',
				beforeSend: function() {
					form.children().prop('disabled', true);
					form.find('#submit').attr('value', 'Sending ..').removeClass('resend').addClass('sending');
				},
				success: function(data) {
					form.find('#submit').attr('value', 'Sent !').removeClass('sending').addClass('sent');
				},
				error: function(err) {
					form.children().prop('disabled', false);
					form.find('#submit').attr('value', 'Resend').removeClass('sending').addClass('resend');
				}
			});
		}
	});

});