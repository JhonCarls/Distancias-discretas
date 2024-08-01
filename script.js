// Nodo del árbol BK
class BKTreeNode {
    constructor(word) {
        this.word = word;
        this.children = {};
    }
}

// Árbol BK
class BKTree {
    constructor() {
        this.root = null;
    }

    // Función para calcular la distancia de Levenshtein entre dos palabras
    levenshteinDistance(a, b) {
        const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));

        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,    // Deletion
                    dp[i][j - 1] + 1,    // Insertion
                    dp[i - 1][j - 1] + cost // Substitution
                );
            }
        }

        return dp[a.length][b.length];
    }

    // Insertar una palabra en el árbol BK
    insert(word) {
        if (this.root === null) {
            this.root = new BKTreeNode(word);
        } else {
            this._insert(this.root, word);
        }
    }

    _insert(node, word) {
        const distance = this.levenshteinDistance(node.word, word);
        if (node.children[distance] === undefined) {
            node.children[distance] = new BKTreeNode(word);
        } else {
            this._insert(node.children[distance], word);
        }
    }

    // Buscar palabras similares
    search(word, maxDistance) {
        const results = [];
        if (this.root) {
            this._search(this.root, word, maxDistance, results);
        }
        return results;
    }

    _search(node, word, maxDistance, results) {
        const distance = this.levenshteinDistance(node.word, word);
        if (distance <= maxDistance) {
            const similarity = 100 - (distance / Math.max(node.word.length, word.length) * 100);
            if (similarity >= 20) {  // Filtrar resultados con similitud menor al 20%
                results.push({ word: node.word, similarity: similarity.toFixed(2) });
            }
        }

        for (let i = Math.max(1, distance - maxDistance); i <= distance + maxDistance; i++) {
            if (node.children[i] !== undefined) {
                this._search(node.children[i], word, maxDistance, results);
            }
        }
    }
}

// Inicializar el árbol BK y añadir palabras
const bkTree = new BKTree();
const usernames = ["user1", "user2", "admin", "test", "guest", "john", "jane","LunaEstelar", "ViajeroMistico", "EcoSombra", "LluviaDeIdeas", "DragonDorado", "LuzDeLuna", "VientoDelNorte", "SirenaDeFuego", "CazadorDeSueños", "GuardianDelBosque", "EcoDeLasMontanas", "NaveganteEstelar", "OjoDeHalcon", "TempestadAzul", "GuerreroDeLuz", "DestelloSolar", "AventuraSinFin", "EspirituLibre", "MarDeTranquilidad", "EstrellaFugaz", "CorazonValiente", "ExploradorUrbano", "SombraSilenciosa", "MisterioNocturno", "FenixRenacido", "NieblaMistica", "GuardianDelTiempo", "RayoCruzado", "OceanoProfundo", "VientoSusurrante", "CentinelaEstelar", "SombrasEnElBosque", "LuceroDelAlba", "DragonaBlanca", "GuiaEtereo", "MareaAlta", "SenderoOculto", "AmanecerEscarlata", "FuerzaVital", "CieloInfinito", "CaballeroSombrio", "EstrellaDelNorte", "ResplandorEterno", "LuzEnLaOscuridad", "RastroDeEstrellas", "GuerreroDeLosCielos", "EstrellaCazadora", "EcoDelSilencio", "NaveganteDelTiempo", "GuardianDeLosSueños", "SombraDelPasado", "LuzInterior", "CaminanteNocturno", "SusurroDelViento", "AmanecerRadiante", "GuerreroDelAmanecer", "EstrellaMistica", "NaveganteDeLasEstrellas", "EcoDeLosRecuerdos", "LuzDelAlba", "EspirituDeLaLluvia", "AventureroSinFronteras", "CentinelaDelAmanecer", "SombrasDelFuturo", "DragonaDeFuego", "GuardianDeLasSombras", "SenderoDeLuz", "CaballeroDeLosCielos", "LuzDeEstrellas", "GuiaDelOceano", "ExploradorDeLasNubes", "SombrasDelAnochecer", "NieblaDelAmanecer", "GuardianDelCielo", "EcoDelMar", "GuerreroDeLosSueños", "NaveganteDeLasSombras", "EstrellaDeLaTarde", "SusurroDelAmanecer", "FenixDeCristal", "SombrasDeLaLuz", "EspirituDelBosque", "NieblaDeLasMontañas", "EcoDelOceano", "GuiaDelTiempo", "EstrellaDelSur", "ResplandorDeFuego", "LuzDeLosRecuerdos", "CaminanteDelViento", "AmanecerPlateado", "GuerreroDelCrepusculo", "NaveganteDelAire", "LuzDelMediodia", "SusurroDeEstrellas", "AventureroDeLasNubes", "SombrasDelAire", "DragonDelOceano", "CentinelaDelAnochecer", "EcoDeLasNubes", "GuerreroDelViento", "EstrellaDeCristal", "NieblaDelValle",
    "JuanPerez", "MariaLopez", "CarlosSanchez", "AnaMartinez", "LuisGomez", "CarmenDiaz", "JorgeFernandez", "LauraHernandez", "AntonioGarcia", "ElenaGonzalez", "PedroRodriguez", "LuciaRamirez", "MiguelMartinez", "SofiaTorres", "RamonCruz", "AdrianaMendoza", "VictorRomero", "ClaudiaJimenez", "RicardoMorales", "PaulaOrtega", "EduardoOrtiz", "AngelaRuiz", "RobertoGutierrez", "ValeriaHerrera", "DiegoNavarro", "MarianaVargas", "HugoRamos", "GabrielaReyes", "AlbertoCastillo", "VeronicaFlores", "EmilioVega", "LorenaChavez", "PabloMedina", "IsabelMolina", "RafaelSilva", "PatriciaSuarez", "FranciscoMartinez", "MonicaFigueroa", "AndresCastro", "CristinaCortes", "JulianLozano", "DanielaRojas", "SantiagoGonzalez", "TeresaIglesias", "AlejandroGuzman", "SandraAvila", "OscarMontes", "RaquelGomez", "EnriqueLeon", "VictoriaBravo", "FernandoRuiz", "LilianaLuna", "GuillermoHernandez", "BeatrizCordero", "ManuelGalindo", "ClaraBlanco", "JesusMuñoz", "AlejandraRivas", "IvanCampos", "NuriaMarin", "AngelSerrano", "RosaAcosta", "MartínSantana", "PilarEscobar", "FelipeSoto", "SusanaMontoya", "AdrianHidalgo", "ElisaCampos", "JavierSalas", "CarolinaVargas", "SamuelDuran", "LorenaPardo", "ErnestoOrtiz", "BelenVidal", "JulioFuentes", "SilviaMejia", "MarceloMiranda", "VictoriaPalacios", "RobertoCabrera", "AntoniaCardenas", "EduardoVazquez", "DianaMoreno", "MarcosSalgado", "AliciaHerrera", "EstebanRojas", "NataliaMuñoz", "VictorFernandez", "PatriciaLozano", "DiegoAguirre", "DanielaCruz", "MarioDelgado", "LorenaCano", "HectorVargas", "CarmenRamos", "LeonardoSuarez", "GabrielaSalinas", "AlfredoPerez", "ElenaCampos", "MiguelNavarro", "MarinaGil", "RicardoSantos", "juan123", "JuanPerez","JuanPerez", "JuanPerezz", "MariaLopez", "MariaLoppez", "CarlosSanchez", "CarlosSanchezz", "AnaMartinez", "AnaMartinezz", "LuisGomez", "LuisGomezz", "CarmenDiaz", "CarmenDiazz", "JorgeFernandez", "JorgeFernandezz", "LauraHernandez", "LauraHernandezz", "AntonioGarcia", "AntonioGarcía", "ElenaGonzalez"
    , "ElenaGonzales", "PedroRodriguez", "PedroRodrigez", "LuciaRamirez", "LuciaRamirezz", "MiguelMartinez", "MiguelMartínez", "SofiaTorres", "SofiaTorrez", "RamonCruz", "RamonCruzz", "AdrianaMendoza", "AdrianaMendozza", "VictorRomero", "VictorRomeroz", "ClaudiaJimenez", "ClaudiaJimenezz", "RicardoMorales", "RicardoMoralez", "PaulaOrtega", "PaulaOrtegaz", "EduardoOrtiz", "EduardoOrtizz", "AngelaRuiz", "AngelaRuizz", "RobertoGutierrez", "RobertoGutierrez", "ValeriaHerrera", "ValeriaHerrea", "DiegoNavarro", "DiegoNavaro", "MarianaVargas", "MarianaVargaz", "HugoRamos", "HugoRamoss", "GabrielaReyes", "GabrielaReyez", "AlbertoCastillo", "AlbertoCastilo", "VeronicaFlores", "VeronicaFlorres", "EmilioVega", "EmilioVegga", "LorenaChavez", "LorenaChaves", "PabloMedina", "PabloMedinna", "IsabelMolina", "IsabelMolinna", "RafaelSilva", "RafaelSilvaa", "PatriciaSuarez", "PatriciaSuarezz", "FranciscoMartinez", "FranciscoMartínez", "MonicaFigueroa", "MonicaFigueroa",
    "AndresCastro", "AndresCatro", "CristinaCortes", "CristinaCortez", "JulianLozano", "JulianLozana", "DanielaRojas", "DanielaRojaas", "SantiagoGonzalez", "SantiagoGonzales", "TeresaIglesias", "TeresaIglecias", "AlejandroGuzman", "AlejandroGuzmán", "SandraAvila", "SandraAvilla", "OscarMontes", "OscarMontezz", "RaquelGomez", "RaquelGomezz", "EnriqueLeon", "EnriqueLeón", "VictoriaBravo", "VictoriaBravoo", "FernandoRuiz", "FernandoRuizz", "LilianaLuna", "LilianaLunna", "GuillermoHernandez", "GuillermoHernadez", "BeatrizCordero", "BeatrizCorddero", "ManuelGalindo", "ManuelGalindoo", "ClaraBlanco", "ClaraBlancoo", "JesusMuñoz", "JesusMunoz", "AlejandraRivas", "AlejandraRivaz", "IvanCampos", "IvanCampoz", "NuriaMarin", "NuriaMarrin", "AngelSerrano", "AngelSerano",
    "RosaAcosta", "RosaAcostta", "MartinSantana", "MartinSantanna", "PilarEscobar", "PilarEscobarr", "FelipeSoto", "FelipeSotoo", "SusanaMontoya", "SusanaMonttoya", "AdrianHidalgo", "AdrianHidalggo", "ElisaCampos", "ElisaCampoz", "JavierSalas", "JavierSalaas", "CarolinaVargas", "CarolinaVargaz", "SamuelDuran", "SamuelDurann", "LorenaPardo", "LorenaPardoo", "ErnestoOrtiz", "ErnestoOrtizz", "BelenVidal", "BelenVidall", "JulioFuentes", "JulioFuenttes", "SilviaMejia", "SilviaMejía", "MarceloMiranda", "MarceloMirranda", "VictoriaPalacios", "VictoriaPalacioz"
    , "RobertoCabrera", "RobertoCabrerra", "AntoniaCardenas", "AntoniaCardenaaz", "EduardoVazquez", "EduardoVazques", "DianaMoreno", "DianaMorenno", "MarcosSalgado", "MarcosSalgadoo", "AliciaHerrera", "AliciaHerera", "EstebanRojas", "EstebanRojaas", "NataliaMuñoz", "NataliaMunoz", "VictorFernandez", "VictorFernandes", "PatriciaLozano", "PatriciaLozzano", "DiegoAguirre", "DiegoAgirree",
    "DanielaCruz", "DanielaCruzz", "MarioDelgado", "MarioDelgaddo", "LorenaCano", "LorenaCanó", "HectorVargas", "HectorVargaz", "CarmenRamos", "CarmenRamoss", "LeonardoSuarez", "LeonardoSuarezz", "GabrielaSalinas", "GabrielaSalinnas", "AlfredoPerez", "AlfredoPeréz", "ElenaCampos", "ElenaCampoz", "MiguelNavarro", "MiguelNavaro", "MarinaGil", "MarinaGill", "RicardoSantos", "RicardoSantoss"
    
];
usernames.forEach(username => bkTree.insert(username));

// Función para sugerir nombres similares
function suggestNames() {
    const input = document.getElementById('username-input').value;
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (input) {
        const suggestions = bkTree.search(input, input.length); // Busca nombres con una distancia basada en la longitud del input
        if (suggestions.length > 0) {
            // Ordenar sugerencias por similitud descendente
            suggestions.sort((a, b) => b.similarity - a.similarity);
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'suggestion';
                div.innerHTML = `${suggestion.word} <span class="similarity">(${suggestion.similarity}%)</span>`;
                suggestionsDiv.appendChild(div);
            });
        } else {
            suggestionsDiv.textContent = 'No se encontraron sugerencias.';
        }
    } else {
        suggestionsDiv.textContent = 'Por favor, introduce un nombre de usuario.';
    }
}

// Escuchar el evento de entrada en el campo de texto
document.getElementById('username-input').addEventListener('input', suggestNames);
