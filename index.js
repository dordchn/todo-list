const STORAGE_KEY = 'todo-list';

const todoList = document.querySelector('todo-list');

window.onload = () => {
  const dataStr = localStorage.getItem(STORAGE_KEY);
  if (dataStr) {
    const data = JSON.parse(dataStr);
    todoList.load(data);
  }

  todoList.addEventListener('updated', () => {
    const data = todoList.getAll();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
  
};
