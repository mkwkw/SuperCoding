function displayMemo(memo){
    const ul = document.querySelector("#memo-ul");
    const li = document.createElement("li");
    li.innerText = `[id:${memo.id}] ${memo.content}`;
    ul.appendChild(li);
}

async function readMemo(){
    const res = await fetch('/memos');
    const jsonRes = await res.json(); //배열
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = "";
    jsonRes.forEach(displayMemo); //배열의 원소 하나씩 참조
}

async function createMemo(value){
    const res = await fetch("/memos",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ //문자열로 보냄
            id: new Date().getTime(),
            content: value,
        }),
    });
    //const jsonRes = await res.json();
    readMemo();
}

function handleSubmit(event){
    event.preventDefault();
    const input = document.querySelector("#memo-input");
    createMemo(input.value);
    input.value = "";
}

const form = document.querySelector('#memo-form');
form.addEventListener("submit", handleSubmit); //form에서 제출 버튼이 눌렸을 때 동작

readMemo();