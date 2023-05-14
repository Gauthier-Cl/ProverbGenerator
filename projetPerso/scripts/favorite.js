const listFavorites = JSON.parse(localStorage.getItem("favorites"));
const backToHomepage = document.getElementById("homepage");

listFavorites.forEach((element) => {
  document.getElementById("fav-list").innerHTML +=
    "<li>" + element.message + "</li>";
});


backToHomepage.addEventListener("click", () => {
  
  document.location.href = "index.html";
  });