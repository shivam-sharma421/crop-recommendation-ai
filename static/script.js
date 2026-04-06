document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = form.querySelector('.btn-text');
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // UI Loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loader.style.display = 'block';
        
        // Hide previous result if any
        resultContainer.classList.add('hidden');
        setTimeout(() => {
            resultContainer.style.position = 'absolute';
            resultContainer.style.visibility = 'hidden';
        }, 500);

        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Convert to numbers
        Object.keys(data).forEach(key => {
            data[key] = parseFloat(data[key]);
        });

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const result = await response.json();
            
            // Format crop name (capitalize first letter)
            let recommendedCrop = result.recommended_crop;
            recommendedCrop = recommendedCrop.charAt(0).toUpperCase() + recommendedCrop.slice(1);
            
            // Update UI with result
            resultText.textContent = recommendedCrop;
            
            // Show result
            resultContainer.style.position = 'relative';
            resultContainer.style.visibility = 'visible';
            resultContainer.classList.remove('hidden');
            
            // Scroll to result smoothly on mobile
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        } catch (error) {
            console.error('Prediction failed:', error);
            alert('Failed to get prediction. Please try again or check the server logs.');
        } finally {
            // Restore UI state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            loader.style.display = 'none';
        }
    });

    // Add subtle micro-interaction to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
            input.parentElement.style.transition = 'transform 0.2s ease';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });
});
