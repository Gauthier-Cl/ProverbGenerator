const listFavorites = JSON.parse(localStorage.getItem("favorites"));

listFavorites.forEach((element) => {
  document.getElementById("fav-list").innerHTML +=
    "<li>" + element.message + "</li>";
});
