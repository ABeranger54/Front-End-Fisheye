//Affiche la modale de contact et met le focus sur le premier champ
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.addEventListener("keydown", closeModalEvent);
    document.getElementById("firstName").focus();
}

//Ferme la modale via une entrée clavier
function closeModalEvent(evt) {
    if(evt.code && evt.code == "Escape"){
        closeModal();
    }
}

//Ferme la modale
function closeModal(){
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//Affiche les valeurs envoyées par le formulaire et vide les champs
function validateForm(){
    closeModal();

    const fields = ["firstName", "lastName", "mail", "message"];
    fields.forEach(field => {
        const fieldDOM = document.getElementById(field);
        console.log(field + ": " + fieldDOM.value);
        fieldDOM.value = "";
    });

    return false;
}
