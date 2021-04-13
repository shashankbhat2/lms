import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Col } from 'reactstrap'
import { compose } from 'redux'
import { removeClass } from '../../Store/actions/classActions'
import ClassCard from '../Cards/ClassCard'

const ClassesContainer = ({classes,removeClass}) => {
    const teacherClasses = classes || []

    const handleClassRemove = (selectedClass) => {
        removeClass(selectedClass)
    }

    return(
        <React.Fragment>
        {teacherClasses && teacherClasses.length !== 0 ? teacherClasses.map((c) => (
        <Col md="4" className="mb-3" key={c.id}>
            <ClassCard teacherClass={c} handleClassRemove={handleClassRemove}></ClassCard>
        </Col>
        )) : (
            <div className="w-100 mt-2 ml-3 mb-2 empty-div">
                <p className="center-text">You have no Classes</p>
            </div> 
        )
        }
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return{
        classes: state.firestore.ordered.classes
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removeClass: (selectedClass) => {
            dispatch(removeClass(selectedClass))
        }
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props)=>[
    {
        collection: 'classes',
        where: ['teacher', "==", `${props.teacher}`]
    }
]))(ClassesContainer);