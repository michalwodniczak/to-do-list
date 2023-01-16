{
    const tasks = [];

    const addNewTask = () => {
        tasks.push({
            content: document.querySelector(".js-task").value.trim()
        })
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1)
        render();
    }

    const toggleTaskDone = (taskIndex) =>{
        tasks[taskIndex].done = !tasks[taskIndex].done
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="section__listItem"> 
                <button class="js-done">✔</button>
                ${task.content}
                <button class="js-remove">🗑️</button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex)
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex)
            })
        })


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