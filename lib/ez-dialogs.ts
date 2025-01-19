import "./style.css";
import EzDialog from "./ez-dialog";

type EzDialogsAll = {
  [key: string]: EzDialog;
};

class EzDialogs {
  dialogs: EzDialogsAll;

  constructor() {
    this.dialogs = ([...document.querySelectorAll("[ez-dialog]")] as HTMLDialogElement[]).reduce(this.#reduceDialogs, {});
  }

  #reduceDialogs = (allDialogs: EzDialogsAll, elem: HTMLDialogElement): EzDialogsAll => {
    const name = EzDialog.defaultName(elem);
    allDialogs[name] = new EzDialog(elem, {
      name,
    });
    return allDialogs;
  };
}

export { EzDialogs as default, EzDialog };
