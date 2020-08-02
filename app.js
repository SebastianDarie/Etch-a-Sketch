const grid = document.querySelector('.grid')
const restart = document.querySelector('#restart')
const black = document.querySelector('#mono')
const rgb = document.querySelector('#rgb')
const gradient = document.querySelector('#gradient')
let rows, cols
let color = 1
let gradHue
let gradVal = 95
let gradInc = false

function generateGrid(rows, cols) {
    grid.style.setProperty('--grid-rows', rows)
    grid.style.setProperty('--grid-cols', cols)
    for (let i = 0; i < (rows * cols); i++){
        let cell = document.createElement('div')
        cell.classList.add('grid-item')
        cell.addEventListener('mouseover', changeColors)
        grid.appendChild(cell)
    }
}

function resetGrid() {
    while(grid.firstChild) {
        grid.removeChild(grid.lastChild)
    }
    rows = prompt('Input number of rows: ', 16)
    cols = prompt('Input number of columns: ', 16)
}

function changeColors(e) {
    switch (color) {
        case 1:
            this.style.backgroundColor = 'black'
        break
        case 2: 
            this.style.backgroundColor = getRandomColor()
        break
        case 3: 
            if(gradVal > 99 && gradInc) {
                gradInc = false
            } else if(gradVal <= 10 && !gradInc) {
                gradInc = true
            }
            this.style.backgroundColor = `hsl(${gradHue}, ${100}%, ${gradVal}%)`
            gradVal += gradInc ? 3 : -3
        break
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}


restart.addEventListener('click', e => {
    resetGrid()
    generateGrid(rows, cols)
})

black.addEventListener('click', e => {
    color = 1
})

rgb.addEventListener('click', e => {
    color = 2
})

gradient.addEventListener('click', e => {
    color = 3
    gradHue = Math.floor(Math.random() * 360)
})

generateGrid(16, 16)