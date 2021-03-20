import React from 'react'
import { Container } from 'reactstrap';


const ErrorPage = () => {
    return(
        <div>
            <Container className="mt-5">
                <h1>404</h1>
                <h4 className="mt-5">Page not found!</h4>
            </Container>
        </div>
    )
}


export default ErrorPage;