let eduSection = document.querySelector('.edu-section');
let eduList = document.querySelector('.edu-section__list');
eduSection.addEventListener('click', showListEdu);

let delay = false;

function showListEdu() {
	if (delay) return;
	delay = true;

  if (eduList.classList.contains('active')) {
    setTimeout(() => {
			eduList.classList.remove('active');
			delay = false;
    }, 0);
	} else {
    setTimeout(() => {
			eduList.classList.add('active');
			delay = false;
		}, 240);
	}
  
  toggleBtn.classList.toggle('active');
  eduSection.classList.toggle('active');
}

let isEnabled = true;
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function changeCurrentSlide(index) {
	currentSlide = (index + slides.length) % slides.length;
}

function hideSlide(direction) {
	isEnabled = false;
	slides[currentSlide].classList.add(direction);
	slides[currentSlide].addEventListener('animationend', function() {
		this.classList.remove('active-slide', direction);
	});
}

function showSlide(direction) {
	slides[currentSlide].classList.add('next-slide', direction);
	slides[currentSlide].addEventListener('animationend', function() {
		this.classList.remove('next-slide', direction);
		this.classList.add('active-slide');
		isEnabled = true;
	});
}

function nextSlide(index) {
	hideSlide('to-left');
	changeCurrentSlide(index + 1);
	showSlide('from-right');
}

function previousSlide(index) {
	hideSlide('to-right');
	changeCurrentSlide(index - 1);
	showSlide('from-left');
}

document.querySelector('.project-section__btn-left').addEventListener('click', function() {
	if (isEnabled) {
		previousSlide(currentSlide);
	}
});

document.querySelector('.project-section__btn-right').addEventListener('click', function() {
	if (isEnabled) {
		nextSlide(currentSlide);
	}
});

const swipedetect = (element) => {
  
	let surface = element;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 500;

	surface.addEventListener('mousedown', function(e) {
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	let links = document.querySelectorAll('.slide__link');
	links.forEach(link => {
		link.onclick = () => false;
	});

	surface.addEventListener('mouseup', function(e) {
		console.log(e.target.parentElement)
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;

		if (elapsedTime < 150) {
			e.target.parentElement.onclick = () => true;
			e.target.parentElement.click();
		}

		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousSlide(currentSlide);
					}
				} else {
					if (isEnabled) {
						nextSlide(currentSlide);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e) {

			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e) {
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e) {
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;

			if (elapsedTime < 200) {
				if (e.target.classList.contains('slide-btn')) return;
				console.log(e.currentTarget)
				e.target.parentElement.onclick = () => true;
				e.target.parentElement.click();
			}

			if (elapsedTime <= allowedTime && elapsedTime > 200) {
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
							if ((distX > 0)) {
								if (isEnabled) {
									previousSlide(currentSlide);
								}
							} else {
								if (isEnabled) {
									nextSlide(currentSlide);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var element = document.querySelector('.slider-container');
swipedetect(element);

let toggleButtons = document.querySelectorAll('.slide-btn');

function showDescription() {
	toggleButtons.forEach(button => {
		button.innerHTML = 'show<br> description';
		button.style.background = '#e1ddec';
	});
}

function hideDescription() {
	toggleButtons.forEach(button => {
		button.innerHTML = 'hide<br> description';
		button.style.background = '#d2c927';
	});
}

function changeDisplayDesc() {
	let descriptions = document.querySelectorAll('.project-description');

	for (let i = 0; i < descriptions.length; i++) {
		descriptions[i].classList.toggle('active');
	}
	
	if (document.querySelector('.project-description').classList.contains('active')) {
		hideDescription();
	} else {
		showDescription();
	}
}

toggleButtons.forEach(button => {
	button.addEventListener('touchstart', changeDisplayDesc);
	button.addEventListener('click', changeDisplayDesc);

	button.onmouseover = function() {
		button.style.background = '#d2c927';
	}
	
	button.onmouseout = function() {
		if (document.querySelector('.project-description').classList.contains('active')) {
			button.style.background = '#d2c927';
			return;
		}
		button.style.background = '#e1ddec';
	}
});