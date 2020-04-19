var links = document.getElementsByClassName("nav-link");
var myData = [];
getData('general');
function getData(categories) {
    var http = new XMLHttpRequest();

    http.open("GET", "http://newsapi.org/v2/top-headlines?country=eg&category=" + categories + "&apiKey=94d071470fd5410e9bbf5fb091459da8");
    http.send();
    http.addEventListener("readystatechange", function () {
        if (http.readyState == 4 && http.status == 200) {
            myData = JSON.parse(http.response).articles;
            displatData();
        }
    })
}

function displatData() {
    var temp = ""
    for (i = 0; i < myData.length; i++) {
        temp += "<div class='col-lg-4 col-md-6 pb-3'><div class='json'>"
            + "<h2>" + myData[i].title + "</h2><img class= 'w-100' src= '" + myData[i].urlToImage + "'><p>"
            + myData[i].description + "</p><p>" + myData[i].publishedAt + "</p><a href=" + myData[i].url + " target = '_blank'>More ..</a></div></div>";
        document.getElementById("callHtpp").innerHTML = temp;
    }
}

for (i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        getData(e.target.text);
        e.target.text.style.color = 'red'

    })
}
