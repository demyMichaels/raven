        function navigateToTopic(folderName, title, type) {
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) modal.remove();
            
            const topic = biologyTopics.find(t => t.folderName === folderName);
            let url;
            let message;
            
            if (type === 'overview') {
                url = `https://demymichaels.github.io/raven/src/learning-materials/biology/${folderName}/`;
                message = `Opening ${title} overview...`;
            } else {
                // For subtopics, use the actual folder names from subtopicFolders
                const subtopicIndex = parseInt(type);
                if (topic && topic.subtopicFolders && topic.subtopicFolders[subtopicIndex]) {
                    const subtopicFolderName = topic.subtopicFolders[subtopicIndex];
                    url = `https://demymichaels.github.io/raven/src/learning-materials/biology/${folderName}/${subtopicFolderName}/`;
                    message = `Opening ${topic.subtopics[subtopicIndex]}...`;
                } else {
                    // Fallback to main topic if subtopic folder not found
                    url = `https://demymichaels.github.io/raven/src/learning-materials/biology/${folderName}/`;
                    message = `Opening ${title}...`;
                }
            }
            
            showMaterialToast(message, 'info');
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        }






        // Function to handle topic opening
        function openTopic(folderName, title) {
            const topic = chemistryTopics.find(t => t.folderName === folderName);
            
            if (topic && topic.subtopics.length > 0) {
                // Topic has subtopics - show subtopic selection modal
                showSubtopicModal(topic);
            } else {
                // Topic has no subtopics - go directly to content
                showMaterialToast(`Opening ${title}...`, 'info');
                setTimeout(() => {
                    // Navigate to actual GitHub Pages directory structure
                    window.location.href = `https://demymichaels.github.io/raven/src/learning-materials/chemistry/${folderName}/`;
                }, 300);
            }
        }


                // Function to navigate to specific topic or subtopic
        function navigateToTopic(folderName, title, type) {
            const modal = document.querySelector('.fixed.inset-0');
            if (modal) modal.remove();
            
            const topic = chemistryTopics.find(t => t.folderName === folderName);
            let url;
            let message;
            
            if (type === 'overview') {
                url = `https://demymichaels.github.io/raven/src/learning-materials/chemistry/${folderName}/`;
                message = `Opening ${title} overview...`;
            } else {
                // For subtopics, use the actual folder names from subtopicFolders
                const subtopicIndex = parseInt(type);
                if (topic && topic.subtopicFolders && topic.subtopicFolders[subtopicIndex]) {
                    const subtopicFolderName = topic.subtopicFolders[subtopicIndex];
                    url = `https://demymichaels.github.io/raven/src/learning-materials/chemistry/${folderName}/${subtopicFolderName}/`;
                    message = `Opening ${topic.subtopics[subtopicIndex]}...`;
                } else {
                    // Fallback to main topic if subtopic folder not found
                    url = `https://demymichaels.github.io/raven/src/learning-materials/chemistry/${folderName}/`;
                    message = `Opening ${title}...`;
                }
            }
            
            showMaterialToast(message, 'info');
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        }
