"use strict"
//loads images
function returnPromiseImgArr(pictures,ImgObj,loc){
  return pictures.map(function(imgurl){
    var prom = new Promise(function(resolve, reject){
      var img = new Image();
      img.onload = function(){
        ImgObj[imgurl.split('.')[0]]=img;
        resolve();
      };
      img.src = loc+imgurl;
    });
    return prom;
  });
}

//loads audio
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

//loads stylesheets
function fetchStyle(url){
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.onload = function() { resolve(); console.log('style has loaded'); };
    link.href = url;

    let headScript = document.querySelector('script');
    headScript.parentNode.insertBefore(link, headScript);
  });
};
