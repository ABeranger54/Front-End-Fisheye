//Retourne le fichier "data/photographers.json" au format json
async function getJSON() {
    return (await fetch('data/photographers.json')).json();
}

class PhotographerFactory{

    //Charge tous les photographes de façon statique
    static async load(){
        const { photographers } = await getJSON();
        this.PHOTOGRAPHERS = photographers;
    }

    //Retourne tous les photographes
    static getAll(){
        var result = [];
        this.PHOTOGRAPHERS.forEach((photographer) => {
            result.push(new Photographer(photographer));
        });
        return result;
    }

    //Retourne le photographe ayant d'id correspondant
    static getById(id){
        const result = this.PHOTOGRAPHERS.filter(el => {
            return el['id'] == id;
        });

        return new Photographer(result[0]);
    }
}

//Attribut statique de la classe PhotographerFactory
PhotographerFactory.PHOTOGRAPHERS = null;