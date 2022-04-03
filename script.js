"use strict";
const input = document.querySelector(".input");
const findBtn = document.querySelector(".btn");
const box = document.querySelector(".box");
const popap = document.querySelector(".popap");
(function () {
  input.focus();
})();
function getFetch(meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderFunc(data.meals);
    })
    .catch((err) => {
      box.innerHTML = `<p class="please">Sorry we didn't find  any meal!</p>`;
      console.log(err);
    });
}
function renderFunc(meals) {
  box.innerHTML = "";
  meals.forEach((val) => {
    let html = `<div class="card" id=${val.idMeal}>
    <img  class="img"src="  ${val.strMealThumb} " alt=""/>
    <div class="name">${val.strMeal}</div>
    <button class="openBtn">Get recipe</button>
  </div>`;
    box.insertAdjacentHTML("afterbegin", html);
    let openBtn = document.querySelector(".openBtn");
    openBtn.addEventListener("click", () => {
      let id = openBtn.parentElement.id;
      let arr = meals.find((val) => {
        return val.idMeal === id;
      });
      popap.style.display = "flex";
      popap.style.opacity = "1";
      let pop = `<button class="close">X</button>
      <div class="popapName">${arr.strMeal}</div>
      <div class="line">instructions:</div>
      <p class="description">${arr.strInstructions}</p>
      <img class="middleImg" src="${val.strMealThumb} " alt=""/>
      <a target="_blank" href="${arr.strYoutube}">Watch videos</a>`;
      popap.insertAdjacentHTML("afterbegin", pop);
      document.querySelector(".close").addEventListener("click", () => {
        popap.style.display = "none";
        popap.style.opacity = "0";
      });
      console.log(arr);
    });
  });
}

function findElement(obj) {}

findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getFetch(input.value);
  input.value = "";
});
