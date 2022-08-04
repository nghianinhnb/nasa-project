import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Appear, Table, Paragraph } from "arwes";

import InfoTable from "general/components/InfoTable";

import {thunkGetLaunchs} from 'pages/Upcoming/launchSlice';


function History(props) {
  // MARK: --- Params ---
  const dispatch = useDispatch();
  const launches = useSelector(state => state.launch.launches);


  // MARK: --- Hooks ---
  useEffect(() => {
    if (!launches.length) dispatch( thunkGetLaunchs({}) );
    // eslint-disable-next-line
  }, []);


  return (
    <article id="history">
      <Appear animate show={props.entered}>
        <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>

        <Table animate>

          <InfoTable
            colWidth={['2rem', '3rem', '9rem', '', '7rem']}
            headItems={['', 'No.', 'Date', 'Mission', 'Rocket', 'Customers']}
            dataItems={
              launches?.filter((launch) => !launch.upcoming).map((launch) => {
                return [
                  <span style={
                    {color: launch.success ? "greenyellow" : "red"}
                  }>█</span>,
                  launch.flightNumber,
                  new Date(launch.launchDate).toDateString(),
                  launch.mission,
                  launch.rocket,
                  launch.customers?.join(", "),
                ]
              })
            }
          />

        </Table>
      </Appear>
    </article>
  )
}
  
export default History;
