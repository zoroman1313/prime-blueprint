// simple placeholder logic
document.getElementById("addRoom").addEventListener("click", () => {
  const ws = document.getElementById("workspace");
  const div = document.createElement("div");
  div.textContent = "New Room Added";
  div.className = "room";
  ws.appendChild(div);
});
