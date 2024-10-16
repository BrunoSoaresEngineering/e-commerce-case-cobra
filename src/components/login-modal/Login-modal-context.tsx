'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type LoginModalContextProps = {
  children: ReactNode
}

type LoginModalContext = {
  isLoginModalOpen: boolean,
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>
}

const LoginModalCtx = createContext<LoginModalContext>({
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
});
function useLoginModalContext() {
  return useContext(LoginModalCtx);
}

function LoginModalContext({ children }: LoginModalContextProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const loginModalContextValue = useMemo(() => ({
    isLoginModalOpen,
    setIsLoginModalOpen,
  }), [isLoginModalOpen]);

  return (
    <LoginModalCtx.Provider value={loginModalContextValue}>
      {children}
    </LoginModalCtx.Provider>
  );
}
export default LoginModalContext;

export {
  useLoginModalContext,
};
