import { fal } from "@fal-ai/client";

fal.config({
    credentials: "6cf97ec4-59d9-48cb-9d7d-bef59dee87ef:eecb731829b26d039cf50ba2752bfcda"
  });

    
const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
        prompt:"Miso‑Glazed Grilled Salmon with Steamed Bok Choy"
    //   prompt: "Extreme close-up of a single tiger eye, direct frontal view. Detailed iris and pupil. Sharp focus on eye texture and color. Natural lighting to capture authentic eye shine and depth. The word \"FLUX\" is painted over it in big, white brush strokes with visible texture."
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });
  
  console.log(result.data);
  console.log(result.requestId);