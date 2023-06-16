//import { Photographer } from "../models/photographer.js";
//import { Picture } from "../models/picture.js";
//import { Video } from "../models/video.js";
import { profileFactory } from "../factories/profile.js";
import { rebuildMedia } from "../factories/media.js";
import { factory } from "../factories/factory.js"

let photographerDatas;

let filter;
let getMedia;
let currentIndex = 0;

document.getElementById("closeCarrousel").addEventListener("click", closeCarrousel);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCarrousel();
    } else if (event.key === 'ArrowRight') {
        nextMedia();
    } else if (event.key === 'ArrowLeft') {
        backMedia();
    }
  });


async function getDataPhotographer(){

    const url = new URLSearchParams(window.location.search);
    let id = parseInt(url.get("i"));

    try {
        const response = await fetch("data/photographers.json");
        const data = await response.json();
        photographerDatas = factory.getInstance("photographer", data.photographers.find(photographer => photographer.id === id));
        console.log(photographerDatas);
    } catch (error) {
        console.error(error);
    }
}

async function getMediaPhotographer(){
    try {
        const response = await fetch("data/photographers.json");
        const data = await response.json();

        data.media.forEach(element => {
            if (element.photographerId == photographerDatas.id && element.image != null) {
                photographerDatas.media.push(factory.getInstance("picture", element));
            }
            if (element.photographerId == photographerDatas.id && element.video != null) {
                photographerDatas.media.push(factory.getInstance("video", element));
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function displayData(){
    const headerPagePhotographer = document.getElementById("main");
    const photographerModel = profileFactory(photographerDatas);
    const profileCardDOM = photographerModel.getUserProfileDOM();
    const mediaCardDOM = photographerModel.getMediaDOM();
    const statCardDOM = await photographerModel.getStateDOM();
    headerPagePhotographer.appendChild(profileCardDOM);
    headerPagePhotographer.appendChild(mediaCardDOM);
    headerPagePhotographer.appendChild(statCardDOM);

    filter = document.getElementById("filter");
}

async function sortWithFilter(filterOpt){
    const oldMedia = document.getElementById("media");
    const divMaster = document.getElementById("divMaster");
    let newMedia;

    switch (filterOpt) {
        case "Popularité":
            await photographerDatas.media.sort((a, b) => b.likes - a.likes);
            newMedia = rebuildMedia(photographerDatas.media);
            divMaster.removeChild(oldMedia);
            divMaster.appendChild(newMedia);
            carrousel();
            likes();
            break;

        case "Date":
            await photographerDatas.media.sort((a, b) => a.date.getTime() - b.date.getTime());
            newMedia = rebuildMedia(photographerDatas.media);
            divMaster.removeChild(oldMedia);
            divMaster.appendChild(newMedia);
            carrousel();
            likes();
            break;

        case "Titre":
            
            await photographerDatas.media.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            newMedia = rebuildMedia(photographerDatas.media);
            divMaster.removeChild(oldMedia);
            divMaster.appendChild(newMedia);
            carrousel();
            likes();
            break;

        default:
            break;
    }
}

function likes(){
    const getLikes = document.querySelectorAll('.likes');
    const pLikes = document.getElementById('likes');

    getLikes.forEach(element => {

        element.addEventListener("click", () => {
            let mediaLiked = photographerDatas.media.find(media => media.id == element.id)

            if (mediaLiked.isLiked) {
                mediaLiked.likes--;
            } else {
                mediaLiked.likes++;
            }

            mediaLiked.isLiked = !mediaLiked.isLiked;
            element.innerHTML = mediaLiked.likes;

            let instance = profileFactory(photographerDatas);
            let res = photographerDatas.media.reduce(instance.sumLikes, 0)
            pLikes.innerHTML = res
        })
    });
}

function displayCarrousel() {
    const modal = document.getElementById("carousel");
	modal.style.display = "block";
}

function carrousel(){
    getMedia = document.querySelectorAll('.media_screen');
    getMedia.forEach((element, index) => {
        element.addEventListener("click", () => {

            if (element.tagName.toLowerCase() === "img") {
                loadImageCarrousel(element, index);
            } else if (element.tagName.toLowerCase() === "video") {
                loadVideoCarrousel(element, index);
            }
            displayCarrousel();
        
        });
    });
}

function createImageCarrousel(e){
    let mediaDisplay = document.createElement("img");
    mediaDisplay.setAttribute("src", e.src);
    mediaDisplay.setAttribute("alt", e.alt);
    mediaDisplay.setAttribute("id", "carousel-item");

    return mediaDisplay;
}

function createVideoCarrousel(e){
    let mediaDisplay = document.createElement("video");
    mediaDisplay.setAttribute("id", "carousel-item");
    mediaDisplay.setAttribute("controls", true);

    let video = document.createElement("source");
    video.setAttribute("src", e.children[0].src);
    video.setAttribute("type", e.children[0].type);

    mediaDisplay.appendChild(video);

    return mediaDisplay;
}

function loadImageCarrousel(element, index) {
    const containerMedia = document.querySelector('.carousel-container');
    containerMedia.innerHTML = "";

    currentIndex = index;
    containerMedia.appendChild(createImageCarrousel(element));
}

function loadVideoCarrousel(element, index) {
    const containerMedia = document.querySelector('.carousel-container');
    containerMedia.innerHTML = "";

    currentIndex = index;
    containerMedia.appendChild(createVideoCarrousel(element));
}

function nextMedia() {
    currentIndex++;
    if(currentIndex >= getMedia.length){
        currentIndex = 0
    }

    if (getMedia[currentIndex].tagName.toLowerCase() === "img"){
        loadImageCarrousel(getMedia[currentIndex], currentIndex);
    } else if (getMedia[currentIndex].tagName.toLowerCase() === "video"){
        loadVideoCarrousel(getMedia[currentIndex], currentIndex);
    }
}

function backMedia() {
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = getMedia.length - 1;
    }

    if (getMedia[currentIndex].tagName.toLowerCase() === "img"){
        loadImageCarrousel(getMedia[currentIndex], currentIndex);
    } else if (getMedia[currentIndex].tagName.toLowerCase() === "video"){
        loadVideoCarrousel(getMedia[currentIndex], currentIndex);
    }
}

function closeCarrousel() {
    const modal = document.getElementById("carousel");
    modal.style.display = "none";
}

async function init() {
    await getDataPhotographer();
    await getMediaPhotographer();
    displayData();
}

await init();

filter.addEventListener("change", () => {
    sortWithFilter(filter.value)
});

carrousel();
likes();

document.getElementById("next").addEventListener("click", nextMedia);
document.getElementById("back").addEventListener("click", backMedia);