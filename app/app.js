(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.Task = (function(_super) {
    __extends(Task, _super);

    function Task() {
      _ref = Task.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Task.fields("name", "done");

    Task.active = function() {
      return this.select(function(task) {
        return !task.done;
      });
    };

    Task.completed = function() {
      return this.select(function(task) {
        return !!task.done;
      });
    };

    Task.prototype.validate = function() {
      if (!this.name) {
        return "name is required";
      }
    };

    return Task;

  })(Monocle.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.Task = (function(_super) {
    __extends(Task, _super);

    Task.prototype.container = "section ul";

    Task.prototype.template = "<li>\n	<input type =\"checkbox\" {{#done}}checked {{/done}} />\n    <input type=\"text\" id=\"newname\" value=\"{{name}}\" />\n    <strong>{{name}}</strong>\n</li>";

    Task.prototype.elements = {
      "input#newname": "name"
    };

    Task.prototype.events = {
      "click input[type=checkbox]": "onClick",
      "dblclick li": "onDblClick",
      "keypress input#newname": "onKeyPress",
      "swipeLeft li": "onSwype"
    };

    function Task() {
      Task.__super__.constructor.apply(this, arguments);
      this.append(this.model);
    }

    Task.prototype.onClick = function(event) {
      return this.model.updateAttributes({
        done: !this.model.done
      });
    };

    Task.prototype.onDblClick = function(event) {
      return this.el.toggleClass("edit");
    };

    Task.prototype.onKeyPress = function(event) {
      if (event.keyCode === 13) {
        this.model.updateAttributes({
          name: this.name.val()
        });
        return this.refresh();
      }
    };

    Task.prototype.onSwype = function(event) {
      this.model.destroy();
      return this.remove();
    };

    return Task;

  })(Monocle.View);

}).call(this);

(function() {
  var Tasks,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Controller.TasksCtrl = (function(_super) {
    __extends(TasksCtrl, _super);

    TasksCtrl.prototype.events = {
      "click button#twitter": "onTwitter"
    };

    function TasksCtrl() {
      TasksCtrl.__super__.constructor.apply(this, arguments);
    }

    TasksCtrl.prototype.onTwitter = function(event) {
      return Lungo.Router.section("twitterSection");
    };

    return TasksCtrl;

  })(Monocle.Controller);

  Tasks = new __Controller.TasksCtrl("section");

}).call(this);
