import BarChart from './barChart';
import LineChart from './lineChart';
import PieChart from './pieChart';

const Dashboard = () => {
  const dummyStats = [
    { title: 'Total Sales', vatlue: '$120,000' },
    { title: 'Total Orders', value: '1,500' },
    { title: 'New Customers', value: '350' },
    { title: 'Pending Orders', value: '75' },
  ];
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {dummyStats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 border rounded shadow ${index % 4 === 0 ? 'bg-blue-100 text-blue-800' :
                index % 4 === 1 ? 'bg-green-100 text-green-800' :
                  index % 4 === 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
              }`}
          >
            <h2 className="text-xl font-semibold mb-2">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
          <BarChart />
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Line Chart</h2>
          <LineChart />
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Pie Chart</h2>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
