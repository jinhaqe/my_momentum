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

   if (Hours >= 6 && Hours < 12) {
      $(".messege").html("Good morning,");
   } else if (Hours >= 12 && Hours < 18) {
      $(".messege").html("Good Afternoon,");
   } else if (Hours >= 18 && Hours < 21) {
      $(".messege").html("Good Evening,");
   } else {
      $(".messege").html("Good Night,");
   }
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
const inputElement = $(".first_input");

// 텍스트 입력 시마다 너비를 동적으로 조정
inputElement.on("input", function () {
   // 문자 길이에 비례하여 너비 늘리기
   $(this).css("width", (this.value.length + 1) * 20 + "px");
});

/**
 ** 명언에 슬라이드 추가하기
 **/
$(".say_box").on("mouseover", () => {
   $(".say_person").stop().slideDown(500); // 애니메이션을 멈추고 슬라이드 다운
});

$(".say_box").on("mouseleave", () => {
   $(".say_person").stop().slideUp(500); // 애니메이션을 멈추고 슬라이드 업
});

// 명언 목록
const say = {
   saying: {
      string: [
         "너는 좋은 일들만 끌어당겨, 그것도 아주 많이",
         "겨울이 오면 봄이 멀지 않으리",
         "내일이란 오늘의 다른 이름일 뿐",
         "행운의 여신은 용기 있는 자를 좋아한다.",
         "행복은 습관이다. 그것을 몸에 지니라.",
      ],
      person: [
         "꽃의 언어, 이평",
         "셸리",
         "윌리엄 포크너",
         "버질",
         "엘버트허버드",
      ],
   },
};

// 랜덤 명언 함수
function random() {
   let ran = Math.floor(Math.random() * say.saying.person.length);

   let ran_wise_say = $(".wise_say");
   let ran_person = $(".say_person");

   // 랜덤 명언과 사람 설정
   ran_wise_say.html(say.saying?.string[ran] ?? "명언 없음");
   ran_person.html(say.saying.person[ran]);

   // 명언과 사람 텍스트에 따옴표 추가
   ran_wise_say.html(`" ${ran_wise_say.text()} "`); // 따옴표 추가
   ran_person.html(`- ${ran_person.text()} -`); // 따옴표 추가
}

$(document).ready(function () {
   random(); // 페이지 로드 시 랜덤 명언 표시
});

/**
 ** 메모창 애니메이션 적용하기
 **/
$(document).ready(function () {
   // 메모 창 열기
   $("#openmemo").on("click", function () {
      $("#memo").fadeToggle(); // 메모 창을 부드럽게 나타나게
      $("#todo").fadeOut(); // 메모 창을 부드럽게 사라지게
   });

   // 메모 창 닫기
   $(".closememoButton").on("click", function () {
      $("#memo").fadeOut(); // 메모 창을 부드럽게 사라지게
   });
});

/**
 ** 투두창 애니메이션 적용하기
 **/
$(document).ready(function () {
   // 메모 창 열기
   $("#opentodo").on("click", function () {
      $("#todo").fadeToggle();
      $("#memo").fadeOut();
   });

   // 메모 창 닫기
   $(".closetodoButton").on("click", function () {
      $("#todo").fadeOut(); // 메모 창을 부드럽게 사라지게
   });
});

/**
 ** 날씨 상태 정보
 **/
// 날씨 상태에 따른 아이콘 매핑
const weatherIconMapping = {
   "clear sky": "./img/icon/sun.png", // 맑은 하늘
   "few clouds": "./img/icon/clouds.png", // 약간의 구름
   "scattered clouds": "./img/icon/clouds.png", // 흩어진 구름
   "broken clouds": "./img/icon/clouds.png", // 흐린 구름
   rain: "./img/icon/rain.png", // 비
   "shower rain": "./img/icon/rain.png", // 소나기 비
   snow: "./img/icon/snow.png", // 눈
   mist: "./img/icon/mist.png", // 안개
   thunderstorm: "./img/icon/thunderstorm.png", // 천둥번개
};

// 날씨 API에서 받은 description을 기준으로 아이콘 반환
function getWeatherIcon(description) {
   return (
      weatherIconMapping[description.toLowerCase()] || "./img/icon/default.png"
   ); // 기본 아이콘은 물음표
}

async function getLocation() {
   navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fd81f7c1133bdcc365228b56e695bc1f&units=metric`;

      try {
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();
         const description = data.weather[0].description; // 날씨 상태
         const temperature = Math.floor(data.main.temp); // 온도
         const icon = getWeatherIcon(description); // 날씨 아이콘

         // 날씨 정보와 아이콘을 .weather 클래스 요소에 표시
         document.querySelector(".weather_temp").innerHTML = `${temperature}°C`;
         let weather_img = document.querySelector(".weather_icon");
         weather_img.src = icon; // 날씨 아이콘 설정
      } catch (error) {
         console.error("Error fetching the weather data:", error);
         document.querySelector(".weather").innerHTML =
            "날씨 정보를 가져오는 데 실패했습니다.";
      }
   });
}

// 위치를 가져오고 날씨를 표시
getLocation();

/**
 ** 이미지 아이콘 기능
 **/
let isHidden = false; // 상태 추적 변수

$(".image").on("click", () => {
   if (isHidden) {
      // 원래 상태로 복구
      $(".link").fadeIn(200, () => {
         // 애니메이션 끝난 후에 width 변경
         $(".links").css("width", "200px");
      });
      $(".add_tools, .user_space, .time_box, .messege_box, .last_box") // .little_todo 제외한 나머지 요소들
         .not(".image") // 제외할 자식 요소
         .fadeIn(200); // 나머지 요소만 부드럽게 나타내기
   } else {
      // 나머지 요소 숨기기
      $(".link").fadeOut(200);
      $(".add_tools, .user_space, .time_box, .messege_box, .last_box") // .little_todo 제외한 나머지 요소들
         .not(".image") // 제외할 자식 요소
         .fadeOut(200); // 나머지 요소만 부드럽게 나타내기

      // width 변경을 마지막에 처리해 부드럽게 보이도록 설정
      setTimeout(() => {
         $(".links").css("width", "100px");
      }, 200); // 200ms 이후에 width 변경 (애니메이션 끝나고 나서)
   }

   // .image 아이콘 스타일 변경 (예: 크기 조정)
   $(".image").toggleClass("active"); // active 클래스 추가/제거

   isHidden = !isHidden; // 상태를 반전시킴
});

/**
 ** add_option 버튼의 상태 조정하기
 **/
$(document).ready(function () {
   // 'add_option' 버튼을 클릭하면 팝업을 아래로 띄우거나 숨기기
   $(".add_option").click(function () {
      // 버튼의 위치를 가져옴
      var buttonOffset = $(".add_option").offset();

      // 팝업이 보이고 있다면 숨기고, 그렇지 않으면 띄우기
      if ($("#popup").is(":visible")) {
         $("#popup").fadeOut();
         $(".add_option").css("visibility", "visible"); // 팝업 닫을 때 add_option 보이도록 유지
      } else {
         // 팝업을 버튼 바로 아래에 위치시킴
         $("#popup")
            .css({
               top: buttonOffset.top + $(".add_option").outerHeight() + 10,
               left: buttonOffset.left,
            })
            .fadeIn(); // 팝업을 표시

         $(".add_option").css("visibility", "visible"); // 팝업이 열릴 때 버튼 보이게
      }
   });

   // 'closePopup' 버튼을 클릭하면 팝업 닫기
   $("#closePopup").click(function () {
      // 팝업을 닫음
      $("#popup").fadeOut();
      $(".add_option").css("visibility", "visible"); // 팝업 닫힐 때도 add_option 보이게 유지
   });

   // 'time_add' 버튼에 마우스 오버 시
   $(".time_add").on("mouseover", function () {
      // 팝업이 열려 있지 않으면 visibility를 보여줌
      if (!$("#popup").is(":visible")) {
         $(".add_option").css("visibility", "visible");
      }
   });

   // 'time_add' 버튼에서 마우스 나갈 때
   $(".time_add").on("mouseleave", function () {
      // 팝업이 열려 있지 않으면 visibility를 숨김
      if (!$("#popup").is(":visible")) {
         $(".add_option").css("visibility", "hidden");
      }
   });
});
