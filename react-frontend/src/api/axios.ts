import axios from 'axios'

const axiosDf = axios.create({
	// baseURL: 'https://jira-clone.onrender.com/',
	//  baseURL: 'http://localhost:5055/api/',
	baseURL: 'https://task-management-opll.onrender.com/api/',
	// withCredentials: true,

	  
	}
)


export default axiosDf
