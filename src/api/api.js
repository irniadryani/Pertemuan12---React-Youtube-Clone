// src/utils/youtubeApi.js
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyAjsiLWX_QgWR7W_jf0PmBOHHGjT1UldKs"; // Ganti dengan kunci API YouTube Data API Anda

export const api = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        maxResults: 5,
        q: query,
        key: API_KEY,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
