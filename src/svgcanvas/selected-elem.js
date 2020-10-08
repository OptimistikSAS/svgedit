/**
 * Tools for SVG selected element operation.
 * @module selected-elem
 * @license MIT
 *
 * @copyright 2010 Alexis Deveria, 2010 Jeff Schiller
 */
import jQueryPluginSVG from '../common/jQuery.attr.js'; // Needed for SVG attribute 
import * as hstry from './history.js';
import {
  isNullish, getStrokedBBoxDefaultVisible
} from '../common/utilities.js';
const {
  MoveElementCommand
} = hstry;
let $ = jQueryPluginSVG(jQuery);

let elementContext_ = null;

/**
* @function module:selected-elem.init
* @param {module:selected-elem.elementContext} elementContext
* @returns {void}
*/
export const init = function (elementContext) {
  elementContext_ = elementContext;
};

/**
* Repositions the selected element to the bottom in the DOM to appear on top of
* other elements.
* @function module:selected-elem.SvgCanvas#moveToTopSelectedElem
* @fires module:selected-elem.SvgCanvas#event:changed
* @returns {void}
*/
export const moveToTopSelectedElem = function () {
  const [selected] = elementContext_.getSelectedElements();
  if (!isNullish(selected)) {
    let t = selected;
    const oldParent = t.parentNode;
    const oldNextSibling = t.nextSibling;
    t = t.parentNode.appendChild(t);
    // If the element actually moved position, add the command and fire the changed
    // event handler.
    if (oldNextSibling !== t.nextSibling) {
      elementContext_.addCommandToHistory(new MoveElementCommand(t, oldNextSibling, oldParent, 'top'));
      elementContext_.call('changed', [t]);
    }
  }
};

/**
* Repositions the selected element to the top in the DOM to appear under
* other elements.
* @function module:svgcanvas.SvgCanvas#moveToBottomSelectedElement
* @fires module:svgcanvas.SvgCanvas#event:changed
* @returns {void}
*/
export const moveToBottomSelectedElem = function () {
  const [selected] = elementContext_.getSelectedElements();
  if (!isNullish(selected)) {
    let t = selected;
    const oldParent = t.parentNode;
    const oldNextSibling = t.nextSibling;
    let {firstChild} = t.parentNode;
    if (firstChild.tagName === 'title') {
      firstChild = firstChild.nextSibling;
    }
    // This can probably be removed, as the defs should not ever apppear
    // inside a layer group
    if (firstChild.tagName === 'defs') {
      firstChild = firstChild.nextSibling;
    }
    t = t.parentNode.insertBefore(t, firstChild);
    // If the element actually moved position, add the command and fire the changed
    // event handler.
    if (oldNextSibling !== t.nextSibling) {
      elementContext_.addCommandToHistory(new MoveElementCommand(t, oldNextSibling, oldParent, 'bottom'));
      elementContext_.call('changed', [t]);
    }
  }
};

/**
* Moves the select element up or down the stack, based on the visibly
* intersecting elements.
* @function module:svgcanvas.SvgCanvas#moveUpDownSelected
* @param {"Up"|"Down"} dir - String that's either 'Up' or 'Down'
* @fires module:svgcanvas.SvgCanvas#event:changed
* @returns {void}
*/
export const moveUpDownSelected = function (dir) {
  console.log('moveUpDownSelected -----> ');
  const selectedElements = elementContext_.getSelectedElements();
  const selected = selectedElements[0];
  if (!selected) { return; }

  elementContext_.setCurBBoxes([]);
  // curBBoxes = [];
  let closest, foundCur;
  // jQuery sorts this list
  const list = $(elementContext_.getIntersectionList(getStrokedBBoxDefaultVisible([selected]))).toArray();
  if (dir === 'Down') { list.reverse(); }

  $.each(list, function () {
    if (!foundCur) {
      if (this === selected) {
        foundCur = true;
      }
      return true;
    }
    closest = this;
    return false;
  });
  if (!closest) { return; }

  const t = selected;
  const oldParent = t.parentNode;
  const oldNextSibling = t.nextSibling;
  $(closest)[dir === 'Down' ? 'before' : 'after'](t);
  // If the element actually moved position, add the command and fire the changed
  // event handler.
  if (oldNextSibling !== t.nextSibling) {
    elementContext_.addCommandToHistory(new MoveElementCommand(t, oldNextSibling, oldParent, 'Move ' + dir));
    elementContext_.call('changed', [t]);
  }
};