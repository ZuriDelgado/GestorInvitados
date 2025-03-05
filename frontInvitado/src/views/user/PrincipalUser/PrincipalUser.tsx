import SearchBar from '../../../components/user/SearchBar';
import imgView from '../../../assets/img/imgView.jpeg';
import './PrincipalUser.css'; 

export default function PrincipalUser() {
    return (
        <>
        <div className='bodyy'>
        <div className='main'>
            <h2 className='welcome'>Bienvenido! ✨</h2>
            <h1 className='title'>Acompañanos a celebrar el cumpleaños de Zurisarai</h1>
            <div className='image-container'>
                <img src={imgView} alt="Imagen Representativa" />
                <img src={imgView} alt="Imagen Representativa" />
                <img src={imgView} alt="Imagen Representativa" />
            </div>

            <div className='confirmation-text'>
                <h2>Confirma tu asistencia</h2>
                <h2>Ingresa tu nombre para continuar el proceso</h2>
            </div>

            <div className='search-bar-container'>
                <SearchBar />
            </div>
        </div>
        </div>
        </>
    );
}