import { Video } from "../models/video.js";
import { Picture } from "../models/picture.js";
import { Photographer } from "../models/photographer.js";

export class factory{

    static getInstance(nameClass, arg){
        switch (nameClass) {
            case 'photographer':return new Photographer(arg);  
            case 'picture':return new Picture(arg);
            case 'video':return new Video(arg);
            default:
                break;
        }
    }
}
