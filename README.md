# Ez Dialogs

Ez Dialogs is a lightweight library to make using the \<dialog\> element intuitive and easy.

See example usage below, also found in [index.html](index.html):

```
<dialog ez-dialog="main" class="ez-dialog">
  <button ez-dialog-close="main" class="ez-dialog-close">X</button>
  <div ez-dialog-content="main" class="ez-dialog-content">
    <h1>Dialog Example</h1>
    <p>This is an example dialog.</p>
  </div>
</dialog>

<button ez-dialog-trigger="main">Open</button>
```

This library is proudly built with [Vite](https://vite.dev/) and is licensed under the [MIT license](LICENSE).
