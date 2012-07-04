function createTable(list,query){
    //    $("#movie > table").empty()//.slideToggle("slow");
    $("#search-info > #result-num").text(list.length);
    $("#search-info > #query-string").text(query);
    $("#movie").fadeIn(160,function(e){
        $("#movie > table").slideDown("slow")
    });
    var l = '';
    for(i=0;i<list.length;i++){
        try{
            var url = list[i].url;
        }catch(Exception){
            url="#error"
        }
        try{
            var id=(list[i].imdb_id != null) ? "title/"+list[i].imdb_id : "find?q="+query+"&s=all" ;
            var url_imdb = "http://www.imdb.com/"+id;
        }catch(Exception){
            url_imdb="http://www.imdb.com/find?q="+query+"&s=all";
        }
        try{
            var src = list[i].posters[0].image.url;
        }catch(Exception){
            src="http://i.media-imdb.com/images/mobile/film-40x54.png"
        }
        var desc = ( list[i].overview != null ) ?(list[i].overview).substring(0, 400)+"...":"No Description";
        l += "<tr>" +
        "<td valign='top' class='movie_image'>" +
        "<a href='"+url+"' target='_blank'><img src='"+src+"' class='img50' /></a>" +
        "</td>" +
        "<td valign='top' class='title'>" +
        "<a href='"+url+"' target='_blank'>"+list[i].name +
        "<div>"+desc+"</div></a>" +
        "</td>" +
        "<td>"+
        "<a href='"+url+"' class='bonton btn btn-success' target='_blank' >TMDB</a>"+
        "<a href='"+url_imdb+"' class='bonton btn btn-warning' target='_blank' >IMDB</a>"+
        "</td>"+
        "</tr>";
    }
    $("#movie > table").append(l);
}

function getTMDB(url,q){
    (function($) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            //jsonpCallback: 'myFunction',
            contentType: 'application/json',
            dataType: 'jsonp',
            beforeSend	: function(data){
                $("#movie").fadeOut(500,function(e){
                    $("#movie  > table").empty("");
                })
                $("#load").html("<img src='/static/img/load16.gif' />");
            },
            success: function(json) {
                console.dir(json);
                if(json.length == 1 && json[0] == "Nothing found."){
                    $("#movie").removeClass("hidden");
                    $("#search-info > #result-num").text(0);
                    $("#search-info > #query-string").text(q);
                    $("#movie").fadeIn(160,function(e){
                        $("#movie > table").slideDown("slow")
                    });
                }
                else{
                    createTable(json,q);
                }
            },
            error: function(e) {
                console.log(e.message);
                alert("error")
            },
            complete	: function(requestData, exito){ 
                $("#load").empty();
            }
        });
    })(jQuery);
}

function search(e){
    e.preventDefault();
    var q=$("#search").val();
    var APIKEY = "10562c9ee2722c0be2a1c3bc31e3028a";
    var url7="http://api.themoviedb.org/2.1/Movie.search/es-CO/json/"+APIKEY+"/"+q;

    getTMDB(url7,q);
}

function main(){
    //--------<on submit when search>------------//
    $("#search-form").on("submit",search);
    //--------</on submit when search>------------//
    
    //-------------------<letra blanca del perfil on hover>-------------------------//
    $("ul.dropdown-menu li.current-user").hover(
        function(e){$(".content-box *").addClass("color-fff")},
        function(e){$(".content-box *").removeClass("color-fff")}
    );
    //-------------------</letra blanca del perfil on hover>-------------------------//
    
    //------<No cierra el Menú de login al dar click>---------------/
    $(".next-li").focus(function(e){
            $("ul.dropdown-menu").addClass("disblock")
        }).blur(function(e){
           // $("ul.dropdown-menu").removeClass("disblock")
        });
    //------ </No cierra el Menú de login al dar click>--------------/
    
    
    //------ <On Login Submit >--------------/
    $("#close-login-menu").on("click",function(e){
        e.preventDefault();
        $("ul.dropdown-menu").removeClass("disblock");
    });
    //------ </On Login Submit >--------------/
}

$(document).on("ready",main);




/**
 * CONSULTAS A LAS APIS DE PELICULAS
    //    var url = "http://sg.media-imdb.com/suggests/"+q0+"/"+q+".json";
    //    var url2 = "http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q="+q;
    //    var url3 = "http://www.imdb.com/xml/find?xml=1&tt=1&nm=on&q="+q;
    //    var url6="http://api.themoviedb.org/2.1/Movie.search/es-CO/xml/"+APIKEY+"/"+q;
    //    var url7="http://api.themoviedb.org/2.1/Movie.search/es-CO/json/"+APIKEY+"/"+q;
    
 */