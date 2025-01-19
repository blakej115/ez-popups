type EzDialogElems = NodeListOf<HTMLElement> | HTMLElement | string;

type EzDialogConfig = {
  name?: string;
  backdropClose?: boolean;
  triggersRef?: EzDialogElems;
  closesRef?: EzDialogElems;
  contentsRef?: string;
};

type EzDialogOptionalElem = HTMLDialogElement | null | undefined;

export default class EzDialog {
  elem!: HTMLDialogElement;
  config!: Required<EzDialogConfig>;
  triggerElems!: Element[];
  closeElems!: Element[];

  constructor(elemRef: EzDialogElems, config: EzDialogConfig = {}) {
    this.create(elemRef, config);
  }

  static defaultName(elem?: EzDialogOptionalElem): string {
    return elem?.getAttribute("ez-dialog") ?? "";
  }

  static mergeConfig(elem: EzDialogOptionalElem, config?: EzDialogConfig): Required<EzDialogConfig> {
    const name = config?.name ?? EzDialog.defaultName(elem);

    return {
      name,
      backdropClose: config?.backdropClose ?? elem?.getAttribute("ez-dialog-bd-close") === "false" ? false : true,
      triggersRef: config?.triggersRef ?? elem?.getAttribute("ez-dialog-triggers") ?? `[ez-dialog-trigger="${name}"]`,
      closesRef: config?.closesRef ?? elem?.getAttribute("ez-dialog-closes") ?? `[ez-dialog-close="${name}"]`,
      contentsRef: config?.contentsRef ?? elem?.getAttribute("ez-dialog-contents") ?? `[ez-dialog-content="${name}"]`,
    };
  }

  setVars(elemRef: EzDialogElems, config: EzDialogConfig = this.config) {
    this.elem = EzDialog.getElems(elemRef)[0] as HTMLDialogElement;
    this.config = EzDialog.mergeConfig(this.elem, config);

    this.triggerElems = EzDialog.getElems(this.config.triggersRef);
    this.closeElems = EzDialog.getElems(this.config.closesRef);
  }

  bindThis() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeBackdrop = this.closeBackdrop.bind(this);
  }

  addEventListeners() {
    this.triggerElems.forEach((trigger: Element) => trigger.addEventListener("click", this.open));
    this.closeElems.forEach((close: Element) => close.addEventListener("click", this.close));

    if (!this.config.backdropClose) return;

    this.elem.addEventListener("click", this.closeBackdrop);
  }

  create(elemRef: EzDialogElems, config: EzDialogConfig = this.config) {
    this.setVars(elemRef, config);

    this.bindThis();

    this.addEventListeners();
  }

  static getElems(elemRef: EzDialogElems): Element[] {
    if (elemRef instanceof HTMLElement) return [elemRef];

    if (elemRef instanceof HTMLCollection) return [...elemRef];

    return [...document.querySelectorAll(elemRef as string)];
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

  removeEventListeners() {
    this.triggerElems.forEach((trigger: Element) => trigger.removeEventListener("click", this.open));
    this.closeElems.forEach((close: Element) => close.removeEventListener("click", this.close));

    if (!this.config.backdropClose) return;

    this.elem.removeEventListener("click", this.closeBackdrop);
  }

  destroy() {
    this.removeEventListeners();
  }
}
