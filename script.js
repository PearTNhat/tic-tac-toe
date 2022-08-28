const allCells=document.querySelectorAll('.cell')
const board=document.querySelector('.board')
const restartButton=document.querySelector('.winning-message__restart')
const winningMessage=document.querySelector('.winning-message')
const winningMessageText=document.querySelector('.winning-message__text')
const X_MARK='x'
const CIRCLE_MARK='circle'
const WINNING_COMBINATION=[
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [3,4,5],
        [6,7,8],
        [2,5,8],
        [2,4,6],
        [1,4,7]
]
let circleTurn
startGame()
restartButton.addEventListener('click',()=>{
    winningMessage.classList.remove('show')
    allCells.forEach(cell => {
        cell.classList.remove(X_MARK)
        cell.classList.remove(CIRCLE_MARK)
        cell.removeEventListener('click',handleCellClick,{once:true})
    });
    startGame()
})
function startGame(){
    circleTurn=true
    setBoardHoverClass()
    allCells.forEach(cell => {
        cell.addEventListener('click',handleCellClick,{once:true})
    });
}
function handleCellClick(e){
    const currentClass= circleTurn ? X_MARK : CIRCLE_MARK
    e.target.classList.add(currentClass)
    if(checkWinning(currentClass)){
        showMessage(currentClass)
    }else if(checkDraw()){
        showMessage(currentClass,'draw')
    }
    swapTurn()
    setBoardHoverClass()
}
function swapTurn(){
    circleTurn=!circleTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_MARK)
    board.classList.remove(CIRCLE_MARK)
    if(circleTurn){
        board.classList.add(X_MARK)
    }else{
        board.classList.add(CIRCLE_MARK)
    }
}
function checkWinning(currentClass){
    return WINNING_COMBINATION.some((combination)=>{
        return combination.every((index)=>{
            return allCells[index].classList.contains(currentClass)
        })
    })
}
function showMessage(currentClass,draw){
    winningMessage.classList.add('show')
    if(draw){
        winningMessageText.innerText=`Draw`
    }else{
        winningMessageText.innerText=`${currentClass.toUpperCase()}'s win`
    }
}
function checkDraw(){
    return Array.from(allCells).every(cell=>{
        return cell.classList.contains(X_MARK) || cell.classList.contains(CIRCLE_MARK)
    })
}
