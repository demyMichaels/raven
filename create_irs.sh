#!/bin/bash

# Base directory (existing irs folder)
BASE_DIR="irs"

# Check if irs directory exists
if [ ! -d "$BASE_DIR" ]; then
    echo "Error: Directory '$BASE_DIR' does not exist!"
    echo "Please make sure the irs folder exists in the current directory."
    exit 1
fi

echo "Creating complete Islamic Studies module structure with subfolders..."
echo "=========================================================="

# Create main README
cat > "$BASE_DIR/README.md" << 'EOF'
# Islamic Studies (IRS) Complete Curriculum Structure

This directory contains 20 main modules with comprehensive subfolder structure for detailed Islamic Studies curriculum coverage.

## Main Modules Overview

| Module | Title | Subfolders |
|--------|-------|------------|
| 01 | Revelation and Preservation of Qur'an | 4 |
| 02 | Tafsir (Exegesis) | 0 |
| 03 | Introduction to Tajwid | 0 |
| 04 | Surah Study 1 (Fatihah - Nas) | 14 |
| 05 | Surah Study 2 (Ala - Bayyinah) | 11 |
| 06 | Hadith Literature and Authentication | 6 |
| 07 | Moral Lessons in Qur'an and Hadith | 17 |
| 08 | Tawhid and Fiqh | 5 |
| 09 | Articles of Faith | 0 |
| 10 | Ibadat and their Types | 7 |
| 11 | Family Matters | 4 |
| 12 | Sources and Schools of Law | 0 |
| 13 | Islamic Economic System | 0 |
| 14 | Islamic Political System | 0 |
| 15 | Pre-Islamic Arabia (Jahiliyyah) | 0 |
| 16 | Life of Prophet Muhammad (SAW) | 9 |
| 17 | The Rightly Guided Caliphs | 0 |
| 18 | Early Contact of Islam with Africa | 0 |
| 19 | Impact of Islam in West Africa | 0 |
| 20 | Contributions of Islam to Education | 6 |

**Total Modules: 20 | Total Subfolders: 83 | Total Folders: 103**

EOF

# Create main module directories with subfolders

# Module 01: Revelation_Preservation
mkdir -p "$BASE_DIR/01_Revelation_Preservation"/{01a_Revelation,01b_Preservation,01c_Importance,01d_Authenticity}

# Module 01 - Main index
cat > "$BASE_DIR/01_Revelation_Preservation/index.md" << 'EOF'
# Module 01: Revelation and Preservation of the Glorious Qur'an

This module covers the revelation, preservation, importance, and divine authenticity of the Glorious Qur'an.

## Submodules:
- [01a_Revelation](./01a_Revelation/) - Revelation of the Glorious Qur'an
- [01b_Preservation](./01b_Preservation/) - Preservation of the Glorious Qur'an
- [01c_Importance](./01c_Importance/) - Importance of the Glorious Qur'an
- [01d_Authenticity](./01d_Authenticity/) - Divine Authenticity of the Glorious Qur'an
EOF

# 01a_Revelation index
cat > "$BASE_DIR/01_Revelation_Preservation/01a_Revelation/index.md" << 'EOF'
# 01a: Revelation of the Glorious Qur'an

## Topics:
(i) Visits of the Prophet (SAW) to Cave Hira
(ii) His reaction to the first revelation and its importance
(iii) Different modes of revelation (Q.42:51): inspiration behind the veil, through an angel, etc.
(iv) Piecemeal revelation (Q.17:106) (Q.25:32)
(v) Names and attributes of the Qur'an

## Learning Objectives:
Candidates should be able to:
(i) analyse the Prophet's (SAW) visits to Cave Hira and the purpose;
(ii) describe the Prophet's reaction to the first revelation and its importance;
(iii) differentiate between the modes of revelation;
(iv) explain why the Glorious Qur'an was revealed piecemeal;
(v) identify the names and attributes of Qur'an.
EOF

# 01b_Preservation index
cat > "$BASE_DIR/01_Revelation_Preservation/01b_Preservation/index.md" << 'EOF'
# 01b: Preservation of the Glorious Qur'an

## Topics:
(i) Recording, compilation and standardization of the Qur'an
(ii) Differences between Makkah and Madinan suwar
(iii) The role played by the Companions of the Prophet (SAW) on the collection and compilation of the Qur'an

## Learning Objectives:
Candidates should be able to:
(i) analyse how the Glorious Qur'an was recorded, compiled and standardized;
(ii) differentiate between Makkan and Madinan suwar;
(iii) evaluate the role played by the companions of the Prophet (SAW) on the collection and compilation of the Qur'an.
EOF

# 01c_Importance index
cat > "$BASE_DIR/01_Revelation_Preservation/01c_Importance/index.md" << 'EOF'
# 01c: Importance of the Glorious Qur'an

## Topics:
(i) Importance of the Glorious Qur'an as a source of guidance in spiritual, moral, economic, political and socio-cultural matters

## Learning Objectives:
Candidates should be able to:
(i) examine the importance of the Glorious Qur'an.
EOF

# 01d_Authenticity index
cat > "$BASE_DIR/01_Revelation_Preservation/01d_Authenticity/index.md" << 'EOF'
# 01d: Divine Authenticity of the Glorious Qur'an

## Topics:
(i) Proof of the Divine authenticity of the Glorious Quran (Q.4:82) (Q.41:42)
(ii) Uniqueness of the Glorious Qur'an (Q.39:27) (Q.17:88) (Q.75:16-19)
(iii) Divine preservation of the Glorious Qur'an (Q.15:9)

## Learning Objectives:
Candidates should be able to:
(i) evaluate the proof of the divine authenticity of the Glorious Qur'an;
(ii) evaluate the uniqueness of the Glorious Qur'an;
(iii) examine the ways by which the Glorious Qur'an was preserved.
EOF

# Module 02: Tafsir
mkdir -p "$BASE_DIR/02_Tafsir"
cat > "$BASE_DIR/02_Tafsir/index.md" << 'EOF'
# Module 02: Tafsir (Exegesis)

## Topics:
(i) Historical development of Tafsir
(ii) Importance of Tafsir
(iii) Types of Tafsir

## Learning Objectives:
Candidates should be able to:
(i) trace the origin and sources of Tafsir;
(ii) evaluate the importance of Tafsir;
(iii) compare the types of Tafsir.
EOF

# Module 03: Tajwid
mkdir -p "$BASE_DIR/03_Tajwid"
cat > "$BASE_DIR/03_Tajwid/index.md" << 'EOF'
# Module 03: Introduction to Tajwid (Theory and Practice)

## Topics:
(i) Introduction to Tajwid (Theory and Practice)

## Learning Objectives:
Candidates should be able to:
(i) examine the meaning and importance of Tajwid.
EOF

# Module 04: Surah_Study_1 - Create 14 subfolders
mkdir -p "$BASE_DIR/04_Surah_Study_1"/{04a_Al_Fatihah,04b_Al_Adiyat,04c_Al_Qariah,04d_At_Takathur,04e_Al_Asr,04f_Al_Humazah,04g_Al_Maun,04h_Al_Kawthar,04i_Al_Kafirun,04j_An_Nasr,04k_Al_Masad,04l_Al_Ikhlas,04m_Al_Falaq,04n_An_Nas}

# Module 04 - Main index
cat > "$BASE_DIR/04_Surah_Study_1/index.md" << 'EOF'
# Module 04: Study of Surahs (al-Fatihah to an-Nas)

This module covers 14 surahs from Juz' 30 with tajwid, translation, and lessons.

## Submodules:
- [04a_Al_Fatihah](./04a_Al_Fatihah/) - Al-Fatihah (Q.1)
- [04b_Al_Adiyat](./04b_Al_Adiyat/) - Al-'Adiyat (Q.100)
- [04c_Al_Qariah](./04c_Al_Qariah/) - Al-Qari'ah (Q.101)
- [04d_At_Takathur](./04d_At_Takathur/) - At-Takathur (Q.102)
- [04e_Al_Asr](./04e_Al_Asr/) - Al-'Asr (Q.103)
- [04f_Al_Humazah](./04f_Al_Humazah/) - Al-Humazah (Q.104)
- [04g_Al_Maun](./04g_Al_Maun/) - Al-Ma'un (Q.107)
- [04h_Al_Kawthar](./04h_Al_Kawthar/) - Al-Kawthar (Q.108)
- [04i_Al_Kafirun](./04i_Al_Kafirun/) - Al-Kafirun (Q.109)
- [04j_An_Nasr](./04j_An_Nasr/) - An-Nasr (Q.110)
- [04k_Al_Masad](./04k_Al_Masad/) - Al-Masad (Q.111)
- [04l_Al_Ikhlas](./04l_Al_Ikhlas/) - Al-Ikhlas (Q.112)
- [04m_Al_Falaq](./04m_Al_Falaq/) - Al-Falaq (Q.113)
- [04n_An_Nas](./04n_An_Nas/) - An-Nas (Q.114)

## Common Learning Objectives for All Surahs:
Candidates should be able to:
(i) recite with correct tajwid the Arabic text of the surah;
(ii) translate the verses;
(iii) deduce lessons from them;
(iv) evaluate the teachings of the verses.
EOF

# Create individual surah files with specific information
surah_list_04=(
    "04a_Al_Fatihah|Al-Fatihah|Q.1|The Opening|7 verses"
    "04b_Al_Adiyat|Al-'Adiyat|Q.100|The Chargers|11 verses"
    "04c_Al_Qariah|Al-Qari'ah|Q.101|The Calamity|11 verses"
    "04d_At_Takathur|At-Takathur|Q.102|Rivalry in Worldly Increase|8 verses"
    "04e_Al_Asr|Al-'Asr|Q.103|The Declining Day|3 verses"
    "04f_Al_Humazah|Al-Humazah|Q.104|The Slanderer|9 verses"
    "04g_Al_Maun|Al-Ma'un|Q.107|Small Kindnesses|7 verses"
    "04h_Al_Kawthar|Al-Kawthar|Q.108|Abundance|3 verses"
    "04i_Al_Kafirun|Al-Kafirun|Q.109|The Disbelievers|6 verses"
    "04j_An_Nasr|An-Nasr|Q.110|Divine Support|3 verses"
    "04k_Al_Masad|Al-Masad|Q.111|The Palm Fiber|5 verses"
    "04l_Al_Ikhlas|Al-Ikhlas|Q.112|Sincerity|4 verses"
    "04m_Al_Falaq|Al-Falaq|Q.113|The Daybreak|5 verses"
    "04n_An_Nas|An-Nas|Q.114|Mankind|6 verses"
)

for surah in "${surah_list_04[@]}"; do
    IFS='|' read -r folder name reference description verses <<< "$surah"
    cat > "$BASE_DIR/04_Surah_Study_1/$folder/index.md" << EOF
# $name ($reference)

**Surah Type:** Makkiyah/Madaniyah  
**Number of Verses:** $verses  
**Meaning:** $description

## Arabic Text:
[Arabic text of the surah would be inserted here]

## Transliteration:
[Transliteration would be inserted here]

## Translation:
[Translation would be inserted here]

## Key Themes and Lessons:
1. 
2. 
3. 

## Tajwid Rules Applied:
- Rule 1:
- Rule 2:
- Rule 3:

## Learning Objectives:
Candidates should be able to:
(i) recite with correct tajwid the Arabic text of the surah;
(ii) translate the verses;
(iii) deduce lessons from them;
(iv) evaluate the teachings of the verses.
EOF
done

# Module 05: Surah_Study_2 - Create 11 subfolders
mkdir -p "$BASE_DIR/05_Surah_Study_2"/{05a_Al_Ala,05b_Ad_Duha,05c_Al_Inshirah,05d_At_Tin,05e_Al_Alaq,05f_Al_Qadr,05g_Al_Bayyinah,05h_Az_Zalzalah,05i_Ayatul_Kursiyy,05j_Amanar_Rasul,05k_Laqad_jaakum}

# Module 05 - Main index
cat > "$BASE_DIR/05_Surah_Study_2/index.md" << 'EOF'
# Module 05: Study of Surahs (al-A'la to Laqad jaakum)

This module covers additional surahs and important ayats with tajwid, translation, and lessons.

## Submodules:
- [05a_Al_Ala](./05a_Al_Ala/) - Al-A'la (Q.87)
- [05b_Ad_Duha](./05b_Ad_Duha/) - Ad-Duha (Q.93)
- [05c_Al_Inshirah](./05c_Al_Inshirah/) - Al-Inshirah (Q.94)
- [05d_At_Tin](./05d_At_Tin/) - At-Tin (Q.95)
- [05e_Al_Alaq](./05e_Al_Alaq/) - Al-'Alaq (Q.96)
- [05f_Al_Qadr](./05f_Al_Qadr/) - Al-Qadr (Q.97)
- [05g_Al_Bayyinah](./05g_Al_Bayyinah/) - Al-Bayyinah (Q.98)
- [05h_Az_Zalzalah](./05h_Az_Zalzalah/) - Az-Zalzalah (Q.99)
- [05i_Ayatul_Kursiyy](./05i_Ayatul_Kursiyy/) - Ayatul-Kursiyy (Q.2:255)
- [05j_Amanar_Rasul](./05j_Amanar_Rasul/) - Amanar-Rasul (Q.2:285-286)
- [05k_Laqad_jaakum](./05k_Laqad_jaakum/) - Laqad jaakum (Q.9:128-129)

## Common Learning Objectives:
Candidates should be able to:
(i) recite with correct tajwid the Arabic texts;
(ii) deduce lessons from them;
(iii) evaluate their teachings.
EOF

# Create individual surah files for Module 05
surah_list_05=(
    "05a_Al_Ala|Al-A'la|Q.87|The Most High|19 verses"
    "05b_Ad_Duha|Ad-Duha|Q.93|The Morning Hours|11 verses"
    "05c_Al_Inshirah|Al-Inshirah|Q.94|The Relief|8 verses"
    "05d_At_Tin|At-Tin|Q.95|The Fig|8 verses"
    "05e_Al_Alaq|Al-'Alaq|Q.96|The Clot|19 verses"
    "05f_Al_Qadr|Al-Qadr|Q.97|The Power|5 verses"
    "05g_Al_Bayyinah|Al-Bayyinah|Q.98|The Clear Proof|8 verses"
    "05h_Az_Zalzalah|Az-Zalzalah|Q.99|The Earthquake|8 verses"
    "05i_Ayatul_Kursiyy|Ayatul-Kursiyy|Q.2:255|The Throne Verse|1 verse"
    "05j_Amanar_Rasul|Amanar-Rasul|Q.2:285-286|The Messenger Believes|2 verses"
    "05k_Laqad_jaakum|Laqad jaakum|Q.9:128-129|There has come to you|2 verses"
)

for surah in "${surah_list_05[@]}"; do
    IFS='|' read -r folder name reference description verses <<< "$surah"
    cat > "$BASE_DIR/05_Surah_Study_2/$folder/index.md" << EOF
# $name ($reference)

**Surah Type:** Makkiyah/Madaniyah  
**Number of Verses:** $verses  
**Meaning:** $description

## Arabic Text:
[Arabic text would be inserted here]

## Transliteration:
[Transliteration would be inserted here]

## Translation:
[Translation would be inserted here]

## Key Themes and Lessons:
1. 
2. 
3. 

## Learning Objectives:
Candidates should be able to:
(i) recite with correct tajwid the Arabic text;
(ii) deduce lessons from them;
(iii) evaluate their teachings.
EOF
done

# Module 06: Hadith
mkdir -p "$BASE_DIR/06_Hadith"/{06a_History,06b_Authentication,06c_Relationship_Quran,06d_Six_Collectors,06e_Muwatta,06f_Nawawi_40}

# Module 06 - Main index
cat > "$BASE_DIR/06_Hadith/index.md" << 'EOF'
# Module 06: Hadith Literature and Authentication

This module covers the history, authentication, and major collections of Hadith.

## Submodules:
- [06a_History](./06a_History/) - History of Hadith Literature
- [06b_Authentication](./06b_Authentication/) - Authentication of Hadith
- [06c_Relationship_Quran](./06c_Relationship_Quran/) - Relationship between Hadith and Qur'an
- [06d_Six_Collectors](./06d_Six_Collectors/) - Six Sound Collectors
- [06e_Muwatta](./06e_Muwatta/) - Muwatta and Imam Malik
- [06f_Nawawi_40](./06f_Nawawi_40/) - An-Nawawi's 40 Hadith
EOF

# 06a_History
cat > "$BASE_DIR/06_Hadith/06a_History/index.md" << 'EOF'
# 06a: History of Hadith Literature

## Topics:
(i) Collection of Hadith from the time of the Prophet (SAW) to the period of the six authentic collectors of Hadith

## Learning Objectives:
Candidates should be able to:
(i) evaluate the history of Hadith from the time of the Prophet (SAW) to the period of six authentic collectors.
EOF

# 06b_Authentication
cat > "$BASE_DIR/06_Hadith/06b_Authentication/index.md" << 'EOF'
# 06b: Authentication of Hadith

## Topics:
(i) Isnad (Asma'ur-rijal)
(ii) Matn
(iii) Classification of Hadith into Sahih, Hassan and Da'if

## Learning Objectives:
Candidates should be able to:
(i) analyse the Isnad;
(ii) analyse the Matn;
(iii) distinguish between Hadith Sahih, Hassan and Da'if.
EOF

# 06c_Relationship_Quran
cat > "$BASE_DIR/06_Hadith/06c_Relationship_Quran/index.md" << 'EOF'
# 06c: The Relationship between Hadith and the Glorious Qur'an

## Topics:
(i) The importance of Hadith
(ii) The similarities and differences between Hadith and the Glorious Qur'an

## Learning Objectives:
Candidates should be able to:
(i) examine the importance of Hadith;
(ii) distinguish between Hadith and the Glorious Qur'an.
EOF

# 06d_Six_Collectors
cat > "$BASE_DIR/06_Hadith/06d_Six_Collectors/index.md" << 'EOF'
# 06d: The Six Sound Collectors of Hadith

## Topics:
(i) The six sound collectors of Hadith – biographies and their works:
    - Imam Bukhari
    - Imam Muslim
    - Imam Abu Daud
    - Imam Tirmidhi
    - Imam Nasai
    - Imam Ibn Majah

## Learning Objectives:
Candidates should be able to:
(i) evaluate their biographies and works.
EOF

# 06e_Muwatta
cat > "$BASE_DIR/06_Hadith/06e_Muwatta/index.md" << 'EOF'
# 06e: Muwatta and Its Author

## Topics:
(i) Muwatta and its author – The biography of Imam Malik and the study of his book

## Learning Objectives:
Candidates should be able to:
(i) evaluate his biography;
(ii) analyse his work.
EOF

# 06f_Nawawi_40
cat > "$BASE_DIR/06_Hadith/06f_Nawawi_40/index.md" << 'EOF'
# 06f: Study of An-Nawawi's 40 Hadith

## Topics:
(i) The study of the Arabic texts of ahadith from an-Nawawi's collection: 
    1, 3, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 18, 19, 21, 22, 25, 27, 34, and 41

## Learning Objectives:
Candidates should be able to:
(i) interpret the ahadith in Arabic;
(ii) apply them in their daily lives.
EOF

# Module 07: Moral_Lessons - Create 17 subfolders
mkdir -p "$BASE_DIR/07_Moral_Lessons"/{07a_Luqman,07b_Parents,07c_Honesty,07d_Bribery,07e_Alcohol_Gambling,07f_Stealing_Fraud,07g_Drugs,07h_Arrogance,07i_Dignity_Labour,07j_Modesty,07k_Sexual_Sins,07l_Leadership,07m_Trust,07n_Taqwa,07o_Patience,07p_Unity,07q_Enjoin_Good}

# Module 07 - Main index
cat > "$BASE_DIR/07_Moral_Lessons/index.md" << 'EOF'
# Module 07: Moral Lessons in the Glorious Qur'an and Hadith

This module covers 17 moral lessons derived from Quranic verses and authentic Hadith.

## Submodules:
- [07a_Luqman](./07a_Luqman/) - Admonition of Sage Luqman
- [07b_Parents](./07b_Parents/) - Goodness to Parents
- [07c_Honesty](./07c_Honesty/) - Honesty
- [07d_Bribery](./07d_Bribery/) - Prohibition of Bribery and Corruption
- [07e_Alcohol_Gambling](./07e_Alcohol_Gambling/) - Prohibition of Alcohol and Gambling
- [07f_Stealing_Fraud](./07f_Stealing_Fraud/) - Prohibition of Stealing and Fraud
- [07g_Drugs](./07g_Drugs/) - Prohibition of Smoking, Drug Abuse and Intoxicants
- [07h_Arrogance](./07h_Arrogance/) - Prohibition of Arrogance and Extravagance
- [07i_Dignity_Labour](./07i_Dignity_Labour/) - Dignity of Labour
- [07j_Modesty](./07j_Modesty/) - Behaviour and Modesty in Dressing
- [07k_Sexual_Sins](./07k_Sexual_Sins/) - Adultery, Fornication, Homosexuality and Obscenity
- [07l_Leadership](./07l_Leadership/) - Leadership and Justice
- [07m_Trust](./07m_Trust/) - Trust, Obligations and Promises
- [07n_Taqwa](./07n_Taqwa/) - Piety (Taqwa)
- [07o_Patience](./07o_Patience/) - Tolerance, Perseverance and Patience
- [07p_Unity](./07p_Unity/) - Unity and Brotherhood
- [07q_Enjoin_Good](./07q_Enjoin_Good/) - Enjoining Good and Forbidding Evil
EOF

# 07a_Luqman
cat > "$BASE_DIR/07_Moral_Lessons/07a_Luqman/index.md" << 'EOF'
# 07a: Admonition of Sage Luqman

## Topics:
(i) General moral lessons contained in the admonition of Sage Luqman to his son (Q.31:12-18)

## Learning Objectives:
Candidates should be able to:
(i) use the teachings of the verses in their daily lives.
EOF

# 07b_Parents
cat > "$BASE_DIR/07_Moral_Lessons/07b_Parents/index.md" << 'EOF'
# 07b: Goodness to Parents

## Topics:
(i) Goodness to parents (Q.17:23-24)

## Learning Objectives:
Candidates should be able to:
(i) apply the teachings of the verses to their daily lives.
EOF

# 07c_Honesty
cat > "$BASE_DIR/07_Moral_Lessons/07c_Honesty/index.md" << 'EOF'
# 07c: Honesty

## Topics:
(i) Honesty (Q.2:42) (Q.61:2-3)

## Learning Objectives:
Candidates should be able to:
(i) demonstrate the teachings of the verses in their daily lives.
EOF

# 07d_Bribery
cat > "$BASE_DIR/07_Moral_Lessons/07d_Bribery/index.md" << 'EOF'
# 07d: Prohibition of Bribery and Corruption

## Topics:
(i) Prohibition of bribery and corruption (Q.2:188)

## Learning Objectives:
Candidates should be able to:
(i) use the teachings of the verses in their daily lives.
EOF

# 07e_Alcohol_Gambling
cat > "$BASE_DIR/07_Moral_Lessons/07e_Alcohol_Gambling/index.md" << 'EOF'
# 07e: Prohibition of Alcohol and Gambling

## Topics:
(i) Prohibition of alcohol and gambling (Q.2:219) (Q.5:90-91)

## Learning Objectives:
Candidates should be able to:
(i) use the teachings of the verses in their daily lives.
EOF

# 07f_Stealing_Fraud
cat > "$BASE_DIR/07_Moral_Lessons/07f_Stealing_Fraud/index.md" << 'EOF'
# 07f: Prohibition of Stealing and Fraud

## Topics:
(i) Stealing and fraud (Q.5:41) (83:1-5)

## Learning Objectives:
Candidates should be able to:
(i) use the teachings of the verses in their daily lives.
EOF

# 07g_Drugs
cat > "$BASE_DIR/07_Moral_Lessons/07g_Drugs/index.md" << 'EOF'
# 07g: Prohibition of Smoking, Drug Abuse and Intoxicants

## Topics:
(i) Smoking, drug abuse and other intoxicants (Q.2:172-173, 195 and 219) (Q.4:43) (Q.5:3) (Q.6:118-121)

## Learning Objectives:
Candidates should be able to:
(i) use the teachings of the verses in their daily lives.
EOF

# 07h_Arrogance
cat > "$BASE_DIR/07_Moral_Lessons/07h_Arrogance/index.md" << 'EOF'
# 07h: Prohibition of Arrogance and Extravagance

## Topics:
(i) Arrogance (Q.31:18-19) and extravagance (Q.17:26-27) (Q.31:18-19)

## Learning Objectives:
Candidates should be able to:
(i) use the teachings of the verses in their daily lives.
EOF

# 07i_Dignity_Labour
cat > "$BASE_DIR/07_Moral_Lessons/07i_Dignity_Labour/index.md" << 'EOF'
# 07i: Dignity of Labour

## Topics:
(i) Dignity of labour (Q.62:10) (Q.78:11) 
(ii) Hadith from Bukhari and Ibn Majah: "that one of you takes his rope……." "never has anyone of you eaten……"

## Learning Objectives:
Candidates should be able to:
(i) apply the teachings of the verses in their daily lives.
EOF

# 07j_Modesty
cat > "$BASE_DIR/07_Moral_Lessons/07j_Modesty/index.md" << 'EOF'
# 07j: Behaviour and Modesty in Dressing

## Topics:
(i) Behaviour and modesty in dressing (Q.24:27-31) (Q.33:59)

## Learning Objectives:
Candidates should be able to:
(i) demonstrate the teachings of the verses in their daily lives.
EOF

# 07k_Sexual_Sins
cat > "$BASE_DIR/07_Moral_Lessons/07k_Sexual_Sins/index.md" << 'EOF'
# 07k: Adultery, Fornication, Homosexuality and Obscenity

## Topics:
(i) Adultery and fornication (Q.17:32) (Q.24:2)
(ii) Homosexuality (Q.11:77-83)
(iii) Obscenity (Q.4:14-15)
(iv) Hadith – "No one of you should meet a woman privately……" (Bukhari)

## Learning Objectives:
Candidates should be able to:
(i) apply the teachings of the verses in their daily lives.
EOF

# 07l_Leadership
cat > "$BASE_DIR/07_Moral_Lessons/07l_Leadership/index.md" << 'EOF'
# 07l: Leadership and Justice

## Topics:
(i) Leadership (Q.2:124) and justice (Q.4:58 and 135) (Q.5:9)
(ii) Hadith – "take care everyone of you is a governor ….. concerning his subjects" (al-Bukhari and others)

## Learning Objectives:
Candidates should be able to:
(i) apply the teachings of the verses and the Hadith to their daily lives.
EOF

# 07m_Trust
cat > "$BASE_DIR/07_Moral_Lessons/07m_Trust/index.md" << 'EOF'
# 07m: Trust, Obligations and Promises

## Topics:
(i) Trust and obligations (Q.4:58) (Q.5:1)
(ii) Promises (Q.16:91)
(iii) Hadith "he has (really) no faith …. Not fulfilled his promise" (Baihaqi)

## Learning Objectives:
Candidates should be able to:
(i) demonstrate the teachings of the verses and the Hadith in their daily lives.
EOF

# 07n_Taqwa
cat > "$BASE_DIR/07_Moral_Lessons/07n_Taqwa/index.md" << 'EOF'
# 07n: Piety (Taqwa)

## Topics:
(i) Piety (Taqwa) (Q.2:177) (Q.3:102) (Q.49:13)
(ii) Hadith 18 and 35 of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) apply the teachings of the verses and the ahadith in their daily lives.
EOF

# 07o_Patience
cat > "$BASE_DIR/07_Moral_Lessons/07o_Patience/index.md" << 'EOF'
# 07o: Tolerance, Perseverance and Patience

## Topics:
(i) Tolerance, perseverance and patience (Q.2:153-157) (Q.3:200) (Q.103:3)
(ii) Hadith 16 of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) interpret the teachings of the verses and the Hadith in their daily lives.
EOF

# 07p_Unity
cat > "$BASE_DIR/07_Moral_Lessons/07p_Unity/index.md" << 'EOF'
# 07p: Unity and Brotherhood

## Topics:
(i) Unity and brotherhood (Q.3:103) (Q.8:46) (Q.49:10)
(ii) Hadith 35 of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) demonstrate the teachings of the verses and the Hadith in their daily lives.
EOF

# 07q_Enjoin_Good
cat > "$BASE_DIR/07_Moral_Lessons/07q_Enjoin_Good/index.md" << 'EOF'
# 07q: Enjoining Good and Forbidding Evil

## Topics:
(i) Enjoining what is good and forbidding what is wrong (Q.3:104 and 110) (Q.16:90)
(ii) Hadith 25 and 34 of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) apply the teachings of the verses and the ahadith in their daily lives.
EOF

# Module 08: Tawhid_Fiqh
mkdir -p "$BASE_DIR/08_Tawhid_Fiqh"/{08a_Tawhid,08b_Shahadah,08c_Prophethood,08d_Shirk_Beliefs,08e_Shirk_Practices}

# Module 08 - Main index
cat > "$BASE_DIR/08_Tawhid_Fiqh/index.md" << 'EOF'
# Module 08: Tawhid and Fiqh

This module covers the fundamentals of Islamic faith and jurisprudence.

## Submodules:
- [08a_Tawhid](./08a_Tawhid/) - Tawhid (Oneness of Allah)
- [08b_Shahadah](./08b_Shahadah/) - Kalimatush-Shahadah
- [08c_Prophethood](./08c_Prophethood/) - Messengership of Muhammad (SAW)
- [08d_Shirk_Beliefs](./08d_Shirk_Beliefs/) - Shirk (Incompatible Beliefs)
- [08e_Shirk_Practices](./08e_Shirk_Practices/) - Shirk (Incompatible Practices)
EOF

# 08a_Tawhid
cat > "$BASE_DIR/08_Tawhid_Fiqh/08a_Tawhid/index.md" << 'EOF'
# 08a: Tawhid (Oneness of Allah)

## Topics:
(i) Tawhid - Its importance and lessons

## Learning Objectives:
Candidates should be able to:
(i) analyse the concepts of Tawhid.
EOF

# 08b_Shahadah
cat > "$BASE_DIR/08_Tawhid_Fiqh/08b_Shahadah/index.md" << 'EOF'
# 08b: Kalimatush-Shahadah

## Topics:
(i) Its meaning and importance
(ii) The Oneness of Allah as contained in the following verses: (Q.3:18) (Q.2:255) (Q.112:1-4)

## Learning Objectives:
Candidates should be able to:
(i) evaluate the significance of kalimatush-shahadah;
(ii) identify the verses dealing with the Oneness of Allah.
EOF

# 08c_Prophethood
cat > "$BASE_DIR/08_Tawhid_Fiqh/08c_Prophethood/index.md" << 'EOF'
# 08c: Messengership of Muhammad (SAW)

## Topics:
(i) The servanthood and messengership of the Prophet Muhammad (SAW) as contained in the following verses (Q.3:144) (Q.18:110) (Q.48:29) and (Q.34:28)
(ii) Universality of his message (Q.7:158) (Q.34:28)
(iii) Finality of his Prophethood (Q.33:40)

## Learning Objectives:
Candidates should be able to:
(i) explain the significance of the servanthood of the Prophet Muhammad (SAW);
(ii) evaluate the significance of the universality of Prophet Muhammad's message;
(iii) examine the significance of the finality of the Prophethood of Muhammad (SAW).
EOF

# 08d_Shirk_Beliefs
cat > "$BASE_DIR/08_Tawhid_Fiqh/08d_Shirk_Beliefs/index.md" << 'EOF'
# 08d: Shirk (Incompatible Beliefs)

## Topics:
(i) Beliefs which are incompatible with the Islamic principles of Tawhid:
    - Worship of Idols (Q.4:48) (Q.22:31)
    - Ancestral worship (Q.4:48 and 116) (Q.21:66-67)
    - Trinity (Q.4:171) (Q.5:76) (Q.112:1-4)
    - Atheism (Q.45:24) (Q.72:6) (Q.79:17-22)

## Learning Objectives:
Candidates should be able to:
(i) identify what actions and beliefs constitute shirk;
(ii) explain the implications of beliefs and actions of shirk;
(iii) appreciate why they should avoid actions of shirk.
EOF

# 08e_Shirk_Practices
cat > "$BASE_DIR/08_Tawhid_Fiqh/08e_Shirk_Practices/index.md" << 'EOF'
# 08e: Shirk (Incompatible Practices)

## Topics:
(i) General practices which are incompatible with Islamic principles of Tawhid:
    - Superstition (Q.25:43) (Q.72:6)
    - Fortune-telling (Q.15:16-18) (Q.37:6-10)
    - Magic and witchcraft (Q.2:102) (Q.20:69 and 73) (Q.26:46)
    - Cult worship (Q.17:23) (Q.4:48)
    - Innovation (Bid'ah) (Q.4:116) and Hadith 5 and 28 of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) identify those practices that are incompatible with the Islamic principles of Tawhid;
(ii) examine those practices that are incompatible with Tawhid;
(iii) shun off those actions;
(iv) demonstrate the teachings of the verses and the ahadith in their daily lives.
EOF

# Module 09: Articles_Faith
mkdir -p "$BASE_DIR/09_Articles_Faith"
cat > "$BASE_DIR/09_Articles_Faith/index.md" << 'EOF'
# Module 09: Articles of Faith

## Topics:
(a) Belief in Allah
    (i) Existence of Allah (Q.2:255) (Q.52:35-36)
    (ii) Attributes of Allah (Q.59:22-24)
    (iii) The works of Allah (Q.27:59-64)
(b) Belief in Allah's angels (Q.2:177 and 285) (Q.8:50) (Q.16:2)
(c) His books (Q.2:253 and 285) (Q.3:3)
(d) His Prophets: Ulul-azmi (Q.4:163-164)
(e) The Last Day: Yawm-al-Ba'th (Q.23:15-16) (Q.70:4)
(f) Destiny: distinction between Qada and Qadar (Q.2:117) (Q.16:40) (Q.36:82)

## Learning Objectives:
Candidates should be able to:
(i) examine the significance of the articles of faith;
(ii) list the attributes of Allah;
(iii) examine the works of Allah;
(iv) explain the belief in Allah's books;
(v) identify the verses on Allah's books;
(vi) explain the belief in the Prophets of Allah and its significance;
(vii) analyse the belief in the Last Day and its significance;
(viii) evaluate the belief in destiny and its significance.
EOF

# Module 10: Ibadat
mkdir -p "$BASE_DIR/10_Ibadat"/{10a_Good_Deeds,10b_Taharah,10c_Salah,10d_Zakah,10e_Sawm,10f_Hajj,10g_Jihad}

# Module 10 - Main index
cat > "$BASE_DIR/10_Ibadat/index.md" << 'EOF'
# Module 10: Ibadat and their Types

This module covers various forms of worship in Islam.

## Submodules:
- [10a_Good_Deeds](./10a_Good_Deeds/) - Good Deeds
- [10b_Taharah](./10b_Taharah/) - Taharah (Purity)
- [10c_Salah](./10c_Salah/) - Salah (Prayer)
- [10d_Zakah](./10d_Zakah/) - Zakah
- [10e_Sawm](./10e_Sawm/) - Sawm (Fasting)
- [10f_Hajj](./10f_Hajj/) - Hajj (Pilgrimage)
- [10g_Jihad](./10g_Jihad/) - Jihad
EOF

# 10a_Good_Deeds
cat > "$BASE_DIR/10_Ibadat/10a_Good_Deeds/index.md" << 'EOF'
# 10a: Good Deeds

## Topics:
(i) Good deeds (Q.3:134) (Q.6:160) (Q.2:177) (Q.31:8) (Q.103:1-3)
(ii) 26th Hadith of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) identify what constitutes acts of ibadah.
EOF

# 10b_Taharah
cat > "$BASE_DIR/10_Ibadat/10b_Taharah/index.md" << 'EOF'
# 10b: Taharah (Purity)

## Topics:
(i) Taharah, its types and importance (al-istinja'/istijmar, al-wudu', at-tayammum and al-ghusl)
(ii) (Q.2:222) (Q.5:7)
(iii) Hadith 10 and 23 of an-Nawawi

## Learning Objectives:
Candidates should be able to:
(i) distinguish between the different types of taharah.
EOF

# 10c_Salah
cat > "$BASE_DIR/10_Ibadat/10c_Salah/index.md" << 'EOF'
# 10c: Salah (Prayer)

## Topics:
(i) Importance: (Q.2:45) (Q.20:132) (Q.29:45) and Hadith 23rd of an-Nawawi
(ii) Description and types of salah
(iii) Things that vitiate salah

## Learning Objectives:
Candidates should be able to:
(i) assess the importance of salah to a Muslim's life;
(ii) analyse different types of salah;
(iii) identify things that vitiate salah.
EOF

# 10d_Zakah
cat > "$BASE_DIR/10_Ibadat/10d_Zakah/index.md" << 'EOF'
# 10d: Zakah

## Topics:
(i) Its types and importance (zakatul-fitr, zakatul mal, al-an'am and al-harth) (Q.2:267) (Q.9:103) 3rd Hadith of an-Nawawi
(ii) Collection and disbursement (Q.9:60)
(iii) Difference between Zakah and sadaqah

## Learning Objectives:
Candidates should be able to:
(i) differentiate between the various types of zakah and the time of giving them out;
(ii) explain how to collect and distribute zakah;
(iii) distinguish between zakah and sadaqah.
EOF

# 10e_Sawm
cat > "$BASE_DIR/10_Ibadat/10e_Sawm/index.md" << 'EOF'
# 10e: Sawm (Fasting)

## Topics:
(i) Its types and importance (fard, sunnah, qada and kaffarah) (Q.2:183-185) 3rd Hadith of an-Nawawi
(ii) People exempted from sawm
(iii) Things that vitiate sawm

## Learning Objectives:
Candidates should be able to:
(i) compare the various types of sawm;
(ii) list the people who are exempted from fasting;
(iii) explain things that vitiate fasting.
EOF

# 10f_Hajj
cat > "$BASE_DIR/10_Ibadat/10f_Hajj/index.md" << 'EOF'
# 10f: Hajj (Pilgrimage)

## Topics:
(i) Its importance (Q.2:158 and 197) (Q.3:97) (Q.22:27-28)
(ii) Types (Ifrad, Qiran and Tamattu')
(iii) Essentials of Hajj (Arkan al-Hajj)
(iv) Conditions for the performance of Hajj
(v) Differences between Hajj and Umrah

## Learning Objectives:
Candidates should be able to:
(i) examine the importance of Hajj;
(ii) differentiate between the types of Hajj;
(iii) explain the essentials of Hajj;
(iv) evaluate the conditions for performance of Hajj;
(v) differentiate between Hajj and Umrah.
EOF

# 10g_Jihad
cat > "$BASE_DIR/10_Ibadat/10g_Jihad/index.md" << 'EOF'
# 10g: Jihad

## Topics:
(i) Jihad: Concept, kinds, manner and Lessons (Q.2:190-193) (Q.22:39-40)

## Learning Objectives:
Candidates should be able to:
(i) examine the concepts of jihad and its types;
(ii) evaluate the manner of carrying out jihad and its lessons.
EOF

# Module 11: Family_Matters
mkdir -p "$BASE_DIR/11_Family_Matters"/{11a_Marriage,11b_Idrar,11c_Divorce,11d_Inheritance}

# Module 11 - Main index
cat > "$BASE_DIR/11_Family_Matters/index.md" << 'EOF'
# Module 11: Family Matters

This module covers marriage, divorce, and inheritance in Islam.

## Submodules:
- [11a_Marriage](./11a_Marriage/) - Marriage (Nikah)
- [11b_Idrar](./11b_Idrar/) - Ill-treatment of Wife
- [11c_Divorce](./11c_Divorce/) - Divorce (Talaq)
- [11d_Inheritance](./11d_Inheritance/) - Inheritance (Miras)
EOF

# 11a_Marriage
cat > "$BASE_DIR/11_Family_Matters/11a_Marriage/index.md" << 'EOF'
# 11a: Marriage (Nikah)

## Topics:
(i) Importance (Q.16:72) (Q.24:32) (Q.30:20-21)
(ii) Prohibited categories (Q.2:221) (Q.4:22-24)
(iii) Conditions for its validity (Q.4:4) (Q.4:24-25)
(iv) Rights and duties of husbands and wives (Q.4:34-35) (Q.20:132) (Q.65:6-7)
(v) Polygamy (Q.4:3 and 129)

## Learning Objectives:
Candidates should be able to:
(i) analyse the importance of marriage;
(ii) list the category of women prohibited to a man to marry;
(iii) examine the conditions for validity of marriage;
(iv) explain the rights and duties of the spouse;
(v) evaluate polygamy and its significance.
EOF

# 11b_Idrar
cat > "$BASE_DIR/11_Family_Matters/11b_Idrar/index.md" << 'EOF'
# 11b: Ill-treatment of Wife (Idrar)

## Topics:
(i) Idrar ill-treatment of wife (Q.65:1-3)

## Learning Objectives:
Candidates should be able to:
(i) examine the ill-treatment of wife in marriage.
EOF

# 11c_Divorce
cat > "$BASE_DIR/11_Family_Matters/11c_Divorce/index.md" << 'EOF'
# 11c: Divorce (Talaq)

## Topics:
(i) Attitude of Islam to divorce (Q.2:228) (Q.4:34-35) Hadith "of all things lawful … most hateful to Allah." (Abu Daud 15:3)
(ii) Kinds (Talaq, Khul', Faskh, Mubara'ah and Li'an) (Q.2:229-230) (Q.24:6-9)
(iii) Iddah, kinds, duration and importance (Q.2:228 and 234)
(iv) Prohibited forms of dissolution of marriage (Ila and Zihar) (Q.2:226-227) (Q.58:2-4)
(v) Custody of children (Hadanah)

## Learning Objectives:
Candidates should be able to:
(i) analyse the attitude of Islam to divorce;
(ii) examine the different kinds of divorce;
(iii) differentiate between the various kinds of iddah;
(iv) analyse its duration and significance;
(v) explain the prohibited forms of ending marriage;
(vi) examine who has the right to custody of children.
EOF

# 11d_Inheritance
cat > "$BASE_DIR/11_Family_Matters/11d_Inheritance/index.md" << 'EOF'
# 11d: Inheritance (Miras)

## Topics:
(i) Its importance
(ii) Heirs and their shares (Q.4:7-8, 11-12 and 176)

## Learning Objectives:
Candidates should be able to:
(i) evaluate the significance of inheritance;
(ii) identify the categories of the Qur'anic heirs;
(iii) explain the share of each heir.
EOF

# Module 12: Sources_Law
mkdir -p "$BASE_DIR/12_Sources_Law"
cat > "$BASE_DIR/12_Sources_Law/index.md" << 'EOF'
# Module 12: Sources and Schools of Law

## Topics:
(i) The four major sources (the Qur'an, Sunnah, Ijma' and Qiyas)
(ii) The four Sunni Schools of law and their founders:
    - Hanafi (Imam Abu Hanifa)
    - Maliki (Imam Malik)
    - Shafi'i (Imam Al-Shafi'i)
    - Hanbali (Imam Ahmad ibn Hanbal)

## Learning Objectives:
Candidates should be able to:
(i) analyse the four major sources of Islamic law;
(ii) examine the biography of the founders of sunni schools of law;
(iii) examine contributions of the founders of the sunni school of law.
EOF

# Module 13: Economic_System
mkdir -p "$BASE_DIR/13_Economic_System"
cat > "$BASE_DIR/13_Economic_System/index.md" << 'EOF'
# Module 13: Islamic Economic System

## Topics:
(i) Islamic attitude to Riba (Q.2:275-280) (Q.3:130) (Q.4:161) Hadith 6th of an-Nawawi
(ii) At-tatfif (Q.83:1-6)
(iii) Hoarding (ihtikar) (Q.9:34)
(iv) Islamic sources of revenue: Zakah, Jizyah, Kharaj and Ghanimah
(v) Baitul-mal as an institution of socio-economic welfare
(vi) Difference between the Islamic economic system and the Western economic system

## Learning Objectives:
Candidates should be able to:
(i) analyse Islamic attitude to Riba;
(ii) relate at-tatfif and its negative consequences;
(iii) examine ihtikar and its implications on society;
(iv) identify the sources of revenue in Islam;
(v) evaluate the disbursement of the revenue;
(vi) explain the uses of baitul-mal in the Ummah;
(vii) differentiate between the Islamic and Western economic systems.
EOF

# Module 14: Political_System
mkdir -p "$BASE_DIR/14_Political_System"
cat > "$BASE_DIR/14_Political_System/index.md" << 'EOF'
# Module 14: Islamic Political System

## Topics:
(i) Allah as the Sovereign (Q.3:26-27)
(ii) The concept of Shurah (consultation) (Q.3:159) (Q.42:38)
(iii) The concept of Adalah (justice) (Q.5:9) (Q.4:58 and 135) and Mas'uliyah (accountability) (Q.17:36) (Q.102:8)
(iv) The rights of non-Muslims in an Islamic state (Q.2:256) (Q.6:108)
(v) Differences between the Islamic political system and the Western political system

## Learning Objectives:
Candidates should be able to:
(i) analyse the concept of Allah's sovereignty;
(ii) examine the concept of shurah in Islam;
(iii) evaluate the concept of justice and accountability;
(iv) examine the rights of non-Muslims in an Islamic state;
(v) differentiate between the Islamic and Western political systems.
EOF

# Module 15: Pre_Islamic_Arabia
mkdir -p "$BASE_DIR/15_Pre_Islamic_Arabia"
cat > "$BASE_DIR/15_Pre_Islamic_Arabia/index.md" << 'EOF'
# Module 15: Pre-Islamic Arabia (Jahiliyyah)

## Topics:
(i) Jahiliyyah practices: idol worship, infanticide, polyandry, gambling, usury, etc.
(ii) Islamic reforms

## Learning Objectives:
Candidates should be able to:
(i) distinguish the different types of practices common to the Arabs of al-Jahiliyyah;
(ii) trace the reforms brought about by Islam to the Jahiliyyah practices.
EOF

# Module 16: Life_Prophet
mkdir -p "$BASE_DIR/16_Life_Prophet"/{16a_Birth_Early_Life,16b_Call_Prophethood,16c_Dawah,16d_Hijrah,16e_Administration,16f_Battles,16g_Hudaibiyyah,16h_Farewell,16i_Qualities}

# Module 16 - Main index
cat > "$BASE_DIR/16_Life_Prophet/index.md" << 'EOF'
# Module 16: The Life of Prophet Muhammad (SAW)

This module covers the complete seerah of Prophet Muhammad (SAW).

## Submodules:
- [16a_Birth_Early_Life](./16a_Birth_Early_Life/) - Birth and Early Life
- [16b_Call_Prophethood](./16b_Call_Prophethood/) - Call to Prophethood
- [16c_Dawah](./16c_Dawah/) - Da'wah in Makkah and Madinah
- [16d_Hijrah](./16d_Hijrah/) - The Hijrah
- [16e_Administration](./16e_Administration/) - Administration of Ummah in Madinah
- [16f_Battles](./16f_Battles/) - Battles of Badr, Uhud and Khandaq
- [16g_Hudaibiyyah](./16g_Hudaibiyyah/) - Treaty of Hudaibiyyah and Conquest of Makkah
- [16h_Farewell](./16h_Farewell/) - Hijjatul-wada (Farewell Pilgrimage)
- [16i_Qualities](./16i_Qualities/) - Qualities of Muhammad (SAW)
EOF

# 16a_Birth_Early_Life
cat > "$BASE_DIR/16_Life_Prophet/16a_Birth_Early_Life/index.md" << 'EOF'
# 16a: Birth and Early Life of Prophet Muhammad (SAW)

## Topics:
(i) His birth and early life

## Learning Objectives:
Candidates should be able to:
(i) account for the birth and early life of the Prophet Muhammad (SAW).
EOF

# 16b_Call_Prophethood
cat > "$BASE_DIR/16_Life_Prophet/16b_Call_Prophethood/index.md" << 'EOF'
# 16b: Call to Prophethood

## Topics:
(i) His call to Prophethood

## Learning Objectives:
Candidates should be able to:
(i) provide evidence for the call of Muhammad (SAW) to Prophethood.
EOF

# 16c_Dawah
cat > "$BASE_DIR/16_Life_Prophet/16c_Dawah/index.md" << 'EOF'
# 16c: Da'wah in Makkah and Madinah

## Topics:
(i) His Da'wah in Makkah and Madinah

## Learning Objectives:
Candidates should be able to:
(i) analyse the Da'wah activities of the Prophet Muhammad (SAW) in Makkah and Madinah.
EOF

# 16d_Hijrah
cat > "$BASE_DIR/16_Life_Prophet/16d_Hijrah/index.md" << 'EOF'
# 16d: The Hijrah

## Topics:
(i) The Hijrah

## Learning Objectives:
Candidates should be able to:
(i) account for the Hijrah of the Prophet Muhammad (SAW) from Makkah to Madinah.
EOF

# 16e_Administration
cat > "$BASE_DIR/16_Life_Prophet/16e_Administration/index.md" << 'EOF'
# 16e: Administration of the Ummah in Madinah

## Topics:
(i) His administration of the Ummah in Madinah

## Learning Objectives:
Candidates should be able to:
(i) analyse the administration of the Muslim Ummah in Madinah.
EOF

# 16f_Battles
cat > "$BASE_DIR/16_Life_Prophet/16f_Battles/index.md" << 'EOF'
# 16f: Battles of Badr, Uhud and Khandaq

## Topics:
(i) The battles of Badr, Uhud and Khandaq: causes and effects

## Learning Objectives:
Candidates should be able to:
(i) account for the causes and effects of the battles of Badr, Uhud and Khandaq.
EOF

# 16g_Hudaibiyyah
cat > "$BASE_DIR/16_Life_Prophet/16g_Hudaibiyyah/index.md" << 'EOF'
# 16g: Treaty of Hudaibiyyah and Conquest of Makkah

## Topics:
(i) The Treaty of al-Hudaibiyyah and the conquest of Makkah

## Learning Objectives:
Candidates should be able to:
(i) trace the circumstances leading to the formulation of the Treaty of Hudaibiyyah;
(ii) account for the Conquest of Makkah.
EOF

# 16h_Farewell
cat > "$BASE_DIR/16_Life_Prophet/16h_Farewell/index.md" << 'EOF'
# 16h: Hijjatul-wada (Farewell Pilgrimage)

## Topics:
(i) Hijjatul-wada (the farewell pilgrimage) sermon, and lessons

## Learning Objectives:
Candidates should be able to:
(i) examine the farewell pilgrimage of the Prophet and its lessons.
EOF

# 16i_Qualities
cat > "$BASE_DIR/16_Life_Prophet/16i_Qualities/index.md" << 'EOF'
# 16i: Qualities of Muhammad (SAW)

## Topics:
(i) Qualities of Muhammad (SAW) and lessons learnt from them

## Learning Objectives:
Candidates should be able to:
(i) analyse the qualities of Muhammad (SAW) and their relevance to the life of a Muslim.
EOF

# Module 17: Rightly_Guided_Caliphs
mkdir -p "$BASE_DIR/17_Rightly_Guided_Caliphs"
cat > "$BASE_DIR/17_Rightly_Guided_Caliphs/index.md" << 'EOF'
# Module 17: The Rightly Guided Caliphs (al-Khulafa'ur Rashidun)

## Topics:
(i) The lives and contributions of the four Rightly Guided Caliphs:
    - Abu Bakr as-Siddiq
    - Umar ibn al-Khattab
    - Uthman ibn Affan
    - Ali ibn Abi Talib

## Learning Objectives:
Candidates should be able to:
(i) trace the biographies of the four Rightly Guided Caliphs;
(ii) evaluate their contributions to the development of Islam.
EOF

# Module 18: Islam_Africa
mkdir -p "$BASE_DIR/18_Islam_Africa"
cat > "$BASE_DIR/18_Islam_Africa/index.md" << 'EOF'
# Module 18: Early Contact of Islam with Africa

## Topics:
(i) Hijrah to Abyssinia
(ii) The spread of Islam to Egypt
(iii) The role of traders, teachers, preachers, Murabitun, Sufi orders and Mujaddidun in the spread of Islam in West Africa

## Learning Objectives:
Candidates should be able to:
(i) evaluate the circumstances leading to the Hijrah to Abyssinia;
(ii) give reasons for the spread of Islam in Egypt;
(iii) account for the roles of traders, teachers, preachers, Murabitun, Sufi orders and Mujaddidun in the spread of Islam in West Africa.
EOF

# Module 19: Impact_West_Africa
mkdir -p "$BASE_DIR/19_Impact_West_Africa"
cat > "$BASE_DIR/19_Impact_West_Africa/index.md" << 'EOF'
# Module 19: The Impact of Islam in West Africa

## Topics:
(i) The influence of Islam on the socio-political life of some West African Empires: Ghana, Mali, Songhai and Borno
(ii) The impact of Islam on the economic life of some West African states: Timbuktu, Kano and Borno

## Learning Objectives:
Candidates should be able to:
(i) analyse the influence of Islam on the socio-political system of some West African States;
(ii) evaluate the impact of Islam on the economic life of Timbuktu, Kano and Borno.
EOF

# Module 20: Education
mkdir -p "$BASE_DIR/20_Education"/{20a_Aims_Objectives,20b_Quran_Hadith_Education,20c_West_Africa,20d_Scholars,20e_Institutions,20f_Great_Scholars}

# Module 20 - Main index
cat > "$BASE_DIR/20_Education/index.md" << 'EOF'
# Module 20: Contributions of Islam to Education

This module covers Islamic contributions to education throughout history.

## Submodules:
- [20a_Aims_Objectives](./20a_Aims_Objectives/) - Aims and Objectives of Islamic Education
- [20b_Quran_Hadith_Education](./20b_Quran_Hadith_Education/) - Qur'an and Hadith on Education
- [20c_West_Africa](./20c_West_Africa/) - Intellectual Activities in West Africa
- [20d_Scholars](./20d_Scholars/) - Contributions of Notable Scholars
- [20e_Institutions](./20e_Institutions/) - Islamic Education Institutions
- [20f_Great_Scholars](./20f_Great_Scholars/) - Lives and Contributions of Great Scholars
EOF

# 20a_Aims_Objectives
cat > "$BASE_DIR/20_Education/20a_Aims_Objectives/index.md" << 'EOF'
# 20a: Aims and Objectives of Islamic Education

## Topics:
(i) The aims and objectives of Islamic Education

## Learning Objectives:
Candidates should be able to:
(i) explain the aims and objectives of Islamic Education.
EOF

# 20b_Quran_Hadith_Education
cat > "$BASE_DIR/20_Education/20b_Quran_Hadith_Education/index.md" << 'EOF'
# 20b: The Glorious Qur'an and Hadith on Education

## Topics:
(i) The Glorious Qur'an and Hadith on Education (Q.96:1-5) (Q.39:9)
(ii) "The search for knowledge is obligatory on every Muslim" (Ibn Majah)
(iii) "Seek knowledge from the cradle to the grave"
(iv) "The words of wisdom are a lost property of the believer … a better right to it…" (Tirmidhi)

## Learning Objectives:
Candidates should be able to:
(i) assess the position of the Glorious Qur'an and Hadith in education;
(ii) examine the importance of seeking knowledge in Islam.
EOF

# 20c_West_Africa
cat > "$BASE_DIR/20_Education/20c_West_Africa/index.md" << 'EOF'
# 20c: Intellectual Activities of Islam in West Africa

## Topics:
(i) Intellectual activities of Islam in West Africa (development of written history in Arabic and the establishment of Sankore University)

## Learning Objectives:
Candidates should be able to:
(i) analyse the intellectual activities of Islam in West Africa.
EOF

# 20d_Scholars
cat > "$BASE_DIR/20_Education/20d_Scholars/index.md" << 'EOF'
# 20d: Contributions of Notable Scholars

## Topics:
(i) Intellectual activities of Ahmad Baba of Timbuktu, Sheikh al-Maghili, Sheikh Usman Danfodio, Sultan Muhammad Bello and Ibn Battuta

## Learning Objectives:
Candidates should be able to:
(i) assess the contributions of Sheikh al-Maghili, Sheikh Uthman Dan Fodio, Sultan Muhammad Bello and Ibn Battuta to education.
EOF

# 20e_Institutions
cat > "$BASE_DIR/20_Education/20e_Institutions/index.md" << 'EOF'
# 20e: Islamic Education Institutions

## Topics:
(i) Islamic Education Institutions: House of Wisdom in Baghdad, al-Azhar University in Cairo and Nizamiyyah University in Baghdad

## Learning Objectives:
Candidates should be able to:
(i) account for the development of intellectual centres in Baghdad and Cairo.
EOF

# 20f_Great_Scholars
cat > "$BASE_DIR/20_Education/20f_Great_Scholars/index.md" << 'EOF'
# 20f: Lives and Contributions of Great Scholars

## Topics:
(i) The lives and contributions of Ibn Sina, Al-Ghazali, Ibn Rushd, ar-Razi and Ibn Khaldun to education

## Learning Objectives:
Candidates should be able to:
(i) examine the contributions of Ibn Sina to the development of Medicine;
(ii) assess al-Ghazali's contribution to Islamic education;
(iii) analyse Ibn Rushd's contribution to philosophy and fiqh;
(iv) assess ar-Razi's contribution to philosophy;
(v) analyse Ibn Khaldun's contribution to modern sociology and method of writing history.
EOF

echo ""
echo "======================================================"
echo "✅ SUCCESS! Created complete Islamic Studies module structure!"
echo "📁 Location: $(pwd)/$BASE_DIR"
echo ""
echo "Summary:"
echo "- 20 Main Modules"
echo "- 83 Subfolders"
echo "- 103 Total Folders"
echo ""
echo "Main modules created:"
ls -1 "$BASE_DIR" | grep "^[0-9]" | while read folder; do
    subcount=$(find "$BASE_DIR/$folder" -maxdepth 1 -type d | grep -v "^$BASE_DIR/$folder$" | wc -l)
    printf "  📁 %-25s - %2d subfolders\n" "$folder" "$subcount"
done
echo ""
echo "Each folder contains index.md files with complete syllabus topics and objectives."

# Make the script executable
chmod +x "$0"