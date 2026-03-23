class DOMHelper {
  static moveElement(elementId, newDestinationSelector){
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}


class Tooltip {}

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
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
    }
    console.log(this.projects);
  }

  // Creiamo funzioni per effettuare lo switch dei progetti
  addProject(project) {
    this.projects.push(project);
    console.log(this.projects);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
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
class ProjectItem {
  // Ricordiamoci che creiamo una nuova classe per ogni elemento grazie al ciclo
  // for di ProjectList
  constructor(id, updateProjectListFunction) {
    this.updateProjectListHandler = updateProjectListFunction;
    this.id = id;
    this.connectMoreInfoBtn();
    this.connectSwitchBtn();
  }

  connectMoreInfoBtn() {
    const projectItemElement = document.getElementById(this.id);
    const moreBtn = projectItemElement.querySelector(`.alt`);
  }
  connectSwitchBtn() {
    // Usando l'id ricevuto andiamo a pescare il singolo elemento
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector(`button:last-of-type`);
    switchBtn.addEventListener("click", this.updateProjectListHandler.bind(null, this.id));
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
