const form = document.querySelector("#login-form");

let accessToken = null;

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form); //id, pw 가져와서
  const sha256Password = sha256(formData.get("password")); //pw 해시
  formData.set("password", sha256Password); //해시한 pw 다시 넣기
  //console.log(formData.get("password"));

  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });

  const data = await res.json();
  accessToken = data.access_token;

  const infoDiv = document.querySelector("#info");
  infoDiv.innerText = "로그인 성공";
  window.location.pathname = "/";

  const btn = document.createElement("button");
  btn.innerText = "상품 가져오기";
  btn.addEventListener("click", async () => {
    const res = await fetch("/items", {
        //메타 데이터
        headers:{
            'Authorization' : `Bearer ${accessToken}`,
        },
    });
    const data = await res.json();
    console.log(data);
  });
  infoDiv.appendChild(btn);
  //res.status - 서버에서 내려주는 상태코드 - return 값 상관 없이
  //if (res.status === 200) {
  //} else if (res.status === 401) {
  //}
};

form.addEventListener("submit", handleSubmit);
