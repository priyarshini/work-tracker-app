import { Outlet, useLoaderData,redirect, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, Loading } from '../components';
import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import AllTasks from './AllTasks';


// const userQuery = {
//   queryKey: ['user'],
//   queryFn: async () => {
//     const { data } = await customFetch.get('/users/currentUser');
//     console.log(data)
//     return data;
//   },
// };

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/currentUser');
    console.log("currentUser:" ,data);
    return data;
    // let userData = {}
    // const { currentUser } = await customFetch.get('/users/currentUser');
    // console.log("currentUser:" ,currentUser);
    // userData.currentUser = currentUser.data[0]
    // const { userList } = await customFetch.get('/users');
    // console.log("listUsers:" ,data);
    // userData.usersList = userList.data;
    // console.log("user data:", userData);
    // return userData;
    // return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  // const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const isPageLoading = navigation.state === 'loading';
  // const [isAuthError, setIsAuthError] = useState(false);

  const user = useLoaderData();

  const logoutUser = async () => {
    console.log("logout")
    navigate("/")
    await customFetch.get('/users/logout');
    // queryClient.invalidateQueries();
    toast.success('Logging out...');
    
  };

  // customFetch.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error?.response?.status === 401) {
  //       setIsAuthError(true);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // useEffect(() => {
  //   if (!isAuthError) return;
  //   logoutUser();
  // }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <div>
            <Navbar />
            <div className='dashboard-page'>
            <Outlet  context={{ user }} />
              {/* {isPageLoading ? <Loading /> : <Outlet context={{ user }} />} */}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
