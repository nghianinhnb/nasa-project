import { withSounds } from "arwes";

const Clickable = props => {
  // MARK: --- params ---
  const { children, sounds, onClick, ...rest } = props;


  // MARK: --- funxtions ---
  const clickWithSound = (e) => {
    sounds.click && sounds.click.play();
    onClick && onClick(e);
  };


  return (
    <span {...rest} onClick={clickWithSound}>
      {children}
    </span>
  );
};

export default withSounds()(Clickable);
