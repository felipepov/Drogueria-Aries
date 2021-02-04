import {elements} from './base.js';

export const deleteProduct = id => {
    if (id) {
        const el = document.querySelector(`#${id}`);
        if (el) el.parentElement.removeChild(el);
    }
}