const id_field_name = "name";
const id_field_phone = "phone";
const id_field_email = "email";
const id_field_message = "message";
const id_label_incorrect_name = "incorrect-name";
const id_label_incorrect_phone = "incorrect-phone";
const id_label_incorrect_email = "incorrect-email";
const id_button_submit = "apply-button"
const id_feedback_form = "feedback-form"

const id_modal = "modal-window"
const id_feedback_button = "modal-button"

const class_close = "close";
const class_incorrect = "incorrect";
// const class_valid = "valid";
const class_empty_pair = "empty-pair";
const class_field = "field";

const name_field = document.getElementById(id_field_name);
const phone_field = document.getElementById(id_field_phone);
const email_field = document.getElementById(id_field_email);
const message_field = document.getElementById(id_field_message);
const submit_button = document.getElementById(id_button_submit);

const modal_win = document.getElementById(id_modal);
const modal_btn = document.getElementById(id_feedback_button);
const close_btn = document.getElementsByClassName(class_close)[0];

const phone_mask = "(___) ___-__-__";
// phone_field.value = phone_mask;

name_field.addEventListener("blur", checkName);
phone_field.addEventListener("blur", checkPhone);
email_field.addEventListener("blur", checkEmail);

name_field.addEventListener("keyup", removeErrorName);
phone_field.addEventListener("keyup", removeErrorPhone);
email_field.addEventListener("keyup", removeErrorEmail);

phone_field.addEventListener("click", addPref);

submit_button.addEventListener("click", checkAll);

function removeErrorName() {
    document.getElementById(id_label_incorrect_name).textContent = "";
    name_field.classList.remove(class_incorrect);
    // name_field.classList.add(class_valid);
}

function removeErrorPhone() {
    applyMask();
    document.getElementById(id_label_incorrect_phone).textContent = "";
    phone_field.classList.remove(class_incorrect);
    // phone_field.classList.add(class_valid);
    checkEmptyPair(phone_field, email_field, id_label_incorrect_email);
}

function removeErrorEmail() {
    document.getElementById(id_label_incorrect_email).textContent = "";
    email_field.classList.remove(class_incorrect);
    // email_field.classList.add(class_valid);
    checkEmptyPair(email_field, phone_field, id_label_incorrect_phone);
}

function checkName() {
    if (!/^([a-zа-я]+)$/.test(name_field.value)) {
        document.getElementById(id_label_incorrect_name).textContent = "Проверьте ведённое имя";
        name_field.classList.add(class_incorrect);
        // name_field.classList.remove(class_valid);
    }
}

function checkPhone() {
    const re = /^(\+7 \([0-9]{3}\) [0-9]{3}\-[0-9]{2}\-[0-9]{2})$/;
    if (!re.test(phone_field.value)) {
        document.getElementById(id_label_incorrect_phone).textContent = "Проверьте ведённый номер";
        phone_field.classList.add(class_incorrect);
        // name_field.classList.remove(class_valid);
    }
}

function checkEmail() {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(email_field.value)) {
        document.getElementById(id_label_incorrect_email).textContent = "Проверьте ведённый email";
        email_field.classList.add(class_incorrect);
        // email_field.classList.remove(class_valid);
    }
}

function checkAll(event) {
    // let is_phone_filled = phone_field.value!==phone_mask;

    if (phone_field.value === "" && email_field.value === "") {
        document.getElementById(id_label_incorrect_email).textContent = "Введите email либо номер телефона";
        document.getElementById(id_label_incorrect_phone).textContent = "Введите номер телефона либо email";
        email_field.classList.add(class_incorrect);
        email_field.classList.add(class_empty_pair);
        phone_field.classList.add(class_incorrect);
        phone_field.classList.add(class_empty_pair);
        event.preventDefault();
    } else {
        let hasIncorrect = false;
        const listOfFields = document.getElementsByClassName(class_field);

        for (let filed of listOfFields) {
            hasIncorrect = hasIncorrect || filed.classList.contains(class_incorrect);
            // hasIncorrect = hasIncorrect||(!filed.classList.contains(class_valid));
        }
        if (hasIncorrect) event.preventDefault();
    }
}

function checkEmptyPair(changed_field, second_field, id_label_second_filed) {
    if (changed_field.classList.contains(class_empty_pair)) {
        changed_field.classList.remove(class_empty_pair);

        document.getElementById(id_label_second_filed).textContent = "";
        second_field.classList.remove(class_incorrect);
        second_field.classList.remove(class_empty_pair);
    }
}

function applyMask() {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value = ""));
    }
}

function addPref() {
    phone_field.value = "+7 " + phone_mask;
    if (phone_field.selectionStart) {
        phone_field.focus();
        phone_field.setSelectionRange(4, 4);
    }
}

if (modal_btn != null) {
    modal_btn.addEventListener("click", () => {
        modal_win.style.display = "block";
    })
}

if (close_btn != null) {
    close_btn.addEventListener("click", () => {
        modal_win.style.display = "none";
    })
}

window.onclick = function (event) {
    if (event.target === modal_win) {
        modal_win.style.display = "none";
    }
}
