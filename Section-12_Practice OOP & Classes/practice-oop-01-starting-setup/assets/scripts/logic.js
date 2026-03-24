/**
 * UTILITY: Gestione operazioni comuni sul DOM
 */
class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

/**
 * COMPONENTE UI: Gestisce la creazione e distruzione del Tooltip
 */
class Tooltip {
  constructor(itemId, closeNotifier) {
    const projectItemElement = document.getElementById(itemId);
    this.extraInfo = projectItemElement.dataset.extraInfo;
    this.closeNotifier = closeNotifier; // Callback per avvisare il ProjectItem della chiusura
  }

  // Definisce lo stile e crea l'elemento nel DOM
  styleToolTip() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";

    // Applichiamo gli stili base
    Object.assign(toolTipElement.style, {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "15px",
      cursor: "pointer",
    });

    this.element = toolTipElement;
    return toolTipElement;
  }

  // Rimuove l'elemento e resetta lo stato nel genitore
  detach() {
    if (this.element) {
      this.element.remove();
      this.closeNotifier();
    }
  }

  // Assembla e mostra il tooltip dopo l'header
  showToolTip() {
    const styledToolTip = this.styleToolTip();
    const header = document.querySelector("header");
    styledToolTip.textContent = this.extraInfo;

    header.insertAdjacentElement("afterend", styledToolTip);

    // Chiudiamo il tooltip se l'utente ci clicca sopra direttamente
    styledToolTip.addEventListener("click", this.detach.bind(this));
  }
}

/**
 * CONTROLLER: Gestisce la logica del singolo progetto (Bottoni e Stato)
 */
class ProjectItem {
  hasTooltip = false; // Stato interno per il toggle del tooltip

  constructor(id, updateProjectListFunction) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectMoreInfoBtn();
    this.connectSwitchBtn();
  }

  // Logica Toggle: se esiste lo chiude, altrimenti lo crea
  showMoreInfoHandler() {
    if (this.hasTooltip) {
      this.tooltipInstance.detach();
    } else {
      this.tooltipInstance = new Tooltip(this.id, () => {
        this.hasTooltip = false; // Reset dello stato quando il tooltip viene rimosso
      });
      this.tooltipInstance.showToolTip();
      this.hasTooltip = true;
    }
  }

  // Collega il bottone "More Info"
  connectMoreInfoBtn() {
    const projectItemElement = document.getElementById(this.id);
    const moreBtn = projectItemElement.querySelector(`.alt`);
    moreBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  // Aggiorna la funzione di switch quando l'elemento cambia lista
  update(updateProjectListFn, type) {
    this.updateProjectListHandler = updateProjectListFn;
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
  }

  // Collega il bottone di spostamento (Activate/Finish)
  connectSwitchBtn() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector(`button:last-of-type`);
    switchBtn.addEventListener("click", () => {
      this.updateProjectListHandler(this.id);
    });
  }
}

/**
 * MANAGER: Gestisce l'insieme dei progetti in una colonna
 */
class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    // Troviamo la sezione intera (l'elemento <section>)
    this.section = document.getElementById(`${type}-projects`);
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    this.createNewItems(prjItems);
    // Controllo iniziale: se la lista è vuota all'avvio, sparisce subito
    this.updateVisibility();
  }
  // Mostra la lista oppure nascondila
  updateVisibility() {
    if (this.projects.length === 0) {
      this.section.style.display = "none";
    } else {
      this.section.style.display = "block";
    }
  }

  // Riceve la funzione da chiamare per spostare il progetto all'altra lista
  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  // Inizializza i ProjectItem per ogni <li> trovato
  createNewItems(prjItems) {
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this)),
      );
    }
  }

  // Aggiunge un progetto esistente a questa lista
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
    // Quando aggiungiamo un progetto, assicuriamoci che la sezione sia visibile
    this.updateVisibility();
  }

  // Rimuove il progetto da questa lista e lo "passa" all'altra
  switchProject(projectId) {
    const projectToMove = this.projects.find((item) => item.id === projectId);
    this.switchHandler(projectToMove);
    this.projects = this.projects.filter((item) => item.id !== projectId);
    // Quando togliamo un progetto, controlliamo se la lista è diventata vuota
    this.updateVisibility();
  }
}

/**
 * ORCHESTRATORE: Avvia l'applicazione
 */
class App {
  static init() {
    const activeProjects = new ProjectList("active");
    const finishedProjects = new ProjectList("finished");

    // "Colleghiamo" le due liste: quando una finisce, passa il progetto all'altra
    activeProjects.setSwitchHandlerFunction(
      finishedProjects.addProject.bind(finishedProjects),
    );
    finishedProjects.setSwitchHandlerFunction(
      activeProjects.setSwitchHandlerFunction.bind(activeProjects),
    );

    // Correzione al volo: il secondo deve puntare ad addProject
    finishedProjects.setSwitchHandlerFunction(
      activeProjects.addProject.bind(activeProjects),
    );
  }
}

App.init();
