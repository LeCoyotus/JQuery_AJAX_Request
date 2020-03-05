
// ---------------------- PARTIE CAROUSEL ---------------------- //

var slideIndex = 1;
showSlides(slideIndex);

// Contrôles suivant/précédent
function naviguerSlide(n) {
  showSlides(slideIndex += n);
}

// Contrôles des vignettes
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Affichage des images du carousel
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("Slides");
  var dots = document.getElementsByClassName("point");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.opacity = "0";
      slides[i].style.visibility = "hidden";
      slides[i].style.position = "absolute"
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.opacity = "1";
  slides[slideIndex-1].style.visibility = "visible";
  slides[slideIndex-1].style.position = "relative";
  dots[slideIndex-1].className += " active";
}

// Permet de slider à l'aide des touches gauches et droites
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
      naviguerSlide(-1) //gauche <- Image précédente
    } else if (e.keyCode == '39') {
        // droite -> Image suivante
        naviguerSlide(1)
    }
}

// autre slider

// var n = 1;

// $(".image1").hide();
// $(".image2").hide();
// $(".image3").hide();

// $(function(){
//   setInterval(function(){
//     if (n == 4) {
//       n = 1;
//     }
//     $(".image" + n).fadeIn(3000).hide(0);
//     n++;
//   }, 3000);
// })

/////////////////////////////////////////
// Partie requête Ajax via une API

const keyApi = "1b8fa2e96abf25e7ab806c7ac8ad7f8c";

var query = "";
var lien = "";

function supprimerContenu() {
  $("#contenu").empty();
}

function afficherContenu() {
  $("#contenu").show();
}

$("#contenu").hide();

$(".nav").click(function(event) {

  console.log(event.target.id);
  lien = event.target.id;

  switch(lien) {
    case "lien1" :
      query = "Jack Reacher"
      break;
    case "lien2" :
      query = "Batman Begins";
      break;
    case "lien3" :
      query = "Shutter Island";
      break;
    case "rech" :
      query = prompt("Veuillez entrez le titre du film");
      break;
  }

  if (query == null) {
    query = "dumb and dumber"
  }

  requete = "https://api.themoviedb.org/3/search/movie?api_key=" + keyApi +"&query=" + query;
  supprimerContenu();
  
  $.getJSON( requete, function( data ) {
    $( ".result" ).html( data );
    donnéesFilm = data.results[0];
    console.log(donnéesFilm);
    $("#contenu").append($("<h1>" + donnéesFilm.original_title + "</h1>"));
    $("#contenu").append($("<p>" + donnéesFilm.overview + "</p>"));
    $( "<img>" ).attr( "src", "https://image.tmdb.org/t/p/w500" + donnéesFilm.poster_path).appendTo( "#contenu" );
    $("#contenu").append($("<p class='date'> Date de sortie : " + donnéesFilm.release_date + "</p>"));
  });

  afficherContenu();
})

// // $.get( requete, function( data ) {
// //     $( "body" )
// //       .append( "ID: " + data.results.id ) // John
// //       .append( ": " + data.results.title ); //  2pm
// //   }, "json" );

// $("#slideshow").hide()
// $("#slideshow").show()
// $("#slideshow").fadeIn()
// $("#slideshow").fadeOut()


// setInterval(function(){
//   if (i == 4) {
//     i = 1;
//   }
//   console.log(i);
//   $(".image" + i).show(0);
//   $("#slideshow img" + i).animate({
//     left: "+=100", 
//     top: "+=50" ,
//     display: "block"}, 2000);
//   $(".image" + i).hide(0);
//   i++;
// }, 2000);
