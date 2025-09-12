import Cerebras from '@cerebras/cerebras_cloud_sdk';
import getImage from './getImage.js'

const cerebras = new Cerebras({
    apiKey: process.env.CERE
});
async function suggestion(data) {
    const stream = await cerebras.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that suggests cultural information in JSON format only. Always follow the requested JSON structure and never add extra text."
            },
            {
                role: "user",
                content: `You are given:
      - The user's current location: ${JSON.stringify(data.location)}
      - A list of their previous favorite cultures: ${JSON.stringify(data.previous)}
      
      Generate an array of exactly 3 culture recommendation objects in the following strict JSON format:
      {
        "recommendations": [
          {
            "title": "Name of the culture",
            "description": "two line descriptopn of title culture",
            "image_url": "A valid, realistic, publicly accessible image URL ending with .jpg, .jpeg, or .png from any known source (e.g., unsplash.com, pexels.com, pixabay.com, or similar)",
            "lat": "Latitude of the culture's main region",
            "lng": "Longitude of the culture's main region"
          },
          {...},
          {...}
        ]
      }
      
      Rules:
      1. Output only valid JSON, no extra words or formatting.
      2. All image URLs must appear real and end with .jpg, .jpeg, or .png.
      3. You can use popular free image hosting sites (unsplash.com, pexels.com, pixabay.com, imgur.com, or example.com) but ensure URLs look realistic.
      4. The cultures must be contextually relevant to the user's location and previous favorites.
      5. Latitude and longitude must be valid decimal coordinates representing the main region of the culture.`
            }
        ],
        model: "llama3.1-8b",
        stream: true,
        max_completion_tokens: 2048,
        temperature: 0.2,
        top_p: 1
    });

    let jsonResult = '';

    for await (const chunk of stream) {
        jsonResult += chunk.choices[0]?.delta?.content || '';
    }

    try {
        const suggestions = JSON.parse(jsonResult);

        // Use for..of with await to update image_url
        for (const r of suggestions.recommendations) {
            const images = await getImage(r.title);
            r.image_url = images[2]; // use first image, adjust as needed
            // console.log(images)
        }
        return suggestions;

    } catch (err) {
        console.error("Failed to parse JSON:", err);
        return null;
    }
}

export default suggestion;
