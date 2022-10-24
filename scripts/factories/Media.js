class Media{

    static MediaType = {
        IMAGE : "image",
        VIDEO: "video"
    }

    constructor(data){
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        if(data.hasOwnProperty('image')){
            this._type = Media.MediaType.IMAGE;
            this._link = data.image;
        }else{
            this._type = Media.MediaType.VIDEO;
            this._link = data.video;
        }
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
    }

    getMediaCardDOM(){
        const article = document.createElement('article');

        var thumbnail;

        if(this._type == Media.MediaType.IMAGE){
            thumbnail = document.createElement('img');
            thumbnail.setAttribute("src", "assets/medias/" + this._link);
        }else{
            thumbnail = document.createElement("video");
            const videoSource = document.createElement("source");
            videoSource.setAttribute("src", "assets/medias/" + this._link);
            videoSource.setAttribute("type", "video/mp4");
            thumbnail.appendChild(videoSource);
        }
        thumbnail.setAttribute("class", "media_thumbnail");
        
        const description = document.createElement("div");
        description.setAttribute("class", "media_description");
        const title = document.createElement("h2");
        title.textContent = this._title;

        const likesContainer = document.createElement("div");
        likesContainer.setAttribute("class", "heart_container");

        const likes = document.createElement("p");
        likes.textContent = this._likes;

        const heart = document.createElement("img");
        heart.setAttribute("src", "assets/icons/heart.svg");
        heart.setAttribute("class", "heart");

        likesContainer.appendChild(likes);
        likesContainer.appendChild(heart);

        description.appendChild(title);
        description.appendChild(likesContainer);

        article.appendChild(thumbnail);
        article.appendChild(description);

        return article;
    }
}