async function getPhotographers() {
    return (await fetch('data/photographers.json')).json();
}

async function displayData(photographer) {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getDescriptionDOM();
    var header = document.querySelector(".photograph-header");
    header.insertBefore(userCardDOM, header.firstChild);
    const picture = photographerModel.getPictureDOM();
    header.appendChild(picture);
}

async function init() {
    const { photographers } = await getPhotographers();
    var params = (new URL(document.location)).searchParams;
    var id = params.get('id');

    const result = photographers.filter(el => {
        return el['id'] == id;
    });

    displayData(result[0]);
}

init();