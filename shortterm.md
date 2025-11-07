


// Register Form Handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    
    const email = document.getElementById('registerEmail').value;
    
    const institute = document.getElementById('registerInstitute').value;
    
    const targetScore = document.getElementById('registerTargetScore').value;
    
    const password = document.getElementById('registerPassword').value;

    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        showMaterialToast('Passwords do not match!', 'error');
        return;
    }

    // Check if user already exists
    if (allUsers.find(user => user.email === email)) {
        showMaterialToast('User with this email already exists!', 'error');
        return;
    }

    // Create user object
    const newUser = {

        id: allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id || 0)) + 1 : 1,
        name: name,
        email: email,
        password: password,
        institute: institute,
        targetScore: parseInt(targetScore),
        registrationDate: new Date().toISOString(),
        hasPaid: false,
        lastLogin: null,
        studyStreak: 0,
        lastStudyDate: null,
        totalCorrectAnswers: 0,
        totalQuestions: 0,
        sessions: [],

        subjects: {
            'Mathematics': { progress: 0, questionsAnswered: 0, correctAnswers: 0 },
            'English': { progress: 0, questionsAnswered: 0, correctAnswers: 0 },
            'Physics': { progress: 0, questionsAnswered: 0, correctAnswers: 0 },
            'Chemistry': { progress: 0, questionsAnswered: 0, correctAnswers: 0 }
        }

    };

    // Add to users array
    allUsers.push(newUser);
    localStorage.setItem('raven_users', JSON.stringify(allUsers));


    // Set as current user
    localStorage.setItem('currentUserEmail', email);
    currentUser = newUser;


    // Show payment section after registration
    showSection(paymentSection);
    showMaterialToast('Account created successfully! 🎉', 'success');
});
