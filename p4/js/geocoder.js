var geocoder;
var map;
var marker;
var col_counter = 0;
var style = "style = 'float:left'";
 
 
function initialize(){
//MAP
   var latlng = new google.maps.LatLng(38.8951118,-77.0363658);
	  var options = {
		zoom: 12,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
			
	  map = new google.maps.Map(document.getElementById("map_canvas"), options);
}
  //GEOCODER
  geocoder = new google.maps.Geocoder();
        
  marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

	
$(document).ready(function() { 
         
  initialize();
  
  
  $('#simple_search').click(function(){
			var query = $('#query').val();
			var tweet_count = $('#tweet_count').val();
			if(col_counter < 3)
			{
				col_counter++;
				generate_feed(query, col_counter, tweet_count);
			}
	});
	
	
  
	$('#geo_submit').click(function(){
			var query_g = $('#geo_query').val();
			var tweet_count_g = $('#tweet_count_g').val();
			var radius = $('#radius').val();
			var longlat = $('#latitude').val() + "," + $('#longitude').val();
			var geocode ="&geocode=" +longlat+ ","+radius;
			
			if(col_counter < 2)
			{
				$('#moniter').append('<div class="twitStream '+ tweet_count_g +'" '+style+ 'id="display_'+col_counter+'" title="'+query_g+'"><div class = "navbar"><a href = "#" onclick="remove('+col_counter+');">Remove</a></div>Query:  '+ query_g+ ' within '+radius+' of: <br> Latitude:'+$('#latitude').val() + "<br>Longitude:" + $('#longitude').val()+' <hr/></div> ');	
			}
			if (col_counter == 2)
			{
				$('#moniter').append('<div class="twitStream '+ tweet_count_g+'" id="display_'+col_counter+'" title="'+query_g+'"><div class = "navbar"><a href = "#" onclick="remove('+col_counter+');">Remove</a></div>Query:  '+ query_g+' within '+radius+' of: <br> Latitude:'+$('#latitude').val() + "<br>Longitude:" + $('#longitude').val()+'<hr/></div>');
			}
			
			$('.twitStream').each(function(){
				fetch_tweets(this,geocode);
			});
			col_counter++;
			if (col_counter > 3)
			{
				alert("Error");
			}
			
		
	});
	
				  
  $(function() {
	
    $("#address").autocomplete({
      //This bit uses the geocoder to fetch address values
      source: function(request, response) {
        geocoder.geocode( {'address': request.term }, function(results, status) {
          response($.map(results, function(item) {
            return {
              label:  item.formatted_address,
              value: item.formatted_address,
              latitude: item.geometry.location.lat(),
              longitude: item.geometry.location.lng()
            }
          }));
        })
      },
      //This bit is executed upon selection of an address
      select: function(event, ui) {
        $("#latitude").val(ui.item.latitude);
        $("#longitude").val(ui.item.longitude);
        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker.setPosition(location);
        map.setCenter(location);
      }
    });
  });
});

function generate_feed(query, col_counter, tweet_count){
	if(col_counter < 3)
	{
		$('#moniter').append('<div class="twitStream '+ tweet_count +'" '+style+ 'id="display_'+col_counter+'" title="'+query+'"> <div class = "navbar"><a href = "#" onclick="remove('+col_counter+');">Remove</a></div><p><strong>Query:</strong>  '+ query+'</p><hr/></div> ');	
	}
	if (col_counter == 3)
	{
		$('#moniter').append('<div class="twitStream '+ tweet_count +'" id="display_'+col_counter+'" title="'+query+'"> <div class = "navbar"><a href = "#" onclick="remove('+col_counter+');">Remove</a></div>Query:  '+ query+'</div>');
	}
	
	$('.twitStream').each(function(){
		fetch_tweets(this);
	});
};

function generate_geofeed(query, col_counter, tweet_count, geocode){
	

};


function remove(col){
	var div_name = "#display_" + col;
	$(div_name).remove();
	col_counter--;
};