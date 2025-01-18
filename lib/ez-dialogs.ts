import "./style.css";
import EzDialog from "./ez-dialog";

type AllEzDialogs = {
  [key: string]: EzDialog;
};

class EzDialogs {
  dialogs: AllEzDialogs;

  constructor() {
    this.dialogs = ([...document.querySelectorAll("[ez-dialog]")] as HTMLDialogElement[]).reduce(this.#reduceDialogs, {});
  }

  #reduceDialogs = (allDialogs: AllEzDialogs, elem: HTMLDialogElement): AllEzDialogs => {
    const name = EzDialog.defaultName(elem);
    allDialogs[name] = new EzDialog(elem);
    return allDialogs;
  };
}

export { EzDialogs as default, EzDialog };
