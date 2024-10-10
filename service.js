if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Registro de SW exitoso"))
        .then(err => console.warn("Error al tratar de registrar el sw"))
}