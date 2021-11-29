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
      const newElement = document.createElement('todo-item');
      newElement.setAttribute('data-value', inputValue);
      this.tasksElement.insertBefore(newElement, this.tasksElement.firstChild);
      newElement.addEventListener('removed', evt => {
        this.tasksElement.removeChild(newElement);
      });
    });
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
  <h1>To do list</h1>
  
  <form>
    <input type="text" placeholder="Add a new task" />
  </form>
  <div id="tasks"></div>
</div>
`;
}
