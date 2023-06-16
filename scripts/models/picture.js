export class Picture {
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.likes = data.likes;
        this.date = new Date(data.date);
        this.price = data.price;
        this.isLiked = false;
    }
}