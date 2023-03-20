document.addEventListener('DOMContentLoaded', createFormEventListener);
let formSignin;
function createFormEventListener(){
    formSignin = document.getElementById("formSignin");
    formSignin.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    console.log("nu er vi i submit")
    event.preventDefault();
    const URL = formSignin.action;
    let username = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    console.log(URL,username,password)

    const user = {
        username: username,
        password: password,
    };
    console.log(user)

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    await fetch(URL, options)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw Error(res.statusText)
            }
        })
        .then(data => {
            sessionStorage.setItem("token", data.token)
            location.href = '../html/moviemanager.html';
        })
}