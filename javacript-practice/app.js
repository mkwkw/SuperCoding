//태그를 가져오는 방법 - id로 갖고오기
//const timeElement = document.getElementById("time");
//태그를 가져오는 다른 방법 - querySelector 이용 - id로 가져오려면 #붙이기, class로 가져오려면 .붙이기
//const timeElement = document.querySelector("h1");
const timeElement = document.querySelector("#time");

function 클릭시_실행될_함수() {
  timeElement.style.color = "tomato";
  timeElement.innerText = "01:00";
}

function sayHello(){
    console.log("안녕하세요!");
}

function setTime(){
    const time = new Date();
    const 분 = time.getMinutes().toString();
    const 초 = time.getSeconds().toString();
    const timeH1 = document.querySelector("#time");
    timeH1.innerText = `${분.padStart(2,"0")}:${초.padStart(2,"0")}` 
    //``을 사용하면 값을 대입시킬 수 있음.
    //padStart - 자릿수 채워서 표시 (String만 가능)
}

timeElement.addEventListener("click", 클릭시_실행될_함수); //메소드 뒤에 ()붙이지 않음.
window.addEventListener("resize", 클릭시_실행될_함수); //창에 대한 이벤트

//1회성
setTimeout(sayHello, 1000); //ms 단위

//주기성
//setInterval(sayHello, 1000);
setInterval(setTime, 1000);

