import React, { useEffect } from 'react';
import { withStyles, Appear, Link, Paragraph, Table, Words } from "arwes";
import { useSelector, useDispatch } from 'react-redux';

import Clickable from "../../general/components/Clickable";
import InfoTable from "../../general/components/InfoTable";

import style from "./style";

import {thunkGetLaunchs, thunkAbortLaunch} from 'pages/Upcoming/launchSlice';


function Upcoming(props) {
  const dispatch = useDispatch();

  // MARK: --- Params ---
  const { entered, classes } = props;
  const launches = useSelector(state => state.launch.launches);

  // MARK: --- Hooks ---
  useEffect(() => {
    if (!launches.length) dispatch( thunkGetLaunchs({}) );
  }, []);


  return (
    <Appear id="upcoming" animate show={entered}>
      <Paragraph>Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.</Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>

      <Table animate show={entered}>
        <InfoTable
          colWidth={['3rem', '3rem', '10rem', '11rem', '11rem']}
          headItems={['', 'No.', 'Date', 'Mission', 'Rocket']}
          dataItems={
            launches?.filter((launch) => launch.upcoming).map((launch) => {
              return [
                <Clickable style={{color:"red"}}>
                  <Link className={classes.link} onClick={() => dispatch( thunkAbortLaunch({_id: launch._id}) )}>
                    ✖
                  </Link>
                </Clickable>,
                launch.flightNumber,
                new Date(launch.launchDate).toDateString(),
                launch.mission,
                launch.rocket,
                launch.target,
              ]
            })
          }
        />
      </Table>

    </Appear>
  )
}

export default withStyles(style)(Upcoming);
