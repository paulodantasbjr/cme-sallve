import Logo from './assets/logo.gif';

export const App = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={Logo} alt="logo" />
    </div>
  );
};
