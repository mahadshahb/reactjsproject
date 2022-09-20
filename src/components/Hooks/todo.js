import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
  const list = localStorage.getItem("secondtodolist");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [setValue, setInputValue] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editData, setEditData] = useState("");
  const [toggle, setToggleBtn] = useState(false);

  const addItems = () => {
    if (!setValue) {
      alert("fill the input field");
    } else if (setValue && toggle) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editData) {
            return { ...curElem, name: setValue };
          }
          return curElem;
        })
      );
      setInputValue("");
      setToggleBtn(false);
      setEditData(null);
    } else {
      const myNewData = {
        id: new Date().getTime().toString(),
        name: setValue,
      };
      setItems([...items, myNewData]);
      setInputValue("");
    }
  };
  const editItems = (index) => {
    const editedData = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputValue(editedData.name);
    setEditData(index);
    setToggleBtn(true);
  };
  const deleteItems = (index) => {
    const updatedList = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedList);
  };
  useEffect(() => {
    localStorage.setItem("secondtodolist", JSON.stringify(items));
  }, [items]);
  const removeAll = () => {
    setItems([]);
  };
  return (
    <>
      <div className="container">
        <div className="main-row">
          <div className="new-main-div">
            <h4 className="custom-h4">todo list app</h4>
            <div className="new-center-div">
              <input
                type="text"
                className="form-control"
                placeholder="enter items here....."
                autoFocus
                value={setValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {toggle ? (
                <i className="fa fa-edit custom-fa" onClick={addItems}></i>
              ) : (
                <i className="fa fa-plus custom-fa" onClick={addItems}></i>
              )}
            </div>
            <div className="centered-div">
              {items.map((curElem) => {
                return (
                  <>
                    <div className="center-text" key={curElem.id}>
                      <p style={{ color: "blueviolet" }}>{curElem.name}</p>
                      <div className="icons">
                        <i
                          className="fa fa-edit"
                          style={{ paddingRight: "10px", color: "dodgerblue" }}
                          onClick={() => editItems(curElem.id)}
                        ></i>
                        <i
                          className="fa fa-trash"
                          style={{ color: "red" }}
                          onClick={() => deleteItems(curElem.id)}
                        ></i>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <button className="btn-1">
              remove all <i className="fa fa-trash" onClick={removeAll}></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
