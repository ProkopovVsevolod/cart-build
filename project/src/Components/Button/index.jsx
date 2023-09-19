import "./style.scss";

const Button = ({title, onClick}) => {
    return ( 
        <button onClick={onClick} className="button">{title}</button>
    );
}
 
export default Button;