document.addEventListener("DOMContentLoaded", function(){
	/* event for nav,title,arrow */
	window.addEventListener("scroll", function(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		/*menu from static to fixed +*/
		/*requestAnimationFrame(function(){
			
			if(scrollTop > 50){
				navTop.classList.add("nav-top-fixed");
			} else{ navTop.classList.remove("nav-top-fixed");
				}
			});
			*/
		/* animation title +*/
		//requestAnimationFrame(getAnimatedTitle);
		/**/
		//requestAnimationFrame(animationArrow);
		/**/
		requestAnimationFrame(animationBg);
		/**/
		//requestAnimationFrame(changeProgres);
	});
	/* open,close menu +*/
	const header = document.querySelector(".header-top-container");
	const menuButton = document.querySelector(".btn");
	menuButton.addEventListener("click", function(){
		header.classList.toggle("header-top-container--close");
	});

	/* animation background-size */
	const listElementWithBg = document.querySelectorAll(".animation-bg-js");
	function animationBg(){
		let windowHeight = document.documentElement.clientHeight;
		for(let i = 0; i < listElementWithBg.length; i++ ){
			let coorArrow = listElementWithBg[i].getBoundingClientRect();
			if((coorArrow.top >= 0 && coorArrow.top <= windowHeight && !listElementWithBg[i].classList.contains("animation-bg-move-js")) 
				|| (coorArrow.bottom >= 0 && coorArrow.bottom <= windowHeight && !listElementWithBg[i].classList.contains("animation-bg-move-js"))){
				listElementWithBg[i].classList.add("animation-bg-move-js");
			} 
			else if((coorArrow.top > windowHeight || coorArrow.bottom < 0) && listElementWithBg[i].classList.contains("animation-bg-move-js")){ 
				listElementWithBg[i].classList.remove("animation-bg-move-js");
			 }
		}
	}
});