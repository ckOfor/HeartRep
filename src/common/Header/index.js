// react
import React from 'react';

// styles
import './Header.css'

// components
import SearchBar from '../../components/SearchBar'

export const Header = props => {
	const {
		dataSource, onSearchChange, onSubmit, searchKey
	} = props
	
	return (
		<header className="header">
			<nav className="header-nav">
				
				<div className="header-logo">
					<a href="/">HeartRep</a>
				</div>
				
				<div>
					<SearchBar
						onSearchChange={onSearchChange}
						onSubmit={onSubmit}
						dataSource={dataSource}
						searchKey={searchKey}
					/>
				</div>
			
			</nav>
		</header>
	)
}

export default Header
