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
    ::slotted([slot="title"]) {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
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
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
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
    this._shadowRoot = this.attachShadow({mode: 'closed'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$menu = this._shadowRoot.querySelector('.menu');
    this.$title = this._shadowRoot.querySelector('slot[name="title"]');
    this.$item = this._shadowRoot.querySelector('slot[name="item"]');
    this.$title.addEventListener('click', () => {
      this.open = !this.open;
      this.open
        ? this.$menu.classList.remove('closed')
        : this.$menu.classList.add('closed');
    });
    this.$item.addEventListener('click', (event) => {
      if (event.target.getAttribute('data-val')) {
        window.editor.canvas.zoomChanged(window, event.target.getAttribute('data-val'));
      } else {
        const ctl = {value: Number.parseFloat(event.target.getAttribute('data-per'))};
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
    });
  }
}

// Register
customElements.define('se-dropdown', SEDropDown);
