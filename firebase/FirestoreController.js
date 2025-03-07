import { addDoc, collection, onSnapshot, query, QuerySnaphot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, TODOS_REF } from "./Config";

export function useFireTodos(){
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        const q = query(collection(db, TODOS_REF));

        onSnapshot(q, querySnaphot => {
            setTodos( querySnaphot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        });
    }, []);

    return todos;
}

export function addTodo(todoText){

    if(todoText.trim() !== '')
    addDoc( collection(db, TODOS_REF), {done:false, todoText } )
        .catch(error => console.log(error.message));
};