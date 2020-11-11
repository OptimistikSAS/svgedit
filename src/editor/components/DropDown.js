const template = document.createElement('template');
template.innerHTML = `
<style>
    ::slotted(se-dropdown-item) {
      display: block;
      width: 120px;
      padding: 4px;
      background: #E8E8E8;
      border: 1px solid #B0B0B0;
      margin: 0 0 -1px 0;
      line-height: 16px;
    }
    button {
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        padding: 1px 3px;
        margin-left: 3px;
    }
    .menu ul{
      list-style: none;
      position: absolute;
      margin: 0;
      padding: 0;
      left: -85px;
      top: 26px;
      z-index: 4;
    }
    .dropup ul {
      top: auto;
      bottom: 24px;
    }

    .closed ul {
        display: none;
    }
    </style>
  <div class="menu dropup closed">
    <button>
      <img class="svg_icon" src="./images/arrow-down.svg" alt="icon" width="7" height="7" />
    </button>
    <ul class="se-dropdown-items"><slot></slot></ul>
  </div>
`;
/**
 * @class SEDropDown
 */
export class SEDropDown extends HTMLElement {
  /**
    * @function constructor
    */
  constructor () {
    super();
    this.open = false;
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$menu = this._shadowRoot.querySelector('.menu');
    this.$button = this._shadowRoot.querySelector('button');
    this.$items = this._shadowRoot.querySelector('.se-dropdown-items');
    // the last element of the div is the slot
    // we retrieve all elements added in the slot (i.e. se-dropdown-item)
    this.$elements = this.$items.lastElementChild.assignedElements();
  }
  /**
   * @function connectedCallback
   * @returns {void}
   */
  connectedCallback () {
    const onClickHandler = (ev) => {
      ev.stopPropagation();
      switch (ev.target.nodeName) {
      case 'SE-DROPDOWN-ITEM':
        if (ev.target.getAttribute('data-val')) {
          window.editor.canvas.zoomChanged(window, ev.target.getAttribute('data-val'));
        } else {
          const ctl = {value: Number.parseFloat(ev.target.getAttribute('data-per'))};
          const zoomlevel = ctl.value / 100;
          if (zoomlevel < 0.001) {
            ctl.value = 0.1;
            return;
          }
          const zoom = window.editor.canvas.getZoom();
          const wArea = document.getElementById('workarea');
          window.editor.canvas.zoomChanged(window, {
            width: 0,
            height: 0,
            // center pt of scroll position
            x: (wArea.scrollLeft + wArea.clientWidth / 2) / zoom,
            y: (wArea.scrollTop + wArea.clientHeight / 2) / zoom,
            zoom: zoomlevel
          }, true);
        }
        break;
      case 'BUTTON':
      case 'IMG':
        this.open = !this.open;
        this.open
          ? this.$menu.classList.remove('closed')
          : this.$menu.classList.add('closed');
        break;
      }
    };
    this.addEventListener('click', onClickHandler);
    this.$button.addEventListener('click', onClickHandler);
  }
}

// Register
customElements.define('se-dropdown', SEDropDown);
