// react
import React from 'react';

// styles
import './Header.css'

// components
import SearchBar from '../../components/SearchBar'

const HEADER = {
	color: 'white',
	marginTop: 20,
	fontSize: 20
}

export const Header = props => {
	
	return (
		<header className="header">
			<nav className="header-nav">
				
				<div className="header-logo">
					<p style={HEADER}>
						HeartRep
					</p>
				</div>
				
				<div>
					<SearchBar
						{...props}
					/>
				</div>
			
			</nav>
		</header>
	)
}

export default Header
