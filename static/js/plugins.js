function myFunction(list){
    //alert("Entro a myFunction: "+ data[0].name);
    //$("#movie").text(data[0].name)
	
    $("#movie").html("<table class='table table-bordered table-condensed'>");
    for(i=0;i<list.length;i++){
        try{
            var src = list[i].posters[0].image.url;
            var url = list[i].url;
        }catch(Exception){
            //alert("hubo un error");
            src="http://i.media-imdb.com/images/mobile/film-40x54.png"
            url=""
        }
        $("#movie").append("<tr>" +
            "<td valign='top' class='movie_image'>" +
            "<a href='"+url+"' target='_blank'><img src='"+src+"' class='img50' /></a>" +
            "</td>" +
            "<td valign='top' class='title'>" +
            "<a href='"+url+"' target='_blank'>"+list[i].name +
            "<div>"+list[i].overview+"</div></a>" +
            "</td>" +
            "</tr>");
    }
    $("#movie").append("</table>");
	
}
function imdb1(url){
    (function($) {
        $.ajax(
        {
            type		: "GET",
            url			: url,
            async		: false,
            //jsonpCallback: 'myFunction',
            contentType	: 'application/json',
            dataType	: 'jsonp',
            //	data		: "id_project="+id,
            beforeSend	: function(data){
                $("#load").html('<i>Cargando...</i>');
            },
            success		: function(requestData){ 	//Llamada exitosa
            //var movie = jQuery.parseJSON(requestData);
            //$("#movie2").html("<pre>"+requestData.Title+"</pre>");
            //$("#movie2").html("<pre>"+movie['Title']+" + "+movie['Year']+"</pre>");
            },
            error		: function(requestData, strError, strTipoError){
                alert("Error: " + strTipoError +' => ' + strError+ ' , req: '+requestData);
            },
            complete	: function(requestData, exito){ 
                $("#load").html("<strong>"+exito+"</strong>");
            }
        });
    })(jQuery);
}

function imdb2(url){
    //jQuery.getScript(url+ "&callback=myFunction",function(e){alert("callback");}	); //   + "&callback=?"
    var res=jQuery.getScript(url+ "&callback=?",function(e){
        alert("callback")
    });
/*
	imdb$avengers = function (list) {
		  //alert("llego a la funcion: "+ list.q);
		  $("#movie").html("<table>");
		  for(i=0;i<list.d.length;i++){
			  try{
			  	var src = list.d[i].i[0];
			  }catch(Exception){
				  //alert("hubo un error");
				  src="http://i.media-imdb.com/images/mobile/film-40x54.png"
			  }
		  	$("#movie").append("<tr><td><img src='"+src+"' width='35px' /></td><td  valign='top'>"+list.d[i].l+"</td></tr>");
		  }
		  $("#movie").append("</table>");
	};*/
//$.getJSON(url).success(function(data){
//    console.log(data); // will contain all data (and display it in console)
//})

// With local proxy to a PHP script replacing imdb$foo with a sanitized
// version of $_GET['callback']
//jQuery.getScript('imdb.php?q=foo&callback=myFunction');

// With local proxy to a PHP script to fix the callback, using jQuery automatic
// callback magic '?' value
//jQuery.getJSON( 'imdb.php?q=foo&callback=?', function (list) {

//});
}

function imdb3(url){
    (function($) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            //jsonpCallback: 'myFunction',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                console.dir(json);
                myFunction(json);
            },
            error: function(e) {
                console.log(e.message);
                alert("error")
            }
        });
    })(jQuery);
}

function main(){
//    var url = "http://sg.media-imdb.com/suggests/"+q0+"/"+q+".json";
//    var url2 = "http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q="+q;
//    var url3 = "http://www.imdb.com/xml/find?xml=1&tt=1&nm=on&q="+q;
//    var url6="http://api.themoviedb.org/2.1/Movie.search/es-CO/xml/"+APIKEY+"/"+q;
//    var url7="http://api.themoviedb.org/2.1/Movie.search/es-CO/json/"+APIKEY+"/"+q;
    $("#search-form").on("submit",search);
}

function search(e){
    e.preventDefault();
    $("#movie").text("Buscando.... espere....");
    var q=$("#search").val();
    var APIKEY = "10562c9ee2722c0be2a1c3bc31e3028a";
    var url7="http://api.themoviedb.org/2.1/Movie.search/es-CO/json/"+APIKEY+"/"+q;

    imdb3(url7);
}

$(document).on("ready",main);