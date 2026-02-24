#!/bin/bash

# Agriculture Folder Structure Creator
# Run this script in the directory where you want the Agriculture folder to be created.

set -e  # Exit on error

echo "Creating Agriculture folder structure..."

# Create root folder
mkdir -p Agriculture

# Function to create folder and optional index.html
create_folder() {
    mkdir -p "Agriculture/$1"
    if [ "$2" == "index" ]; then
        touch "Agriculture/$1/index.html"
    fi
}

# SECTION A: Basic Concepts (Topics 1-7)
create_folder "01_MeaningScope" index
create_folder "02_Importance" index
create_folder "03_Ecology" index
create_folder "04_Genetics" index
create_folder "05_FarmInputs" index
create_folder "06_HistoryDevelopment" index
create_folder "07_RolesGovernmentNGOs" index

# SECTION B: Agronomy (Topics 8-31)
create_folder "08_RocksSoilFormation" index
create_folder "09_SoilWaterConservation" index
create_folder "10_SoilFertility" index
create_folder "11_LandPreparation" index
create_folder "12_PlantFormsFunctions" index
create_folder "13_GrowthReproduction" index
create_folder "14_PropagationMethods" index
create_folder "15_CroppingSystems" index

# Crop Groups with subfolders
# 16. Cereals
create_folder "16_Cereals" index
create_folder "16_Cereals/01_Maize" index
create_folder "16_Cereals/02_Rice" index
create_folder "16_Cereals/03_GuineaCorn" index

# 17. Legumes
create_folder "17_Legumes" index
create_folder "17_Legumes/01_Cowpea" index
create_folder "17_Legumes/02_Groundnut" index
create_folder "17_Legumes/03_Soyabean" index

# 18. Tubers
create_folder "18_Tubers" index
create_folder "18_Tubers/01_Yam" index
create_folder "18_Tubers/02_Cassava" index
create_folder "18_Tubers/03_SweetPotato" index

# 19. Vegetables and Spices
create_folder "19_VegetablesSpices" index
create_folder "19_VegetablesSpices/01_Tomatoes" index
create_folder "19_VegetablesSpices/02_Eggplant" index
create_folder "19_VegetablesSpices/03_Pepper" index
create_folder "19_VegetablesSpices/04_Onions" index
create_folder "19_VegetablesSpices/05_Okra" index
create_folder "19_VegetablesSpices/06_Cabbage" index
create_folder "19_VegetablesSpices/07_Amaranthus" index

# 20. Fruits
create_folder "20_Fruits" index
create_folder "20_Fruits/01_Citrus" index
create_folder "20_Fruits/02_Pineapple" index
create_folder "20_Fruits/03_Pawpaw" index

# 21. Beverages
create_folder "21_Beverages" index
create_folder "21_Beverages/01_Cocoa" index
create_folder "21_Beverages/02_Kola" index
create_folder "21_Beverages/03_Coffee" index

# 22. Oils
create_folder "22_Oils" index
create_folder "22_Oils/01_OilPalm" index
create_folder "22_Oils/02_Coconut" index
create_folder "22_Oils/03_SheaButter" index

# 23. Latex
create_folder "23_Latex" index
create_folder "23_Latex/01_Rubber" index
create_folder "23_Latex/02_GumArabic" index

# 24. Fibres
create_folder "24_Fibres" index
create_folder "24_Fibres/01_Cotton" index
create_folder "24_Fibres/02_Jute" index
create_folder "24_Fibres/03_SisalHemp" index

# 25. Sugars
create_folder "25_Sugars" index
create_folder "25_Sugars/01_Sugarcane" index
create_folder "25_Sugars/02_Beet" index

# 26-31. Other Agronomy topics
create_folder "26_PastureForage" index
create_folder "27_Floriculture" index
create_folder "28_Weeds" index
create_folder "29_CropDiseases" index
create_folder "30_CropPests" index
create_folder "31_ForestManagement" index

# SECTION C: Animal Production (Topics 32-42)
create_folder "32_FarmAnimals" index
create_folder "33_Terminology" index
create_folder "34_AnatomyPhysiology" index
create_folder "35_Reproduction" index
create_folder "36_AnimalNutrition" index
create_folder "37_LivestockManagement" index
create_folder "38_AnimalHealth" index
create_folder "39_Parasites" index
create_folder "40_Fisheries" index
create_folder "41_Wildlife" index
create_folder "42_Apiculture" index

# SECTION D: Agricultural Economics & Extension (Topics 43-48)
create_folder "43_FactorsProduction" index
create_folder "44_EconomicPrinciples" index
create_folder "45_LabourManagement" index
create_folder "46_FarmManagement" index
create_folder "47_Marketing" index
create_folder "48_Extension" index

# SECTION E: Agricultural Technology (Topics 49-56)
create_folder "49_FarmSurveying" index
create_folder "50_SimpleTools" index
create_folder "51_Machinery" index
create_folder "52_Mechanization" index
create_folder "53_ProcessingStorage" index
create_folder "54_Biotechnology" index
create_folder "55_ICT" index
create_folder "56_ResearchStatistics" index

echo "✅ Agriculture folder structure created successfully!"
echo "Total folders: $(find Agriculture -type d | wc -l)"