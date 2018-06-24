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
		//let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		/*menu from static to fixed +*/
		requestAnimationFrame(changePositionHeader);
			
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
	});

	/* scroll */
	const linkNav = document.querySelectorAll(".working-link-js"); //выбираем все ссылки к якорю на странице('[href^="#"]')
	let V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
	for (let i = 0; i < linkNav.length; i++) {
	    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
	        //e.preventDefault(); //отменяем стандартное поведение
	        navTop.classList.remove("header-top-container--close");
	        let w = window.pageYOffset,  // производим прокрутка прокрутка
	        hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
	        let t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
	        start = null;
	        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
	        function step(time) {
	            if (start === null) start = time;
	            let progress = time - start,
	            r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
	            window.scrollTo(0,r);
	            if (r != w + t) {
	                requestAnimationFrame(step)
	            } else {
	                location.hash = hash  // URL с хэшем
	            }
	        }
	    }, false);
	}

	/* open,close menu +*/
	const header = document.querySelector(".header-top-container");
	const menuButton = document.querySelector(".btn");
	menuButton.addEventListener("click", function(){
		header.classList.toggle("header-top-container--close");
	});

	/* open,close search +*/ 
	const searchItemTop = document.querySelector(".nav-top__link--search");
	const searchItemBottom = document.querySelector(".nav-bottom__search");
	const searchContainer = document.querySelector(".search-container");
	searchItemTop.addEventListener("click", changeStateSearch);
	searchItemBottom.addEventListener("click", changeStateSearch);
	const searchContainerButton = document.querySelector(".search-container-button");
	searchContainerButton.addEventListener("click",function(){
		searchContainer.classList.remove("search-container-open");
		searchItemTop.classList.remove("active-link");
		searchItemBottom.classList.remove("active-link");
	});

	/* open,close chat +*/
	const liveChatButton = document.querySelector(".live-chat-button");
	const itemAsideChat = document.querySelector(".nav-top__link--chat");
	const chatMainContainer = document.querySelector(".chat-main-container");
	itemAsideChat.addEventListener("click", function(){
		chatMainContainer.classList.add("chat-main-container-open");
		itemAsideChat.classList.remove("active-link");
		navTop.classList.remove("header-top-container--close");
	});
	liveChatButton.addEventListener("click", function(){
		chatMainContainer.classList.remove("chat-main-container-open");
		itemAsideChat.classList.add("active-link");
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

	/**/
	function changePositionHeader(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if(scrollTop > 41 && !navTop.classList.contains("nav-top-fixed")){
			navTop.classList.add("nav-top-fixed");
			body.classList.add("body--padding");
		} 
		else if(scrollTop <= 41 && navTop.classList.contains("nav-top-fixed")){ 
			navTop.classList.remove("nav-top-fixed");
			body.classList.remove("body--padding");
			}
	}

	/* open search */
	function changeStateSearch(){
		searchContainer.classList.add("search-container-open");
		searchItemTop.classList.add("active-link");
		searchItemBottom.classList.add("active-link");
		navTop.classList.remove("header-top-container--close");
	}

	/**/
	const linkAll = document.querySelectorAll('[href^="#"]'); 
	for (let i = 0; i < linkAll.length; i++) {
	    linkAll[i].addEventListener('click', function(e) { 
	        e.preventDefault(); 
	    });
	}
});