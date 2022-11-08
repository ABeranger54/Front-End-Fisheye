function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.addEventListener("keydown", closeModalEvent);
    document.getElementById("firstName").focus();
}

function closeModalEvent(evt) {
    if(evt.code && evt.code == "Escape"){
        closeModal();
    }
}

function closeModal(){
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

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
