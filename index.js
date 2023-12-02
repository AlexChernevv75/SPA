const http = require("http");
const port = 5555;
const { homeView } = require("./views/home/index.js");
const { styles } = require("./content/styles/site.js");
const { addBreedView } = require("./views/addBreed.js"); 
const { addCatView } = require("./views/addCat.js");
const { catTemplate } = require("./views/home/allCats.js");

const cats = [
    {
        image: "https://png.pngtree.com/png-clipart/20230512/original/pngtree-isolated-cat-on-white-background-png-image_9158356.png",
        name: "nz",
        breed: "ulichna",
        description: "cute"
    },
    {
        image: "https://t4.ftcdn.net/jpg/00/84/66/63/360_F_84666330_LoeYCZ5LCobNwWePKbykqEfdQOZ6fipq.jpg",
        name: "Alex",
        breed: "ulichna",
        description: "cute1"
    }
];

//regex
const imgPattern = /{{image}}/g;
const namePattern = /{{name}}/g;
const breedPattern = /{{breed}}/g;
const descriptionPattern = /{{description}}/g;

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/"){
        const catHTML = cats.map( cat => 
            catTemplate.replace(imgPattern, cat.image).
            replace(namePattern, cat.name).
            replace(breedPattern, cat.breed).
            replace(descriptionPattern, cat.description));
        const newHomeView = homeView.replace("{{cats}}", catHTML);
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.write(newHomeView)
    } else if (url === "/content/styles/site.css"){
        res.writeHead(200, {
            "Content-Type": "text/css"
        })
        res.write(styles);
    } else if (url === "/cats/add-breed"){
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(addBreedView)
    } else if (url === "/cats/add-cat"){
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.write(addCatView)
    }

    res.end();
});

server.listen(port, () => console.log(`The port is ${port}`));