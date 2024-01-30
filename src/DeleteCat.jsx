import { deleteDoc, doc } from "firebase/firestore";

export const DeleteCat = ({ onClick }) => {
  return <button onClick={handleDelete}>Delete</button>;
};
