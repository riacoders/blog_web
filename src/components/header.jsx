import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_REQUEST } from '../services/index'
import Loader from '../shared/loader'
import { getReadingTime } from '../utils'

const Header = () => {
	const [loading, setLoading] = useState(true)
	const [categoryResults, setCategoryResults] = useState([])
	const [blogResults, setBlogResults] = useState(null) // Ensure null initial state
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true) // Start loading
				setError(null) // Reset error state

				const [categoryResponse, blogResponse] = await Promise.all([
					axios.get(API_REQUEST.categories),
					axios.get(API_REQUEST.blogs),
				])

				const data = blogResponse.data.data
				if (data.length > 0) {
					const randomIndex = Math.floor(Math.random() * data.length)
					setBlogResults(data[randomIndex])
				}
				setCategoryResults(categoryResponse.data.data)
				setLoading(false) // Stop loading
			} catch (error) {
				setError(error.message)
				setLoading(false) // Stop loading even if there is an error
			}
		}

		fetchData()
	}, [])

	if (loading) return <Loader /> // Display loader component
	if (error) return <p>Error: {error}</p> // Show error message

	if (!blogResults) return <p>No blogs available</p>

	return (
		<>
			{blogResults?.trending ? (
				<Link to={`/post/${blogResults._id}`} className='Header'>
					<div className='img-box'>
						<img
							src={`${API_REQUEST.endpoint}/${blogResults.image}`}
							alt='header.img'
						/>
					</div>
					<div className='description-box'>
						<div className='title'>
							<h4>
								{(() => {
									const category = categoryResults.find(
										cty => blogResults.category === cty._id
									)
									return category ? 'Trending' : 'Trending'
								})()}
							</h4>
						</div>
						<div className='info'>
							<h1>
								{blogResults.title.length > 100
									? `${blogResults.title.slice(0, 100)}...`
									: blogResults.title}
							</h1>
							<p style={{ textIndent: '20px', marginTop: '20px' }}>
								{blogResults.description.length > 1000
									? `${blogResults.description.slice(0, 1000)}...`
									: blogResults.description}
							</p>
						</div>
						<div className='post-info'>
							<span>
								<p className='post-time'>
									{moment(blogResults.updatedAt).format('MMMM Do, YYYY')}
								</p>
							</span>
							<span className='time-author'>
								<p>
									{blogResults.content
										? `${getReadingTime(blogResults.content)} mins read`
										: ''}
								</p>
							</span>
						</div>
					</div>
				</Link>
			) : null}
		</>
	)
}

export default Header
