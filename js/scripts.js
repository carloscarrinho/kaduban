/** Initial state */
let newListButton = null;
let addCardButton = null;
let globalBoard = null;
let dropzones = null;
let cards = null;
let activeDropzone = null;

/** Application */
window.addEventListener("load", () => {
  newListButton = document.querySelector("#newList");
  addCardButton = document.querySelector("#addCard");
  globalBoard = document.querySelector(".boards");
  dropzones = document.querySelectorAll(".dropzone");
  cards = document.querySelectorAll(".card");

  createList();
  handleCreateCard();
  handleCardEffects();
  handleDropzoneEffects();
});

function handleCardEffects() {
  cards.forEach((card) => {
    card.addEventListener("dragstart", dragstart);
    card.addEventListener("drag", drag);
    card.addEventListener("dragend", dragend);
  });

  function dragstart() {
    this.classList.add("is-dragging");
  }

  function drag() {
    activeDropzone = document.querySelector(".highlight");
  }

  function dragend() {
    activeDropzone.appendChild(this);
    this.classList.remove("is-dragging");
  }
}

function handleDropzoneEffects() {
  console.log("passou no handleDropzoneEffects");

  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("dragenter", dragenter);
    dropzone.addEventListener("dragover", dragover);
    dropzone.addEventListener("dragleave", dragleave);
  });

  function dragenter() {
    dropzones.forEach((dropzone) => dropzone.classList.add("activated"));
  }

  function dragover() {
    this.classList.add("highlight");
    this.classList.remove("activated");
  }

  function dragleave() {
    dropzones.forEach((dropzone) => dropzone.classList.remove("activated"));
    this.classList.remove("highlight");
  }
}

function createList() {
  newListButton.addEventListener("click", renderNewList);

  function renderNewList() {
    // building new list
    let list = document.createElement("div");
    let title = document.createElement("input");
    let listDropzone = document.createElement("div");
    let button = document.createElement("button");

    title.value = "new list";
    listDropzone.classList.add("dropzone");
    // button.setAttribute("type", "button");
    // button.setAttribute("id", "addCard");
    // button.innerHTML = "+ add new card";

    list.appendChild(title);
    list.appendChild(listDropzone);
    // list.appendChild(button);
    list.classList.add("board");

    globalBoard.appendChild(list);

    // updating elements
    dropzones = document.querySelectorAll(".dropzone");
    cards = document.querySelectorAll(".card");

    // restarting effects
    handleDropzoneEffects();
    handleCardEffects();
  }
}

function handleCreateCard() {
  addCardButton.addEventListener("click", function() {        
    let dropzone = this.parentNode.querySelector(".dropzone");
    let newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="status"></div>
    <textarea max-length="120" placeholder="Type your text here"></textarea>
    `;
    newCard.setAttribute("draggable", "true");
    newCard.classList.add("card");
    dropzone.appendChild(newCard);
    
    cards = document.querySelectorAll(".card");
    handleDropzoneEffects();
    handleCardEffects();
  });
}
