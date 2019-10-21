let isEnabled = true;

document.querySelector('.edu-section').addEventListener('click', showListEdu);

function showListEdu() {
  if (document.querySelector('.edu-section__list').classList.contains('active')) {
    setTimeout(() => {
      document.querySelector('.edu-section__list').classList.remove('active');
    }, 0);
  } else {
    setTimeout(() => {
      document.querySelector('.edu-section__list').classList.add('active');
    }, 240);
  }
  
  toggleBtn.classList.toggle('active');
  document.querySelector('.edu-section').classList.toggle('active');
}

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

function showItem(direction) {
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
	showItem('from-right');
}

function previousSlide(index) {
	hideSlide('to-right');
	changeCurrentSlide(index - 1);
	showItem('from-left');
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
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e) {
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e) {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
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

			if (e.target.classList.contains('.project-section__btn-left')) {
				if (isEnabled) {
					previousSlide(currentSlide);
				}
			} else {
				if (isEnabled) {
					nextSlide(currentSlide);
				}
			}

			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousSlide(currentSlide);
								}
							} else {
								if (isEnabled) {
									nextItem(currentSlide);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var element = document.querySelector('.slider-container');
swipedetect(element);