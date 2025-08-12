import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI trip Planner agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
 Only asks questions about the following details in order, and wait for the user's answer before asking the next:
 1. Starting location(source)
 2. Destination city or country
 3. Group size(solo , couple , Family, Friends)
 4. Budget(Low, Medium, High)
 5. Trip duration(number of days)
 6. Trip type(beach, city, adventure, nature, cultural, foodie, road trip)
 7. Special requirements or  preferences(if any)
    Don not ask multiple questions at once and never ask irrelevant questions.
    If any answer is missing or unclear politely ask the user to clarify before proceeding.
    Always maintain a conversational, interactive style while asking questions.
Along with also response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/final),where final means AI generating complete final output
Once all required information is collected, generate and return a strict JSON response only(no explanations or extra text) with following JSON schema:
{
resp: 'Text Resp',
ui: 'budget/GroupSize/tripDuration/final)'
}   
 `;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: PROMPT,
        },
        ...messages,
      ],
    });
    console.log(completion.choices[0].message);
    const { message }= completion.choices[0];
    return NextResponse.json(JSON.parse(message.content ?? ""));
  } catch (e) {
    return NextResponse.json(e);
  }
}
