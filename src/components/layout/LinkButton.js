import '../css/Linkbutton.css'
import {Link} from 'react-router-dom'

function LinkButton({to, text}){
    return(
        <Link className='btn' to={to}>
            {text}
        </Link>
    )
}

export default LinkButton