import './todo-item.js';

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
    this.shadowDOM.innerHTML = getHTML();

    const select = selector => this.shadowRoot.querySelector(selector);

    this.tasksElement = select('#tasks');

    select('form').addEventListener('submit', evt => {
      evt.preventDefault();
      // Get value
      const inputValue = select('input').value;
      if (inputValue.length == 0) return;
      select('input').value = "";
      // Create new item
      this.addTask(inputValue);
      this.dispatchEvent(new CustomEvent('updated'));
    });
  }

  addTask(text, completed = false) {
    const newElement = document.createElement('todo-item');
    newElement.setAttribute('data-value', text);
    newElement.completed = completed;
    this.tasksElement.insertBefore(newElement, this.tasksElement.firstChild);

    newElement.addEventListener('removed', evt => {
      this.tasksElement.removeChild(newElement);
      this.dispatchEvent(new CustomEvent('updated'));
    });
    newElement.addEventListener('stateChange', evt => {
      this.dispatchEvent(new CustomEvent('updated'));
    });
  }

  getAll() {
    return [...this.tasksElement.children].map(el => ({
      text: el.getAttribute('data-value'),
      completed: el.completed,
    }));
  }

  load(tasks) {
    tasks.reverse().forEach(task => this.addTask(task.text, task.completed));
  }
}
customElements.define('todo-list', TodoList);

function getHTML() {
  return /*html*/`
<style>
  :host {
    display: inline-block;
    width: 500px;
    background-color: white;
    border-radius: 16px;
    padding: 16px;
  }
  input {
    width: 100%;
    font-size: inherit;
    padding: 8px;
    border: 1px solid #333;
    border-radius: 8px;
  }
</style>
<div id="container">
  <h1>Todo List</h1>
  
  <form>
    <input type="text" placeholder="Add a new task" />
  </form>
  <div id="tasks"></div>
</div>
`;
}
