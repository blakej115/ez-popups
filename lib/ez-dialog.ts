type EzDialogElems = NodeListOf<HTMLElement> | HTMLElement | string;

type EzDialogConfig = {
  name?: string;
  autoCreate?: boolean;
  backdropClose?: boolean;
  triggersRef?: EzDialogElems;
  closesRef?: EzDialogElems;
  contentsRef?: string;
};

type EzDialogOptionalElem = HTMLDialogElement | null | undefined;

export default class EzDialog {
  state: "created" | "destroyed" | null = null;
  elem: HTMLDialogElement;
  config: Required<EzDialogConfig>;
  triggerElems: Element[] = [];
  closeElems: Element[] = [];

  constructor(elemRef: EzDialogElems, config: EzDialogConfig = {}) {
    this.elem = EzDialog.getElems(elemRef)[0] as HTMLDialogElement;
    this.config = EzDialog.mergeConfig(this.elem, config);

    if (this.config.autoCreate === false) return;

    this.create();
  }

  static defaultName(elem?: EzDialogOptionalElem): string {
    return elem?.getAttribute("ez-dialog") ?? "";
  }

  static mergeConfig(elem?: EzDialogOptionalElem, config?: EzDialogConfig): Required<EzDialogConfig> {
    const name = config?.name ?? EzDialog.defaultName(elem);

    return {
      name,
      autoCreate: config?.autoCreate ?? elem?.getAttribute("ez-dialog-auto") === "false" ? false : true,
      backdropClose: config?.backdropClose ?? elem?.getAttribute("ez-dialog-bd-close") === "false" ? false : true,
      triggersRef: config?.triggersRef ?? elem?.getAttribute("ez-dialog-triggers") ?? `[ez-dialog-trigger="${name}"]`,
      closesRef: config?.closesRef ?? elem?.getAttribute("ez-dialog-closes") ?? `[ez-dialog-close="${name}"]`,
      contentsRef: config?.contentsRef ?? elem?.getAttribute("ez-dialog-contents") ?? `[ez-dialog-content="${name}"]`,
    };
  }

  setElems() {
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

  create() {
    if (this.state === "created") return;

    this.setElems();

    this.bindThis();

    this.addEventListeners();

    this.state = "created";
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
    if (this.state === "destroyed") return;

    this.removeEventListeners();

    this.state = "destroyed";
  }
}
