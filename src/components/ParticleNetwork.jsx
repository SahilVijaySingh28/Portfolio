import React, { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleNetwork = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window", 
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab", 
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          grab: {
            distance: 200,
            links: {
              opacity: 0.8,
              color: "#00f0ff"
            }
          },
        },
      },
      particles: {
        color: {
          value: ["#00f0ff", "#a855f7", "#ec4899"], 
        },
        links: {
          color: "#a855f7",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80, 
        },
        opacity: {
          value: 0.6,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: false,
        zIndex: 0
      }
    }),
    [],
  );

  if (!init) return <div className="absolute inset-0 bg-transparent" />;

  return (
    <Particles
      id="hero-particles"
      options={options}
      className="absolute inset-0 z-0 pointer-events-none" 
    />
  );
};

export default React.memo(ParticleNetwork);
