app.controller('TodoCtrl', function($scope, $http, $location){

// TOGGLE BETWEEN TO-DO TASKS AND ACCOMPLISHED TASKS
    $scope.todoDisplay = true
    $scope.doneDisplay = false

    $scope.switchtodoTable = function(){
        $scope.todoDisplay = !$scope.todoDisplay;
        $scope.doneDisplay = false;
    }

    $scope.switchDoneTable = function(){
        $scope.doneDisplay = !$scope.doneDisplay;
        $scope.todoDisplay = false;
    }

    $scope.isDone = function(task){
        var isDone;
        if (task.done == '0'){
            isDone = true;
        } else {
            isDone = false;
        }
        return isDone
    }

////////////////////////////
// CRUD TASKS
////////////////////////////
$scope.tasks;
$scope.newTask={};
$scope.newTask.date = new Date();
$scope.editTask={};

// fetch all tasks
$scope.getTasks = function(){
    $http.get('http://localhost:8000/tasks')
        .then(function (response) {
            $scope.tasks = response.data.data
        });
}
$scope.getTasks();

// fetch a task
$scope.getTask = function(task){
    $http.get('http://localhost:8000/tasks/' + task.id)
        .then(function(response){
            $scope.editTask = response.data.data
        }, function(response){
            console.log(response);
        })
}

// add a task
$scope.addTask = function(){
    $http.post('http://localhost:8000/tasks', this.newTask)
        .then(function(response){
            $scope.newTask.date = new Date();
            this.newTask={}
            $scope.getTasks();
            $location.path('/')
        })
}

// delete a task
$scope.deleteTask = function(id){
    $http.delete('http://localhost:8000/tasks/' + id)
        .then(function(response){
            $scope.getTasks();
        })
}

// update 'done' status
$scope.taskDone = function(task, isdone){
    var done = { done : isdone}
    $http.put('http://localhost:8000/tasks/done/' + task.id, done)
        .then(function(response){
            $scope.getTasks();
        }, function(response){
            console.log(response);
        })
}

// update a task
$scope.updateTask = function(task){
    $http.put('http://localhost:8000/tasks/' + task.id, $scope.editTask)
        .then(function(response){
            $scope.editTask.date = new Date();
            $scope.editTask={}
            $scope.getTasks();
            $location.path('/')
        }, function(response){
            console.log(response);
        })
}

//////////////////////////////////////////
// CRUD IMPORTANCE
//////////////////////////////////////////
$scope.importances;
$scope.editImp={};

// fetch all importances
$scope.getImps = function(){
    $http.get('http://localhost:8000/importance')
        .then(function (response) {
            $scope.importances = response.data.data
        });
}
$scope.getImps();

// fetch an importance
$scope.getImp = function(imp){
    console.log(imp.id);
    $http.get('http://localhost:8000/importance/' + imp.id)
        .then(function(response){
            $scope.editImp = response.data.data
        }, function(response){
            console.log(response);
        })
}

// add an importance
$scope.addImp = function(){
    $http.post('http://localhost:8000/importance', this.newImp)
        .then(function(response){
            this.newImp={}
            $scope.getImps();
            $location.path('/importance')
        }, function(response){
            console.log(response);
        })
}

// delete an importance
$scope.deleteImp = function(id){
    $http.delete('http://localhost:8000/importance/' + id)
        .then(function(response){
            $scope.getImps();
        })
}

// update an importance
$scope.updateImp = function(imp){
    console.log($scope.editImp)
    $http.put('http://localhost:8000/importance/' + imp.id, $scope.editImp)
        .then(function(response){
            $scope.editImp={}
            $scope.getImps();
            $location.path('/importance')
        }, function(response){
            console.log(response);
        })
}


});
