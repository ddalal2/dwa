<div id = "content" class = "span-24 last">


<center><h1 class="loud"> Welcome <?=$user->first_name?></h1>
<? if($post_status == "sucess"): ?>
		<div class="success">
			<strong>Congrats, the world has more drivel to read!</strong>
		</div>
		<br>
<? endif; ?>
</center>

<fieldset>
<legend><h2 class="loud"> Feeling Musey? Submit a new post!</h2></legend>
<form method='POST' action='/posts/p_add'>

	<input type="submit" style="float: left; margin-top: 3%; margin-right: 20px;" value="Muse Away!">
	<textarea name="content" style="width: 80%; height: 50px;"></textarea>
</form>
</fieldset>

	<fieldset>
		<!--Reverse passed array in order to display posts from most recent to oldest-->
		<legend><h2 class="loud">My Musings</h2></legend>
		<? if($post_status == "empty"): ?>
		<div class="notice">
			<strong>Aww shucks, you've got nothing posted. Post a muse, share a yarn, tell a tale, or twitter about.</strong>
		</div>
		<br>
<? endif; ?>
		<? $posts = array_reverse($posts); ?>		
		<? foreach($posts as $post): ?>
			<div class="box">
			Posted: <? echo date('F j, Y, g:i a', $post['modified']);?>
			<hr />
			<h3 class="loud"><?=$post['content']?></h3>
			</div>
		<? endforeach; ?>
	
	</fieldset>

</div>
