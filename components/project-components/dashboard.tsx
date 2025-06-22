"use client"
//
import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from "lucide-react"

export default function DemoDashboard() {
  const [metrics, setMetrics] = useState({
    revenue: 45231,
    users: 2847,
    orders: 1429,
    views: 89432,
  })

  const [chartData, setChartData] = useState([
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ])

  const [recentActivity] = useState([
    { id: 1, action: "New user registered", time: "2 min ago", type: "user" },
    { id: 2, action: "Order #1234 completed", time: "5 min ago", type: "order" },
    { id: 3, action: "Payment received", time: "8 min ago", type: "payment" },
    { id: 4, action: "New product added", time: "12 min ago", type: "product" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100),
        users: prev.users + Math.floor(Math.random() * 5),
        orders: prev.orders + Math.floor(Math.random() * 3),
        views: prev.views + Math.floor(Math.random() * 50),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const MetricCard = ({ title, value, icon: Icon, change, color }: any) => (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 mb-1">{title}</p>
          <p className="text-lg font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
      </div>
      <div className="flex items-center mt-2">
        {change > 0 ? (
          <TrendingUp size={12} className="text-green-500 mr-1" />
        ) : (
          <TrendingDown size={12} className="text-red-500 mr-1" />
        )}
        <span className={`text-xs ${change > 0 ? "text-green-500" : "text-red-500"}`}>{Math.abs(change)}%</span>
        <span className="text-xs text-gray-500 ml-1">vs last month</span>
      </div>
    </div>
  )

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return "👤"
      case "order":
        return "📦"
      case "payment":
        return "💳"
      case "product":
        return "🛍️"
      default:
        return "📊"
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-3 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Analytics Dashboard</h3>
        <select className="text-xs border border-gray-300 rounded px-2 py-1">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Today</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <MetricCard title="Revenue" value={metrics.revenue} icon={DollarSign} change={12.5} color="bg-green-500" />
        <MetricCard title="Users" value={metrics.users} icon={Users} change={8.2} color="bg-blue-500" />
        <MetricCard title="Orders" value={metrics.orders} icon={ShoppingCart} change={-2.1} color="bg-purple-500" />
        <MetricCard title="Views" value={metrics.views} icon={Eye} change={15.3} color="bg-orange-500" />
      </div>

      {/* Chart Area */}
      <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
        <h4 className="font-medium text-sm text-gray-800 mb-2">Revenue Trend</h4>
        <div className="flex items-end justify-between h-16 space-x-1">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="bg-blue-500 rounded-t w-full transition-all duration-500"
                style={{ height: `${(item.value / 6000) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <h4 className="font-medium text-sm text-gray-800 mb-2">Recent Activity</h4>
        <div className="space-y-2 max-h-20 overflow-y-auto">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-2">
              <span className="text-sm">{getActivityIcon(activity.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-800 truncate">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
