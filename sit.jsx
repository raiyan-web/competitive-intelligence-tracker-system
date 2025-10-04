import React, { useState } from 'react';
import { PlusCircle, TrendingUp, Users, Package, DollarSign, BarChart3, Search, Filter, Edit2, Trash2, Eye } from 'lucide-react';

const CompetitiveIntelligenceTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [competitors, setCompetitors] = useState([
    {
      id: 1,
      name: 'Competitor A',
      industry: 'Technology',
      website: 'competitora.com',
      marketShare: 25,
      strength: 'strong',
      lastUpdated: '2025-10-01'
    },
    {
      id: 2,
      name: 'Competitor B',
      industry: 'Technology',
      website: 'competitorb.com',
      marketShare: 18,
      strength: 'moderate',
      lastUpdated: '2025-09-28'
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      competitorId: 1,
      type: 'Product Launch',
      description: 'Launched new AI-powered analytics tool',
      date: '2025-09-30',
      impact: 'high',
      source: 'Press Release'
    },
    {
      id: 2,
      competitorId: 2,
      type: 'Price Change',
      description: 'Reduced enterprise pricing by 15%',
      date: '2025-09-25',
      impact: 'medium',
      source: 'Website'
    },
    {
      id: 3,
      competitorId: 1,
      type: 'Partnership',
      description: 'Strategic partnership with Microsoft',
      date: '2025-09-20',
      impact: 'high',
      source: 'News Article'
    }
  ]);

  const [showAddCompetitor, setShowAddCompetitor] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterImpact, setFilterImpact] = useState('all');

  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    industry: '',
    website: '',
    marketShare: 0,
    strength: 'moderate'
  });

  const [newActivity, setNewActivity] = useState({
    competitorId: '',
    type: '',
    description: '',
    date: '',
    impact: 'medium',
    source: ''
  });

  const addCompetitor = () => {
    if (newCompetitor.name && newCompetitor.industry) {
      setCompetitors([
        ...competitors,
        {
          ...newCompetitor,
          id: Date.now(),
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      ]);
      setNewCompetitor({ name: '', industry: '', website: '', marketShare: 0, strength: 'moderate' });
      setShowAddCompetitor(false);
    }
  };

  const addActivity = () => {
    if (newActivity.competitorId && newActivity.type && newActivity.description) {
      setActivities([
        ...activities,
        {
          ...newActivity,
          id: Date.now(),
          competitorId: parseInt(newActivity.competitorId)
        }
      ]);
      setNewActivity({ competitorId: '', type: '', description: '', date: '', impact: 'medium', source: '' });
      setShowAddActivity(false);
    }
  };

  const deleteCompetitor = (id) => {
    setCompetitors(competitors.filter(c => c.id !== id));
    setActivities(activities.filter(a => a.competitorId !== id));
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const getCompetitorName = (id) => {
    const comp = competitors.find(c => c.id === id);
    return comp ? comp.name : 'Unknown';
  };

  const filteredActivities = activities.filter(a => {
    const matchesSearch = getCompetitorName(a.competitorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         a.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterImpact === 'all' || a.impact === filterImpact;
    return matchesSearch && matchesFilter;
  });

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStrengthColor = (strength) => {
    switch(strength) {
      case 'strong': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'weak': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const activityTypeCounts = activities.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Competitive Intelligence Tracker</h1>
        <p className="text-blue-100">Monitor competitors, track activities, and gain strategic insights</p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="inline mr-2" size={18} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('competitors')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'competitors'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="inline mr-2" size={18} />
            Competitors
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'activities'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="inline mr-2" size={18} />
            Activities
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Competitors</p>
                    <p className="text-3xl font-bold text-gray-900">{competitors.length}</p>
                  </div>
                  <Users className="text-blue-600" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Activities</p>
                    <p className="text-3xl font-bold text-gray-900">{activities.length}</p>
                  </div>
                  <TrendingUp className="text-green-600" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">High Impact</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {activities.filter(a => a.impact === 'high').length}
                    </p>
                  </div>
                  <Package className="text-red-600" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Avg Market Share</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {competitors.length > 0 
                        ? Math.round(competitors.reduce((sum, c) => sum + c.marketShare, 0) / competitors.length)
                        : 0}%
                    </p>
                  </div>
                  <DollarSign className="text-purple-600" size={32} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {activities.slice(0, 5).map(activity => (
                    <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{activity.type}</p>
                          <p className="text-sm text-gray-600">{getCompetitorName(activity.competitorId)}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(activity.impact)}`}>
                          {activity.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Activity Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(activityTypeCounts).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-gray-700">{type}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(count / activities.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competitors' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Competitors</h2>
              <button
                onClick={() => setShowAddCompetitor(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Add Competitor
              </button>
            </div>

            {showAddCompetitor && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Competitor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={newCompetitor.name}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    value={newCompetitor.industry}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, industry: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Website"
                    value={newCompetitor.website}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, website: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Market Share %"
                    value={newCompetitor.marketShare}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, marketShare: parseFloat(e.target.value) })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <select
                    value={newCompetitor.strength}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, strength: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="weak">Weak</option>
                    <option value="moderate">Moderate</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={addCompetitor}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddCompetitor(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {competitors.map(competitor => (
                <div key={competitor.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{competitor.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStrengthColor(competitor.strength)}`}>
                          {competitor.strength}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Industry</p>
                          <p className="font-medium text-gray-900">{competitor.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <p className="font-medium text-gray-900">{competitor.website}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Market Share</p>
                          <p className="font-medium text-gray-900">{competitor.marketShare}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium text-gray-900">{competitor.lastUpdated}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCompetitor(competitor.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Activities</h2>
              <button
                onClick={() => setShowAddActivity(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Add Activity
              </button>
            </div>

            {showAddActivity && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newActivity.competitorId}
                    onChange={(e) => setNewActivity({ ...newActivity, competitorId: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Competitor</option>
                    {competitors.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Activity Type (e.g., Product Launch)"
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <select
                    value={newActivity.impact}
                    onChange={(e) => setNewActivity({ ...newActivity, impact: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="low">Low Impact</option>
                    <option value="medium">Medium Impact</option>
                    <option value="high">High Impact</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Source"
                    value={newActivity.source}
                    onChange={(e) => setNewActivity({ ...newActivity, source: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2 md:col-span-2"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={addActivity}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddActivity(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <select
                  value={filterImpact}
                  onChange={(e) => setFilterImpact(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="all">All Impact Levels</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredActivities.map(activity => (
                <div key={activity.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{activity.type}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(activity.impact)}`}>
                          {activity.impact} impact
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{activity.description}</p>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-gray-500">Competitor: </span>
                          <span className="font-medium text-gray-900">{getCompetitorName(activity.competitorId)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date: </span>
                          <span className="font-medium text-gray-900">{activity.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Source: </span>
                          <span className="font-medium text-gray-900">{activity.source}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteActivity(activity.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitiveIntelligenceTracker;