//API url

const apiEndpoint = "https://todoo.5xcamp.us/todos";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMjk5Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjc3MjIxMDk0LCJleHAiOjE2Nzg1MTcwOTQsImp0aSI6IjU4YjMyYmY3LTJhOWEtNDJlOS05OWFhLTY0YjMxOGYzNTE4NSJ9.JFooUTuIBnqPdAHCQnDXz2p5av7pVgdLUZY817P9bqQ";

const headers = {
  Authorization: `Bearer ${token}`,
  accept: "application/json",
};
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
let data = [];
// 取得資料

function getApi() {
  axios.get(apiEndpoint, { headers }).then(function (response) {
    data = response.data.todos;
    console.log(data);
    init();
  });
}
//  網頁初始化
const list = document.querySelector(".list");
function init() {
  let str = "";
  data.forEach(function (item, index) {
    str += `<li><p>●</p><h3>${item.content}</h3><input type="checkbox" class="check"data-number="${index}" value="✔ data-status="${item.completed_at}" /><input type="button" class="delete" data-num ="${index}" value="✘" data-id = "${item.id}"/></li>`;
  });
  console.log(str);
  list.innerHTML = str;
}
getApi();

//✘ 刪除
list.addEventListener("click", function (e) {
  //點擊到其他地方
  if (e.target.getAttribute("class") == "delete") {
    //抓取data-id 要抓取每一筆id資料
    const getId = e.target.getAttribute("data-id");
    console.log(getId);

    // axios刪除
    axios
      .delete(`${apiEndpoint}/${getId}`, config)
      .then(function (response) {
        console.log(response);

        getApi();
      })
      .catch(function (error) {
        console.log(error);
      });

    init();
  }
});

//✔
list.addEventListener("click", function (e) {
  data.forEach(function (item, index) {
    if (e.target.getAttribute("type") == "checkbox") {
      const completed = e.target.getAttribute("data-status");
      if (e.target.checked) {
        console.log("checkbox 被勾選");
        completed = "Finished";
        console.log(completed);
      } else {
        console.log("checkbox 沒有被勾選");
        completed = "null";
        console.log(completed);
      }
    }
  });
});
//將finish的資訊呈現在網頁上

const finished = document.querySelector(".finished");
finished.addEventListener("click", function (e) {
  let done = "";
  data.forEach(function (item, index) {
    if (item.completed_at == "Finished") {
      done += `<li><p>●</p><h3>${item.content}</h3><input type="button" class="delete" data-num ="${index}" value="✘" /></li>`;
    }
  });
  list.innerHTML = done;
});
//all
const all = document.querySelector(".all");

all.addEventListener("click", function (e) {
  let allStr = "";
  data.forEach(function (item, index) {
    allStr += `<li><p>●</p><h3>${item.content}</h3><input type="checkbox" class="check"data-number="${index}" value="✔"/><input type="button" class="delete" data-num ="${index}" value="✘" /></li>`;
  });
  list.innerHTML = allStr;
});

//pending
const pending = document.querySelector(".pending");
pending.addEventListener("click", function (e) {
  let undone = "";
  data.forEach(function (item, index) {
    if (item.completed_at == null) {
      undone += `<li><p>●</p><h3>${item.content}</h3><input type="button" class="delete" data-num ="${index}" value="✘" /></li>`;
    }
  });
  list.innerHTML = undone;
});
//新增待辦事項
const btn = document.querySelector(".btn");
const todoAdd = document.querySelector(".todoAdd");
btn.addEventListener("click", function (e) {
  if (todoAdd.value == "") {
    alert("write somthing");
    return;
  }
  //抓取todoadd.value
  let obj = {};
  obj.content = todoAdd.value;
  obj.status = "";

  // axios 新增
  axios
    .post(apiEndpoint, obj, { headers })
    .then(function (response) {
      console.log(response);
      // 如果成功就會執行這個function
      getApi();
    })
    .catch(function (error) {
      console.log(error);
    });

  todoAdd.value = "";
});
