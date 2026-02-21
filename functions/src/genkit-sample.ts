// britium-core-app/src/genkit-sample.ts
import {genkit, z} from "genkit";
import {googleAI} from "@genkit-ai/google-genai";
import {hasClaim, onCallGenkit} from "firebase-functions/https";

const ai = genkit({
  plugins: [googleAI()],
});

const helloFlow = ai.defineFlow(
  {
    name: "helloFlow",
    inputSchema: z.object({
      name: z.string(),
    }),
    outputSchema: z.object({
      greeting: z.string(),
    }),
  },
  async ({name}) => {
    return {greeting: `Hello, ${name}!`};
  }
);

export const hello = onCallGenkit(
  {
    authPolicy: hasClaim("email_verified"),
  },
  helloFlow
);
