export function rebuildMedia(media){

    const divMedia = document.createElement("div");
    divMedia.setAttribute("class","divMedia");
    divMedia.setAttribute("id","media");

    for (let i = 0; i < media.length; i++) {

        const cardMedia = document.createElement("div");
        cardMedia.setAttribute("class", "cardMedia");
        cardMedia.setAttribute("tabindex", i + 1);

        let mediaDisplay;

        if(media[i].image != null){
            mediaDisplay = document.createElement("img");
            mediaDisplay.setAttribute("src",`assets/photographers/samples/${media[i].photographerId}/${media[i].image}`);
            mediaDisplay.setAttribute("alt", media[i].title);
            mediaDisplay.setAttribute("id",`${media[i].id}`);
            mediaDisplay.setAttribute("class","media_screen");

        } else {

            mediaDisplay = document.createElement("video");
            mediaDisplay.setAttribute("id", `${media[i].id}`);
            mediaDisplay.setAttribute("disabled", "true");
            mediaDisplay.setAttribute("class","media_screen");

            const video = document.createElement("source");
            video.setAttribute("src",`assets/photographers/samples/${media[i].photographerId}/${media[i].video}`);
            video.setAttribute("type",`video/${media[i].video.split(".").pop()}`);

            mediaDisplay.appendChild(video);
        }

        const legende = document.createElement("div");
        legende.setAttribute("class", "legende");

        const h3 =  document.createElement("h3");
        h3.textContent = media[i].title;

        const p = document.createElement("p");
        p.setAttribute("class", "likes");
        p.setAttribute("id", `${media[i].id}`);
        p.textContent = media[i].likes;
        p.textContent = media[i].likes;

        legende.appendChild(h3);
        legende.appendChild(p);

        cardMedia.appendChild(mediaDisplay);
        cardMedia.appendChild(legende);
        
        divMedia.appendChild(cardMedia);
    }

    

    return divMedia;
}