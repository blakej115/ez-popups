export default class EzDialog {
  elem: HTMLDialogElement;
  name: string;
  triggers: Element[];
  closes: Element[];
  contents: Element[];

  constructor(elem: HTMLDialogElement, name: string) {
    this.elem = elem;
    this.name = name;

    this.triggers = [
      ...document.querySelectorAll(`[ez-dialog-trigger="${name}"]`),
    ];
    this.closes = [...document.querySelectorAll(`[ez-dialog-close="${name}"]`)];
    this.contents = [
      ...document.querySelectorAll(`[ez-dialog-content="${name}"]`),
    ];

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

    this.elem.addEventListener("click", (e: MouseEvent) => {
      if (
        !(e.target as Element).closest(`[ez-dialog-content="${this.name}"]`)
      ) {
        this.elem.close();
      }
    });
  }
}
