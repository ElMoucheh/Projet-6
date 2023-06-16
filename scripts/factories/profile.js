export function profileFactory(photographer){

    const photographe = photographer;
    const picture = `assets/photographers/${photographer.portrait}`;

    function getUserProfileDOM(){
        const container = document.createElement("div");
        container.setAttribute("class", "photograph-header");

        const div = document.createElement("div");
        div.setAttribute("id", "profile-photographer");

        const h1 = document.createElement("h1");
        h1.textContent = photographe.name;
        h1.setAttribute("aria-label", "Photographe " + photographe.name);

        const location = document.createElement('p');
        location.textContent = photographe.city + ", " + photographe.country;
        location.setAttribute("id", "location");
        location.setAttribute("aria-label", "Habite à " + photographe.city + ", " + photographe.country);

        const tagline = document.createElement('p');
        tagline.textContent = photographe.tagline;
        tagline.setAttribute("id", "tagline");

        div.appendChild(h1);
        div.appendChild(location);
        div.appendChild(tagline)

        const button = document.createElement('button');
        button.setAttribute("class","contact_button");
        button.setAttribute("onclick","displayModal()");
        button.textContent = "Contactez-moi";
        button.setAttribute("aria-label", "Formulaire contacter " + photographe.name);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de " + photographe.name);

        container.appendChild(div);
        container.appendChild(button);
        container.appendChild(img);

        return (container);
    }

    function getMediaDOM(){
        const container = document.createElement("div");
        container.setAttribute("class", "photograph-media");
        container.setAttribute("id", "divMaster");

        const divList = document.createElement("div");
        divList.setAttribute("class", "divList");

        const label = document.createElement("label");
        label.setAttribute("for", "filter");
        label.textContent = "Trier par";

        const select = document.createElement("select");
        select.setAttribute("id", "filter");

        const foption = document.createElement("option");
        foption.text = "Choisir une option";
        foption.disabled = true;
        foption.selected = true;
        select.appendChild(foption);

        const options = ["Popularité", "Date", "Titre"];

        for (let i = 0; i < options.length; i++) {
            const option = document.createElement("option");
            option.setAttribute("aria-label", "Trier par " + options[i]);
            option.value = options[i];
            option.text = options[i];
            select.appendChild(option);
        }

        divList.appendChild(label);
        divList.appendChild(select);
        container.appendChild(divList);

        const divMedia = document.createElement("div");
        divMedia.setAttribute("class","divMedia");
        divMedia.setAttribute("id","media");

        for (let i = 0; i < photographe.media.length; i++) {
            divMedia.appendChild(createCardmedia(photographe.media[i], i))
        }
        
        container.appendChild(divMedia);

        /***************/
        return container;
        /***************/
    }

    function createCardmedia(media, index){
        const cardMedia = document.createElement("div");
        cardMedia.setAttribute("class", "cardMedia");
        cardMedia.setAttribute("tabindex", index + 1);

        let mediaDisplay;

        if(media.image != null){
            mediaDisplay = document.createElement("img");
            mediaDisplay.setAttribute("src",`assets/photographers/samples/${media.photographerId}/${media.image}`);
            mediaDisplay.setAttribute("alt", media.title);
            mediaDisplay.setAttribute("id",`${media.id}`);
            mediaDisplay.setAttribute("class","media_screen");
        } else {
            mediaDisplay = document.createElement("video");
            mediaDisplay.setAttribute("id", `${media.id}`);
            mediaDisplay.setAttribute("alt", `${media.title}`);
            mediaDisplay.setAttribute("disabled", "true");
            mediaDisplay.setAttribute("class","media_screen");

            const video = document.createElement("source");
            video.setAttribute("src",`assets/photographers/samples/${media.photographerId}/${media.video}`);
            video.setAttribute("type",`video/${media.video.split(".").pop()}`);

            mediaDisplay.appendChild(video);
        }

        const legende = document.createElement("div");
        legende.setAttribute("class", "legende");

        const h3 =  document.createElement("h3");
        h3.textContent = media.title;

        const p = document.createElement("p");
        p.setAttribute("class", "likes");
        p.setAttribute("id", `${media.id}`);
        p.textContent = media.likes;

        legende.appendChild(h3);
        legende.appendChild(p);

        cardMedia.appendChild(mediaDisplay);
        cardMedia.appendChild(legende);

        return cardMedia;
    }

    async function getStateDOM() {

        let totalLikes = photographe.media.reduce(sumLikes, 0)

        const container = document.createElement("div");
        container.setAttribute("id", "like_price");

        const likes = document.createElement("p");
        likes.setAttribute("id", "likes");
        
        likes.textContent = `${totalLikes}`;

        const price = document.createElement("p");
        price.textContent = `${photographe.price}€/jour`;

        container.appendChild(likes);
        container.appendChild(price);

        return container;
    }

    function sumLikes(sum, image) {
        return sum + image.likes;
    }
    

    return { getUserProfileDOM, getMediaDOM, getStateDOM ,sumLikes }
}