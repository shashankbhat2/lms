import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardImg, Col, Row, Button} from 'reactstrap'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Camera from '../../Assets/camera.svg'
import {updateTeacherDisplayPic} from '../../Store/actions/teacherActions'
import {storage} from '../../config/fbConfig'
import CustomModal from '../Modal/';
import EditTeacherForm from '../Forms/EditTeacherForm'

const dummy = {
    'img': 'https://i.ibb.co/wd8cRVZ/img-person-placeholder.jpg',
    'name' : 'John Doe',
    'SRN' : 'dsu1200'
}

const TeacherInfo = ({teacher,updateTeacherDisplayPic}) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentTeacher = teacher ? teacher[0] : dummy

    const toggle = () => setIsOpen(!isOpen);

    const handleUpload = (file, currentTeacher) => {
        const profile = file;
        const name = currentTeacher.name;
        var metadata = {
            contentType: 'image/jpeg'
        }
        const uploadImage = storage.ref(`userImages/${name}`).put(profile, metadata)
        uploadImage.on('state_changed', 
            () => {
                storage.ref(`userImages/${name}`).getDownloadURL().then(
                    url => {
                        updateTeacherDisplayPic(currentTeacher,url)
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
                    <input type="file" id="profile_picture" hidden onChange={(e) => {e.preventDefault(); handleUpload(e.target.files[0], currentTeacher)}}></input>
                </button>
                    <CardImg src={currentTeacher.img || dummy.img} className="img rounded float-left">
                    </CardImg>
                        <Button color="primary" className="button mt-2 mb-2" onClick={() => setIsOpen(true)}>Edit Info</Button>
                </Col>
                
                <Col md="12">
                <Card className="basic-info mt-3">
                    <h4>Basic Info</h4>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">Student Name: <span className="s-name">{currentTeacher.name}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">SRN: <span className="s-name">{currentTeacher.SRN}</span></p>
                        </Col>
                    </Row>
                    <Row md="6">     
                        <Col md='4'>
                            <p className="info-label">Gender: <span className="s-name">{currentTeacher.gender}</span></p>
                        </Col>
                        <Col md='4'>
                            <p className="info-label">Branch: <span className="s-name">{currentTeacher.Branch}</span></p>
                        </Col>
                    </Row>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">Mother's Name: <span className="s-name">{currentTeacher.mother || ''}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">Father's Name: <span className="s-name"> {currentTeacher.father || ''}</span></p>
                        </Col>
                    </Row>
                    <Row md="6">
                        <Col md='4'>
                            <p className="info-label">DOB: <span className="s-name">{currentTeacher.dob || ''}</span></p>
                        </Col>
                        <Col md="4">
                            <p className="info-label">Phone: <span className="s-name"> +91 {currentTeacher.phone}</span></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='12'>
                            <p className="info-label">Address: <span className="s-name">{currentTeacher.address || ''}</span></p>
                        </Col>
                    </Row>
                </Card>
                <Card className="basic-info mt-3">
                    <h4>Educational Info</h4>
                    <Row md="6">
                    <Col md='4'>
                        <p className="info-label">SSLC: <span className="s-name">{currentTeacher.sslc || ''}</span></p>
                    </Col>
                    <Col md="4">
                        <p className="info-label">PUC: <span className="s-name">{currentTeacher.puc || ''}</span></p>
                    </Col>
                    </Row>
                    <Row md="6">
                    <Col md='4'>
                        <p className="info-label">Bachelor's Degree: <span className="s-name">{currentTeacher.bachelor || ''}</span></p>
                    </Col>
                    <Col md='4'>
                        <p className="info-label">Master's Degree: <span className="s-name">{currentTeacher.master || ''}</span></p>
                    </Col>
                    </Row>
                </Card>
                </Col>
                </Row>
                <CustomModal title="Edit Teacher" modal={isOpen} toggle={toggle}>
                    <EditTeacherForm teacher={currentTeacher}></EditTeacherForm>
                </CustomModal>
            </Col>
            </>
    )
}

const mapStateToProps = (state) => {
    return{
        teacher: state.firestore.ordered.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        updateTeacherDisplayPic: (student, url) => {
            dispatch(updateTeacherDisplayPic(student,url))
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
))(TeacherInfo);