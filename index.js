/*それぞれアクセスできるようにid名を書く */
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
  /*JSON.parseで囲うことで文字列を配列として扱える */ 
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach(todo =>{
    add(todo);
  })
}

form.addEventListener("submit", function (event) {
  /* event.preventDefault();は勝手にリロードしないようにする*/ 
  event.preventDefault();
  add();    /*→先に呼び出し元に関数を書いておくとやりやすい*/
});

function add(todo) {
  let todoText = input.value;
/*リロードした時に改めて取得される*/
  if (todo) {
    todoText = todo.text;
  }
  /*入力されなければ処理されない(型変換されてる状態) */
  if (todoText){
  /*liタグを作る*/ 
  const li = document.createElement("li");
  /*ユーザーが入力した値を取ってくる*/
  li.innerText = todoText;
  /*cassListでHTMLにアクセスでき、addで追加できる */
  li.classList.add("list-group-item");
/*リロードした時にもデータにtodoがあり、打消し線も反映されたままになる*/
  if (todo && todo.completed) {
    li.classList.add("text-decoration-line-through");
  }
/*右クリックした時【contextmenu】のアクションを定義 */
  li.addEventListener("contextmenu", function
  (event) {
/*デフォルトの右クリックイベントをブロックしておく*/
    event.preventDefault();
    /*liタグを消す*/
    li.remove();
    /*localStorageに消したのを反映させる*/
    saveData();
  });

  li.addEventListener("click", function() {
    li.classList.toggle
    ("text-decoration-line-through");
    saveData();
  });

  ul.appendChild(li);
  /*記入したら自動で空欄になる */
  input.value = "";
  saveData();
  }
}
/*リロードしても消えないようにする */
function saveData() {
  const lists = document.querySelectorAll("li");
  /*pushでlist.innerTextをまとめる */
  let todos = [];
  lists.forEach(list => {
    let todo = {
       text: list.innerText,
       /*containsはtext-decoration-line-throughを持ってるか確かめる*/
       completed: list.classList.contains("text-decoration-line-through")
    };
    todos.push(todo);
  });
  /*JSON.stringifyでデータを変換しておくとlocalStorageにも保存できて扱いやすくなる */
  localStorage.setItem("todos", JSON.stringify(todos));
}

