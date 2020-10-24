const template = document.createElement('template');
template.innerHTML = `
<style>
    ::slotted(tool-dropdown-item) {
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
 * @class ToolDropDown
 */
export class ToolDropDown extends HTMLElement {
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
      console.log('onclcik event item');
      console.log(event.target);
      console.log(event.target.getAttribute('data-val'));
      //console.log(editor);
      //editor.zoomChanged(window, event.target.getAttribute('data-val'));
    });
  }

}

// Register
customElements.define('tool-dropdown', ToolDropDown);
