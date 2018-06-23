document.addEventListener("DOMContentLoaded", function(){
	const navTop = document.querySelector(".header-top-container");
	const body = document.querySelector("body");
	const animatedTitle = document.querySelector(".animated-title");
	
	/* анімація заголовку та прелоадер */
	/* event for title, title content,arrow */
	window.addEventListener("load", function(){
		requestAnimationFrame(getAnimatedTitle);
		setInterval(changeContentTitle,60000);
		setInterval(animateShakeIcon,5000);
		requestAnimationFrame(animationArrow);
		//requestAnimationFrame(animationBg);
	});
	/* event for nav,title,arrow */
	window.addEventListener("scroll", function(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		/*menu from static to fixed +*/
		requestAnimationFrame(function(){
			
			if(scrollTop > 50){
				navTop.classList.add("nav-top-fixed");
				body.classList.add("body--padding");
			} else{ navTop.classList.remove("nav-top-fixed");
					body.classList.remove("body--padding");
				}
			});
			
		/* animation title +*/
		requestAnimationFrame(getAnimatedTitle);
		/**/
		requestAnimationFrame(animationArrow);
		/**/
		requestAnimationFrame(animationBg);
		/**/
		requestAnimationFrame(changeProgres);
	});

	/* resize window*/
	window.addEventListener("resize", function(){
		requestAnimationFrame(changeProgres);
	})

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
	/* animation arrow */
	const listArrow = document.querySelectorAll(".arrow");
	function animationArrow(){
		let windowHeight = document.documentElement.clientHeight;
		for(let i = 0; i < listArrow.length; i++ ){
			let coorArrow = listArrow[i].getBoundingClientRect();
			if(coorArrow.top >= 0 && coorArrow.top <= windowHeight && !listArrow[i].children[0].classList.contains("flash")){
				addClass(listArrow[i]);
			} 
			else if(coorArrow.top >= 0 && coorArrow.top >= windowHeight && listArrow[i].children[0].classList.contains("flash")){ 
				removeClass(listArrow[i]);
			 }
			else if(coorArrow.top < 0 && listArrow[i].children[0].classList.contains("flash")){
			 	removeClass(listArrow[i]);
			 }
		}
		
	}

	/* function change class for animationArrow()*/
	function addClass(elem){
		for(let s = 0; s < elem.children.length; s++){
			elem.children[s].classList.add("flash");
		}
	}
	function removeClass(elem){
		for(let s = 0; s < elem.children.length; s++){
			elem.children[s].classList.remove("flash");
		}
	}

	/* animation icon for form Start a conversation and Our insights & latest news*/
	let shakeIconList = document.querySelectorAll(".shake-icon-js");
	function animateShakeIcon(){
		for(let i = 0 ; i < shakeIconList.length;  i++){
			shakeIconList[i].classList.toggle("shake");
		}
	}

	/* animation title*/
	function getAnimatedTitle(){
		let windowHeight = document.documentElement.clientHeight;
		let coorAnimatedTitle = animatedTitle.getBoundingClientRect();
		if( coorAnimatedTitle.top >= 0 && coorAnimatedTitle.top <= windowHeight && !animatedTitle.classList.contains("animated-title__show")){
			animatedTitle.classList.add("animated-title__show");
		} 
		else if(coorAnimatedTitle.top >= 0 && coorAnimatedTitle.top >= windowHeight && animatedTitle.classList.contains("animated-title__show")){
			animatedTitle.classList.remove("animated-title__show");
		}
		else if(coorAnimatedTitle.top < -20 && animatedTitle.classList.contains("animated-title__show")){
			animatedTitle.classList.remove("animated-title__show");
		}
	}

	/* change content title */
	let index = 0;
	function changeContentTitle(){
		const listQuestion = ["Old software costing you time and money?",
							  "Old software costing you time and money? - 1",
							  "Old software costing you time and money? - 2",
							  "Old software costing you time and money? - 3"];
		if(index < listQuestion.length){
			animatedTitle.innerHTML = listQuestion[index];
			++index;
		} else{ 
			index = 0;
			changeContentTitle();
		}
		
	}
	/* scroll-bar, progres */
	const progres = document.querySelector(".progres");
	function changeProgres(){
		let windowHeight = document.documentElement.clientHeight;
		let navTopWidth = document.querySelector(".header-top-container").clientWidth;
		let bodyHeight = Math.max(
			  document.body.scrollHeight, document.documentElement.scrollHeight,
			  document.body.offsetHeight, document.documentElement.offsetHeight,
			  document.body.clientHeight, document.documentElement.clientHeight
			);
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		bodyHeigh = bodyHeight - windowHeight;
		let percentScroll = (scrollTop/(bodyHeigh/100));
		progres.style.width = (navTopWidth / 100) * percentScroll + "px";


	}
});