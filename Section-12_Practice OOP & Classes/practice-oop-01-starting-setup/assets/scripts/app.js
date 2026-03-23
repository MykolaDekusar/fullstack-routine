// Al click del bottone MoreInfo mi deve comparire un alert con i dettagli
class ProjectList {
  getProjects() {
    // querySelectorAll restituisce una NodeList, che è più simile a un array
    const activeLis = document.querySelectorAll("#active-projects li");
    const finishedLis = document.querySelectorAll("#finished-projects li");

    // Trasformiamo la NodeList in un vero Array e assegniamo
    this.activeProjects = Array.from(activeLis);
    this.finishedProjects = Array.from(finishedLis);
    console.log(this.activeProjects, this.finishedProjects);
    return {active: this.activeProjects, finished: this.finishedProjects}
  }
}

class Tooltip extends ProjectList {
  constructor(){
    super();
     this.buttonClass = document.querySelectorAll(".alt");
  }
 
  addEventListenerToButtons() {
    console.log(this.buttonClass);
    this.buttonClass.forEach((button) => {
      button.addEventListener("click", (event) => {
        //trovo il li piu vicino al bottone
        const projectLi = event.target.closest('li');
        const extraInfo = projectLi.dataset.extraInfo;
        alert(extraInfo);
      });
    });
  }
}

class ProjectItem extends ProjectList{
  constructor(){
    super();
    this.buttonClass = document.querySelectorAll("button:last-child");
  }
  switchProjectHandler(){
    this.buttonClass.forEach((button) => {
      button.addEventListener('click', (event) => {
        const projectLi = event.target.closest('li');
        // 2. Controllo dove si trova ora per decidere dove mandarlo
        const isCurrentlyActive = projectLi.closest('#active-projects');
        const targetListSelector = isCurrentlyActive ? '#finished-projects ul' : '#active-projects ul';
        const targetUl = document.querySelector(targetListSelector);

        // 3. Lo sposto fisicamente (appendChild lo muove, non lo duplica!)
        targetUl.appendChild(projectLi);

        // 4. Cambio il testo del bottone per coerenza
        event.target.textContent = isCurrentlyActive ? 'Activate' : 'Finish';
      })
      
    })
  }
}

class App {
  static init() {
    const toolTip = new Tooltip();
    toolTip.addEventListenerToButtons();
    const projectItem = new ProjectItem();
    projectItem.switchProjectHandler();
  }
}

App.init();

