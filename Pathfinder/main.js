import { createGrid, clearAll, clearPath, grid, startNode, endNode } from './grid.js';
import { runAStar } from './astar.js';
import { runDijkstra } from './dijkstra.js';
// NUOVO: Importiamo BFS e DFS
import { runBFS } from './bfs.js';
import { runDFS } from './dfs.js';

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    createGrid(gridContainer);

    const startBtn = document.getElementById('start-btn');
    const clearBtn = document.getElementById('clear-btn');
    const algoSelect = document.getElementById('algo-select'); 
    
    let isAlgorithmRunning = false; 

    startBtn.addEventListener('click', async () => {
        if (isAlgorithmRunning) return;
        
        clearPath(); 
        isAlgorithmRunning = true;
        
        startBtn.textContent = "Ricerca in corso...";
        startBtn.style.opacity = 0.5;
        algoSelect.disabled = true; 

        const selectedAlgorithm = algoSelect.value;

        // Esegui l'algoritmo scelto
        if (selectedAlgorithm === 'astar') {
            await runAStar(grid, startNode, endNode);
        } else if (selectedAlgorithm === 'dijkstra') {
            await runDijkstra(grid, startNode, endNode);
        } else if (selectedAlgorithm === 'bfs') {
            await runBFS(grid, startNode, endNode);
        } else if (selectedAlgorithm === 'dfs') {
            await runDFS(grid, startNode, endNode);
        }
        
        isAlgorithmRunning = false;
        startBtn.textContent = "Avvia Ricerca";
        startBtn.style.opacity = 1;
        algoSelect.disabled = false; 
    });

    clearBtn.addEventListener('click', () => {
        if (isAlgorithmRunning) return;
        clearAll();
    });
});