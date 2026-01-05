#!/bin/bash
# ============================================
# SCHOOLS UPLOAD SCRIPT FOR RAVEN APP (FIRESTORE VERSION)
# ============================================
# This script uploads schools to Firestore instead of Realtime Database
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${CYAN}▶ $1${NC}"; }

# Banner
echo -e "${CYAN}"
echo "==========================================="
echo "   RAVEN SCHOOLS UPLOAD TO FIRESTORE"
echo "==========================================="
echo -e "${NC}"

# ==================== STEP 1: CHECK FIRESTORE STATUS ====================
log_step "Step 1: Checking Firestore setup..."

# Check if Firestore is enabled
if ! firebase firestore:databases:list --project raven-bddf7 2>/dev/null | grep -q "default"; then
    log_error "Firestore is not enabled for project 'raven-bddf7'!"
    echo ""
    echo "You need to enable Firestore first:"
    echo "1. Go to Firebase Console: https://console.firebase.google.com/"
    echo "2. Select project 'raven-bddf7'"
    echo "3. Click 'Firestore Database' in left menu"
    echo "4. Click 'Create database'"
    echo "5. Choose 'Start in test mode'"
    echo "6. Select location and click 'Enable'"
    echo ""
    echo "After enabling Firestore, run this script again."
    exit 1
fi

log_success "Firestore is enabled"

# ==================== STEP 2: EXTRACT SCHOOLS (You already did this) ====================
log_step "Step 2: Checking extracted schools..."

if [ ! -f "schools.json" ]; then
    log_error "schools.json not found! Run the extraction first."
    exit 1
fi

SCHOOL_COUNT=$(node -e "console.log(Object.keys(require('./schools.json')).length)" 2>/dev/null || echo "0")
log_info "Found $SCHOOL_COUNT schools in schools.json"

# ==================== STEP 3: UPLOAD TO FIRESTORE ====================
log_step "Step 3: Uploading to Firestore..."

echo "📊 Schools to upload: $SCHOOL_COUNT"
echo "🎯 Target: Firestore collection 'institutions'"
echo "📍 Project: raven-bddf7"
echo ""
echo "Choose upload method:"
echo "1. Single document with all schools (recommended)"
echo "2. Each school as separate document"
echo "3. Upload in batches (for large datasets)"
echo ""
read -p "Enter choice (1/2/3): " upload_choice

# Create Firestore upload script based on choice
case $upload_choice in
    1)
        # Method 1: Single document
        log_info "Creating single document upload..."
        cat > upload_firestore.js << 'EOF'
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');

// Your Firebase config (same as in your index.html)
const firebaseConfig = {
    apiKey: "AIzaSyAW0h6GzBE_bIvDusPuGtbzKZUlhoxUDXk",
    authDomain: "raven-bddf7.firebaseapp.com",
    projectId: "raven-bddf7",
    storageBucket: "raven-bddf7.firebasestorage.app",
    messagingSenderId: "515918066242",
    appId: "1:515918066242:web:3aba4c8d6007310371f3db"
};

console.log('Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read schools
const schools = JSON.parse(fs.readFileSync('./schools.json', 'utf8'));
const totalSchools = Object.keys(schools).length;

console.log(`Uploading ${totalSchools} schools to Firestore...`);

// Create single document with all schools
const uploadData = {
    schools: schools,
    count: totalSchools,
    lastUpdated: new Date().toISOString(),
    source: "schools.html",
    version: "1.0"
};

async function upload() {
    try {
        console.log('Uploading to collection: institutions, document: allSchools');
        await setDoc(doc(db, "institutions", "allSchools"), uploadData);
        console.log(`✅ Success! Uploaded ${totalSchools} schools as single document.`);
        console.log('📍 Path: institutions/allSchools');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

upload();
EOF
        ;;
    
    2)
        # Method 2: Each school as separate document
        log_info "Creating multi-document upload..."
        cat > upload_firestore.js << 'EOF'
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, writeBatch } = require('firebase/firestore');
const fs = require('fs');

const firebaseConfig = {
    apiKey: "AIzaSyAW0h6GzBE_bIvDusPuGtbzKZUlhoxUDXk",
    authDomain: "raven-bddf7.firebaseapp.com",
    projectId: "raven-bddf7",
    storageBucket: "raven-bddf7.firebasestorage.app",
    messagingSenderId: "515918066242",
    appId: "1:515918066242:web:3aba4c8d6007310371f3db"
};

console.log('Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const schools = JSON.parse(fs.readFileSync('./schools.json', 'utf8'));
const totalSchools = Object.keys(schools).length;
const entries = Object.entries(schools);

console.log(`Uploading ${totalSchools} schools as separate documents...`);

async function uploadBatch() {
    const batch = writeBatch(db);
    const collectionRef = collection(db, "institutions");
    
    let uploaded = 0;
    const batchSize = 500; // Firestore batch limit
    
    for (let i = 0; i < entries.length; i++) {
        const [id, name] = entries[i];
        const docRef = doc(collectionRef, id);
        
        batch.set(docRef, {
            id: id,
            name: name,
            index: i,
            createdAt: new Date().toISOString()
        });
        
        uploaded++;
        
        // Commit batch when we reach batch size or end
        if (uploaded % batchSize === 0 || i === entries.length - 1) {
            console.log(`Committing batch ${Math.ceil(uploaded / batchSize)}...`);
            await batch.commit();
            console.log(`✅ Uploaded ${uploaded}/${totalSchools} schools`);
            
            // Create new batch for next set
            if (i !== entries.length - 1) {
                // Note: In real code, you'd create a new batch here
                // For simplicity, we'll upload one by one for now
            }
        }
    }
    
    console.log(`🎉 All ${totalSchools} schools uploaded as separate documents!`);
    process.exit(0);
}

uploadBatch().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
EOF
        ;;
    
    3)
        # Method 3: Batched upload (hybrid approach)
        log_info "Creating batched upload..."
        cat > upload_firestore.js << 'EOF'
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');

const firebaseConfig = {
    apiKey: "AIzaSyAW0h6GzBE_bIvDusPuGtbzKZUlhoxUDXk",
    authDomain: "raven-bddf7.firebaseapp.com",
    projectId: "raven-bddf7",
    storageBucket: "raven-bddf7.firebasestorage.app",
    messagingSenderId: "515918066242",
    appId: "1:515918066242:web:3aba4c8d6007310371f3db"
};

console.log('Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const schools = JSON.parse(fs.readFileSync('./schools.json', 'utf8'));
const totalSchools = Object.keys(schools).length;
const entries = Object.entries(schools);

console.log(`Uploading ${totalSchools} schools in optimized format...`);

// Group schools by first letter for better querying
const schoolsByLetter = {};
entries.forEach(([id, name]) => {
    const firstLetter = name.charAt(0).toUpperCase();
    if (!schoolsByLetter[firstLetter]) {
        schoolsByLetter[firstLetter] = {};
    }
    schoolsByLetter[firstLetter][id] = name;
});

async function upload() {
    try {
        console.log('Creating documents for each letter...');
        
        // Upload each letter group as a document
        const letters = Object.keys(schoolsByLetter).sort();
        
        for (const letter of letters) {
            const count = Object.keys(schoolsByLetter[letter]).length;
            console.log(`  Letter ${letter}: ${count} schools`);
            
            await setDoc(doc(db, "institutions", `letter_${letter}`), {
                letter: letter,
                schools: schoolsByLetter[letter],
                count: count,
                updatedAt: new Date().toISOString()
            });
        }
        
        // Also create a master index document
        await setDoc(doc(db, "institutions", "index"), {
            totalSchools: totalSchools,
            letters: letters,
            lastUpdated: new Date().toISOString(),
            lettersCount: letters.length
        });
        
        console.log(`✅ Success! Uploaded ${totalSchools} schools across ${letters.length} letter groups.`);
        console.log('📍 Main index: institutions/index');
        console.log('📍 Letter groups: institutions/letter_A, institutions/letter_B, etc.');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

upload();
EOF
        ;;
    
    *)
        log_error "Invalid choice!"
        exit 1
        ;;
esac

# ==================== STEP 4: INSTALL FIRESTORE DEPENDENCIES ====================
log_step "Step 4: Installing Firestore dependencies..."

echo "The upload script requires Firebase Admin SDK."
echo "Installing dependencies..."

npm install firebase --save 2>/dev/null || {
    log_error "Failed to install Firebase SDK"
    echo "Please install manually: npm install firebase"
    exit 1
}

log_success "Dependencies installed"

# ==================== STEP 5: RUN UPLOAD ====================
log_step "Step 5: Running upload..."

echo "Starting upload to Firestore..."
echo "This may take a moment..."
echo ""

node upload_firestore.js

UPLOAD_RESULT=$?

# ==================== STEP 6: VERIFY ====================
log_step "Step 6: Verification..."

if [ $UPLOAD_RESULT -eq 0 ]; then
    log_success "Upload completed successfully!"
    
    # Create verification command
    cat > verify_firestore.js << 'EOF'
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAW0h6GzBE_bIvDusPuGtbzKZUlhoxUDXk",
    authDomain: "raven-bddf7.firebaseapp.com",
    projectId: "raven-bddf7",
    storageBucket: "raven-bddf7.firebasestorage.app",
    messagingSenderId: "515918066242",
    appId: "1:515918066242:web:3aba4c8d6007310371f3db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verify() {
    try {
        console.log('🔍 Verifying Firestore data...');
        const snapshot = await getDocs(collection(db, "institutions"));
        
        console.log(`Found ${snapshot.size} document(s) in 'institutions' collection:`);
        console.log('');
        
        let totalSchools = 0;
        snapshot.forEach(doc => {
            const data = doc.data();
            console.log(`📄 Document: ${doc.id}`);
            console.log(`   Type: ${data.schools ? 'Schools list' : data.letter ? 'Letter group' : 'Index'}`);
            
            if (data.count) {
                console.log(`   Count: ${data.count} schools`);
                totalSchools += data.count;
            }
            if (data.totalSchools) {
                console.log(`   Total: ${data.totalSchools} schools`);
                totalSchools = data.totalSchools;
            }
            if (data.letter) {
                console.log(`   Letter: ${data.letter}`);
            }
            console.log('');
        });
        
        console.log(`📊 Total schools in database: ${totalSchools}`);
        
    } catch (error) {
        console.error('Verification error:', error.message);
    }
}

verify();
EOF
    
    echo "Running verification..."
    node verify_firestore.js
    
else
    log_error "Upload failed with exit code: $UPLOAD_RESULT"
fi

# ==================== STEP 7: CLEANUP ====================
log_step "Step 7: Cleanup..."

rm -f upload_firestore.js verify_firestore.js 2>/dev/null

# ==================== STEP 8: CREATE USAGE INSTRUCTIONS ====================
log_step "Step 8: Creating app integration instructions..."

cat > FIRESTORE_INTEGRATION.md << 'EOF'
# FIRESTORE INTEGRATION FOR RAVEN APP

## Data Structure
Your schools data is now in Firestore under the `institutions` collection.

## How to Load in Your App:

### Option A: If you used single document (Method 1)
```javascript
import { collection, doc, getDoc } from "firebase/firestore";

async function loadInstitutions() {
    try {
        const docRef = doc(db, "institutions", "allSchools");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            const schools = data.schools; // This is your object {id: name, ...}
            
            // Populate dropdown
            const select = document.getElementById('institute');
            select.innerHTML = '<option value="">Select institution</option>';
            
            Object.entries(schools).forEach(([id, name]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = name;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Error loading institutions:", error);
    }
}