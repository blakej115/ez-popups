import EzDialog from "./ez-dialog";

const ezDialogs = [...document.querySelectorAll("[ez-dialog]")].map(
  (elem: Element) => new EzDialog(<HTMLDialogElement>elem)
);

export default ezDialogs;
