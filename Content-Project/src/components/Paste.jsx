import React, { useState } from "react";
import { useSelector } from "react-redux";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allPastes = useSelector((state) => state.paste.pastes);

  const filterData = allPastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center items-center flex-col">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="text-white text-center flex flex-wrap justify-center items-center flex-col gap-2">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div key={paste?._id} className="border mt-2">
                <div>{paste?.title}</div>
                <div>{paste?.value}</div>
                <div>
                  <button className="border">Edit</button>
                  <button className="border">View</button>
                  <button className="border">Delete</button>
                  <button className="border">Share</button>
                  <button
                    className="border"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.title);
                    }}
                  >
                    Copy
                  </button>
                  <div>{paste.createdAt}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
