/**
 * Date: 4/20/20
 */
export function getComputedStyle(el, key) {
    return el && el.currentStyle ? el.currentStyle[key] : window.getComputedStyle ? window.getComputedStyle(el, void 0).getPropertyValue(key) : el.style[key];
}