function openTutor() {
    document.querySelector("main").style.display = "none";
    document.querySelector("header").style.display = "none";
    document.getElementById("tutorPage").style.display = "block";
}

function closeTutor() {
    document.getElementById("tutorPage").style.display = "none";
    document.querySelector("main").style.display = "block";
    document.querySelector("header").style.display = "block";
}

async function sendQuestion() {
    const input = document.getElementById("questionInput");
    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();

    if (!question) return;

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = question;
    chatBox.appendChild(userMessage);

    input.value = "";

    const thinking = document.createElement("div");
    thinking.className = "ai-message";
    thinking.textContent = "🤖 Thinking...";
    chatBox.appendChild(thinking);

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        thinking.remove();

        const aiMessage = document.createElement("div");
        aiMessage.className = "ai-message";
        aiMessage.textContent =
            data.answer || "Sorry, I couldn't answer.";

        chatBox.appendChild(aiMessage);

    } catch (error) {
        thinking.remove();

        const errorMessage = document.createElement("div");
        errorMessage.className = "ai-message";
        errorMessage.textContent =
            "❌ Something went wrong. Please try again.";

        chatBox.appendChild(errorMessage);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
