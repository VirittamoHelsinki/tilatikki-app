import React, { useMemo } from 'react'
import { Group, Object3DEventMap } from "three";
import Cell from './cell';
import { useLoader, extend } from "@react-three/fiber";
import { SVGLoader } from "three-stdlib";

// TODO: Tell here what the component does

extend({ SVGLoader });

interface SvgProps {
  url: string;
  ref: React.MutableRefObject<Group<Object3DEventMap>>;
}

const Svg: React.FC<SvgProps> = ({ ref, url }) => {
  const { paths } = useLoader(SVGLoader, url);
  const shapes = useMemo(
    () =>
      paths.flatMap((p) =>
        p.toShapes(true).map((shape) => ({
          shape,
          color: p.color,
          fillOpacity: p.userData?.style.fillOpacity,
        })),
      ),
    [paths],
  );

  return (
    <group ref={ref}>
      {shapes.map((props) => (
        <Cell
          key={props.shape.uuid}
          color={props.color}
          shape={props.shape}
          fillOpacity={props.fillOpacity}
        />
      ))}
    </group>
  );
}

export default Svg
