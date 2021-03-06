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

  console.log(this.yeoman);

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
	this.mkdir('demo');
	this.mkdir('demo/styles');
	this.mkdir('demo/js');
	this.mkdir('src');

	this.template('index.html','demo/index.html');
	this.template('template.js','demo/js/'+this.name.toLowerCase()+'.js');
	this.template('styles.scss','demo/styles/'+ this.name.toLowerCase()+'.scss');
	this.template('styles.scss','demo/styles/main.scss');
	this.template('styles.scss','demo/styles/'+this.name.toLowerCase()+'.css');
	this.template('styles.scss','demo/styles/main.css');

	//this.copy('template.js', this.name+'.js');
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
	this.template('gitignore', '.gitignore');
  this.template('Gruntfile.js', 'Gruntfile.js');
	this.template('README.md', 'README.md');
};

JsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('bowerrc', '.bowerrc');
  this.copy('jshintrc', '.jshintrc');
};
