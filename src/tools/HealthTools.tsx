import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ResultCard = ({ title, value, highlight = false, badge = "" }: { title: string, value: string, highlight?: boolean, badge?: string }) => (
  <div className={`p-4 rounded-xl border relative overflow-hidden ${highlight ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border shadow-sm'}`}>
    <p className={`text-sm font-medium mb-1 ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{title}</p>
    <p className="text-2xl font-display font-bold tracking-tight">{value}</p>
    {badge && (
      <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-md bg-white/20 text-current">
        {badge}
      </span>
    )}
  </div>
);

export function BmiCalculator() {
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("175");
  const [result, setResult] = useState<{ bmi: number, category: string, color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = "";
      let color = "";
      if (bmi < 18.5) { category = "Underweight"; color = "text-blue-500"; }
      else if (bmi < 24.9) { category = "Normal weight"; color = "text-emerald-500"; }
      else if (bmi < 29.9) { category = "Overweight"; color = "text-amber-500"; }
      else { category = "Obese"; color = "text-rose-500"; }
      setResult({ bmi, category, color });
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>Find out your Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-background" />
          </div>
          <Button onClick={calculate} className="w-full h-12 text-lg font-semibold rounded-xl">Calculate BMI</Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <div className="p-6 rounded-2xl border bg-card text-center space-y-2 shadow-lg shadow-black/5">
              <p className="text-muted-foreground font-medium">Your BMI</p>
              <p className="text-6xl font-display font-black text-foreground">{result.bmi.toFixed(1)}</p>
              <p className={`text-xl font-bold ${result.color}`}>{result.category}</p>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center text-xs font-medium">
              <div className="bg-blue-100 text-blue-700 py-2 rounded-l-lg">&lt; 18.5</div>
              <div className="bg-emerald-100 text-emerald-700 py-2">18.5 - 24.9</div>
              <div className="bg-amber-100 text-amber-700 py-2">25 - 29.9</div>
              <div className="bg-rose-100 text-rose-700 py-2 rounded-r-lg">&ge; 30</div>
            </div>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground p-8 text-center bg-muted/10">
            Enter your height and weight to calculate your BMI.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>Find out your Body Mass Index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-background" />
            </div>
            <Button onClick={calculate} className="w-full h-12 text-lg font-semibold rounded-xl">Calculate BMI</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="p-6 rounded-2xl border bg-card text-center space-y-2 shadow-lg shadow-black/5">
                <p className="text-muted-foreground font-medium">Your BMI</p>
                <p className="text-6xl font-display font-black text-foreground">{result.bmi.toFixed(1)}</p>
                <p className={`text-xl font-bold ${result.color}`}>{result.category}</p>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center text-xs font-medium">
                 <div className="bg-blue-100 text-blue-700 py-2 rounded-l-lg">&lt; 18.5</div>
                <div className="bg-emerald-100 text-emerald-700 py-2">18.5 - 24.9</div>
                <div className="bg-amber-100 text-amber-700 py-2">25 - 29.9</div>
                <div className="bg-rose-100 text-rose-700 py-2 rounded-r-lg">&ge; 30</div>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground p-8 text-center bg-muted/10">
              Enter your height and weight to calculate your BMI.
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">How to Use BMI Calculator</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Enter your weight in kilograms</li>
              <li>Enter your height in centimeters</li>
              <li>Click "Calculate BMI" to get your Body Mass Index</li>
              <li>Review your BMI category and health status</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">BMI Formula Explained</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              BMI = Weight (kg) / Height² (m²)
            </p>
            <p className="text-gray-600 leading-relaxed">
              Your height in centimeters is converted to meters by dividing by 100. BMI helps classify underweight, normal weight, overweight, and obesity.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">BMI Calculation Example</h2>
            <p className="text-gray-600 leading-relaxed">
              For a person weighing 70 kg and height 175 cm (1.75 m): BMI = 70 / (1.75 × 1.75) = 22.86, which falls in the Normal weight category.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">BMI Categories</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Underweight: BMI &lt; 18.5 (may indicate malnutrition)</li>
              <li>Normal weight: BMI 18.5 – 24.9 (healthy range)</li>
              <li>Overweight: BMI 25 – 29.9 (increased health risks)</li>
              <li>Obese: BMI ≥ 30 (higher risk of health issues)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Why BMI is Important</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Simple indicator of body fat based on height and weight</li>
              <li>Helps identify potential health risks</li>
              <li>Used by healthcare professionals for initial assessment</li>
              <li>Tracks progress during weight management</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Limitations of BMI</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Does not distinguish between muscle and fat</li>
              <li>May not be accurate for athletes or bodybuilders</li>
              <li>Does not consider age, gender, or ethnicity</li>
              <li>Not suitable for children or pregnant women</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-800">What is BMI?</p>
                <p className="text-gray-600 leading-relaxed mt-1">BMI (Body Mass Index) is a measure of body fat based on height and weight.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">What is a healthy BMI?</p>
                <p className="text-gray-600 leading-relaxed mt-1">A healthy BMI range is 18.5 to 24.9 for most adults.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Is BMI accurate?</p>
                <p className="text-gray-600 leading-relaxed mt-1">BMI is a useful screening tool but consult a doctor for comprehensive health assessment.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How to improve BMI?</p>
                <p className="text-gray-600 leading-relaxed mt-1">Focus on balanced diet, regular exercise, and healthy lifestyle changes.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Can BMI be wrong?</p>
                <p className="text-gray-600 leading-relaxed mt-1">BMI may not reflect body composition accurately for some individuals.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Explore Related Health Tools</h2>
            <p className="text-gray-600 leading-relaxed">
              Check out our <a href="/tool/calorie" className="text-blue-600 hover:underline">Calorie Calculator</a> for daily energy needs, <a href="/tool/age" className="text-blue-600 hover:underline">Age Calculator</a> for age calculations, and <a href="/tool/percentage" className="text-blue-600 hover:underline">Percentage Calculator</a> for percentage calculations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function CalorieCalculator() {
  const [age, setAge] = useState<string>("25");
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("175");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<string>("1.55"); // Moderate
  const [result, setResult] = useState<{ maintain: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);

    if (a > 0 && w > 0 && h > 0) {
      // Harris-Benedict
      let bmr = 0;
      if (gender === "male") {
        bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
      } else {
        bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
      }
      const maintain = bmr * act;
      setResult({ maintain });
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Daily Calorie Needs</CardTitle>
            <CardDescription>Estimate your maintenance calories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={(v: "male" | "female") => setGender(v)}>
                  <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-background" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (Little/no exercise)</SelectItem>
                  <SelectItem value="1.375">Lightly Active (1-3 days/week)</SelectItem>
                  <SelectItem value="1.55">Moderately Active (3-5 days/week)</SelectItem>
                  <SelectItem value="1.725">Very Active (6-7 days/week)</SelectItem>
                  <SelectItem value="1.9">Extra Active (Very hard exercise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 text-lg font-semibold rounded-xl">Calculate Calories</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <ResultCard title="Maintenance Calories" value={`${Math.round(result.maintain)} kcal/day`} highlight badge="Maintain Weight" />
              <ResultCard title="Mild Weight Loss (~0.25kg/wk)" value={`${Math.round(result.maintain - 250)} kcal/day`} />
              <ResultCard title="Weight Loss (~0.5kg/wk)" value={`${Math.round(result.maintain - 500)} kcal/day`} />
              <ResultCard title="Weight Gain (~0.5kg/wk)" value={`${Math.round(result.maintain + 500)} kcal/day`} />
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground p-8 text-center bg-muted/10">
              Enter your physical stats to see your calorie breakdown.
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Calorie Calculator – Calculate Daily Calorie Needs</h2>
            <p className="text-gray-600 leading-relaxed">
              Our calorie calculator helps you determine your daily calorie intake based on your personal details. Whether you're aiming to maintain, lose, or gain weight, understanding your calorie needs is essential for a healthy lifestyle.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Calories are units of energy that your body uses for basic functions like breathing, circulating blood, and digesting food. Tracking your daily calorie intake is crucial for maintaining a healthy weight, supporting fitness goals, and preventing lifestyle-related diseases. With our calorie calculator, you can easily estimate your daily calorie needs.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How to Use Calorie Calculator</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Enter your age in years</li>
              <li>Select your gender</li>
              <li>Enter your height in centimeters</li>
              <li>Enter your weight in kilograms</li>
              <li>Select your activity level</li>
              <li>Get your daily calorie requirement instantly</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Calorie Formula (BMR Concept)</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              Basal Metabolic Rate (BMR) is the number of calories your body needs at rest to maintain basic physiological functions. Our calculator uses the Harris-Benedict formula to estimate BMR, which is then multiplied by your activity level to determine total daily energy expenditure.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For example, a sedentary lifestyle multiplies BMR by 1.2, while very active lifestyles use a factor of 1.725.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Example</h2>
            <p className="text-gray-600 leading-relaxed">
              For a 25-year-old male weighing 70 kg and 175 cm tall with moderate activity: The calculator estimates around 2,500 calories per day for weight maintenance. This is based on the BMR calculation adjusted for activity level.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Activity Levels</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Sedentary: Little or no exercise, desk job</li>
              <li>Lightly active: Light exercise 1-3 days a week</li>
              <li>Moderately active: Moderate exercise 3-5 days a week</li>
              <li>Very active: Hard exercise 6-7 days a week</li>
              <li>Extra active: Very hard exercise, physical job, or training twice daily</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Why Calorie Calculation is Important</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Weight loss planning: Create a calorie deficit</li>
              <li>Muscle gain: Ensure sufficient calorie surplus</li>
              <li>Healthy lifestyle: Balance energy intake and expenditure</li>
              <li>Disease prevention: Maintain optimal body weight</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Tips to Manage Calories</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Eat a balanced diet rich in whole foods</li>
              <li>Avoid junk food and sugary drinks</li>
              <li>Exercise regularly to boost metabolism</li>
              <li>Track your intake with apps or journals</li>
              <li>Stay hydrated and get adequate sleep</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800">What is a calorie?</p>
                <p className="text-gray-600 leading-relaxed">A calorie is a unit of energy. In nutrition, it refers to the energy content in food that your body uses for various functions.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How many calories should I eat daily?</p>
                <p className="text-gray-600 leading-relaxed">Daily calorie needs vary by age, gender, weight, height, and activity level. Use our calculator to get a personalized estimate.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Is calorie calculator accurate?</p>
                <p className="text-gray-600 leading-relaxed">Our calculator provides estimates based on scientific formulas. For precise needs, consult a healthcare professional or dietitian.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">How to lose weight using calories?</p>
                <p className="text-gray-600 leading-relaxed">Create a calorie deficit by consuming fewer calories than you burn. Aim for 500 calories less per day for sustainable weight loss.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">What is BMR?</p>
                <p className="text-gray-600 leading-relaxed">BMR (Basal Metabolic Rate) is the number of calories your body needs at rest to maintain basic life-sustaining functions.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Related Tools</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li><a href="/tool/bmi" className="text-blue-600 hover:underline">BMI Calculator</a> - Calculate your Body Mass Index</li>
              <li><a href="/tool/age" className="text-blue-600 hover:underline">Age Calculator</a> - Calculate your exact age</li>
              <li><a href="/tool/percentage" className="text-blue-600 hover:underline">Percentage Calculator</a> - Calculate percentages easily</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
