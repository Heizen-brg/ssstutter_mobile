import React, {
  useContext,
  createContext,
  useCallback,
  useRef,
  useState,
} from "react";

const ConfettiContext = createContext({});

const ConfettiProvider = ({ children }) => {
  const refAnimationInstance = useRef(null);
  const [show, setShow] = useState(false);
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);
  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <ConfettiContext.Provider
      value={{
        getInstance,
        fire,
        show,
        setShow,
      }}
    >
      {children}
    </ConfettiContext.Provider>
  );
};
const useConfetti = () => useContext(ConfettiContext);

export { useConfetti, ConfettiProvider };
