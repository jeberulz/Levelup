'use client';

import { useState } from 'react';
import { 
  X, 
  DollarSign,
  Home,
  ShoppingCart,
  Car,
  Utensils,
  Heart,
  Smartphone,
  TrendingUp,
  PiggyBank,
  AlertCircle,
  CheckCircle,
  Info,
  RefreshCw,
  Download,
  Sparkles
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface BudgetSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (xpEarned: number) => void;
}

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  icon: any;
  color: string;
  type: 'need' | 'want' | 'savings';
  recommended?: number;
}

export default function BudgetSimulator({ isOpen, onClose, onComplete }: BudgetSimulatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3500);
  const [viewMode, setViewMode] = useState<'edit' | 'analyze'>('edit');
  const [showTips, setShowTips] = useState(true);
  
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: 'housing', name: 'Housing & Utilities', amount: 1200, icon: Home, color: '#3b82f6', type: 'need', recommended: 30 },
    { id: 'groceries', name: 'Groceries', amount: 400, icon: ShoppingCart, color: '#10b981', type: 'need', recommended: 10 },
    { id: 'transportation', name: 'Transportation', amount: 300, icon: Car, color: '#8b5cf6', type: 'need', recommended: 10 },
    { id: 'dining', name: 'Dining Out', amount: 250, icon: Utensils, color: '#f59e0b', type: 'want', recommended: 5 },
    { id: 'entertainment', name: 'Entertainment', amount: 200, icon: Smartphone, color: '#ec4899', type: 'want', recommended: 5 },
    { id: 'health', name: 'Healthcare', amount: 150, icon: Heart, color: '#ef4444', type: 'need', recommended: 5 },
    { id: 'shopping', name: 'Shopping', amount: 300, icon: ShoppingCart, color: '#06b6d4', type: 'want', recommended: 5 },
    { id: 'savings', name: 'Savings & Investments', amount: 700, icon: PiggyBank, color: '#14b8a6', type: 'savings', recommended: 20 }
  ]);

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remaining = monthlyIncome - totalExpenses;
  const savingsAmount = categories.find(c => c.id === 'savings')?.amount || 0;
  const savingsRate = monthlyIncome > 0 ? (savingsAmount / monthlyIncome) * 100 : 0;

  // Calculate 50/30/20 breakdown
  const needsTotal = categories.filter(c => c.type === 'need').reduce((sum, cat) => sum + cat.amount, 0);
  const wantsTotal = categories.filter(c => c.type === 'want').reduce((sum, cat) => sum + cat.amount, 0);
  const savingsTotal = categories.filter(c => c.type === 'savings').reduce((sum, cat) => sum + cat.amount, 0);

  const needsPercentage = monthlyIncome > 0 ? (needsTotal / monthlyIncome) * 100 : 0;
  const wantsPercentage = monthlyIncome > 0 ? (wantsTotal / monthlyIncome) * 100 : 0;
  const savingsPercentage = monthlyIncome > 0 ? (savingsTotal / monthlyIncome) * 100 : 0;

  // Ideal 50/30/20 amounts
  const idealNeeds = monthlyIncome * 0.50;
  const idealWants = monthlyIncome * 0.30;
  const idealSavings = monthlyIncome * 0.20;

  const handleIncomeChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setMonthlyIncome(numValue);
  };

  const handleCategoryChange = (id: string, value: number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, amount: Math.max(0, value) } : cat
    ));
  };

  const handleReset = () => {
    setMonthlyIncome(3500);
    setCategories([
      { id: 'housing', name: 'Housing & Utilities', amount: 1200, icon: Home, color: '#3b82f6', type: 'need', recommended: 30 },
      { id: 'groceries', name: 'Groceries', amount: 400, icon: ShoppingCart, color: '#10b981', type: 'need', recommended: 10 },
      { id: 'transportation', name: 'Transportation', amount: 300, icon: Car, color: '#8b5cf6', type: 'need', recommended: 10 },
      { id: 'dining', name: 'Dining Out', amount: 250, icon: Utensils, color: '#f59e0b', type: 'want', recommended: 5 },
      { id: 'entertainment', name: 'Entertainment', amount: 200, icon: Smartphone, color: '#ec4899', type: 'want', recommended: 5 },
      { id: 'health', name: 'Healthcare', amount: 150, icon: Heart, color: '#ef4444', type: 'need', recommended: 5 },
      { id: 'shopping', name: 'Shopping', amount: 300, icon: ShoppingCart, color: '#06b6d4', type: 'want', recommended: 5 },
      { id: 'savings', name: 'Savings & Investments', amount: 700, icon: PiggyBank, color: '#14b8a6', type: 'savings', recommended: 20 }
    ]);
  };

  const handleOptimize = () => {
    // Optimize to 50/30/20 rule
    const optimizedCategories = categories.map(cat => {
      let newAmount = cat.amount;
      
      if (cat.type === 'need') {
        const categoryShare = (cat.recommended || 0) / 50; // Proportion of needs
        newAmount = Math.round(idealNeeds * categoryShare);
      } else if (cat.type === 'want') {
        const categoryShare = (cat.recommended || 0) / 30; // Proportion of wants
        newAmount = Math.round(idealWants * categoryShare);
      } else if (cat.type === 'savings') {
        newAmount = Math.round(idealSavings);
      }
      
      return { ...cat, amount: newAmount };
    });
    
    setCategories(optimizedCategories);
  };

  const handleSaveBudget = () => {
    if (onComplete) {
      // Award XP based on how well they followed the 50/30/20 rule
      let xpEarned = 50; // Base XP
      
      // Bonus XP for balanced budget
      if (Math.abs(remaining) < 100) xpEarned += 25;
      if (savingsRate >= 15) xpEarned += 25;
      if (Math.abs(needsPercentage - 50) < 10 && Math.abs(wantsPercentage - 30) < 10) xpEarned += 50;
      
      onComplete(xpEarned);
    }
    onClose();
  };

  // Chart data
  const pieData = categories.map(cat => ({
    name: cat.name,
    value: cat.amount,
    color: cat.color
  }));

  const comparisonData = [
    {
      category: 'Needs',
      current: needsTotal,
      recommended: idealNeeds,
      currentPercent: needsPercentage,
      recommendedPercent: 50
    },
    {
      category: 'Wants',
      current: wantsTotal,
      recommended: idealWants,
      currentPercent: wantsPercentage,
      recommendedPercent: 30
    },
    {
      category: 'Savings',
      current: savingsTotal,
      recommended: idealSavings,
      currentPercent: savingsPercentage,
      recommendedPercent: 20
    }
  ];

  const getBudgetHealth = () => {
    if (remaining < 0) return { status: 'over', color: 'red', icon: AlertCircle, message: 'Over budget! Reduce expenses.' };
    if (savingsRate < 10) return { status: 'low', color: 'yellow', icon: Info, message: 'Increase your savings rate.' };
    if (Math.abs(needsPercentage - 50) > 15) return { status: 'unbalanced', color: 'yellow', icon: Info, message: 'Consider rebalancing your budget.' };
    return { status: 'good', color: 'green', icon: CheckCircle, message: 'Great job! Your budget looks healthy.' };
  };

  const budgetHealth = getBudgetHealth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label="Close budget simulator"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-12">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-8 w-8 text-green-400" />
              <h2 className="text-white font-bold tracking-tight">Budget Simulator</h2>
            </div>
            <p className="text-white/80">
              Plan your monthly budget using the 50/30/20 rule
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="border-b border-neutral-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'edit'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Edit Budget
              </button>
              <button
                onClick={() => setViewMode('analyze')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'analyze'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Analyze
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleOptimize}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Auto-Optimize</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Edit Mode */}
            {viewMode === 'edit' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Income & Categories */}
                <div className="space-y-6">
                  {/* Monthly Income */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <label className="block mb-3">
                      <span className="text-neutral-900">Monthly Income</span>
                      <div className="relative mt-2">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                        <input
                          type="number"
                          value={monthlyIncome}
                          onChange={(e) => handleIncomeChange(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                          placeholder="Enter monthly income"
                          step="100"
                        />
                      </div>
                    </label>
                    
                    {/* Budget Summary */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-green-200">
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Income</p>
                        <p className="text-neutral-900">${monthlyIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Expenses</p>
                        <p className="text-neutral-900">${totalExpenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Remaining</p>
                        <p className={`${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${Math.abs(remaining).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Sliders */}
                  <div className="space-y-4">
                    <h3 className="text-neutral-900 font-bold tracking-tight">Budget Categories</h3>
                    
                    {categories.map(category => {
                      const Icon = category.icon;
                      const percentage = monthlyIncome > 0 ? (category.amount / monthlyIncome) * 100 : 0;
                      
                      return (
                        <div key={category.id} className="bg-white border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="h-10 w-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: category.color + '20' }}
                              >
                                <Icon className="h-5 w-5" style={{ color: category.color }} />
                              </div>
                              <div>
                                <p className="text-neutral-900">{category.name}</p>
                                <p className="text-xs text-neutral-500 capitalize">{category.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-neutral-900">${category.amount.toLocaleString()}</p>
                              <p className="text-xs text-neutral-500">{percentage.toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          {/* Slider */}
                          <div className="space-y-2">
                            <input
                              type="range"
                              min="0"
                              max={monthlyIncome}
                              step="50"
                              value={category.amount}
                              onChange={(e) => handleCategoryChange(category.id, parseFloat(e.target.value))}
                              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                              }}
                            />
                            <div className="flex items-center justify-between">
                              <input
                                type="number"
                                value={category.amount}
                                onChange={(e) => handleCategoryChange(category.id, parseFloat(e.target.value) || 0)}
                                className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded"
                                step="50"
                              />
                              <span className="text-xs text-neutral-500">
                                Recommended: {category.recommended}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column - Visualization & Tips */}
                <div className="space-y-6">
                  {/* Budget Health */}
                  <div className={`bg-${budgetHealth.color}-50 border border-${budgetHealth.color}-200 rounded-xl p-6`}>
                    <div className="flex items-start gap-3">
                      <budgetHealth.icon className={`h-6 w-6 text-${budgetHealth.color}-600 flex-shrink-0 mt-1`} />
                      <div>
                        <h4 className="text-neutral-900 mb-1 font-bold tracking-tight">Budget Health</h4>
                        <p className="text-neutral-700">{budgetHealth.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <h4 className="text-neutral-900 mb-4 font-bold tracking-tight">Spending Breakdown</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 50/30/20 Rule Guide */}
                  {showTips && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-neutral-900 font-bold tracking-tight">50/30/20 Rule</h4>
                        <button
                          onClick={() => setShowTips(false)}
                          className="text-neutral-500 hover:text-neutral-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                            50
                          </div>
                          <div>
                            <p className="text-neutral-900 mb-1">Needs</p>
                            <p className="text-neutral-600 text-xs">Essential expenses like housing, utilities, groceries, and transportation.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                            30
                          </div>
                          <div>
                            <p className="text-neutral-900 mb-1">Wants</p>
                            <p className="text-neutral-600 text-xs">Non-essential spending like dining out, entertainment, and shopping.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                            20
                          </div>
                          <div>
                            <p className="text-neutral-900 mb-1">Savings</p>
                            <p className="text-neutral-600 text-xs">Emergency fund, retirement, investments, and debt repayment.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analyze Mode */}
            {viewMode === 'analyze' && (
              <div className="space-y-6">
                {/* Current vs Recommended */}
                <div>
                  <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Your Budget vs 50/30/20 Rule</h3>
                  <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="current" fill="#3b82f6" name="Your Budget" />
                        <Bar dataKey="recommended" fill="#10b981" name="Recommended" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detailed Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {comparisonData.map((item, index) => {
                    const difference = item.currentPercent - item.recommendedPercent;
                    const isGood = Math.abs(difference) <= 5;
                    
                    return (
                      <div key={index} className="bg-white border border-neutral-200 rounded-xl p-6">
                        <h4 className="text-neutral-900 mb-4 font-bold tracking-tight">{item.category}</h4>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-neutral-600">Your Budget</span>
                              <span className="text-neutral-900">{item.currentPercent.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${Math.min(item.currentPercent, 100)}%` }}
                              />
                            </div>
                            <p className="text-sm text-neutral-900 mt-1">${item.current.toLocaleString()}</p>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-neutral-600">Recommended</span>
                              <span className="text-neutral-900">{item.recommendedPercent}%</span>
                            </div>
                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${item.recommendedPercent}%` }}
                              />
                            </div>
                            <p className="text-sm text-neutral-900 mt-1">${item.recommended.toLocaleString()}</p>
                          </div>

                          <div className={`flex items-center gap-2 p-2 rounded-lg ${
                            isGood ? 'bg-green-50' : difference > 0 ? 'bg-orange-50' : 'bg-blue-50'
                          }`}>
                            {isGood ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Info className="h-4 w-4 text-orange-600" />
                            )}
                            <span className="text-sm text-neutral-700">
                              {isGood 
                                ? 'On track!' 
                                : difference > 0 
                                  ? `${Math.abs(difference).toFixed(1)}% over`
                                  : `${Math.abs(difference).toFixed(1)}% under`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Savings Insights */}
                <div className="bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                      <PiggyBank className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-900 mb-2 font-bold tracking-tight">Savings Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-neutral-600 mb-1">Monthly Savings</p>
                          <p className="text-neutral-900">${savingsTotal.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 mb-1">Savings Rate</p>
                          <p className="text-neutral-900">{savingsPercentage.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 mb-1">Annual Savings</p>
                          <p className="text-neutral-900">${(savingsTotal * 12).toLocaleString()}</p>
                        </div>
                      </div>
                      {savingsPercentage >= 20 && (
                        <p className="text-sm text-green-700 mt-3">
                          🎉 Excellent! You're meeting the 20% savings goal.
                        </p>
                      )}
                      {savingsPercentage < 20 && savingsPercentage >= 15 && (
                        <p className="text-sm text-blue-700 mt-3">
                          💪 Good start! Try to increase to 20% for optimal savings.
                        </p>
                      )}
                      {savingsPercentage < 15 && (
                        <p className="text-sm text-orange-700 mt-3">
                          💡 Consider reducing wants to boost your savings rate.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Personalized Recommendations</h3>
                  <div className="space-y-3">
                    {needsPercentage > 55 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-900 mb-1">High Essential Expenses</p>
                          <p className="text-sm text-neutral-600">
                            Your needs are {needsPercentage.toFixed(1)}% of income. Consider finding ways to reduce housing, transportation, or utility costs.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {wantsPercentage > 35 && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
                        <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-900 mb-1">Wants Spending High</p>
                          <p className="text-sm text-neutral-600">
                            You're spending {wantsPercentage.toFixed(1)}% on wants. Try cutting back on dining out or entertainment to increase savings.
                          </p>
                        </div>
                      </div>
                    )}

                    {savingsPercentage < 15 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-900 mb-1">Low Savings Rate</p>
                          <p className="text-sm text-neutral-600">
                            At {savingsPercentage.toFixed(1)}%, you're saving less than recommended. Try to reach at least 15-20% for financial security.
                          </p>
                        </div>
                      </div>
                    )}

                    {remaining < 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-900 mb-1">Budget Deficit</p>
                          <p className="text-sm text-neutral-600">
                            You're spending ${Math.abs(remaining).toLocaleString()} more than you earn. Reduce expenses or increase income to balance your budget.
                          </p>
                        </div>
                      </div>
                    )}

                    {remaining >= 0 && savingsPercentage >= 20 && Math.abs(needsPercentage - 50) <= 10 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-neutral-900 mb-1">Excellent Budget!</p>
                          <p className="text-sm text-neutral-600">
                            Your budget follows the 50/30/20 rule well. Keep up the great work!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Info className="h-4 w-4" />
              <span>Adjust sliders or use Auto-Optimize for the 50/30/20 rule</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBudget}
                className="px-6 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Save Budget</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
