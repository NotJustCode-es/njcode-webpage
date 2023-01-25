/*!
  * Bootstrap v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }

    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * Public Util API
   */


  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }

      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement$1 = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }

    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }

    return typeof object.nodeType !== 'undefined';
  };

  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement$1(object)) {
      return object.jquery ? object[0] : object;
    }

    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(object);
    }

    return null;
  };

  const isVisible = element => {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
      return false;
    }

    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

    const closedDetails = element.closest('details:not([open])');

    if (!closedDetails) {
      return elementIsVisible;
    }

    if (closedDetails !== element) {
      const summary = element.closest('summary');

      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }

      if (summary === null) {
        return false;
      }
    }

    return elementIsVisible;
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed

    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }

          hydrateObj(event, {
            delegateTarget: target
          });

          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    };
  }

  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }

  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);

    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }

    return [isDelegated, callable, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      callable = wrapFunction(callable);
    }

    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }

    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    for (const handlerKey of Object.keys(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },

    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },

    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }

        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }

      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }

      for (const keyHandlers of Object.keys(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      let evt = new Event(event, {
        bubbles,
        cancelable: true
      });
      evt = hydrateObj(evt, args);

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,

          get() {
            return value;
          }

        });
      }
    }

    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */
  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (value === Number(value).toString()) {
      return Number(value);
    }

    if (value === '' || value === 'null') {
      return null;
    }

    if (typeof value !== 'string') {
      return value;
    }

    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }

      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }

    static get DefaultType() {
      return {};
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      return config;
    }

    _mergeConfigObj(config, element) {
      const jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return { ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement$1(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }

    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const property of Object.keys(configTypes)) {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = isElement$1(value) ? 'element' : toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const VERSION = '5.2.2';
  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    } // Public


    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);

      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    } // Static


    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (isDisabled(this)) {
        return;
      }

      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';
  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    } // Public


    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

      if (closeEvent.defaultPrevented) {
        return;
      }

      this._element.classList.remove(CLASS_NAME_SHOW$8);

      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private


    _destroyElement() {
      this._element.remove();

      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * Data API implementation
   */


  enableDismissTrigger(Alert, 'close');
  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    } // Public


    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);

        if (config === 'toggle') {
          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);

      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };
  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;

      if (!element || !Swipe.isSupported()) {
        return;
      }

      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);

      this._initEvents();
    } // Getters


    static get Default() {
      return Default$c;
    }

    static get DefaultType() {
      return DefaultType$c;
    }

    static get NAME() {
      return NAME$d;
    } // Public


    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    } // Private


    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }

      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }

    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }

      this._handleSwipe();

      execute(this._config.endCallback);
    }

    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }

    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);

      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }

      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;

      if (!direction) {
        return;
      }

      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }

    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }

    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    } // Static


    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };
  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);

      this._addEventListeners();

      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    } // Getters


    static get Default() {
      return Default$b;
    }

    static get DefaultType() {
      return DefaultType$b;
    }

    static get NAME() {
      return NAME$c;
    } // Public


    next() {
      this._slide(ORDER_NEXT);
    }

    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }

    prev() {
      this._slide(ORDER_PREV);
    }

    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }

      this._clearInterval();
    }

    cycle() {
      this._clearInterval();

      this._updateInterval();

      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }

    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }

      this.cycle();
    }

    to(index) {
      const items = this._getItems();

      if (index > items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }

      const activeIndex = this._getItemIndex(this._getActive());

      if (activeIndex === index) {
        return;
      }

      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, items[index]);
    }

    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }

      super.dispose();
    } // Private


    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }

      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }

      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        } // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling


        this.pause();

        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }

        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };

      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(this._directionToOrder(direction));
      }
    }

    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }

    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }

      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);

      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }

    _updateInterval() {
      const element = this._activeElement || this._getActive();

      if (!element) {
        return;
      }

      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }

    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }

      const activeElement = this._getActive();

      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);

      if (nextElement === activeElement) {
        return;
      }

      const nextElementIndex = this._getItemIndex(nextElement);

      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };

      const slideEvent = triggerEvent(EVENT_SLIDE);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // todo: change tests that use empty divs to avoid this check
        return;
      }

      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;

      this._setActiveIndicatorElement(nextElementIndex);

      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };

      this._queueCallback(completeCallBack, activeElement, this._isAnimated());

      if (isCycling) {
        this.cycle();
      }
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }

    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }

    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }

    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }

    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }

    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);

        if (typeof config === 'number') {
          data.to(config);
          return;
        }

        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');

    if (slideIndex) {
      carousel.to(slideIndex);

      carousel._maybeEnableCycle();

      return;
    }

    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();

      carousel._maybeEnableCycle();

      return;
    }

    carousel.prev();

    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };
  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (const elem of toggleList) {
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);

        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    static get Default() {
      return Default$a;
    }

    static get DefaultType() {
      return DefaultType$a;
    }

    static get NAME() {
      return NAME$b;
    } // Public


    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }

      let activeChildren = []; // find active children

      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }

      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);

      if (startEvent.defaultPrevented) {
        return;
      }

      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);

      if (startEvent.defaultPrevented) {
        return;
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      for (const trigger of this._triggerArray) {
        const element = getElementFromSelector(trigger);

        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    } // Private


    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values

      config.parent = getElement(config.parent);
      return config;
    }

    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }

    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }

      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);

      for (const element of children) {
        const selected = getElementFromSelector(element);

        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }

    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }

      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    } // Static


    static jQueryInterface(config) {
      const _config = {};

      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    for (const element of selectorElements) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  const applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {

      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  const arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  const eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  const flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  const hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }
  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  const Popper = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    popperGenerator,
    detectOverflow,
    createPopperBase: createPopper$2,
    createPopper,
    createPopperLite: createPopper$1,
    top,
    bottom,
    right,
    left,
    auto,
    basePlacements,
    start,
    end,
    clippingParents,
    viewport,
    popper,
    reference,
    variationPlacements,
    placements,
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite,
    modifierPhases,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    computeStyles: computeStyles$1,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    offset: offset$1,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1
  }, Symbol.toStringTag, { value: 'Module' }));

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };
  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    } // Getters


    static get Default() {
      return Default$9;
    }

    static get DefaultType() {
      return DefaultType$9;
    }

    static get NAME() {
      return NAME$a;
    } // Public


    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }

    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._createPopper(); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.add(CLASS_NAME_SHOW$6);

      this._element.classList.add(CLASS_NAME_SHOW$6);

      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }

    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }

    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      super.dispose();
    }

    update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private


    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW$6);

      this._element.classList.remove(CLASS_NAME_SHOW$6);

      this._element.setAttribute('aria-expanded', 'false');

      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }

    _getConfig(config) {
      config = super._getConfig(config);

      if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }

      return config;
    }

    _createPopper() {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement$1(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }

    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }

    _getPlacement() {
      const parentDropdown = this._parent;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      } // We need to trim the value because custom properties can also include spaces


      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }

    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      }; // Disable Popper if we have a static display or Dropdown is in Navbar

      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY


      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }

      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);

      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }

        const relatedTarget = {
          relatedTarget: context._element
        };

        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        context._completeHide(relatedTarget);
      }
    }

    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);

      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }

      if (isInput && !isEscapeEvent) {
        return;
      }

      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);

      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();

        instance._selectMenuItem(event);

        return;
      }

      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';
  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    } // Public


    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }

    reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }

    isOverflowing() {
      return this.getWidth() > 0;
    } // Private


    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProperty);

        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }

        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (isElement$1(selector)) {
        callBack(selector);
        return;
      }

      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements

  };
  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };
  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    } // Getters


    static get Default() {
      return Default$8;
    }

    static get DefaultType() {
      return DefaultType$8;
    }

    static get NAME() {
      return NAME$9;
    } // Public


    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      const element = this._getElement();

      if (this._config.isAnimated) {
        reflow(element);
      }

      element.classList.add(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    } // Private


    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      const element = this._getElement();

      this._config.rootElement.append(element);

      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of

  };
  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };
  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    } // Getters


    static get Default() {
      return Default$7;
    }

    static get DefaultType() {
      return DefaultType$7;
    }

    static get NAME() {
      return NAME$8;
    } // Public


    activate() {
      if (this._isActive) {
        return;
      }

      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }

      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    } // Private


    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;

      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }

      const elements = SelectorEngine.focusableChildren(trapElement);

      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };
  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default$6;
    }

    static get DefaultType() {
      return DefaultType$6;
    }

    static get NAME() {
      return NAME$7;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._isTransitioning = true;

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._backdrop.show(() => this._showElement(relatedTarget));
    }

    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;
      this._isTransitioning = true;

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }

    dispose() {
      for (const htmlElement of [window, this._dialog]) {
        EventHandler.off(htmlElement, EVENT_KEY$4);
      }

      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    }

    handleUpdate() {
      this._adjustDialog();
    } // Private


    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW$4);

      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }

        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }

        if (this._config.keyboard) {
          event.preventDefault();
          this.hide();
          return;
        }

        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }

          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();

            return;
          }

          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }

    _hideModal() {
      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }

    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);

        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);

      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */


    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      const scrollbarWidth = this._scrollBar.getWidth();

      const isBodyOverflowing = scrollbarWidth > 0;

      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }

      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static


    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](relatedTarget);
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    }); // avoid conflict when clicking modal toggler while another one is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default$5;
    }

    static get DefaultType() {
      return DefaultType$5;
    }

    static get NAME() {
      return NAME$6;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOWING$1);

      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }

        this._element.classList.add(CLASS_NAME_SHOW$3);

        this._element.classList.remove(CLASS_NAME_SHOWING$1);

        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
      if (!this._isShown) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._focustrap.deactivate();

      this._element.blur();

      this._isShown = false;

      this._element.classList.add(CLASS_NAME_HIDING);

      this._backdrop.hide();

      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };

      this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    } // Private


    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      }; // 'static' option will be translated to true, and booleans will keep their value


      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }

        if (!this._config.keyboard) {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      });
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
      }

      return true;
    } // Check if a regular expression validates the attribute.


    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();

      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }

      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };
  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    } // Getters


    static get Default() {
      return Default$4;
    }

    static get DefaultType() {
      return DefaultType$4;
    }

    static get NAME() {
      return NAME$5;
    } // Public


    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }

    hasContent() {
      return this.getContent().length > 0;
    }

    changeContent(content) {
      this._checkContent(content);

      this._config.content = { ...this._config.content,
        ...content
      };
      return this;
    }

    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }

      const template = templateWrapper.children[0];

      const extraClass = this._resolvePossibleFunction(this._config.extraClass);

      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }

      return template;
    } // Private


    _typeCheckConfig(config) {
      super._typeCheckConfig(config);

      this._checkContent(config.content);
    }

    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }

    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);

      if (!templateElement) {
        return;
      }

      content = this._resolvePossibleFunction(content);

      if (!content) {
        templateElement.remove();
        return;
      }

      if (isElement$1(content)) {
        this._putElementInTemplate(getElement(content), templateElement);

        return;
      }

      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }

      templateElement.textContent = content;
    }

    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === 'function' ? arg(this) : arg;
    }

    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }

      templateElement.textContent = element.textContent;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 0],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };
  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      super(element, config); // Private

      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null; // Protected

      this.tip = null;

      this._setListeners();

      if (!this._config.selector) {
        this._fixTitle();
      }
    } // Getters


    static get Default() {
      return Default$3;
    }

    static get DefaultType() {
      return DefaultType$3;
    }

    static get NAME() {
      return NAME$4;
    } // Public


    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle() {
      if (!this._isEnabled) {
        return;
      }

      this._activeTrigger.click = !this._activeTrigger.click;

      if (this._isShown()) {
        this._leave();

        return;
      }

      this._enter();
    }

    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }

      this._disposePopper();

      super.dispose();
    }

    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);

      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      } // todo v6 remove this OR make it optional


      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }

      const tip = this._getTipElement();

      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));

      const {
        container
      } = this._config;

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = this._createPopper(tip);
      }

      tip.classList.add(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }

      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));

        if (this._isHovered === false) {
          this._leave();
        }

        this._isHovered = false;
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    hide() {
      if (!this._isShown()) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));

      if (hideEvent.defaultPrevented) {
        return;
      }

      const tip = this._getTipElement();

      tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }

        if (!this._isHovered) {
          tip.remove();
        }

        this._element.removeAttribute('aria-describedby');

        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));

        this._disposePopper();
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    update() {
      if (this._popper) {
        this._popper.update();
      }
    } // Protected


    _isWithContent() {
      return Boolean(this._getTitle());
    }

    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }

      return this.tip;
    }

    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6


      if (!tip) {
        return null;
      }

      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2); // todo: on v6 the following can be achieved with CSS only

      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);

      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }

      return tip;
    }

    setContent(content) {
      this._newContent = content;

      if (this._isShown()) {
        this._disposePopper();

        this.show();
      }
    }

    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({ ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }

      return this._templateFactory;
    }

    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }

    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    } // Private


    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }

    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }

    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }

    _createPopper(tip) {
      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === 'function' ? arg.call(this._element) : arg;
    }

    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _setListeners() {
      const triggers = this._config.trigger.split(' ');

      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

            context._leave();
          });
        }
      }

      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };

      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }

    _fixTitle() {
      const title = this._element.getAttribute('title');

      if (!title) {
        return;
      }

      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }

      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility


      this._element.removeAttribute('title');
    }

    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }

      this._isHovered = true;

      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }

    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }

      this._isHovered = false;

      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }

    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }

    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }

    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);

      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }

      config = { ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      return config;
    }

    _getDelegateConfig() {
      const config = {};

      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      }

      config.selector = false;
      config.trigger = 'manual'; // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`

      return config;
    }

    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * jQuery
   */


  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = { ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = { ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };
  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }

    static get DefaultType() {
      return DefaultType$2;
    }

    static get NAME() {
      return NAME$3;
    } // Overrides


    _isWithContent() {
      return this._getTitle() || this._getContent();
    } // Private


    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }

    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * jQuery
   */


  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };
  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    } // Getters


    static get Default() {
      return Default$1;
    }

    static get DefaultType() {
      return DefaultType$1;
    }

    static get NAME() {
      return NAME$2;
    } // Public


    refresh() {
      this._initializeTargetsAndObservables();

      this._maybeEnableSmoothScroll();

      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }

      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }

    dispose() {
      this._observer.disconnect();

      super.dispose();
    } // Private


    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;

      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }

      return config;
    }

    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      } // unregister any previous listeners


      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);

        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;

          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          } // Chrome 60 doesn't support `scrollTo`


          root.scrollTop = height;
        }
      });
    }

    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    } // The logic of selection


    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);

      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;

        this._process(targetElement(entry));
      };

      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;

      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;

          this._clearActiveClass(targetElement(entry));

          continue;
        }

        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

          if (!parentScrollTop) {
            return;
          }

          continue;
        } // if we are scrolling up, pick the smallest offsetTop


        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }

    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);

      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }

        const observableSection = SelectorEngine.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

        if (isVisible(observableSection)) {
          this._targetLinks.set(anchor.hash, anchor);

          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }

    _process(target) {
      if (this._activeTarget === target) {
        return;
      }

      this._clearActiveClass(this._config.target);

      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);

      this._activateParents(target);

      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }

    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }

      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }

    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);

      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);

      if (!this._parent) {
        return; // todo: should Throw exception on v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      } // Set up initial aria attributes


      this._setInitialAttributes(this._parent, this._getChildren());

      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    } // Getters


    static get NAME() {
      return NAME$1;
    } // Public


    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;

      if (this._elemIsActive(innerElem)) {
        return;
      } // Search for active tab on same parent to deactivate it


      const active = this._getActiveElem();

      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });

      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }

      this._deactivate(active, innerElem);

      this._activate(innerElem, active);
    } // Private


    _activate(element, relatedElem) {
      if (!element) {
        return;
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      this._activate(getElementFromSelector(element)); // Search and activate/show the proper section


      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }

        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);

        this._toggleDropDown(element, true);

        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };

      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }

      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();

      this._deactivate(getElementFromSelector(element)); // Search and deactivate the shown section too


      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }

        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');

        this._toggleDropDown(element, false);

        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };

      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
        return;
      }

      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

      event.preventDefault();
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      const nextActiveElement = getNextActiveElement(this._getChildren().filter(element => !isDisabled(element)), event.target, isNext, true);

      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }

    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }

    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }

    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');

      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }

    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);

      const isActive = this._elemIsActive(child);

      const outerElem = this._getOuterElement(child);

      child.setAttribute('aria-selected', isActive);

      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }

      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }

      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too


      this._setInitialAttributesOnTargetPanel(child);
    }

    _setInitialAttributesOnTargetPanel(child) {
      const target = getElementFromSelector(child);

      if (!target) {
        return;
      }

      this._setAttributeIfNotExists(target, 'role', 'tabpanel');

      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
      }
    }

    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);

      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }

      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);

        if (element) {
          element.classList.toggle(className, open);
        }
      };

      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }

    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }

    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    } // Try to get the inner element (usually the .nav-link)


    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    } // Try to get the outer element (usually the .nav-item)


    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    Tab.getOrCreateInstance(this).show();
  });
  /**
   * Initialize on focus
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;

      this._setListeners();
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);

        EventHandler.trigger(this._element, EVENT_SHOWN);

        this._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    hide() {
      if (!this.isShown()) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);

        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    dispose() {
      this._clearTimeout();

      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      super.dispose();
    }

    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    } // Private


    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }

    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }

        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      const nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }

    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }

    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config](this);
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  enableDismissTrigger(Toast);
  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));
//# sourceMappingURL=bootstrap.bundle.js.map

/*!
 * clipboard.js v2.0.8
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return n={686:function(t,e,n){"use strict";n.d(e,{default:function(){return o}});var e=n(279),i=n.n(e),e=n(370),u=n.n(e),e=n(817),c=n.n(e);function a(t){try{return document.execCommand(t)}catch(t){return}}var f=function(t){t=c()(t);return a("cut"),t};var l=function(t){var e,n,o,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{container:document.body},i="";return"string"==typeof t?(e=t,n="rtl"===document.documentElement.getAttribute("dir"),(o=document.createElement("textarea")).style.fontSize="12pt",o.style.border="0",o.style.padding="0",o.style.margin="0",o.style.position="absolute",o.style[n?"right":"left"]="-9999px",n=window.pageYOffset||document.documentElement.scrollTop,o.style.top="".concat(n,"px"),o.setAttribute("readonly",""),o.value=e,o=o,r.container.appendChild(o),i=c()(o),a("copy"),o.remove()):(i=c()(t),a("copy")),i};function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.action,n=void 0===e?"copy":e,o=t.container,e=t.target,t=t.text;if("copy"!==n&&"cut"!==n)throw new Error('Invalid "action" value, use either "copy" or "cut"');if(void 0!==e){if(!e||"object"!==r(e)||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===n&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===n&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')}return t?l(t,{container:o}):e?"cut"===n?f(e):l(e,{container:o}):void 0};function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var t,e=m(n);return t=o?(t=m(this).constructor,Reflect.construct(e,arguments,t)):e.apply(this,arguments),e=this,!(t=t)||"object"!==d(t)&&"function"!=typeof t?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){t="data-clipboard-".concat(t);if(e.hasAttribute(t))return e.getAttribute(t)}var o=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(r,i());var t,e,n,o=h(r);function r(t,e){var n;return function(t){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this),(n=o.call(this)).resolveOptions(e),n.listenClick(t),n}return t=r,n=[{key:"copy",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{container:document.body};return l(t,e)}},{key:"cut",value:function(t){return f(t)}},{key:"isSupported",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof t?[t]:t,e=!!document.queryCommandSupported;return t.forEach(function(t){e=e&&!!document.queryCommandSupported(t)}),e}}],(e=[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===d(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=u()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget,t=s({action:this.action(e),container:this.container,target:this.target(e),text:this.text(e)});this.emit(t?"success":"error",{action:this.action,text:t,trigger:e,clearSelection:function(){e&&e.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(t){return v("action",t)}},{key:"defaultTarget",value:function(t){t=v("target",t);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(t){return v("text",t)}},{key:"destroy",value:function(){this.listener.destroy()}}])&&p(t.prototype,e),n&&p(t,n),r}()},828:function(t){var e;"undefined"==typeof Element||Element.prototype.matches||((e=Element.prototype).matches=e.matchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector),t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},438:function(t,e,n){var u=n(828);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=u(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},879:function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},370:function(t,e,n){var f=n(879),l=n(438);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!f.string(e))throw new TypeError("Second argument must be a String");if(!f.fn(n))throw new TypeError("Third argument must be a Function");if(f.node(t))return c=e,a=n,(u=t).addEventListener(c,a),{destroy:function(){u.removeEventListener(c,a)}};if(f.nodeList(t))return o=t,r=e,i=n,Array.prototype.forEach.call(o,function(t){t.addEventListener(r,i)}),{destroy:function(){Array.prototype.forEach.call(o,function(t){t.removeEventListener(r,i)})}};if(f.string(t))return t=t,e=e,n=n,l(document.body,t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,u,c,a}},817:function(t){t.exports=function(t){var e,n="SELECT"===t.nodeName?(t.focus(),t.value):"INPUT"===t.nodeName||"TEXTAREA"===t.nodeName?((e=t.hasAttribute("readonly"))||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),e||t.removeAttribute("readonly"),t.value):(t.hasAttribute("contenteditable")&&t.focus(),n=window.getSelection(),(e=document.createRange()).selectNodeContents(t),n.removeAllRanges(),n.addRange(e),n.toString());return n}},279:function(t){function e(){}e.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,u=o.length;i<u;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=e,t.exports.TinyEmitter=e}},r={},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,{a:e}),e},o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o(686).default;function o(t){if(r[t])return r[t].exports;var e=r[t]={exports:{}};return n[t](e,e.exports,o),e.exports}var n,r});
/*!
 * Counter-Up2 v2.0.2
 * https://github.com/bfintal/Counter-Up2
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.counterUp=t():e.counterUp=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>n,divideNumbers:()=>r});const n=(e,t={})=>{const{action:n="start",duration:i=1e3,delay:u=16}=t;if("stop"===n)return void o(e);if(o(e),!/[0-9]/.test(e.innerHTML))return;const l=r(e.innerHTML,{duration:i||e.getAttribute("data-duration"),delay:u||e.getAttribute("data-delay")});e._countUpOrigInnerHTML=e.innerHTML,e.innerHTML=l[0]||"&nbsp;",e.style.visibility="visible";const c=function(){e.innerHTML=l.shift()||"&nbsp;",l.length?(clearTimeout(e.countUpTimeout),e.countUpTimeout=setTimeout(c,u)):e._countUpOrigInnerHTML=void 0};e.countUpTimeout=setTimeout(c,u)},o=e=>{clearTimeout(e.countUpTimeout),e._countUpOrigInnerHTML&&(e.innerHTML=e._countUpOrigInnerHTML,e._countUpOrigInnerHTML=void 0),e.style.visibility=""},r=(e,t={})=>{const{duration:n=1e3,delay:o=16}=t,r=n/o,i=e.toString().split(/(<[^>]+>|[0-9.][,.0-9]*[0-9]*)/),u=[];for(let e=0;e<r;e++)u.push("");for(let e=0;e<i.length;e++)if(/([0-9.][,.0-9]*[0-9]*)/.test(i[e])&&!/<[^>]+>/.test(i[e])){let t=i[e];const n=[...t.matchAll(/[.,]/g)].map((e=>({char:e[0],i:t.length-e.index-1}))).sort(((e,t)=>e.i-t.i));t=t.replace(/[.,]/g,"");let o=u.length-1;for(let e=r;e>=1;e--){let i=parseInt(t/r*e,10);i=n.reduce(((e,{char:t,i:n})=>e.length<=n?e:e.slice(0,-n)+t+e.slice(-n)),i.toString()),u[o--]+=i}}else for(let t=0;t<r;t++)u[t]+=i[e];return u[u.length]=e.toString(),u};return t})()}));
/*!
 * GLightbox v3.2.0
 * https://github.com/biati-digital/glightbox
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.GLightbox = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var uid = Date.now();
  function extend() {
    var extended = {};
    var deep = true;
    var i = 0;
    var length = arguments.length;

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    var merge = function merge(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;
  }
  function each(collection, callback) {
    if (isNode(collection) || collection === window || collection === document) {
      collection = [collection];
    }

    if (!isArrayLike(collection) && !isObject(collection)) {
      collection = [collection];
    }

    if (size(collection) == 0) {
      return;
    }

    if (isArrayLike(collection) && !isObject(collection)) {
      var l = collection.length,
          i = 0;

      for (; i < l; i++) {
        if (callback.call(collection[i], collection[i], i, collection) === false) {
          break;
        }
      }
    } else if (isObject(collection)) {
      for (var key in collection) {
        if (has(collection, key)) {
          if (callback.call(collection[key], collection[key], key, collection) === false) {
            break;
          }
        }
      }
    }
  }
  function getNodeEvents(node) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var cache = node[uid] = node[uid] || [];
    var data = {
      all: cache,
      evt: null,
      found: null
    };

    if (name && fn && size(cache) > 0) {
      each(cache, function (cl, i) {
        if (cl.eventName == name && cl.fn.toString() == fn.toString()) {
          data.found = true;
          data.evt = i;
          return false;
        }
      });
    }

    return data;
  }
  function addEvent(eventName) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        onElement = _ref.onElement,
        withCallback = _ref.withCallback,
        _ref$avoidDuplicate = _ref.avoidDuplicate,
        avoidDuplicate = _ref$avoidDuplicate === void 0 ? true : _ref$avoidDuplicate,
        _ref$once = _ref.once,
        once = _ref$once === void 0 ? false : _ref$once,
        _ref$useCapture = _ref.useCapture,
        useCapture = _ref$useCapture === void 0 ? false : _ref$useCapture;

    var thisArg = arguments.length > 2 ? arguments[2] : undefined;
    var element = onElement || [];

    if (isString(element)) {
      element = document.querySelectorAll(element);
    }

    function handler(event) {
      if (isFunction(withCallback)) {
        withCallback.call(thisArg, event, this);
      }

      if (once) {
        handler.destroy();
      }
    }

    handler.destroy = function () {
      each(element, function (el) {
        var events = getNodeEvents(el, eventName, handler);

        if (events.found) {
          events.all.splice(events.evt, 1);
        }

        if (el.removeEventListener) {
          el.removeEventListener(eventName, handler, useCapture);
        }
      });
    };

    each(element, function (el) {
      var events = getNodeEvents(el, eventName, handler);

      if (el.addEventListener && avoidDuplicate && !events.found || !avoidDuplicate) {
        el.addEventListener(eventName, handler, useCapture);
        events.all.push({
          eventName: eventName,
          fn: handler
        });
      }
    });
    return handler;
  }
  function addClass(node, name) {
    each(name.split(' '), function (cl) {
      return node.classList.add(cl);
    });
  }
  function removeClass(node, name) {
    each(name.split(' '), function (cl) {
      return node.classList.remove(cl);
    });
  }
  function hasClass(node, name) {
    return node.classList.contains(name);
  }
  function closest(elem, selector) {
    while (elem !== document.body) {
      elem = elem.parentElement;

      if (!elem) {
        return false;
      }

      var matches = typeof elem.matches == 'function' ? elem.matches(selector) : elem.msMatchesSelector(selector);

      if (matches) {
        return elem;
      }
    }
  }
  function animateElement(element) {
    var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!element || animation === '') {
      return false;
    }

    if (animation === 'none') {
      if (isFunction(callback)) {
        callback();
      }

      return false;
    }

    var animationEnd = whichAnimationEvent();
    var animationNames = animation.split(' ');
    each(animationNames, function (name) {
      addClass(element, 'g' + name);
    });
    addEvent(animationEnd, {
      onElement: element,
      avoidDuplicate: false,
      once: true,
      withCallback: function withCallback(event, target) {
        each(animationNames, function (name) {
          removeClass(target, 'g' + name);
        });

        if (isFunction(callback)) {
          callback();
        }
      }
    });
  }
  function cssTransform(node) {
    var translate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (translate === '') {
      node.style.webkitTransform = '';
      node.style.MozTransform = '';
      node.style.msTransform = '';
      node.style.OTransform = '';
      node.style.transform = '';
      return false;
    }

    node.style.webkitTransform = translate;
    node.style.MozTransform = translate;
    node.style.msTransform = translate;
    node.style.OTransform = translate;
    node.style.transform = translate;
  }
  function show(element) {
    element.style.display = 'block';
  }
  function hide(element) {
    element.style.display = 'none';
  }
  function createHTML(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;

    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }

    return frag;
  }
  function windowSize() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
  }
  function whichAnimationEvent() {
    var t,
        el = document.createElement('fakeelement');
    var animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd'
    };

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }
  function whichTransitionEvent() {
    var t,
        el = document.createElement('fakeelement');
    var transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
  function createIframe(config) {
    var url = config.url,
        allow = config.allow,
        callback = config.callback,
        appendTo = config.appendTo;
    var iframe = document.createElement('iframe');
    iframe.className = 'vimeo-video gvideo';
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    if (allow) {
      iframe.setAttribute('allow', allow);
    }

    iframe.onload = function () {
      iframe.onload = null;
      addClass(iframe, 'node-ready');

      if (isFunction(callback)) {
        callback();
      }
    };

    if (appendTo) {
      appendTo.appendChild(iframe);
    }

    return iframe;
  }
  function waitUntil(check, onComplete, delay, timeout) {
    if (check()) {
      onComplete();
      return;
    }

    if (!delay) {
      delay = 100;
    }

    var timeoutPointer;
    var intervalPointer = setInterval(function () {
      if (!check()) {
        return;
      }

      clearInterval(intervalPointer);

      if (timeoutPointer) {
        clearTimeout(timeoutPointer);
      }

      onComplete();
    }, delay);

    if (timeout) {
      timeoutPointer = setTimeout(function () {
        clearInterval(intervalPointer);
      }, timeout);
    }
  }
  function injectAssets(url, waitFor, callback) {
    if (isNil(url)) {
      console.error('Inject assets error');
      return;
    }

    if (isFunction(waitFor)) {
      callback = waitFor;
      waitFor = false;
    }

    if (isString(waitFor) && waitFor in window) {
      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    var found;

    if (url.indexOf('.css') !== -1) {
      found = document.querySelectorAll('link[href="' + url + '"]');

      if (found && found.length > 0) {
        if (isFunction(callback)) {
          callback();
        }

        return;
      }

      var head = document.getElementsByTagName('head')[0];
      var headStyles = head.querySelectorAll('link[rel="stylesheet"]');
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';

      if (headStyles) {
        head.insertBefore(link, headStyles[0]);
      } else {
        head.appendChild(link);
      }

      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    found = document.querySelectorAll('script[src="' + url + '"]');

    if (found && found.length > 0) {
      if (isFunction(callback)) {
        if (isString(waitFor)) {
          waitUntil(function () {
            return typeof window[waitFor] !== 'undefined';
          }, function () {
            callback();
          });
          return false;
        }

        callback();
      }

      return;
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onload = function () {
      if (isFunction(callback)) {
        if (isString(waitFor)) {
          waitUntil(function () {
            return typeof window[waitFor] !== 'undefined';
          }, function () {
            callback();
          });
          return false;
        }

        callback();
      }
    };

    document.body.appendChild(script);
  }
  function isMobile() {
    return 'navigator' in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
  }
  function isTouch() {
    return isMobile() !== null || document.createTouch !== undefined || 'ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints;
  }
  function isFunction(f) {
    return typeof f === 'function';
  }
  function isString(s) {
    return typeof s === 'string';
  }
  function isNode(el) {
    return !!(el && el.nodeType && el.nodeType == 1);
  }
  function isArray(ar) {
    return Array.isArray(ar);
  }
  function isArrayLike(ar) {
    return ar && ar.length && isFinite(ar.length);
  }
  function isObject(o) {
    var type = _typeof(o);

    return type === 'object' && o != null && !isFunction(o) && !isArray(o);
  }
  function isNil(o) {
    return o == null;
  }
  function has(obj, key) {
    return obj !== null && hasOwnProperty.call(obj, key);
  }
  function size(o) {
    if (isObject(o)) {
      if (o.keys) {
        return o.keys().length;
      }

      var l = 0;

      for (var k in o) {
        if (has(o, k)) {
          l++;
        }
      }

      return l;
    } else {
      return o.length;
    }
  }
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function getNextFocusElement() {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
    var btns = document.querySelectorAll('.gbtn[data-taborder]:not(.disabled)');

    if (!btns.length) {
      return false;
    }

    if (btns.length == 1) {
      return btns[0];
    }

    if (typeof current == 'string') {
      current = parseInt(current);
    }

    var orders = [];
    each(btns, function (btn) {
      orders.push(btn.getAttribute('data-taborder'));
    });
    var highestOrder = Math.max.apply(Math, orders.map(function (order) {
      return parseInt(order);
    }));
    var newIndex = current < 0 ? 1 : current + 1;

    if (newIndex > highestOrder) {
      newIndex = '1';
    }

    var nextOrders = orders.filter(function (el) {
      return el >= parseInt(newIndex);
    });
    var nextFocus = nextOrders.sort()[0];
    return document.querySelector(".gbtn[data-taborder=\"".concat(nextFocus, "\"]"));
  }

  function keyboardNavigation(instance) {
    if (instance.events.hasOwnProperty('keyboard')) {
      return false;
    }

    instance.events['keyboard'] = addEvent('keydown', {
      onElement: window,
      withCallback: function withCallback(event, target) {
        event = event || window.event;
        var key = event.keyCode;

        if (key == 9) {
          var focusedButton = document.querySelector('.gbtn.focused');

          if (!focusedButton) {
            var activeElement = document.activeElement && document.activeElement.nodeName ? document.activeElement.nodeName.toLocaleLowerCase() : false;

            if (activeElement == 'input' || activeElement == 'textarea' || activeElement == 'button') {
              return;
            }
          }

          event.preventDefault();
          var btns = document.querySelectorAll('.gbtn[data-taborder]');

          if (!btns || btns.length <= 0) {
            return;
          }

          if (!focusedButton) {
            var first = getNextFocusElement();

            if (first) {
              first.focus();
              addClass(first, 'focused');
            }

            return;
          }

          var currentFocusOrder = focusedButton.getAttribute('data-taborder');
          var nextFocus = getNextFocusElement(currentFocusOrder);
          removeClass(focusedButton, 'focused');

          if (nextFocus) {
            nextFocus.focus();
            addClass(nextFocus, 'focused');
          }
        }

        if (key == 39) {
          instance.nextSlide();
        }

        if (key == 37) {
          instance.prevSlide();
        }

        if (key == 27) {
          instance.close();
        }
      }
    });
  }

  function getLen(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  function getAngle(v1, v2) {
    var mr = getLen(v1) * getLen(v2);

    if (mr === 0) {
      return 0;
    }

    var r = dot(v1, v2) / mr;

    if (r > 1) {
      r = 1;
    }

    return Math.acos(r);
  }

  function cross(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
  }

  function getRotateAngle(v1, v2) {
    var angle = getAngle(v1, v2);

    if (cross(v1, v2) > 0) {
      angle *= -1;
    }

    return angle * 180 / Math.PI;
  }

  var EventsHandlerAdmin = function () {
    function EventsHandlerAdmin(el) {
      _classCallCheck(this, EventsHandlerAdmin);

      this.handlers = [];
      this.el = el;
    }

    _createClass(EventsHandlerAdmin, [{
      key: "add",
      value: function add(handler) {
        this.handlers.push(handler);
      }
    }, {
      key: "del",
      value: function del(handler) {
        if (!handler) {
          this.handlers = [];
        }

        for (var i = this.handlers.length; i >= 0; i--) {
          if (this.handlers[i] === handler) {
            this.handlers.splice(i, 1);
          }
        }
      }
    }, {
      key: "dispatch",
      value: function dispatch() {
        for (var i = 0, len = this.handlers.length; i < len; i++) {
          var handler = this.handlers[i];

          if (typeof handler === 'function') {
            handler.apply(this.el, arguments);
          }
        }
      }
    }]);

    return EventsHandlerAdmin;
  }();

  function wrapFunc(el, handler) {
    var EventshandlerAdmin = new EventsHandlerAdmin(el);
    EventshandlerAdmin.add(handler);
    return EventshandlerAdmin;
  }

  var TouchEvents = function () {
    function TouchEvents(el, option) {
      _classCallCheck(this, TouchEvents);

      this.element = typeof el == 'string' ? document.querySelector(el) : el;
      this.start = this.start.bind(this);
      this.move = this.move.bind(this);
      this.end = this.end.bind(this);
      this.cancel = this.cancel.bind(this);
      this.element.addEventListener('touchstart', this.start, false);
      this.element.addEventListener('touchmove', this.move, false);
      this.element.addEventListener('touchend', this.end, false);
      this.element.addEventListener('touchcancel', this.cancel, false);
      this.preV = {
        x: null,
        y: null
      };
      this.pinchStartLen = null;
      this.zoom = 1;
      this.isDoubleTap = false;

      var noop = function noop() {};

      this.rotate = wrapFunc(this.element, option.rotate || noop);
      this.touchStart = wrapFunc(this.element, option.touchStart || noop);
      this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
      this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
      this.pinch = wrapFunc(this.element, option.pinch || noop);
      this.swipe = wrapFunc(this.element, option.swipe || noop);
      this.tap = wrapFunc(this.element, option.tap || noop);
      this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
      this.longTap = wrapFunc(this.element, option.longTap || noop);
      this.singleTap = wrapFunc(this.element, option.singleTap || noop);
      this.pressMove = wrapFunc(this.element, option.pressMove || noop);
      this.twoFingerPressMove = wrapFunc(this.element, option.twoFingerPressMove || noop);
      this.touchMove = wrapFunc(this.element, option.touchMove || noop);
      this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
      this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);
      this.translateContainer = this.element;
      this._cancelAllHandler = this.cancelAll.bind(this);
      window.addEventListener('scroll', this._cancelAllHandler);
      this.delta = null;
      this.last = null;
      this.now = null;
      this.tapTimeout = null;
      this.singleTapTimeout = null;
      this.longTapTimeout = null;
      this.swipeTimeout = null;
      this.x1 = this.x2 = this.y1 = this.y2 = null;
      this.preTapPosition = {
        x: null,
        y: null
      };
    }

    _createClass(TouchEvents, [{
      key: "start",
      value: function start(evt) {
        if (!evt.touches) {
          return;
        }

        var ignoreDragFor = ['a', 'button', 'input'];

        if (evt.target && evt.target.nodeName && ignoreDragFor.indexOf(evt.target.nodeName.toLowerCase()) >= 0) {
          console.log('ignore drag for this touched element', evt.target.nodeName.toLowerCase());
          return;
        }

        this.now = Date.now();
        this.x1 = evt.touches[0].pageX;
        this.y1 = evt.touches[0].pageY;
        this.delta = this.now - (this.last || this.now);
        this.touchStart.dispatch(evt, this.element);

        if (this.preTapPosition.x !== null) {
          this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30;

          if (this.isDoubleTap) {
            clearTimeout(this.singleTapTimeout);
          }
        }

        this.preTapPosition.x = this.x1;
        this.preTapPosition.y = this.y1;
        this.last = this.now;
        var preV = this.preV,
            len = evt.touches.length;

        if (len > 1) {
          this._cancelLongTap();

          this._cancelSingleTap();

          var v = {
            x: evt.touches[1].pageX - this.x1,
            y: evt.touches[1].pageY - this.y1
          };
          preV.x = v.x;
          preV.y = v.y;
          this.pinchStartLen = getLen(preV);
          this.multipointStart.dispatch(evt, this.element);
        }

        this._preventTap = false;
        this.longTapTimeout = setTimeout(function () {
          this.longTap.dispatch(evt, this.element);
          this._preventTap = true;
        }.bind(this), 750);
      }
    }, {
      key: "move",
      value: function move(evt) {
        if (!evt.touches) {
          return;
        }

        var preV = this.preV,
            len = evt.touches.length,
            currentX = evt.touches[0].pageX,
            currentY = evt.touches[0].pageY;
        this.isDoubleTap = false;

        if (len > 1) {
          var sCurrentX = evt.touches[1].pageX,
              sCurrentY = evt.touches[1].pageY;
          var v = {
            x: evt.touches[1].pageX - currentX,
            y: evt.touches[1].pageY - currentY
          };

          if (preV.x !== null) {
            if (this.pinchStartLen > 0) {
              evt.zoom = getLen(v) / this.pinchStartLen;
              this.pinch.dispatch(evt, this.element);
            }

            evt.angle = getRotateAngle(v, preV);
            this.rotate.dispatch(evt, this.element);
          }

          preV.x = v.x;
          preV.y = v.y;

          if (this.x2 !== null && this.sx2 !== null) {
            evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
            evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
          } else {
            evt.deltaX = 0;
            evt.deltaY = 0;
          }

          this.twoFingerPressMove.dispatch(evt, this.element);
          this.sx2 = sCurrentX;
          this.sy2 = sCurrentY;
        } else {
          if (this.x2 !== null) {
            evt.deltaX = currentX - this.x2;
            evt.deltaY = currentY - this.y2;
            var movedX = Math.abs(this.x1 - this.x2),
                movedY = Math.abs(this.y1 - this.y2);

            if (movedX > 10 || movedY > 10) {
              this._preventTap = true;
            }
          } else {
            evt.deltaX = 0;
            evt.deltaY = 0;
          }

          this.pressMove.dispatch(evt, this.element);
        }

        this.touchMove.dispatch(evt, this.element);

        this._cancelLongTap();

        this.x2 = currentX;
        this.y2 = currentY;

        if (len > 1) {
          evt.preventDefault();
        }
      }
    }, {
      key: "end",
      value: function end(evt) {
        if (!evt.changedTouches) {
          return;
        }

        this._cancelLongTap();

        var self = this;

        if (evt.touches.length < 2) {
          this.multipointEnd.dispatch(evt, this.element);
          this.sx2 = this.sy2 = null;
        }

        if (this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30) {
          evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
          this.swipeTimeout = setTimeout(function () {
            self.swipe.dispatch(evt, self.element);
          }, 0);
        } else {
          this.tapTimeout = setTimeout(function () {
            if (!self._preventTap) {
              self.tap.dispatch(evt, self.element);
            }

            if (self.isDoubleTap) {
              self.doubleTap.dispatch(evt, self.element);
              self.isDoubleTap = false;
            }
          }, 0);

          if (!self.isDoubleTap) {
            self.singleTapTimeout = setTimeout(function () {
              self.singleTap.dispatch(evt, self.element);
            }, 250);
          }
        }

        this.touchEnd.dispatch(evt, this.element);
        this.preV.x = 0;
        this.preV.y = 0;
        this.zoom = 1;
        this.pinchStartLen = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
      }
    }, {
      key: "cancelAll",
      value: function cancelAll() {
        this._preventTap = true;
        clearTimeout(this.singleTapTimeout);
        clearTimeout(this.tapTimeout);
        clearTimeout(this.longTapTimeout);
        clearTimeout(this.swipeTimeout);
      }
    }, {
      key: "cancel",
      value: function cancel(evt) {
        this.cancelAll();
        this.touchCancel.dispatch(evt, this.element);
      }
    }, {
      key: "_cancelLongTap",
      value: function _cancelLongTap() {
        clearTimeout(this.longTapTimeout);
      }
    }, {
      key: "_cancelSingleTap",
      value: function _cancelSingleTap() {
        clearTimeout(this.singleTapTimeout);
      }
    }, {
      key: "_swipeDirection",
      value: function _swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
      }
    }, {
      key: "on",
      value: function on(evt, handler) {
        if (this[evt]) {
          this[evt].add(handler);
        }
      }
    }, {
      key: "off",
      value: function off(evt, handler) {
        if (this[evt]) {
          this[evt].del(handler);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.singleTapTimeout) {
          clearTimeout(this.singleTapTimeout);
        }

        if (this.tapTimeout) {
          clearTimeout(this.tapTimeout);
        }

        if (this.longTapTimeout) {
          clearTimeout(this.longTapTimeout);
        }

        if (this.swipeTimeout) {
          clearTimeout(this.swipeTimeout);
        }

        this.element.removeEventListener('touchstart', this.start);
        this.element.removeEventListener('touchmove', this.move);
        this.element.removeEventListener('touchend', this.end);
        this.element.removeEventListener('touchcancel', this.cancel);
        this.rotate.del();
        this.touchStart.del();
        this.multipointStart.del();
        this.multipointEnd.del();
        this.pinch.del();
        this.swipe.del();
        this.tap.del();
        this.doubleTap.del();
        this.longTap.del();
        this.singleTap.del();
        this.pressMove.del();
        this.twoFingerPressMove.del();
        this.touchMove.del();
        this.touchEnd.del();
        this.touchCancel.del();
        this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null;
        window.removeEventListener('scroll', this._cancelAllHandler);
        return null;
      }
    }]);

    return TouchEvents;
  }();

  function resetSlideMove(slide) {
    var transitionEnd = whichTransitionEvent();
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var media = hasClass(slide, 'gslide-media') ? slide : slide.querySelector('.gslide-media');
    var container = closest(media, '.ginner-container');
    var desc = slide.querySelector('.gslide-description');

    if (windowWidth > 769) {
      media = container;
    }

    addClass(media, 'greset');
    cssTransform(media, 'translate3d(0, 0, 0)');
    addEvent(transitionEnd, {
      onElement: media,
      once: true,
      withCallback: function withCallback(event, target) {
        removeClass(media, 'greset');
      }
    });
    media.style.opacity = '';

    if (desc) {
      desc.style.opacity = '';
    }
  }

  function touchNavigation(instance) {
    if (instance.events.hasOwnProperty('touch')) {
      return false;
    }

    var winSize = windowSize();
    var winWidth = winSize.width;
    var winHeight = winSize.height;
    var process = false;
    var currentSlide = null;
    var media = null;
    var mediaImage = null;
    var doingMove = false;
    var initScale = 1;
    var maxScale = 4.5;
    var currentScale = 1;
    var doingZoom = false;
    var imageZoomed = false;
    var zoomedPosX = null;
    var zoomedPosY = null;
    var lastZoomedPosX = null;
    var lastZoomedPosY = null;
    var hDistance;
    var vDistance;
    var hDistancePercent = 0;
    var vDistancePercent = 0;
    var vSwipe = false;
    var hSwipe = false;
    var startCoords = {};
    var endCoords = {};
    var xDown = 0;
    var yDown = 0;
    var isInlined;
    var sliderWrapper = document.getElementById('glightbox-slider');
    var overlay = document.querySelector('.goverlay');
    var touchInstance = new TouchEvents(sliderWrapper, {
      touchStart: function touchStart(e) {
        process = true;

        if (hasClass(e.targetTouches[0].target, 'ginner-container') || closest(e.targetTouches[0].target, '.gslide-desc') || e.targetTouches[0].target.nodeName.toLowerCase() == 'a') {
          process = false;
        }

        if (closest(e.targetTouches[0].target, '.gslide-inline') && !hasClass(e.targetTouches[0].target.parentNode, 'gslide-inline')) {
          process = false;
        }

        if (process) {
          endCoords = e.targetTouches[0];
          startCoords.pageX = e.targetTouches[0].pageX;
          startCoords.pageY = e.targetTouches[0].pageY;
          xDown = e.targetTouches[0].clientX;
          yDown = e.targetTouches[0].clientY;
          currentSlide = instance.activeSlide;
          media = currentSlide.querySelector('.gslide-media');
          isInlined = currentSlide.querySelector('.gslide-inline');
          mediaImage = null;

          if (hasClass(media, 'gslide-image')) {
            mediaImage = media.querySelector('img');
          }

          var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

          if (windowWidth > 769) {
            media = currentSlide.querySelector('.ginner-container');
          }

          removeClass(overlay, 'greset');

          if (e.pageX > 20 && e.pageX < window.innerWidth - 20) {
            return;
          }

          e.preventDefault();
        }
      },
      touchMove: function touchMove(e) {
        if (!process) {
          return;
        }

        endCoords = e.targetTouches[0];

        if (doingZoom || imageZoomed) {
          return;
        }

        if (isInlined && isInlined.offsetHeight > winHeight) {
          var moved = startCoords.pageX - endCoords.pageX;

          if (Math.abs(moved) <= 13) {
            return false;
          }
        }

        doingMove = true;
        var xUp = e.targetTouches[0].clientX;
        var yUp = e.targetTouches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          vSwipe = false;
          hSwipe = true;
        } else {
          hSwipe = false;
          vSwipe = true;
        }

        hDistance = endCoords.pageX - startCoords.pageX;
        hDistancePercent = hDistance * 100 / winWidth;
        vDistance = endCoords.pageY - startCoords.pageY;
        vDistancePercent = vDistance * 100 / winHeight;
        var opacity;

        if (vSwipe && mediaImage) {
          opacity = 1 - Math.abs(vDistance) / winHeight;
          overlay.style.opacity = opacity;

          if (instance.settings.touchFollowAxis) {
            hDistancePercent = 0;
          }
        }

        if (hSwipe) {
          opacity = 1 - Math.abs(hDistance) / winWidth;
          media.style.opacity = opacity;

          if (instance.settings.touchFollowAxis) {
            vDistancePercent = 0;
          }
        }

        if (!mediaImage) {
          return cssTransform(media, "translate3d(".concat(hDistancePercent, "%, 0, 0)"));
        }

        cssTransform(media, "translate3d(".concat(hDistancePercent, "%, ").concat(vDistancePercent, "%, 0)"));
      },
      touchEnd: function touchEnd() {
        if (!process) {
          return;
        }

        doingMove = false;

        if (imageZoomed || doingZoom) {
          lastZoomedPosX = zoomedPosX;
          lastZoomedPosY = zoomedPosY;
          return;
        }

        var v = Math.abs(parseInt(vDistancePercent));
        var h = Math.abs(parseInt(hDistancePercent));

        if (v > 29 && mediaImage) {
          instance.close();
          return;
        }

        if (v < 29 && h < 25) {
          addClass(overlay, 'greset');
          overlay.style.opacity = 1;
          return resetSlideMove(media);
        }
      },
      multipointEnd: function multipointEnd() {
        setTimeout(function () {
          doingZoom = false;
        }, 50);
      },
      multipointStart: function multipointStart() {
        doingZoom = true;
        initScale = currentScale ? currentScale : 1;
      },
      pinch: function pinch(evt) {
        if (!mediaImage || doingMove) {
          return false;
        }

        doingZoom = true;
        mediaImage.scaleX = mediaImage.scaleY = initScale * evt.zoom;
        var scale = initScale * evt.zoom;
        imageZoomed = true;

        if (scale <= 1) {
          imageZoomed = false;
          scale = 1;
          lastZoomedPosY = null;
          lastZoomedPosX = null;
          zoomedPosX = null;
          zoomedPosY = null;
          mediaImage.setAttribute('style', '');
          return;
        }

        if (scale > maxScale) {
          scale = maxScale;
        }

        mediaImage.style.transform = "scale3d(".concat(scale, ", ").concat(scale, ", 1)");
        currentScale = scale;
      },
      pressMove: function pressMove(e) {
        if (imageZoomed && !doingZoom) {
          var mhDistance = endCoords.pageX - startCoords.pageX;
          var mvDistance = endCoords.pageY - startCoords.pageY;

          if (lastZoomedPosX) {
            mhDistance = mhDistance + lastZoomedPosX;
          }

          if (lastZoomedPosY) {
            mvDistance = mvDistance + lastZoomedPosY;
          }

          zoomedPosX = mhDistance;
          zoomedPosY = mvDistance;
          var style = "translate3d(".concat(mhDistance, "px, ").concat(mvDistance, "px, 0)");

          if (currentScale) {
            style += " scale3d(".concat(currentScale, ", ").concat(currentScale, ", 1)");
          }

          cssTransform(mediaImage, style);
        }
      },
      swipe: function swipe(evt) {
        if (imageZoomed) {
          return;
        }

        if (doingZoom) {
          doingZoom = false;
          return;
        }

        if (evt.direction == 'Left') {
          if (instance.index == instance.elements.length - 1) {
            return resetSlideMove(media);
          }

          instance.nextSlide();
        }

        if (evt.direction == 'Right') {
          if (instance.index == 0) {
            return resetSlideMove(media);
          }

          instance.prevSlide();
        }
      }
    });
    instance.events['touch'] = touchInstance;
  }

  var ZoomImages = function () {
    function ZoomImages(el, slide) {
      var _this = this;

      var onclose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      _classCallCheck(this, ZoomImages);

      this.img = el;
      this.slide = slide;
      this.onclose = onclose;

      if (this.img.setZoomEvents) {
        return false;
      }

      this.active = false;
      this.zoomedIn = false;
      this.dragging = false;
      this.currentX = null;
      this.currentY = null;
      this.initialX = null;
      this.initialY = null;
      this.xOffset = 0;
      this.yOffset = 0;
      this.img.addEventListener('mousedown', function (e) {
        return _this.dragStart(e);
      }, false);
      this.img.addEventListener('mouseup', function (e) {
        return _this.dragEnd(e);
      }, false);
      this.img.addEventListener('mousemove', function (e) {
        return _this.drag(e);
      }, false);
      this.img.addEventListener('click', function (e) {
        if (_this.slide.classList.contains('dragging-nav')) {
          _this.zoomOut();

          return false;
        }

        if (!_this.zoomedIn) {
          return _this.zoomIn();
        }

        if (_this.zoomedIn && !_this.dragging) {
          _this.zoomOut();
        }
      }, false);
      this.img.setZoomEvents = true;
    }

    _createClass(ZoomImages, [{
      key: "zoomIn",
      value: function zoomIn() {
        var winWidth = this.widowWidth();

        if (this.zoomedIn || winWidth <= 768) {
          return;
        }

        var img = this.img;
        img.setAttribute('data-style', img.getAttribute('style'));
        img.style.maxWidth = img.naturalWidth + 'px';
        img.style.maxHeight = img.naturalHeight + 'px';

        if (img.naturalWidth > winWidth) {
          var centerX = winWidth / 2 - img.naturalWidth / 2;
          this.setTranslate(this.img.parentNode, centerX, 0);
        }

        this.slide.classList.add('zoomed');
        this.zoomedIn = true;
      }
    }, {
      key: "zoomOut",
      value: function zoomOut() {
        this.img.parentNode.setAttribute('style', '');
        this.img.setAttribute('style', this.img.getAttribute('data-style'));
        this.slide.classList.remove('zoomed');
        this.zoomedIn = false;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;

        if (this.onclose && typeof this.onclose == 'function') {
          this.onclose();
        }
      }
    }, {
      key: "dragStart",
      value: function dragStart(e) {
        e.preventDefault();

        if (!this.zoomedIn) {
          this.active = false;
          return;
        }

        if (e.type === 'touchstart') {
          this.initialX = e.touches[0].clientX - this.xOffset;
          this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
          this.initialX = e.clientX - this.xOffset;
          this.initialY = e.clientY - this.yOffset;
        }

        if (e.target === this.img) {
          this.active = true;
          this.img.classList.add('dragging');
        }
      }
    }, {
      key: "dragEnd",
      value: function dragEnd(e) {
        var _this2 = this;

        e.preventDefault();
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
        setTimeout(function () {
          _this2.dragging = false;
          _this2.img.isDragging = false;

          _this2.img.classList.remove('dragging');
        }, 100);
      }
    }, {
      key: "drag",
      value: function drag(e) {
        if (this.active) {
          e.preventDefault();

          if (e.type === 'touchmove') {
            this.currentX = e.touches[0].clientX - this.initialX;
            this.currentY = e.touches[0].clientY - this.initialY;
          } else {
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
          }

          this.xOffset = this.currentX;
          this.yOffset = this.currentY;
          this.img.isDragging = true;
          this.dragging = true;
          this.setTranslate(this.img, this.currentX, this.currentY);
        }
      }
    }, {
      key: "onMove",
      value: function onMove(e) {
        if (!this.zoomedIn) {
          return;
        }

        var xOffset = e.clientX - this.img.naturalWidth / 2;
        var yOffset = e.clientY - this.img.naturalHeight / 2;
        this.setTranslate(this.img, xOffset, yOffset);
      }
    }, {
      key: "setTranslate",
      value: function setTranslate(node, xPos, yPos) {
        node.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
      }
    }, {
      key: "widowWidth",
      value: function widowWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      }
    }]);

    return ZoomImages;
  }();

  var DragSlides = function () {
    function DragSlides() {
      var _this = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, DragSlides);

      var dragEl = config.dragEl,
          _config$toleranceX = config.toleranceX,
          toleranceX = _config$toleranceX === void 0 ? 40 : _config$toleranceX,
          _config$toleranceY = config.toleranceY,
          toleranceY = _config$toleranceY === void 0 ? 65 : _config$toleranceY,
          _config$slide = config.slide,
          slide = _config$slide === void 0 ? null : _config$slide,
          _config$instance = config.instance,
          instance = _config$instance === void 0 ? null : _config$instance;
      this.el = dragEl;
      this.active = false;
      this.dragging = false;
      this.currentX = null;
      this.currentY = null;
      this.initialX = null;
      this.initialY = null;
      this.xOffset = 0;
      this.yOffset = 0;
      this.direction = null;
      this.lastDirection = null;
      this.toleranceX = toleranceX;
      this.toleranceY = toleranceY;
      this.toleranceReached = false;
      this.dragContainer = this.el;
      this.slide = slide;
      this.instance = instance;
      this.el.addEventListener('mousedown', function (e) {
        return _this.dragStart(e);
      }, false);
      this.el.addEventListener('mouseup', function (e) {
        return _this.dragEnd(e);
      }, false);
      this.el.addEventListener('mousemove', function (e) {
        return _this.drag(e);
      }, false);
    }

    _createClass(DragSlides, [{
      key: "dragStart",
      value: function dragStart(e) {
        if (this.slide.classList.contains('zoomed')) {
          this.active = false;
          return;
        }

        if (e.type === 'touchstart') {
          this.initialX = e.touches[0].clientX - this.xOffset;
          this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
          this.initialX = e.clientX - this.xOffset;
          this.initialY = e.clientY - this.yOffset;
        }

        var clicked = e.target.nodeName.toLowerCase();
        var exludeClicks = ['input', 'select', 'textarea', 'button', 'a'];

        if (e.target.classList.contains('nodrag') || closest(e.target, '.nodrag') || exludeClicks.indexOf(clicked) !== -1) {
          this.active = false;
          return;
        }

        e.preventDefault();

        if (e.target === this.el || clicked !== 'img' && closest(e.target, '.gslide-inline')) {
          this.active = true;
          this.el.classList.add('dragging');
          this.dragContainer = closest(e.target, '.ginner-container');
        }
      }
    }, {
      key: "dragEnd",
      value: function dragEnd(e) {
        var _this2 = this;

        e && e.preventDefault();
        this.initialX = 0;
        this.initialY = 0;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;
        this.active = false;

        if (this.doSlideChange) {
          this.instance.preventOutsideClick = true;
          this.doSlideChange == 'right' && this.instance.prevSlide();
          this.doSlideChange == 'left' && this.instance.nextSlide();
        }

        if (this.doSlideClose) {
          this.instance.close();
        }

        if (!this.toleranceReached) {
          this.setTranslate(this.dragContainer, 0, 0, true);
        }

        setTimeout(function () {
          _this2.instance.preventOutsideClick = false;
          _this2.toleranceReached = false;
          _this2.lastDirection = null;
          _this2.dragging = false;
          _this2.el.isDragging = false;

          _this2.el.classList.remove('dragging');

          _this2.slide.classList.remove('dragging-nav');

          _this2.dragContainer.style.transform = '';
          _this2.dragContainer.style.transition = '';
        }, 100);
      }
    }, {
      key: "drag",
      value: function drag(e) {
        if (this.active) {
          e.preventDefault();
          this.slide.classList.add('dragging-nav');

          if (e.type === 'touchmove') {
            this.currentX = e.touches[0].clientX - this.initialX;
            this.currentY = e.touches[0].clientY - this.initialY;
          } else {
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
          }

          this.xOffset = this.currentX;
          this.yOffset = this.currentY;
          this.el.isDragging = true;
          this.dragging = true;
          this.doSlideChange = false;
          this.doSlideClose = false;
          var currentXInt = Math.abs(this.currentX);
          var currentYInt = Math.abs(this.currentY);

          if (currentXInt > 0 && currentXInt >= Math.abs(this.currentY) && (!this.lastDirection || this.lastDirection == 'x')) {
            this.yOffset = 0;
            this.lastDirection = 'x';
            this.setTranslate(this.dragContainer, this.currentX, 0);
            var doChange = this.shouldChange();

            if (!this.instance.settings.dragAutoSnap && doChange) {
              this.doSlideChange = doChange;
            }

            if (this.instance.settings.dragAutoSnap && doChange) {
              this.instance.preventOutsideClick = true;
              this.toleranceReached = true;
              this.active = false;
              this.instance.preventOutsideClick = true;
              this.dragEnd(null);
              doChange == 'right' && this.instance.prevSlide();
              doChange == 'left' && this.instance.nextSlide();
              return;
            }
          }

          if (this.toleranceY > 0 && currentYInt > 0 && currentYInt >= currentXInt && (!this.lastDirection || this.lastDirection == 'y')) {
            this.xOffset = 0;
            this.lastDirection = 'y';
            this.setTranslate(this.dragContainer, 0, this.currentY);
            var doClose = this.shouldClose();

            if (!this.instance.settings.dragAutoSnap && doClose) {
              this.doSlideClose = true;
            }

            if (this.instance.settings.dragAutoSnap && doClose) {
              this.instance.close();
            }

            return;
          }
        }
      }
    }, {
      key: "shouldChange",
      value: function shouldChange() {
        var doChange = false;
        var currentXInt = Math.abs(this.currentX);

        if (currentXInt >= this.toleranceX) {
          var dragDir = this.currentX > 0 ? 'right' : 'left';

          if (dragDir == 'left' && this.slide !== this.slide.parentNode.lastChild || dragDir == 'right' && this.slide !== this.slide.parentNode.firstChild) {
            doChange = dragDir;
          }
        }

        return doChange;
      }
    }, {
      key: "shouldClose",
      value: function shouldClose() {
        var doClose = false;
        var currentYInt = Math.abs(this.currentY);

        if (currentYInt >= this.toleranceY) {
          doClose = true;
        }

        return doClose;
      }
    }, {
      key: "setTranslate",
      value: function setTranslate(node, xPos, yPos) {
        var animated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (animated) {
          node.style.transition = 'all .2s ease';
        } else {
          node.style.transition = '';
        }

        node.style.transform = "translate3d(".concat(xPos, "px, ").concat(yPos, "px, 0)");
      }
    }]);

    return DragSlides;
  }();

  function slideImage(slide, data, index, callback) {
    var slideMedia = slide.querySelector('.gslide-media');
    var img = new Image();
    var titleID = 'gSlideTitle_' + index;
    var textID = 'gSlideDesc_' + index;
    img.addEventListener('load', function () {
      if (isFunction(callback)) {
        callback();
      }
    }, false);
    img.src = data.href;

    if (data.sizes != '' && data.srcset != '') {
      img.sizes = data.sizes;
      img.srcset = data.srcset;
    }

    img.alt = '';

    if (!isNil(data.alt) && data.alt !== '') {
      img.alt = data.alt;
    }

    if (data.title !== '') {
      img.setAttribute('aria-labelledby', titleID);
    }

    if (data.description !== '') {
      img.setAttribute('aria-describedby', textID);
    }

    if (data.hasOwnProperty('_hasCustomWidth') && data._hasCustomWidth) {
      img.style.width = data.width;
    }

    if (data.hasOwnProperty('_hasCustomHeight') && data._hasCustomHeight) {
      img.style.height = data.height;
    }

    slideMedia.insertBefore(img, slideMedia.firstChild);
    return;
  }

  function slideVideo(slide, data, index, callback) {
    var _this = this;

    var slideContainer = slide.querySelector('.ginner-container');
    var videoID = 'gvideo' + index;
    var slideMedia = slide.querySelector('.gslide-media');
    var videoPlayers = this.getAllPlayers();
    addClass(slideContainer, 'gvideo-container');
    slideMedia.insertBefore(createHTML('<div class="gvideo-wrapper"></div>'), slideMedia.firstChild);
    var videoWrapper = slide.querySelector('.gvideo-wrapper');
    injectAssets(this.settings.plyr.css, 'Plyr');
    var url = data.href;
    var provider = data === null || data === void 0 ? void 0 : data.videoProvider;
    var customPlaceholder = false;
    slideMedia.style.maxWidth = data.width;
    injectAssets(this.settings.plyr.js, 'Plyr', function () {
      if (!provider && url.match(/vimeo\.com\/([0-9]*)/)) {
        provider = 'vimeo';
      }

      if (!provider && (url.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || url.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/))) {
        provider = 'youtube';
      }

      if (provider === 'local' || !provider) {
        provider = 'local';
        var html = '<video id="' + videoID + '" ';
        html += "style=\"background:#000; max-width: ".concat(data.width, ";\" ");
        html += 'preload="metadata" ';
        html += 'poster="' + data.poster + '" ';
        html += 'x-webkit-airplay="allow" ';
        html += 'playsinline ';
        html += 'controls ';
        html += 'class="gvideo-local">';
        html += "<source src=\"".concat(url, "\">");
        html += '</video>';
        customPlaceholder = createHTML(html);
      }

      var placeholder = customPlaceholder ? customPlaceholder : createHTML("<div id=\"".concat(videoID, "\" data-plyr-provider=\"").concat(provider, "\" data-plyr-embed-id=\"").concat(url, "\"></div>"));
      addClass(videoWrapper, "".concat(provider, "-video gvideo"));
      videoWrapper.appendChild(placeholder);
      videoWrapper.setAttribute('data-id', videoID);
      videoWrapper.setAttribute('data-index', index);
      var playerConfig = has(_this.settings.plyr, 'config') ? _this.settings.plyr.config : {};
      var player = new Plyr('#' + videoID, playerConfig);
      player.on('ready', function (event) {
        videoPlayers[videoID] = event.detail.plyr;

        if (isFunction(callback)) {
          callback();
        }
      });
      waitUntil(function () {
        return slide.querySelector('iframe') && slide.querySelector('iframe').dataset.ready == 'true';
      }, function () {
        _this.resize(slide);
      });
      player.on('enterfullscreen', handleMediaFullScreen);
      player.on('exitfullscreen', handleMediaFullScreen);
    });
  }

  function handleMediaFullScreen(event) {
    var media = closest(event.target, '.gslide-media');

    if (event.type === 'enterfullscreen') {
      addClass(media, 'fullscreen');
    }

    if (event.type === 'exitfullscreen') {
      removeClass(media, 'fullscreen');
    }
  }

  function slideInline(slide, data, index, callback) {
    var _this = this;

    var slideMedia = slide.querySelector('.gslide-media');
    var hash = has(data, 'href') && data.href ? data.href.split('#').pop().trim() : false;
    var content = has(data, 'content') && data.content ? data.content : false;
    var innerContent;

    if (content) {
      if (isString(content)) {
        innerContent = createHTML("<div class=\"ginlined-content\">".concat(content, "</div>"));
      }

      if (isNode(content)) {
        if (content.style.display == 'none') {
          content.style.display = 'block';
        }

        var container = document.createElement('div');
        container.className = 'ginlined-content';
        container.appendChild(content);
        innerContent = container;
      }
    }

    if (hash) {
      var div = document.getElementById(hash);

      if (!div) {
        return false;
      }

      var cloned = div.cloneNode(true);
      cloned.style.height = data.height;
      cloned.style.maxWidth = data.width;
      addClass(cloned, 'ginlined-content');
      innerContent = cloned;
    }

    if (!innerContent) {
      console.error('Unable to append inline slide content', data);
      return false;
    }

    slideMedia.style.height = data.height;
    slideMedia.style.width = data.width;
    slideMedia.appendChild(innerContent);
    this.events['inlineclose' + hash] = addEvent('click', {
      onElement: slideMedia.querySelectorAll('.gtrigger-close'),
      withCallback: function withCallback(e) {
        e.preventDefault();

        _this.close();
      }
    });

    if (isFunction(callback)) {
      callback();
    }

    return;
  }

  function slideIframe(slide, data, index, callback) {
    var slideMedia = slide.querySelector('.gslide-media');
    var iframe = createIframe({
      url: data.href,
      callback: callback
    });
    slideMedia.parentNode.style.maxWidth = data.width;
    slideMedia.parentNode.style.height = data.height;
    slideMedia.appendChild(iframe);
    return;
  }

  var SlideConfigParser = function () {
    function SlideConfigParser() {
      var slideParamas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SlideConfigParser);

      this.defaults = {
        href: '',
        sizes: '',
        srcset: '',
        title: '',
        type: '',
        videoProvider: '',
        description: '',
        alt: '',
        descPosition: 'bottom',
        effect: '',
        width: '',
        height: '',
        content: false,
        zoomable: true,
        draggable: true
      };

      if (isObject(slideParamas)) {
        this.defaults = extend(this.defaults, slideParamas);
      }
    }

    _createClass(SlideConfigParser, [{
      key: "sourceType",
      value: function sourceType(url) {
        var origin = url;
        url = url.toLowerCase();

        if (url.match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) !== null) {
          return 'image';
        }

        if (url.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || url.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
          return 'video';
        }

        if (url.match(/vimeo\.com\/([0-9]*)/)) {
          return 'video';
        }

        if (url.match(/\.(mp4|ogg|webm|mov)/) !== null) {
          return 'video';
        }

        if (url.match(/\.(mp3|wav|wma|aac|ogg)/) !== null) {
          return 'audio';
        }

        if (url.indexOf('#') > -1) {
          var hash = origin.split('#').pop();

          if (hash.trim() !== '') {
            return 'inline';
          }
        }

        if (url.indexOf('goajax=true') > -1) {
          return 'ajax';
        }

        return 'external';
      }
    }, {
      key: "parseConfig",
      value: function parseConfig(element, settings) {
        var _this = this;

        var data = extend({
          descPosition: settings.descPosition
        }, this.defaults);

        if (isObject(element) && !isNode(element)) {
          if (!has(element, 'type')) {
            if (has(element, 'content') && element.content) {
              element.type = 'inline';
            } else if (has(element, 'href')) {
              element.type = this.sourceType(element.href);
            }
          }

          var objectData = extend(data, element);
          this.setSize(objectData, settings);
          return objectData;
        }

        var url = '';
        var config = element.getAttribute('data-glightbox');
        var nodeType = element.nodeName.toLowerCase();

        if (nodeType === 'a') {
          url = element.href;
        }

        if (nodeType === 'img') {
          url = element.src;
          data.alt = element.alt;
        }

        data.href = url;
        each(data, function (val, key) {
          if (has(settings, key) && key !== 'width') {
            data[key] = settings[key];
          }

          var nodeData = element.dataset[key];

          if (!isNil(nodeData)) {
            data[key] = _this.sanitizeValue(nodeData);
          }
        });

        if (data.content) {
          data.type = 'inline';
        }

        if (!data.type && url) {
          data.type = this.sourceType(url);
        }

        if (!isNil(config)) {
          var cleanKeys = [];
          each(data, function (v, k) {
            cleanKeys.push(';\\s?' + k);
          });
          cleanKeys = cleanKeys.join('\\s?:|');

          if (config.trim() !== '') {
            each(data, function (val, key) {
              var str = config;
              var match = 's?' + key + 's?:s?(.*?)(' + cleanKeys + 's?:|$)';
              var regex = new RegExp(match);
              var matches = str.match(regex);

              if (matches && matches.length && matches[1]) {
                var value = matches[1].trim().replace(/;\s*$/, '');
                data[key] = _this.sanitizeValue(value);
              }
            });
          }
        } else {
          if (!data.title && nodeType == 'a') {
            var title = element.title;

            if (!isNil(title) && title !== '') {
              data.title = title;
            }
          }

          if (!data.title && nodeType == 'img') {
            var alt = element.alt;

            if (!isNil(alt) && alt !== '') {
              data.title = alt;
            }
          }
        }

        if (data.description && data.description.substring(0, 1) === '.') {
          var description;

          try {
            description = document.querySelector(data.description).innerHTML;
          } catch (error) {
            if (!(error instanceof DOMException)) {
              throw error;
            }
          }

          if (description) {
            data.description = description;
          }
        }

        if (!data.description) {
          var nodeDesc = element.querySelector('.glightbox-desc');

          if (nodeDesc) {
            data.description = nodeDesc.innerHTML;
          }
        }

        this.setSize(data, settings, element);
        this.slideConfig = data;
        return data;
      }
    }, {
      key: "setSize",
      value: function setSize(data, settings) {
        var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var defaultWith = data.type == 'video' ? this.checkSize(settings.videosWidth) : this.checkSize(settings.width);
        var defaultHeight = this.checkSize(settings.height);
        data.width = has(data, 'width') && data.width !== '' ? this.checkSize(data.width) : defaultWith;
        data.height = has(data, 'height') && data.height !== '' ? this.checkSize(data.height) : defaultHeight;

        if (element && data.type == 'image') {
          data._hasCustomWidth = element.dataset.width ? true : false;
          data._hasCustomHeight = element.dataset.height ? true : false;
        }

        return data;
      }
    }, {
      key: "checkSize",
      value: function checkSize(size) {
        return isNumber(size) ? "".concat(size, "px") : size;
      }
    }, {
      key: "sanitizeValue",
      value: function sanitizeValue(val) {
        if (val !== 'true' && val !== 'false') {
          return val;
        }

        return val === 'true';
      }
    }]);

    return SlideConfigParser;
  }();

  var Slide = function () {
    function Slide(el, instance, index) {
      _classCallCheck(this, Slide);

      this.element = el;
      this.instance = instance;
      this.index = index;
    }

    _createClass(Slide, [{
      key: "setContent",
      value: function setContent() {
        var _this = this;

        var slide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (hasClass(slide, 'loaded')) {
          return false;
        }

        var settings = this.instance.settings;
        var slideConfig = this.slideConfig;
        var isMobileDevice = isMobile();

        if (isFunction(settings.beforeSlideLoad)) {
          settings.beforeSlideLoad({
            index: this.index,
            slide: slide,
            player: false
          });
        }

        var type = slideConfig.type;
        var position = slideConfig.descPosition;
        var slideMedia = slide.querySelector('.gslide-media');
        var slideTitle = slide.querySelector('.gslide-title');
        var slideText = slide.querySelector('.gslide-desc');
        var slideDesc = slide.querySelector('.gdesc-inner');
        var finalCallback = callback;
        var titleID = 'gSlideTitle_' + this.index;
        var textID = 'gSlideDesc_' + this.index;

        if (isFunction(settings.afterSlideLoad)) {
          finalCallback = function finalCallback() {
            if (isFunction(callback)) {
              callback();
            }

            settings.afterSlideLoad({
              index: _this.index,
              slide: slide,
              player: _this.instance.getSlidePlayerInstance(_this.index)
            });
          };
        }

        if (slideConfig.title == '' && slideConfig.description == '') {
          if (slideDesc) {
            slideDesc.parentNode.parentNode.removeChild(slideDesc.parentNode);
          }
        } else {
          if (slideTitle && slideConfig.title !== '') {
            slideTitle.id = titleID;
            slideTitle.innerHTML = slideConfig.title;
          } else {
            slideTitle.parentNode.removeChild(slideTitle);
          }

          if (slideText && slideConfig.description !== '') {
            slideText.id = textID;

            if (isMobileDevice && settings.moreLength > 0) {
              slideConfig.smallDescription = this.slideShortDesc(slideConfig.description, settings.moreLength, settings.moreText);
              slideText.innerHTML = slideConfig.smallDescription;
              this.descriptionEvents(slideText, slideConfig);
            } else {
              slideText.innerHTML = slideConfig.description;
            }
          } else {
            slideText.parentNode.removeChild(slideText);
          }

          addClass(slideMedia.parentNode, "desc-".concat(position));
          addClass(slideDesc.parentNode, "description-".concat(position));
        }

        addClass(slideMedia, "gslide-".concat(type));
        addClass(slide, 'loaded');

        if (type === 'video') {
          slideVideo.apply(this.instance, [slide, slideConfig, this.index, finalCallback]);
          return;
        }

        if (type === 'external') {
          slideIframe.apply(this, [slide, slideConfig, this.index, finalCallback]);
          return;
        }

        if (type === 'inline') {
          slideInline.apply(this.instance, [slide, slideConfig, this.index, finalCallback]);

          if (slideConfig.draggable) {
            new DragSlides({
              dragEl: slide.querySelector('.gslide-inline'),
              toleranceX: settings.dragToleranceX,
              toleranceY: settings.dragToleranceY,
              slide: slide,
              instance: this.instance
            });
          }

          return;
        }

        if (type === 'image') {
          slideImage(slide, slideConfig, this.index, function () {
            var img = slide.querySelector('img');

            if (slideConfig.draggable) {
              new DragSlides({
                dragEl: img,
                toleranceX: settings.dragToleranceX,
                toleranceY: settings.dragToleranceY,
                slide: slide,
                instance: _this.instance
              });
            }

            if (slideConfig.zoomable && img.naturalWidth > img.offsetWidth) {
              addClass(img, 'zoomable');
              new ZoomImages(img, slide, function () {
                _this.instance.resize();
              });
            }

            if (isFunction(finalCallback)) {
              finalCallback();
            }
          });
          return;
        }

        if (isFunction(finalCallback)) {
          finalCallback();
        }
      }
    }, {
      key: "slideShortDesc",
      value: function slideShortDesc(string) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
        var wordBoundary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var div = document.createElement('div');
        div.innerHTML = string;
        var cleanedString = div.innerText;
        var useWordBoundary = wordBoundary;
        string = cleanedString.trim();

        if (string.length <= n) {
          return string;
        }

        var subString = string.substr(0, n - 1);

        if (!useWordBoundary) {
          return subString;
        }

        div = null;
        return subString + '... <a href="#" class="desc-more">' + wordBoundary + '</a>';
      }
    }, {
      key: "descriptionEvents",
      value: function descriptionEvents(desc, data) {
        var _this2 = this;

        var moreLink = desc.querySelector('.desc-more');

        if (!moreLink) {
          return false;
        }

        addEvent('click', {
          onElement: moreLink,
          withCallback: function withCallback(event, target) {
            event.preventDefault();
            var body = document.body;
            var desc = closest(target, '.gslide-desc');

            if (!desc) {
              return false;
            }

            desc.innerHTML = data.description;
            addClass(body, 'gdesc-open');
            var shortEvent = addEvent('click', {
              onElement: [body, closest(desc, '.gslide-description')],
              withCallback: function withCallback(event, target) {
                if (event.target.nodeName.toLowerCase() !== 'a') {
                  removeClass(body, 'gdesc-open');
                  addClass(body, 'gdesc-closed');
                  desc.innerHTML = data.smallDescription;

                  _this2.descriptionEvents(desc, data);

                  setTimeout(function () {
                    removeClass(body, 'gdesc-closed');
                  }, 400);
                  shortEvent.destroy();
                }
              }
            });
          }
        });
      }
    }, {
      key: "create",
      value: function create() {
        return createHTML(this.instance.settings.slideHTML);
      }
    }, {
      key: "getConfig",
      value: function getConfig() {
        if (!isNode(this.element) && !this.element.hasOwnProperty('draggable')) {
          this.element.draggable = this.instance.settings.draggable;
        }

        var parser = new SlideConfigParser(this.instance.settings.slideExtraAttributes);
        this.slideConfig = parser.parseConfig(this.element, this.instance.settings);
        return this.slideConfig;
      }
    }]);

    return Slide;
  }();

  var _version = '3.1.0';

  var isMobile$1 = isMobile();

  var isTouch$1 = isTouch();

  var html = document.getElementsByTagName('html')[0];
  var defaults = {
    selector: '.glightbox',
    elements: null,
    skin: 'clean',
    theme: 'clean',
    closeButton: true,
    startAt: null,
    autoplayVideos: true,
    autofocusVideos: true,
    descPosition: 'bottom',
    width: '900px',
    height: '506px',
    videosWidth: '960px',
    beforeSlideChange: null,
    afterSlideChange: null,
    beforeSlideLoad: null,
    afterSlideLoad: null,
    slideInserted: null,
    slideRemoved: null,
    slideExtraAttributes: null,
    onOpen: null,
    onClose: null,
    loop: false,
    zoomable: true,
    draggable: true,
    dragAutoSnap: false,
    dragToleranceX: 40,
    dragToleranceY: 65,
    preload: true,
    oneSlidePerOpen: false,
    touchNavigation: true,
    touchFollowAxis: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
    plugins: false,
    plyr: {
      css: 'https://cdn.plyr.io/3.6.12/plyr.css',
      js: 'https://cdn.plyr.io/3.6.12/plyr.js',
      config: {
        ratio: '16:9',
        fullscreen: {
          enabled: true,
          iosNative: true
        },
        youtube: {
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        vimeo: {
          byline: false,
          portrait: false,
          title: false,
          transparent: false
        }
      }
    },
    openEffect: 'zoom',
    closeEffect: 'zoom',
    slideEffect: 'slide',
    moreText: 'See more',
    moreLength: 60,
    cssEfects: {
      fade: {
        "in": 'fadeIn',
        out: 'fadeOut'
      },
      zoom: {
        "in": 'zoomIn',
        out: 'zoomOut'
      },
      slide: {
        "in": 'slideInRight',
        out: 'slideOutLeft'
      },
      slideBack: {
        "in": 'slideInLeft',
        out: 'slideOutRight'
      },
      none: {
        "in": 'none',
        out: 'none'
      }
    },
    svg: {
      close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
      next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
      prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
    }
  };
  defaults.slideHTML = "<div class=\"gslide\">\n    <div class=\"gslide-inner-content\">\n        <div class=\"ginner-container\">\n            <div class=\"gslide-media\">\n            </div>\n            <div class=\"gslide-description\">\n                <div class=\"gdesc-inner\">\n                    <h4 class=\"gslide-title\"></h4>\n                    <div class=\"gslide-desc\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
  defaults.lightboxHTML = "<div id=\"glightbox-body\" class=\"glightbox-container\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"false\">\n    <div class=\"gloader visible\"></div>\n    <div class=\"goverlay\"></div>\n    <div class=\"gcontainer\">\n    <div id=\"glightbox-slider\" class=\"gslider\"></div>\n    <button class=\"gclose gbtn\" aria-label=\"Close\" data-taborder=\"3\">{closeSVG}</button>\n    <button class=\"gprev gbtn\" aria-label=\"Previous\" data-taborder=\"2\">{prevSVG}</button>\n    <button class=\"gnext gbtn\" aria-label=\"Next\" data-taborder=\"1\">{nextSVG}</button>\n</div>\n</div>";

  var GlightboxInit = function () {
    function GlightboxInit() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, GlightboxInit);

      this.customOptions = options;
      this.settings = extend(defaults, options);
      this.effectsClasses = this.getAnimationClasses();
      this.videoPlayers = {};
      this.apiEvents = [];
      this.fullElementsList = false;
    }

    _createClass(GlightboxInit, [{
      key: "init",
      value: function init() {
        var _this = this;

        var selector = this.getSelector();

        if (selector) {
          this.baseEvents = addEvent('click', {
            onElement: selector,
            withCallback: function withCallback(e, target) {
              e.preventDefault();

              _this.open(target);
            }
          });
        }

        this.elements = this.getElements();
      }
    }, {
      key: "open",
      value: function open() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (this.elements.length === 0) {
          return false;
        }

        this.activeSlide = null;
        this.prevActiveSlideIndex = null;
        this.prevActiveSlide = null;
        var index = isNumber(startAt) ? startAt : this.settings.startAt;

        if (isNode(element)) {
          var gallery = element.getAttribute('data-gallery');

          if (gallery) {
            this.fullElementsList = this.elements;
            this.elements = this.getGalleryElements(this.elements, gallery);
          }

          if (isNil(index)) {
            index = this.getElementIndex(element);

            if (index < 0) {
              index = 0;
            }
          }
        }

        if (!isNumber(index)) {
          index = 0;
        }

        this.build();

        animateElement(this.overlay, this.settings.openEffect === 'none' ? 'none' : this.settings.cssEfects.fade["in"]);

        var body = document.body;
        var scrollBar = window.innerWidth - document.documentElement.clientWidth;

        if (scrollBar > 0) {
          var styleSheet = document.createElement('style');
          styleSheet.type = 'text/css';
          styleSheet.className = 'gcss-styles';
          //styleSheet.innerText = ".gscrollbar-fixer {margin-right: ".concat(scrollBar, "px}");
          document.head.appendChild(styleSheet);

          addClass(body, 'gscrollbar-fixer');
        }

        addClass(body, 'glightbox-open');

        addClass(html, 'glightbox-open');

        if (isMobile$1) {
          addClass(document.body, 'glightbox-mobile');

          this.settings.slideEffect = 'slide';
          this.settings.autoplayVideos = false;
        }

        this.showSlide(index, true);

        if (this.elements.length === 1) {
          addClass(this.prevButton, 'glightbox-button-hidden');

          addClass(this.nextButton, 'glightbox-button-hidden');
        } else {
          removeClass(this.prevButton, 'glightbox-button-hidden');

          removeClass(this.nextButton, 'glightbox-button-hidden');
        }

        this.lightboxOpen = true;
        this.trigger('open');

        if (isFunction(this.settings.onOpen)) {
          this.settings.onOpen();
        }

        if (isTouch$1 && this.settings.touchNavigation) {
          touchNavigation(this);
        }

        if (this.settings.keyboardNavigation) {
          keyboardNavigation(this);
        }
      }
    }, {
      key: "openAt",
      value: function openAt() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.open(null, index);
      }
    }, {
      key: "showSlide",
      value: function showSlide() {
        var _this2 = this;

        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        show(this.loader);

        this.index = parseInt(index);
        var current = this.slidesContainer.querySelector('.current');

        if (current) {
          removeClass(current, 'current');
        }

        this.slideAnimateOut();
        var slideNode = this.slidesContainer.querySelectorAll('.gslide')[index];

        if (hasClass(slideNode, 'loaded')) {
          this.slideAnimateIn(slideNode, first);

          hide(this.loader);
        } else {
          show(this.loader);

          var slide = this.elements[index];
          var slideData = {
            index: this.index,
            slide: slideNode,
            slideNode: slideNode,
            slideConfig: slide.slideConfig,
            slideIndex: this.index,
            trigger: slide.node,
            player: null
          };
          this.trigger('slide_before_load', slideData);
          slide.instance.setContent(slideNode, function () {
            hide(_this2.loader);

            _this2.resize();

            _this2.slideAnimateIn(slideNode, first);

            _this2.trigger('slide_after_load', slideData);
          });
        }

        this.slideDescription = slideNode.querySelector('.gslide-description');
        this.slideDescriptionContained = this.slideDescription && hasClass(this.slideDescription.parentNode, 'gslide-media');

        if (this.settings.preload) {
          this.preloadSlide(index + 1);
          this.preloadSlide(index - 1);
        }

        this.updateNavigationClasses();
        this.activeSlide = slideNode;
      }
    }, {
      key: "preloadSlide",
      value: function preloadSlide(index) {
        var _this3 = this;

        if (index < 0 || index > this.elements.length - 1) {
          return false;
        }

        if (isNil(this.elements[index])) {
          return false;
        }

        var slideNode = this.slidesContainer.querySelectorAll('.gslide')[index];

        if (hasClass(slideNode, 'loaded')) {
          return false;
        }

        var slide = this.elements[index];
        var type = slide.type;
        var slideData = {
          index: index,
          slide: slideNode,
          slideNode: slideNode,
          slideConfig: slide.slideConfig,
          slideIndex: index,
          trigger: slide.node,
          player: null
        };
        this.trigger('slide_before_load', slideData);

        if (type === 'video' || type === 'external') {
          setTimeout(function () {
            slide.instance.setContent(slideNode, function () {
              _this3.trigger('slide_after_load', slideData);
            });
          }, 200);
        } else {
          slide.instance.setContent(slideNode, function () {
            _this3.trigger('slide_after_load', slideData);
          });
        }
      }
    }, {
      key: "prevSlide",
      value: function prevSlide() {
        this.goToSlide(this.index - 1);
      }
    }, {
      key: "nextSlide",
      value: function nextSlide() {
        this.goToSlide(this.index + 1);
      }
    }, {
      key: "goToSlide",
      value: function goToSlide() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.prevActiveSlide = this.activeSlide;
        this.prevActiveSlideIndex = this.index;

        if (!this.loop() && (index < 0 || index > this.elements.length - 1)) {
          return false;
        }

        if (index < 0) {
          index = this.elements.length - 1;
        } else if (index >= this.elements.length) {
          index = 0;
        }

        this.showSlide(index);
      }
    }, {
      key: "insertSlide",
      value: function insertSlide() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        if (index < 0) {
          index = this.elements.length;
        }

        var slide = new Slide(config, this, index);
        var data = slide.getConfig();

        var slideInfo = extend({}, data);

        var newSlide = slide.create();
        var totalSlides = this.elements.length - 1;
        slideInfo.index = index;
        slideInfo.node = false;
        slideInfo.instance = slide;
        slideInfo.slideConfig = data;
        this.elements.splice(index, 0, slideInfo);
        var addedSlideNode = null;
        var addedSlidePlayer = null;

        if (this.slidesContainer) {
          if (index > totalSlides) {
            this.slidesContainer.appendChild(newSlide);
          } else {
            var existingSlide = this.slidesContainer.querySelectorAll('.gslide')[index];
            this.slidesContainer.insertBefore(newSlide, existingSlide);
          }

          if (this.settings.preload && this.index == 0 && index == 0 || this.index - 1 == index || this.index + 1 == index) {
            this.preloadSlide(index);
          }

          if (this.index === 0 && index === 0) {
            this.index = 1;
          }

          this.updateNavigationClasses();
          addedSlideNode = this.slidesContainer.querySelectorAll('.gslide')[index];
          addedSlidePlayer = this.getSlidePlayerInstance(index);
          slideInfo.slideNode = addedSlideNode;
        }

        this.trigger('slide_inserted', {
          index: index,
          slide: addedSlideNode,
          slideNode: addedSlideNode,
          slideConfig: data,
          slideIndex: index,
          trigger: null,
          player: addedSlidePlayer
        });

        if (isFunction(this.settings.slideInserted)) {
          this.settings.slideInserted({
            index: index,
            slide: addedSlideNode,
            player: addedSlidePlayer
          });
        }
      }
    }, {
      key: "removeSlide",
      value: function removeSlide() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

        if (index < 0 || index > this.elements.length - 1) {
          return false;
        }

        var slide = this.slidesContainer && this.slidesContainer.querySelectorAll('.gslide')[index];

        if (slide) {
          if (this.getActiveSlideIndex() == index) {
            if (index == this.elements.length - 1) {
              this.prevSlide();
            } else {
              this.nextSlide();
            }
          }

          slide.parentNode.removeChild(slide);
        }

        this.elements.splice(index, 1);
        this.trigger('slide_removed', index);

        if (isFunction(this.settings.slideRemoved)) {
          this.settings.slideRemoved(index);
        }
      }
    }, {
      key: "slideAnimateIn",
      value: function slideAnimateIn(slide, first) {
        var _this4 = this;

        var slideMedia = slide.querySelector('.gslide-media');
        var slideDesc = slide.querySelector('.gslide-description');
        var prevData = {
          index: this.prevActiveSlideIndex,
          slide: this.prevActiveSlide,
          slideNode: this.prevActiveSlide,
          slideIndex: this.prevActiveSlide,
          slideConfig: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
          trigger: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
          player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
        };
        var nextData = {
          index: this.index,
          slide: this.activeSlide,
          slideNode: this.activeSlide,
          slideConfig: this.elements[this.index].slideConfig,
          slideIndex: this.index,
          trigger: this.elements[this.index].node,
          player: this.getSlidePlayerInstance(this.index)
        };

        if (slideMedia.offsetWidth > 0 && slideDesc) {
          hide(slideDesc);

          slideDesc.style.display = '';
        }

        removeClass(slide, this.effectsClasses);

        if (first) {
          animateElement(slide, this.settings.cssEfects[this.settings.openEffect]["in"], function () {
            if (_this4.settings.autoplayVideos) {
              _this4.slidePlayerPlay(slide);
            }

            _this4.trigger('slide_changed', {
              prev: prevData,
              current: nextData
            });

            if (isFunction(_this4.settings.afterSlideChange)) {
              _this4.settings.afterSlideChange.apply(_this4, [prevData, nextData]);
            }
          });
        } else {
          var effectName = this.settings.slideEffect;
          var animIn = effectName !== 'none' ? this.settings.cssEfects[effectName]["in"] : effectName;

          if (this.prevActiveSlideIndex > this.index) {
            if (this.settings.slideEffect == 'slide') {
              animIn = this.settings.cssEfects.slideBack["in"];
            }
          }

          animateElement(slide, animIn, function () {
            if (_this4.settings.autoplayVideos) {
              _this4.slidePlayerPlay(slide);
            }

            _this4.trigger('slide_changed', {
              prev: prevData,
              current: nextData
            });

            if (isFunction(_this4.settings.afterSlideChange)) {
              _this4.settings.afterSlideChange.apply(_this4, [prevData, nextData]);
            }
          });
        }

        setTimeout(function () {
          _this4.resize(slide);
        }, 100);

        addClass(slide, 'current');
      }
    }, {
      key: "slideAnimateOut",
      value: function slideAnimateOut() {
        if (!this.prevActiveSlide) {
          return false;
        }

        var prevSlide = this.prevActiveSlide;

        removeClass(prevSlide, this.effectsClasses);

        addClass(prevSlide, 'prev');

        var animation = this.settings.slideEffect;
        var animOut = animation !== 'none' ? this.settings.cssEfects[animation].out : animation;
        this.slidePlayerPause(prevSlide);
        this.trigger('slide_before_change', {
          prev: {
            index: this.prevActiveSlideIndex,
            slide: this.prevActiveSlide,
            slideNode: this.prevActiveSlide,
            slideIndex: this.prevActiveSlideIndex,
            slideConfig: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
            trigger: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
          },
          current: {
            index: this.index,
            slide: this.activeSlide,
            slideNode: this.activeSlide,
            slideIndex: this.index,
            slideConfig: this.elements[this.index].slideConfig,
            trigger: this.elements[this.index].node,
            player: this.getSlidePlayerInstance(this.index)
          }
        });

        if (isFunction(this.settings.beforeSlideChange)) {
          this.settings.beforeSlideChange.apply(this, [{
            index: this.prevActiveSlideIndex,
            slide: this.prevActiveSlide,
            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
          }, {
            index: this.index,
            slide: this.activeSlide,
            player: this.getSlidePlayerInstance(this.index)
          }]);
        }

        if (this.prevActiveSlideIndex > this.index && this.settings.slideEffect == 'slide') {
          animOut = this.settings.cssEfects.slideBack.out;
        }

        animateElement(prevSlide, animOut, function () {
          var container = prevSlide.querySelector('.ginner-container');
          var media = prevSlide.querySelector('.gslide-media');
          var desc = prevSlide.querySelector('.gslide-description');
          container.style.transform = '';
          media.style.transform = '';

          removeClass(media, 'greset');

          media.style.opacity = '';

          if (desc) {
            desc.style.opacity = '';
          }

          removeClass(prevSlide, 'prev');
        });
      }
    }, {
      key: "getAllPlayers",
      value: function getAllPlayers() {
        return this.videoPlayers;
      }
    }, {
      key: "getSlidePlayerInstance",
      value: function getSlidePlayerInstance(index) {
        var id = 'gvideo' + index;
        var videoPlayers = this.getAllPlayers();

        if (has(videoPlayers, id) && videoPlayers[id]) {
          return videoPlayers[id];
        }

        return false;
      }
    }, {
      key: "stopSlideVideo",
      value: function stopSlideVideo(slide) {
        if (isNode(slide)) {
          var node = slide.querySelector('.gvideo-wrapper');

          if (node) {
            slide = node.getAttribute('data-index');
          }
        }

        console.log('stopSlideVideo is deprecated, use slidePlayerPause');
        var player = this.getSlidePlayerInstance(slide);

        if (player && player.playing) {
          player.pause();
        }
      }
    }, {
      key: "slidePlayerPause",
      value: function slidePlayerPause(slide) {
        if (isNode(slide)) {
          var node = slide.querySelector('.gvideo-wrapper');

          if (node) {
            slide = node.getAttribute('data-index');
          }
        }

        var player = this.getSlidePlayerInstance(slide);

        if (player && player.playing) {
          player.pause();
        }
      }
    }, {
      key: "playSlideVideo",
      value: function playSlideVideo(slide) {
        if (isNode(slide)) {
          var node = slide.querySelector('.gvideo-wrapper');

          if (node) {
            slide = node.getAttribute('data-index');
          }
        }

        console.log('playSlideVideo is deprecated, use slidePlayerPlay');
        var player = this.getSlidePlayerInstance(slide);

        if (player && !player.playing) {
          player.play();
        }
      }
    }, {
      key: "slidePlayerPlay",
      value: function slidePlayerPlay(slide) {
        var _this$settings$plyr$c;

        if (isMobile$1 && !((_this$settings$plyr$c = this.settings.plyr.config) !== null && _this$settings$plyr$c !== void 0 && _this$settings$plyr$c.muted)) {
          return;
        }

        if (isNode(slide)) {
          var node = slide.querySelector('.gvideo-wrapper');

          if (node) {
            slide = node.getAttribute('data-index');
          }
        }

        var player = this.getSlidePlayerInstance(slide);

        if (player && !player.playing) {
          player.play();

          if (this.settings.autofocusVideos) {
            player.elements.container.focus();
          }
        }
      }
    }, {
      key: "setElements",
      value: function setElements(elements) {
        var _this5 = this;

        this.settings.elements = false;
        var newElements = [];

        if (elements && elements.length) {
          each(elements, function (el, i) {
            var slide = new Slide(el, _this5, i);
            var data = slide.getConfig();

            var slideInfo = extend({}, data);

            slideInfo.slideConfig = data;
            slideInfo.instance = slide;
            slideInfo.index = i;
            newElements.push(slideInfo);
          });
        }

        this.elements = newElements;

        if (this.lightboxOpen) {
          this.slidesContainer.innerHTML = '';

          if (this.elements.length) {
            each(this.elements, function () {
              var slide = createHTML(_this5.settings.slideHTML);

              _this5.slidesContainer.appendChild(slide);
            });

            this.showSlide(0, true);
          }
        }
      }
    }, {
      key: "getElementIndex",
      value: function getElementIndex(node) {
        var index = false;

        each(this.elements, function (el, i) {
          if (has(el, 'node') && el.node == node) {
            index = i;
            return true;
          }
        });

        return index;
      }
    }, {
      key: "getElements",
      value: function getElements() {
        var _this6 = this;

        var list = [];
        this.elements = this.elements ? this.elements : [];

        if (!isNil(this.settings.elements) && isArray(this.settings.elements) && this.settings.elements.length) {
          each(this.settings.elements, function (el, i) {
            var slide = new Slide(el, _this6, i);
            var elData = slide.getConfig();

            var slideInfo = extend({}, elData);

            slideInfo.node = false;
            slideInfo.index = i;
            slideInfo.instance = slide;
            slideInfo.slideConfig = elData;
            list.push(slideInfo);
          });
        }

        var nodes = false;
        var selector = this.getSelector();

        if (selector) {
          nodes = document.querySelectorAll(this.getSelector());
        }

        if (!nodes) {
          return list;
        }

        each(nodes, function (el, i) {
          var slide = new Slide(el, _this6, i);
          var elData = slide.getConfig();

          var slideInfo = extend({}, elData);

          slideInfo.node = el;
          slideInfo.index = i;
          slideInfo.instance = slide;
          slideInfo.slideConfig = elData;
          slideInfo.gallery = el.getAttribute('data-gallery');
          list.push(slideInfo);
        });

        return list;
      }
    }, {
      key: "getGalleryElements",
      value: function getGalleryElements(list, gallery) {
        return list.filter(function (el) {
          return el.gallery == gallery;
        });
      }
    }, {
      key: "getSelector",
      value: function getSelector() {
        if (this.settings.elements) {
          return false;
        }

        if (this.settings.selector && this.settings.selector.substring(0, 5) == 'data-') {
          return "*[".concat(this.settings.selector, "]");
        }

        return this.settings.selector;
      }
    }, {
      key: "getActiveSlide",
      value: function getActiveSlide() {
        return this.slidesContainer.querySelectorAll('.gslide')[this.index];
      }
    }, {
      key: "getActiveSlideIndex",
      value: function getActiveSlideIndex() {
        return this.index;
      }
    }, {
      key: "getAnimationClasses",
      value: function getAnimationClasses() {
        var effects = [];

        for (var key in this.settings.cssEfects) {
          if (this.settings.cssEfects.hasOwnProperty(key)) {
            var effect = this.settings.cssEfects[key];
            effects.push("g".concat(effect["in"]));
            effects.push("g".concat(effect.out));
          }
        }

        return effects.join(' ');
      }
    }, {
      key: "build",
      value: function build() {
        var _this7 = this;

        if (this.built) {
          return false;
        }

        var children = document.body.childNodes;
        var bodyChildElms = [];

        each(children, function (el) {
          if (el.parentNode == document.body && el.nodeName.charAt(0) !== '#' && el.hasAttribute && !el.hasAttribute('aria-hidden')) {
            bodyChildElms.push(el);
            el.setAttribute('aria-hidden', 'true');
          }
        });

        var nextSVG = has(this.settings.svg, 'next') ? this.settings.svg.next : '';
        var prevSVG = has(this.settings.svg, 'prev') ? this.settings.svg.prev : '';
        var closeSVG = has(this.settings.svg, 'close') ? this.settings.svg.close : '';
        var lightboxHTML = this.settings.lightboxHTML;
        lightboxHTML = lightboxHTML.replace(/{nextSVG}/g, nextSVG);
        lightboxHTML = lightboxHTML.replace(/{prevSVG}/g, prevSVG);
        lightboxHTML = lightboxHTML.replace(/{closeSVG}/g, closeSVG);
        lightboxHTML = createHTML(lightboxHTML);
        document.body.appendChild(lightboxHTML);
        var modal = document.getElementById('glightbox-body');
        this.modal = modal;
        var closeButton = modal.querySelector('.gclose');
        this.prevButton = modal.querySelector('.gprev');
        this.nextButton = modal.querySelector('.gnext');
        this.overlay = modal.querySelector('.goverlay');
        this.loader = modal.querySelector('.gloader');
        this.slidesContainer = document.getElementById('glightbox-slider');
        this.bodyHiddenChildElms = bodyChildElms;
        this.events = {};

        addClass(this.modal, 'glightbox-' + this.settings.skin);

        if (this.settings.closeButton && closeButton) {
          this.events['close'] = addEvent('click', {
            onElement: closeButton,
            withCallback: function withCallback(e, target) {
              e.preventDefault();

              _this7.close();
            }
          });
        }

        if (closeButton && !this.settings.closeButton) {
          closeButton.parentNode.removeChild(closeButton);
        }

        if (this.nextButton) {
          this.events['next'] = addEvent('click', {
            onElement: this.nextButton,
            withCallback: function withCallback(e, target) {
              e.preventDefault();

              _this7.nextSlide();
            }
          });
        }

        if (this.prevButton) {
          this.events['prev'] = addEvent('click', {
            onElement: this.prevButton,
            withCallback: function withCallback(e, target) {
              e.preventDefault();

              _this7.prevSlide();
            }
          });
        }

        if (this.settings.closeOnOutsideClick) {
          this.events['outClose'] = addEvent('click', {
            onElement: modal,
            withCallback: function withCallback(e, target) {
              if (!_this7.preventOutsideClick && !hasClass(document.body, 'glightbox-mobile') && !closest(e.target, '.ginner-container')) {
                if (!closest(e.target, '.gbtn') && !hasClass(e.target, 'gnext') && !hasClass(e.target, 'gprev')) {
                  _this7.close();
                }
              }
            }
          });
        }

        each(this.elements, function (slide, i) {
          _this7.slidesContainer.appendChild(slide.instance.create());

          slide.slideNode = _this7.slidesContainer.querySelectorAll('.gslide')[i];
        });

        if (isTouch$1) {
          addClass(document.body, 'glightbox-touch');
          this.settings.autoplayVideos = false;
        }

        this.events['resize'] = addEvent('resize', {
          onElement: window,
          withCallback: function withCallback() {
            _this7.resize();
          }
        });
        this.built = true;
      }
    }, {
      key: "resize",
      value: function resize() {
        var slide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        slide = !slide ? this.activeSlide : slide;

        if (!slide || hasClass(slide, 'zoomed')) {
          return;
        }

        var winSize = windowSize();

        var video = slide.querySelector('.gvideo-wrapper');
        var image = slide.querySelector('.gslide-image');
        var description = this.slideDescription;
        var winWidth = winSize.width;
        var winHeight = winSize.height;

        if (winWidth <= 768) {
          addClass(document.body, 'glightbox-mobile');
        } else {
          removeClass(document.body, 'glightbox-mobile');
        }

        if (!video && !image) {
          return;
        }

        var descriptionResize = false;

        if (description && (hasClass(description, 'description-bottom') || hasClass(description, 'description-top')) && !hasClass(description, 'gabsolute')) {
          descriptionResize = true;
        }

        if (image) {
          if (winWidth <= 768) {
            var imgNode = image.querySelector('img');
          } else if (descriptionResize) {
            var descHeight = description.offsetHeight;

            var _imgNode = image.querySelector('img');

            _imgNode.setAttribute('style', "max-height: calc(100vh - ".concat(descHeight, "px)"));

            description.setAttribute('style', "max-width: ".concat(_imgNode.offsetWidth, "px;"));
          }
        }

        if (video) {
          var ratio = has(this.settings.plyr.config, 'ratio') ? this.settings.plyr.config.ratio : '';

          if (!ratio) {
            var containerWidth = video.clientWidth;
            var containerHeight = video.clientHeight;
            var divisor = containerWidth / containerHeight;
            ratio = "".concat(containerWidth / divisor, ":").concat(containerHeight / divisor);
          }

          var videoRatio = ratio.split(':');
          var videoWidth = this.settings.videosWidth;
          var maxWidth = this.settings.videosWidth;

          if (isNumber(videoWidth) || videoWidth.indexOf('px') !== -1) {
            maxWidth = parseInt(videoWidth);
          } else {
            if (videoWidth.indexOf('vw') !== -1) {
              maxWidth = winWidth * parseInt(videoWidth) / 100;
            } else if (videoWidth.indexOf('vh') !== -1) {
              maxWidth = winHeight * parseInt(videoWidth) / 100;
            } else if (videoWidth.indexOf('%') !== -1) {
              maxWidth = winWidth * parseInt(videoWidth) / 100;
            } else {
              maxWidth = parseInt(video.clientWidth);
            }
          }

          var maxHeight = maxWidth / (parseInt(videoRatio[0]) / parseInt(videoRatio[1]));
          maxHeight = Math.floor(maxHeight);

          if (descriptionResize) {
            winHeight = winHeight - description.offsetHeight;
          }

          if (maxWidth > winWidth || maxHeight > winHeight || winHeight < maxHeight && winWidth > maxWidth) {
            var vwidth = video.offsetWidth;
            var vheight = video.offsetHeight;

            var _ratio = winHeight / vheight;

            var vsize = {
              width: vwidth * _ratio,
              height: vheight * _ratio
            };
            video.parentNode.setAttribute('style', "max-width: ".concat(vsize.width, "px"));

            if (descriptionResize) {
              description.setAttribute('style', "max-width: ".concat(vsize.width, "px;"));
            }
          } else {
            video.parentNode.style.maxWidth = "".concat(videoWidth);

            if (descriptionResize) {
              description.setAttribute('style', "max-width: ".concat(videoWidth, ";"));
            }
          }
        }
      }
    }, {
      key: "reload",
      value: function reload() {
        this.init();
      }
    }, {
      key: "updateNavigationClasses",
      value: function updateNavigationClasses() {
        var loop = this.loop();

        removeClass(this.nextButton, 'disabled');

        removeClass(this.prevButton, 'disabled');

        if (this.index == 0 && this.elements.length - 1 == 0) {
          addClass(this.prevButton, 'disabled');

          addClass(this.nextButton, 'disabled');
        } else if (this.index === 0 && !loop) {
          addClass(this.prevButton, 'disabled');
        } else if (this.index === this.elements.length - 1 && !loop) {
          addClass(this.nextButton, 'disabled');
        }
      }
    }, {
      key: "loop",
      value: function loop() {
        var loop = has(this.settings, 'loopAtEnd') ? this.settings.loopAtEnd : null;
        loop = has(this.settings, 'loop') ? this.settings.loop : loop;
        return loop;
      }
    }, {
      key: "close",
      value: function close() {
        var _this8 = this;

        if (!this.lightboxOpen) {
          if (this.events) {
            for (var key in this.events) {
              if (this.events.hasOwnProperty(key)) {
                this.events[key].destroy();
              }
            }

            this.events = null;
          }

          return false;
        }

        if (this.closing) {
          return false;
        }

        this.closing = true;
        this.slidePlayerPause(this.activeSlide);

        if (this.fullElementsList) {
          this.elements = this.fullElementsList;
        }

        if (this.bodyHiddenChildElms.length) {
          each(this.bodyHiddenChildElms, function (el) {
            el.removeAttribute('aria-hidden');
          });
        }

        addClass(this.modal, 'glightbox-closing');

        animateElement(this.overlay, this.settings.openEffect == 'none' ? 'none' : this.settings.cssEfects.fade.out);

        animateElement(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function () {
          _this8.activeSlide = null;
          _this8.prevActiveSlideIndex = null;
          _this8.prevActiveSlide = null;
          _this8.built = false;

          if (_this8.events) {
            for (var _key in _this8.events) {
              if (_this8.events.hasOwnProperty(_key)) {
                _this8.events[_key].destroy();
              }
            }

            _this8.events = null;
          }

          var body = document.body;

          removeClass(html, 'glightbox-open');

          removeClass(body, 'glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer');

          _this8.modal.parentNode.removeChild(_this8.modal);

          _this8.trigger('close');

          if (isFunction(_this8.settings.onClose)) {
            _this8.settings.onClose();
          }

          var styles = document.querySelector('.gcss-styles');

          if (styles) {
            styles.parentNode.removeChild(styles);
          }

          _this8.lightboxOpen = false;
          _this8.closing = null;
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.close();
        this.clearAllEvents();

        if (this.baseEvents) {
          this.baseEvents.destroy();
        }
      }
    }, {
      key: "on",
      value: function on(evt, callback) {
        var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!evt || !isFunction(callback)) {
          throw new TypeError('Event name and callback must be defined');
        }

        this.apiEvents.push({
          evt: evt,
          once: once,
          callback: callback
        });
      }
    }, {
      key: "once",
      value: function once(evt, callback) {
        this.on(evt, callback, true);
      }
    }, {
      key: "trigger",
      value: function trigger(eventName) {
        var _this9 = this;

        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var onceTriggered = [];

        each(this.apiEvents, function (event, i) {
          var evt = event.evt,
              once = event.once,
              callback = event.callback;

          if (evt == eventName) {
            callback(data);

            if (once) {
              onceTriggered.push(i);
            }
          }
        });

        if (onceTriggered.length) {
          each(onceTriggered, function (i) {
            return _this9.apiEvents.splice(i, 1);
          });
        }
      }
    }, {
      key: "clearAllEvents",
      value: function clearAllEvents() {
        this.apiEvents.splice(0, this.apiEvents.length);
      }
    }, {
      key: "version",
      value: function version() {
        return _version;
      }
    }]);

    return GlightboxInit;
  }();

  function glightbox () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var instance = new GlightboxInit(options);
    instance.init();
    return instance;
  }

  return glightbox;

})));
/*!
 * Headhesive.js v1.2.3 - An on-demand sticky header
 * Author: Copyright (c) Mark Goodyear <@markgdyr> <http://markgoodyear.com>
 * Url: http://markgoodyear.com/labs/headhesive
 * License: MIT
 */
!function(t,e){"function"==typeof define&&define.amd?define([],function(){return e()}):"object"==typeof exports?module.exports=e():t.Headhesive=e()}(this,function(){"use strict";var t=function(e,s){for(var o in s)s.hasOwnProperty(o)&&(e[o]="object"==typeof s[o]?t(e[o],s[o]):s[o]);return e},e=function(t,e){var s,o,i,n=Date.now||function(){return(new Date).getTime()},l=null,c=0,r=function(){c=n(),l=null,i=t.apply(s,o),s=o=null};return function(){var f=n(),h=e-(f-c);return s=this,o=arguments,0>=h?(clearTimeout(l),l=null,c=f,i=t.apply(s,o),s=o=null):l||(l=setTimeout(r,h)),i}},s=function(){return void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop},o=function(t,e){for(var s=0,o=t.offsetHeight;t;)s+=t.offsetTop,t=t.offsetParent;return"bottom"===e&&(s+=o),s},i=function(e,s){"querySelector"in document&&"addEventListener"in window&&(this.visible=!1,this.options={offset:300,offsetSide:"top",classes:{clone:"headhesive",stick:"headhesive--stick",unstick:"headhesive--unstick"},throttle:250,onInit:function(){},onStick:function(){},onUnstick:function(){},onDestroy:function(){}},this.elem="string"==typeof e?document.querySelector(e):e,this.options=t(this.options,s),this.init())};return i.prototype={constructor:i,init:function(){if(this.clonedElem=this.elem.cloneNode(!0),this.clonedElem.className+=" "+this.options.classes.clone,document.body.insertBefore(this.clonedElem,document.body.firstChild),"number"==typeof this.options.offset)this.scrollOffset=this.options.offset;else{if("string"!=typeof this.options.offset)throw new Error("Invalid offset: "+this.options.offset);this._setScrollOffset()}this._throttleUpdate=e(this.update.bind(this),this.options.throttle),this._throttleScrollOffset=e(this._setScrollOffset.bind(this),this.options.throttle),window.addEventListener("scroll",this._throttleUpdate,!1),window.addEventListener("resize",this._throttleScrollOffset,!1),this.options.onInit.call(this)},_setScrollOffset:function(){"string"==typeof this.options.offset&&(this.scrollOffset=o(document.querySelector(this.options.offset),this.options.offsetSide))},destroy:function(){document.body.removeChild(this.clonedElem),window.removeEventListener("scroll",this._throttleUpdate),window.removeEventListener("resize",this._throttleScrollOffset),this.options.onDestroy.call(this)},stick:function(){this.visible||(this.clonedElem.className=this.clonedElem.className.replace(new RegExp("(^|\\s)*"+this.options.classes.unstick+"(\\s|$)*","g"),""),this.clonedElem.className+=" "+this.options.classes.stick,this.visible=!0,this.options.onStick.call(this))},unstick:function(){this.visible&&(this.clonedElem.className=this.clonedElem.className.replace(new RegExp("(^|\\s)*"+this.options.classes.stick+"(\\s|$)*","g"),""),this.clonedElem.className+=" "+this.options.classes.unstick,this.visible=!1,this.options.onUnstick.call(this))},update:function(){s()>this.scrollOffset?this.stick():this.unstick()}},i});
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],n=0;n<i.length;n++){var s=i[n],r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);r=200==Math.round(t(n.width)),s.isBoxSizeOuter=r,i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,I=d&&r,x=t(s.width);x!==!1&&(a.width=x+(I?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(I?0:y+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+z),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var o=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?o.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){i=i||100;var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=parseFloat(o),r=parseFloat(n),a=this.layout.size;o.indexOf("%")!=-1&&(s=s/100*a.width),n.indexOf("%")!=-1&&(r=r/100*a.height),s=isNaN(s)?0:s,r=isNaN(r)?0:r,s-=e?a.paddingLeft:a.paddingRight,r-=i?a.paddingTop:a.paddingBottom,this.position.x=s,this.position.y=r},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),n&&!this.isTransitioning)return void this.layoutPosition();var s=t-i,r=e-o,a={};a.transform=this.getTranslate(s,r),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t);
}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
/*!
 * iTooltip.js v1.1.1
 * https://github.com/Ins-V/iTooltip
 */
class DoubleCenterException{constructor(){window.console.error('iTooltip Error: positionX and positionY properties cannot be "center" at the same time.')}}class iTooltip{constructor(t="*"){const e="*"!==t?t:"*[title]";this.objects=document.querySelectorAll(e)}init(t={}){if(this.settings=Object.assign({className:"tooltip",indentX:10,indentY:15,positionX:"right",positionY:"bottom"},t),"center"===this.settings.positionX&&"center"===this.settings.positionY)throw new DoubleCenterException;this.objects.forEach(t=>{t.getAttribute("title")&&(t.addEventListener("mouseenter",t=>this.createTooltip(t)),t.addEventListener("mouseleave",t=>this.removeTooltip(t)))})}createTooltip(t){const e=t.target;this.tooltip=document.createElement("div"),this.tooltip.classList.add(this.settings.className),this.tooltip.innerHTML=e.getAttribute("title");var i=t.target.className.split(" ").find(t=>t.startsWith("itooltip-"));i&&this.tooltip.classList.add(i),this.tooltip.style.position="absolute",this.changePosition(t),e.removeAttribute("title"),document.body.appendChild(this.tooltip),e.addEventListener("mousemove",t=>this.changePosition(t))}removeTooltip(t){t.target.setAttribute("title",this.tooltip.innerHTML),this.tooltip.remove()}changePosition(t){const[e,i]=this.getSizeTooltip(),o=this.getEdges(t),s=window.pageYOffset||document.documentElement.scrollTop;let n=t.pageY,l=t.pageX;if(l="right"===this.settings.positionX?o.right<=e?t.clientX-e-this.settings.indentX:t.clientX+this.settings.indentX:"left"===this.settings.positionX?o.left<=e?o.left+this.settings.indentX:t.clientX-e-this.settings.indentX:o.left<=Math.round(e/2)?t.clientX-o.left:t.clientX-Math.round(e/2),"top"===this.settings.positionY)n=o.top<=i?s+t.clientY+this.settings.indentY:t.pageY-i-this.settings.indentY;else if("bottom"===this.settings.positionY)n=o.bottom<i&&o.top>i+this.settings.indentY?t.pageY-i-this.settings.indentY:s+t.clientY+this.settings.indentY;else{let t=Math.round(i/2);o.bottom<=t&&(t=Math.round(i-o.bottom)),o.top<=t&&(t=o.top),n-=t}this.tooltip.style.top=`${n}px`,this.tooltip.style.left=`${l}px`}getSizeTooltip(){const t=this.tooltip.getBoundingClientRect();return[t.right-t.left,t.bottom-t.top]}getEdges(t){const e=document.documentElement;return{left:t.clientX,right:e.clientWidth-t.clientX,top:t.clientY,bottom:e.clientHeight-t.clientY}}}
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in i)e.push(i[n]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,o.windowContext||(o.windowContext=!0,o.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],o=n.newScroll>n.oldScroll,r=o?n.forward:n.backward;for(var s in this.waypoints[i]){var l=this.waypoints[i][s];if(null!==l.triggerPoint){var a=n.oldScroll<l.triggerPoint,h=n.newScroll>=l.triggerPoint,p=a&&h,u=!a&&!h;(p||u)&&(l.queueTrigger(r),t[l.group.id]=l.group)}}}for(var d in t)t[d].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),n={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var l in this.waypoints[r]){var a,h,p,u,d,f=this.waypoints[r][l],c=f.options.offset,w=f.triggerPoint,y=0,g=null==w;f.element!==f.element.window&&(y=f.adapter.offset()[s.offsetProp]),"function"==typeof c?c=c.apply(f):"string"==typeof c&&(c=parseFloat(c),f.options.offset.indexOf("%")>-1&&(c=Math.ceil(s.contextDimension*c/100))),a=s.contextScroll-s.contextOffset,f.triggerPoint=Math.floor(y+a-c),h=w<s.oldScroll,p=f.triggerPoint>=s.oldScroll,u=h&&p,d=!h&&!p,!g&&u?(f.queueTrigger(s.backward),n[f.group.id]=f.group):!g&&d?(f.queueTrigger(s.forward),n[f.group.id]=f.group):g&&s.oldScroll>=f.triggerPoint&&(f.queueTrigger(s.forward),n[f.group.id]=f.group)}}return o.requestAnimationFrame(function(){for(var t in n)n[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?e:t);for(var r=0,s=n.length;s>r;r+=1){var l=n[r];(l.options.continuous||r===n.length-1)&&l.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function i(t){this.element=t,this.handlers={}}var n=window.Waypoint;i.prototype.innerHeight=function(){var e=t(this.element);return e?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){var e=t(this.element);return e?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function i(t,e,i){for(var n=0,o=e.length-1;o>n;n++){var r=e[n];i&&i!==r||t.removeEventListener(r)}}var n=t.split("."),o=n[0],r=n[1],s=this.element;if(r&&this.handlers[r]&&o)i(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var l in this.handlers)i(s,this.handlers[l][o]||[],e),this.handlers[l][o]=[];else if(r&&this.handlers[r]){for(var a in this.handlers[r])i(s,this.handlers[r][a],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,i=e(this.element.ownerDocument),n={top:0,left:0};return this.element.getBoundingClientRect&&(n=this.element.getBoundingClientRect()),{top:n.top+i.pageYOffset-t.clientTop,left:n.left+i.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var i=t.split("."),n=i[0],o=i[1]||"__default",r=this.handlers[o]=this.handlers[o]||{},s=r[n]=r[n]||[];s.push(e),this.element.addEventListener(n,e)},i.prototype.outerHeight=function(e){var i,n=this.innerHeight();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginTop,10),n+=parseInt(i.marginBottom,10)),n},i.prototype.outerWidth=function(e){var i,n=this.innerWidth();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginLeft,10),n+=parseInt(i.marginRight,10)),n},i.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}for(var e=Array.prototype.slice.call(arguments),i=1,n=e.length;n>i;i++)t(e[0],e[i]);return e[0]},i.inArray=function(t,e,i){return null==e?-1:e.indexOf(t,i)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},n.adapters.push({name:"noframework",Adapter:i}),n.Adapter=i}();
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
/*!
 * Plyr v3.7.2
 * https://github.com/sampotts/plyr
 */
"object"==typeof navigator&&function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Plyr",t):(e="undefined"!=typeof globalThis?globalThis:e||self).Plyr=t()}(this,(function(){"use strict";function e(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function t(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function i(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var a={addCSS:!0,thumbWidth:15,watch:!0};function l(e,t){return function(){return Array.from(document.querySelectorAll(t)).includes(this)}.call(e,t)}var o=function(e){return null!=e?e.constructor:null},r=function(e,t){return!!(e&&t&&e instanceof t)},c=function(e){return null==e},h=function(e){return o(e)===Object},u=function(e){return o(e)===String},d=function(e){return Array.isArray(e)},m=function(e){return r(e,NodeList)},p=u,g=d,f=m,b=function(e){return r(e,Element)},y=function(e){return r(e,Event)},v=function(e){return c(e)||(u(e)||d(e)||m(e))&&!e.length||h(e)&&!Object.keys(e).length};function w(e,t){if(1>t){var i=function(e){var t="".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t?Math.max(0,(t[1]?t[1].length:0)-(t[2]?+t[2]:0)):0}(t);return parseFloat(e.toFixed(i))}return Math.round(e/t)*t}var T=function(){function e(t,i){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),b(t)?this.element=t:p(t)&&(this.element=document.querySelector(t)),b(this.element)&&v(this.element.rangeTouch)&&(this.config=n({},a,{},i),this.init())}return function(e,i,s){i&&t(e.prototype,i),s&&t(e,s)}(e,[{key:"init",value:function(){e.enabled&&(this.config.addCSS&&(this.element.style.userSelect="none",this.element.style.webKitUserSelect="none",this.element.style.touchAction="manipulation"),this.listeners(!0),this.element.rangeTouch=this)}},{key:"destroy",value:function(){e.enabled&&(this.config.addCSS&&(this.element.style.userSelect="",this.element.style.webKitUserSelect="",this.element.style.touchAction=""),this.listeners(!1),this.element.rangeTouch=null)}},{key:"listeners",value:function(e){var t=this,i=e?"addEventListener":"removeEventListener";["touchstart","touchmove","touchend"].forEach((function(e){t.element[i](e,(function(e){return t.set(e)}),!1)}))}},{key:"get",value:function(t){if(!e.enabled||!y(t))return null;var i,s=t.target,n=t.changedTouches[0],a=parseFloat(s.getAttribute("min"))||0,l=parseFloat(s.getAttribute("max"))||100,o=parseFloat(s.getAttribute("step"))||1,r=s.getBoundingClientRect(),c=100/r.width*(this.config.thumbWidth/2)/100;return 0>(i=100/r.width*(n.clientX-r.left))?i=0:100<i&&(i=100),50>i?i-=(100-2*i)*c:50<i&&(i+=2*(i-50)*c),a+w(i/100*(l-a),o)}},{key:"set",value:function(t){e.enabled&&y(t)&&!t.target.disabled&&(t.preventDefault(),t.target.value=this.get(t),function(e,t){if(e&&t){var i=new Event(t,{bubbles:!0});e.dispatchEvent(i)}}(t.target,"touchend"===t.type?"change":"input"))}}],[{key:"setup",value:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},s=null;if(v(t)||p(t)?s=Array.from(document.querySelectorAll(p(t)?t:'input[type="range"]')):b(t)?s=[t]:f(t)?s=Array.from(t):g(t)&&(s=t.filter(b)),v(s))return null;var o=n({},a,{},i);if(p(t)&&o.watch){var r=new MutationObserver((function(i){Array.from(i).forEach((function(i){Array.from(i.addedNodes).forEach((function(i){b(i)&&l(i,t)&&new e(i,o)}))}))}));r.observe(document.body,{childList:!0,subtree:!0})}return s.map((function(t){return new e(t,i)}))}},{key:"enabled",get:function(){return"ontouchstart"in document.documentElement}}]),e}();const k=e=>null!=e?e.constructor:null,C=(e,t)=>Boolean(e&&t&&e instanceof t),A=e=>null==e,S=e=>k(e)===Object,E=e=>k(e)===String,P=e=>k(e)===Function,M=e=>Array.isArray(e),N=e=>C(e,NodeList),x=e=>A(e)||(E(e)||M(e)||N(e))&&!e.length||S(e)&&!Object.keys(e).length;var I=A,L=S,$=e=>k(e)===Number&&!Number.isNaN(e),_=E,O=e=>k(e)===Boolean,j=P,D=M,q=N,H=e=>null!==e&&"object"==typeof e&&1===e.nodeType&&"object"==typeof e.style&&"object"==typeof e.ownerDocument,R=e=>C(e,Event),F=e=>C(e,KeyboardEvent),V=e=>C(e,TextTrack)||!A(e)&&E(e.kind),B=e=>C(e,Promise)&&P(e.then),U=e=>{if(C(e,window.URL))return!0;if(!E(e))return!1;let t=e;e.startsWith("http://")&&e.startsWith("https://")||(t=`http://${e}`);try{return!x(new URL(t).hostname)}catch(e){return!1}},W=x;const z=(()=>{const e=document.createElement("span"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},i=Object.keys(t).find((t=>void 0!==e.style[t]));return!!_(i)&&t[i]})();function K(e,t){setTimeout((()=>{try{e.hidden=!0,e.offsetHeight,e.hidden=!1}catch(e){}}),t)}const Y={isIE:Boolean(window.document.documentMode),isEdge:window.navigator.userAgent.includes("Edge"),isWebkit:"WebkitAppearance"in document.documentElement.style&&!/Edge/.test(navigator.userAgent),isIPhone:/(iPhone|iPod)/gi.test(navigator.platform),isIos:"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1||/(iPad|iPhone|iPod)/gi.test(navigator.platform)};function Q(e,t){return t.split(".").reduce(((e,t)=>e&&e[t]),e)}function X(e={},...t){if(!t.length)return e;const i=t.shift();return L(i)?(Object.keys(i).forEach((t=>{L(i[t])?(Object.keys(e).includes(t)||Object.assign(e,{[t]:{}}),X(e[t],i[t])):Object.assign(e,{[t]:i[t]})})),X(e,...t)):e}function J(e,t){const i=e.length?e:[e];Array.from(i).reverse().forEach(((e,i)=>{const s=i>0?t.cloneNode(!0):t,n=e.parentNode,a=e.nextSibling;s.appendChild(e),a?n.insertBefore(s,a):n.appendChild(s)}))}function G(e,t){H(e)&&!W(t)&&Object.entries(t).filter((([,e])=>!I(e))).forEach((([t,i])=>e.setAttribute(t,i)))}function Z(e,t,i){const s=document.createElement(e);return L(t)&&G(s,t),_(i)&&(s.innerText=i),s}function ee(e,t,i,s){H(t)&&t.appendChild(Z(e,i,s))}function te(e){q(e)||D(e)?Array.from(e).forEach(te):H(e)&&H(e.parentNode)&&e.parentNode.removeChild(e)}function ie(e){if(!H(e))return;let{length:t}=e.childNodes;for(;t>0;)e.removeChild(e.lastChild),t-=1}function se(e,t){return H(t)&&H(t.parentNode)&&H(e)?(t.parentNode.replaceChild(e,t),e):null}function ne(e,t){if(!_(e)||W(e))return{};const i={},s=X({},t);return e.split(",").forEach((e=>{const t=e.trim(),n=t.replace(".",""),a=t.replace(/[[\]]/g,"").split("="),[l]=a,o=a.length>1?a[1].replace(/["']/g,""):"";switch(t.charAt(0)){case".":_(s.class)?i.class=`${s.class} ${n}`:i.class=n;break;case"#":i.id=t.replace("#","");break;case"[":i[l]=o}})),X(s,i)}function ae(e,t){if(!H(e))return;let i=t;O(i)||(i=!e.hidden),e.hidden=i}function le(e,t,i){if(q(e))return Array.from(e).map((e=>le(e,t,i)));if(H(e)){let s="toggle";return void 0!==i&&(s=i?"add":"remove"),e.classList[s](t),e.classList.contains(t)}return!1}function oe(e,t){return H(e)&&e.classList.contains(t)}function re(e,t){const{prototype:i}=Element;return(i.matches||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||function(){return Array.from(document.querySelectorAll(t)).includes(this)}).call(e,t)}function ce(e){return this.elements.container.querySelectorAll(e)}function he(e){return this.elements.container.querySelector(e)}function ue(e=null,t=!1){H(e)&&(e.focus({preventScroll:!0}),t&&le(e,this.config.classNames.tabFocus))}const de={"audio/ogg":"vorbis","audio/wav":"1","video/webm":"vp8, vorbis","video/mp4":"avc1.42E01E, mp4a.40.2","video/ogg":"theora"},me={audio:"canPlayType"in document.createElement("audio"),video:"canPlayType"in document.createElement("video"),check(e,t,i){const s=Y.isIPhone&&i&&me.playsinline,n=me[e]||"html5"!==t;return{api:n,ui:n&&me.rangeInput&&("video"!==e||!Y.isIPhone||s)}},pip:!(Y.isIPhone||!j(Z("video").webkitSetPresentationMode)&&(!document.pictureInPictureEnabled||Z("video").disablePictureInPicture)),airplay:j(window.WebKitPlaybackTargetAvailabilityEvent),playsinline:"playsInline"in document.createElement("video"),mime(e){if(W(e))return!1;const[t]=e.split("/");let i=e;if(!this.isHTML5||t!==this.type)return!1;Object.keys(de).includes(i)&&(i+=`; codecs="${de[e]}"`);try{return Boolean(i&&this.media.canPlayType(i).replace(/no/,""))}catch(e){return!1}},textTracks:"textTracks"in document.createElement("video"),rangeInput:(()=>{const e=document.createElement("input");return e.type="range","range"===e.type})(),touch:"ontouchstart"in document.documentElement,transitions:!1!==z,reducedMotion:"matchMedia"in window&&window.matchMedia("(prefers-reduced-motion)").matches},pe=(()=>{let e=!1;try{const t=Object.defineProperty({},"passive",{get:()=>(e=!0,null)});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(e){}return e})();function ge(e,t,i,s=!1,n=!0,a=!1){if(!e||!("addEventListener"in e)||W(t)||!j(i))return;const l=t.split(" ");let o=a;pe&&(o={passive:n,capture:a}),l.forEach((t=>{this&&this.eventListeners&&s&&this.eventListeners.push({element:e,type:t,callback:i,options:o}),e[s?"addEventListener":"removeEventListener"](t,i,o)}))}function fe(e,t="",i,s=!0,n=!1){ge.call(this,e,t,i,!0,s,n)}function be(e,t="",i,s=!0,n=!1){ge.call(this,e,t,i,!1,s,n)}function ye(e,t="",i,s=!0,n=!1){const a=(...l)=>{be(e,t,a,s,n),i.apply(this,l)};ge.call(this,e,t,a,!0,s,n)}function ve(e,t="",i=!1,s={}){if(!H(e)||W(t))return;const n=new CustomEvent(t,{bubbles:i,detail:{...s,plyr:this}});e.dispatchEvent(n)}function we(){this&&this.eventListeners&&(this.eventListeners.forEach((e=>{const{element:t,type:i,callback:s,options:n}=e;t.removeEventListener(i,s,n)})),this.eventListeners=[])}function Te(){return new Promise((e=>this.ready?setTimeout(e,0):fe.call(this,this.elements.container,"ready",e))).then((()=>{}))}function ke(e){B(e)&&e.then(null,(()=>{}))}function Ce(e){return D(e)?e.filter(((t,i)=>e.indexOf(t)===i)):e}function Ae(e,t){return D(e)&&e.length?e.reduce(((e,i)=>Math.abs(i-t)<Math.abs(e-t)?i:e)):null}function Se(e){return!(!window||!window.CSS)&&window.CSS.supports(e)}const Ee=[[1,1],[4,3],[3,4],[5,4],[4,5],[3,2],[2,3],[16,10],[10,16],[16,9],[9,16],[21,9],[9,21],[32,9],[9,32]].reduce(((e,[t,i])=>({...e,[t/i]:[t,i]})),{});function Pe(e){if(!(D(e)||_(e)&&e.includes(":")))return!1;return(D(e)?e:e.split(":")).map(Number).every($)}function Me(e){if(!D(e)||!e.every($))return null;const[t,i]=e,s=(e,t)=>0===t?e:s(t,e%t),n=s(t,i);return[t/n,i/n]}function Ne(e){const t=e=>Pe(e)?e.split(":").map(Number):null;let i=t(e);if(null===i&&(i=t(this.config.ratio)),null===i&&!W(this.embed)&&D(this.embed.ratio)&&({ratio:i}=this.embed),null===i&&this.isHTML5){const{videoWidth:e,videoHeight:t}=this.media;i=[e,t]}return Me(i)}function xe(e){if(!this.isVideo)return{};const{wrapper:t}=this.elements,i=Ne.call(this,e);if(!D(i))return{};const[s,n]=Me(i),a=100/s*n;if(Se(`aspect-ratio: ${s}/${n}`)?t.style.aspectRatio=`${s}/${n}`:t.style.paddingBottom=`${a}%`,this.isVimeo&&!this.config.vimeo.premium&&this.supported.ui){const e=100/this.media.offsetWidth*parseInt(window.getComputedStyle(this.media).paddingBottom,10),i=(e-a)/(e/50);this.fullscreen.active?t.style.paddingBottom=null:this.media.style.transform=`translateY(-${i}%)`}else this.isHTML5&&t.classList.add(this.config.classNames.videoFixedRatio);return{padding:a,ratio:i}}function Ie(e,t,i=.05){const s=e/t,n=Ae(Object.keys(Ee),s);return Math.abs(n-s)<=i?Ee[n]:[e,t]}const Le={getSources(){if(!this.isHTML5)return[];return Array.from(this.media.querySelectorAll("source")).filter((e=>{const t=e.getAttribute("type");return!!W(t)||me.mime.call(this,t)}))},getQualityOptions(){return this.config.quality.forced?this.config.quality.options:Le.getSources.call(this).map((e=>Number(e.getAttribute("size")))).filter(Boolean)},setup(){if(!this.isHTML5)return;const e=this;e.options.speed=e.config.speed.options,W(this.config.ratio)||xe.call(e),Object.defineProperty(e.media,"quality",{get(){const t=Le.getSources.call(e).find((t=>t.getAttribute("src")===e.source));return t&&Number(t.getAttribute("size"))},set(t){if(e.quality!==t){if(e.config.quality.forced&&j(e.config.quality.onChange))e.config.quality.onChange(t);else{const i=Le.getSources.call(e).find((e=>Number(e.getAttribute("size"))===t));if(!i)return;const{currentTime:s,paused:n,preload:a,readyState:l,playbackRate:o}=e.media;e.media.src=i.getAttribute("src"),("none"!==a||l)&&(e.once("loadedmetadata",(()=>{e.speed=o,e.currentTime=s,n||ke(e.play())})),e.media.load())}ve.call(e,e.media,"qualitychange",!1,{quality:t})}}})},cancelRequests(){this.isHTML5&&(te(Le.getSources.call(this)),this.media.setAttribute("src",this.config.blankVideo),this.media.load(),this.debug.log("Cancelled network requests"))}};function $e(e,...t){return W(e)?e:e.toString().replace(/{(\d+)}/g,((e,i)=>t[i].toString()))}const _e=(e="",t="",i="")=>e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g,"\\$1"),"g"),i.toString()),Oe=(e="")=>e.toString().replace(/\w\S*/g,(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()));function je(e=""){let t=e.toString();return t=function(e=""){let t=e.toString();return t=_e(t,"-"," "),t=_e(t,"_"," "),t=Oe(t),_e(t," ","")}(t),t.charAt(0).toLowerCase()+t.slice(1)}function De(e){const t=document.createElement("div");return t.appendChild(e),t.innerHTML}const qe={pip:"PIP",airplay:"AirPlay",html5:"HTML5",vimeo:"Vimeo",youtube:"YouTube"},He={get(e="",t={}){if(W(e)||W(t))return"";let i=Q(t.i18n,e);if(W(i))return Object.keys(qe).includes(e)?qe[e]:"";const s={"{seektime}":t.seekTime,"{title}":t.title};return Object.entries(s).forEach((([e,t])=>{i=_e(i,e,t)})),i}};class Re{constructor(t){e(this,"get",(e=>{if(!Re.supported||!this.enabled)return null;const t=window.localStorage.getItem(this.key);if(W(t))return null;const i=JSON.parse(t);return _(e)&&e.length?i[e]:i})),e(this,"set",(e=>{if(!Re.supported||!this.enabled)return;if(!L(e))return;let t=this.get();W(t)&&(t={}),X(t,e);try{window.localStorage.setItem(this.key,JSON.stringify(t))}catch(e){}})),this.enabled=t.config.storage.enabled,this.key=t.config.storage.key}static get supported(){try{if(!("localStorage"in window))return!1;const e="___test";return window.localStorage.setItem(e,e),window.localStorage.removeItem(e),!0}catch(e){return!1}}}function Fe(e,t="text"){return new Promise(((i,s)=>{try{const s=new XMLHttpRequest;if(!("withCredentials"in s))return;s.addEventListener("load",(()=>{if("text"===t)try{i(JSON.parse(s.responseText))}catch(e){i(s.responseText)}else i(s.response)})),s.addEventListener("error",(()=>{throw new Error(s.status)})),s.open("GET",e,!0),s.responseType=t,s.send()}catch(e){s(e)}}))}function Ve(e,t){if(!_(e))return;const i=_(t);let s=!1;const n=()=>null!==document.getElementById(t),a=(e,t)=>{e.innerHTML=t,i&&n()||document.body.insertAdjacentElement("afterbegin",e)};if(!i||!n()){const n=Re.supported,l=document.createElement("div");if(l.setAttribute("hidden",""),i&&l.setAttribute("id",t),n){const e=window.localStorage.getItem(`cache-${t}`);if(s=null!==e,s){const t=JSON.parse(e);a(l,t.content)}}Fe(e).then((e=>{if(!W(e)){if(n)try{window.localStorage.setItem(`cache-${t}`,JSON.stringify({content:e}))}catch(e){}a(l,e)}})).catch((()=>{}))}}const Be=e=>Math.trunc(e/60/60%60,10);function Ue(e=0,t=!1,i=!1){if(!$(e))return Ue(void 0,t,i);const s=e=>`0${e}`.slice(-2);let n=Be(e);const a=(l=e,Math.trunc(l/60%60,10));var l;const o=(e=>Math.trunc(e%60,10))(e);return n=t||n>0?`${n}:`:"",`${i&&e>0?"-":""}${n}${s(a)}:${s(o)}`}const We={getIconUrl(){const e=new URL(this.config.iconUrl,window.location),t=window.location.host?window.location.host:window.top.location.host,i=e.host!==t||Y.isIE&&!window.svg4everybody;return{url:this.config.iconUrl,cors:i}},findElements(){try{return this.elements.controls=he.call(this,this.config.selectors.controls.wrapper),this.elements.buttons={play:ce.call(this,this.config.selectors.buttons.play),pause:he.call(this,this.config.selectors.buttons.pause),restart:he.call(this,this.config.selectors.buttons.restart),rewind:he.call(this,this.config.selectors.buttons.rewind),fastForward:he.call(this,this.config.selectors.buttons.fastForward),mute:he.call(this,this.config.selectors.buttons.mute),pip:he.call(this,this.config.selectors.buttons.pip),airplay:he.call(this,this.config.selectors.buttons.airplay),settings:he.call(this,this.config.selectors.buttons.settings),captions:he.call(this,this.config.selectors.buttons.captions),fullscreen:he.call(this,this.config.selectors.buttons.fullscreen)},this.elements.progress=he.call(this,this.config.selectors.progress),this.elements.inputs={seek:he.call(this,this.config.selectors.inputs.seek),volume:he.call(this,this.config.selectors.inputs.volume)},this.elements.display={buffer:he.call(this,this.config.selectors.display.buffer),currentTime:he.call(this,this.config.selectors.display.currentTime),duration:he.call(this,this.config.selectors.display.duration)},H(this.elements.progress)&&(this.elements.display.seekTooltip=this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)),!0}catch(e){return this.debug.warn("It looks like there is a problem with your custom controls HTML",e),this.toggleNativeControls(!0),!1}},createIcon(e,t){const i="http://www.w3.org/2000/svg",s=We.getIconUrl.call(this),n=`${s.cors?"":s.url}#${this.config.iconPrefix}`,a=document.createElementNS(i,"svg");G(a,X(t,{"aria-hidden":"true",focusable:"false"}));const l=document.createElementNS(i,"use"),o=`${n}-${e}`;return"href"in l&&l.setAttributeNS("http://www.w3.org/1999/xlink","href",o),l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o),a.appendChild(l),a},createLabel(e,t={}){const i=He.get(e,this.config);return Z("span",{...t,class:[t.class,this.config.classNames.hidden].filter(Boolean).join(" ")},i)},createBadge(e){if(W(e))return null;const t=Z("span",{class:this.config.classNames.menu.value});return t.appendChild(Z("span",{class:this.config.classNames.menu.badge},e)),t},createButton(e,t){const i=X({},t);let s=je(e);const n={element:"button",toggle:!1,label:null,icon:null,labelPressed:null,iconPressed:null};switch(["element","icon","label"].forEach((e=>{Object.keys(i).includes(e)&&(n[e]=i[e],delete i[e])})),"button"!==n.element||Object.keys(i).includes("type")||(i.type="button"),Object.keys(i).includes("class")?i.class.split(" ").some((e=>e===this.config.classNames.control))||X(i,{class:`${i.class} ${this.config.classNames.control}`}):i.class=this.config.classNames.control,e){case"play":n.toggle=!0,n.label="play",n.labelPressed="pause",n.icon="play",n.iconPressed="pause";break;case"mute":n.toggle=!0,n.label="mute",n.labelPressed="unmute",n.icon="volume",n.iconPressed="muted";break;case"captions":n.toggle=!0,n.label="enableCaptions",n.labelPressed="disableCaptions",n.icon="captions-off",n.iconPressed="captions-on";break;case"fullscreen":n.toggle=!0,n.label="enterFullscreen",n.labelPressed="exitFullscreen",n.icon="enter-fullscreen",n.iconPressed="exit-fullscreen";break;case"play-large":i.class+=` ${this.config.classNames.control}--overlaid`,s="play",n.label="play",n.icon="play";break;default:W(n.label)&&(n.label=s),W(n.icon)&&(n.icon=e)}const a=Z(n.element);return n.toggle?(a.appendChild(We.createIcon.call(this,n.iconPressed,{class:"icon--pressed"})),a.appendChild(We.createIcon.call(this,n.icon,{class:"icon--not-pressed"})),a.appendChild(We.createLabel.call(this,n.labelPressed,{class:"label--pressed"})),a.appendChild(We.createLabel.call(this,n.label,{class:"label--not-pressed"}))):(a.appendChild(We.createIcon.call(this,n.icon)),a.appendChild(We.createLabel.call(this,n.label))),X(i,ne(this.config.selectors.buttons[s],i)),G(a,i),"play"===s?(D(this.elements.buttons[s])||(this.elements.buttons[s]=[]),this.elements.buttons[s].push(a)):this.elements.buttons[s]=a,a},createRange(e,t){const i=Z("input",X(ne(this.config.selectors.inputs[e]),{type:"range",min:0,max:100,step:.01,value:0,autocomplete:"off",role:"slider","aria-label":He.get(e,this.config),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0},t));return this.elements.inputs[e]=i,We.updateRangeFill.call(this,i),T.setup(i),i},createProgress(e,t){const i=Z("progress",X(ne(this.config.selectors.display[e]),{min:0,max:100,value:0,role:"progressbar","aria-hidden":!0},t));if("volume"!==e){i.appendChild(Z("span",null,"0"));const t={played:"played",buffer:"buffered"}[e],s=t?He.get(t,this.config):"";i.innerText=`% ${s.toLowerCase()}`}return this.elements.display[e]=i,i},createTime(e,t){const i=ne(this.config.selectors.display[e],t),s=Z("div",X(i,{class:`${i.class?i.class:""} ${this.config.classNames.display.time} `.trim(),"aria-label":He.get(e,this.config)}),"00:00");return this.elements.display[e]=s,s},bindMenuItemShortcuts(e,t){fe.call(this,e,"keydown keyup",(i=>{if(!["Space","ArrowUp","ArrowDown","ArrowRight"].includes(i.key))return;if(i.preventDefault(),i.stopPropagation(),"keydown"===i.type)return;const s=re(e,'[role="menuitemradio"]');if(!s&&["Space","ArrowRight"].includes(i.key))We.showMenuPanel.call(this,t,!0);else{let t;"Space"!==i.key&&("ArrowDown"===i.key||s&&"ArrowRight"===i.key?(t=e.nextElementSibling,H(t)||(t=e.parentNode.firstElementChild)):(t=e.previousElementSibling,H(t)||(t=e.parentNode.lastElementChild)),ue.call(this,t,!0))}}),!1),fe.call(this,e,"keyup",(e=>{"Return"===e.key&&We.focusFirstMenuItem.call(this,null,!0)}))},createMenuItem({value:e,list:t,type:i,title:s,badge:n=null,checked:a=!1}){const l=ne(this.config.selectors.inputs[i]),o=Z("button",X(l,{type:"button",role:"menuitemradio",class:`${this.config.classNames.control} ${l.class?l.class:""}`.trim(),"aria-checked":a,value:e})),r=Z("span");r.innerHTML=s,H(n)&&r.appendChild(n),o.appendChild(r),Object.defineProperty(o,"checked",{enumerable:!0,get:()=>"true"===o.getAttribute("aria-checked"),set(e){e&&Array.from(o.parentNode.children).filter((e=>re(e,'[role="menuitemradio"]'))).forEach((e=>e.setAttribute("aria-checked","false"))),o.setAttribute("aria-checked",e?"true":"false")}}),this.listeners.bind(o,"click keyup",(t=>{if(!F(t)||"Space"===t.key){switch(t.preventDefault(),t.stopPropagation(),o.checked=!0,i){case"language":this.currentTrack=Number(e);break;case"quality":this.quality=e;break;case"speed":this.speed=parseFloat(e)}We.showMenuPanel.call(this,"home",F(t))}}),i,!1),We.bindMenuItemShortcuts.call(this,o,i),t.appendChild(o)},formatTime(e=0,t=!1){if(!$(e))return e;return Ue(e,Be(this.duration)>0,t)},updateTimeDisplay(e=null,t=0,i=!1){H(e)&&$(t)&&(e.innerText=We.formatTime(t,i))},updateVolume(){this.supported.ui&&(H(this.elements.inputs.volume)&&We.setRange.call(this,this.elements.inputs.volume,this.muted?0:this.volume),H(this.elements.buttons.mute)&&(this.elements.buttons.mute.pressed=this.muted||0===this.volume))},setRange(e,t=0){H(e)&&(e.value=t,We.updateRangeFill.call(this,e))},updateProgress(e){if(!this.supported.ui||!R(e))return;let t=0;const i=(e,t)=>{const i=$(t)?t:0,s=H(e)?e:this.elements.display.buffer;if(H(s)){s.value=i;const e=s.getElementsByTagName("span")[0];H(e)&&(e.childNodes[0].nodeValue=i)}};if(e)switch(e.type){case"timeupdate":case"seeking":case"seeked":s=this.currentTime,n=this.duration,t=0===s||0===n||Number.isNaN(s)||Number.isNaN(n)?0:(s/n*100).toFixed(2),"timeupdate"===e.type&&We.setRange.call(this,this.elements.inputs.seek,t);break;case"playing":case"progress":i(this.elements.display.buffer,100*this.buffered)}var s,n},updateRangeFill(e){const t=R(e)?e.target:e;if(H(t)&&"range"===t.getAttribute("type")){if(re(t,this.config.selectors.inputs.seek)){t.setAttribute("aria-valuenow",this.currentTime);const e=We.formatTime(this.currentTime),i=We.formatTime(this.duration),s=He.get("seekLabel",this.config);t.setAttribute("aria-valuetext",s.replace("{currentTime}",e).replace("{duration}",i))}else if(re(t,this.config.selectors.inputs.volume)){const e=100*t.value;t.setAttribute("aria-valuenow",e),t.setAttribute("aria-valuetext",`${e.toFixed(1)}%`)}else t.setAttribute("aria-valuenow",t.value);Y.isWebkit&&t.style.setProperty("--value",t.value/t.max*100+"%")}},updateSeekTooltip(e){var t,i;if(!this.config.tooltips.seek||!H(this.elements.inputs.seek)||!H(this.elements.display.seekTooltip)||0===this.duration)return;const s=this.elements.display.seekTooltip,n=`${this.config.classNames.tooltip}--visible`,a=e=>le(s,n,e);if(this.touch)return void a(!1);let l=0;const o=this.elements.progress.getBoundingClientRect();if(R(e))l=100/o.width*(e.pageX-o.left);else{if(!oe(s,n))return;l=parseFloat(s.style.left,10)}l<0?l=0:l>100&&(l=100);const r=this.duration/100*l;s.innerText=We.formatTime(r);const c=null===(t=this.config.markers)||void 0===t||null===(i=t.points)||void 0===i?void 0:i.find((({time:e})=>e===Math.round(r)));c&&s.insertAdjacentHTML("afterbegin",`${c.label}<br>`),s.style.left=`${l}%`,R(e)&&["mouseenter","mouseleave"].includes(e.type)&&a("mouseenter"===e.type)},timeUpdate(e){const t=!H(this.elements.display.duration)&&this.config.invertTime;We.updateTimeDisplay.call(this,this.elements.display.currentTime,t?this.duration-this.currentTime:this.currentTime,t),e&&"timeupdate"===e.type&&this.media.seeking||We.updateProgress.call(this,e)},durationUpdate(){if(!this.supported.ui||!this.config.invertTime&&this.currentTime)return;if(this.duration>=2**32)return ae(this.elements.display.currentTime,!0),void ae(this.elements.progress,!0);H(this.elements.inputs.seek)&&this.elements.inputs.seek.setAttribute("aria-valuemax",this.duration);const e=H(this.elements.display.duration);!e&&this.config.displayDuration&&this.paused&&We.updateTimeDisplay.call(this,this.elements.display.currentTime,this.duration),e&&We.updateTimeDisplay.call(this,this.elements.display.duration,this.duration),this.config.markers.enabled&&We.setMarkers.call(this),We.updateSeekTooltip.call(this)},toggleMenuButton(e,t){ae(this.elements.settings.buttons[e],!t)},updateSetting(e,t,i){const s=this.elements.settings.panels[e];let n=null,a=t;if("captions"===e)n=this.currentTrack;else{if(n=W(i)?this[e]:i,W(n)&&(n=this.config[e].default),!W(this.options[e])&&!this.options[e].includes(n))return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);if(!this.config[e].options.includes(n))return void this.debug.warn(`Disabled value of '${n}' for ${e}`)}if(H(a)||(a=s&&s.querySelector('[role="menu"]')),!H(a))return;this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML=We.getLabel.call(this,e,n);const l=a&&a.querySelector(`[value="${n}"]`);H(l)&&(l.checked=!0)},getLabel(e,t){switch(e){case"speed":return 1===t?He.get("normal",this.config):`${t}&times;`;case"quality":if($(t)){const e=He.get(`qualityLabel.${t}`,this.config);return e.length?e:`${t}p`}return Oe(t);case"captions":return Ye.getLabel.call(this);default:return null}},setQualityMenu(e){if(!H(this.elements.settings.panels.quality))return;const t="quality",i=this.elements.settings.panels.quality.querySelector('[role="menu"]');D(e)&&(this.options.quality=Ce(e).filter((e=>this.config.quality.options.includes(e))));const s=!W(this.options.quality)&&this.options.quality.length>1;if(We.toggleMenuButton.call(this,t,s),ie(i),We.checkMenu.call(this),!s)return;const n=e=>{const t=He.get(`qualityBadge.${e}`,this.config);return t.length?We.createBadge.call(this,t):null};this.options.quality.sort(((e,t)=>{const i=this.config.quality.options;return i.indexOf(e)>i.indexOf(t)?1:-1})).forEach((e=>{We.createMenuItem.call(this,{value:e,list:i,type:t,title:We.getLabel.call(this,"quality",e),badge:n(e)})})),We.updateSetting.call(this,t,i)},setCaptionsMenu(){if(!H(this.elements.settings.panels.captions))return;const e="captions",t=this.elements.settings.panels.captions.querySelector('[role="menu"]'),i=Ye.getTracks.call(this),s=Boolean(i.length);if(We.toggleMenuButton.call(this,e,s),ie(t),We.checkMenu.call(this),!s)return;const n=i.map(((e,i)=>({value:i,checked:this.captions.toggled&&this.currentTrack===i,title:Ye.getLabel.call(this,e),badge:e.language&&We.createBadge.call(this,e.language.toUpperCase()),list:t,type:"language"})));n.unshift({value:-1,checked:!this.captions.toggled,title:He.get("disabled",this.config),list:t,type:"language"}),n.forEach(We.createMenuItem.bind(this)),We.updateSetting.call(this,e,t)},setSpeedMenu(){if(!H(this.elements.settings.panels.speed))return;const e="speed",t=this.elements.settings.panels.speed.querySelector('[role="menu"]');this.options.speed=this.options.speed.filter((e=>e>=this.minimumSpeed&&e<=this.maximumSpeed));const i=!W(this.options.speed)&&this.options.speed.length>1;We.toggleMenuButton.call(this,e,i),ie(t),We.checkMenu.call(this),i&&(this.options.speed.forEach((i=>{We.createMenuItem.call(this,{value:i,list:t,type:e,title:We.getLabel.call(this,"speed",i)})})),We.updateSetting.call(this,e,t))},checkMenu(){const{buttons:e}=this.elements.settings,t=!W(e)&&Object.values(e).some((e=>!e.hidden));ae(this.elements.settings.menu,!t)},focusFirstMenuItem(e,t=!1){if(this.elements.settings.popup.hidden)return;let i=e;H(i)||(i=Object.values(this.elements.settings.panels).find((e=>!e.hidden)));const s=i.querySelector('[role^="menuitem"]');ue.call(this,s,t)},toggleMenu(e){const{popup:t}=this.elements.settings,i=this.elements.buttons.settings;if(!H(t)||!H(i))return;const{hidden:s}=t;let n=s;if(O(e))n=e;else if(F(e)&&"Escape"===e.key)n=!1;else if(R(e)){const s=j(e.composedPath)?e.composedPath()[0]:e.target,a=t.contains(s);if(a||!a&&e.target!==i&&n)return}i.setAttribute("aria-expanded",n),ae(t,!n),le(this.elements.container,this.config.classNames.menu.open,n),n&&F(e)?We.focusFirstMenuItem.call(this,null,!0):n||s||ue.call(this,i,F(e))},getMenuSize(e){const t=e.cloneNode(!0);t.style.position="absolute",t.style.opacity=0,t.removeAttribute("hidden"),e.parentNode.appendChild(t);const i=t.scrollWidth,s=t.scrollHeight;return te(t),{width:i,height:s}},showMenuPanel(e="",t=!1){const i=this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);if(!H(i))return;const s=i.parentNode,n=Array.from(s.children).find((e=>!e.hidden));if(me.transitions&&!me.reducedMotion){s.style.width=`${n.scrollWidth}px`,s.style.height=`${n.scrollHeight}px`;const e=We.getMenuSize.call(this,i),t=e=>{e.target===s&&["width","height"].includes(e.propertyName)&&(s.style.width="",s.style.height="",be.call(this,s,z,t))};fe.call(this,s,z,t),s.style.width=`${e.width}px`,s.style.height=`${e.height}px`}ae(n,!0),ae(i,!1),We.focusFirstMenuItem.call(this,i,t)},setDownloadUrl(){const e=this.elements.buttons.download;H(e)&&e.setAttribute("href",this.download)},create(e){const{bindMenuItemShortcuts:t,createButton:i,createProgress:s,createRange:n,createTime:a,setQualityMenu:l,setSpeedMenu:o,showMenuPanel:r}=We;this.elements.controls=null,D(this.config.controls)&&this.config.controls.includes("play-large")&&this.elements.container.appendChild(i.call(this,"play-large"));const c=Z("div",ne(this.config.selectors.controls.wrapper));this.elements.controls=c;const h={class:"plyr__controls__item"};return Ce(D(this.config.controls)?this.config.controls:[]).forEach((l=>{if("restart"===l&&c.appendChild(i.call(this,"restart",h)),"rewind"===l&&c.appendChild(i.call(this,"rewind",h)),"play"===l&&c.appendChild(i.call(this,"play",h)),"fast-forward"===l&&c.appendChild(i.call(this,"fast-forward",h)),"progress"===l){const t=Z("div",{class:`${h.class} plyr__progress__container`}),i=Z("div",ne(this.config.selectors.progress));if(i.appendChild(n.call(this,"seek",{id:`plyr-seek-${e.id}`})),i.appendChild(s.call(this,"buffer")),this.config.tooltips.seek){const e=Z("span",{class:this.config.classNames.tooltip},"00:00");i.appendChild(e),this.elements.display.seekTooltip=e}this.elements.progress=i,t.appendChild(this.elements.progress),c.appendChild(t)}if("current-time"===l&&c.appendChild(a.call(this,"currentTime",h)),"duration"===l&&c.appendChild(a.call(this,"duration",h)),"mute"===l||"volume"===l){let{volume:t}=this.elements;if(H(t)&&c.contains(t)||(t=Z("div",X({},h,{class:`${h.class} plyr__volume`.trim()})),this.elements.volume=t,c.appendChild(t)),"mute"===l&&t.appendChild(i.call(this,"mute")),"volume"===l&&!Y.isIos){const i={max:1,step:.05,value:this.config.volume};t.appendChild(n.call(this,"volume",X(i,{id:`plyr-volume-${e.id}`})))}}if("captions"===l&&c.appendChild(i.call(this,"captions",h)),"settings"===l&&!W(this.config.settings)){const s=Z("div",X({},h,{class:`${h.class} plyr__menu`.trim(),hidden:""}));s.appendChild(i.call(this,"settings",{"aria-haspopup":!0,"aria-controls":`plyr-settings-${e.id}`,"aria-expanded":!1}));const n=Z("div",{class:"plyr__menu__container",id:`plyr-settings-${e.id}`,hidden:""}),a=Z("div"),l=Z("div",{id:`plyr-settings-${e.id}-home`}),o=Z("div",{role:"menu"});l.appendChild(o),a.appendChild(l),this.elements.settings.panels.home=l,this.config.settings.forEach((i=>{const s=Z("button",X(ne(this.config.selectors.buttons.settings),{type:"button",class:`${this.config.classNames.control} ${this.config.classNames.control}--forward`,role:"menuitem","aria-haspopup":!0,hidden:""}));t.call(this,s,i),fe.call(this,s,"click",(()=>{r.call(this,i,!1)}));const n=Z("span",null,He.get(i,this.config)),l=Z("span",{class:this.config.classNames.menu.value});l.innerHTML=e[i],n.appendChild(l),s.appendChild(n),o.appendChild(s);const c=Z("div",{id:`plyr-settings-${e.id}-${i}`,hidden:""}),h=Z("button",{type:"button",class:`${this.config.classNames.control} ${this.config.classNames.control}--back`});h.appendChild(Z("span",{"aria-hidden":!0},He.get(i,this.config))),h.appendChild(Z("span",{class:this.config.classNames.hidden},He.get("menuBack",this.config))),fe.call(this,c,"keydown",(e=>{"ArrowLeft"===e.key&&(e.preventDefault(),e.stopPropagation(),r.call(this,"home",!0))}),!1),fe.call(this,h,"click",(()=>{r.call(this,"home",!1)})),c.appendChild(h),c.appendChild(Z("div",{role:"menu"})),a.appendChild(c),this.elements.settings.buttons[i]=s,this.elements.settings.panels[i]=c})),n.appendChild(a),s.appendChild(n),c.appendChild(s),this.elements.settings.popup=n,this.elements.settings.menu=s}if("pip"===l&&me.pip&&c.appendChild(i.call(this,"pip",h)),"airplay"===l&&me.airplay&&c.appendChild(i.call(this,"airplay",h)),"download"===l){const e=X({},h,{element:"a",href:this.download,target:"_blank"});this.isHTML5&&(e.download="");const{download:t}=this.config.urls;!U(t)&&this.isEmbed&&X(e,{icon:`logo-${this.provider}`,label:this.provider}),c.appendChild(i.call(this,"download",e))}"fullscreen"===l&&c.appendChild(i.call(this,"fullscreen",h))})),this.isHTML5&&l.call(this,Le.getQualityOptions.call(this)),o.call(this),c},inject(){if(this.config.loadSprite){const e=We.getIconUrl.call(this);e.cors&&Ve(e.url,"sprite-plyr")}this.id=Math.floor(1e4*Math.random());let e=null;this.elements.controls=null;const t={id:this.id,seektime:this.config.seekTime,title:this.config.title};let i=!0;j(this.config.controls)&&(this.config.controls=this.config.controls.call(this,t)),this.config.controls||(this.config.controls=[]),H(this.config.controls)||_(this.config.controls)?e=this.config.controls:(e=We.create.call(this,{id:this.id,seektime:this.config.seekTime,speed:this.speed,quality:this.quality,captions:Ye.getLabel.call(this)}),i=!1);let s;i&&_(this.config.controls)&&(e=(e=>{let i=e;return Object.entries(t).forEach((([e,t])=>{i=_e(i,`{${e}}`,t)})),i})(e)),_(this.config.selectors.controls.container)&&(s=document.querySelector(this.config.selectors.controls.container)),H(s)||(s=this.elements.container);if(s[H(e)?"insertAdjacentElement":"insertAdjacentHTML"]("afterbegin",e),H(this.elements.controls)||We.findElements.call(this),!W(this.elements.buttons)){const e=e=>{const t=this.config.classNames.controlPressed;Object.defineProperty(e,"pressed",{enumerable:!0,get:()=>oe(e,t),set(i=!1){le(e,t,i)}})};Object.values(this.elements.buttons).filter(Boolean).forEach((t=>{D(t)||q(t)?Array.from(t).filter(Boolean).forEach(e):e(t)}))}if(Y.isEdge&&K(s),this.config.tooltips.controls){const{classNames:e,selectors:t}=this.config,i=`${t.controls.wrapper} ${t.labels} .${e.hidden}`,s=ce.call(this,i);Array.from(s).forEach((e=>{le(e,this.config.classNames.hidden,!1),le(e,this.config.classNames.tooltip,!0)}))}},setMediaMetadata(){try{"mediaSession"in navigator&&(navigator.mediaSession.metadata=new window.MediaMetadata({title:this.config.mediaMetadata.title,artist:this.config.mediaMetadata.artist,album:this.config.mediaMetadata.album,artwork:this.config.mediaMetadata.artwork}))}catch(e){}},setMarkers(){var e,t;if(!this.duration||this.elements.markers)return;const i=null===(e=this.config.markers)||void 0===e||null===(t=e.points)||void 0===t?void 0:t.filter((({time:e})=>e>0&&e<this.duration));if(null==i||!i.length)return;const s=document.createDocumentFragment(),n=document.createDocumentFragment();let a=null;const l=`${this.config.classNames.tooltip}--visible`,o=e=>le(a,l,e);i.forEach((e=>{const t=Z("span",{class:this.config.classNames.marker},""),i=e.time/this.duration*100+"%";a&&(t.addEventListener("mouseenter",(()=>{e.label||(a.style.left=i,a.innerHTML=e.label,o(!0))})),t.addEventListener("mouseleave",(()=>{o(!1)}))),t.addEventListener("click",(()=>{this.currentTime=e.time})),t.style.left=i,n.appendChild(t)})),s.appendChild(n),this.config.tooltips.seek||(a=Z("span",{class:this.config.classNames.tooltip},""),s.appendChild(a)),this.elements.markers={points:n,tip:a},this.elements.progress.appendChild(s)}};function ze(e,t=!0){let i=e;if(t){const e=document.createElement("a");e.href=i,i=e.href}try{return new URL(i)}catch(e){return null}}function Ke(e){const t=new URLSearchParams;return L(e)&&Object.entries(e).forEach((([e,i])=>{t.set(e,i)})),t}const Ye={setup(){if(!this.supported.ui)return;if(!this.isVideo||this.isYouTube||this.isHTML5&&!me.textTracks)return void(D(this.config.controls)&&this.config.controls.includes("settings")&&this.config.settings.includes("captions")&&We.setCaptionsMenu.call(this));var e,t;if(H(this.elements.captions)||(this.elements.captions=Z("div",ne(this.config.selectors.captions)),e=this.elements.captions,t=this.elements.wrapper,H(e)&&H(t)&&t.parentNode.insertBefore(e,t.nextSibling)),Y.isIE&&window.URL){const e=this.media.querySelectorAll("track");Array.from(e).forEach((e=>{const t=e.getAttribute("src"),i=ze(t);null!==i&&i.hostname!==window.location.href.hostname&&["http:","https:"].includes(i.protocol)&&Fe(t,"blob").then((t=>{e.setAttribute("src",window.URL.createObjectURL(t))})).catch((()=>{te(e)}))}))}const i=Ce((navigator.languages||[navigator.language||navigator.userLanguage||"en"]).map((e=>e.split("-")[0])));let s=(this.storage.get("language")||this.config.captions.language||"auto").toLowerCase();"auto"===s&&([s]=i);let n=this.storage.get("captions");if(O(n)||({active:n}=this.config.captions),Object.assign(this.captions,{toggled:!1,active:n,language:s,languages:i}),this.isHTML5){const e=this.config.captions.update?"addtrack removetrack":"removetrack";fe.call(this,this.media.textTracks,e,Ye.update.bind(this))}setTimeout(Ye.update.bind(this),0)},update(){const e=Ye.getTracks.call(this,!0),{active:t,language:i,meta:s,currentTrackNode:n}=this.captions,a=Boolean(e.find((e=>e.language===i)));this.isHTML5&&this.isVideo&&e.filter((e=>!s.get(e))).forEach((e=>{this.debug.log("Track added",e),s.set(e,{default:"showing"===e.mode}),"showing"===e.mode&&(e.mode="hidden"),fe.call(this,e,"cuechange",(()=>Ye.updateCues.call(this)))})),(a&&this.language!==i||!e.includes(n))&&(Ye.setLanguage.call(this,i),Ye.toggle.call(this,t&&a)),this.elements&&le(this.elements.container,this.config.classNames.captions.enabled,!W(e)),D(this.config.controls)&&this.config.controls.includes("settings")&&this.config.settings.includes("captions")&&We.setCaptionsMenu.call(this)},toggle(e,t=!0){if(!this.supported.ui)return;const{toggled:i}=this.captions,s=this.config.classNames.captions.active,n=I(e)?!i:e;if(n!==i){if(t||(this.captions.active=n,this.storage.set({captions:n})),!this.language&&n&&!t){const e=Ye.getTracks.call(this),t=Ye.findTrack.call(this,[this.captions.language,...this.captions.languages],!0);return this.captions.language=t.language,void Ye.set.call(this,e.indexOf(t))}this.elements.buttons.captions&&(this.elements.buttons.captions.pressed=n),le(this.elements.container,s,n),this.captions.toggled=n,We.updateSetting.call(this,"captions"),ve.call(this,this.media,n?"captionsenabled":"captionsdisabled")}setTimeout((()=>{n&&this.captions.toggled&&(this.captions.currentTrackNode.mode="hidden")}))},set(e,t=!0){const i=Ye.getTracks.call(this);if(-1!==e)if($(e))if(e in i){if(this.captions.currentTrack!==e){this.captions.currentTrack=e;const s=i[e],{language:n}=s||{};this.captions.currentTrackNode=s,We.updateSetting.call(this,"captions"),t||(this.captions.language=n,this.storage.set({language:n})),this.isVimeo&&this.embed.enableTextTrack(n),ve.call(this,this.media,"languagechange")}Ye.toggle.call(this,!0,t),this.isHTML5&&this.isVideo&&Ye.updateCues.call(this)}else this.debug.warn("Track not found",e);else this.debug.warn("Invalid caption argument",e);else Ye.toggle.call(this,!1,t)},setLanguage(e,t=!0){if(!_(e))return void this.debug.warn("Invalid language argument",e);const i=e.toLowerCase();this.captions.language=i;const s=Ye.getTracks.call(this),n=Ye.findTrack.call(this,[i]);Ye.set.call(this,s.indexOf(n),t)},getTracks(e=!1){return Array.from((this.media||{}).textTracks||[]).filter((t=>!this.isHTML5||e||this.captions.meta.has(t))).filter((e=>["captions","subtitles"].includes(e.kind)))},findTrack(e,t=!1){const i=Ye.getTracks.call(this),s=e=>Number((this.captions.meta.get(e)||{}).default),n=Array.from(i).sort(((e,t)=>s(t)-s(e)));let a;return e.every((e=>(a=n.find((t=>t.language===e)),!a))),a||(t?n[0]:void 0)},getCurrentTrack(){return Ye.getTracks.call(this)[this.currentTrack]},getLabel(e){let t=e;return!V(t)&&me.textTracks&&this.captions.toggled&&(t=Ye.getCurrentTrack.call(this)),V(t)?W(t.label)?W(t.language)?He.get("enabled",this.config):e.language.toUpperCase():t.label:He.get("disabled",this.config)},updateCues(e){if(!this.supported.ui)return;if(!H(this.elements.captions))return void this.debug.warn("No captions element to render to");if(!I(e)&&!Array.isArray(e))return void this.debug.warn("updateCues: Invalid input",e);let t=e;if(!t){const e=Ye.getCurrentTrack.call(this);t=Array.from((e||{}).activeCues||[]).map((e=>e.getCueAsHTML())).map(De)}const i=t.map((e=>e.trim())).join("\n");if(i!==this.elements.captions.innerHTML){ie(this.elements.captions);const e=Z("span",ne(this.config.selectors.caption));e.innerHTML=i,this.elements.captions.appendChild(e),ve.call(this,this.media,"cuechange")}}},Qe={enabled:!0,title:"",debug:!1,autoplay:!1,autopause:!0,playsinline:!0,seekTime:10,volume:1,muted:!1,duration:null,displayDuration:!0,invertTime:!0,toggleInvert:!0,ratio:null,clickToPlay:!0,hideControls:!0,resetOnEnd:!1,disableContextMenu:!0,loadSprite:!0,iconPrefix:"plyr",iconUrl:"https://cdn.plyr.io/3.7.2/plyr.svg",blankVideo:"https://cdn.plyr.io/static/blank.mp4",quality:{default:576,options:[4320,2880,2160,1440,1080,720,576,480,360,240],forced:!1,onChange:null},loop:{active:!1},speed:{selected:1,options:[.5,.75,1,1.25,1.5,1.75,2,4]},keyboard:{focused:!0,global:!1},tooltips:{controls:!1,seek:!0},captions:{active:!1,language:"auto",update:!1},fullscreen:{enabled:!0,fallback:!0,iosNative:!1},storage:{enabled:!0,key:"plyr"},controls:["play-large","play","progress","current-time","mute","volume","captions","settings","pip","airplay","fullscreen"],settings:["captions","quality","speed"],i18n:{restart:"Restart",rewind:"Rewind {seektime}s",play:"Play",pause:"Pause",fastForward:"Forward {seektime}s",seek:"Seek",seekLabel:"{currentTime} of {duration}",played:"Played",buffered:"Buffered",currentTime:"Current time",duration:"Duration",volume:"Volume",mute:"Mute",unmute:"Unmute",enableCaptions:"Enable captions",disableCaptions:"Disable captions",download:"Download",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",frameTitle:"Player for {title}",captions:"Captions",settings:"Settings",pip:"PIP",menuBack:"Go back to previous menu",speed:"Speed",normal:"Normal",quality:"Quality",loop:"Loop",start:"Start",end:"End",all:"All",reset:"Reset",disabled:"Disabled",enabled:"Enabled",advertisement:"Ad",qualityBadge:{2160:"4K",1440:"HD",1080:"HD",720:"HD",576:"SD",480:"SD"}},urls:{download:null,vimeo:{sdk:"https://player.vimeo.com/api/player.js",iframe:"https://player.vimeo.com/video/{0}?{1}",api:"https://vimeo.com/api/oembed.json?url={0}"},youtube:{sdk:"https://www.youtube.com/iframe_api",api:"https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"},googleIMA:{sdk:"https://imasdk.googleapis.com/js/sdkloader/ima3.js"}},listeners:{seek:null,play:null,pause:null,restart:null,rewind:null,fastForward:null,mute:null,volume:null,captions:null,download:null,fullscreen:null,pip:null,airplay:null,speed:null,quality:null,loop:null,language:null},events:["ended","progress","stalled","playing","waiting","canplay","canplaythrough","loadstart","loadeddata","loadedmetadata","timeupdate","volumechange","play","pause","error","seeking","seeked","emptied","ratechange","cuechange","download","enterfullscreen","exitfullscreen","captionsenabled","captionsdisabled","languagechange","controlshidden","controlsshown","ready","statechange","qualitychange","adsloaded","adscontentpause","adscontentresume","adstarted","adsmidpoint","adscomplete","adsallcomplete","adsimpression","adsclick"],selectors:{editable:"input, textarea, select, [contenteditable]",container:".plyr",controls:{container:null,wrapper:".plyr__controls"},labels:"[data-plyr]",buttons:{play:'[data-plyr="play"]',pause:'[data-plyr="pause"]',restart:'[data-plyr="restart"]',rewind:'[data-plyr="rewind"]',fastForward:'[data-plyr="fast-forward"]',mute:'[data-plyr="mute"]',captions:'[data-plyr="captions"]',download:'[data-plyr="download"]',fullscreen:'[data-plyr="fullscreen"]',pip:'[data-plyr="pip"]',airplay:'[data-plyr="airplay"]',settings:'[data-plyr="settings"]',loop:'[data-plyr="loop"]'},inputs:{seek:'[data-plyr="seek"]',volume:'[data-plyr="volume"]',speed:'[data-plyr="speed"]',language:'[data-plyr="language"]',quality:'[data-plyr="quality"]'},display:{currentTime:".plyr__time--current",duration:".plyr__time--duration",buffer:".plyr__progress__buffer",loop:".plyr__progress__loop",volume:".plyr__volume--display"},progress:".plyr__progress",captions:".plyr__captions",caption:".plyr__caption"},classNames:{type:"plyr--{0}",provider:"plyr--{0}",video:"plyr__video-wrapper",embed:"plyr__video-embed",videoFixedRatio:"plyr__video-wrapper--fixed-ratio",embedContainer:"plyr__video-embed__container",poster:"plyr__poster",posterEnabled:"plyr__poster-enabled",ads:"plyr__ads",control:"plyr__control",controlPressed:"plyr__control--pressed",playing:"plyr--playing",paused:"plyr--paused",stopped:"plyr--stopped",loading:"plyr--loading",hover:"plyr--hover",tooltip:"plyr__tooltip",cues:"plyr__cues",marker:"plyr__progress__marker",hidden:"plyr__sr-only",hideControls:"plyr--hide-controls",isIos:"plyr--is-ios",isTouch:"plyr--is-touch",uiSupported:"plyr--full-ui",noTransition:"plyr--no-transition",display:{time:"plyr__time"},menu:{value:"plyr__menu__value",badge:"plyr__badge",open:"plyr--menu-open"},captions:{enabled:"plyr--captions-enabled",active:"plyr--captions-active"},fullscreen:{enabled:"plyr--fullscreen-enabled",fallback:"plyr--fullscreen-fallback"},pip:{supported:"plyr--pip-supported",active:"plyr--pip-active"},airplay:{supported:"plyr--airplay-supported",active:"plyr--airplay-active"},tabFocus:"plyr__tab-focus",previewThumbnails:{thumbContainer:"plyr__preview-thumb",thumbContainerShown:"plyr__preview-thumb--is-shown",imageContainer:"plyr__preview-thumb__image-container",timeContainer:"plyr__preview-thumb__time-container",scrubbingContainer:"plyr__preview-scrubbing",scrubbingContainerShown:"plyr__preview-scrubbing--is-shown"}},attributes:{embed:{provider:"data-plyr-provider",id:"data-plyr-embed-id",hash:"data-plyr-embed-hash"}},ads:{enabled:!1,publisherId:"",tagUrl:""},previewThumbnails:{enabled:!1,src:""},vimeo:{byline:!1,portrait:!1,title:!1,speed:!0,transparent:!1,customControls:!0,referrerPolicy:null,premium:!1},youtube:{rel:0,showinfo:0,iv_load_policy:3,modestbranding:1,customControls:!0,noCookie:!1},mediaMetadata:{title:"",artist:"",album:"",artwork:[]},markers:{enabled:!1,points:[]}},Xe="picture-in-picture",Je="inline",Ge={html5:"html5",youtube:"youtube",vimeo:"vimeo"},Ze="audio",et="video";const tt=()=>{};class it{constructor(e=!1){this.enabled=window.console&&e,this.enabled&&this.log("Debugging enabled")}get log(){return this.enabled?Function.prototype.bind.call(console.log,console):tt}get warn(){return this.enabled?Function.prototype.bind.call(console.warn,console):tt}get error(){return this.enabled?Function.prototype.bind.call(console.error,console):tt}}class st{constructor(t){e(this,"onChange",(()=>{if(!this.enabled)return;const e=this.player.elements.buttons.fullscreen;H(e)&&(e.pressed=this.active);const t=this.target===this.player.media?this.target:this.player.elements.container;ve.call(this.player,t,this.active?"enterfullscreen":"exitfullscreen",!0)})),e(this,"toggleFallback",((e=!1)=>{if(e?this.scrollPosition={x:window.scrollX||0,y:window.scrollY||0}:window.scrollTo(this.scrollPosition.x,this.scrollPosition.y),document.body.style.overflow=e?"hidden":"",le(this.target,this.player.config.classNames.fullscreen.fallback,e),Y.isIos){let t=document.head.querySelector('meta[name="viewport"]');const i="viewport-fit=cover";t||(t=document.createElement("meta"),t.setAttribute("name","viewport"));const s=_(t.content)&&t.content.includes(i);e?(this.cleanupViewport=!s,s||(t.content+=`,${i}`)):this.cleanupViewport&&(t.content=t.content.split(",").filter((e=>e.trim()!==i)).join(","))}this.onChange()})),e(this,"trapFocus",(e=>{if(Y.isIos||!this.active||"Tab"!==e.key)return;const t=document.activeElement,i=ce.call(this.player,"a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),[s]=i,n=i[i.length-1];t!==n||e.shiftKey?t===s&&e.shiftKey&&(n.focus(),e.preventDefault()):(s.focus(),e.preventDefault())})),e(this,"update",(()=>{if(this.enabled){let e;e=this.forceFallback?"Fallback (forced)":st.native?"Native":"Fallback",this.player.debug.log(`${e} fullscreen enabled`)}else this.player.debug.log("Fullscreen not supported and fallback disabled");le(this.player.elements.container,this.player.config.classNames.fullscreen.enabled,this.enabled)})),e(this,"enter",(()=>{this.enabled&&(Y.isIos&&this.player.config.fullscreen.iosNative?this.player.isVimeo?this.player.embed.requestFullscreen():this.target.webkitEnterFullscreen():!st.native||this.forceFallback?this.toggleFallback(!0):this.prefix?W(this.prefix)||this.target[`${this.prefix}Request${this.property}`]():this.target.requestFullscreen({navigationUI:"hide"}))})),e(this,"exit",(()=>{if(this.enabled)if(Y.isIos&&this.player.config.fullscreen.iosNative)this.target.webkitExitFullscreen(),ke(this.player.play());else if(!st.native||this.forceFallback)this.toggleFallback(!1);else if(this.prefix){if(!W(this.prefix)){const e="moz"===this.prefix?"Cancel":"Exit";document[`${this.prefix}${e}${this.property}`]()}}else(document.cancelFullScreen||document.exitFullscreen).call(document)})),e(this,"toggle",(()=>{this.active?this.exit():this.enter()})),this.player=t,this.prefix=st.prefix,this.property=st.property,this.scrollPosition={x:0,y:0},this.forceFallback="force"===t.config.fullscreen.fallback,this.player.elements.fullscreen=t.config.fullscreen.container&&function(e,t){const{prototype:i}=Element;return(i.closest||function(){let e=this;do{if(re.matches(e,t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}).call(e,t)}(this.player.elements.container,t.config.fullscreen.container),fe.call(this.player,document,"ms"===this.prefix?"MSFullscreenChange":`${this.prefix}fullscreenchange`,(()=>{this.onChange()})),fe.call(this.player,this.player.elements.container,"dblclick",(e=>{H(this.player.elements.controls)&&this.player.elements.controls.contains(e.target)||this.player.listeners.proxy(e,this.toggle,"fullscreen")})),fe.call(this,this.player.elements.container,"keydown",(e=>this.trapFocus(e))),this.update()}static get native(){return!!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled)}get usingNative(){return st.native&&!this.forceFallback}static get prefix(){if(j(document.exitFullscreen))return"";let e="";return["webkit","moz","ms"].some((t=>!(!j(document[`${t}ExitFullscreen`])&&!j(document[`${t}CancelFullScreen`]))&&(e=t,!0))),e}static get property(){return"moz"===this.prefix?"FullScreen":"Fullscreen"}get enabled(){return(st.native||this.player.config.fullscreen.fallback)&&this.player.config.fullscreen.enabled&&this.player.supported.ui&&this.player.isVideo}get active(){if(!this.enabled)return!1;if(!st.native||this.forceFallback)return oe(this.target,this.player.config.classNames.fullscreen.fallback);const e=this.prefix?this.target.getRootNode()[`${this.prefix}${this.property}Element`]:this.target.getRootNode().fullscreenElement;return e&&e.shadowRoot?e===this.target.getRootNode().host:e===this.target}get target(){return Y.isIos&&this.player.config.fullscreen.iosNative?this.player.media:this.player.elements.fullscreen||this.player.elements.container}}function nt(e,t=1){return new Promise(((i,s)=>{const n=new Image,a=()=>{delete n.onload,delete n.onerror,(n.naturalWidth>=t?i:s)(n)};Object.assign(n,{onload:a,onerror:a,src:e})}))}const at={addStyleHook(){le(this.elements.container,this.config.selectors.container.replace(".",""),!0),le(this.elements.container,this.config.classNames.uiSupported,this.supported.ui)},toggleNativeControls(e=!1){e&&this.isHTML5?this.media.setAttribute("controls",""):this.media.removeAttribute("controls")},build(){if(this.listeners.media(),!this.supported.ui)return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`),void at.toggleNativeControls.call(this,!0);H(this.elements.controls)||(We.inject.call(this),this.listeners.controls()),at.toggleNativeControls.call(this),this.isHTML5&&Ye.setup.call(this),this.volume=null,this.muted=null,this.loop=null,this.quality=null,this.speed=null,We.updateVolume.call(this),We.timeUpdate.call(this),We.durationUpdate.call(this),at.checkPlaying.call(this),le(this.elements.container,this.config.classNames.pip.supported,me.pip&&this.isHTML5&&this.isVideo),le(this.elements.container,this.config.classNames.airplay.supported,me.airplay&&this.isHTML5),le(this.elements.container,this.config.classNames.isIos,Y.isIos),le(this.elements.container,this.config.classNames.isTouch,this.touch),this.ready=!0,setTimeout((()=>{ve.call(this,this.media,"ready")}),0),at.setTitle.call(this),this.poster&&at.setPoster.call(this,this.poster,!1).catch((()=>{})),this.config.duration&&We.durationUpdate.call(this),this.config.mediaMetadata&&We.setMediaMetadata.call(this)},setTitle(){let e=He.get("play",this.config);if(_(this.config.title)&&!W(this.config.title)&&(e+=`, ${this.config.title}`),Array.from(this.elements.buttons.play||[]).forEach((t=>{t.setAttribute("aria-label",e)})),this.isEmbed){const e=he.call(this,"iframe");if(!H(e))return;const t=W(this.config.title)?"video":this.config.title,i=He.get("frameTitle",this.config);e.setAttribute("title",i.replace("{title}",t))}},togglePoster(e){le(this.elements.container,this.config.classNames.posterEnabled,e)},setPoster(e,t=!0){return t&&this.poster?Promise.reject(new Error("Poster already set")):(this.media.setAttribute("data-poster",e),this.elements.poster.removeAttribute("hidden"),Te.call(this).then((()=>nt(e))).catch((t=>{throw e===this.poster&&at.togglePoster.call(this,!1),t})).then((()=>{if(e!==this.poster)throw new Error("setPoster cancelled by later call to setPoster")})).then((()=>(Object.assign(this.elements.poster.style,{backgroundImage:`url('${e}')`,backgroundSize:""}),at.togglePoster.call(this,!0),e))))},checkPlaying(e){le(this.elements.container,this.config.classNames.playing,this.playing),le(this.elements.container,this.config.classNames.paused,this.paused),le(this.elements.container,this.config.classNames.stopped,this.stopped),Array.from(this.elements.buttons.play||[]).forEach((e=>{Object.assign(e,{pressed:this.playing}),e.setAttribute("aria-label",He.get(this.playing?"pause":"play",this.config))})),R(e)&&"timeupdate"===e.type||at.toggleControls.call(this)},checkLoading(e){this.loading=["stalled","waiting"].includes(e.type),clearTimeout(this.timers.loading),this.timers.loading=setTimeout((()=>{le(this.elements.container,this.config.classNames.loading,this.loading),at.toggleControls.call(this)}),this.loading?250:0)},toggleControls(e){const{controls:t}=this.elements;if(t&&this.config.hideControls){const i=this.touch&&this.lastSeekTime+2e3>Date.now();this.toggleControls(Boolean(e||this.loading||this.paused||t.pressed||t.hover||i))}},migrateStyles(){Object.values({...this.media.style}).filter((e=>!W(e)&&_(e)&&e.startsWith("--plyr"))).forEach((e=>{this.elements.container.style.setProperty(e,this.media.style.getPropertyValue(e)),this.media.style.removeProperty(e)})),W(this.media.style)&&this.media.removeAttribute("style")}};class lt{constructor(t){e(this,"firstTouch",(()=>{const{player:e}=this,{elements:t}=e;e.touch=!0,le(t.container,e.config.classNames.isTouch,!0)})),e(this,"setTabFocus",(e=>{const{player:t}=this,{elements:i}=t,{key:s,type:n,timeStamp:a}=e;if(clearTimeout(this.focusTimer),"keydown"===n&&"Tab"!==s)return;"keydown"===n&&(this.lastKeyDown=a);const l=a-this.lastKeyDown<=20;("focus"!==n||l)&&((()=>{const e=t.config.classNames.tabFocus;le(ce.call(t,`.${e}`),e,!1)})(),"focusout"!==n&&(this.focusTimer=setTimeout((()=>{const e=document.activeElement;i.container.contains(e)&&le(document.activeElement,t.config.classNames.tabFocus,!0)}),10)))})),e(this,"global",((e=!0)=>{const{player:t}=this;t.config.keyboard.global&&ge.call(t,window,"keydown keyup",this.handleKey,e,!1),ge.call(t,document.body,"click",this.toggleMenu,e),ye.call(t,document.body,"touchstart",this.firstTouch),ge.call(t,document.body,"keydown focus blur focusout",this.setTabFocus,e,!1,!0)})),e(this,"container",(()=>{const{player:e}=this,{config:t,elements:i,timers:s}=e;!t.keyboard.global&&t.keyboard.focused&&fe.call(e,i.container,"keydown keyup",this.handleKey,!1),fe.call(e,i.container,"mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",(t=>{const{controls:n}=i;n&&"enterfullscreen"===t.type&&(n.pressed=!1,n.hover=!1);let a=0;["touchstart","touchmove","mousemove"].includes(t.type)&&(at.toggleControls.call(e,!0),a=e.touch?3e3:2e3),clearTimeout(s.controls),s.controls=setTimeout((()=>at.toggleControls.call(e,!1)),a)}));const n=()=>{if(!e.isVimeo||e.config.vimeo.premium)return;const t=i.wrapper,{active:s}=e.fullscreen,[n,a]=Ne.call(e),l=Se(`aspect-ratio: ${n} / ${a}`);if(!s)return void(l?(t.style.width=null,t.style.height=null):(t.style.maxWidth=null,t.style.margin=null));const[o,r]=[Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),Math.max(document.documentElement.clientHeight||0,window.innerHeight||0)],c=o/r>n/a;l?(t.style.width=c?"auto":"100%",t.style.height=c?"100%":"auto"):(t.style.maxWidth=c?r/a*n+"px":null,t.style.margin=c?"0 auto":null)},a=()=>{clearTimeout(s.resized),s.resized=setTimeout(n,50)};fe.call(e,i.container,"enterfullscreen exitfullscreen",(t=>{const{target:s}=e.fullscreen;if(s!==i.container)return;if(!e.isEmbed&&W(e.config.ratio))return;n();("enterfullscreen"===t.type?fe:be).call(e,window,"resize",a)}))})),e(this,"media",(()=>{const{player:e}=this,{elements:t}=e;if(fe.call(e,e.media,"timeupdate seeking seeked",(t=>We.timeUpdate.call(e,t))),fe.call(e,e.media,"durationchange loadeddata loadedmetadata",(t=>We.durationUpdate.call(e,t))),fe.call(e,e.media,"ended",(()=>{e.isHTML5&&e.isVideo&&e.config.resetOnEnd&&(e.restart(),e.pause())})),fe.call(e,e.media,"progress playing seeking seeked",(t=>We.updateProgress.call(e,t))),fe.call(e,e.media,"volumechange",(t=>We.updateVolume.call(e,t))),fe.call(e,e.media,"playing play pause ended emptied timeupdate",(t=>at.checkPlaying.call(e,t))),fe.call(e,e.media,"waiting canplay seeked playing",(t=>at.checkLoading.call(e,t))),e.supported.ui&&e.config.clickToPlay&&!e.isAudio){const i=he.call(e,`.${e.config.classNames.video}`);if(!H(i))return;fe.call(e,t.container,"click",(s=>{([t.container,i].includes(s.target)||i.contains(s.target))&&(e.touch&&e.config.hideControls||(e.ended?(this.proxy(s,e.restart,"restart"),this.proxy(s,(()=>{ke(e.play())}),"play")):this.proxy(s,(()=>{ke(e.togglePlay())}),"play")))}))}e.supported.ui&&e.config.disableContextMenu&&fe.call(e,t.wrapper,"contextmenu",(e=>{e.preventDefault()}),!1),fe.call(e,e.media,"volumechange",(()=>{e.storage.set({volume:e.volume,muted:e.muted})})),fe.call(e,e.media,"ratechange",(()=>{We.updateSetting.call(e,"speed"),e.storage.set({speed:e.speed})})),fe.call(e,e.media,"qualitychange",(t=>{We.updateSetting.call(e,"quality",null,t.detail.quality)})),fe.call(e,e.media,"ready qualitychange",(()=>{We.setDownloadUrl.call(e)}));const i=e.config.events.concat(["keyup","keydown"]).join(" ");fe.call(e,e.media,i,(i=>{let{detail:s={}}=i;"error"===i.type&&(s=e.media.error),ve.call(e,t.container,i.type,!0,s)}))})),e(this,"proxy",((e,t,i)=>{const{player:s}=this,n=s.config.listeners[i];let a=!0;j(n)&&(a=n.call(s,e)),!1!==a&&j(t)&&t.call(s,e)})),e(this,"bind",((e,t,i,s,n=!0)=>{const{player:a}=this,l=a.config.listeners[s],o=j(l);fe.call(a,e,t,(e=>this.proxy(e,i,s)),n&&!o)})),e(this,"controls",(()=>{const{player:e}=this,{elements:t}=e,i=Y.isIE?"change":"input";if(t.buttons.play&&Array.from(t.buttons.play).forEach((t=>{this.bind(t,"click",(()=>{ke(e.togglePlay())}),"play")})),this.bind(t.buttons.restart,"click",e.restart,"restart"),this.bind(t.buttons.rewind,"click",(()=>{e.lastSeekTime=Date.now(),e.rewind()}),"rewind"),this.bind(t.buttons.fastForward,"click",(()=>{e.lastSeekTime=Date.now(),e.forward()}),"fastForward"),this.bind(t.buttons.mute,"click",(()=>{e.muted=!e.muted}),"mute"),this.bind(t.buttons.captions,"click",(()=>e.toggleCaptions())),this.bind(t.buttons.download,"click",(()=>{ve.call(e,e.media,"download")}),"download"),this.bind(t.buttons.fullscreen,"click",(()=>{e.fullscreen.toggle()}),"fullscreen"),this.bind(t.buttons.pip,"click",(()=>{e.pip="toggle"}),"pip"),this.bind(t.buttons.airplay,"click",e.airplay,"airplay"),this.bind(t.buttons.settings,"click",(t=>{t.stopPropagation(),t.preventDefault(),We.toggleMenu.call(e,t)}),null,!1),this.bind(t.buttons.settings,"keyup",(t=>{["Space","Enter"].includes(t.key)&&("Enter"!==t.key?(t.preventDefault(),t.stopPropagation(),We.toggleMenu.call(e,t)):We.focusFirstMenuItem.call(e,null,!0))}),null,!1),this.bind(t.settings.menu,"keydown",(t=>{"Escape"===t.key&&We.toggleMenu.call(e,t)})),this.bind(t.inputs.seek,"mousedown mousemove",(e=>{const i=t.progress.getBoundingClientRect(),s=100/i.width*(e.pageX-i.left);e.currentTarget.setAttribute("seek-value",s)})),this.bind(t.inputs.seek,"mousedown mouseup keydown keyup touchstart touchend",(t=>{const i=t.currentTarget,s="play-on-seeked";if(F(t)&&!["ArrowLeft","ArrowRight"].includes(t.key))return;e.lastSeekTime=Date.now();const n=i.hasAttribute(s),a=["mouseup","touchend","keyup"].includes(t.type);n&&a?(i.removeAttribute(s),ke(e.play())):!a&&e.playing&&(i.setAttribute(s,""),e.pause())})),Y.isIos){const t=ce.call(e,'input[type="range"]');Array.from(t).forEach((e=>this.bind(e,i,(e=>K(e.target)))))}this.bind(t.inputs.seek,i,(t=>{const i=t.currentTarget;let s=i.getAttribute("seek-value");W(s)&&(s=i.value),i.removeAttribute("seek-value"),e.currentTime=s/i.max*e.duration}),"seek"),this.bind(t.progress,"mouseenter mouseleave mousemove",(t=>We.updateSeekTooltip.call(e,t))),this.bind(t.progress,"mousemove touchmove",(t=>{const{previewThumbnails:i}=e;i&&i.loaded&&i.startMove(t)})),this.bind(t.progress,"mouseleave touchend click",(()=>{const{previewThumbnails:t}=e;t&&t.loaded&&t.endMove(!1,!0)})),this.bind(t.progress,"mousedown touchstart",(t=>{const{previewThumbnails:i}=e;i&&i.loaded&&i.startScrubbing(t)})),this.bind(t.progress,"mouseup touchend",(t=>{const{previewThumbnails:i}=e;i&&i.loaded&&i.endScrubbing(t)})),Y.isWebkit&&Array.from(ce.call(e,'input[type="range"]')).forEach((t=>{this.bind(t,"input",(t=>We.updateRangeFill.call(e,t.target)))})),e.config.toggleInvert&&!H(t.display.duration)&&this.bind(t.display.currentTime,"click",(()=>{0!==e.currentTime&&(e.config.invertTime=!e.config.invertTime,We.timeUpdate.call(e))})),this.bind(t.inputs.volume,i,(t=>{e.volume=t.target.value}),"volume"),this.bind(t.controls,"mouseenter mouseleave",(i=>{t.controls.hover=!e.touch&&"mouseenter"===i.type})),t.fullscreen&&Array.from(t.fullscreen.children).filter((e=>!e.contains(t.container))).forEach((i=>{this.bind(i,"mouseenter mouseleave",(i=>{t.controls&&(t.controls.hover=!e.touch&&"mouseenter"===i.type)}))})),this.bind(t.controls,"mousedown mouseup touchstart touchend touchcancel",(e=>{t.controls.pressed=["mousedown","touchstart"].includes(e.type)})),this.bind(t.controls,"focusin",(()=>{const{config:i,timers:s}=e;le(t.controls,i.classNames.noTransition,!0),at.toggleControls.call(e,!0),setTimeout((()=>{le(t.controls,i.classNames.noTransition,!1)}),0);const n=this.touch?3e3:4e3;clearTimeout(s.controls),s.controls=setTimeout((()=>at.toggleControls.call(e,!1)),n)})),this.bind(t.inputs.volume,"wheel",(t=>{const i=t.webkitDirectionInvertedFromDevice,[s,n]=[t.deltaX,-t.deltaY].map((e=>i?-e:e)),a=Math.sign(Math.abs(s)>Math.abs(n)?s:n);e.increaseVolume(a/50);const{volume:l}=e.media;(1===a&&l<1||-1===a&&l>0)&&t.preventDefault()}),"volume",!1)})),this.player=t,this.lastKey=null,this.focusTimer=null,this.lastKeyDown=null,this.handleKey=this.handleKey.bind(this),this.toggleMenu=this.toggleMenu.bind(this),this.setTabFocus=this.setTabFocus.bind(this),this.firstTouch=this.firstTouch.bind(this)}handleKey(e){const{player:t}=this,{elements:i}=t,{key:s,type:n,altKey:a,ctrlKey:l,metaKey:o,shiftKey:r}=e,c="keydown"===n,h=c&&s===this.lastKey;if(a||l||o||r)return;if(!s)return;if(c){const n=document.activeElement;if(H(n)){const{editable:s}=t.config.selectors,{seek:a}=i.inputs;if(n!==a&&re(n,s))return;if("Space"===e.key&&re(n,'button, [role^="menuitem"]'))return}switch(["Space","ArrowLeft","ArrowUp","ArrowRight","ArrowDown","0","1","2","3","4","5","6","7","8","9","c","f","k","l","m"].includes(s)&&(e.preventDefault(),e.stopPropagation()),s){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":h||(u=parseInt(s,10),t.currentTime=t.duration/10*u);break;case"Space":case"k":h||ke(t.togglePlay());break;case"ArrowUp":t.increaseVolume(.1);break;case"ArrowDown":t.decreaseVolume(.1);break;case"m":h||(t.muted=!t.muted);break;case"ArrowRight":t.forward();break;case"ArrowLeft":t.rewind();break;case"f":t.fullscreen.toggle();break;case"c":h||t.toggleCaptions();break;case"l":t.loop=!t.loop}"Escape"===s&&!t.fullscreen.usingNative&&t.fullscreen.active&&t.fullscreen.toggle(),this.lastKey=s}else this.lastKey=null;var u}toggleMenu(e){We.toggleMenu.call(this.player,e)}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var ot=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e,t){e.exports=function(){var e=function(){},t={},i={},s={};function n(e,t){e=e.push?e:[e];var n,a,l,o=[],r=e.length,c=r;for(n=function(e,i){i.length&&o.push(e),--c||t(o)};r--;)a=e[r],(l=i[a])?n(a,l):(s[a]=s[a]||[]).push(n)}function a(e,t){if(e){var n=s[e];if(i[e]=t,n)for(;n.length;)n[0](e,t),n.splice(0,1)}}function l(t,i){t.call&&(t={success:t}),i.length?(t.error||e)(i):(t.success||e)(t)}function o(t,i,s,n){var a,l,r=document,c=s.async,h=(s.numRetries||0)+1,u=s.before||e,d=t.replace(/[\?|#].*$/,""),m=t.replace(/^(css|img)!/,"");n=n||0,/(^css!|\.css$)/.test(d)?((l=r.createElement("link")).rel="stylesheet",l.href=m,(a="hideFocus"in l)&&l.relList&&(a=0,l.rel="preload",l.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d)?(l=r.createElement("img")).src=m:((l=r.createElement("script")).src=t,l.async=void 0===c||c),l.onload=l.onerror=l.onbeforeload=function(e){var r=e.type[0];if(a)try{l.sheet.cssText.length||(r="e")}catch(e){18!=e.code&&(r="e")}if("e"==r){if((n+=1)<h)return o(t,i,s,n)}else if("preload"==l.rel&&"style"==l.as)return l.rel="stylesheet";i(t,r,e.defaultPrevented)},!1!==u(t,l)&&r.head.appendChild(l)}function r(e,t,i){var s,n,a=(e=e.push?e:[e]).length,l=a,r=[];for(s=function(e,i,s){if("e"==i&&r.push(e),"b"==i){if(!s)return;r.push(e)}--a||t(r)},n=0;n<l;n++)o(e[n],s,i)}function c(e,i,s){var n,o;if(i&&i.trim&&(n=i),o=(n?s:i)||{},n){if(n in t)throw"LoadJS";t[n]=!0}function c(t,i){r(e,(function(e){l(o,e),t&&l({success:t,error:i},e),a(n,e)}),o)}if(o.returnPromise)return new Promise(c);c()}return c.ready=function(e,t){return n(e,(function(e){l(t,e)})),c},c.done=function(e){a(e,[])},c.reset=function(){t={},i={},s={}},c.isDefined=function(e){return e in t},c}()}));function rt(e){return new Promise(((t,i)=>{ot(e,{success:t,error:i})}))}function ct(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,ve.call(this,this.media,e?"play":"pause"))}const ht={setup(){const e=this;le(e.elements.wrapper,e.config.classNames.embed,!0),e.options.speed=e.config.speed.options,xe.call(e),L(window.Vimeo)?ht.ready.call(e):rt(e.config.urls.vimeo.sdk).then((()=>{ht.ready.call(e)})).catch((t=>{e.debug.warn("Vimeo SDK (player.js) failed to load",t)}))},ready(){const e=this,t=e.config.vimeo,{premium:i,referrerPolicy:s,...n}=t;let a=e.media.getAttribute("src"),l="";W(a)?(a=e.media.getAttribute(e.config.attributes.embed.id),l=e.media.getAttribute(e.config.attributes.embed.hash)):l=function(e){const t=e.match(/^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/);return t&&5===t.length?t[4]:null}(a);const o=l?{h:l}:{};i&&Object.assign(n,{controls:!1,sidedock:!1});const r=Ke({loop:e.config.loop.active,autoplay:e.autoplay,muted:e.muted,gesture:"media",playsinline:!this.config.fullscreen.iosNative,...o,...n}),c=W(h=a)?null:$(Number(h))?h:h.match(/^.*(vimeo.com\/|video\/)(\d+).*/)?RegExp.$2:h;var h;const u=Z("iframe"),d=$e(e.config.urls.vimeo.iframe,c,r);if(u.setAttribute("src",d),u.setAttribute("allowfullscreen",""),u.setAttribute("allow",["autoplay","fullscreen","picture-in-picture","encrypted-media","accelerometer","gyroscope"].join("; ")),W(s)||u.setAttribute("referrerPolicy",s),i||!t.customControls)u.setAttribute("data-poster",e.poster),e.media=se(u,e.media);else{const t=Z("div",{class:e.config.classNames.embedContainer,"data-poster":e.poster});t.appendChild(u),e.media=se(t,e.media)}t.customControls||Fe($e(e.config.urls.vimeo.api,d)).then((t=>{!W(t)&&t.thumbnail_url&&at.setPoster.call(e,t.thumbnail_url).catch((()=>{}))})),e.embed=new window.Vimeo.Player(u,{autopause:e.config.autopause,muted:e.muted}),e.media.paused=!0,e.media.currentTime=0,e.supported.ui&&e.embed.disableTextTrack(),e.media.play=()=>(ct.call(e,!0),e.embed.play()),e.media.pause=()=>(ct.call(e,!1),e.embed.pause()),e.media.stop=()=>{e.pause(),e.currentTime=0};let{currentTime:m}=e.media;Object.defineProperty(e.media,"currentTime",{get:()=>m,set(t){const{embed:i,media:s,paused:n,volume:a}=e,l=n&&!i.hasPlayed;s.seeking=!0,ve.call(e,s,"seeking"),Promise.resolve(l&&i.setVolume(0)).then((()=>i.setCurrentTime(t))).then((()=>l&&i.pause())).then((()=>l&&i.setVolume(a))).catch((()=>{}))}});let p=e.config.speed.selected;Object.defineProperty(e.media,"playbackRate",{get:()=>p,set(t){e.embed.setPlaybackRate(t).then((()=>{p=t,ve.call(e,e.media,"ratechange")})).catch((()=>{e.options.speed=[1]}))}});let{volume:g}=e.config;Object.defineProperty(e.media,"volume",{get:()=>g,set(t){e.embed.setVolume(t).then((()=>{g=t,ve.call(e,e.media,"volumechange")}))}});let{muted:f}=e.config;Object.defineProperty(e.media,"muted",{get:()=>f,set(t){const i=!!O(t)&&t;e.embed.setVolume(i?0:e.config.volume).then((()=>{f=i,ve.call(e,e.media,"volumechange")}))}});let b,{loop:y}=e.config;Object.defineProperty(e.media,"loop",{get:()=>y,set(t){const i=O(t)?t:e.config.loop.active;e.embed.setLoop(i).then((()=>{y=i}))}}),e.embed.getVideoUrl().then((t=>{b=t,We.setDownloadUrl.call(e)})).catch((e=>{this.debug.warn(e)})),Object.defineProperty(e.media,"currentSrc",{get:()=>b}),Object.defineProperty(e.media,"ended",{get:()=>e.currentTime===e.duration}),Promise.all([e.embed.getVideoWidth(),e.embed.getVideoHeight()]).then((t=>{const[i,s]=t;e.embed.ratio=Ie(i,s),xe.call(this)})),e.embed.setAutopause(e.config.autopause).then((t=>{e.config.autopause=t})),e.embed.getVideoTitle().then((t=>{e.config.title=t,at.setTitle.call(this)})),e.embed.getCurrentTime().then((t=>{m=t,ve.call(e,e.media,"timeupdate")})),e.embed.getDuration().then((t=>{e.media.duration=t,ve.call(e,e.media,"durationchange")})),e.embed.getTextTracks().then((t=>{e.media.textTracks=t,Ye.setup.call(e)})),e.embed.on("cuechange",(({cues:t=[]})=>{const i=t.map((e=>function(e){const t=document.createDocumentFragment(),i=document.createElement("div");return t.appendChild(i),i.innerHTML=e,t.firstChild.innerText}(e.text)));Ye.updateCues.call(e,i)})),e.embed.on("loaded",(()=>{if(e.embed.getPaused().then((t=>{ct.call(e,!t),t||ve.call(e,e.media,"playing")})),H(e.embed.element)&&e.supported.ui){e.embed.element.setAttribute("tabindex",-1)}})),e.embed.on("bufferstart",(()=>{ve.call(e,e.media,"waiting")})),e.embed.on("bufferend",(()=>{ve.call(e,e.media,"playing")})),e.embed.on("play",(()=>{ct.call(e,!0),ve.call(e,e.media,"playing")})),e.embed.on("pause",(()=>{ct.call(e,!1)})),e.embed.on("timeupdate",(t=>{e.media.seeking=!1,m=t.seconds,ve.call(e,e.media,"timeupdate")})),e.embed.on("progress",(t=>{e.media.buffered=t.percent,ve.call(e,e.media,"progress"),1===parseInt(t.percent,10)&&ve.call(e,e.media,"canplaythrough"),e.embed.getDuration().then((t=>{t!==e.media.duration&&(e.media.duration=t,ve.call(e,e.media,"durationchange"))}))})),e.embed.on("seeked",(()=>{e.media.seeking=!1,ve.call(e,e.media,"seeked")})),e.embed.on("ended",(()=>{e.media.paused=!0,ve.call(e,e.media,"ended")})),e.embed.on("error",(t=>{e.media.error=t,ve.call(e,e.media,"error")})),t.customControls&&setTimeout((()=>at.build.call(e)),0)}};function ut(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,ve.call(this,this.media,e?"play":"pause"))}function dt(e){return e.noCookie?"https://www.youtube-nocookie.com":"http:"===window.location.protocol?"http://www.youtube.com":void 0}const mt={setup(){if(le(this.elements.wrapper,this.config.classNames.embed,!0),L(window.YT)&&j(window.YT.Player))mt.ready.call(this);else{const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{j(e)&&e(),mt.ready.call(this)},rt(this.config.urls.youtube.sdk).catch((e=>{this.debug.warn("YouTube API failed to load",e)}))}},getTitle(e){Fe($e(this.config.urls.youtube.api,e)).then((e=>{if(L(e)){const{title:t,height:i,width:s}=e;this.config.title=t,at.setTitle.call(this),this.embed.ratio=Ie(s,i)}xe.call(this)})).catch((()=>{xe.call(this)}))},ready(){const e=this,t=e.config.youtube,i=e.media&&e.media.getAttribute("id");if(!W(i)&&i.startsWith("youtube-"))return;let s=e.media.getAttribute("src");W(s)&&(s=e.media.getAttribute(this.config.attributes.embed.id));const n=W(a=s)?null:a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?RegExp.$2:a;var a;const l=Z("div",{id:`${e.provider}-${Math.floor(1e4*Math.random())}`,"data-poster":t.customControls?e.poster:void 0});if(e.media=se(l,e.media),t.customControls){const t=e=>`https://i.ytimg.com/vi/${n}/${e}default.jpg`;nt(t("maxres"),121).catch((()=>nt(t("sd"),121))).catch((()=>nt(t("hq")))).then((t=>at.setPoster.call(e,t.src))).then((t=>{t.includes("maxres")||(e.elements.poster.style.backgroundSize="cover")})).catch((()=>{}))}e.embed=new window.YT.Player(e.media,{videoId:n,host:dt(t),playerVars:X({},{autoplay:e.config.autoplay?1:0,hl:e.config.hl,controls:e.supported.ui&&t.customControls?0:1,disablekb:1,playsinline:e.config.fullscreen.iosNative?0:1,cc_load_policy:e.captions.active?1:0,cc_lang_pref:e.config.captions.language,widget_referrer:window?window.location.href:null},t),events:{onError(t){if(!e.media.error){const i=t.data,s={2:"The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",5:"The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",100:"The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",101:"The owner of the requested video does not allow it to be played in embedded players.",150:"The owner of the requested video does not allow it to be played in embedded players."}[i]||"An unknown error occured";e.media.error={code:i,message:s},ve.call(e,e.media,"error")}},onPlaybackRateChange(t){const i=t.target;e.media.playbackRate=i.getPlaybackRate(),ve.call(e,e.media,"ratechange")},onReady(i){if(j(e.media.play))return;const s=i.target;mt.getTitle.call(e,n),e.media.play=()=>{ut.call(e,!0),s.playVideo()},e.media.pause=()=>{ut.call(e,!1),s.pauseVideo()},e.media.stop=()=>{s.stopVideo()},e.media.duration=s.getDuration(),e.media.paused=!0,e.media.currentTime=0,Object.defineProperty(e.media,"currentTime",{get:()=>Number(s.getCurrentTime()),set(t){e.paused&&!e.embed.hasPlayed&&e.embed.mute(),e.media.seeking=!0,ve.call(e,e.media,"seeking"),s.seekTo(t)}}),Object.defineProperty(e.media,"playbackRate",{get:()=>s.getPlaybackRate(),set(e){s.setPlaybackRate(e)}});let{volume:a}=e.config;Object.defineProperty(e.media,"volume",{get:()=>a,set(t){a=t,s.setVolume(100*a),ve.call(e,e.media,"volumechange")}});let{muted:l}=e.config;Object.defineProperty(e.media,"muted",{get:()=>l,set(t){const i=O(t)?t:l;l=i,s[i?"mute":"unMute"](),s.setVolume(100*a),ve.call(e,e.media,"volumechange")}}),Object.defineProperty(e.media,"currentSrc",{get:()=>s.getVideoUrl()}),Object.defineProperty(e.media,"ended",{get:()=>e.currentTime===e.duration});const o=s.getAvailablePlaybackRates();e.options.speed=o.filter((t=>e.config.speed.options.includes(t))),e.supported.ui&&t.customControls&&e.media.setAttribute("tabindex",-1),ve.call(e,e.media,"timeupdate"),ve.call(e,e.media,"durationchange"),clearInterval(e.timers.buffering),e.timers.buffering=setInterval((()=>{e.media.buffered=s.getVideoLoadedFraction(),(null===e.media.lastBuffered||e.media.lastBuffered<e.media.buffered)&&ve.call(e,e.media,"progress"),e.media.lastBuffered=e.media.buffered,1===e.media.buffered&&(clearInterval(e.timers.buffering),ve.call(e,e.media,"canplaythrough"))}),200),t.customControls&&setTimeout((()=>at.build.call(e)),50)},onStateChange(i){const s=i.target;clearInterval(e.timers.playing);switch(e.media.seeking&&[1,2].includes(i.data)&&(e.media.seeking=!1,ve.call(e,e.media,"seeked")),i.data){case-1:ve.call(e,e.media,"timeupdate"),e.media.buffered=s.getVideoLoadedFraction(),ve.call(e,e.media,"progress");break;case 0:ut.call(e,!1),e.media.loop?(s.stopVideo(),s.playVideo()):ve.call(e,e.media,"ended");break;case 1:t.customControls&&!e.config.autoplay&&e.media.paused&&!e.embed.hasPlayed?e.media.pause():(ut.call(e,!0),ve.call(e,e.media,"playing"),e.timers.playing=setInterval((()=>{ve.call(e,e.media,"timeupdate")}),50),e.media.duration!==s.getDuration()&&(e.media.duration=s.getDuration(),ve.call(e,e.media,"durationchange")));break;case 2:e.muted||e.embed.unMute(),ut.call(e,!1);break;case 3:ve.call(e,e.media,"waiting")}ve.call(e,e.elements.container,"statechange",!1,{code:i.data})}}})}},pt={setup(){this.media?(le(this.elements.container,this.config.classNames.type.replace("{0}",this.type),!0),le(this.elements.container,this.config.classNames.provider.replace("{0}",this.provider),!0),this.isEmbed&&le(this.elements.container,this.config.classNames.type.replace("{0}","video"),!0),this.isVideo&&(this.elements.wrapper=Z("div",{class:this.config.classNames.video}),J(this.media,this.elements.wrapper),this.elements.poster=Z("div",{class:this.config.classNames.poster}),this.elements.wrapper.appendChild(this.elements.poster)),this.isHTML5?Le.setup.call(this):this.isYouTube?mt.setup.call(this):this.isVimeo&&ht.setup.call(this)):this.debug.warn("No media element found!")}};class gt{constructor(t){e(this,"load",(()=>{this.enabled&&(L(window.google)&&L(window.google.ima)?this.ready():rt(this.player.config.urls.googleIMA.sdk).then((()=>{this.ready()})).catch((()=>{this.trigger("error",new Error("Google IMA SDK failed to load"))})))})),e(this,"ready",(()=>{var e;this.enabled||((e=this).manager&&e.manager.destroy(),e.elements.displayContainer&&e.elements.displayContainer.destroy(),e.elements.container.remove()),this.startSafetyTimer(12e3,"ready()"),this.managerPromise.then((()=>{this.clearSafetyTimer("onAdsManagerLoaded()")})),this.listeners(),this.setupIMA()})),e(this,"setupIMA",(()=>{this.elements.container=Z("div",{class:this.player.config.classNames.ads}),this.player.elements.container.appendChild(this.elements.container),google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED),google.ima.settings.setLocale(this.player.config.ads.language),google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline),this.elements.displayContainer=new google.ima.AdDisplayContainer(this.elements.container,this.player.media),this.loader=new google.ima.AdsLoader(this.elements.displayContainer),this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,(e=>this.onAdsManagerLoaded(e)),!1),this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,(e=>this.onAdError(e)),!1),this.requestAds()})),e(this,"requestAds",(()=>{const{container:e}=this.player.elements;try{const t=new google.ima.AdsRequest;t.adTagUrl=this.tagUrl,t.linearAdSlotWidth=e.offsetWidth,t.linearAdSlotHeight=e.offsetHeight,t.nonLinearAdSlotWidth=e.offsetWidth,t.nonLinearAdSlotHeight=e.offsetHeight,t.forceNonLinearFullSlot=!1,t.setAdWillPlayMuted(!this.player.muted),this.loader.requestAds(t)}catch(e){this.onAdError(e)}})),e(this,"pollCountdown",((e=!1)=>{if(!e)return clearInterval(this.countdownTimer),void this.elements.container.removeAttribute("data-badge-text");this.countdownTimer=setInterval((()=>{const e=Ue(Math.max(this.manager.getRemainingTime(),0)),t=`${He.get("advertisement",this.player.config)} - ${e}`;this.elements.container.setAttribute("data-badge-text",t)}),100)})),e(this,"onAdsManagerLoaded",(e=>{if(!this.enabled)return;const t=new google.ima.AdsRenderingSettings;t.restoreCustomPlaybackStateOnAdBreakComplete=!0,t.enablePreloading=!0,this.manager=e.getAdsManager(this.player,t),this.cuePoints=this.manager.getCuePoints(),this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,(e=>this.onAdError(e))),Object.keys(google.ima.AdEvent.Type).forEach((e=>{this.manager.addEventListener(google.ima.AdEvent.Type[e],(e=>this.onAdEvent(e)))})),this.trigger("loaded")})),e(this,"addCuePoints",(()=>{W(this.cuePoints)||this.cuePoints.forEach((e=>{if(0!==e&&-1!==e&&e<this.player.duration){const t=this.player.elements.progress;if(H(t)){const i=100/this.player.duration*e,s=Z("span",{class:this.player.config.classNames.cues});s.style.left=`${i.toString()}%`,t.appendChild(s)}}}))})),e(this,"onAdEvent",(e=>{const{container:t}=this.player.elements,i=e.getAd(),s=e.getAdData();switch((e=>{ve.call(this.player,this.player.media,`ads${e.replace(/_/g,"").toLowerCase()}`)})(e.type),e.type){case google.ima.AdEvent.Type.LOADED:this.trigger("loaded"),this.pollCountdown(!0),i.isLinear()||(i.width=t.offsetWidth,i.height=t.offsetHeight);break;case google.ima.AdEvent.Type.STARTED:this.manager.setVolume(this.player.volume);break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:this.player.ended?this.loadAds():this.loader.contentComplete();break;case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:this.pauseContent();break;case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:this.pollCountdown(),this.resumeContent();break;case google.ima.AdEvent.Type.LOG:s.adError&&this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`)}})),e(this,"onAdError",(e=>{this.cancel(),this.player.debug.warn("Ads error",e)})),e(this,"listeners",(()=>{const{container:e}=this.player.elements;let t;this.player.on("canplay",(()=>{this.addCuePoints()})),this.player.on("ended",(()=>{this.loader.contentComplete()})),this.player.on("timeupdate",(()=>{t=this.player.currentTime})),this.player.on("seeked",(()=>{const e=this.player.currentTime;W(this.cuePoints)||this.cuePoints.forEach(((i,s)=>{t<i&&i<e&&(this.manager.discardAdBreak(),this.cuePoints.splice(s,1))}))})),window.addEventListener("resize",(()=>{this.manager&&this.manager.resize(e.offsetWidth,e.offsetHeight,google.ima.ViewMode.NORMAL)}))})),e(this,"play",(()=>{const{container:e}=this.player.elements;this.managerPromise||this.resumeContent(),this.managerPromise.then((()=>{this.manager.setVolume(this.player.volume),this.elements.displayContainer.initialize();try{this.initialized||(this.manager.init(e.offsetWidth,e.offsetHeight,google.ima.ViewMode.NORMAL),this.manager.start()),this.initialized=!0}catch(e){this.onAdError(e)}})).catch((()=>{}))})),e(this,"resumeContent",(()=>{this.elements.container.style.zIndex="",this.playing=!1,ke(this.player.media.play())})),e(this,"pauseContent",(()=>{this.elements.container.style.zIndex=3,this.playing=!0,this.player.media.pause()})),e(this,"cancel",(()=>{this.initialized&&this.resumeContent(),this.trigger("error"),this.loadAds()})),e(this,"loadAds",(()=>{this.managerPromise.then((()=>{this.manager&&this.manager.destroy(),this.managerPromise=new Promise((e=>{this.on("loaded",e),this.player.debug.log(this.manager)})),this.initialized=!1,this.requestAds()})).catch((()=>{}))})),e(this,"trigger",((e,...t)=>{const i=this.events[e];D(i)&&i.forEach((e=>{j(e)&&e.apply(this,t)}))})),e(this,"on",((e,t)=>(D(this.events[e])||(this.events[e]=[]),this.events[e].push(t),this))),e(this,"startSafetyTimer",((e,t)=>{this.player.debug.log(`Safety timer invoked from: ${t}`),this.safetyTimer=setTimeout((()=>{this.cancel(),this.clearSafetyTimer("startSafetyTimer()")}),e)})),e(this,"clearSafetyTimer",(e=>{I(this.safetyTimer)||(this.player.debug.log(`Safety timer cleared from: ${e}`),clearTimeout(this.safetyTimer),this.safetyTimer=null)})),this.player=t,this.config=t.config.ads,this.playing=!1,this.initialized=!1,this.elements={container:null,displayContainer:null},this.manager=null,this.loader=null,this.cuePoints=null,this.events={},this.safetyTimer=null,this.countdownTimer=null,this.managerPromise=new Promise(((e,t)=>{this.on("loaded",e),this.on("error",t)})),this.load()}get enabled(){const{config:e}=this;return this.player.isHTML5&&this.player.isVideo&&e.enabled&&(!W(e.publisherId)||U(e.tagUrl))}get tagUrl(){const{config:e}=this;if(U(e.tagUrl))return e.tagUrl;return`https://go.aniview.com/api/adserver6/vast/?${Ke({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:e.publisherId})}`}}function ft(e=0,t=0,i=255){return Math.min(Math.max(e,t),i)}const bt=e=>{const t=[];return e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e=>{const i={};e.split(/\r\n|\n|\r/).forEach((e=>{if($(i.startTime)){if(!W(e.trim())&&W(i.text)){const t=e.trim().split("#xywh=");[i.text]=t,t[1]&&([i.x,i.y,i.w,i.h]=t[1].split(","))}}else{const t=e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);t&&(i.startTime=60*Number(t[1]||0)*60+60*Number(t[2])+Number(t[3])+Number(`0.${t[4]}`),i.endTime=60*Number(t[6]||0)*60+60*Number(t[7])+Number(t[8])+Number(`0.${t[9]}`))}})),i.text&&t.push(i)})),t},yt=(e,t)=>{const i={};return e>t.width/t.height?(i.width=t.width,i.height=1/e*t.width):(i.height=t.height,i.width=e*t.height),i};class vt{constructor(t){e(this,"load",(()=>{this.player.elements.display.seekTooltip&&(this.player.elements.display.seekTooltip.hidden=this.enabled),this.enabled&&this.getThumbnails().then((()=>{this.enabled&&(this.render(),this.determineContainerAutoSizing(),this.loaded=!0)}))})),e(this,"getThumbnails",(()=>new Promise((e=>{const{src:t}=this.player.config.previewThumbnails;if(W(t))throw new Error("Missing previewThumbnails.src config attribute");const i=()=>{this.thumbnails.sort(((e,t)=>e.height-t.height)),this.player.debug.log("Preview thumbnails",this.thumbnails),e()};if(j(t))t((e=>{this.thumbnails=e,i()}));else{const e=(_(t)?[t]:t).map((e=>this.getThumbnail(e)));Promise.all(e).then(i)}})))),e(this,"getThumbnail",(e=>new Promise((t=>{Fe(e).then((i=>{const s={frames:bt(i),height:null,urlPrefix:""};s.frames[0].text.startsWith("/")||s.frames[0].text.startsWith("http://")||s.frames[0].text.startsWith("https://")||(s.urlPrefix=e.substring(0,e.lastIndexOf("/")+1));const n=new Image;n.onload=()=>{s.height=n.naturalHeight,s.width=n.naturalWidth,this.thumbnails.push(s),t()},n.src=s.urlPrefix+s.frames[0].text}))})))),e(this,"startMove",(e=>{if(this.loaded&&R(e)&&["touchmove","mousemove"].includes(e.type)&&this.player.media.duration){if("touchmove"===e.type)this.seekTime=this.player.media.duration*(this.player.elements.inputs.seek.value/100);else{var t,i;const s=this.player.elements.progress.getBoundingClientRect(),n=100/s.width*(e.pageX-s.left);this.seekTime=this.player.media.duration*(n/100),this.seekTime<0&&(this.seekTime=0),this.seekTime>this.player.media.duration-1&&(this.seekTime=this.player.media.duration-1),this.mousePosX=e.pageX,this.elements.thumb.time.innerText=Ue(this.seekTime);const a=null===(t=this.player.config.markers)||void 0===t||null===(i=t.points)||void 0===i?void 0:i.find((({time:e})=>e===Math.round(this.seekTime)));a&&this.elements.thumb.time.insertAdjacentHTML("afterbegin",`${a.label}<br>`)}this.showImageAtCurrentTime()}})),e(this,"endMove",(()=>{this.toggleThumbContainer(!1,!0)})),e(this,"startScrubbing",(e=>{(I(e.button)||!1===e.button||0===e.button)&&(this.mouseDown=!0,this.player.media.duration&&(this.toggleScrubbingContainer(!0),this.toggleThumbContainer(!1,!0),this.showImageAtCurrentTime()))})),e(this,"endScrubbing",(()=>{this.mouseDown=!1,Math.ceil(this.lastTime)===Math.ceil(this.player.media.currentTime)?this.toggleScrubbingContainer(!1):ye.call(this.player,this.player.media,"timeupdate",(()=>{this.mouseDown||this.toggleScrubbingContainer(!1)}))})),e(this,"listeners",(()=>{this.player.on("play",(()=>{this.toggleThumbContainer(!1,!0)})),this.player.on("seeked",(()=>{this.toggleThumbContainer(!1)})),this.player.on("timeupdate",(()=>{this.lastTime=this.player.media.currentTime}))})),e(this,"render",(()=>{this.elements.thumb.container=Z("div",{class:this.player.config.classNames.previewThumbnails.thumbContainer}),this.elements.thumb.imageContainer=Z("div",{class:this.player.config.classNames.previewThumbnails.imageContainer}),this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);const e=Z("div",{class:this.player.config.classNames.previewThumbnails.timeContainer});this.elements.thumb.time=Z("span",{},"00:00"),e.appendChild(this.elements.thumb.time),this.elements.thumb.imageContainer.appendChild(e),H(this.player.elements.progress)&&this.player.elements.progress.appendChild(this.elements.thumb.container),this.elements.scrubbing.container=Z("div",{class:this.player.config.classNames.previewThumbnails.scrubbingContainer}),this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)})),e(this,"destroy",(()=>{this.elements.thumb.container&&this.elements.thumb.container.remove(),this.elements.scrubbing.container&&this.elements.scrubbing.container.remove()})),e(this,"showImageAtCurrentTime",(()=>{this.mouseDown?this.setScrubbingContainerSize():this.setThumbContainerSizeAndPos();const e=this.thumbnails[0].frames.findIndex((e=>this.seekTime>=e.startTime&&this.seekTime<=e.endTime)),t=e>=0;let i=0;this.mouseDown||this.toggleThumbContainer(t),t&&(this.thumbnails.forEach(((t,s)=>{this.loadedImages.includes(t.frames[e].text)&&(i=s)})),e!==this.showingThumb&&(this.showingThumb=e,this.loadImage(i)))})),e(this,"loadImage",((e=0)=>{const t=this.showingThumb,i=this.thumbnails[e],{urlPrefix:s}=i,n=i.frames[t],a=i.frames[t].text,l=s+a;if(this.currentImageElement&&this.currentImageElement.dataset.filename===a)this.showImage(this.currentImageElement,n,e,t,a,!1),this.currentImageElement.dataset.index=t,this.removeOldImages(this.currentImageElement);else{this.loadingImage&&this.usingSprites&&(this.loadingImage.onload=null);const i=new Image;i.src=l,i.dataset.index=t,i.dataset.filename=a,this.showingThumbFilename=a,this.player.debug.log(`Loading image: ${l}`),i.onload=()=>this.showImage(i,n,e,t,a,!0),this.loadingImage=i,this.removeOldImages(i)}})),e(this,"showImage",((e,t,i,s,n,a=!0)=>{this.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${a}`),this.setImageSizeAndOffset(e,t),a&&(this.currentImageContainer.appendChild(e),this.currentImageElement=e,this.loadedImages.includes(n)||this.loadedImages.push(n)),this.preloadNearby(s,!0).then(this.preloadNearby(s,!1)).then(this.getHigherQuality(i,e,t,n))})),e(this,"removeOldImages",(e=>{Array.from(this.currentImageContainer.children).forEach((t=>{if("img"!==t.tagName.toLowerCase())return;const i=this.usingSprites?500:1e3;if(t.dataset.index!==e.dataset.index&&!t.dataset.deleting){t.dataset.deleting=!0;const{currentImageContainer:e}=this;setTimeout((()=>{e.removeChild(t),this.player.debug.log(`Removing thumb: ${t.dataset.filename}`)}),i)}}))})),e(this,"preloadNearby",((e,t=!0)=>new Promise((i=>{setTimeout((()=>{const s=this.thumbnails[0].frames[e].text;if(this.showingThumbFilename===s){let n;n=t?this.thumbnails[0].frames.slice(e):this.thumbnails[0].frames.slice(0,e).reverse();let a=!1;n.forEach((e=>{const t=e.text;if(t!==s&&!this.loadedImages.includes(t)){a=!0,this.player.debug.log(`Preloading thumb filename: ${t}`);const{urlPrefix:e}=this.thumbnails[0],s=e+t,n=new Image;n.src=s,n.onload=()=>{this.player.debug.log(`Preloaded thumb filename: ${t}`),this.loadedImages.includes(t)||this.loadedImages.push(t),i()}}})),a||i()}}),300)})))),e(this,"getHigherQuality",((e,t,i,s)=>{if(e<this.thumbnails.length-1){let n=t.naturalHeight;this.usingSprites&&(n=i.h),n<this.thumbContainerHeight&&setTimeout((()=>{this.showingThumbFilename===s&&(this.player.debug.log(`Showing higher quality thumb for: ${s}`),this.loadImage(e+1))}),300)}})),e(this,"toggleThumbContainer",((e=!1,t=!1)=>{const i=this.player.config.classNames.previewThumbnails.thumbContainerShown;this.elements.thumb.container.classList.toggle(i,e),!e&&t&&(this.showingThumb=null,this.showingThumbFilename=null)})),e(this,"toggleScrubbingContainer",((e=!1)=>{const t=this.player.config.classNames.previewThumbnails.scrubbingContainerShown;this.elements.scrubbing.container.classList.toggle(t,e),e||(this.showingThumb=null,this.showingThumbFilename=null)})),e(this,"determineContainerAutoSizing",(()=>{(this.elements.thumb.imageContainer.clientHeight>20||this.elements.thumb.imageContainer.clientWidth>20)&&(this.sizeSpecifiedInCSS=!0)})),e(this,"setThumbContainerSizeAndPos",(()=>{const{imageContainer:e}=this.elements.thumb;if(this.sizeSpecifiedInCSS){if(e.clientHeight>20&&e.clientWidth<20){const t=Math.floor(e.clientHeight*this.thumbAspectRatio);e.style.width=`${t}px`}else if(e.clientHeight<20&&e.clientWidth>20){const t=Math.floor(e.clientWidth/this.thumbAspectRatio);e.style.height=`${t}px`}}else{const t=Math.floor(this.thumbContainerHeight*this.thumbAspectRatio);e.style.height=`${this.thumbContainerHeight}px`,e.style.width=`${t}px`}this.setThumbContainerPos()})),e(this,"setThumbContainerPos",(()=>{const e=this.player.elements.progress.getBoundingClientRect(),t=this.player.elements.container.getBoundingClientRect(),{container:i}=this.elements.thumb,s=t.left-e.left+10,n=t.right-e.left-i.clientWidth-10,a=this.mousePosX-e.left-i.clientWidth/2,l=ft(a,s,n);i.style.left=`${l}px`,i.style.setProperty("--preview-arrow-offset",a-l+"px")})),e(this,"setScrubbingContainerSize",(()=>{const{width:e,height:t}=yt(this.thumbAspectRatio,{width:this.player.media.clientWidth,height:this.player.media.clientHeight});this.elements.scrubbing.container.style.width=`${e}px`,this.elements.scrubbing.container.style.height=`${t}px`})),e(this,"setImageSizeAndOffset",((e,t)=>{if(!this.usingSprites)return;const i=this.thumbContainerHeight/t.h;e.style.height=e.naturalHeight*i+"px",e.style.width=e.naturalWidth*i+"px",e.style.left=`-${t.x*i}px`,e.style.top=`-${t.y*i}px`})),this.player=t,this.thumbnails=[],this.loaded=!1,this.lastMouseMoveTime=Date.now(),this.mouseDown=!1,this.loadedImages=[],this.elements={thumb:{},scrubbing:{}},this.load()}get enabled(){return this.player.isHTML5&&this.player.isVideo&&this.player.config.previewThumbnails.enabled}get currentImageContainer(){return this.mouseDown?this.elements.scrubbing.container:this.elements.thumb.imageContainer}get usingSprites(){return Object.keys(this.thumbnails[0].frames[0]).includes("w")}get thumbAspectRatio(){return this.usingSprites?this.thumbnails[0].frames[0].w/this.thumbnails[0].frames[0].h:this.thumbnails[0].width/this.thumbnails[0].height}get thumbContainerHeight(){if(this.mouseDown){const{height:e}=yt(this.thumbAspectRatio,{width:this.player.media.clientWidth,height:this.player.media.clientHeight});return e}return this.sizeSpecifiedInCSS?this.elements.thumb.imageContainer.clientHeight:Math.floor(this.player.media.clientWidth/this.thumbAspectRatio/4)}get currentImageElement(){return this.mouseDown?this.currentScrubbingImageElement:this.currentThumbnailImageElement}set currentImageElement(e){this.mouseDown?this.currentScrubbingImageElement=e:this.currentThumbnailImageElement=e}}const wt={insertElements(e,t){_(t)?ee(e,this.media,{src:t}):D(t)&&t.forEach((t=>{ee(e,this.media,t)}))},change(e){Q(e,"sources.length")?(Le.cancelRequests.call(this),this.destroy.call(this,(()=>{this.options.quality=[],te(this.media),this.media=null,H(this.elements.container)&&this.elements.container.removeAttribute("class");const{sources:t,type:i}=e,[{provider:s=Ge.html5,src:n}]=t,a="html5"===s?i:"div",l="html5"===s?{}:{src:n};Object.assign(this,{provider:s,type:i,supported:me.check(i,s,this.config.playsinline),media:Z(a,l)}),this.elements.container.appendChild(this.media),O(e.autoplay)&&(this.config.autoplay=e.autoplay),this.isHTML5&&(this.config.crossorigin&&this.media.setAttribute("crossorigin",""),this.config.autoplay&&this.media.setAttribute("autoplay",""),W(e.poster)||(this.poster=e.poster),this.config.loop.active&&this.media.setAttribute("loop",""),this.config.muted&&this.media.setAttribute("muted",""),this.config.playsinline&&this.media.setAttribute("playsinline","")),at.addStyleHook.call(this),this.isHTML5&&wt.insertElements.call(this,"source",t),this.config.title=e.title,pt.setup.call(this),this.isHTML5&&Object.keys(e).includes("tracks")&&wt.insertElements.call(this,"track",e.tracks),(this.isHTML5||this.isEmbed&&!this.supported.ui)&&at.build.call(this),this.isHTML5&&this.media.load(),W(e.previewThumbnails)||(Object.assign(this.config.previewThumbnails,e.previewThumbnails),this.previewThumbnails&&this.previewThumbnails.loaded&&(this.previewThumbnails.destroy(),this.previewThumbnails=null),this.config.previewThumbnails.enabled&&(this.previewThumbnails=new vt(this))),this.fullscreen.update()}),!0)):this.debug.warn("Invalid source format")}};class Tt{constructor(t,i){if(e(this,"play",(()=>j(this.media.play)?(this.ads&&this.ads.enabled&&this.ads.managerPromise.then((()=>this.ads.play())).catch((()=>ke(this.media.play()))),this.media.play()):null)),e(this,"pause",(()=>this.playing&&j(this.media.pause)?this.media.pause():null)),e(this,"togglePlay",(e=>(O(e)?e:!this.playing)?this.play():this.pause())),e(this,"stop",(()=>{this.isHTML5?(this.pause(),this.restart()):j(this.media.stop)&&this.media.stop()})),e(this,"restart",(()=>{this.currentTime=0})),e(this,"rewind",(e=>{this.currentTime-=$(e)?e:this.config.seekTime})),e(this,"forward",(e=>{this.currentTime+=$(e)?e:this.config.seekTime})),e(this,"increaseVolume",(e=>{const t=this.media.muted?0:this.volume;this.volume=t+($(e)?e:0)})),e(this,"decreaseVolume",(e=>{this.increaseVolume(-e)})),e(this,"airplay",(()=>{me.airplay&&this.media.webkitShowPlaybackTargetPicker()})),e(this,"toggleControls",(e=>{if(this.supported.ui&&!this.isAudio){const t=oe(this.elements.container,this.config.classNames.hideControls),i=void 0===e?void 0:!e,s=le(this.elements.container,this.config.classNames.hideControls,i);if(s&&D(this.config.controls)&&this.config.controls.includes("settings")&&!W(this.config.settings)&&We.toggleMenu.call(this,!1),s!==t){const e=s?"controlshidden":"controlsshown";ve.call(this,this.media,e)}return!s}return!1})),e(this,"on",((e,t)=>{fe.call(this,this.elements.container,e,t)})),e(this,"once",((e,t)=>{ye.call(this,this.elements.container,e,t)})),e(this,"off",((e,t)=>{be(this.elements.container,e,t)})),e(this,"destroy",((e,t=!1)=>{if(!this.ready)return;const i=()=>{document.body.style.overflow="",this.embed=null,t?(Object.keys(this.elements).length&&(te(this.elements.buttons.play),te(this.elements.captions),te(this.elements.controls),te(this.elements.wrapper),this.elements.buttons.play=null,this.elements.captions=null,this.elements.controls=null,this.elements.wrapper=null),j(e)&&e()):(we.call(this),Le.cancelRequests.call(this),se(this.elements.original,this.elements.container),ve.call(this,this.elements.original,"destroyed",!0),j(e)&&e.call(this.elements.original),this.ready=!1,setTimeout((()=>{this.elements=null,this.media=null}),200))};this.stop(),clearTimeout(this.timers.loading),clearTimeout(this.timers.controls),clearTimeout(this.timers.resized),this.isHTML5?(at.toggleNativeControls.call(this,!0),i()):this.isYouTube?(clearInterval(this.timers.buffering),clearInterval(this.timers.playing),null!==this.embed&&j(this.embed.destroy)&&this.embed.destroy(),i()):this.isVimeo&&(null!==this.embed&&this.embed.unload().then(i),setTimeout(i,200))})),e(this,"supports",(e=>me.mime.call(this,e))),this.timers={},this.ready=!1,this.loading=!1,this.failed=!1,this.touch=me.touch,this.media=t,_(this.media)&&(this.media=document.querySelectorAll(this.media)),(window.jQuery&&this.media instanceof jQuery||q(this.media)||D(this.media))&&(this.media=this.media[0]),this.config=X({},Qe,Tt.defaults,i||{},(()=>{try{return JSON.parse(this.media.getAttribute("data-plyr-config"))}catch(e){return{}}})()),this.elements={container:null,fullscreen:null,captions:null,buttons:{},display:{},progress:{},inputs:{},settings:{popup:null,menu:null,panels:{},buttons:{}}},this.captions={active:null,currentTrack:-1,meta:new WeakMap},this.fullscreen={active:!1},this.options={speed:[],quality:[]},this.debug=new it(this.config.debug),this.debug.log("Config",this.config),this.debug.log("Support",me),I(this.media)||!H(this.media))return void this.debug.error("Setup failed: no suitable element passed");if(this.media.plyr)return void this.debug.warn("Target already setup");if(!this.config.enabled)return void this.debug.error("Setup failed: disabled by config");if(!me.check().api)return void this.debug.error("Setup failed: no support");const s=this.media.cloneNode(!0);s.autoplay=!1,this.elements.original=s;const n=this.media.tagName.toLowerCase();let a=null,l=null;switch(n){case"div":if(a=this.media.querySelector("iframe"),H(a)){if(l=ze(a.getAttribute("src")),this.provider=function(e){return/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e)?Ge.youtube:/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e)?Ge.vimeo:null}(l.toString()),this.elements.container=this.media,this.media=a,this.elements.container.className="",l.search.length){const e=["1","true"];e.includes(l.searchParams.get("autoplay"))&&(this.config.autoplay=!0),e.includes(l.searchParams.get("loop"))&&(this.config.loop.active=!0),this.isYouTube?(this.config.playsinline=e.includes(l.searchParams.get("playsinline")),this.config.youtube.hl=l.searchParams.get("hl")):this.config.playsinline=!0}}else this.provider=this.media.getAttribute(this.config.attributes.embed.provider),this.media.removeAttribute(this.config.attributes.embed.provider);if(W(this.provider)||!Object.values(Ge).includes(this.provider))return void this.debug.error("Setup failed: Invalid provider");this.type=et;break;case"video":case"audio":this.type=n,this.provider=Ge.html5,this.media.hasAttribute("crossorigin")&&(this.config.crossorigin=!0),this.media.hasAttribute("autoplay")&&(this.config.autoplay=!0),(this.media.hasAttribute("playsinline")||this.media.hasAttribute("webkit-playsinline"))&&(this.config.playsinline=!0),this.media.hasAttribute("muted")&&(this.config.muted=!0),this.media.hasAttribute("loop")&&(this.config.loop.active=!0);break;default:return void this.debug.error("Setup failed: unsupported type")}this.supported=me.check(this.type,this.provider,this.config.playsinline),this.supported.api?(this.eventListeners=[],this.listeners=new lt(this),this.storage=new Re(this),this.media.plyr=this,H(this.elements.container)||(this.elements.container=Z("div",{tabindex:0}),J(this.media,this.elements.container)),at.migrateStyles.call(this),at.addStyleHook.call(this),pt.setup.call(this),this.config.debug&&fe.call(this,this.elements.container,this.config.events.join(" "),(e=>{this.debug.log(`event: ${e.type}`)})),this.fullscreen=new st(this),(this.isHTML5||this.isEmbed&&!this.supported.ui)&&at.build.call(this),this.listeners.container(),this.listeners.global(),this.config.ads.enabled&&(this.ads=new gt(this)),this.isHTML5&&this.config.autoplay&&this.once("canplay",(()=>ke(this.play()))),this.lastSeekTime=0,this.config.previewThumbnails.enabled&&(this.previewThumbnails=new vt(this))):this.debug.error("Setup failed: no support")}get isHTML5(){return this.provider===Ge.html5}get isEmbed(){return this.isYouTube||this.isVimeo}get isYouTube(){return this.provider===Ge.youtube}get isVimeo(){return this.provider===Ge.vimeo}get isVideo(){return this.type===et}get isAudio(){return this.type===Ze}get playing(){return Boolean(this.ready&&!this.paused&&!this.ended)}get paused(){return Boolean(this.media.paused)}get stopped(){return Boolean(this.paused&&0===this.currentTime)}get ended(){return Boolean(this.media.ended)}set currentTime(e){if(!this.duration)return;const t=$(e)&&e>0;this.media.currentTime=t?Math.min(e,this.duration):0,this.debug.log(`Seeking to ${this.currentTime} seconds`)}get currentTime(){return Number(this.media.currentTime)}get buffered(){const{buffered:e}=this.media;return $(e)?e:e&&e.length&&this.duration>0?e.end(0)/this.duration:0}get seeking(){return Boolean(this.media.seeking)}get duration(){const e=parseFloat(this.config.duration),t=(this.media||{}).duration,i=$(t)&&t!==1/0?t:0;return e||i}set volume(e){let t=e;_(t)&&(t=Number(t)),$(t)||(t=this.storage.get("volume")),$(t)||({volume:t}=this.config),t>1&&(t=1),t<0&&(t=0),this.config.volume=t,this.media.volume=t,!W(e)&&this.muted&&t>0&&(this.muted=!1)}get volume(){return Number(this.media.volume)}set muted(e){let t=e;O(t)||(t=this.storage.get("muted")),O(t)||(t=this.config.muted),this.config.muted=t,this.media.muted=t}get muted(){return Boolean(this.media.muted)}get hasAudio(){return!this.isHTML5||(!!this.isAudio||(Boolean(this.media.mozHasAudio)||Boolean(this.media.webkitAudioDecodedByteCount)||Boolean(this.media.audioTracks&&this.media.audioTracks.length)))}set speed(e){let t=null;$(e)&&(t=e),$(t)||(t=this.storage.get("speed")),$(t)||(t=this.config.speed.selected);const{minimumSpeed:i,maximumSpeed:s}=this;t=ft(t,i,s),this.config.speed.selected=t,setTimeout((()=>{this.media&&(this.media.playbackRate=t)}),0)}get speed(){return Number(this.media.playbackRate)}get minimumSpeed(){return this.isYouTube?Math.min(...this.options.speed):this.isVimeo?.5:.0625}get maximumSpeed(){return this.isYouTube?Math.max(...this.options.speed):this.isVimeo?2:16}set quality(e){const t=this.config.quality,i=this.options.quality;if(!i.length)return;let s=[!W(e)&&Number(e),this.storage.get("quality"),t.selected,t.default].find($),n=!0;if(!i.includes(s)){const e=Ae(i,s);this.debug.warn(`Unsupported quality option: ${s}, using ${e} instead`),s=e,n=!1}t.selected=s,this.media.quality=s,n&&this.storage.set({quality:s})}get quality(){return this.media.quality}set loop(e){const t=O(e)?e:this.config.loop.active;this.config.loop.active=t,this.media.loop=t}get loop(){return Boolean(this.media.loop)}set source(e){wt.change.call(this,e)}get source(){return this.media.currentSrc}get download(){const{download:e}=this.config.urls;return U(e)?e:this.source}set download(e){U(e)&&(this.config.urls.download=e,We.setDownloadUrl.call(this))}set poster(e){this.isVideo?at.setPoster.call(this,e,!1).catch((()=>{})):this.debug.warn("Poster can only be set for video")}get poster(){return this.isVideo?this.media.getAttribute("poster")||this.media.getAttribute("data-poster"):null}get ratio(){if(!this.isVideo)return null;const e=Me(Ne.call(this));return D(e)?e.join(":"):e}set ratio(e){this.isVideo?_(e)&&Pe(e)?(this.config.ratio=Me(e),xe.call(this)):this.debug.error(`Invalid aspect ratio specified (${e})`):this.debug.warn("Aspect ratio can only be set for video")}set autoplay(e){this.config.autoplay=O(e)?e:this.config.autoplay}get autoplay(){return Boolean(this.config.autoplay)}toggleCaptions(e){Ye.toggle.call(this,e,!1)}set currentTrack(e){Ye.set.call(this,e,!1),Ye.setup.call(this)}get currentTrack(){const{toggled:e,currentTrack:t}=this.captions;return e?t:-1}set language(e){Ye.setLanguage.call(this,e,!1)}get language(){return(Ye.getCurrentTrack.call(this)||{}).language}set pip(e){if(!me.pip)return;const t=O(e)?e:!this.pip;j(this.media.webkitSetPresentationMode)&&this.media.webkitSetPresentationMode(t?Xe:Je),j(this.media.requestPictureInPicture)&&(!this.pip&&t?this.media.requestPictureInPicture():this.pip&&!t&&document.exitPictureInPicture())}get pip(){return me.pip?W(this.media.webkitPresentationMode)?this.media===document.pictureInPictureElement:this.media.webkitPresentationMode===Xe:null}setPreviewThumbnails(e){this.previewThumbnails&&this.previewThumbnails.loaded&&(this.previewThumbnails.destroy(),this.previewThumbnails=null),Object.assign(this.config.previewThumbnails,e),this.config.previewThumbnails.enabled&&(this.previewThumbnails=new vt(this))}static supported(e,t,i){return me.check(e,t,i)}static loadSprite(e,t){return Ve(e,t)}static setup(e,t={}){let i=null;return _(e)?i=Array.from(document.querySelectorAll(e)):q(e)?i=Array.from(e):D(e)&&(i=e.filter(H)),W(i)?null:i.map((e=>new Tt(e,t)))}}var kt;return Tt.defaults=(kt=Qe,JSON.parse(JSON.stringify(kt))),Tt}));
//# sourceMappingURL=plyr.min.js.map

/* PrismJS 1.24.1
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+markup-templating+php+sass+scss */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,n=0,e={},M={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof W?new W(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n;switch(r=r||{},M.util.type(e)){case"Object":if(n=M.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=M.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e&&!c.test(e.className);)e=e.parentElement;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{plain:e,plaintext:e,text:e,txt:e,extend:function(e,n){var t=M.util.clone(M.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||M.languages)[t],i={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=a[l])}var s=r[t];return r[t]=i,M.languages.DFS(M.languages,function(e,n){n===s&&e!=t&&(this[e]=i)}),i},DFS:function e(n,t,r,a){a=a||{};var i=M.util.objId;for(var l in n)if(n.hasOwnProperty(l)){t.call(n,l,n[l],r||l);var o=n[l],s=M.util.type(o);"Object"!==s||a[i(o)]?"Array"!==s||a[i(o)]||(a[i(o)]=!0,e(o,t,l,a)):(a[i(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){M.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};M.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),M.hooks.run("before-all-elements-highlight",r);for(var a,i=0;a=r.elements[i++];)M.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=M.util.getLanguage(e),a=M.languages[r];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r;var i=e.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&(i.className=i.className.replace(c,"").replace(/\s+/g," ")+" language-"+r);var l={element:e,language:r,grammar:a,code:e.textContent};function o(e){l.highlightedCode=e,M.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,M.hooks.run("after-highlight",l),M.hooks.run("complete",l),t&&t.call(l.element)}if(M.hooks.run("before-sanity-check",l),(i=l.element.parentElement)&&"pre"===i.nodeName.toLowerCase()&&!i.hasAttribute("tabindex")&&i.setAttribute("tabindex","0"),!l.code)return M.hooks.run("complete",l),void(t&&t.call(l.element));if(M.hooks.run("before-highlight",l),l.grammar)if(n&&u.Worker){var s=new Worker(M.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else o(M.highlight(l.code,l.grammar,l.language));else o(M.util.encode(l.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return M.hooks.run("before-tokenize",r),r.tokens=M.tokenize(r.code,r.grammar),M.hooks.run("after-tokenize",r),W.stringify(M.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new i;return I(a,a.head,e),function e(n,t,r,a,i,l){for(var o in r)if(r.hasOwnProperty(o)&&r[o]){var s=r[o];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(l&&l.cause==o+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,h=!!c.greedy,d=c.alias;if(h&&!c.pattern.global){var p=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,p+"g")}for(var v=c.pattern||c,m=a.next,y=i;m!==t.tail&&!(l&&y>=l.reach);y+=m.value.length,m=m.next){var b=m.value;if(t.length>n.length)return;if(!(b instanceof W)){var k,x=1;if(h){if(!(k=z(v,y,n,f)))break;var w=k.index,A=k.index+k[0].length,P=y;for(P+=m.value.length;P<=w;)m=m.next,P+=m.value.length;if(P-=m.value.length,y=P,m.value instanceof W)continue;for(var E=m;E!==t.tail&&(P<A||"string"==typeof E.value);E=E.next)x++,P+=E.value.length;x--,b=n.slice(y,P),k.index-=y}else if(!(k=z(v,0,b,f)))continue;var w=k.index,S=k[0],O=b.slice(0,w),L=b.slice(w+S.length),N=y+b.length;l&&N>l.reach&&(l.reach=N);var j=m.prev;O&&(j=I(t,j,O),y+=O.length),q(t,j,x);var C=new W(o,g?M.tokenize(S,g):S,d,S);if(m=I(t,j,C),L&&I(t,m,L),1<x){var _={cause:o+","+u,reach:N};e(n,t,r,m.prev,y,_),l&&_.reach>l.reach&&(l.reach=_.reach)}}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=M.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=M.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:W};function W(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function z(e,n,t,r){e.lastIndex=n;var a=e.exec(t);if(a&&r&&a[1]){var i=a[1].length;a.index+=i,a[0]=a[0].slice(i)}return a}function i(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function I(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function q(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(u.Prism=M,W.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},i=e.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),M.hooks.run("wrap",a);var l="";for(var o in a.attributes)l+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(M.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(M.highlight(r,M.languages[t],t)),a&&u.close()},!1)),M;var t=M.util.currentScript();function r(){M.manual||M.highlightAll()}if(t&&(M.filename=t.src,t.hasAttribute("data-manual")&&(M.manual=!0)),!M.manual){var a=document.readyState;"loading"===a||"interactive"===a&&t&&t.defer?document.addEventListener("DOMContentLoaded",r):window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,16)}return M}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/,name:/[^\s<>'"]+/}},cdata:/<!\[CDATA\[[\s\S]*?\]\]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var t={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};t["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var n={};n[a]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:t},Prism.languages.insertBefore("markup","cdata",n)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(a,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+a+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;
!function(s){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var t=s.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))}(Prism);
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),Prism.languages.js=Prism.languages.javascript;
!function(h){function v(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(h.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,r,e,o){if(a.language===r){var c=a.tokenStack=[];a.code=a.code.replace(e,function(e){if("function"==typeof o&&!o(e))return e;for(var n,t=c.length;-1!==a.code.indexOf(n=v(r,t));)++t;return c[t]=e,n}),a.grammar=h.languages.markup}}},tokenizePlaceholders:{value:function(p,k){if(p.language===k&&p.tokenStack){p.grammar=h.languages[k];var m=0,d=Object.keys(p.tokenStack);!function e(n){for(var t=0;t<n.length&&!(m>=d.length);t++){var a=n[t];if("string"==typeof a||a.content&&"string"==typeof a.content){var r=d[m],o=p.tokenStack[r],c="string"==typeof a?a:a.content,i=v(k,r),u=c.indexOf(i);if(-1<u){++m;var g=c.substring(0,u),l=new h.Token(k,h.tokenize(o,p.grammar),"language-"+k,o),s=c.substring(u+i.length),f=[];g&&f.push.apply(f,e([g])),f.push(l),s&&f.push.apply(f,e([s])),"string"==typeof a?n.splice.apply(n,[t,1].concat(f)):a.content=f}}else a.content&&e(a.content)}return n}(p.tokens)}}}})}(Prism);
!function(a){var e=/\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,t=[{pattern:/\b(?:false|true)\b/i,alias:"boolean"},{pattern:/(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,greedy:!0,lookbehind:!0},{pattern:/(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,greedy:!0,lookbehind:!0},/\b(?:null)\b/i,/\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/],i=/\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,n=/<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,s=/[{}\[\](),:;]/;a.languages.php={delimiter:{pattern:/\?>$|^<\?(?:php(?=\s)|=)?/i,alias:"important"},comment:e,variable:/\$+(?:\w+\b|(?=\{))/i,package:{pattern:/(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,lookbehind:!0,inside:{punctuation:/\\/}},"class-name-definition":{pattern:/(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,lookbehind:!0,alias:"class-name"},"function-definition":{pattern:/(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,lookbehind:!0,alias:"function"},keyword:[{pattern:/(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,alias:"type-casting",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*[\w|]\|\s*)(?:null|false)\b(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?[\w|]\|\s*)(?:null|false)\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,alias:"type-declaration",greedy:!0},{pattern:/(\|\s*)(?:null|false)\b/i,alias:"type-declaration",greedy:!0,lookbehind:!0},{pattern:/\b(?:parent|self|static)(?=\s*::)/i,alias:"static-context",greedy:!0},{pattern:/(\byield\s+)from\b/i,lookbehind:!0},/\bclass\b/i,{pattern:/((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,lookbehind:!0}],"argument-name":{pattern:/([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i,lookbehind:!0},"class-name":[{pattern:/(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,greedy:!0,lookbehind:!0},{pattern:/(\|\s*)\b[a-z_]\w*(?!\\)\b/i,greedy:!0,lookbehind:!0},{pattern:/\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,greedy:!0},{pattern:/(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,alias:"class-name-fully-qualified",greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,alias:"class-name-fully-qualified",greedy:!0,inside:{punctuation:/\\/}},{pattern:/(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,alias:"class-name-fully-qualified",greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/\b[a-z_]\w*(?=\s*\$)/i,alias:"type-declaration",greedy:!0},{pattern:/(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,alias:["class-name-fully-qualified","type-declaration"],greedy:!0,inside:{punctuation:/\\/}},{pattern:/\b[a-z_]\w*(?=\s*::)/i,alias:"static-context",greedy:!0},{pattern:/(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,alias:["class-name-fully-qualified","static-context"],greedy:!0,inside:{punctuation:/\\/}},{pattern:/([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,alias:["class-name-fully-qualified","type-hint"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,alias:["class-name-fully-qualified","return-type"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}}],constant:t,function:{pattern:/(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,lookbehind:!0,inside:{punctuation:/\\/}},property:{pattern:/(->\s*)\w+/,lookbehind:!0},number:i,operator:n,punctuation:s};var l={pattern:/\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,lookbehind:!0,inside:a.languages.php},r=[{pattern:/<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,alias:"nowdoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<<'[^']+'|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<'?|[';]$/}}}},{pattern:/<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<"?|[";]$/}},interpolation:l}},{pattern:/`(?:\\[\s\S]|[^\\`])*`/,alias:"backtick-quoted-string",greedy:!0},{pattern:/'(?:\\[\s\S]|[^\\'])*'/,alias:"single-quoted-string",greedy:!0},{pattern:/"(?:\\[\s\S]|[^\\"])*"/,alias:"double-quoted-string",greedy:!0,inside:{interpolation:l}}];a.languages.insertBefore("php","variable",{string:r,attribute:{pattern:/#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,greedy:!0,inside:{"attribute-content":{pattern:/^(#\[)[\s\S]+(?=\]$)/,lookbehind:!0,inside:{comment:e,string:r,"attribute-class-name":[{pattern:/([^:]|^)\b[a-z_]\w*(?!\\)\b/i,alias:"class-name",greedy:!0,lookbehind:!0},{pattern:/([^:]|^)(?:\\?\b[a-z_]\w*)+/i,alias:["class-name","class-name-fully-qualified"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}}],constant:t,number:i,operator:n,punctuation:s}},delimiter:{pattern:/^#\[|\]$/,alias:"punctuation"}}}}),a.hooks.add("before-tokenize",function(e){if(/<\?/.test(e.code)){a.languages["markup-templating"].buildPlaceholders(e,"php",/<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi)}}),a.hooks.add("after-tokenize",function(e){a.languages["markup-templating"].tokenizePlaceholders(e,"php")})}(Prism);
!function(e){e.languages.sass=e.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,lookbehind:!0,greedy:!0}}),e.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,greedy:!0,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete e.languages.sass.atrule;var r=/\$[-\w]+|#\{\$[-\w]+\}/,t=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s)-(?=\s)/,lookbehind:!0}];e.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,greedy:!0,inside:{punctuation:/:/,variable:r,operator:t}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,greedy:!0,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:r,operator:t,important:e.languages.sass.important}}}),delete e.languages.sass.property,delete e.languages.sass.important,e.languages.insertBefore("sass","punctuation",{selector:{pattern:/^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,lookbehind:!0,greedy:!0}})}(Prism);
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)?url(?=\()/i,selector:{pattern:/(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/m,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-\w]+/,variable:/\$[-\w]+|#\{\$[-\w]+\}/}},property:{pattern:/(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,inside:{variable:/\$[-\w]+|#\{\$[-\w]+\}/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,{pattern:/( )(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.insertBefore("scss","important",{variable:/\$[-\w]+|#\{\$[-\w]+\}/}),Prism.languages.insertBefore("scss","function",{"module-modifier":{pattern:/\b(?:as|with|show|hide)\b/i,alias:"keyword"},placeholder:{pattern:/%[-\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},boolean:/\b(?:true|false)\b/,null:{pattern:/\bnull\b/,alias:"keyword"},operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.languages.scss;

// ProgressBar.js 1.0.1
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.ProgressBar=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(b,c,d){(function(){var b=this||Function("return this")(),e=function(){"use strict";function e(){}function f(a,b){var c;for(c in a)Object.hasOwnProperty.call(a,c)&&b(c)}function g(a,b){return f(b,function(c){a[c]=b[c]}),a}function h(a,b){f(b,function(c){"undefined"==typeof a[c]&&(a[c]=b[c])})}function i(a,b,c,d,e,f,g){var h,i,k,l=f>a?0:(a-f)/e;for(h in b)b.hasOwnProperty(h)&&(i=g[h],k="function"==typeof i?i:o[i],b[h]=j(c[h],d[h],k,l));return b}function j(a,b,c,d){return a+(b-a)*c(d)}function k(a,b){var c=n.prototype.filter,d=a._filterArgs;f(c,function(e){"undefined"!=typeof c[e][b]&&c[e][b].apply(a,d)})}function l(a,b,c,d,e,f,g,h,j,l,m){v=b+c+d,w=Math.min(m||u(),v),x=w>=v,y=d-(v-w),a.isPlaying()&&(x?(j(g,a._attachment,y),a.stop(!0)):(a._scheduleId=l(a._timeoutHandler,s),k(a,"beforeTween"),b+c>w?i(1,e,f,g,1,1,h):i(w,e,f,g,d,b+c,h),k(a,"afterTween"),j(e,a._attachment,y)))}function m(a,b){var c={},d=typeof b;return"string"===d||"function"===d?f(a,function(a){c[a]=b}):f(a,function(a){c[a]||(c[a]=b[a]||q)}),c}function n(a,b){this._currentState=a||{},this._configured=!1,this._scheduleFunction=p,"undefined"!=typeof b&&this.setConfig(b)}var o,p,q="linear",r=500,s=1e3/60,t=Date.now?Date.now:function(){return+new Date},u="undefined"!=typeof SHIFTY_DEBUG_NOW?SHIFTY_DEBUG_NOW:t;p="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout:setTimeout;var v,w,x,y;return n.prototype.tween=function(a){return this._isTweening?this:(void 0===a&&this._configured||this.setConfig(a),this._timestamp=u(),this._start(this.get(),this._attachment),this.resume())},n.prototype.setConfig=function(a){a=a||{},this._configured=!0,this._attachment=a.attachment,this._pausedAtTime=null,this._scheduleId=null,this._delay=a.delay||0,this._start=a.start||e,this._step=a.step||e,this._finish=a.finish||e,this._duration=a.duration||r,this._currentState=g({},a.from)||this.get(),this._originalState=this.get(),this._targetState=g({},a.to)||this.get();var b=this;this._timeoutHandler=function(){l(b,b._timestamp,b._delay,b._duration,b._currentState,b._originalState,b._targetState,b._easing,b._step,b._scheduleFunction)};var c=this._currentState,d=this._targetState;return h(d,c),this._easing=m(c,a.easing||q),this._filterArgs=[c,this._originalState,d,this._easing],k(this,"tweenCreated"),this},n.prototype.get=function(){return g({},this._currentState)},n.prototype.set=function(a){this._currentState=a},n.prototype.pause=function(){return this._pausedAtTime=u(),this._isPaused=!0,this},n.prototype.resume=function(){return this._isPaused&&(this._timestamp+=u()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0,this._timeoutHandler(),this},n.prototype.seek=function(a){a=Math.max(a,0);var b=u();return this._timestamp+a===0?this:(this._timestamp=b-a,this.isPlaying()||(this._isTweening=!0,this._isPaused=!1,l(this,this._timestamp,this._delay,this._duration,this._currentState,this._originalState,this._targetState,this._easing,this._step,this._scheduleFunction,b),this.pause()),this)},n.prototype.stop=function(a){return this._isTweening=!1,this._isPaused=!1,this._timeoutHandler=e,(b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.oCancelAnimationFrame||b.msCancelAnimationFrame||b.mozCancelRequestAnimationFrame||b.clearTimeout)(this._scheduleId),a&&(k(this,"beforeTween"),i(1,this._currentState,this._originalState,this._targetState,1,0,this._easing),k(this,"afterTween"),k(this,"afterTweenEnd"),this._finish.call(this,this._currentState,this._attachment)),this},n.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused},n.prototype.setScheduleFunction=function(a){this._scheduleFunction=a},n.prototype.dispose=function(){var a;for(a in this)this.hasOwnProperty(a)&&delete this[a]},n.prototype.filter={},n.prototype.formula={linear:function(a){return a}},o=n.prototype.formula,g(n,{now:u,each:f,tweenProps:i,tweenProp:j,applyFilter:k,shallowCopy:g,defaults:h,composeEasingObject:m}),"function"==typeof SHIFTY_DEBUG_NOW&&(b.timeoutHandler=l),"object"==typeof d?c.exports=n:"function"==typeof a&&a.amd?a(function(){return n}):"undefined"==typeof b.Tweenable&&(b.Tweenable=n),n}();!function(){e.shallowCopy(e.prototype.formula,{easeInQuad:function(a){return Math.pow(a,2)},easeOutQuad:function(a){return-(Math.pow(a-1,2)-1)},easeInOutQuad:function(a){return(a/=.5)<1?.5*Math.pow(a,2):-.5*((a-=2)*a-2)},easeInCubic:function(a){return Math.pow(a,3)},easeOutCubic:function(a){return Math.pow(a-1,3)+1},easeInOutCubic:function(a){return(a/=.5)<1?.5*Math.pow(a,3):.5*(Math.pow(a-2,3)+2)},easeInQuart:function(a){return Math.pow(a,4)},easeOutQuart:function(a){return-(Math.pow(a-1,4)-1)},easeInOutQuart:function(a){return(a/=.5)<1?.5*Math.pow(a,4):-.5*((a-=2)*Math.pow(a,3)-2)},easeInQuint:function(a){return Math.pow(a,5)},easeOutQuint:function(a){return Math.pow(a-1,5)+1},easeInOutQuint:function(a){return(a/=.5)<1?.5*Math.pow(a,5):.5*(Math.pow(a-2,5)+2)},easeInSine:function(a){return-Math.cos(a*(Math.PI/2))+1},easeOutSine:function(a){return Math.sin(a*(Math.PI/2))},easeInOutSine:function(a){return-.5*(Math.cos(Math.PI*a)-1)},easeInExpo:function(a){return 0===a?0:Math.pow(2,10*(a-1))},easeOutExpo:function(a){return 1===a?1:-Math.pow(2,-10*a)+1},easeInOutExpo:function(a){return 0===a?0:1===a?1:(a/=.5)<1?.5*Math.pow(2,10*(a-1)):.5*(-Math.pow(2,-10*--a)+2)},easeInCirc:function(a){return-(Math.sqrt(1-a*a)-1)},easeOutCirc:function(a){return Math.sqrt(1-Math.pow(a-1,2))},easeInOutCirc:function(a){return(a/=.5)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},easeOutBounce:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},easeInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},easeOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},easeInOutBack:function(a){var b=1.70158;return(a/=.5)<1?.5*(a*a*(((b*=1.525)+1)*a-b)):.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},elastic:function(a){return-1*Math.pow(4,-8*a)*Math.sin((6*a-1)*(2*Math.PI)/2)+1},swingFromTo:function(a){var b=1.70158;return(a/=.5)<1?.5*(a*a*(((b*=1.525)+1)*a-b)):.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},swingFrom:function(a){var b=1.70158;return a*a*((b+1)*a-b)},swingTo:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},bounce:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},bouncePast:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?2-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?2-(7.5625*(a-=2.25/2.75)*a+.9375):2-(7.5625*(a-=2.625/2.75)*a+.984375)},easeFromTo:function(a){return(a/=.5)<1?.5*Math.pow(a,4):-.5*((a-=2)*Math.pow(a,3)-2)},easeFrom:function(a){return Math.pow(a,4)},easeTo:function(a){return Math.pow(a,.25)}})}(),function(){function a(a,b,c,d,e,f){function g(a){return((n*a+o)*a+p)*a}function h(a){return((q*a+r)*a+s)*a}function i(a){return(3*n*a+2*o)*a+p}function j(a){return 1/(200*a)}function k(a,b){return h(m(a,b))}function l(a){return a>=0?a:0-a}function m(a,b){var c,d,e,f,h,j;for(e=a,j=0;8>j;j++){if(f=g(e)-a,l(f)<b)return e;if(h=i(e),l(h)<1e-6)break;e-=f/h}if(c=0,d=1,e=a,c>e)return c;if(e>d)return d;for(;d>c;){if(f=g(e),l(f-a)<b)return e;a>f?c=e:d=e,e=.5*(d-c)+c}return e}var n=0,o=0,p=0,q=0,r=0,s=0;return p=3*b,o=3*(d-b)-p,n=1-p-o,s=3*c,r=3*(e-c)-s,q=1-s-r,k(a,j(f))}function b(b,c,d,e){return function(f){return a(f,b,c,d,e,1)}}e.setBezierFunction=function(a,c,d,f,g){var h=b(c,d,f,g);return h.displayName=a,h.x1=c,h.y1=d,h.x2=f,h.y2=g,e.prototype.formula[a]=h},e.unsetBezierFunction=function(a){delete e.prototype.formula[a]}}(),function(){function a(a,b,c,d,f,g){return e.tweenProps(d,b,a,c,1,g,f)}var b=new e;b._filterArgs=[],e.interpolate=function(c,d,f,g,h){var i=e.shallowCopy({},c),j=h||0,k=e.composeEasingObject(c,g||"linear");b.set({});var l=b._filterArgs;l.length=0,l[0]=i,l[1]=c,l[2]=d,l[3]=k,e.applyFilter(b,"tweenCreated"),e.applyFilter(b,"beforeTween");var m=a(c,i,d,f,k,j);return e.applyFilter(b,"afterTween"),m}}(),function(a){function b(a,b){var c,d=[],e=a.length;for(c=0;e>c;c++)d.push("_"+b+"_"+c);return d}function c(a){var b=a.match(v);return b?(1===b.length||a[0].match(u))&&b.unshift(""):b=["",""],b.join(A)}function d(b){a.each(b,function(a){var c=b[a];"string"==typeof c&&c.match(z)&&(b[a]=e(c))})}function e(a){return i(z,a,f)}function f(a){var b=g(a);return"rgb("+b[0]+","+b[1]+","+b[2]+")"}function g(a){return a=a.replace(/#/,""),3===a.length&&(a=a.split(""),a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),B[0]=h(a.substr(0,2)),B[1]=h(a.substr(2,2)),B[2]=h(a.substr(4,2)),B}function h(a){return parseInt(a,16)}function i(a,b,c){var d=b.match(a),e=b.replace(a,A);if(d)for(var f,g=d.length,h=0;g>h;h++)f=d.shift(),e=e.replace(A,c(f));return e}function j(a){return i(x,a,k)}function k(a){for(var b=a.match(w),c=b.length,d=a.match(y)[0],e=0;c>e;e++)d+=parseInt(b[e],10)+",";return d=d.slice(0,-1)+")"}function l(d){var e={};return a.each(d,function(a){var f=d[a];if("string"==typeof f){var g=r(f);e[a]={formatString:c(f),chunkNames:b(g,a)}}}),e}function m(b,c){a.each(c,function(a){for(var d=b[a],e=r(d),f=e.length,g=0;f>g;g++)b[c[a].chunkNames[g]]=+e[g];delete b[a]})}function n(b,c){a.each(c,function(a){var d=b[a],e=o(b,c[a].chunkNames),f=p(e,c[a].chunkNames);d=q(c[a].formatString,f),b[a]=j(d)})}function o(a,b){for(var c,d={},e=b.length,f=0;e>f;f++)c=b[f],d[c]=a[c],delete a[c];return d}function p(a,b){C.length=0;for(var c=b.length,d=0;c>d;d++)C.push(a[b[d]]);return C}function q(a,b){for(var c=a,d=b.length,e=0;d>e;e++)c=c.replace(A,+b[e].toFixed(4));return c}function r(a){return a.match(w)}function s(b,c){a.each(c,function(a){var d,e=c[a],f=e.chunkNames,g=f.length,h=b[a];if("string"==typeof h){var i=h.split(" "),j=i[i.length-1];for(d=0;g>d;d++)b[f[d]]=i[d]||j}else for(d=0;g>d;d++)b[f[d]]=h;delete b[a]})}function t(b,c){a.each(c,function(a){var d=c[a],e=d.chunkNames,f=e.length,g=b[e[0]],h=typeof g;if("string"===h){for(var i="",j=0;f>j;j++)i+=" "+b[e[j]],delete b[e[j]];b[a]=i.substr(1)}else b[a]=g})}var u=/(\d|\-|\.)/,v=/([^\-0-9\.]+)/g,w=/[0-9.\-]+/g,x=new RegExp("rgb\\("+w.source+/,\s*/.source+w.source+/,\s*/.source+w.source+"\\)","g"),y=/^.*\(/,z=/#([0-9]|[a-f]){3,6}/gi,A="VAL",B=[],C=[];a.prototype.filter.token={tweenCreated:function(a,b,c,e){d(a),d(b),d(c),this._tokenData=l(a)},beforeTween:function(a,b,c,d){s(d,this._tokenData),m(a,this._tokenData),m(b,this._tokenData),m(c,this._tokenData)},afterTween:function(a,b,c,d){n(a,this._tokenData),n(b,this._tokenData),n(c,this._tokenData),t(d,this._tokenData)}}}(e)}).call(null)},{}],2:[function(a,b,c){var d=a("./shape"),e=a("./utils"),f=function(a,b){this._pathTemplate="M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}",this.containerAspectRatio=1,d.apply(this,arguments)};f.prototype=new d,f.prototype.constructor=f,f.prototype._pathString=function(a){var b=a.strokeWidth;a.trailWidth&&a.trailWidth>a.strokeWidth&&(b=a.trailWidth);var c=50-b/2;return e.render(this._pathTemplate,{radius:c,"2radius":2*c})},f.prototype._trailString=function(a){return this._pathString(a)},b.exports=f},{"./shape":7,"./utils":8}],3:[function(a,b,c){var d=a("./shape"),e=a("./utils"),f=function(a,b){this._pathTemplate="M 0,{center} L 100,{center}",d.apply(this,arguments)};f.prototype=new d,f.prototype.constructor=f,f.prototype._initializeSvg=function(a,b){a.setAttribute("viewBox","0 0 100 "+b.strokeWidth),a.setAttribute("preserveAspectRatio","none")},f.prototype._pathString=function(a){return e.render(this._pathTemplate,{center:a.strokeWidth/2})},f.prototype._trailString=function(a){return this._pathString(a)},b.exports=f},{"./shape":7,"./utils":8}],4:[function(a,b,c){b.exports={Line:a("./line"),Circle:a("./circle"),SemiCircle:a("./semicircle"),Path:a("./path"),Shape:a("./shape"),utils:a("./utils")}},{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./utils":8}],5:[function(a,b,c){var d=a("shifty"),e=a("./utils"),f={easeIn:"easeInCubic",easeOut:"easeOutCubic",easeInOut:"easeInOutCubic"},g=function h(a,b){if(!(this instanceof h))throw new Error("Constructor was called without new keyword");b=e.extend({duration:800,easing:"linear",from:{},to:{},step:function(){}},b);var c;c=e.isString(a)?document.querySelector(a):a,this.path=c,this._opts=b,this._tweenable=null;var d=this.path.getTotalLength();this.path.style.strokeDasharray=d+" "+d,this.set(0)};g.prototype.value=function(){var a=this._getComputedDashOffset(),b=this.path.getTotalLength(),c=1-a/b;return parseFloat(c.toFixed(6),10)},g.prototype.set=function(a){this.stop(),this.path.style.strokeDashoffset=this._progressToOffset(a);var b=this._opts.step;if(e.isFunction(b)){var c=this._easing(this._opts.easing),d=this._calculateTo(a,c),f=this._opts.shape||this;b(d,f,this._opts.attachment)}},g.prototype.stop=function(){this._stopTween(),this.path.style.strokeDashoffset=this._getComputedDashOffset()},g.prototype.animate=function(a,b,c){b=b||{},e.isFunction(b)&&(c=b,b={});var f=e.extend({},b),g=e.extend({},this._opts);b=e.extend(g,b);var h=this._easing(b.easing),i=this._resolveFromAndTo(a,h,f);this.stop(),this.path.getBoundingClientRect();var j=this._getComputedDashOffset(),k=this._progressToOffset(a),l=this;this._tweenable=new d,this._tweenable.tween({from:e.extend({offset:j},i.from),to:e.extend({offset:k},i.to),duration:b.duration,easing:h,step:function(a){l.path.style.strokeDashoffset=a.offset;var c=b.shape||l;b.step(a,c,b.attachment)},finish:function(a){e.isFunction(c)&&c()}})},g.prototype._getComputedDashOffset=function(){var a=window.getComputedStyle(this.path,null);return parseFloat(a.getPropertyValue("stroke-dashoffset"),10)},g.prototype._progressToOffset=function(a){var b=this.path.getTotalLength();return b-a*b},g.prototype._resolveFromAndTo=function(a,b,c){return c.from&&c.to?{from:c.from,to:c.to}:{from:this._calculateFrom(b),to:this._calculateTo(a,b)}},g.prototype._calculateFrom=function(a){return d.interpolate(this._opts.from,this._opts.to,this.value(),a)},g.prototype._calculateTo=function(a,b){return d.interpolate(this._opts.from,this._opts.to,a,b)},g.prototype._stopTween=function(){null!==this._tweenable&&(this._tweenable.stop(),this._tweenable=null)},g.prototype._easing=function(a){return f.hasOwnProperty(a)?f[a]:a},b.exports=g},{"./utils":8,shifty:1}],6:[function(a,b,c){var d=a("./shape"),e=a("./circle"),f=a("./utils"),g=function(a,b){this._pathTemplate="M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0",this.containerAspectRatio=2,d.apply(this,arguments)};g.prototype=new d,g.prototype.constructor=g,g.prototype._initializeSvg=function(a,b){a.setAttribute("viewBox","0 0 100 50")},g.prototype._initializeTextContainer=function(a,b,c){a.text.style&&(c.style.top="auto",c.style.bottom="0",a.text.alignToBottom?f.setStyle(c,"transform","translate(-50%, 0)"):f.setStyle(c,"transform","translate(-50%, 50%)"))},g.prototype._pathString=e.prototype._pathString,g.prototype._trailString=e.prototype._trailString,b.exports=g},{"./circle":2,"./shape":7,"./utils":8}],7:[function(a,b,c){var d=a("./path"),e=a("./utils"),f="Object is destroyed",g=function h(a,b){if(!(this instanceof h))throw new Error("Constructor was called without new keyword");if(0!==arguments.length){this._opts=e.extend({color:"#555",strokeWidth:1,trailColor:null,trailWidth:null,fill:null,text:{style:{color:null,position:"absolute",left:"50%",top:"50%",padding:0,margin:0,transform:{prefix:!0,value:"translate(-50%, -50%)"}},autoStyleContainer:!0,alignToBottom:!0,value:null,className:"progressbar-text"},svgStyle:{display:"block",width:"100%"},warnings:!1},b,!0),e.isObject(b)&&void 0!==b.svgStyle&&(this._opts.svgStyle=b.svgStyle),e.isObject(b)&&e.isObject(b.text)&&void 0!==b.text.style&&(this._opts.text.style=b.text.style);var c,f=this._createSvgView(this._opts);if(c=e.isString(a)?document.querySelector(a):a,!c)throw new Error("Container does not exist: "+a);this._container=c,this._container.appendChild(f.svg),this._opts.warnings&&this._warnContainerAspectRatio(this._container),this._opts.svgStyle&&e.setStyles(f.svg,this._opts.svgStyle),this.svg=f.svg,this.path=f.path,this.trail=f.trail,this.text=null;var g=e.extend({attachment:void 0,shape:this},this._opts);this._progressPath=new d(f.path,g),e.isObject(this._opts.text)&&null!==this._opts.text.value&&this.setText(this._opts.text.value)}};g.prototype.animate=function(a,b,c){if(null===this._progressPath)throw new Error(f);this._progressPath.animate(a,b,c)},g.prototype.stop=function(){if(null===this._progressPath)throw new Error(f);void 0!==this._progressPath&&this._progressPath.stop()},g.prototype.destroy=function(){if(null===this._progressPath)throw new Error(f);this.stop(),this.svg.parentNode.removeChild(this.svg),this.svg=null,this.path=null,this.trail=null,this._progressPath=null,null!==this.text&&(this.text.parentNode.removeChild(this.text),this.text=null)},g.prototype.set=function(a){if(null===this._progressPath)throw new Error(f);this._progressPath.set(a)},g.prototype.value=function(){if(null===this._progressPath)throw new Error(f);return void 0===this._progressPath?0:this._progressPath.value()},g.prototype.setText=function(a){if(null===this._progressPath)throw new Error(f);null===this.text&&(this.text=this._createTextContainer(this._opts,this._container),this._container.appendChild(this.text)),e.isObject(a)?(e.removeChildren(this.text),this.text.appendChild(a)):this.text.innerHTML=a},g.prototype._createSvgView=function(a){var b=document.createElementNS("http://www.w3.org/2000/svg","svg");this._initializeSvg(b,a);var c=null;(a.trailColor||a.trailWidth)&&(c=this._createTrail(a),b.appendChild(c));var d=this._createPath(a);return b.appendChild(d),{svg:b,path:d,trail:c}},g.prototype._initializeSvg=function(a,b){a.setAttribute("viewBox","0 0 100 100")},g.prototype._createPath=function(a){var b=this._pathString(a);return this._createPathElement(b,a)},g.prototype._createTrail=function(a){var b=this._trailString(a),c=e.extend({},a);return c.trailColor||(c.trailColor="#eee"),c.trailWidth||(c.trailWidth=c.strokeWidth),c.color=c.trailColor,c.strokeWidth=c.trailWidth,c.fill=null,this._createPathElement(b,c)},g.prototype._createPathElement=function(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg","path");return c.setAttribute("d",a),c.setAttribute("stroke",b.color),c.setAttribute("stroke-width",b.strokeWidth),b.fill?c.setAttribute("fill",b.fill):c.setAttribute("fill-opacity","0"),c},g.prototype._createTextContainer=function(a,b){var c=document.createElement("div");c.className=a.text.className;var d=a.text.style;return d&&(a.text.autoStyleContainer&&(b.style.position="relative"),e.setStyles(c,d),d.color||(c.style.color=a.color)),this._initializeTextContainer(a,b,c),c},g.prototype._initializeTextContainer=function(a,b,c){},g.prototype._pathString=function(a){throw new Error("Override this function for each progress bar")},g.prototype._trailString=function(a){throw new Error("Override this function for each progress bar")},g.prototype._warnContainerAspectRatio=function(a){if(this.containerAspectRatio){var b=window.getComputedStyle(a,null),c=parseFloat(b.getPropertyValue("width"),10),d=parseFloat(b.getPropertyValue("height"),10);e.floatEquals(this.containerAspectRatio,c/d)||(console.warn("Incorrect aspect ratio of container","#"+a.id,"detected:",b.getPropertyValue("width")+"(width)","/",b.getPropertyValue("height")+"(height)","=",c/d),console.warn("Aspect ratio of should be",this.containerAspectRatio))}},b.exports=g},{"./path":5,"./utils":8}],8:[function(a,b,c){function d(a,b,c){a=a||{},b=b||{},c=c||!1;for(var e in b)if(b.hasOwnProperty(e)){var f=a[e],g=b[e];c&&l(f)&&l(g)?a[e]=d(f,g,c):a[e]=g}return a}function e(a,b){var c=a;for(var d in b)if(b.hasOwnProperty(d)){var e=b[d],f="\\{"+d+"\\}",g=new RegExp(f,"g");c=c.replace(g,e)}return c}function f(a,b,c){for(var d=a.style,e=0;e<p.length;++e){var f=p[e];d[f+h(b)]=c}d[b]=c}function g(a,b){m(b,function(b,c){null!==b&&void 0!==b&&(l(b)&&b.prefix===!0?f(a,c,b.value):a.style[c]=b)})}function h(a){return a.charAt(0).toUpperCase()+a.slice(1)}function i(a){return"string"==typeof a||a instanceof String}function j(a){return"function"==typeof a}function k(a){return"[object Array]"===Object.prototype.toString.call(a)}function l(a){if(k(a))return!1;var b=typeof a;return"object"===b&&!!a}function m(a,b){for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];b(d,c)}}function n(a,b){return Math.abs(a-b)<q}function o(a){for(;a.firstChild;)a.removeChild(a.firstChild)}var p="Webkit Moz O ms".split(" "),q=.001;b.exports={extend:d,render:e,setStyle:f,setStyles:g,capitalize:h,isString:i,isFunction:j,isObject:l,forEachObject:m,floatEquals:n,removeChildren:o}},{}]},{},[4])(4)});
/*!
 * RELLAX v1.12.1
 * https://github.com/dixonandmoe/rellax
 */
(function(q,g){"function"===typeof define&&define.amd?define([],g):"object"===typeof module&&module.exports?module.exports=g():q.Rellax=g()})("undefined"!==typeof window?window:global,function(){var q=function(g,u){function C(){if(3===a.options.breakpoints.length&&Array.isArray(a.options.breakpoints)){var f=!0,c=!0,b;a.options.breakpoints.forEach(function(a){"number"!==typeof a&&(c=!1);null!==b&&a<b&&(f=!1);b=a});if(f&&c)return}a.options.breakpoints=[576,768,1201];console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted")}
var a=Object.create(q.prototype),l=0,v=0,m=0,n=0,d=[],w=!0,A=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(a){return setTimeout(a,1E3/60)},p=null,x=!1;try{var k=Object.defineProperty({},"passive",{get:function(){x=!0}});window.addEventListener("testPassive",null,k);window.removeEventListener("testPassive",null,k)}catch(f){}var D=window.cancelAnimationFrame||window.mozCancelAnimationFrame||
clearTimeout,E=window.transformProp||function(){var a=document.createElement("div");if(null===a.style.transform){var c=["Webkit","Moz","ms"],b;for(b in c)if(void 0!==a.style[c[b]+"Transform"])return c[b]+"Transform"}return"transform"}();a.options={speed:-2,verticalSpeed:null,horizontalSpeed:null,breakpoints:[576,768,1201],center:!1,wrapper:null,relativeToWrapper:!1,round:!0,vertical:!0,horizontal:!1,verticalScrollAxis:"y",horizontalScrollAxis:"x",callback:function(){}};u&&Object.keys(u).forEach(function(d){a.options[d]=
u[d]});u&&u.breakpoints&&C();g||(g=".rellax");k="string"===typeof g?document.querySelectorAll(g):[g];if(0<k.length){a.elems=k;if(a.options.wrapper&&!a.options.wrapper.nodeType)if(k=document.querySelector(a.options.wrapper))a.options.wrapper=k;else{console.warn("Rellax: The wrapper you're trying to use doesn't exist.");return}var F,B=function(){for(var f=0;f<d.length;f++)a.elems[f].style.cssText=d[f].style;d=[];v=window.innerHeight;n=window.innerWidth;f=a.options.breakpoints;F=n<f[0]?"xs":n>=f[0]&&n<
f[1]?"sm":n>=f[1]&&n<f[2]?"md":"lg";H();for(f=0;f<a.elems.length;f++){var c=void 0,b=a.elems[f],e=b.getAttribute("data-rellax-percentage"),y=b.getAttribute("data-rellax-speed"),t=b.getAttribute("data-rellax-xs-speed"),g=b.getAttribute("data-rellax-mobile-speed"),h=b.getAttribute("data-rellax-tablet-speed"),k=b.getAttribute("data-rellax-desktop-speed"),l=b.getAttribute("data-rellax-vertical-speed"),m=b.getAttribute("data-rellax-horizontal-speed"),p=b.getAttribute("data-rellax-vertical-scroll-axis"),
q=b.getAttribute("data-rellax-horizontal-scroll-axis"),u=b.getAttribute("data-rellax-zindex")||0,x=b.getAttribute("data-rellax-min"),A=b.getAttribute("data-rellax-max"),C=b.getAttribute("data-rellax-min-x"),D=b.getAttribute("data-rellax-max-x"),E=b.getAttribute("data-rellax-min-y"),L=b.getAttribute("data-rellax-max-y"),r=!0;t||g||h||k?c={xs:t,sm:g,md:h,lg:k}:r=!1;t=a.options.wrapper?a.options.wrapper.scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;a.options.relativeToWrapper&&
(t=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)-a.options.wrapper.offsetTop);var z=a.options.vertical?e||a.options.center?t:0:0,I=a.options.horizontal?e||a.options.center?a.options.wrapper?a.options.wrapper.scrollLeft:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:0:0;t=z+b.getBoundingClientRect().top;g=b.clientHeight||b.offsetHeight||b.scrollHeight;h=I+b.getBoundingClientRect().left;k=b.clientWidth||b.offsetWidth||b.scrollWidth;
z=e?e:(z-t+v)/(g+v);e=e?e:(I-h+n)/(k+n);a.options.center&&(z=e=.5);c=r&&null!==c[F]?Number(c[F]):y?y:a.options.speed;l=l?l:a.options.verticalSpeed;m=m?m:a.options.horizontalSpeed;p=p?p:a.options.verticalScrollAxis;q=q?q:a.options.horizontalScrollAxis;y=J(e,z,c,l,m);b=b.style.cssText;r="";if(e=/transform\s*:/i.exec(b))r=b.slice(e.index),r=(e=r.indexOf(";"))?" "+r.slice(11,e).replace(/\s/g,""):" "+r.slice(11).replace(/\s/g,"");d.push({baseX:y.x,baseY:y.y,top:t,left:h,height:g,width:k,speed:c,verticalSpeed:l,
horizontalSpeed:m,verticalScrollAxis:p,horizontalScrollAxis:q,style:b,transform:r,zindex:u,min:x,max:A,minX:C,maxX:D,minY:E,maxY:L})}K();w&&(window.addEventListener("resize",B),w=!1,G())},H=function(){var d=l,c=m;l=a.options.wrapper?a.options.wrapper.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset;m=a.options.wrapper?a.options.wrapper.scrollLeft:(document.documentElement||document.body.parentNode||document.body).scrollLeft||window.pageXOffset;
a.options.relativeToWrapper&&(l=((document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset)-a.options.wrapper.offsetTop);return d!=l&&a.options.vertical||c!=m&&a.options.horizontal?!0:!1},J=function(d,c,b,e,g){var f={};d=100*(g?g:b)*(1-d);c=100*(e?e:b)*(1-c);f.x=a.options.round?Math.round(d):Math.round(100*d)/100;f.y=a.options.round?Math.round(c):Math.round(100*c)/100;return f},h=function(){window.removeEventListener("resize",h);window.removeEventListener("orientationchange",
h);(a.options.wrapper?a.options.wrapper:window).removeEventListener("scroll",h);(a.options.wrapper?a.options.wrapper:document).removeEventListener("touchmove",h);p=A(G)},G=function(){H()&&!1===w?(K(),p=A(G)):(p=null,window.addEventListener("resize",h),window.addEventListener("orientationchange",h),(a.options.wrapper?a.options.wrapper:window).addEventListener("scroll",h,x?{passive:!0}:!1),(a.options.wrapper?a.options.wrapper:document).addEventListener("touchmove",h,x?{passive:!0}:!1))},K=function(){for(var f,
c=0;c<a.elems.length;c++){var b=d[c].verticalScrollAxis.toLowerCase(),e=d[c].horizontalScrollAxis.toLowerCase();f=-1!=b.indexOf("x")?l:0;b=-1!=b.indexOf("y")?l:0;var g=-1!=e.indexOf("x")?m:0;e=-1!=e.indexOf("y")?m:0;f=J((f+g-d[c].left+n)/(d[c].width+n),(b+e-d[c].top+v)/(d[c].height+v),d[c].speed,d[c].verticalSpeed,d[c].horizontalSpeed);e=f.y-d[c].baseY;b=f.x-d[c].baseX;null!==d[c].min&&(a.options.vertical&&!a.options.horizontal&&(e=e<=d[c].min?d[c].min:e),a.options.horizontal&&!a.options.vertical&&
(b=b<=d[c].min?d[c].min:b));null!=d[c].minY&&(e=e<=d[c].minY?d[c].minY:e);null!=d[c].minX&&(b=b<=d[c].minX?d[c].minX:b);null!==d[c].max&&(a.options.vertical&&!a.options.horizontal&&(e=e>=d[c].max?d[c].max:e),a.options.horizontal&&!a.options.vertical&&(b=b>=d[c].max?d[c].max:b));null!=d[c].maxY&&(e=e>=d[c].maxY?d[c].maxY:e);null!=d[c].maxX&&(b=b>=d[c].maxX?d[c].maxX:b);a.elems[c].style[E]="translate3d("+(a.options.horizontal?b:"0")+"px,"+(a.options.vertical?e:"0")+"px,"+d[c].zindex+"px) "+d[c].transform}a.options.callback(f)};
a.destroy=function(){for(var f=0;f<a.elems.length;f++)a.elems[f].style.cssText=d[f].style;w||(window.removeEventListener("resize",B),w=!0);D(p);p=null};B();a.refresh=B;return a}console.warn("Rellax: The elements you're trying to select don't exist.")};return q});

/*!
 *  replaceme.js - text rotating component in vanilla JavaScript
 *  @version 1.1.0
 *  @author Adrian Klimek
 *  @link https://adrianklimek.github.io/replaceme/
 *  @copyright Addrian Klimek 2016
 *  @license MIT
 */
!function(a,b){"use strict";function c(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function d(){"function"==typeof b&&b.fn.extend({ReplaceMe:function(a){return this.each(function(){new e(this,a)})}})}function e(a,b){var d={animation:"animated fadeIn",speed:2e3,separator:",",hoverStop:!1,clickChange:!1,loopCount:"infinite",autoRun:!0,onInit:!1,onChange:!1,onComplete:!1};if("object"==typeof b?this.options=c(d,b):this.options=d,"undefined"==typeof a)throw new Error('ReplaceMe [constructor]: "element" parameter is required');if("object"==typeof a)this.element=a;else{if("string"!=typeof a)throw new Error('ReplaceMe [constructor]: wrong "element" parameter');this.element=document.querySelector(a)}this.init()}e.prototype.init=function(){"function"==typeof this.options.onInit&&this.options.onInit(),this.words=this.escapeHTML(this.element.innerHTML).split(this.options.separator),this.count=this.words.length,this.position=this.loopCount=0,this.running=!1,this.bindAll(),this.options.autoRun===!0&&this.start()},e.prototype.bindAll=function(){this.options.hoverStop===!0&&(this.element.addEventListener("mouseover",this.pause.bind(this)),this.element.addEventListener("mouseout",this.start.bind(this))),this.options.clickChange===!0&&this.element.addEventListener("click",this.change.bind(this))},e.prototype.changeAnimation=function(){this.change(),this.loop=setTimeout(this.changeAnimation.bind(this),this.options.speed)},e.prototype.start=function(){this.running!==!0&&(this.running=!0,this.changeWord(this.words[this.position]),this.position++),this.loop=setTimeout(this.changeAnimation.bind(this),this.options.speed)},e.prototype.change=function(){return this.position>this.count-1&&(this.position=0,this.loopCount++,this.loopCount>=this.options.loopCount)?void this.stop():(this.changeWord(this.words[this.position]),this.position++,void("function"==typeof this.options.onChange&&this.options.onChange()))},e.prototype.stop=function(){this.running=!1,this.position=this.loopCount=0,this.pause(),"function"==typeof this.options.onComplete&&this.options.onComplete()},e.prototype.pause=function(){clearTimeout(this.loop)},e.prototype.changeWord=function(a){this.element.innerHTML='<span class="'+this.options.animation+'" style="display:inline-block;">'+a+"</span>"},e.prototype.escapeHTML=function(a){var b=/<\/?\w+\s*[^>]*>/g;return b.test(a)===!0?a.replace(b,""):a},a.ReplaceMe=e,d()}(window,window.jQuery);
/*!
 * scrollCue.js v2.0.0
 * https://github.com/prjct-samwest/scrollCue
 */
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,e){if(a==Array.prototype||a==Object.prototype)return a;a[b]=e.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var e=a[b];if(e&&e.Math==Math)return e}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var e=$jscomp.propertyToPolyfillSymbol[b];if(null==e)return a[b];e=a[e];return void 0!==e?e:a[b]};
$jscomp.polyfill=function(a,b,e,f){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,e,f):$jscomp.polyfillUnisolated(a,b,e,f))};$jscomp.polyfillUnisolated=function(a,b,e,f){e=$jscomp.global;a=a.split(".");for(f=0;f<a.length-1;f++){var h=a[f];h in e||(e[h]={});e=e[h]}a=a[a.length-1];f=e[a];b=b(f);b!=f&&null!=b&&$jscomp.defineProperty(e,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,e,f){var h=a.split(".");a=1===h.length;f=h[0];f=!a&&f in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var k=0;k<h.length-1;k++){var l=h[k];l in f||(f[l]={});f=f[l]}h=h[h.length-1];e=$jscomp.IS_SYMBOL_NATIVE&&"es6"===e?f[h]:null;b=b(e);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,h,{configurable:!0,writable:!0,value:b}):b!==e&&($jscomp.propertyToPolyfillSymbol[h]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(h):$jscomp.POLYFILL_PREFIX+h,h=$jscomp.propertyToPolyfillSymbol[h],
$jscomp.defineProperty(f,h,{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var e=0,f=function(a){if(this instanceof f)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+e++,a)};return f},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),e=0;e<b.length;e++){var f=$jscomp.global[b[e]];"function"===typeof f&&"function"!=typeof f.prototype[a]&&$jscomp.defineProperty(f.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var e=0,f={next:function(){if(e<a.length){var h=e++;return{value:b(h,a[h]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
var scrollCue=function(){var a={},b,e,f=0,h=!0,k=!0,l=!1,n=!1,m,p={duration:600,interval:-.7,percentage:.75,enable:!0,docSlider:!1,pageChangeReset:!1};a={setEvents:function(g){var c=function(){h&&(requestAnimationFrame(function(){h=!0;k&&(a.setQuery(),a.runQuery())}),h=!1)};k&&!g&&window.addEventListener("load",a.runQuery);window.addEventListener("scroll",c);if(l){g=docSlider.getElements().pages;for(var d=0;d<g.length;d++)g[d].addEventListener("scroll",function(a){var g=docSlider.getCurrentIndex()+
"";a=a.target.getAttribute("data-ds-index");if(g!==a)return!1;docSlider._getWheelEnable()&&c()})}window.addEventListener("resize",function(){0<f&&clearTimeout(f);f=setTimeout(function(){k&&(a.searchElements(),a.setQuery(),a.runQuery())},200)})},setOptions:function(g,c){var d={};if("undefined"!==typeof g)return Object.keys(g).forEach(function(b){"[object Object]"===Object.prototype.toString.call(g[b])?d[b]=a.setOptions(g[b],c[b]):(d[b]=g[b],"undefined"!==typeof c&&"undefined"!==typeof c[b]&&(d[b]=
c[b]))}),d},searchElements:function(){b=[];var g=document.querySelectorAll("[data-cues]:not([data-disabled])");for(var c=0;c<g.length;c++){for(var d=g[c],e=0;e<d.children.length;e++){var f=d.children[e];a.setAttrPtoC(f,"data-cue",d,"data-cues","");a.setAttrPtoC(f,"data-duration",d,"data-duration",!1);a.setAttrPtoC(f,"data-interval",d,"data-interval",!1);a.setAttrPtoC(f,"data-sort",d,"data-sort",!1);a.setAttrPtoC(f,"data-addClass",d,"data-addClass",!1);a.setAttrPtoC(f,"data-group",d,"data-group",!1);
a.setAttrPtoC(f,"data-delay",d,"data-delay",!1)}d.setAttribute("data-disabled","true")}g=document.querySelectorAll('[data-cue]:not([data-show="true"])');for(c=0;c<g.length;c++)d=g[c],b.push({elm:d,cue:a.getAttr(d,"data-cue","fadeIn"),duration:Number(a.getAttr(d,"data-duration",m.duration)),interval:Number(a.getAttr(d,"data-interval",m.interval)),order:a.getOrderNumber(d),sort:a.getAttr(d,"data-sort",null),addClass:a.getAttr(d,"data-addClass",null),group:a.getAttr(d,"data-group",null),delay:Number(a.getAttr(d,
"data-delay",0))});if(l)for(g=docSlider.getElements().pages.length,c=0;c<g;c++)for(d=document.querySelectorAll('[data-ds-index="'+c+'"] [data-cue]:not([data-scpage])'),e=0;e<d.length;e++)d[e].setAttribute("data-scpage",c)},sortElements:function(){for(var a=arguments[0],c=[].slice.call(arguments).slice(1),d={$jscomp$loop$prop$i$4:0};d.$jscomp$loop$prop$i$4<c.length;d={$jscomp$loop$prop$i$4:d.$jscomp$loop$prop$i$4},d.$jscomp$loop$prop$i$4++)a.sort(function(a){return function(g,d){var b="undefined"===
typeof c[a.$jscomp$loop$prop$i$4][1]?!0:c[a.$jscomp$loop$prop$i$4][1],e=c[a.$jscomp$loop$prop$i$4][0];return g[e]>d[e]?b?1:-1:g[e]<d[e]?b?-1:1:0}}(d))},randElements:function(a){for(var g=a.length-1;0<g;g--){var d=Math.floor(Math.random()*(g+1)),b=a[g];a[g]=a[d];a[d]=b}return a},setDurationValue:function(a,c,d){if("undefined"===typeof c)return a;c=c.duration;a=-1===(d+"").indexOf(".")?a+c+d:a+c+c*d;return 0>a?0:a},getOrderNumber:function(a){return a.hasAttribute("data-order")?(a=Number(a.getAttribute("data-order")),
0<=a?a:Math.pow(2,53)-1+a):Math.pow(2,52)-1},setAttrPtoC:function(a,c,d,b,e){d.hasAttribute(b)?a.hasAttribute(c)||a.setAttribute(c,d.getAttribute(b)):!1!==e&&a.setAttribute(c,e)},getAttr:function(a,c,d){return a.hasAttribute(c)?a.getAttribute(c):d},getOffsetTop:function(a){return a.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop)},setClassNames:function(a,c){if(c){c=c.split(" ");for(var d=0;d<c.length;d++)a.classList.add(c[d])}},setQuery:function(){e={};for(var g=
0;g<b.length;g++){var c=b[g],d=c.group?c.group:"$"+a.getOffsetTop(c.elm);if(!c.elm.hasAttribute("data-show")){if(l){var f=c.elm.getAttribute("data-scpage"),h=docSlider.getCurrentIndex()+"";if(f!==h&&null!==f)continue}"undefined"===typeof e[d]&&(e[d]=[]);e[d].push(c)}}},runQuery:function(){for(var b=Object.keys(e),c={},d=0;d<b.length;c={$jscomp$loop$prop$elms$6:c.$jscomp$loop$prop$elms$6,$jscomp$loop$prop$interval$7:c.$jscomp$loop$prop$interval$7},d++)if(c.$jscomp$loop$prop$elms$6=e[b[d]],a.isElementIn(c.$jscomp$loop$prop$elms$6[0].elm)){"reverse"===
c.$jscomp$loop$prop$elms$6[0].sort?c.$jscomp$loop$prop$elms$6.reverse():"random"===c.$jscomp$loop$prop$elms$6[0].sort&&a.randElements(c.$jscomp$loop$prop$elms$6);a.sortElements(c.$jscomp$loop$prop$elms$6,["order"]);for(var f=c.$jscomp$loop$prop$interval$7=0;f<c.$jscomp$loop$prop$elms$6.length;f++)(function(c){return function(b){c.$jscomp$loop$prop$elms$6[b].elm.setAttribute("data-show","true");a.setClassNames(c.$jscomp$loop$prop$elms$6[b].elm,c.$jscomp$loop$prop$elms$6[b].addClass);c.$jscomp$loop$prop$interval$7=
a.setDurationValue(c.$jscomp$loop$prop$interval$7,c.$jscomp$loop$prop$elms$6[b-1],c.$jscomp$loop$prop$elms$6[b].interval);c.$jscomp$loop$prop$elms$6[b].elm.style.animationName=c.$jscomp$loop$prop$elms$6[b].cue;c.$jscomp$loop$prop$elms$6[b].elm.style.animationDuration=c.$jscomp$loop$prop$elms$6[b].duration+"ms";c.$jscomp$loop$prop$elms$6[b].elm.style.animationTimingFunction="ease";c.$jscomp$loop$prop$elms$6[b].elm.style.animationDelay=c.$jscomp$loop$prop$interval$7+c.$jscomp$loop$prop$elms$6[b].delay+
"ms";c.$jscomp$loop$prop$elms$6[b].elm.style.animationDirection="normal";c.$jscomp$loop$prop$elms$6[b].elm.style.animationFillMode="both"}})(c)(f);delete e[b[d]]}},isElementIn:function(b){var c=b.hasAttribute("data-scpage")?a.isScrollEndWithDocSlider:a.isScrollEnd;return window.pageYOffset>a.getOffsetTop(b)-window.innerHeight*m.percentage||c()},isScrollEnd:function(){var a=window.document.documentElement;return(window.document.body.scrollTop||a.scrollTop)>=a.scrollHeight-a.clientHeight},isScrollEndWithDocSlider:function(){var a=
docSlider.getCurrentPage();return a.scrollTop>=a.scrollHeight-a.clientHeight}};return{init:function(b){m=a.setOptions(p,b);k=m.enable;l=m.docSlider;n=m.pageChangeReset;l||(a.setEvents(),a.searchElements(),a.setQuery())},update:function(){k&&(a.searchElements(),a.setQuery(),a.runQuery())},enable:function(a){k="undefined"===typeof a?!k:a;scrollCue.update()},_hasDocSlider:function(){return l},_hasPageChangeReset:function(){return n},_initWithDocSlider:function(b){a.setEvents(b);a.searchElements();a.setQuery()},
_updateWithDocSlider:function(){k&&(a.setQuery(),a.runQuery())},_searchElements:function(){a.searchElements()}}}();

/*!
 * Smooth Scroll behavior polyfill
 * https://iamdustan.github.io/smoothscroll
 */
'use strict';

// polyfill
function polyfill() {
  // aliases
  var w = window;
  var d = document;

  // return if scroll behavior is supported and polyfill is not forced
  if (
    'scrollBehavior' in d.documentElement.style &&
    w.__forceSmoothScrollPolyfill__ !== true
  ) {
    return;
  }

  // globals
  var Element = w.HTMLElement || w.Element;
  var SCROLL_TIME = 468;

  // object gathering original scroll methods
  var original = {
    scroll: w.scroll || w.scrollTo,
    scrollBy: w.scrollBy,
    elementScroll: Element.prototype.scroll || scrollElement,
    scrollIntoView: Element.prototype.scrollIntoView
  };

  // define timing method
  var now =
    w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

  /*
   * IE has rounding bug rounding down clientHeight and clientWidth and
   * rounding up scrollHeight and scrollWidth causing false positives
   * on hasScrollableSpace
   */
  var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

  /**
   * changes scroll position inside an element
   * @method scrollElement
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  function scrollElement(x, y) {
    this.scrollLeft = x;
    this.scrollTop = y;
  }

  /**
   * returns result of applying ease math function to a number
   * @method ease
   * @param {Number} k
   * @returns {Number}
   */
  function ease(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * indicates if a smooth behavior should be applied
   * @method shouldBailOut
   * @param {Number|Object} firstArg
   * @returns {Boolean}
   */
  function shouldBailOut(firstArg) {
    if (
      firstArg === null ||
      typeof firstArg !== 'object' ||
      firstArg.behavior === undefined ||
      firstArg.behavior === 'auto' ||
      firstArg.behavior === 'instant'
    ) {
      // first argument is not an object/null
      // or behavior is auto, instant or undefined
      return true;
    }

    if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
      // first argument is an object and behavior is smooth
      return false;
    }

    // throw error when behavior is not supported
    throw new TypeError(
      'behavior member of ScrollOptions ' +
        firstArg.behavior +
        ' is not a valid value for enumeration ScrollBehavior.'
    );
  }

  /**
   * indicates if an element has scrollable space in the provided axis
   * @method hasScrollableSpace
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function hasScrollableSpace(el, axis) {
    if (axis === 'Y') {
      return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
    }

    if (axis === 'X') {
      return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
    }
  }

  /**
   * indicates if an element has a scrollable overflow property in the axis
   * @method canOverflow
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function canOverflow(el, axis) {
    var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

    return overflowValue === 'auto' || overflowValue === 'scroll';
  }

  /**
   * indicates if an element can be scrolled in either axis
   * @method isScrollable
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function isScrollable(el) {
    var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
    var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

    return isScrollableY || isScrollableX;
  }

  /**
   * finds scrollable parent of an element
   * @method findScrollableParent
   * @param {Node} el
   * @returns {Node} el
   */
  function findScrollableParent(el) {
    while (el !== d.body && isScrollable(el) === false) {
      el = el.parentNode || el.host;
    }

    return el;
  }

  /**
   * self invoked function that, given a context, steps through scrolling
   * @method step
   * @param {Object} context
   * @returns {undefined}
   */
  function step(context) {
    var time = now();
    var value;
    var currentX;
    var currentY;
    var elapsed = (time - context.startTime) / SCROLL_TIME;

    // avoid elapsed times higher than one
    elapsed = elapsed > 1 ? 1 : elapsed;

    // apply easing to elapsed time
    value = ease(elapsed);

    currentX = context.startX + (context.x - context.startX) * value;
    currentY = context.startY + (context.y - context.startY) * value;

    context.method.call(context.scrollable, currentX, currentY);

    // scroll more if we have not reached our destination
    if (currentX !== context.x || currentY !== context.y) {
      w.requestAnimationFrame(step.bind(w, context));
    }
  }

  /**
   * scrolls window or element with a smooth behavior
   * @method smoothScroll
   * @param {Object|Node} el
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  function smoothScroll(el, x, y) {
    var scrollable;
    var startX;
    var startY;
    var method;
    var startTime = now();

    // define scroll context
    if (el === d.body) {
      scrollable = w;
      startX = w.scrollX || w.pageXOffset;
      startY = w.scrollY || w.pageYOffset;
      method = original.scroll;
    } else {
      scrollable = el;
      startX = el.scrollLeft;
      startY = el.scrollTop;
      method = scrollElement;
    }

    // scroll looping over a frame
    step({
      scrollable: scrollable,
      method: method,
      startTime: startTime,
      startX: startX,
      startY: startY,
      x: x,
      y: y
    });
  }

  // ORIGINAL METHODS OVERRIDES
  // w.scroll and w.scrollTo
  w.scroll = w.scrollTo = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.scroll.call(
        w,
        arguments[0].left !== undefined
          ? arguments[0].left
          : typeof arguments[0] !== 'object'
            ? arguments[0]
            : w.scrollX || w.pageXOffset,
        // use top prop, second argument if present or fallback to scrollY
        arguments[0].top !== undefined
          ? arguments[0].top
          : arguments[1] !== undefined
            ? arguments[1]
            : w.scrollY || w.pageYOffset
      );

      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(
      w,
      d.body,
      arguments[0].left !== undefined
        ? ~~arguments[0].left
        : w.scrollX || w.pageXOffset,
      arguments[0].top !== undefined
        ? ~~arguments[0].top
        : w.scrollY || w.pageYOffset
    );
  };

  // w.scrollBy
  w.scrollBy = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0])) {
      original.scrollBy.call(
        w,
        arguments[0].left !== undefined
          ? arguments[0].left
          : typeof arguments[0] !== 'object' ? arguments[0] : 0,
        arguments[0].top !== undefined
          ? arguments[0].top
          : arguments[1] !== undefined ? arguments[1] : 0
      );

      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(
      w,
      d.body,
      ~~arguments[0].left + (w.scrollX || w.pageXOffset),
      ~~arguments[0].top + (w.scrollY || w.pageYOffset)
    );
  };

  // Element.prototype.scroll and Element.prototype.scrollTo
  Element.prototype.scroll = Element.prototype.scrollTo = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      // if one number is passed, throw error to match Firefox implementation
      if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
        throw new SyntaxError('Value could not be converted');
      }

      original.elementScroll.call(
        this,
        // use left prop, first number argument or fallback to scrollLeft
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
        // use top prop, second argument or fallback to scrollTop
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
      );

      return;
    }

    var left = arguments[0].left;
    var top = arguments[0].top;

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(
      this,
      this,
      typeof left === 'undefined' ? this.scrollLeft : ~~left,
      typeof top === 'undefined' ? this.scrollTop : ~~top
    );
  };

  // Element.prototype.scrollBy
  Element.prototype.scrollBy = function() {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.elementScroll.call(
        this,
        arguments[0].left !== undefined
          ? ~~arguments[0].left + this.scrollLeft
          : ~~arguments[0] + this.scrollLeft,
        arguments[0].top !== undefined
          ? ~~arguments[0].top + this.scrollTop
          : ~~arguments[1] + this.scrollTop
      );

      return;
    }

    this.scroll({
      left: ~~arguments[0].left + this.scrollLeft,
      top: ~~arguments[0].top + this.scrollTop,
      behavior: arguments[0].behavior
    });
  };

  // Element.prototype.scrollIntoView
  Element.prototype.scrollIntoView = function() {
    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.scrollIntoView.call(
        this,
        arguments[0] === undefined ? true : arguments[0]
      );

      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    var scrollableParent = findScrollableParent(this);
    var parentRects = scrollableParent.getBoundingClientRect();
    var clientRects = this.getBoundingClientRect();

    if (scrollableParent !== d.body) {
      // reveal element inside parent
      smoothScroll.call(
        this,
        scrollableParent,
        scrollableParent.scrollLeft + clientRects.left - parentRects.left,
        scrollableParent.scrollTop + clientRects.top - parentRects.top
      );

      // reveal parent in viewport unless is fixed
      if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
        w.scrollBy({
          left: parentRects.left,
          top: parentRects.top,
          behavior: 'smooth'
        });
      }
    } else {
      // reveal element in viewport
      w.scrollBy({
        left: clientRects.left,
        top: clientRects.top,
        behavior: 'smooth'
      });
    }
  };
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
  // commonjs
  module.exports = { polyfill: polyfill };
} else {
  // global
  polyfill();
}

/*!
 * SVGInject v1.2.3
 * https://github.com/iconfu/svg-inject
 */
!function(o,l){var r,a,s="createElement",g="getElementsByTagName",b="length",E="style",d="title",y="undefined",k="setAttribute",w="getAttribute",x=null,A="__svgInject",C="--inject-",S=new RegExp(C+"\\d+","g"),I="LOAD_FAIL",t="SVG_NOT_SUPPORTED",L="SVG_INVALID",v=["src","alt","onload","onerror"],j=l[s]("a"),G=typeof SVGRect!=y,f={useCache:!0,copyAttributes:!0,makeIdsUnique:!0},N={clipPath:["clip-path"],"color-profile":x,cursor:x,filter:x,linearGradient:["fill","stroke"],marker:["marker",
"marker-end","marker-mid","marker-start"],mask:x,pattern:["fill","stroke"],radialGradient:["fill","stroke"]},u=1,c=2,O=1;function T(e){return(r=r||new XMLSerializer).serializeToString(e)}function P(e,r){var t,n,i,o,a=C+O++,f=/url\("?#([a-zA-Z][\w:.-]*)"?\)/g,u=e.querySelectorAll("[id]"),c=r?[]:x,l={},s=[],d=!1;if(u[b]){for(i=0;i<u[b];i++)(n=u[i].localName)in N&&(l[n]=1);for(n in l)(N[n]||[n]).forEach(function(e){s.indexOf(e)<0&&s.push(e)});s[b]&&s.push(E);var v,p,m,h=e[g]("*"),y=e;for(i=-1;y!=x;
){if(y.localName==E)(m=(p=y.textContent)&&p.replace(f,function(e,r){return c&&(c[r]=1),"url(#"+r+a+")"}))!==p&&(y.textContent=m);else if(y.hasAttributes()){for(o=0;o<s[b];o++)v=s[o],(m=(p=y[w](v))&&p.replace(f,function(e,r){return c&&(c[r]=1),"url(#"+r+a+")"}))!==p&&y[k](v,m);["xlink:href","href"].forEach(function(e){var r=y[w](e);/^\s*#/.test(r)&&(r=r.trim(),y[k](e,r+a),c&&(c[r.substring(1)]=1))})}y=h[++i]}for(i=0;i<u[b];i++)t=u[i],c&&!c[t.id]||(t.id+=a,d=!0)}return d}function V(e,r,t,n){if(r){
r[k]("data-inject-url",t);var i=e.parentNode;if(i){n.copyAttributes&&function c(e,r){for(var t,n,i,o=e.attributes,a=0;a<o[b];a++)if(n=(t=o[a]).name,-1==v.indexOf(n))if(i=t.value,n==d){var f,u=r.firstElementChild;u&&u.localName.toLowerCase()==d?f=u:(f=l[s+"NS"]("http://www.w3.org/2000/svg",d),r.insertBefore(f,u)),f.textContent=i}else r[k](n,i)}(e,r);var o=n.beforeInject,a=o&&o(e,r)||r;i.replaceChild(a,e),e[A]=u,m(e);var f=n.afterInject;f&&f(e,a)}}else D(e,n)}function p(){for(var e={},r=arguments,
t=0;t<r[b];t++){var n=r[t];for(var i in n)n.hasOwnProperty(i)&&(e[i]=n[i])}return e}function _(e,r){if(r){var t;try{t=function i(e){return(a=a||new DOMParser).parseFromString(e,"text/xml")}(e)}catch(o){return x}return t[g]("parsererror")[b]?x:t.documentElement}var n=l.createElement("div");return n.innerHTML=e,n.firstElementChild}function m(e){e.removeAttribute("onload")}function n(e){console.error("SVGInject: "+e)}function i(e,r,t){e[A]=c,t.onFail?t.onFail(e,r):n(r)}function D(e,r){m(e),i(e,L,r)
}function F(e,r){m(e),i(e,t,r)}function M(e,r){i(e,I,r)}function q(e){e.onload=x,e.onerror=x}function R(e){n("no img element")}var e=function z(e,r){var t=p(f,r),h={};function n(a,f){f=p(t,f);var e=function(r){var e=function(){var e=f.onAllFinish;e&&e(),r&&r()};if(a&&typeof a[b]!=y){var t=0,n=a[b];if(0==n)e();else for(var i=function(){++t==n&&e()},o=0;o<n;o++)u(a[o],f,i)}else u(a,f,e)};return typeof Promise==y?e():new Promise(e)}function u(u,c,e){if(u){var r=u[A];if(r)Array.isArray(r)?r.push(e
):e();else{if(q(u),!G)return F(u,c),void e();var t=c.beforeLoad,n=t&&t(u)||u[w]("src");if(!n)return""===n&&M(u,c),void e();var i=[];u[A]=i;var l=function(){e(),i.forEach(function(e){e()})},s=function f(e){return j.href=e,j.href}(n),d=c.useCache,v=c.makeIdsUnique,p=function(r){d&&(h[s].forEach(function(e){e(r)}),h[s]=r)};if(d){var o,a=function(e){if(e===I)M(u,c);else if(e===L)D(u,c);else{var r,t=e[0],n=e[1],i=e[2];v&&(t===x?(t=P(r=_(n,!1),!1),e[0]=t,e[2]=t&&T(r)):t&&(n=function o(e){
return e.replace(S,C+O++)}(i))),r=r||_(n,!1),V(u,r,s,c)}l()};if(typeof(o=h[s])!=y)return void(o.isCallbackQueue?o.push(a):a(o));(o=[]).isCallbackQueue=!0,h[s]=o}!function m(e,r,t){if(e){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState){var e=n.status;200==e?r(n.responseXML,n.responseText.trim()):400<=e?t():0==e&&t()}},n.open("GET",e,!0),n.send()}}(s,function(e,r){var t=e instanceof Document?e.documentElement:_(r,!0),n=c.afterLoad;if(n){var i=n(t,r)||t;if(i){
var o="string"==typeof i;r=o?i:T(t),t=o?_(i,!0):i}}if(t instanceof SVGElement){var a=x;if(v&&(a=P(t,!1)),d){var f=a&&T(t);p([a,r,f])}V(u,t,s,c)}else D(u,c),p(L);l()},function(){M(u,c),p(I),l()})}}else R()}return G&&function i(e){var r=l[g]("head")[0];if(r){var t=l[s](E);t.type="text/css",t.appendChild(l.createTextNode(e)),r.appendChild(t)}}('img[onload^="'+e+'("]{visibility:hidden;}'),n.setOptions=function(e){t=p(t,e)},n.create=z,n.err=function(e,r){e?e[A]!=c&&(q(e),G?(m(e),M(e,t)):F(e,t),r&&(m(
e),e.src=r)):R()},o[e]=n}("SVGInject");"object"==typeof module&&"object"==typeof module.exports&&(module.exports=e)}(window,document);
/**
 * Swiper 8.3.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 26, 2022
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Swiper=t()}(this,(function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s,a){void 0===s&&(s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}class n extends Array{constructor(e){"number"==typeof e?super(e):(super(...e||[]),function(e){const t=e.__proto__;Object.defineProperty(e,"__proto__",{get:()=>t,set(e){t.__proto__=e}})}(this))}}function l(e){void 0===e&&(e=[]);const t=[];return e.forEach((e=>{Array.isArray(e)?t.push(...l(e)):t.push(e)})),t}function o(e,t){return Array.prototype.filter.call(e,t)}function d(e,t){const s=r(),i=a();let l=[];if(!t&&e instanceof n)return e;if(!e)return new n(l);if("string"==typeof e){const s=e.trim();if(s.indexOf("<")>=0&&s.indexOf(">")>=0){let e="div";0===s.indexOf("<li")&&(e="ul"),0===s.indexOf("<tr")&&(e="tbody"),0!==s.indexOf("<td")&&0!==s.indexOf("<th")||(e="tr"),0===s.indexOf("<tbody")&&(e="table"),0===s.indexOf("<option")&&(e="select");const t=i.createElement(e);t.innerHTML=s;for(let e=0;e<t.childNodes.length;e+=1)l.push(t.childNodes[e])}else l=function(e,t){if("string"!=typeof e)return[e];const s=[],a=t.querySelectorAll(e);for(let e=0;e<a.length;e+=1)s.push(a[e]);return s}(e.trim(),t||i)}else if(e.nodeType||e===s||e===i)l.push(e);else if(Array.isArray(e)){if(e instanceof n)return e;l=e}return new n(function(e){const t=[];for(let s=0;s<e.length;s+=1)-1===t.indexOf(e[s])&&t.push(e[s]);return t}(l))}d.fn=n.prototype;const c={addClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.add(...a)})),this},removeClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.remove(...a)})),this},hasClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return o(this,(e=>a.filter((t=>e.classList.contains(t))).length>0)).length>0},toggleClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));this.forEach((e=>{a.forEach((t=>{e.classList.toggle(t)}))}))},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(let s=0;s<this.length;s+=1)if(2===arguments.length)this[s].setAttribute(e,t);else for(const t in e)this[s][t]=e[t],this[s].setAttribute(t,e[t]);return this},removeAttr:function(e){for(let t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},transform:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transform=e;return this},transition:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transitionDuration="string"!=typeof e?`${e}ms`:e;return this},on:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];let[a,i,r,n]=t;function l(e){const t=e.target;if(!t)return;const s=e.target.dom7EventData||[];if(s.indexOf(e)<0&&s.unshift(e),d(t).is(i))r.apply(t,s);else{const e=d(t).parents();for(let t=0;t<e.length;t+=1)d(e[t]).is(i)&&r.apply(e[t],s)}}function o(e){const t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),r.apply(this,t)}"function"==typeof t[1]&&([a,r,n]=t,i=void 0),n||(n=!1);const c=a.split(" ");let p;for(let e=0;e<this.length;e+=1){const t=this[e];if(i)for(p=0;p<c.length;p+=1){const e=c[p];t.dom7LiveListeners||(t.dom7LiveListeners={}),t.dom7LiveListeners[e]||(t.dom7LiveListeners[e]=[]),t.dom7LiveListeners[e].push({listener:r,proxyListener:l}),t.addEventListener(e,l,n)}else for(p=0;p<c.length;p+=1){const e=c[p];t.dom7Listeners||(t.dom7Listeners={}),t.dom7Listeners[e]||(t.dom7Listeners[e]=[]),t.dom7Listeners[e].push({listener:r,proxyListener:o}),t.addEventListener(e,o,n)}}return this},off:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];let[a,i,r,n]=t;"function"==typeof t[1]&&([a,r,n]=t,i=void 0),n||(n=!1);const l=a.split(" ");for(let e=0;e<l.length;e+=1){const t=l[e];for(let e=0;e<this.length;e+=1){const s=this[e];let a;if(!i&&s.dom7Listeners?a=s.dom7Listeners[t]:i&&s.dom7LiveListeners&&(a=s.dom7LiveListeners[t]),a&&a.length)for(let e=a.length-1;e>=0;e-=1){const i=a[e];r&&i.listener===r||r&&i.listener&&i.listener.dom7proxy&&i.listener.dom7proxy===r?(s.removeEventListener(t,i.proxyListener,n),a.splice(e,1)):r||(s.removeEventListener(t,i.proxyListener,n),a.splice(e,1))}}}return this},trigger:function(){const e=r();for(var t=arguments.length,s=new Array(t),a=0;a<t;a++)s[a]=arguments[a];const i=s[0].split(" "),n=s[1];for(let t=0;t<i.length;t+=1){const a=i[t];for(let t=0;t<this.length;t+=1){const i=this[t];if(e.CustomEvent){const t=new e.CustomEvent(a,{detail:n,bubbles:!0,cancelable:!0});i.dom7EventData=s.filter(((e,t)=>t>0)),i.dispatchEvent(t),i.dom7EventData=[],delete i.dom7EventData}}}return this},transitionEnd:function(e){const t=this;return e&&t.on("transitionend",(function s(a){a.target===this&&(e.call(this,a),t.off("transitionend",s))})),this},outerWidth:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetWidth+parseFloat(e.getPropertyValue("margin-right"))+parseFloat(e.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetHeight+parseFloat(e.getPropertyValue("margin-top"))+parseFloat(e.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},styles:function(){const e=r();return this[0]?e.getComputedStyle(this[0],null):{}},offset:function(){if(this.length>0){const e=r(),t=a(),s=this[0],i=s.getBoundingClientRect(),n=t.body,l=s.clientTop||n.clientTop||0,o=s.clientLeft||n.clientLeft||0,d=s===e?e.scrollY:s.scrollTop,c=s===e?e.scrollX:s.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}return null},css:function(e,t){const s=r();let a;if(1===arguments.length){if("string"!=typeof e){for(a=0;a<this.length;a+=1)for(const t in e)this[a].style[t]=e[t];return this}if(this[0])return s.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(a=0;a<this.length;a+=1)this[a].style[e]=t;return this}return this},each:function(e){return e?(this.forEach(((t,s)=>{e.apply(t,[t,s])})),this):this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:null;for(let t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(let t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){const t=r(),s=a(),i=this[0];let l,o;if(!i||void 0===e)return!1;if("string"==typeof e){if(i.matches)return i.matches(e);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(e);if(i.msMatchesSelector)return i.msMatchesSelector(e);for(l=d(e),o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}if(e===s)return i===s;if(e===t)return i===t;if(e.nodeType||e instanceof n){for(l=e.nodeType?[e]:e,o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}return!1},index:function(){let e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;const t=this.length;if(e>t-1)return d([]);if(e<0){const s=t+e;return d(s<0?[]:[this[s]])}return d([this[e]])},append:function(){let e;const t=a();for(let s=0;s<arguments.length;s+=1){e=s<0||arguments.length<=s?void 0:arguments[s];for(let s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e;a.firstChild;)this[s].appendChild(a.firstChild)}else if(e instanceof n)for(let t=0;t<e.length;t+=1)this[s].appendChild(e[t]);else this[s].appendChild(e)}return this},prepend:function(e){const t=a();let s,i;for(s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e,i=a.childNodes.length-1;i>=0;i-=1)this[s].insertBefore(a.childNodes[i],this[s].childNodes[0])}else if(e instanceof n)for(i=0;i<e.length;i+=1)this[s].insertBefore(e[i],this[s].childNodes[0]);else this[s].insertBefore(e,this[s].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&d(this[0].nextElementSibling).is(e)?d([this[0].nextElementSibling]):d([]):this[0].nextElementSibling?d([this[0].nextElementSibling]):d([]):d([])},nextAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.nextElementSibling;){const a=s.nextElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},prev:function(e){if(this.length>0){const t=this[0];return e?t.previousElementSibling&&d(t.previousElementSibling).is(e)?d([t.previousElementSibling]):d([]):t.previousElementSibling?d([t.previousElementSibling]):d([])}return d([])},prevAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.previousElementSibling;){const a=s.previousElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},parent:function(e){const t=[];for(let s=0;s<this.length;s+=1)null!==this[s].parentNode&&(e?d(this[s].parentNode).is(e)&&t.push(this[s].parentNode):t.push(this[s].parentNode));return d(t)},parents:function(e){const t=[];for(let s=0;s<this.length;s+=1){let a=this[s].parentNode;for(;a;)e?d(a).is(e)&&t.push(a):t.push(a),a=a.parentNode}return d(t)},closest:function(e){let t=this;return void 0===e?d([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].querySelectorAll(e);for(let e=0;e<a.length;e+=1)t.push(a[e])}return d(t)},children:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].children;for(let s=0;s<a.length;s+=1)e&&!d(a[s]).is(e)||t.push(a[s])}return d(t)},filter:function(e){return d(o(this,e))},remove:function(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}};function p(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function u(){return Date.now()}function h(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function m(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function f(e){return"undefined"!=typeof window&&void 0!==window.HTMLElement?e instanceof HTMLElement:e&&(1===e.nodeType||11===e.nodeType)}function g(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let s=1;s<arguments.length;s+=1){const a=s<0||arguments.length<=s?void 0:arguments[s];if(null!=a&&!f(a)){const s=Object.keys(Object(a)).filter((e=>t.indexOf(e)<0));for(let t=0,i=s.length;t<i;t+=1){const i=s[t],r=Object.getOwnPropertyDescriptor(a,i);void 0!==r&&r.enumerable&&(m(e[i])&&m(a[i])?a[i].__swiper__?e[i]=a[i]:g(e[i],a[i]):!m(e[i])&&m(a[i])?(e[i]={},a[i].__swiper__?e[i]=a[i]:g(e[i],a[i])):e[i]=a[i])}}}return e}function v(e,t,s){e.style.setProperty(t,s)}function w(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}let b,x,y;function E(){return b||(b=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),passiveListener:function(){let t=!1;try{const s=Object.defineProperty({},"passive",{get(){t=!0}});e.addEventListener("testPassiveListener",null,s)}catch(e){}return t}(),gestures:"ongesturestart"in e}}()),b}function C(e){return void 0===e&&(e={}),x||(x=function(e){let{userAgent:t}=void 0===e?{}:e;const s=E(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),h=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),m="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!m&&(l.os="android",l.android=!0),(p||h||u)&&(l.os="ios",l.ios=!0),l}(e)),x}function T(){return y||(y=function(){const e=r();return{isSafari:function(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),y}Object.keys(c).forEach((e=>{Object.defineProperty(d.fn,e,{value:c[e],writable:!0})}));var $={on(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};var S={updateSize:function(){const e=this;let t,s;const a=e.$el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a[0].clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a[0].clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(a.css("padding-left")||0,10)-parseInt(a.css("padding-right")||0,10),s=s-parseInt(a.css("padding-top")||0,10)-parseInt(a.css("padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const a=e.params,{$wrapperEl:i,size:r,rtlTranslate:n,wrongRTL:l}=e,o=e.virtual&&a.virtual.enabled,d=o?e.virtual.slides.length:e.slides.length,c=i.children(`.${e.params.slideClass}`),p=o?e.virtual.slides.length:c.length;let u=[];const h=[],m=[];let f=a.slidesOffsetBefore;"function"==typeof f&&(f=a.slidesOffsetBefore.call(e));let g=a.slidesOffsetAfter;"function"==typeof g&&(g=a.slidesOffsetAfter.call(e));const w=e.snapGrid.length,b=e.slidesGrid.length;let x=a.spaceBetween,y=-f,E=0,C=0;if(void 0===r)return;"string"==typeof x&&x.indexOf("%")>=0&&(x=parseFloat(x.replace("%",""))/100*r),e.virtualSize=-x,n?c.css({marginLeft:"",marginBottom:"",marginTop:""}):c.css({marginRight:"",marginBottom:"",marginTop:""}),a.centeredSlides&&a.cssMode&&(v(e.wrapperEl,"--swiper-centered-offset-before",""),v(e.wrapperEl,"--swiper-centered-offset-after",""));const T=a.grid&&a.grid.rows>1&&e.grid;let $;T&&e.grid.initSlides(p);const S="auto"===a.slidesPerView&&a.breakpoints&&Object.keys(a.breakpoints).filter((e=>void 0!==a.breakpoints[e].slidesPerView)).length>0;for(let i=0;i<p;i+=1){$=0;const n=c.eq(i);if(T&&e.grid.updateSlide(i,n,p,t),"none"!==n.css("display")){if("auto"===a.slidesPerView){S&&(c[i].style[t("width")]="");const r=getComputedStyle(n[0]),l=n[0].style.transform,o=n[0].style.webkitTransform;if(l&&(n[0].style.transform="none"),o&&(n[0].style.webkitTransform="none"),a.roundLengths)$=e.isHorizontal()?n.outerWidth(!0):n.outerHeight(!0);else{const e=s(r,"width"),t=s(r,"padding-left"),a=s(r,"padding-right"),i=s(r,"margin-left"),l=s(r,"margin-right"),o=r.getPropertyValue("box-sizing");if(o&&"border-box"===o)$=e+i+l;else{const{clientWidth:s,offsetWidth:r}=n[0];$=e+t+a+i+l+(r-s)}}l&&(n[0].style.transform=l),o&&(n[0].style.webkitTransform=o),a.roundLengths&&($=Math.floor($))}else $=(r-(a.slidesPerView-1)*x)/a.slidesPerView,a.roundLengths&&($=Math.floor($)),c[i]&&(c[i].style[t("width")]=`${$}px`);c[i]&&(c[i].swiperSlideSize=$),m.push($),a.centeredSlides?(y=y+$/2+E/2+x,0===E&&0!==i&&(y=y-r/2-x),0===i&&(y=y-r/2-x),Math.abs(y)<.001&&(y=0),a.roundLengths&&(y=Math.floor(y)),C%a.slidesPerGroup==0&&u.push(y),h.push(y)):(a.roundLengths&&(y=Math.floor(y)),(C-Math.min(e.params.slidesPerGroupSkip,C))%e.params.slidesPerGroup==0&&u.push(y),h.push(y),y=y+$+x),e.virtualSize+=$+x,E=$,C+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+g,n&&l&&("slide"===a.effect||"coverflow"===a.effect)&&i.css({width:`${e.virtualSize+a.spaceBetween}px`}),a.setWrapperSize&&i.css({[t("width")]:`${e.virtualSize+a.spaceBetween}px`}),T&&e.grid.updateWrapperSize($,u,t),!a.centeredSlides){const t=[];for(let s=0;s<u.length;s+=1){let i=u[s];a.roundLengths&&(i=Math.floor(i)),u[s]<=e.virtualSize-r&&t.push(i)}u=t,Math.floor(e.virtualSize-r)-Math.floor(u[u.length-1])>1&&u.push(e.virtualSize-r)}if(0===u.length&&(u=[0]),0!==a.spaceBetween){const s=e.isHorizontal()&&n?"marginLeft":t("marginRight");c.filter(((e,t)=>!a.cssMode||t!==c.length-1)).css({[s]:`${x}px`})}if(a.centeredSlides&&a.centeredSlidesBounds){let e=0;m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween;const t=e-r;u=u.map((e=>e<0?-f:e>t?t+g:e))}if(a.centerInsufficientSlides){let e=0;if(m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween,e<r){const t=(r-e)/2;u.forEach(((e,s)=>{u[s]=e-t})),h.forEach(((e,s)=>{h[s]=e+t}))}}if(Object.assign(e,{slides:c,snapGrid:u,slidesGrid:h,slidesSizesGrid:m}),a.centeredSlides&&a.cssMode&&!a.centeredSlidesBounds){v(e.wrapperEl,"--swiper-centered-offset-before",-u[0]+"px"),v(e.wrapperEl,"--swiper-centered-offset-after",e.size/2-m[m.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(p!==d&&e.emit("slidesLengthChange"),u.length!==w&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),h.length!==b&&e.emit("slidesGridLengthChange"),a.watchSlidesProgress&&e.updateSlidesOffset(),!(o||a.cssMode||"slide"!==a.effect&&"fade"!==a.effect)){const t=`${a.containerModifierClass}backface-hidden`,s=e.$el.hasClass(t);p<=a.maxBackfaceHiddenSlides?s||e.$el.addClass(t):s&&e.$el.removeClass(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides.filter((t=>parseInt(t.getAttribute("data-swiper-slide-index"),10)===e))[0]:t.slides.eq(e)[0];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||d([])).each((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&t.$wrapperEl.css("height",`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides;for(let s=0;s<t.length;s+=1)t[s].swiperSlideOffset=e.isHorizontal()?t[s].offsetLeft:t[s].offsetTop},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.removeClass(s.slideVisibleClass),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(let e=0;e<a.length;e+=1){const l=a[e];let o=l.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(o-=a[0].swiperSlideOffset);const d=(n+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),c=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),p=-(n-o),u=p+t.slidesSizesGrid[e];(p>=0&&p<t.size-1||u>1&&u<=t.size||p<=0&&u>=t.size)&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(e),a.eq(e).addClass(s.slideVisibleClass)),l.progress=i?-d:d,l.originalProgress=i?-c:c}t.visibleSlides=d(t.visibleSlides)},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n}=t;const l=r,o=n;0===a?(i=0,r=!0,n=!0):(i=(e-t.minTranslate())/a,r=i<=0,n=i>=1),Object.assign(t,{progress:i,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!l&&t.emit("reachBeginning toEdge"),n&&!o&&t.emit("reachEnd toEdge"),(l&&!r||o&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,$wrapperEl:a,activeIndex:i,realIndex:r}=e,n=e.virtual&&s.virtual.enabled;let l;t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),l=n?e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`):t.eq(i),l.addClass(s.slideActiveClass),s.loop&&(l.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));let o=l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);s.loop&&0===o.length&&(o=t.eq(0),o.addClass(s.slideNextClass));let d=l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);s.loop&&0===d.length&&(d=t.eq(-1),d.addClass(s.slidePrevClass)),s.loop&&(o.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),d.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{slidesGrid:a,snapGrid:i,params:r,activeIndex:n,realIndex:l,snapIndex:o}=t;let d,c=e;if(void 0===c){for(let e=0;e<a.length;e+=1)void 0!==a[e+1]?s>=a[e]&&s<a[e+1]-(a[e+1]-a[e])/2?c=e:s>=a[e]&&s<a[e+1]&&(c=e+1):s>=a[e]&&(c=e);r.normalizeSlideIndex&&(c<0||void 0===c)&&(c=0)}if(i.indexOf(s)>=0)d=i.indexOf(s);else{const e=Math.min(r.slidesPerGroupSkip,c);d=e+Math.floor((c-e)/r.slidesPerGroup)}if(d>=i.length&&(d=i.length-1),c===n)return void(d!==o&&(t.snapIndex=d,t.emit("snapIndexChange")));const p=parseInt(t.slides.eq(c).attr("data-swiper-slide-index")||c,10);Object.assign(t,{snapIndex:d,realIndex:p,previousIndex:n,activeIndex:c}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),l!==p&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function(e){const t=this,s=t.params,a=d(e).closest(`.${s.slideClass}`)[0];let i,r=!1;if(a)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===a){r=!0,i=e;break}if(!a||!r)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=a,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(d(a).attr("data-swiper-slide-index"),10):t.clickedIndex=i,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}};var M={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,$wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=h(i[0],e);return s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,$wrapperEl:r,wrapperEl:n,progress:l}=s;let o,d=0,c=0;s.isHorizontal()?d=a?-e:e:c=e,i.roundLengths&&(d=Math.floor(d),c=Math.floor(c)),i.cssMode?n[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-d:-c:i.virtualTranslate||r.transform(`translate3d(${d}px, ${c}px, 0px)`),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?d:c;const p=s.maxTranslate()-s.minTranslate();o=0===p?0:(e-s.minTranslate())/p,o!==l&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return w({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.$wrapperEl[0].addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd))),!0}};function P(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var k={slideTo:function(e,t,s,a,i){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"number"!=typeof e&&"string"!=typeof e)throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);if("string"==typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:m}=r;if(r.animating&&l.preventInteractionOnTransition||!m&&!a&&!i)return!1;const f=Math.min(r.params.slidesPerGroupSkip,n);let g=f+Math.floor((n-f)/r.params.slidesPerGroup);g>=o.length&&(g=o.length-1),(p||l.initialSlide||0)===(c||0)&&s&&r.emit("beforeSlideChangeStart");const v=-o[g];if(r.updateProgress(v),l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*v),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&v<r.translate&&v<r.minTranslate())return!1;if(!r.allowSlidePrev&&v>r.translate&&v>r.maxTranslate()&&(p||0)!==n)return!1}let b;if(b=n>p?"next":n<p?"prev":"reset",u&&-v===r.translate||!u&&v===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(v),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?v:-v;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._swiperImmediateVirtual=!1}))}else{if(!r.support.smoothScroll)return w({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(v),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const i=this;let r=e;return i.params.loop&&(r+=i.loopedSlides),i.slideTo(r,t,s,a)},slideNext:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{animating:i,enabled:r,params:n}=a;if(!r)return a;let l=n.slidesPerGroup;"auto"===n.slidesPerView&&1===n.slidesPerGroup&&n.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<n.slidesPerGroupSkip?1:l;if(n.loop){if(i&&n.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}return n.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{params:i,animating:r,snapGrid:n,slidesGrid:l,rtlTranslate:o,enabled:d}=a;if(!d)return a;if(i.loop){if(r&&i.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}function c(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const p=c(o?a.translate:-a.translate),u=n.map((e=>c(e)));let h=n[u.indexOf(p)-1];if(void 0===h&&i.cssMode){let e;n.forEach(((t,s)=>{p>=t&&(e=s)})),void 0!==e&&(h=n[e>0?e-1:e])}let m=0;if(void 0!==h&&(m=l.indexOf(h),m<0&&(m=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(m=m-a.slidesPerViewDynamic("previous",!0)+1,m=Math.max(m,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return a.slideTo(m,e,t,s)},slideReset:function(e,t,s){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this,{params:t,$wrapperEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;if(t.loop){if(e.animating)return;i=parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),p((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),p((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var z={loopCreate:function(){const e=this,t=a(),{params:s,$wrapperEl:i}=e,r=i.children().length>0?d(i.children()[0].parentNode):i;r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();let n=r.children(`.${s.slideClass}`);if(s.loopFillGroupWithBlank){const e=s.slidesPerGroup-n.length%s.slidesPerGroup;if(e!==s.slidesPerGroup){for(let a=0;a<e;a+=1){const e=d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);r.append(e)}n=r.children(`.${s.slideClass}`)}}"auto"!==s.slidesPerView||s.loopedSlides||(s.loopedSlides=n.length),e.loopedSlides=Math.ceil(parseFloat(s.loopedSlides||s.slidesPerView,10)),e.loopedSlides+=s.loopAdditionalSlides,e.loopedSlides>n.length&&e.params.loopedSlidesLimit&&(e.loopedSlides=n.length);const l=[],o=[];n.each(((e,t)=>{d(e).attr("data-swiper-slide-index",t)}));for(let t=0;t<e.loopedSlides;t+=1){const e=t-Math.floor(t/n.length)*n.length;o.push(n.eq(e)[0]),l.unshift(n.eq(n.length-e-1)[0])}for(let e=0;e<o.length;e+=1)r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));for(let e=l.length-1;e>=0;e-=1)r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass))},loopFix:function(){const e=this;e.emit("beforeLoopFix");const{activeIndex:t,slides:s,loopedSlides:a,allowSlidePrev:i,allowSlideNext:r,snapGrid:n,rtlTranslate:l}=e;let o;e.allowSlidePrev=!0,e.allowSlideNext=!0;const d=-n[t]-e.getTranslate();if(t<a){o=s.length-3*a+t,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}else if(t>=s.length-a){o=-s.length+t+a,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}e.allowSlidePrev=i,e.allowSlideNext=r,e.emit("loopFix")},loopDestroy:function(){const{$wrapperEl:e,params:t,slides:s}=this;e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),s.removeAttr("data-swiper-slide-index")}};function L(e){const t=this,s=a(),i=r(),n=t.touchEventsData,{params:l,touches:o,enabled:c}=t;if(!c)return;if(t.animating&&l.preventInteractionOnTransition)return;!t.animating&&l.cssMode&&l.loop&&t.loopFix();let p=e;p.originalEvent&&(p=p.originalEvent);let h=d(p.target);if("wrapper"===l.touchEventsTarget&&!h.closest(t.wrapperEl).length)return;if(n.isTouchEvent="touchstart"===p.type,!n.isTouchEvent&&"which"in p&&3===p.which)return;if(!n.isTouchEvent&&"button"in p&&p.button>0)return;if(n.isTouched&&n.isMoved)return;!!l.noSwipingClass&&""!==l.noSwipingClass&&p.target&&p.target.shadowRoot&&e.path&&e.path[0]&&(h=d(e.path[0]));const m=l.noSwipingSelector?l.noSwipingSelector:`.${l.noSwipingClass}`,f=!(!p.target||!p.target.shadowRoot);if(l.noSwiping&&(f?function(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===a()||s===r())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}(m,h[0]):h.closest(m)[0]))return void(t.allowClick=!0);if(l.swipeHandler&&!h.closest(l.swipeHandler)[0])return;o.currentX="touchstart"===p.type?p.targetTouches[0].pageX:p.pageX,o.currentY="touchstart"===p.type?p.targetTouches[0].pageY:p.pageY;const g=o.currentX,v=o.currentY,w=l.edgeSwipeDetection||l.iOSEdgeSwipeDetection,b=l.edgeSwipeThreshold||l.iOSEdgeSwipeThreshold;if(w&&(g<=b||g>=i.innerWidth-b)){if("prevent"!==w)return;e.preventDefault()}if(Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=g,o.startY=v,n.touchStartTime=u(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,l.threshold>0&&(n.allowThresholdMove=!1),"touchstart"!==p.type){let e=!0;h.is(n.focusableElements)&&(e=!1,"SELECT"===h[0].nodeName&&(n.isTouched=!1)),s.activeElement&&d(s.activeElement).is(n.focusableElements)&&s.activeElement!==h[0]&&s.activeElement.blur();const a=e&&t.allowTouchMove&&l.touchStartPreventDefault;!l.touchStartForcePreventDefault&&!a||h[0].isContentEditable||p.preventDefault()}t.params.freeMode&&t.params.freeMode.enabled&&t.freeMode&&t.animating&&!l.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",p)}function O(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:l,enabled:o}=s;if(!o)return;let c=e;if(c.originalEvent&&(c=c.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",c));if(i.isTouchEvent&&"touchmove"!==c.type)return;const p="touchmove"===c.type&&c.targetTouches&&(c.targetTouches[0]||c.changedTouches[0]),h="touchmove"===c.type?p.pageX:c.pageX,m="touchmove"===c.type?p.pageY:c.pageY;if(c.preventedByNestedSwiper)return n.startX=h,void(n.startY=m);if(!s.allowTouchMove)return d(c.target).is(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:h,startY:m,currentX:h,currentY:m}),i.touchStartTime=u()));if(i.isTouchEvent&&r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(m<n.startY&&s.translate<=s.maxTranslate()||m>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(h<n.startX&&s.translate<=s.maxTranslate()||h>n.startX&&s.translate>=s.minTranslate())return;if(i.isTouchEvent&&t.activeElement&&c.target===t.activeElement&&d(c.target).is(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",c),c.targetTouches&&c.targetTouches.length>1)return;n.currentX=h,n.currentY=m;const f=n.currentX-n.startX,g=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(f**2+g**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:f*f+g*g>=25&&(e=180*Math.atan2(Math.abs(g),Math.abs(f))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",c),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&c.cancelable&&c.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&c.stopPropagation(),i.isMoved||(r.loop&&!r.cssMode&&s.loopFix(),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating&&s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",c)),s.emit("sliderMove",c),i.isMoved=!0;let v=s.isHorizontal()?f:g;n.diff=v,v*=r.touchRatio,l&&(v=-v),s.swipeDirection=v>0?"prev":"next",i.currentTranslate=v+i.startTranslate;let w=!0,b=r.resistanceRatio;if(r.touchReleaseOnEdges&&(b=0),v>0&&i.currentTranslate>s.minTranslate()?(w=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+v)**b)):v<0&&i.currentTranslate<s.maxTranslate()&&(w=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-v)**b)),w&&(c.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(v)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),s.params.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function I(e){const t=this,s=t.touchEventsData,{params:a,touches:i,rtlTranslate:r,slidesGrid:n,enabled:l}=t;if(!l)return;let o=e;if(o.originalEvent&&(o=o.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",o),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&a.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);a.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const d=u(),c=d-s.touchStartTime;if(t.allowClick){const e=o.path||o.composedPath&&o.composedPath();t.updateClickedSlide(e&&e[0]||o.target),t.emit("tap click",o),c<300&&d-s.lastClickTime<300&&t.emit("doubleTap doubleClick",o)}if(s.lastClickTime=u(),p((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===i.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=a.followFinger?r?t.translate:-t.translate:-s.currentTranslate,a.cssMode)return;if(t.params.freeMode&&a.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});let m=0,f=t.slidesSizesGrid[0];for(let e=0;e<n.length;e+=e<a.slidesPerGroupSkip?1:a.slidesPerGroup){const t=e<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;void 0!==n[e+t]?h>=n[e]&&h<n[e+t]&&(m=e,f=n[e+t]-n[e]):h>=n[e]&&(m=e,f=n[n.length-1]-n[n.length-2])}let g=null,v=null;a.rewind&&(t.isBeginning?v=t.params.virtual&&t.params.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(g=0));const w=(h-n[m])/f,b=m<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;if(c>a.longSwipesMs){if(!a.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(w>=a.longSwipesRatio?t.slideTo(a.rewind&&t.isEnd?g:m+b):t.slideTo(m)),"prev"===t.swipeDirection&&(w>1-a.longSwipesRatio?t.slideTo(m+b):null!==v&&w<0&&Math.abs(w)>a.longSwipesRatio?t.slideTo(v):t.slideTo(m))}else{if(!a.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(o.target===t.navigation.nextEl||o.target===t.navigation.prevEl)?o.target===t.navigation.nextEl?t.slideTo(m+b):t.slideTo(m):("next"===t.swipeDirection&&t.slideTo(null!==g?g:m+b),"prev"===t.swipeDirection&&t.slideTo(null!==v?v:m))}}function A(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),("auto"===t.slidesPerView||t.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function D(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function G(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}let N=!1;function B(){}const H=(e,t)=>{const s=a(),{params:i,touchEvents:r,el:n,wrapperEl:l,device:o,support:d}=e,c=!!i.nested,p="on"===t?"addEventListener":"removeEventListener",u=t;if(d.touch){const t=!("touchstart"!==r.start||!d.passiveListener||!i.passiveListeners)&&{passive:!0,capture:!1};n[p](r.start,e.onTouchStart,t),n[p](r.move,e.onTouchMove,d.passiveListener?{passive:!1,capture:c}:c),n[p](r.end,e.onTouchEnd,t),r.cancel&&n[p](r.cancel,e.onTouchEnd,t)}else n[p](r.start,e.onTouchStart,!1),s[p](r.move,e.onTouchMove,c),s[p](r.end,e.onTouchEnd,!1);(i.preventClicks||i.preventClicksPropagation)&&n[p]("click",e.onClick,!0),i.cssMode&&l[p]("scroll",e.onScroll),i.updateOnWindowResize?e[u](o.ios||o.android?"resize orientationchange observerUpdate":"resize observerUpdate",A,!0):e[u]("observerUpdate",A,!0)};var X={attachEvents:function(){const e=this,t=a(),{params:s,support:i}=e;e.onTouchStart=L.bind(e),e.onTouchMove=O.bind(e),e.onTouchEnd=I.bind(e),s.cssMode&&(e.onScroll=G.bind(e)),e.onClick=D.bind(e),i.touch&&!N&&(t.addEventListener("touchstart",B),N=!0),H(e,"on")},detachEvents:function(){H(this,"off")}};const Y=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var R={addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,$el:i,device:r,support:n}=e,l=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"pointer-events":!n.touch},{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...l),i.addClass([...t].join(" ")),e.emitContainerClasses()},removeClasses:function(){const{$el:e,classNames:t}=this;e.removeClass(t.join(" ")),this.emitContainerClasses()}};var W={init:!0,direction:"horizontal",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopedSlidesLimit:!0,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function j(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(["navigation","pagination","scrollbar"].indexOf(a)>=0&&!0===e[a]&&(e[a]={auto:!0}),a in e&&"enabled"in i?(!0===e[a]&&(e[a]={enabled:!0}),"object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),g(t,s)):g(t,s)):g(t,s)}}const q={eventsEmitter:$,update:S,translate:M,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||s.$wrapperEl.transition(e),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),P({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),P({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:k,loop:z,grabCursor:{setGrabCursor:function(e){const t=this;if(t.support.touch||!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;s.style.cursor="move",s.style.cursor=e?"grabbing":"grab"},unsetGrabCursor:function(){const e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="")}},events:X,breakpoints:{setBreakpoint:function(){const e=this,{activeIndex:t,initialized:s,loopedSlides:a=0,params:i,$el:r}=e,n=i.breakpoints;if(!n||n&&0===Object.keys(n).length)return;const l=e.getBreakpoint(n,e.params.breakpointsBase,e.el);if(!l||e.currentBreakpoint===l)return;const o=(l in n?n[l]:void 0)||e.originalParams,d=Y(e,i),c=Y(e,o),p=i.enabled;d&&!c?(r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!d&&c&&(r.addClass(`${i.containerModifierClass}grid`),(o.grid.fill&&"column"===o.grid.fill||!o.grid.fill&&"column"===i.grid.fill)&&r.addClass(`${i.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{const s=i[t]&&i[t].enabled,a=o[t]&&o[t].enabled;s&&!a&&e[t].disable(),!s&&a&&e[t].enable()}));const u=o.direction&&o.direction!==i.direction,h=i.loop&&(o.slidesPerView!==i.slidesPerView||u);u&&s&&e.changeDirection(),g(e.params,o);const m=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),p&&!m?e.disable():!p&&m&&e.enable(),e.currentBreakpoint=l,e.emit("_beforeBreakpoint",o),h&&s&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(t-a+e.loopedSlides,0,!1)),e.emit("breakpoint",o)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:R,images:{loadImage:function(e,t,s,a,i,n){const l=r();let o;function c(){n&&n()}d(e).parent("picture")[0]||e.complete&&i?c():t?(o=new l.Image,o.onload=c,o.onerror=c,a&&(o.sizes=a),s&&(o.srcset=s),t&&(o.src=t)):c()},preloadImages:function(){const e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(let s=0;s<e.imagesToLoad.length;s+=1){const a=e.imagesToLoad[s];e.loadImage(a,a.currentSrc||a.getAttribute("src"),a.srcset||a.getAttribute("srcset"),a.sizes||a.getAttribute("sizes"),!0,t)}}}},_={};class V{constructor(){let e,t;for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];if(1===a.length&&a[0].constructor&&"Object"===Object.prototype.toString.call(a[0]).slice(8,-1)?t=a[0]:[e,t]=a,t||(t={}),t=g({},t),e&&!t.el&&(t.el=e),t.el&&d(t.el).length>1){const e=[];return d(t.el).each((s=>{const a=g({},t,{el:s});e.push(new V(a))})),e}const r=this;r.__swiper__=!0,r.support=E(),r.device=C({userAgent:t.userAgent}),r.browser=T(),r.eventsListeners={},r.eventsAnyListeners=[],r.modules=[...r.__modules__],t.modules&&Array.isArray(t.modules)&&r.modules.push(...t.modules);const n={};r.modules.forEach((e=>{e({swiper:r,extendParams:j(t,n),on:r.on.bind(r),once:r.once.bind(r),off:r.off.bind(r),emit:r.emit.bind(r)})}));const l=g({},W,n);return r.params=g({},l,_,t),r.originalParams=g({},r.params),r.passedParams=g({},t),r.params&&r.params.on&&Object.keys(r.params.on).forEach((e=>{r.on(e,r.params.on[e])})),r.params&&r.params.onAny&&r.onAny(r.params.onAny),r.$=d,Object.assign(r,{enabled:r.params.enabled,el:e,classNames:[],slides:d(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===r.params.direction,isVertical:()=>"vertical"===r.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:r.params.allowSlideNext,allowSlidePrev:r.params.allowSlidePrev,touchEvents:function(){const e=["touchstart","touchmove","touchend","touchcancel"],t=["pointerdown","pointermove","pointerup"];return r.touchEventsTouch={start:e[0],move:e[1],end:e[2],cancel:e[3]},r.touchEventsDesktop={start:t[0],move:t[1],end:t[2]},r.support.touch||!r.params.simulateTouch?r.touchEventsTouch:r.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:r.params.focusableElements,lastClickTime:u(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:r.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),r.emit("_swiper"),r.params.init&&r.init(),r}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.each((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if(s.centeredSlides){let e,t=a[l].swiperSlideSize;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;s.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(a(),e.params.autoHeight&&e.updateAutoHeight()):(i=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),i||a()),s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.each((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.$el.addClass(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.$el.removeClass(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;const s=d(e||t.params.el);if(!(e=s[0]))return!1;e.swiper=t;const i=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let r=(()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const t=d(e.shadowRoot.querySelector(i()));return t.children=e=>s.children(e),t}return s.children?s.children(i()):d(s).children(i())})();if(0===r.length&&t.params.createElements){const e=a().createElement("div");r=d(e),e.className=t.params.wrapperClass,s.append(e),s.children(`.${t.params.slideClass}`).each((e=>{r.append(e)}))}return Object.assign(t,{$el:s,el:e,$wrapperEl:r,wrapperEl:r[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction")),wrongRTL:"-webkit-box"===r.css("display")}),!0}init(e){const t=this;if(t.initialized)return t;return!1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.params.loop&&t.loopCreate(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.preloadImages&&t.preloadImages(),t.params.loop?t.slideTo(t.params.initialSlide+t.loopedSlides,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.attachEvents(),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,$el:i,$wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttr("style"),r.removeAttr("style"),n&&n.length&&n.removeClass([a.slideVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.$el[0].swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){g(_,e)}static get extendedDefaults(){return _}static get defaults(){return W}static installModule(e){V.prototype.__modules__||(V.prototype.__modules__=[]);const t=V.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>V.installModule(e))),V):(V.installModule(e),V)}}function F(e,t,s,i){const r=a();return e.params.createElements&&Object.keys(i).forEach((a=>{if(!s[a]&&!0===s.auto){let n=e.$el.children(`.${i[a]}`)[0];n||(n=r.createElement("div"),n.className=i[a],e.$el.append(n)),s[a]=n,t[a]=n}})),s}function U(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function K(e){const t=this,{$wrapperEl:s,params:a}=t;if(a.loop&&t.loopDestroy(),"object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.append(e[t]);else s.append(e);a.loop&&t.loopCreate(),a.observer||t.update()}function Z(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;s.loop&&t.loopDestroy();let r=i+1;if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&a.prepend(e[t]);r=i+e.length}else a.prepend(e);s.loop&&t.loopCreate(),s.observer||t.update(),t.slideTo(r,0,!1)}function Q(e,t){const s=this,{$wrapperEl:a,params:i,activeIndex:r}=s;let n=r;i.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.slides=a.children(`.${i.slideClass}`));const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides.eq(t);e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&a.append(t[e]);o=n>e?n+t.length:n}else a.append(t);for(let e=0;e<d.length;e+=1)a.append(d[e]);i.loop&&s.loopCreate(),i.observer||s.update(),i.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function J(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;let r=i;s.loop&&(r-=t.loopedSlides,t.loopDestroy(),t.slides=a.children(`.${s.slideClass}`));let n,l=r;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)n=e[s],t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1);l=Math.max(l,0)}else n=e,t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1),l=Math.max(l,0);s.loop&&t.loopCreate(),s.observer||t.update(),s.loop?t.slideTo(l+t.loopedSlides,0,!1):t.slideTo(l,0,!1)}function ee(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function te(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l,recreateShadows:o,getEffectParams:d}=e;let c;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)})),a("transitionEnd",(()=>{if(s.params.effect===t&&o){if(!d||!d().slideShadows)return;s.slides.each((e=>{s.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()})),o()}})),a("virtualUpdate",(()=>{s.params.effect===t&&(s.slides.length||(c=!0),requestAnimationFrame((()=>{c&&s.slides&&s.slides.length&&(i(),c=!1)})))}))}function se(e,t){return e.transformEl?t.find(e.transformEl).css({"backface-visibility":"hidden","-webkit-backface-visibility":"hidden"}):t}function ae(e){let{swiper:t,duration:s,transformEl:a,allSlides:i}=e;const{slides:r,activeIndex:n,$wrapperEl:l}=t;if(t.params.virtualTranslate&&0!==s){let e,s=!1;e=i?a?r.find(a):r:a?r.eq(n).find(a):r.eq(n),e.transitionEnd((()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=["webkitTransitionEnd","transitionend"];for(let t=0;t<e.length;t+=1)l.trigger(e[t])}))}}function ie(e,t,s){const a="swiper-slide-shadow"+(s?`-${s}`:""),i=e.transformEl?t.find(e.transformEl):t;let r=i.children(`.${a}`);return r.length||(r=d(`<div class="swiper-slide-shadow${s?`-${s}`:""}"></div>`),i.append(r)),r}Object.keys(q).forEach((e=>{Object.keys(q[e]).forEach((t=>{V.prototype[t]=q[e][t]}))})),V.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,t){void 0===t&&(t={});const s=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(1===e.length)return void i("observerUpdate",e[0]);const t=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(t):l.setTimeout(t,0)}));s.observe(e,{attributes:void 0===t.attributes||t.attributes,childList:void 0===t.childList||t.childList,characterData:void 0===t.characterData||t.characterData}),n.push(s)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=t.$el.parents();for(let t=0;t<e.length;t+=1)o(e[t])}o(t.$el[0],{childList:t.params.observeSlideChildren}),o(t.$wrapperEl[0],{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const re=[function(e){let t,{swiper:s,extendParams:a,on:i,emit:r}=e;function n(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];const i=a.renderSlide?d(a.renderSlide.call(s,e,t)):d(`<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);return i.attr("data-swiper-slide-index")||i.attr("data-swiper-slide-index",t),a.cache&&(s.virtual.cache[t]=i),i}function l(e){const{slidesPerView:t,slidesPerGroup:a,centeredSlides:i}=s.params,{addSlidesBefore:l,addSlidesAfter:o}=s.params.virtual,{from:d,to:c,slides:p,slidesGrid:u,offset:h}=s.virtual;s.params.cssMode||s.updateActiveIndex();const m=s.activeIndex||0;let f,g,v;f=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",i?(g=Math.floor(t/2)+a+o,v=Math.floor(t/2)+a+l):(g=t+(a-1)+o,v=a+l);const w=Math.max((m||0)-v,0),b=Math.min((m||0)+g,p.length-1),x=(s.slidesGrid[w]||0)-(s.slidesGrid[0]||0);function y(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),s.lazy&&s.params.lazy.enabled&&s.lazy.load(),r("virtualUpdate")}if(Object.assign(s.virtual,{from:w,to:b,offset:x,slidesGrid:s.slidesGrid}),d===w&&c===b&&!e)return s.slidesGrid!==u&&x!==h&&s.slides.css(f,`${x}px`),s.updateProgress(),void r("virtualUpdate");if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:x,from:w,to:b,slides:function(){const e=[];for(let t=w;t<=b;t+=1)e.push(p[t]);return e}()}),void(s.params.virtual.renderExternalUpdate?y():r("virtualUpdate"));const E=[],C=[];if(e)s.$wrapperEl.find(`.${s.params.slideClass}`).remove();else for(let e=d;e<=c;e+=1)(e<w||e>b)&&s.$wrapperEl.find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();for(let t=0;t<p.length;t+=1)t>=w&&t<=b&&(void 0===c||e?C.push(t):(t>c&&C.push(t),t<d&&E.push(t)));C.forEach((e=>{s.$wrapperEl.append(n(p[e],e))})),E.sort(((e,t)=>t-e)).forEach((e=>{s.$wrapperEl.prepend(n(p[e],e))})),s.$wrapperEl.children(".swiper-slide").css(f,`${x}px`),y()}a({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}}),s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]},i("beforeInit",(()=>{s.params.virtual.enabled&&(s.virtual.slides=s.params.virtual.slides,s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,s.params.initialSlide||l())})),i("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{l()}),100)):l())})),i("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&v(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);l(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.attr("data-swiper-slide-index");r&&a.attr("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}l(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.virtual.slides.splice(e[a],1),s.params.virtual.cache&&delete s.virtual.cache[e[a]],e[a]<t&&(t-=1),t=Math.max(t,0);else s.virtual.slides.splice(e,1),s.params.virtual.cache&&delete s.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);l(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),l(!0),s.slideTo(0,0)},update:l})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function c(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,h=38===i,m=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&m||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&h||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||h||m)){let e=!1;if(t.$el.parents(`.${t.params.slideClass}`).length>0&&0===t.$el.parents(`.${t.params.slideActiveClass}`).length)return;const a=t.$el,i=a[0].clientWidth,r=a[0].clientHeight,n=o.innerWidth,l=o.innerHeight,d=t.$el.offset();s&&(d.left-=t.$el[0].scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||h||m)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||m)&&t.slideNext(),(d||h)&&t.slidePrev()),n("keyPress",i)}}function p(){t.keyboard.enabled||(d(l).on("keydown",c),t.keyboard.enabled=!0)}function u(){t.keyboard.enabled&&(d(l).off("keydown",c),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&p()})),i("destroy",(()=>{t.keyboard.enabled&&u()})),Object.assign(t.keyboard,{enable:p,disable:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();let l;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null}}),t.mousewheel={enabled:!1};let o,c=u();const h=[];function m(){t.enabled&&(t.mouseEntered=!0)}function f(){t.enabled&&(t.mouseEntered=!1)}function g(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&u()-c<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&u()-c<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),c=(new n.Date).getTime(),!1)))}function v(e){let s=e,a=!0;if(!t.enabled)return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let n=t.$el;if("container"!==t.params.mousewheel.eventsTarget&&(n=d(t.params.mousewheel.eventsTarget)),!t.mouseEntered&&!n[0].contains(s.target)&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let c=0;const m=t.rtlTranslate?-1:1,f=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(f.pixelX)>Math.abs(f.pixelY)))return!0;c=-f.pixelX*m}else{if(!(Math.abs(f.pixelY)>Math.abs(f.pixelX)))return!0;c=-f.pixelY}else c=Math.abs(f.pixelX)>Math.abs(f.pixelY)?-f.pixelX*m:-f.pixelY;if(0===c)return!0;r.invert&&(c=-c);let v=t.getTranslate()+c*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:u(),delta:Math.abs(c),direction:Math.sign(c)},a=o&&e.time<o.time+500&&e.delta<=o.delta&&e.direction===o.direction;if(!a){o=void 0,t.params.loop&&t.loopFix();let n=t.getTranslate()+c*r.sensitivity;const d=t.isBeginning,u=t.isEnd;if(n>=t.minTranslate()&&(n=t.minTranslate()),n<=t.maxTranslate()&&(n=t.maxTranslate()),t.setTransition(0),t.setTranslate(n),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!d&&t.isBeginning||!u&&t.isEnd)&&t.updateSlidesClasses(),t.params.freeMode.sticky){clearTimeout(l),l=void 0,h.length>=15&&h.shift();const s=h.length?h[h.length-1]:void 0,a=h[0];if(h.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))h.splice(0);else if(h.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=c>0?.8:.2;o=e,h.splice(0),l=p((()=>{t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}l||(l=p((()=>{o=e,h.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplayDisableOnInteraction&&t.autoplay.stop(),n===t.minTranslate()||n===t.maxTranslate())return!0}}else{const s={time:u(),delta:Math.abs(c),direction:Math.sign(c),raw:e};h.length>=2&&h.shift();const a=h.length?h[h.length-1]:void 0;if(h.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&g(s):g(s),function(e){const s=t.params.mousewheel;if(e.direction<0){if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function w(e){let s=t.$el;"container"!==t.params.mousewheel.eventsTarget&&(s=d(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",f),s[e]("wheel",v)}function b(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",v),!0):!t.mousewheel.enabled&&(w("on"),t.mousewheel.enabled=!0,!0)}function x(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,v),!0):!!t.mousewheel.enabled&&(w("off"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&x(),t.params.mousewheel.enabled&&b()})),a("destroy",(()=>{t.params.cssMode&&b(),t.mousewheel.enabled&&x()})),Object.assign(t.mousewheel,{enable:b,disable:x})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;function r(e){let s;return e&&(s=d(e),t.params.uniqueNavElements&&"string"==typeof e&&s.length>1&&1===t.$el.find(e).length&&(s=t.$el.find(e))),s}function n(e,s){const a=t.params.navigation;e&&e.length>0&&(e[s?"addClass":"removeClass"](a.disabledClass),e[0]&&"BUTTON"===e[0].tagName&&(e[0].disabled=s),t.params.watchOverflow&&t.enabled&&e[t.isLocked?"addClass":"removeClass"](a.lockClass))}function l(){if(t.params.loop)return;const{$nextEl:e,$prevEl:s}=t.navigation;n(s,t.isBeginning&&!t.params.rewind),n(e,t.isEnd&&!t.params.rewind)}function o(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&(t.slidePrev(),i("navigationPrev"))}function c(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&(t.slideNext(),i("navigationNext"))}function p(){const e=t.params.navigation;if(t.params.navigation=F(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;const s=r(e.nextEl),a=r(e.prevEl);s&&s.length>0&&s.on("click",c),a&&a.length>0&&a.on("click",o),Object.assign(t.navigation,{$nextEl:s,nextEl:s&&s[0],$prevEl:a,prevEl:a&&a[0]}),t.enabled||(s&&s.addClass(e.lockClass),a&&a.addClass(e.lockClass))}function u(){const{$nextEl:e,$prevEl:s}=t.navigation;e&&e.length&&(e.off("click",c),e.removeClass(t.params.navigation.disabledClass)),s&&s.length&&(s.off("click",o),s.removeClass(t.params.navigation.disabledClass))}s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),t.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null},a("init",(()=>{!1===t.params.navigation.enabled?h():(p(),l())})),a("toEdge fromEdge lock unlock",(()=>{l()})),a("destroy",(()=>{u()})),a("enable disable",(()=>{const{$nextEl:e,$prevEl:s}=t.navigation;e&&e[t.enabled?"removeClass":"addClass"](t.params.navigation.lockClass),s&&s[t.enabled?"removeClass":"addClass"](t.params.navigation.lockClass)})),a("click",((e,s)=>{const{$nextEl:a,$prevEl:r}=t.navigation,n=s.target;if(t.params.navigation.hideOnClick&&!d(n).is(r)&&!d(n).is(a)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===n||t.pagination.el.contains(n)))return;let e;a?e=a.hasClass(t.params.navigation.hiddenClass):r&&(e=r.hasClass(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),a&&a.toggleClass(t.params.navigation.hiddenClass),r&&r.toggleClass(t.params.navigation.hiddenClass)}}));const h=()=>{t.$el.addClass(t.params.navigation.navigationDisabledClass),u()};Object.assign(t.navigation,{enable:()=>{t.$el.removeClass(t.params.navigation.navigationDisabledClass),p(),l()},disable:h,update:l,init:p,destroy:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),t.pagination={el:null,$el:null,bullets:[]};let l=0;function o(){return!t.params.pagination.el||!t.pagination.el||!t.pagination.$el||0===t.pagination.$el.length}function c(e,s){const{bulletActiveClass:a}=t.params.pagination;e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)}function p(){const e=t.rtl,s=t.params.pagination;if(o())return;const a=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,r=t.pagination.$el;let p;const u=t.params.loop?Math.ceil((a-2*t.loopedSlides)/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(p=Math.ceil((t.activeIndex-t.loopedSlides)/t.params.slidesPerGroup),p>a-1-2*t.loopedSlides&&(p-=a-2*t.loopedSlides),p>u-1&&(p-=u),p<0&&"bullets"!==t.params.paginationType&&(p=u+p)):p=void 0!==t.snapIndex?t.snapIndex:t.activeIndex||0,"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const a=t.pagination.bullets;let i,o,u;if(s.dynamicBullets&&(n=a.eq(0)[t.isHorizontal()?"outerWidth":"outerHeight"](!0),r.css(t.isHorizontal()?"width":"height",n*(s.dynamicMainBullets+4)+"px"),s.dynamicMainBullets>1&&void 0!==t.previousIndex&&(l+=p-(t.previousIndex-t.loopedSlides||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),i=Math.max(p-l,0),o=i+(Math.min(a.length,s.dynamicMainBullets)-1),u=(o+i)/2),a.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`)).join(" ")),r.length>1)a.each((e=>{const t=d(e),a=t.index();a===p&&t.addClass(s.bulletActiveClass),s.dynamicBullets&&(a>=i&&a<=o&&t.addClass(`${s.bulletActiveClass}-main`),a===i&&c(t,"prev"),a===o&&c(t,"next"))}));else{const e=a.eq(p),r=e.index();if(e.addClass(s.bulletActiveClass),s.dynamicBullets){const e=a.eq(i),n=a.eq(o);for(let e=i;e<=o;e+=1)a.eq(e).addClass(`${s.bulletActiveClass}-main`);if(t.params.loop)if(r>=a.length){for(let e=s.dynamicMainBullets;e>=0;e-=1)a.eq(a.length-e).addClass(`${s.bulletActiveClass}-main`);a.eq(a.length-s.dynamicMainBullets-1).addClass(`${s.bulletActiveClass}-prev`)}else c(e,"prev"),c(n,"next");else c(e,"prev"),c(n,"next")}}if(s.dynamicBullets){const i=Math.min(a.length,s.dynamicMainBullets+4),r=(n*i-n)/2-u*n,l=e?"right":"left";a.css(t.isHorizontal()?l:"top",`${r}px`)}}if("fraction"===s.type&&(r.find(U(s.currentClass)).text(s.formatFractionCurrent(p+1)),r.find(U(s.totalClass)).text(s.formatFractionTotal(u))),"progressbar"===s.type){let e;e=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const a=(p+1)/u;let i=1,n=1;"horizontal"===e?i=a:n=a,r.find(U(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`).transition(t.params.speed)}"custom"===s.type&&s.renderCustom?(r.html(s.renderCustom(t,p+1,u)),i("paginationRender",r[0])):i("paginationUpdate",r[0]),t.params.watchOverflow&&t.enabled&&r[t.isLocked?"addClass":"removeClass"](s.lockClass)}function u(){const e=t.params.pagination;if(o())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,a=t.pagination.$el;let r="";if("bullets"===e.type){let i=t.params.loop?Math.ceil((s-2*t.loopedSlides)/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&!t.params.loop&&i>s&&(i=s);for(let s=0;s<i;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;a.html(r),t.pagination.bullets=a.find(U(e.bulletClass))}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,a.html(r)),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`,a.html(r)),"custom"!==e.type&&i("paginationRender",t.pagination.$el[0])}function h(){t.params.pagination=F(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s=d(e.el);0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&s.length>1&&(s=t.$el.find(e.el),s.length>1&&(s=s.filter((e=>d(e).parents(".swiper")[0]===t.el)))),"bullets"===e.type&&e.clickable&&s.addClass(e.clickableClass),s.addClass(e.modifierClass+e.type),s.addClass(t.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(s.addClass(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.addClass(e.progressbarOppositeClass),e.clickable&&s.on("click",U(e.bulletClass),(function(e){e.preventDefault();let s=d(this).index()*t.params.slidesPerGroup;t.params.loop&&(s+=t.loopedSlides),t.slideTo(s)})),Object.assign(t.pagination,{$el:s,el:s[0]}),t.enabled||s.addClass(e.lockClass))}function m(){const e=t.params.pagination;if(o())return;const s=t.pagination.$el;s.removeClass(e.hiddenClass),s.removeClass(e.modifierClass+e.type),s.removeClass(t.isHorizontal()?e.horizontalClass:e.verticalClass),t.pagination.bullets&&t.pagination.bullets.removeClass&&t.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&s.off("click",U(e.bulletClass))}a("init",(()=>{!1===t.params.pagination.enabled?f():(h(),u(),p())})),a("activeIndexChange",(()=>{(t.params.loop||void 0===t.snapIndex)&&p()})),a("snapIndexChange",(()=>{t.params.loop||p()})),a("slidesLengthChange",(()=>{t.params.loop&&(u(),p())})),a("snapGridLengthChange",(()=>{t.params.loop||(u(),p())})),a("destroy",(()=>{m()})),a("enable disable",(()=>{const{$el:e}=t.pagination;e&&e[t.enabled?"removeClass":"addClass"](t.params.pagination.lockClass)})),a("lock unlock",(()=>{p()})),a("click",((e,s)=>{const a=s.target,{$el:r}=t.pagination;if(t.params.pagination.el&&t.params.pagination.hideOnClick&&r&&r.length>0&&!d(a).hasClass(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r.hasClass(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.toggleClass(t.params.pagination.hiddenClass)}}));const f=()=>{t.$el.addClass(t.params.pagination.paginationDisabledClass),t.pagination.$el&&t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass),m()};Object.assign(t.pagination,{enable:()=>{t.$el.removeClass(t.params.pagination.paginationDisabledClass),t.pagination.$el&&t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass),h(),u(),p()},disable:f,render:u,update:p,init:h,destroy:m})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const n=a();let l,o,c,u,h=!1,m=null,f=null;function g(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s,progress:a}=t,{$dragEl:i,$el:r}=e,n=t.params.scrollbar;let l=o,d=(c-o)*a;s?(d=-d,d>0?(l=o-d,d=0):-d+o>c&&(l=c+d)):d<0?(l=o+d,d=0):d+o>c&&(l=c-d),t.isHorizontal()?(i.transform(`translate3d(${d}px, 0, 0)`),i[0].style.width=`${l}px`):(i.transform(`translate3d(0px, ${d}px, 0)`),i[0].style.height=`${l}px`),n.hide&&(clearTimeout(m),r[0].style.opacity=1,m=setTimeout((()=>{r[0].style.opacity=0,r.transition(400)}),1e3))}function v(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{$dragEl:s,$el:a}=e;s[0].style.width="",s[0].style.height="",c=t.isHorizontal()?a[0].offsetWidth:a[0].offsetHeight,u=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),o="auto"===t.params.scrollbar.dragSize?c*u:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s[0].style.width=`${o}px`:s[0].style.height=`${o}px`,a[0].style.display=u>=1?"none":"",t.params.scrollbar.hide&&(a[0].style.opacity=0),t.params.watchOverflow&&t.enabled&&e.$el[t.isLocked?"addClass":"removeClass"](t.params.scrollbar.lockClass)}function w(e){return t.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientX:e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientY:e.clientY}function b(e){const{scrollbar:s,rtlTranslate:a}=t,{$el:i}=s;let r;r=(w(e)-i.offset()[t.isHorizontal()?"left":"top"]-(null!==l?l:o/2))/(c-o),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function x(e){const s=t.params.scrollbar,{scrollbar:a,$wrapperEl:i}=t,{$el:n,$dragEl:o}=a;h=!0,l=e.target===o[0]||e.target===o?w(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.transition(100),o.transition(100),b(e),clearTimeout(f),n.transition(0),s.hide&&n.css("opacity",1),t.params.cssMode&&t.$wrapperEl.css("scroll-snap-type","none"),r("scrollbarDragStart",e)}function y(e){const{scrollbar:s,$wrapperEl:a}=t,{$el:i,$dragEl:n}=s;h&&(e.preventDefault?e.preventDefault():e.returnValue=!1,b(e),a.transition(0),i.transition(0),n.transition(0),r("scrollbarDragMove",e))}function E(e){const s=t.params.scrollbar,{scrollbar:a,$wrapperEl:i}=t,{$el:n}=a;h&&(h=!1,t.params.cssMode&&(t.$wrapperEl.css("scroll-snap-type",""),i.transition("")),s.hide&&(clearTimeout(f),f=p((()=>{n.css("opacity",0),n.transition(400)}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function C(e){const{scrollbar:s,touchEventsTouch:a,touchEventsDesktop:i,params:r,support:l}=t,o=s.$el;if(!o)return;const d=o[0],c=!(!l.passiveListener||!r.passiveListeners)&&{passive:!1,capture:!1},p=!(!l.passiveListener||!r.passiveListeners)&&{passive:!0,capture:!1};if(!d)return;const u="on"===e?"addEventListener":"removeEventListener";l.touch?(d[u](a.start,x,c),d[u](a.move,y,c),d[u](a.end,E,p)):(d[u](i.start,x,c),n[u](i.move,y,c),n[u](i.end,E,p))}function T(){const{scrollbar:e,$el:s}=t;t.params.scrollbar=F(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i=d(a.el);t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.find(a.el).length&&(i=s.find(a.el)),i.addClass(t.isHorizontal()?a.horizontalClass:a.verticalClass);let r=i.find(`.${t.params.scrollbar.dragClass}`);0===r.length&&(r=d(`<div class="${t.params.scrollbar.dragClass}"></div>`),i.append(r)),Object.assign(e,{$el:i,el:i[0],$dragEl:r,dragEl:r[0]}),a.draggable&&t.params.scrollbar.el&&t.scrollbar.el&&C("on"),i&&i[t.enabled?"removeClass":"addClass"](t.params.scrollbar.lockClass)}function $(){const e=t.params.scrollbar,s=t.scrollbar.$el;s&&s.removeClass(t.isHorizontal()?e.horizontalClass:e.verticalClass),t.params.scrollbar.el&&t.scrollbar.el&&C("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),t.scrollbar={el:null,dragEl:null,$el:null,$dragEl:null},i("init",(()=>{!1===t.params.scrollbar.enabled?S():(T(),v(),g())})),i("update resize observerUpdate lock unlock",(()=>{v()})),i("setTranslate",(()=>{g()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&t.scrollbar.$dragEl.transition(e)}(s)})),i("enable disable",(()=>{const{$el:e}=t.scrollbar;e&&e[t.enabled?"removeClass":"addClass"](t.params.scrollbar.lockClass)})),i("destroy",(()=>{$()}));const S=()=>{t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.$el&&t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),$()};Object.assign(t.scrollbar,{enable:()=>{t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.$el&&t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),T(),v(),g()},disable:S,updateSize:v,setTranslate:g,init:T,destroy:$})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i=(e,s)=>{const{rtl:a}=t,i=d(e),r=a?-1:1,n=i.attr("data-swiper-parallax")||"0";let l=i.attr("data-swiper-parallax-x"),o=i.attr("data-swiper-parallax-y");const c=i.attr("data-swiper-parallax-scale"),p=i.attr("data-swiper-parallax-opacity");if(l||o?(l=l||"0",o=o||"0"):t.isHorizontal()?(l=n,o="0"):(o=n,l="0"),l=l.indexOf("%")>=0?parseInt(l,10)*s*r+"%":l*s*r+"px",o=o.indexOf("%")>=0?parseInt(o,10)*s+"%":o*s+"px",null!=p){const e=p-(p-1)*(1-Math.abs(s));i[0].style.opacity=e}if(null==c)i.transform(`translate3d(${l}, ${o}, 0px)`);else{const e=c-(c-1)*(1-Math.abs(s));i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`)}},r=()=>{const{$el:e,slides:s,progress:a,snapGrid:r}=t;e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{i(e,a)})),s.each(((e,s)=>{let n=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(n+=Math.ceil(s/2)-a*(r.length-1)),n=Math.min(Math.max(n,-1),1),d(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{i(e,n)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&r()})),a("setTranslate",(()=>{t.params.parallax.enabled&&r()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{$el:s}=t;s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t=>{const s=d(t);let a=parseInt(s.attr("data-swiper-parallax-duration"),10)||e;0===e&&(a=0),s.transition(a)}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l,o,c,p=1,u=!1;const m={$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},f={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},g={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let v=1;function w(e){if(e.targetTouches.length<2)return 1;const t=e.targetTouches[0].pageX,s=e.targetTouches[0].pageY,a=e.targetTouches[1].pageX,i=e.targetTouches[1].pageY;return Math.sqrt((a-t)**2+(i-s)**2)}function b(e){const s=t.support,a=t.params.zoom;if(o=!1,c=!1,!s.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;o=!0,m.scaleStart=w(e)}m.$slideEl&&m.$slideEl.length||(m.$slideEl=d(e.target).closest(`.${t.params.slideClass}`),0===m.$slideEl.length&&(m.$slideEl=t.slides.eq(t.activeIndex)),m.$imageEl=m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${a.containerClass}`),m.maxRatio=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,0!==m.$imageWrapEl.length)?(m.$imageEl&&m.$imageEl.transition(0),u=!0):m.$imageEl=void 0}function x(e){const s=t.support,a=t.params.zoom,i=t.zoom;if(!s.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;c=!0,m.scaleMove=w(e)}m.$imageEl&&0!==m.$imageEl.length?(s.gestures?i.scale=e.scale*p:i.scale=m.scaleMove/m.scaleStart*p,i.scale>m.maxRatio&&(i.scale=m.maxRatio-1+(i.scale-m.maxRatio+1)**.5),i.scale<a.minRatio&&(i.scale=a.minRatio+1-(a.minRatio-i.scale+1)**.5),m.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)):"gesturechange"===e.type&&b(e)}function y(e){const s=t.device,a=t.support,i=t.params.zoom,r=t.zoom;if(!a.gestures){if(!o||!c)return;if("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2&&!s.android)return;o=!1,c=!1}m.$imageEl&&0!==m.$imageEl.length&&(r.scale=Math.max(Math.min(r.scale,m.maxRatio),i.minRatio),m.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`),p=r.scale,u=!1,1===r.scale&&(m.$slideEl=void 0))}function E(e){const s=t.zoom;if(!m.$imageEl||0===m.$imageEl.length)return;if(t.allowClick=!1,!f.isTouched||!m.$slideEl)return;f.isMoved||(f.width=m.$imageEl[0].offsetWidth,f.height=m.$imageEl[0].offsetHeight,f.startX=h(m.$imageWrapEl[0],"x")||0,f.startY=h(m.$imageWrapEl[0],"y")||0,m.slideWidth=m.$slideEl[0].offsetWidth,m.slideHeight=m.$slideEl[0].offsetHeight,m.$imageWrapEl.transition(0));const a=f.width*s.scale,i=f.height*s.scale;if(!(a<m.slideWidth&&i<m.slideHeight)){if(f.minX=Math.min(m.slideWidth/2-a/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-i/2,0),f.maxY=-f.minY,f.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,f.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!f.isMoved&&!u){if(t.isHorizontal()&&(Math.floor(f.minX)===Math.floor(f.startX)&&f.touchesCurrent.x<f.touchesStart.x||Math.floor(f.maxX)===Math.floor(f.startX)&&f.touchesCurrent.x>f.touchesStart.x))return void(f.isTouched=!1);if(!t.isHorizontal()&&(Math.floor(f.minY)===Math.floor(f.startY)&&f.touchesCurrent.y<f.touchesStart.y||Math.floor(f.maxY)===Math.floor(f.startY)&&f.touchesCurrent.y>f.touchesStart.y))return void(f.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),f.isMoved=!0,f.currentX=f.touchesCurrent.x-f.touchesStart.x+f.startX,f.currentY=f.touchesCurrent.y-f.touchesStart.y+f.startY,f.currentX<f.minX&&(f.currentX=f.minX+1-(f.minX-f.currentX+1)**.8),f.currentX>f.maxX&&(f.currentX=f.maxX-1+(f.currentX-f.maxX+1)**.8),f.currentY<f.minY&&(f.currentY=f.minY+1-(f.minY-f.currentY+1)**.8),f.currentY>f.maxY&&(f.currentY=f.maxY-1+(f.currentY-f.maxY+1)**.8),g.prevPositionX||(g.prevPositionX=f.touchesCurrent.x),g.prevPositionY||(g.prevPositionY=f.touchesCurrent.y),g.prevTime||(g.prevTime=Date.now()),g.x=(f.touchesCurrent.x-g.prevPositionX)/(Date.now()-g.prevTime)/2,g.y=(f.touchesCurrent.y-g.prevPositionY)/(Date.now()-g.prevTime)/2,Math.abs(f.touchesCurrent.x-g.prevPositionX)<2&&(g.x=0),Math.abs(f.touchesCurrent.y-g.prevPositionY)<2&&(g.y=0),g.prevPositionX=f.touchesCurrent.x,g.prevPositionY=f.touchesCurrent.y,g.prevTime=Date.now(),m.$imageWrapEl.transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)}}function C(){const e=t.zoom;m.$slideEl&&t.previousIndex!==t.activeIndex&&(m.$imageEl&&m.$imageEl.transform("translate3d(0,0,0) scale(1)"),m.$imageWrapEl&&m.$imageWrapEl.transform("translate3d(0,0,0)"),e.scale=1,p=1,m.$slideEl=void 0,m.$imageEl=void 0,m.$imageWrapEl=void 0)}function T(e){const s=t.zoom,a=t.params.zoom;if(m.$slideEl||(e&&e.target&&(m.$slideEl=d(e.target).closest(`.${t.params.slideClass}`)),m.$slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.$slideEl=t.$wrapperEl.children(`.${t.params.slideActiveClass}`):m.$slideEl=t.slides.eq(t.activeIndex)),m.$imageEl=m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${a.containerClass}`)),!m.$imageEl||0===m.$imageEl.length||!m.$imageWrapEl||0===m.$imageWrapEl.length)return;let i,r,l,o,c,u,h,g,v,w,b,x,y,E,C,T,$,S;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),m.$slideEl.addClass(`${a.zoomedSlideClass}`),void 0===f.touchesStart.x&&e?(i="touchend"===e.type?e.changedTouches[0].pageX:e.pageX,r="touchend"===e.type?e.changedTouches[0].pageY:e.pageY):(i=f.touchesStart.x,r=f.touchesStart.y),s.scale=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,p=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,e?($=m.$slideEl[0].offsetWidth,S=m.$slideEl[0].offsetHeight,l=m.$slideEl.offset().left+n.scrollX,o=m.$slideEl.offset().top+n.scrollY,c=l+$/2-i,u=o+S/2-r,v=m.$imageEl[0].offsetWidth,w=m.$imageEl[0].offsetHeight,b=v*s.scale,x=w*s.scale,y=Math.min($/2-b/2,0),E=Math.min(S/2-x/2,0),C=-y,T=-E,h=c*s.scale,g=u*s.scale,h<y&&(h=y),h>C&&(h=C),g<E&&(g=E),g>T&&(g=T)):(h=0,g=0),m.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`),m.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)}function $(){const e=t.zoom,s=t.params.zoom;m.$slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.$slideEl=t.$wrapperEl.children(`.${t.params.slideActiveClass}`):m.$slideEl=t.slides.eq(t.activeIndex),m.$imageEl=m.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${s.containerClass}`)),m.$imageEl&&0!==m.$imageEl.length&&m.$imageWrapEl&&0!==m.$imageWrapEl.length&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,p=1,m.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),m.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),m.$slideEl.removeClass(`${s.zoomedSlideClass}`),m.$slideEl=void 0)}function S(e){const s=t.zoom;s.scale&&1!==s.scale?$():T(e)}function M(){const e=t.support;return{passiveListener:!("touchstart"!==t.touchEvents.start||!e.passiveListener||!t.params.passiveListeners)&&{passive:!0,capture:!1},activeListenerWithCapture:!e.passiveListener||{passive:!1,capture:!0}}}function P(){return`.${t.params.slideClass}`}function k(e){const{passiveListener:s}=M(),a=P();t.$wrapperEl[e]("gesturestart",a,b,s),t.$wrapperEl[e]("gesturechange",a,x,s),t.$wrapperEl[e]("gestureend",a,y,s)}function z(){l||(l=!0,k("on"))}function L(){l&&(l=!1,k("off"))}function O(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const s=t.support,{passiveListener:a,activeListenerWithCapture:i}=M(),r=P();s.gestures?(t.$wrapperEl.on(t.touchEvents.start,z,a),t.$wrapperEl.on(t.touchEvents.end,L,a)):"touchstart"===t.touchEvents.start&&(t.$wrapperEl.on(t.touchEvents.start,r,b,a),t.$wrapperEl.on(t.touchEvents.move,r,x,i),t.$wrapperEl.on(t.touchEvents.end,r,y,a),t.touchEvents.cancel&&t.$wrapperEl.on(t.touchEvents.cancel,r,y,a)),t.$wrapperEl.on(t.touchEvents.move,`.${t.params.zoom.containerClass}`,E,i)}function I(){const e=t.zoom;if(!e.enabled)return;const s=t.support;e.enabled=!1;const{passiveListener:a,activeListenerWithCapture:i}=M(),r=P();s.gestures?(t.$wrapperEl.off(t.touchEvents.start,z,a),t.$wrapperEl.off(t.touchEvents.end,L,a)):"touchstart"===t.touchEvents.start&&(t.$wrapperEl.off(t.touchEvents.start,r,b,a),t.$wrapperEl.off(t.touchEvents.move,r,x,i),t.$wrapperEl.off(t.touchEvents.end,r,y,a),t.touchEvents.cancel&&t.$wrapperEl.off(t.touchEvents.cancel,r,y,a)),t.$wrapperEl.off(t.touchEvents.move,`.${t.params.zoom.containerClass}`,E,i)}Object.defineProperty(t.zoom,"scale",{get:()=>v,set(e){if(v!==e){const t=m.$imageEl?m.$imageEl[0]:void 0,s=m.$slideEl?m.$slideEl[0]:void 0;i("zoomChange",e,t,s)}v=e}}),a("init",(()=>{t.params.zoom.enabled&&O()})),a("destroy",(()=>{I()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;m.$imageEl&&0!==m.$imageEl.length&&(f.isTouched||(s.android&&e.cancelable&&e.preventDefault(),f.isTouched=!0,f.touchesStart.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,f.touchesStart.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(!m.$imageEl||0===m.$imageEl.length)return;if(!f.isTouched||!f.isMoved)return f.isTouched=!1,void(f.isMoved=!1);f.isTouched=!1,f.isMoved=!1;let s=300,a=300;const i=g.x*s,r=f.currentX+i,n=g.y*a,l=f.currentY+n;0!==g.x&&(s=Math.abs((r-f.currentX)/g.x)),0!==g.y&&(a=Math.abs((l-f.currentY)/g.y));const o=Math.max(s,a);f.currentX=r,f.currentY=l;const d=f.width*e.scale,c=f.height*e.scale;f.minX=Math.min(m.slideWidth/2-d/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-c/2,0),f.maxY=-f.minY,f.currentX=Math.max(Math.min(f.currentX,f.maxX),f.minX),f.currentY=Math.max(Math.min(f.currentY,f.maxY),f.minY),m.$imageWrapEl.transition(o).transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&S(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&C()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&C()})),Object.assign(t.zoom,{enable:O,disable:I,in:T,out:$,toggle:S})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;s({lazy:{checkInView:!1,enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,scrollingElement:"",elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}}),t.lazy={};let n=!1,l=!1;function o(e,s){void 0===s&&(s=!0);const a=t.params.lazy;if(void 0===e)return;if(0===t.slides.length)return;const r=t.virtual&&t.params.virtual.enabled?t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`):t.slides.eq(e),n=r.find(`.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`);!r.hasClass(a.elementClass)||r.hasClass(a.loadedClass)||r.hasClass(a.loadingClass)||n.push(r[0]),0!==n.length&&n.each((e=>{const n=d(e);n.addClass(a.loadingClass);const l=n.attr("data-background"),c=n.attr("data-src"),p=n.attr("data-srcset"),u=n.attr("data-sizes"),h=n.parent("picture");t.loadImage(n[0],c||l,p,u,!1,(()=>{if(null!=t&&t&&(!t||t.params)&&!t.destroyed){if(l?(n.css("background-image",`url("${l}")`),n.removeAttr("data-background")):(p&&(n.attr("srcset",p),n.removeAttr("data-srcset")),u&&(n.attr("sizes",u),n.removeAttr("data-sizes")),h.length&&h.children("source").each((e=>{const t=d(e);t.attr("data-srcset")&&(t.attr("srcset",t.attr("data-srcset")),t.removeAttr("data-srcset"))})),c&&(n.attr("src",c),n.removeAttr("data-src"))),n.addClass(a.loadedClass).removeClass(a.loadingClass),r.find(`.${a.preloaderClass}`).remove(),t.params.loop&&s){const e=r.attr("data-swiper-slide-index");if(r.hasClass(t.params.slideDuplicateClass)){o(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(),!1)}else{o(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(),!1)}}i("lazyImageReady",r[0],n[0]),t.params.autoHeight&&t.updateAutoHeight()}})),i("lazyImageLoad",r[0],n[0])}))}function c(){const{$wrapperEl:e,params:s,slides:a,activeIndex:i}=t,r=t.virtual&&s.virtual.enabled,n=s.lazy;let c=s.slidesPerView;function p(t){if(r){if(e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length)return!0}else if(a[t])return!0;return!1}function u(e){return r?d(e).attr("data-swiper-slide-index"):d(e).index()}if("auto"===c&&(c=0),l||(l=!0),t.params.watchSlidesProgress)e.children(`.${s.slideVisibleClass}`).each((e=>{o(r?d(e).attr("data-swiper-slide-index"):d(e).index())}));else if(c>1)for(let e=i;e<i+c;e+=1)p(e)&&o(e);else o(i);if(n.loadPrevNext)if(c>1||n.loadPrevNextAmount&&n.loadPrevNextAmount>1){const e=n.loadPrevNextAmount,t=Math.ceil(c),s=Math.min(i+t+Math.max(e,t),a.length),r=Math.max(i-Math.max(t,e),0);for(let e=i+t;e<s;e+=1)p(e)&&o(e);for(let e=r;e<i;e+=1)p(e)&&o(e)}else{const t=e.children(`.${s.slideNextClass}`);t.length>0&&o(u(t));const a=e.children(`.${s.slidePrevClass}`);a.length>0&&o(u(a))}}function p(){const e=r();if(!t||t.destroyed)return;const s=t.params.lazy.scrollingElement?d(t.params.lazy.scrollingElement):d(e),a=s[0]===e,i=a?e.innerWidth:s[0].offsetWidth,l=a?e.innerHeight:s[0].offsetHeight,o=t.$el.offset(),{rtlTranslate:u}=t;let h=!1;u&&(o.left-=t.$el[0].scrollLeft);const m=[[o.left,o.top],[o.left+t.width,o.top],[o.left,o.top+t.height],[o.left+t.width,o.top+t.height]];for(let e=0;e<m.length;e+=1){const t=m[e];if(t[0]>=0&&t[0]<=i&&t[1]>=0&&t[1]<=l){if(0===t[0]&&0===t[1])continue;h=!0}}const f=!("touchstart"!==t.touchEvents.start||!t.support.passiveListener||!t.params.passiveListeners)&&{passive:!0,capture:!1};h?(c(),s.off("scroll",p,f)):n||(n=!0,s.on("scroll",p,f))}a("beforeInit",(()=>{t.params.lazy.enabled&&t.params.preloadImages&&(t.params.preloadImages=!1)})),a("init",(()=>{t.params.lazy.enabled&&(t.params.lazy.checkInView?p():c())})),a("scroll",(()=>{t.params.freeMode&&t.params.freeMode.enabled&&!t.params.freeMode.sticky&&c()})),a("scrollbarDragMove resize _freeModeNoMomentumRelease",(()=>{t.params.lazy.enabled&&(t.params.lazy.checkInView?p():c())})),a("transitionStart",(()=>{t.params.lazy.enabled&&(t.params.lazy.loadOnTransitionStart||!t.params.lazy.loadOnTransitionStart&&!l)&&(t.params.lazy.checkInView?p():c())})),a("transitionEnd",(()=>{t.params.lazy.enabled&&!t.params.lazy.loadOnTransitionStart&&(t.params.lazy.checkInView?p():c())})),a("slideChange",(()=>{const{lazy:e,cssMode:s,watchSlidesProgress:a,touchReleaseOnEdges:i,resistanceRatio:r}=t.params;e.enabled&&(s||a&&(i||0===r))&&c()})),a("destroy",(()=>{t.$el&&t.$el.find(`.${t.params.lazy.loadingClass}`).removeClass(t.params.lazy.loadingClass)})),Object.assign(t.lazy,{load:c,loadInSlide:o})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline||(t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid))}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function n(s){s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&p((()=>{s.updateAutoHeight()})),s.$wrapperEl.transitionEnd((()=>{i&&(s.params.loop&&"slide"===t.params.controller.by&&s.loopFix(),s.transitionEnd())})))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&n(i[r]);else i instanceof a&&s!==i&&n(i)}})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group",id:null}});let i=null;function r(e){const t=i;0!==t.length&&(t.html(""),t.html(e))}function n(e){e.attr("tabIndex","0")}function l(e){e.attr("tabIndex","-1")}function o(e,t){e.attr("role",t)}function c(e,t){e.attr("aria-roledescription",t)}function p(e,t){e.attr("aria-label",t)}function u(e){e.attr("aria-disabled",!0)}function h(e){e.attr("aria-disabled",!1)}function m(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=d(e.target);t.navigation&&t.navigation.$nextEl&&a.is(t.navigation.$nextEl)&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?r(s.lastSlideMessage):r(s.nextSlideMessage)),t.navigation&&t.navigation.$prevEl&&a.is(t.navigation.$prevEl)&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?r(s.firstSlideMessage):r(s.prevSlideMessage)),t.pagination&&a.is(U(t.params.pagination.bulletClass))&&a[0].click()}function f(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function g(){return f()&&t.params.pagination.clickable}const v=(e,t,s)=>{n(e),"BUTTON"!==e[0].tagName&&(o(e,"button"),e.on("keydown",m)),p(e,s),function(e,t){e.attr("aria-controls",t)}(e,t)},w=e=>{const s=e.target.closest(`.${t.params.slideClass}`);if(!s||!t.slides.includes(s))return;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||(t.isHorizontal()?t.el.scrollLeft=0:t.el.scrollTop=0,t.slideTo(t.slides.indexOf(s),0))},b=()=>{const e=t.params.a11y;e.itemRoleDescriptionMessage&&c(d(t.slides),e.itemRoleDescriptionMessage),e.slideRole&&o(d(t.slides),e.slideRole);const s=t.params.loop?t.slides.filter((e=>!e.classList.contains(t.params.slideDuplicateClass))).length:t.slides.length;e.slideLabelMessage&&t.slides.each(((a,i)=>{const r=d(a),n=t.params.loop?parseInt(r.attr("data-swiper-slide-index"),10):i;p(r,e.slideLabelMessage.replace(/\{\{index\}\}/,n+1).replace(/\{\{slidesLength\}\}/,s))}))},x=()=>{const e=t.params.a11y;t.$el.append(i);const s=t.$el;e.containerRoleDescriptionMessage&&c(s,e.containerRoleDescriptionMessage),e.containerMessage&&p(s,e.containerMessage);const a=t.$wrapperEl,r=e.id||a.attr("id")||`swiper-wrapper-${n=16,void 0===n&&(n=16),"x".repeat(n).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var n;const l=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var o;let d,u;o=r,a.attr("id",o),function(e,t){e.attr("aria-live",t)}(a,l),b(),t.navigation&&t.navigation.$nextEl&&(d=t.navigation.$nextEl),t.navigation&&t.navigation.$prevEl&&(u=t.navigation.$prevEl),d&&d.length&&v(d,r,e.nextSlideMessage),u&&u.length&&v(u,r,e.prevSlideMessage),g()&&t.pagination.$el.on("keydown",U(t.params.pagination.bulletClass),m),t.$el.on("focus",w,!0)};a("beforeInit",(()=>{i=d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)})),a("afterInit",(()=>{t.params.a11y.enabled&&x()})),a("slidesLengthChange snapGridLengthChange slidesGridLengthChange",(()=>{t.params.a11y.enabled&&b()})),a("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{$nextEl:e,$prevEl:s}=t.navigation;s&&s.length>0&&(t.isBeginning?(u(s),l(s)):(h(s),n(s))),e&&e.length>0&&(t.isEnd?(u(e),l(e)):(h(e),n(e)))}()})),a("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;f()&&t.pagination.bullets.each((s=>{const a=d(s);t.params.pagination.clickable&&(n(a),t.params.pagination.renderBullet||(o(a,"button"),p(a,e.paginationBulletMessage.replace(/\{\{index\}\}/,a.index()+1)))),a.is(`.${t.params.pagination.bulletActiveClass}`)?a.attr("aria-current","true"):a.removeAttr("aria-current")}))}()})),a("destroy",(()=>{t.params.a11y.enabled&&function(){let e,s;i&&i.length>0&&i.remove(),t.navigation&&t.navigation.$nextEl&&(e=t.navigation.$nextEl),t.navigation&&t.navigation.$prevEl&&(s=t.navigation.$prevEl),e&&e.off("keydown",m),s&&s.off("keydown",m),g()&&t.pagination.$el.off("keydown",U(t.params.pagination.bulletClass),m),t.$el.off("focus",w,!0)}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.slides.eq(s);let d=l(o.attr("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e}/${d}`}else n.pathname.includes(e)||(d=`${e}/${d}`);t.params.history.keepQuery&&(d+=n.search);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides.eq(i);if(l(r.attr("data-history"))===s&&!r.hasClass(t.params.slideDuplicateClass)){const s=r.index();t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,n.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),(n.key||n.value)&&(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p))}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),c=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}});const p=()=>{i("hashChange");const e=o.location.hash.replace("#","");if(e!==t.slides.eq(t.activeIndex).attr("data-hash")){const s=t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();if(void 0===s)return;t.slideTo(s)}},u=()=>{if(l&&t.params.hashNavigation.enabled)if(t.params.hashNavigation.replaceState&&c.history&&c.history.replaceState)c.history.replaceState(null,null,`#${t.slides.eq(t.activeIndex).attr("data-hash")}`||""),i("hashSet");else{const e=t.slides.eq(t.activeIndex),s=e.attr("data-hash")||e.attr("data-history");o.location.hash=s||"",i("hashSet")}};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0;for(let a=0,i=t.slides.length;a<i;a+=1){const i=t.slides.eq(a);if((i.attr("data-hash")||i.attr("data-history"))===e&&!i.hasClass(t.params.slideDuplicateClass)){const e=i.index();t.slideTo(e,s,t.params.runCallbacksOnInit,!0)}}}t.params.hashNavigation.watchState&&d(c).on("hashchange",p)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d(c).off("hashchange",p)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&u()})),n("slideChange",(()=>{l&&t.params.cssMode&&u()}))},function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;function l(){if(!s.size)return s.autoplay.running=!1,void(s.autoplay.paused=!1);const e=s.slides.eq(s.activeIndex);let a=s.params.autoplay.delay;e.attr("data-swiper-autoplay")&&(a=e.attr("data-swiper-autoplay")||s.params.autoplay.delay),clearTimeout(t),t=p((()=>{let e;s.params.autoplay.reverseDirection?s.params.loop?(s.loopFix(),e=s.slidePrev(s.params.speed,!0,!0),n("autoplay")):s.isBeginning?s.params.autoplay.stopOnLastSlide?d():(e=s.slideTo(s.slides.length-1,s.params.speed,!0,!0),n("autoplay")):(e=s.slidePrev(s.params.speed,!0,!0),n("autoplay")):s.params.loop?(s.loopFix(),e=s.slideNext(s.params.speed,!0,!0),n("autoplay")):s.isEnd?s.params.autoplay.stopOnLastSlide?d():(e=s.slideTo(0,s.params.speed,!0,!0),n("autoplay")):(e=s.slideNext(s.params.speed,!0,!0),n("autoplay")),(s.params.cssMode&&s.autoplay.running||!1===e)&&l()}),a)}function o(){return void 0===t&&(!s.autoplay.running&&(s.autoplay.running=!0,n("autoplayStart"),l(),!0))}function d(){return!!s.autoplay.running&&(void 0!==t&&(t&&(clearTimeout(t),t=void 0),s.autoplay.running=!1,n("autoplayStop"),!0))}function c(e){s.autoplay.running&&(s.autoplay.paused||(t&&clearTimeout(t),s.autoplay.paused=!0,0!==e&&s.params.autoplay.waitForTransition?["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].addEventListener(e,h)})):(s.autoplay.paused=!1,l())))}function u(){const e=a();"hidden"===e.visibilityState&&s.autoplay.running&&c(),"visible"===e.visibilityState&&s.autoplay.paused&&(l(),s.autoplay.paused=!1)}function h(e){s&&!s.destroyed&&s.$wrapperEl&&e.target===s.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].removeEventListener(e,h)})),s.autoplay.paused=!1,s.autoplay.running?l():d())}function m(){s.params.autoplay.disableOnInteraction?d():(n("autoplayPause"),c()),["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].removeEventListener(e,h)}))}function f(){s.params.autoplay.disableOnInteraction||(s.autoplay.paused=!1,n("autoplayResume"),l())}s.autoplay={running:!1,paused:!1},i({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}}),r("init",(()=>{if(s.params.autoplay.enabled){o();a().addEventListener("visibilitychange",u),s.params.autoplay.pauseOnMouseEnter&&(s.$el.on("mouseenter",m),s.$el.on("mouseleave",f))}})),r("beforeTransitionStart",((e,t,a)=>{s.autoplay.running&&(a||!s.params.autoplay.disableOnInteraction?s.autoplay.pause(t):d())})),r("sliderFirstMove",(()=>{s.autoplay.running&&(s.params.autoplay.disableOnInteraction?d():c())})),r("touchEnd",(()=>{s.params.cssMode&&s.autoplay.paused&&!s.params.autoplay.disableOnInteraction&&l()})),r("destroy",(()=>{s.$el.off("mouseenter",m),s.$el.off("mouseleave",f),s.autoplay.running&&d();a().removeEventListener("visibilitychange",u)})),Object.assign(s.autoplay,{pause:c,run:l,start:o,stop:d})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let i=!1,r=!1;function n(){const e=t.thumbs.swiper;if(!e||e.destroyed)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&d(a).hasClass(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;if(i=e.params.loop?parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10):s,t.params.loop){let e=t.activeIndex;t.slides.eq(e).hasClass(t.params.slideDuplicateClass)&&(t.loopFix(),t._clientLeft=t.$wrapperEl[0].clientLeft,e=t.activeIndex);const s=t.slides.eq(e).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),a=t.slides.eq(e).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();i=void 0===s?a:void 0===a?s:a-e<e-s?a:s}t.slideTo(i)}function l(){const{thumbs:e}=t.params;if(i)return!1;i=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1});else if(m(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),r=!0}return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",n),!0}function o(e){const s=t.thumbs.swiper;if(!s||s.destroyed)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView;let i=1;const r=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(i=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(i=1),i=Math.floor(i),s.slides.removeClass(r),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<i;e+=1)s.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex+e}"]`).addClass(r);else for(let e=0;e<i;e+=1)s.slides.eq(t.realIndex+e).addClass(r);const n=t.params.thumbs.autoScrollOffset,l=n&&!s.params.loop;if(t.realIndex!==s.realIndex||l){let i,r,o=s.activeIndex;if(s.params.loop){s.slides.eq(o).hasClass(s.params.slideDuplicateClass)&&(s.loopFix(),s._clientLeft=s.$wrapperEl[0].clientLeft,o=s.activeIndex);const e=s.slides.eq(o).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),a=s.slides.eq(o).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();i=void 0===e?a:void 0===a?e:a-o==o-e?s.params.slidesPerGroup>1?a:o:a-o<o-e?a:e,r=t.activeIndex>t.previousIndex?"next":"prev"}else i=t.realIndex,r=i>t.previousIndex?"next":"prev";l&&(i+="next"===r?n:-1*n),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(i)<0&&(s.params.centeredSlides?i=i>o?i-Math.floor(a/2)+1:i+Math.floor(a/2)-1:i>o&&s.params.slidesPerGroup,s.slideTo(i,e?0:void 0))}}t.thumbs={swiper:null},a("beforeInit",(()=>{const{thumbs:e}=t.params;e&&e.swiper&&(l(),o(!0))})),a("slideChange update resize observerUpdate",(()=>{o()})),a("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&!a.destroyed&&a.setTransition(s)})),a("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&!e.destroyed&&r&&e.destroy()})),Object.assign(t.thumbs,{init:l,update:o})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:u()})},onTouchEnd:function(e){let{currentPos:s}=e;const{params:r,$wrapperEl:n,rtlTranslate:l,snapGrid:o,touchEventsData:d}=t,c=u()-d.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<o.length?t.slideTo(o.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(d.velocities.length>1){const e=d.velocities.pop(),s=d.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||u()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,d.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let c=t.translate+s;l&&(c=-c);let p,h=!1;const m=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(c<t.maxTranslate())r.freeMode.momentumBounce?(c+t.maxTranslate()<-m&&(c=t.maxTranslate()-m),p=t.maxTranslate(),h=!0,d.allowMomentumBounce=!0):c=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(c>t.minTranslate())r.freeMode.momentumBounce?(c-t.minTranslate()>m&&(c=t.minTranslate()+m),p=t.minTranslate(),h=!0,d.allowMomentumBounce=!0):c=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<o.length;t+=1)if(o[t]>-c){e=t;break}c=Math.abs(o[e]-c)<Math.abs(o[e-1]-c)||"next"===t.swipeDirection?o[e]:o[e-1],c=-c}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=l?Math.abs((-c-t.translate)/t.velocity):Math.abs((c-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((l?-c:c)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&h?(t.updateProgress(p),t.setTransition(e),t.setTranslate(c),t.transitionStart(!0,t.swipeDirection),t.animating=!0,n.transitionEnd((()=>{t&&!t.destroyed&&d.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(p),n.transitionEnd((()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(c),t.setTransition(e),t.setTranslate(c),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,n.transitionEnd((()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(c),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||c>=r.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,{swiper:i,extendParams:r}=e;r({grid:{rows:1,fill:"column"}}),i.grid={initSlides:e=>{const{slidesPerView:r}=i.params,{rows:n,fill:l}=i.params.grid;s=t/n,a=Math.floor(e/n),t=Math.floor(e/n)===e/n?e:Math.ceil(e/n)*n,"auto"!==r&&"row"===l&&(t=Math.max(t,r*n))},updateSlide:(e,r,n,l)=>{const{slidesPerGroup:o,spaceBetween:d}=i.params,{rows:c,fill:p}=i.params.grid;let u,h,m;if("row"===p&&o>1){const s=Math.floor(e/(o*c)),a=e-c*o*s,i=0===s?o:Math.min(Math.ceil((n-s*c*o)/c),o);m=Math.floor(a/i),h=a-m*i+s*o,u=h+m*t/c,r.css({"-webkit-order":u,order:u})}else"column"===p?(h=Math.floor(e/c),m=e-h*c,(h>a||h===a&&m===c-1)&&(m+=1,m>=c&&(m=0,h+=1))):(m=Math.floor(e/s),h=e-m*s);r.css(l("margin-top"),0!==m?d&&`${d}px`:"")},updateWrapperSize:(e,s,a)=>{const{spaceBetween:r,centeredSlides:n,roundLengths:l}=i.params,{rows:o}=i.params.grid;if(i.virtualSize=(e+r)*t,i.virtualSize=Math.ceil(i.virtualSize/o)-r,i.$wrapperEl.css({[a("width")]:`${i.virtualSize+r}px`}),n){s.splice(0,s.length);const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];l&&(a=Math.floor(a)),s[t]<i.virtualSize+s[0]&&e.push(a)}s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:K.bind(t),prependSlide:Z.bind(t),addSlide:Q.bind(t),removeSlide:J.bind(t),removeAllSlides:ee.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1,transformEl:null}}),te({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t,s=t.params.fadeEffect;for(let a=0;a<e.length;a+=1){const e=t.slides.eq(a);let i=-e[0].swiperSlideOffset;t.params.virtualTranslate||(i-=t.translate);let r=0;t.isHorizontal()||(r=i,i=0);const n=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e[0].progress),0):1+Math.min(Math.max(e[0].progress,-1),0);se(s,e).css({opacity:n}).transform(`translate3d(${i}px, ${r}px, 0px)`)}},setTransition:e=>{const{transformEl:s}=t.params.fadeEffect;(s?t.slides.find(s):t.slides).transition(e),ae({swiper:t,duration:e,transformEl:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const i=(e,t,s)=>{let a=s?e.find(".swiper-slide-shadow-left"):e.find(".swiper-slide-shadow-top"),i=s?e.find(".swiper-slide-shadow-right"):e.find(".swiper-slide-shadow-bottom");0===a.length&&(a=d(`<div class="swiper-slide-shadow-${s?"left":"top"}"></div>`),e.append(a)),0===i.length&&(i=d(`<div class="swiper-slide-shadow-${s?"right":"bottom"}"></div>`),e.append(i)),a.length&&(a[0].style.opacity=Math.max(-t,0)),i.length&&(i[0].style.opacity=Math.max(t,0))};te({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{$el:e,$wrapperEl:s,slides:a,width:r,height:n,rtlTranslate:l,size:o,browser:c}=t,p=t.params.cubeEffect,u=t.isHorizontal(),h=t.virtual&&t.params.virtual.enabled;let m,f=0;p.shadow&&(u?(m=s.find(".swiper-cube-shadow"),0===m.length&&(m=d('<div class="swiper-cube-shadow"></div>'),s.append(m)),m.css({height:`${r}px`})):(m=e.find(".swiper-cube-shadow"),0===m.length&&(m=d('<div class="swiper-cube-shadow"></div>'),e.append(m))));for(let e=0;e<a.length;e+=1){const t=a.eq(e);let s=e;h&&(s=parseInt(t.attr("data-swiper-slide-index"),10));let r=90*s,n=Math.floor(r/360);l&&(r=-r,n=Math.floor(-r/360));const d=Math.max(Math.min(t[0].progress,1),-1);let c=0,m=0,g=0;s%4==0?(c=4*-n*o,g=0):(s-1)%4==0?(c=0,g=4*-n*o):(s-2)%4==0?(c=o+4*n*o,g=o):(s-3)%4==0&&(c=-o,g=3*o+4*o*n),l&&(c=-c),u||(m=c,c=0);const v=`rotateX(${u?0:-r}deg) rotateY(${u?r:0}deg) translate3d(${c}px, ${m}px, ${g}px)`;d<=1&&d>-1&&(f=90*s+90*d,l&&(f=90*-s-90*d)),t.transform(v),p.slideShadows&&i(t,d,u)}if(s.css({"-webkit-transform-origin":`50% 50% -${o/2}px`,"transform-origin":`50% 50% -${o/2}px`}),p.shadow)if(u)m.transform(`translate3d(0px, ${r/2+p.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`);else{const e=Math.abs(f)-90*Math.floor(Math.abs(f)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=p.shadowScale,a=p.shadowScale/t,i=p.shadowOffset;m.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-90deg)`)}const g=c.isSafari||c.isWebView?-o/2:0;s.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal()?0:f}deg) rotateY(${t.isHorizontal()?-f:0}deg)`),s[0].style.setProperty("--swiper-cube-translate-z",`${g}px`)},setTransition:e=>{const{$el:s,slides:a}=t;a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),t.params.cubeEffect.shadow&&!t.isHorizontal()&&s.find(".swiper-cube-shadow").transition(e)},recreateShadows:()=>{const e=t.isHorizontal();t.slides.each((t=>{const s=Math.max(Math.min(t.progress,1),-1);i(d(t),s,e)}))},getEffectParams:()=>t.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0,transformEl:null}});const i=(e,s,a)=>{let i=t.isHorizontal()?e.find(".swiper-slide-shadow-left"):e.find(".swiper-slide-shadow-top"),r=t.isHorizontal()?e.find(".swiper-slide-shadow-right"):e.find(".swiper-slide-shadow-bottom");0===i.length&&(i=ie(a,e,t.isHorizontal()?"left":"top")),0===r.length&&(r=ie(a,e,t.isHorizontal()?"right":"bottom")),i.length&&(i[0].style.opacity=Math.max(-s,0)),r.length&&(r[0].style.opacity=Math.max(s,0))};te({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect;for(let r=0;r<e.length;r+=1){const n=e.eq(r);let l=n[0].progress;t.params.flipEffect.limitRotation&&(l=Math.max(Math.min(n[0].progress,1),-1));const o=n[0].swiperSlideOffset;let d=-180*l,c=0,p=t.params.cssMode?-o-t.translate:-o,u=0;t.isHorizontal()?s&&(d=-d):(u=p,p=0,c=-d,d=0),n[0].style.zIndex=-Math.abs(Math.round(l))+e.length,a.slideShadows&&i(n,l,a);const h=`translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;se(a,n).transform(h)}},setTransition:e=>{const{transformEl:s}=t.params.flipEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),ae({swiper:t,duration:e,transformEl:s})},recreateShadows:()=>{const e=t.params.flipEffect;t.slides.each((s=>{const a=d(s);let r=a[0].progress;t.params.flipEffect.limitRotation&&(r=Math.max(Math.min(s.progress,1),-1)),i(a,r,e)}))},getEffectParams:()=>t.params.flipEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0,transformEl:null}}),te({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth;for(let e=0,t=a.length;e<t;e+=1){const t=a.eq(e),s=i[e],l=(o-t[0].swiperSlideOffset-s/2)/s,p="function"==typeof r.modifier?r.modifier(l):l*r.modifier;let u=n?d*p:0,h=n?0:d*p,m=-c*Math.abs(p),f=r.stretch;"string"==typeof f&&-1!==f.indexOf("%")&&(f=parseFloat(r.stretch)/100*s);let g=n?0:f*p,v=n?f*p:0,w=1-(1-r.scale)*Math.abs(p);Math.abs(v)<.001&&(v=0),Math.abs(g)<.001&&(g=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(h)<.001&&(h=0),Math.abs(w)<.001&&(w=0);const b=`translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;if(se(r,t).transform(b),t[0].style.zIndex=1-Math.abs(Math.round(p)),r.slideShadows){let e=n?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),s=n?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===e.length&&(e=ie(r,t,n?"left":"top")),0===s.length&&(s=ie(r,t,n?"right":"bottom")),e.length&&(e[0].style.opacity=p>0?p:0),s.length&&(s[0].style.opacity=-p>0?-p:0)}}},setTransition:e=>{const{transformEl:s}=t.params.coverflowEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{transformEl:null,limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;te({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,$wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides;if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.transform(`translateX(calc(50% - ${e}px))`)}for(let s=0;s<e.length;s+=1){const a=e.eq(s),o=a[0].progress,d=Math.min(Math.max(a[0].progress,-r.limitProgress),r.limitProgress);let c=d;l||(c=Math.min(Math.max(a[0].originalProgress,-r.limitProgress),r.limitProgress));const p=a[0].swiperSlideOffset,u=[t.params.cssMode?-p-t.translate:-p,0,0],h=[0,0,0];let m=!1;t.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,m=!0):d>0&&(f=r.prev,m=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`})),h.forEach(((e,t)=>{h[t]=f.rotate[t]*Math.abs(d*n)})),a[0].style.zIndex=-Math.abs(Math.round(o))+e.length;const g=u.join(", "),v=`rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,w=c<0?`scale(${1+(1-f.scale)*c*n})`:`scale(${1-(1-f.scale)*c*n})`,b=c<0?1+(1-f.opacity)*c*n:1-(1-f.opacity)*c*n,x=`translate3d(${g}) ${v} ${w}`;if(m&&f.shadow||!m){let e=a.children(".swiper-slide-shadow");if(0===e.length&&f.shadow&&(e=ie(r,a)),e.length){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e[0].style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const y=se(r,a);y.transform(x).css({opacity:b}),f.origin&&y.css("transform-origin",f.origin)}},setTransition:e=>{const{transformEl:s}=t.params.creativeEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow").transition(e),ae({swiper:t,duration:e,transformEl:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,transformEl:null,rotate:!0}}),te({effect:"cards",swiper:t,on:a,setTranslate:()=>{const{slides:e,activeIndex:s}=t,a=t.params.cardsEffect,{startTranslate:i,isTouched:r}=t.touchEventsData,n=t.translate;for(let l=0;l<e.length;l+=1){const o=e.eq(l),d=o[0].progress,c=Math.min(Math.max(d,-4),4);let p=o[0].swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(p-=e[0].swiperSlideOffset);let u=t.params.cssMode?-p-t.translate:-p,h=0;const m=-100*Math.abs(c);let f=1,g=-2*c,v=8-.75*Math.abs(c);const w=t.virtual&&t.params.virtual.enabled?t.virtual.from+l:l,b=(w===s||w===s-1)&&c>0&&c<1&&(r||t.params.cssMode)&&n<i,x=(w===s||w===s+1)&&c<0&&c>-1&&(r||t.params.cssMode)&&n>i;if(b||x){const e=(1-Math.abs((Math.abs(c)-.5)/.5))**.5;g+=-28*c*e,f+=-.5*e,v+=96*e,h=-25*e*Math.abs(c)+"%"}if(u=c<0?`calc(${u}px + (${v*Math.abs(c)}%))`:c>0?`calc(${u}px + (-${v*Math.abs(c)}%))`:`${u}px`,!t.isHorizontal()){const e=h;h=u,u=e}const y=c<0?""+(1+(1-f)*c):""+(1-(1-f)*c),E=`\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${a.rotate?g:0}deg)\n        scale(${y})\n      `;if(a.slideShadows){let e=o.find(".swiper-slide-shadow");0===e.length&&(e=ie(a,o)),e.length&&(e[0].style.opacity=Math.min(Math.max((Math.abs(c)-.5)/.5,0),1))}o[0].style.zIndex=-Math.abs(Math.round(d))+e.length;se(a,o).transform(E)}},setTransition:e=>{const{transformEl:s}=t.params.cardsEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow").transition(e),ae({swiper:t,duration:e,transformEl:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return V.use(re),V}));
/*!
 * Typer.js v0.1.0
 * https://unpkg.com/typer-dot-js@0.1.0/typer.js
 */
var Typer = function(element) {
  this.element = element;
  var delim = element.dataset.delim || ",";
  var words = element.dataset.words || "override these,sample typing";
  this.words = words.split(delim).filter((v) => v); // non empty words
  this.delayVariance = parseInt(element.dataset.delayVariance) || 0;
  this.delay = parseInt(element.dataset.delay) || 200;
  this.loop = element.dataset.loop || "true";
  if (this.loop === "false" ) { this.loop = 1 }
  this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;

  this.progress = { word: 0, char: 0, building: true, looped: 0 };
  this.typing = true;

  var colors = element.dataset.colors || "black";
  this.colors = colors.split(",");
  this.element.style.color = this.colors[0];
  this.colorIndex = 0;

  this.doTyping();
};

Typer.prototype.start = function() {
  if (!this.typing) {
    this.typing = true;
    this.doTyping();
  }
};
Typer.prototype.stop = function() {
  this.typing = false;
};
Typer.prototype.doTyping = function() {
  var e = this.element;
  var p = this.progress;
  var w = p.word;
  var c = p.char;
  var currentDisplay = [...this.words[w]].slice(0, c).join("");
  var atWordEnd;
  var timeoutDelay = ((2 * Math.random() - 1) * this.delayVariance) + this.delay;
  if (this.cursor) {
    this.cursor.element.style.opacity = "1";
    this.cursor.on = true;
    clearInterval(this.cursor.interval);
    this.cursor.interval = setInterval(() => this.cursor.updateBlinkState(), 400);
  }

  e.innerHTML = currentDisplay;

  if (p.building) {
    atWordEnd = p.char === this.words[w].length;
    if (atWordEnd) {
      p.building = false;
    } else {
      p.char += 1;
    }
  } else {
    if (p.char === 0) {
      p.building = true;
      p.word = (p.word + 1) % this.words.length;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      this.element.style.color = this.colors[this.colorIndex];
    } else {
      p.char -= 1;
    }
  }

  if (p.word === this.words.length - 1) {
    p.looped += 1;
  }

  if (!p.building && this.loop <= p.looped){
    this.typing = false;
  }

  setTimeout(() => {
    if (this.typing) { this.doTyping() };
  }, atWordEnd ? this.deleteDelay : timeoutDelay);
};

var Cursor = function(element) {
  this.element = element;
  this.cursorDisplay = element.dataset.cursordisplay || element.dataset.cursorDisplay || "|";
  element.innerHTML = this.cursorDisplay;
  this.on = true;
  element.style.transition = "all 0.1s";
  this.interval = setInterval(() => this.updateBlinkState(), 400);
}
Cursor.prototype.updateBlinkState = function() {
  if (this.on) {
    this.element.style.opacity = "0";
    this.on = false;
  } else {
    this.element.style.opacity = "1";
    this.on = true;
  }
}

function TyperSetup() {
  var typers = {};
  for (let e of document.getElementsByClassName("typer")) {
    typers[e.id] = new Typer(e);
  }
  for (let e of document.getElementsByClassName("typer-stop")) {
    let owner = typers[e.dataset.owner];
    e.onclick = () => owner.stop();
  }
  for (let e of document.getElementsByClassName("typer-start")) {
    let owner = typers[e.dataset.owner];
    e.onclick = () => owner.start();
  }
  for (let e of document.getElementsByClassName("cursor")) {
    let t = new Cursor(e);
    t.owner = typers[e.dataset.owner];
    //t.owner.cursor = t;
  }
}

TyperSetup();