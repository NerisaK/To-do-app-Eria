const app = new Vue({
  el: "#app",
  data: {
    taskName: "",
    taskType: "",
    day: "",
    fromTime: "",
    toTime: "",
    currentID: "",
    currentSort:'date',
    currentSortDir:'asc',
    pageSize: 5,
    currentPage: 1,
    tasks:[],
  },
  mounted() {
    this.showData();
  },
  methods: {
    async showData(){
      await fetch('https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/get-api?secret=gettask')
      .then(res => res.json())
      .then(res => {this.tasks = res})
    },
    findHighestID() {
      if(this.tasks.length !== 0){
      let max = parseInt(this.tasks[0].id);          
      for (let i = 1; i < this.tasks.length; i++){
        let value = parseInt(this.tasks[i].id);
        if (value > max) {max = value}
      }
      this.currentID = max + 1;
    }
    else {this.currentID = 0;}
    },
    async addTask() {
      this.findHighestID();      
      const data = `{\"id\": \"${this.currentID}\", \"text\": \"${this.taskName}\", \"type\": \"${this.taskType}\", \"date\": \"${this.day}\", \"fromT\": \"${this.fromTime}\", \"toT\": \"${this.toTime}\"}`;      
      await fetch("https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/post-api2?secret=postapi", {method: 'POST', body: data})
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)
      );
      this.showData();          
      this.findHighestID();
      this.taskName = "";
      this.taskType = "";
      this.day = "";
      this.fromTime = "";
      this.toTime = "";
    },
    async removeTask(task){
      const taskID = parseInt(task.id);
      const str = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/dbapi?secret=156hu5&command=delete&id=" + taskID;
      if(taskID !== NaN){
        await fetch(str)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)
      )};
      this.showData();          
      this.findHighestID();
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
    lastPage: function() {
      if (this.tasks.length % 5 !== 0){return Math.ceil(this.tasks.length/ 5) + 1}
      else {return Math.ceil(this.tasks.length/ 5)};
    },
  },
});

