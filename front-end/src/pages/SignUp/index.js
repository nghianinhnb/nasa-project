import { Appear, Paragraph, Button } from "arwes";
import Clickable from "general/components/Clickable";
import { Link } from "react-router-dom";


function SignUp(props) {


  return (
    <Appear animate show={props.entered} align='center'>
        <Paragraph>Signup to SpaceX launches control.</Paragraph>

        <form onSubmit={()=>{}} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
            <label htmlFor="usename">Usename</label>
            <input type="text" id="usename" name="usename" placeholder="Username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password"/>
            <label htmlFor="password2">Confirm</label>
            <input type="password2" id="password2" name="password2" placeholder="Confirm Password"/>

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
