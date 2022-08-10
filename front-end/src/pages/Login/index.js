import { Appear, Paragraph, Button } from "arwes";
import Clickable from "general/components/Clickable";
import { Link } from "react-router-dom";

import Global from "general/Global";

import userApi from "api/userApi";


function Login(props) {

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        const email = data.get("email");
        const password = data.get("password");

        const res = await userApi.signIn({email, password});

        const {result, accessToken, refreshToken} = res.data;

        if (result==='success') {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            Global.accessToken = accessToken;
            Global.refreshToken = refreshToken;
            window.location.href='/';
        }
    }

    return (
        <Appear animate show={props.entered} align='center'>
            <Paragraph>Login to SpaceX launches control.</Paragraph>

            <form onSubmit={handleSubmit} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password"/>

                <Link to="/sign-up" style={{color: '#26dafd', fontSize: 15, textDecoration: 'none', padding: '12px 0 0 20px'}}>
                    sign up ?
                </Link>

                <div align='right'>
                    <Clickable>
                        <Button animate 
                            show={props.entered} 
                            type="submit" 
                            layer="success"
                        >
                        Login
                        </Button>
                    </Clickable>
                </div>

                <a href={`${process.env.REACT_APP_BASE_URL || ''}/auth/google`} style={{color: '#26dafd'}}>Login with Google</a>
            </form>
        </Appear>
    )
}
  
export default Login;
