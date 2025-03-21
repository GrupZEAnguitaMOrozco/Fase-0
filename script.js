//Aquesta part serveix per que el fons es posi de color negre amb un boto.
if(document.getElementById('container')){
    var toggle = document.getElementById('container');
    var body = document.querySelector('body');
    
    toggle.onclick = function(){
        toggle.classList.toggle('active');
        body.classList.toggle('active');
    }
    }
    
    // Aquest script serveix per a que les imatges de la pagina principal es vagin canviant cada 5 segons.
    document.addEventListener("DOMContentLoaded",function (){
        const images = document.querySelectorAll(".image-controller img");
        let index = 0;
    
        function changeImage(){
          images.forEach(img => img.classList.remove("active"));
          index = (index + 1) % images.length;
          images[index].classList.add("active");
    }
    
        setInterval(changeImage, 3000)
    });
    
    // Aquesta part de l'script serveix per a que a la pàgina de disseny del comandament de PS5 i XBOX es puguin cambiar els colors personalitzables
    document.addEventListener("DOMContentLoaded", function () {
        const colors = document.querySelectorAll(".color");
        const controllerImage = document.querySelector(".img-white");
    
        const isPS5Page = window.location.pathname.includes("x-design-ps5");
        const isXboxPage = window.location.pathname.includes("x-design-xbox");
    
        const ps5Images = {
            white: "mando2PS5.png",
            black: "mandonegro.png",
            red: "mandorojo.png",
            blue: "mandoazul.png",
            green: "mandoverde.png",
        };
    
        const xboxImages = {
            white: "mandoblancoxbox.png",
            black: "mandonegroxbox.png",
            red: "mandorojoxbox.png",
            blue: "mandoazulxbox.png",
            green: "mandoverdexbox.png",
        };
    
        colors.forEach(color => {
            color.addEventListener("click", function () {
                const selectedColor = this.classList[2];
    
                if (isPS5Page) {
                    controllerImage.src = ps5Images[selectedColor];
                } else if (isXboxPage) {
                    controllerImage.src = xboxImages[selectedColor];
                }
            });
        });
    });
    
    // Aquesta part es per a que el nostre botó per escollir la quantitat a comprar funcioni correctament.
        document.addEventListener("DOMContentLoaded", function () {
            const btnSumar = document.querySelector(".btn-sumar");
            const btnRestar = document.querySelector(".btn-restar");
            const quantityDisplay = document.querySelector(".quantity");
            const btnComprar = document.querySelector(".btn-comprar");
            const controllerImage = document.querySelector(".img-white");
    
            let quantity = 0;
    
            function updateQuantity() {
                quantityDisplay.textContent = quantity;
            }
    
            btnSumar.addEventListener("click", function () {
                quantity++;
                updateQuantity();
            });
    
            btnRestar.addEventListener("click", function () {
                if (quantity > 0) {
                    quantity--;
                    updateQuantity();
                }
            });
    // A partir d'aqui és per a que els elements comprats vagin directament cap a la nostre cistella
            btnComprar.addEventListener("click", function () {
                if (quantity === 0) {
                    alert("Selecciona al menos un mando antes de comprar.");
                    return;
                }    
                const selectedColor = document.querySelector(".color-options .selected");
                const colorName = selectedColor ? selectedColor.classList[2] : "white";
    
                const controllerSrc = controllerImage.src;
    
                const producto = {
                    nombre: "PS5 DualSense",
                    color: colorName,
                    cantidad: quantity,
                    precio: 64.99,
                    imagen: controllerSrc
                };
    // Aquesta part ens servira per a que quan afegim un article a la cistella, ens surti un missatge a la part superior de la web avisant-nos
                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                carrito.push(producto);
                localStorage.setItem("carrito", JSON.stringify(carrito));
    
                alert(`Se añadieron ${quantity} mandos ${colorName.toUpperCase()} al carrito.`);
    
                quantity = 0;
                updateQuantity();
            });
    
            const colors = document.querySelectorAll(".color");
            colors.forEach(color => {
                color.addEventListener("click", function () {
                    colors.forEach(c => c.classList.remove("selected"));
                    this.classList.add("selected");
                });
            });
         });
    // Aqui veurem si la nostre cistella es buida o conté alguns elements
    document.addEventListener("DOMContentLoaded", function(){
        const carritoContainer = document.querySelector(".carrito-container");
        const btnComprar = document.querySelector(".btn-comprar");
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        function mostrarCarrito() {
            carritoContainer.innerHTML = "";
            if (carrito.length === 0) {
                carritoContainer.innerHTML = "<span> La teva cistella està buida. </buida>"
                return;
            }
            carrito.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("carrito-item");
                itemElement.innerHTML = `
                     <img src="${item.imagen}" alt="${item.nombre}" width="100">
                <span>${item.nombre} (${item.color}) - ${item.precio}€</span>
                <button class="decrementar" data-index="${index}">-</button>
                <span>Quantitat: ${item.cantidad}</span>
                <button class="incrementar" data-index="${index}">+</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            carritoContainer.appendChild(itemElement);
        });

        document.querySelectorAll(".incrementa").forEach(btn => {
            btn.addEventListener("click", incrementarCantidad);
        });

        document.querySelectorAll(".decrementar").forEach(btn => {
            btn.addEventListener("click", decrementarCantidad);
        });
        
        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", eliminarDelCarrito);
        });
    }

    function incrementarCantidad(event) {
        let index = event.target.dataset.index;
        carrito[index].cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }

    function decrementarCantidad(event){
        let index = event.target.dataset.index;
        if (carrito[index].cantidad > 1){
            carrito[index].cantidad --;
        } else{
            carrito.splice(index,1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }

    function eliminarDelCarrito(event){
        let index = event.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
    if (btnComprar) {
        btnComprar.addEventListener("click", function () {
            if (carrito.length === 0) {
                return; 
            }

            carrito = []; 
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
            alert("Compra realitzada amb exit! Gracies per confiar en nosaltres 🛒🎉");
        });
    }

    mostrarCarrito();
});

document.addEventListener("DOMContentLoaded",function(){
    if(document.querySelector(".productos")) {
        console.log("Página de productos detectada.");

        const botonesAgregar = document.querySelectorAll(".boton");
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", function () {
                const producto = boton.parentElement;
                const nombre = producto.querySelector("h2").textContent;
                const precio = producto.querySelector(".precio").textContent.replace("€", "");
                const imagen = producto.querySelector("img").src;

                let itemEnCarrito = carrito.find(item => item.nombre === nombre);
                if (itemEnCarrito) {
                    itemEnCarrito.cantidad++;
                } else {
                    carrito.push({ nombre, precio, imagen, cantidad: 1 });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert(`${nombre} s'ha afegit a la cistella 🛒`);
            });
        });
    }

    
    if (document.querySelector(".carrito-container")) {
        console.log("Página del carrito detectada.");
        
        const carritoContainer = document.querySelector(".carrito-container");
        const btnComprar = document.querySelector(".btn-comprar");
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        function mostrarCarrito() {
            carritoContainer.innerHTML = "";
            if (carrito.length === 0) {
                carritoContainer.innerHTML = "<span> La teva cistella està buida. </span>";
                return;
            }

            carrito.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("carrito-item");
                itemElement.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}" width="100">
                    <span>${item.nombre} - ${item.precio}€</span>
                    <button class="decrementar" data-index="${index}">-</button>
                    <span>Quantitat: ${item.cantidad}</span>
                    <button class="incrementar" data-index="${index}">+</button>
                    <button class="eliminar" data-index="${index}">Eliminar</button>
                `;
                carritoContainer.appendChild(itemElement);
            });

            document.querySelectorAll(".incrementar").forEach(btn => {
                btn.addEventListener("click", incrementarCantidad);
            });

            document.querySelectorAll(".decrementar").forEach(btn => {
                btn.addEventListener("click", decrementarCantidad);
            });

            document.querySelectorAll(".eliminar").forEach(btn => {
                btn.addEventListener("click", eliminarDelCarrito);
            });
        }

        function incrementarCantidad(event) {
            let index = event.target.dataset.index;
            carrito[index].cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        function decrementarCantidad(event) {
            let index = event.target.dataset.index;
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1);
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        function eliminarDelCarrito(event) {
            let index = event.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }
        mostrarCarrito();
    }
});
