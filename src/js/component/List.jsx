import React, { useState } from "react";

const List = () => {
    const [inputValue, setInputValue] = useState(""); 
    const [todoList, setTodoList] = useState([]);   
    const [estado, setEstado] = useState(false);     

    const numTareas = todoList.length;

    // FUNCIONES PARA QUE APAREZCA O NO EL ELEMENTO
    function mauseEncimaElemento(index) {
        setEstado(index); // Muestra el botón de eliminar al pasar el mouse sobre un elemento
    }

    function mauseFueraElemento() {
        setEstado(false); // Oculta el botón de eliminar cuando el mouse sale del elemento
    }

    
    // FUNCION PARA ELIMINAR UNA TAREA LOCALMENTE
    function eliminarTareaLocal(index) {
        const resultado = todoList.filter((_, i) => i !== index); // Filtra la tarea que no quieres eliminar
        setTodoList(resultado); // Actualiza el estado con la nueva lista
    }


    // FUNCION PARA LIMPIAR TODAS LAS TAREAS
    function limpiarTodoList() {
        setTodoList([]); // Vacía la lista de tareas
    }



    // FUNCION PARA CREAR UNA NUEVA TAREA LOCAL
    function creartodoList(item) {
        const nuevaLista = [...todoList, { label: item }]; // Añade la nueva tarea a la lista
        setTodoList(nuevaLista);  // Actualiza el estado con la nueva lista
    }



    // Manejar el submit del formulario
    async function onSubmit(e) {
        e.preventDefault();
        const newValue = inputValue.trim();
        if (newValue && !todoList.some(task => task.label.toLowerCase() === newValue.toLowerCase())) {
            creartodoList(newValue); // Si la tarea no existe, crearla
            setInputValue(''); // Limpiar el input
        } else {
            alert("¡Esta tarea ya existe!");
        }
    }

    return (
        <div className="container w-80 text-center">
            <label htmlFor="exampleInputEmail1" className="form-label"
                style={{ fontSize: "35px", paddingTop: "15px" }}>TodoList</label>
            <div className="container-flex lavenderBlush border myStyle">
                <form onSubmit={onSubmit}>
                    <div className="container-flex border-bottom p-1">
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            required
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && inputValue.trim() !== "") {
                                    onSubmit(e); 
                                }
                            }}
                            placeholder="Escribe una tarea a realizar"
                        />
                    </div>
                </form>

                <ul className="list-group list-group-flush">
                    {todoList.length === 0 ? (
                        <p className="text-center pt-3">No hay tareas</p>
                    ) : (
                        todoList.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item lavenderBlush d-flex justify-content-between align-items-center"
                                onMouseOver={() => mauseEncimaElemento(index)}
                                onMouseOut={() => mauseFueraElemento()}
                            >
                                {item.label}
                                {estado === index && (
                                    <button
                                        className="btn" onClick={() => eliminarTareaLocal(index)}>
                                        <svg
                                            className="clear"
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </button>
                                )}
                            </li>
                        ))
                    )}
                </ul>

                <div className="pt-3 ps-2 border-top d-flex justify-content-around">
                    Tareas pendientes: {numTareas}
                    <button className="btn" onClick={limpiarTodoList}>Limpiar</button>
                </div>
            </div>
            <div style={{ height: "3px", borderRadius: "3px" }} className="lavenderBlush border mx-1"></div>
            <div style={{ height: "3px", borderRadius: "3px" }} className="lavenderBlush border mx-2"></div>
        </div>
    );
};

export default List;
