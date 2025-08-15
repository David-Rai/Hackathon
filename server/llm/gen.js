import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBlh_TfvJmQ4v8liy7Ld9nY-KLLHN-e1d0" });

const data={
        location: { lat: 26.636742003809022, lng: 87.98524000382808 },
        previous: [
          {
            id: 5,
            title: 'we love this culture',
            description: 'manage hunu paro hai ta',
            lat: '26.6367067',
            lng: '87.9852422',
            user_id: 20,
            like_count: 0,
            comment_count: 5,
            image_url: 'https://res.cloudinary.com/dku1thg4r/image/upload/v1755181339/greenguard/xvrjes2xhdrlxcftmdu3.jpg',        
            username: 'david'
          },
          {
            id: 6,
            title: 'we love this culture',
            description: 'manage hunu paro hai ta',
            lat: '26.6367532',
            lng: '87.9851974',
            user_id: 20,
            like_count: 0,
            comment_count: 1,
            image_url: 'https://res.cloudinary.com/dku1thg4r/image/upload/v1755181546/greenguard/gfx7tv3eib3ctzijz5jn.jpg',        
            username: 'david'
          },
          {
            id: 7,
            title: 'we love this culture',
            description: 'manage hunu paro hai ta',
            lat: '26.6367532',
            lng: '87.9851974',
            user_id: 20,
            like_count: 0,
            comment_count: 1,
            image_url: 'https://res.cloudinary.com/dku1thg4r/image/upload/v1755181579/greenguard/gmqldhs3v97czxxzbfl3.jpg',        
            username: 'david'
          },
          {
            id: 8,
            title: 'we love this culture',
            description: 'manage hunu paro hai ta',
            lat: '26.6368583',
            lng: '87.9853198',
            user_id: 20,
            like_count: 0,
            comment_count: 0,
            image_url: 'https://res.cloudinary.com/dku1thg4r/image/upload/v1755189069/greenguard/zkttbuhxgle5rna7zqev.jpg',        
            username: 'david'
          }
        ]
      }

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
      You are given:
      - The user's current location: ${JSON.stringify(data.location)}
      - A list of their previous favorite cultures: ${JSON.stringify(data.previous)}
      
      Generate an array of exactly 3 culture recommendation objects in the following strict JSON format:
      {
        "recommendations": [
          {
            "title": "Name of the culture",
            "description": "A concise but rich description that combines origin, traditions, language, food, and festivals, tailored to the user's location and preferences",
            "image_url": "A valid, realistic, publicly accessible image URL ending with .jpg, .jpeg, or .png from any known source (e.g., unsplash.com, pexels.com, pixabay.com, imgur.com)"
          },
          {...},
          {...}
        ]
      }
      
      Rules:
      1. Output only valid JSON, no extra words or formatting.
      2. Use realistic URLs from popular free image sites (unsplash.com, pexels.com, pixabay.com, imgur.com, or example.com).
      3. Ensure all URLs end with .jpg, .jpeg, or .png.
      4. Cultures must be contextually relevant to the user's location and previous favorites.
      `
      });
      
      console.log(response.text);
  
}

main();