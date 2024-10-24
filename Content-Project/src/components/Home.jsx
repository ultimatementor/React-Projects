import React, { useState, useEffect } from "react";
// React se necessary hooks import kar rahe hain.

import { useDispatch, useSelector } from "react-redux";
// Redux se dispatch aur selector hooks import kar rahe hain state management ke liye.

import { useSearchParams } from "react-router-dom";
// React Router DOM se query parameters handle karne ke liye hook import kiya gaya hai.

import { addToPastes, updatePastes } from "../redux/pasteSlice";
// Redux slice se actions import kar rahe hain jo paste ko add aur update karte hain.

const Home = () => {
  // State variables create kar rahe hain for title aur value.
  const [value, setValue] = useState(""); // Paste ka content store karne ke liye.
  const [title, setTitle] = useState(""); // Paste ka title store karne ke liye.

  // URL se query parameters ko fetch kar rahe hain.
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  // Agar URL me pasteId maujood hai to usko retrieve kar rahe hain.

  const pastes = useSelector((state) => state.paste.pastes);
  // Redux store se pastes ka data le rahe hain.

  const dispatch = useDispatch();
  // Redux me action dispatch karne ke liye useDispatch hook ko use kar rahe hain.

  useEffect(() => {
    // Jab bhi pasteId change ho, ye effect run karega.
    if (pasteId) {
      // Agar pasteId hai to Redux store se specific paste ko search kar rahe hain.
      const paste = pastes.find((paste) => paste._id === pasteId);
      // Agar paste mila to title aur value set karte hain.
      setTitle(paste?.title || "");
      setValue(paste?.value || "");
    }
  }, [pasteId, pastes]);
  // Dependency array me pasteId aur pastes hai, iska matlab ye hook unke change hone par run hoga.

  // Function jo new paste banata hai ya existing paste ko update karta hai.
  const createPaste = () => {
    // Check agar title ya value empty hai to alert dikhaye aur return kar jaye.
    if (!title.trim() || !value.trim()) {
      alert("Title aur Content ko bharna zaroori hai!");
      return;
    }

    // Naya ya update hone wala paste object banaya jaa raha hai.
    const paste = {
      title: title, // Paste ka title
      value: value, // Paste ka content
      _id:
        pasteId ||
        // Agar pasteId already hai to usi ko use karo, warna naya random ID generate karo.
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toLocaleDateString("en-GB", {
        // Current date ko readable format me set kar rahe hain.
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    // Agar pasteId maujood hai to paste ko update karo, warna naya paste add karo.
    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Form fields ko reset karte hain.
    setTitle("");
    setValue("");
    setSearchParams("");
    // URL se query parameters ko clear kar dete hain.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Title input field jo user se title le raha hai */}
      <input
        type="text"
        placeholder="Enter Your Title"
        value={title}
        // Jab user title type kare to state update hoti hai.
        onChange={(e) => setTitle(e.target.value)}
        className="w-full md:w-[60%] lg:w-[50%] p-3 mb-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Textarea jisme paste ka content input hota hai */}
      <textarea
        className="w-full md:w-[60%] lg:w-[50%] h-40 p-3 text-black mb-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Enter Your Content"
        value={value}
        // Jab user content type kare to state update hoti hai.
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Create/Update button */}
      <button
        type="button"
        onClick={createPaste}
        // Button ka color aur style change hoga jab title aur value empty nahi honge.
        className={`px-6 py-3 mb-4 text-white rounded-lg shadow-md transition-all ${
          title.trim() && value.trim()
            ? "bg-blue-500 hover:bg-blue-600" // Active button style.
            : "bg-gray-300 cursor-not-allowed" // Disabled button style.
        }`}
        // Button tabhi clickable hoga jab title aur value empty nahi honge.
        disabled={!title.trim() || !value.trim()}
      >
        {/* Button ka text dynamically change hoga */}
        {pasteId ? "Update Paste" : "Create Paste"}
        {/* Agar paste update ho raha hai to 'Update Paste', warna 'Create Paste' likha hoga */}
      </button>
    </div>
  );
};

export default Home;
