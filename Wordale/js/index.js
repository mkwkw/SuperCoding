let index = 0; //수정이 가능한 변수
let attempts = 0; //몇 번 시도했는지

function appStart() {
  const handleEnterKey = () => {
    //정답 확인
  };
  
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if(event.key==="Enter"){
        handleEnterKey();
    }
    else if (index === 5) return;
    else if (keyCode >= 65 && keyCode <= 90) {//알파벳만 입력되도록
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown); //키를 눌렀을 때 반응
}

appStart();
