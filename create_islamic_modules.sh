#!/bin/bash

# Base directory (existing irs folder)
BASE_DIR="irs"

# Check if irs directory exists
if [ ! -d "$BASE_DIR" ]; then
    echo "Error: Directory '$BASE_DIR' does not exist!"
    echo "Please make sure the irs folder exists in the current directory."
    exit 1
fi

echo "Creating Islamic Studies modules directly in $BASE_DIR..."
echo "=========================================================="

# Array of folders with their data
# Format: "section|folder_name|module_title|icon|keywords"
folders=(
    # PART I: REVELATION & QUR'AN
    "1|01_Revelation|Revelation of Qur'an|📖|Cave Hira Jibril modes piecemeal wahy"
    "1|02_Preservation|Preservation of Qur'an|📜|compilation standardization makkah madinan suwar companions"
    "1|03_ImportanceQuran|Importance of Qur'an|⭐|guidance spiritual moral economic political"
    "1|04_Authenticity|Divine Authenticity|🔍|proof divine preservation uniqueness q4 82 q15 9"
    "1|05_Tafsir|Tafsir (Exegesis)|📚|interpretation history importance types"
    "1|06_Tajwid|Introduction to Tajwid|🎵|recitation rules pronunciation theory practice"
    "1|07_SurahShort|Surah Study 1 (Fatihah - Nas)|📖|fatihah adiyat qariah takathur asr humazah maun kawthar kafirun nasr masad ikhlas falaq nas"
    "1|08_SurahLonger|Surah Study 2 (Ala - Bayyinah)|📖|ala duha inshirah tin alaq qadr bayyinah zalzalah ayat kursi aman rasul"
    "1|09_HadithHistory|History of Hadith|📜|collection isnad matn six collectors"
    "1|10_HadithClassification|Authentication of Hadith|🔍|sahih hasan daif rijal"
    "1|11_HadithQuran|Hadith & Qur'an Relationship|🤝|importance similarities differences"
    "1|12_HadithCollectors|Six Sound Collectors|👥|bukhari muslim abu daud tirmidhi nasai ibn majah"
    "1|13_Muwatta|Muwatta & Imam Malik|📘|malik medina"
    "1|14_NawawiHadith|An-Nawawi's 40 Hadith|📋|nawawi 40 hadith"
    "1|15_Luqman|Luqman's Wisdom|👴|luqman son advice q31 shirk parents"
    "1|16_Parents|Goodness to Parents|👪|birr walidayn q17 23"
    "1|17_Honesty|Honesty|🤝|truthfulness q2 42 q61 2"
    "1|18_Prohibitions|Bribery & Corruption|🚫|bribery corruption q2 188"
    "1|19_AlcoholGambling|Alcohol & Gambling|🍷|khamr maysir q2 219 q5 90"
    "1|20_Drugs|Smoking & Intoxicants|🚬|drugs intoxicants q2 172 q4 43"
    "1|21_Arrogance|Arrogance & Extravagance|😤|pride waste q31 18 q17 26"
    "1|22_DignityLabour|Dignity of Labour|⚒️|work q62 10 hadith earning"
    "1|23_Modesty|Modesty in Dress|👔|hijab dress q24 27 q33 59"
    "1|24_SexualSins|Adultery & Homosexuality|⚠️|zina fornication q17 32 q24 2 lut"
    "1|25_LeadershipJustice|Leadership & Justice|⚖️|q2 124 q4 58 justice"
    "1|26_Trust|Trust & Obligations|🤲|amanah promises q4 58 q5 1 q16 91"
    "1|27_Taqwa|Piety (Taqwa)|✨|taqva q2 177 q3 102 q49 13"
    "1|28_Patience|Tolerance & Patience|⏳|sabr q2 153 q3 200 q103 3"
    "1|29_Unity|Unity & Brotherhood|🤝|ukhuvva q3 103 q49 10"
    "1|30_EnjoinGood|Enjoining Good & Forbidding Evil|📢|amr bil maruf nahy anil munkar q3 104"
    
    # PART II: TAWHID AND FIQH
    "2|31_Tawhid|Tawhid (Oneness of Allah)|🤲|tawhid shahadah oneness q112"
    "2|32_Shahadah|Kalimatush-Shahadah|⭐|shahadah la ilaha illallah muhammad rasulullah"
    "2|33_Prophethood|Messengership of Muhammad|🕊️|khatam anbiya final prophet q33 40"
    "2|34_Shirk|Shirk (Incompatible Beliefs)|🚫|idols trinity atheism q4 48 q112"
    "2|35_ShirkPractices|Shirk (Incompatible Practices)|🔮|superstition fortune telling magic bidah"
    "2|36_ArticlesFaith|Articles of Faith|📋|iman allah angels books prophets last day destiny qadar"
    "2|37_Ibadat|Ibadat (Worship)|🕌|good deeds taharah salah zakah sawm hajj jihad"
    "2|38_Taharah|Taharah (Purity)|💧|wudu ghusl tayammum istinja q2 222"
    "2|39_Salah|Salah (Prayer)|🧎|prayer importance types vitiate q2 45"
    "2|40_Zakah|Zakah|💰|zakat fitr mal disbursement q9 60"
    "2|41_Sawm|Sawm (Fasting)|🌙|ramadan fasting q2 183 exemption"
    "2|42_Hajj|Hajj (Pilgrimage)|🕋|kaaba ifrad qiran tamattu q3 97"
    "2|43_Jihad|Jihad|⚔️|struggle q2 190 kinds"
    "2|44_Marriage|Marriage (Nikah)|💍|nikah prohibited categories mahr polygamy q4 3"
    "2|45_Divorce|Divorce (Talaq)|📄|talaq khul faskh iddah q2 228"
    "2|46_Inheritance|Inheritance (Miras)|📊|heirs shares q4 7 11 176"
    "2|47_SourcesLaw|Sources of Islamic Law|📚|quran sunnah ijma qiyas schools"
    "2|48_EconomicSystem|Islamic Economic System|💰|riba hoarding baitul mal jizyah kharaj"
    "2|49_PoliticalSystem|Islamic Political System|🏛️|shurah justice accountability q3 159"
    
    # PART III: ISLAMIC HISTORY AND CIVILIZATION
    "3|50_Jahiliyyah|Pre-Islamic Arabia|🏜️|jahiliyyah idol worship infanticide"
    "3|51_LifeProphet|Life of Prophet Muhammad|🕊️|birth hijrah badr uhud khandaq hudaibiyyah conquest"
    "3|52_Caliphs|Rightly Guided Caliphs|👥|abubakar umar uthman ali khulafa rashidun"
    "3|53_IslamAfrica|Islam in Africa|🌍|abyssinia egypt west africa traders"
    "3|54_WestAfrica|Impact in West Africa|🏛️|ghana mali songhai borno timbuktu kano"
    "3|55_Education|Contributions to Education|🎓|sankore baghdad azhar nizamiyyah ibn sina al-ghazali"
)

# Create main README in irs folder
cat > "$BASE_DIR/README.md" << 'EOF'
# Islamic Studies (IRS) Curriculum Modules

This directory contains 55 organized modules for Islamic Religious Studies curriculum.

## Module Structure
Each module folder contains:
- `index.md` - Main content and learning objectives
- Additional resources as needed

## Quick Navigation
| Module Range | Topic Area |
|--------------|------------|
| 01-30 | Revelation, Qur'an & Hadith |
| 31-49 | Tawhid & Fiqh (Faith & Jurisprudence) |
| 50-55 | Islamic History & Civilization |

EOF

# Create folders and index.md files
for folder in "${folders[@]}"; do
    # Split the string into components
    IFS='|' read -r section folder_name title icon keywords <<< "$folder"
    
    # Create the module directory directly in BASE_DIR
    module_dir="$BASE_DIR/${folder_name}"
    mkdir -p "$module_dir"
    
    # Extract module number from folder_name
    module_num=$(echo "$folder_name" | cut -d'_' -f1)
    
    # Determine section name based on module number
    if [ $module_num -le 30 ]; then
        section_name="Revelation & Qur'an"
    elif [ $module_num -le 49 ]; then
        section_name="Tawhid & Fiqh"
    else
        section_name="History & Civilization"
    fi
    
    # Create index.md file in the module folder
    cat > "$module_dir/index.md" << EOF
---
module: $module_num
section: $section
section_name: "$section_name"
title: "$title"
icon: "$icon"
keywords: "$keywords"
---

# $icon Module $module_num: $title

## Overview
This module covers **$title** as part of the Islamic Studies curriculum.

## Learning Objectives
By the end of this module, students should be able to:
- Understand the core concepts of $title
- Identify key Quranic verses and Hadith related to this topic
- Apply the teachings to daily life
- Demonstrate understanding through discussion and reflection

## Key Vocabulary
| Term | Definition |
|------|------------|
| Term 1 | Definition here |
| Term 2 | Definition here |
| Term 3 | Definition here |

## Key Quranic Verses
| Reference | Verse (Translation) |
|-----------|---------------------|
| Surah:Verse | Translation of the verse |

## Key Hadith
| Source | Hadith Text |
|--------|-------------|
| [Book Name] | Hadith text here |

## Discussion Questions
1. How does this topic relate to our daily lives?
2. What are the key lessons we can learn from this module?
3. How can we apply these teachings in contemporary society?

## Activities
- **Group Discussion**: Discuss the main concepts with classmates
- **Research**: Find additional Quranic verses related to this topic
- **Reflection**: Write a one-page reflection on what you learned

## Assessment
- Class participation (20%)
- Quiz on key terms (30%)
- Written reflection (50%)

## Additional Resources
- [Resource 1] - Description
- [Resource 2] - Description
- [Resource 3] - Description

---
*Module $module_num | Section: $section_name | Last updated: $(date +"%B %d, %Y")*
EOF
    
    echo "✅ Created: $module_dir/index.md"
done

# Create MODULE_SUMMARY.md with all modules listed
SUMMARY_FILE="$BASE_DIR/MODULE_SUMMARY.md"
cat > "$SUMMARY_FILE" << 'EOF'
# Complete Module Summary

| Module | Icon | Title | Section | Keywords |
|--------|------|-------|---------|----------|
EOF

# Sort folders by module number and add to summary
for folder in "${folders[@]}"; do
    IFS='|' read -r section folder_name title icon keywords <<< "$folder"
    module_num=$(echo "$folder_name" | cut -d'_' -f1)
    
    # Determine section name
    if [ $module_num -le 30 ]; then
        section_display="Part I"
    elif [ $module_num -le 49 ]; then
        section_display="Part II"
    else
        section_display="Part III"
    fi
    
    echo "| $module_num | $icon | $title | $section_display | $keywords |" >> "$SUMMARY_FILE"
done

# Sort the summary file by module number (they're already in order, but just to be safe)
sort -n "$SUMMARY_FILE" -o "$SUMMARY_FILE"

echo "======================================================"
echo "✅ Created $(echo ${#folders[@]}) module folders with index.md files!"
echo "📁 Location: $(pwd)/$BASE_DIR"
echo ""
echo "Folder structure:"
echo "$BASE_DIR/"
echo "├── README.md (main directory readme)"
echo "├── MODULE_SUMMARY.md (complete module listing)"
for i in {01..55}; do
    printf "├── %s_*/\n" $i
    printf "│   └── index.md\n"
done
echo ""
echo "Sample of first 5 modules:"
ls -1 "$BASE_DIR" | grep "^[0-9]" | head -5 | while read folder; do
    echo "  📁 $folder/"
done
echo "  ... and 50 more modules"

# Make the script executable
chmod +x "$0"