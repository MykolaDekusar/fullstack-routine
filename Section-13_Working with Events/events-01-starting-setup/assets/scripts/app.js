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
 * Gestisce il ciclo di vita e il posizionamento "sticky"
 */
class Tooltip {
  constructor(hostElement, closeNotifier, text) {
    this.hostElement = hostElement; // Salviamo il riferimento al bottone cliccato
    this.text = text;
    this.closeNotifier = closeNotifier;
  }

  styleToolTip() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";

    // Applichiamo gli stili per renderlo Sticky e posizionarlo
    Object.assign(toolTipElement.style, {
      position: "absolute",
      zIndex: "100",
      cursor: "pointer",
      padding: "1rem",
      backgroundColor: "rgb(246, 213, 255)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      borderRadius: "8px",
    });

    this.element = toolTipElement;
    return toolTipElement;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      this.closeNotifier();
    }
  }

  showToolTip() {
    const styledToolTip = this.styleToolTip();
    styledToolTip.textContent = this.text;

    // Troviamo il bottone dentro il progetto per capire dove farlo apparire
    const btn = this.hostElement.querySelector(".alt");

    // Calcoliamo la posizione: "Sotto il bottone"
    // Usiamo offsetTop e offsetHeight che sono riferiti al genitore relativo
    const y = btn.offsetTop + btn.offsetHeight + 10;

    styledToolTip.style.top = y + "px";

    // AGGIUNTA FONDAMENTALE: Lo appendiamo dentro il ProjectItem (hostElement)
    this.hostElement.append(styledToolTip);

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
    // Prepariamo il CSS del <li> affinché faccia da "ancora"
    const projectItemElement = document.getElementById(this.id);
    projectItemElement.style.position = "relative";
    this.connectMoreInfoBtn();
    this.connectSwitchBtn();
    this.connectDrag();
  }

  // Logica Toggle: gestisce l'apertura/chiusura intelligente
  showMoreInfoHandler() {
    if (this.hasTooltip) {
      this.tooltipInstance.detach();
    } else {
      const projectItemElement = document.getElementById(this.id);
      const text = projectItemElement.dataset.extraInfo;

      // Passiamo l'intero elemento della lista (projectItemElement)
      this.tooltipInstance = new Tooltip(
        projectItemElement,
        () => {
          this.hasTooltip = false;
        },
        text,
      );

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
    //Carichiamo eventuali dati dal LocalStorage all'avvio
    this.loadFromStorage();
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    this.createNewItems(prjItems);
    this.updateVisibility();
    this.connectDroppable();
  }
  // Metodo per salvare lo stato attuale di questa lista
  saveToStorage() {
    const data = [];
    for (const prj of this.projects) {
      const el = document.getElementById(prj.id);
      data.push({
        id: prj.id,
        title: el.querySelector("h2").textContent,
        description: el.querySelector("p").textContent,
        extraInfo: el.dataset.extraInfo,
      });
    }
    localStorage.setItem(`${this.type}Projects`, JSON.stringify(data));
  }

  // Metodo per iniettare nel DOM i dati salvati prima di creare i ProjectItem
  loadFromStorage() {
    const storedData = localStorage.getItem(`${this.type}Projects`);
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);
    const list = this.section.querySelector("ul");
    list.innerHTML = ""; // Puliamo l'HTML statico per far spazio ai dati salvati

    for (const prj of parsedData) {
      const li = document.createElement("li");
      li.id = prj.id;
      li.className = "card";
      li.draggable = true;
      li.dataset.extraInfo = prj.extraInfo;
      li.innerHTML = `
        <h2>${prj.title}</h2>
        <p>${prj.description}</p>
        <button class="alt">More Info</button>
        <button>${this.type === "active" ? "Finish" : "Activate"}</button>
      `;
      list.append(li);
    }
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
    // SALVA dopo l'aggiunta
    this.saveToStorage();
  }

  switchProject(projectId) {
    const projectToMove = this.projects.find((item) => item.id === projectId);

    // Eseguiamo lo switch tramite la funzione collegata in App.init
    this.switchHandler(projectToMove);

    // Rimuoviamo il progetto dalla lista attuale (immutabilità simulata)
    this.projects = this.projects.filter((item) => item.id !== projectId);
    this.updateVisibility();
    // SALVA dopo la rimozione (lo switch salverà automaticamente nell'altra lista via addProject)
    this.saveToStorage();
  }
}

class ProjectInput {
  constructor(activeList) {
    this.activeList = activeList;

    // Elementi del DOM
    this.formContainer = document.getElementById("form-container");
    this.openBtn = document.getElementById("open-form-btn");
    this.cancelBtn = document.getElementById("cancel-form-btn");
    this.form = document.getElementById("new-project-form");

    // Input fields
    this.titleInput = document.getElementById("title");
    this.descInput = document.getElementById("description");
    this.extraInput = document.getElementById("extra");

    // Event Listeners
    this.openBtn.addEventListener("click", this.toggleForm.bind(this));
    this.cancelBtn.addEventListener("click", this.toggleForm.bind(this));
    this.form.addEventListener("submit", this.submitHandler.bind(this));
  }

  toggleForm() {
    // Switchiamo la visibilità tra bottone "Add" e il Form completo
    this.formContainer.classList.toggle("hidden");
    this.openBtn.classList.toggle("hidden");

    // Se stiamo aprendo il form, diamo subito il focus al titolo
    if (!this.formContainer.classList.contains("hidden")) {
      this.titleInput.focus();
    }
  }

  submitHandler(event) {
    event.preventDefault();

    const title = this.titleInput.value;
    const description = this.descInput.value;
    const extra = this.extraInput.value;

    const id = "p" + Date.now();

    const newPrjElement = document.createElement("li");
    newPrjElement.id = id;
    newPrjElement.className = "card";
    newPrjElement.draggable = true;
    newPrjElement.dataset.extraInfo = extra;
    newPrjElement.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
      <button class="alt">More Info</button>
      <button>Finish</button>
    `;

    document.querySelector(`#active-projects ul`).append(newPrjElement);

    const newProjectItem = new ProjectItem(
      id,
      this.activeList.switchProject.bind(this.activeList),
    );
    this.activeList.projects.push(newProjectItem);
    this.activeList.updateVisibility();
    this.activeList.saveToStorage();
    // Puliamo e CHIUDIAMO il form dopo l'invio
    this.form.reset();
    this.toggleForm();
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
    // INIZIALIZZA IL FORM DI INPUT
    new ProjectInput(activeProjects);
  }
}

// Start!
App.init();
