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

    const fields = ["firstName", "lastName", "mail", "message"];
    fields.forEach(field => {
        const fieldDOM = document.getElementById(field);
        console.log(field + ": " + fieldDOM.value);
        fieldDOM.value = "";
    });

    return false;
}
