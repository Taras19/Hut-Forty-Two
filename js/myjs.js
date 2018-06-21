document.addEventListener("DOMContentLoaded", function(){
	/* open,close menu +*/
	const header = document.querySelector(".header-top-container");
	const menuButton = document.querySelector(".btn");
	menuButton.addEventListener("click", function(){
		header.classList.toggle("header-top-container--close");
	});
});