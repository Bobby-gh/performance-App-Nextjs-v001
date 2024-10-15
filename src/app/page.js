import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center items-center h-screen bg-[url('https://www.afmssc.com/images/AFMS/Home/AFMS_Showcase/Image3.jpg#joomlaImage:/local-images/AFMS/Home/AFMS_Showcase/Image3.jpg?width=1800&height=1000')]">
      <div className="card rounded-lg flex h-[70%] flex-wrap m-8 border border-blue-950 shadow-lg shadow-blue-950 p-8 bg-slate-300">
        <LoginForm/>
      </div>
    </main>
  );
}
