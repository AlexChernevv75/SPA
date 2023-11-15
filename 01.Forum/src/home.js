import { showDetails } from "./details.js";

const homeSection = document.getElementById("homeView");
const main = document.querySelector("main");
const form = document.querySelector('#homeView form');
form.addEventListener('submit', formSubmit);
homeSection.remove();
showHome();


export async function showHome(){
    const topicContainer = homeSection.querySelector(".topic-title");
    const posts = await loadPosts();
    let valueArr = [];
    const postsArr = Object.values(posts)
     .map(el =>{
        let info = {
            topicName: el.title,
            username: el.username,
            postText: el.postText,
            date: el.date,
            _id: el._id
        }
        valueArr.push(topicTemplate(info));
    });
    topicContainer.replaceChildren(...valueArr);
   
    main.replaceChildren(homeSection);
}

function formSubmit(ev){
    ev.preventDefault();
    if(ev.submitter.innerText === "Cancel"){
        return clearForm();
    }
    const formData = new FormData(form);
    const {topicName, username, postText} = Object.fromEntries(formData);
    clearForm();
    createPost(topicName, username, postText);
}

function clearForm(){
    return form.reset();
}

async function createPost(title, username, postText){
    const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
    const body = {
        title,
        username,
        postText,
        date: new Date()
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body)
    }) 
    const data = await response.json();
    return data;
}

async function loadPosts(){
    const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function topicTemplate(data){
    const container = document.createElement('div');
    container.classList.add("topic-container")
    container.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal" id="${data._id}">
                <h2 >${data.topicName}</h2>
            </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${data.date}</time></p>
                            <div class="nick-name">
                                <p>Username: <span>${data.username}</span></p>
                            </div>
                    </div>
                </div>
        </div>
    </div>`
    container.querySelector("a").addEventListener("click", showDetails)
    return container;
}