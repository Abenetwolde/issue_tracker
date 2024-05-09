import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {useSelector} from "react-redux"
import { RootState } from '../store/store'


export const api = createApi({
	reducerPath: 'jiraApiReducer',
	baseQuery: fetchBaseQuery({
	  baseUrl: 'https://task-management-opll.onrender.com/api/',

		//  baseUrl: 'http://localhost:5055/api/',
		// credentials: 'include',
	}),
	tagTypes: ['Lists', 'Issues', 'Project', 'Members', 'AuthUser', 'Comments'],
	endpoints: (builder) => ({}),
})

export const {} = api
