import React from 'react'
import { Button, Card, CardTitle, Col, Row} from 'reactstrap'
import { Player } from 'video-react'
import { connect } from 'react-redux'
import {removeVideo} from '../../Store/actions/courseActions'


const VideoCard = ({videos, course, removeVideo, profile}) => {

    const videoList = videos || [];

    const handleDelete = (course, title, url) => {
        removeVideo(course,title, url)
    }

    return(
        <Row>
            {videoList.map((v) => (
                <React.Fragment key={v.url}>
                    <Col md="5">
                        <Card className="video-card mb-3">
                                <Player className="mb-3 mt-2">
                                    <source src={v.url}></source>
                                </Player>
                            <CardTitle className="video-title">{v.name}</CardTitle>
                            { profile.userType == "Student" ? null : 
                            <Button color="danger" className="button w-25" onClick={() => handleDelete(course, v.name, v.url)}>Remove</Button>
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
        removeVideo: (course, title, url) => {
            dispatch(removeVideo(course, title, url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (VideoCard);
