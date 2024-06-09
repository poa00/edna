/** @typedef {{
  openSettings: () => void,
  openLanguageSelector: () => void,
  openCreateNewNote: () => void,
  openNoteSelector: () => void,
  openHistorySelector: () => void,
  createScratchNote: () => void,
  openContextMenu: (ev: MouseEvent) => void,
}} GlobalFuncs
*/

// it's easier to make some functions from App.vue available this way
// then elaborate scheme of throwing and catching events
// could also use setContext()
/** @type {GlobalFuncs} */
let globalFunctions;

/**
 * @param {GlobalFuncs} gf
 */
export function setGlobalFuncs(gf) {
  globalFunctions = gf;
}

export function openSettings() {
  globalFunctions.openSettings();
}

export function openLanguageSelector() {
  globalFunctions.openLanguageSelector();
}
export function openCreateNewNote() {
  globalFunctions.openCreateNewNote();
}
export function openNoteSelector() {
  globalFunctions.openNoteSelector();
}
export function openHistorySelector() {
  globalFunctions.openHistorySelector();
}
export function createScratchNote() {
  globalFunctions.createScratchNote();
}
/**
 * @param {MouseEvent} ev
 */
export function openContextMenu(ev) {
  globalFunctions.openContextMenu(ev);
}
