//string data
const string_for_incorrect_name = "Проверьте ведённое имя";
const string_for_incorrect_phone = "Проверьте ведённый номер";
const string_for_incorrect_email = "Проверьте ведённый email";
const string_for_empty_phone = "Введите номер телефона либо email";
const string_for_empty_email = "Введите email либо номер телефона";
const string_for_required = "Заполните это поле";

//masks
const phone_mask = "+7 (___) ___-__-__";

//id
const id_field_name = "name";
const id_field_phone = "phone";
const id_field_email = "email";
const id_field_message = "message";
const id_label_incorrect_name = "incorrect-name";
const id_label_incorrect_phone = "incorrect-phone";
const id_label_incorrect_email = "incorrect-email";
const id_label_incorrect_message = "incorrect-message";
const id_button_submit = "apply-button"
const id_form_feedback = "feedback-form"
const id_button_close = "close-button"
const id_loader = "loader"
const id_result = "result"

const id_modal = "modal-window"
const id_feedback_button = "modal-button"

//classes
const class_incorrect = "incorrect";
const class_filled = "filled";
const class_empty_pair = "empty-pair";
const class_required = "required";
const class_field = "field";
const class_success = "success";
const class_fail = "fail";

//DOM objects
const name_field = {
    field: document.getElementById(id_field_name),
    label: id_label_incorrect_name,
    error_str: string_for_incorrect_name
};

const phone_field = {
    field: document.getElementById(id_field_phone),
    label: id_label_incorrect_phone,
    error_str: string_for_incorrect_phone,
    empty_str: string_for_empty_phone
};

const email_field = {
    field: document.getElementById(id_field_email),
    label: id_label_incorrect_email,
    error_str: string_for_incorrect_email,
    empty_str: string_for_empty_email
};

const message_field = {
    field: document.getElementById(id_field_message),
    label: id_label_incorrect_message
}

const submit_button = document.getElementById(id_button_submit);

const modal_win = document.getElementById(id_modal);
const modal_btn = document.getElementById(id_feedback_button);
const close_btn = document.getElementById(id_button_close);

const loader_gif = document.getElementById(id_loader);
const result_span = document.getElementById(id_result);

//event listeners
name_field.field.addEventListener("blur", checkName);
phone_field.field.addEventListener("blur", checkPhone);
email_field.field.addEventListener("blur", checkEmail);

name_field.field.addEventListener("keyup", removeErrorName);
phone_field.field.addEventListener("keyup", removeErrorPhone);
email_field.field.addEventListener("keyup", removeErrorEmail);
message_field.field.addEventListener("keyup", removeErrorMessage);

submit_button.addEventListener("click", checkAllBeforeSend);

//functions
function removeErrorName() {
    if (name_field.field.value !== "")
        name_field.field.classList.add(class_filled);
    else
        name_field.field.classList.remove(class_filled);

    document.getElementById(name_field.label).textContent = "";
    name_field.field.classList.remove(class_incorrect);
}

function removeErrorPhone() {
    let is_not_empty = phone_field.field.value !== "" && phone_field.field.value !== phone_mask;
    if (is_not_empty) {
        phone_field.field.classList.add(class_filled);
        applyMask();
    } else
        phone_field.field.classList.remove(class_filled);

    document.getElementById(phone_field.label).textContent = "";
    phone_field.field.classList.remove(class_incorrect);
    checkEmptyPair(phone_field.field, email_field);
}

function removeErrorEmail() {
    if (email_field.field.value !== "")
        email_field.field.classList.add(class_filled);
    else
        email_field.field.classList.remove(class_filled);

    document.getElementById(email_field.label).textContent = "";
    email_field.field.classList.remove(class_incorrect);
    checkEmptyPair(email_field.field, phone_field);
}

function removeErrorMessage() {
    if (message_field.field.value !== "")
        message_field.field.classList.add(class_filled);
    else
        message_field.field.classList.remove(class_filled);

    document.getElementById(message_field.label).textContent = "";
    message_field.field.classList.remove(class_incorrect);
}

function checkName() {
    const re = /^([a-zа-я]+)$/;
    checkField(name_field, re);
}

function checkPhone() {
    const re = /^(\+7 \([0-9]{3}\) [0-9]{3}\-[0-9]{2}\-[0-9]{2})$/;
    checkField(phone_field, re);
}

function checkEmail() {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    checkField(email_field, re);
}

function checkField(field_obj, regexp) {
    if ((field_obj.field.value !== "") && ((field_obj.field.value !== phone_mask)) && (!regexp.test(field_obj.field.value))) {
        document.getElementById(field_obj.label).textContent = field_obj.error_str;
        field_obj.field.classList.add(class_incorrect);
    }
}

function checkAllBeforeSend(event) {
    event.preventDefault();

    if (name_field.field.value === "") {
        name_field.field.classList.add(class_incorrect);
        document.getElementById(name_field.label).textContent = string_for_required;
    } else if (message_field.field.value === "") {
        document.getElementById(message_field.label).textContent = string_for_required;
        message_field.field.classList.add(class_incorrect);
    } else if (phone_field.field.value === "" && email_field.field.value === "") {
        document.getElementById(email_field.label).textContent = email_field.empty_str;
        document.getElementById(phone_field.label).textContent = phone_field.empty_str;
        email_field.field.classList.add(class_incorrect);
        email_field.field.classList.add(class_empty_pair);
        phone_field.field.classList.add(class_incorrect);
        phone_field.field.classList.add(class_empty_pair);
    } else {
        let hasIncorrectOrEmpty = Array.from(document.getElementsByClassName(class_field)).reduce((res, field) => {
            return res || field.classList.contains(class_incorrect) || (field.classList.contains(class_empty_pair));
        }, false);

        if (!hasIncorrectOrEmpty) {
            sendForm().then(r => r);
        }
    }
}

function checkEmptyPair(changed_field, second_field_obj) {
    if (changed_field.classList.contains(class_empty_pair)) {
        changed_field.classList.remove(class_empty_pair);

        document.getElementById(second_field_obj.label).textContent = "";
        second_field_obj.field.classList.remove(class_incorrect);
        second_field_obj.field.classList.remove(class_empty_pair);
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

if (modal_btn) {
    modal_btn.addEventListener("click", () => {
        modal_win.style.display = "flex";
        modal_btn.style.display = "none";
    })
}

if (close_btn) {
    close_btn.addEventListener("click", () => {
        modal_win.style.display = "none";
        modal_btn.style.display = "block";
    })
}

window.onclick = function (event) {
    if (event.target === modal_win) {
        modal_win.style.display = "none";
        modal_btn.style.display = "block";
    }
}

async function sendForm() {
    let today = new Date();
    let dateTime = today.toISOString();

    const resJson = JSON.stringify({
        createdAt: dateTime,
        data: {
            name: name_field.field.value,
            phone: phone_field.field.value,
            email: email_field.field.value,
            message: message_field.field.value
        }
    });

    loader_gif.style.display = "block";
    submit_button.style.display = "none";

    let response = await fetch("https://617911d8aa7f340017404757.mockapi.io/feedback/req",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: resJson
        });

    loader_gif.style.display = "none";

    if (response.ok) {
        result_span.classList.add(class_success);
        result_span.textContent = "✓";
        setTimeout(function () {
            result_span.className = "";
            result_span.textContent = "";
            submit_button.style.display = "block";
            Array.from(document.getElementsByClassName(class_field)).map((field) => {
                field.classList.remove(class_filled);
                return field.value = "";
            });
        }, 1000);
    } else {
        result_span.classList.add(class_fail);
        result_span.textContent = "❌";
        setTimeout(function () {
            result_span.className = "";
            result_span.textContent = "";
            submit_button.style.display = "block";
        }, 1000);
    }
}
