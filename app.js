var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('knex')({
        client: 'mysql',
        connection: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'shoe0nhead',
            database : 'todo-list',
            charset  : 'utf8'
        }
    });
var Bookshelf = require('bookshelf')(knex);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


/////////////////////////////////////////////////////////////
///////////////////////// MODELS/////////////////////
//////////////////////////////////////////////////////////////

// Task model
var  Task = Bookshelf.Model.extend({
    tableName: 'tasks',
    importance: function() {
        return this.belongsTo(Importance, 'niveaux_importance_id');
    },
});

// Importance model
var Importance = Bookshelf.Model.extend({
    tableName: 'niveaux_importance'
});

/////////////////////////////////////////////////////////////
///////////////////////// COLLECTIONS////////////
//////////////////////////////////////////////////////////////
var Tasks = Bookshelf.Collection.extend({
  model: Task
});
var Importances = Bookshelf.Collection.extend({
  model: Importance
});

/////////////////////////////////////////////////////////////
///////////////////////// ROUTING/////////////////////
//////////////////////////////////////////////////////////////

// fetch all tasks
app.get( '/tasks', function(req, res) {
    Tasks.forge()
    .fetch({withRelated: ['importance']})
    .then(function(collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

// add a new task
app.post('/tasks', function(req, res) {
    Task.forge({
        name: req.body.name,
        date: req.body.date,
        niveaux_importance_id: req.body.importance.id,
        details: req.body.details,
        done: 0
    })
    .save()
    .then(function(task) {
      res.json({error: false, data: {id: task.get('id')}});
    })
    .catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

// delete a task
app.delete( '/tasks/:id', function(req, res) {
    Task.forge({id: req.params.id})
    .fetch({require: true})
    .then(function(task) {
      task.destroy()
      .then(function() {
        res.json({error: false, data: {message: 'User successfully deleted'}});
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

 // fetch a task
 app.get( '/tasks/:id', function (req, res) {
    Task.forge({id: req.params.id})
    .fetch({withRelated: ['importance']})
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: user.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })

// update if the task is done
app.put('/tasks/done/:id', function(req, res) {
  Task.forge({id: req.params.id})
  .fetch({require: true})
  .then(function(task) {
    task.save({
        name: task.get('name'),
        date: task.get('date'),
        niveaux_importance_id: task.get('niveaux_importance_id'),
        details: task.get('details'),
        done: req.body.done
    })
    .then(function() {
      res.json({error: false, data: {message: 'Task done'}});
    })
    .catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  .catch(function(err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})

// update task
app.put('/tasks/:id', function (req, res) {
    Task.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (task) {
      task.save({
          name: req.body.name || task.get('name'),
          date: req.body.date || task.get('date'),
          niveaux_importance_id: req.body.importance.id || task.get('niveaux_importance_id'),
          details: req.body.details || task.get('details'),
          done: task.get('done')
      })
      .then(function () {
        res.json({error: false, data: {message: 'task details updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })

  // fetch all importance levels
  app.get( '/importance', function(req, res) {
      Importances.forge()
      .fetch()
      .then(function(collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });

  // fetch an importance level
  app.get( '/importance/:id', function (req, res) {
     Importance.forge({id: req.params.id})
     .fetch()
     .then(function (importance) {
       if (!importance) {
         res.status(404).json({error: true, data: {}});
       }
       else {
         res.json({error: false, data: importance.toJSON()});
       }
     })
     .catch(function (err) {
       res.status(500).json({error: true, data: {message: err.message}});
     });
   })

   // add a new importance level
   app.post('/importance', function(req, res) {
       Importance.forge({
           importance: req.body.importance,
           weight: req.body.weight
       })
       .save()
       .then(function(importance) {
         res.json({error: false, data: {id: importance.get('id')}});
       })
       .catch(function(err) {
         res.status(500).json({error: true, data: {message: err.message}});
       });
     });

     // delete an importance level
     app.delete( '/importance/:id', function(req, res) {
         Importance.forge({id: req.params.id})
         .fetch({require: true})
         .then(function(importance) {
           importance.destroy()
           .then(function() {
             res.json({error: false, data: {message: 'Importance level successfully deleted'}});
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
         })
         .catch(function(err) {
           res.status(500).json({error: true, data: {message: err.message}});
         });
     });

     // update importance level
     app.put('/importance/:id', function (req, res) {
         console.log(req.body);
         Importance.forge({id: req.params.id})
         .fetch({require: true})
         .then(function (imp) {
           imp.save({
               importance: req.body.importance || imp.get('importance'),
               weight: req.body.weight || imp.get('weight')
           })
           .then(function () {
             res.json({error: false, data: {message: 'importance level details updated'}});
           })
           .catch(function (err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
         })
         .catch(function (err) {
           res.status(500).json({error: true, data: {message: err.message}});
         });
       })


app.use(function(req, res, next){
      res.setHeader('Content-Type', 'text/plain');
      res.send(404, 'Page introuvable !');
});

app.listen(8000);
