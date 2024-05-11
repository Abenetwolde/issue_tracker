import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';
import MemberInput from './MemberInput';
import {
  selectCurrentProject,
  useUpdateProjectMutation,
} from '../../api/endpoints/project.endpoint';
import { useParams } from 'react-router-dom';
import { selectMembers } from '../../api/endpoints/member.endpoint';
import { selectAuthUser } from '../../api/endpoints/auth.endpoint';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../store/hooks';
import { useState,useEffect } from 'react';
import axiosDf from '../../api/axios';

const Setting = () => {
  // const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const projectId = useParams().projectId
  console.log("projectid from setting,,,,,,,,,,,,,,",projectId)
  // const { members } = selectMembers(projectId);
  const { authUser: u } = selectAuthUser();
  // const { project } = selectCurrentProject(projectId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // if (!project || !members || !u) return null;


  // const isAdmin = members.filter(({ userId: uid }) => uid === u.id)[0].isAdmin;

  const onSubmit = async (formData: FieldValues) => {
    if (formData.name === name && formData.descr === descr && formData.repo === repo) return;
    // await updateProject({ id, ...formData });
    toast('Project setting updated');
  };
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token =useAppSelector((state)=>state.auth.token)
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
           const response = await axiosDf.get(`projects/get-project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (projectId) {
      console.log("there is an id get in setting...............")
      fetchProject();
    } else {
      setProject(null);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log("Project at setting", project)
  // const { title, description }:any = project;
  return (
    <div className='mt-10 px-5 sm:px-10'>
      <h1 className='mb-4 text-xl font-semibold text-c-text'>Project Setting</h1>
      {project !== null ? (
      <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-[30rem] flex-col gap-4'>
        <InputWithValidation
          defaultValue={project.title ?? ''}
          label='Name'
          placeholder='project name'
          register={register('title', {
            required: { value: true, message: 'name must not be empty' },
          })}
          error={errors.project?.title as FieldError}
          darkEnabled
          // readOnly={!isAdmin}
        />
        <InputWithValidation
          defaultValue={project.description ?? ''}
          label='Description'
          placeholder='project description'
          register={register('descr')}
          error={errors.project?.description as FieldError}
          darkEnabled
          // readOnly={!isAdmin}
        />
        {/* Additional form inputs */}
        <button type="submit">Submit</button>
      </form>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  );
};

export default Setting;
