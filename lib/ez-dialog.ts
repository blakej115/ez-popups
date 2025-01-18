type Config = {
  name?: string;
  clickOutsideClose?: boolean;
};

export default class EzDialog {
  elem: HTMLDialogElement;
  config: Config;
  triggers: Element[];
  closes: Element[];
  contents: Element[];

  constructor(
    elem: HTMLDialogElement,
    config: Config = {
      name: elem.getAttribute("ez-dialog") ?? "",
      clickOutsideClose: true,
    }
  ) {
    this.elem = elem;
    this.config = config;

    this.triggers = [...document.querySelectorAll(`[ez-dialog-trigger="${this.config.name}"]`)];
    this.closes = [...document.querySelectorAll(`[ez-dialog-close="${this.config.name}"]`)];
    this.contents = [...document.querySelectorAll(`[ez-dialog-content="${this.config.name}"]`)];

    this.initEvents();
  }

  initEvents() {
    this.triggers.forEach((trigger: Element) => {
      trigger.addEventListener("click", () => {
        this.elem.showModal();
      });
    });

    this.closes.forEach((close: Element) => {
      close.addEventListener("click", () => {
        this.elem.close();
      });
    });

    if (!this.config.clickOutsideClose) return;

    this.elem.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as Element).closest(`[ez-dialog-content="${this.config.name}"]`)) {
        this.elem.close();
      }
    });
  }
}
