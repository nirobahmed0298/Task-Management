import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const SignUp = () => {
    let { createUser, setUser, googleWithLogIn, updateUserProfile } = useContext(AuthContext);
    let [error, setError] = useState('');
    let [successMsg, setsuccessMsg] = useState(false);
    let location = useLocation();
    let navigate = useNavigate();
    let handleLogIn = e => {
        e.preventDefault()
        let name = e.target.name.value;
        let photo = e.target.PhotoUrl.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        setError('');
        setsuccessMsg('');
        if (password.length < 6) {
            setError('Password should be at least 6 characters.');
            return;
        }
        let passError = /^(?=.*[a-z])(?=.*[A-Z])/;
        if (!passError.test(password)) {
            setError('At least one uppercase, one lowercase character');
            return;
        }
        createUser(email, password)
            .then((result) => {
                setUser(result.user);
                console.log(result.user)
                setsuccessMsg(true)
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        axios.post('https://task-management-system-server-flame.vercel.app/users', {
                            name: result.name,
                            email: result.email,
                            photo: result.photoUrl,
                        })
                        navigate(location?.state ? location.state : '/')
                    })

            })
            .catch(error => {
                setError(error.message)
                setsuccessMsg(true)
            })

    }
    let handleGoogleSignUp = () => {
        googleWithLogIn()
            .then(result => {
                setUser(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                }
                axios.post('https://task-management-system-server-flame.vercel.app/users', userInfo)
                    .then(res => {
                    })
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => { setError(err.message) })
    }


    return (
        <div className='md:w-7/12 mx-auto border-emerald-300 border mt-24 mb-10'>
            <form onSubmit={handleLogIn} className="card-body">
                <h1 className=' md:text-2xl font-bold'>SignUp Now..!</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name='name' className="input input-bordered rounded-none dark:text-black" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Photo</span>
                    </label>
                    <input type="text" placeholder="Your Photo URL" name='PhotoUrl' className="input input-bordered rounded-none dark:text-black" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Email</span>
                    </label>
                    <input type="email" placeholder="email" name='email' className="input input-bordered rounded-none dark:text-black" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Password</span>
                    </label>
                    <input type="password" placeholder="password" name='password' className="input input-bordered rounded-none dark:text-black" required />
                </div>
                {
                    error && <span className="label-text text-red-500">{error}</span>
                }
                {
                    successMsg && <span className="label-text text-green-500">You succesFully register.</span>
                }
                <div className="form-control mt-6">
                    <button className="btn btn-outline bg-green-400 border-none font-semibold text-white rounded-none">SignUp</button>
                </div>
                <div className='text-center space-y-2'>
                    <h1 className='font-bold my-2'>Or</h1>
                    <div>
                        <button onClick={handleGoogleSignUp} className='btn w-full rounded-none border-e-green-400  border-2 border-b-green-400'><FaGoogle></FaGoogle> SignUp With Google</button>
                    </div>
                </div>
                <p className='text-center my-2'>Already have an account?..Please <Link to='/login' className='text-green-500 underline'>Login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;