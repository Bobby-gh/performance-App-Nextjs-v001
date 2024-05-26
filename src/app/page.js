import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center h-screen bg-slate-300">
      <div className="card rounded-lg flex flex-wrap m-8 border border-blue-950 shadow-lg shadow-blue-950 p-8">
        <LoginForm/>
      </div>
    </main>
  );
}
