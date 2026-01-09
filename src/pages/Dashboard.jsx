const Dashboard = () => {
    const data = {
        "summary": "Team discussed UI improvements",
        "sentiment": {
            "positive": 65,
            "neutral": 25,
            "negative": 10
        },
        "topics": [
            { "name": "UX", "count": 12 },
            { "name": "Performance", "count": 7 }
        ],
        "action_items": [
            "Improve loading speed",
            "Revise onboarding flow"
        ]
    };

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">Meeting Insights</h1>

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-2">Summary</h2>
                <p>{data.summary}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Object.entries(data.sentiment).map(([key, val]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">{key}</p>
                        <p className="text-2xl font-bold">{val}%</p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-2">Action Items</h2>
                <ul className="list-disc pl-6">
                    {data.action_items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Dashboard;