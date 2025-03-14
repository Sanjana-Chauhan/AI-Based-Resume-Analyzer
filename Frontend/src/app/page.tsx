import FeatureCard from "../components/ui/FeatureCard"

import {features} from "../lib/features"
import {whyChoose} from "../lib/whyChoose"
export default function Home() {
  return (
    <div className="bg-[#fafafa] h-screen flex flex-col items-center gap-6 p-5 ml-64 ">
      <div className="text-5xl w-full font-bold bg-gradient-to-r from-blue-500 via-purple-600 via-gray-900 to-black text-transparent bg-clip-text  text-center animate-gradient">
      🚀 AI Resume Analyzer – Land Your Dream Job Faster!
      </div>
      <p className="text-2xl text-violet-900 font-semibold">Optimize Your Resume with AI & Get Noticed!</p>
      <div className=" p-4 w-full flex justify-between">
        <FeatureCard content={features}/>
        <FeatureCard content={whyChoose}/>
      </div>
    </div>
  );
}
