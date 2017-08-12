console.log('Loaded!');
var img= document.getElementById('picture');
img.onclick= function () {
    img.style.marginLeft='100px';
};

var marginTop= 0;
function moveBottom() {
    marginTop = marginTop + 1;
    img.style.marginTop = marginTop + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveBottom,50);
};
