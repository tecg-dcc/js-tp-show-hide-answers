/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   ButtonExpand.js
*
*   Desc:   Checkbox widget that implements ARIA Authoring Practices
*           for a menu of links
*/

/*
*   @constructor ButtonExpand
*
*
*/


class ButtonExpand {
  constructor(domNode) {
    this.domNode = domNode;
    this.keyCode = 13;
  }

  init() {
    this.controlledNode = false;

    var id = this.domNode.getAttribute('aria-controls');

    if (id) {
      this.controlledNode = document.getElementById(id);
    }

    this.domNode.setAttribute('aria-expanded', 'false');
    this.hideContent();

    this.domNode.addEventListener('keydown', () => {
      this.handleKeydown();
    });
    this.domNode.addEventListener('click', () => {
      this.handleClick();
    });
    this.domNode.addEventListener('focus', () => {
      this.handleFocus();
    });
    this.domNode.addEventListener('blur', () => {
      this.handleBlur();
    });
  }

  showContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = 'block';
    }
  }

  hideContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = 'none';
    }
  }

  toggleExpand() {
    if (this.domNode.getAttribute('aria-expanded') === 'true') {
      this.domNode.setAttribute('aria-expanded', 'false');
      this.hideContent();
    } else {
      this.domNode.setAttribute('aria-expanded', 'true');
      this.showContent();
    }
  }

  handleKeydown() {
    console.log('[keydown]');
    if (event.keyCode === this.keyCode) {
      this.toggleExpand();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick() {
    this.toggleExpand();
  }

  handleFocus() {
    this.domNode.classList.add('focus');
  }

  handleBlur() {
    this.domNode.classList.remove('focus');
  }
}

/*
remove .browserupgrade,
*/

document.documentElement.classList.add('js-enabled');

/* Initialize Hide/Show Buttons */
window.addEventListener('load', function (event) {

  const buttons = document.querySelectorAll('button[aria-expanded][aria-controls]');
  for (let i = 0; i < buttons.length; i++) {
    const be = new ButtonExpand(buttons[i]);
    be.init();
  }

}, false);