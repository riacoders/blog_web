import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_REQUEST } from '../services'
import Loader from '../shared/loader'
import Navbar from '../shared/navbar'

function CategoryCollection() {
	const [collData, setCollData] = useState([]) // Categories
	const [loadingCollect, setLoadingCollect] = useState(true) // Loading state for categories
	useEffect(() => {
		axios
			.get(API_REQUEST.categories)
			.then(res => {
				setCollData(res.data.data)
				setLoadingCollect(false)
			})
			.catch(err => {
				console.error('Error fetching categories:', err)
				setLoadingCollect(false)
			})
	}, [])

	console.log(collData)
	return (
		<div className='CategoryCollection'>
			<Navbar logoSize={'60px'} />
			{loadingCollect ? (
				<Loader />
			) : (
				<div className='coll-container'>
					<h1 style={{ fontSize: '20px' }}>Kategoriyalar</h1>
					<div className='collections'>
						{collData.map((colls, item) => {
							if (colls.image && colls.name && colls.collections) {
								return (
									<Link
										to={`/collection/${colls._id}`}
										className='collect-item'
										key={item}
									>
										<img
											src={`${API_REQUEST.endpoint}/${colls.image}`}
											alt='pro'
										/>
										<h2>{colls.name}</h2>
									</Link>
								)
							}
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default CategoryCollection
