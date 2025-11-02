        function showError(message) {
            // Create a simple error modal
            const errorModal = document.createElement('div');
            errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            errorModal.innerHTML = `
                <div class="material-card bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-material-4 max-w-sm w-full">
                    <div class="flex items-center space-x-3 mb-4">
                        <span class="material-icons text-red-600">error</span>
                        <h3 class="headline-6 font-semibold text-red-600">Error</h3>
                    </div>
                    <p class="body-1 mb-4 text-neutral-800 dark:text-white">${message}</p>
                    <button class="material-button w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600" onclick="this.closest('.fixed').remove()">OK</button>
                </div>
            `;
            document.body.appendChild(errorModal);
        }
