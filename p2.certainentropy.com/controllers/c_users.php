<?php
class users_controller extends base_controller {

	public function __construct() {
		parent::__construct();
	} 

	public function index() {
		echo "Welcome to the users's department";
	}

	public function signup() {
		# Load CSS / JS
		$client_files = Array(
				"/blueprint/ie.css",
				"/blueprint/print.css",
				"/blueprint/screen.css",
	            );
	
        $this->template->client_files = Utils::load_client_files($client_files);      			
			# Setup View
			$this->template->content = View::instance('v_users_signup');
			$this->template->title = "Signup";
			
			#Render Template
				echo $this->template;		
	}
	
	public function p_signup(){
		# Dump out the results of POST to see what the form submitted
		print_r($_POST);		
		
		#Encrypt the password
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);		
				
		# Record User's timestamp and generate unique token for login
		$_POST['created'] = Time::now();
		$_POST['modified'] = Time::now();
		$_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());		
	
		#Insert this user into the database
		$user_id = DB::instance(DB_NAME)->insert("users",$_POST);
		
		
		$users = DB::instance(DB_NAME)->select_rows("SELECT * FROM users");
		#For now, confirm signup
		echo "<br>Congrats! You've signed up<br> Here is a data dump: <br>";		
		print_r($users);
	}
	
	public function p_login(){
					
		#Sanitize user input
		$_POST = DB::instance(DB_NAME)->sanitize($_POST);
	
		#Hash submitted pass for login validation
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
				
		# Validate login with stored db creds
		$q = "SELECT token
				FROM users
				WHERE email = '".$_POST['email']."'
				AND password = '".$_POST['password']."'";		
		
		$token = DB::instance(DB_NAME)->select_field($q);
		
		# Token test
		if(!$token){
			#redirect to login page if token is missing
			Router::redirect("/users/login/error");
		}
		# Else login suceeds
		else {		
			# store token in cookie
			setcookie("token", $token, strtotime('+1 year'), '/');
		
		#send them to main page 
		Router::redirect("/posts");
		}
	}

	public function login($error = NULL) {
		# Load CSS / JS
		$client_files = Array(
				"/blueprint/ie.css",
				"/blueprint/print.css",
				"/blueprint/screen.css",
	            );
	
      $this->template->client_files = Utils::load_client_files($client_files);      			
				
		#setup view
		$this->template->content = View::instance('v_users_login');
		$this->template->title = "Login";
		
		# Pass Error variable
		$this->template->content->error = $error;

		#Render template
		echo $this->template;	
			
	} 

	public function logout() {
	
	# Generate and save a new token for next login
	$new_token = sha1(TOKEN_SALT.$this->user->email.Utils::generate_random_string());
	
	# Create the data array we'll use with the update method
	# In this case, we're only updating one field, so our array only has one entry
	$data = Array("token" => $new_token);

	# Do the update
	DB::instance(DB_NAME)->update("users", $data, "WHERE token = '".$this->user->token."'");
	
	# Delete their token cookie - effectively logging them out
	setcookie("token", "", strtotime('-1 year'), '/');
	
	# Send them back to the main landing page
	Router::redirect("/");

}

	public function profile() {
		# If user is blank, alert user they are not logged in
		if(!$this->user){
			echo "Members only. <a href= '/users/login'> Login <a/>";
			return false;		
		}
		
		# Setup View
		$this->template->content = View::instance('v_users_profile');
		$this->template->title = "Profile of".$this->user->first_name;
		
		#Render template
		echo $this->template;
	}
}

 # end of the class