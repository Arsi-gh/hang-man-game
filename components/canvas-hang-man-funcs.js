const manPartOne = (ctx) => {
    ctx.moveTo(120 , 250)
    ctx.lineTo(200 , 250)
    ctx.stroke()
}

const manPartTwo = (ctx) => {
    ctx.moveTo(160 , 250)
    ctx.lineTo(160 , 60)
    ctx.stroke()
}

const manPartThree = (ctx) => {
    ctx.moveTo(157 , 60)
    ctx.lineTo(280 , 60)
    ctx.stroke()
}

const manPartFour = (ctx) => {
    ctx.moveTo(280 , 57)
    ctx.lineTo(280, 90)
    ctx.stroke()
}

const manPartFive = (ctx) => {
    ctx.beginPath()
    ctx.arc(280 , 105 , 15 , 0 , 2 * Math.PI , true)
    ctx.stroke()
}

const manPartSix = (ctx) => {
    ctx.moveTo(280 , 120)
    ctx.lineTo(280 , 190)
    ctx.stroke()
}

const manPartSeven = (ctx) => {
    ctx.moveTo(280 , 140)
    ctx.lineTo(300 , 160)
    ctx.stroke()
}

const manPartEight = (ctx) => {
    ctx.moveTo(280 , 140)
    ctx.lineTo(260 , 160)
    ctx.stroke()
}

const manPartNine = (ctx) => {
    ctx.moveTo(280 , 186)
    ctx.lineTo(300 , 210)
    ctx.stroke()
}

const manPartTen = (ctx) => {
    ctx.moveTo(280 , 186)
    ctx.lineTo(260 , 210)
    ctx.stroke()    
}

export {manPartOne , manPartTwo , manPartThree , manPartFour , manPartFive , manPartSix , manPartSeven , manPartEight , manPartNine , manPartTen}