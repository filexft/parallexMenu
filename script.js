const menu = document.getElementById('menu');

Array.from(document.getElementsByClassName('menu-item')).forEach((item, index) => {
    item.onmouseover = () => {
        menu.dataset.activeIndex = index
    }
})


const track = document.getElementById("image-track");

 window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
 }

 window.onmousemove = e => {

    if (track.dataset.mouseDownAt === "0") return;

    //length of the movement by mouse
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;

    const maxDelta = window.innerWidth / 2;


    let percentage = (mouseDelta/maxDelta)  * -100 ;


    let nextpercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    nextpercentage = limit(nextpercentage, -100 , 0);
    nextpercentage.toPrecision(2)
    track.dataset.percentage = nextpercentage;

    //don't use " ; " at the end of transform
    track.animate({
        transform : `translate(${nextpercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});
    
    for (const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: `${100 + nextpercentage}% center`
        }, {duration: 1200, fill: "forwards"})

    }
    console.log(nextpercentage)
 }

 function limit(val, min, max){
    return val < min? min: val > max ? max : val; 
 }



window.onmouseup = e => {
    track.dataset.mouseDownAt = "0"
    track.dataset.prevPercentage = track.dataset.percentage;
}