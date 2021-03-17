const app = new Vue({
  el: "#app",
  data: {
    taskName: "",
    taskType: "",
    day: "",
    fromTime: "",
    toTime: "",
    currentSort:'date',
    currentSortDir:'asc',
    tasks:[
      {
        text: "První úkol (můžeš mě smazat)",
        type: "Jiné",
        date: "2021-03-16",
        fromT: "12:20",
        toT: "15:10",
      },
      {
        text: "Druhý úkol",
        type: "Jiné",
        date: "2021-03-19",
        fromT: "12:20",
        toT: "15:10",
      },
      {
        text: "Třetí úkol",
        type: "Jiné",
        date: "2021-03-17",
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
      this.day = "";
      this.fromTime = "";
      this.toTime = "";
    },
    removeTask(task){
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);
    },
    sort(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
  },
  computed: {
    sortedTasks: function() {
      return this.tasks.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  }
});