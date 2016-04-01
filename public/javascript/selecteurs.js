"use strict";
(function(){
	function $ (selector, el) {
	     if (!el) {el = document;}
	     return el.querySelector(selector);
	}

	function $$ (selector, el) {
	     if (!el) {el = document;}
	     /* return el.querySelectorAll(selector); */

	     // L'élément retourné est un NodeList
	     // Si vous voulez retourner un Array
	     // utilisez à la place
	     return Array.prototype.slice.call(el.querySelectorAll(selector));
	}
	window.$ = $
	window.$$ = $$

}(window))



	





