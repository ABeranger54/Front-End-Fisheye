async function getJSON() {
    return (await fetch('data/photographers.json')).json();
}

class PhotographerFactory{

    static PHOTOGRAPHERS = null;

    static async load(){
        const { photographers } = await getJSON();
        this.PHOTOGRAPHERS = photographers;
    }

    static getAll(){
        var result = [];
        this.PHOTOGRAPHERS.forEach((photographer) => {
            result.push(new Photographer(photographer));
        });
        return result;
    }

    static getById(id){
        const result = this.PHOTOGRAPHERS.filter(el => {
            return el['id'] == id;
        });

        return new Photographer(result[0]);
    }
}