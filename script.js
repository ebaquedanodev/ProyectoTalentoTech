
let carrito = [];


const botonesContratar = document.querySelectorAll('.btn-card[data-id]');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const btnVaciar = document.getElementById('btn-vaciar');


function actualizarInterfazCarrito() {
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<p style="color: var(--text-muted); text-align: center;">El carrito está vacío.</p>`;
        totalCarrito.innerText = '$0';
        btnVaciar.style.display = 'none';
        return;
    }

    btnVaciar.style.display = 'block';
    let totalAcumulado = 0;

    carrito.forEach(item => {
        const itemTotal = item.price * item.cantidad;
        totalAcumulado += itemTotal; 

        const li = document.createElement('li');
        li.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.02);";
        
        li.innerHTML = `
            <div>
                <strong style="color: var(--white);">${item.name}</strong> <br>
                <span style="color: var(--text-muted); font-size: 0.85rem;">$${item.price} x ${item.cantidad}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-weight: 600; color: var(--primary);">$${itemTotal}</span>
                <button class="btn-eliminar" data-id="${item.id}" style="background: transparent; border: none; color: #f43f5e; cursor: pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    totalCarrito.innerText = `$${totalAcumulado}`; 
    asignarEventosEliminar();
}


function agregarAlCarrito(e) {
    const boton = e.target;
    const id = boton.getAttribute('data-id');
    const name = boton.getAttribute('data-name');
    const price = parseFloat(boton.getAttribute('data-price'));

    
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id, name, price, cantidad: 1 });
    }

    actualizarInterfazCarrito();
    
   
    console.log(`Agregado: ${name}`);
}


function eliminarDelCarrito(id) {
    
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfazCarrito();
}

function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            
            const id = e.currentTarget.getAttribute('data-id');
            eliminarDelCarrito(id);
        });
    });
}


botonesContratar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});


btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarInterfazCarrito();
});