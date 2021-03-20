import React, { useEffect, useState } from 'react'
import { Toast, ToastBody} from 'reactstrap';


const CustomAlert = ({color, alert, authError}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
            const interval = setInterval(() => setVisible(false), 4000)
            return () => {
                clearInterval(interval)
            }    
    }, [])

    return(
        <React.Fragment>
            { visible && <Toast color={color} className={`toast ${authError ? 'errorToast' : 'successToast'}`}>
                <ToastBody>
                        {alert}
                </ToastBody>
            </Toast>        
            }
        </React.Fragment>
    )
}


export default CustomAlert;