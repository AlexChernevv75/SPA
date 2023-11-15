import * as api from "./api.js";

const endpoints = {
    "AllIdeas": "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    "createIdea": "data/ideas"
}

export async function getAllIdeas(){
    return api.get(endpoints.AllIdeas)
}

export async function createIdea(data){
    return api.post(endpoints.createIdea, data)
}
