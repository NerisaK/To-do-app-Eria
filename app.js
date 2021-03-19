const app = new Vue({
  el: "#app",
  data: {
    newTaskID: "",
    taskName: "",
    taskType: "",
    day: "",
    fromTime: "",
    toTime: "",
    tasks:[],
    currentSort:'date',
    currentSortDirection:'asc',
    pageSize: 5,
    currentPage: 1,
  },
  mounted() {
    this.loadTasks();
  },
  watch: {
    tasks: function() {
      this.setNewID();
      this.loadTasks();
    },
  },
  methods: {
    async loadTasks(){
      await fetch('https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/get-api?secret=gettask', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => {this.tasks = res})
      .catch(error => console.log('error', error)
    )},
    highestTaskID (){
      let maxID = 0;          
        for (let i = 0; i < this.tasks.length; i++){
          let thisID = parseInt(this.tasks[i].id);
          if (thisID > maxID) {maxID = thisID}
        }
      return maxID;
    },
    setNewID() {
      if(this.tasks.length !== 0){        
        this.newTaskID = this.highestTaskID() + 1;
      }
      else {this.newTaskID = 0;}
    },
    inputToString(){
      const newTask = `{
        \"id\": \"${this.newTaskID}\", 
        \"text\": \"${this.taskName}\", 
        \"type\": \"${this.taskType}\", 
        \"date\": \"${this.day}\", 
        \"fromT\": \"${this.fromTime}\", 
        \"toT\": \"${this.toTime}\"}`;
      return newTask;
    },    
    clearForm(){
      this.taskName = "";
      this.taskType = "";
      this.day = "";
      this.fromTime = "";
      this.toTime = "";
    },
    async addTask() {      
      await fetch("https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/post-api?secret=posttask", {
        method: 'POST', body: this.inputToString(),
      })
        .then(response => response.text())
        .then(result => console.log(result))
        .then(this.clearForm())
        .catch(error => console.log('error', error)
      );      
    },
    async removeTask(task){
      const taskID = parseInt(task.id);
      const url = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/todo-application-kovqq/service/tasksapi/incoming_webhook/delete-api?secret=deletetask&command=delete&id=";
      if(taskID !== NaN){
        await fetch(url + taskID)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)
      )};
    },
    sortTable(sortType) {
      if(sortType === this.currentSort) {
        this.currentSortDirection = this.currentSortDirection==='asc'?'desc':'asc';
      }
      this.currentSort = sortType;
    },
    nextPage: function() {
      if((this.currentPage*this.pageSize) < this.tasks.length){
        this.currentPage++;
      };        
    },
    prevPage: function() {
      if(this.currentPage > 1){
        this.currentPage--;
      };        
    },
  },
  computed: {
    sortedTasks: function() {
      return this.tasks.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDirection === 'desc') modifier = -1;
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
      if (this.tasks.length % this.pageSize !== 0){
        return Math.ceil(this.tasks.length / this.pageSize);
      }
      else {
        return this.tasks.length / this.pageSize
      };
    },
  },
});

