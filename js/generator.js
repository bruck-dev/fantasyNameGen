function randomItem(items)
{
    console.log(items);
    return items[Math.floor(Math.random()*items.length)];
}

function getNamelist(namelist)
{
    let file;
    switch(namelist)
    {
        // Human Lists
        case 'Western':
            file = 'assets/namelists/human/western.json';
            break;
        case 'Eastern':
            file = 'assets/namelists/human/eastern.json';
            break;
        case 'Northern':
            file = 'assets/namelists/human/northern.json';
            break;
        
        // Elf Lists
        case 'High Elf':
            file = 'assets/namelists/elf/highElf.json';
            break;
        case 'Wood Elf':
            file = 'assets/namelists/elf/woodElf.json';
            break;
        case 'Dark Elf':
            file = 'assets/namelists/elf/darkElf.json';
            break;
        case 'Drow':
            file = 'assets/namelists/elf/drow.json';
            break;
        
        // Dwarf Lists
        case 'Dwarf':
            file = 'assets/namelists/dwarf/dwarf.json';
            break;
            
        // Halfling Lists
        case 'Halfling':
            file = 'assets/namelists/halfling/halfling.json';
            break;
            
        // Tiefling Lists
        case 'Infernal':
            file = 'assets/namelists/tiefling/infernal.json';
            break;
        case 'Virtue':
            file = 'assets/namelists/tiefling/virtue.json';
            break;
            
        // Orc Lists
        case 'Orc':
            file = 'assets/namelists/orc/orc.json';
            break;
        
        // Epithet Lists
        case 'Suffixes':
            file = 'assets/namelists/shared/epithets/suffixes.json';
            break;
        case 'Nicknames':
            file = 'assets/namelists/shared/epithets/nicknames.json';
            break;
        case 'Animals':
            file = 'assets/namelists/shared/epithets/animals.json';
            break;
        case 'Sobriquets':
            file = 'assets/namelists/shared/epithets/sobriquets.json';
            break;
            
        // Title Lists
        case 'Nobility':
            file = 'assets/namelists/shared/titles/noble.json';
            break;
        case 'Military':
            file = 'assets/namelists/shared/titles/military.json';
            break;
        case 'Religious':
            file = 'assets/namelists/shared/titles/religious.json';
            break;
        case 'Occupation':
            file = 'assets/namelists/shared/titles/occupation.json';
            break;
    }
    let namelistJson = fetch(file)
    .then(response => response.json())
    return namelistJson;
}

function generateName(namelist=null, gender=null, surname=false, epithet=null, title=null)
{
    let generatedName = '';

    // Pick a title
    if(title)
    {
        data = getNamelist(titleType);
        let combined = [];
        let male = data['male'];
        let fem = data['female'];
        let neu = data['neutral'];

        switch(gender)
        {
            case 'Male':
                combined = male.concat(neu);
                generatedName.concat(randomItem(combined))
                break;
            case 'Female':
                combined = fem.concat(neu);
                generatedName.concat(randomItem(combined))
                break;
            case 'Neutral':
                generatedName.concat(randomItem(neu));
                break;
        }
    }

    // Pick a given name and surname if enabled
    if(namelist)
    {
        data = getNamelist(namelist);
        console.log(data);
        let male = data['male'];
        let fem = data['female'];
        let neu = data['neutral'];
        let sur = data['surname'];

        switch(gender)
        {
            case 'Male':
                generatedName.concat(' ', randomItem(male));
                if(surname)
                {
                    generatedName.concat(' ', randomItem(sur));
                }
                break;
            case 'Female':
                console.log(data['female']);
                generatedName.concat(' ', randomItem(fem));
                if(surname)
                {
                    let pickedSur = randomItem(sur);
                    if(namelist == 'Northern') // Nordic and Slavic names used to be patronymic, so this adds the 'daughter of' variant. Keeps the leading 's' for possessive.
                    {
                        if(pickedSur.endswith('ssen') || pickedSur.endswith('sson'))
                        {
                            pickedSur = pickedSur.slice(0, -3);
                        }
                        else if(pickedSur.endswith('sen') || pickedSur.endswith('son'))
                        {
                            pickedSur = pickedSur.slice(0, -2);
                        }
                        else if(pickedSur.endswith('ov'))
                        {
                            pickedSur.concat('a');
                        }
                    } 
                    generatedName.concat(' ', pickedSur);
                }
                break;
            case 'Neutral':
                generatedName.concat(' ', randomItem(neu));
                if(surname)
                {
                    generatedName.concat(' ', randomItem(sur));
                }
                break;
        }
    }

    // Pick an epithet if enabled
    if(epithet)
    {
        data = getNamelist(epithet);
        let male = data['male'];
        let fem = data['female'];
        let neu = data['neutral'];

        switch(gender)
        {
            case 'Male':
                combined = male.concat(neu);
                generatedName.concat(' ', randomItem(combined))
                break;
            case 'Female':
                combined = fem.concat(neu);
                generatedName.concat(' ', randomItem(combined))
                break;
            case 'Neutral':
                generatedName.concat(' ', randomItem(neu))
                break;
        }
    }
    return generatedName;
}