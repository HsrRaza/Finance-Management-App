import React from "react";
import {
  TrendingDown,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Zap,
  Filter,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  badge,
  badgeBg,
  badgeText,
}) => (
  <div className="flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742] shadow-xs">
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="p-2.5 rounded-lg border border-[#E2E0D8] dark:border-[#2E3742] bg-[#EFEEE8] dark:bg-[#2A333D]">
          {icon}
        </div>
        <span
          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${badgeBg} ${badgeText}`}
        >
          {badge}
        </span>
      </div>

      <h3 className="font-serif-editorial text-xl font-bold tracking-tight text-[#17212B] dark:text-[#F3F4F6] mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#66717C] dark:text-[#9CA3AF] leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#1F5C4A] dark:text-[#34A887] mb-1.5">
          Product Capabilities
        </h2>
        <h3 className="font-serif-editorial text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17212B] dark:text-[#F3F4F6]">
          Designed for total financial clarity
        </h3>
      </div>

      {/* Main 3 Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<TrendingDown className="h-5 w-5 text-[#B94A4A]" />}
          title="Smart Expense Tracking"
          description="Log and categorize daily expenses with clear transaction registers and instant category summaries."
          badge="Expenses"
          badgeBg="bg-[#FDF2F2] dark:bg-[#2C1A1A]"
          badgeText="text-[#B94A4A] dark:text-[#E06C6C]"
        />

        <FeatureCard
          icon={<TrendingUp className="h-5 w-5 text-[#1F5C4A]" />}
          title="Income Management"
          description="Keep all your revenue streams organized. Monitor cash inflow across salary, freelance, or investment returns."
          badge="Inflow"
          badgeBg="bg-[#EAF3EF] dark:bg-[#162B24]"
          badgeText="text-[#1F5C4A] dark:text-[#34A887]"
        />

        <FeatureCard
          icon={<PieChart className="h-5 w-5 text-[#2C4D6F]" />}
          title="Minimal Visual Insights"
          description="Transform numbers into clear trends. Minimal Recharts charts provide spending breakdowns without visual clutter."
          badge="Analytics"
          badgeBg="bg-[#EFEEE8] dark:bg-[#2A333D]"
          badgeText="text-[#2C4D6F] dark:text-[#9CA3AF]"
        />
      </div>

      {/* Secondary Feature Row */}
      <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#E2E0D8] dark:border-[#2E3742]">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742]">
          <ShieldCheck className="h-5 w-5 text-[#1F5C4A] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-[#17212B] dark:text-[#F3F4F6]">
              User-Isolated Records
            </h4>
            <p className="text-xs text-[#66717C] dark:text-[#9CA3AF] mt-1">
              Your financial records belong exclusively to your authenticated session.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742]">
          <Zap className="h-5 w-5 text-[#1F5C4A] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-[#17212B] dark:text-[#F3F4F6]">
              MongoDB Aggregations
            </h4>
            <p className="text-xs text-[#66717C] dark:text-[#9CA3AF] mt-1">
              High-performance backend pipelines deliver statement summaries instantly.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-[#1F262E] border border-[#E2E0D8] dark:border-[#2E3742]">
          <Filter className="h-5 w-5 text-[#1F5C4A] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-[#17212B] dark:text-[#F3F4F6]">
              Structured Filtering
            </h4>
            <p className="text-xs text-[#66717C] dark:text-[#9CA3AF] mt-1">
              Filter records by date ranges, categories, or transaction types seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;