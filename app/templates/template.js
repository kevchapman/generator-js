;(function(global){
	function <%= _.capitalize(name) %>(ele,opts){
		var defaults = {

		}
		this.opts = $.extend({},defaults,opts);
	}
	<%= _.capitalize(name) %>.prototype = {

	};
})(window);