// react
import React from 'react';

// styles
import './Header.css'

// components
import SearchBar from '../../components/SearchBar'

export const Header = props => {
	const {
		dataSource, onSearchChange, onSubmit, searchKey,
		toggleSearch
	} = props
	
	return (
		<header className="header">
			<nav className="header-nav">
				
				<div className="header-logo">
					<p style={{ color: 'white' }}>HeartRep</p>
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
