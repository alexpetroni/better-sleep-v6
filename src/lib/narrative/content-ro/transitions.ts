/**
 * Transition phrases for connecting primary pattern narrative to secondary pattern.
 * Keyed by "primary->secondary" pattern pair, with a generic fallback.
 */
export const transitions: Record<string, string> = {
	// Common pairs
	'sentinel->ruminator':
		'Si mai e un strat aici: vigilenta nu e doar fizica. Mintea ta ruleaza propria versiune a aceleiasi bucle de protectie.',
	'sentinel->manager':
		'Pe langa vigilenta fizica, creierul tau executiv ramane si el activat. Trece prin sarcini si responsabilitati chiar si in timp ce corpul incearca sa se odihneasca.',
	'sentinel->perfectionist':
		'Hipervigilenta a creat si o problema secundara: patul tau a devenit asociat cu efort si stare de veghe, nu cu odihna.',
	'ruminator->sentinel':
		'Sub bucla mentala, exista si o dimensiune fizica. Corpul tau tine o tensiune care reflecta activitatea cognitiva.',
	'ruminator->perfectionist':
		'Ruminatia a creat un tipar secundar: ai inceput sa asociezi patul cu bucla mentala insasi. Cu cat incerci mai tare sa nu te gandesti, cu atat creierul se activeaza mai mult.',
	'manager->perfectionist':
		'Suprasolicitarea executiva s-a varsat in relatia ta cu somnul insusi. Acum iti gestionezi somnul la fel cum gestionezi tot restul, si acel efort il face mai rau.',
	'manager->ruminator':
		'Creierul de munca nu se opreste curat. Trece din modul de planificare in modul de recapitulare, revazand ziua sau repetand ziua de maine.',
	'perfectionist->ruminator':
		'Frustrarea legata de somn a deschis usa unui tipar mai larg de ruminatie. Mintea ta are acum un subiect gata facut (somnul insusi) de rumegat in fiecare noapte.',
	'perfectionist->sentinel':
		'Experienta repetata de a sta treaz in pat a inceput sa declanseze un raspuns de vigilenta fizica. Corpul tau acum se incordeaza in anticiparea unei alte nopti proaste.',
	'exhausted->sentinel':
		'Cand corpul e atat de epuizat, sistemul nervos compenseaza adesea functionand mai fierbinte, mai alert, mai reactiv. Nu are rezervele sa gestioneze amenintarile reale cu calm.',
	'exhausted->savior':
		'Epuizarea si ingrijirea sunt profund impletite. Ai functionat pe fume pentru altii in timp ce propriul tau rezervor era gol.',
	'fugitive->perfectionist':
		'Tiparul de evitare a creat o problema secundara: acum asociezi patul cu experienta de a incerca si a esua sa adormi. Asta face evitarea si mai tentanta.',
	'fugitive->ruminator':
		'Scrollingul si evitarea sunt partial conduse de ce asteapta in liniste. Cand pui ecranul jos, gandurile navalesc.',
	'savior->exhausted':
		'Cererile de ingrijire ti-au impins corpul intr-o epuizare fiziologica autentica. Nu e doar sa te simti obosit, e sistemul tau care ramane fara capacitate adaptiva.',
	'antenna->sentinel':
		'Sensibilitatea senzoriala interactioneaza cu un tipar mai larg de vigilenta. Sistemul tau scaneaza mediul dupa perturbari, ceea ce mentine activarea ridicata.',
	'volcano->sentinel':
		'Tensiunea fizica pe care o tii face parte dintr-un tipar mai larg. Sistemul tau nervos ruleaza un program de suprimare care mentine corpul activat chiar si cand mintea pare calma.',

	// Generic fallback
	generic:
		'Mai e un strat aici care merita numit, pentru ca amplifica tiparul principal.'
};
