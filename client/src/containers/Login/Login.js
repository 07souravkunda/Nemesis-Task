import React, { useState } from 'react';
import './login.css';
import logo from './image.png';
import axios from 'axios';
import Dialog from '../../components/Dialog/Dialog';
import Spinner from '../../components/Spinner/Spinner';
axios.defaults.withCredentials = true;
const Login = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [dg, setDg] = useState({});
  const [loading, setLoading] = useState(false);
  const clickhandler = async (e) => {
    e.preventDefault();
    console.log(name, password);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/v1/signin', {
        user: name,
        password: password,
      });
      console.log(res.data);
      setLoading(false);
      props.setUser(res.data.user);
    } catch (er) {
      setLoading(false);
      setDg({
        open: true,
        title: 'Error!!',
        content: er.response.data.message,
      });
      // alert(er.response.data.message + '!!');
    }
  };
  return (
    <>
      <div className="cnt">
        <div className="forms-cnt">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Login</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  value={name}
                  type="text"
                  placeholder="Username"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  value="Login"
                  className="butt solid"
                  onClick={clickhandler}
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="panels-cnt">
          <div className="panel left-panel">
            <div className="content">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="https://images.squarespace-cdn.com/content/58acab93bebafbfd06a07708/1507128401800-LXU8HK1WO6LA8MS6TDZK/wings.png?content-type=image%2Fpng"
                  width={80}
                  height={40}
                  alt={'logo'}
                />
                <h3 style={{ marginLeft: '10px' }}>NamaSys</h3>
              </div>
              <p>
                Corporate Office 89, Lower Ground Floor, Gujarat Vihar, New
                Delhi, Delhi 110092, IN
              </p>
            </div>
            <img src={logo} style={{ width: '40%' }} className="image" alt="" />
          </div>
          <Dialog
            open={dg.open}
            content={dg.content}
            title={dg.title}
            handleClose={() => setDg({})}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
