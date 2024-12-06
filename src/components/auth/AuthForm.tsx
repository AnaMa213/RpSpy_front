import { login, signup } from "@/services/auth/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type AuthFormProps = {
  type: "signIn" | "signUp"; // Type de formulaire
  onSuccess?: () => void;   // Callback en cas de succès
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      if (type === "signIn") {
        // Appelle le service de connexion
        const response = await login(data.username, data.password);
        console.log("Connexion réussie :", response);
        if (onSuccess) onSuccess();
      } else if (type === "signUp") {
        // Appelle le service d'inscription
        const response = await signup(data.username, data.email, data.password, data.confirmPassword);
        console.log("Inscription réussie :", response);
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">{type === "signIn" ? "Connexion" : "Inscription"}</h1>

      {/* Champ Username */}
      <div className="mb-4">
        <Label htmlFor="username">Nom de compte</Label>
        <Input
          id="username"
          type="text"
          placeholder="Votre nom de compte"
          {...register("username", { required: "Nom de compte requis." })}
          className="mt-1"
        />
        {errors.username && typeof errors.username.message === "string" && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
        </div>

      {/* Champ Email pour Sign Up */}
      {type === "signUp" && (
        <div className="mb-4">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Votre adresse email"
            {...register("email", { required: "Email requis." })}
            className="mt-1"
          />
          {errors.email && typeof errors.email.message === "string" &&<p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      )}

      {/* Champ Mot de passe */}
      <div className="mb-4">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          {...register("password", { required: "Mot de passe requis." })}
          className="mt-1"
        />
        {errors.password && typeof errors.password.message === "string" && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Champ Confirmation du mot de passe pour Sign Up */}
      {type === "signUp" && (
        <div className="mb-4">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirmez votre mot de passe"
            {...register("confirmPassword", { required: "La confirmation est requise." })}
            className="mt-1"
          />
          {errors.confirmPassword && typeof errors.confirmPassword.message === "string" && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
      )}

      {/* Message d'erreur */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Bouton de soumission */}
      <Button type="submit" disabled={loading} className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600">
        {loading ? "Chargement..." : type === "signIn" ? "Se connecter" : "S'inscrire"}
      </Button>
    </form>
  );
};

export default AuthForm;

