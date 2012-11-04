<!DOCTYPE html>
<html>
<head>
	<title><?=@$title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	
	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
				
	<!-- Controller Specific JS/CSS -->
	<?php echo @$client_files; ?>
	
</head>

<body>	
		
	<div class = "container">
		<div id = "header" class = "span-24 last">
			<img src = "/images/logo.jpg" alt="Convers.io - Conversation Engine">
		</div>
	<hr />
	
	<div class = "info">
	<center>
	<!-- Menu for users who are logged in -->
		<? if($user): ?>
			<h3><a href='/users/profile'>My Profile</a> |
			<a href='/posts/users/'>My Network</a> |
 			<a href='/posts/'>View Conversations</a> |
			<a href='/users/logout'>Logout</a> </h3> 
	<!-- Menu options for users who are not logged in -->	
		<? else: ?>
			<h3><a href='/users/signup'>Sign up</a> |
			<a href='/users/login'>Log in</a></h3>
		<? endif; ?>
	</center>
	</div>		
	<hr />
	<?=$content;?> 
	 
	<div id = "footer" class = "span-24 last">
	<hr />	
			<div class = "info"><center><pre>Dhairya Dalal ~ Project 2 ~ CSIE- 75 ~ Site produced using <a href = "http://www.blueprintcss.org/" target = "_blank">Blueprint CSS Framework </a> and <a href ="http://kohanaframework.org/" target = "_blank"> Kohana Framework </a> </pre></center></div> 

	</div>

</body>
</html>