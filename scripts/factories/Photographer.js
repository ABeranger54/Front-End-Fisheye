class Photographer{
    constructor(data){
        this._id = data.id;
        this._name = data.name;
        this._picture = `assets/photographers/${data.portrait}`;
        this._city = data.city;
        this._tagline = data.tagline;
        this._price = data.price;
        //TODO: always set Medias on construct
        this._medias = null;
    }

    getMedias(){
        if(!this._medias){
            this._medias = MediaFactory.getByPhotographerId(this._id);
        }
        return this._medias;
    }

    getTotalLikes(){
        var likes = 0;
        var medias = this.getMedias();
        medias.forEach(media => {
            likes += media._likes;
        });
        return likes;
    }

    getUserCardDOM(){
        const article = document.createElement( 'article' );

        const link = document.createElement('a');
        link.setAttribute("href", "photographer.html?id=" + this._id);
        link.setAttribute("aria-label", this._name);

        const img = this.getPictureDOM();

        const h2 = document.createElement( 'h2' );
        h2.textContent = this._name;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        const city = document.createElement('p');
        city.setAttribute("class", "photographer_section_city");
        city.textContent = this._city;

        const tagline = document.createElement('p');
        tagline.setAttribute("class", "photographer_section_tagline");
        tagline.textContent = this._tagline;

        const price = document.createElement('p');
        price.setAttribute("class", "photographer_section_price");
        price.textContent = this._price + "€/jour";

        article.appendChild(city);
        article.appendChild(tagline);
        article.appendChild(price);

        return (article);
    }

    getDescriptionDOM(){
        const container = document.createElement("div");
        container.setAttribute("id", "photographer_page_description");

        const h2 = document.createElement( 'h2' );
        h2.textContent = this._name;

        const city = document.createElement('p');
        city.setAttribute("id", "photographer_page_description_city");
        city.textContent = this._city;

        const tagline = document.createElement('p');
        tagline.setAttribute("id", "photographer_page_description_tagline");
        tagline.textContent = this._tagline;

        container.appendChild(h2);
        container.appendChild(city);
        container.appendChild(tagline);

        return container;
    }

    getPictureDOM(){
        const img = document.createElement( 'img' );
        img.setAttribute("src", this._picture);
        img.setAttribute("alt", "");
        return img;
    }

    getAsideDOM(){
        const aside = document.createElement("aside");
        const asideLikes = document.createElement("p");
        asideLikes.textContent = this.getTotalLikes();

        const likesContainer = document.createElement("div");
        likesContainer.setAttribute("class", "heart_container");

        const heart = document.createElement("img");
        heart.setAttribute("src", "assets/icons/heart.svg");
        heart.setAttribute("class", "heart");

        likesContainer.appendChild(asideLikes);
        likesContainer.appendChild(heart);

        aside.appendChild(likesContainer);

        const asidePrice = document.createElement("p");
        asidePrice.textContent = this._price + "€ / jour";
        aside.appendChild(asidePrice);
        return aside;
    }
}