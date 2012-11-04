<div id = "content" class = "span-24 last">
<fieldset>
<legend><h2 class="loud"> Conversations I'm following</h2></legend>

		<!--Reverse passed array in order to display posts from most recent to oldest-->
		<? $posts = array_reverse($posts); ?>
			
		<? foreach($posts as $post): ?>
			<div class="box">
			<h2><?=$post['first_name']?> <?=$post['last_name']?></h2> posted on <? echo date('F j, Y, g:i a', $post['modified']);?>
			<hr />
			<h3 class="loud"><?=$post['content']?></h3>
			</div>
		<? endforeach; ?>
	
</fieldset>

</div>