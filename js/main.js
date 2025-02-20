/**
 ** 현재 날짜와 시간 가져오기
 **/
function date_time() {
   let date = new Date();
   let year = date.getFullYear();
   let month = date.getMonth() + 1;
   let date1 = date.getDate();
   let Hours = date.getHours();
   let minutes = date.getMinutes();

   let today = `${year} / ${month < 10 ? `0${month}` : month} / ${
      date1 < 10 ? `0${date1}` : date1
   }`;

   let time = `${Hours < 10 ? `0${Hours}` : Hours} : ${
      minutes < 10 ? `0${minutes}` : minutes
   }`;

   $(".date").text(today);
   $(".time").text(time);
}

let time = setTimeout(() => {
   date_time();
});

let timeID = setInterval(() => {
   date_time();
}, 1000);

/**
 ** input 창 너비 늘리기
 **/
const inputElement = $("input");

// 텍스트 입력 시마다 너비를 동적으로 조정
inputElement.on("input", function () {
   // 문자 길이에 비례하여 너비 늘리기
   $(this).css("width", (this.value.length + 1) * 20 + "px");
});

/**
 ** 명언에 슬라이드 추가하기
 **/
$(".say_box").on("mouseover", () => {
   $(".say_person").slideDown(500); // 슬라이드 다운 애니메이션
});

$(".say_box").on("mouseleave", () => {
   $(".say_person").slideUp(500); // 슬라이드 업 애니메이션
});

/**
 ** 자동으로 p 태그에 따옴표 추가
 **/
// p 태그 선택
const pTag = document.querySelector(".wise_say");
const pTag2 = document.querySelector(".say_person");

// 텍스트에 따옴표 추가
pTag.textContent = `" ${pTag.textContent} "`;
pTag2.textContent = `- ${pTag2.textContent} -`;
