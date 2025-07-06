import { Navbar } from "./components/landing/Navbar";
import Features from './components/landing/Features';


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex-1 justify-self-center pt-10">
        welcome to SkillSync
      </div>
      <Features />

    </>
  );
}
