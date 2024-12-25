import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-end items-center h-screen bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/dryz9drg2/images/w_2560,h_1047,c_scale/f_auto,q_auto/v1711432895/How-To-Create-Asana-Task-Using-Record-Trigger-Flow/How-To-Create-Asana-Task-Using-Record-Trigger-Flow.webp?_i=AA')]">
      <div className="card  flex h-[100%] flex-wrap  border border-slate-300 shadow-sm p-8  bg-white">
        <LoginForm/>
      </div>
    </main>
  );
}
