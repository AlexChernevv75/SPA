exports.catTemplate = `
<li>
    <img src="{{image}}" alt="{{name}}">
    <h3></h3>
    <p><span>Breed: </span>{{breed}}</p>
    <p><span>Description: </span>{{description}}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="">Change Info</a></li>
        <li class="btn delete"><a href="">New Home</a></li>
    </ul>
</li>`