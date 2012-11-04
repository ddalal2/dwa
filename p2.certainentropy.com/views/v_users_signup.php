<div id = "content" class = "span-24 last">
<fieldset>
<legend><h1>Join the madness!</h1></legend>
<? if($error == 'error'): ?>
		<div class="error">
			This email already has an account on this site. Please use another email to sign up.
		</div>
		<br>
<? endif; ?>
<? if($error == 'blank'): ?>
		<div class="error">
			You left the password field blank. Please enter valid password
		</div>
		<br>
<? endif; ?>
<img src="/images/cute.jpg" style="width: 300px; height:362px; float:left; padding-right: 15px;" >
<form method ='POST' action = '/users/p_signup'>
	<h3 class="loud">First Name: &nbsp; <input type = 'text' name = 'first_name'></h3>
	<h3 class="loud">Last Name: <input type = 'text' name = 'last_name'></h3>
	<h3 class="loud">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type = 'text' name = 'email'></h3>
	<h3 class="loud">Password:&nbsp;&nbsp;<input type = 'password' name = 'password'></h3>
	<input type = 'submit'>
</form>
</fieldset>
</div>