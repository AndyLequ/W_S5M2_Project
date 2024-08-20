// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector(".targeted").classList.remove("targeted")
          square.classList.add('targeted')
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
  const targetedElement = document.querySelector('.targeted');
  const parentRow = targetedElement.parentElement;
  const children = Array.from(parentRow.children); // Convert HTMLCollection to Array

  let targetIndex = children.indexOf(targetedElement);

  // Handle movement based on the key pressed
  if (evt.key === keys.up || evt.key === keys.down || evt.key === keys.left || evt.key === keys.right) {
    // Remove the targeted class from the current element only when using arrow keys
    targetedElement.classList.remove('targeted');

    if (evt.key === keys.up && parentRow.previousElementSibling) {
      parentRow.previousElementSibling.children[targetIndex].classList.add('targeted');
    } else if (evt.key === keys.down && parentRow.nextElementSibling) {
      parentRow.nextElementSibling.children[targetIndex].classList.add('targeted');
    } else if (evt.key === keys.left) {
      if (targetedElement.previousElementSibling) {
        targetedElement.previousElementSibling.classList.add('targeted');
      } else {
        parentRow.lastElementChild.classList.add('targeted');
      }
    } else if (evt.key === keys.right) {
      if (targetedElement.nextElementSibling) {
        targetedElement.nextElementSibling.classList.add('targeted');
      } else {
        parentRow.firstElementChild.classList.add('targeted');
      }
    }
  }

  // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
  if (evt.key === keys.space && targetedElement.hasChildNodes()) {
    targetedElement.firstChild.setAttribute('data-status','dead')
    targetedElement.style.backgroundColor = "red";
  }

  // 👉 TASK 5 - End the game 👈
  const livingMosq = document.querySelectorAll('[data-status="alive"]');
  if(livingMosq.length === 0){
    console.log("game over")

    document.querySelector(".info").textContent = `Extermination completed in ${getTimeElapsed()/1000} seconds!`
    let restart = document.createElement('button')
    restart.textContent = 'Restart'

    document.querySelector('header h2').appendChild(restart)
    restart.addEventListener('click', () => {
      window.location.reload();
    })
  }
});
  
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
