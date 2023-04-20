function photographerFactory(data) {
    const { name, id, city, country,  tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const link = `photographer.html?i=${id}`;

    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        a.setAttribute("href", link);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.setAttribute("id", "location");

        const taglineP = document.createElement('p');
        taglineP.textContent = tagline;
        taglineP.setAttribute("id", "tagline");

        const priceP = document.createElement('p');
        priceP.textContent = price + "€/jour";
        priceP.setAttribute("id", "price");
        
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(location);
        a.appendChild(taglineP);
        a.appendChild(priceP);
        return (a);
    }
    return { name, picture, getUserCardDOM }
}