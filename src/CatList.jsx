// Import the functions you need from the SDKs you need
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { myContext } from "./App";
import { Link } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function CatList() {
  // Your web app's Firebase configuration
  const { db } = useContext(myContext);

  const [data, setData] = useState([]);
  const blankCat = {
    name: "",
    age: 0,
    evil: "",
    colors: [""],
  };
  const [newCat, setNewCat] = useState(blankCat);
  useEffect(() => {
    querySnapshot();
  }, []);

  const querySnapshot = () =>
    getDocs(collection(db, "Cats")).then((data) => setData(data));

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Cats", id));
    querySnapshot();
  };

  const handleColorAdd = () => {
    setNewCat({ ...newCat, colors: [...newCat.colors, ""] });
  };

  const handleAdd = async (evt) => {
    evt.preventDefault();
    console.log(newCat);
    await addDoc(collection(db, "Cats"), newCat);
    querySnapshot();
    setNewCat(blankCat);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Cats</h1>
      </div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {data?.docs?.map((doc, index) => {
          const catData = doc.data();
          return (
            <>
              {" "}
              <div
                key={index}
                style={{
                  width: "10vw",
                  padding: "4px",
                  backgroundColor: "purple",
                  border: "yellow 3px dotted",
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  overflowWrap: "break-word",
                }}
              >
                <Link to={`/cat/${doc.id}`}>
                  <div>Id: {doc?.id}</div>{" "}
                </Link>

                <div>Name: {catData?.name}</div>
                <div>Age: {catData?.age}</div>
                <div>
                  Colors:
                  {catData?.colors?.map((c) => (
                    <div>{c}</div>
                  ))}
                  <div>Evil? {(!!catData?.evil).toString()}</div>
                </div>

                <button onClick={() => handleDelete(doc.id)}> Delete</button>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <div className="name form_wrapper">
          <label className="input_label" htmlFor="terminology_name">
            Name
          </label>
          <input
            autoFocus
            id="name"
            className="add_term_input"
            type="text"
            value={newCat?.name}
            onChange={(evt) => {
              setNewCat({
                ...newCat,
                name: evt.target.value,
              });
            }}
          />
        </div>

        <div className="description form_wrapper">
          <label className="input_label" htmlFor="table_description">
            Age
          </label>
          <input
            id="display"
            className="add_term_input description_input"
            type="number"
            value={newCat?.age}
            onChange={(evt) => {
              setNewCat({
                ...newCat,
                age: parseInt(evt.target.value),
              });
            }}
          />
        </div>

        <div className="url form_wrapper">
          <label className="input_label" htmlFor="table_url">
            Evil
          </label>
          <input
            required
            id="evil"
            className="add_term_input url_input"
            type="text"
            value={newCat?.evil}
            onChange={(evt) => {
              setNewCat({
                ...newCat,
                evil: evt.target.value,
              });
            }}
          />
        </div>
        {newCat.colors?.map((_, index) => (
          <div className="url form_wrapper">
            <label className="input_label" htmlFor="table_url">
              Colors
            </label>
            <input
              required
              id={index}
              className="add_term_input url_input"
              type="text"
              value={newCat.colors[index]}
              onChange={(evt) => {
                const updatedColors = newCat.colors;
                updatedColors[index] = evt.target.value;
                setNewCat({ ...newCat, colors: updatedColors });
              }}
            />
          </div>
        ))}

        <button className="manage_term_button" onClick={handleColorAdd}>
          Add Color
        </button>
        <button onClick={handleAdd}>Save </button>
      </div>

      <Link to={`/upload_file`}>CSV</Link>
    </>
  );
}

export default CatList;
