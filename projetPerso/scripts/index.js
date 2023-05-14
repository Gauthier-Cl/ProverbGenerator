const data = [
  {
    id: 0,
    type: "quote",
    message: "A vaincre sans péril, on triomphe sans gloire",
  },
  {
    id: 1,
    type: "quote",
    message: "Tout est au mieux dans le meilleur des mondes",
  },
  {
    id: 2,
    type: "quote",
    message: "L'imagination est plus importante que le savoir",
  },
  {
    id: 3,
    type: "quote",
    message: "Un problème sans solution est un problème mal posé",
  },
  {
    id: 4,
    type: "proverb",
    message: "Paix et tranquillité, voilà le bonheur.",
  },
  {
    id: 5,
    type: "proverb",
    message:
      "La patience est un arbre dont la racine est amère, et dont les fruits sont très doux.",
  },
  {
    id: 6,
    type: "proverb",
    message: "On apprend peu par la victoire, mais beaucoup par la défaite.",
  },
  {
    id: 7,
    type: "proverb",
    message: "Avec du temps et de la patience, on vient à bout de tout.",
  },
];
const submitButton = document.getElementById("submitButton");
submitButton.disabled = true;
const quoteRadio = document.getElementById("quote");
const proverbRadio = document.getElementById("proverb");
quoteRadio.checked = false;
proverbRadio.checked = false;
const textarea = document.getElementById("result");
const btnDelete = document.getElementById("deleteButton");
const addMessageForm = document.getElementById("add-message-form");
const messageContent = document.getElementById("message-content");
const addFavForm = document.getElementById("add-fav-form");
const displayFavorites = document.getElementById("display-fav");
let currentDisplayedMsg;

const myFilter = () => {
  if (quoteRadio.checked) {
    const quoteValue = data.filter((item) => item.type === "quote");
    const arrayIndex = Math.floor(Math.random() * quoteValue.length);
    document.getElementById("result").innerText =
      quoteValue[arrayIndex].message;
    currentDisplayedMsg = quoteValue[arrayIndex];
    document.getElementById("button-Fav-Appear").innerHTML =
      '<button id="add-to-favorite" >Add to favorite</button>';

    document.getElementById("button-Display-Appear").innerHTML =
      '<a href="favorites.html">Display Favorites</a>';
  } else {
    const proverbValue = data.filter((item) => item.type === "proverb");
    const arrayIndex2 = Math.floor(Math.random() * proverbValue.length);
    document.getElementById("result").innerText =
      proverbValue[arrayIndex2].message;
    currentDisplayedMsg = proverbValue[arrayIndex2];

    document.getElementById("button-Fav-Appear").innerHTML =
      '<button id="add-to-favorite">Add to favorite</button>';

    document.getElementById("button-Display-Appear").innerHTML =
      '<a href="favorites.html" >Display Favorites</a>';
  }
};

quoteRadio.addEventListener("change", () => (submitButton.disabled = false));
proverbRadio.addEventListener("change", () => (submitButton.disabled = false));

submitButton.addEventListener("click", () => {
  submitButton.disabled = true;
  btnDelete.disabled = false;
});

btnDelete.addEventListener("click", () => {
  textarea.innerText = "?";
  btnDelete.disabled = true;
  proverbRadio.checked = false;
  quoteRadio.checked = false;
  document.getElementById("button-Fav-Appear").innerHTML ="";
  document.getElementById("button-Display-Appear").innerHTML ="";
});

addMessageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (messageContent.value.length == 0) {
    alert("Please write something!");
    return;
  }

  const newMessage = {
    type: document.getElementById("choice-type-message").value,
    message: document.getElementById("message-content").value,
    id: Math.max(...data.map((msg) => msg.id)) + 1,
    
  };
   btnDelete.disabled = false;
  data.push(newMessage);
  messageContent.value = "";
  textarea.innerText = newMessage.message;
  document.getElementById("button-Fav-Appear").innerHTML =
    '<button id="add-to-favorite">Add to favorite</button>';

   document.getElementById("button-Display-Appear").innerHTML =
     '<a href="favorites.html" >Display Favorites</a>';
  currentDisplayedMsg = newMessage;

  // reset l'input de type text
  // msg d'erreur si le champ text est vide
});
//check if message already there
//add perso message to local storage
//local storage

addFavForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentFavorites = localStorage.getItem("favorites");
  if (currentFavorites == null) {
    localStorage.setItem("favorites", JSON.stringify([currentDisplayedMsg]));
  } else {
    const parsedFavorites = JSON.parse(currentFavorites);
    if (parsedFavorites.some((msg) => msg.id === currentDisplayedMsg.id)) {
      alert("message already there");
    } else {
      parsedFavorites.push(currentDisplayedMsg);

      localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
    }
  }
});

