import { lazy, Suspense as S, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import IconBtn from '../util/IconBtn';
// import Avatar from '../util/Avatar';
import { setTheme, Theme } from '../../utils';
import axiosDf from '../../api/axios';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../store/hooks';
import Avatar from '../util/Avatar';
const Profile = lazy(() => import('./Profile'));

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

function Sidebar(props: Props) {
  const {
    theme: { mode },
    toggleTheme,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

const user=useAppSelector((state)=>state.auth.user)

  const handleToggle = () => {
    toggleTheme();
    setTheme(mode);
  };

  const handleLogOut = async () => {
    await logOut();
    toast('Logged out!');
    navigate('/login');
  };

  // if (!user) return <Navigate to='/login' />; // Redirect to login if user data is not available

  return (
    <div className='flex min-h-screen shrink-0'>
      <div className='flex w-14 flex-col items-center justify-between bg-primary py-6'>
        <div className='flex flex-col gap-y-8'>
          <button title='Go to Home' onClick={() => navigate('/project')} className='w-8'>
            <img className='h-8 w-12' src='/assets/jira.svg' alt='jira-clone' />
          </button>
          <input
            checked={mode === 'dark'}
            type='checkbox'
            onChange={handleToggle}
            className='btn-toggle'
            title='Toggle theme'
          />
        </div>
        <div className='flex flex-col gap-6'>
          {user && (
            <>
              <Avatar
                title='Profile'
                // src={user.profileUrl}
                name={user.name}
                onClick={() => setIsOpen((p) => !p)}
                className='h-9 w-9 border-[1px] hover:border-green-500'
              />
              <IconBtn onClick={handleLogOut} icon='charm:sign-out' title='Log Out' />
            </>
          )}
        </div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 320 : 0 }}
        transition={{ type: 'tween' }}
      >
        {user && (
          <S>
            <Profile authUser={user} />
          </S>
        )}
      </motion.div>
    </div>
  );
}

export default Sidebar;

async function logOut() {
  const result = await axiosDf.post('auth/logout');
  return result.data;
}
