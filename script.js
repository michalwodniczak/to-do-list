{
    const init = () =>{
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) =>{
            event.preventDefault();
        })
    }
    init();
}