import React, { useState } from "react";
import axios from "axios";

// URL API dan kunci API 
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyAjsiLWX_QgWR7W_jf0PmBOHHGjT1UldKs"; 

export default function SearchVid() {
  // State untuk menyimpan nilai input pencarian
  const [search, setSearch] = useState("");
  // State untuk menyimpan hasil pencarian video
  const [searchResults, setSearchResults] = useState([]);
  // State untuk menyimpan video yang dipilih
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fungsi untuk menangani perubahan input pencarian
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // Fungsi untuk menangani pengiriman form pencarian
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Permintaan API YouTube untuk mencari video berdasarkan input pengguna
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: "snippet",
          maxResults: 5,
          q: search,
          key: API_KEY,
        },
      });

      // Menyimpan hasil pencarian ke state
      setSearchResults(response.data.items);
      // Mengatur video yang dipilih sebagai video pertama dalam hasil pencarian
      setSelectedVideo(response.data.items[0]); 
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Fungsi untuk menangani klik pada thumbnail video
  const handleThumbnailClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      {/* Form pencarian */}
      <div className="flex justify-center w-full p-5">
        <form onSubmit={handleSubmit} className="flex justify-center w-full max-w-2xl">
          <label className="input input-bordered flex items-center gap-2 mx-10 my-5 rounded-full shadow-xl w-full">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={search}
              onChange={handleChange}
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>

      {/* Tampilan hasil pencarian */}
      <div className="flex">
        <div className="w-2/3 p-5">
          {selectedVideo ? (
            <div className="bg-base-100 mb-4">
              {/* Iframe untuk memutar video yang dipilih */}
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="bg-base-100 p-4">
                {/* Judul dan deskripsi video yang dipilih */}
                <h2 className="text-2xl font-bold mb-2">
                  {selectedVideo.snippet.title}
                </h2>
                <p className="text-sm">{selectedVideo.snippet.description}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-xl font-bold">
              Please search the video you're looking for
            </div>
          )}
        </div>

        <div className="w-1/3">
          {searchResults.map((item) => (
            <div
              className="card lg:card-side bg-base-100 my-5 cursor-pointer"
              key={item.id.videoId}
              onClick={() => handleThumbnailClick(item)}
            >
              <figure>
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                  className="w-56 rounded-xl"
                />
              </figure>
              <div className="mx-5 max-w-44">
                {/* Judul dan deskripsi singkat hasil pencarian */}
                <h2 className="text-left font-bold text-xs">
                  {item.snippet.title}
                </h2>
                <p className="text-left text-xs">{item.snippet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
