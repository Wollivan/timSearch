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
				conneedle = '',
				operator = '',
				conhaystack = '',
				height = '',
				limit = '',
				orderby = '',
				ordertype = '',
				preview = '',
				striphtml = '',
				customclass = '',
				altrow = '',
				folderdir = '',
				filetypes = '',
				savehistory = '',
				historyID = $this.attr('id'),
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
				if (searchParamsSplit[i].startsWith('conneedle_')) {
					conneedle = searchParamsSplit[i].replace(/.*conneedle_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('conoperator_')) {
					conoperator = searchParamsSplit[i].replace(/.*conoperator_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('conhaystack_')) {
					conhaystack = searchParamsSplit[i].replace(/.*conhaystack_([^\s]+).*/g, "$1");
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
				if (searchParamsSplit[i].startsWith('altrow_')) {
					altrow = searchParamsSplit[i].replace(/.*altrow_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('savehistory_')) {
					savehistory = searchParamsSplit[i].replace(/.*savehistory_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('folderdir_')) {
					folderdir = searchParamsSplit[i].replace(/.*folderdir_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('filetypes_')) {
					filetypes = searchParamsSplit[i].replace(/.*filetypes_([^\s]+).*/g, "$1");
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
				if(history != ''){
					$.ajax({
						url: 'timSearch/functions/ajax.php',
						type: 'post',
						data: {
							'action': 'searchHistory',
							'searchSuggest': searchSuggest,
							'history': savehistory,
							'historyID': historyID
						},
						success: function(data, status){
							console.log('test');
							
						},
						error: function(xhr, status, error){
							console.log(error);
						}
					});
				}
			}else{
				if(search.length >= startno || $searchSuggestions.is(':visible')){
					$searchSuggestions.show();
					$.ajax({
						url: 'timSearch/functions/ajax.php',
						type: 'post',
						data: {
							'action': 'searchSug',
							'search': search,
							'table': table,
							'fields': fields,
							'conneedle': conneedle,
							'conoperator': conoperator,
							'conhaystack': conhaystack,
							'height': height,
							'limit': limit,
							'orderby': orderby,
							'ordertype': ordertype,
							'preview': preview,
							'striphtml': striphtml,
							'customclass': customclass,
							'altrow': altrow,
							'folderdir': folderdir,
							'filetypes': filetypes
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
				$input = $parent.siblings('.search'),
				searchParams = $input.attr("data-search"),
				fields = '',
				table = '',
				savehistory = '',
				historyID = $input.attr('id'),
				searchParamsSplit = searchParams.split(' '),
				searchParamsSplitLength = searchParamsSplit.length;
				
			for (let i = 0; i < searchParamsSplitLength; i++) {
				if (searchParamsSplit[i].startsWith('fields_')) {
					fields += searchParamsSplit[i].replace(/.*fields_([^\s]+).*/g, "$1") + ',';
				}
				if (searchParamsSplit[i].startsWith('table_')) {
					table = searchParamsSplit[i].replace(/.*table_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('savehistory_')) {
					savehistory = searchParamsSplit[i].replace(/.*savehistory_([^\s]+).*/g, "$1");
				}
			}
			
			if($input.hasClass('no-enter')){
				$input.removeClass('no-enter');
			}
			
			if(savehistory != ''){
				$.ajax({
					url: 'timSearch/functions/ajax.php',
					type: 'post',
					data: {
						'action': 'searchHistory',
						'searchSuggest': searchSuggest,
						'history': savehistory,
						'historyID': historyID
					},
					success: function(data, status){
						console.log('test');
						
					},
					error: function(xhr, status, error){
						console.log(error);
					}
				});
			}
			
			$input.val(searchSuggest);
			$parent.hide();
		});
		
		
		//When a history box is clicked, display its history
		$('.search').on('click.search', function(){
			let $this = $(this),
				inputValue = $this.val();
				$parent = $this.closest('.search-wrap'),
				$searchSuggestions = $parent.children('.search-suggestions'),
				searchSuggest = $this.attr('data-search-query'),
				searchParams = $this.attr("data-search"),
				customclass = '',
				height = '',
				savehistory = '',
				historyID = $this.attr('id'),
				searchParamsSplit = searchParams.split(' '),
				searchParamsSplitLength = searchParamsSplit.length;
				
				

			for (let i = 0; i < searchParamsSplitLength; i++) { 
				if (searchParamsSplit[i].startsWith('customclass_')) {
					customclass = searchParamsSplit[i].replace(/.*customclass_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('height_')) {
					height = searchParamsSplit[i].replace(/.*height_([^\s]+).*/g, "$1");
				}
				if (searchParamsSplit[i].startsWith('savehistory_')) {
					savehistory = searchParamsSplit[i].replace(/.*savehistory_([^\s]+).*/g, "$1");
				}
			}
			if(historyID != '' && historyID != undefined){
				if(inputValue == '' || inputValue == undefined){
					$.ajax({
						url: 'timSearch/functions/ajax.php',
						type: 'post',
						data: {
							'action': 'checkHistory',
							'historyID': historyID
						},
						success: function(data, status){
							if(data != 'nohistory'){
								$searchSuggestions.show();
								$searchSuggestions.css('max-height', height + 'px');
								$searchSuggestions.html(data);
								$searchSuggestions.addClass(customclass);
							}
						
						},
						error: function(xhr, status, error){
							console.log(error);
						}
					});
				}
			}
		});
		
		$('.search-wrap').on('click.search', '.delete-history', function(){
			let $this = $(this),
				historyID = $this.attr('data-history');
			$.ajax({
					url: 'timSearch/functions/ajax.php',
					type: 'post',
					data: {
						'action': 'deleteHistory',
						'historyID': historyID
					},
					success: function(data, status){
						if(data != 'nohistory'){
							$searchSuggestions.show();
							$searchSuggestions.css('max-height', height + 'px');
							$searchSuggestions.html(data);
							$searchSuggestions.addClass(customclass);
						}
					
					},
					error: function(xhr, status, error){
						console.log(error);
					}
				});
		});
		// $('.search-suggestions').on('mouseenter.search', '.search-suggest', function(){
			// $(this).addClass('highlighted').siblings().removeClass('highlighted');
		// });
		//search box close
		let _body = $('body');
			
		_body.on('click.searchHide', function(){
			let $searchBox = $('.search-suggestions');
			$searchBox.fadeOut(300);
		});
		
		$('.search').on('click.preventHide', function(e){
			e.stopPropagation();
		});

})(window.jQuery, window, document);