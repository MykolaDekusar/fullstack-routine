export const ROWS = 20;
export const COLS = 40;
export let startNode = { r: 10, c: 5 };
export let endNode = { r: 10, c: 34 };
export let grid = []; 

let isMousePressed = false;
// NUOVA VARIABILE: Ci dice se stiamo disegnando (true) o cancellando (false)
let isDrawingWall = true; 

document.addEventListener('mouseup', () => {
    isMousePressed = false;
});

export function createGrid(container) {
    container.style.gridTemplateColumns = `repeat(${COLS}, 25px)`;
    grid = []; 

    for (let r = 0; r < ROWS; r++) {
        let currentRow = [];
        for (let c = 0; c < COLS; c++) {
            const nodeEl = document.createElement('div');
            nodeEl.classList.add('node');
            nodeEl.id = `node-${r}-${c}`;
            nodeEl.setAttribute('draggable', false);

            if (r === startNode.r && c === startNode.c) nodeEl.classList.add('start');
            if (r === endNode.r && c === endNode.c) nodeEl.classList.add('end');

            const nodeData = { r, c, isWall: false, el: nodeEl };
            currentRow.push(nodeData);

            addMouseEvents(nodeData);

            container.appendChild(nodeEl);
        }
        grid.push(currentRow);
    }
}

function addMouseEvents(node) {
    node.el.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        isMousePressed = true;
        
        // Decidiamo l'azione iniziale: se clicco su un vuoto disegno, se clicco su un muro cancello
        isDrawingWall = !node.isWall; 
        
        updateWall(node, isDrawingWall);
    });

    node.el.addEventListener('mouseenter', () => {
        if (isMousePressed) {
            // Applichiamo sempre la stessa azione decisa al click (non invertiamo più a caso!)
            updateWall(node, isDrawingWall);
        }
    });
}

// NUOVA FUNZIONE: Invece di "toggle", forziamo lo stato a essere Muro o Vuoto
function updateWall(node, makeWall) {
    // Evitiamo sempre di coprire partenza e arrivo
    if ((node.r === startNode.r && node.c === startNode.c) || 
        (node.r === endNode.r && node.c === endNode.c)) return;
    
    node.isWall = makeWall;
    
    if (makeWall) {
        node.el.classList.add('wall');
    } else {
        node.el.classList.remove('wall');
    }
}

export function clearPath() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[r][c].el.classList.remove('visited', 'path');
        }
    }
}

export function clearAll() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[r][c].isWall = false;
            grid[r][c].el.classList.remove('wall', 'visited', 'path');
        }
    }
}