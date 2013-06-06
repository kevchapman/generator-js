'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var JsGenerator = module.exports = function JsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.testFramework = false;
  this.includeRequireJS = false;
};

util.inherits(JsGenerator, yeoman.generators.Base);

JsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'name',
    message: 'Whats the name of this project'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.name = props.name;
    //this.jsFile = this.readFileAsString(path.join(this.sourceRoot(), 'template.js'));

    cb();
  }.bind(this));
};

JsGenerator.prototype.app = function app() {
  this.mkdir('dev');
  this.mkdir('dev/styles');
  this.mkdir('dev/js');

  this.template('index.html','dev/index.html');
  this.template('template.js','dev/js/'+this.name.toLowerCase()+'.js');
  this.template('styles.scss','dev/styles/'+this.name.toLowerCase()+'.scss');
  this.template('styles.scss','dev/styles/main.scss');

  //this.copy('template.js', this.name+'.js');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.template('Gruntfile.js', 'Gruntfile.js');
};

JsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('bowerrc', '.bowerrc');
  this.copy('jshintrc', '.jshintrc');
};
