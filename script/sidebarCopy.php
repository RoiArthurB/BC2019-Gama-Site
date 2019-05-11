<?php

$sidebarArray = array("side"=> array(), "tuto"=> array(), );

$subMenu=$subSubMenu=$prevTitle="";

$fp=fopen("./docs/_Sidebar.md", "r+");
while ($line = stream_get_line($fp, 1024 * 1024, "\n"))
{
	// Title
	if (strpos($line, '##') !== false) {
		//$sidebarArray["side"][] = $line;

		if( $line[3] == '['){
			$title = explode("](", explode("[", $line)[1] );	
		
			$sidebarArray["side"][$title[0]] = array( explode(')', $title[1])[0] );

			$subMenu = $title[0];
		}
		/*else {
			$title = explode(" ", $line)[1];	
		}*/

	}
	// Links
	else {

		// Item
		if( $line[0] != ' ' ){
			$t = explode(')', explode("](", explode('[', $line)[1] )[1] )[0];
			$sidebarArray["side"][$subMenu][] = $t;
			$prevTitle = $t;
		}
		// SubItem
		else{

		}
	}
}
		var_dump($sidebarArray);
fclose($fp);

$fp = fopen('./website/sidebars.json', 'w');
fwrite($fp, json_encode($sidebarArray));
fclose($fp);


?>