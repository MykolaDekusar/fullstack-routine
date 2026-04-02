// Funzione per fare pause e creare l'animazione visiva
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function runAStar(grid, start, end) {
    const startNode = grid[start.r][start.c];
    const endNode = grid[end.r][end.c];

    let openSet = [startNode]; // Nodi da valutare
    let closedSet = new Set(); // Nodi già valutati

    // Inizializziamo i punteggi di tutti i nodi
    for(let r=0; r<grid.length; r++) {
        for(let c=0; c<grid[0].length; c++) {
            grid[r][c].g = Infinity; // Distanza dal via
            grid[r][c].f = Infinity; // Distanza totale stimata
            grid[r][c].previous = null; // Ci serve per ricostruire la strada alla fine
        }
    }

    startNode.g = 0;
    startNode.f = heuristic(startNode, endNode);

    while (openSet.length > 0) {
        // Troviamo il nodo con il punteggio 'f' più basso (il più promettente)
        let current = openSet.reduce((lowest, node) => node.f < lowest.f ? node : lowest);

        // Se siamo arrivati alla fine, disegniamo il percorso!
        if (current === endNode) {
            await drawPath(endNode);
            return; 
        }

        // Spostiamo il nodo corrente da "da valutare" a "già valutato"
        openSet = openSet.filter(node => node !== current);
        closedSet.add(current);

        // Animazione: colora il nodo di viola (se non è partenza/arrivo)
        if (current !== startNode && current !== endNode) {
            current.el.classList.add('visited');
            await sleep(15); // Pausa di 15 millisecondi per l'effetto visivo
        }

        // Controlliamo i vicini (Sopra, Sotto, Destra, Sinistra)
        const neighbors = getNeighbors(current, grid);
        
        for (let neighbor of neighbors) {
            // Se è un muro o lo abbiamo già valutato, ignoriamolo
            if (neighbor.isWall || closedSet.has(neighbor)) continue;

            let tentativeG = current.g + 1; // La distanza per arrivare qui è quella del nodo precedente + 1

            // Se abbiamo trovato un percorso migliore per questo vicino
            if (tentativeG < neighbor.g) {
                neighbor.previous = current;
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + heuristic(neighbor, endNode);

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    // Se il ciclo finisce e non ha restituito nulla, significa che è impossibile raggiungere la fine
    alert("Nessun percorso trovato! Hai chiuso l'uscita con i muri?");
}

// Calcola la distanza aerea stimata (Manhattan distance)
function heuristic(nodeA, nodeB) {
    return Math.abs(nodeA.r - nodeB.r) + Math.abs(nodeA.c - nodeB.c);
}

// Trova le celle adiacenti valide
function getNeighbors(node, grid) {
    let neighbors = [];
    let r = node.r;
    let c = node.c;
    const rows = grid.length;
    const cols = grid[0].length;

    if (r > 0) neighbors.push(grid[r-1][c]); // Su
    if (r < rows - 1) neighbors.push(grid[r+1][c]); // Giù
    if (c > 0) neighbors.push(grid[r][c-1]); // Sinistra
    if (c < cols - 1) neighbors.push(grid[r][c+1]); // Destra

    return neighbors;
}

// Ricostruisce il percorso all'indietro e lo colora
async function drawPath(endNode) {
    let path = [];
    let current = endNode.previous;

    while (current.previous) {
        path.push(current);
        current = current.previous;
    }

    // Disegniamo il percorso partendo dall'inizio alla fine
    for (let i = path.length - 1; i >= 0; i--) {
        path[i].el.classList.add('path');
        await sleep(30); // Animazione più lenta per godersi il risultato
    }
}