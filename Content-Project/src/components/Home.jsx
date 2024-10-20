import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updatePastes } from "../redux/pasteSlice";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      value: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams("");
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      <input
        type="text"
        placeholder="Enter Your Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${
          pasteId ? "w-[60%]" : "w-[50%]"
        } text-black border border-input rounded-md p-2`}
      />

      <button type="button" onClick={createPaste} className="text-white">
        {pasteId ? "Update Paste" : "Create Paste"}
      </button>

      <textarea
        className="w-[50%] mt-2 text-black border border-input rounded-md p-2"
        placeholder="Enter Your Content"
        cols={20}
        rows={10}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Home;
