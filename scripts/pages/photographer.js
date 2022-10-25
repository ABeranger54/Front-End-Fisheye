const params = (new URL(document.location)).searchParams;
const id = params.get('id');

function displayInformations(photographer){
    const userCardDOM = photographer.getDescriptionDOM();
    const picture = photographer.getPictureDOM();
    const header = document.querySelector(".photograph-header");
    header.insertBefore(userCardDOM, header.firstChild);
    header.appendChild(picture);

    const body = document.querySelector("body");
    const aside = photographer.getAsideDOM();
    body.appendChild(aside);

    document.querySelector(".modal h2").textContent += " : " + photographer._name;
}

function displayMedias(photographer){
    const mediaSection = document.getElementById("media_section");
    mediaSection.innerHTML = "";
    const medias = photographer.getMedias();
    medias.forEach((media) => {
        mediaSection.appendChild(media.getMediaCardDOM(photographer));
    });
}

async function init() {
    await PhotographerFactory.load();
    await MediaFactory.load();

    var photographerObject = PhotographerFactory.getById(id);

    var filter = document.getElementById("filter")
    filter.addEventListener("change", sortMedias);
    filter.photographer = photographerObject;

    photographerObject.getMedias();
    photographerObject.sortByPopularity();

    displayInformations(photographerObject);
    displayMedias(photographerObject);
}

function sortMedias(evt){
    const select = evt.currentTarget;
    const photographer = select.photographer;

    //TODO: switch statement
    if(select.value == "popularity"){
        photographer.sortByPopularity();
    }else if(select.value == "date"){
        photographer.sortByDate();
    }else if(select.value == "title"){
        photographer.sortByTitle();
    }
    displayMedias(photographer);
}

function incrementLikes(evt){
    const heart = evt.currentTarget
    const counter = heart.mediaCounter;
    counter.textContent = parseInt(counter.textContent) + 1;

    const asideLikes = document.querySelector("aside .heart_container p");
    asideLikes.textContent = parseInt(asideLikes.textContent) + 1;

    heart.style.cursor = "default";
    heart.removeEventListener("click", incrementLikes);
}

function showLightbox(evt){
    const media = evt.currentTarget.media;
    document.getElementById("lightBox").style.display = "block";

    const lbMedia = document.getElementById("lightBox_media");
    lbMedia.innerHTML = "";

    var thumbnail;
    if(media._type == Media.MediaType.IMAGE){
        thumbnail = document.createElement("img");
        thumbnail.setAttribute("src", "assets/medias/" + media._link);
        thumbnail.setAttribute("alt", media._title);
        
    }else{
        thumbnail = document.createElement("video");
        const videoSource = document.createElement("source");
        videoSource.setAttribute("src", "assets/medias/" + media._link);
        videoSource.setAttribute("type", "video/mp4");
        thumbnail.setAttribute("controls", "");
        thumbnail.appendChild(videoSource);
    }
    lbMedia.appendChild(thumbnail);

    const title = document.createElement("h2");
    title.textContent = media._title;
    lbMedia.appendChild(title);

    const imgLeft = document.querySelector("#lightBox_left img");
    imgLeft.addEventListener("click", lightBoxBack);
    imgLeft.photographer = evt.currentTarget.photographer;
    imgLeft.media = media;

    const imgRight = document.querySelector("#lightBox_right img");
    imgRight.addEventListener("click", lightBoxNext);
    imgRight.photographer = evt.currentTarget.photographer;
    imgRight.media = media;

}

function lightBoxNext(evt){
    const photographer = evt.currentTarget.photographer;
    const currentMedia = evt.currentTarget.media;
    const mediaIndex = photographer._medias.indexOf(currentMedia);
    if(mediaIndex < photographer._medias.length - 1){
        evt.currentTarget.media = photographer._medias[mediaIndex + 1];
        evt.currentTarget.removeEventListener("click", lightBoxNext);
        showLightbox(evt);
    }
}

function lightBoxBack(evt){
    const photographer = evt.currentTarget.photographer;
    const currentMedia = evt.currentTarget.media;
    const mediaIndex = photographer._medias.indexOf(currentMedia);
    if(mediaIndex > 0){
        evt.currentTarget.media = photographer._medias[mediaIndex - 1];
        evt.currentTarget.removeEventListener("click", lightBoxBack);
        showLightbox(evt);
    }
}

init();