<?php
	if(isset($_POST['action'])){
		include('../../database.php');
		$action = $_POST['action'];
		switch ($action) {
			case 'searchSug':
				$search = mysqli_real_escape_string($conn, $_POST['search']);
				$table = mysqli_real_escape_string($conn, $_POST['table']);
				$fields = mysqli_real_escape_string($conn, $_POST['fields']);
				$height = mysqli_real_escape_string($conn, $_POST['height']);
				$limit = mysqli_real_escape_string($conn, $_POST['limit']);
				$preview = mysqli_real_escape_string($conn, $_POST['preview']);
				$orderby = mysqli_real_escape_string($conn, $_POST['orderby']);
				$ordertype = mysqli_real_escape_string($conn, $_POST['ordertype']);
				$striphtml = mysqli_real_escape_string($conn, $_POST['striphtml']);
				$altrow = mysqli_real_escape_string($conn, $_POST['altrow']);
				$folderdir = mysqli_real_escape_string($conn, $_POST['folderdir']);
				$filetypes = mysqli_real_escape_string($conn, $_POST['filetypes']);
				$customclass = mysqli_real_escape_string($conn, $_POST['customclass']);
				$confield = mysqli_real_escape_string($conn, $_POST['confield']);
				$conoperator = mysqli_real_escape_string($conn, $_POST['conoperator']);
				$convalue = mysqli_real_escape_string($conn, $_POST['convalue']);
				$fieldData = explode(",", $_POST['fields']);
				$fieldDataCount = count($fieldData);
				
				//if files are set this will end the statement after searching the files
				if($table == '' && $fields == '' && $folderdir != ''){
					$filesArray = scandir('/'.$folderdir);
					foreach($filesArrray as $key => $value){
						echo $value;
					}
					//print_r($filesArray);
					break;
				}
				
				foreach ($fieldData as $key => $value) {
					$value = mysqli_real_escape_string($conn, $value);
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
				if($confield != '' && $conoperator != '' && $convalue != ''){
					$cons = 'AND '.$confield.' '.$conoperator.' \''.$convalue.'\'';
				}
				$sql = "SELECT * FROM $table $search $cons $orderby $limit";
				// $res = mysqli_query($conn, $sql) or die('<span style="background-color:#fff;">Ensure that your database call in ajax.php is correct (it\'s on line 38)</span>');
				$res = mysqli_query($conn, $sql) or die($sql);
				$num = mysqli_num_rows($res);
				
				if($num >= 1){
					if($fieldDataCount > 1){
						while($row = mysqli_fetch_assoc($res)){
							$searchdisplay = '';
							foreach ($fieldData as $key => $value) {
								$searchconditions.= $value.' LIKE \'%'.$search.'%\' || ';
								$searchdisplay.= $row[$value].' | ';
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
			case 'searchHistory':
				$searchSuggest = $_POST['searchSuggest'];
				$days = $_POST['history'];
				$historyID = $_POST['historyID'];
				$cookieName = 'timSearch_'.$historyID;
				if(isset($_COOKIE[$cookieName])){
					$value = $_COOKIE[$cookieName];
					$value = $value.'.'.$searchSuggest;
					setcookie($cookieName, $value, time() + (86400 * $days), "/");
				}else{
					setcookie('timSearch_'.$historyID, $searchSuggest, time() + (86400 * $days), "/");
				}
				break;
			case 'checkHistory':
				$historyID = $_POST['historyID'];
				$cookie = $_COOKIE['timSearch_'.$historyID];
				$cookieEX = explode('.', $cookie);
				if(isset($cookie)){
					foreach($cookieEX as $key => $value){
						$searchOutput .= '<a class="search-suggest search-history" data-search-query="'.$value.'">'.$value.'</a>';
					}
					$searchOutput .= '<a class="delete-history" data-history="'.$historyID.'">Delete history</a>'; 
					echo $searchOutput;
				}else{
					echo 'nohistory';
				}
				break;
			case 'deleteHistory':
				$historyID = $_POST['historyID'];
				$cookieName = 'timSearch_'.$historyID;
				setcookie($cookieName, '', time() + (86400 * 1), "/");
				break;
		}
	}
?>