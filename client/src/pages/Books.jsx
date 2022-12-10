import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

  const Books = () =>{
    const[books, setBooks] = useState([])
    useEffect(() => {
        const fecthAllBooks = async ()=> {
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fecthAllBooks();
    },[]);

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8800/books/"  + id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h1>Indunil Book Shop</h1>
            <div className="books">
                {books.map((book) =>(
                    <div className="book" key={book.id}>
                        {book.cover && <img src = {book.cover} alt = "" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className="delete" onClick={()=> handleDelete(book.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">Add New Book</Link>
            </button>
        </div>
    )
  }

  export default Books