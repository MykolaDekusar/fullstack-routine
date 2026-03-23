class Tooltip {
  constructor() {
    this.buttonClass = document.querySelectorAll(".alt");
  }

  addEventListenerToButtons() {
    console.log(this.buttonClass);
    this.buttonClass.forEach((button) => {
      button.addEventListener("click", (event) => {
        //trovo il li piu vicino al bottone
        const projectLi = event.target.closest("li");
        // Al click del bottone MoreInfo mi deve comparire un alert con i dettagli
        const extraInfo = projectLi.dataset.extraInfo;
        alert(extraInfo);
      });
    });
  }
}

class ProjectItem {
  constructor() {
    this.buttonClass = document.querySelectorAll("button:last-child");
  }
  switchProjectHandler() {
    this.buttonClass.forEach((button) => {
      button.addEventListener("click", (event) => {
        const projectLi = event.target.closest("li");
        // 2. Controllo dove si trova ora per decidere dove mandarlo
        const isCurrentlyActive = projectLi.closest("#active-projects");
        const targetListSelector = isCurrentlyActive
          ? "#finished-projects ul"
          : "#active-projects ul";
        const targetUl = document.querySelector(targetListSelector);
        // 3. Lo sposto fisicamente (appendChild lo muove, non lo duplica!)
        targetUl.appendChild(projectLi);
        // 4. Cambio il testo del bottone per coerenza
        event.target.textContent = isCurrentlyActive ? "Activate" : "Finish";
        this.checkList();
      });
    });
  }

  checkList() {
    // Selezioniamo i contenitori (le sezioni)
    const activeSection = document.getElementById("active-projects");
    const finishedSection = document.getElementById("finished-projects");

    // Selezioniamo le liste UL dentro le sezioni
    const activeList = activeSection.querySelector("ul");
    const finishedList = finishedSection.querySelector("ul");

    // Controlliamo quanti figli (LI) hanno le liste
    // Se children.length è 0, la lista è vuota
    if (activeList.children.length === 0) {
      activeSection.style.display = "none";
    } else {
      activeSection.style.display = "block";
    }

    if (finishedList.children.length === 0) {
      finishedSection.style.display = "none";
    } else {
      finishedSection.style.display = "block";
    }
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
