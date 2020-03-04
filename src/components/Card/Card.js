// react
import React, { useState } from 'react';

// third-party libraries
import { Modal } from 'antd';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'

// components
import Pagination from '../Pagination/Pagination'

// images
import eye from '../../assets/eye.png';
import fork from '../../assets/fork.png';
import star from '../../assets/star.png';

const { confirm } = Modal;

// styles
const TOP_LEVEL = {
	height: '100%',
	width: '40%',
}

const AVATAR = {
	height: '100%',
	width: '100%',
	borderRadius: '8px'
}

const MIDDLE_LEVEL = {
	height: '100%',
	width: '60%',
	margin: '3%',
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
}

const HEADER = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between"
}

const LINKS = {
	textDecoration: "none"
}

const BOTTOM_LEVEL = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	marginBottom: '3%'
}

const BOTTOM_LEVEL_DIV = {
	height: '100%',
	width: '40%',
}

const BOTTOM_LEVEL_IMAGE = {
	height: '100%',
	width: '100%',
}

const FORK_IMAGE = {
	height: '50%',
	width: '50%',
	marginLeft: '30%',
}

const Card = props => {
	const { cardList, loading, deleteCard } = props
	
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(10)
	
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = cardList.slice(indexOfFirstPost, indexOfLastPost)
	
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
	
	/**
	 * showDeleteConfirm
	 *
	 * @param {string} - nameWithOwner
	 */
	const showDeleteConfirm = (nameWithOwner) => {
		confirm({
			title: 'Are you sure you want to delete?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteCard(nameWithOwner)
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}
	
	if(loading) {
		return (
			<h2>Loading...</h2>
		)
	}
	
	return (
		<div>
			<p className="App-intro">
				<code>You have {cardList.length} result(s)</code>
			</p>
			
			{
				currentPosts.map((result, index) => {
					const {
						name, url, nameWithOwner, owner, watchers, forkCount, stargazers
					} = result
					const { login, avatarUrl } = owner
					
					return (
						<div
							className="App-card"
							key={index}
						>
							<div
								style={TOP_LEVEL}
							>
								<img
									style={AVATAR}
									src={avatarUrl}
									alt="Avatar"
								/>
							</div>
							
							
							<div
								style={MIDDLE_LEVEL}
							>
								<div>
									<div
										style={HEADER}
									>
										<a
											style={LINKS}
											target="_blank"
											href={`${url}`}
										>
											{name.charAt(0).toUpperCase() + name.slice(1)}
										</a>
										
										<DeleteOutlined
											onClick={() => showDeleteConfirm(nameWithOwner)}
										/>
										
									</div>
									
									<p
										style={LINKS}
									>
										{login}
									</p>
								</div>
								
								<div
									style={BOTTOM_LEVEL}
								>
									
									<div className="App-bottom-card">
										<div
											style={BOTTOM_LEVEL_DIV}
										>
											<img
												style={FORK_IMAGE}
												src={fork}
												alt="Avatar"
											/>
										</div>
										
										<a
											style={{
												textDecoration: 'none',
											}}
										>
											{forkCount}
										</a>
									</div>
									
									<div className="App-bottom-card">
										<div
											style={BOTTOM_LEVEL_DIV}
										>
											<img
												style={{
													height: '100%',
													width: '100%',
												}}
												src={eye}
												alt="Avatar"
											/>
										</div>
										
										<a
											style={LINKS}
										>
											{watchers.totalCount}
										</a>
									</div>
									
									<div className="App-bottom-card">
										<div
											style={BOTTOM_LEVEL_DIV}
										>
											<img
												style={BOTTOM_LEVEL_IMAGE}
												src={star}
												alt="Avatar"
											/>
										</div>
										
										<a
											style={LINKS}
										>
											{stargazers.totalCount}
										</a>
									</div>
								
								</div>
							
							
							</div>
						</div>
					)
				})
			}
			
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={cardList.length}
				paginate={paginate}
			/>
		
		</div>
	)
}


export default Card
