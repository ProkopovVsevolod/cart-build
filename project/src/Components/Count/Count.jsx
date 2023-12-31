import "./style.scss"
import { useContext } from "react";
import { AppContext } from "../Cart";

const Count = ({count, id}) => {

    const {increase, decrease, changeValue} = useContext(AppContext);

    return (
        <div className="count">
            <div className="count__box">
                <input onChange={(e)=>{changeValue(id, +e.target.value)}} type="number" className="count__input" min="1" max="100" value={count}/>
             </div>
            <div className="count__controls">
                <button onClick={()=>{increase(id)}} type="button" className="count__up">
                    <img src="./img/icons/icon-up.svg" alt="Increase"/>
                </button>
                <button onClick={()=>{decrease(id)}} type="button" className="count__down">
                    <img src="./img/icons/icon-down.svg" alt="Decrease"/>
                </button>
            </div>
        </div>
    );
}
 
export default Count;