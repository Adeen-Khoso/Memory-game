
document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".boxes");
    const result = document.getElementById("result")
    let openBoxes = [];
    let matchedPairs = 0;
    let failedattempts = 0;
    let score = 0;
    const scoreElement = document.getElementById('score');
  
    const images = [
      "dragon.png",
      "dragon.png",
      "elephant.png",
      "elephant.png",
      "cat.png",
      "cat.png",
    ];
  
    const imagePairs = images.concat(images);
  
    shuffleArray(imagePairs);
  
    boxes.forEach((box, index) => {
      box.addEventListener("click", function () {

        if (!box.classList.contains("open") && !box.classList.contains("match")) {
          // Open the box and assign the background image
          box.classList.add("open");
          box.style.backgroundImage = `url(${imagePairs[index]})`;
  
          // Add the box to the openBoxes array
          openBoxes.push(box);
  
          // Check if two boxes are open
          if (openBoxes.length === 2) {
            // Disable further clicks on the boxes
            boxes.forEach((box) => {
              box.style.pointerEvents = "none";
            });
  
            // Check if the images match
            if (openBoxes[0].style.backgroundImage === openBoxes[1].style.backgroundImage) {
                  // The images match
                    openBoxes[0].classList.add("match");
                    openBoxes[1].classList.add("match");
                    openBoxes[0].classList.remove("open");
                    openBoxes[1].classList.remove("open");
                  
                    openBoxes = [];
                    result.innerHTML = "You Won !";
                    score += 100;
                    scoreElement.textContent = "Score:"+ score;
                    setTimeout(function(){
                      result.innerHTML = "";
                      
                    shuffleArray(imagePairs);
                    boxes.forEach((box, index) => {
                      box.classList.remove("open", "match");
                      box.style.backgroundImage = "";
                      box.style.pointerEvents = "auto";
                    });
                    
                    openBoxes = [];
                    matchedPairs = 0;
                    failedattempts = 0;
                  },1500);
            
            } else {
              // The images don't match
              setTimeout(function () {
                openBoxes[0].style.backgroundImage = "";
                openBoxes[1].style.backgroundImage = "";
                openBoxes[0].classList.remove("open");
                openBoxes[1].classList.remove("open");
  
                // Enable clicks on the boxes again
                boxes.forEach((box) => {
                  box.style.pointerEvents = "auto";
                });
                failedattempts++;
                if(failedattempts === 3){
                  result.innerHTML = "Failed, try again !";
                  boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                  })
                  setTimeout(() => {
                    result.innerHTML = "";
                    shuffleArray(imagePairs);
                    boxes.forEach((box, index) => {
                      box.classList.remove("open", "match");
                      box.style.backgroundImage = "";
                      box.style.pointerEvents = "auto";
                    });
                  }, 1500);
                  score = 0;
                  scoreElement.textContent = "Score:"+ score;
                  failedattempts = 0;
                  
                }

                // Clear the openBoxes array
                openBoxes = [];
              }, 1000);
            }
          }
        }
      });
    });
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  } );