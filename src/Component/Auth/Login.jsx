import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";

const Login = () => {
    let { setUser, logInUser, googleLogin } = useContext(AuthContext);
    let [error, setError] = useState('');
    let navigate = useNavigate();
    let handleLogin = e => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        logInUser(email, password)
            .then((result) => {
                setUser(result.user)
                Swal.fire({
                    title: "WelCome!",
                    text: "You succesFully Login.",
                    icon: "success"
                })
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => setError(error.message));
    }


    let handleGoogleLogIn = () => {
        googleLogin()

    };



    return (
        <div className='md:w-7/12 mx-auto border-emerald-300 border mt-24 mb-10'>
            <form onSubmit={handleLogin} className="card-body ">
                <h1 className='md:text-2xl font-bold mb-4'>Login Now!</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name='email' className="input rounded-none input-bordered dark:text-black" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">Password</span>
                    </label>
                    <input type="password" placeholder="password" name='password' className="input rounded-none input-bordered dark:text-black" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hove">Forgot password?</a>
                    </label>
                </div>
                {
                    error && <span className='text-red-500 text-sm my-1'>{error}</span>
                }
                <div className="form-control mt-6">
                    <button className="btn bg-green-400 text-white font-bold rounded-none">Login</button>
                    <div>
                        <button onClick={handleGoogleLogIn} className='btn rounded-none w-full mt-3 border-e-green-400  border-2 border-b-green-400'><FaGoogle></FaGoogle> Login With Google</button>
                    </div>
                    <p className='text-center mt-6'>Don't have an account?please <Link to='/signup' className='text-green-500 underline'>SignUp</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;