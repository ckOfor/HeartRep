// react
import React  from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const paginationNumber = [];
	
	for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		paginationNumber.push(i)
	}
	
	return (
		<nav
			style={{
				marginTop: '5%'
			}}
		>
			<ul className="pagination">
				{
					paginationNumber.map(number => (
						<li key={number} className="page-item">
							<a onClick={() => paginate(number)} href="#" className="page-link">
								{number}
							</a>
						</li>
					))
				}
			</ul>
		</nav>
	)
}

export default Pagination
