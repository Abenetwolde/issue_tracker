
// export default axiosDf
import axios from 'axios'

const axiosDf = axios.create({

	 baseURL: 'http://localhost:5055/api/',

	withCredentials: true,

	  
	}
)


export default axiosDf
