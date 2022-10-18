function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function validateForm(){
    closeModal();

    var fields = ["firstName", "lastName", "mail", "message"];
    fields.forEach(field => {
        var fieldDOM = document.getElementById(field);
        console.log(field + ": " + fieldDOM.value);
        fieldDOM.value = "";
    });

    return false;
}
