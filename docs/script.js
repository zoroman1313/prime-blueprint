// ----------- state -----------
let project = {
  title: "",
  address: "",
  client: "",
  date: "",
  rooms: []
};

function saveProject() {
  localStorage.setItem("primeBlueprint", JSON.stringify(project));
}

function loadProject() {
  let data = localStorage.getItem("primeBlueprint");
  if (data) project = JSON.parse(data);
  renderAll();
}

// ----------- rooms -----------
function addRoom() {
  project.rooms.push({ name: "New Room", notes: "" });
  saveProject();
  renderAll();
}

function renderRooms() {
  const container = document.querySelector(".rooms");
  if (!container) return;
  container.innerHTML = "";
  project.rooms.forEach((room, i) => {
    let div = document.createElement("div");
    div.className = "room";
    div.innerHTML = `
      <input value="${room.name}" onchange="updateRoomName(${i}, this.value)">
      <textarea onchange="updateRoomNotes(${i}, this.value)">${room.notes}</textarea>
    `;
    container.appendChild(div);
  });
}

function updateRoomName(i, val) {
  project.rooms[i].name = val;
  saveProject();
}

function updateRoomNotes(i, val) {
  project.rooms[i].notes = val;
  saveProject();
}

// ----------- exports -----------
function exportJSON() {
  const blob = new Blob([JSON.stringify(project, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project.json";
  a.click();
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = e => {
    project = JSON.parse(e.target.result);
    saveProject();
    renderAll();
  };
  reader.readAsText(file);
}

// stub functions (pdf/flipbook)
function exportPDF() {
  alert("Export PDF logic comes here!");
}

function exportFlipbook() {
  alert("Export Flipbook logic comes here!");
}

// ----------- render all -----------
function renderEditor() {
  document.querySelector("#title").value = project.title;
  document.querySelector("#address").value = project.address;
  document.querySelector("#client").value = project.client;
  document.querySelector("#date").value = project.date;
}

function renderAll() {
  renderEditor();
  renderRooms();
}

// init
window.onload = () => {
  loadProject();
};