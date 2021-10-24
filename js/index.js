const id_name = "name";
const id_phone = "phone";
const id_email = "email";
const id_message = "message";
const id_incorrect_name = "incorrect-name";
const id_incorrect_phone = "incorrect-phone";
const id_incorrect_email = "incorrect-email";
const id_incorrect_message = "incorrect-message";
const id_submit_button = "apply-button"

const name_field = document.getElementById(id_name);
const phone_field = document.getElementById(id_phone);
const email_field = document.getElementById(id_email);
const message_field = document.getElementById(id_message);
const submit_button = document.getElementById(id_submit_button);

name_field.addEventListener("blur", checkName);
phone_field.addEventListener("blur", checkPhone);
email_field.addEventListener("blur", checkEmail);
// message_field.addEventListener("blur", checkMessage);
submit_button.addEventListener("click", checkAll);

function checkName(){
    console.log("focus out name");
    if (!/^([a-zа-я]+)$/.test(name_field.value))
        document.getElementById(id_incorrect_name).textContent = "Проверьте ведённое имя";
    else
        document.getElementById(id_incorrect_name).textContent = "";
}
function checkPhone(){
    console.log("focus out Phone");
    if (!/^(\+7 \([0-9]{3}\) [0-9]{3}\-[0-9]{2}\-[0-9]{2})$/.test(phone_field.value))
        document.getElementById(id_incorrect_phone).textContent = "Проверьте ведённый номер";
    else
        document.getElementById(id_incorrect_phone).textContent = "";
}
function checkEmail(){
    console.log("focus out Email");
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(email_field.value))
        document.getElementById(id_incorrect_email).textContent = "Проверьте ведённый email";
    else
        document.getElementById(id_incorrect_email).textContent = "";
}

// function checkMessage(){
//     console.log("focus out Message")
// }

function checkAll(){
    console.log("focus out name");
    if (!(phone_field.value.isEmpty&&email_field.value.isEmpty))
        document.getElementById(id_incorrect_message).textContent = "Проверьте ведённое имя";
    else
        document.getElementById(id_incorrect_message).textContent = "";
}
