import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "⚠️ OPENAI_API_KEY is not set. AI interpretations will use fallback responses."
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key-to-prevent-build-crash",
});

export default openai;
