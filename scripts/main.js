// main.js
document.addEventListener("DOMContentLoaded", () => {
  // 날짜와 요일을 동적으로 업데이트
  const date = new Date();

  const dayElement = document.getElementById("day");
  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const weekElement = document.getElementById("week");

  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const monthsOfYear = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  dayElement.textContent = date.getDate();
  monthElement.textContent = monthsOfYear[date.getMonth()];
  yearElement.textContent = date.getFullYear();
  weekElement.textContent = daysOfWeek[date.getDay()];

  // 새로운 할일 추가 버튼 클릭시 이벤트 핸들러
  const newTaskButton = document.querySelector(".btn_create");
  const listController = new ListController();
  newTaskButton.addEventListener("click", (e) => {
    const newItem = new TodoItem(
      listController.getNewIndex(),
      listController.reRender.bind(listController),
      listController.remove.bind(listController)
    );
    listController.add(newItem);
  });
});
