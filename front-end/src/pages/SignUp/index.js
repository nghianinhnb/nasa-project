import { Appear, Paragraph, Button } from "arwes";
import Clickable from "general/components/Clickable";
import { Link } from "react-router-dom";

import Global from "general/Global";

import userApi from "api/userApi";


function SignUp(props) {

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        const name = data.get("name");
        const email = data.get("email");
        const password = data.get("password");

        const res = await userApi.signUp({email, password, name});

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
            <Paragraph>Signup to SpaceX launches control.</Paragraph>

            <form onSubmit={handleSubmit} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
                <label htmlFor="name">Usename</label>
                <input type="text" id="name" name="name" placeholder="UserName" />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password"/>

                <Link to="/login" style={{color: '#26dafd', fontSize: 15, textDecoration: 'none', padding: '12px 0 0 20px'}}>
                    login ?
                </Link>

                <div align='right'>
                    <Clickable>
                        <Button animate 
                            show={props.entered} 
                            type="submit" 
                            layer="success"
                        >
                        Sign Up
                        </Button>
                    </Clickable>
                </div>

            </form>
        </Appear>
    )
}
  
export default SignUp;
