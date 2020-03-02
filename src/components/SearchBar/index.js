// react
import React from 'react';

// react third-party libraries
import Select from 'react-select';

// style
import './style.css'

class SearchBar extends React.Component {
	
	/**
	 * handleSearchChange
	 *
	 * @param value
	 */
	handleSearchChange = value => {
		this.props.onSearchChange(value)
	}

	render () {
		const { dataSource, onSubmit, searchKey } = this.props
		
		return (
			<div>
				<form>
					<Select
						className={'input'}
						value={searchKey}
						onInputChange={this.handleSearchChange}
						onChange={onSubmit}
						options={dataSource}
						placeholder={'Search by repository name...'}
						autoFocus
						onBlur={() => console.log('sds')}
						onKeyDown={event => {
							if ('Enter' === event.key) {
								event.preventDefault();
							}
						}}
					/>
				</form>
			</div>
		)
	}
}

export default SearchBar
