import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useProjectQuery } from '../../api/endpoints/project.endpoint';
import { useSelector } from "react-redux"
import { RootState } from '../../store/store';
import axiosDf from '../../api/axios';
import { useEffect,useState } from 'react';
const Breadcrumbs = () => {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth.token)
  const [project, setProjects] = useState</* APIERROR */| null>(null);
  const fragments = location.pathname.slice(1).split('/');
  useEffect( () => {
    if(token){
      axiosDf.get("projects/get-project/"+fragments[1], {
        headers: {
          "Authorization":  `Bearer ${token}`
        }
      }) .then(response => {
        // Handle successful response
        setProjects(response.data);
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
//   const { data: project } = useProjectQuery(fragments[1] ?? -1);
// console.log("project title", project)
  return (
    <div className='mt-8 mb-4 min-w-max px-8 text-c-text sm:px-10'>
      <Link to='/project' className='hover:underline'>
        project
      </Link>
      {fragments[1] && (
        <>
          <Icon className='mx-2 inline text-xl' icon='ei:chevron-right' />
          <Link to={'/project/' + fragments[1]} className='hover:underline'>
            {project?.title ?? 'undefined'}
          </Link>
        </>
      )}
      {fragments[2] && (
        <>
          <Icon className='mx-2 inline text-xl' icon='ei:chevron-right' />
          <Link to={`/project/${fragments[1]}/board`} className='hover:underline'>
            Kanban board
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
