##Usage

Include the following tag in your header:

```<link rel="stylesheet" href="path/to/search/styles.css">
```

Include the following tag in your footer:

```<script type="text/javascript" src="path/to/search/search.js"></script>
```

Make sure that the include for the database in the ajax.php file is targed correctly e.g.

```<?php 
	include('../../database.php'); 
?>
```

Ensure that the call to the database on line 38 in ajax.php is correct!

Wrap each search input with ```<div class="search-wrap"></div>```

Give the input class="search"

Place options inside data-search="" attribute in the input

List of locations for testing: Baltics, <em>Boston</em>, Canada, Canary Islands, Canterbury, England, France, Greenland, Greenwich, Haverhill, Iceland, Netherlands, New England, New York, Portugal, Spain

Required:

table_'yourtable'the table that will be queried - limit of 1

fields_'yourfield'the field that will be queried - at least 1

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

Optional:

Adding multiple fields_'yourfield's

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name fields_rating" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

height_'integer'	Limits the height of the search results in pixels of your chosen integer and adds scroll if it goes beyond

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name height_50" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

limit_'integer' Limits the results of the search to your chosen integer

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name limit_4" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

preview_'yourfield' Show a preview another field from each result that has no bearing on the search itself

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name preview_rating" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

orderby_'yourfield' Order your results by the chosen field in your databases

ordertype_'asc/desc' Order your results by Ascending or Descending

Example: (Preview is on for id so you can see the order working)

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name orderby_id ordertype_desc preview_id" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

startno_'integer' The search will start when your chosen integer is reached (default = 3)

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name startno_1" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

striphtml_off If this is set then html tags in the results will not be striped when you click the entry to populate the input

Example: (Search for 'Boston')

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name striphtml_off" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

customclass_'yourclass' Adds a class to the search-suggestion div, from here you can target the elemets with the following css targeters

Example:

Search...
```<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name customclass_locations" name="search" placeholder="Search..." autocomplete="off" />
</div>
```

Custom CSS:
```.search-suggestions.locations a:hover {
	background-color: #d9c6ff !important;
}
.search-suggestions.locations a.highlighted {
	background-color: #ab84fa !important;
}
```

##Options for CSS targeting
####the suggestion wrapper
	
```.search-suggestions.yourclass {
		
}
```

		
####each suggestion
	
```.search-suggestions.yourclass a  {
	
}
```

		
####each suggestion on hover
	
```.search-suggestions.yourclass a:hover {
		
}
```

		
####each suggestion while highlighted with the arrow keys(give these styles '!important')
	
```.search-suggestions.yourclass a.highlighted {
		
} 
```

		
####the preview on each suggestion
	
```.search-suggestions.yourclass a span {
		
}
```
	
##All options

###Required:

table_'yourtable' - the table that will be queried - limit of 1

fields_'yourfield' - the field that will be queried - at least 1

###Optional:

height_'integer' - limits the height of the search results in pixels of your chosen integer and adds scroll if it goes beyond

limit_'integer' - limits the results of the search to your chosen integer

orderby_'yourfield' - order your results by the chosen field in your databases

ordertype_'asc/desc' - Order your results by Ascending or Descending

preview_'yourfield' - show a preview another field from each result that has no bearing on the search itself

startno_'integer' - the search will start when your chosen integer is reached (default = 3)

striphtml_off - if this is set then html tags in the results will not be striped when you click the entry to populate the input

customclass_'yourclass' - adds a class to the search-suggestion div, from here you can target the elemets with the following css targeters

##Your database is the limit!

What you do with the data in the search field AFTER you submit is totally up to you!
