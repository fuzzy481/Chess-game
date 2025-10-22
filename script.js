const board = document.getElementById('chessboard');
const pieces = {
    'r': '&#9820;',
    'n': '&#9822;',
    'b': '&#9821;',
    'q': '&#9819;',
    'k': '&#9818;',
    'p': '&#9823;',
    'R': '&#9814;',
    'N': '&#9816;',
    'B': '&#9815;',
    'Q': '&#9813;',
    'K': '&#9812;',
    'P': '&#9817;'
};

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let selectedPiece = null;
let selectedSquare = null;

function createBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = i;
            square.dataset.col = j;
            if (initialBoard[i][j] !== ' ') {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.innerHTML = pieces[initialBoard[i][j]];
                piece.dataset.row = i;
                piece.dataset.col = j;
                piece.draggable = true;
                piece.addEventListener('dragstart', onDragStart);
                piece.addEventListener('dragend', onDragEnd);
                square.appendChild(piece);
            }
            square.addEventListener('dragover', onDragOver);
            square.addEventListener('drop', onDrop);
            board.appendChild(square);
        }
    }
}

function onDragStart(event) {
    selectedPiece = event.target;
    selectedSquare = event.target.parentElement;
    setTimeout(() => (selectedPiece.style.display = 'none'), 0);
}

function onDragEnd() {
    selectedPiece.style.display = 'flex';
    selectedPiece = null;
    selectedSquare = null;
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    if (selectedPiece && selectedSquare) {
        const targetSquare = event.target.classList.contains('square')
            ? event.target
            : event.target.parentElement;
        targetSquare.appendChild(selectedPiece);
        selectedPiece.dataset.row = targetSquare.dataset.row;
        selectedPiece.dataset.col = targetSquare.dataset.col;
    }
}

createBoard();
