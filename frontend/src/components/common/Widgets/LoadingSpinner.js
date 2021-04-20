import { Row, Spinner } from "react-bootstrap"


const LoadingSpinner = (props) => {
    if (props.loading) {
        return (
            <Row className=" justify-content-center mx-auto pb-3" >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner></Row>)
    }
    else return null
}


export default LoadingSpinner;