import '../css/Message.css'
import {useState, useEffect} from 'react'

function Message({type, message}){

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if(!message){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        },3000)

        return () =>clearTimeout(timer)

    }, [message])

    return(
       <>
    {visible && (
        <div className={`message ${type}`}>
        {message}
       </div>
    )}
       </>
    )
}

export default Message