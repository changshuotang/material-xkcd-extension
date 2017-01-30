const defaultUrl = "http://xkcd.com/info.0.json";
const firstUrl = "http://xkcd.com/1/info.0.json";
var comicNum;
var comicMax = 0;
var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) { // request is done
        if (httpRequest.status === 200) { // successfully
            var arr = JSON.parse(this.responseText);
            renderUrl(arr);
        }
    }
};

renderComic(defaultUrl);

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('getFirst').addEventListener('click', renderFirst);
  document.getElementById('getPrevious').addEventListener('click', renderPrevious);
  document.getElementById('getRandom').addEventListener('click', renderRandom);
  document.getElementById('getNext').addEventListener('click', renderNext);
  document.getElementById('getLast').addEventListener('click', renderLast);
});

function renderComic(url){
	httpRequest.open('GET', url);
	httpRequest.send();
}

function renderUrl(arr){
	document.getElementById('comicTitle').innerHTML = arr.title;
	document.getElementById('comicImg').src = arr.img;
	comicNum = arr.num;
	if (comicNum > comicMax){
		comicMax = comicNum;
	}
}

function renderFirst(){
	renderComic(firstUrl);
}

function renderPrevious(){
	if (comicNum > 1){
		comicNum -= 1;
		renderComic("http://xkcd.com/" + comicNum + "/info.0.json");
	}
}

function renderNext(){
	if (comicNum < comicMax){
		comicNum += 1;
		renderComic("http://xkcd.com/" + comicNum + "/info.0.json");
	}
	else {
		renderLast(); //check for new comics 
	}
}

function renderRandom(){
	renderComic("http://xkcd.com/" + (Math.floor(Math.random() * comicMax) + 1) + "/info.0.json");
}

function renderLast(){
	renderComic(defaultUrl);
}








