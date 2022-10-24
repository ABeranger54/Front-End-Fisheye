    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            photographersSection.appendChild(photographer.getUserCardDOM());
        });
    }

    async function init() {
        await PhotographerFactory.load();
        displayData(PhotographerFactory.getAll());
    }
    
    init();
    