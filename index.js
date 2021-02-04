function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
/** Validar el formulario antes de mostrar la notificacion */
function validateForm(e) {
    e.preventDefault();
    document.getElementById("name-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const validEmailFormat = /\S+@\S+\.\S+/;

    if (nameField.value === "") {
        document.getElementById("name-error").innerHTML = "! Para enviar el formulario, se necesita un nombre";
    } else if (emailField.value === "") {
        document.getElementById("email-error").innerHTML = "! Para enviar el formulario, se necesita un correo"
    } else if (!validEmailFormat.test(emailField.value)) { //formato regex
        document.getElementById("email-error").innerHTML = "! Formato incorrecto, revisa que el correo este correcto"
    } else {
        showNotification();
    }
}

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
    document.getElementById("name-error").innerHTML = "";
    document.getElementById("email-error").innerHTML = "";
    nombre = document.getElementById("name").value;
    correo = document.getElementById("email").value;
    mensaje = escapeRegExp(document.getElementById("message").value);

    //Exito 
    jQuery.ajax({
        url: "./contact-form.php",
        type: "POST",
        dataType: "json",
        data: {
            Name: nombre,
            Email: correo,
            Message: mensaje
        }
    }).done(function(data) {
        console.log(data);
        document.querySelector('.form-container').reset();
        document.querySelector(".notification").style.display = "flex";
        document.querySelector(".notification").innerHTML = "Su mensaje ha sido enviado.";
        setTimeout(function() {
            document.querySelector(".notification").style.display = "none";
        }, 3000);
    }).fail(function(data) {
        console.log(data.responseText);
        alert(data.responseText);
    });;
    console.log('fin del ajax');
}