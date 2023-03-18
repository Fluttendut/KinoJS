document.addEventListener('DOMContentLoaded', createFormEventListener);
let formUser;
function createFormEventListener(){
    formUser = document.getElementById("formUser");
    formUser.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    console.log("nu er vi i submit")
    event.preventDefault();
    const URL = formUser.action;
    let username = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    console.log(URL,username,password)

    const user = {
        username: username,
        password: password,
    };

    console.log(user)

/*
    $.ajax({
        type: 'POST',
        data: user,
        contentType: 'application/json',
        url: formUser.action
    });
*/

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    const response = await fetch(URL, options);
    console.log(response.text());
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

}