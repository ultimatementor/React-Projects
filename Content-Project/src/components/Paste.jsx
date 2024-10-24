import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State to store the generated share URL for a paste
  const [shareUrl, setShareUrl] = useState("");

  // Access the Redux store to get all pastes
  const allPastes = useSelector((state) => state.paste.pastes);

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Function to handle sharing logic for a paste
  const handleShare = (paste) => {
    const baseUrl = window.location.origin; // Get the base URL (e.g., http://localhost:3000)

    // Generate the shareable link using the base URL and paste ID
    const generatedUrl = `${baseUrl}/pastes/${paste._id}`;

    // Set the generated share URL in the state
    setShareUrl(generatedUrl);

    // Copy the shareable URL to the clipboard and show a toast notification
    navigator.clipboard.writeText(generatedUrl);
    toast.success("Share URL copied to clipboard!");
  };

  // Filter pastes based on the search term entered in the search bar
  const filteredPastes = allPastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle deleting a paste
  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId)); // Dispatch the action to remove the paste from Redux store
    toast.success("Paste deleted successfully!"); // Show a success message using toast
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen">
      {/* Search Bar */}
      <input
        type="search"
        value={searchTerm} // Bind the input to the searchTerm state
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        placeholder="Search pastes..."
        className="w-full max-w-lg p-3 mb-8 bg-white border border-gray-300 rounded-full shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
      />

      {/* List of Pastes */}
      <div className="w-full max-w-lg space-y-8">
        {/* Iterate over the filtered pastes and display them */}
        {filteredPastes.map((paste) => (
          <div
            key={paste._id} // Unique key for each paste
            className="p-6 bg-white rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow"
          >
            {/* Paste Title */}
            <h3 className="font-bold text-2xl text-gray-800">{paste.title}</h3>

            {/* Paste Content */}
            <p className="text-gray-600 mt-2">{paste.value}</p>

            <div className="flex items-center justify-between mt-6">
              <div className="gap-2">
                {/* Share Button */}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                  onClick={() => handleShare(paste)} // Call the share function with the current paste
                >
                  Share
                </button>

                {/* Copy Title Button */}
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.title); // Copy paste title to clipboard
                    toast.success("Title copied to clipboard!"); // Show success notification
                  }}
                >
                  Copy
                </button>

                {/* Edit Button */}
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all">
                  <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>{" "}
                  {/* Navigate to edit page with pasteId */}
                </button>

                {/* View Button */}
                <button className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all">
                  <Link to={`/view-pastes/${paste?._id}`}>View</Link>{" "}
                  {/* Navigate to view page */}
                </button>

                {/* Delete Button */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  onClick={() => handleDelete(paste?._id)} // Call delete function with pasteId
                >
                  Delete
                </button>
              </div>

              {/* Paste Creation Date */}
              <div className="text-sm text-gray-400">{paste?.createdAt}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Share URL display, only shown when a URL is available */}
      {shareUrl && (
        <div className="mt-4 p-3 bg-white border border-gray-300 rounded-lg shadow-md">
          <p className="text-gray-700">Share this URL: {shareUrl}</p>
        </div>
      )}
    </div>
  );
};

export default Paste;
