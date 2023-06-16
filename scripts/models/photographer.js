export class Photographer {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.city =  data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
        this.likes = 0;
        this.media = [];
    }

    countLikes(){
        this.likes = 0;
        this.media.forEach(element => {
            this.likes += element.likes;
        })
        return this.likes;
    }
}