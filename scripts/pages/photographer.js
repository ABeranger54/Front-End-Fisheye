async function displayData(photographer) {
    const userCardDOM = photographer.getDescriptionDOM();
    const picture = photographer.getPictureDOM();
    const header = document.querySelector(".photograph-header");
    header.insertBefore(userCardDOM, header.firstChild);
    header.appendChild(picture);

    const mediaSection = document.getElementById("media_section");
    const medias = photographer.getMedias();
    medias.forEach((media) => {
        mediaSection.appendChild(media.getMediaCardDOM());
    });

    const body = document.querySelector("body");
    const aside = photographer.getAsideDOM();
    body.appendChild(aside);

    document.querySelector(".modal h2").textContent += " : " + photographer._name;
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id');

    await PhotographerFactory.load();
    await MediaFactory.load();
    
    displayData(PhotographerFactory.getById(id));
}

init();