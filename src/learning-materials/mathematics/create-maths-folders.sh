#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Array of folder names and their corresponding titles
declare -A topics=(
    ["1.number-and-numeration"]="Number and Numeration"
    ["2.fractions-decimal-percentage"]="Fractions, Decimal, Approximations and Percentage"
    ["3.indices-logarithms-surds"]="Indices, Logarithms and Surds"
    ["4.sets"]="Sets"
    ["5.polynomials"]="Polynomials"
    ["6.variation"]="Variation"
    ["7.inequalities"]="Inequalities"
    ["8.progression"]="Progression"
    ["9.binary-operation"]="Binary Operation"
    ["10.matrices-determinants"]="Matrices and Determinants"
    ["11.euclidean-geometry"]="Euclidean Geometry"
    ["12.mensuration"]="Mensuration"
    ["13.loci"]="Loci"
    ["14.coordinate-geometry"]="Coordinate Geometry"
    ["15.trigonometry"]="Trigonometry"
    ["16.differentiation"]="Differentiation"
    ["17.application-of-differentiation"]="Application of Differentiation"
    ["18.integration"]="Integration"
    ["19.representation-of-data"]="Representation of Data"
    ["20.measure-of-location"]="Measure of Location"
    ["21.measures-of-dispersion"]="Measures of Dispersion"
    ["22.permutation-combination"]="Permutation and Combination"
    ["23.probability"]="Probability"
)

# Create each folder with index.html
echo "Creating math topic folders with index.html files in: $SCRIPT_DIR"
echo "================================================================"

for folder in "${!topics[@]}"; do
    full_path="$SCRIPT_DIR/$folder"
    index_file="$full_path/index.html"
    title="${topics[$folder]}"
    
    # Create folder if it doesn't exist
    if [ ! -d "$full_path" ]; then
        mkdir -p "$full_path"
        echo "✓ Created folder: $folder"
    else
        echo "✓ Folder exists: $folder"
    fi
    
    # Create or update index.html
    cat > "$index_file" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f5f5f5;
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
            text-align: center;
            margin-bottom: 30px;
        }
        .topic-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>$title</h1>
        
        <div class="topic-info">
            <p><strong>Topic:</strong> $title</p>
            <p><strong>Folder:</strong> $folder</p>
            <p><strong>Created:</strong> $(date)</p>
        </div>
        
        <p>This is the index page for the math topic: <strong>$title</strong>.</p>
        <p>Add your content, notes, and resources related to this topic here.</p>
    </div>
</body>
</html>
EOF
    
    echo "  ✓ Created/updated: $folder/index.html"
done

echo "================================================================"
echo "Folder and index.html creation completed!"
echo "Total topics processed: ${#topics[@]}"