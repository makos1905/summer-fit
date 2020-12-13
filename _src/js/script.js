const
  headerSelectButton = document.querySelector('.header__select-button'),
  headerSelectList = document.querySelector('.header__select-list'),
  buttonCall = document.querySelectorAll('.button--callback'),
  buttonReg = document.querySelector('.header__reg-button'),
  popCall = document.querySelector('#popCall'),
  popReg = document.querySelector('#popReg'),
  pop = document.querySelectorAll('.pop'),
  btnPopClose = document.querySelectorAll('.pop__close');

headerSelectButton.addEventListener('click', function () {
  headerSelectList.classList.toggle('hide');
  headerSelectButton.classList.toggle('header__select-button--press');
});

//открытие POP

for (i = 0; i < buttonCall.length; i++) {
  buttonCall[i].onclick = function () {
    popCall.classList.remove('hide');
  }
};

buttonReg.addEventListener('click', function () {
  popReg.classList.remove('hide');
});

// закрытие POP по крестику
for (i = 0; i < btnPopClose.length; i++) {
  btnPopClose[i].onclick = function () {
    for (n = 0; n < pop.length; n++) {
      pop[n].classList.add('hide');
    }
  }
};

//ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});


var heroSwiper = new Swiper('.hero__swiper-container', {
  slidesPerView: 1,
  speed: 3000,
  autoplay: {
    delay: 5000,
  },
  loop: true,

  pagination: {
    el: '.hero__swiper-pagination'
  },
});

var servicesSwiper = new Swiper('.services__swiper-container', {
  loop: true,
  autoplay: {
    delay: 3000
  },
  speed: 3000,
  navigation: {
    nextEl: '.services__button-next',
    prevEl: '.services__button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 5
    },
    768: {
      slidesPerView: 3
    },
    993: {
      slidesPerView: 5,
      spaceBetween: 13,
    }
  }
});

var gallerySwiper = new Swiper('.gallery__swiper-container', {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000
  },
  speed: 2000,
  navigation: {
    nextEl: '.gallery__button-next',
    prevEl: '.gallery__button-prev',
  },
  effect: 'fade',
  pagination: {
    el: '.gallery__pagination',
    clickable: true,
  },

});

// МАСКА ТЕЛЕФОНА
$(document).ready(function () {
  $('[type = tel]').mask('+7 (000) 000 00 00');
})
