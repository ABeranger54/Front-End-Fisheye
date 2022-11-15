//Récuperation de l'id du photographe par les paramètres URL
const params = (new URL(document.location)).searchParams;
const id = params.get('id');

//Affichage des informations du photographe
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

//Affichage des médias
function displayMedias(photographer){
    const mediaSection = document.getElementById("media_section");
    mediaSection.innerHTML = "";
    const medias = photographer.getMedias();
    medias.forEach((media) => {
        mediaSection.appendChild(media.getMediaCardDOM(photographer));
    });
}

//Fonction appelée au chargement de page
async function init() {
    //Chargement des Photographes/Médias, contenus de façon statique dans les factories
    await PhotographerFactory.load();
    await MediaFactory.load();

    var photographerObject = PhotographerFactory.getById(id);

    //Ajout d'un EventListener sur le filtre <select>
    var filter = document.getElementById("filter")
    filter.addEventListener("change", sortMedias);
    filter.photographer = photographerObject;

    //Tri des médias par popularité (première option du filtre select)
    photographerObject.getMedias();
    photographerObject.sortByPopularity();

    //Affichage des informations dynamiques
    displayInformations(photographerObject);
    displayMedias(photographerObject);
}

function sortMedias(evt){
    const select = evt.currentTarget;
    const photographer = select.photographer;

    //Tri du tableau de médias (membre de photographe)
    if(select.value == "popularity"){
        photographer.sortByPopularity();
    }else if(select.value == "date"){
        photographer.sortByDate();
    }else if(select.value == "title"){
        photographer.sortByTitle();
    }
    displayMedias(photographer);
}

//Incrémentation des likes (pour le média et au total)
function incrementLikes(evt){
    var heart;

    //Vérification des entrées clavier
    if(evt.code && evt.code != "Enter"){
        return;
    }
    if(evt.code == "Enter"){
        if(document.activeElement.className != "media_description") return;
        heart = document.activeElement.querySelector("div svg");
        if(heart.style.fill == "red") return;
    }else{
        heart = evt.currentTarget;
    }
    
    //Mise à jour du média
    heart.style.fill = "red";
    var counter = heart.parentNode.querySelector("p");
    counter.textContent = parseInt(counter.textContent) + 1;

    //Mise à jour du total de likes dans <aside>
    const asideLikes = document.querySelector("aside .heart_container p");
    asideLikes.textContent = parseInt(asideLikes.textContent) + 1;

    //Suppression de l'EventListener (ce qui évite de cliquer / aimer plusieurs fois un média)
    heart.style.cursor = "default";
    heart.removeEventListener("click", incrementLikes);
}

function showLightbox(evt){
    //Vérification des entrées clavier
    if(evt.code && evt.code != "Enter" && evt.code != "ArrowLeft" && evt.code != "ArrowRight") return;
    if(evt.code == "ArrowLeft" || evt.code == "ArrowRight"){
        if(document.getElementById("lightBox").style.display == "none" || document.getElementById("lightBox").style.display == ""){
            return;
        }
    }
    
    //Affectation du média et photographe en fonction de l'entrée clavier
    var media;
    var photographer;
    if(evt.code == "Enter"){
        if(document.activeElement.tagName != "IMG" && document.activeElement.tagName != "VIDEO"){
            return;
        }
        media = document.activeElement.media;
        photographer = document.activeElement.photographer;
    }else{
        media = evt.currentTarget.media;
        photographer = evt.currentTarget.photographer;
    }
    document.getElementById("lightBox").style.display = "flex";

    const lbMedia = document.getElementById("lightBox_media");
    lbMedia.innerHTML = "";

    //Définition de l'élément DOM en fonction du type de média (image/vidéo)
    var thumbnail;
    if(media._type == MediaType.IMAGE){
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

    //Ajout d'EventListener pour le bouton de fermeture et les flèches
    const close = document.getElementById("closeButton");
    close.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", closeLightbox);

    const imgLeft = document.querySelector("#lightBox_left .arrow");
    imgLeft.addEventListener("click", lightBoxBack);
    imgLeft.photographer = photographer;
    imgLeft.media = media;

    const imgRight = document.querySelector("#lightBox_right .arrow");
    imgRight.addEventListener("click", lightBoxNext);
    imgRight.photographer = photographer;
    imgRight.media = media;

    document.addEventListener("keydown", lightBoxBack);
    document.addEventListener("keydown", lightBoxNext);
    document.photographer = photographer;
    document.media = media;
}

//Passage au média suivant dans la lightbox
function lightBoxNext(evt){
    if(evt.code && evt.code != "ArrowRight") return;
    const photographer = evt.currentTarget.photographer;
    const currentMedia = evt.currentTarget.media;
    const mediaIndex = photographer._medias.indexOf(currentMedia);
    if(mediaIndex < photographer._medias.length - 1){
        evt.currentTarget.media = photographer._medias[mediaIndex + 1];
        evt.currentTarget.removeEventListener("click", lightBoxNext);
        showLightbox(evt);
    }
}

//Passage au média précédent dans la lightbox
function lightBoxBack(evt){
    if(evt.code && evt.code != "ArrowLeft") return;
    const photographer = evt.currentTarget.photographer;
    const currentMedia = evt.currentTarget.media;
    const mediaIndex = photographer._medias.indexOf(currentMedia);
    if(mediaIndex > 0){
        evt.currentTarget.media = photographer._medias[mediaIndex - 1];
        evt.currentTarget.removeEventListener("click", lightBoxBack);
        showLightbox(evt);
    }
}

//Permet de fermer la lightbox
function closeLightbox(evt){
    if(evt.code && evt.code != "Escape") return;
    document.getElementById("lightBox").style.display = "none";
}

init();