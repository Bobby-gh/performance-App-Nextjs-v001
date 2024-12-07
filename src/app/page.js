import { LoginForm } from "./components/forms";

export default function Login() {
  return (
    <main className="flex justify-center items-center h-screen bg-[url('https://img.freepik.com/premium-vector/vector-illustration-business-team-analysis-monitoring-web-report-dashboard-monitor_675567-3176.jpg?w=2000')]">
      <div className="card rounded-lg flex h-[80%] flex-wrap m-8 border border-slate-300 shadow-sm p-8 bg-slate-300">
        <LoginForm/>
      </div>
    </main>
  );
}
