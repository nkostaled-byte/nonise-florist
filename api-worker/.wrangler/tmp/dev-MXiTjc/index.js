var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// ../src/lib/payfast.ts
import { createHash } from "node:crypto";

// ../src/data/noniseData.ts
var DELIVERY = {
  flatRateZAR: 100,
  freeFromZAR: 2500
};
function deliveryFeeZAR(orderValueZAR, fulfillment) {
  if (fulfillment === "collection" || orderValueZAR >= DELIVERY.freeFromZAR) return 0;
  return DELIVERY.flatRateZAR;
}
__name(deliveryFeeZAR, "deliveryFeeZAR");
var SIGNATURE_PRODUCTS = [
  {
    id: 248,
    slug: "50-roses-with-gyp",
    name: "50 Red & White Roses with Gypsophila",
    priceZAR: 1500,
    wooCategory: "Rose Bouquets",
    specialty: "rose-bouquets",
    occasions: ["Anniversaries & Romance", "Birthdays & Parties"],
    shortDescription: "50 fresh roses styled with delicate gypsophila in signature boutique wrapping.",
    description: "An unforgettable luxury bouquet of fifty fresh-cut roses nestled in clouds of delicate white gypsophila (baby\u2019s breath), hand-tied and finished with Nonise Florist\u2019s signature wrapping and satin ribbon.",
    images: ["/assets/nonise/50-roses-with-gyp.webp"],
    altText: "Luxury 50 roses with gypsophila in signature boutique wrapping by Nonise Florist",
    includes: [
      "50 fresh long-stemmed roses",
      "Delicate white gypsophila accents",
      "Signature layered boutique wrap & ribbon",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied luxury presentation bouquet",
    inStock: true,
    featured: true,
    badgeText: "Signature Luxury"
  },
  {
    id: 244,
    slug: "red-rose-vase",
    name: "Red Rose Vase",
    priceZAR: 1500,
    wooCategory: "Vase Arrangements",
    specialty: "vase-arrangements",
    occasions: ["Anniversaries & Romance", "Corporate & Events"],
    shortDescription: "Abundant velvety red roses arranged in a clear glass vase with signature satin ribbon.",
    description: "A classic statement of timeless devotion. Abundant crimson roses arranged lushly in a clear rounded glass vase, finished with Nonise Florist\u2019s black satin monogram ribbon and crest seal.",
    images: ["/assets/nonise/red-rose-vase.webp", "/assets/nonise/home-hero-roses.webp"],
    altText: "Abundant velvety red roses in clear glass vase with satin ribbon by Nonise Florist",
    includes: [
      "Premium fresh red roses with rich foliage",
      "Clear glass keepsake vase",
      "Signature Nonise Florist satin ribbon & seal",
      "Complimentary personalised gift card"
    ],
    presentation: "Ready-to-display glass vase arrangement",
    inStock: true,
    featured: true,
    badgeText: "Vase Included"
  },
  {
    id: 242,
    slug: "roses-with-ferrero",
    name: "White Roses with Ferrero Rocher",
    priceZAR: 1200,
    wooCategory: "Rose Bouquets",
    specialty: "rose-bouquets",
    occasions: ["Anniversaries & Romance", "Birthdays & Parties"],
    shortDescription: "Fresh white roses paired with golden Ferrero Rocher chocolates in marble-trimmed wrap.",
    description: "Elegance meets indulgence. A lush ring of crisp white roses framing a bouquet centre of golden Ferrero Rocher chocolates, presented in gold-edged marble wrap for heartfelt gifting.",
    images: ["/assets/nonise/roses-with-ferrero.webp"],
    altText: "Fresh white roses with golden Ferrero Rocher chocolates in gold-edged marble wrap",
    includes: [
      "Fresh white roses arranged in a full dome",
      "Golden Ferrero Rocher chocolate centrepiece",
      "Gold-trimmed marble boutique wrap",
      "Complimentary personalised gift card"
    ],
    presentation: "Floral & chocolate gift bouquet",
    inStock: true,
    featured: true,
    badgeText: "Gifting Favourite"
  },
  {
    id: 207,
    slug: "30-white-roses-with-gyp",
    name: "30 White Roses with GYP",
    priceZAR: 900,
    wooCategory: "Rose Bouquets",
    specialty: "rose-bouquets",
    occasions: ["Anniversaries & Romance", "Weddings & Bridal", "Sympathy & Remembrance"],
    shortDescription: "30 luminous white roses haloed with baby\u2019s breath and Nonise Florist white satin ribbon.",
    description: "Pure, serene, and refined. Thirty fresh white roses surrounded by an airy halo of gypsophila, styled in monochrome ivory-and-black edged wrap with a white Nonise Florist satin bow.",
    images: ["/assets/nonise/30-white-roses-with-gyp.webp"],
    altText: "Thirty elegant white roses with gypsophila in monochrome wrap",
    includes: [
      "30 fresh creamy white roses",
      "Fresh gypsophila halo",
      "Monochrome tailored boutique wrap & satin bow",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied monochrome luxury bouquet",
    inStock: true,
    featured: true
  },
  {
    id: 219,
    slug: "mixed-lillies",
    name: "Pink & Yellow Lily Bouquet",
    priceZAR: 750,
    wooCategory: "Mixed Bouquets",
    specialty: "mixed-bouquets",
    occasions: ["Birthdays & Parties", "Sympathy & Remembrance", "Corporate & Events"],
    shortDescription: "Fragrant fresh mixed lilies styled with seasonal foliage for lasting beauty.",
    description: "Graceful, fragrant mixed lilies selected in bud and bloom so your recipient enjoys days of unfolding colour and scent, paired with fresh botanical greenery in boutique wrapping.",
    images: ["/assets/nonise/mixed-lillies.webp"],
    altText: "Fragrant mixed lilies with seasonal foliage in boutique wrap",
    includes: [
      "Assorted fresh fragrant lilies",
      "Fresh seasonal greenery",
      "Nonise Florist boutique presentation wrap",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied seasonal lily bouquet",
    inStock: true,
    featured: true
  },
  {
    id: 241,
    slug: "sunshine-bouquet",
    name: "Sunflower Sunshine Bouquet",
    priceZAR: 500,
    wooCategory: "Mixed Bouquets",
    specialty: "mixed-bouquets",
    occasions: ["Birthdays & Parties", "Baby Showers & Celebrations"],
    shortDescription: "Radiant sunlit blooms arranged to bring warmth, cheer, and joy to any room.",
    description: "A bright, uplifting seasonal arrangement composed to capture warmth and celebration. Ideal for birthdays, congratulations, thank-you gestures, or simply brightening someone\u2019s day.",
    images: ["/assets/nonise/sunshine-bouquet.webp"],
    altText: "Bright sunshine bouquet with warm seasonal blooms and greenery",
    includes: [
      "Radiant seasonal blooms in warm tones",
      "Fresh botanical foliage",
      "Boutique wrapping & ribbon finish",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied radiant bouquet",
    inStock: true,
    featured: true
  },
  {
    id: 238,
    slug: "mixed-bouquet",
    name: "Mixed Pink Bouquet",
    priceZAR: 450,
    wooCategory: "Mixed Bouquets",
    specialty: "mixed-bouquets",
    occasions: ["Birthdays & Parties", "Everyday Gifting"],
    shortDescription: "Mixed bouquet for special occasions \u2014 thoughtfully composed with fresh seasonal stems.",
    description: "Our versatile everyday floral gesture, crafted with the freshest seasonal stems available in our Pietermaritzburg studio each morning. Balanced in texture, colour, and fragrance.",
    images: ["/assets/nonise/mixed-bouquet.webp"],
    altText: "Versatile mixed seasonal flower bouquet with greenery accents",
    includes: [
      "Curated mix of fresh seasonal flowers",
      "Lush greenery accents",
      "Signature studio wrap & ribbon",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied mixed seasonal bouquet",
    inStock: true,
    featured: true
  },
  {
    id: 246,
    slug: "protea-mix",
    name: "Pink Protea & Rose Mix",
    priceZAR: 350,
    wooCategory: "Protea Bouquets",
    specialty: "protea-bouquets",
    occasions: ["Birthdays & Parties", "Corporate & Events", "Everyday Gifting"],
    shortDescription: "South African proteas paired with soft blush roses, tulips, and delicate seasonal stems.",
    description: "Celebrating South African botanical beauty. Textured native proteas nestled among soft pink roses, lavender tulips, and crisp snapdragons in vibrant rose wrap sealed with our Nonise Florist crest.",
    images: ["/assets/nonise/protea-mix.webp"],
    altText: "South African proteas with blush roses and tulips in vibrant wrap",
    includes: [
      "Fresh South African proteas",
      "Blush roses & seasonal floral accents",
      "Vibrant boutique presentation wrap & Nonise seal",
      "Complimentary personalised gift card"
    ],
    presentation: "Indigenous-inspired hand-tied bouquet",
    inStock: true,
    featured: true,
    badgeText: "Local Favour"
  }
];
var CATALOGUE_CATEGORY_META = {
  "basket-arrangements": {
    label: "Basket Arrangements",
    occasions: [
      "Birthdays & Parties",
      "Anniversaries & Romance",
      "Everyday Gifting",
      "Corporate & Events"
    ],
    includes: [
      "Fresh seasonal flowers arranged in a woven basket",
      "Signature Nonise Florist ribbon finish",
      "Complimentary personalised gift card"
    ],
    presentation: "Ready-to-display woven basket arrangement",
    description: "A hand-arranged floral design set in a woven basket, styled in our Pietermaritzburg studio and ready to display."
  },
  "box-arrangements": {
    label: "Box Arrangements",
    occasions: ["Birthdays & Parties", "Anniversaries & Romance", "Everyday Gifting"],
    includes: [
      "Fresh seasonal flowers arranged in a keepsake hatbox",
      "Signature Nonise Florist ribbon & seal",
      "Complimentary personalised gift card"
    ],
    presentation: "Ready-to-display keepsake hatbox arrangement",
    description: "A hand-arranged floral design set in a keepsake hatbox, styled in our Pietermaritzburg studio for effortless gifting and lasting display."
  },
  extras: {
    label: "Extras",
    occasions: ["Birthdays & Parties", "Everyday Gifting"],
    includes: [
      "A finishing touch for any flower gift",
      "Prepared in our Pietermaritzburg studio"
    ],
    presentation: "Celebration extra",
    description: "A little extra to complete your flower gift, prepared in our Pietermaritzburg studio."
  },
  "funeral-flowers": {
    label: "Funeral Flowers",
    occasions: ["Sympathy & Remembrance"],
    includes: [
      "Fresh white and green funeral flowers",
      "Hand-crafted tribute form",
      "Complimentary sympathy card"
    ],
    presentation: "Funeral tribute arrangement",
    description: "Crafted with compassion by Nonise Florist for funeral services and memorial tributes across Pietermaritzburg."
  },
  "funeral-package-sets": {
    label: "Funeral Package Sets",
    occasions: ["Sympathy & Remembrance"],
    includes: [
      "Coordinated funeral flower package",
      "Coffin spray and standing tributes",
      "Delivery arranged with the funeral parlour"
    ],
    presentation: "Complete funeral flower package",
    description: "A complete, coordinated tribute package arranged with our team and delivered to the service or funeral parlour."
  },
  hampers: {
    label: "Hamper",
    occasions: [
      "Birthdays & Parties",
      "Anniversaries & Romance",
      "Corporate & Events",
      "Everyday Gifting"
    ],
    includes: [
      "Curated treats, chocolates and beverages",
      "Hand-tied ribbon & gift presentation",
      "Complimentary personalised gift card"
    ],
    presentation: "Curated gift hamper",
    description: "A thoughtfully curated gift hamper assembled in our Pietermaritzburg studio, ready for local delivery."
  },
  "mixed-bouquets": {
    label: "Mixed Bouquets",
    occasions: ["Birthdays & Parties", "Everyday Gifting", "Anniversaries & Romance"],
    includes: [
      "Fresh mixed seasonal flowers",
      "Signature boutique wrap & ribbon",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied mixed bouquet",
    description: "Hand-tied with the freshest seasonal stems available in our studio each morning."
  },
  "protea-bouquets": {
    label: "Protea Bouquets",
    occasions: ["Birthdays & Parties", "Corporate & Events", "Everyday Gifting"],
    includes: [
      "Fresh South African proteas",
      "Mixed seasonal foliage",
      "Signature boutique wrap & ribbon",
      "Complimentary personalised gift card"
    ],
    presentation: "Indigenous-inspired hand-tied bouquet",
    description: "Celebrating South African botanical beauty with fresh proteas and textured indigenous foliage."
  },
  "rose-bouquets": {
    label: "Rose Bouquets",
    occasions: ["Anniversaries & Romance", "Birthdays & Parties", "Everyday Gifting"],
    includes: [
      "Fresh long-stemmed roses",
      "Signature boutique wrap & ribbon",
      "Complimentary personalised gift card"
    ],
    presentation: "Hand-tied rose bouquet",
    description: "Hand-tied with fresh roses and finished in our signature wrap for a timeless floral gift."
  },
  "vase-arrangements": {
    label: "Vase Arrangements",
    occasions: [
      "Anniversaries & Romance",
      "Birthdays & Parties",
      "Corporate & Events",
      "Everyday Gifting"
    ],
    includes: [
      "Fresh seasonal flowers",
      "Clear glass keepsake vase",
      "Signature ribbon finish",
      "Complimentary personalised gift card"
    ],
    presentation: "Ready-to-display glass vase arrangement",
    description: "Arranged in a clear glass vase and ready to display the moment it arrives."
  }
};
var CATALOGUE_ENTRIES = [
  // Box Arrangements
  { category: "box-arrangements", name: "Spring Garden Hatbox", priceZAR: 950, blurb: "Pink, lilac and butter-yellow blooms gathered in a blush keepsake hatbox." },
  { category: "box-arrangements", name: "Crimson & Ivory Rose Hatbox", priceZAR: 1800, blurb: "Red and cream roses set in a black hatbox with a striped ribbon finish." },
  { category: "box-arrangements", name: "Blush & Burgundy Rose Box", priceZAR: 750, blurb: "Cream, blush and burgundy roses with tall branches in a marble-look box." },
  { category: "box-arrangements", name: "Peach & Pink Celebration Hatbox", priceZAR: 950, blurb: "Soft peach roses and pink carnations arranged in a pink hatbox." },
  { category: "box-arrangements", name: "Pink Lily & Gerbera Hatbox", priceZAR: 800, blurb: "Pink lilies, gerberas and alstroemeria in a soft pink hatbox." },
  { category: "box-arrangements", name: "Blush Rose & Carnation Box", priceZAR: 1200, blurb: "Blush roses and carnations in a white gift box tied with ribbon." },
  { category: "box-arrangements", name: "Sunlit Yellow & Cream Hatbox", priceZAR: 1100, blurb: "Yellow roses, cream lisianthus and pink gerbera in a red hatbox." },
  { category: "box-arrangements", name: "Red Rose & Champagne Celebration Box", priceZAR: 1400, blurb: "Red roses, a bottle of champagne and a celebration balloon in a pink hatbox." },
  { category: "box-arrangements", name: "Ferrero Heart & Rose Celebration Box", priceZAR: 1800, blurb: "Deep red roses around a heart of Ferrero Rocher chocolates with champagne." },
  { category: "box-arrangements", name: "Pastel Garden Hatbox", priceZAR: 950, blurb: "Pink, white and lilac flowers arranged in a silver-pink hatbox." },
  // Funeral Flowers
  { category: "funeral-flowers", name: "White Posy Tribute", priceZAR: 450, blurb: "A soft white and cream posy with eucalyptus for funeral services." },
  { category: "funeral-flowers", name: "Ivory Upright Tribute", priceZAR: 550, blurb: "An upright white and cream arrangement finished with a sympathy ribbon." },
  { category: "funeral-flowers", name: "White Lily & Rose Upright Spray", priceZAR: 650, blurb: "A large white lily and rose spray with fresh greenery." },
  { category: "funeral-flowers", name: "White & Green Coffin Spray", priceZAR: 850, blurb: "A white and green coffin spray with eucalyptus and roses." },
  { category: "funeral-flowers", name: "Pink & Purple Funeral Cross", priceZAR: 850, blurb: "A floral cross in pink, purple and lilac tones." },
  { category: "funeral-flowers", name: "White Rose Funeral Cross", priceZAR: 850, blurb: "A classic white rose and chrysanthemum funeral cross." },
  { category: "funeral-flowers", name: "Sunflower Funeral Cross", priceZAR: 850, blurb: "A bright sunflower cross for a life remembered with warmth." },
  { category: "funeral-flowers", name: "Colourful Coffin Spray", priceZAR: 1e3, blurb: "A vibrant orange, yellow and blue coffin spray presented in a white urn." },
  // Funeral Package Sets
  { category: "funeral-package-sets", name: "White Funeral Package with Upright & Posies", priceZAR: 3200, blurb: "A coordinated white tribute set with an upright spray, two posies and a coffin spray." },
  { category: "funeral-package-sets", name: "Pink Funeral Package with Casket Spray", priceZAR: 2900, blurb: "A pink and white package with a casket spray and four matching posies." },
  { category: "funeral-package-sets", name: "White Funeral Package with Arch & Pedestals", priceZAR: 3500, blurb: "A white package with an arch and pedestal tributes for the service." },
  // Hamper
  { category: "hampers", name: "Snack & Treat Gift Box", priceZAR: 850, blurb: "A black gift box filled with snacks, fruit and a bottled drink." },
  { category: "hampers", name: "Hennessy & Chocolate Gift Hamper", priceZAR: 1200, blurb: "Hennessy, Ferrero Rocher and sweet treats in a black gift box." },
  { category: "hampers", name: "Rose & Wine Celebration Hamper", priceZAR: 1200, blurb: "Fresh pink roses, a bottle of wine and chocolates in a woven basket." },
  { category: "hampers", name: "Wine & Snack Wooden Crate", priceZAR: 1100, blurb: "A wooden crate with red wine, roses and savoury snacks." },
  { category: "hampers", name: "Pink Teddy & Ros\xE9 Luxury Hamper", priceZAR: 3200, blurb: "A pink gift box with a teddy, Protea ros\xE9, biscuits and chocolates." },
  { category: "hampers", name: "Chocolate & Snack Wooden Tray", priceZAR: 990, blurb: "A wooden tray of chocolates, sweets and savoury snacks." },
  { category: "hampers", name: "Golden Ribbon Snack Tray", priceZAR: 890, blurb: "A wooden tray of treats tied with a golden ribbon." },
  { category: "hampers", name: "Red Teddy & Ros\xE9 Hatbox Hamper", priceZAR: 950, blurb: "A black hatbox with a red teddy, ros\xE9 and biscuits." },
  { category: "hampers", name: "Sunflower Bouquet & Snack Hamper", priceZAR: 2e3, blurb: "A sunflower bouquet paired with a box of snacks, wine and treats." },
  { category: "hampers", name: "Pink Sweet Treat Hatbox", priceZAR: 750, blurb: "A pink hatbox overflowing with sweets and snacks." },
  { category: "hampers", name: "Fruit & Chocolate Gift Crate", priceZAR: 1300, blurb: "A wooden crate with bananas, chocolate and wine tied in black ribbon." },
  { category: "hampers", name: "Rustic Gourmet Hamper", priceZAR: 950, blurb: "A raffia-tied wooden crate of gourmet treats and wine." },
  { category: "hampers", name: "Flower & Snack Celebration Hamper", priceZAR: 1200, blurb: "A hatbox of fresh flowers paired with a snack selection." },
  { category: "hampers", name: "Congratulations Snack Hamper", priceZAR: 1200, blurb: "A celebration snack box with a \u201CWell done\u201D balloon." },
  { category: "hampers", name: "Wellness & Pantry Gift Bowl", priceZAR: 750, blurb: "A wooden bowl with olive oil, skincare and everyday treats." },
  { category: "hampers", name: "Movie Night Snack Hamper", priceZAR: 900, blurb: "A black tray of chips, chocolate, wine and movie-night snacks." },
  { category: "hampers", name: "White Teddy & Ros\xE9 Luxury Hamper", priceZAR: 2500, blurb: "A pink gift box with a white teddy, ros\xE9, biscuits and chocolates." },
  // Mixed Bouquets
  { category: "mixed-bouquets", name: "Pink Celebration Mixed Bouquet", priceZAR: 1200, blurb: "Pink, coral and white blooms hand-tied in bright pink wrap." },
  { category: "mixed-bouquets", name: "Gerbera Sunshine Bouquet", priceZAR: 450, blurb: "Orange, yellow and purple gerberas in kraft wrap." },
  { category: "mixed-bouquets", name: "Jewel Tone Mixed Bouquet", priceZAR: 550, blurb: "Roses, lisianthus and purple accents in a rich jewel palette." },
  { category: "mixed-bouquets", name: "Pink Lily & Alstroemeria Bouquet", priceZAR: 650, blurb: "Pink lilies and alstroemeria with soft seasonal greenery." },
  { category: "mixed-bouquets", name: "Sunset Rose & Ranunculus Bouquet", priceZAR: 350, blurb: "Red roses, orange ranunculus and yellow tulips in a dark wrap." },
  { category: "mixed-bouquets", name: "Rose & Lily Romance Bouquet", priceZAR: 950, blurb: "Red roses, white lilies and gypsophila in a classic white wrap." },
  { category: "mixed-bouquets", name: "Colourburst Mixed Bouquet", priceZAR: 850, blurb: "A cheerful mix of yellow, pink and purple seasonal flowers." },
  { category: "mixed-bouquets", name: "Red Rose & Lily Kraft Bouquet", priceZAR: 650, blurb: "Red roses with green lilies wrapped in natural kraft paper." },
  { category: "mixed-bouquets", name: "Lily & Rose Garden Bouquet", priceZAR: 650, blurb: "Yellow lilies, pink roses and garden-style foliage." },
  { category: "mixed-bouquets", name: "Pink Lily & Carnation Grand Bouquet", priceZAR: 1500, blurb: "A generous pink bouquet of lilies, carnations and stocks." },
  { category: "mixed-bouquets", name: "Fuchsia Sunset Bouquet", priceZAR: 850, blurb: "Hot pink, red and orange blooms in a fuchsia wrap." },
  { category: "mixed-bouquets", name: "Pink Tulip & Lily Bouquet", priceZAR: 1200, blurb: "Pink tulips, lilies and daisies in soft pink wrap." },
  { category: "mixed-bouquets", name: "Orange Bloom Mixed Bouquet", priceZAR: 900, blurb: "Orange gerberas, tulips and purple accents in white wrap." },
  // Protea Bouquets
  { category: "protea-bouquets", name: "Protea & Leucadendron Bouquet", priceZAR: 750, blurb: "Pink proteas and leucadendron in a monochrome wrap." },
  { category: "protea-bouquets", name: "Blush Protea & Rose Bouquet", priceZAR: 550, blurb: "Blush proteas, roses and seasonal greenery." },
  { category: "protea-bouquets", name: "Protea & Pincushion Bouquet", priceZAR: 950, blurb: "Pink proteas with orange pincushions and lush foliage." },
  { category: "protea-bouquets", name: "King Protea Indigenous Bouquet", priceZAR: 450, blurb: "King proteas with pink blooms and indigenous greenery." },
  // Rose Bouquets
  { category: "rose-bouquets", name: "Ivory Rose Ring with Red Heart", priceZAR: 1500, blurb: "Ivory roses ringed around a heart of deep red roses and gypsophila." },
  { category: "rose-bouquets", name: "Blush Pink Rose & Gypsophila Bouquet", priceZAR: 600, blurb: "Blush pink roses with gypsophila in a kraft wrap." },
  { category: "rose-bouquets", name: "Cream Rose & Gypsophila Bouquet", priceZAR: 2e3, blurb: "Cream roses haloed with gypsophila in a white wrap." },
  { category: "rose-bouquets", name: "Ruby Red Rose Statement Bouquet", priceZAR: 3e3, blurb: "A grand all-red rose bouquet finished in black wrap." },
  { category: "rose-bouquets", name: "Classic Red Rose Bouquet", priceZAR: 600, blurb: "Red roses with gypsophila in a natural brown wrap." },
  { category: "rose-bouquets", name: "Red & White Birthday Rose Bouquet", priceZAR: 1200, blurb: "Red and white roses with gypsophila and a \u201CHappy Birthday\u201D ribbon." },
  { category: "rose-bouquets", name: "Ruby Birthday Rose Bouquet", priceZAR: 1500, blurb: "Red roses with gypsophila, black wrap and a birthday sash." },
  { category: "rose-bouquets", name: "Red Rose Noir Bouquet", priceZAR: 1200, blurb: "Red roses finished with a black satin ribbon and dark wrap." },
  { category: "rose-bouquets", name: "Burgundy Velvet Rose Bouquet", priceZAR: 2700, blurb: "Deep burgundy roses in a monochrome presentation wrap." },
  { category: "rose-bouquets", name: "Rose & Chocolate Keepsake Bouquet", priceZAR: 850, blurb: "Red roses around a chocolate keepsake centre with gypsophila." },
  { category: "rose-bouquets", name: "Monogram Red Rose Grand Bouquet", priceZAR: 4500, blurb: "A grand red rose bouquet finished with a monogram and gypsophila border." },
  { category: "rose-bouquets", name: "Ivory Rose & Gypsophila Bouquet", priceZAR: 1e3, blurb: "Ivory roses with gypsophila in a clear presentation wrap." },
  // Vase Arrangements
  { category: "vase-arrangements", name: "Garden Medley Vase Arrangement", priceZAR: 1500, blurb: "A mixed garden bouquet of pink, blue and orange blooms in a glass vase." },
  { category: "vase-arrangements", name: "Rose & Delphinium Vase", priceZAR: 950, blurb: "Pink roses with blue delphinium in a green glass vase." },
  { category: "vase-arrangements", name: "Peach Rose & Lily Vase", priceZAR: 650, blurb: "Peach roses, lilies and soft foliage in a clear glass vase." },
  { category: "vase-arrangements", name: "Lilac & Pink Vase Arrangement", priceZAR: 1200, blurb: "Pink, lilac and blue flowers arranged in a glass vase." },
  { category: "vase-arrangements", name: "Eucalyptus & Rose Vase", priceZAR: 850, blurb: "Pink roses, orange gerbera and eucalyptus in a glass vase." },
  { category: "vase-arrangements", name: "Red Rose Vase with Ribbon", priceZAR: 790, blurb: "Red roses in a glass vase finished with a red ribbon." },
  { category: "vase-arrangements", name: "Golden Lily & Sunflower Vase", priceZAR: 1400, blurb: "Yellow lilies, sunflowers and golden foliage in a glass vase." },
  { category: "vase-arrangements", name: "Vibrant Gerbera Vase Arrangement", priceZAR: 950, blurb: "Hot pink gerberas with orange and purple accents in a glass vase." },
  { category: "vase-arrangements", name: "Pastel Garden Vase Arrangement", priceZAR: 980, blurb: "Soft pink, lilac and blue blooms in a glass vase." },
  { category: "vase-arrangements", name: "Bright Summer Vase Arrangement", priceZAR: 650, blurb: "Pink, orange and purple summer flowers in a glass vase." },
  { category: "vase-arrangements", name: "White Lily Vase Arrangement", priceZAR: 550, blurb: "White and green lilies in a glass vase with a raffia tie." },
  { category: "vase-arrangements", name: "Luxury Mixed Vase Arrangement", priceZAR: 1600, blurb: "A generous mix of pink, orange and yellow blooms in a glass vase." },
  { category: "vase-arrangements", name: "Sunset Garden Vase Arrangement", priceZAR: 750, blurb: "Yellow, orange and purple flowers in a glass vase with orange ribbon." },
  { category: "vase-arrangements", name: "Sunflower & Yellow Rose Vase", priceZAR: 1150, blurb: "Sunflowers and yellow roses with greenery in a glass vase." },
  { category: "vase-arrangements", name: "Sunflower Grand Vase", priceZAR: 1300, blurb: "A tall sunflower arrangement with yellow craspedia in a glass vase." },
  { category: "vase-arrangements", name: "Protea & Foliage Vase Arrangement", priceZAR: 750, blurb: "Proteas and textured greenery in a glass vase." },
  // Basket Arrangements
  { category: "basket-arrangements", name: "Country Garden Flower Basket", priceZAR: 650, blurb: "Pink and red roses, lilies, thistles and gypsophila in a rustic handled basket." },
  { category: "basket-arrangements", name: "Ruby Celebration Flower Basket", priceZAR: 680, blurb: "Red gerberas, carnations and roses finished with a bright red ribbon." },
  { category: "basket-arrangements", name: "Sunshine Meadow Flower Basket", priceZAR: 680, blurb: "Yellow roses, white chrysanthemums, orange carnations and eucalyptus." },
  { category: "basket-arrangements", name: "Roses & Ferrero Gift Basket", priceZAR: 850, blurb: "Roses and tulips paired with Ferrero Rocher and Appletiser in a handled basket." },
  { category: "basket-arrangements", name: "Pink Blush Flower Basket", priceZAR: 720, blurb: "Pink roses, gerberas, lilies and snapdragons gathered in a rustic basket." },
  { category: "basket-arrangements", name: "Red Rose & Chocolate Basket", priceZAR: 950, blurb: "Red roses arranged with a box of chocolate seashells." },
  { category: "basket-arrangements", name: "Golden Lily Flower Basket", priceZAR: 750, blurb: "Yellow lilies, orange blooms, white chrysanthemums and a single red rose." },
  { category: "basket-arrangements", name: "Autumn Glow Flower Basket", priceZAR: 850, blurb: "Red roses, orange lilies, berries and eucalyptus with an orange ribbon." },
  { category: "basket-arrangements", name: "Pastel Celebration Flower Basket", priceZAR: 850, blurb: "Pink, white and orange roses with chrysanthemums and a pink bow." },
  { category: "basket-arrangements", name: "Ivory Elegance Flower Basket", priceZAR: 550, blurb: "White roses, cream lisianthus and gypsophila in a small woven basket." },
  { category: "basket-arrangements", name: "Pink & Lilac Flower Basket", priceZAR: 650, blurb: "Pink roses, alstroemeria and chrysanthemums with lilac accents." },
  { category: "basket-arrangements", name: "Peach Gerbera Flower Basket", priceZAR: 650, blurb: "A peach gerbera with purple lisianthus and pink roses in a woven basket." },
  { category: "basket-arrangements", name: "Blush Alstroemeria Flower Basket", priceZAR: 850, blurb: "Pink alstroemeria, chrysanthemums and roses with soft eucalyptus." },
  { category: "basket-arrangements", name: "Citrus Sunrise Flower Basket", priceZAR: 650, blurb: "Orange and yellow gerberas, yellow roses and eucalyptus." },
  { category: "basket-arrangements", name: "Lemon & Lilac Flower Basket", priceZAR: 550, blurb: "Yellow and white chrysanthemums, yellow roses and purple accents." },
  // Extras
  { category: "extras", name: "Dried Rose Petal Pouch", priceZAR: 35, blurb: "A kraft pouch of naturally dried rose petals for scattering or styling." },
  { category: "extras", name: "Foil Balloon", priceZAR: 50, blurb: "A helium-ready foil balloon in an assorted celebration design." }
];
function slugifyName(name) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
__name(slugifyName, "slugifyName");
var CATALOGUE_PRODUCTS = CATALOGUE_ENTRIES.map((entry, index) => {
  const meta = CATALOGUE_CATEGORY_META[entry.category];
  return {
    id: 1001 + index,
    slug: slugifyName(entry.name),
    name: entry.name,
    priceZAR: entry.priceZAR,
    wooCategory: meta.label,
    specialty: entry.category,
    occasions: meta.occasions,
    shortDescription: entry.blurb,
    description: `${entry.blurb} ${meta.description}`,
    images: [`/assets/nonise/${slugifyName(entry.name)}.webp`],
    altText: `${entry.name} by Nonise Florist in Pietermaritzburg`,
    includes: meta.includes,
    presentation: meta.presentation,
    inStock: true
  };
});
var ROSE_SIZES = [10, 15, 20, 30, 40, 50, 100];
var ROSE_COLOR_OPTIONS = ["Red", "White", "Pink", "Mixed"];
var ROSE_SIZE_GROUPS = [
  {
    arrangement: "Roses",
    slugBase: "roses",
    image: "/assets/nonise/ruby-red-rose-statement-bouquet.webp",
    blurb: "Fresh roses hand-tied in our signature wrap.",
    prices: [250, 400, 500, 750, 1e3, 1250, 2500]
  },
  {
    arrangement: "Roses with Gyp",
    slugBase: "roses-with-gyp",
    image: "/assets/nonise/classic-red-rose-bouquet.webp",
    blurb: "Fresh roses with delicate gypsophila in a natural wrap.",
    prices: [350, 500, 600, 900, 1200, 1500, 3e3]
  }
];
var ROSE_SIZE_GUIDE = {
  sizes: ROSE_SIZES,
  rows: ROSE_SIZE_GROUPS.map(({ arrangement, slugBase, prices }) => ({
    arrangement,
    slugBase,
    prices
  })),
  extras: [
    { label: "Mixed bouquets", price: "From R200" },
    { label: "Flower boxes", price: "From R650" },
    { label: "Romantic hampers", price: "From R850" },
    { label: "Foil balloons", price: "R50" }
  ]
};
var ROSE_SIZE_PRODUCTS = ROSE_SIZE_GROUPS.flatMap(
  (group3, groupIndex) => group3.prices.map((price, sizeIndex) => {
    const size = ROSE_SIZES[sizeIndex];
    const name = `${size} ${group3.arrangement}`;
    return {
      id: 3001 + groupIndex * ROSE_SIZES.length + sizeIndex,
      slug: `${group3.slugBase}-${size}`,
      name,
      priceZAR: price,
      wooCategory: "Rose Bouquets",
      specialty: "rose-bouquets",
      colorOptions: [...ROSE_COLOR_OPTIONS],
      occasions: ["Anniversaries & Romance", "Birthdays & Parties", "Everyday Gifting"],
      shortDescription: `${group3.blurb} ${size} stems. Choose red, white, pink or mixed.`,
      description: `${group3.blurb} This arrangement includes ${size} fresh roses, hand-tied and finished with our signature wrap and ribbon. Choose red, white, pink or mixed roses when adding it to your bag.`,
      images: [group3.image],
      altText: `${name} by Nonise Florist in Pietermaritzburg`,
      includes: [
        `${size} fresh long-stemmed roses`,
        "Signature boutique wrap & ribbon",
        "Complimentary personalised gift card"
      ],
      presentation: "Hand-tied rose bouquet",
      inStock: true,
      badgeText: `${size} Stems`
    };
  })
);
if (ROSE_SIZE_GUIDE.rows.some(
  (row) => ROSE_SIZES.some(
    (size) => !ROSE_SIZE_PRODUCTS.some((product) => product.slug === `${row.slugBase}-${size}`)
  )
)) {
  throw new Error("Rose price table is missing a cart product");
}
var PRODUCTS = [...SIGNATURE_PRODUCTS, ...CATALOGUE_PRODUCTS];
var SELLABLE_PRODUCTS = [...PRODUCTS, ...ROSE_SIZE_PRODUCTS];
if (new Set(PRODUCTS.map((product) => product.slug)).size !== PRODUCTS.length) {
  throw new Error("Duplicate product slug in catalogue");
}
var CURATED_GALLERY_PHOTOS = [
  {
    id: "g-10",
    src: "/assets/nonise/gallery-10.webp",
    title: "Cascading Hydrangea & Peach Rose Wedding Tablescape",
    alt: "Elegant wedding reception with cascading hydrangea and peach roses on round tables",
    collection: "Weddings & Events"
  },
  {
    id: "g-1",
    src: "/assets/nonise/gallery-1.webp",
    title: "Bespoke Crimson Rose Bouquet with Floral Monogram",
    alt: "Luxury red rose bouquet with custom monogram lettering and satin ribbon",
    collection: "Rose Bouquets"
  },
  {
    id: "g-rose-pink",
    src: "/assets/nonise/portfolio-rose-pink-gyp.webp",
    title: "Blush Pink Rose & Gypsophila Bouquet",
    alt: "Soft pink roses with gypsophila in a hand-tied bouquet by Nonise Florist",
    collection: "Rose Bouquets"
  },
  {
    id: "g-rose-cream",
    src: "/assets/nonise/portfolio-rose-cream-heart.webp",
    title: "Cream & Red Heart Rose Bouquet",
    alt: "Cream roses arranged around a red heart of roses with gypsophila",
    collection: "Rose Bouquets"
  },
  {
    id: "g-protea",
    src: "/assets/nonise/portfolio-protea-rose-bouquet.webp",
    title: "Protea & Rose Bouquet in Monochrome Wrap",
    alt: "Pink proteas with red and blush roses in black and white wrap by Nonise Florist",
    collection: "Protea Bouquets"
  },
  {
    id: "g-protea-pincushion",
    src: "/assets/nonise/portfolio-protea-pincushion.webp",
    title: "Protea & Pincushion Bouquet",
    alt: "King protea with orange pincushions and greenery in a white wrap",
    collection: "Protea Bouquets"
  },
  {
    id: "g-about",
    src: "/assets/nonise/about-feature.webp",
    title: "\u201CI Love You\u201D Blush Rose & Tulip Keepsake Hatbox",
    alt: "Romantic blush rose and tulip arrangement in keepsake hatbox with greeting card",
    collection: "Box Arrangements"
  },
  {
    id: "g-8",
    src: "/assets/nonise/gallery-8.webp",
    title: "Crimson Scalloped Hatbox with Cream Roses, Lilies & Gerbera",
    alt: "Red scalloped gift box filled with cream roses, lilies and gerbera for special occasions",
    collection: "Box Arrangements"
  },
  {
    id: "g-box-pink",
    src: "/assets/nonise/portfolio-box-pink-mixed.webp",
    title: "Pink & Yellow Mixed Rose Hatbox",
    alt: "Pink and silver hatbox filled with pink, red and yellow roses, lilies and statice",
    collection: "Box Arrangements"
  },
  {
    id: "g-box-red",
    src: "/assets/nonise/portfolio-box-red-roses-ferrero.webp",
    title: "Red Rose & Ferrero Rocher Hatbox",
    alt: "Black hatbox with red roses ringed by Ferrero Rocher chocolates",
    collection: "Box Arrangements"
  },
  {
    id: "g-hero",
    src: "/assets/nonise/home-hero-roses.webp",
    title: "Signature Red Rose Glass Vase with Nonise Satin Ribbon",
    alt: "Premium red roses arranged in clear glass vase with black satin ribbon and monogram crest",
    collection: "Vase Arrangements"
  },
  {
    id: "g-vase-red",
    src: "/assets/nonise/portfolio-vase-red-roses.webp",
    title: "Red Rose Glass Vase Arrangement",
    alt: "Red roses arranged in a clear glass vase with a red and black ribbon",
    collection: "Vase Arrangements"
  },
  {
    id: "g-vase-pink",
    src: "/assets/nonise/portfolio-vase-pink-gerbera.webp",
    title: "Pink Rose & Gerbera Vase Arrangement",
    alt: "Pink roses, orange gerbera, purple stock and eucalyptus in a clear glass vase",
    collection: "Vase Arrangements"
  },
  {
    id: "g-6",
    src: "/assets/nonise/gallery-6.webp",
    title: "Pink Marble Ferrero Rocher Hamper & Rose Pairing",
    alt: "Elegant gift hamper with pink marble base, white roses, and golden Ferrero Rocher chocolates",
    collection: "Gift Hampers"
  },
  {
    id: "g-hamper-pink",
    src: "/assets/nonise/portfolio-hamper-pink-teddy.webp",
    title: "Pink Teddy, Ros\xE9 & Lindt Gift Hamper",
    alt: "Pink gift box with a white teddy, Protea ros\xE9, Lindt, Ferrero Rocher and treats",
    collection: "Gift Hampers"
  },
  {
    id: "g-hamper-orange",
    src: "/assets/nonise/portfolio-hamper-orange-roses-tray.webp",
    title: "Orange Rose & Ferrero Wooden Tray",
    alt: "Wooden tray with orange roses, Ferrero Rocher, chocolate whirls and sweets",
    collection: "Gift Hampers"
  },
  {
    id: "g-11",
    src: "/assets/nonise/gallery-11.webp",
    title: "Oh Baby Celebration Centrepiece & Table Florals",
    alt: "Celebration centerpiece with pastel flowers for baby shower event table",
    collection: "Weddings & Events"
  },
  {
    id: "g-3",
    src: "/assets/nonise/gallery-3.webp",
    title: "Vibrant Sunset Gerbera, Tulip & Lilac Rose Bouquet",
    alt: "Colorful mixed bouquet of sunset-toned gerberas, tulips and lilac roses",
    collection: "Rose Bouquets"
  },
  {
    id: "g-5",
    src: "/assets/nonise/gallery-5.webp",
    title: "White & Eucalyptus Condolence Bouquet",
    alt: "Elegant white and eucalyptus condolence bouquet with soft greenery and minimal styling",
    collection: "Funeral & Sympathy"
  },
  {
    id: "g-lily-sympathy",
    src: "/assets/nonise/portfolio-white-lily-sympathy.webp",
    title: "White Lily Sympathy Arrangement",
    alt: "White lilies in a clear glass vase with raffia, a sympathy arrangement by Nonise Florist",
    collection: "Funeral & Sympathy"
  },
  {
    id: "g-spec1",
    src: "/assets/nonise/home-specialty-1.webp",
    title: "Happy Birthday Floral Hatbox & Chocolate Gift Suite",
    alt: "Birthday gift set with floral hatbox, chocolate elements and celebratory styling",
    collection: "Box Arrangements"
  },
  {
    id: "g-contact",
    src: "/assets/nonise/contact-floral.webp",
    title: "Blush & Magenta Garden Rose Hatbox Arrangement",
    alt: "Garden rose arrangement in blush and magenta tones presented in gift hatbox",
    collection: "Box Arrangements"
  },
  {
    id: "g-2",
    src: "/assets/nonise/gallery-2.webp",
    title: "Red Rose, Ferrero Rocher & Champagne Gift Box",
    alt: "Red roses, Ferrero Rocher chocolates and champagne presented in a white gift box",
    collection: "Box Arrangements"
  },
  {
    id: "g-4",
    src: "/assets/nonise/gallery-4.webp",
    title: "Pink Celebration Bouquet",
    alt: "Hand-tied pink celebration bouquet with seasonal flowers and greenery",
    collection: "Rose Bouquets"
  },
  {
    id: "g-7",
    src: "/assets/nonise/gallery-7.webp",
    title: "\u201CI Love You\u201D Hatbox Floral Detail",
    alt: "Close-up of the \u201CI Love You\u201D hatbox floral styling with blush roses",
    collection: "Box Arrangements"
  }
];
var GALLERY_COLLECTION_BY_SPECIALTY = {
  "basket-arrangements": "Basket Arrangements",
  "box-arrangements": "Box Arrangements",
  extras: "Extras",
  "funeral-flowers": "Funeral & Sympathy",
  "funeral-package-sets": "Funeral & Sympathy",
  hampers: "Gift Hampers",
  "mixed-bouquets": "Mixed Bouquets",
  "protea-bouquets": "Protea Bouquets",
  "rose-bouquets": "Rose Bouquets",
  "vase-arrangements": "Vase Arrangements"
};
var INCLUDE_CATALOGUE_IN_GALLERY = true;
var CATALOGUE_GALLERY_PHOTOS = INCLUDE_CATALOGUE_IN_GALLERY ? CATALOGUE_PRODUCTS.map((product) => ({
  id: `g-${product.slug}`,
  src: product.images[0],
  title: product.name,
  alt: product.altText,
  collection: GALLERY_COLLECTION_BY_SPECIALTY[product.specialty]
})) : [];
var GALLERY_PHOTOS = [
  ...CURATED_GALLERY_PHOTOS,
  ...CATALOGUE_GALLERY_PHOTOS
];
var CHECKOUT_ADDONS = [
  { id: "champagne", label: "Champagne", priceZAR: 950, fromPrice: true },
  { id: "chocolates", label: "Chocolates", priceZAR: 300, fromPrice: true },
  { id: "wine", label: "Wine", priceZAR: 550, fromPrice: true },
  { id: "balloons", label: "Balloons", priceZAR: 50, image: "/assets/nonise/foil-balloon-640.webp" },
  { id: "petals", label: "Dry flower petals", priceZAR: 35, image: "/assets/nonise/dried-rose-petal-pouch-640.webp" }
];

// ../src/lib/payfast.ts
function payfastConfig(env2 = {}) {
  return {
    merchantId: String(env2.PAYFAST_MERCHANT_ID || "31790723"),
    merchantKey: String(env2.PAYFAST_MERCHANT_KEY || "yx6v2da4vda4vdd37"),
    passphrase: String(env2.PAYFAST_PASSPHRASE || ""),
    host: env2.PAYFAST_SANDBOX === "true" ? "sandbox.payfast.co.za" : "www.payfast.co.za"
  };
}
__name(payfastConfig, "payfastConfig");
function payfastEncode(value) {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}
__name(payfastEncode, "payfastEncode");
function payfastSignature(fields, passphrase = "") {
  const body = Object.entries(fields).filter(([, value]) => value !== "").map(([key, value]) => `${key}=${payfastEncode(value)}`).join("&");
  const signed = passphrase ? `${body}&passphrase=${payfastEncode(passphrase)}` : body;
  return createHash("md5").update(signed).digest("hex");
}
__name(payfastSignature, "payfastSignature");
function buildCheckout(body, origin, config2) {
  const items = [];
  for (const raw of Array.isArray(body.items) ? body.items : []) {
    const entry = raw ?? {};
    const product = SELLABLE_PRODUCTS.find((p) => p.id === Number(entry.id));
    const quantity = Math.floor(Number(entry.quantity));
    if (product && quantity > 0) {
      const isRoseSize = ROSE_SIZE_PRODUCTS.some((rose) => rose.id === product.id);
      const color = isRoseSize ? String(entry.color ?? "").trim() : "";
      if (isRoseSize && !ROSE_COLOR_OPTIONS.some((option) => option === color)) {
        return {
          status: 400,
          body: { error: "Choose a rose colour for every rose bouquet." }
        };
      }
      items.push({
        product,
        quantity: Math.min(quantity, 99),
        color: color || void 0
      });
    }
  }
  const addonIds = Array.isArray(body.addonIds) ? body.addonIds.filter((id) => typeof id === "string") : [];
  const addons = CHECKOUT_ADDONS.filter((addon) => addonIds.includes(addon.id));
  const fulfillment = body.fulfillment === "collection" ? "collection" : "delivery";
  const subtotal = items.reduce((sum, i) => sum + i.product.priceZAR * i.quantity, 0);
  const itemsTotal = subtotal + addons.reduce((sum, addon) => sum + addon.priceZAR, 0);
  const deliveryFee = deliveryFeeZAR(itemsTotal, fulfillment);
  const amount = itemsTotal + deliveryFee;
  const senderName = String(body.senderName ?? "").trim();
  const email = String(body.senderEmail ?? "").trim();
  if (items.length === 0 || !senderName || !email || amount <= 0) {
    return { status: 400, body: { error: "A valid cart, name and email are required." } };
  }
  const [firstName, ...restName] = senderName.split(/\s+/);
  const reference = `NF-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
  const base = origin.replace(/\/+$/, "");
  const text = /* @__PURE__ */ __name((value) => String(value ?? "").trim().slice(0, 255), "text");
  const addonSummary = addons.length ? ` + ${addons.map((addon) => addon.label).join(", ")}` : "";
  const fields = {
    merchant_id: config2.merchantId,
    merchant_key: config2.merchantKey,
    return_url: `${base}/checkout?paid=1&ref=${encodeURIComponent(reference)}`,
    cancel_url: `${base}/checkout?cancelled=1`,
    notify_url: `${base}/api/payfast/notify`,
    name_first: firstName.slice(0, 100),
    name_last: (restName.join(" ") || "-").slice(0, 100),
    email_address: email.slice(0, 100),
    cell_number: text(body.senderPhone),
    m_payment_id: reference,
    amount: amount.toFixed(2),
    item_name: "Nonise Florist order",
    item_description: `${items.map((i) => `${i.quantity}x ${i.product.name}${i.color ? ` (${i.color})` : ""}`).join("; ")}${addonSummary}${deliveryFee ? " + R100 local delivery" : ""}`.slice(0, 255),
    custom_str1: `Fulfilment: ${fulfillment}`,
    custom_str2: `Date: ${text(body.deliveryDate)} ${text(body.timeWindow)}`,
    custom_str3: `Recipient: ${text(body.recipientName)} ${text(body.recipientPhone)} ${text(
      body.deliveryAddress
    )} ${text(body.suburb)}`.trim().slice(0, 255),
    custom_str4: text(body.cardMessage),
    custom_str5: text(body.specialInstructions),
    email_confirmation: "1",
    confirmation_address: email
  };
  fields.signature = payfastSignature(fields, config2.passphrase);
  return {
    status: 200,
    body: {
      processUrl: `https://${config2.host}/eng/process`,
      fields,
      reference,
      subtotal,
      deliveryFee,
      amount
    }
  };
}
__name(buildCheckout, "buildCheckout");
async function handleNotify(body, config2) {
  try {
    const fields = {};
    for (const [key, value] of Object.entries(body)) {
      if (key !== "signature") fields[key] = String(value ?? "");
    }
    const signature = String(body.signature ?? "");
    if (!signature || payfastSignature(fields, config2.passphrase) !== signature) {
      console.warn("[payfast] ITN rejected: signature mismatch");
      return { status: 400, body: "Invalid signature" };
    }
    if (fields.merchant_id !== config2.merchantId) {
      console.warn("[payfast] ITN rejected: unknown merchant");
      return { status: 400, body: "Unknown merchant" };
    }
    const form = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) form.set(key, String(value ?? ""));
    const check = await fetch(`https://${config2.host}/eng/query/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString()
    });
    if ((await check.text()).trim() !== "VALID") {
      console.warn("[payfast] ITN rejected: PayFast did not validate the payload");
      return { status: 400, body: "Invalid ITN" };
    }
    console.log(
      "[payfast] ITN",
      JSON.stringify({
        reference: fields.m_payment_id,
        status: fields.payment_status,
        amount: fields.amount_gross,
        items: fields.item_description,
        email: fields.email_address,
        name: `${fields.name_first ?? ""} ${fields.name_last ?? ""}`.trim(),
        fulfilment: fields.custom_str1,
        delivery: fields.custom_str2,
        recipient: fields.custom_str3,
        card: fields.custom_str4,
        notes: fields.custom_str5
      })
    );
    return { status: 200, body: "OK" };
  } catch (error3) {
    console.error("[payfast] ITN error:", error3);
    return { status: 500, body: "ITN error" };
  }
}
__name(handleNotify, "handleNotify");

// src/index.ts
function methodNotAllowed() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" }
  });
}
__name(methodNotAllowed, "methodNotAllowed");
var src_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    if (url.pathname === "/api/payfast/checkout") {
      if (request.method !== "POST") return methodNotAllowed();
      let body = {};
      try {
        body = await request.json();
      } catch {
        body = {};
      }
      const origin = (env2.APP_URL || url.origin).replace(/\/+$/, "");
      const result = buildCheckout(body, origin, payfastConfig(env2));
      return Response.json(result.body, { status: result.status });
    }
    if (url.pathname === "/api/payfast/notify") {
      if (request.method !== "POST") return methodNotAllowed();
      const contentType = request.headers.get("content-type") ?? "";
      let body = {};
      if (contentType.includes("application/json")) {
        try {
          body = await request.json();
        } catch {
          body = {};
        }
      } else {
        body = Object.fromEntries(new URLSearchParams(await request.text()));
      }
      const result = await handleNotify(body, payfastConfig(env2));
      return new Response(result.body, { status: result.status });
    }
    return new Response("Not Found", { status: 404 });
  }
};

// ../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-aeDmzp/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-aeDmzp/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
