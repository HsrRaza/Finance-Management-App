import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User as UserIcon, Mail, Lock, Wallet, ArrowRight } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isRegistering } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-2">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#1F5C4A] text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">Create Account</CardTitle>
          <CardDescription>
            Join FinanceTracker to manage your personal financial health.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<UserIcon className="h-4 w-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2 gap-2"
              isLoading={isRegistering}
            >
              Sign Up
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-[#66717C] dark:text-[#9CA3AF]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#1F5C4A] dark:text-[#34A887] hover:underline"
            >
              Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
