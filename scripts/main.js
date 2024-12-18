// main.js
document.addEventListener("DOMContentLoaded", () => {
    // 날짜와 요일을 동적으로 업데이트
    const date = new Date();

    const dayElement = document.getElementById("day");
    const monthElement = document.getElementById("month");
    const yearElement = document.getElementById("year");
    const weekElement = document.getElementById("week");

    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const monthsOfYear = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    dayElement.textContent = date.getDate();
    monthElement.textContent = monthsOfYear[date.getMonth()];
    yearElement.textContent = date.getFullYear();
    weekElement.textContent = daysOfWeek[date.getDay()];

    // 할일 목록 기능
    const todoListElement = document.querySelector(".todo_list");
    const newTaskButton = document.querySelector(".btn_create");

    // 새로운 할일 항목을 생성하는 함수
    function createTodoItem(text = "") {
        const item = document.createElement("div");
        item.className = "item";

        item.innerHTML = `
            <input type="checkbox" class="chkbox">
            <input type="text" class="txtbox" value="${text}" placeholder="New Task">
            <div class="action">
                <button class="btnbox btn_favorites">star</button>
                <button class="btnbox btn_remove">remove</button>
            </div>
        `;

        // 이벤트 리스너 추가
        const checkbox = item.querySelector(".chkbox");
        const favoritesButton = item.querySelector(".btn_favorites");
        const removeButton = item.querySelector(".btn_remove");

        checkbox.addEventListener("change", () => {
            const textBox = item.querySelector(".txtbox");
            textBox.classList.toggle("finished", checkbox.checked);
        });

        favoritesButton.addEventListener("click", () => {
            favoritesButton.classList.toggle("marked");
        });

        removeButton.addEventListener("click", () => {
            item.remove();
        });

        return item;
    }

    // 새 할일을 생성하는 버튼 이벤트 리스너
    newTaskButton.addEventListener("click", () => {
        const newItem = createTodoItem();
        todoListElement.appendChild(newItem);
        newItem.querySelector(".txtbox").focus();
    });
});
