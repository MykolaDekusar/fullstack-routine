/**
 * UTILITY: DOMHelper
 * Una classe "cassetta degli attrezzi". Contiene metodi statici che non richiedono
 * la creazione di un oggetto (new DOMHelper) per essere usati.
 */
class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);

    // .append() sposta fisicamente l'elemento da un punto all'altro del DOM
    destinationElement.append(element);

    // Migliora la UX portando l'elemento a schermo dopo lo spostamento
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * COMPONENTE UI: Tooltip
 * Gestisce il ciclo di vita (creazione -> visualizzazione -> distruzione) del popup informativo.
 */
class Tooltip {
  constructor(itemId, closeNotifier) {
    const projectItemElement = document.getElementById(itemId);
    // Recuperiamo i dati memorizzati nell'attributo data-extra-info dell'HTML
    this.extraInfo = projectItemElement.dataset.extraInfo;
    this.closeNotifier = closeNotifier;
  }

  // Creazione dinamica degli stili via JS
  styleToolTip() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";

    // Object.assign è un modo rapido per impostare più proprietà CSS contemporaneamente
    Object.assign(toolTipElement.style, {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "15px",
      cursor: "pointer",
      position: "relative", // Assicuriamoci che si posizioni bene
      zIndex: "10",
    });

    this.element = toolTipElement;
    return toolTipElement;
  }

  // Metodo per rimuovere il componente e pulire lo stato del genitore
  detach() {
    if (this.element) {
      this.element.remove();
      this.closeNotifier(); // Fondamentale: informa il ProjectItem che può riaprirne un altro
    }
  }

  showToolTip() {
    const styledToolTip = this.styleToolTip();
    const header = document.querySelector("header");
    styledToolTip.textContent = this.extraInfo;

    // Inseriamo il tooltip subito dopo l'header (logica specifica di questo esercizio)
    header.insertAdjacentElement("afterend", styledToolTip);

    // .bind(this) assicura che quando clicchiamo, "this" dentro detach sia l'oggetto Tooltip
    styledToolTip.addEventListener("click", this.detach.bind(this));
  }
}

/**
 * CONTROLLER: ProjectItem
 * Rappresenta il singolo progetto. È il "cuore" della logica del task.
 */
class ProjectItem {
  hasTooltip = false;

  constructor(id, updateProjectListFunction) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectMoreInfoBtn();
    this.connectSwitchBtn();
    this.connectDrag();
  }

  // Logica Toggle: gestisce l'apertura/chiusura intelligente
  showMoreInfoHandler() {
    if (this.hasTooltip) {
      this.tooltipInstance.detach();
    } else {
      // Creiamo una nuova istanza e passiamo una callback per resettare lo stato al close
      this.tooltipInstance = new Tooltip(this.id, () => {
        this.hasTooltip = false;
      });
      this.tooltipInstance.showToolTip();
      this.hasTooltip = true;
    }
  }

  connectDrag() {
    const el = document.getElementById(this.id);
    // Assicurati che nell'HTML l'elemento abbia l'attributo draggable="true"
    el.addEventListener("dragstart", (event) => {
      // Memorizziamo l'ID dell'elemento nel "pacchetto dati" del trascinamento
      event.dataTransfer.setData("text/plain", this.id);
      // Specifichiamo l'intenzione: stiamo "muovendo", non copiando
      event.dataTransfer.effectAllowed = "move";
    });
  }

  connectMoreInfoBtn() {
    const projectItemElement = document.getElementById(this.id);
    const moreBtn = projectItemElement.querySelector(`.alt`);
    moreBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  // Chiamato quando il task si sposta tra le liste
  update(updateProjectListFn, type) {
    this.updateProjectListHandler = updateProjectListFn;
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector("button:last-of-type");

    // Aggiorniamo dinamicamente il testo del bottone
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
  }

  connectSwitchBtn() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector(`button:last-of-type`);
    switchBtn.addEventListener("click", () => {
      // Chiamiamo la funzione di switch passata dal manager (ProjectList)
      this.updateProjectListHandler(this.id);
    });
  }
}

/**
 * MANAGER: ProjectList
 * Gestisce l'intera colonna (Active o Finished).
 */
class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    this.section = document.getElementById(`${type}-projects`);
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    this.createNewItems(prjItems);
    this.updateVisibility();
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    // dragenter: L'elemento entra nell'area di drop
    list.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault(); // Necessario per permettere il drop
        list.parentElement.classList.add("droppable"); // Feedback visivo
      }
    });

    // dragover: L'elemento è sopra l'area di drop (scatta ogni pochi millisecondi)
    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault(); // CRITICO: Senza questo il drop non funzionerà
      }
    });

    // dragleave: L'elemento esce o il drop viene annullato
    list.addEventListener("dragleave", (event) => {
      // Verifichiamo che stiamo uscendo davvero dalla lista e non entrando in un figlio (es. un <li>)
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });

    // drop: L'elemento viene rilasciato
    list.addEventListener("drop", (event) => {
      const prjId = event.dataTransfer.getData("text/plain");

      // Controllo di sicurezza: se il progetto è già in questa lista, ignoriamo
      if (this.projects.find((p) => p.id === prjId)) {
        list.parentElement.classList.remove("droppable");
        return;
      }

      // TRUCCO: Invece di gestire la logica qui, "clicchiamo" il tasto switch dell'elemento
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();

      list.parentElement.classList.remove("droppable");
      event.preventDefault();
    });
  }

  // Gestione dinamica dell'interfaccia: se non ci sono task, la sezione sparisce
  updateVisibility() {
    this.section.style.display = this.projects.length === 0 ? "none" : "block";
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  createNewItems(prjItems) {
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this)),
      );
    }
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);

    // Aggiorniamo il task con le nuove funzioni di callback specifiche della nuova lista
    project.update(this.switchProject.bind(this), this.type);
    this.updateVisibility();
  }

  switchProject(projectId) {
    const projectToMove = this.projects.find((item) => item.id === projectId);

    // Eseguiamo lo switch tramite la funzione collegata in App.init
    this.switchHandler(projectToMove);

    // Rimuoviamo il progetto dalla lista attuale (immutabilità simulata)
    this.projects = this.projects.filter((item) => item.id !== projectId);
    this.updateVisibility();
  }
}

/**
 * ORCHESTRATORE: App
 * Il punto di partenza che "monta" l'applicazione.
 */
class App {
  static init() {
    const activeProjects = new ProjectList("active");
    const finishedProjects = new ProjectList("finished");

    // CROSS-COMMUNICATION: Colleghiamo le due liste
    // Quando 'active' finisce un task, chiama 'addProject' di 'finished'
    activeProjects.setSwitchHandlerFunction(
      finishedProjects.addProject.bind(finishedProjects),
    );

    // E viceversa per i task finiti che tornano attivi
    finishedProjects.setSwitchHandlerFunction(
      activeProjects.addProject.bind(activeProjects),
    );
  }
}

// Start!
App.init();
