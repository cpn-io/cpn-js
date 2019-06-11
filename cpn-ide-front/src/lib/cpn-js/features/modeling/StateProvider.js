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
}

StateProvider.prototype.setReadyState = function (ready, append = false) {
  let l = [];
  if (append) {
    l = this._ready;
  }
  for (const id in ready) {
    l[id] = ready[id];
  }
  this._ready = l;
}
StateProvider.prototype.setWarningState = function (warnings, append = false) {
  let l = [];
  if (append) {
    l = this._warnings;
  }
  for (const id in warnings) {
    l[id] = warnings[id];
  }
  this._warnings = l;
}
StateProvider.prototype.setErrorState = function (errors, append = false) {
  let l = [];
  if (append) {
    l = this._errors;
  }
  for (const id in errors) {
    l[id] = errors[id];
  }
  this._errors = l;
}

StateProvider.prototype.getReadyState = function (id) {
  return (id in this._ready) || (this._ready instanceof Array && this._ready.includes(id));
}
StateProvider.prototype.getWarningState = function (id) {
  return (id in this._warnings) || (this._warnings instanceof Array && this._warnings.includes(id));
}
StateProvider.prototype.getErrorState = function (id) {
  return (id in this._errors) || (this._errors instanceof Array && this._errors.includes(id));
}

StateProvider.prototype.getReadyText = function (id) {
  return getIssueText(this._ready, id);
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
