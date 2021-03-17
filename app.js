const app = new Vue({
  el: "#app",
  data: {
    taskName: "",
    taskType: "",
    day: "",
    fromTime: "",
    toTime: "",
    tasks:[
      {
        text: "První úkol (můžeš mě smazat)",
        type: "Jiné",
        date: "2021-03-16",
        fromT: "12:20",
        toT: "15:10",
      },      
    ],
  },
  methods: {
    addTask() {
      this.tasks.push({
        text: this.taskName,
        type: this.taskType,
        date: this.day,
        fromT: this.fromTime,
        toT: this.toTime,
      });
    this.taskName = "";
    this.taskType = "";
    this.fromDay = "";
    this.fromTime = "";
    this.toDay = "";
    this.toTime = "";
  },
  removeTask(task){
    const taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
  },
  },
});