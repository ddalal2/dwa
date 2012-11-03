<?php

class index_controller extends base_controller {

	public function __construct() {
		parent::__construct();
	} 
	
	/*-------------------------------------------------------------------------------------------------
	Access via http://yourapp.com/index/index/
	-------------------------------------------------------------------------------------------------*/
	public function index($error = NULL) {
		
		# Any method that loads a view will commonly start with this
		# First, set the content of the template with a view file
			$this->template->content = View::instance('v_index_index');
			
		# Now set the <title> tag
			$this->template->title = "Convers.io";
	
		# Load CSS / JS
		$client_files = Array(
				"/blueprint/ie.css",
				"/blueprint/print.css",
				"/blueprint/screen.css",
	         );
	
        $this->template->client_files = Utils::load_client_files($client_files);      
	     
	     $this->template->content->error = $error;      

		# Render the view
			echo $this->template;

	}
	
	
	
		
} // end class
