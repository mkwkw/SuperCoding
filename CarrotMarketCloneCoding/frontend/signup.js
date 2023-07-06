const form = document.querySelector("#signup-form");

//비밀번호 확인
const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");

  if (password1 === password2) return true;
  else return false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form); //id, pw 가져와서
  const sha256Password = sha256(formData.get("password")); //pw 해시
  formData.set("password", sha256Password); //해시한 pw 다시 넣기
  //console.log(formData.get("password"));

  const div = document.querySelector("#info");

  if (checkPassword()) {
    div.innerText = "";
    const res = await fetch("/signup", {
      method: "post",
      body: formData,
    });
    const data = await res;
    if(res==="200") {
      // div.innerText="회원가입이 성공했습니다.";
      // div.style.color = "blue";
      alert("회원가입 성공");
      window.location.pathname = "/login.html"; //회원가입하면 로그인페이지로 이동
    };
  } 
  else {
    div.innerText = "비밀번호가 같지 않습니다.";
    div.style.color = "red";
    }
};

form.addEventListener("submit", handleSubmit);
