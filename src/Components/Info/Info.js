import React from 'react'
import { connect } from 'react-redux'
import { Card, CardImg, Col, Row, Button} from 'reactstrap'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Camera from '../../Assets/camera.svg'

const dummy = {
    'img': 'https://i.ibb.co/wd8cRVZ/img-person-placeholder.jpg',
    'name' : 'John Doe',
    'SRN' : 'dsu1200'
}

var d = new Date();

const InfoContainer = ({student}) => {

    const currentStudent = student ? student[0] : dummy

    return(
            <Col>
                <Row md="12">
                <Col md="4">
                <button className="upload-wrapper" type="file">
                    <label className="camera-icon" htmlFor="profile_picture">
                        <img src={Camera}></img>
                    </label>
                    <input type="file" id="profile_picture" hidden></input>
                </button>
                    <CardImg src={currentStudent.img || dummy.img} className="img rounded float-left">
                    </CardImg>
                </Col>
                <Col md="12">
                <Card className="basic-info mt-3">
                    <h4>Basic Info</h4>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">Student Name: <span className="s-name">{currentStudent.name}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">SRN: <span className="s-name">{currentStudent.SRN}</span></p>
                        </Col>
                    </Row>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">Branch: <span className="s-name">{currentStudent.Branch}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">Semester: <span className="s-name">{currentStudent.semester}</span></p>
                        </Col>
                    </Row>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">Mother's Name: <span className="s-name">{currentStudent.mother || ''}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">Father's Name: <span className="s-name"> {currentStudent.father || ''}</span></p>
                        </Col>
                    </Row>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">DOB: <span className="s-name">{currentStudent.dob || ''}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">Phone: <span className="s-name"> +91 {currentStudent.phone}</span></p>
                        </Col>
                    </Row>
                </Card>
                <Card className="basic-info mt-3">
                    <h4>Educational Info</h4>
                    <Row md="6">
                    <Col md='4'>
                        <p className="info-label">SSLC: <span className="s-name">{currentStudent.sslc || ''}</span></p>
                    </Col>
                    <Col md="4">
                        <p className="info-label">PUC: <span className="s-name">{currentStudent.puc || ''}</span></p>
                    </Col>
                    </Row>
                    <Row md="6">
                    <Col md='4'>
                        <p className="info-label">Entrance Exam Rank: <span className="s-name">{currentStudent.ent || ''}</span></p>
                    </Col>
                    </Row>
                </Card>
                <Row>
                    <Col md="3">
                        <Button className="suspend" onClick={() => console.log('Suspended')}>Suspend student</Button>
                    </Col>
                    <Col md="3">
                        <Button className="suspend edit" onClick={() => console.log('Suspended')}>Suspend student</Button>
                    </Col>
                </Row>
                </Col>
                </Row>
            </Col>
    )
}

const mapStateToProps = (state) => {
    return{
        student: state.firestore.ordered.users
    }
}


export default compose(connect(mapStateToProps), firestoreConnect(
    (props) => [
        {
            collection: 'users',
            where: ['name','==', `${props.name}`]
        }
    ]    
))(InfoContainer);
