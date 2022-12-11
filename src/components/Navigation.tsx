import styled from 'styled-components';

const NavigationButtons = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  margin: 0 auto;
  width: 35px;
  justify-content: space-between;
  z-index: 1000;
  left: 0;
  right: 0;
`;

const NavBtn = styled.div`
  border-style: solid;
  border-width: 0 7.5px 15px 7.5px;
  border-color: transparent transparent #ff3c00ed transparent;
  z-index: 1000;
`;

const Rotate = styled.div`
  transform: rotate(180deg);
`;

interface NavigationProps {
  moveSlide: (direction: number) => void;
}

function Navigation(props: NavigationProps) {
  return (
    <NavigationButtons role="slider-navigation">
      <NavBtn onClick={() => props.moveSlide(-1)} />
      <Rotate>
        <NavBtn onClick={() => props.moveSlide(1)} />
      </Rotate>
    </NavigationButtons>
  );
}

export default Navigation;
