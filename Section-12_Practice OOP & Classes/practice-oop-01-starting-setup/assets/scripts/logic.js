class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    // CSS selector for all list items depending on type
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    console.log(prjItems);
    for (const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id));
    }
  }
}

class App {
  static init() {
    const activeProjects = new ProjectList("active");
    const finishedProjects = new ProjectList("finished");
  }
}

App.init();
