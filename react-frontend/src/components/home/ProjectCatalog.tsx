import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { APIERROR } from '../../api/apiTypes';
import { selectAuthUser } from '../../api/endpoints/auth.endpoint';
import { useProjectsQuery } from '../../api/endpoints/project.endpoint';
import SS from '../util/SpinningCircle';
import CreateProjectModel from './CreateProjectModel';
import ProjectRow from './ProjectRow';
import axiosDf from '../../api/axios';
import { useSelector } from "react-redux"
import { RootState } from '../../store/store';
const ProjectCatalog = () => {
  // const { authUser } = selectAuthUser();
  // const {
  //   data: projects,
  //   error,
  //   isLoading,
  // } = useProjectsQuery(authUser?.id as number, { skip: !authUser });
  const [projects, setProjects] = useState</* APIERROR */| null>(null);
  // const [user, setUser] = useState<any>(); // State to hold user data
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState) => state.auth.user)
  useEffect( () => {
    if(token){
      axiosDf.get("projects/get-projects", {
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
  const [isOpen, setIsOpen] = useState(false);
console.log(projects)
  // if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  // if (!authUser || isLoading)

  if (!user) return (
    <div className='z-10 grid w-full place-items-center bg-c-1 text-xl text-c-text'>
      {/* {isLoading ? (
          'Fetching your projects 🚀'
        ) : ( */}
      <div className='flex items-center gap-6'>
        <span className='text-base'>Server is having a cold start</span>
        <SS />
      </div>
      {/* )} */}
    </div>
  );

  return (
    <>
      <div className='z-10 h-screen min-h-fit grow overflow-auto bg-c-1 px-10 pb-10 pt-12 text-c-5'>
        <div className='flex min-w-[43rem] justify-between'>
          <span className='text-2xl font-semibold tracking-wide'>Projects</span>
          <button onClick={() => setIsOpen(true)} className='btn'>
            Create Project
          </button>
        </div>
        <div className='mt-8'>
          <div className='relative'>
            <input
              placeholder='Search projects'
              className='w-44 rounded-sm border-2 bg-transparent py-[5px] pl-9 pr-2 text-sm outline-none focus:border-chakra-blue'
            />
            <Icon
              width={20}
              icon='ant-design:search-outlined'
              className='absolute top-[6px] left-2 w-[19px]'
            />
          </div>
        </div>
        <div className='min-w-fit'>
          <div className='mt-4 flex py-1 text-sm font-semibold'>
            <div className='w-8 shrink-0'></div>
            <div className='min-w-[10rem] grow px-2'>Name</div>
            <div className='min-w-[18rem] grow px-2'>Description</div>
            <div className='w-52 shrink-0 px-2'>Lead</div>
          </div>
          {projects ? (
            projects?.data.length !== 0 ? (
              <div className='mt-1 border-t-2 border-c-3'>
                {projects.data.map((data, i) => (
                  <ProjectRow key={data.id} idx={i} authUserId={user.id} {...data} />
                ))}
              </div>
            ) : (
              <div className='mt-[30vh] grid place-items-center text-xl'>
                You haven't created any project yet!! 🚀
              </div>
            )
          ) : null}
        </div>
      </div>
      {isOpen && <CreateProjectModel onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProjectCatalog;
