const 정답 = "APPLE";
let index = 0; //수정이 가능한 변수
let attempts = 0; //한 줄

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return;
    attempts += 1;
    index = 0;
  };

  const displayGameover = () => {
    //div 넣기
    const div = document.createElement("div");
    div.innerText = "정답입니다.";
    div.style =
      "display: flex; justify-content:center; align-items:center; position:absolute; top:40vh; left: 38vw; background-color: green; width:200px; height:100px; border: 1px solid black;"; //css

    //애니메이션 관련
    const divSpinning = [
      { transform: "rotate(0) scale(1)" },
      { transform: "rotate(360deg) scale(1)" },
    ];

    const divTiming = {
      duration: 2000,
      iterations: 1,
    };

    div.animate(divSpinning, divTiming);
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); //키 입력 안되도록
    displayGameover();
  };

  const handleEnterKey = () => {
    let 맞은_개수 = 0;
    //정답 확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (맞은_개수 === 5) {
      gameover();
    } else nextLine();
  };

  const handleBackspace = (thisBlock) => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };

  const handleKeydown = (event) => {
    
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      //알파벳만 입력되도록
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown); //키를 눌렀을 때 반응
  //키보드 클릭 시 -> addEventListener("click", handleClick);
}

appStart();
