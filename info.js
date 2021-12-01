var target = document.getElementById("game");
var info = false;
function openInfo(id, x, y, text) {
  let div = document.createElement("div");
  div.className = "hero";
  div.id = id;
  div.style.top = y + "px";
  div.style.left = x + "px";
  div.innerHTML = text;
  target.appendChild(div);
}
function destroy(id) {
  let el = document.getElementById(id);
  target.removeChild(el);
  info = false;
}
function info1() {
  setTimeout(
    openInfo,
    2000,
    "info1",
    0,
    -150,
    "Click this button and add PacMen to game"
  );
  setTimeout(destroy, 8000, "info1");
  if (!info) return true;
}
function info2() {
  setTimeout(openInfo, 10000, "info2", 100, -150, "Start the game");
  setTimeout(destroy, 18000, "info2");
}
function info3() {
    setTimeout(openInfo, 19000, "info3", 0, -150, "You can add more PacMan by clicking this button");
    setTimeout(destroy, 29000, "info3");
  }
async function start() {
  await info1();
  await info2();
  await info3();
}
start();
