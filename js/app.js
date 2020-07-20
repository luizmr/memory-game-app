let urlSearchParams = new URLSearchParams(
    document.location.search.substring(1)
);
// set number of cubes
const numOfCubes = 9;
// set velocity of cubes sequence
const velocity = 500;
const lvl = createGameSequence(numOfCubes);
const cubesContainer = document.querySelector(".game-container");
const restart = document.querySelector(".restart-btn");

// generate a random array of numbers
function createGameSequence(num) {
    let lvl = [];
    while (lvl.length != num) {
        // random number form 0 to num
        const randomNumber = Math.floor(Math.random() * num);
        lvl.indexOf(randomNumber) != -1 ? null : lvl.push(randomNumber);
    }
    // console.log(lvl);
    return lvl;
}

// add class to #cube spans
function showSequence(lvl, velocity) {
    let counter = 0;
    const gameInt = setInterval(() => {
        // activate next cube

        document.querySelector(`#cube${counter}`).classList.add("active");
        if (counter == lvl.length - 1) {
            return clearInterval(gameInt);
        }

        counter++;
    }, velocity);
}

// show messages and reload the page with restart button
function showMsg(type) {
    cubesContainer.innerHTML = "";
    const msg = document.createElement("h1");
    const restarBtn = document.createElement("button");
    restarBtn.innerText = "restart";
    restarBtn.className = "restart-btn";

    if (type == "error") {
        msg.innerHTML = "GAME OVER";
    } else {
        msg.innerHTML = "YOU WON!";
    }
    cubesContainer.appendChild(msg);
    cubesContainer.appendChild(restarBtn);
    restarBtn.addEventListener("click", () => {
        location.reload();
    });
}

// create lvl
lvl.forEach((num) => {
    const cube = document.createElement("span");
    cube.className = "game-cube";
    cube.id = `cube${num}`;
    cubesContainer.appendChild(cube);
});

// start game
setTimeout(() => showSequence(lvl, velocity), 5000);

// catch the click over cubes, checks the sequence
// if correct, removes the class
// shows the message
window.addEventListener("click", (e) => {
    // if cube is clicked
    console.log(/cube[0-9]/g.test(e.target.id));
    if (e.target && /cube[0-8]/g.test(e.target.id)) {
        const cubeClicked = e.target;
        const selectedCubes = document.querySelectorAll(
            "span[class*='correct']"
        );
        const correctCube =
            selectedCubes.length == 0
                ? 0
                : Math.max(
                      ...Array.prototype.slice
                          .call(selectedCubes)
                          .map((el) => parseInt(el.id.split("cube")[1]))
                  ) + 1;

        if (cubeClicked.id.split("cube")[1] == correctCube) {
            cubeClicked.classList.add("correct");
            if (selectedCubes.length == numOfCubes - 1) showMsg("correct");
        } else {
            cubeClicked.className += "error";
            showMsg("error");
        }
    }
});
