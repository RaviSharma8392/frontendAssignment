let selectedElement = null;
const form = document.getElementById("editForm");
const draggableElements = document.querySelectorAll(".draggable");

// Add dragstart event listeners
draggableElements.forEach((element) => {
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", element.dataset.type);
  });
});

// Allow dropping into center
const allowDrop = (e) => {
  e.preventDefault();
};

// Handle element drop
function drop(e) {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  let newElement;

  if (type === "text") {
    newElement = document.createElement("div");
    newElement.textContent = "edit text";
    newElement.style.color = "blue";
    newElement.style.fontSize = "20px";
    newElement.style.textAlign = "center";
    newElement.style.padding = "20px";
  } else if (type === "image") {
    newElement = document.createElement("img");
    newElement.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiVCko9mPgtlCNB9V4aq6O1fV3lPV0TFLhOw&s";
    newElement.style.width = "500px";
    newElement.style.height = "400px";
    newElement.style.paddingLeft = "50px";
  } else if (type === "button") {
    newElement = document.createElement("button");
    newElement.textContent = "Click me";
    newElement.style.border = "5px solid #ccc";
        newElement.style.fontSize = "20px";

    newElement.style.borderRadius = "5px";
    newElement.style.padding = "20px";
    newElement.style.backgroundColor = "green";
  }

  newElement.onclick = () => openEditForm(newElement);
  e.target.appendChild(newElement);
}

// Show form to edit the clicked element
function openEditForm(element) {
  selectedElement = element;
  form.innerHTML = "";

  if (element.tagName === "DIV" || element.tagName === "BUTTON") {
    const commonFields = `
      <label>Text:
        <input type="text" id="editText" value="${element.textContent}" />
      </label><br/>
    
      <label>Font Size:
        <input type="number" id="fontSize" value="${parseInt(element.style.fontSize) || 16}" />
      </label><br/>
      <label>Text Color:
        <input type="color" id="color" value="${element.style.color ||' #edf2f4'}" />
      </label><br/>
      <label>Background Color:
        <input type="color" id="bg-color" value="${element.style.backgroundColor || '#edf2f4'}" />
      </label><br/>
    `;
    form.innerHTML += commonFields;
  } else if (element.tagName === "IMG") {
    form.innerHTML += `
      <label>Image URL:
        <input type="text" id="imageUrl" value="${element.src}" />
      </label><br/>
      <label>Width:
        <input type="number" id="imageWidth" value="${parseInt(element.style.width) || 0}" />
      </label><br/>
      <label>Height:
        <input type="number" id="imageHeight" value="${parseInt(element.style.height) || 0}" />
      </label><br/>
    `;
  }

  form.innerHTML += `
    <button class="submit-button" type="submit">Apply Changes</button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    applyChanges();
  };
}

// Update the selected element's content
function applyChanges() {
  if (!selectedElement) return;

  if (selectedElement.tagName === "DIV" || selectedElement.tagName === "BUTTON") {
    const newText = document.getElementById("editText")?.value;
  
    const newFontSize = document.getElementById("fontSize")?.value;
    const newBGColor = document.getElementById("bg-color")?.value;
    const newColor = document.getElementById("color")?.value;

    if (newText) selectedElement.textContent = newText;
  
    if (newFontSize) selectedElement.style.fontSize = newFontSize + "px";
    if (newBGColor) selectedElement.style.backgroundColor = newBGColor;
    if (newColor) selectedElement.style.color = newColor;
  } else if (selectedElement.tagName === "IMG") {
    const newSrc = document.getElementById("imageUrl")?.value;
    const newWidth = document.getElementById("imageWidth")?.value;
    const newHeight = document.getElementById("imageHeight")?.value;

    if (newSrc) selectedElement.src = newSrc;
    if (newWidth) selectedElement.style.width = newWidth + "px";
    if (newHeight) selectedElement.style.height = newHeight + "px";
  }
}