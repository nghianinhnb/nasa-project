import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Appear, Button, Loading, Paragraph } from "arwes";
import Clickable from "../../general/components/Clickable";

import {thunkGetAllPlanets} from 'pages/Launch/planetSlice';
import {updateCreatePending, addLaunch} from 'pages/Upcoming/launchSlice';

import launchApi from "api/launchApi";


function Launch(props) {
  const dispatch = useDispatch();

  // MARK: --- Params ---
  const {sounds} = props;
  const {planets} = useSelector(state => state.planet);
  const {createPending} = useSelector(state => state.launch);

  const selectorBody = useMemo(() => {
    return planets?.map(planet => 
      <option value={planet.name} key={planet.name}>{planet.name}</option>
    );
  }, [planets]);

  const today = new Date().toISOString().split("T")[0];


  // MARK: --- Functions ---
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateCreatePending(true));

    const data = new FormData(e.target);

    const launchDate = new Date(data.get("launch-day")).toUTCString();
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");

    const res = await launchApi.createLaunch({launchDate, mission, rocket, target});
    const {result, detail} = res.data;
    if (result==='success') {
      setTimeout(() => {
        sounds.success.play()
        dispatch(updateCreatePending(false));
        dispatch(addLaunch(detail));
      }, 600);
    } else {
      setTimeout(() => {
        console.log('fail')
        dispatch(updateCreatePending(false));
        sounds.warning.play();
      }, 600);
    }
  }

  // MARK: --- Hooks ---
  useEffect(() => {
    if (!planets.length) dispatch( thunkGetAllPlanets({}) );
  });


  return (
    <Appear id="launch" animate show={props.entered}>
      <Paragraph>Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.</Paragraph>
      <Paragraph>Only confirmed planets matching the following criteria are available for the earliest scheduled missions:</Paragraph>
      <ul>
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value</li>
      </ul>

      <form onSubmit={handleSubmit} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
        <label htmlFor="launch-day">Launch Date</label>
        <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} />
        <label htmlFor="mission-name">Mission Name</label>
        <input type="text" id="mission-name" name="mission-name" />
        <label htmlFor="rocket-name">Rocket Type</label>
        <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" />
        <label htmlFor="planets-selector">Destination Exoplanet</label>
        <select id="planets-selector" name="planets-selector">
          {selectorBody}
        </select>
        <Clickable>
          <Button animate 
            show={props.entered} 
            type="submit" 
            layer="success" 
            disabled={createPending}>
            Launch Mission ✔
          </Button>
        </Clickable>
        {createPending &&
          <Loading animate small />
        }
      </form>
    </Appear>
  )
};

export default Launch;
