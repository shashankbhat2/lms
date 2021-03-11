import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem  
} from 'reactstrap';
import './styles.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../Store/actions/authActions';


const CustomNavbar = ({links, currentUser, signOut}) => {
    const [isOpen, setIsOpen] = useState(false);  
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Acadonline</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map((link)=> (
              <NavItem className="navitem mr-3">
                <NavLink href={link.url}>{link.link}</NavLink>
              </NavItem>
              ))}
         
            </Nav>
            {
                currentUser ? 
                <UncontrolledDropdown className="mr-5 profile-menu">
                <DropdownToggle className="profile-dropdown">
                  {currentUser.name}
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem tag={Link} to="/" onClick={signOut}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>          
              :
                undefined
              }
          </Collapse>
        </Navbar>
      </div> 
    )
}

const mapDispatchToProps = (dispatch) =>{
  return{
      signOut : () => dispatch(signOut())
  }
}

export default connect(null,mapDispatchToProps)(CustomNavbar);