
import React from 'react';

interface InvestmentTabsProps {
  activeTab: 'all' | 'active' | 'pending' | 'completed';
  setActiveTab: (tab: 'all' | 'active' | 'pending' | 'completed') => void;
}

const InvestmentTabs: React.FC<InvestmentTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex overflow-x-auto pb-2 border-b border-unicorn-gold/20">
      <button 
        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'all' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
        onClick={() => setActiveTab('all')}
      >
        All Investments
      </button>
      <button 
        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'active' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
        onClick={() => setActiveTab('active')}
      >
        Active
      </button>
      <button 
        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'pending' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
        onClick={() => setActiveTab('pending')}
      >
        Pending
      </button>
      <button 
        className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'completed' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
        onClick={() => setActiveTab('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default InvestmentTabs;
