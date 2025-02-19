// 현재 날짜와 시간 가져오기
function date_time() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let date1 = date.getDate();
  let Hours = date.getHours();
  let minutes = date.getMinutes();
  let Seconds = date.getSeconds();

  let today = `${year} / ${month < 10 ? `0${month}` : month} / ${
    date1 < 10 ? `0${date1}` : date1
  }`;

  let time = `${Hours < 10 ? `0${Hours}` : Hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  document.querySelector(".date").innerHTML = today;
  document.querySelector(".time").innerHTML = time;
}

let time = setTimeout(() => {
  date_time();
});

let timeID = setInterval(() => {
  date_time();
}, 1000);
