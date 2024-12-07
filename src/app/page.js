import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center items-center h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/029/179/477/original/digital-marketing-team-ready-to-use-banner-vector.jpg')]">
      <div className="card rounded-lg flex h-[80%] flex-wrap m-8 border border-slate-300 shadow-sm p-8 bg-slate-300">
        <LoginForm/>
      </div>
    </main>
  );
}
