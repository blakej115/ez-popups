import "../lib/style.css";
import EzDialog from "../lib/ez-dialog";

const ezDialogs = [...document.querySelectorAll("[ez-dialog]")].map(
  (elem: Element) => {
    const dialogElem = elem as HTMLDialogElement;
    return new EzDialog(dialogElem, dialogElem.getAttribute("ez-dialog")!);
  }
);

export default ezDialogs;
