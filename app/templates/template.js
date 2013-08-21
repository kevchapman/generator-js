;(function($){
	function <%= _.capitalize(name) %>(ele,opts){
		var defaults = {

		}
		this.opts = $.extend({},defaults,opts);
	}
	<%= _.capitalize(name) %>.prototype = {

	};

	$.fn.<%= name %> = function(opts){
		return this.each(function(){
			$(this).data().<%= name %> = new <%= _.capitalize(name) %>($(this),opts);
		});
	}
})(jQuery);