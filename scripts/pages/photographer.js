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
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id');

    await Photographer.load();
    await Media.load();
    
    displayData(Photographer.getById(id));
}

init();