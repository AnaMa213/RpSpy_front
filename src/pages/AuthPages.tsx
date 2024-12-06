import AuthForm from "@/components/auth/AuthForm";

const LoginPage = () => {
  const handleSuccess = () => {
    alert("Connexion réussie !");
    window.location.href = "/dashboard";
  };

  return <AuthForm type="signIn" onSuccess={handleSuccess} />;
};

const SignupPage = () => {
  const handleSuccess = () => {
    window.location.href = "/dashboard";
  };

  return <AuthForm type="signUp" onSuccess={handleSuccess} />;
};

export { LoginPage, SignupPage };

