import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { API_REQUEST } from '../services'
import Navbar from '../shared/navbar'
import NewsCard from '../shared/news-card'
import HomepageBanner from './homepage-banner'

const Homepage = () => {
	const [collData, setCollData] = useState([]) // Categories
	const [blogs, setBlogs] = useState([]) // Blogs
	const [error, setError] = useState('') // Error state for categories
	const [blogError, setBlogError] = useState('') // Error state for blogs
	const [loadingCollect, setLoadingCollect] = useState(true) // Loading state for categories
	const [loadingBlogs, setLoadingBlogs] = useState(true) // Loading state for blogs

	// Fetch categories on component mount
	useEffect(() => {
		axios
			.get(API_REQUEST.categories)
			.then(res => {
				setCollData(res.data.data)
				setLoadingCollect(false)
			})
			.catch(err => {
				console.error('Error fetching categories:', err)
				setError('Unable to load categories.')
				setLoadingCollect(false)
			})
	}, [])

	// Fetch blogs on component mount
	useEffect(() => {
		axios
			.get(API_REQUEST.blogs)
			.then(res => {
				setBlogs(res.data.data)
				setLoadingBlogs(false)
				console.log(res.data.data)
			})
			.catch(err => {
				console.error('Error fetching blogs:', err)
				setBlogError('Unable to fetch post data.')
				setLoadingBlogs(false)
			})
	}, [])

	// Mobile screen detection
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		// Initialize state
		handleResize()

		// Add event listener
		window.addEventListener('resize', handleResize)

		// Cleanup event listener
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className='Homepage'>
			<Navbar logoSize={'60px'} />
			<HomepageBanner />
			<div className='home-news-collection'>
				<h1 style={{ marginBottom: '20px' }}>Maqolalar</h1>

				{/* Display loading or error state for categories */}
				{loadingCollect ? (
					<p>Kategoriyalar yuklanmoqda...</p>
				) : error ? (
					<p>{error}</p>
				) : (
					collData.map(colls => {
						// Check if the category has collections
						if (colls.collections) {
							// Filter blogs based on category inside the map function
							const filteredBlogs = blogs
								.filter(blog => blog.category === colls._id)
								.slice(-3) // Get the last 3 blogs

							// Determine how many blogs to show based on screen size
							const blogsToDisplay = isMobile
								? filteredBlogs.slice(-1) // Show only 1 post on mobile
								: filteredBlogs // Show 3 posts otherwise

							return (
								<div key={colls._id} className='HomeCategory'>
									<div className='hcty-title'>
										<h4>{colls.name}</h4>
										<Link to={`/collection/${colls._id}`}>
											<p>Read more</p> <IoChevronForwardOutline />
										</Link>
									</div>

									{/* Display loading or error state for blogs */}
									{loadingBlogs ? (
										<p>Maqolalar yuklanmoqda...</p>
									) : blogError ? (
										<p>{blogError}</p>
									) : (
										<div className='hcty-news news-cards'>
											{/* Display filtered blogs based on screen size */}
											{blogsToDisplay.map(filteredBlog => (
												<NewsCard
													key={filteredBlog._id}
													title={filteredBlog.title || 'Untitled'}
													description={
														filteredBlog.description ||
														'No description available'
													}
													author={filteredBlog.author || 'Unknown'}
													timeStamp={new Date(
														filteredBlog.createdAt
													).toLocaleDateString()}
													postLink={`/post/${filteredBlog._id}`}
													image={`${API_REQUEST.endpoint}/${filteredBlog.image}`}
												/>
											))}
										</div>
									)}
								</div>
							)
						}
						return null
					})
				)}
			</div>
		</div>
	)
}

export default Homepage
