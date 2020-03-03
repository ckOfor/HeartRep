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
		const { dataSource, onSubmit, searchKey, toggleSearch } = this.props
		
		return (
			<div>
				<form>
					<Select
						ref={ref => {
							this.selectRef = ref;
						}}
						className={'input'}
						value={searchKey}
						onInputChange={this.handleSearchChange}
						onChange={onSubmit}
						options={dataSource}
						placeholder={'Search by repository name...'}
						autoFocus
						onKeyDown={event => {
							if ('Enter' === event.key) {
								event.preventDefault();
								toggleSearch()
								this.selectRef.blur()
							}
						}}
					/>
				</form>
			</div>
		)
	}
}

export default SearchBar
