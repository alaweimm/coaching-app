import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ClientData {
  name: string;
  age: number;
  height: number;
  startWeight: number;
  goalWeight: number;
  checkInDay: string;
  weekOfCoaching: number;
  startDate: string;
  paymentDate: string;
}

interface ComplianceRates {
  nutrition: number;
  steps: number;
  cardio: number;
  overall: number;
}

const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentWeight, setCurrentWeight] = useState(84.5);
  const [complianceRates, setComplianceRates] = useState<ComplianceRates>({
    nutrition: 85,
    steps: 92,
    cardio: 93,
    overall: 90
  });

  // Sample client data
  const clientData: ClientData = {
    name: "Meshal Alawein",
    age: 35,
    height: 176,
    startWeight: 85.73,
    goalWeight: 80.0,
    checkInDay: "Monday",
    weekOfCoaching: 0,
    startDate: "14 April",
    paymentDate: "-"
  };

  // Calculate derived metrics
  const weightChange = (currentWeight - clientData.startWeight).toFixed(2);
  const progressPercentage = Math.round(
    ((clientData.startWeight - currentWeight) / 
    (clientData.startWeight - clientData.goalWeight)) * 100
  );

  // Weight tracking data
  const [weightData, setWeightData] = useState([
    { week: 0, weight: 85.73, goal: 80 },
    { week: 1, weight: 85.2, goal: 80 },
    { week: 2, weight: 84.8, goal: 80 },
    { week: 3, weight: currentWeight, goal: 80 }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Fitness Coaching Dashboard</h1>
          
          <div className="mt-4 md:mt-0">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'checkin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('checkin')}
              >
                Weekly Check-in
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Client Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Client Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">CLIENT DETAILS</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{clientData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{clientData.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="font-medium">{clientData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{clientData.startDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">PROGRESS SUMMARY</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Current Weight</span>
                        <span className="font-medium">{currentWeight} kg</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Weight Change</span>
                        <span className={`font-medium ${parseFloat(weightChange) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {weightChange} kg
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress to Goal</span>
                        <span className="font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Progress Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Weight"
                    />
                    <Line
                      type="monotone"
                      dataKey="goal"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Goal"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checkin' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Check-in Form</h2>
            <p className="text-gray-500 mb-6">Submit your progress data for the current week</p>
            
            {/* Add check-in form implementation here */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your current weight"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compliance Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your compliance percentage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Any additional notes or comments"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Check-in
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InteractiveDashboard;