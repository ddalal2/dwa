<div id = "content" class = "span-24 last">

<fieldset>
<legend><h1 class="loud"> Welcome to Convers.io</h1></legend>
<h2 class = "alt">Login in to join conversation!</h2>
<form method = 'POST' action = '/users/p_login'>
	<h3 class="loud">Email: &nbsp;&nbsp;&nbsp;&nbsp;<input type ='text' name = 'email'></h3>
	<h3 class ="soft">Password: <input type ='password' name = 'password'></h3>
	<? if($error): ?>
		<div class='error'>
			Login failed. Please double check your email and password. Are you a new user? <a href ='/ users/signup' > Click here to signup.</a> 
		</div>
		<br>
	<? endif; ?>	
	
<input type = "submit" value = 'Login!'>
</form>
</fieldset>

</div>