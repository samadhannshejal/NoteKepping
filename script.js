const addbox = document.querySelector("#add-box");
const popup = document.querySelector(".pop-up");
const close = document.querySelector("header i");
const submit = document.querySelector("#submit");
const title = document.querySelector("input");
const desc = document.querySelector("textarea");
const header = document.querySelector("header h1");
let isUpdate = false;
let updateId;
addbox.addEventListener("click", () => {
  // popup.setAttribute("class","show")
  header.innerText = "Add Notes";
  popup.classList.add("show");
  // console.log(popup);
  //    console.log("Clicked");
});
close.addEventListener("click", () => {
  popup.classList.remove("show");
});
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(title.value);
  // postData();
  if (isUpdate) {
    isUpdate = false;
    updateData(updateId);
  } else {
    postData();
  }
});
function postData() {
  fetch("http://localhost:8080/notes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      desc: desc.value,
    }),
  });
}
function getData() {
  fetch("http://localhost:8080/notes")
    .then((res) => res.json())
    .then((data) => append(data))
    .catch((e) => console.log(e));
}
getData();
function append(data) {
  data.map((e, i) => {
    const div = document.createElement("div");
    const t = document.createElement("h4");
    t.innerText = e.title;
    const p = document.createElement("p");
    p.innerText = e.desc;
    let b1 = document.createElement("button");
    b1.innerText = "Update";
    b1.addEventListener("click", () => {
      isUpdate = true;
      updateId = e.id;
      header.innerText = "Update Notes";
      title.value = e.title;
      desc.innerText = e.desc;
      popup.classList.add("show");
    });
    let b2 = document.createElement("button");
    b2.innerText = "Delete";
    b2.addEventListener("click", () => {
      deleteData(e.id);
    });
    div.append(t, p, b1, b2);
    document.querySelector("#notes").append(div);
  });
}
function deleteData(id) {
  fetch(`http://localhost:8080/notes/${id}`, {
    method: "DELETE",
  });
}
function updateData(id) {
  fetch(`http://localhost:8080/notes/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      desc: desc.value,
    }),
  });
}
