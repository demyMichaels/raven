#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if Git is configured
check_git_config() {
    if [ -z "$(git config user.name)" ] || [ -z "$(git config user.email)" ]; then
        echo "⚠️  Git configuration not found!"
        echo "Please run:"
        echo "  git config --global user.name 'Your Name'"
        echo "  git config --global user.email 'your.email@example.com'"
        echo ""
        read -p "Continue without Git? (y/N): " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Initialize Git repo if not already initialized
init_git() {
    if [ ! -d "$SCRIPT_DIR/.git" ]; then
        git init
        echo "✓ Git repository initialized"
    fi
}

# Chemistry topics data
declare -A chemistry_topics=(
    ["1.separation-mixtures-purification"]="Separation of Mixtures and Purification of Chemical Substances"
    ["2.chemical-combination"]="Chemical Combination"
    ["3.kinetic-theory-gas-laws"]="Kinetic Theory of Matter and Gas Laws"
    ["4.atomic-structure-bonding"]="Atomic Structure and Bonding"
    ["5.air"]="Air"
    ["6.water"]="Water"
    ["7.solubility"]="Solubility"
    ["8.environmental-pollution"]="Environmental Pollution"
    ["9.acids-bases-salts"]="Acids, Bases and Salts"
    ["10.oxidation-reduction-redox"]="Oxidation and Reduction - Redox"
    ["11.electrolysis"]="Electrolysis"
    ["12.energy-changes"]="Energy Changes"
    ["13.rates-chemical-reaction"]="Rates of Chemical Reaction"
    ["14.chemical-equilibrium"]="Chemical Equilibrium"
    ["15.non-metals-compounds"]="Non-metals and Their Compounds"
    ["16.metals-compounds"]="Metals and Their Compounds"
    ["17.organic-compounds"]="Organic Compounds"
    ["18.chemistry-industry"]="Chemistry and Industry"
)

# Subtopic arrays for each main topic
declare -A chemistry_subtopics=(
    # Topic 1
    ["1.separation-mixtures-purification"]="a.pure-impure-substances b.boiling-melting-points c.elements-compounds-mixtures d.chemical-physical-changes e.separation-processes"
    # Topic 2
    ["2.chemical-combination"]="a.laws-proportions b.conservation-matter c.gay-lussac-law d.avogadro-law e.chemical-symbols-formulas f.atomic-mass-mole g.stoichiometry"
    # Topic 3
    ["3.kinetic-theory-gas-laws"]="a.kinetic-theory-phenomena b.molecular-motion-brownian c.gas-laws d.combined-gas-law e.ideal-gas-equation f.vapour-density-molecular-mass"
    # Topic 4
    ["4.atomic-structure-bonding"]="a.atoms-molecules-ions b.atomic-theories c.atomic-structure-configuration d.orbital-shapes e.periodic-table f.chemical-bonding g.molecular-shapes h.nuclear-chemistry"
    # Topic 5
    ["5.air"]="a.gaseous-constituents b.nitrogen-oxygen-co2 c.noble-gases d.air-as-mixture e.uses-noble-gases"
    # Topic 6
    ["6.water"]="a.water-composition b.water-as-solvent c.hard-soft-water d.water-treatment e.water-crystallization"
    # Topic 7
    ["7.solubility"]="a.types-solutions b.solubility-curves c.solvents-applications d.true-false-solutions e.colloids-properties"
    # Topic 8
    ["8.environmental-pollution"]="a.sources-effects-pollutants b.air-pollution c.water-pollution d.soil-pollution"
    # Topic 9
    ["9.acids-bases-salts"]="a.characteristics-properties b.indicators-basicity c.types-salts d.conductance e.ph-poh-scale f.titrations g.hydrolysis-salts"
    # Topic 10
    ["10.oxidation-reduction-redox"]="a.oxidation-definition b.reduction-definition c.electron-transfer d.oxidation-numbers e.iupac-nomenclature f.tests-agents"
    # Topic 11
    ["11.electrolysis"]="a.electrolytes-non-electrolytes b.faraday-laws c.electrolysis-examples d.factors-discharge e.uses-electrolysis f.electrochemical-cells g.corrosion"
    # Topic 12
    ["12.energy-changes"]="a.energy-changes-delta-h b.dissolution-reactions c.endothermic-exothermic d.entropy e.spontaneity-reactions"
    # Topic 13
    ["13.rates-chemical-reaction"]="a.temperature-effects b.concentration-pressure c.surface-area d.catalyst-effects e.reaction-rate-curves f.activation-energy g.light-effects"
    # Topic 14
    ["14.chemical-equilibrium"]="a.reversible-reactions b.equilibrium-factors c.dynamic-equilibrium d.le-chatelier-principle e.equilibrium-constant f.examples"
    # Topic 15
    ["15.non-metals-compounds"]="a.hydrogen b.halogens-chlorine c.hydrogen-chloride d.oxygen-sulphur e.nitrogen-compounds f.carbon-compounds"
    # Topic 16
    ["16.metals-compounds"]="a.general-properties b.alkali-metals-sodium c.alkaline-earth-calcium d.aluminium e.tin f.transition-metals g.iron h.copper i.alloys"
    # Topic 17
    ["17.organic-compounds"]="a.carbon-tetravalency-nomenclature b.aliphatic-hydrocarbons c.aromatic-hydrocarbons d.alkanols e.alkanals-alkanones f.alkanoic-acids-alkanoates g.amines h.carbohydrates i.proteins j.polymers"
    # Topic 18
    ["18.chemistry-industry"]="a.chemical-industries-types b.raw-materials c.industrial-processes d.biotechnology e.environmental-considerations f.economic-importance"
)

# Subtopic descriptions
declare -A subtopic_descriptions=(
    # Topic 1
    ["1.separation-mixtures-purification_a.pure-impure-substances"]="Pure and impure substances"
    ["1.separation-mixtures-purification_b.boiling-melting-points"]="Boiling and melting points"
    ["1.separation-mixtures-purification_c.elements-compounds-mixtures"]="Elements, compounds and mixtures"
    ["1.separation-mixtures-purification_d.chemical-physical-changes"]="Chemical and physical changes"
    ["1.separation-mixtures-purification_e.separation-processes"]="Separation processes: Evaporation, distillation, sublimation, filtration, crystallization, chromatography"
    
    # Topic 2 (and so on for other topics...)
    ["2.chemical-combination_a.laws-proportions"]="Laws of definite, multiple and reciprocal proportions"
    ["2.chemical-combination_b.conservation-matter"]="Law of conservation of matter"
    ["2.chemical-combination_c.gay-lussac-law"]="Gay Lussac's law of combining volumes"
    ["2.chemical-combination_d.avogadro-law"]="Avogadro's law"
    ["2.chemical-combination_e.chemical-symbols-formulas"]="Chemical symbols, formulae, equations"
    ["2.chemical-combination_f.atomic-mass-mole"]="Relative atomic mass and mole concept"
    ["2.chemical-combination_g.stoichiometry"]="Stoichiometry of reactions"
)

# Main execution
echo "🧪 Chemistry Topics Folder Creator"
echo "=================================="
echo "Location: $SCRIPT_DIR"
echo ""

# Check Git configuration
check_git_config

# Change to script directory
cd "$SCRIPT_DIR"

# Initialize Git if configured
if [ -n "$(git config user.name)" ] && [ -n "$(git config user.email)" ]; then
    init_git
fi

# Create main topics and subtopics
echo ""
echo "Creating chemistry topics and subtopics..."
echo "------------------------------------------"

main_topics_created=0
main_topics_existing=0
subtopics_created=0
subtopics_existing=0

for main_folder in "${!chemistry_topics[@]}"; do
    main_title="${chemistry_topics[$main_folder]}"
    main_path="$SCRIPT_DIR/$main_folder"
    
    # Create main topic folder
    if [ ! -d "$main_path" ]; then
        mkdir -p "$main_path"
        echo "✅ Created main topic: $main_folder"
        main_topics_created=$((main_topics_created + 1))
    else
        echo "📁 Main topic exists: $main_folder"
        main_topics_existing=$((main_topics_existing + 1))
    fi
    
    # Create main topic index.html
    main_index_file="$main_path/index.html"
    cat > "$main_index_file" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$main_title</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 1000px;
            margin: 40px auto;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.2em;
            border-bottom: 3px solid #4ecdc4;
            padding-bottom: 15px;
        }
        .topic-info {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
            border-left: 5px solid #ff6b6b;
        }
        .subtopics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .subtopic-card {
            background: #e3f2fd;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #bbdefb;
            transition: transform 0.2s;
        }
        .subtopic-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .subtopic-card h3 {
            color: #1976d2;
            margin-top: 0;
        }
        .stats {
            background: #fff3e0;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 $main_title</h1>
        
        <div class="topic-info">
            <p><strong>📖 Main Topic:</strong> $main_title</p>
            <p><strong>📁 Folder:</strong> $main_folder</p>
            <p><strong>🕒 Created:</strong> $(date "+%Y-%m-%d %H:%M:%S")</p>
            <p><strong>🔢 Subtopics:</strong> $(echo ${chemistry_subtopics[$main_folder]} | wc -w)</p>
        </div>
        
        <div class="stats">
            <p>Total Chemistry Topics: 18 | Current Topic ID: ${main_folder%%.*}</p>
        </div>
        
        <h2>📚 Subtopics</h2>
        <div class="subtopics">
EOF
    
    # Create subtopics
    subtopics_array=(${chemistry_subtopics[$main_folder]})
    for subtopic_folder in "${subtopics_array[@]}"; do
        subtopic_path="$main_path/$subtopic_folder"
        subtopic_key="${main_folder}_${subtopic_folder}"
        subtopic_description="${subtopic_descriptions[$subtopic_key]:-$subtopic_folder}"
        
        # Create subtopic folder
        if [ ! -d "$subtopic_path" ]; then
            mkdir -p "$subtopic_path"
            subtopics_created=$((subtopics_created + 1))
        else
            subtopics_existing=$((subtopics_existing + 1))
        fi
        
        # Create subtopic index.html
        subtopic_index_file="$subtopic_path/index.html"
        cat > "$subtopic_index_file" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$subtopic_description</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f0f8ff;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #4ecdc4;
            padding-bottom: 10px;
        }
        .breadcrumb {
            color: #666;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="breadcrumb">
            <a href="../index.html">$main_title</a> → $subtopic_folder
        </div>
        
        <h1>$subtopic_description</h1>
        
        <div class="topic-info">
            <p><strong>📖 Subtopic:</strong> $subtopic_description</p>
            <p><strong>📁 Folder:</strong> $subtopic_folder</p>
            <p><strong>📚 Main Topic:</strong> $main_title</p>
            <p><strong>🕒 Created:</strong> $(date "+%Y-%m-%d %H:%M:%S")</p>
        </div>
        
        <p>This section contains materials and resources for: <strong>$subtopic_description</strong></p>
    </div>
</body>
</html>
EOF
        
        # Add subtopic to main index.html
        cat >> "$main_index_file" << EOF
            <div class="subtopic-card">
                <h3>${subtopic_folder#*.}</h3>
                <p>$subtopic_description</p>
                <p><a href="$subtopic_folder/index.html">Explore →</a></p>
            </div>
EOF
    done
    
    # Close main index.html
    cat >> "$main_index_file" << EOF
        </div>
        
        <p>Welcome to the <strong>$main_title</strong> section! This area contains comprehensive materials for studying chemical concepts and principles.</p>
    </div>
</body>
</html>
EOF
    
    echo "   📄 Created main index: index.html"
    echo "   📚 Created ${#subtopics_array[@]} subtopics"
    echo ""
done

# Git operations if configured
if [ -d "$SCRIPT_DIR/.git" ]; then
    echo "🔧 Git operations..."
    echo "------------------------------------------"
    
    # Add all created files to Git
    git add .
    
    # Commit the changes
    commit_message="Add chemistry topics and subtopics
- Created $main_topics_created new main topics
- Updated $main_topics_existing existing main topics  
- Created $subtopics_created new subtopics
- Updated $subtopics_existing existing subtopics
- Total: 18 main topics with subtopics
- Timestamp: $(date)"
    
    if git commit -m "$commit_message" > /dev/null 2>&1; then
        echo "✅ Git commit created successfully"
    else
        echo "⚠️  No changes to commit or Git not fully configured"
    fi
fi

echo "------------------------------------------"
echo "🎉 Chemistry setup completed!"
echo "📊 Statistics:"
echo "   Main topics created: $main_topics_created"
echo "   Main topics existing: $main_topics_existing"
echo "   Subtopic folders created: $subtopics_created"
echo "   Subtopic folders existing: $subtopics_existing"
echo "   Total main topics: 18"
echo "   Total subtopics: $(find "$SCRIPT_DIR" -type d -name "[a-z].*" | wc -l)"
echo ""
echo "📍 Location: $SCRIPT_DIR"
echo "🌐 Open main topic folders to explore the hierarchical structure!"