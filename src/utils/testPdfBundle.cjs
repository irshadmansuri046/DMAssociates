// Zero-dependency unit test script for html2pdf.js bundled version in mock browser environment

console.log("Initializing mock browser environment with HTML5/Canvas/URL/Base64/DOM/Location APIs...");

const noop = () => {};

const mockURL = {
  createObjectURL: () => "blob:mock",
  revokeObjectURL: noop
};

// Overwrite Node's global URL class by forcing property definition
try {
  Object.defineProperty(global, 'URL', {
    value: mockURL,
    writable: true,
    configurable: true
  });
  console.log("Overwrote global.URL successfully.");
} catch (e) {
  global.URL = mockURL;
}

// Mock base64 decoders
const mockAtob = (str) => Buffer.from(str, 'base64').toString('binary');
const mockBtoa = (str) => Buffer.from(str, 'binary').toString('base64');

global.atob = mockAtob;
global.btoa = mockBtoa;

// Mock Location
const mockLocation = {
  href: "http://localhost:5173/",
  hostname: "localhost",
  protocol: "http:",
  search: "",
  hash: ""
};
global.location = mockLocation;

// Declare global document first
global.document = {
  createElement: (tag) => {
    return {
      tagName: tag.toUpperCase(),
      style: {},
      appendChild: noop,
      removeChild: noop,
      cloneNode: () => ({ style: {} }),
      querySelectorAll: () => [],
      getContext: () => ({})
    };
  },
  body: {
    appendChild: noop,
    removeChild: noop
  },
  location: mockLocation
};

// Mock browser globals required by html2pdf.js & jsPDF
global.window = {
  document: global.document, // Bind document on window
  location: mockLocation,    // Bind location on window
  navigator: {
    userAgent: "Mozilla/5.0 (NodeMock)"
  },
  URL: global.URL,
  atob: mockAtob,
  btoa: mockBtoa,
  HTMLCanvasElement: class HTMLCanvasElement {},
  CanvasRenderingContext2D: class CanvasRenderingContext2D {},
  Image: class Image {
    constructor() {
      setTimeout(() => this.onload && this.onload(), 10);
    }
  },
  Blob: class Blob {
    constructor() { this.size = 0; this.type = ""; }
  },
  Worker: class Worker {},
  matchMedia: () => ({ matches: false, addListener: noop, removeListener: noop })
};

global.self = global.window;
global.Blob = global.window.Blob;

try {
  console.log("Loading html2pdf.bundle.min.js...");
  
  // Require the bundled minified library
  const html2pdfModule = require('../../node_modules/html2pdf.js/dist/html2pdf.bundle.min.js');
  
  // In UMD, it should attach to self/window or export the constructor
  const html2pdf = html2pdfModule || global.window.html2pdf;
  
  console.log("Checking resolver function...");
  console.log("Type of html2pdf resolved:", typeof html2pdf);
  
  if (typeof html2pdf !== 'function') {
    throw new Error("Resolved html2pdf is not a function!");
  }
  
  console.log("Verifying instantiation...");
  const worker = html2pdf();
  console.log("Worker instance created successfully!");
  console.log("Worker methods available:", Object.keys(worker).filter(k => typeof worker[k] === 'function'));
  
  if (typeof worker.from !== 'function' || typeof worker.save !== 'function') {
    throw new Error("Worker does not expose standard html2pdf API methods!");
  }
  
  console.log("\n=============================================");
  console.log("✅ UNIT TEST PASSED SUCCESSFULLY!");
  console.log("The bundled html2pdf module resolves and instantiates perfectly.");
  console.log("=============================================");
  process.exit(0);

} catch (err) {
  console.error("\n=============================================");
  console.error("❌ UNIT TEST FAILED!");
  console.error("Error details:", err.message);
  console.error(err.stack);
  console.error("=============================================");
  process.exit(1);
}
