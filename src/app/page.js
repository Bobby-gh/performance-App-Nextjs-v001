import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center h-screen bg-[url('https://img.freepik.com/premium-photo/close-up-business-man-hand-pointing-creative-glowing-business-chart-interface-hologram_670147-12910.jpg')]">
      <div className="card rounded-lg flex flex-wrap m-8 border border-blue-950 shadow-lg shadow-blue-950 p-8 bg-slate-300">
        <LoginForm/>
      </div>
    </main>
  );
}
