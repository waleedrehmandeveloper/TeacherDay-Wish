// ============================
// GET HTML ELEMENTS
// ============================

const surpriseBtn =
    document.getElementById("surpriseBtn");

const openingScreen =
    document.getElementById("openingScreen");

const teacherCard =
    document.getElementById("teacherCard");

const canvas =
    document.getElementById("fireworksCanvas");

const starsLayer =
    document.getElementById("stars");

const bokehLayer =
    document.getElementById("bokehLayer");


// ============================
// CREATE STARS
// ============================

function createStars() {

    for (let i = 0; i < 50; i++) {

        const star =
            document.createElement("span");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 2 + "s";

        starsLayer.appendChild(star);
    }
}


// ============================
// CREATE BOKEH
// ============================

function createBokeh() {

    for (let i = 0; i < 15; i++) {

        const bokeh =
            document.createElement("span");

        bokeh.className = "bokeh";

        const size =
            Math.random() * 70 + 25;

        bokeh.style.width =
            size + "px";

        bokeh.style.height =
            size + "px";

        bokeh.style.left =
            Math.random() * 100 + "%";

        bokeh.style.top =
            Math.random() * 100 + "%";

        bokeh.style.background =
            "rgba(255, 210, 100, 0.35)";

        bokeh.style.animationDuration =
            8 + Math.random() * 8 + "s";

        bokeh.style.animationDelay =
            Math.random() * 5 + "s";

        bokehLayer.appendChild(bokeh);
    }
}


// ============================
// FIREWORKS
// ============================

let fireworks = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


function createFirework() {

    const x =
        Math.random() * canvas.width;

    const y =
        Math.random() *
        (canvas.height * 0.45);


    const colors = [

        "#ffd76a",

        "#ff9fd4",

        "#9db5ff",

        "#ffffff"

    ];


    const color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];


    for (let i = 0; i < 25; i++) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const speed =
            Math.random() * 4 + 2;


        fireworks.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) * speed,

            vy:
                Math.sin(angle) * speed,

            life: 60,

            color: color

        });

    }

}


function animateFireworks() {

    const ctx =
        canvas.getContext("2d");


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if (Math.random() < 0.04) {

        createFirework();

    }


    fireworks.forEach(
        (firework, index) => {

            firework.x +=
                firework.vx;

            firework.y +=
                firework.vy;

            firework.vy +=
                0.03;

            firework.life--;


            ctx.fillStyle =
                firework.color;

            ctx.globalAlpha =
                firework.life / 60;


            ctx.beginPath();


            ctx.arc(

                firework.x,

                firework.y,

                2,

                0,

                Math.PI * 2

            );


            ctx.fill();


            if (firework.life <= 0) {

                fireworks.splice(
                    index,
                    1
                );

            }

        }
    );


    ctx.globalAlpha = 1;


    requestAnimationFrame(
        animateFireworks
    );

}


// ============================
// SURPRISE BUTTON
// ============================

surpriseBtn.addEventListener(
    "click",
    function () {

        // Hide opening screen

        openingScreen.classList.add(
            "hide"
        );


        // Wait 2 seconds

        setTimeout(
            function () {

                // Show teacher card

                teacherCard.classList.add(
                    "show"
                );

            },
            2000
        );

    }
);


// ============================
// PAGE LOAD
// ============================

window.addEventListener(
    "load",
    function () {

        resizeCanvas();

        createStars();

        createBokeh();

        animateFireworks();

    }
);


// ============================
// RESIZE
// ============================

window.addEventListener(
    "resize",
    resizeCanvas
)