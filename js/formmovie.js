document.addEventListener('DOMContentLoaded', createFormEventListener);
let formMovie;

function createFormEventListener(){
    formMovie = document.getElementById("formMovie");
    formMovie.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submit her, i stedet for default html behaviour
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    console.log(form)
    console.log(url)
    console.log(form === formMovie)
    try {
        const formData = new FormData(form)
        console.log(formData)
        //const responseData = await postFormData(url, formData)
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

/*
async function postFormData(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries())
    console.log(plainFormData)

    const movie = {}
    movie. = "?" //Hvad skal der stå her?
    plainFormData.movie = movie

    const formDataJsonString = JSON.stringify(plainFormData)

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    return response.json();
}
 */



