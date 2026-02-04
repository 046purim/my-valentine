// --- ส่วนการตั้งค่าสีชมพูมินิมอล ---
var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 400; // ลดจำนวนลงเล็กน้อยเพื่อให้ดูมินิมอล
var colorrange = [330, 340, 350]; // โทนสีชมพู (Pink Hue)
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.1;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(40, 80);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 90%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.98) {
            starArray[i].opacity = Math.random();
        }
    }
}

// --- ปุ่มกด ---
const button = document.getElementById("valentinesButton");

// --- ส่วนของข้อความใหม่ (Minimal & Deep) ---
function drawText() {
    var fontSize = Math.min(26, window.innerWidth / 25);
    var lineHeight = 10;

    context.font = fontSize + "px 'Arial', sans-serif"; // ใช้ฟอนต์ที่ดูสะอาดตาขึ้น
    context.textAlign = "center";
    
    // ปรับ Glow ให้เป็นสีชมพูอ่อน
    context.shadowColor = "rgba(255, 182, 193, 0.8)";
    context.shadowBlur = 10;

    // สีข้อความหลัก: ชมพูเข้มมินิมอล
    let pinkColor = (op) => `rgba(219, 112, 147, ${op})`;

    // Scene 1: ความโชคดี
    if(frameNumber < 250){
        context.fillStyle = pinkColor(opacity);
        context.fillText("In this vast universe,", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = pinkColor(opacity);
        context.fillText("In this vast universe,", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    // Scene 2: การได้พบคุณ
    if(frameNumber == 500) opacity = 0;
    if(frameNumber > 500 && frameNumber < 1000){
        context.fillStyle = pinkColor(opacity);
        context.fillText("I am so lucky to have found you.", canvas.width/2, canvas.height/2);
        opacity = (frameNumber < 750) ? opacity + 0.01 : opacity - 0.01;
    }

    // Scene 3: ทุกช่วงเวลามีค่า
    if(frameNumber == 1000) opacity = 0;
    if(frameNumber > 1000 && frameNumber < 1500){
        context.fillStyle = pinkColor(opacity);
        context.fillText("Every moment with you is a gift.", canvas.width/2, canvas.height/2);
        opacity = (frameNumber < 1250) ? opacity + 0.01 : opacity - 0.01;
    }

    // Scene 4: สัญญาใจ
    if(frameNumber == 1500) opacity = 0;
    if(frameNumber > 1500 && frameNumber < 2000){
        context.fillStyle = pinkColor(opacity);
        context.fillText("You make my world so much brighter.", canvas.width/2, canvas.height/2);
        opacity = (frameNumber < 1750) ? opacity + 0.01 : opacity - 0.01;
    }

    // Final Scene: บอกรัก (แก้ชื่อตรงนี้นะครับ!)
    if(frameNumber == 2000) opacity = 0;
    if(frameNumber > 2000){
        context.fillStyle = pinkColor(opacity);
        let name = "My Love"; // <-- เปลี่ยนเป็นชื่อแฟนคุณตรงนี้ครับ
        context.fillText(`I love you more than words can say, ${name}.`, canvas.width/2, canvas.height/2);
        opacity += 0.01;
        
        if(frameNumber >= 2250){
            context.fillStyle = pinkColor(secondOpacity);
            context.fillText("Happy Valentine's Day. <3", canvas.width/2, canvas.height/2 + 50);
            secondOpacity += 0.01;
            button.style.display = "block";
        }
    }

    context.shadowBlur = 0;
}

// ... ส่วนฟังชัน draw() และ resize คงเดิม ...
function draw() {
    context.putImageData(baseFrame, 0, 0);
    drawStars();
    updateStars();
    drawText();
    if (frameNumber < 9999) frameNumber++;
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
