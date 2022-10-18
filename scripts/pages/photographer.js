async function displayData(photographer, medias) {
    const userCardDOM = photographer.getDescriptionDOM();
    var header = document.querySelector(".photograph-header");
    header.insertBefore(userCardDOM, header.firstChild);
    const picture = photographer.getPictureDOM();
    header.appendChild(picture);

    var totalLikes = 0;
    const mediaSection = document.getElementById("media_section");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
        totalLikes += mediaModel._likes;
    });

    const aside = document.querySelector("aside");
    const asideLikes = document.createElement("p");
    asideLikes.textContent = totalLikes;
    aside.appendChild(asideLikes);

    const asidePrice = document.createElement("p");
    asidePrice.textContent = photographer._price + "€ / jour";
    aside.appendChild(asidePrice);
}

async function init() {
    var params = (new URL(document.location)).searchParams;
    var id = params.get('id');

    const photographer = await Photographer.getPhotographerById(id);

    const { media } = await getJSON();
    const medias = media.filter(el => {
        return el['photographerId'] == id;
    });
    
    displayData(photographer, medias);
}

init();