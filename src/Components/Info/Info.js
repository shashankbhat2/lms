import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardImg, Col, Row, Button} from 'reactstrap'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Camera from '../../Assets/camera.svg'
import {setStudentSuspended, updateStudentDisplayPic} from '../../Store/actions/studentActions'
import {storage} from '../../config/fbConfig'
import CustomModal from '../Modal/';
import EditStudentForm from '../Forms/EditStudentForm'
import CustomAlert from '../Alert/'

const dummy = {
    'img': 'https://i.ibb.co/wd8cRVZ/img-person-placeholder.jpg',
    'name' : 'John Doe',
    'SRN' : 'dsu1200'
}

const InfoContainer = ({student,setStudentSuspended, updateStudentDisplayPic}) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentStudent = student ? student[0] : dummy

    const toggle = () => setIsOpen(!isOpen);

    const handleSuspend = (student) => {
        setStudentSuspended(student)
    }

    const handleUpload = (file, currentStudent) => {
        const profile = file;
        const name = currentStudent.name;
        var metadata = {
            contentType: 'image/jpeg'
        }
        const uploadImage = storage.ref(`userImages/${name}`).put(profile, metadata)
        uploadImage.on('state_changed', 
            () => {
                storage.ref(`userImages/${name}`).getDownloadURL().then(
                    url => {
                        updateStudentDisplayPic(currentStudent,url)
                    },
                )   
            },
        )
    }

    return(
        <>
            <Col>
                <Row md="12">
                <Col md="4">
                <button className="upload-wrapper" type="file">
                    <label className="camera-icon" htmlFor="profile_picture">
                        <img src={Camera}></img>
                    </label>
                    <input type="file" id="profile_picture" hidden onChange={(e) => {e.preventDefault(); handleUpload(e.target.files[0], currentStudent)}}></input>
                </button>
                    <CardImg src={currentStudent.img || dummy.img} className="img rounded float-left">
                    </CardImg>
                        <Button color='danger' className="button mt-3 mb-3" onClick={() => handleSuspend(currentStudent)}>{currentStudent.suspended ? 'Student Suspended' : 'Suspend Student'}</Button>
                        <Button color="primary" className="button mb-2" onClick={() => setIsOpen(true)}>Edit Info</Button>
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
                        <Col md='3'>
                            <p className="info-label">Gender: <span className="s-name">{currentStudent.gender}</span></p>
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
                    <Row>
                        <Col md='12'>
                            <p className="info-label">Address: <span className="s-name">{currentStudent.address || ''}</span></p>
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
                        <p className="info-label">Entrance Exam Rank: <span className="s-name">{currentStudent.rank || ''}</span></p>
                    </Col>
                    </Row>
                </Card>
                </Col>
                </Row>
                <CustomModal title="Edit Student" modal={isOpen} toggle={toggle}>
                    <EditStudentForm student={currentStudent}></EditStudentForm>
                </CustomModal>
            </Col>
            </>
    )
}

const mapStateToProps = (state) => {
    return{
        student: state.firestore.ordered.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        setStudentSuspended: (student) => {
            dispatch(setStudentSuspended(student))
        },
        updateStudentDisplayPic: (student, url) => {
            dispatch(updateStudentDisplayPic(student,url))
        }
    })
}



export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(
    (props) => [
        {
            collection: 'users',
            where: ['name','==', `${props.name}`]
        }
    ]    
))(InfoContainer);
