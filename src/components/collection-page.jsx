import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_REQUEST } from '../services'
import Loader from '../shared/loader'
import Navbar from '../shared/navbar'
import NewsCard from '../shared/news-card'

function CollectionPage() {
	const { id } = useParams()
	const [data, setData] = useState(null)
	const [allData, setAllData] = useState(null)
	const [loadingPost, setLoadingPost] = useState(true)
	const [loadingRelated, setLoadingRelated] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoadingPost(true)
		axios
			.get(`${API_REQUEST.categories}${id}/`)
			.then(response => {
				setData(response.data.data)
				setLoadingPost(false)
			})
			.catch(error => {
				console.error('There was an error!', error)
				setError('Unable to fetch post data.')
				setLoadingPost(false)
			})
	}, [id])
	console.log(data)

	useEffect(() => {
		setLoadingRelated(true)
		axios
			.get(API_REQUEST.blogs)
			.then(response => {
				setAllData(response.data.data)
				setLoadingRelated(false)
			})
			.catch(error => {
				console.error('There was an error!', error)
				setError('Unable to fetch related posts.')
				setLoadingRelated(false)
			})
	}, [])

	console.log(allData)

	if (loadingPost) return <Loader />

	if (error) return <div>{error}</div>

	return (
		<>
			<Navbar />
			<h1 style={{ padding: '20px', fontSize: '24px' }}>{data.name}</h1>
			{loadingRelated ? (
				<Loader />
			) : (
				<div className='coll-blogs'>
					{allData
						.filter(blog => blog.category === data._id)
						.map(filteredBlog => (
							<NewsCard
								key={filteredBlog._id}
								title={filteredBlog.title || 'Untitled'}
								description={
									filteredBlog.description || 'No description available'
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
		</>
	)
}

export default CollectionPage
