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
        this._date = new Date(data.date);
        this._price = data.price;
    }

    //TODO: replace photographer by PhotographerFactory instances managing
    getMediaCardDOM(photographer){
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
        thumbnail.setAttribute("aria-label", this._title + ", closeup view");
        thumbnail.addEventListener("click", showLightbox);
        document.addEventListener("keydown", showLightbox);
        thumbnail.media = this;
        thumbnail.photographer = photographer;
        
        const description = document.createElement("div");
        description.setAttribute("class", "media_description");
        const title = document.createElement("h2");
        title.textContent = this._title;

        const likesContainer = document.createElement("div");
        likesContainer.setAttribute("class", "heart_container");

        const likes = document.createElement("p");
        likes.textContent = this._likes;

        likesContainer.appendChild(likes);
        likesContainer.innerHTML += '<svg class="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/></svg>';
        var svg = likesContainer.querySelector("svg");
        svg.setAttribute("aria-label", "likes");
        svg.addEventListener("click", incrementLikes);

        document.addEventListener("keydown", incrementLikes);

        description.appendChild(title);
        description.appendChild(likesContainer);

        thumbnail.setAttribute("tabIndex", "0");
        description.setAttribute("tabIndex", "0");

        article.appendChild(thumbnail);
        article.appendChild(description);

        return article;
    }
}