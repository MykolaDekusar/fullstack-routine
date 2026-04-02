// Funzione per l'animazione
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function runDijkstra(grid, start, end) {
    const startNode = grid[start.r][start.c];
    const endNode = grid[end.r][end.c];

    let unvisitedNodes = [];

    // Impostiamo la distanza di tutti i nodi a Infinito (come se fossero irraggiungibili)
    for(let r=0; r<grid.length; r++) {
        for(let c=0; c<grid[0].length; c++) {
            grid[r][c].distance = Infinity;
            grid[r][c].previous = null;
            unvisitedNodes.push(grid[r][c]); // Aggiungiamo tutti i nodi alla lista da visitare
        }
    }

    startNode.distance = 0; // La partenza ha distanza 0 da se stessa

    while (unvisitedNodes.length > 0) {
        // Ordiniamo i nodi in base alla distanza (dal più vicino al più lontano)
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        
        // Prendiamo il nodo più vicino
        const closestNode = unvisitedNodes.shift();

        // Se becchiamo un muro, lo ignoriamo
        if (closestNode.isWall) continue;

        // Se il nodo più vicino ha distanza Infinito, significa che siamo intrappolati tra i muri!
        if (closestNode.distance === Infinity) {
            alert("Nessun percorso trovato! I muri bloccano l'uscita.");
            return;
        }

        // Animazione: colora il nodo di viola
        if (closestNode !== startNode && closestNode !== endNode) {
            closestNode.el.classList.add('visited');
            await sleep(10); // Lievemente più veloce perché valuta molti più nodi
        }

        // Se siamo arrivati alla fine, disegna il percorso ed esci
        if (closestNode === endNode) {
            await drawPath(endNode);
            return;
        }

        // Aggiorna la distanza dei vicini
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function updateUnvisitedNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        // Se il vicino non è un muro e la nuova strada è più breve, aggiorniamo la sua distanza
        if (!neighbor.isWall && neighbor.distance > node.distance + 1) {
            neighbor.distance = node.distance + 1;
            neighbor.previous = node; // Salviamo da dove arriviamo per ricostruire la strada
        }
    }
}

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