import { Appear, Paragraph } from "arwes";


function NotFound(props) {

  return (
    <Appear animate show={props.entered} align='center'>
        <Paragraph>404 Not Found</Paragraph>
    </Appear>
  )
}


export default NotFound;
