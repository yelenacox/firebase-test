import { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export const CatDetail = () => {
  const [cat, setCat] = useState({});
  const [edit, setEdit] = useState(false);
  const { db } = useContext(myContext);
  const { catId } = useParams();

  useEffect(() => {
    docSnap();
  }, []);
  console.log();

  const updateCat = async () => {
    const updateQuery = doc(db, "Cats", catId);
    updateDoc(updateQuery, cat);
    setEdit(false);
  };

  const docSnap = async () =>
    await getDoc(doc(db, "Cats", catId)).then((data) => setCat(data.data()));
  return (
    <>
      {!edit ? (
        <div>Name: {cat.name}</div>
      ) : (
        <input
          id="name"
          type="text"
          value={cat?.name}
          onChange={(evt) => {
            setCat({ ...cat, name: evt.target.value });
          }}
        />
      )}
      <div>Age: {cat.age}</div>
      <div>
        Colors:
        {cat?.colors?.map((c) => (
          <div>{c}</div>
        ))}
      </div>
      <div>Evil? {(!!cat?.evil).toString()}</div>
      <button onClick={() => setEdit(true)}>Edit</button>
      <button onClick={updateCat}>Save</button>
    </>
  );
};
