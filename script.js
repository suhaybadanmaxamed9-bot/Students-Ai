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

function sendQuestion() {
    const input = document.getElementById("questionInput");
    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    chatBox.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    chatBox.innerHTML += `
        <div class="ai-message">
            🤖 I received your question!
            <br>
            Real AI connection will be added next.
        </div>
    `;

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}