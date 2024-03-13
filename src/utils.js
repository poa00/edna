export function len(o) {
  return o ? o.length : 0;
}

export let platform = {
  // default to windows
  isMac: false,
  isWindows: true,
  isLinux: false,
};

/** @type {string} */
export let platformName;

const uaPlatform =
  typeof window !== "undefined"
    ? window?.navigator?.userAgentData?.platform ||
      window?.navigator.platform ||
      "Win" // in Deno there is window.navigator but no window.navigator.platform
    : "Win";
if (uaPlatform.indexOf("Win") !== -1) {
  platformName = "windows";
} else if (uaPlatform.indexOf("Linux") !== -1) {
  platform = {
    isMac: false,
    isWindows: false,
    isLinux: true,
  };
  platformName = "linux";
} else {
  platform = {
    isMac: true,
    isWindows: false,
    isLinux: false,
  };
  platformName = "darwin";
}
platform.isWebApp = true;

export function getModChar(platform = platformName) {
  return platform === "darwin" ? "⌘" : "Ctrl";
}
export function getAltChar(platform = platformName) {
  return platform === "darwin" ? "⌥" : "Alt";
}

const utf8Encoder = new TextEncoder(); // perf: a single globar encoder

export function toUtf8(text) {
  return utf8Encoder.encode(text);
}

// Maybe(perf): if text.length > 1 MB, return text.length
// TODO(perf): don't allocate utf8Bytes, iterate over chars and count bytes
export function stringSizeInUtf8Bytes(text) {
  let utf8Bytes = toUtf8(text);
  return utf8Bytes.length;
}

/**
 * @param {number} n
 * @returns {string}
 */
export function fmtSize(n) {
  // @type {[][number, string]}
  const a = [
    [1024 * 1024 * 1024 * 1024, "TB"],
    [1024 * 1024 * 1024, "GB"],
    [1024 * 1024, "MB"],
    [1024, "kB"],
  ];
  for (const el of a) {
    const size = Number(el[0]); // cast just to appease TS
    if (n >= size) {
      let s = (n / size).toFixed(2);
      return s.replace(".00", "") + " " + el[1];
    }
  }
  return `${n} B`;
}

// returns a function that, when called, returns number of elapsed milliseconds
export function startTimer() {
  const timeStart = performance.now();
  return function () {
    return Math.round(performance.now() - timeStart);
  };
}

export function getDateYYYYMMDD() {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero based
  let day = ("0" + date.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getDateYYYYMMDDDay() {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero based
  let day = ("0" + date.getDate()).slice(-2);
  let dayOfWeek = date.getDay();
  let dayName = daysOfWeek[dayOfWeek];
  let formattedDate = `${year}-${month}-${day} ${dayName}`;
  return formattedDate;
}

/**
 * "foo.TxT" => ".txt"
 * @param {string} fileName
 * @returns {string}
 */
export function fileExt(fileName) {
  const idx = fileName.lastIndexOf(".");
  if (idx === -1) {
    return "";
  }
  const ext = fileName.substring(idx);
  return ext.toLowerCase();
}
