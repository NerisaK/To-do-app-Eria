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
    pageSize: 5,
    currentPage: 1,    
    tasks:[],
  },
  mounted() {
    fetch('https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/get-api?secret=gettask')
    .then(res => res.json())
    .then(res => {this.tasks = res;})  
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
    },
    nextPage: function() {
      if((this.currentPage*this.pageSize) < this.tasks.length) this.currentPage++;
    },
    prevPage: function() {
      if(this.currentPage > 1) this.currentPage--;
    },
  },
  computed: {
    sortedTasks: function() {
      return this.tasks.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    },
    lastPage: function() {return Math.ceil(this.tasks.length/ 5)},
  },
});