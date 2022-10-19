class Media{

    static MediaType = {
        IMAGE : "image",
        VIDEO: "video"
    }

    static MEDIAS = null;

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

    static async load(){
        const { media } = await getJSON();
        this.MEDIAS = media;
    }

    static getByPhotographerId(id){
        var result = [];
        const arr = this.MEDIAS.filter(el => {
            return el['photographerId'] == id;
        });
        arr.forEach(media => {
            result.push(new Media(media));
        });
        return result;
    }

    getMediaCardDOM(){
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", "assets/medias/" + this._link);

        const description = document.createElement("div");
        description.setAttribute("class", "media_description");
        const title = document.createElement("h2");
        title.textContent = this._title;

        const likes = document.createElement("p");
        likes.textContent = this._likes;

        description.appendChild(title);
        description.appendChild(likes);

        article.appendChild(img);
        article.appendChild(description);

        return article;
    }
}