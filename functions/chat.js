export async function onRequestPost(context) {
    const { request, env } = context;

    const { question } = await request.json();

    if (!question) {
        return new Response(
            JSON.stringify({ error: "Question is required" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-6-luna",
            instructions: "You are Student AI Tutor. Explain clearly, simply, and step by step. Help students learn instead of only giving answers.",
            input: question
        })
    });

    const data = await response.json();

    if (!response.ok) {
        return new Response(
            JSON.stringify({ error: "AI request failed" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    const answer =
        data.output?.flatMap(item => item.content || [])
        ?.find(part => part.type === "output_text")
        ?.text ||
        "I could not generate an answer.";

    return new Response(
        JSON.stringify({ answer }),
        {
            headers: { "Content-Type": "application/json" }
        }
    );
      }
