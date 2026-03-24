import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toolsRegistry } from "@/lib/tool-registry";

export function Home() {
  const categories = Array.from(new Set(toolsRegistry.map(t => t.category)));

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-card border shadow-xl shadow-black/5">
        <img
          src="/images/hero-bg.png"
          alt="Abstract elegant background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        
        <div className="relative z-10 px-8 py-20 md:py-32 max-w-3xl">
          <div className="inline-flex items-center rounded-full border bg-background/50 backdrop-blur-md px-3 py-1 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            12+ Smart Tools Inside
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Free Online Calculators & Utility Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            This website offers finance calculators (EMI, SIP, GST, Income Tax, FD, RD), health tools (BMI, calorie), math tools (percentage, average, profit & loss, scientific), and utility tools (age calculator, password generator, QR code generator, image tools).
          </p>
          <div className="mt-8">
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="rounded-full h-14 px-8 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all">
                <Link href="/tool/emi">
                  Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Sections */}
      <div className="space-y-16">
        {categories.map(category => (
          <section key={category} className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-display font-bold text-foreground">{category} Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {toolsRegistry.filter(t => t.category === category).map(tool => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.id} href={`/tool/${tool.id}`} className="group block">
                    <div className="h-full bg-card rounded-2xl p-6 border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                      <div className="bg-primary/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* SEO Content Section */}
 
<section className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
  <div className="space-y-5">
    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
      Free Online Calculators & Tools for Finance, Health, Math & Utility
    </h1>

    <p className="text-gray-600 leading-relaxed text-justify mt-0">
      Welcome to SmartFinMetrics, your comprehensive digital hub designed to simplify complex daily tasks through a suite of professional online tools. Whether you are navigating the intricacies of financial planning, tracking your fitness journey, or requiring swift digital utility conversions, our platform provides a centralized location for all your computational needs. We eliminate the friction of modern web tools by offering a completely open experience—no registration, no subscriptions, and no hidden fees.
    </p>
    <p className="text-gray-600 leading-relaxed text-justify mt-0">
      Our platform is meticulously organized into four core pillars: finance, health, mathematics, and digital utilities. From calculating your monthly loan obligations with our <strong>EMI calculator</strong> and projecting wealth with the <strong>SIP calculator</strong>, to managing business taxes via the <strong>GST calculator</strong>, we cover every financial angle. Furthermore, our <strong>BMI calculator</strong> helps you monitor wellness, while our versatile <strong>image converter</strong> tools handle your file transitions in seconds. Every tool is built for high-speed performance and ease of use for students and professionals alike.
    </p>

    {/* 1. Finance Calculators */}
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-6">
        1. Finance Calculators
      </h2>

      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>EMI Calculator</h3>
          <p className="text-gray-600 leading-relaxed ml-10">
            The Equated Monthly Installment (EMI) calculator is a specialized tool designed to help borrowers determine the fixed amount payable to a lender every month. This is essential for anyone planning to take a home loan, car loan, or personal loan, as it allows for better budget management.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4 ml-10 ">
            <strong>How to Use:</strong> Enter the principal loan amount, the annual interest rate, and the loan tenure in months or years. The results will immediately display your monthly payment and the total interest payable.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> E = P × r × (1 + r)^n / ((1 + r)^n - 1)
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> For a loan of 100,000 at a monthly interest rate of 1% for 12 months, the EMI would be approximately 8,885.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>SIP Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            A Systematic Investment Plan (SIP) calculator helps mutual fund investors estimate the future value of their monthly investments. It is a powerful tool for visualizing long-term wealth creation through the power of compounding.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Input your monthly investment amount, the expected annual return rate, and the time period for which you plan to stay invested.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> FV = P × [(1 + i)^n - 1] / i × (1 + i)
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> Investing 5,000 monthly for 10 years at a 12% annual return would result in an estimated future value of approximately 1,161,695.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Compound Interest Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. This tool helps you see how your savings grow over time.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Provide the initial balance, the interest rate, the compounding frequency (monthly, quarterly, annually), and the number of years.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> A = P(1 + r/n)^(nt)
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> A principal of 10,000 at 5% interest compounded annually for 5 years results in 12,763.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>GST Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            The Goods and Services Tax (GST) calculator simplifies the process of adding or removing tax from a net or gross price. It is particularly useful for business owners and consumers in regions with multi-tiered tax structures like India.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter the initial amount and select the applicable GST rate (e.g., 5%, 12%, 18%, or 28%). Choose whether you want to "Add GST" or "Remove GST."
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> GST Amount = (Price × GST%) / 100
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> For a product priced at 1,000 with 18% GST, the tax amount is 180, making the total price 1,180.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Income Tax Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            This tool provides an estimate of your tax liability based on the latest government tax slabs. It helps you understand your take-home pay after necessary deductions.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter your total annual income and select your age category. Add any applicable deductions under sections like 80C or 80D to see your taxable income.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> If your taxable income is 700,000 and the slab for that bracket is 5% above a certain limit, the tool will provide the specific tax breakdown instantly.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>FD Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            A Fixed Deposit (FD) calculator helps you determine the maturity amount of your investment in a bank deposit. It accounts for the interest rate and the tenure to show your total earnings.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Input the deposit amount, the annual interest rate, and the duration of the deposit in days, months, or years.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> An FD of 50,000 at 7% for 1 year will yield a maturity value of approximately 53,593 if compounded quarterly.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span> RD Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            A Recurring Deposit (RD) calculator is used to find the maturity value of regular monthly deposits over a fixed period. It is ideal for those who save a fixed portion of their income every month.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter your monthly deposit amount, the interest rate, and the number of months you intend to save.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> Depositing 2,000 every month for 2 years at an 8% interest rate will result in a maturity amount of roughly 52,200.
          </p>
        </div>
      </div>
    </div>

    {/* 2. Health Calculators */}
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-6">

        2. Health Calculators
      </h2>

      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>BMI Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            The Body Mass Index (BMI) calculator is a simple screening tool that uses height and weight to estimate body fat and determine if an individual is in a healthy weight range.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Select your gender, then enter your weight in kilograms and your height in centimeters or feet/inches.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> BMI = weight(kg) / height(m)^2
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> A person weighing 70kg with a height of 1.75m has a BMI of 22.9, which falls within the "Normal" category.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Calorie Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10" >
            The calorie calculator estimates the number of daily calories your body needs to maintain, lose, or gain weight based on your Basal Metabolic Rate (BMR) and activity level.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter your age, gender, height, weight, and select your typical daily activity level (from sedentary to extra active).
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> A 30-year-old active male may require approximately 2,500 calories per day to maintain his current weight.
          </p>
        </div>
      </div>
    </div>

    {/* 3. Math Calculators */}
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-6">
        3. Math Calculators
      </h2>

      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span> Percentage Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            This versatile tool solves various percentage-based problems, such as finding a percentage of a number or the percentage increase/decrease between two values.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter the two numbers you wish to compare or calculate. Choose the specific operation, such as "What is X% of Y?"
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> Percentage = (Part / Whole) × 100
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> 20% of 500 is 100.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Average Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            The average calculator finds the arithmetic mean of a set of numbers. It is useful for students tracking grades or professionals analyzing data sets.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter your list of numbers separated by commas. The tool will calculate the mean, sum, and count of the numbers.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> Average = Sum of Terms / Number of Terms
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> The average of 10, 20, and 30 is 20.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Profit and Loss Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            This tool is essential for small business owners and traders to determine the financial outcome of a sale. It calculates the total profit or loss and the percentage margin.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter the Cost Price (CP) and the Selling Price (SP) of the item.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Formula:</strong> Profit = SP - CP; Loss = CP - SP
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> If you buy an item for 800 and sell it for 1,000, you have made a profit of 200 (25%).
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Scientific Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            For advanced mathematical needs, the scientific calculator provides functions for trigonometry, logarithms, square roots, and exponentiation.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Use the on-screen keypad to enter complex equations. It supports functions like sin, cos, tan, log, and natural logs.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> Calculating the square root of 144 results in 12.
          </p>
        </div>
      </div>
    </div>

    {/* 4. Utility Tools */}
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-6">
        4. Utility Tools
      </h2>

      <div className="space-y-10">
        <div>
         <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span> Age Calculator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            The age calculator determines the exact time elapsed between two dates. It provides your age in years, months, weeks, and days.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Enter your date of birth and the current date (or any target date) to see your precise age.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Calculation:</strong> A person born on January 1, 2000, would be 26 years, 2 months, and 21 days old as of March 22, 2026.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Password Generator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            This utility creates highly secure, randomized passwords to protect your digital accounts from unauthorized access.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Choose your desired password length and select options for including symbols, numbers, and uppercase letters.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Result:</strong> A 12-character request might generate "k9!Pz#2mQ@L1".
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>QR Code Generator</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            Generate scannable QR codes for URLs, text, or contact information instantly. This is perfect for business cards or marketing materials.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Paste the link or text you want to encode. The tool will generate a QR code image that you can download.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Image to PDF Converter</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            This tool allows you to combine one or multiple images into a single, professional PDF document. It is ideal for document submission and archiving.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Upload your images (JPG, PNG, or WEBP). You can reorder them if needed, and then click "Convert" to download your PDF.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 ml-6 mt-10 flex items-center"><span className="text-4xl mr-2">•</span>Image Format Converter (PNG to JPG)</h3>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            Our image format converter handles quick transitions between different file types, ensuring compatibility for various web and print applications.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>How to Use:</strong> Upload a PNG file and select JPG as the output format. The tool processes the conversion in your browser for maximum privacy.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3 ml-10">
            <strong>Example Use Case:</strong> Converting a large PNG screenshot into a compressed JPG for faster website loading speeds.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}

