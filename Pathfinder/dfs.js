const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function runDFS(grid, start, end) {
    const startNode = grid[start.r][start.c];
    const endNode = grid[end.r][end.c];

    let stack = [startNode];

    for(let r=0; r<grid.length; r++) {
        for(let c=0; c<grid[0].length; c++) {
            grid[r][c].isVisited = false;
            grid[r][c].previous = null;
        }
    }

    while (stack.length > 0) {
        // Togliamo l'ULTIMO elemento dalla pila (Logica LIFO: Last In, First Out)
        let current = stack.pop();

        if (current.isVisited || current.isWall) continue;
        
        current.isVisited = true;

        if (current !== startNode && current !== endNode) {
            current.el.classList.add('visited');
            await sleep(20); // Animazione un po' più lenta per goderci i "vicoli ciechi"
        }

        if (current === endNode) {
            await drawPath(endNode);
            return;
        }

        let neighbors = getNeighbors(current, grid);
        for (let neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.previous = current;
                stack.push(neighbor); // Aggiungiamo in cima alla pila
            }
        }
    }
    alert("Nessun percorso trovato! I muri bloccano l'uscita.");
}

function getNeighbors(node, grid) {
    let neighbors = [];
    let r = node.r;
    let c = node.c;
    const rows = grid.length;
    const cols = grid[0].length;

    // L'ordine in cui li inseriamo cambia la direzione iniziale del "serpente"
    if (r > 0) neighbors.push(grid[r-1][c]); 
    if (c < cols - 1) neighbors.push(grid[r][c+1]); 
    if (r < rows - 1) neighbors.push(grid[r+1][c]); 
    if (c > 0) neighbors.push(grid[r][c-1]); 

    return neighbors;
}

async function drawPath(endNode) {
    let path = [];
    let current = endNode.previous;
    while (current.previous) {
        path.push(current);
        current = current.previous;
    }
    for (let i = path.length - 1; i >= 0; i--) {
        path[i].el.classList.add('path');
        await sleep(30);
    }
}