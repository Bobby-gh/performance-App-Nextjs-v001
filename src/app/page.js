import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center items-center h-screen bg-[url('https://img.freepik.com/premium-photo/analytics-business-intelligence-concept_488220-10421.jpg')]">
      <div className="card rounded-lg flex h-[80%] flex-wrap m-8 border border-slate-300 shadow-sm p-8 bg-slate-300">
        <LoginForm/>
      </div>
    </main>
  );
}
