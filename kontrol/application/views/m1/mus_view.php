<?php 
	
		    echo "Tabla de usuarios" . "<br>";			
			$query = $this->db->query('SELECT * FROM Users');		
			foreach ($query->result() as $row)
			{
   					echo $row->name;
   					echo "||" ;
   					echo $row->password;
   					echo "||" ;
   					echo $row->user;
   					echo "<hr>";
			}
	
	?>