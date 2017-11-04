document.addEventListener('DOMContentLoaded', function() {

//Variables initialization
var doc = document;
var signin = doc.getElementById('main-nav-signin');
var accountBtn = doc.getElementById('account-menu-button');
var pricingSection = doc.getElementById('pricing');
var headerContentInner = doc.getElementsByClassName('header-content-inner')[0];
var headerContentInnerUserLogin = doc.getElementById('header-content-inner-userLogin');
var verifiedUser = null;

//LOGIN PAGE VARIABLES
var signin_email_input = doc.getElementById('signin-email');
var signin_password_input = doc.getElementById('signin-password');
var user_Login_Btn = doc.getElementById('user-Login-Btn');
var userProfileDrpBtn = doc.getElementById('user-profile-after-pg');

//REGISTER PAGE VARIABLES
var register_username = doc.getElementById('signup-username');
var register_email = doc.getElementById('signup-email');
var register_password = doc.getElementById('signup-password');
var register_btn = doc.getElementById('user-Register-Btn');

//ADMIN PAGE VARIABLES
var admin_signin = document.getElementById('admin-signin');
var admin_accountBtn = document.getElementById('admin-account');

//Register User and store data

if(register_btn) {
  event.preventDefault();
  register_btn.addEventListener('click', function(){
    var username = register_username.value;
    var email = register_email.value;
    var password = register_password.value;
    signup(username, email, password);
  });
}
function signup(username, email, password) {
  alert('You have successfully registered yourself!!!');
  console.log(username, email, password);
  //Code for storing user information in database hoes here.
}
//LOGIN function
if(user_Login_Btn){
  user_Login_Btn.addEventListener("click", function(e){
     e.preventDefault();
    var login_email = signin_email_input.value;
    var login_password = signin_password_input.value;
     userLogin(login_email, login_password);
     $form_modal.removeClass('is-visible');
  });
}


function userLogin(login_email, login_password){
  var l_email = login_email;
  var l_password = login_password;
  var l_username = 'profileName';
  if(l_email === 'profile@movieflix.com' && l_password === 'password'){
    verifiedUser = true;
    // redirect('user');
    headerContentInner.style.display = "none";
    userProfileDrpBtn.style.display = "inline";
    pricingSection.style.display = "none";
    headerContentInnerUserLogin.style.display = "inline";
    headerContentInnerUserLogin.innerHTML = '<p>Hey ' +l_username+ '. Check our awesome foray of Movies and TV shows!!!</p>'
    loadAccountChip();
  } else if (l_email ==='admin@admin.com' && l_password === 'admin'){
    redirect('angularAdmin');
    loadAdminChip();
  } else {
    verifiedUser = false;
    alert("Invalid user credentials or account does not exist");
  }
};

//ADMIN Page login and signout function
window.onload = function loadAdminChip() {
if(admin_signin){
      event.preventDefault();
      admin_signin.style.display = "none";
      admin_accountBtn.style.display = "inline-block";
      admin_accountBtn.addEventListener('click', function(){
        asignout();
      });
    }
};

function asignout(){
  admin_signin.style.display = "inline-block";
  admin_accountBtn.style.display = "none";
  redirect('index');
}

function loadAccountChip(){
    signin.style.display="none";
    accountBtn.style.display="inline-block";
    accountBtn.innerHTML = '<a href="#" id="logoutBtn">Logout</a>';

    var userLogout = doc.getElementById('logoutBtn');
    userLogout.addEventListener("click", function(){
      signout();
    });
  }


  function signout(){
    signin.style.display="inline-block";
    pricingSection.style.display = "inline";
    accountBtn.style.display="none";
    userProfileDrpBtn.style.display = "none";
    headerContentInnerUserLogin.style.display = "none";
    headerContentInner.style.display = "inline";
  }

function redirect(path){

     var baseURL = window.location.protocol + '//' + window.location.host;
     console.log(baseURL);
     var hasSlash = path.charAt(0) == '/';
     console.log(hasSlash);

     if(hasSlash) {
     path = baseURL;
     }

     if(!hasSlash){
     path = '/' + path;
     console.log(path);
     }

     var onThisPage = (window.location.href.indexOf(baseURL + path)  != -1);

     if (!onThisPage) {
     //redirect them to login page for message
     location = path;

 }
}




  (function($) {
      "use strict"; // Start of use strict

      // jQuery for page scrolling feature - requires jQuery Easing plugin
      $(document).on('click', 'a.page-scroll', function(event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
              scrollTop: ($($anchor.attr('href')).offset().top - 50)
          }, 1250, 'easeInOutExpo');
          event.preventDefault();
      });

      // Highlight the top nav as scrolling occurs
      $('body').scrollspy({
          target: '.navbar-fixed-top',
          offset: 100
      });

      // Closes the Responsive Menu on Menu Item Click
      $('.navbar-collapse ul li a').click(function() {
          $('.navbar-toggle:visible').click();
      });

      // Offset for Main Navigation
      $('#mainNav').affix({
          offset: {
              top: 50
          }
      })
      //carousel-movie JS
   //    $('#carousel-movie').carousel({
   //     interval: 10000
   // });

  })(jQuery); // End of use strict


//USER LOGIN AND REGISTRATION page JQUERY

// jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a');

		// $content_pg_login = $('#content-pg-login');


		$('#main-nav-signin, #content-pg-login').on('click', function(event){
					$form_modal.addClass('is-visible');
			( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
		});


	//close modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//switch from a tab to another
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(){
		var $this= $(this),
			$password_field = $this.prev('input');

		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
		//focus and move cursor to the end of input field
		$password_field.putCursorAtEnd();
	});

	//show forgot-password form
	$forgot_password_link.on('click', function(event){
		// event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	$back_to_login_link.on('click', function(event){
		// event.preventDefault();
		login_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}


	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

// });

jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};



$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function (){
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

});


//SCRAP
// if(newMovieSubmitBtn) {
//   newMovieSubmitBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     var newMovieActorsArray = [];
//     var newMovieDirectorsArray = [];
//
//     var newMovieName = movieName.value;
//     newMovieActorsArray.push(movieActors.value);
//     newMovieDirectorsArray.push(movieDirectors.value);
//     var newMovieDirectors = movieDirectors.value;
//     var newTitleYearMovie = titleYearMovie.value;
//     var newTitleGenreMovie = titleGenreMovie.value;
//     var newImdbRatingMovie = imdbRatingMovie.value;
//     var newMovieImgPreview = movieImgPreview.value;
//
//     var arrMovie = [];
//     arrMovie.push({'Movie-Name': newMovieName, 'Cast': newMovieActorsArray, 'Directors': newMovieDirectorsArray, 'Release-Year': newTitleYearMovie, 'Genre': newTitleGenreMovie,'IMDB-Ratings': newImdbRatingMovie, 'Movie-Poster':newMovieImgPreview});
//     var MovieJsonString = JSON.stringify(arrMovie);
//     console.log(MovieJsonString);
//     alert('You have successfully added a new movie to the list');
//   });
// }
