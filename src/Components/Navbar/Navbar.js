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
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../Store/actions/authActions';


const CustomNavbar = ({links, currentUser, signOut}) => {
    const [isOpen, setIsOpen] = useState(false);  
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
        <Navbar color="dark" dark expand="md" className="navbar">
          <NavbarBrand href="/">Acadonline</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map((link)=> (
              <NavItem className="navitem mr-3" key={link.url}>
                <NavLink href={link.url}>{link.route}</NavLink>
              </NavItem>
              ))}
         
            </Nav>
            {
                currentUser ? 
                <UncontrolledDropdown className="mr-5 profile-menu">
                <DropdownToggle className="profile-dropdown">
                  {currentUser.name ? currentUser.name : ''} 
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                  <DropdownItem tag={Link} to="/login" onClick={signOut}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>          
              :
                ''
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