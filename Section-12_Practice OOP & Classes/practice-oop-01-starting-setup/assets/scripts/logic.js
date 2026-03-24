class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Tooltip {
  constructor(itemId) {
    this.extraInfo = itemId.dataset.extraInfo;
  }

  styleToolTip() {
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";
    toolTipElement.style.textAlign = "center";
    // Flexbox per centrare il contenuto
    toolTipElement.style.display = "flex";
    toolTipElement.style.justifyContent = "center"; // Centra orizzontalmente
    toolTipElement.style.alignItems = "center"; // Centra verticalmente
    toolTipElement.style.marginTop = "15px"; // Centra verticalmente
    return toolTipElement;
  }

  detach(id){
    id.srcElement.remove();
    console.log(id.srcElement);
  }

  showToolTip() {
    const header = document.querySelector("header");
    const styledToolTip = this.styleToolTip();
    styledToolTip.addEventListener('click', this.detach.bind(this));
    styledToolTip.textContent = this.extraInfo;
    header.insertAdjacentElement("afterend", styledToolTip);
  }
}

class ProjectItem {
  // Ricordiamoci che creiamo una nuova classe per ogni elemento grazie al ciclo
  // for di ProjectList
  constructor(id, updateProjectListFunction) {
    this.updateProjectListHandler = updateProjectListFunction;
    this.id = id;
    this.connectMoreInfoBtn();
    this.connectSwitchBtn();
  }

  showMoreInfoHandler(itemId) {
    const tooltip = new Tooltip(itemId);
    //Estraiamo l'info dal dataset
    //alert(itemId.dataset.extraInfo);
    tooltip.showToolTip();
  }

  connectMoreInfoBtn() {
    // Usando l'id ricevuto andiamo a pescare il singolo elemento
    const projectItemElement = document.getElementById(this.id);
    const moreBtn = projectItemElement.querySelector(`.alt`);
    moreBtn.addEventListener("click", () => {
      this.showMoreInfoHandler(projectItemElement);
    });
  }
  connectSwitchBtn() {
    // Usando l'id ricevuto andiamo a pescare il singolo elemento
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector(`button:last-of-type`);
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id),
    );
  }
}
class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    // CSS selector for all list items depending on type
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    console.log(prjItems);
    this.createNewItems(prjItems);
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
    console.log(this.projects);
  }

  // Creiamo funzioni per effettuare lo switch dei progetti
  addProject(project) {
    this.projects.push(project);
    console.log(this.projects);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this));
  }

  switchProject(projectId) {
    // Primo modo dove andiamo a trovare l'id e usiamo splice per togliere un elemento
    // const projectIndex = this.projects.findIndex(item => item.id === projectId)
    // this.projects.splice(projectIndex, 1);
    // Oppure andiamo a filtrare tutti i progetti dove se l'id è diverso lo aggiungiamo
    // Alla lista
    this.switchHandler(this.projects.find((item) => item.id === projectId));
    this.projects = this.projects.filter((item) => item.id !== projectId);
    console.log(this.projects);
  }
}

class App {
  static init() {
    const activeProjects = new ProjectList("active");
    const finishedProjects = new ProjectList("finished");
    activeProjects.setSwitchHandlerFunction(
      finishedProjects.addProject.bind(finishedProjects),
    );
    finishedProjects.setSwitchHandlerFunction(
      activeProjects.addProject.bind(activeProjects),
    );
  }
}

App.init();
