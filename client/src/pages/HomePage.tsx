import React from "react";
import Text from "../components/HomePage/Text";
import Features from "../components/HomePage/Features";

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#F7F5EF] dark:bg-[#12161A] text-[#17212B] dark:text-[#F3F4F6] transition-colors duration-150">
      <main className="max-w-7xl mx-auto">
        <Text />
        <Features />
      </main>
    </div>
  );
};

export default HomePage;