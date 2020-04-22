var 가로 = 4;
var 세로 = 3;
var 색깔들 = [
  "red",
  "red",
  "orange",
  "orange",
  "green",
  "green",
  "yellow",
  "yellow",
  "white",
  "white",
  "pink",
  "pink",
]; // 색깔 후보들
var 색깔후보 = 색깔들.slice();
var 색깔 = [];
var 클릭플래그 = true;
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;
function 셔플() {
  // 피셔예이츠 셔플
  for (var i = 0; 색깔후보.length > 0; i += 1) {
    색깔 = 색깔.concat(
      색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1)
    ); // 배열과 배열을 합쳐서 새로운 배열을 만들고 후보들을 나눕니다.
  }
}

function 카드세팅(가로, 세로) {
  클릭플래그 = false; // 세팅이 되는 중에는 클릭을 할수 없게 만듭니다.
  for (var i = 0; i < 가로 * 세로; i += 1) {
    var card = document.createElement("div");
    card.className = "card";
    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    var cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.style.backgroundColor = 색깔[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener("click", function () {
        if (클릭플래그 && !완성카드.includes(c)) {
          // 클릭플래그가 true인 상태에서 완성카드가 아니여야만 클릭할수 있게함
          c.classList.toggle("flipped");
          클릭카드.push(c);
          if (클릭카드.length == 2) {
            if (
              클릭카드[0].querySelector(".card-back").style.backgroundColor ==
              클릭카드[1].querySelector(".card-back").style.backgroundColor
            ) {
              완성카드.push(클릭카드[0]);
              완성카드.push(클릭카드[1]);
              클릭카드 = [];
              if (완성카드.length == 가로 * 세로) {
                var 끝시간 = new Date();
                alert("성공!" + (끝시간 - 시작시간) / 1000 + "초 걸렸습니다.");
                document.querySelector("#wrapper").innerHTML = ""; // 내부의 html 태그를 전부 지움
                색깔후보 = 색깔들.slice(); // 다시 초기화
                색깔 = [];
                완성카드 = [];
                시작시간 = null;
                셔플();
                카드세팅(가로, 세로); // 다시 카드를 생성함
              }
            } else {
              클릭플래그 = false;
              //두카드의 색이 다르면
              setTimeout(function () {
                클릭카드[0].classList.remove("flipped");
                클릭카드[1].classList.remove("flipped");
                클릭플래그 = true;
                클릭카드 = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector("#wrapper").appendChild(card);
  } // div를 생성하고 각 div에 앞면 뒷면 클래스를 부여한 후 색을 정해줍니다. 그 후 클릭시 뒤집는 이벤트를 추가해줍니다.

  document.querySelectorAll(".card").forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  }); // 처음에 카드를 공개하여 유저가 카드를 외울 시간을 줍니다. index 와 settimeout를 사용하여 시간차를 두고 카드를 여는 효과를 줍니다.

  setTimeout(function () {
    document.querySelectorAll(".card").forEach(function (card, index) {
      card.classList.remove("flipped");
    });
    클릭플래그 = true; // 세팅이 다 끝난 후에 클릭이 가능하게 함
    시작시간 = new Date();
  }, 5000); // 처음에 카드를 공개하여 유저가 카드를 외울 시간을 줍니다. index 와 settimeout를 사용하여 시간차를 두고 카드를 여는 효과를 줍니다.
}

셔플();
카드세팅(가로, 세로);
