<?php
	if(isset($_POST['action'])){
		include('../../database.php');
		$action = $_POST['action'];
		switch ($action) {
			case 'searchSug':
				$search = $_POST['search'];
				$search = mysqli_real_escape_string($conn, $search);
				$table = $_POST['table'];
				$table = mysqli_real_escape_string($conn, $table);
				$fields = $_POST['fields'];
				$fields = mysqli_real_escape_string($conn, $fields);
				$height = $_POST['height'];
				$height = mysqli_real_escape_string($conn, $height);
				$limit = $_POST['limit'];
				$limit = mysqli_real_escape_string($conn, $limit);
				$orderby = $_POST['orderby'];
				$orderby = mysqli_real_escape_string($conn, $orderby);
				$ordertype = $_POST['ordertype'];
				$ordertype = mysqli_real_escape_string($conn, $ordertype);
				$preview = $_POST['preview'];
				$preview = mysqli_real_escape_string($conn, $preview);
				$striphtml = $_POST['striphtml'];
				$striphtml = mysqli_real_escape_string($conn, $striphtml);
				$customclass = $_POST['customclass'];
				$customclass = mysqli_real_escape_string($conn, $customclass);
				$altrow = $_POST['altrow'];
				$altrow = mysqli_real_escape_string($conn, $altrow);
				$fieldData = explode(",", $_POST['fields']);
				$fieldDataCount = count($fieldData);
				
				foreach ($fieldData as $key => $value) {
					$searchconditions.= $value.' LIKE \'%'.$search.'%\' || ';
				}
				if($searchconditions != ''){
					$searchconditions = 'WHERE '.rtrim($searchconditions, "|| ");
				}
				if($limit != ''){
					$limit = 'LIMIT '.$limit;
				}
				if($orderby != ''){
					if($ordertype != ''){
						$orderby = 'ORDER BY '.$orderby.' '.$ordertype;
					}else{
						$orderby = 'ORDER BY '.$orderby;
					}
				}
				$search = $searchconditions;
				$sql = "SELECT * FROM $table $search $orderby $limit";
				$res = mysqli_query($conn, $sql) or die('<span style="background-color:#fff;">Ensure that your database call in ajax.php is correct (it\'s on line 38)</span>');
				$num = mysqli_num_rows($res);
				
			
				
				
				if($num >= 1){
					if($fieldDataCount > 1){
						while($row = mysqli_fetch_assoc($res)){
							$searchdisplay = '';
							foreach ($fieldData as $key => $value) {
								$searchconditions.= $value.' LIKE \'%'.$search.'%\' || ';
								$searchdisplay.= $row[$value].' | ';
								//$searchValue = $row[$value].'|';
							}
							$searchdisplay = rtrim($searchdisplay, " | ");
							$resultbyoutput = $row[$resultby];
							if($altrow == ''){
								if($striphtml == ''){
									$searchValue = strip_tags($row[$fieldData[0]]);
								}else{
									$searchValue = $row[$fieldData[0]];
								}
							}else{
								if($striphtml == ''){
									$searchValue = strip_tags($row[$altrow]);
								}else{
									$searchValue = $row[$altrow];
								}
							}
							
							if($preview != ''){
								$searchOutput .= '<a class="search-suggest" data-search-query="'.$searchValue.'">'.$searchdisplay.' | <span>'.$row[$preview].'</span></a>';
							}else{
								$searchOutput .= '<a class="search-suggest" data-search-query="'.$searchValue.'">'.$searchdisplay.'</a>';
							}
							
						}
						$success = 1;
					}else{
						while($row = mysqli_fetch_assoc($res)){
							if($altrow != ''){
								$fieldsCheck = $altrow;
							}else{
								$fieldsCheck = $fields;
							}
							if($striphtml == ''){
								$searchValue = strip_tags($row[$fieldsCheck]);
							}else{
								$searchValue = $row[$fieldsCheck];
							}
							if($preview != ''){
								$searchOutput .= '<a class="search-suggest" data-search-query="'.$searchValue.'">'.$row[$fields].' | <span>'.$row[$preview].'</span></a>';
							}else{
								$searchOutput .= '<a class="search-suggest" data-search-query="'.$searchValue.'">'.$row[$fields].'</a>';
							}
						}
						$success = 1;
					}
				}else{
					$searchOutput .= '<a class="search-suggest-no-match">No matches...</a>';
					$success = 1;
				}
				if($success == 1){
					echo $searchOutput;
				}
				break;
		}
	}
?>