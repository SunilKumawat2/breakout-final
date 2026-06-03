import QuoteCalculator from "@/components/Quizes/QuoteCalculator/QuoteCalculator";
import { redirect } from "next/navigation";

const Page = ({ searchParams }) => {

  const category = searchParams?.category;
console.log("ksldfksjhdfksdkf",category)
  if (!category) {
    redirect("/resources/quiz/quote-calculator");
  }

  return <QuoteCalculator category={category} />;
};

export default Page;