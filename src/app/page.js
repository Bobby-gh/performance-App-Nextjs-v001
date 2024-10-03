import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center h-screen bg-[url(https://th.bing.com/th/id/OIP.q8_p_zFmlFuvaO2zxBPdlgHaEH?w=1800&h=1000&rs=1&pid=ImgDetMain')]">
      <div className="card rounded-lg flex flex-wrap m-8 border border-blue-950 shadow-lg shadow-blue-950 p-8 bg-slate-300">
        <LoginForm/>
      </div>
    </main>
  );
}
