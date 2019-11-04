export default function StateProvider(elementRegistry) {
  console.log('StateProvider()');

  this._elementRegistry = elementRegistry;

  this.clear();
}

StateProvider.$inject = [
  'elementRegistry',
];

StateProvider.prototype.clear = function () {
  this._errors = {};
  this._warnings = {};
  this._ready = {};
  this._fired = {};
}

StateProvider.prototype.setReadyState = function (ready, append = false) {
  this._ready = setArray(this._ready, ready, append);
}
StateProvider.prototype.setFiredState = function (fired, append = false) {
  this._fired = setArray(this._fired, fired, append);
}
StateProvider.prototype.setWarningState = function (warnings, append = false) {
  this._warnings = setArray(this._warnings, warnings, append);
}
StateProvider.prototype.setErrorState = function (errors, append = false) {
  this._errors = setArray(this._errors, errors, append);
}

function setArray(target, source, append = false) {
  let l = [];
  if (append) {
    l = target;
  }
  for (const id in source) {
    l[id] = source[id];
  }
  target = l;
  return target;
}


StateProvider.prototype.getReadyState = function (id) {
  return (id in this._ready) || (this._ready instanceof Array && this._ready.includes(id));
}
StateProvider.prototype.getFiredState = function (id) {
  return (id in this._fired) || (this._fired instanceof Array && this._fired.includes(id));
}
StateProvider.prototype.getWarningState = function (id) {
  return (id in this._warnings) || (this._warnings instanceof Array && this._warnings.includes(id));
}
StateProvider.prototype.getErrorState = function (id) {
  return (id in this._errors) || (this._errors instanceof Array && this._errors.includes(id));
}

StateProvider.prototype.getReadyText = function (id) {
  return 'Ready'; // getIssueText(this._ready, id);
}
StateProvider.prototype.getFiredText = function (id) {
  return 'Fired'; // getIssueText(this._fired, id);
}
StateProvider.prototype.getErrorText = function (id) {
  return getIssueText(this._errors, id);
}
StateProvider.prototype.getWarningText = function (id) {
  return getIssueText(this._warnings, id);
}

function getIssueText(issues, id) {
  return issues[id];
}
