let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let playerX = "";
let playerO = "";
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

// Bina petak
function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((val, i) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = val;
        if (val === "X") cell.classList.add("X");
        if (val === "O") cell.classList.add("O");
        cell.addEventListener("click", () => makeMove(i));
        boardElement.appendChild(cell);
    });
}

function makeMove(i) {
    if (board[i] === "") {
        board[i] = currentPlayer;
        
        // Cek jika ada pemenang atau seri
        if (checkWinner()) {
            let winnerName = currentPlayer === "X" ? playerX : playerO;
            createBoard(); // Update papan terakhir
            
            // Popup kemenangan
            setTimeout(() => {
                showWinner(winnerName)(`Tahniah! ${winnerName} menang! 🎉`);
            }, 100); 
            
            boardElement.style.pointerEvents = "none";
            return;
        }

        // Cek seri (Draw)
        if (!board.includes("")) {
            setTimeout(() => { showWinner(winnerName)("Permainan Seri! 🤝"); }, 100);
            return;
        }
        
        // Tukar giliran
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        let currentName = currentPlayer === "X" ? playerX : playerO;
        statusElement.innerText = `Giliran: ${currentName} (${currentPlayer})`;
        
        createBoard();
    }
}

function checkWinner() {
    const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    return wins.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function changePlayers() {
    // 1. Sorok modal pemenang
    winModal.style.display = "none";
    
    // 2. Tunjuk balik modal nama (yang kita sorok masa mula-mula tadi)
    nameModal.style.display = "flex";
    
    // 3. Reset game seperti biasa
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    boardElement.style.pointerEvents = "auto";
    createBoard();
}

function resetGame() {
    // 1. Kosongkan papan data
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    
    // 2. Tutup modal pemenang (sorokkan semula)
    winModal.style.display = "none";
    
    // 3. Aktifkan semula klik pada papan
    boardElement.style.pointerEvents = "auto";
    
    // 4. Reset status
    statusElement.innerText = `Giliran: ${playerX} (X)`;
    
    // 5. Lukis semula papan kosong
    createBoard();
}

const nameModal = document.getElementById("nameModal");
const winModal = document.getElementById("winModal");

// Sorok winModal masa mula-mula
winModal.style.display = "none";

function saveNames() {
    playerX = document.getElementById("player1Input").value || "Pemain X";
    playerO = document.getElementById("player2Input").value || "Pemain O";
    nameModal.style.display = "none"; // Hilangkan modal nama
    statusElement.innerText = `Giliran: ${playerX} (X)`;
}

function showWinner(winnerName) {
    winModal.style.display = "flex";
    document.getElementById("winText").innerText = winnerName ? `${winnerName} Menang! 🎉` : "Seri! 🤝";
}

createBoard();