import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://add-to-cart-ad56d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListRef = ref(database, "shoppingList");

const newItem = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function () {
  if (newItem.value !== "") {
    let newItem_ = newItem.value;
    push(shoppingListRef, newItem_);
    clearInput();
    addItem(newItem);
  } else {
    console.log("no input detected");
  }
});

const clearInput = () => {
  newItem.value = "";
};

const addItem = (item) => {
  let newElement = document.createElement("li");
  let itemID = item[0];
  let itemValue = item[1];
  newElement.textContent = itemValue;
  itemList.appendChild(newElement);

  newElement.addEventListener("click", () => {
    let exactLocationinDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationinDB);
    console.log(`${itemValue} removed`);
  });
};

onValue(shoppingListRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    const shoppingList = Object.entries(data);

    clearList();

    for (let i = 0; i < shoppingList.length; i++) {
      let currentItem = shoppingList[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItems(currentItem);
    }
  } else {
    itemList.innerHTML = "No items here. Add one!";
  }
});

const appendItems = (currentItem) => {
  addItem(currentItem);
};

const clearList = () => {
  itemList.innerHTML = "";
};
