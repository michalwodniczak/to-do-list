{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent.value.trim() }
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        const previousDoneValue = tasks[taskIndex].done

        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !previousDoneValue },
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="section__listItem"> 
                <button class="button js-done">${task.done ? "✔" : ""}</button>
                <span ${task.done ? "class=\"section__content\"" : ""}>
                  ${task.content}
                </span>
                <button class="button button--remove js-remove">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const onFormSubmit = (event) => {
        const form = document.querySelector(".js-form")

        event.preventDefault();
        const newTaskContent = document.querySelector(".js-task")
        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
        newTaskContent.focus();
        form.reset();
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}