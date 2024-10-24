import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPastes = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((paste) => paste._id === id)[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Title Input */}
      <input
        type="text"
        value={paste.title}
        disabled
        className="w-full md:w-[60%] lg:w-[50%] p-3 mb-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Content Textarea */}
      <textarea
        className="w-full md:w-[60%] lg:w-[50%] h-40 p-3 text-black mb-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={paste.value}
        disabled
      />
    </div>
  );
};

export default ViewPastes;
