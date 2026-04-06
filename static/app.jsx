const { useState } = React;

function CropRecommender() {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const inputs = [
        { id: 'N', label: 'Nitrogen (N)', placeholder: 'e.g. 90' },
        { id: 'P', label: 'Phosphorus (P)', placeholder: 'e.g. 42' },
        { id: 'K', label: 'Potassium (K)', placeholder: 'e.g. 43' },
        { id: 'temperature', label: 'Temperature (°C)', placeholder: 'e.g. 20.8' },
        { id: 'humidity', label: 'Humidity (%)', placeholder: 'e.g. 82.0' },
        { id: 'ph', label: 'pH Level', placeholder: 'e.g. 6.5' },
        { id: 'rainfall', label: 'Rainfall (mm)', placeholder: 'e.g. 202.9', fullWidth: true }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        // Convert string values to numbers
        const payload = Object.fromEntries(
            Object.entries(formData).map(([k, v]) => [k, parseFloat(v)])
        );

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Server error starting prediction.");
            }

            const data = await response.json();
            
            // Format crop name
            const cropName = data.recommended_crop.charAt(0).toUpperCase() + data.recommended_crop.slice(1);
            setResult(cropName);

        } catch (err) {
            console.error(err);
            setError("Failed to get prediction. Check connection or inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container">
            <header className="header">
                <h1>Crop AI ⚛️</h1>
                <p>Enter your soil and climate metrics to get an instant React AI-powered crop recommendation.</p>
            </header>

            <div className="glass-panel">
                <form id="prediction-form" onSubmit={handleSubmit}>
                    <div className="input-grid">
                        {inputs.map((input) => (
                            <div key={input.id} className={`input-group ${input.fullWidth ? 'full-width' : ''}`}>
                                <label htmlFor={input.id}>{input.label}</label>
                                <input
                                    type="number"
                                    id={input.id}
                                    name={input.id}
                                    step="any"
                                    value={formData[input.id]}
                                    onChange={handleChange}
                                    placeholder={input.placeholder}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    
                    {error && (
                        <div style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        <span className="btn-text" style={{ display: loading ? 'none' : 'block' }}>
                            Discover Ideal Crop
                        </span>
                        {loading && <div className="loader" style={{ display: 'block' }}></div>}
                    </button>
                </form>

                <div 
                    className={`result-container ${result ? '' : 'hidden'}`}
                    style={!result ? { position: 'absolute', visibility: 'hidden' } : {}}
                >
                    {result && (
                        <>
                            <p className="result-subtitle">Recommended Crop</p>
                            <h2 className="result-highlight">{result}</h2>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CropRecommender />);
