import Cerebras from '@cerebras/cerebras_cloud_sdk';

const cerebras = new Cerebras({
    apiKey: process.env.CERE
});

async function moreSummarizer(data) {
    const stream = await cerebras.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that summarizes cultures into JSON."
            },
            {
                role: "user",
                content: `Generate a JSON for this culture object. 
  Return only JSON with keys  "answer". 
  "answer" should contain paragraph the question asked in input
  The input is: ${JSON.stringify(data)}`
            }
        ],
        model: 'gpt-oss-120b',
        stream: true,
        max_completion_tokens: 2048,
        temperature: 0.2,
        top_p: 1
    });

    let jsonResult = '';

    for await (const chunk of stream) {
        jsonResult += chunk.choices[0]?.delta?.content || '';
        // process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }

    // Optionally parse to object
    try {
        return JSON.parse(jsonResult);
    } catch (err) {
        console.error("Failed to parse JSON:", err);
        return null;
    }
}

export default moreSummarizer
