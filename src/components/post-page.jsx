import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_REQUEST } from '../services'
import Loader from '../shared/loader'
import Navbar from '../shared/navbar'
import NewsCard from '../shared/news-card'

function PostPage() {
	const { id } = useParams()
	const [data, setData] = useState(null)
	const [allData, setAllData] = useState(null)
	const [loadingPost, setLoadingPost] = useState(true)
	const [loadingRelated, setLoadingRelated] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoadingPost(true)
		axios
			.get(`${API_REQUEST.blogs}${id}/`)
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

	useEffect(() => {
		setLoadingRelated(true)
		axios
			.get(API_REQUEST.blogs)
			.then(response => {
				setAllData(response.data.data.slice(0, 3))
				setLoadingRelated(false)
			})
			.catch(error => {
				console.error('There was an error!', error)
				setError('Unable to fetch related posts.')
				setLoadingRelated(false)
			})
	}, [])

	if (loadingPost) return <Loader />

	if (error) return <div>{error}</div>

	return (
		<>
			<Navbar />
			<div className='PostPage'>
				{data && (
					<div className='post-item-container' key={data._id}>
						<div className='post-header'>
							<h1>{data.title}</h1>

							{data.image && (
								<div className='img-box'>
									<img
										src={`${API_REQUEST.endpoint}/${data.image}`}
										alt='img-post'
									/>
								</div>
							)}

							<div className='post-item-metainfo'>
								<p className='post-time'>
									{moment(data.updatedAt).format('MMMM Do, YYYY')}
								</p>
							</div>
						</div>
						<div className='post-item-description'>
							<p style={{ textIndent: '20px', fontWeight: '700 !important' }}>
								{data.description}
							</p>
							<p
								dangerouslySetInnerHTML={{
									__html: data.richtext,
								}}
							></p>
						</div>
					</div>
				)}

				{loadingRelated ? (
					<Loader />
				) : (
					<div className='other-posts'>
						<h1>Boshqa yangiliklar</h1>
						<div className='other-blogs-container'>
							{allData?.slice(-3).map(blg => {
								if (blg._id != id) {
									return (
										<NewsCard
											key={blg._id}
											title={
												blg.title.length > 100
													? `${blg.title.slice(0, 100)}...`
													: blg.title
											}
											description={
												blg.description.length > 300
													? `${blg.description.slice(0, 300)}...`
													: blg.description
											}
											author={blg.author}
											timeStamp={moment(blg.updatedAt).format('MMMM Do, YYYY')}
											postLink={`/post/${blg._id}`}
											image={`${API_REQUEST.endpoint}/${blg.image}`}
										/>
									)
								}
							})}
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default PostPage
