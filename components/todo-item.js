class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
    this.shadowDOM.innerHTML = getHTML();

    this.select = selector => this.shadowRoot.querySelector(selector);

    this.select('#check').addEventListener('click', evt => {
      this.completed = !this.completed;
      this.dispatchEvent(new CustomEvent('stateChange'));
    });
    this.select('#cross').addEventListener('click', evt => {
      this.dispatchEvent(new CustomEvent('removed'));
    });
  }

  static get observedAttributes() {
    return ['data-value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'data-value') {
      this.select("#content").textContent = newValue;
    }
  }

  get completed() {
    return this.select('#container').classList.contains('done');
  }

  set completed(isCompleted) {
    if (isCompleted) {
      this.select('#container').classList.add('done');
    } else {
      this.select('#container').classList.remove('done');
    }
  }
}
customElements.define('todo-item', TodoItem);

function getHTML() {
  return /*html*/`
<style>
  :host {
    display: block;
  }
  #container {
    display: flex;
    align-items: center;
    padding: 12px 8px;
    border-bottom: 1px solid #666;
  }
  .done {
    background-color: #CFC;
  }
  .done #content {
    text-decoration: line-through;
  }
  #content {
    text-align: left;
    flex-grow: 1;
  }
  .btn {
    margin-left: 6px;
    cursor: pointer;
    user-select: none;
  }
</style>
<div id="container">
  <div id="content"></div>
  <div id="check" class="btn"><img src="res/check.svg"></div>
  <div id="cross" class="btn"><img src="res/cross.svg"></div>
<div>
`;
}