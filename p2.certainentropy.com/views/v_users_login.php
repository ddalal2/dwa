<div id = "content" class = "span-24 last">

<fieldset>
<legend><h1 class="loud"> Welcome to Convers.io</h1></legend>
<h2 class = "alt">Login in to join conversation!</h2>
<? if($error == 'error'): ?>
		<div class="error">
			Login failed. Please double check your email and password. Are you a new user? <a href ='/ users/signup' > Click here to signup.</a> 
		</div>
		<br>
<? endif; ?>
<? if($error == 'login'): ?>
		<div class="error">
		Oops, you're not logged in. Please login to view member's area.<br />
		Are you a new user? <a href ='/users/signup' > Click here to signup.</a>  		
		</div>
		<br>
<? endif; ?>	
<? if($error == 'success'): ?>
		<div class="success">
			Congradulations, you've successfully signed up! Please login below to get started!		
		</div>
		<br>
<? endif; ?>	
<form method = 'POST' action = '/users/p_login'>
	<h3 class="loud">Email: &nbsp;&nbsp;&nbsp;&nbsp;<input type ='text' name = 'email'></h3>
	<h3 class ="soft">Password: <input type ='password' name = 'password'></h3>
	
	
<input type = "submit" value = 'Login!'>
</form>
</fieldset>

</div>