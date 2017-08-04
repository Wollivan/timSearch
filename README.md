## Usage

Include the following tag in your header:

```
<link rel="stylesheet" href="path/to/timSearch/styles.css">
```

Include the following tag in your footer:

```
<script type="text/javascript" src="path/to/timSearch/search.js"></script>
```

Make sure that the include for the database in the ajax.php file is targed correctly e.g.

```
<?php 
	include('../../database.php'); 
?>
```

Ensure that the call to the database on line 38 in ajax.php is correct!

Wrap each search input with 
```
<div class="search-wrap"></div>
```

Give the input class="search"

Place options inside data-search="" attribute in the input

Required:

## table_'yourtable'
the table that will be queried - limit of 1

## fields_'yourfield'
the field that will be queried - at least 1

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name" name="search" placeholder="Search..."  />
</div>
```

### Optional:

Adding multiple
## fields_'yourfield's

Example:

<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name fields_rating" name="search" placeholder="Search..."  />
</div>

## height_'integer'
Limits the height of the search results in pixels of your chosen integer and adds scroll if it goes beyond

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name height_50" name="search" placeholder="Search..."  />
</div>
```

## limit_'integer'
Limits the results of the search to your chosen integer

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name limit_4" name="search" placeholder="Search..."  />
</div>
```

## preview_'yourfield'
Show a preview another field from each result that has no bearing on the search itself

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name preview_rating" name="search" placeholder="Search..."  />
</div>
```

## orderby_'yourfield'
Order your results by the chosen field in your databases

## ordertype_'asc/desc'
Order your results by Ascending or Descending

Example: (Preview is on for id so you can see the order working)

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name orderby_id ordertype_desc preview_id" name="search" placeholder="Search..."  />
</div>
```

## startno_'integer'
The search will start when your chosen integer is reached (default = 3)

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name startno_1" name="search" placeholder="Search..."  />
</div>
```

## striphtml_off
If this is set then html tags in the results will not be striped when you click the entry to populate the input

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name striphtml_off" name="search" placeholder="Search..."  />
</div>
```

## altrow_'yourfield'
If this is set then when the suggestion is clicked the field will be populated with data from the chosen alternative row

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name altrow_id" name="search" placeholder="Search..."  />
</div>
```
## history_'days'
If this is set then when the user clicks or enters on a suggestion, it will save it to their personal hostory for your set number of days

**You must add an id to the search box, each search box will have its own search history using the id, without an id, this feature won't work**

Example:
```
<div class="search-wrap">
	<input type="text" id="history-box" class="search" data-search="table_locations fields_name savehistory_2" name="search" placeholder="Search..."   />
</div>
```
*The search suggestions from the users history will be given the 'search-history' class and can be styled using that*

##folderdir_'directory' If this is set then instead of searching through a database it will search through the chosen folder for all file types

##filetype_'fileext' These are the file types that will be searched for, if left blank, all files in the directory will be search

Example:
```
<div class="search-wrap">
	<input type="text" class="search" data-search="folderdir_images filetype_jpeg filetypes_jpg" name="search" placeholder="Search..."   />
</div>
```

*The following options won't work when searching files: table, fields, preview, striphtml, altrow*

## customclass_'yourclass'
Adds a class to the search-suggestion div, from here you can target the elemets with the following css targeters

Example:

```
<div class="search-wrap">
	<input type="text" class="search" data-search="table_locations fields_name customclass_locations" name="search" placeholder="Search..."  />
</div>
```

Custom CSS:
```
.search-suggestions.locations a:hover {
	background-color: #d9c6ff !important;
}
.search-suggestions.locations a.highlighted {
	background-color: #ab84fa !important;
}
```

### Options for CSS targeting
#### the suggestion wrapper
	
.search-suggestions.yourclass {
		
}

		
#### each suggestion
	
.search-suggestions.yourclass a  {
	
}

		
#### each suggestion on hover
	
.search-suggestions.yourclass a:hover {
		
}

		
#### each suggestion while highlighted with the arrow keys(give these styles '!important')
	
.search-suggestions.yourclass a.highlighted {
		
} 

		
#### the preview on each suggestion
	
.search-suggestions.yourclass a span {
		
}
	
## All options

### Required:

table_'yourtable'the table that will be queried - limit of 1

fields_'yourfield'the field that will be queried - at least 1

### Optional:

height_'integer' limits the height of the search results in pixels of your chosen integer and adds scroll if it goes beyond

limit_'integer' limits the results of the search to your chosen integer

preview_'yourfield' show a preview another field from each result that has no bearing on the search itself

orderby_'yourfield' order your results by the chosen field in your databases

ordertype_'asc/desc' Order your results by Ascending or Descending

startno_'integer' the search will start when your chosen integer is reached (default = 3)

striphtml_offif this is set then html tags in the results will not be striped when you click the entry to populate the input

altrow_'yourfield' If this is set then when the suggestion is clicked the field will be populated with data from the chosen alternative row

history_'days' If this is set then when the user clicks or enters on a suggestion, it will save it to their personal hostory for your set number of days

files_'directory' If this is set then instead of searching through a database it will search through the chosen folder for all file types

customclass_'yourclass' adds a class to the search-suggestion div, from here you can target the elemets with the following css targeters

## Your database is the limit!

What you do with the data in the search field AFTER you submit is totally up to you!
