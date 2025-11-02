    ```javascript
        // Select subject and load its data
        async function selectSubject(subject) {
            showLoading();
            try {
                const response = await fetch(subject.file);
                if (!response.ok) {
                    throw new Error(`Failed to load ${subject.name} data`);
                }
                const data = await response.json();
                subjects[subject.id] = data;
                currentSubject = subject;
                renderTopics(data.topics);
                showTopicSelection();
            } catch (error) {
                showError(`Error loading ${subject.name}: ${error.message}`);
            } finally {
                hideLoading();
            }
        }
