import { Photographer } from "../models/photographer.js"
import { Picture } from "../models/picture.js"
import { Video } from "../models/video.js"

let photographerDatas;

async function getDataPhotographer(){

    const url = new URLSearchParams(window.location.search);
    let id = parseInt(url.get("i"));

    try {
        const response = await fetch("data/photographers.json");
        const data = await response.json();
        photographerDatas = new Photographer(data.photographers.find(photographer => photographer.id === id));
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
                photographerDatas.media.push(new Picture(element));
            }
            if (element.photographerId == photographerDatas.id && element.video != null) {
                photographerDatas.media.push(new Video(element));
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function init() {
    await getDataPhotographer();
    await getMediaPhotographer();
    console.log(photographerDatas.countLikes());
};

init();
