<?php
class posts_controller extends base_controller {
	
	
	public function __construct() {
		parent::__construct();
		
		# Confirm User is logged in
		if(!$this->user) {
			Router::redirect("users/login/login");
		}
		
	}
	
	public function add() {
		
		# Load CSS / JS
		$client_files = Array(
				"/blueprint/ie.css",
				"/blueprint/print.css",
				"/blueprint/screen.css");
	
        $this->template->client_files = Utils::load_client_files($client_files);      			
			
		
		# Setup view
		$this->template->content = View::instance('v_posts_add');
		$this->template->title   = "Add a new post";
			
		
		# Render template
		echo $this->template;
	
	}
	
	public function p_add() {
			
		# Associate this post with this user
		$_POST['user_id']  = $this->user->user_id;
		
		# Unix timestamp of when this post was created / modified
		$_POST['created']  = Time::now();
		$_POST['modified'] = Time::now();
		
		# Insert
		DB::instance(DB_NAME)->insert('posts', $_POST);
		
		Router::redirect("/users/profile/sucess");
	
	}
	
	
	
	public function index() {
		# Load CSS / JS
		$client_files = Array(
				"/blueprint/ie.css",
				"/blueprint/print.css",
				"/blueprint/screen.css");
	
       $this->template->client_files = Utils::load_client_files($client_files);      			
		
				
		# Set up view
		$this->template->content = View::instance('v_posts_index');
		$this->template->title   = "Posts";
	
		# Build a query of the users this user is following - we're only interested in their posts
		$q = "SELECT * 
				FROM users_users
				WHERE user_id = ".$this->user->user_id;
	
		# Execute our query, storing the results in a variable $connections
		$connections = DB::instance(DB_NAME)->select_rows($q);
		
		if(!$connections){
			Router::redirect("/posts/users/error");	
		}	
		else{
			# Generate string of user ids, the user is following 
				$connections_string = "";
			foreach($connections as $connection) {
				$connections_string .= $connection['user_id_followed'].",";
			}
	
			# Remove the final comma 
			$connections_string = substr($connections_string, 0, -1);
	
			$q = "SELECT * 
				FROM posts 
				JOIN users USING (user_id)
				WHERE posts.user_id IN (".$connections_string.")"; # This is where we use that string of user_ids we created

			# Run our query, store the results in the variable $posts
			$posts = DB::instance(DB_NAME)->select_rows($q);
	
			# Pass data to the view
			$this->template->content->posts = $posts;
	
			# Render view
			echo $this->template;
		}
	}
	
	public function users($error = null) {
		# Load CSS / JS
		$client_files = Array(
				"/blueprint/ie.css",
				"/blueprint/print.css",
				"/blueprint/screen.css",
	            );
	
      $this->template->client_files = Utils::load_client_files($client_files);      			
		
						
		# Set up the view
		$this->template->content = View::instance("v_posts_users");
		$this->template->title   = "Users";
			
		#pass error
		$this->template->content->error = $error;		
				
		# Pass requested user, if variable is user id
		$this->template->content->post_status = "empty";			
		$this->template->content->posts = Array();
		
		$this->template->content->post_status = null;
		if($error != "error" && $error != null){
			$this->template->content->post_status = "empty";
			# Build query to get posts
			$q = "SELECT *
			FROM posts
			WHERE user_id = ".$error;
			
			$query = DB::instance(DB_NAME)->select_rows($q);
			$this->template->content->posts = $query;		
			
			if(!$query)
				$this->template->content->post_status = "blank";			
		}
		
		
		# Build our query to get all the users
		$q = "SELECT *
			FROM users";
		
		# Execute the query to get all the users. Store the result array in the variable $users	
		$users = DB::instance(DB_NAME)->select_rows($q);
	
		# Build our query to figure out what connections does this user already have? I.e. who are they following
			$q = "SELECT * 
					FROM users_users
					WHERE user_id = ".$this->user->user_id;
			
		# Execute this query with the select_array method
		# select_array will return our results in an array and use the "users_id_followed" field as the index.
		# This will come in handy when we get to the view
		# Store our results (an array) in the variable $connections
		$connections = DB::instance(DB_NAME)->select_array($q, 'user_id_followed');
			
		# Pass data (users and connections) to the view
		$this->template->content->users       = $users;
		$this->template->content->connections = $connections;

		# Render the view
		echo $this->template;	
	}
	
	public function follow($user_id_followed) {
		
		# Prepare our data array to be inserted
		$data = Array(
				"created" => Time::now(),
				"user_id" => $this->user->user_id,
				"user_id_followed" => $user_id_followed);
	
		# Update users table with followed user id
		DB::instance(DB_NAME)->insert('users_users', $data);

		# Route back to user list
		Router::redirect("/posts/users");
	}	

	public function unfollow($user_id_followed) {

		# Delete this connection
		$where_condition = 'WHERE user_id = '.$this->user->user_id.' AND user_id_followed = '.$user_id_followed;
		DB::instance(DB_NAME)->delete('users_users', $where_condition);
	
		# Send them back
		Router::redirect("/posts/users");

	}		
}