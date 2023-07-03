async function deleteMemo(event) {
  const id = event.target.dataset.id; //data-id
  //내용 삭제 - DELETE
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

async function editMemo(event) {
  const id = event.target.dataset.id; //data-id
  const editInput = prompt("수정할 값을 입력하세요!"); //alert창 같이 상단에 표시됨.
  //내용 수정 - PUT
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //문자열로 보냄
      id,
      content: editInput,
    }),
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  //memo.id를 전달하는 역할
  editBtn.dataset.id = memo.id; //<div data-id={memo.id}> 이런 식으로 들어감

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", deleteMemo);
  //memo.id를 전달하는 역할
  delBtn.dataset.id = memo.id; //<div data-id={memo.id}> 이런 식으로 들어감

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json(); //배열
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo); //배열의 원소 하나씩 참조
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //문자열로 보냄
      id: new Date().getTime(),
      content: value,
    }),
  });
  //const jsonRes = await res.json();
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit); //form에서 제출 버튼이 눌렸을 때 동작

readMemo();
