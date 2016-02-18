angular.module('hochzeitstimer.controllers', [])

.controller('DashCtrl', function($scope, $interval) {
    var getTime = function(){return new Date().getTime()},
        finalTermin = new Date(2016,6,16,15,30,0).getTime(),
        zwischenTermin = new Date(2016,6,9,16,0,0).getTime(),
        getClockObj = function(time){
          var d = Math.floor(time/(1000*60*60*24)),
              h = Math.floor((time/(1000*60*60))%24)+1,
              m = Math.floor((time/(1000*60))%60)+1,
              s = Math.floor((time/1000)%60)+1;
          return {days: d, hours: h, minutes: m, seconds: s};
        };
        
        $interval(function(){
          var now = getTime(),
              diffToZwischen = zwischenTermin - now,
              diffToFinal = finalTermin - now;
             
          $scope.time = now;
          $scope.diffToZwischen = getClockObj(diffToZwischen);
          $scope.diffToFinal = getClockObj(diffToFinal);
          
        },999);
        
})

.controller('todoCtrl', function($scope, todoService) {

  $scope.newTodo = {
    title : "",
    body : ""
  }
  $scope.todos = todoService.getAll();
  $scope.remove = function(item) {
    todoService.remove(item);
  };
  $scope.toggleDone = function(){
    this.todo.done = !this.todo.done;
    todoService.toggleDone(this.todo.id);
  };
  $scope.add = function(todoForm){
    var newTodo = {
      title : todoForm.title,
      body : todoForm.body,
      time : new Date().getTime(),
      done : false
    }
    todoService.add(newTodo);
  };
})


.controller('cominghomeCtrl', function($scope, comingHomeServ) {
  $scope.comingHomeObj = comingHomeServ.getComingHome;
  $scope.changeCHstate = comingHomeServ.changeComingHome;
});
