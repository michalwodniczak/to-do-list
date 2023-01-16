{
    const tasks = [];

    const addNewTask = () => {
        tasks.push({
            content: document.querySelector(".js-task").value.trim()
        })
        render();
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="section__listItem"> 
                <button>✔</button>
                ${task.content}
                <button>🗑️</button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            addNewTask();
        })
    }
    init();
}