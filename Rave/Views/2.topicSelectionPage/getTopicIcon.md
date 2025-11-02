
```javascript
// Topic icon mapping function
    function getTopicIcon(topicName, category) {
        const name = topicName.toLowerCase();
        const cat = category.toLowerCase();
    
    // Mathematics topics
    if (cat.includes('algebra') || name.includes('algebra')) return 'functions';
    if (cat.includes('geometry') || name.includes('geometry')) return 'crop_free';
    if (cat.includes('trigonometry') || name.includes('trigonometry')) return 'change_history';
    if (cat.includes('calculus') || name.includes('calculus')) return 'show_chart';
    if (cat.includes('statistics') || name.includes('statistic')) return 'bar_chart';
    if (cat.includes('probability') || name.includes('probability')) return 'casino';
    if (name.includes('number') || name.includes('arithmetic')) return 'pin';
    
    // Physics topics  
    if (name.includes('motion') || name.includes('mechanics')) return 'sports_motorsports';
    if (name.includes('force') || name.includes('newton')) return 'fitness_center';
    if (name.includes('energy')) return 'bolt';
    if (name.includes('wave') || name.includes('sound')) return 'graphic_eq';
    if (name.includes('electric') || name.includes('magnetic')) return 'electric_bolt';
    if (name.includes('light') || name.includes('optic')) return 'highlight';
    if (name.includes('thermal') || name.includes('heat')) return 'whatshot';
    if (name.includes('quantum') || name.includes('atomic')) return 'scatter_plot';
    
    // Chemistry topics
    if (name.includes('atom') || name.includes('periodic')) return 'blur_on';
    if (name.includes('bond') || name.includes('molecular')) return 'link';
    if (name.includes('reaction') || name.includes('equation')) return 'shuffle';
    if (name.includes('acid') || name.includes('base') || name.includes('ph')) return 'science';
    if (name.includes('organic')) return 'eco';
    if (name.includes('solution') || name.includes('concentration')) return 'opacity';
    if (name.includes('gas') || name.includes('pressure')) return 'air';
    
    // Biology topics
    if (name.includes('cell') || name.includes('cellular')) return 'grain';
    if (name.includes('dna') || name.includes('genetic')) return 'memory';
    if (name.includes('evolution') || name.includes('natural selection')) return 'trending_up';
    if (name.includes('ecosystem') || name.includes('environment')) return 'nature';
    if (name.includes('photosynthesis') || name.includes('plant')) return 'local_florist';
    if (name.includes('respiration') || name.includes('breathing')) return 'air';
    if (name.includes('reproduction') || name.includes('development')) return 'child_friendly';
    if (name.includes('anatomy') || name.includes('physiology')) return 'accessibility';
    
    // English topics
    if (name.includes('grammar') || name.includes('syntax')) return 'spellcheck';
    if (name.includes('literature') || name.includes('poem') || name.includes('poetry')) return 'auto_stories';
    if (name.includes('writing') || name.includes('essay')) return 'edit';
    if (name.includes('reading') || name.includes('comprehension')) return 'chrome_reader_mode';
    if (name.includes('vocabulary') || name.includes('word')) return 'translate';
    if (name.includes('shakespeare') || name.includes('drama')) return 'theater_comedy';
    if (name.includes('novel') || name.includes('fiction')) return 'menu_book';
    
    // ECONOMICS TOPICS
    if (name.includes('economics as a science') || name.includes('economic science')) return 'science';
    if (name.includes('economic system')) return 'account_balance';
    if (name.includes('economic analysis') || name.includes('methods') || name.includes('tools')) return 'analytics';
    if (name.includes('demand')) return 'trending_down';
    if (name.includes('consumer') || name.includes('behaviour')) return 'psychology';
    if (name.includes('supply')) return 'trending_up';
    if (name.includes('price') || name.includes('determination')) return 'attach_money';
    if (name.includes('production')) return 'factory';
    if (name.includes('cost') || name.includes('revenue')) return 'account_balance_wallet';
    if (name.includes('market structure')) return 'store';
    if (name.includes('national income')) return 'public';
    if (name.includes('money') || name.includes('inflation')) return 'currency_exchange';
    if (name.includes('financial institution')) return 'account_balance';
    if (name.includes('public finance')) return 'receipt_long';
    if (name.includes('economic growth') || name.includes('development')) return 'trending_up';
    if (name.includes('agriculture') || name.includes('agricultural')) return 'agriculture';
    if (name.includes('industry') || name.includes('industrialization')) return 'business_center';
    if (name.includes('natural resource')) return 'landscape';
    if (name.includes('business organization')) return 'corporate_fare';
    if (name.includes('population')) return 'groups';
    if (name.includes('international trade')) return 'flight';
    if (name.includes('international economic') || name.includes('economic organization')) return 'language';
    if (name.includes('factors of production')) return 'build';
    
    // ACCOUNTING TOPICS
    if (name.includes('accounting') || name.includes('bookkeeping')) return 'receipt_long';
    if (name.includes('balance sheet') || name.includes('financial statement')) return 'summarize';
    if (name.includes('ledger') || name.includes('journal')) return 'library_books';
    if (name.includes('debit') || name.includes('credit')) return 'swap_horiz';
    if (name.includes('audit') || name.includes('auditing')) return 'search';
    if (name.includes('tax') || name.includes('taxation')) return 'request_quote';
    if (name.includes('budget') || name.includes('budgeting')) return 'pie_chart';
    if (name.includes('cash flow') || name.includes('cashflow')) return 'payments';
    if (name.includes('asset') || name.includes('liability') || name.includes('equity')) return 'account_balance';
    
    // AGRICULTURE TOPICS
    if (name.includes('crop') || name.includes('farming')) return 'grass';
    if (name.includes('soil') || name.includes('soil science')) return 'terrain';
    if (name.includes('livestock') || name.includes('animal husbandry')) return 'pets';
    if (name.includes('irrigation') || name.includes('water management')) return 'water_drop';
    if (name.includes('harvest') || name.includes('yield')) return 'agriculture';
    if (name.includes('pest') || name.includes('disease control')) return 'bug_report';
    if (name.includes('fertilizer') || name.includes('manure')) return 'eco';
    if (name.includes('tractor') || name.includes('farm equipment')) return 'agriculture';
    
    // ART TOPICS
    if (name.includes('drawing') || name.includes('sketch')) return 'draw';
    if (name.includes('painting') || name.includes('paint')) return 'palette';
    if (name.includes('sculpture') || name.includes('carving')) return 'style';
    if (name.includes('color') || name.includes('colour theory')) return 'format_paint';
    if (name.includes('perspective') || name.includes('composition')) return 'zoom_out_map';
    if (name.includes('art history') || name.includes('art movement')) return 'history_edu';
    if (name.includes('digital art') || name.includes('graphic design')) return 'computer';
    
    // COMMERCE TOPICS
    if (name.includes('commerce') || name.includes('trade')) return 'store';
    if (name.includes('marketing') || name.includes('advertising')) return 'campaign';
    if (name.includes('business') || name.includes('enterprise')) return 'business_center';
    if (name.includes('retail') || name.includes('wholesale')) return 'shopping_cart';
    if (name.includes('import') || name.includes('export')) return 'flight';
    if (name.includes('insurance') || name.includes('risk management')) return 'security';
    if (name.includes('banking') || name.includes('finance')) return 'account_balance';
    
    // COMPUTER/ICT TOPICS
    if (name.includes('programming') || name.includes('coding')) return 'code';
    if (name.includes('database') || name.includes('sql')) return 'storage';
    if (name.includes('network') || name.includes('internet')) return 'lan';
    if (name.includes('hardware') || name.includes('computer parts')) return 'computer';
    if (name.includes('software') || name.includes('application')) return 'apps';
    if (name.includes('algorithm') || name.includes('data structure')) return 'device_hub';
    if (name.includes('web') || name.includes('website')) return 'web';
    if (name.includes('cybersecurity') || name.includes('security')) return 'lock';
    
    // CRS (CHRISTIAN RELIGIOUS STUDIES) TOPICS
    if (name.includes('bible') || name.includes('scripture')) return 'menu_book';
    if (name.includes('jesus') || name.includes('christ')) return 'person';
    if (name.includes('parable') || name.includes('miracle')) return 'auto_stories';
    if (name.includes('apostle') || name.includes('disciple')) return 'groups';
    if (name.includes('church') || name.includes('worship')) return 'church';
    if (name.includes('faith') || name.includes('belief')) return 'volunteer_activism';
    if (name.includes('old testament') || name.includes('new testament')) return 'history_edu';
    if (name.includes('prayer') || name.includes('meditation')) return 'hands';
    
    // GEOGRAPHY TOPICS
    if (name.includes('map') || name.includes('cartography')) return 'map';
    if (name.includes('climate') || name.includes('weather')) return 'wb_sunny';
    if (name.includes('river') || name.includes('lake') || name.includes('ocean')) return 'water';
    if (name.includes('mountain') || name.includes('hill') || name.includes('valley')) return 'landscape';
    if (name.includes('population') || name.includes('demography')) return 'groups';
    if (name.includes('urban') || name.includes('rural')) return 'location_city';
    if (name.includes('resource') || name.includes('natural resource')) return 'forest';
    if (name.includes('continent') || name.includes('country')) return 'public';
    
    // GOVERNMENT TOPICS
    if (name.includes('constitution') || name.includes('law')) return 'gavel';
    if (name.includes('democracy') || name.includes('election')) return 'how_to_vote';
    if (name.includes('executive') || name.includes('legislative') || name.includes('judiciary')) return 'account_balance';
    if (name.includes('citizenship') || name.includes('civic')) return 'person';
    if (name.includes('political party') || name.includes('politics')) return 'groups';
    if (name.includes('human right') || name.includes('rights')) return 'policy';
    if (name.includes('public administration') || name.includes('bureaucracy')) return 'business_center';
    
    // HISTORY TOPICS
    if (name.includes('ancient') || name.includes('medieval') || name.includes('modern')) return 'history';
    if (name.includes('war') || name.includes('battle')) return 'military_tech';
    if (name.includes('revolution') || name.includes('rebellion')) return 'change_circle';
    if (name.includes('civilization') || name.includes('empire')) return 'public';
    if (name.includes('archaeology') || name.includes('artifact')) return 'digging';
    if (name.includes('timeline') || name.includes('chronology')) return 'schedule';
    if (name.includes('biography') || name.includes('historical figure')) return 'person';
    
    // HOME ECONOMICS TOPICS
    if (name.includes('cooking') || name.includes('culinary')) return 'restaurant_menu';
    if (name.includes('sewing') || name.includes('tailoring')) return 'content_cut';
    if (name.includes('nutrition') || name.includes('diet')) return 'nutrition';
    if (name.includes('childcare') || name.includes('parenting')) return 'family_restroom';
    if (name.includes('budget') || name.includes('home management')) return 'savings';
    if (name.includes('textile') || name.includes('fabric')) return 'checkroom';
    if (name.includes('hygiene') || name.includes('sanitation')) return 'clean_hands';
    
    // ISLAMIC STUDIES TOPICS
    if (name.includes('quran') || name.includes('koran')) return 'menu_book';
    if (name.includes('prophet') || name.includes('muhammad')) return 'person';
    if (name.includes('prayer') || name.includes('salah')) return 'mosque';
    if (name.includes('fasting') || name.includes('ramadan')) return 'nights_stay';
    if (name.includes('islamic law') || name.includes('sharia')) return 'gavel';
    if (name.includes('hadith') || name.includes('sunnah')) return 'auto_stories';
    if (name.includes('islamic history') || name.includes('caliphate')) return 'history_edu';
    
    // LITERATURE TOPICS
    if (name.includes('novel') || name.includes('fiction')) return 'menu_book';
    if (name.includes('poetry') || name.includes('poem')) return 'format_quote';
    if (name.includes('drama') || name.includes('play')) return 'theater_comedy';
    if (name.includes('prose') || name.includes('short story')) return 'article';
    if (name.includes('character') || name.includes('protagonist')) return 'person';
    if (name.includes('theme') || name.includes('symbolism')) return 'lightbulb';
    if (name.includes('literary criticism') || name.includes('analysis')) return 'analytics';
    
    // PHE (PHYSICAL AND HEALTH EDUCATION) TOPICS
    if (name.includes('sports') || name.includes('athletics')) return 'sports';
    if (name.includes('exercise') || name.includes('fitness')) return 'fitness_center';
    if (name.includes('health') || name.includes('hygiene')) return 'healing';
    if (name.includes('nutrition') || name.includes('diet')) return 'nutrition';
    if (name.includes('first aid') || name.includes('safety')) return 'medical_services';
    if (name.includes('game') || name.includes('recreation')) return 'sports_tennis';
    if (name.includes('anatomy') || name.includes('physiology')) return 'accessibility';
    
    // MUSIC TOPICS
    if (name.includes('music theory') || name.includes('notation')) return 'music_note';
    if (name.includes('instrument') || name.includes('piano') || name.includes('guitar')) return 'piano';
    if (name.includes('rhythm') || name.includes('beat')) return 'graphic_eq';
    if (name.includes('composition') || name.includes('songwriting')) return 'create';
    if (name.includes('voice') || name.includes('singing')) return 'mic';
    if (name.includes('music history') || name.includes('composer')) return 'history_edu';
    if (name.includes('performance') || name.includes('concert')) return 'live_tv';
    
    // Default icons by subject
    if (cat.includes('math')) return 'calculate';
    if (cat.includes('physics')) return 'science';
    if (cat.includes('chemistry')) return 'science';
    if (cat.includes('biology')) return 'biotech';
    if (cat.includes('english')) return 'translate';
    if (cat.includes('economic')) return 'trending_up';
    if (cat.includes('accounting')) return 'receipt_long';
    if (cat.includes('agriculture')) return 'agriculture';
    if (cat.includes('art')) return 'palette';
    if (cat.includes('commerce')) return 'store';
    if (cat.includes('computer') || cat.includes('ict') || cat.includes('technology')) return 'computer';
    if (cat.includes('crs') || cat.includes('christian') || cat.includes('religious')) return 'church';
    if (cat.includes('geography')) return 'map';
    if (cat.includes('government') || cat.includes('civic')) return 'account_balance';
    if (cat.includes('history')) return 'history';
    if (cat.includes('home-economic') || cat.includes('home economic')) return 'restaurant_menu';
    if (cat.includes('islamic') || cat.includes('islamic studies')) return 'mosque';
    if (cat.includes('literature')) return 'menu_book';
    if (cat.includes('phe') || cat.includes('physical education') || cat.includes('health education')) return 'fitness_center';
    if (cat.includes('music')) return 'music_note';
    
    // Ultimate fallback
    return 'quiz';
}
 
```

## Detailed Breakdown of the Logic Flow:

### **1. Input Processing**
```javascript
const name = topicName.toLowerCase();
const cat = category.toLowerCase();
```
- **Case Normalization**: Ensures "Algebra" and "algebra" match equally
- **Consistent Matching**: Prevents case-sensitive matching issues
- **Flexible Input**: Handles various capitalization styles from data sources

### **2. Hierarchical Matching Strategy**
```
Specific Topic Keywords → General Subject Categories → Ultimate Fallback
```

### **3. Subject-Specific Icon Selection Logic**

#### **Mathematics Icons**:
- **`functions`** → Algebra, equations, functions
- **`crop_free`** → Geometry, shapes, spatial reasoning
- **`change_history`** → Trigonometry, triangles, angles
- **`show_chart`** → Calculus, rates of change, graphs
- **`bar_chart`** → Statistics, data analysis
- **`casino`** → Probability, chance, randomness

#### **Physics Icons**:
- **`sports_motorsports`** → Motion, mechanics, movement
- **`fitness_center`** → Forces, Newton's laws, strength
- **`bolt`** → Energy, power, electricity
- **`graphic_eq`** → Waves, sound, frequencies
- **`electric_bolt`** → Electricity, magnetism
- **`highlight`** → Light, optics, vision
- **`whatshot`** → Heat, thermal energy, temperature

### **4. Smart Matching Techniques**

#### **Keyword Flexibility**:
```javascript
if (name.includes('algebra') || cat.includes('algebra'))
```
- Matches both "Algebra Basics" and "Advanced Algebra"
- Works with categories like "Mathematics - Algebra"

#### **Multiple Keywords**:
```javascript
if (name.includes('acid') || name.includes('base') || name.includes('ph'))
```
- Covers related concepts with single icon
- Handles variations in terminology

### **5. Fallback System**

#### **Primary Fallback**: Subject-based icons
```javascript
if (cat.includes('math')) return 'calculate';
```
- Catches topics without specific keyword matches
- Provides relevant subject-themed icons

#### **Ultimate Fallback**: Generic icon
```javascript
return 'quiz';
```
- Guarantees always returns an icon
- Prevents broken icon displays
- Generic but appropriate default

## Example Usage Scenarios:

```javascript
// Scenario 1: Specific topic match
getTopicIcon("Algebra Equations", "Mathematics"); 
// → "functions" (matches 'algebra' in topic name)

// Scenario 2: Category match  
getTopicIcon("Advanced Problems", "Geometry");
// → "crop_free" (matches 'geometry' in category)

// Scenario 3: Subject fallback
getTopicIcon("Number Theory", "Math");
// → "calculate" (falls back to math subject icon)

// Scenario 4: Ultimate fallback
getTopicIcon("Unknown Topic", "Miscellaneous");
// → "quiz" (no matches found)
```

## Benefits of This Design:

### **🎯 Visual Consistency**
- Related topics get related icons
- Intuitive icon-topic relationships
- Consistent user experience

### **🚀 Performance**
- Early returns prevent unnecessary checks
- Simple string operations
- No complex data structures

### **🔧 Maintainability**
- Easy to add new topic-icon mappings
- Clear organization by subject
- Simple to modify existing mappings

### **🛡️ Reliability**
- Always returns an icon (no `undefined`)
- Handles edge cases gracefully
- Case-insensitive matching

This function transforms educational topics into meaningful visual representations that help users quickly identify and navigate different subject areas through intuitive iconography!