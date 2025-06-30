$(document).ready(function () {
  $("li.active").removeClass("active");
  $('a[href="' + location.pathname + '"]')
    .closest("li")
    .addClass("active");
});

window.onscroll = function() {myFunction()};

var header = document.getElementById("menu");
var sticky = header.offsetTop;
var placeholderHeight = document.getElementById("menu").clientHeight;
var placeholder = document.getElementById("placeHolder");

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("fixmenu");
    placeholder.style.height = placeholderHeight + 'px';

  } else {
    header.classList.remove("fixmenu");
    placeholder.style.height = 'auto';
  }
}



const nav = document.querySelector(".fixedNav");
window.addEventListener("scroll", fixNav);

function fixNav() {
  if (window.scrollY > nav?.offsetHeight + 150) {
    nav.classList.add("navbar-active");
   nav.removeAttribute('clip-path');
  } else {
    nav.classList.remove("navbar-active");
  }
}
	
$(document).ready(function() {
  var $lightbox = $('#lightbox');
  
  $('[data-target="#lightbox"]').on('click', function(event) {
      var $img = $(this).find('img'), 
          src = $img.attr('src'),
          alt = $img.attr('alt'),
          css = {
              'maxWidth': $(window).width() - 100,
              'maxHeight': $(window).height() - 100
          };
  
      $lightbox.find('.close').addClass('hidden');
      $lightbox.find('img').attr('src', src);
      $lightbox.find('img').attr('alt', alt);
      $lightbox.find('img').css(css);
  });
  
  $lightbox.on('shown.bs.modal', function (e) {
      var $img = $lightbox.find('img');
          
      $lightbox.find('.modal-dialog').css({'width': $img.width()});
      $lightbox.find('.close').removeClass('hidden');
  });
});

var conf_name = "Novaïs";
var conf_email = "pro@novais-enr.fr";
var modal_rgpd = '<div class="modal fade" id="modal-rgpd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '        <div class="modal-dialog" role="document">' +
    '            <div class="modal-content">' +
    '                <div class="modal-body">' +
    '                  * En cochant cette case, j’accepte que mes données personnelles soient collectées et traitées par le service commercial de '+conf_name+'.' +
    '                   Leur traitement a pour finalité de traiter votre demande spécifique.<br>' +
    '                   Les données collectées sont conservées pour la durée de nos relations commerciales + 1 an. Conformément à la loi' +
    '                   « informatique et libertés », vous pouvez exercer votre droit d’accès aux données vous concernant et les faire rectifier' +
    '                   auprès de notre référent à <a href="mailto:"'+conf_email+'">'+conf_email+'</a>.<br>' +
    '                   Vous disposez également d’un droit de rectification, à l’oubli, à la portabilité, de limitation ou d’opposition auprès de notre référent à ' +
    '                   <a href="mailto:'+conf_email+'">'+conf_email+'</a>.<br><br>' +
    '                   En dernier recours, vous pouvez déposer une réclamation auprès de la CNIL.' +
    '                </div>' +
    '                <div class="modal-footer">' +
    '                    <div class="form-group text-center">' +
    '                        <button type="button" class="btn btn-default btn-primary" data-dismiss="modal">Fermer</button>' +
    '                    </div>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>';
$( document ).ready(function() {
    $(".info-rgpd label").after(function () {
        return '&nbsp;<a href="#" data-toggle="modal" data-target="#modal-rgpd"><i class="fa fa-info-circle"></i></a>'+modal_rgpd;
    });
});


$(document).ready(function(){
  $('.bxslider').bxSlider({
    minSlides: 1,
    auto:true,
    moveSlides: 1,
    speed:1000,
    pause:8000,
    maxSlides: 1,
    slideMargin: 0,
    touchEnabled: true,
    controls: true,
    infiniteLoop: true,
    adaptiveHeight: true
    });

  $('.bxslider2').bxSlider({
    minSlides: 1,
    auto:true,
    pager: false,
    moveSlides: 1,
    speed:1500,
    pause:3000,
    maxSlides: 7,
    slideWidth: 130,
    slideMargin: 20,
    touchEnabled: false,
    controls: true,
    infiniteLoop: true,

    });
});

new WOW().init();


$(window).scroll(function(){
  if($(document).scrollTop()>350){
    $(".backTotop").addClass('active1');
  }else{
     $(".backTotop").removeClass('active1');
  }
});

$('a[href^="#backTotop"]').click(function(){
  var the_id = $(this).attr("href");

  $('html, body').animate({
    scrollTop:$(the_id).offset().top - 200
  }, 'slow');
  return false;
});


$('.count').counterUp({
  delay: 10,
  time: 2000
});


$("body").niceScroll({
  cursorcolor:"#0397D9",
  cursorwidth:"10px",
  background:"rgb(221, 221, 221)",
  cursorborder:"0",
  cursorborderradius:"5px",
  autohidemode: false,
  scrollspeed: 120,
  hwacceleration: false,
});

$("#myModal").on('hidden.bs.modal', function (e) {
  $("#myModal iframe").attr("src", $("#myModal iframe").attr("src"));
});



$(".nav-pills li a").click(function(e) {

  var position = $(".placeHolder").offset().top;

  $("body, html").animate({
      scrollTop: position - 200
  } , 'slow' );
});



function setSrc(id, src){
  document.getElementById(id).setAttribute('src', src);
}