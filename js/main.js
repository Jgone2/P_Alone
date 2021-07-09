// 검색창
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
    // Logic
    searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '검색어를 입력해주세요.');
});
searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});


// AD & TO TOP
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.getElementById('to-top');

window.addEventListener('scroll', _.throttle(function () { // _.throttle(함수, 시간)
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        // 배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        });
        // TO TOP버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0,
            opacity: 1
        });
    } else {
        // 배지 나타내기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // TO TOP버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 30,
            opacity: 0
        });
    }
}, 300 /* 0.3초 단위로 부하 */));


// TO TOP
toTopEl.addEventListener('click', function() {
    gsap.to(window, .7, {
        scrollTo: 0
    });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1
    });
});



// SWIPER
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
}); // 생성자
new Swiper('.promotion .swiper-container', {
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부 
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
})


// 프로모션 숨기기
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
    isHidePromotion = !isHidePromotion
    if (isHidePromotion) {
        // 숨김 처리
        promotionEl.classList.add('hide');
    } else {
        // 노출 처리 
        promotionEl.classList.remove('hide');
    }
});


// 유튜브 영상 위 아이콘
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
function floatingObject(selector, delay, size) { // 선택자, 애니메이션 동작 시간, 옵션
    // gsap.to(요소, 시간, 옵션);
    gsap.to(selector, random(1.5, 2.5), {
        y: 20,  // y축으로 20만큼 이동
        repeat: -1, // 무한 반복
        yoyo: true, // 위에서 실행한 애니매이션을 다시 Reverse
        ease: Power1.easeInOut,
        delay: random(0, delay)
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// 스크롤 위치 계산
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    new ScrollMagic.
        Scene({ // Scene(): 무엇인가를 감시하는 옵션
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소 지정
            triggerHook: .8 // 보여짐의 여부가 감시되는 가상의 지점(선)
        })
        .setClassToggle(spyEl, 'show') // setClassToggle(): HTML의 Class를 넣었다 뺐다함.
        .addTo(new ScrollMagic.Controller());
});


// footer Copyright 년도 계산
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear() // 2021