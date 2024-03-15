import React, {
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { useLoader, extend } from "@react-three/fiber";
import { SVGLoader } from "three-stdlib";
import Outline from "~/components/outline";
import { Box3, Group, Sphere } from "three";
import Svg from "./svg";

extend({ SVGLoader });

interface BackgroundLayerProps {
  url: string;
  floor: string
}

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ floor, url }) => {
  const { pathname } = useLocation();
  const { paths } = useLoader(SVGLoader, url);
  const shapes = useMemo(
    () =>
      paths.flatMap((p) =>
        p.toShapes(true).map((shape) => ({
          shape,
          color: p.color,
        })),
      ),
    [paths],
  );

  function premiseFloor(): string {
    if (floor === "1.kerros") {
      return `/assets/${pathname}/kerros1-rooms.svg`;
    } else if (floor === "2.kerros") {
      return `/assets/${pathname}/kerros2-rooms.svg`;
    } else {
      return `/assets/${pathname}/kerros3-rooms.svg`;
    }
  }

  const ref = useRef<Group>(null!);

  useLayoutEffect(() => {
    const sphere = new Box3()
      .setFromObject(ref.current!)
      .getBoundingSphere(new Sphere());
    ref.current?.position.set(-sphere.center.x, -sphere.center.y, 0);
  }, []);

  return (
    <group ref={ref} scale={1} rotation={[0, 0, Math.PI / 360]}>
      {shapes.map((props) => (
        <Outline key={props.shape.uuid} shape={props.shape} />
      ))}
      <Svg url={premiseFloor()} ref={ref} />
    </group>
  );
}

export default BackgroundLayer
