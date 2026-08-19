import "@testing-library/jest-dom";

// jsdom doesn't implement scrollTo — add harmless no-op mocks
Element.prototype.scrollTo = jest.fn();
window.scrollTo = jest.fn();

// Polyfill Response for Node environment testing of Next.js Route Handlers
if (typeof global.Response === "undefined") {
  class MockResponse {
    constructor(body, init) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = init?.headers || {};
    }

    async json() {
      return typeof this.body === "string" ? JSON.parse(this.body) : this.body;
    }

    async text() {
      return typeof this.body === "string" ? this.body : JSON.stringify(this.body);
    }
  }

  global.Response = MockResponse;
}

// Mock matchMedia for prefers-reduced-motion queries
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver for scroll / in-view observers
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock framer-motion globally for Jest unit tests with component caching & full prop forwarding
jest.mock("framer-motion", () => {
  const React = require("react");

  const componentCache = new Map();

  const getComponent = (Tag) => {
    if (!componentCache.has(Tag)) {
      const Component = React.forwardRef(({ children, ...props }, ref) =>
        React.createElement(Tag, { ...props, ref }, children)
      );
      Component.displayName = `Motion(${Tag})`;
      componentCache.set(Tag, Component);
    }
    return componentCache.get(Tag);
  };

  const handler = {
    get: (_target, prop) => {
      if (typeof prop !== "string") return undefined;
      const validTags = ["div", "button", "a", "h1", "span", "article", "nav", "section", "p", "form", "input", "textarea"];
      const Tag = validTags.includes(prop) ? prop : "div";
      return getComponent(Tag);
    },
  };

  const mElements = new Proxy({}, handler);

  return {
    LazyMotion: ({ children }) => React.createElement(React.Fragment, null, children),
    domAnimation: {},
    m: mElements,
    motion: mElements,
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false,
    useMotionValue: (val) => ({ get: () => val, set: () => {} }),
    useSpring: (val) => val,
    useTransform: (val) => val,
  };
});
