var retrievedData = localStorage.getItem("authedUser");
var profileData = JSON.parse(retrievedData);
//Show/hide logged in username, if user is logged in
if (profileData) {
  $('.account-nav-trigger').css('display', 'flex');
  $('.site-header .btn').hide();
  $('.mobile-nav-btn').hide();
  var profileName = profileData.firstName + " " + profileData.lastName;
  var profileEmail = profileData.email;
  var firstNameLetter = profileData.firstName.charAt(0);
  var lastNameLetter = profileData.lastName.charAt(0);
  $('.account-name').text(profileName);
  $('.account-email').text(profileEmail);
  $('.first-name-letter').text(firstNameLetter);
  $('.last-name-letter').text(lastNameLetter);
}
function handleLoggedInState() {
  if (window.matchMedia("(max-width:991px)").matches) {
    if (profileData) {
    } else {
      $('.mobile-nav-btn').css('display', 'inline-block');
      $('.btn-nav').css('display', 'none');
    }
  } else {
    if (profileData) {
      $('.account-nav-trigger').css('display', 'flex');
      $('.mobile-nav-btn').css('display', 'none');
    } else {
      $('.btn-nav').css('display', 'inline-block');
    }
  }
}
function checkScroll() {
  if (window.matchMedia("(max-width:991px)").matches) {
    $('.site-header').addClass('is-fixed');
  } else {
    $('.site-header').removeClass('is-fixed');
    if ($(window).scrollTop() > 80){
      $('.all-cats').addClass('is-fixed');
    } else {
      $('.all-cats').removeClass('is-fixed');
    }
  }
}
$( document ).ready(function() {
  //Show/hide logged in menu
  handleLoggedInState();
  checkScroll();
  //main menu
  var open = $('.navbar-toggler');
  open.click(function() {
    var overlay = $('.overlay');
    var nav = $('.all-cats');
    var icon = $('.menu-toggle');
    var topNav = $('.top-nav');
    overlay.fadeToggle('fast');
    nav.toggleClass("menu-open");
    topNav.toggleClass("white");
    icon.toggleClass('open');
    $(".all-cats li").each(function(index){
      $(this).css({
        'animation-delay' : 0.1*(1+index) + 's'
      });
    });
  });
  //show/hide profile dropdown
  $('.account-nav-trigger').click(function() {
    $('.account-nav').fadeToggle(200);
    $(this).find('.account-chevron').toggleClass('up');
  });
  //wrap iframes inside a responsive container
  $('.doc-text iframe').wrap('<div class="video-container"></div>');
  $('.video-container').wrap('<div class="iframe-container"></div>');
  //expand child categories in the left sidebar
  $('.parent-cat').click(function() {
    $(this).next('.children-cats').slideToggle(300);
    $(this).toggleClass('is-expanded');
  });
  //add chevron and show children articles in the left sidebar on an active article
  $('.is-active').closest('.children-cats').css('display', 'block');
  $('.is-active').closest('.children-cats').prev('.parent-cat').addClass('is-expanded');
  //hides/shows left sidebar on mobile
  $('.nav-title').click(function() {
    $(this).next('.nav-container').slideToggle(300);
    $(this).toggleClass('is-expanded');
  });


  //add anchor tags inside single articles h2
  $(".doc-text h2").each(function(){
    var anchorId = $(this).attr("id");
    $(this).addClass('header-anchor');
  $(this).wrapInner( "<a href="+'#'+ anchorId +"></a>");
  });
  
  //smoothscroll
  linkScroll = $('.doc-nav a');
  $(linkScroll).on('click', anchorScroll);
  headerAnchor = $('.header-anchor a');
  $(headerAnchor).on('click', anchorScroll);
  function anchorScroll(e) {
  e.preventDefault();
  $('.doc-nav a').removeClass('is-active');
  $(this).toggleClass('is-active');
  $('body, html').animate({
    scrollTop: $(this.hash).offset().top - 80
  }, 500);
}
if(window.location.hash) {
  $('body, html').animate({
    scrollTop: $(window.location.hash).offset().top - 80
  }, 500);
}





});
function addActiveToToc() {
  var scrollTop = $(document).scrollTop();
  var anchors = $('.doc-text section');
  for (var i = 0; i < anchors.length; i++){
    if (scrollTop > $(anchors[i]).offset().top - 85 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 85) {
      $('.doc-nav a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('is-active');
    } else {
      $('.doc-nav a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('is-active');
    }
  }
}
$(window).scroll(function() {
  addActiveToToc();
  checkScroll();
});
$(window).resize(function(){
  handleLoggedInState();
  checkScroll();
});
