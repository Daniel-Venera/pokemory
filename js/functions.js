let log = console.log
let squares = document.getElementsByTagName('td')
let hiddenSquares = Array.from(document.getElementsByClassName('hidden'))
let revealedSquares = document.getElementsByClassName('revealed')
let finishedSquares = document.getElementsByClassName('finished')
let levelNumberTag = document.getElementById('level')
let levelUpTag = document.getElementById('level-up')
let chronometerTag = document.getElementById('chronometer-tag')
let times = document.getElementsByClassName('time')
let lines = document.getElementsByTagName('tr')
let tableBody = document.getElementsByTagName('tbody')[0]
let table = document.getElementsByTagName('table')[0]
let message = document.getElementById('message')
message.hidden = true

// AUDIO
let successAudio = document.getElementsByClassName('success')
successAudio[0].volume = successAudio[1].volume = 0.08
let successAudioSequence = 0;
let clickAudio = document.getElementsByClassName('click')
clickAudio[0].volume = clickAudio[1].volume = 0.08
let clickAudioSequence = 0;
let victoryAudio = document.getElementById('victory')
victoryAudio.volume = 0.02
let metamorphAudio = document.getElementsByClassName('metamorph')
metamorphAudio[0].volume = metamorphAudio[1].volume = 0.08
let metamorphAudioSequence = 0
let psykokwakAudio = document.getElementsByClassName('psykokwak')
psykokwakAudio[0].volume = psykokwakAudio[1].volume = 0.1
let psykokwakAudioSequence = 0
let backgroundMusic = document.getElementById('final-level') 
backgroundMusic.volume = 0.02
let gameOverMusic = document.getElementById('game-over')
gameOverMusic.volume = 0.03
// CHRONOMETER
let millisecondsOne = document.getElementById('milliseconds-one')
let millisecondsTwo = document.getElementById('milliseconds-two')
let millisecondsThree = document.getElementById('milliseconds-three')
let seconds = document.getElementById('seconds')
let tenSeconds = document.getElementById('ten-seconds')
let minutes = document.getElementById('minutes')
let tenMinutes = document.getElementById('ten-minutes')

let millisecondsOneCount = 0;
let millisecondsTwoCount = 0
let millisecondsThreeCount = 0;
let secondsCount = 0;
let tenSecondsCount = 0;
let minutesCount = 0;
let tenMinutesCount = 0;

function chronometer(maximal, count, interval, dom) {
  setInterval(function () {
    if (count == maximal) {
      count = 0
    } else {
      count++
    }
    dom.textContent = `${count}`
  }, interval);

}

function launchChronometers() {
  chronometer(9, millisecondsOneCount, 1, millisecondsOne)
  chronometer(9, millisecondsTwoCount, 10, millisecondsTwo)
  chronometer(9, millisecondsThreeCount, 100, millisecondsThree)
  chronometer(9, secondsCount, 1000, seconds)
  chronometer(5, tenSecondsCount, 10000, tenSeconds)
  chronometer(9, minutesCount, 60000, minutes)
  chronometer(5, tenMinutesCount, 600000, tenMinutes)
}



// SHUFFLE AND RANDOM CONTENT
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
function randomContent(array) {
  for (var i = 0; i < array.length; i += 2) {
    array[i].classList.add(`pokemon-1`) 
    array[i + 1].classList.add(`pokemon-1`)
  }
}
let hiddenSquaresShuffled = shuffleArray(hiddenSquares)
randomContent(hiddenSquaresShuffled)


// ON CLICK
let firstClick = true;

function game() {
  Array.from(document.getElementsByClassName('hidden')).forEach(function (e) {
    e.addEventListener('click', function () {
      if (firstClick) {
        if (levelNumber == 5) {
          backgroundMusic.play()
        }
        launchChronometers()
        firstClick = false
      }

      // PSYCHOQUACK
      if (!(tableBody.classList.contains('rotation')) && this.style.backgroundImage == `url("../images/pokemon_12.png")`) {
        if (psykokwakAudioSequence == 0) {
          psykokwakAudio[0].play()
          psykokwakAudioSequence = 1
        } else {
          psykokwakAudio[1].play()
          psykokwakAudioSequence = 0
        }
        setTimeout(function () {
          table.classList.add('rotation')
        }, 250)
        setTimeout(function () {
          table.classList.remove('rotation')
        }, 3000)
      }


      if (revealedSquares.length < 2 && this.classList.contains('hidden')) {
        if (clickAudioSequence == 0) {
          clickAudio[0].play()
          clickAudioSequence = 1
        } else {
          clickAudio[1].play()
          clickAudioSequence = 0
        }
        this.classList.replace('hidden', 'revealed')
        // IF THE TWO SQUARES ARE REVEALED 
        if (revealedSquares.length == 2) {
          if (revealedSquares[0].style.backgroundImage == revealedSquares[1].style.backgroundImage) {
            if (!gameOver()) {
              if (successAudioSequence == 0) {
                successAudio[0].play()
                successAudioSequence = 1
              } else {
                successAudio[1].play()
                successAudioSequence = 0
              }
            }
            setTimeout(function () {
              revealedSquares[0].classList.replace('revealed', 'finished')
              revealedSquares[0].classList.replace('revealed', 'finished')
            }, 300)
          } else {
            setTimeout(function () {
              revealedSquares[0].classList.replace('revealed', 'hidden')
              revealedSquares[0].classList.replace('revealed', 'hidden')
            }, 300)
            if (revealedSquares[0].style.backgroundImage === `url("../images/pokemon_8.png")` || revealedSquares[1].style.backgroundImage === `url("../images/pokemon_8.png")`) {
              if (metamorphAudioSequence == 0) {
                metamorphAudio[0].play()
                metamorphAudioSequence = 1
              } else {
                metamorphAudio[1].play()
                metamorphAudioSequence = 0
              }
              if (revealedSquares[0].style.backgroundImage === `url("../images/pokemon_8.png")`) {

                newImage = revealedSquares[1].style.backgroundImage
                revealedSquares[0].style.backgroundImage = newImage
                revealedSquares[1].style.backgroundImage = `url("../images/pokemon_8.png")`
              } else {
                newImage = revealedSquares[0].style.backgroundImage
                revealedSquares[1].style.backgroundImage = newImage
                revealedSquares[0].style.backgroundImage = `url("../images/pokemon_8.png")`
              }
            }
          }

        }
      }
      // GAME OVER
      setTimeout(function () {
        if (gameOver()) {
          message.hidden = false
          levelNumberTag.textContent += ' : Completed !'
          switch (levelNumber) {
            case 1:
              message.textContent = 'I see that you understood the game !'
              break;
            case 2:
              message.textContent = 'Well done, you have some pretty moves !'
              break;
            case 3:
              message.textContent = 'OK ! We will see if you can handle this new one !'
              break;
            case 4:
              message.textContent = 'We will see if you can handle the final level !'
              break;
            case 5:
              message.innerHTML = 'I hope you enjoyed this game created by Daniel Venera'
              
              backgroundMusic.pause()
              gameOverMusic.play()
            default:
              break;
          }
          if (levelNumber < 5) {
            levelUpTag.innerHTML = "<button onClick='levelUp()' class='btn btn-primary m-2'>Next Level</button>"
            victoryAudio.play()
          } else {
            levelUpTag.innerHTML = "<button onClick='window.location.reload()' class='btn btn-primary m-2'>Replay</button>"
          }
          levelUpTag.hidden = false
          
          for (var i = 1; i < 99999; i++) {
            window.clearInterval(i);
          }
          table.classList.remove('rotation')
        }
      }, 300)

    })
  })
}
let newImage;

game()

// GAME OVER
function gameOver() {
  if (finishedSquares.length == squares.length) {
    return true
  } else {
    return false
  }
}


// LEVEL UP

let levelNumber = 1;
let newPAir = "<td class='hidden'></td></tr>"
let newLine = "<tr><td class='hidden'></td><td class='hidden'></td><td class='hidden'></td><td class='hidden'></td></tr>"
function levelUp() {
  levelNumber += 1
  levelUpTag.hidden = true
  message.hidden = true
  if (levelNumber == 5) {
    levelNumberTag.textContent = 'Final Level'
  } else {
    levelNumberTag.textContent = `Level #${levelNumber}`

  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.replace('finished', 'hidden')
  }
  if (levelNumber < 4) {
    lines[0].insertAdjacentHTML('beforeend', newPAir);
    lines[1].insertAdjacentHTML('beforeend', newPAir);
  } else {
    tableBody.insertAdjacentHTML('beforeend', newLine)
  }
  hiddenSquaresShuffled = shuffleArray(Array.from(document.getElementsByClassName('hidden')))
  randomContent(hiddenSquaresShuffled)
  firstClick = true
  for (let i = 0; i < times.length; i++) {
    times[i].textContent = 0
  }
  game()
}

function replay() {
  levelUpTag.hidden = true
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.replace('finished', 'hidden')
  }
  game()
}
