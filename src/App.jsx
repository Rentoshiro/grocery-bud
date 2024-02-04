import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";
import { ToastContainer, toast } from "react-toastify";

function setLocalStorage(items) {
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  let list = localStorage.getItem("list");
  if (list) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = [];
  }
  return list;
}

const App = () => {
  const [items, setItems] = useState(getLocalStorage());

  function addItem(itemName) {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("item added to the list");
  }

  function removeItem(itemId) {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("item deleted");
  }

  function editItem(itemId) {
    const newItems = items.map((item) =>
      // {    if (item.id === itemId) {
      //       const newItem = { ...item, completed: !item.completed };
      //       return newItem;
      //     }
      //     return item;}
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    setItems(newItems);
    setLocalStorage(newItems);
  }

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};

export default App;
