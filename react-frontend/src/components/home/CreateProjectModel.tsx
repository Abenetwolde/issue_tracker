import { FieldError, FieldValues, useForm } from 'react-hook-form';
import { useCreateProjectMutation } from '../../api/endpoints/project.endpoint';
import { useAuthUserQuery } from '../../api/endpoints/auth.endpoint';
import type { CreateProject } from '../../api/apiTypes';
import InputWithValidation from '../util/InputWithValidation';
import WithLabel from '../util/WithLabel';
import Model from '../util/Model';
import Item from '../util/Item';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { RootState } from '../../store/store';
import {useSelector} from "react-redux"
import axiosDf from '../../api/axios';
interface Props {
  onClose: () => void;
}

const CreateProjectModel = (props: Props) => {
  const { onClose } = props;
  const { data: authUser } = useAuthUserQuery();
  const [createProject] = useCreateProjectMutation();
 
  const [isActive, setIsActive] = useState(false); 
  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsActive(event.target.checked); // Update isActive state
  };
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting: isLoading },
  } = useForm();
  const [user, setUser] = useState<any>(); // State to hold user data

  const navigate = useNavigate();
  const token = useSelector((state:RootState)=>state.auth.token)

  useEffect(  () => {
    // Load user data from local storage on component mount
    const userDataStr = 
    
    localStorage.getItem('profile');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);

      setUser(userData);
    } else {
      // Handle case when data doesn't exist in local storage
      console.log("No user data found in local storage");
    }
  }, []);
  const handleCreateProject = async (form: FieldValues) => {
    if (!user) return;
    console.log('Created a new project!',{ ...form, isActive: isActive })
 

    const body:any ={ ...form, isActive: isActive }
    axiosDf.post("projects/create-project",body,{headers:{
      Authorization: `Bearer ${token}`
    }}).then((data)=>console.log("create project",data))
    
    toast('Created a new project!',form);
    onClose();
  };

  return (
    <Model onSubmit={handleSubmit(handleCreateProject)} {...{ onClose, isLoading }}>
      <>
        <div className='mb-8'>
          <span className='text-[22px] font-[600] text-c-text'>Create Project</span>
        </div>
        <div className='flex flex-col gap-4'>
          <InputWithValidation
            label='Project Title'
            placeholder='name of your project'
            register={register('title', {
              required: {
                value: true,
                message: 'Project title must not be empty',
              },
            })}
            error={errors.name as FieldError}
            autoFocus
          />
          <InputWithValidation
            label='Short description'
            placeholder='describe your project in a few words'
            register={register('description')}
            error={errors.descr as FieldError}
          />
           <div className="flex items-center">
          <label htmlFor="isActive">IsActive</label>
          <Switch
            id="isActive"
            checked={isActive}
            onChange={handleChange}
            // {...register('isActive')} // Register isActive field
          />
             {/* <input type="hidden" {...register('isActive')} />  */}
        </div>
      
        </div>
        
         {user && (
          <WithLabel label='Members'>
            <>
              <div className='mb-2 rounded-sm border-[1px] border-gray-300 bg-slate-100 py-1 px-3 text-sm text-c-text'>
                <Item
                  text={user.name}
                   icon={user.name}
                  size='h-6 w-6'
                  variant='ROUND'
                />
              </div>
              <span className='text-sm text-c-text'>
                * you can add more members after creating the project *
              </span>
            </>
          </WithLabel>
        )} 
      </>
    </Model>
  );
};

export default CreateProjectModel;
