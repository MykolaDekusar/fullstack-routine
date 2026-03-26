# Project Planner - Vanilla JavaScript Task Management

Documentazione tecnica del progetto per la gestione dinamica di task, sviluppato in **Vanilla JavaScript** con approccio orientato agli oggetti (**OOP**).

---

## Architettura del Sistema

Il software è strutturato in classi indipendenti che comunicano tramite callback e istanze dirette.

| Classe | Responsabilità Principale | Metodi Chiave |
| :--- | :--- | :--- |
| **App** | Entry Point globale. Inizializza liste e form. | `init()` |
| **ProjectList** | Gestore colonna (Active/Finished). Gestisce Drop e State. | `addProject()`, `saveToStorage()` |
| **ProjectItem** | Logica del singolo task. Gestisce listener e drag. | `connectDrag()`, `update()` |
| **ProjectInput** | Gestore form. Valida e istanzia i nuovi task. | `submitHandler()`, `toggleForm()` |
| **Tooltip** | Componente UI dinamico per info extra. | `showToolTip()`, `detach()` |
| **DOMHelper** | Utility statica per spostamenti fisici nel DOM. | `moveElement()` |

---

## Processi di Implementazione

### 1. Sistema di Componenti UI (Tooltip)
Il **Tooltip** calcola la propria posizione dinamicamente per evitare sovrapposizioni:
- Utilizza `offsetTop` e `offsetHeight` dell'elemento host.
- Posizionamento `absolute` dentro un genitore `relative`: il tooltip segue lo scroll della lista senza disallinearsi.

### 2. Drag & Drop API
Implementazione dell'interfaccia nativa per il movimento dei task:
- **Dragstart**: L'ID univoco viene iniettato nel `dataTransfer`.
- **Drop Logic**: La lista di destinazione recupera l'ID e attiva programmaticamente il metodo `click()` sul bottone di switch. Questo garantisce il riutilizzo della logica di spostamento (DRY).
- **Feedback**: Classe `.droppable` per indicare visivamente le zone di rilascio.

### 3. Gestione Form e Input
- **Toggle UI**: Il form è inizialmente nascosto (`.hidden`) e viene attivato tramite il bottone "Add Task".
- **Unique IDs**: Generazione ID tramite `Date.now()` per evitare collisioni durante le operazioni di ricerca nel DOM.
- **Workflow**: Alla creazione, viene istanziato un nuovo `ProjectItem` che viene immediatamente registrato nella memoria della lista attiva.

### 4. Persistenza (LocalStorage)
- **Salvataggio**: Ogni modifica attiva `JSON.stringify()` per persistere le liste nel `localStorage`.
- **Reidratazione**: All'avvio, `ProjectList` recupera i dati, ricostruisce i nodi HTML e re-istanzia gli oggetti JS per ripristinare i listener di eventi.

---

## Design e UI
- **CSS Variables**: Gestione centralizzata dei colori e delle ombre.
- **UX Focus**: Transizioni fluide, effetti hover e scrollbar personalizzata.
- **Layout**: Struttura basata su Flexbox per la gestione delle colonne.

---

### Autore
Sviluppato come approfondimento tecnico sulla manipolazione del DOM e architettura software in Vanilla JS by Mykola Dekusar