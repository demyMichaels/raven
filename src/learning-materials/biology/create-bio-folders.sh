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

# Biology topics data
declare -A biology_topics=(
    ["1.variety-organisms-characteristics"]="Variety of Organisms - Characteristics & Cell Structure"
    ["2.evolution-classification"]="Evolution and Classification"
    ["3.adaptations"]="Structural and Functional Adaptations"
    ["4.internal-structure"]="Internal Structure of Plants and Animals"
    ["5.nutrition"]="Nutrition - Modes and Types"
    ["6.animal-nutrition"]="Animal Nutrition and Digestion"
    ["7.transport"]="Transport Systems"
    ["8.respiration"]="Respiration"
    ["9.excretion"]="Excretion"
    ["10.support-movement"]="Support and Movement"
    ["11.reproduction"]="Reproduction - Asexual and Sexual"
    ["12.growth"]="Growth and Development"
    ["13.nervous-coordination"]="Coordination and Control - Nervous System"
    ["14.hormonal-control"]="Hormonal Control and Homeostasis"
    ["15.ecology-factors"]="Ecology - Distribution and Interactions"
    ["16.nutrient-cycling"]="Nutrient Cycling and Habitats"
    ["17.nigerian-biomes"]="Nigerian Biomes"
    ["18.population-ecology"]="Population Ecology"
    ["19.soil-ecology"]="Soil Ecology"
    ["20.humans-environment"]="Humans and Environment"
    ["21.variation"]="Variation in Population"
    ["22.heredity-evolution"]="Heredity and Evolution"
)

# Subtopic arrays for each main topic
declare -A biology_subtopics=(
    # Topic 1
    ["1.variety-organisms-characteristics"]="a.characteristics-living-organisms b.cell-structure-functions c.levels-organization d.examples-organisms"
    # Topic 2
    ["2.evolution-classification"]="a.monera-prokaryotes b.protista c.fungi d.plantae e.animalia"
    # Topic 3
    ["3.adaptations"]="a.adaptive-coloration b.behavioral-adaptations c.structural-adaptations d.camouflage-mimicry e.environmental-adaptations"
    # Topic 4
    ["4.internal-structure"]="a.flowering-plants-structure b.root-system c.stem-structure d.leaf-structure e.mammal-structure"
    # Topic 5
    ["5.nutrition"]="a.autotrophic-heterotrophic b.photosynthesis-chemosynthesis c.types-feeding d.carnivorous-plants e.mineral-requirements"
    # Topic 6
    ["6.animal-nutrition"]="a.food-substances b.food-tests c.mammalian-teeth d.alimentary-canal e.nutrition-processes"
    # Topic 7
    ["7.transport"]="a.need-transportation b.materials-transport c.circulatory-system d.vascular-system e.transport-mechanisms"
    # Topic 8
    ["8.respiration"]="a.respiratory-organs b.gaseous-exchange-plants c.gaseous-exchange-animals d.aerobic-respiration e.anaerobic-respiration"
    # Topic 9
    ["9.excretion"]="a.excretory-structures b.kidney-functions c.lungs-skin-excretion d.plant-excretory-products e.excretory-mechanisms"
    # Topic 10
    ["10.support-movement"]="a.plant-movements b.supporting-tissues c.skeleton-types d.skeleton-functions e.locomotion-mechanisms"
    # Topic 11
    ["11.reproduction"]="a.asexual-reproduction b.vegetative-propagation c.sexual-reproduction-plants d.pollination-fertilization e.mammalian-reproduction"
    # Topic 12
    ["12.growth"]="a.meaning-growth b.seed-germination c.germination-conditions d.plant-growth-patterns e.animal-growth-patterns"
    # Topic 13
    ["13.nervous-coordination"]="a.central-nervous-system b.peripheral-nervous-system c.impulse-transmission d.reflex-action e.sense-organs"
    # Topic 14
    ["14.hormonal-control"]="a.animal-hormonal-system b.endocrine-glands c.plant-hormones d.temperature-regulation e.salt-water-regulation"
    # Topic 15
    ["15.ecology-factors"]="a.abiotic-factors b.biotic-factors c.symbiotic-interactions d.energy-flow e.food-chains-webs"
    # Topic 16
    ["16.nutrient-cycling"]="a.carbon-cycle b.water-cycle c.nitrogen-cycle d.aquatic-habitats e.terrestrial-habitats"
    # Topic 17
    ["17.nigerian-biomes"]="a.tropical-rainforest b.guinea-savanna c.sudan-savanna d.desert-regions e.highland-forests"
    # Topic 18
    ["18.population-ecology"]="a.population-density b.survival-adaptations c.competition d.population-factors e.ecological-succession"
    # Topic 19
    ["19.soil-ecology"]="a.soil-types b.soil-structure c.soil-components d.soil-fertility e.soil-organisms"
    # Topic 20
    ["20.humans-environment"]="a.diseases b.transmissible-diseases c.pollution-control d.conservation e.reserves-parks"
    # Topic 21
    ["21.variation"]="a.morphological-variations b.physiological-variations c.discontinuous-variation d.crime-detection e.paternity-determination"
    # Topic 22
    ["22.heredity-evolution"]="a.inheritance-characters b.chromosomes-heredity c.sex-determination d.evolution-theories e.evolution-evidence"
)

# Subtopic descriptions
declare -A subtopic_descriptions=(
    # Topic 1
    ["1.variety-organisms-characteristics_a.characteristics-living-organisms"]="Characteristics of living organisms"
    ["1.variety-organisms-characteristics_b.cell-structure-functions"]="Cell structure and functions of cell components"
    ["1.variety-organisms-characteristics_c.levels-organization"]="Levels of organization: Cell, Tissue, Organ, Systems"
    ["1.variety-organisms-characteristics_d.examples-organisms"]="Examples: Euglena, Paramecium, Hydra, Onion bulb"
    
    # Topic 2
    ["2.evolution-classification_a.monera-prokaryotes"]="Monera (prokaryotes): bacteria and blue-green algae"
    ["2.evolution-classification_b.protista"]="Protista: Amoeba, Euglena, Paramecium"
    ["2.evolution-classification_c.fungi"]="Fungi: mushroom and Rhizopus"
    ["2.evolution-classification_d.plantae"]="Plantae: Thallophyta to Spermatophyta"
    ["2.evolution-classification_e.animalia"]="Animalia: Invertebrates to Vertebrates"
    
    # Topic 3
    ["3.adaptations_a.adaptive-coloration"]="Adaptive coloration and its functions"
    ["3.adaptations_b.behavioral-adaptations"]="Behavioral adaptations in social animals"
    ["3.adaptations_c.structural-adaptations"]="Structural adaptations in organisms"
    ["3.adaptations_d.camouflage-mimicry"]="Camouflage and mimicry"
    ["3.adaptations_e.environmental-adaptations"]="Environmental adaptations"
    
    # Topic 4
    ["4.internal-structure_a.flowering-plants-structure"]="Internal structure of flowering plants"
    ["4.internal-structure_b.root-system"]="Root system structure and functions"
    ["4.internal-structure_c.stem-structure"]="Stem structure and functions"
    ["4.internal-structure_d.leaf-structure"]="Leaf structure and functions"
    ["4.internal-structure_e.mammal-structure"]="Internal structure of mammals"
    
    # Topic 5
    ["5.nutrition_a.autotrophic-heterotrophic"]="Autotrophic vs Heterotrophic nutrition"
    ["5.nutrition_b.photosynthesis-chemosynthesis"]="Photosynthesis and Chemosynthesis"
    ["5.nutrition_c.types-feeding"]="Types of feeding: Holozoic, Parasitic, Saprophytic"
    ["5.nutrition_d.carnivorous-plants"]="Carnivorous plants"
    ["5.nutrition_e.mineral-requirements"]="Mineral requirements in plants"
    
    # Topic 6
    ["6.animal-nutrition_a.food-substances"]="Classes of food substances"
    ["6.animal-nutrition_b.food-tests"]="Food tests: starch, protein, oil, fat"
    ["6.animal-nutrition_c.mammalian-teeth"]="Mammalian tooth structure and functions"
    ["6.animal-nutrition_d.alimentary-canal"]="Mammalian alimentary canal"
    ["6.animal-nutrition_e.nutrition-processes"]="Nutrition processes: ingestion to assimilation"
    
    # Topic 7
    ["7.transport_a.need-transportation"]="Need for transportation in organisms"
    ["7.transport_b.materials-transport"]="Materials for transportation"
    ["7.transport_c.circulatory-system"]="Mammalian circulatory system"
    ["7.transport_d.vascular-system"]="Plant vascular system: phloem and xylem"
    ["7.transport_e.transport-mechanisms"]="Transport mechanisms and processes"
    
    # Topic 8
    ["8.respiration_a.respiratory-organs"]="Respiratory organs and surfaces"
    ["8.respiration_b.gaseous-exchange-plants"]="Gaseous exchange in plants"
    ["8.respiration_c.gaseous-exchange-animals"]="Gaseous exchange in animals"
    ["8.respiration_d.aerobic-respiration"]="Aerobic respiration"
    ["8.respiration_e.anaerobic-respiration"]="Anaerobic respiration"
    
    # Topic 9
    ["9.excretion_a.excretory-structures"]="Types of excretory structures"
    ["9.excretion_b.kidney-functions"]="Kidneys and their functions"
    ["9.excretion_c.lungs-skin-excretion"]="Lungs and skin as excretory organs"
    ["9.excretion_d.plant-excretory-products"]="Excretory products of plants"
    ["9.excretion_e.excretory-mechanisms"]="Excretory mechanisms"
    
    # Topic 10
    ["10.support-movement_a.plant-movements"]="Plant movements: tropic, tactic, nastic"
    ["10.support-movement_b.supporting-tissues"]="Supporting tissues in animals"
    ["10.support-movement_c.skeleton-types"]="Types of skeleton: exo and endoskeleton"
    ["10.support-movement_d.skeleton-functions"]="Functions of skeleton in animals"
    ["10.support-movement_e.locomotion-mechanisms"]="Locomotion mechanisms"
    
    # Topic 11
    ["11.reproduction_a.asexual-reproduction"]="Asexual reproduction: fission, budding"
    ["11.reproduction_b.vegetative-propagation"]="Vegetative propagation: natural and artificial"
    ["11.reproduction_c.sexual-reproduction-plants"]="Sexual reproduction in flowering plants"
    ["11.reproduction_d.pollination-fertilization"]="Pollination and fertilization"
    ["11.reproduction_e.mammalian-reproduction"]="Reproduction in mammals"
    
    # Topic 12
    ["12.growth_a.meaning-growth"]="Meaning and characteristics of growth"
    ["12.growth_b.seed-germination"]="Germination of seeds"
    ["12.growth_c.germination-conditions"]="Conditions necessary for germination"
    ["12.growth_d.plant-growth-patterns"]="Growth patterns in plants"
    ["12.growth_e.animal-growth-patterns"]="Growth patterns in animals"
    
    # Topic 13
    ["13.nervous-coordination_a.central-nervous-system"]="Central nervous system components"
    ["13.nervous-coordination_b.peripheral-nervous-system"]="Peripheral nervous system"
    ["13.nervous-coordination_c.impulse-transmission"]="Transmission of impulses"
    ["13.nervous-coordination_d.reflex-action"]="Reflex action mechanisms"
    ["13.nervous-coordination_e.sense-organs"]="Sense organs: skin, nose, tongue, eye, ear"
    
    # Topic 14
    ["14.hormonal-control_a.animal-hormonal-system"]="Animal hormonal system"
    ["14.hormonal-control_b.endocrine-glands"]="Endocrine glands: pituitary, thyroid, adrenals"
    ["14.hormonal-control_c.plant-hormones"]="Plant hormones (phytohormones)"
    ["14.hormonal-control_d.temperature-regulation"]="Body temperature regulation"
    ["14.hormonal-control_e.salt-water-regulation"]="Salt and water regulation"
    
    # Topic 15
    ["15.ecology-factors_a.abiotic-factors"]="Abiotic factors affecting distribution"
    ["15.ecology-factors_b.biotic-factors"]="Biotic factors affecting distribution"
    ["15.ecology-factors_c.symbiotic-interactions"]="Symbiotic interactions"
    ["15.ecology-factors_d.energy-flow"]="Energy flow in ecosystems"
    ["15.ecology-factors_e.food-chains-webs"]="Food chains and food webs"
    
    # Topic 16
    ["16.nutrient-cycling_a.carbon-cycle"]="Carbon cycle"
    ["16.nutrient-cycling_b.water-cycle"]="Water cycle"
    ["16.nutrient-cycling_c.nitrogen-cycle"]="Nitrogen cycle"
    ["16.nutrient-cycling_d.aquatic-habitats"]="Aquatic habitats: ponds, streams, lakes"
    ["16.nutrient-cycling_e.terrestrial-habitats"]="Terrestrial habitats: savanna, forest"
    
    # Topic 17
    ["17.nigerian-biomes_a.tropical-rainforest"]="Tropical rainforest"
    ["17.nigerian-biomes_b.guinea-savanna"]="Guinea savanna (southern and northern)"
    ["17.nigerian-biomes_c.sudan-savanna"]="Sudan Savanna"
    ["17.nigerian-biomes_d.desert-regions"]="Desert regions"
    ["17.nigerian-biomes_e.highland-forests"]="Highland forests and grasslands"
    
    # Topic 18
    ["18.population-ecology_a.population-density"]="Population density and overcrowding"
    ["18.population-ecology_b.survival-adaptations"]="Adaptation for survival"
    ["18.population-ecology_c.competition"]="Competition: intraspecific and interspecific"
    ["18.population-ecology_d.population-factors"]="Factors affecting population sizes"
    ["18.population-ecology_e.ecological-succession"]="Ecological succession"
    
    # Topic 19
    ["19.soil-ecology_a.soil-types"]="Soil types: sandy, loamy, clayey"
    ["19.soil-ecology_b.soil-structure"]="Soil structure and porosity"
    ["19.soil-ecology_c.soil-components"]="Soil components: organic and inorganic"
    ["19.soil-ecology_d.soil-fertility"]="Soil fertility and maintenance"
    ["19.soil-ecology_e.soil-organisms"]="Soil organisms and their roles"
    
    # Topic 20
    ["20.humans-environment_a.diseases"]="Common and endemic diseases"
    ["20.humans-environment_b.transmissible-diseases"]="Transmissible diseases: cholera, tuberculosis"
    ["20.humans-environment_c.pollution-control"]="Pollution sources and control"
    ["20.humans-environment_d.conservation"]="Conservation of natural resources"
    ["20.humans-environment_e.reserves-parks"]="Game reserves and national parks"
    
    # Topic 21
    ["21.variation_a.morphological-variations"]="Morphological variations"
    ["21.variation_b.physiological-variations"]="Physiological variations"
    ["21.variation_c.discontinuous-variation"]="Discontinuous variation applications"
    ["21.variation_d.crime-detection"]="Crime detection and blood transfusion"
    ["21.variation_e.paternity-determination"]="Determination of paternity"
    
    # Topic 22
    ["22.heredity-evolution_a.inheritance-characters"]="Inheritance of characters"
    ["22.heredity-evolution_b.chromosomes-heredity"]="Chromosomes as basis of heredity"
    ["22.heredity-evolution_c.sex-determination"]="Sex determination and sex-linked traits"
    ["22.heredity-evolution_d.evolution-theories"]="Theories of evolution: Lamarck and Darwin"
    ["22.heredity-evolution_e.evolution-evidence"]="Evidence of evolution"
)

# Main execution
echo "🌱 Biology Topics Folder Creator"
echo "================================"
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
echo "Creating biology topics and subtopics..."
echo "----------------------------------------"

main_topics_created=0
main_topics_existing=0
subtopics_created=0
subtopics_existing=0

for main_folder in "${!biology_topics[@]}"; do
    main_title="${biology_topics[$main_folder]}"
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
            background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
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
            border-bottom: 3px solid #4caf50;
            padding-bottom: 15px;
        }
        .topic-info {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
            border-left: 5px solid #8bc34a;
        }
        .subtopics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .subtopic-card {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #c8e6c9;
            transition: transform 0.2s;
        }
        .subtopic-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .subtopic-card h3 {
            color: #2e7d32;
            margin-top: 0;
        }
        .stats {
            background: #f1f8e9;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌱 $main_title</h1>
        
        <div class="topic-info">
            <p><strong>📖 Main Topic:</strong> $main_title</p>
            <p><strong>📁 Folder:</strong> $main_folder</p>
            <p><strong>🕒 Created:</strong> $(date "+%Y-%m-%d %H:%M:%S")</p>
            <p><strong>🔢 Subtopics:</strong> $(echo ${biology_subtopics[$main_folder]} | wc -w)</p>
        </div>
        
        <div class="stats">
            <p>Total Biology Topics: 22 | Current Topic ID: ${main_folder%%.*}</p>
        </div>
        
        <h2>📚 Subtopics</h2>
        <div class="subtopics">
EOF
    
    # Create subtopics
    subtopics_array=(${biology_subtopics[$main_folder]})
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
            background-color: #f1f8e9;
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
            color: #2e7d32;
            border-bottom: 2px solid #4caf50;
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
        <p>Explore biological concepts, diagrams, and study materials related to this topic.</p>
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
        
        <p>Welcome to the <strong>$main_title</strong> section! This area contains comprehensive materials for studying biological concepts, from cellular structures to ecosystem dynamics.</p>
        <p>Explore the subtopics to dive deeper into specific biological concepts and principles.</p>
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
    echo "----------------------------------------"
    
    # Add all created files to Git
    git add .
    
    # Commit the changes
    commit_message="Add biology topics and subtopics
- Created $main_topics_created new main topics
- Updated $main_topics_existing existing main topics  
- Created $subtopics_created new subtopics
- Updated $subtopics_existing existing subtopics
- Total: 22 main topics with subtopics
- Timestamp: $(date)"
    
    if git commit -m "$commit_message" > /dev/null 2>&1; then
        echo "✅ Git commit created successfully"
    else
        echo "⚠️  No changes to commit or Git not fully configured"
    fi
fi

echo "----------------------------------------"
echo "🎉 Biology setup completed!"
echo "📊 Statistics:"
echo "   Main topics created: $main_topics_created"
echo "   Main topics existing: $main_topics_existing"
echo "   Subtopic folders created: $subtopics_created"
echo "   Subtopic folders existing: $subtopics_existing"
echo "   Total main topics: 22"
echo "   Total subtopics: $subtopics_created"
echo ""
echo "📍 Location: $SCRIPT_DIR"
echo "🌐 Open main topic folders to explore the hierarchical structure of biology topics!"