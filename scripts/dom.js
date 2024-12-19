class ListController {
  container;
  items = [];
  dragStartIndex;
  filter;

  constructor() {
    this.filter = "ALL";
    this.container = document.getElementsByClassName("todo_list")[0];
    this.setupDrag();
  }

  // 드래그 앤 드롭 기능 구현
  setupDrag() {
    const findParent = (element) => {
      while (element && !element.classList.contains("item")) {
        element = element.parentElement;
      }
      return element;
    };

    this.container.addEventListener("dragstart", (e) => {
      const currentItem = this.items.find(
        (item) => item.index === findParent(e.target).index
      );

      this.dragStartIndex = currentItem;
    });

    this.container.addEventListener("dragover", (e) => {
      const currentItem = this.items.find(
        (item) => item.index === findParent(e.target).index
      );

      if (currentItem !== this.dragStartIndex) {
        currentItem.switchIndex(this.dragStartIndex);
        this.reRender();
      }
    });
  }

  // 리스트 초기화 : 드래그앤 드롭이나 핀체크시 리스트를 재정렬후 다시 렌더링 하기위해 사용
  removeAll() {
    this.container.innerHTML = "";
  }

  // 리스트에서 아이템 삭제
  remove(item) {
    this.items = this.items.filter((i) => i !== item);
    this.reRender();
  }

  // 리스트 재렌더링
  reRender() {
    let renderItem;
    if (this.filter === "ALL") {
      renderItem = this.items;
    } else if (this.filter === "PINNED") {
      renderItem = this.items.filter((item) => item.isPinned);
    } else if (this.filter === "TODO") {
      renderItem = this.items.filter((item) => !item.isDone);
    }

    this.removeAll();
    renderItem
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.index - b.index;
      })
      .forEach((item) => {
        this.container.appendChild(item.render());
      });
  }

  // 아이템추가시 인덱스를 생성
  getNewIndex() {
    return this.items.length === 0
      ? 0
      : this.items[this.items.length - 1].index + 1;
  }

  // 아이템 추가및 포커스
  add(item) {
    this.items.push(item);
    this.container.appendChild(item.render());
    item.focus();
  }
}

class TodoItem {
  isPinned = false;
  index;
  content = "";
  input;
  rerender;
  remove;
  isDone = false;

  constructor(index, rerender, remove) {
    this.index = index;
    this.rerender = rerender;
    this.remove = remove;
  }

  // 핀토글 기능 isPinned값을 토글하고 다시 렌더링
  // 재렌더링할때 isPinned값을 통해 우선순위를 판단
  togglePin() {
    this.isPinned = !this.isPinned;
    this.rerender();
  }

  // 아이템 완료
  toggleDone() {
    this.isDone = !this.isDone;
  }

  // input생성시 포커스
  focus() {
    this.input.focus();
  }

  // index를 통해 item 스왑
  switchIndex(otherItem) {
    const temp = this.index;
    this.index = otherItem.index;
    otherItem.index = temp;
  }

  // todo item 생성
  render() {
    const item = document.createElement("div");
    item.className = "item";
    item.index = this.index;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "chkbox";
    checkbox.checked = this.isDone;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "txtbox";
    input.value = this.content;
    input.classList.toggle("finished", this.isDone);

    input.onchange = (e) => {
      this.content = e.target.value;
    };
    input.draggable = true;
    input.placeholder = "New Task";
    this.input = input;

    item.appendChild(checkbox);
    item.appendChild(input);

    const action = document.createElement("div");
    action.className = "action";

    const favoritesButton = document.createElement("button");
    favoritesButton.className = "btnbox btn_favorites";
    favoritesButton.classList.toggle("marked", this.isPinned);

    const removeButton = document.createElement("button");
    removeButton.className = "btnbox btn_remove";

    action.appendChild(favoritesButton);
    action.appendChild(removeButton);

    checkbox.addEventListener("change", () => {
      const textBox = item.querySelector(".txtbox");
      textBox.classList.toggle("finished", checkbox.checked);
      this.toggleDone();
    });

    favoritesButton.addEventListener("click", this.togglePin.bind(this));

    removeButton.addEventListener("click", this.remove.bind(this, this));

    item.appendChild(action);

    return item;
  }
}
