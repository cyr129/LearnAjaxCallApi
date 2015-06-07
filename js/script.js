
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    /*var streetStr =  "24 willie mays plaza";//$('#street').val();
    var cityStr = "san francisco,ca";//$('#city').val();
    var address = streetStr + ','+cityStr;
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';

    // load streetview

    // YOUR CODE GOES HERE!
   $body.append('<img class="bgimg" src="'+streetviewUrl+'">');*/
    // var country = "India";
    var country = $("#txtCountry").val();
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+country+'&sort=newest&api-key=20ca6553b171c3430d71d0022b906b75:1:71533129'
$.getJSON(nytimesUrl,function(data){
   $nytElem.text('********New York Times Articles about '+country);
   articles = data.response.docs;
   for(var i =0; i< articles.length;i++)
   {
   	var article = articles[i];
	//$nytElem.append('<li class = "article"><a href = "'+article.web_url+'">'article.headline.main+'</a><p>'+article.snippet+'</p>'+'</li>');
		$nytElem.append('<li class = "article" ><a href = "'+article.web_url+'">'+article.headline.main+'</a><p>'+article.snippet+'</p></li>');
   }
}).error(function(){$nytElem.text("Sorry Not Able to retrieve content from NYT")})


   var wikiReqTimeOut = setTimeout(function(){$wikiElem.text("Sorry Unable to get Data From Wiki");},8000);
   var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + country + "&callback=wikiCallback";
    $.ajax({
    url: wikiURL,
    dataType: 'jsonp',
    success: function(response) { 
    var articleList = response[1];
    for(var i=0; i< articleList.length;i++)
    {
    	articleStr = articleList[i];
    	var url = 'http://en.wikipedia.org/wiki/'+articleStr;
    	$wikiElem.append('<li><a href="'+url+'">'+articleStr+'</a></li>');
    }
    clearTimeout(wikiReqTimeOut);
	 //console.log(response);

     }
    
    
});

    return false;


};

$('#form-container').submit(loadData);


