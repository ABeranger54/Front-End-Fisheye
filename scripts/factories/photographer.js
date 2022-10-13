function photographerFactory(data) {
    return new Photographer(data);
}
class Photographer{
    constructor(data){
        this._id = data.id;
        this._name = data.name;
        this._picture = `assets/photographers/${data.portrait}`;
        this._city = data.city;
        this._tagline = data.tagline;
        this._price = data.price;
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
}