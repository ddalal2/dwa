        // Define API key for Sunlight Labs API calls
		// API documentation can be found here: http://services.sunlightlabs.com/
		var apikey = "apikey=d9fb3679b63e40e88be90a468b08ab4c";
		//global json variable for api data
		var global_senators = new Array();	
		var global_reps = new Array();	
		
		
		function display_senators(index)
		{
			$('#display_content').html("<center><image src = 'images/"+global_senators[index].bioguide_id+".jpg'> </center> <br><div  style = 'float:left;' alt='no image available'><h2>Sen. "+global_senators[index].firstname + " " + global_senators[index].lastname +" ("+global_senators[index].party+")</h2>");
			$('#display_content').append("<br><table><tr> <td> <h3>Contact Details</h3></td> </tr>");
			$('#display_content').append("<tr><td>Congress Office: </td> <td>"+global_senators[index].congress_office+"</td></tr>");
			if(global_senators[index].phone!= "")
			$('#display_content').append("<tr><td>Phone: </td> <td>"+global_senators[index].phone+"</td></tr>");
			if(global_senators[index].email!= "")	
			$('#display_content').append("<tr><td>Email: </td> <td>"+global_senators[index].email+"</td></tr>");
			if(global_senators[index].website!= "")
			$('#display_content').append("<tr><td>Website: </td> <td><a href ='"+global_senators[index].website+"' target=new>"+global_senators[index].website+"</a></td></tr>");
			if(global_senators[index].webform!= "")
				$('#display_content').append("<tr><td>Contact Form: </td> <td><a href ='"+global_senators[index].webform+"'>"+global_senators[index].webform+"</a></td></tr>");
			$('#display_content').append("<tr><td>Social Media: </td> <td>");
				if(global_senators[index].twitter_id != null)
					$('#display_content').append("<a href = 'http://twitter.com/"+global_senators[index].twitter_id+"' target = new ><img src = 'icons/twitter.png'></a>");
				if(global_senators[index].facebook_url != null)
					$('#display_content').append("&nbsp;&nbsp;&nbsp;<a href = 'https://facebook.com/"+global_senators[index].facebook_url+"' target = new ><img src = 'icons/facebook.png'></a>");
				if(global_senators[index].youtube_url != null)
					$('#display_content').append("&nbsp;&nbsp;&nbsp; <a href = '"+global_senators[index].youtube_url+"' target = new ><img src = 'icons/youtube.png'></a>");
			$('#display_content').append("</td></tr></table>");
		}
		
		function display_reps(index)
		{
			$('#display_content').html("<center><image src = 'images/"+global_reps[index].bioguide_id+".jpg'></center><br><div  style = 'float:left;'><h2>Sen. "+global_reps[index].firstname + " " + global_reps[index].lastname +" ("+global_reps[index].party+": District " +global_reps[index].district+ ")</h2>");
			$('#display_content').append("<br><table><tr> <td colspan = 2> <h3>Contact Details</h3></td> </tr>");
			$('#display_content').append("<tr><td>Congress Office: </td> <td>"+global_reps[index].congress_office+"</td></tr>");
			if(global_reps[index].phone!= "")
				$('#display_content').append("<tr><td>Phone: </td> <td>"+global_reps[index].phone+"</td></tr>");
			if(global_reps[index].email != "")
				$('#display_content').append("<tr><td>Email: </td> <td>"+global_reps[index].email+"</td></tr>");
			if(global_reps[index].website != "")	
				$('#display_content').append("<tr><td>Website: </td> <td><a href ='"+global_reps[index].website+"' target=new>"+global_reps[index].website+"</a></td></tr>");
			if(global_reps[index].webform != "")	
				$('#display_content').append("<tr><td>Contact Form: </td> <td><a href ='"+global_reps[index].webform+"'>"+global_reps[index].webform+"</a></td></tr>");
			$('#display_content').append("<tr><td>Social Media: </td> <td>");
				if(global_reps[index].twitter_id != null)
					$('#display_content').append("<a href = 'http://twitter.com/"+global_reps[index].twitter_id+"' target = new ><img src = 'icons/twitter.png'></a>");
				if(global_reps[index].facebook_url != null)
					$('#display_content').append("&nbsp;&nbsp;&nbsp;<a href = 'https://facebook.com/"+global_reps[index].facebook_url+"' target = new ><img src = 'icons/facebook.png'></a>");
				if(global_reps[index].youtube_url != null)
					$('#display_content').append("&nbsp;&nbsp;&nbsp; <a href = '"+global_reps[index].youtube_url+"' target = new ><img src = 'icons/youtube.png'></a>");
			$('#display_content').append("</td></tr>");
			$('#display_content').append("</table>");
		}
		
		
		
		$('document').ready(function() { 
                
             
			   $('#state_list').click(function() {   
					 
					//Collect state from user click
                    var state = "state=" + $(this).val();
					
					$.ajax({
						url: 'http://services.sunlightlabs.com/api/legislators.getList.json?'+apikey+'&'+ state,
						dataType: 'jsonp',
						cache: true,
						jsonp: 'jsonp',
						success: function(data) {
							var senators = new Array; 
							var rep = new Array;
							console.log();
							var s = 0;
							var r = 0;
							for (var i=0; i<data.response.legislators.length;i++)
							{ 
								if(data.response.legislators[i].legislator.title == "Rep")
									{
										rep[r] = new Object();
										rep[r].firstname = data.response.legislators[i].legislator.firstname;
										rep[r].lastname = data.response.legislators[i].legislator.lastname;
										rep[r].party = data.response.legislators[i].legislator.party;
										rep[r].state = data.response.legislators[i].legislator.state;
										rep[r].district = data.response.legislators[i].legislator.district;
										rep[r].phone = data.response.legislators[i].legislator.phone;
										rep[r].website = data.response.legislators[i].legislator.website;
										rep[r].webform = data.response.legislators[i].legislator.webform;
										rep[r].email = data.response.legislators[i].legislator.email;
										rep[r].bioguide_id = data.response.legislators[i].legislator.bioguide_id;
										rep[r].twitter_id = data.response.legislators[i].legislator.twitter_id;
										rep[r].youtube_url = data.response.legislators[i].legislator.youtube_url;
										rep[r].facebook_id = data.response.legislators[i].legislator.facebook_id;
										rep[r].congress_office = data.response.legislators[i].legislator.congress_office;
										r++;
									}
									else
									{
										senators[s] = new Object();
										senators[s].firstname = data.response.legislators[i].legislator.firstname;
										senators[s].lastname = data.response.legislators[i].legislator.lastname;
										senators[s].party = data.response.legislators[i].legislator.party;
										senators[s].state = data.response.legislators[i].legislator.state;
										senators[s].phone = data.response.legislators[i].legislator.phone;
										senators[s].website = data.response.legislators[i].legislator.website;
										senators[s].webform = data.response.legislators[i].legislator.webform;
										senators[s].email = data.response.legislators[i].legislator.email;
										senators[s].bioguide_id = data.response.legislators[i].legislator.bioguide_id;
										senators[s].twitter_id = data.response.legislators[i].legislator.twitter_id;
										senators[s].youtube_url = data.response.legislators[i].legislator.youtube_url;
										senators[s].facebook_id = data.response.legislators[i].legislator.facebook_id;
										senators[s].congress_office = data.response.legislators[i].legislator.congress_office;
										s++;
									}
																			
							}
							 
							$('#results').html("<strong> Senators </strong> <ul>");
							
							for(var x = 0; x < senators.length; x++)
							{
								$('#results').append("<li> <a href='#' onclick= 'display_senators("+x+")'>Sen. " + senators[x].firstname + " " + senators[x].lastname +" (<strong>" +senators[x].party+ "</strong>)</a> </li>");
								
							}
							$('#results').append("</ul> <br/> <strong> Representatives </strong><ul>");
							
							//Sort Rep array by district
							rep.sort(function(a, b){return a.district-b.district});
							
							for(var x = 0; x < rep.length; x++)
							{
								$('#results').append("<li><a href = '#' onclick='display_reps("+x+")'>Rep. " + rep[x].firstname + " " + rep[x].lastname +" ( <strong>" + rep[x].party+ " </strong>: District " +rep[x].district+")</a></li>");
								
							}	
							$('#results').append("</ul>");
							global_senators = senators;
							global_reps = rep;
						}
						
					});
					
				});
				
				
		}); 
