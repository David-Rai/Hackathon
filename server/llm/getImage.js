import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.GENIMAGE; // replace with your key

async function getImages(keyword) {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: keyword,
        per_page: 3
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    // Extract image URLs
    const images = res.data.results.map(img => img.urls.regular);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default getImages
// Example usage:
// getImages("Nepal culture").then(urls => console.log(urls[2]));
