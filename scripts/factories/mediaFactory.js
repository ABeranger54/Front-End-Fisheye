class MediaFactory{

    static MEDIAS = null;

    static async load(){
        const { media } = await getJSON();
        this.MEDIAS = media;
    }

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