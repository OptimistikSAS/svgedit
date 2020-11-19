/* eslint-disable node/no-unpublished-import */
import 'elix/define/NumberSpinBox.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    position: relative;
    top: 6px;
  }
  img {
    top: 2px;
    left: 4px;
    position: relative;
  }
  span {
    bottom: 1px;
    right: -4px;
    position: relative;
  }
  </style>
  <img src="./images/logo.svg" alt="icon" width="12" height="12" />
  <span id="label">label</span>
  <elix-number-spin-box min="1" step="1"></elix-number-spin-box>
`;

/**
 * @class SESpinInput
 */
export class SESpinInput extends HTMLElement {
  /**
    * @function constructor
    */
  constructor () {
    super();
    // create the shadowDom and insert the template
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    // locate the component
    this.$img = this._shadowRoot.querySelector('img');
    this.$label = this.shadowRoot.getElementById('label');
    this.$event = new CustomEvent('change');
    this.$input = this._shadowRoot.querySelector('elix-number-spin-box');
  }
  /**
   * @function observedAttributes
   * @returns {any} observed
   */
  static get observedAttributes () {
    return ['value', 'label', 'src', 'size'];
  }
  /**
   * @function attributeChangedCallback
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   * @returns {void}
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
    case 'src':
      this.$img.setAttribute('src', newValue);
      this.$label.remove();
      break;
    case 'size':
      this.$input.setAttribute('size', newValue);
      break;
    case 'step':
      this.$input.setAttribute('step', newValue);
      break;
    case 'min':
      this.$input.setAttribute('min', newValue);
      break;
    case 'max':
      this.$input.setAttribute('max', newValue);
      break;
    case 'label':
      this.$label.textContent = newValue;
      this.$img.remove();
      break;
    case 'value':
      this.$input.value = newValue;
      break;
    default:
      // eslint-disable-next-line no-console
      console.error(`unknown attribute: ${name}`);
      break;
    }
  }
  /**
   * @function get
   * @returns {any}
   */
  get label () {
    return this.getAttribute('label');
  }

  /**
   * @function set
   * @returns {void}
   */
  set label (value) {
    this.setAttribute('label', value);
  }
  /**
   * @function get
   * @returns {any}
   */
  get value () {
    return this.$input.value;
  }

  /**
   * @function set
   * @returns {void}
   */
  set value (value) {
    this.$input.value = value;
  }
  /**
   * @function get
   * @returns {any}
   */
  get src () {
    return this.getAttribute('src');
  }

  /**
   * @function set
   * @returns {void}
   */
  set src (value) {
    this.setAttribute('src', value);
  }

  /**
   * @function get
   * @returns {any}
   */
  get size () {
    return this.getAttribute('size');
  }

  /**
   * @function set
   * @returns {void}
   */
  set size (value) {
    this.setAttribute('size', value);
  }

  /**
   * @function connectedCallback
   * @returns {void}
   */
  connectedCallback () {
    this.addEventListener('change', (e) => {
      e.preventDefault();
      this.value = e.target.value;
    });
    this.dispatchEvent(this.$event);
  }
}

// Register
customElements.define('se-spin-input', SESpinInput);

/* TO DO
  Call back for fontsize
  function stepFontSize (elem, step) {
    const origVal = Number(elem.value);
    const sugVal = origVal + step;
    const increasing = sugVal >= origVal;
    if (step === 0) { return origVal; }

    if (origVal >= 24) {
      if (increasing) {
        return Math.round(origVal * 1.1);
      }
      return Math.round(origVal / 1.1);
    }
    if (origVal <= 1) {
      if (increasing) {
        return origVal * 2;
      }
      return origVal / 2;
    }
    return sugVal;
  }
  */
