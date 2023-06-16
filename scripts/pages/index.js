import { photographerFactory } from "../factories/photographer.js";

async function getPhotographers(){

    try {
        const response = await fetch("data/photographers.json");
        const data = await response.json();
        return data.photographers;
    } catch (error) {
        console.error(error);
    }
}

async function displayData(photographers) {
    console.log(photographers);
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    displayData(await getPhotographers());
}

init();