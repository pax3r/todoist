import './App.css';

import List from "./components/List/List";

function App() {
  return (
    <div>
      <List data={localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []}/>
    </div>
  );
}

export default App;