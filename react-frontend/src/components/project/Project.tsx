import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useIssuesQuery } from '../../api/endpoints/issues.endpoint';
import { useListsQuery } from '../../api/endpoints/lists.endpoint';
import type { APIERROR } from '../../api/apiTypes';
import Board from './Board';
import Filter from './Filter';
import SS from '../util/SpinningCircle';
import { useAppSelector } from '../../store/hooks';
import axiosDf from '../../api/axios';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
const Project = () => {
  const projectId =useParams().projectId;
  console.log("project id.........",projectId)
  const issueQuery = useAppSelector((state) => state.query.issue);
  // const { data: lists, error: listError } = useListsQuery(projectId);
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token)
  const userid = useSelector((state: RootState) => state.auth.user.id)
  const [singleprojects, setSingleProjects] = useState</* APIERROR */| null>(null);
  const [singleprojectsTask, setSingleProjectsTasks] = useState</* APIERROR */| null>(null);
  useEffect( () => {
    if(token){
      axiosDf.get(`projects/get-project/${projectId}`, {
        headers: {
          "Authorization":  `Bearer ${token}`
        }
      }) .then((response: { data: any; }) => {
        // Handle successful response
        setSingleProjects(response?.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching projects:', error);
      });
    }else{
      // navigate("/login")
    }
    // Load user data from local storage on component mount

  
  }, []);
  useEffect( () => {
    if(token){
      axiosDf.get(`tasks/get-project-tasks/${userid}?projectId=${projectId}`, {
        headers: {
          "Authorization":  `Bearer ${token}`
        }
      }) .then((response: { data: any; }) => {
        // Handle successful response
        setSingleProjectsTasks(response?.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching projects:', error);
      });
    }else{
      // navigate("/login")
    }
    // Load user data from local storage on component mount

  
  }, []);
  console.log("data......",singleprojectsTask)
  // const { data: issues, error: issueError } = useIssuesQuery(
  //   { projectId, ...issueQuery },
  //   { refetchOnMountOrArgChange: true }
  // );

  // if (listError && issueError) {
  //   if ((listError as APIERROR).status === 401 || (issueError as APIERROR).status === 401)
  //     return <Navigate to='/login' />;
  //   return (
  //     <div className='grid h-full grow place-items-center text-xl'>
  //       You are not part of this project ☝
  //     </div>
  //   );
  // }

  return (
    <div className='mt-6 flex grow flex-col px-8 sm:px-10'>
      <h1 className='mb-4 text-xl font-semibold text-c-text'>Kanban Board</h1>
      {/* <Filter isEmpty={singleprojects?.length === 0} {...{ projectId, setIsDragDisabled }} /> */}
   
{/* 
      {singleprojects ? (
        <Board {...{ singleprojects, issues, isDragDisabled }} />
      ) : (
        <div className='grid h-[40vh] w-full place-items-center'>
          <SS />
        </div>
      )}  */}
    </div>
  );
};

export default Project;
