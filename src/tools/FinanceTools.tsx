import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Legend,
} from "recharts";

/* ─── Chart colour palette ─── */
const C = {
  blue:  "#3b82f6",
  light: "#bfdbfe",
  green: "#10b981",
  lgreen:"#a7f3d0",
  red:   "#ef4444",
  amber: "#f59e0b",
  slate: "#94a3b8",
};

/* ─── Shared helpers ─── */
const fmt  = (n: number, d = 2) => n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtI = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 pb-1 border-b border-border">{title}</p>
    {children}
  </div>
);

const Row = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-center justify-between gap-2 py-0.5">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm font-semibold tabular-nums ${accent ? "text-primary" : "text-foreground"}`}>{value}</span>
  </div>
);

const Hero = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="bg-primary/8 border border-primary/20 rounded-2xl p-4 text-center">
    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-display font-black text-primary leading-none">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const SplitBar = ({ leftLabel, leftPct, rightLabel, leftColor = C.blue, rightColor = C.light }:
  { leftLabel: string; leftPct: number; rightLabel: string; leftColor?: string; rightColor?: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>{leftLabel} ({leftPct.toFixed(1)}%)</span>
      <span>{rightLabel} ({(100 - leftPct).toFixed(1)}%)</span>
    </div>
    <div className="h-2 rounded-full bg-muted overflow-hidden flex">
      <div className="rounded-l-full transition-all" style={{ width: `${leftPct}%`, background: leftColor }} />
      <div className="flex-1 rounded-r-full" style={{ background: rightColor }} />
    </div>
  </div>
);

const EmptyPanel = ({ text }: { text: string }) => (
  <div className="min-h-[200px] border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground p-8 text-center bg-muted/10 text-sm">{text}</div>
);

const ResultPanel = ({ children }: { children: React.ReactNode }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4 bg-card/60 border border-border rounded-2xl p-5 shadow-sm">{children}</div>
);

const ChartWrap = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="space-y-2">
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 pb-1 border-b border-border">{title}</p>
    <div style={{ height: 170 }}>{children}</div>
  </div>
);

const DonutTooltip = ({ active, payload }: any) =>
  active && payload?.length ? (
    <div className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs shadow-lg">
      <span className="font-semibold">{payload[0].name}:</span> {fmtI(payload[0].value)}
    </div>
  ) : null;

const LineTooltip = ({ active, payload, label }: any) =>
  active && payload?.length ? (
    <div className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs shadow-lg space-y-0.5">
      <p className="font-semibold text-muted-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {fmtI(p.value)}</p>
      ))}
    </div>
  ) : null;

/* ─── EMI Calculator ─── */
export function EmiCalculator() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate]     = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [tenureType, setTenureType] = useState<"years"|"months">("years");
  const [result, setResult] = useState<{ emi: number; total: number; interest: number; n: number; p: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount), r = parseFloat(rate) / 12 / 100;
    const n = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);
    if (p > 0 && r > 0 && n > 0) {
      const emi   = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      setResult({ emi, total, interest: total - p, n, p });
    }
  };

  const pieData = result
    ? [{ name: "Principal", value: result.p }, { name: "Interest", value: result.interest }]
    : [];

  return (
    <>
      <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
        <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
          <CardHeader><CardTitle>EMI Calculator</CardTitle><CardDescription>Calculate your equated monthly installment</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2"><Label>Loan Amount (₹)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2"><Label>Interest Rate (% p.a.)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2">
              <Label>Loan Tenure</Label>
              <div className="flex gap-3">
                <Input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="flex-1 bg-background" />
                <Select value={tenureType} onValueChange={(v: "years"|"months") => setTenureType(v)}>
                  <SelectTrigger className="w-[110px] bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="years">Years</SelectItem><SelectItem value="months">Months</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate EMI</Button>
          </CardContent>
        </Card>

        {result ? (
          <ResultPanel>
            <Hero label="Monthly EMI" value={fmtI(result.emi)} sub={`for ${result.n} months`} />
            <Section title="Loan Cost Summary">
              <Row label="Principal Amount"            value={fmtI(result.p)} />
              <Row label="Total Interest Payable"      value={fmtI(result.interest)} accent />
              <Row label="Total Payment"               value={fmtI(result.total)} />
              <Row label="Interest-to-Principal Ratio" value={`${((result.interest / result.p) * 100).toFixed(1)}%`} />
            </Section>
            <Section title="Payment Breakdown">
              <SplitBar leftLabel="Principal" leftPct={(result.p / result.total) * 100} rightLabel="Interest" />
            </Section>
            <ChartWrap title="Payment Split (Donut)">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                    <Cell fill={C.blue} /><Cell fill={C.light} />
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrap>
          </ResultPanel>
        ) : (
          <EmptyPanel text="Enter your loan details and calculate to see the full breakdown." />
        )}
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">EMI Calculator – Calculate Loan EMI Instantly</h2>
            <p className="text-gray-600 leading-relaxed">Planning your loan repayment just got easier with our free EMI calculator. Whether you're considering a home loan, car loan, or personal loan, this tool helps you determine your Equated Monthly Installment quickly and accurately. Simply input your loan amount, interest rate, and tenure to get instant results. Our EMI calculator India is designed for users seeking precise calculations without any hassle. Start calculating your loan EMI today and make informed financial decisions with confidence.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">EMI, or Equated Monthly Installment, is the fixed monthly payment you make towards repaying a loan. It includes both the principal amount and the interest charged by the lender. Understanding EMI meaning is crucial for anyone taking out a loan, as it represents your monthly installment commitment. The loan EMI breaks down into portions that reduce your outstanding balance over time. This concept ensures borrowers pay off their debt systematically while managing their monthly budget. Knowing how EMI works helps in better financial planning, especially for long-term loans like home or car purchases in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How to Use EMI Calculator</h2>
            <p className="text-gray-600 leading-relaxed">Using our loan EMI calculator is straightforward. Follow these steps:</p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Enter the loan amount: This is the total sum you plan to borrow, such as ₹10,00,000 for a home loan.</li>
              <li>Input the interest rate: Provide the annual interest rate offered by your lender, like 7.5% for a car loan.</li>
              <li>Specify the tenure: Choose the loan repayment period in months or years, for example, 20 years for a home loan EMI calculator.</li>
              <li>Click calculate: The tool instantly computes your monthly EMI, total interest, and total amount payable.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">Our EMI calculator India supports various loan types, making it versatile for personal finance needs.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">EMI Formula</h2>
            <p className="text-gray-600 leading-relaxed">The EMI formula calculates the fixed monthly payment for a loan. Mathematically, it's EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the number of installments. To understand how to calculate EMI, divide the annual interest rate by 12 for R and convert tenure to months for N. This formula ensures accurate loan EMI calculations. For instance, a higher interest rate increases your monthly payment, while a longer tenure reduces it but increases total interest. Our tool uses this exact EMI formula for reliable results, helping users grasp the mechanics behind their payments.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Example Calculation</h2>
            <p className="text-gray-600 leading-relaxed">Let's illustrate with a car loan EMI calculator example. Suppose you borrow ₹5,00,000 at 8% annual interest for 5 years (60 months). Using the EMI formula, your monthly installment would be approximately ₹10,326. The total interest paid over the tenure is ₹1,19,560, and the total amount repayable is ₹6,19,560. If you increase the tenure to 7 years, the EMI drops to about ₹7,982, but total interest rises to ₹1,68,880. This example shows how inputs like interest rate and loan tenure affect your EMI. Experiment with our tool to see variations for home loan EMI calculator scenarios in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Benefits of Using EMI Calculator</h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Quick calculation: Get instant results without manual math or complex spreadsheets.</li>
              <li>Financial planning: Understand your monthly obligations and plan your budget effectively.</li>
              <li>Loan comparison: Compare different loans by adjusting interest rates and tenures easily.</li>
              <li>Transparency: See breakdowns of principal and interest for better decision-making.</li>
              <li>Accessibility: Available online for free, making it ideal for Indian users seeking reliable loan EMI calculator tools.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">These benefits make it an essential tool for borrowers in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800">What is EMI?</p>
                <p className="text-gray-600 leading-relaxed">EMI stands for Equated Monthly Installment, the fixed amount you pay monthly to repay a loan, including principal and interest.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How is EMI calculated?</p>
                <p className="text-gray-600 leading-relaxed">EMI is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is principal, R is monthly rate, and N is tenure.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Can EMI change?</p>
                <p className="text-gray-600 leading-relaxed">Yes, EMI can change if the lender adjusts interest rates or if you modify loan terms, but fixed-rate loans keep it constant.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">What affects EMI?</p>
                <p className="text-gray-600 leading-relaxed">Factors like loan amount, interest rate, and tenure directly affect EMI; higher amounts or rates increase it, longer tenures decrease monthly payment but raise total interest.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Is EMI the same for all loans?</p>
                <p className="text-gray-600 leading-relaxed">No, EMI varies by loan type, such as home loan EMI calculator vs. car loan EMI calculator, depending on rates and amounts.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Why use an EMI calculator India?</p>
                <p className="text-gray-600 leading-relaxed">It helps Indian borrowers estimate payments accurately, aiding in financial planning and loan comparisons.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How accurate is the EMI formula?</p>
                <p className="text-gray-600 leading-relaxed">The formula is precise for standard loans, but actual EMIs may vary slightly due to fees or compounding methods.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Related Tools</h2>
            <p className="text-gray-600 leading-relaxed">For comprehensive financial planning, explore our related tools. Calculate your investments with our <a href="/tool/sip" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">SIP calculator</a> to grow wealth systematically. Use the <a href="/tool/gst" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">GST calculator</a> for accurate tax computations on goods and services. Check your tax liability with the <a href="/tool/income-tax" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">income tax calculator</a> tailored for Indian users. These tools complement your loan EMI calculator usage for holistic financial management.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── SIP Calculator ─── */
export function SipCalculator() {
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate]       = useState("12");
  const [years, setYears]     = useState("10");
  const [result, setResult]   = useState<{ invested: number; returns: number; total: number; cagr: number; growthPct: number; chartData: any[] } | null>(null);

  const calculate = () => {
    const P = parseFloat(monthly), i = parseFloat(rate) / 100 / 12, n = parseFloat(years) * 12;
    if (P > 0 && i > 0 && n > 0) {
      const total    = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = P * n;
      const cagr     = (Math.pow(total / invested, 1 / parseFloat(years)) - 1) * 100;
      const chartData = [];
      for (let y = 1; y <= parseFloat(years); y++) {
        const mn  = y * 12;
        const val = P * ((Math.pow(1 + i, mn) - 1) / i) * (1 + i);
        chartData.push({ year: `Y${y}`, Invested: Math.round(P * mn), Returns: Math.round(val - P * mn) });
      }
      setResult({ invested, returns: total - invested, total, cagr, growthPct: ((total - invested) / invested) * 100, chartData });
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
        <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
          <CardHeader><CardTitle>SIP Calculator</CardTitle><CardDescription>Estimate your mutual fund SIP returns</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2"><Label>Monthly Investment (₹)</Label><Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2"><Label>Expected Return Rate (% p.a.)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2"><Label>Investment Duration (Years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="bg-background" /></div>
            <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate Returns</Button>
          </CardContent>
        </Card>

        {result ? (
          <ResultPanel>
            <Hero label="Final Maturity Value" value={fmtI(result.total)} sub={`after ${years} years`} />
            <Section title="Investment Summary">
              <Row label="Total Invested"    value={fmtI(result.invested)} />
              <Row label="Estimated Returns" value={fmtI(result.returns)} accent />
              <Row label="Wealth Gain"       value={fmtI(result.returns)} />
              <SplitBar leftLabel="Invested" leftPct={(result.invested / result.total) * 100} rightLabel="Returns" />
            </Section>
            <Section title="Growth Metrics">
              <Row label="CAGR"             value={`${result.cagr.toFixed(2)}%`} accent />
              <Row label="Investment Growth" value={`${result.growthPct.toFixed(1)}%`} />
            </Section>
            <ChartWrap title="Yearly Growth Breakdown">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sipInv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.blue}  stopOpacity={0.25} />
                      <stop offset="95%" stopColor={C.blue}  stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="sipRet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.green} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={C.green} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={48} />
                  <Tooltip content={<LineTooltip />} />
                  <Area type="monotone" dataKey="Invested" stackId="1" stroke={C.blue}  fill="url(#sipInv)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Returns"  stackId="1" stroke={C.green} fill="url(#sipRet)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrap>
          </ResultPanel>
        ) : (
          <EmptyPanel text="Enter your SIP details to see projected wealth and growth breakdown." />
        )}
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">SIP Calculator – Calculate Investment Returns Instantly</h2>
            <p className="text-gray-600 leading-relaxed">Planning your wealth creation journey just got easier with our free SIP calculator. Whether you're investing in mutual funds or other instruments, this tool helps you estimate your Systematic Investment Plan returns quickly and accurately. Simply input your monthly investment, expected return rate, and duration to get instant projections. Our SIP calculator India is designed for investors seeking reliable calculations without any hassle. Start calculating your investment growth today and build a secure financial future with confidence.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">SIP, or Systematic Investment Plan, is a disciplined approach to investing where you invest a fixed amount regularly. Understanding SIP meaning is crucial for long-term wealth building, as it promotes regular savings and benefits from rupee-cost averaging. An investment plan like SIP reduces the impact of market volatility by spreading investments over time. Your monthly investment grows through compounding, making it an effective strategy for financial goals. Knowing how SIP works helps in creating a robust portfolio for retirement or other objectives in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How to Use SIP Calculator</h2>
            <p className="text-gray-600 leading-relaxed">Using our investment calculator is straightforward. Follow these steps:</p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Enter the monthly investment: This is the amount you plan to invest regularly, such as ₹5,000 per month.</li>
              <li>Input the expected return rate: Provide the annual expected rate, like 12% for mutual fund SIP calculator scenarios.</li>
              <li>Specify the investment duration: Choose the time period in years, for example, 10 years for long-term growth.</li>
              <li>Click calculate: The tool instantly computes your maturity value, total returns, and growth metrics.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">Our SIP calculator India supports various scenarios, making it versatile for personal finance planning.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">SIP Formula</h2>
            <p className="text-gray-600 leading-relaxed">The SIP formula calculates the maturity value of regular investments. Mathematically, it's MV = P × [(1+r)^n - 1] × (1+r)/r, where P is monthly investment, r is monthly rate, and n is number of months. To understand how to calculate SIP returns, divide the annual rate by 12 for r and multiply years by 12 for n. This formula incorporates compounding growth, ensuring accurate projections. For instance, higher return rates or longer durations significantly boost your wealth. Our tool uses this exact SIP formula for reliable investment growth calculations, helping users plan effectively.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Example Calculation</h2>
            <p className="text-gray-600 leading-relaxed">Let's illustrate with a mutual fund SIP calculator example. Suppose you invest ₹10,000 monthly at 12% annual returns for 15 years. Using the SIP formula, your maturity value would be approximately ₹51,29,000. The total invested is ₹18,00,000, with estimated returns of ₹33,29,000. If you increase the monthly amount to ₹15,000, the value grows to ₹76,93,000. This example shows how consistent investing and compounding lead to substantial wealth creation. Experiment with our tool to see variations for different SIP return examples in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Benefits of Using SIP Calculator</h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Wealth planning: Project your future corpus and plan for financial goals effectively.</li>
              <li>Compounding growth: Understand how regular investments multiply over time.</li>
              <li>Risk mitigation: See the benefits of rupee-cost averaging in volatile markets.</li>
              <li>Goal tracking: Monitor progress towards retirement or other long-term objectives.</li>
              <li>Accessibility: Free online tool for Indian investors to estimate SIP returns accurately.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">These benefits make SIP an essential strategy for disciplined investing in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800">What is SIP?</p>
                <p className="text-gray-600 leading-relaxed">SIP is a Systematic Investment Plan where you invest a fixed amount regularly in mutual funds or other instruments.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How does SIP work?</p>
                <p className="text-gray-600 leading-relaxed">SIP works by investing fixed amounts at regular intervals, benefiting from market fluctuations through rupee-cost averaging.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Is SIP safe?</p>
                <p className="text-gray-600 leading-relaxed">SIP is relatively safe for long-term investing as it reduces timing risk and promotes disciplined savings.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How much should I invest in SIP?</p>
                <p className="text-gray-600 leading-relaxed">Start with an amount you can afford monthly, ideally 10-20% of your income, depending on your financial goals.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Can SIP guarantee returns?</p>
                <p className="text-gray-600 leading-relaxed">SIP does not guarantee returns; performance depends on market conditions and fund selection.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Why use a SIP calculator India?</p>
                <p className="text-gray-600 leading-relaxed">It helps Indian investors estimate future values and make informed decisions for wealth creation.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How accurate is the SIP formula?</p>
                <p className="text-gray-600 leading-relaxed">The formula provides projections based on assumptions; actual returns may vary due to market factors.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Related Tools</h2>
            <p className="text-gray-600 leading-relaxed">For comprehensive financial planning, explore our related tools. Calculate your loan repayments with our <a href="/tool/emi" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">EMI calculator</a>. Use the <a href="/tool/gst" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">GST calculator</a> for accurate tax computations on goods and services. Check your tax liability with the <a href="/tool/income-tax" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">income tax calculator</a> tailored for Indian users. These tools complement your SIP calculator usage for holistic financial management.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Compound Interest Calculator ─── */
export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate]           = useState("8");
  const [years, setYears]         = useState("5");
  const [freq, setFreq]           = useState("4");
  const [result, setResult]       = useState<{ amount: number; interest: number; ear: number; growthPct: number; doubling: number; chartData: any[] } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal), r = parseFloat(rate) / 100, t = parseFloat(years), n = parseFloat(freq);
    if (P > 0 && r > 0 && t > 0) {
      const amount   = P * Math.pow(1 + r / n, n * t);
      const ear      = (Math.pow(1 + r / n, n) - 1) * 100;
      const chartData = [];
      for (let y = 1; y <= Math.min(t, 10); y++) {
        const val = P * Math.pow(1 + r / n, n * y);
        chartData.push({ year: `Y${y}`, Principal: Math.round(P), Interest: Math.round(val - P) });
      }
      setResult({ amount, interest: amount - P, ear, growthPct: ((amount - P) / P) * 100, doubling: Math.log(2) / Math.log(1 + r / n) / n, chartData });
    }
  };

  const freqLabel: Record<string, string> = { "1": "Annually", "2": "Semi-Annually", "4": "Quarterly", "12": "Monthly" };

  return (
    <>
      <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
        <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
          <CardHeader><CardTitle>Compound Interest Calculator</CardTitle><CardDescription>See how your money grows with compounding</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2"><Label>Principal Amount (₹)</Label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2"><Label>Interest Rate (% p.a.)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2"><Label>Time Period (Years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="bg-background" /></div>
            <div className="space-y-2">
              <Label>Compounding Frequency</Label>
              <Select value={freq} onValueChange={setFreq}>
                <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem><SelectItem value="2">Semi-Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem><SelectItem value="12">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate Growth</Button>
          </CardContent>
        </Card>

        {result ? (
          <ResultPanel>
            <Hero label="Final Value" value={fmtI(result.amount)} sub={`${freqLabel[freq]} compounding`} />
            <Section title="Interest Summary">
              <Row label="Principal Amount"    value={fmtI(parseFloat(principal))} />
              <Row label="Total Interest"      value={fmtI(result.interest)} accent />
              <SplitBar leftLabel="Principal"  leftPct={(parseFloat(principal) / result.amount) * 100} rightLabel="Interest" />
            </Section>
            <Section title="Growth Metrics">
              <Row label="Effective Annual Rate (EAR)" value={`${result.ear.toFixed(3)}%`} accent />
              <Row label="Overall Growth"              value={`${result.growthPct.toFixed(2)}%`} />
              <Row label="Doubling Time"               value={`${result.doubling.toFixed(1)} years`} />
            </Section>
            <ChartWrap title="Growth Chart (Principal + Interest)">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ciP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.blue}  stopOpacity={0.3} />
                      <stop offset="95%" stopColor={C.blue}  stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="ciI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.amber} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={C.amber} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={48} />
                  <Tooltip content={<LineTooltip />} />
                  <Area type="monotone" dataKey="Principal" stackId="1" stroke={C.blue}  fill="url(#ciP)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Interest"  stackId="1" stroke={C.amber} fill="url(#ciI)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrap>
          </ResultPanel>
        ) : (
          <EmptyPanel text="Enter your details to calculate compound interest with growth breakdown." />
        )}
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Compound Interest Calculator – Calculate Investment Growth Instantly</h2>
            <p className="text-gray-600 leading-relaxed">Understanding the power of compounding has never been easier with our free compound interest calculator. Whether you're saving for retirement, investing in stocks, or planning any financial growth, this tool helps you see how your money multiplies over time. Simply input your principal amount, interest rate, time period, and compounding frequency to get instant results. Our compound interest calculator India is perfect for investors seeking precise growth projections. Start calculating your financial growth today and harness the magic of compounding for wealth building.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">Compound interest is the interest earned on both the initial principal and the accumulated interest from previous periods. This creates a snowball effect where your money grows exponentially over time. Understanding compound interest meaning is essential for long-term financial planning, as it shows how reinvested earnings accelerate wealth creation. Unlike simple interest, compounding adds interest on interest, making it a powerful tool for investors. Knowing how compound interest works helps in making informed decisions about savings and investments in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How to Use Compound Interest Calculator</h2>
            <p className="text-gray-600 leading-relaxed">Using our interest calculator is simple. Follow these steps:</p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Enter the principal amount: This is your initial investment, such as ₹1,00,000.</li>
              <li>Input the interest rate: Provide the annual rate, like 8% for investment growth calculator scenarios.</li>
              <li>Specify the time period: Choose the duration in years, for example, 5 years.</li>
              <li>Select compounding frequency: Choose how often interest compounds, such as quarterly.</li>
              <li>Click calculate: The tool instantly shows your final amount and growth breakdown.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">Our compound interest calculator India supports various frequencies for accurate projections.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Compound Interest Formula</h2>
            <p className="text-gray-600 leading-relaxed">The compound interest formula calculates the future value of an investment. Mathematically, it's A = P(1 + r/n)^(nt), where A is final amount, P is principal, r is rate, n is compounding frequency, and t is time. To understand how to calculate compound interest, divide the annual rate by n for periodic rate and multiply by n for periods. This formula demonstrates exponential growth through compounding. For instance, more frequent compounding or higher rates significantly increase returns. Our tool uses this exact compound interest formula for reliable investment growth calculations.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Example Calculation</h2>
            <p className="text-gray-600 leading-relaxed">Let's illustrate with a compound interest calculator example. Suppose you invest ₹50,000 at 7% annual interest for 10 years with quarterly compounding. Using the formula, your final amount would be approximately ₹98,100. The total interest earned is ₹48,100, showing 96.2% growth. If compounded annually instead, the amount drops to ₹96,700. This example highlights how compounding frequency affects your investment growth. Experiment with our tool to see variations for different compound interest examples in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Benefits of Using Compound Interest Calculator</h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Financial growth projection: Visualize how your investments grow over time.</li>
              <li>Compounding understanding: Learn the impact of different compounding frequencies.</li>
              <li>Investment comparison: Compare various rates and periods for better decisions.</li>
              <li>Goal planning: Set realistic targets for savings and wealth building.</li>
              <li>Educational tool: Free access for Indian users to understand compound interest concepts.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">These benefits make compound interest a cornerstone of smart investing in India.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800">What is compound interest?</p>
                <p className="text-gray-600 leading-relaxed">Compound interest is interest earned on both the principal and previously earned interest, leading to exponential growth.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How does compounding work?</p>
                <p className="text-gray-600 leading-relaxed">Compounding works by adding interest to the principal, so future interest is calculated on a larger amount.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">What affects compound interest?</p>
                <p className="text-gray-600 leading-relaxed">Principal amount, interest rate, time period, and compounding frequency all affect compound interest growth.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Is compound interest better than simple interest?</p>
                <p className="text-gray-600 leading-relaxed">Yes, compound interest grows faster due to interest on interest, making it better for long-term investments.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How often should interest compound?</p>
                <p className="text-gray-600 leading-relaxed">More frequent compounding, like monthly or quarterly, leads to higher returns than annual compounding.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Why use a compound interest calculator India?</p>
                <p className="text-gray-600 leading-relaxed">It helps Indian investors project growth accurately and make informed financial decisions.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How accurate is the compound interest formula?</p>
                <p className="text-gray-600 leading-relaxed">The formula is mathematically precise for constant rates; actual market returns may vary.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Related Tools</h2>
            <p className="text-gray-600 leading-relaxed">For comprehensive financial planning, explore our related tools. Calculate your loan repayments with our <a href="/tool/emi" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">EMI calculator</a>. Estimate mutual fund returns with our <a href="/tool/compound-interest" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">compound interest calculator</a>. Check your tax liability with the <a href="/tool/income-tax" className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200">income tax calculator</a> tailored for Indian users. These tools complement your compound interest calculator usage for holistic financial management.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── GST Calculator ─── */
export function GstCalculator() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate]     = useState("18");
  const [mode, setMode]     = useState<"add"|"remove">("add");
  const [result, setResult] = useState<{ base: number; gst: number; total: number; cgst: number; sgst: number; taxImpact: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount), r = parseFloat(rate);
    if (a > 0 && r >= 0) {
      let base: number, gst: number, total: number;
      if (mode === "add") { base = a; gst = a * (r / 100); total = a + gst; }
      else { base = a / (1 + r / 100); gst = a - base; total = a; }
      setResult({ base, gst, total, cgst: gst / 2, sgst: gst / 2, taxImpact: (gst / total) * 100 });
    }
  };

  const pieData = result
    ? [{ name: "Base Amount", value: Math.round(result.base) }, { name: "CGST", value: Math.round(result.cgst) }, { name: "SGST", value: Math.round(result.sgst) }]
    : [];
  const COLORS = [C.blue, C.amber, C.green];

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
      <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
        <CardHeader><CardTitle>GST Calculator</CardTitle><CardDescription>Add or remove Goods &amp; Services Tax</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2"><Label>Amount (₹)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2">
            <Label>GST Rate (%)</Label>
            <Select value={rate} onValueChange={setRate}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0.25">0.25%</SelectItem><SelectItem value="3">3%</SelectItem>
                <SelectItem value="5">5%</SelectItem><SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem><SelectItem value="28">28%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <RadioGroup value={mode} onValueChange={(v: "add"|"remove") => setMode(v)} className="flex gap-6 py-1">
            <div className="flex items-center gap-2"><RadioGroupItem value="add" id="g-add" /><Label htmlFor="g-add">Add GST</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="remove" id="g-remove" /><Label htmlFor="g-remove">Remove GST</Label></div>
          </RadioGroup>
          <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate GST</Button>
        </CardContent>
      </Card>

      {result ? (
        <ResultPanel>
          <Hero label={mode === "add" ? "Final Amount (with GST)" : "Base Amount (ex-GST)"} value={`₹${fmt(result.total)}`} sub={`GST @ ${rate}%`} />
          <Section title="Calculation Summary">
            <Row label="Base Amount (Pre-Tax)"   value={`₹${fmt(result.base)}`} />
            <Row label="GST Amount"              value={`₹${fmt(result.gst)}`} accent />
            <Row label="Final Amount (Inc. GST)" value={`₹${fmt(result.total)}`} />
          </Section>
          <Section title="GST Breakdown (Intra-State)">
            <Row label={`CGST (${parseFloat(rate) / 2}%)`} value={`₹${fmt(result.cgst)}`} />
            <Row label={`SGST (${parseFloat(rate) / 2}%)`} value={`₹${fmt(result.sgst)}`} />
            <Row label={`IGST (${rate}% — Inter-State)`}   value={`₹${fmt(result.gst)}`} accent />
            <Row label="Tax as % of Final Amount"          value={`${result.taxImpact.toFixed(2)}%`} />
          </Section>
          <ChartWrap title="Tax Distribution (Donut)">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrap>
        </ResultPanel>
      ) : (
        <EmptyPanel text="Enter an amount and GST rate to see the complete tax breakdown." />
      )}
    </div>
  );
}

/* ─── Income Tax Calculator ─── */
export function IncomeTaxCalculator() {
  const [income, setIncome]     = useState("1000000");
  const [taxPct, setTaxPct]     = useState("20");
  const [std, setStd]           = useState("50000");
  const [ded80c, setDed80c]     = useState("150000");
  const [result, setResult]     = useState<{ gross: number; stdDed: number; sec80C: number; taxable: number; tax: number; net: number; effectiveRate: number; monthlyNet: number; monthlyTax: number } | null>(null);

  const calculate = () => {
    const gross = parseFloat(income), taxP = parseFloat(taxPct);
    const stdDed = Math.min(parseFloat(std) || 0, gross);
    const sec80C = Math.min(parseFloat(ded80c) || 0, 150000);
    if (gross > 0 && taxP >= 0) {
      const taxable = Math.max(gross - stdDed - sec80C, 0);
      const tax     = taxable * (taxP / 100);
      const net     = gross - tax;
      setResult({ gross, stdDed, sec80C, taxable, tax, net, effectiveRate: (tax / gross) * 100, monthlyNet: net / 12, monthlyTax: tax / 12 });
    }
  };

  const pieData = result
    ? [{ name: "Net Income", value: Math.round(result.net) }, { name: "Total Tax", value: Math.round(result.tax) }]
    : [];

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
      <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
        <CardHeader><CardTitle>Income Tax Calculator</CardTitle><CardDescription>Estimate your tax liability and take-home pay</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2"><Label>Annual Gross Income (₹)</Label><Input type="number" value={income} onChange={e => setIncome(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>Tax Rate (%)</Label><Input type="number" value={taxPct} onChange={e => setTaxPct(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>Standard Deduction (₹)</Label><Input type="number" value={std} onChange={e => setStd(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>80C Deductions (₹, max ₹1,50,000)</Label><Input type="number" value={ded80c} onChange={e => setDed80c(e.target.value)} className="bg-background" /></div>
          <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate Tax</Button>
        </CardContent>
      </Card>

      {result ? (
        <ResultPanel>
          <Hero label="Net Income After Tax" value={fmtI(result.net)} sub={`Monthly take-home: ${fmtI(result.monthlyNet)}`} />
          <Section title="Tax Summary">
            <Row label="Gross Annual Income" value={fmtI(result.gross)} />
            <Row label="Standard Deduction"  value={`– ${fmtI(result.stdDed)}`} />
            <Row label="80C Deductions"       value={`– ${fmtI(result.sec80C)}`} />
            <Row label="Taxable Income"       value={fmtI(result.taxable)} accent />
          </Section>
          <Section title="Tax Breakdown">
            <Row label="Total Tax Payable"     value={fmtI(result.tax)} accent />
            <Row label="Monthly TDS"           value={fmtI(result.monthlyTax)} />
            <Row label="Effective Tax Rate"    value={`${result.effectiveRate.toFixed(2)}%`} />
            <SplitBar leftLabel="Take-Home" leftPct={(result.net / result.gross) * 100} rightLabel="Tax" leftColor={C.green} rightColor="#fca5a5" />
          </Section>
          <Section title="Monthly Breakdown">
            <Row label="Monthly Gross"     value={fmtI(result.gross / 12)} />
            <Row label="Monthly Tax (TDS)" value={fmtI(result.monthlyTax)} />
            <Row label="Monthly Net"       value={fmtI(result.monthlyNet)} accent />
          </Section>
          <ChartWrap title="Income vs Tax (Donut)">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                  <Cell fill={C.green} /><Cell fill={C.red} />
                </Pie>
                <Tooltip content={<DonutTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrap>
        </ResultPanel>
      ) : (
        <EmptyPanel text="Enter your income and tax rate to see the full tax breakdown." />
      )}
    </div>
  );
}

/* ─── FD Calculator ─── */
export function FdCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate]           = useState("7.5");
  const [years, setYears]         = useState("5");
  const [freq, setFreq]           = useState("4");
  const [result, setResult]       = useState<{ maturity: number; interest: number; ear: number; growthPct: number; chartData: any[] } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal), r = parseFloat(rate) / 100, t = parseFloat(years), n = parseFloat(freq);
    if (P > 0 && r > 0 && t > 0 && n > 0) {
      const maturity  = P * Math.pow(1 + r / n, n * t);
      const ear       = (Math.pow(1 + r / n, n) - 1) * 100;
      const chartData = [];
      for (let y = 1; y <= Math.min(t, 10); y++) {
        const val = P * Math.pow(1 + r / n, n * y);
        chartData.push({ year: `Y${y}`, Principal: Math.round(P), Interest: Math.round(val - P) });
      }
      setResult({ maturity, interest: maturity - P, ear, growthPct: ((maturity - P) / P) * 100, chartData });
    }
  };

  const freqLabel: Record<string, string> = { "1": "Annually", "2": "Semi-Annually", "4": "Quarterly", "12": "Monthly" };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
      <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
        <CardHeader><CardTitle>FD Calculator</CardTitle><CardDescription>Calculate Fixed Deposit maturity and returns</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2"><Label>Principal Amount (₹)</Label><Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>Annual Interest Rate (%)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>Time Period (Years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2">
            <Label>Compounding Frequency</Label>
            <Select value={freq} onValueChange={setFreq}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem><SelectItem value="2">Semi-Annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem><SelectItem value="12">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate Maturity</Button>
        </CardContent>
      </Card>

      {result ? (
        <ResultPanel>
          <Hero label="Maturity Value" value={fmtI(result.maturity)} sub={`${freqLabel[freq]} compounding · ${years} years`} />
          <Section title="FD Summary">
            <Row label="Principal Deposited"     value={fmtI(parseFloat(principal))} />
            <Row label="Interest Earned"         value={fmtI(result.interest)} accent />
            <Row label="Maturity Value"          value={fmtI(result.maturity)} />
            <SplitBar leftLabel="Principal" leftPct={(parseFloat(principal) / result.maturity) * 100} rightLabel="Interest" />
          </Section>
          <Section title="Growth Metrics">
            <Row label="Nominal Rate (p.a.)"          value={`${rate}%`} />
            <Row label="Effective Annual Yield (EAR)" value={`${result.ear.toFixed(3)}%`} accent />
            <Row label="Overall Growth"               value={`${result.growthPct.toFixed(2)}%`} />
          </Section>
          <ChartWrap title="FD Growth Chart (Year by Year)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fdP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.blue}  stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.blue}  stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="fdI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.green} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={48} />
                <Tooltip content={<LineTooltip />} />
                <Area type="monotone" dataKey="Principal" stackId="1" stroke={C.blue}  fill="url(#fdP)" strokeWidth={2} />
                <Area type="monotone" dataKey="Interest"  stackId="1" stroke={C.green} fill="url(#fdI)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrap>
        </ResultPanel>
      ) : (
        <EmptyPanel text="Enter your FD details to see the maturity breakdown and growth chart." />
      )}
    </div>
  );
}

/* ─── RD Calculator ─── */
export function RdCalculator() {
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate]       = useState("7");
  const [years, setYears]     = useState("5");
  const [result, setResult]   = useState<{ maturity: number; invested: number; interest: number; effectiveRate: number; growthPct: number; chartData: any[] } | null>(null);

  const calculate = () => {
    const P = parseFloat(monthly), r = parseFloat(rate) / 100 / 4, t = parseFloat(years);
    const n = t * 12;
    if (P > 0 && r > 0 && n > 0) {
      let maturity = 0;
      for (let i = 1; i <= n; i++) maturity += P * Math.pow(1 + r, Math.ceil(i / 3));
      const invested      = P * n;
      const effectiveRate = (Math.pow(maturity / invested, 1 / t) - 1) * 100;
      const chartData: any[] = [];
      for (let y = 1; y <= Math.min(t, 10); y++) {
        const mn = y * 12;
        let val  = 0;
        for (let i = 1; i <= mn; i++) val += P * Math.pow(1 + r, Math.ceil(i / 3));
        chartData.push({ year: `Y${y}`, Invested: Math.round(P * mn), Returns: Math.round(val - P * mn) });
      }
      setResult({ maturity, invested, interest: maturity - invested, effectiveRate, growthPct: ((maturity - invested) / invested) * 100, chartData });
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[370px_1fr] gap-8">
      <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm h-fit">
        <CardHeader><CardTitle>RD Calculator</CardTitle><CardDescription>Calculate Recurring Deposit maturity value</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2"><Label>Monthly Deposit (₹)</Label><Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>Annual Interest Rate (%)</Label><Input type="number" value={rate} onChange={e => setRate(e.target.value)} className="bg-background" /></div>
          <div className="space-y-2"><Label>Time Period (Years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} className="bg-background" /></div>
          <Button onClick={calculate} className="w-full h-11 font-semibold rounded-xl">Calculate Maturity</Button>
        </CardContent>
      </Card>

      {result ? (
        <ResultPanel>
          <Hero label="Maturity Value" value={fmtI(result.maturity)} sub={`${parseInt(years) * 12} monthly deposits of ${fmtI(parseFloat(monthly))}`} />
          <Section title="Investment Summary">
            <Row label="Total Amount Invested"  value={fmtI(result.invested)} />
            <Row label="Total Interest Earned"  value={fmtI(result.interest)} accent />
            <Row label="Maturity Value"         value={fmtI(result.maturity)} />
            <SplitBar leftLabel="Invested" leftPct={(result.invested / result.maturity) * 100} rightLabel="Returns" />
          </Section>
          <Section title="Return Metrics">
            <Row label="Effective Return Rate (CAGR)" value={`${result.effectiveRate.toFixed(2)}%`} accent />
            <Row label="Investment Growth"            value={`${result.growthPct.toFixed(2)}%`} />
            <Row label="Nominal Rate Applied"         value={`${rate}% p.a.`} />
          </Section>
          <ChartWrap title="RD Growth Chart (Year by Year)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rdInv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.blue}  stopOpacity={0.25} />
                    <stop offset="95%" stopColor={C.blue}  stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="rdRet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.green} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={48} />
                <Tooltip content={<LineTooltip />} />
                <Area type="monotone" dataKey="Invested" stackId="1" stroke={C.blue}  fill="url(#rdInv)" strokeWidth={2} />
                <Area type="monotone" dataKey="Returns"  stackId="1" stroke={C.green} fill="url(#rdRet)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartWrap>
        </ResultPanel>
      ) : (
        <EmptyPanel text="Enter your RD details to see projected maturity and growth chart." />
      )}
    </div>
  );
}
