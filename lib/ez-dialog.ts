type EzDialogElems = NodeListOf<HTMLElement> | HTMLElement | string;

type EzDialogConfig = {
  name?: string;
  backdropClose?: boolean;
  triggersRef?: EzDialogElems;
  closesRef?: EzDialogElems;
  contentsRef?: string;
};

export default class EzDialog {
  elem: HTMLDialogElement;
  config: Required<EzDialogConfig>;
  triggerElems: Element[];
  closeElems: Element[];

  constructor(elemRef: EzDialogElems, config: EzDialogConfig = {}) {
    this.elem = EzDialog.getElems(elemRef)[0] as HTMLDialogElement;

    this.config = { ...EzDialog.defaultConfig(this.elem), ...config };

    this.triggerElems = EzDialog.getElems(this.config.triggersRef);
    this.closeElems = EzDialog.getElems(this.config.closesRef);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeBackdrop = this.closeBackdrop.bind(this);

    this.addEventListeners();
  }

  static getElems(elemRef: EzDialogElems): Element[] {
    if (elemRef instanceof HTMLElement) return [elemRef];

    if (elemRef instanceof HTMLCollection) return [...elemRef];

    return [...document.querySelectorAll(elemRef as string)];
  }

  static defaultName(elem: HTMLDialogElement): string {
    return elem.getAttribute("ez-dialog") ?? "";
  }

  static defaultConfig(elem: HTMLDialogElement): Required<EzDialogConfig> {
    const name = EzDialog.defaultName(elem);

    return {
      name: name,
      backdropClose: elem.getAttribute("ez-dialog-bd-close") !== "false" ? true : false,
      triggersRef: elem.getAttribute("ez-dialog-triggers") ?? `[ez-dialog-trigger="${name}"]`,
      closesRef: elem.getAttribute("ez-dialog-closes") ?? `[ez-dialog-close="${name}"]`,
      contentsRef: elem.getAttribute("ez-dialog-contents") ?? `[ez-dialog-content="${name}"]`,
    };
  }

  open() {
    this.elem.showModal();
  }

  close() {
    this.elem.close();
  }

  closeBackdrop(e: MouseEvent) {
    if (!(e.target as Element).closest(this.config.contentsRef)) {
      this.close();
    }
  }

  addEventListeners() {
    this.triggerElems.forEach((trigger: Element) => trigger.addEventListener("click", this.open));
    this.closeElems.forEach((close: Element) => close.addEventListener("click", this.close));

    if (!this.config.backdropClose) return;

    this.elem.addEventListener("click", this.closeBackdrop);
  }
}
