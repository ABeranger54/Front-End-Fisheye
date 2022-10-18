async function displayData(photographer, medias) {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getDescriptionDOM();
    var header = document.querySelector(".photograph-header");
    header.insertBefore(userCardDOM, header.firstChild);
    const picture = photographerModel.getPictureDOM();
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
    asidePrice.textContent = photographerModel._price + "€ / jour";
    aside.appendChild(asidePrice);
}

async function init() {
    const { photographers } = await getPhotographers();
    var params = (new URL(document.location)).searchParams;
    var id = params.get('id');

    const photographerResult = photographers.filter(el => {
        return el['id'] == id;
    });

    const { media } = await getPhotographers();
    const medias = media.filter(el => {
        return el['photographerId'] == id;
    });
    
    displayData(photographerResult[0], medias);
}

init();