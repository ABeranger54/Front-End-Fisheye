class MediaFactory{

    //Charge tous les médias de façon statique
    static async load(){
        const { media } = await getJSON();
        this.MEDIAS = media;
    }

    //Retourne la liste de médias correspondant à l'id du photographe
    static getByPhotographerId(id){
        var result = [];
        const arr = this.MEDIAS.filter(el => {
            return el['photographerId'] == id;
        });
        arr.forEach(media => {
            result.push(new Media(media));
        });
        return result;
    }
}

//Attribut statique de la classe MediaFactory
MediaFactory.MEDIAS = null;