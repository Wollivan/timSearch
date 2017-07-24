;(function($, window, document, undefined){
		let _window = $(window);
		//Add autocomplete off
		_window.on('load.searchAppend', function(){
			$('.search').attr('autocomplete', 'off');
			$('.search').after('<div class="search-suggestions"></div>');
		});

		
		//search bar suggestions on the shop page
		$(".search").keypress(function(e){
			if (e.which == 13) {
				if($(this).hasClass('no-enter')){
					e.preventDefault();
				}
		   }
		});
		$('.search').on('keyup.search', function(e){
			let $this = $(this),
				search = $this.val(),
				$parent = $this.closest('.search-wrap'),
				$form = $this.closest('form'),
				$searchSuggestions = $parent.children('.search-suggestions'),
				$highlighted = $searchSuggestions.children('.search-suggest.highlighted'),
				searchParams = $this.attr("data-search"),
				fields = '',
				table = '',
				height = '',
				limit = '',
				orderby = '',
				ordertype = '',
				preview = '',
				striphtml = '',
				customclass = '',
				startno = 3,
				searchParamsSplit = searchParams.split(' '),
				searchParamsSplitLength = searchParamsSplit.length;
			
			for (let i = 0; i < searchParamsSplitLength; i++) { 
				if (searchParamsSplit[i].startsWith('fields_')) {
					fields += searchParamsSplit[i].replace(/.*fields_([^\s]+).*/g, "$1") + ',';
				}
				if (searchParamsSplit[i].startsWith('table_')) {
					table = searchParamsSplit[i].replace(/.*table_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('height_')) {
					height = searchParamsSplit[i].replace(/.*height_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('limit_')) {
					limit = searchParamsSplit[i].replace(/.*limit_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('orderby_')) {
					orderby = searchParamsSplit[i].replace(/.*orderby_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('ordertype_')) {
					ordertype = searchParamsSplit[i].replace(/.*ordertype_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('preview_')) {
					preview = searchParamsSplit[i].replace(/.*preview_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('startno_')) {
					startno = searchParamsSplit[i].replace(/.*startno_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('striphtml_')) {
					striphtml = searchParamsSplit[i].replace(/.*striphtml_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('customclass_')) {
					customclass = searchParamsSplit[i].replace(/.*customclass_([^\s]+).*/g, "$1");
				}
			}
			fields = fields.substring(0, fields.length - 1);
			
			if(e.keyCode === 40){
				$highlighted = $searchSuggestions.children('.search-suggest.highlighted');
				if($highlighted[0]){
					// Do something if class exists
					$highlighted.removeClass('highlighted');
					$highlighted.next('.search-suggest').addClass('highlighted');
					$this.addClass('no-enter');
				}else{
					// Do something if class does not exist
					$searchSuggestions.children('.search-suggest:first').addClass('highlighted');
					$this.addClass('no-enter');
				}
			}else if(e.keyCode === 38){
				e.preventDefault();
				$highlighted = $searchSuggestions.children('.search-suggest.highlighted');
				if($highlighted[0]){
					// Do something if class exists
					if($highlighted.is(':first-child')){
						$this.removeClass('no-enter');
						$highlighted.removeClass('highlighted');
					}else{
						$highlighted.removeClass('highlighted');
						$highlighted.prev('.search-suggest').addClass('highlighted');
						$this.addClass('no-enter');
					}
				}else{
					// Do something if class does not exist
					$searchSuggestions.children('.search-suggest:last').addClass('highlighted');
					$this.addClass('no-enter');
				}
			}else if(e.keyCode === 13){
				$highlighted = $searchSuggestions.children('.search-suggest.highlighted');
				let searchSuggest = $highlighted.attr('data-search-query');
				$this.val(searchSuggest);
				$searchSuggestions.hide();
				$this.removeClass('no-enter');
			}else{
				if(search.length >= startno || $searchSuggestions.is(':visible')){
					$searchSuggestions.show();
					$.ajax({
						url: 'search/functions/ajax.php',
						type: 'post',
						data: {
							'action': 'searchSug',
							'search': search,
							'table': table,
							'fields': fields,
							'height': height,
							'limit': limit,
							'orderby': orderby,
							'ordertype': ordertype,
							'preview': preview,
							'striphtml': striphtml,
							'customclass': customclass
						},
						success: function(data, status){
							// $this.after(data);
							$searchSuggestions.css('max-height', height + 'px');
							$searchSuggestions.html(data);
							$searchSuggestions.addClass(customclass);
							
						},
						error: function(xhr, status, error){
							console.log(error);
						}
					});
				}
				if(e.keyCode === 9) {
					$('.search-suggestions').hide();
				}
			}
		});
		$('.search-wrap').on('click.search', '.search-suggest', function(){
			let $this = $(this),
				mulitCheck = $this.attr('data-multi');
				searchSuggest = $this.attr('data-search-query'),
				$parent =  $this.parent('.search-suggestions');
				$input = $parent.siblings('.search');
				console.log(mulitCheck);
			if($input.hasClass('no-enter')){
				$input.removeClass('no-enter');
			}
			$input.val(searchSuggest);
			$parent.hide();
		});
		// $('.search-suggestions').on('mouseenter.search', '.search-suggest', function(){
			// $(this).addClass('highlighted').siblings().removeClass('highlighted');
		// });
		//search box close
		let $NotSearch = $('body');
			
		$NotSearch.on('click.search', function(){
			let $searchBox = $('.search-suggestions');
			$searchBox.fadeOut(300);
		});
		

})(window.jQuery, window, document);