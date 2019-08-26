interface MonitorTemplate {
  typeDescription(): string;
  type(): number;
  defaultTimed(): boolean;
  defaultLogging(): boolean;
  defaultPredicate(): string;
  defaultObserver(): string;
  defaultInit(): string;
  defaultStop(): string;
}

export class DataCollectionMonitorTemplate implements MonitorTemplate {
  public type(): number { return 3; }
  public typeDescription(): string { return 'Data collection'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }

  public defaultPredicate(): string {
    return 'fun pred (bindelem) =\nlet\n  fun predBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = (length its = 1)\n'
      + '      | predBindElem _ = false\nin\n  predBindElem bindelem\nend';
  }
  public defaultObserver(): string {
    return 'fun obs (bindelem) =\nlet\n'
      + '  fun obsBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = time()-Option.valOf(ModelTime.fromString s)\n'
      + '      | obsBindElem _ = 0.0\nin\n  obsBindElem bindelem\nend';
  }
  public defaultInit(): string {
    return 'fun init () =\n  NONE';
  }
  public defaultStop(): string {
    return 'fun stop () =\n  NONE';
  }
}

export class BreakpointMonitorTemplate implements MonitorTemplate {
  public type(): number { return 1; }
  public typeDescription(): string { return 'Breakpoint'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }

  public defaultPredicate(): string {
    return 'fun pred (bindelem) =\nlet\n  fun predBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = (length its = 1)\n'
      + '      | predBindElem _ = false\nin\n  predBindElem bindelem\nend';
  }
  public defaultObserver(): string {
    return 'fun obs (bindelem) =\nlet\n'
      + '  fun obsBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = time()-Option.valOf(ModelTime.fromString s)\n'
      + '      | obsBindElem _ = 0.0\nin\n  obsBindElem bindelem\nend';
  }
  public defaultInit(): string {
    return 'fun init () =\n  NONE';
  }
  public defaultStop(): string {
    return 'fun stop () =\n  NONE';
  }
}

export class UserDefinedMonitorTemplate implements MonitorTemplate {
  public type(): number { return 2; }
  public typeDescription(): string { return 'User-defined'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }

  public defaultPredicate(): string {
    return 'fun pred (bindelem) =\nlet\n  fun predBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = (length its = 1)\n'
      + '      | predBindElem _ = false\nin\n  predBindElem bindelem\nend';
  }
  public defaultObserver(): string {
    return 'fun obs (bindelem) =\nlet\n'
      + '  fun obsBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = time()-Option.valOf(ModelTime.fromString s)\n'
      + '      | obsBindElem _ = 0.0\nin\n  obsBindElem bindelem\nend';
  }
  public defaultInit(): string {
    return 'fun init () =\n  NONE';
  }
  public defaultStop(): string {
    return 'fun stop () =\n  NONE';
  }
}

export class WriteInFileMonitorTemplate implements MonitorTemplate {
  public type(): number { return 4; }
  public typeDescription(): string { return 'Write-in-file'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }

  public defaultPredicate(): string {
    return 'fun pred (bindelem) =\nlet\n  fun predBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = (length its = 1)\n'
      + '      | predBindElem _ = false\nin\n  predBindElem bindelem\nend';
  }
  public defaultObserver(): string {
    return 'fun obs (bindelem) =\nlet\n'
      + '  fun obsBindElem (PAGE\'ELEMENT (1, {its,oid,s})) = time()-Option.valOf(ModelTime.fromString s)\n'
      + '      | obsBindElem _ = 0.0\nin\n  obsBindElem bindelem\nend';
  }
  public defaultInit(): string {
    return 'fun init () =\n  NONE';
  }
  public defaultStop(): string {
    return 'fun stop () =\n  NONE';
  }
}

export class MarkingSizeMonitorTemplate implements MonitorTemplate {
  public type(): number { return 0; }
  public typeDescription(): string { return 'Marking Size'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }
  public defaultPredicate(): string { return ''; }
  public defaultObserver(): string { return ''; }
  public defaultInit(): string { return ''; }
  public defaultStop(): string { return ''; }
}

export class ListLengthDataCollectionMonitorTemplate implements MonitorTemplate {
  public type(): number { return 5; }
  public typeDescription(): string { return 'List length data collection'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }
  public defaultPredicate(): string { return ''; }
  public defaultObserver(): string { return ''; }
  public defaultInit(): string { return ''; }
  public defaultStop(): string { return ''; }
}

export class CountTransitionOccurrencesMonitorTemplate implements MonitorTemplate {
  public type(): number { return 6; }
  public typeDescription(): string { return 'Count transition occurrences'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }
  public defaultPredicate(): string { return ''; }
  public defaultObserver(): string { return ''; }
  public defaultInit(): string { return ''; }
  public defaultStop(): string { return ''; }
}

export class PlaceContentBreakPointMonitorTemplate implements MonitorTemplate {
  public type(): number { return 7; }
  public typeDescription(): string { return 'Place content break point'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }
  public defaultPredicate(): string { return ''; }
  public defaultObserver(): string { return ''; }
  public defaultInit(): string { return ''; }
  public defaultStop(): string { return ''; }
}

export class TransitionEnabledBreakPointMonitorTemplate implements MonitorTemplate {
  public type(): number { return 8; }
  public typeDescription(): string { return 'Transition enabled'; }
  public defaultTimed(): boolean { return false; }
  public defaultLogging(): boolean { return true; }
  public defaultPredicate(): string { return ''; }
  public defaultObserver(): string { return ''; }
  public defaultInit(): string { return ''; }
  public defaultStop(): string { return ''; }
}
