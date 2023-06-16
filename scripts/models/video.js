export class Video {
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
        this.likes = data.likes;
        this.date = new Date(data.date);
        this.price = data.price;
        this.isLiked = false;
    }
}