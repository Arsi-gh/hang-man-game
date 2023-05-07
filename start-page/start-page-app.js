import * as hangManFuncs from "../components/canvas-hang-man-funcs.js"

const $ = document

const canvas = $.querySelector('canvas')
const ctx = canvas.getContext('2d')

const mainPage = $.querySelector('.main-page')
const wordPage = $.querySelector('.word-selection')
const timePage = $.querySelector('.time-selection')
const pages = [mainPage , wordPage , timePage]
let currentPage = 0

const buttonParts = $.querySelectorAll('.btn-parts')

const limitCheck = $.querySelector('#limited')
const labelCon = $.querySelector('.label-con')
const minutesInput = $.querySelector('#minutes')
const secondsInput = $.querySelector('#seconds')
let userMinTime = null
let userSecTime = null

const welcomeH1 = $.querySelector('.welcome-tag');

const startBtn = $.querySelector('.start-game-btn')
const submitWordBtn = $.querySelector('.submit-word')
const startGameBtn = $.querySelector('.start-game')

const wordInput = $.querySelector('.word-input')

//Alert variables 
const firstWordAlert = $.querySelector('.first-alert')
const secondWordAlert = $.querySelector('.second-alert')

//Functions

const nextPageFn = () => {
    if (currentPage < 2){
        currentPage += 1
        loadPage(pages[currentPage])
        activeBtn(buttonParts[currentPage])
    }
}

const clearAlert = (alert) => {
    setTimeout(() => {
        alert.style.display = 'none'
    } , 3000)
}

const saveWordFn = () => {
    if (/ /g.test(wordInput.value)){
        firstWordAlert.style.display = 'block'
        firstWordAlert.innerHTML = 'you cant add space in your word'
        clearAlert(firstWordAlert)
        return false
    } else if (wordInput.value) {
        nextPageFn()
        return true
    } else {
        firstWordAlert.style.display = 'block'
        firstWordAlert.innerHTML = 'Please Write down your word'
        clearAlert(firstWordAlert)
        return false 
    }
}

const limitCheckFn = () => {
    if(limitCheck.checked){
        labelCon.style.display = 'none'
        minutesInput.style.display = 'none'
        secondsInput.style.display = 'none'
        return false
    }else {
        labelCon.style.display = 'block'
        minutesInput.style.display = 'block'
        secondsInput.style.display = 'block'
        return true
        
    }
}

const loadPage = (selectedPage) => {
    mainPage.style.display = 'none'
    wordPage.style.display = 'none'
    timePage.style.display = 'none'
    selectedPage.style.display = 'flex'
}

const activeBtn = (currentBtn) => {
    buttonParts.forEach((button) => {
        button.classList = "btn-parts"
    })
    currentBtn.classList.add('active-part')
}

const partsBtnFuncs = () => {
    buttonParts.forEach((button) => {
        button.addEventListener('click' , (event) => {
            loadPage(pages[event.target.innerText - 1])
            currentPage = event.target.innerText - 1 
            activeBtn(buttonParts[event.target.innerText - 1])
        })
    })
}

const loadCanvas = () => {
    ctx.strokeStyle = '#e8b72e'
    ctx.lineWidth = 5
    hangManFuncs.manPartOne(ctx)
    hangManFuncs.manPartTwo(ctx)
    hangManFuncs.manPartThree(ctx)
    hangManFuncs.manPartFour(ctx)
    hangManFuncs.manPartFive(ctx)
    hangManFuncs.manPartSix(ctx)
    hangManFuncs.manPartSeven(ctx)
    hangManFuncs.manPartEight(ctx)
    hangManFuncs.manPartNine(ctx)
    hangManFuncs.manPartTen(ctx)

}

const typeWriter = () =>{
    const typewriter = new Typewriter(welcomeH1, {
        loop: true
    });
    
    typewriter.typeString('Hang Man')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Guess the word and win')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Play with friends')
    .pauseFor(2500)
    .start();
}

const gameStartFn = () => {
    let limitCheck = limitCheckFn()
    let wordAccess = saveWordFn()
    if (wordAccess){
        if (limitCheck){
            // time send (send limit check , minutes , seconds , word)
            userMinTime = +minutesInput.value
            userSecTime = +secondsInput.value
            window.location.href = `../game-page/game-page-index.html?${limitCheck}?${userMinTime}?${userSecTime}?${wordInput.value}`
        }else {
            //no time 
            window.location.href = `../game-page/game-page-index.html?${limitCheck}?${wordInput.value}`
        }
    } else {
        secondWordAlert.style.display = 'block'
        secondWordAlert.innerHTML = 'Please fix the errors u got in the previous page'
        clearAlert(secondWordAlert)
    }
}

window.addEventListener('load' , () => {
    loadPage(pages[currentPage])
    loadCanvas()
    partsBtnFuncs()
    limitCheckFn()
    typeWriter()
    limitCheck.addEventListener('input' , limitCheckFn)
    startBtn.addEventListener('click' , nextPageFn)
    submitWordBtn.addEventListener('click' , saveWordFn) 
    startGameBtn.addEventListener('click' , gameStartFn)   
})