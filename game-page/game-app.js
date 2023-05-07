import * as HangManFuncs from "../components/canvas-hang-man-funcs.js"

const $ = document
const alphabetsElems = $.querySelectorAll('.alphabets')
const wordContainer = $.querySelector('.word-container')
const mainPage = $.querySelector('main')
const sectionPage = $.querySelector('section')
const endBox = $.querySelector('.end-box')
const gameResult = $.querySelector('.game-result')
const retryBtn = $.querySelector('svg')
const triesShowElem = $.querySelector('h1')
const timeCon = $.querySelector('.time-con')
const startPageBtn = $.querySelector('.start-page-btn')
const canvas = $.querySelector('canvas')
const ctx = canvas.getContext('2d')
const hangManFuncs = [HangManFuncs.manPartOne , HangManFuncs.manPartTwo , HangManFuncs.manPartThree , HangManFuncs.manPartFour , HangManFuncs.manPartFive , HangManFuncs.manPartSix , HangManFuncs.manPartSeven , HangManFuncs.manPartEight , HangManFuncs.manPartNine , HangManFuncs.manPartTen]

let elemCons = null
let userTries = 0
let timeAvailable = false
let userMinTime = null
let userSecTime = null 
let timeOut = null
let userGeussWord = null
let geussWord = []

const loadCanvas = (ctx , indexPart) => {
    hangManFuncs[indexPart](ctx)
}

const generateWord = () => {
    for (let char of userGeussWord ){
        geussWord.push(char)
    }
    geussWord.forEach((word , index) => {
        let newElem = $.createElement('span')
        newElem.dataset.index = index + 1
        newElem.classList = `elem-cons`
        wordContainer.append(newElem)

    })
    elemCons = $.querySelectorAll('.elem-cons')
    
}

const alphabetIn = (alphabet) => {
    if (userGeussWord.includes(alphabet)){
        geussWord.forEach((char , index)=>{
            if (char === alphabet){
                elemCons[index].innerText = alphabet
            }
        })
        let userWinNum = 0
        for (let i = 0 ; i < userGeussWord.length ;i++){
            if (elemCons[i].innerHTML) {
                userWinNum++
            }
        }
        if (userWinNum == userGeussWord.length){
            endGamePage('You Won')
        }
    } else {
        userTries++
        let canvs = userTries - 1
        if (userTries == 10){
            loadCanvas(ctx , 9)
            triesShowElem.innerHTML = `Tries Left : 0`
            endGamePage('You Lost')
        } else {
            loadCanvas(ctx , canvs)
            triesShowElem.innerHTML = `Tries Left : ${10 - userTries}`
        }
    }
}

const alphabetCheck = (alphabet , element) => {
    element.style.backgroundColor = '#e8b72e'
    element.style.color = '#222222'
    element.style.fontWeight = 'bold'
    alphabetIn(alphabet)
    element.removeEventListener('click' , charInCheck)
}

const urlKeyword = () => {
    let url = location.href
    let urlSeparatorIndex = url.indexOf('?')
    let urlKeywordTxt = url.slice(urlSeparatorIndex + 1 , url.length)
    let gameDatas = urlKeywordTxt.split('?')
    timeAvailable = gameDatas[0]
    userMinTime = gameDatas[1]
    userSecTime = gameDatas[2]
    userGeussWord = gameDatas[3].toLocaleLowerCase()
}

const charInCheck = (event) => {
    alphabetCheck(event.target.innerText.toLowerCase() , event.target)
}

const setUserTime = () => {
    if (timeAvailable){
        timeOut = (userMinTime * 60 * 1000) + (userSecTime * 1000)
        setTimeout( () => {
            endGamePage('You lost')
        } , timeOut)
        setInterval( () => {
            if (userSecTime == 0 && userMinTime ==0){
                clearInterval
            } else if (userSecTime < 1){
                if (userMinTime == 0){
                    userSecTime = 59
                } else {
                    userSecTime = 59
                    userMinTime--
                } 
            } else {
                userSecTime--
            }
            timeCon.innerHTML = `Your Time  ${userMinTime} : ${userSecTime}`
        } , 1000)
    }
}

const endGamePage = (text) => {
    if (endBox.style.display != 'flex'){
        alphabetsElems.forEach(alphabet => {
            alphabet.removeEventListener('click' , charInCheck)
        })
        startPageBtn.removeEventListener('click' , firstPageTransfer)
        mainPage.style.filter = 'brightness(60%)'
        sectionPage.style.filter = 'brightness(60%)'
        endBox.style.display = 'flex'
        gameResult.innerHTML = text
    }
}

const firstPageTransfer = () => {
    location.href = './../start-page/start-page-index.html'
}

window.addEventListener('load' , () => {
    ctx.clearRect(0 , 0 , canvas.width , canvas.height)
    ctx.strokeStyle = '#e8b72e'
    ctx.lineWidth = 5
    urlKeyword()
    generateWord()
    alphabetsElems.forEach(alphabet => {
        alphabet.addEventListener('click' , charInCheck)
    })
    startPageBtn.addEventListener('click' , firstPageTransfer)
    retryBtn.addEventListener('click' , () => {
        window.location.href = window.location.href
    })
    setUserTime()
})