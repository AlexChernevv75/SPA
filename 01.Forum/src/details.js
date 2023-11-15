const detailsSection = document.getElementById("detailsView");
const main = document.querySelector("main");
const form = detailsSection.querySelector("form");
form.addEventListener("submit", formSubmit);
const wrapper = document.getElementById("content-wrapper")
let currentId;
detailsSection.remove();

export async function showDetails(ev) {
    if (ev.target.tagName === "H2") {
        currentId = ev.target.parentElement.id;
    }
    else {
        return;
    }
    const topic = await loadTopic(currentId);
    const comments = await loadComments(currentId);
    const result = topicTemplate(topic, comments);
    wrapper.replaceChildren(topicTemplate(topic, comments))

    main.replaceChildren(detailsSection);
}

function topicTemplate(topic, comments) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("theme-title");
    commentDiv.innerHTML = `
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${topic.title}</h2>
        </div>
    </div>`;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment");
    commentContainer.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>
        <p class="post-content">${topic.postText}</p>
    </div>`;

    Object.values(comments).forEach(el => {
        const comment = createComment(el);
        commentContainer.appendChild(comment)
    });


    return commentContainer;
};

function createComment(data) {
    const container = document.createElement("div");
    container.classList.add("user-comment");
    container.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
                <div class="post-content">
                    <p>${data.postText}</p>
                </div>
            </div>
        </div>`

    return container;
}

function clearForm() {
    form.reset();
}

function formSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const { postText, username } = Object.fromEntries(formData);
    createPost({ postText, username, currentId, date: new Date() });
}

async function createPost(body) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
    body.date = new Date();
    const response = await fetch(url,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    const data = await response.json();
    clearForm();
}

async function loadTopic(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function loadComments(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
    const response = await fetch(url);
    const data = await response.json();
    const filter = Object.values(data).filter(el => el.id === id)

    return filter;
}