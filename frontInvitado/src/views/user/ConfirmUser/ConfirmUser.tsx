import check from '../../../assets/img/check.png'
import './ConfirmUser.css'
import { Link } from "react-router-dom";

export default function confirm(){
    return(
        <>
       <div className='back'>
       <h1 className='confirm'>ASISTENCIA CONFIRMA</h1>
        <img  className= 'img' src={check} alt="check" />
        <h1 className='confirm'>Nos vemos pronto!</h1>

        <Link to= "/">
        <button className='btn-back' >
            Volver
        </button>
        </Link>

       </div>
        </>
    )
}