import { SignUpForm } from "../components/forms";

export default function SignUp() {
  return (
    <main className="flex justify-end items-center h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/011/579/414/non_2x/busines-using-a-computer-to-complete-individual-income-tax-return-form-online-for-tax-payment-government-state-taxes-data-analysis-paperwork-financial-research-report-calculation-tax-return-free-photo.jpg')]">
      <div className="card  flex h-[100%] flex-wrap  border border-slate-700 shadow-sm p-8 bg-slate-300">
        <SignUpForm/>
      </div>
    </main>
  );
}
