jQuery(function($){
	var API_URL = 'http://api.sudodoki.name:8888', token = '';

	function signUp(login, email, pasw, paswConfirm){
		$.post(API_URL + '/signup', 
			{data: {login: login, 
					email: email, 
					password: pasw, 
					passwordConfirmation: paswConfirm}
			}).done(function(data){
				$('.sign-in-up').addClass('hidden');
				$('#login').addClass('hidden');
				$('#signup').addClass('hidden');
				$('.list').removeClass('hidden').addClass('active');
				$('.log_out').removeClass('hidden');
				$('hr:first-of-type').addClass('hidden');
				getList();
				var data = jQuery.parseJSON(data)
				token = data.token;
				console.log(token);
			}).error(function(err) {
				$('#signup .error').removeClass('hidden').text('Something went wrong, crap');
				console.log(err);
			});
	}

	function logIn(login, pasw){
		$.post(API_URL + '/login', 
			{data: {login: login, 
					password: pasw}
			}).done(function(data){
				$('.sign-in-up').addClass('hidden');
				$('#login').addClass('hidden');
				$('#signup').addClass('hidden');
				$('.list').removeClass('hidden').addClass('active');
				$('.log_out').removeClass('hidden');
				$('hr:first-of-type').addClass('hidden');
				getList();
				var data = jQuery.parseJSON(data)
				token = data.token;
				console.log(token);
			}).error(function(err) {
				$('#login .error').removeClass('hidden').text('Something went wrong, crap');
				console.log(err);
			});
	}

	function getList(){
		$.get(API_URL + '/users').done(function(data){
			console.log(data);
			list(data);
		}).error(function(err) {
			console.log(err);
		});
	}

	function list(user_list){
		var html = '', i = 0;
		while(i < user_list.length){
			html += '<li id="'+user_list[i].id+'">';
				html += '<div class="person '+user_list[i].user.gender+'">';
					html += '<a class="url n" href="#show-full"><i>'+user_list[i].user.name.title+'. </i>' + user_list[i].user.name.first +' , ' +user_list[i].user.name.last +'</a>';
				html += '</div>';
			html += '</li>';
			i++;
		}
		return $(html).appendTo('#list .small-block-grid-3');
	}
	
	$(document).on('click', '.sign_up', function(event){
		event.preventDefault();
		var login = $('#signup input[name="login"]').val();
		var email = $('#signup input[name="email"]').val();
		var pasw = $('#signup input[name="password"]').val();
		var paswConfirm = $('#signup input[name="passwordConfirmation"]').val();
		var emValReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (pasw != paswConfirm) {
			$('#signup .error').removeClass('hidden').text('passwords don\'t match');
			return false;
		}else if (!emValReg.test(email)) {
			$('#signup .error').removeClass('hidden').text('please provide with valide email');
			return false;
		}else if (!login) {
			$('#signup .error').removeClass('hidden').text('please choose the login name');
			return false;
		}else if (!pasw) {
			$('#signup .error').removeClass('hidden').text('we can\'t protect your account without password');
			return false;
		}else {
			$('#signup small.error').addClass('hidden').text('');
		}
		signUp(login, email, pasw, paswConfirm);
	});

	$(document).on('click', '.sign_in', function(event){
		event.preventDefault();
		var login = $('#login input[name="login"]').val();
		var pasw = $('#login input[name="password"]').val();
		if (!login) {
			$('#login .error').removeClass('hidden').text('don\'t forget the login name');
			return false;
		}else if (!pasw) {
			$('#login .error').removeClass('hidden').text('looks like somone forgot their password');
			return false;
		}else {
			$('#login small.error').addClass('hidden').text('');
		}
		logIn(login, pasw);
	});

	$(document).on('click', '#list .small-block-grid-3 li', function(){
		var id = $(this).attr('id');
		$.ajax({ url: API_URL + '/user/' + id,
			type: 'GET',
			beforeSend: function (request){
                request.setRequestHeader("SECRET-TOKEN", token);
            }
		}).done(function(data){
			console.log(data);
			var data = jQuery.parseJSON(data);
			$('#show-full').removeClass('hidden');
			$('#show-full h2').text(data[0].user.name.title + '. ' + data[0].user.name.first + ', ' + data[0].user.name.last);
			$('#show-full section.location').text('Street: ' + data[0].user.location.street + ', ' + data[0].user.location.city +' , ' + data[0].user.location.state + ', ' + data[0].user.location.zip);
			$('#show-full section.connect').html('<a href="mailto:' + data[0].user.email + '">' + data[0].user.email + '</a><br/><a href="' + data[0].user.phone + '">' + data[0].user.phone + '</a>');
		}).error(function(err) {
			console.log(err);
		});
	});

});