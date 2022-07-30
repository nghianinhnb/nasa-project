import { Appear, Paragraph, Button } from "arwes";
import Clickable from "general/components/Clickable";
import { Link } from "react-router-dom";


function Login(props) {


  return (
    <Appear animate show={props.entered} align='center'>
        <Paragraph>Login to SpaceX launches control.</Paragraph>

        <form onSubmit={()=>{}} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
            <label htmlFor="usename">Usename</label>
            <input type="text" id="usename" name="usename" placeholder="Username" />
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

            <a href={`${process.env.REACT_APP_BASE_URL}/auth/google`} style={{color: '#26dafd'}}>Login with Google</a>
        </form>
    </Appear>
  )
}
  
export default Login;
