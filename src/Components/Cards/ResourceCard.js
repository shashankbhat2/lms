import React from 'react'
import { Button, Card, CardTitle, Col, Row} from 'reactstrap'
import { removeResource } from '../../Store/actions/courseActions';
import { connect } from 'react-redux'



const ResourceCard = ({resources, course, profile, removeResource}) => {

    const resourceList = resources || [];

    const handleDelete = (course, title, url) => {
        removeResource(course,title, url)
    }


    return(
        <Row>
            {resourceList.map((r) => (
                <React.Fragment key={r.id}>
                    <Col md="5">
                        <Card className="video-card mb-3">
                            <CardTitle className="video-title">{r.name}</CardTitle>
                            <Button className="button w-25 mb-2 view-button">
                                <a href={r.url} className="link">
                                    View
                                </a> 
                            </Button>
                            { profile.userType == "Student" ? null : 
                            <Button color="danger" className="button w-25" onClick={() => handleDelete(course, r.name, r.url)}>Remove</Button>
                            }                               
                        </Card>
                    </Col>
                </React.Fragment>
            ))}
        </Row>
    )
}


const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile
    }
}



const mapDispatchToProps = (dispatch) => {
    return{
        removeResource: (course, title, url) => {
            dispatch(removeResource(course, title, url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCard);