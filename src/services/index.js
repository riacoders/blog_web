const api_endpoint = import.meta.env.VITE_APP_API_ENDPOINT

export const API_REQUEST = {
	categories: `${api_endpoint}/api/v1/categories/`,
	blogs: `${api_endpoint}/api/v1/blogs/`,
	endpoint: api_endpoint,
}
